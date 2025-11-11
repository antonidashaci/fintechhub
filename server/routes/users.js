const express = require('express');
const { query } = require('../db');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// Get user favorites
router.get('/favorites', authenticateToken, async (req, res, next) => {
  try {
    const result = await query(`
      SELECT p.*, uf.created_at as favorited_at
      FROM user_favorites uf
      JOIN providers p ON uf.provider_id = p.id
      WHERE uf.user_id = $1
      ORDER BY uf.created_at DESC
    `, [req.user.userId]);

    res.json({ favorites: result.rows });
  } catch (error) {
    next(error);
  }
});

// Add to favorites
router.post('/favorites/:providerId', authenticateToken, async (req, res, next) => {
  try {
    const { providerId } = req.params;

    // Check if provider exists
    const providerCheck = await query(
      'SELECT id FROM providers WHERE id = $1',
      [providerId]
    );

    if (providerCheck.rows.length === 0) {
      return res.status(404).json({ error: 'Provider not found' });
    }

    // Add to favorites (ignore if already exists)
    await query(`
      INSERT INTO user_favorites (user_id, provider_id)
      VALUES ($1, $2)
      ON CONFLICT (user_id, provider_id) DO NOTHING
    `, [req.user.userId, providerId]);

    res.json({ message: 'Added to favorites' });
  } catch (error) {
    next(error);
  }
});

// Remove from favorites
router.delete('/favorites/:providerId', authenticateToken, async (req, res, next) => {
  try {
    const { providerId } = req.params;

    await query(
      'DELETE FROM user_favorites WHERE user_id = $1 AND provider_id = $2',
      [req.user.userId, providerId]
    );

    res.json({ message: 'Removed from favorites' });
  } catch (error) {
    next(error);
  }
});

// Get comparison history
router.get('/comparison-history', authenticateToken, async (req, res, next) => {
  try {
    const result = await query(`
      SELECT id, provider_ids, comparison_data, created_at
      FROM comparison_history
      WHERE user_id = $1
      ORDER BY created_at DESC
      LIMIT 20
    `, [req.user.userId]);

    res.json({ history: result.rows });
  } catch (error) {
    next(error);
  }
});

// Save comparison
router.post('/comparison-history', authenticateToken, async (req, res, next) => {
  try {
    const { providerIds, comparisonData } = req.body;

    if (!providerIds || !Array.isArray(providerIds) || providerIds.length === 0) {
      return res.status(400).json({ error: 'Provider IDs array required' });
    }

    const result = await query(`
      INSERT INTO comparison_history (user_id, provider_ids, comparison_data)
      VALUES ($1, $2, $3)
      RETURNING id, created_at
    `, [req.user.userId, providerIds, JSON.stringify(comparisonData)]);

    res.json({
      message: 'Comparison saved',
      id: result.rows[0].id,
      created_at: result.rows[0].created_at
    });
  } catch (error) {
    next(error);
  }
});

// Submit demo request
router.post('/demo-request', authenticateToken, async (req, res, next) => {
  try {
    const { providerId, name, email, company, monthlyVolume, notes } = req.body;

    if (!providerId || !name || !email) {
      return res.status(400).json({ error: 'Provider ID, name, and email are required' });
    }

    const result = await query(`
      INSERT INTO demo_requests (
        provider_id, name, email, company, monthly_volume, notes
      ) VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING id, created_at
    `, [providerId, name, email, company || null, monthlyVolume || null, notes || null]);

    res.json({
      message: 'Demo request submitted successfully',
      id: result.rows[0].id
    });
  } catch (error) {
    next(error);
  }
});

// Get user's demo requests
router.get('/demo-requests', authenticateToken, async (req, res, next) => {
  try {
    // Match by email since demo requests might be submitted before auth
    const userResult = await query(
      'SELECT email FROM users WHERE id = $1',
      [req.user.userId]
    );

    const result = await query(`
      SELECT dr.*, p.name as provider_name
      FROM demo_requests dr
      LEFT JOIN providers p ON dr.provider_id = p.id
      WHERE dr.email = $1
      ORDER BY dr.created_at DESC
    `, [userResult.rows[0].email]);

    res.json({ requests: result.rows });
  } catch (error) {
    next(error);
  }
});

module.exports = router;

