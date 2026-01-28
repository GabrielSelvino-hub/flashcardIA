// Serviço de Push Notifications para PWA
// Gerencia permissões, subscriptions e comunicação com o backend

let vapidPublicKey = null;
let subscription = null;
let pushServerUrl = 'http://localhost:3000'; // Em produção, usar URL do servidor

// Configurar URL do servidor
function setServerUrl(url) {
  pushServerUrl = url;
}

// Verificar se push está disponível
function isAvailable() {
  return 'serviceWorker' in navigator && 
         'PushManager' in window &&
         'Notification' in window;
}

// Verificar se notificações estão permitidas
async function getPermissionStatus() {
  if (!isAvailable()) {
    return { available: false, status: 'not-supported' };
  }

  if (!('Notification' in window)) {
    return { available: false, status: 'not-supported' };
  }

  const permission = Notification.permission;
  return {
    available: true,
    status: permission // 'granted', 'denied', 'default'
  };
}

// Solicitar permissão de notificação
async function requestPermission() {
  if (!isAvailable()) {
    return {
      success: false,
      error: 'Push notifications não estão disponíveis neste navegador'
    };
  }

  try {
    const permission = await Notification.requestPermission();
    
    if (permission === 'granted') {
      return { success: true, permission: 'granted' };
    } else if (permission === 'denied') {
      return { 
        success: false, 
        error: 'Permissão de notificação negada. Ative nas configurações do navegador.' 
      };
    } else {
      return { 
        success: false, 
        error: 'Permissão de notificação não concedida' 
      };
    }
  } catch (error) {
    return {
      success: false,
      error: error.message || 'Erro ao solicitar permissão'
    };
  }
}

// Obter chave pública VAPID do servidor
async function getVapidPublicKey() {
  if (vapidPublicKey) {
    return vapidPublicKey;
  }

  try {
    const response = await fetch(`${pushServerUrl}/api/push/vapid-public-key`);
    if (!response.ok) {
      throw new Error('Erro ao obter chave VAPID');
    }
    const data = await response.json();
    vapidPublicKey = data.publicKey;
    return vapidPublicKey;
  } catch (error) {
    console.error('Erro ao obter chave VAPID:', error);
    throw error;
  }
}

// Converter chave VAPID para formato Uint8Array
function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

// Registrar subscription
async function subscribe(userId = null) {
  if (!isAvailable()) {
    return {
      success: false,
      error: 'Push notifications não estão disponíveis'
    };
  }

  // Verificar permissão
  const permissionStatus = await getPermissionStatus();
  if (permissionStatus.status !== 'granted') {
    const requestResult = await requestPermission();
    if (!requestResult.success) {
      return requestResult;
    }
  }

  try {
    // Obter Service Worker registration
    const registration = await navigator.serviceWorker.ready;

    // Obter chave VAPID
    const publicKey = await getVapidPublicKey();
    const applicationServerKey = urlBase64ToUint8Array(publicKey);

    // Criar subscription
    subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: applicationServerKey
    });

    // Enviar subscription para o servidor
    const response = await fetch(`${pushServerUrl}/api/push/subscribe`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        subscription: subscription.toJSON(),
        userId: userId
      })
    });

    if (!response.ok) {
      throw new Error('Erro ao registrar subscription no servidor');
    }

    // Salvar subscription localmente
    localStorage.setItem('push_subscription', JSON.stringify(subscription.toJSON()));

    return {
      success: true,
      subscription: subscription.toJSON()
    };
  } catch (error) {
    console.error('Erro ao registrar subscription:', error);
    
    let errorMessage = 'Erro ao registrar subscription';
    if (error.message) {
      errorMessage = error.message;
    }

    return {
      success: false,
      error: errorMessage
    };
  }
}

// Remover subscription
async function unsubscribe() {
  if (!subscription) {
    // Tentar carregar do localStorage
    const saved = localStorage.getItem('push_subscription');
    if (saved) {
      try {
        const subData = JSON.parse(saved);
        // Recriar subscription object (simplificado)
        subscription = subData;
      } catch (e) {
        console.error('Erro ao carregar subscription:', e);
      }
    }
  }

  if (!subscription) {
    return {
      success: false,
      error: 'Nenhuma subscription encontrada'
    };
  }

  try {
    // Remover do servidor
    const endpoint = typeof subscription === 'object' && subscription.endpoint 
      ? subscription.endpoint 
      : subscription;

    await fetch(`${pushServerUrl}/api/push/unsubscribe`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ endpoint })
    });

    // Remover subscription do Service Worker
    if (typeof subscription !== 'string') {
      const registration = await navigator.serviceWorker.ready;
      const activeSubscription = await registration.pushManager.getSubscription();
      if (activeSubscription) {
        await activeSubscription.unsubscribe();
      }
    }

    // Limpar localStorage
    localStorage.removeItem('push_subscription');
    subscription = null;

    return { success: true };
  } catch (error) {
    console.error('Erro ao remover subscription:', error);
    return {
      success: false,
      error: error.message || 'Erro ao remover subscription'
    };
  }
}

// Verificar se está inscrito
async function isSubscribed() {
  try {
    const registration = await navigator.serviceWorker.ready;
    const activeSubscription = await registration.pushManager.getSubscription();
    return activeSubscription !== null;
  } catch (error) {
    console.error('Erro ao verificar subscription:', error);
    return false;
  }
}

// Obter subscription atual
async function getSubscription() {
  try {
    const registration = await navigator.serviceWorker.ready;
    const activeSubscription = await registration.pushManager.getSubscription();
    return activeSubscription ? activeSubscription.toJSON() : null;
  } catch (error) {
    console.error('Erro ao obter subscription:', error);
    return null;
  }
}

// Exportar para uso global
if (typeof window !== 'undefined') {
  window.pushService = {
    isAvailable,
    getPermissionStatus,
    requestPermission,
    subscribe,
    unsubscribe,
    isSubscribed,
    getSubscription,
    setServerUrl
  };
}
