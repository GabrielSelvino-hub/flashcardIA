const express = require('express');
const db = require('../db');
const { authMiddleware } = require('../middleware/auth');

const router = express.Router();
router.use(authMiddleware);

function cardRowToJson(row) {
  if (!row) return null;
  let tags = [];
  try {
    tags = row.tags ? JSON.parse(row.tags) : [];
  } catch (_) {}
  let reviewHistory = [];
  let qualityHistory = [];
  try {
    reviewHistory = row.review_history ? JSON.parse(row.review_history) : [];
  } catch (_) {}
  try {
    qualityHistory = row.quality_history ? JSON.parse(row.quality_history) : [];
  } catch (_) {}
  return {
    id: row.id,
    kanji: row.kanji,
    reading: row.reading,
    meaning: row.meaning,
    interval: row.interval ?? 0,
    nextReview: row.next_review ?? Date.now(),
    easeFactor: row.ease_factor ?? 2.5,
    tags: Array.isArray(tags) ? tags : [],
    reviewHistory: Array.isArray(reviewHistory) ? reviewHistory : [],
    qualityHistory: Array.isArray(qualityHistory) ? qualityHistory : [],
  };
}

// GET /api/sync
router.get('/', async (req, res) => {
  try {
    const decksRows = await db.query(
      'SELECT id, name FROM decks WHERE user_id = $1 ORDER BY updated_at DESC',
      [req.user.id]
    );
    const decks = [];
    const tagSet = new Set();
    for (const d of decksRows.rows) {
      const cardsRows = await db.query(
        'SELECT id, kanji, reading, meaning, interval, next_review, ease_factor, tags, review_history, quality_history FROM cards WHERE deck_id = $1',
        [d.id]
      );
      const cards = cardsRows.rows.map(row => {
        const c = cardRowToJson(row);
        if (c && Array.isArray(c.tags)) c.tags.forEach(t => { if (t) tagSet.add(t); });
        return c;
      });
      decks.push({ id: d.id, name: d.name, cards });
    }
    const meta = await db.query('SELECT last_sync FROM user_sync_metadata WHERE user_id = $1', [req.user.id]);
    const lastSync = meta.rows.length > 0 ? meta.rows[0].last_sync : null;
    const tags = Array.from(tagSet).sort();
    return res.json({ decks, tags, lastSync });
  } catch (e) {
    console.error('Sync GET error:', e);
    return res.status(500).json({ error: 'Erro ao carregar dados.' });
  }
});

function upsertDecksAndCards(userId, decksPayload) {
  const client = db.pool;
  return client.connect().then(async (c) => {
    try {
      const now = new Date().toISOString();
      for (const deck of decksPayload || []) {
        const deckId = deck.id && String(deck.id).trim()
          ? String(deck.id).trim()
          : `deck_${Date.now()}_${Math.random().toString(36).slice(2, 11)}`;
        await c.query(
          `INSERT INTO decks (id, user_id, name) VALUES ($1, $2, $3)
           ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, updated_at = NOW()`,
          [deckId, userId, (deck.name && String(deck.name).trim()) || 'Sem nome']
        );
        await c.query('DELETE FROM cards WHERE deck_id = $1', [deckId]);
        const cards = deck.cards || [];
        for (const card of cards) {
          const cardId = card.id && String(card.id).trim()
            ? String(card.id).trim()
            : `card_${Date.now()}_${Math.random().toString(36).slice(2, 11)}`;
          const tagsStr = JSON.stringify(Array.isArray(card.tags) ? card.tags : []);
          const reviewHistoryStr = JSON.stringify(Array.isArray(card.reviewHistory) ? card.reviewHistory : []);
          const qualityHistoryStr = JSON.stringify(Array.isArray(card.qualityHistory) ? card.qualityHistory : []);
          await c.query(
            `INSERT INTO cards (id, deck_id, kanji, reading, meaning, interval, next_review, ease_factor, tags, review_history, quality_history)
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`,
            [
              cardId,
              deckId,
              card.kanji != null ? String(card.kanji) : '',
              card.reading != null ? String(card.reading) : '',
              card.meaning != null ? String(card.meaning) : '',
              card.interval != null ? parseInt(card.interval, 10) : 0,
              card.nextReview != null ? parseInt(card.nextReview, 10) : Date.now(),
              card.easeFactor != null ? parseFloat(card.easeFactor) : 2.5,
              tagsStr,
              reviewHistoryStr,
              qualityHistoryStr,
            ]
          );
        }
      }
      await c.query(
        `INSERT INTO user_sync_metadata (user_id, last_sync, updated_at) VALUES ($1, $2, NOW())
         ON CONFLICT (user_id) DO UPDATE SET last_sync = $2, updated_at = NOW()`,
        [userId, now]
      );
      return now;
    } finally {
      c.release();
    }
  });
}

// PUT /api/sync
router.put('/', async (req, res) => {
  try {
    const { decks, tags } = req.body || {};
    await upsertDecksAndCards(req.user.id, decks);
    const meta = await db.query('SELECT last_sync FROM user_sync_metadata WHERE user_id = $1', [req.user.id]);
    const lastSync = meta.rows.length > 0 ? meta.rows[0].last_sync : null;
    return res.json({ lastSync });
  } catch (e) {
    console.error('Sync PUT error:', e);
    return res.status(500).json({ error: 'Erro ao salvar dados.' });
  }
});

// POST /api/sync
router.post('/', async (req, res) => {
  try {
    const { decks, tags } = req.body || {};
    await upsertDecksAndCards(req.user.id, decks);
    const meta = await db.query('SELECT last_sync FROM user_sync_metadata WHERE user_id = $1', [req.user.id]);
    const lastSync = meta.rows.length > 0 ? meta.rows[0].last_sync : null;
    return res.json({ lastSync });
  } catch (e) {
    console.error('Sync POST error:', e);
    return res.status(500).json({ error: 'Erro ao salvar dados.' });
  }
});

module.exports = router;
