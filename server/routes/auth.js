const express = require('express');
const bcrypt = require('bcrypt');
const db = require('../db');
const { signAccessToken, signRefreshToken, verifyRefreshToken, authMiddleware } = require('../middleware/auth');

const router = express.Router();
const SALT_ROUNDS = 10;
const ACCESS_EXPIRES = '15m';
const REFRESH_EXPIRES = '7d';

function toUserRow(row) {
  if (!row) return null;
  return {
    id: row.id,
    email: row.email,
    name: row.name || '',
    created_at: row.created_at,
  };
}

// POST /api/auth/register
router.post('/register', async (req, res) => {
  try {
    const { email, password, name } = req.body || {};
    if (!email || !password) {
      return res.status(400).json({ error: 'Email e senha são obrigatórios.' });
    }
    const emailNorm = String(email).trim().toLowerCase();
    if (!emailNorm) return res.status(400).json({ error: 'Email inválido.' });
    if (String(password).length < 6) {
      return res.status(400).json({ error: 'Senha deve ter no mínimo 6 caracteres.' });
    }
    const existing = await db.query('SELECT id FROM users WHERE email = $1', [emailNorm]);
    if (existing.rows.length > 0) {
      return res.status(400).json({ error: 'Email já cadastrado.' });
    }
    const password_hash = await bcrypt.hash(String(password), SALT_ROUNDS);
    const insert = await db.query(
      'INSERT INTO users (email, password_hash, name) VALUES ($1, $2, $3) RETURNING id, email, name, created_at',
      [emailNorm, password_hash, (name && String(name).trim()) || '']
    );
    const user = toUserRow(insert.rows[0]);
    const payload = { userId: user.id, email: user.email };
    const accessToken = signAccessToken(payload, ACCESS_EXPIRES);
    const refreshToken = signRefreshToken(payload, REFRESH_EXPIRES);
    const decoded = require('jsonwebtoken').decode(refreshToken);
    const expiresAt = decoded && decoded.exp ? new Date(decoded.exp * 1000) : new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    await db.query(
      'INSERT INTO refresh_tokens (user_id, token, expires_at) VALUES ($1, $2, $3)',
      [user.id, refreshToken, expiresAt]
    );
    return res.status(201).json({
      user: { id: user.id, email: user.email, name: user.name },
      accessToken,
      refreshToken,
      expiresIn: 900,
    });
  } catch (e) {
    console.error('Auth register error:', e);
    return res.status(500).json({ error: 'Erro ao registrar.' });
  }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body || {};
    if (!email || !password) {
      return res.status(400).json({ error: 'Email e senha são obrigatórios.' });
    }
    const emailNorm = String(email).trim().toLowerCase();
    const userRow = await db.query('SELECT id, email, name, password_hash FROM users WHERE email = $1', [emailNorm]);
    if (userRow.rows.length === 0) {
      return res.status(401).json({ error: 'Email ou senha incorretos.' });
    }
    const row = userRow.rows[0];
    const match = await bcrypt.compare(String(password), row.password_hash);
    if (!match) {
      return res.status(401).json({ error: 'Email ou senha incorretos.' });
    }
    const user = { id: row.id, email: row.email, name: row.name || '' };
    const payload = { userId: user.id, email: user.email };
    const accessToken = signAccessToken(payload, ACCESS_EXPIRES);
    const refreshToken = signRefreshToken(payload, REFRESH_EXPIRES);
    const decoded = require('jsonwebtoken').decode(refreshToken);
    const expiresAt = decoded && decoded.exp ? new Date(decoded.exp * 1000) : new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    await db.query(
      'INSERT INTO refresh_tokens (user_id, token, expires_at) VALUES ($1, $2, $3)',
      [user.id, refreshToken, expiresAt]
    );
    return res.json({
      user: { id: user.id, email: user.email, name: user.name },
      accessToken,
      refreshToken,
      expiresIn: 900,
    });
  } catch (e) {
    console.error('Auth login error:', e);
    return res.status(500).json({ error: 'Erro ao fazer login.' });
  }
});

// POST /api/auth/refresh
router.post('/refresh', async (req, res) => {
  try {
    const { refreshToken } = req.body || {};
    if (!refreshToken) {
      return res.status(400).json({ error: 'Refresh token não fornecido.' });
    }
    const payload = verifyRefreshToken(refreshToken);
    if (!payload || !payload.userId) {
      return res.status(401).json({ error: 'Refresh token inválido ou expirado.' });
    }
    const row = await db.query(
      'SELECT id FROM refresh_tokens WHERE token = $1 AND expires_at > NOW()',
      [refreshToken]
    );
    if (row.rows.length === 0) {
      return res.status(401).json({ error: 'Refresh token inválido ou expirado.' });
    }
    const accessToken = signAccessToken({ userId: payload.userId, email: payload.email }, ACCESS_EXPIRES);
    return res.json({ accessToken, expiresIn: 900 });
  } catch (e) {
    console.error('Auth refresh error:', e);
    return res.status(500).json({ error: 'Erro ao renovar token.' });
  }
});

// GET /api/auth/me
router.get('/me', authMiddleware, async (req, res) => {
  try {
    const r = await db.query('SELECT id, email, name, created_at FROM users WHERE id = $1', [req.user.id]);
    if (r.rows.length === 0) {
      return res.status(401).json({ error: 'Usuário não encontrado.' });
    }
    const user = toUserRow(r.rows[0]);
    return res.json({ user });
  } catch (e) {
    console.error('Auth me error:', e);
    return res.status(500).json({ error: 'Erro ao obter perfil.' });
  }
});

// POST /api/auth/logout
router.post('/logout', async (req, res) => {
  try {
    const { refreshToken } = req.body || {};
    if (refreshToken) {
      await db.query('DELETE FROM refresh_tokens WHERE token = $1', [refreshToken]);
    }
    return res.json({ success: true });
  } catch (e) {
    console.error('Auth logout error:', e);
    return res.status(500).json({ error: 'Erro ao sair.' });
  }
});

module.exports = router;
