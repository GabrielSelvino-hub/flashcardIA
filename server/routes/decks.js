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
  return {
    id: row.id,
    kanji: row.kanji,
    reading: row.reading,
    meaning: row.meaning,
    interval: row.interval ?? 0,
    nextReview: row.next_review ?? Date.now(),
    easeFactor: row.ease_factor ?? 2.5,
    tags: Array.isArray(tags) ? tags : [],
  };
}

// GET /api/decks
router.get('/', async (req, res) => {
  try {
    const decksRows = await db.query(
      'SELECT id, user_id, name, created_at, updated_at FROM decks WHERE user_id = $1 ORDER BY updated_at DESC',
      [req.user.id]
    );
    const result = [];
    for (const d of decksRows.rows) {
      const cardsRows = await db.query(
        'SELECT id, kanji, reading, meaning, interval, next_review, ease_factor, tags FROM cards WHERE deck_id = $1',
        [d.id]
      );
      result.push({
        id: d.id,
        name: d.name,
        cards: cardsRows.rows.map(cardRowToJson),
      });
    }
    return res.json(result);
  } catch (e) {
    console.error('Decks list error:', e);
    return res.status(500).json({ error: 'Erro ao listar baralhos.' });
  }
});

// GET /api/decks/:id
router.get('/:id', async (req, res) => {
  try {
    const deckRow = await db.query(
      'SELECT id, user_id, name FROM decks WHERE id = $1 AND user_id = $2',
      [req.params.id, req.user.id]
    );
    if (deckRow.rows.length === 0) {
      return res.status(404).json({ error: 'Baralho não encontrado.' });
    }
    const d = deckRow.rows[0];
    const cardsRows = await db.query(
      'SELECT id, kanji, reading, meaning, interval, next_review, ease_factor, tags FROM cards WHERE deck_id = $1',
      [d.id]
    );
    return res.json({
      id: d.id,
      name: d.name,
      cards: cardsRows.rows.map(cardRowToJson),
    });
  } catch (e) {
    console.error('Deck get error:', e);
    return res.status(500).json({ error: 'Erro ao obter baralho.' });
  }
});

// POST /api/decks
router.post('/', async (req, res) => {
  try {
    const { name, id: deckId } = req.body || {};
    if (!name || !String(name).trim()) {
      return res.status(400).json({ error: 'Nome do baralho é obrigatório.' });
    }
    const id = deckId && String(deckId).trim()
      ? String(deckId).trim()
      : `deck_${Date.now()}_${Math.random().toString(36).slice(2, 11)}`;
    await db.query(
      'INSERT INTO decks (id, user_id, name) VALUES ($1, $2, $3)',
      [id, req.user.id, String(name).trim()]
    );
    return res.status(201).json({ id, name: String(name).trim(), cards: [] });
  } catch (e) {
    if (e.code === '23505') return res.status(400).json({ error: 'ID do baralho já existe.' });
    console.error('Deck create error:', e);
    return res.status(500).json({ error: 'Erro ao criar baralho.' });
  }
});

// PATCH /api/decks/:id
router.patch('/:id', async (req, res) => {
  try {
    const { name } = req.body || {};
    const r = await db.query(
      'UPDATE decks SET name = COALESCE($1, name), updated_at = NOW() WHERE id = $2 AND user_id = $3 RETURNING id, name',
      [name != null ? String(name).trim() : null, req.params.id, req.user.id]
    );
    if (r.rows.length === 0) {
      return res.status(404).json({ error: 'Baralho não encontrado.' });
    }
    const d = r.rows[0];
    const cardsRows = await db.query(
      'SELECT id, kanji, reading, meaning, interval, next_review, ease_factor, tags FROM cards WHERE deck_id = $1',
      [d.id]
    );
    return res.json({
      id: d.id,
      name: d.name,
      cards: cardsRows.rows.map(cardRowToJson),
    });
  } catch (e) {
    console.error('Deck patch error:', e);
    return res.status(500).json({ error: 'Erro ao atualizar baralho.' });
  }
});

// DELETE /api/decks/:id
router.delete('/:id', async (req, res) => {
  try {
    const r = await db.query('DELETE FROM decks WHERE id = $1 AND user_id = $2 RETURNING id', [req.params.id, req.user.id]);
    if (r.rows.length === 0) {
      return res.status(404).json({ error: 'Baralho não encontrado.' });
    }
    return res.json({ success: true });
  } catch (e) {
    console.error('Deck delete error:', e);
    return res.status(500).json({ error: 'Erro ao excluir baralho.' });
  }
});

module.exports = router;
