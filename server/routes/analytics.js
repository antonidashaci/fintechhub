const express = require('express');
const { query } = require('../db');
const { optionalAuth } = require('../middleware/auth');

const router = express.Router();

// Track page view
router.post('/pageview', optionalAuth, async (req, res, next) => {
  try {
    const { pagePath, referrer, sessionId } = req.body;
    const userAgent = req.headers['user-agent'];
    const ipAddress = req.ip || req.connection.remoteAddress;

    await query(`
      INSERT INTO page_views (user_id, page_path, referrer, user_agent, ip_address, session_id)
      VALUES ($1, $2, $3, $4, $5, $6)
    `, [
      req.user?.userId || null,
      pagePath,
      referrer || null,
      userAgent,
      ipAddress,
      sessionId
    ]);

    res.json({ tracked: true });
  } catch (error) {
    next(error);
  }
});

// Track custom event
router.post('/event', optionalAuth, async (req, res, next) => {
  try {
    const { eventName, eventData, sessionId } = req.body;

    if (!eventName) {
      return res.status(400).json({ error: 'Event name is required' });
    }

    await query(`
      INSERT INTO events (user_id, event_name, event_data, session_id)
      VALUES ($1, $2, $3, $4)
    `, [
      req.user?.userId || null,
      eventName,
      JSON.stringify(eventData || {}),
      sessionId || null
    ]);

    res.json({ tracked: true });
  } catch (error) {
    next(error);
  }
});

// Track search
router.post('/search', optionalAuth, async (req, res, next) => {
  try {
    const { searchQuery, filters, resultsCount } = req.body;

    if (!searchQuery) {
      return res.status(400).json({ error: 'Search query is required' });
    }

    await query(`
      INSERT INTO search_history (user_id, search_query, filters, results_count)
      VALUES ($1, $2, $3, $4)
    `, [
      req.user?.userId || null,
      searchQuery,
      JSON.stringify(filters || {}),
      resultsCount || 0
    ]);

    res.json({ tracked: true });
  } catch (error) {
    next(error);
  }
});

// Get popular searches (public)
router.get('/popular-searches', async (req, res, next) => {
  try {
    const result = await query(`
      SELECT search_query, COUNT(*) as count
      FROM search_history
      WHERE created_at > NOW() - INTERVAL '30 days'
      GROUP BY search_query
      ORDER BY count DESC
      LIMIT 10
    `);

    res.json({ searches: result.rows });
  } catch (error) {
    next(error);
  }
});

// Get analytics dashboard data (admin only - simplified for now)
router.get('/dashboard', async (req, res, next) => {
  try {
    // Total page views (last 30 days)
    const pageViewsResult = await query(`
      SELECT COUNT(*) as count
      FROM page_views
      WHERE created_at > NOW() - INTERVAL '30 days'
    `);

    // Unique visitors (last 30 days)
    const uniqueVisitorsResult = await query(`
      SELECT COUNT(DISTINCT ip_address) as count
      FROM page_views
      WHERE created_at > NOW() - INTERVAL '30 days'
    `);

    // Top pages
    const topPagesResult = await query(`
      SELECT page_path, COUNT(*) as views
      FROM page_views
      WHERE created_at > NOW() - INTERVAL '30 days'
      GROUP BY page_path
      ORDER BY views DESC
      LIMIT 10
    `);

    // Top events
    const topEventsResult = await query(`
      SELECT event_name, COUNT(*) as count
      FROM events
      WHERE created_at > NOW() - INTERVAL '30 days'
      GROUP BY event_name
      ORDER BY count DESC
      LIMIT 10
    `);

    res.json({
      pageViews: parseInt(pageViewsResult.rows[0].count),
      uniqueVisitors: parseInt(uniqueVisitorsResult.rows[0].count),
      topPages: topPagesResult.rows,
      topEvents: topEventsResult.rows
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;

