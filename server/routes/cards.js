const express = require('express');
const db = require('../db');
const { authMiddleware } = require('../middleware/auth');

const router = express.Router({ mergeParams: true });
router.use(authMiddleware);

async function ensureDeckOwnership(req, res, next) {
  try {
    const deckId = req.params.deckId;
    const r = await db.query('SELECT id FROM decks WHERE id = $1 AND user_id = $2', [deckId, req.user.id]);
    if (r.rows.length === 0) {
      return res.status(404).json({ error: 'Baralho não encontrado.' });
    }
    req.deckId = deckId;
    next();
  } catch (e) {
    next(e);
  }
}

router.use(ensureDeckOwnership);

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

// GET /api/decks/:deckId/cards
router.get('/', async (req, res) => {
  try {
    const page = Math.max(1, parseInt(req.query.page, 10) || 1);
    const limit = Math.min(100, Math.max(1, parseInt(req.query.limit, 10) || 100));
    const offset = (page - 1) * limit;
    const countRes = await db.query('SELECT COUNT(*) AS total FROM cards WHERE deck_id = $1', [req.deckId]);
    const total = parseInt(countRes.rows[0].total, 10);
    const cardsRows = await db.query(
      'SELECT id, kanji, reading, meaning, interval, next_review, ease_factor, tags, review_history, quality_history FROM cards WHERE deck_id = $1 ORDER BY created_at LIMIT $2 OFFSET $3',
      [req.deckId, limit, offset]
    );
    return res.json({
      cards: cardsRows.rows.map(cardRowToJson),
      total,
      page,
      limit,
    });
  } catch (e) {
    console.error('Cards list error:', e);
    return res.status(500).json({ error: 'Erro ao listar cartas.' });
  }
});

// GET /api/decks/:deckId/cards/:cardId
router.get('/:cardId', async (req, res) => {
  try {
    const r = await db.query(
      'SELECT id, kanji, reading, meaning, interval, next_review, ease_factor, tags, review_history, quality_history FROM cards WHERE id = $1 AND deck_id = $2',
      [req.params.cardId, req.deckId]
    );
    if (r.rows.length === 0) {
      return res.status(404).json({ error: 'Carta não encontrada.' });
    }
    return res.json(cardRowToJson(r.rows[0]));
  } catch (e) {
    console.error('Card get error:', e);
    return res.status(500).json({ error: 'Erro ao obter carta.' });
  }
});

// POST /api/decks/:deckId/cards/bulk (must be before /:cardId)
router.post('/bulk', async (req, res) => {
  try {
    const { cards: cardsList } = req.body || {};
    if (!Array.isArray(cardsList) || cardsList.length === 0) {
      return res.status(400).json({ error: 'Envie um array "cards" com pelo menos um item.' });
    }
    const inserted = [];
    for (const c of cardsList) {
      const id = c.id && String(c.id).trim()
        ? String(c.id).trim()
        : `card_${Date.now()}_${Math.random().toString(36).slice(2, 11)}`;
      const tagsStr = JSON.stringify(Array.isArray(c.tags) ? c.tags : []);
      const reviewHistoryStr = JSON.stringify(Array.isArray(c.reviewHistory) ? c.reviewHistory : []);
      const qualityHistoryStr = JSON.stringify(Array.isArray(c.qualityHistory) ? c.qualityHistory : []);
      await db.query(
        `INSERT INTO cards (id, deck_id, kanji, reading, meaning, interval, next_review, ease_factor, tags, review_history, quality_history)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`,
        [
          id,
          req.deckId,
          c.kanji != null ? String(c.kanji) : '',
          c.reading != null ? String(c.reading) : '',
          c.meaning != null ? String(c.meaning) : '',
          c.interval != null ? parseInt(c.interval, 10) : 0,
          c.nextReview != null ? parseInt(c.nextReview, 10) : Date.now(),
          c.easeFactor != null ? parseFloat(c.easeFactor) : 2.5,
          tagsStr,
          reviewHistoryStr,
          qualityHistoryStr,
        ]
      );
      inserted.push(cardRowToJson({
        id,
        kanji: c.kanji,
        reading: c.reading,
        meaning: c.meaning,
        interval: c.interval ?? 0,
        next_review: c.nextReview ?? Date.now(),
        ease_factor: c.easeFactor ?? 2.5,
        tags: tagsStr,
        review_history: reviewHistoryStr,
        quality_history: qualityHistoryStr,
      }));
    }
    return res.status(201).json({ cards: inserted });
  } catch (e) {
    if (e.code === '23505') return res.status(400).json({ error: 'ID de carta duplicado.' });
    console.error('Cards bulk error:', e);
    return res.status(500).json({ error: 'Erro ao criar cartas em lote.' });
  }
});

// POST /api/decks/:deckId/cards
router.post('/', async (req, res) => {
  try {
    const c = req.body || {};
    const id = c.id && String(c.id).trim()
      ? String(c.id).trim()
      : `card_${Date.now()}_${Math.random().toString(36).slice(2, 11)}`;
    const tagsStr = JSON.stringify(Array.isArray(c.tags) ? c.tags : []);
    const reviewHistoryStr = JSON.stringify(Array.isArray(c.reviewHistory) ? c.reviewHistory : []);
    const qualityHistoryStr = JSON.stringify(Array.isArray(c.qualityHistory) ? c.qualityHistory : []);
    await db.query(
      `INSERT INTO cards (id, deck_id, kanji, reading, meaning, interval, next_review, ease_factor, tags, review_history, quality_history)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`,
      [
        id,
        req.deckId,
        c.kanji != null ? String(c.kanji) : '',
        c.reading != null ? String(c.reading) : '',
        c.meaning != null ? String(c.meaning) : '',
        c.interval != null ? parseInt(c.interval, 10) : 0,
        c.nextReview != null ? parseInt(c.nextReview, 10) : Date.now(),
        c.easeFactor != null ? parseFloat(c.easeFactor) : 2.5,
        tagsStr,
        reviewHistoryStr,
        qualityHistoryStr,
      ]
    );
    return res.status(201).json(cardRowToJson({
      id,
      kanji: c.kanji,
      reading: c.reading,
      meaning: c.meaning,
      interval: c.interval ?? 0,
      next_review: c.nextReview ?? Date.now(),
      ease_factor: c.easeFactor ?? 2.5,
      tags: tagsStr,
      review_history: reviewHistoryStr,
      quality_history: qualityHistoryStr,
    }));
  } catch (e) {
    if (e.code === '23505') return res.status(400).json({ error: 'ID de carta já existe.' });
    console.error('Card create error:', e);
    return res.status(500).json({ error: 'Erro ao criar carta.' });
  }
});

// PATCH /api/decks/:deckId/cards/:cardId
router.patch('/:cardId', async (req, res) => {
  try {
    const { kanji, reading, meaning, interval, nextReview, easeFactor, tags, reviewHistory, qualityHistory } = req.body || {};
    const updates = [];
    const values = [];
    let idx = 1;
    if (kanji !== undefined) { updates.push(`kanji = $${idx++}`); values.push(String(kanji)); }
    if (reading !== undefined) { updates.push(`reading = $${idx++}`); values.push(String(reading)); }
    if (meaning !== undefined) { updates.push(`meaning = $${idx++}`); values.push(String(meaning)); }
    if (interval !== undefined) { updates.push(`interval = $${idx++}`); values.push(parseInt(interval, 10)); }
    if (nextReview !== undefined) { updates.push(`next_review = $${idx++}`); values.push(parseInt(nextReview, 10)); }
    if (easeFactor !== undefined) { updates.push(`ease_factor = $${idx++}`); values.push(parseFloat(easeFactor)); }
    if (tags !== undefined) { updates.push(`tags = $${idx++}`); values.push(JSON.stringify(Array.isArray(tags) ? tags : [])); }
    if (reviewHistory !== undefined) { updates.push(`review_history = $${idx++}`); values.push(JSON.stringify(Array.isArray(reviewHistory) ? reviewHistory : [])); }
    if (qualityHistory !== undefined) { updates.push(`quality_history = $${idx++}`); values.push(JSON.stringify(Array.isArray(qualityHistory) ? qualityHistory : [])); }
    if (updates.length === 0) {
      const r = await db.query(
        'SELECT id, kanji, reading, meaning, interval, next_review, ease_factor, tags, review_history, quality_history FROM cards WHERE id = $1 AND deck_id = $2',
        [req.params.cardId, req.deckId]
      );
      if (r.rows.length === 0) return res.status(404).json({ error: 'Carta não encontrada.' });
      return res.json(cardRowToJson(r.rows[0]));
    }
    updates.push('updated_at = NOW()');
    values.push(req.params.cardId, req.deckId);
    const q = `UPDATE cards SET ${updates.join(', ')} WHERE id = $${idx} AND deck_id = $${idx + 1} RETURNING id, kanji, reading, meaning, interval, next_review, ease_factor, tags, review_history, quality_history`;
    const r = await db.query(q, values);
    if (r.rows.length === 0) {
      return res.status(404).json({ error: 'Carta não encontrada.' });
    }
    return res.json(cardRowToJson(r.rows[0]));
  } catch (e) {
    console.error('Card patch error:', e);
    return res.status(500).json({ error: 'Erro ao atualizar carta.' });
  }
});

// DELETE /api/decks/:deckId/cards/:cardId
router.delete('/:cardId', async (req, res) => {
  try {
    const r = await db.query('DELETE FROM cards WHERE id = $1 AND deck_id = $2 RETURNING id', [req.params.cardId, req.deckId]);
    if (r.rows.length === 0) {
      return res.status(404).json({ error: 'Carta não encontrada.' });
    }
    return res.json({ success: true });
  } catch (e) {
    console.error('Card delete error:', e);
    return res.status(500).json({ error: 'Erro ao excluir carta.' });
  }
});

module.exports = router;
