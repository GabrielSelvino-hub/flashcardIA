// PostgreSQL connection and schema (Neon-compatible)
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_URL && process.env.DATABASE_URL.includes('sslmode=require') ? { rejectUnauthorized: false } : false,
});

async function query(text, params) {
  const client = await pool.connect();
  try {
    return await client.query(text, params);
  } finally {
    client.release();
  }
}

async function getClient() {
  return pool.connect();
}

const schemaSql = `
-- users
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  name TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- refresh_tokens
CREATE TABLE IF NOT EXISTS refresh_tokens (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  token TEXT NOT NULL UNIQUE,
  expires_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- decks
CREATE TABLE IF NOT EXISTS decks (
  id TEXT NOT NULL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- cards
CREATE TABLE IF NOT EXISTS cards (
  id TEXT NOT NULL PRIMARY KEY,
  deck_id TEXT NOT NULL REFERENCES decks(id) ON DELETE CASCADE,
  kanji TEXT,
  reading TEXT,
  meaning TEXT,
  interval INTEGER DEFAULT 0,
  next_review BIGINT,
  ease_factor REAL DEFAULT 2.5,
  tags TEXT,
  review_history TEXT,
  quality_history TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- push_subscriptions
CREATE TABLE IF NOT EXISTS push_subscriptions (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  endpoint TEXT NOT NULL UNIQUE,
  keys TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- user_sync_metadata
CREATE TABLE IF NOT EXISTS user_sync_metadata (
  user_id INTEGER PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  last_sync TEXT,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Índices
CREATE INDEX IF NOT EXISTS idx_decks_user_id ON decks(user_id);
CREATE INDEX IF NOT EXISTS idx_cards_deck_id ON cards(deck_id);
CREATE INDEX IF NOT EXISTS idx_refresh_tokens_user_id ON refresh_tokens(user_id);
CREATE INDEX IF NOT EXISTS idx_refresh_tokens_token ON refresh_tokens(token);
CREATE INDEX IF NOT EXISTS idx_push_subscriptions_user_id ON push_subscriptions(user_id);
`;

async function initSchema() {
  const statements = schemaSql
    .split(';')
    .map(s => s.trim())
    .filter(Boolean);
  for (const stmt of statements) {
    await query(stmt);
  }
  // Colunas para histórico de revisões e ofensivas (novas instalações já têm; existentes ganham aqui)
  await query('ALTER TABLE cards ADD COLUMN IF NOT EXISTS review_history TEXT');
  await query('ALTER TABLE cards ADD COLUMN IF NOT EXISTS quality_history TEXT');
}

module.exports = {
  query,
  getClient,
  pool,
  initSchema,
};
