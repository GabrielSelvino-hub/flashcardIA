// Backend simples para Push Notifications - NihonGo Deck
const express = require('express');
const webpush = require('web-push');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Armazenamento simples de subscriptions (em produção, usar banco de dados)
const subscriptions = new Map();

// Configurar VAPID keys
const VAPID_PUBLIC_KEY = process.env.VAPID_PUBLIC_KEY;
const VAPID_PRIVATE_KEY = process.env.VAPID_PRIVATE_KEY;
const VAPID_SUBJECT = process.env.VAPID_SUBJECT || 'mailto:admin@example.com';

if (!VAPID_PUBLIC_KEY || !VAPID_PRIVATE_KEY) {
  console.error('⚠️  VAPID keys não configuradas! Configure VAPID_PUBLIC_KEY e VAPID_PRIVATE_KEY no .env');
  console.log('💡 Para gerar VAPID keys, execute: npx web-push generate-vapid-keys');
}

if (VAPID_PUBLIC_KEY && VAPID_PRIVATE_KEY) {
  webpush.setVapidDetails(VAPID_SUBJECT, VAPID_PUBLIC_KEY, VAPID_PRIVATE_KEY);
}

// Endpoint para obter chave pública VAPID
app.get('/api/push/vapid-public-key', (req, res) => {
  if (!VAPID_PUBLIC_KEY) {
    return res.status(500).json({ error: 'VAPID keys não configuradas' });
  }
  res.json({ publicKey: VAPID_PUBLIC_KEY });
});

// Endpoint para registrar subscription
app.post('/api/push/subscribe', async (req, res) => {
  try {
    const { subscription, userId } = req.body;

    if (!subscription || !subscription.endpoint) {
      return res.status(400).json({ error: 'Subscription inválida' });
    }

    // Salvar subscription (associada ao userId se fornecido)
    const subId = subscription.endpoint;
    subscriptions.set(subId, {
      subscription,
      userId: userId || 'anonymous',
      createdAt: new Date().toISOString()
    });

    console.log(`✅ Subscription registrada: ${subId.substring(0, 50)}...`);

    res.json({ 
      success: true, 
      message: 'Subscription registrada com sucesso' 
    });
  } catch (error) {
    console.error('Erro ao registrar subscription:', error);
    res.status(500).json({ error: 'Erro ao registrar subscription' });
  }
});

// Endpoint para remover subscription
app.post('/api/push/unsubscribe', (req, res) => {
  try {
    const { endpoint } = req.body;

    if (!endpoint) {
      return res.status(400).json({ error: 'Endpoint não fornecido' });
    }

    const deleted = subscriptions.delete(endpoint);
    
    if (deleted) {
      console.log(`🗑️  Subscription removida: ${endpoint.substring(0, 50)}...`);
      res.json({ success: true, message: 'Subscription removida com sucesso' });
    } else {
      res.status(404).json({ error: 'Subscription não encontrada' });
    }
  } catch (error) {
    console.error('Erro ao remover subscription:', error);
    res.status(500).json({ error: 'Erro ao remover subscription' });
  }
});

// Endpoint para enviar notificação push
app.post('/api/push/send', async (req, res) => {
  try {
    const { 
      userId, 
      title = 'NihonGo Deck', 
      body, 
      icon = '/icon-192.png',
      badge = '/icon-192.png',
      data = {},
      url = '/'
    } = req.body;

    if (!body) {
      return res.status(400).json({ error: 'Corpo da notificação não fornecido' });
    }

    // Filtrar subscriptions por userId se fornecido
    let targetSubscriptions = Array.from(subscriptions.values());
    if (userId) {
      targetSubscriptions = targetSubscriptions.filter(sub => sub.userId === userId);
    }

    if (targetSubscriptions.length === 0) {
      return res.status(404).json({ error: 'Nenhuma subscription encontrada' });
    }

    const payload = JSON.stringify({
      title,
      body,
      icon,
      badge,
      data: { ...data, url },
      tag: 'default',
      requireInteraction: false
    });

    const results = await Promise.allSettled(
      targetSubscriptions.map(async ({ subscription }) => {
        try {
          await webpush.sendNotification(subscription, payload);
          return { success: true, endpoint: subscription.endpoint };
        } catch (error) {
          console.error('Erro ao enviar notificação:', error);
          
          // Se subscription inválida, remover
          if (error.statusCode === 410 || error.statusCode === 404) {
            subscriptions.delete(subscription.endpoint);
          }
          
          return { 
            success: false, 
            endpoint: subscription.endpoint, 
            error: error.message 
          };
        }
      })
    );

    const successful = results.filter(r => r.status === 'fulfilled' && r.value.success).length;
    const failed = results.length - successful;

    console.log(`📤 Notificação enviada: ${successful} sucesso, ${failed} falhas`);

    res.json({
      success: true,
      sent: successful,
      failed,
      total: results.length
    });
  } catch (error) {
    console.error('Erro ao enviar notificação:', error);
    res.status(500).json({ error: 'Erro ao enviar notificação' });
  }
});

// Endpoint para listar subscriptions (admin/debug)
app.get('/api/push/subscriptions', (req, res) => {
  const subs = Array.from(subscriptions.values()).map(({ subscription, userId, createdAt }) => ({
    endpoint: subscription.endpoint.substring(0, 50) + '...',
    userId,
    createdAt
  }));

  res.json({
    total: subscriptions.size,
    subscriptions: subs
  });
});

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    subscriptions: subscriptions.size
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
  console.log(`📱 VAPID Public Key: ${VAPID_PUBLIC_KEY ? 'Configurada' : 'NÃO CONFIGURADA'}`);
  console.log(`💡 Para gerar VAPID keys: npx web-push generate-vapid-keys`);
});
