const express = require('express');
const bcrypt = require('bcrypt');
const db = require('../db');
const { authMiddleware } = require('../middleware/auth');

const router = express.Router();
router.use(authMiddleware);
const SALT_ROUNDS = 10;

function toUser(row) {
  if (!row) return null;
  return {
    id: row.id,
    email: row.email,
    name: row.name || '',
    created_at: row.created_at,
    updated_at: row.updated_at,
  };
}

// GET /api/users/me
router.get('/me', async (req, res) => {
  try {
    const r = await db.query(
      'SELECT id, email, name, created_at, updated_at FROM users WHERE id = $1',
      [req.user.id]
    );
    if (r.rows.length === 0) {
      return res.status(404).json({ error: 'Usuário não encontrado.' });
    }
    return res.json({ user: toUser(r.rows[0]) });
  } catch (e) {
    console.error('Users me error:', e);
    return res.status(500).json({ error: 'Erro ao obter perfil.' });
  }
});

// PATCH /api/users/me
router.patch('/me', async (req, res) => {
  try {
    const { name, email } = req.body || {};
    const updates = [];
    const values = [];
    let idx = 1;
    if (name !== undefined) {
      updates.push(`name = $${idx++}`);
      values.push(String(name).trim());
    }
    if (email !== undefined) {
      const emailNorm = String(email).trim().toLowerCase();
      if (!emailNorm) return res.status(400).json({ error: 'Email inválido.' });
      const existing = await db.query('SELECT id FROM users WHERE email = $1 AND id != $2', [emailNorm, req.user.id]);
      if (existing.rows.length > 0) {
        return res.status(400).json({ error: 'Email já está em uso.' });
      }
      updates.push(`email = $${idx++}`);
      values.push(emailNorm);
    }
    if (updates.length === 0) {
      const r = await db.query(
        'SELECT id, email, name, created_at, updated_at FROM users WHERE id = $1',
        [req.user.id]
      );
      return res.json({ user: toUser(r.rows[0]) });
    }
    updates.push(`updated_at = NOW()`);
    values.push(req.user.id);
    const q = `UPDATE users SET ${updates.join(', ')} WHERE id = $${idx} RETURNING id, email, name, created_at, updated_at`;
    const r = await db.query(q, values);
    if (r.rows.length === 0) {
      return res.status(404).json({ error: 'Usuário não encontrado.' });
    }
    return res.json({ user: toUser(r.rows[0]) });
  } catch (e) {
    console.error('Users patch me error:', e);
    return res.status(500).json({ error: 'Erro ao atualizar perfil.' });
  }
});

// PATCH /api/users/me/password
router.patch('/me/password', async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body || {};
    if (!currentPassword || !newPassword) {
      return res.status(400).json({ error: 'Senha atual e nova senha são obrigatórias.' });
    }
    if (String(newPassword).length < 6) {
      return res.status(400).json({ error: 'A nova senha deve ter no mínimo 6 caracteres.' });
    }
    const r = await db.query('SELECT password_hash FROM users WHERE id = $1', [req.user.id]);
    if (r.rows.length === 0) {
      return res.status(404).json({ error: 'Usuário não encontrado.' });
    }
    const match = await bcrypt.compare(String(currentPassword), r.rows[0].password_hash);
    if (!match) {
      return res.status(401).json({ error: 'Senha atual incorreta.' });
    }
    const password_hash = await bcrypt.hash(String(newPassword), SALT_ROUNDS);
    await db.query('UPDATE users SET password_hash = $1, updated_at = NOW() WHERE id = $2', [password_hash, req.user.id]);
    return res.json({ success: true });
  } catch (e) {
    console.error('Users password error:', e);
    return res.status(500).json({ error: 'Erro ao alterar senha.' });
  }
});

// GET /api/users/me/sync-metadata
router.get('/me/sync-metadata', async (req, res) => {
  try {
    const r = await db.query(
      'SELECT last_sync FROM user_sync_metadata WHERE user_id = $1',
      [req.user.id]
    );
    const lastSync = r.rows.length > 0 ? r.rows[0].last_sync : null;
    return res.json({ lastSync });
  } catch (e) {
    console.error('Users sync-metadata error:', e);
    return res.status(500).json({ error: 'Erro ao obter metadados de sync.' });
  }
});

module.exports = router;
