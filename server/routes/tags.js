const express = require('express');
const db = require('../db');
const { authMiddleware } = require('../middleware/auth');

const router = express.Router();
router.use(authMiddleware);

// GET /api/tags - tags únicas dos cards dos decks do usuário
router.get('/', async (req, res) => {
  try {
    const r = await db.query(
      `SELECT c.tags FROM cards c
       INNER JOIN decks d ON d.id = c.deck_id AND d.user_id = $1`,
      [req.user.id]
    );
    const tagSet = new Set();
    for (const row of r.rows) {
      if (!row.tags) continue;
      try {
        const arr = JSON.parse(row.tags);
        if (Array.isArray(arr)) {
          arr.forEach(t => {
            const s = String(t).trim();
            if (s) tagSet.add(s);
          });
        }
      } catch (_) {}
    }
    const tags = Array.from(tagSet).filter(Boolean).sort();
    return res.json({ tags });
  } catch (e) {
    console.error('Tags list error:', e);
    return res.status(500).json({ error: 'Erro ao listar tags.' });
  }
});

module.exports = router;
