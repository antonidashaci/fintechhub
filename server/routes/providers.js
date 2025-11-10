const express = require('express');
const { query } = require('../db');
const { optionalAuth } = require('../middleware/auth');

const router = express.Router();

// Get all providers with filtering and sorting
router.get('/', optionalAuth, async (req, res, next) => {
  try {
    const {
      category,
      search,
      sort = 'featured',
      featured,
      limit = 50,
      offset = 0
    } = req.query;

    let queryText = 'SELECT * FROM providers WHERE 1=1';
    const queryParams = [];
    let paramCounter = 1;

    // Filter by category
    if (category && category !== 'all') {
      queryText += ` AND $${paramCounter} = ANY(categories)`;
      queryParams.push(category);
      paramCounter++;
    }

    // Filter by featured
    if (featured === 'true') {
      queryText += ` AND featured = true`;
    }

    // Search functionality
    if (search) {
      queryText += ` AND (
        name ILIKE $${paramCounter} OR
        card_description ILIKE $${paramCounter} OR
        $${paramCounter} = ANY(keywords)
      )`;
      queryParams.push(`%${search}%`);
      paramCounter++;
    }

    // Sorting
    switch (sort) {
      case 'rating':
        queryText += ' ORDER BY rating DESC, reviews DESC';
        break;
      case 'fee':
        queryText += ` ORDER BY (pricing->>'feeModel'->>'percentage')::decimal ASC`;
        break;
      case 'new':
        queryText += ' ORDER BY added_at DESC';
        break;
      default: // featured
        queryText += ' ORDER BY featured DESC, rating DESC';
    }

    // Pagination
    queryText += ` LIMIT $${paramCounter} OFFSET $${paramCounter + 1}`;
    queryParams.push(limit, offset);

    const result = await query(queryText, queryParams);

    // Get total count
    let countQuery = 'SELECT COUNT(*) FROM providers WHERE 1=1';
    const countParams = [];
    let countParamCounter = 1;

    if (category && category !== 'all') {
      countQuery += ` AND $${countParamCounter} = ANY(categories)`;
      countParams.push(category);
      countParamCounter++;
    }

    if (search) {
      countQuery += ` AND (
        name ILIKE $${countParamCounter} OR
        card_description ILIKE $${countParamCounter} OR
        $${countParamCounter} = ANY(keywords)
      )`;
      countParams.push(`%${search}%`);
    }

    const countResult = await query(countQuery, countParams);
    const total = parseInt(countResult.rows[0].count);

    res.json({
      providers: result.rows,
      pagination: {
        total,
        limit: parseInt(limit),
        offset: parseInt(offset),
        hasMore: parseInt(offset) + result.rows.length < total
      }
    });
  } catch (error) {
    next(error);
  }
});

// Get single provider by ID
router.get('/:id', optionalAuth, async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await query(
      'SELECT * FROM providers WHERE id = $1',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Provider not found' });
    }

    res.json({ provider: result.rows[0] });
  } catch (error) {
    next(error);
  }
});

// Get featured providers
router.get('/featured/list', async (req, res, next) => {
  try {
    const result = await query(
      'SELECT * FROM providers WHERE featured = true ORDER BY rating DESC LIMIT 6'
    );

    res.json({ providers: result.rows });
  } catch (error) {
    next(error);
  }
});

// Get categories
router.get('/meta/categories', async (req, res, next) => {
  try {
    const result = await query(`
      SELECT DISTINCT unnest(categories) as category, COUNT(*) as count
      FROM providers
      GROUP BY category
      ORDER BY count DESC
    `);

    res.json({ categories: result.rows });
  } catch (error) {
    next(error);
  }
});

// Search suggestions
router.get('/search/suggestions', async (req, res, next) => {
  try {
    const { q } = req.query;

    if (!q || q.length < 2) {
      return res.json({ suggestions: [] });
    }

    const result = await query(`
      SELECT DISTINCT unnest(keywords) as keyword
      FROM providers
      WHERE unnest(keywords) ILIKE $1
      LIMIT 10
    `, [`%${q}%`]);

    const suggestions = result.rows.map(row => row.keyword);
    res.json({ suggestions });
  } catch (error) {
    next(error);
  }
});

module.exports = router;

