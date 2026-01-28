// Gerenciador de IndexedDB para armazenamento offline
const DB_NAME = 'NihonGoDeckDB';
const DB_VERSION = 1;

// Stores (tabelas) do IndexedDB
const STORES = {
  DECKS_DRAFTS: 'decksDrafts',
  CARDS_QUEUE: 'cardsQueue',
  OUTBOX: 'outbox',
  SYNC_METADATA: 'syncMetadata',
  ID_MAPPING: 'idMapping' // Mapeia IDs locais para IDs do servidor
};

let dbInstance = null;

// Abrir conexão com IndexedDB
function openDB() {
  return new Promise((resolve, reject) => {
    if (dbInstance) {
      resolve(dbInstance);
      return;
    }

    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => {
      console.error('Erro ao abrir IndexedDB:', request.error);
      reject(request.error);
    };

    request.onsuccess = () => {
      dbInstance = request.result;
      resolve(dbInstance);
    };

    request.onupgradeneeded = (event) => {
      const db = event.target.result;

      // Store de decks em rascunho
      if (!db.objectStoreNames.contains(STORES.DECKS_DRAFTS)) {
        const decksStore = db.createObjectStore(STORES.DECKS_DRAFTS, { keyPath: 'id' });
        decksStore.createIndex('userId', 'userId', { unique: false });
        decksStore.createIndex('lastModified', 'lastModified', { unique: false });
      }

      // Store de cards na fila
      if (!db.objectStoreNames.contains(STORES.CARDS_QUEUE)) {
        const cardsStore = db.createObjectStore(STORES.CARDS_QUEUE, { keyPath: 'id' });
        cardsStore.createIndex('deckId', 'deckId', { unique: false });
        cardsStore.createIndex('status', 'status', { unique: false });
        cardsStore.createIndex('createdAt', 'createdAt', { unique: false });
      }

      // Store de outbox (operações pendentes)
      if (!db.objectStoreNames.contains(STORES.OUTBOX)) {
        const outboxStore = db.createObjectStore(STORES.OUTBOX, { keyPath: 'id', autoIncrement: true });
        outboxStore.createIndex('type', 'type', { unique: false });
        outboxStore.createIndex('status', 'status', { unique: false });
        outboxStore.createIndex('createdAt', 'createdAt', { unique: false });
      }

      // Store de metadados de sincronização
      if (!db.objectStoreNames.contains(STORES.SYNC_METADATA)) {
        const metadataStore = db.createObjectStore(STORES.SYNC_METADATA, { keyPath: 'key' });
      }

      // Store de mapeamento de IDs
      if (!db.objectStoreNames.contains(STORES.ID_MAPPING)) {
        const mappingStore = db.createObjectStore(STORES.ID_MAPPING, { keyPath: 'localId' });
        mappingStore.createIndex('serverId', 'serverId', { unique: true });
      }
    };
  });
}

// Gerar ID único local
function generateLocalId() {
  return 'local_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

// ========== DECKS DRAFTS ==========

async function saveDeckDraft(deck, userId) {
  const db = await openDB();
  const transaction = db.transaction([STORES.DECKS_DRAFTS], 'readwrite');
  const store = transaction.objectStore(STORES.DECKS_DRAFTS);

  const draft = {
    ...deck,
    userId,
    lastModified: new Date().toISOString(),
    isLocal: !deck.id || deck.id.startsWith('local_')
  };

  return new Promise((resolve, reject) => {
    const request = store.put(draft);
    request.onsuccess = () => resolve(draft);
    request.onerror = () => reject(request.error);
  });
}

async function getDeckDrafts(userId) {
  const db = await openDB();
  const transaction = db.transaction([STORES.DECKS_DRAFTS], 'readonly');
  const store = transaction.objectStore(STORES.DECKS_DRAFTS);
  const index = store.index('userId');

  return new Promise((resolve, reject) => {
    const request = index.getAll(userId);
    request.onsuccess = () => resolve(request.result || []);
    request.onerror = () => reject(request.error);
  });
}

async function deleteDeckDraft(deckId) {
  const db = await openDB();
  const transaction = db.transaction([STORES.DECKS_DRAFTS], 'readwrite');
  const store = transaction.objectStore(STORES.DECKS_DRAFTS);

  return new Promise((resolve, reject) => {
    const request = store.delete(deckId);
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
}

// ========== CARDS QUEUE ==========

async function addCardToQueue(card, deckId, operation = 'create') {
  const db = await openDB();
  const transaction = db.transaction([STORES.CARDS_QUEUE], 'readwrite');
  const store = transaction.objectStore(STORES.CARDS_QUEUE);

  const queueItem = {
    id: card.id || generateLocalId(),
    card: { ...card, id: card.id || generateLocalId() },
    deckId,
    operation, // 'create', 'update', 'delete'
    status: 'pending',
    createdAt: new Date().toISOString(),
    retryCount: 0
  };

  return new Promise((resolve, reject) => {
    const request = store.put(queueItem);
    request.onsuccess = () => resolve(queueItem);
    request.onerror = () => reject(request.error);
  });
}

async function getCardsQueue(deckId = null) {
  const db = await openDB();
  const transaction = db.transaction([STORES.CARDS_QUEUE], 'readonly');
  const store = transaction.objectStore(STORES.CARDS_QUEUE);

  return new Promise((resolve, reject) => {
    const request = deckId 
      ? store.index('deckId').getAll(deckId)
      : store.getAll();
    request.onsuccess = () => resolve(request.result || []);
    request.onerror = () => reject(request.error);
  });
}

async function removeCardFromQueue(cardId) {
  const db = await openDB();
  const transaction = db.transaction([STORES.CARDS_QUEUE], 'readwrite');
  const store = transaction.objectStore(STORES.CARDS_QUEUE);

  return new Promise((resolve, reject) => {
    const request = store.delete(cardId);
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
}

async function updateCardQueueStatus(cardId, status, error = null) {
  const db = await openDB();
  const transaction = db.transaction([STORES.CARDS_QUEUE], 'readwrite');
  const store = transaction.objectStore(STORES.CARDS_QUEUE);

  return new Promise((resolve, reject) => {
    const getRequest = store.get(cardId);
    getRequest.onsuccess = () => {
      const item = getRequest.result;
      if (item) {
        item.status = status;
        item.error = error;
        item.retryCount = (item.retryCount || 0) + 1;
        item.lastAttempt = new Date().toISOString();

        const putRequest = store.put(item);
        putRequest.onsuccess = () => resolve(item);
        putRequest.onerror = () => reject(putRequest.error);
      } else {
        reject(new Error('Item não encontrado na fila'));
      }
    };
    getRequest.onerror = () => reject(getRequest.error);
  });
}

// ========== OUTBOX ==========

async function addToOutbox(operation) {
  const db = await openDB();
  const transaction = db.transaction([STORES.OUTBOX], 'readwrite');
  const store = transaction.objectStore(STORES.OUTBOX);

  const outboxItem = {
    type: operation.type, // 'deck_create', 'deck_update', 'deck_delete', 'card_create', etc.
    data: operation.data,
    status: 'pending',
    createdAt: new Date().toISOString(),
    retryCount: 0,
    error: null
  };

  return new Promise((resolve, reject) => {
    const request = store.add(outboxItem);
    request.onsuccess = () => {
      outboxItem.id = request.result;
      resolve(outboxItem);
    };
    request.onerror = () => reject(request.error);
  });
}

async function getOutboxItems(status = 'pending') {
  const db = await openDB();
  const transaction = db.transaction([STORES.OUTBOX], 'readonly');
  const store = transaction.objectStore(STORES.OUTBOX);
  const index = store.index('status');

  return new Promise((resolve, reject) => {
    const request = index.getAll(status);
    request.onsuccess = () => resolve(request.result || []);
    request.onerror = () => reject(request.error);
  });
}

async function updateOutboxItem(id, updates) {
  const db = await openDB();
  const transaction = db.transaction([STORES.OUTBOX], 'readwrite');
  const store = transaction.objectStore(STORES.OUTBOX);

  return new Promise((resolve, reject) => {
    const getRequest = store.get(id);
    getRequest.onsuccess = () => {
      const item = getRequest.result;
      if (item) {
        Object.assign(item, updates);
        const putRequest = store.put(item);
        putRequest.onsuccess = () => resolve(item);
        putRequest.onerror = () => reject(putRequest.error);
      } else {
        reject(new Error('Item não encontrado no outbox'));
      }
    };
    getRequest.onerror = () => reject(getRequest.error);
  });
}

async function removeFromOutbox(id) {
  const db = await openDB();
  const transaction = db.transaction([STORES.OUTBOX], 'readwrite');
  const store = transaction.objectStore(STORES.OUTBOX);

  return new Promise((resolve, reject) => {
    const request = store.delete(id);
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
}

// ========== SYNC METADATA ==========

async function getSyncMetadata(key) {
  const db = await openDB();
  const transaction = db.transaction([STORES.SYNC_METADATA], 'readonly');
  const store = transaction.objectStore(STORES.SYNC_METADATA);

  return new Promise((resolve, reject) => {
    const request = store.get(key);
    request.onsuccess = () => resolve(request.result ? request.result.value : null);
    request.onerror = () => reject(request.error);
  });
}

async function setSyncMetadata(key, value) {
  const db = await openDB();
  const transaction = db.transaction([STORES.SYNC_METADATA], 'readwrite');
  const store = transaction.objectStore(STORES.SYNC_METADATA);

  return new Promise((resolve, reject) => {
    const request = store.put({ key, value });
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
}

// ========== ID MAPPING ==========

async function saveIdMapping(localId, serverId, type = 'deck') {
  const db = await openDB();
  const transaction = db.transaction([STORES.ID_MAPPING], 'readwrite');
  const store = transaction.objectStore(STORES.ID_MAPPING);

  return new Promise((resolve, reject) => {
    const request = store.put({ localId, serverId, type });
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
}

async function getServerId(localId) {
  const db = await openDB();
  const transaction = db.transaction([STORES.ID_MAPPING], 'readonly');
  const store = transaction.objectStore(STORES.ID_MAPPING);

  return new Promise((resolve, reject) => {
    const request = store.get(localId);
    request.onsuccess = () => {
      const mapping = request.result;
      resolve(mapping ? mapping.serverId : null);
    };
    request.onerror = () => reject(request.error);
  });
}

async function getLocalId(serverId) {
  const db = await openDB();
  const transaction = db.transaction([STORES.ID_MAPPING], 'readonly');
  const store = transaction.objectStore(STORES.ID_MAPPING);
  const index = store.index('serverId');

  return new Promise((resolve, reject) => {
    const request = index.get(serverId);
    request.onsuccess = () => {
      const mapping = request.result;
      resolve(mapping ? mapping.localId : null);
    };
    request.onerror = () => reject(request.error);
  });
}

// ========== UTILITIES ==========

async function clearAllData() {
  const db = await openDB();
  const stores = Object.values(STORES);

  for (const storeName of stores) {
    const transaction = db.transaction([storeName], 'readwrite');
    const store = transaction.objectStore(storeName);
    await new Promise((resolve, reject) => {
      const request = store.clear();
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }
}

async function getPendingCount() {
  const [outboxItems, cardsQueue] = await Promise.all([
    getOutboxItems('pending'),
    getCardsQueue()
  ]);
  
  const pendingCards = cardsQueue.filter(item => item.status === 'pending');
  return outboxItems.length + pendingCards.length;
}

// Exportar para uso global
if (typeof window !== 'undefined') {
  window.offlineStorage = {
    // Decks
    saveDeckDraft,
    getDeckDrafts,
    deleteDeckDraft,
    // Cards Queue
    addCardToQueue,
    getCardsQueue,
    removeCardFromQueue,
    updateCardQueueStatus,
    // Outbox
    addToOutbox,
    getOutboxItems,
    updateOutboxItem,
    removeFromOutbox,
    // Sync Metadata
    getSyncMetadata,
    setSyncMetadata,
    // ID Mapping
    saveIdMapping,
    getServerId,
    getLocalId,
    // Utilities
    clearAllData,
    getPendingCount,
    generateLocalId,
    openDB
  };
}
