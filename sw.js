// Service Worker robusto para PWA - NihonGo Deck
const CACHE_VERSION = 'v2.0.0';
const STATIC_CACHE = `flashcard-static-${CACHE_VERSION}`;
const API_CACHE = `flashcard-api-${CACHE_VERSION}`;
const IMAGE_CACHE = `flashcard-images-${CACHE_VERSION}`;

// Assets estáticos para cache inicial
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/app.jsx',
  '/jsonbinService.js',
  '/manifest.json'
];

// Instalar o service worker
self.addEventListener('install', (event) => {
  console.log('[SW] Instalando Service Worker versão', CACHE_VERSION);
  
  event.waitUntil(
    Promise.all([
      // Cache de assets estáticos
      caches.open(STATIC_CACHE).then((cache) => {
        console.log('[SW] Cacheando assets estáticos');
        return cache.addAll(STATIC_ASSETS.map(url => new Request(url, { cache: 'reload' })));
      }).catch((err) => {
        console.error('[SW] Erro ao cachear assets estáticos:', err);
      }),
      // Forçar ativação imediata
      self.skipWaiting()
    ])
  );
});

// Ativar o service worker
self.addEventListener('activate', (event) => {
  console.log('[SW] Ativando Service Worker versão', CACHE_VERSION);
  
  event.waitUntil(
    Promise.all([
      // Limpar caches antigos
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== STATIC_CACHE && 
                cacheName !== API_CACHE && 
                cacheName !== IMAGE_CACHE &&
                cacheName.startsWith('flashcard-')) {
              console.log('[SW] Removendo cache antigo:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      }),
      // Assumir controle de todas as páginas
      self.clients.claim()
    ])
  );
});

// Estratégia CacheFirst para assets estáticos
async function cacheFirst(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);
  
  if (cached) {
    return cached;
  }
  
  try {
    const response = await fetch(request);
    if (response.ok) {
      cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    console.error('[SW] Erro no cacheFirst:', error);
    // Se for HTML, retornar index.html do cache
    if (request.headers.get('accept').includes('text/html')) {
      const indexCache = await caches.match('/index.html');
      if (indexCache) return indexCache;
    }
    throw error;
  }
}

// Estratégia NetworkFirst para API
async function networkFirst(request, cacheName, timeout = 3000) {
  const cache = await caches.open(cacheName);
  
  try {
    // Tenta buscar da rede com timeout
    const networkPromise = fetch(request);
    const timeoutPromise = new Promise((_, reject) => 
      setTimeout(() => reject(new Error('Timeout')), timeout)
    );
    
    const response = await Promise.race([networkPromise, timeoutPromise]);
    
    if (response.ok) {
      // Cacheia resposta bem-sucedida
      cache.put(request, response.clone());
      return response;
    }
    
    // Se resposta não OK, tenta cache
    const cached = await cache.match(request);
    if (cached) {
      return cached;
    }
    
    return response;
  } catch (error) {
    console.log('[SW] Rede falhou, tentando cache:', error.message);
    const cached = await cache.match(request);
    if (cached) {
      return cached;
    }
    throw error;
  }
}

// Interceptar requisições
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Ignorar requisições não-GET e chrome-extension
  if (request.method !== 'GET' || url.protocol === 'chrome-extension:') {
    return;
  }
  
  // API JSONBin.io - NetworkFirst
  if (url.hostname === 'api.jsonbin.io') {
    event.respondWith(networkFirst(request, API_CACHE, 5000));
    return;
  }
  
  // Imagens - CacheFirst
  if (request.destination === 'image' || 
      /\.(jpg|jpeg|png|gif|webp|svg|ico)$/i.test(url.pathname)) {
    event.respondWith(cacheFirst(request, IMAGE_CACHE));
    return;
  }
  
  // Assets estáticos (HTML, JS, CSS) - CacheFirst
  if (url.origin === self.location.origin) {
    if (request.destination === 'document' ||
        request.destination === 'script' ||
        request.destination === 'style' ||
        /\.(js|jsx|css|html)$/i.test(url.pathname)) {
      event.respondWith(cacheFirst(request, STATIC_CACHE));
      return;
    }
  }
  
  // Fontes e outros recursos - CacheFirst
  if (request.destination === 'font' || 
      url.hostname.includes('fonts.googleapis.com') ||
      url.hostname.includes('fonts.gstatic.com')) {
    event.respondWith(cacheFirst(request, STATIC_CACHE));
    return;
  }
  
  // Para outras requisições, tenta rede primeiro
  event.respondWith(networkFirst(request, API_CACHE));
});

// Background Sync - Sincronizar quando internet voltar
self.addEventListener('sync', (event) => {
  console.log('[SW] Background Sync disparado:', event.tag);
  
  if (event.tag === 'sync-data') {
    event.waitUntil(
      syncData().catch((error) => {
        console.error('[SW] Erro no Background Sync:', error);
      })
    );
  }
});

// Função de sincronização (será chamada pelo app)
async function syncData() {
  // Notificar clientes para iniciar sincronização
  const clients = await self.clients.matchAll();
  clients.forEach((client) => {
    client.postMessage({
      type: 'SYNC_REQUEST',
      source: 'service-worker'
    });
  });
}

// Push Notifications
self.addEventListener('push', (event) => {
  console.log('[SW] Push notification recebida');
  
  let notificationData = {
    title: 'NihonGo Deck',
    body: 'Você tem uma nova notificação',
    icon: '/icon-192.png',
    badge: '/icon-192.png',
    tag: 'default',
    requireInteraction: false
  };
  
  if (event.data) {
    try {
      const data = event.data.json();
      notificationData = { ...notificationData, ...data };
    } catch (e) {
      notificationData.body = event.data.text();
    }
  }
  
  event.waitUntil(
    self.registration.showNotification(notificationData.title, {
      body: notificationData.body,
      icon: notificationData.icon,
      badge: notificationData.badge,
      tag: notificationData.tag,
      requireInteraction: notificationData.requireInteraction,
      data: notificationData.data || {},
      actions: notificationData.actions || []
    })
  );
});

// Click em notificação
self.addEventListener('notificationclick', (event) => {
  console.log('[SW] Notificação clicada:', event.notification.tag);
  
  event.notification.close();
  
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      // Se já tem uma janela aberta, focar nela
      for (let client of clientList) {
        if (client.url === self.location.origin && 'focus' in client) {
          return client.focus();
        }
      }
      // Senão, abrir nova janela
      if (clients.openWindow) {
        const url = event.notification.data?.url || '/';
        return clients.openWindow(url);
      }
    })
  );
});

// Mensagens do app
self.addEventListener('message', (event) => {
  console.log('[SW] Mensagem recebida:', event.data);
  
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  if (event.data && event.data.type === 'CACHE_URLS') {
    event.waitUntil(
      caches.open(STATIC_CACHE).then((cache) => {
        return cache.addAll(event.data.urls);
      })
    );
  }
});
