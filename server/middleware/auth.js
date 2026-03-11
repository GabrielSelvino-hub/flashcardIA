const jwt = require('jsonwebtoken');

const isProduction = process.env.NODE_ENV === 'production';
const JWT_SECRET = process.env.JWT_SECRET || (isProduction ? null : 'dev_jwt_secret_change_in_production');
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || (isProduction ? null : 'dev_refresh_secret_change_in_production');

if (isProduction && (!JWT_SECRET || !JWT_REFRESH_SECRET)) {
  throw new Error('Em produção JWT_SECRET e JWT_REFRESH_SECRET devem estar definidos no .env');
}

function signAccessToken(payload, expiresIn = '15m') {
  return jwt.sign(payload, JWT_SECRET, { expiresIn });
}

function signRefreshToken(payload, expiresIn = '7d') {
  return jwt.sign(payload, JWT_REFRESH_SECRET, { expiresIn });
}

function verifyAccessToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (_) {
    return null;
  }
}

function verifyRefreshToken(token) {
  try {
    return jwt.verify(token, JWT_REFRESH_SECRET);
  } catch (_) {
    return null;
  }
}

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;
  if (!token) {
    return res.status(401).json({ error: 'Token não fornecido.' });
  }
  const payload = verifyAccessToken(token);
  if (!payload || !payload.userId) {
    return res.status(401).json({ error: 'Token inválido ou expirado.' });
  }
  req.user = { id: payload.userId, email: payload.email };
  next();
}

function optionalAuth(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;
  if (!token) {
    req.user = null;
    return next();
  }
  const payload = verifyAccessToken(token);
  if (payload && payload.userId) {
    req.user = { id: payload.userId, email: payload.email };
  } else {
    req.user = null;
  }
  next();
}

module.exports = {
  signAccessToken,
  signRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
  authMiddleware,
  optionalAuth,
};
