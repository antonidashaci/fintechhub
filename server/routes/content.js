const express = require('express');
const { query } = require('../db');

const router = express.Router();

// Get published content by type and slug
router.get('/:contentType/:slug', async (req, res, next) => {
  try {
    const { contentType, slug } = req.params;

    const result = await query(`
      SELECT id, content_type, slug, data, updated_at
      FROM cms_content
      WHERE content_type = $1 AND slug = $2 AND published = true
    `, [contentType, slug]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Content not found' });
    }

    res.json({ content: result.rows[0] });
  } catch (error) {
    next(error);
  }
});

// Get all content by type
router.get('/:contentType', async (req, res, next) => {
  try {
    const { contentType } = req.params;
    const { published = 'true' } = req.query;

    let queryText = 'SELECT * FROM cms_content WHERE content_type = $1';
    const params = [contentType];

    if (published === 'true') {
      queryText += ' AND published = true';
    }

    queryText += ' ORDER BY updated_at DESC';

    const result = await query(queryText, params);

    res.json({ content: result.rows });
  } catch (error) {
    next(error);
  }
});

// Submit contact form
router.post('/contact', async (req, res, next) => {
  try {
    const { name, email, topic, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Name, email, and message are required' });
    }

    await query(`
      INSERT INTO contact_submissions (name, email, topic, message)
      VALUES ($1, $2, $3, $4)
    `, [name, email, topic || null, message]);

    res.json({ message: 'Contact form submitted successfully' });
  } catch (error) {
    next(error);
  }
});

// Newsletter subscription
router.post('/newsletter', async (req, res, next) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    await query(`
      INSERT INTO newsletter_subscriptions (email)
      VALUES ($1)
      ON CONFLICT (email) DO UPDATE
      SET subscribed = true, updated_at = CURRENT_TIMESTAMP
    `, [email.toLowerCase()]);

    res.json({ message: 'Successfully subscribed to newsletter' });
  } catch (error) {
    next(error);
  }
});

// Unsubscribe from newsletter
router.post('/newsletter/unsubscribe', async (req, res, next) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    await query(`
      UPDATE newsletter_subscriptions
      SET subscribed = false, updated_at = CURRENT_TIMESTAMP
      WHERE email = $1
    `, [email.toLowerCase()]);

    res.json({ message: 'Successfully unsubscribed from newsletter' });
  } catch (error) {
    next(error);
  }
});

module.exports = router;

