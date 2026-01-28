// Serviço de Geolocalização para PWA
// Wrapper da Geolocation API com tratamento de erros e permissões

let currentPosition = null;
let watchId = null;

// Verificar se geolocation está disponível
function isAvailable() {
  return 'geolocation' in navigator;
}

// Obter posição atual (uma vez)
async function getCurrentPosition(options = {}) {
  if (!isAvailable()) {
    return {
      success: false,
      error: 'Geolocalização não está disponível neste navegador'
    };
  }

  const defaultOptions = {
    enableHighAccuracy: true,
    timeout: 10000,
    maximumAge: 0
  };

  const finalOptions = { ...defaultOptions, ...options };

  return new Promise((resolve) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const location = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
          altitude: position.coords.altitude,
          altitudeAccuracy: position.coords.altitudeAccuracy,
          heading: position.coords.heading,
          speed: position.coords.speed,
          timestamp: position.timestamp
        };

        currentPosition = location;

        resolve({
          success: true,
          location
        });
      },
      (error) => {
        let errorMessage = 'Erro ao obter localização';

        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = 'Permissão de localização negada pelo usuário';
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = 'Informações de localização indisponíveis';
            break;
          case error.TIMEOUT:
            errorMessage = 'Tempo limite excedido ao obter localização';
            break;
          default:
            errorMessage = `Erro desconhecido: ${error.message}`;
        }

        resolve({
          success: false,
          error: errorMessage,
          code: error.code
        });
      },
      finalOptions
    );
  });
}

// Observar mudanças de posição
function watchPosition(callback, options = {}) {
  if (!isAvailable()) {
    callback({
      success: false,
      error: 'Geolocalização não está disponível neste navegador'
    });
    return null;
  }

  const defaultOptions = {
    enableHighAccuracy: true,
    timeout: 10000,
    maximumAge: 60000 // 1 minuto
  };

  const finalOptions = { ...defaultOptions, ...options };

  watchId = navigator.geolocation.watchPosition(
    (position) => {
      const location = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        accuracy: position.coords.accuracy,
        altitude: position.coords.altitude,
        altitudeAccuracy: position.coords.altitudeAccuracy,
        heading: position.coords.heading,
        speed: position.coords.speed,
        timestamp: position.timestamp
      };

      currentPosition = location;

      callback({
        success: true,
        location
      });
    },
    (error) => {
      let errorMessage = 'Erro ao obter localização';

      switch (error.code) {
        case error.PERMISSION_DENIED:
          errorMessage = 'Permissão de localização negada pelo usuário';
          break;
        case error.POSITION_UNAVAILABLE:
          errorMessage = 'Informações de localização indisponíveis';
          break;
        case error.TIMEOUT:
          errorMessage = 'Tempo limite excedido ao obter localização';
          break;
        default:
          errorMessage = `Erro desconhecido: ${error.message}`;
      }

      callback({
        success: false,
        error: errorMessage,
        code: error.code
      });
    },
    finalOptions
  );

  return watchId;
}

// Parar observação de posição
function clearWatch() {
  if (watchId !== null) {
    navigator.geolocation.clearWatch(watchId);
    watchId = null;
  }
}

// Obter última posição conhecida (sem fazer nova requisição)
function getLastKnownPosition() {
  return currentPosition;
}

// Verificar status de permissão (se suportado)
async function checkPermission() {
  if (!navigator.permissions) {
    return {
      success: false,
      error: 'API de permissões não disponível'
    };
  }

  try {
    const result = await navigator.permissions.query({ name: 'geolocation' });
    return {
      success: true,
      state: result.state, // 'granted', 'denied', 'prompt'
      canAsk: result.state === 'prompt'
    };
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
}

// Solicitar permissão (indireto - a permissão é solicitada automaticamente na primeira chamada)
async function requestPermission() {
  // A permissão é solicitada automaticamente na primeira chamada de getCurrentPosition
  // Este método apenas verifica o status atual
  return await checkPermission();
}

// Formatar localização para exibição
function formatLocation(location) {
  if (!location) return 'Localização não disponível';

  return {
    coordinates: `${location.latitude.toFixed(6)}, ${location.longitude.toFixed(6)}`,
    accuracy: location.accuracy ? `${Math.round(location.accuracy)}m` : 'N/A',
    timestamp: new Date(location.timestamp).toLocaleString('pt-BR')
  };
}

// Calcular distância entre duas coordenadas (Haversine)
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371e3; // Raio da Terra em metros
  const φ1 = lat1 * Math.PI / 180;
  const φ2 = lat2 * Math.PI / 180;
  const Δφ = (lat2 - lat1) * Math.PI / 180;
  const Δλ = (lon2 - lon1) * Math.PI / 180;

  const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) *
    Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c; // Distância em metros
}

// Exportar para uso global
if (typeof window !== 'undefined') {
  window.geolocationService = {
    isAvailable,
    getCurrentPosition,
    watchPosition,
    clearWatch,
    getLastKnownPosition,
    checkPermission,
    requestPermission,
    formatLocation,
    calculateDistance
  };
}
