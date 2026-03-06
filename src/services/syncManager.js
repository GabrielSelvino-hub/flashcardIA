// Motor de sincronização para dados offline
// Sincroniza dados locais com o servidor quando a conexão é restaurada

let isSyncing = false;
let syncListeners = [];

// Registrar listener para eventos de sincronização
function onSyncEvent(callback) {
  syncListeners.push(callback);
  return () => {
    syncListeners = syncListeners.filter(cb => cb !== callback);
  };
}

// Notificar listeners
function notifyListeners(event, data) {
  syncListeners.forEach(callback => {
    try {
      callback(event, data);
    } catch (error) {
      console.error('Erro em listener de sincronização:', error);
    }
  });
}

// Verificar se está online
function isOnline() {
  return navigator.onLine;
}

// Estratégia de resolução de conflitos: última gravação vence
function resolveConflict(localItem, serverItem) {
  const localTime = new Date(localItem.lastModified || localItem.lastSync || 0);
  const serverTime = new Date(serverItem.lastSync || serverItem.lastModified || 0);
  
  return serverTime > localTime ? serverItem : localItem;
}

// Sincronizar um item do outbox (API quando logado, senão JSONBin)
async function syncOutboxItem(item) {
  if (!window.offlineStorage) {
    throw new Error('Serviços não disponíveis');
  }

  const useApi = window.apiService && window.apiService.isLoggedIn();
  const { type, data } = item;
  let result = { success: false, error: null };

  if (useApi) {
    try {
      if (type === 'deck_create' || type === 'deck_update') {
        const payload = { decks: data.decks || [], tags: data.tags || [] };
        const syncResult = await window.apiService.updateUserData(payload);
        result.success = syncResult.success;
        result.error = syncResult.error;
      } else if (type === 'card_create' || type === 'card_update') {
        const syncResult = await window.apiService.getSync();
        if (!syncResult.success || !syncResult.data) {
          result.error = syncResult.error || 'Erro ao buscar dados';
          return result;
        }
        const userData = syncResult.data;
        const decks = userData.decks || [];
        const deckIndex = decks.findIndex(d => d.id === data.deckId);
        if (deckIndex >= 0) {
          const deck = decks[deckIndex];
          const cards = deck.cards || [];
          if (type === 'card_create') cards.push(data.card);
          else {
            const cardIndex = cards.findIndex(c => c.id === data.cardId);
            if (cardIndex >= 0) cards[cardIndex] = { ...cards[cardIndex], ...data.card };
            else cards.push(data.card);
          }
          deck.cards = cards;
          decks[deckIndex] = deck;
          const updateResult = await window.apiService.updateUserData({ decks, tags: userData.tags || [] });
          result.success = updateResult.success;
          result.error = updateResult.error;
        } else result.error = 'Deck não encontrado';
      } else result.error = `Tipo desconhecido: ${type}`;
    } catch (err) {
      result.error = err.message;
    }
    return result;
  }

  if (!window.jsonbinService) {
    throw new Error('Serviços não disponíveis');
  }

  try {
    switch (type) {
      case 'deck_create':
      case 'deck_update': {
        const userId = localStorage.getItem('jsonbin_bin_id');
        if (!userId) {
          throw new Error('User ID não encontrado');
        }

        // Atualizar dados do usuário
        const syncResult = await window.jsonbinService.updateUserData(
          userId,
          null,
          data
        );

        if (syncResult.success) {
          // Mapear IDs se necessário
          if (data.deckId && data.deckId.startsWith('local_')) {
            // Se o servidor retornar um ID, mapear
            // Por enquanto, assumimos que o ID local será mantido
          }
          result.success = true;
        } else {
          result.error = syncResult.error;
        }
        break;
      }

      case 'card_create':
      case 'card_update': {
        // Cards são atualizados junto com o deck
        const userId = localStorage.getItem('jsonbin_bin_id');
        if (!userId) {
          throw new Error('User ID não encontrado');
        }

        // Buscar deck atual e atualizar card
        const userDataResult = await window.jsonbinService.getUserData(userId, null);
        if (!userDataResult.success || !userDataResult.data) {
          throw new Error('Erro ao buscar dados do usuário');
        }

        const userData = userDataResult.data;
        const decks = userData.decks || [];

        // Encontrar deck e atualizar card
        const deckIndex = decks.findIndex(d => d.id === data.deckId);
        if (deckIndex >= 0) {
          const deck = decks[deckIndex];
          const cards = deck.cards || [];
          
          if (type === 'card_create') {
            cards.push(data.card);
          } else {
            const cardIndex = cards.findIndex(c => c.id === data.cardId);
            if (cardIndex >= 0) {
              cards[cardIndex] = { ...cards[cardIndex], ...data.card };
            } else {
              cards.push(data.card);
            }
          }

          deck.cards = cards;
          decks[deckIndex] = deck;

          const syncResult = await window.jsonbinService.updateUserData(
            userId,
            null,
            { ...userData, decks }
          );

          result.success = syncResult.success;
          result.error = syncResult.error;
        } else {
          result.error = 'Deck não encontrado';
        }
        break;
      }

      default:
        result.error = `Tipo de operação desconhecido: ${type}`;
    }
  } catch (error) {
    console.error('Erro ao sincronizar item:', error);
    result.error = error.message;
  }

  return result;
}

// Sincronizar todos os itens do outbox
async function syncOutbox() {
  if (!window.offlineStorage) {
    console.error('offlineStorage não disponível');
    return { success: false, error: 'Serviço offline não disponível' };
  }

  const pendingItems = await window.offlineStorage.getOutboxItems('pending');
  if (pendingItems.length === 0) {
    return { success: true, synced: 0 };
  }

  notifyListeners('sync_start', { total: pendingItems.length });

  let synced = 0;
  let failed = 0;
  const errors = [];

  for (const item of pendingItems) {
    try {
      const result = await syncOutboxItem(item);

      if (result.success) {
        await window.offlineStorage.removeFromOutbox(item.id);
        synced++;
        notifyListeners('sync_progress', { synced, total: pendingItems.length });
      } else {
        // Atualizar status com erro
        await window.offlineStorage.updateOutboxItem(item.id, {
          status: result.error && result.error.includes('401') ? 'failed' : 'pending',
          error: result.error,
          retryCount: (item.retryCount || 0) + 1
        });
        failed++;
        errors.push({ id: item.id, error: result.error });
      }
    } catch (error) {
      console.error('Erro ao processar item do outbox:', error);
      await window.offlineStorage.updateOutboxItem(item.id, {
        status: 'failed',
        error: error.message,
        retryCount: (item.retryCount || 0) + 1
      });
      failed++;
      errors.push({ id: item.id, error: error.message });
    }
  }

  notifyListeners('sync_complete', { synced, failed, errors });

  return {
    success: failed === 0,
    synced,
    failed,
    errors
  };
}

// Sincronizar cards na fila
async function syncCardsQueue() {
  if (!window.offlineStorage) {
    return { success: false, error: 'Serviço offline não disponível' };
  }

  const queueItems = await window.offlineStorage.getCardsQueue();
  const pendingCards = queueItems.filter(item => item.status === 'pending');

  if (pendingCards.length === 0) {
    return { success: true, synced: 0 };
  }

  let synced = 0;
  let failed = 0;

  for (const item of pendingCards) {
    try {
      // Adicionar ao outbox para processamento
      await window.offlineStorage.addToOutbox({
        type: `card_${item.operation}`,
        data: {
          deckId: item.deckId,
          cardId: item.id,
          card: item.card
        }
      });

      // Remover da fila de cards
      await window.offlineStorage.removeCardFromQueue(item.id);
      synced++;
    } catch (error) {
      console.error('Erro ao processar card da fila:', error);
      await window.offlineStorage.updateCardQueueStatus(item.id, 'failed', error.message);
      failed++;
    }
  }

  // Sincronizar outbox após processar cards
  if (synced > 0) {
    await syncOutbox();
  }

  return { success: failed === 0, synced, failed };
}

// Sincronização completa
async function syncAll() {
  if (isSyncing) {
    console.log('Sincronização já em andamento');
    return { success: false, error: 'Sincronização já em andamento' };
  }

  if (!isOnline()) {
    return { success: false, error: 'Sem conexão com a internet' };
  }

  isSyncing = true;
  notifyListeners('sync_start', {});

  try {
    // 1. Sincronizar cards na fila primeiro
    const cardsResult = await syncCardsQueue();

    // 2. Sincronizar outbox
    const outboxResult = await syncOutbox();

    // 3. Atualizar metadados de sincronização
    if (window.offlineStorage) {
      await window.offlineStorage.setSyncMetadata('lastSync', new Date().toISOString());
    }

    const success = cardsResult.success && outboxResult.success;
    const totalSynced = (cardsResult.synced || 0) + (outboxResult.synced || 0);

    notifyListeners('sync_complete', {
      success,
      totalSynced,
      errors: [...(cardsResult.errors || []), ...(outboxResult.errors || [])]
    });

    return {
      success,
      synced: totalSynced,
      errors: [...(cardsResult.errors || []), ...(outboxResult.errors || [])]
    };
  } catch (error) {
    console.error('Erro na sincronização:', error);
    notifyListeners('sync_error', { error: error.message });
    return { success: false, error: error.message };
  } finally {
    isSyncing = false;
  }
}

// Sincronização incremental (apenas mudanças desde lastSync)
async function syncIncremental() {
  if (!window.offlineStorage) {
    return { success: false, error: 'Serviço offline não disponível' };
  }

  const lastSync = await window.offlineStorage.getSyncMetadata('lastSync');
  
  // Se nunca sincronizou, fazer sync completo
  if (!lastSync) {
    return await syncAll();
  }

  // Buscar apenas itens criados/modificados após lastSync
  const outboxItems = await window.offlineStorage.getOutboxItems('pending');
  const recentItems = outboxItems.filter(item => {
    const itemTime = new Date(item.createdAt);
    const lastSyncTime = new Date(lastSync);
    return itemTime > lastSyncTime;
  });

  if (recentItems.length === 0) {
    return { success: true, synced: 0, message: 'Nada para sincronizar' };
  }

  // Processar apenas itens recentes
  let synced = 0;
  for (const item of recentItems) {
    const result = await syncOutboxItem(item);
    if (result.success) {
      await window.offlineStorage.removeFromOutbox(item.id);
      synced++;
    }
  }

  if (synced > 0) {
    await window.offlineStorage.setSyncMetadata('lastSync', new Date().toISOString());
  }

  return { success: true, synced };
}

// Inicializar listeners de conexão
function initConnectionListeners() {
  window.addEventListener('online', async () => {
    console.log('Conexão restaurada, iniciando sincronização...');
    notifyListeners('connection_restored', {});
    
    // Aguardar um pouco antes de sincronizar
    setTimeout(async () => {
      if (isOnline()) {
        await syncAll();
      }
    }, 1000);
  });

  window.addEventListener('offline', () => {
    console.log('Conexão perdida');
    notifyListeners('connection_lost', {});
  });
}

// Inicializar
if (typeof window !== 'undefined') {
  initConnectionListeners();

  window.syncManager = {
    syncAll,
    syncIncremental,
    syncOutbox,
    syncCardsQueue,
    isSyncing: () => isSyncing,
    isOnline,
    onSyncEvent,
    resolveConflict
  };
}
