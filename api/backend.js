// Vercel Serverless: todas as requisições /api/* são reescritas para este handler (vercel.json)
const { app } = require('../server/index');
const db = require('../server/db');

let schemaReady = null;
function ensureSchema() {
  if (!schemaReady) schemaReady = db.initSchema().catch((e) => { schemaReady = null; throw e; });
  return schemaReady;
}

module.exports = async function handler(req, res) {
  try {
    await ensureSchema();
  } catch (e) {
    console.error('Schema init error:', e);
    return res.status(500).json({ error: 'Erro ao conectar ao banco.' });
  }
  return app(req, res);
};
