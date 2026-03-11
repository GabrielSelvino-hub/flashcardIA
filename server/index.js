// Backend NihonGo Deck - Auth, Decks, Cards, Sync, Push (PostgreSQL)
const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');
const webpush = require('web-push');
const cors = require('cors');
require('dotenv').config();

const db = require('./db');
const { authMiddleware } = require('./middleware/auth');
const authRoutes = require('./routes/auth');
const usersRoutes = require('./routes/users');
const decksRoutes = require('./routes/decks');
const cardsRoutes = require('./routes/cards');
const tagsRoutes = require('./routes/tags');
const syncRoutes = require('./routes/sync');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(cookieParser());

const VAPID_PUBLIC_KEY = process.env.VAPID_PUBLIC_KEY;
const VAPID_PRIVATE_KEY = process.env.VAPID_PRIVATE_KEY;
const VAPID_SUBJECT = process.env.VAPID_SUBJECT || 'mailto:admin@example.com';

let VAPID_CONFIGURED = false;
if (VAPID_PUBLIC_KEY && VAPID_PRIVATE_KEY) {
  try {
    webpush.setVapidDetails(VAPID_SUBJECT, VAPID_PUBLIC_KEY, VAPID_PRIVATE_KEY);
    VAPID_CONFIGURED = true;
  } catch (e) {
    console.warn('⚠️  VAPID keys inválidas (use valores gerados por npx web-push generate-vapid-keys). Push desativado.');
  }
}
if (!VAPID_CONFIGURED) {
  console.log('💡 Push não configurado. Para ativar: npx web-push generate-vapid-keys e defina VAPID_PUBLIC_KEY e VAPID_PRIVATE_KEY no .env');
}

// ----- API Routes -----
app.use('/api/auth', authRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/decks', decksRoutes);
app.use('/api/decks/:deckId/cards', cardsRoutes);
app.use('/api/tags', tagsRoutes);
app.use('/api/sync', syncRoutes);

// ----- Push (optionalAuth for subscribe, DB persistence) -----
app.get('/api/push/vapid-public-key', (req, res) => {
  if (!VAPID_CONFIGURED || !VAPID_PUBLIC_KEY) {
    return res.status(500).json({ error: 'VAPID keys não configuradas' });
  }
  res.json({ publicKey: VAPID_PUBLIC_KEY });
});

app.post('/api/push/subscribe', authMiddleware, async (req, res) => {
  try {
    const { subscription } = req.body || {};
    if (!subscription || !subscription.endpoint) {
      return res.status(400).json({ error: 'Subscription inválida' });
    }
    const userId = req.user.id;
    const keysStr = JSON.stringify(subscription.keys || {});
    await db.query(
      `INSERT INTO push_subscriptions (user_id, endpoint, keys)
       VALUES ($1, $2, $3)
       ON CONFLICT (endpoint) DO UPDATE SET user_id = $1, keys = $3`,
      [userId, subscription.endpoint, keysStr]
    );
    console.log(`✅ Subscription registrada: ${subscription.endpoint.substring(0, 50)}...`);
    res.json({ success: true, message: 'Subscription registrada com sucesso' });
  } catch (e) {
    console.error('Erro ao registrar subscription:', e);
    const msg = process.env.NODE_ENV === 'production' ? 'Erro ao registrar subscription' : (e.message || 'Erro ao registrar subscription');
    res.status(500).json({ error: msg });
  }
});

app.post('/api/push/unsubscribe', authMiddleware, async (req, res) => {
  try {
    const { endpoint } = req.body || {};
    if (!endpoint) {
      return res.status(400).json({ error: 'Endpoint não fornecido' });
    }
    const r = await db.query(
      'DELETE FROM push_subscriptions WHERE endpoint = $1 AND user_id = $2 RETURNING id',
      [endpoint, req.user.id]
    );
    if (r.rows.length === 0) {
      return res.status(404).json({ error: 'Subscription não encontrada' });
    }
    console.log(`🗑️  Subscription removida: ${endpoint.substring(0, 50)}...`);
    res.json({ success: true, message: 'Subscription removida com sucesso' });
  } catch (e) {
    console.error('Erro ao remover subscription:', e);
    const msg = process.env.NODE_ENV === 'production' ? 'Erro ao remover subscription' : (e.message || 'Erro ao remover subscription');
    res.status(500).json({ error: msg });
  }
});

app.post('/api/push/send', authMiddleware, async (req, res) => {
  try {
    const { title = 'NihonGo Deck', body, icon = '/icon-192.png', badge = '/icon-192.png', data = {}, url = '/' } = req.body || {};
    if (!body) {
      return res.status(400).json({ error: 'Corpo da notificação não fornecido' });
    }
    const r = await db.query('SELECT endpoint, keys FROM push_subscriptions WHERE user_id = $1', [req.user.id]);
    const subs = r.rows.map(row => ({
      endpoint: row.endpoint,
      keys: (() => { try { return JSON.parse(row.keys); } catch (_) { return {}; } })(),
    })).filter(s => s.endpoint);
    if (subs.length === 0) {
      return res.status(404).json({ error: 'Nenhuma subscription encontrada' });
    }
    const payload = JSON.stringify({
      title,
      body,
      icon,
      badge,
      data: { ...data, url },
      tag: 'default',
      requireInteraction: false,
    });
    const results = await Promise.allSettled(
      subs.map(async (sub) => {
        try {
          await webpush.sendNotification(sub, payload);
          return { success: true, endpoint: sub.endpoint };
        } catch (error) {
          if (error.statusCode === 410 || error.statusCode === 404) {
            await db.query('DELETE FROM push_subscriptions WHERE endpoint = $1', [sub.endpoint]).catch(() => {});
          }
          return { success: false, endpoint: sub.endpoint, error: error.message };
        }
      })
    );
    const successful = results.filter(rr => rr.status === 'fulfilled' && rr.value.success).length;
    const failed = results.length - successful;
    console.log(`📤 Notificação enviada: ${successful} sucesso, ${failed} falhas`);
    res.json({ success: true, sent: successful, failed, total: results.length });
  } catch (e) {
    console.error('Erro ao enviar notificação:', e);
    const msg = process.env.NODE_ENV === 'production' ? 'Erro ao enviar notificação' : (e.message || 'Erro ao enviar notificação');
    res.status(500).json({ error: msg });
  }
});

app.get('/api/push/subscriptions', authMiddleware, async (req, res) => {
  try {
    const r = await db.query(
      'SELECT endpoint, created_at FROM push_subscriptions WHERE user_id = $1',
      [req.user.id]
    );
    const subscriptions = r.rows.map(row => ({
      endpoint: row.endpoint.substring(0, 50) + '...',
      createdAt: row.created_at,
    }));
    res.json({ total: subscriptions.length, subscriptions });
  } catch (e) {
    console.error('Erro ao listar subscriptions:', e);
    const msg = process.env.NODE_ENV === 'production' ? 'Erro ao listar subscriptions' : (e.message || 'Erro ao listar subscriptions');
    res.status(500).json({ error: msg });
  }
});

// ----- Health & version -----
app.get('/health', async (req, res) => {
  let subscriptionsCount = 0;
  try {
    const r = await db.query('SELECT COUNT(*) AS c FROM push_subscriptions');
    subscriptionsCount = parseInt(r.rows[0].c, 10);
  } catch (_) {}
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    subscriptions: subscriptionsCount,
  });
});

app.get('/api/version', (req, res) => {
  res.json({ version: '1.10' });
});

// Servir frontend (index.html, app.jsx, scripts, etc.) da raiz do projeto
app.use(express.static(path.join(__dirname, '..')));

// ----- Start (só quando rodar node index.js; no Vercel o app é exportado) -----
async function start() {
  if (!process.env.DATABASE_URL) {
    console.error('⚠️  DATABASE_URL não configurada no .env');
    process.exit(1);
  }
  try {
    await db.initSchema();
    console.log('✅ Schema do banco verificado/criado.');
  } catch (e) {
    console.error('Erro ao inicializar schema:', e);
    process.exit(1);
  }
  app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
    console.log(`📱 VAPID Public Key: ${VAPID_CONFIGURED ? 'Configurada' : 'NÃO CONFIGURADA'}`);
    console.log(`💡 Para gerar VAPID keys: npx web-push generate-vapid-keys`);
  });
}

if (require.main === module) {
  start();
}

module.exports = { app, start };
