// API Service - Comunicação com o backend de flashcards (auth + sync)
// Base URL: https://flashcard-api-chi.vercel.app

const API_BASE = typeof window !== 'undefined' && window.API_BASE_URL
  ? window.API_BASE_URL
  : 'https://flashcard-api-chi.vercel.app';

const STORAGE_KEYS = {
  ACCESS_TOKEN: 'api_access_token',
  REFRESH_TOKEN: 'api_refresh_token',
  USER: 'api_user'
};

function getAccessToken() {
  return localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
}

function getRefreshToken() {
  return localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);
}

function getStoredUser() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.USER);
    return raw ? JSON.parse(raw) : null;
  } catch (_) {
    return null;
  }
}

function setTokens(accessToken, refreshToken, user) {
  if (accessToken) localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, accessToken);
  if (refreshToken) localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, refreshToken);
  if (user) localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
}

function clearTokens() {
  localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
  localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
  localStorage.removeItem(STORAGE_KEYS.USER);
}

function isLoggedIn() {
  return !!getAccessToken();
}

function authHeaders() {
  const token = getAccessToken();
  return token ? { Authorization: 'Bearer ' + token } : {};
}

async function refreshAccessToken() {
  const refreshToken = getRefreshToken();
  if (!refreshToken) {
    clearTokens();
    return false;
  }
  try {
    const res = await fetch(API_BASE + '/api/auth/refresh', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken })
    });
    if (!res.ok) {
      clearTokens();
      return false;
    }
    const data = await res.json();
    if (data.accessToken) {
      localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, data.accessToken);
      return true;
    }
    clearTokens();
    return false;
  } catch (_) {
    clearTokens();
    return false;
  }
}

async function request(method, path, body, options = {}) {
  const url = path.startsWith('http') ? path : API_BASE + path;
  const headers = {
    'Content-Type': 'application/json',
    ...authHeaders()
  };
  const config = { method, headers };
  if (body != null && method !== 'GET') config.body = JSON.stringify(body);

  let res = await fetch(url, config);

  if (res.status === 401 && getRefreshToken() && !options._retry) {
    const refreshed = await refreshAccessToken();
    if (refreshed) {
      headers.Authorization = 'Bearer ' + getAccessToken();
      res = await fetch(url, { ...config, headers });
    }
  }

  return res;
}

async function register(email, password, name) {
  try {
    const res = await request('POST', '/api/auth/register', { email, password, name: name || '' });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      return { success: false, error: data.message || data.error || 'Erro ao registrar.' };
    }
    if (data.user && data.accessToken && data.refreshToken) {
      setTokens(data.accessToken, data.refreshToken, data.user);
      return { success: true, user: data.user, accessToken: data.accessToken, refreshToken: data.refreshToken };
    }
    return { success: false, error: 'Resposta inválida do servidor.' };
  } catch (e) {
    return { success: false, error: e.message || 'Erro de conexão.' };
  }
}

async function login(email, password) {
  try {
    const res = await request('POST', '/api/auth/login', { email, password });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      return { success: false, error: data.message || data.error || 'Email ou senha incorretos.' };
    }
    if (data.user && data.accessToken && data.refreshToken) {
      setTokens(data.accessToken, data.refreshToken, data.user);
      return { success: true, user: data.user, accessToken: data.accessToken, refreshToken: data.refreshToken };
    }
    return { success: false, error: 'Resposta inválida do servidor.' };
  } catch (e) {
    return { success: false, error: e.message || 'Erro de conexão.' };
  }
}

async function logout() {
  try {
    const refreshToken = getRefreshToken();
    if (refreshToken) {
      await request('POST', '/api/auth/logout', { refreshToken });
    }
  } catch (_) {}
  clearTokens();
  return { success: true };
}

async function getMe() {
  try {
    const res = await request('GET', '/api/auth/me');
    if (res.status === 401) {
      clearTokens();
      return { success: false, error: 'Não autorizado.' };
    }
    const data = await res.json().catch(() => ({}));
    if (!res.ok) return { success: false, error: data.message || data.error || 'Erro ao obter perfil.' };
    return { success: true, user: data.user };
  } catch (e) {
    return { success: false, error: e.message || 'Erro de conexão.' };
  }
}

async function getSync() {
  try {
    const res = await request('GET', '/api/sync');
    if (res.status === 401) {
      clearTokens();
      return { success: false, error: 'Não autorizado.' };
    }
    const data = await res.json().catch(() => ({}));
    if (!res.ok) return { success: false, error: data.message || data.error || 'Erro ao carregar dados.' };
    const rawDecks = data.decks || [];
    const decks = rawDecks.map(d => ({
      id: d.id,
      name: d.name,
      cards: (d.cards || []).map(c => ({
        id: c.id,
        kanji: c.kanji,
        reading: c.reading,
        meaning: c.meaning,
        interval: c.interval ?? 0,
        nextReview: c.nextReview ?? c.next_review ?? Date.now(),
        easeFactor: c.easeFactor ?? c.ease_factor ?? 2.5,
        tags: Array.isArray(c.tags) ? c.tags : [],
        reviewHistory: c.reviewHistory || c.review_history || [],
        qualityHistory: c.qualityHistory || c.quality_history || []
      }))
    }));
    return { success: true, data: { decks, tags: data.tags || [], lastSync: data.lastSync } };
  } catch (e) {
    return { success: false, error: e.message || 'Erro de conexão.' };
  }
}

async function updateProfile(data) {
  try {
    const body = {};
    if (data.name !== undefined) body.name = data.name;
    if (data.email !== undefined) body.email = data.email;
    if (Object.keys(body).length === 0) return { success: true, user: getStoredUser() };
    const res = await request('PATCH', '/api/users/me', body);
    if (res.status === 401) {
      clearTokens();
      return { success: false, error: 'Não autorizado.' };
    }
    const json = await res.json().catch(() => ({}));
    if (!res.ok) return { success: false, error: json.message || json.error || 'Erro ao atualizar perfil.' };
    const user = json.user || { ...getStoredUser(), ...body };
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
    return { success: true, user };
  } catch (e) {
    return { success: false, error: e.message || 'Erro de conexão.' };
  }
}

async function updatePassword(currentPassword, newPassword) {
  try {
    const res = await request('PATCH', '/api/users/me/password', { currentPassword, newPassword });
    if (res.status === 401) {
      clearTokens();
      return { success: false, error: 'Não autorizado.' };
    }
    const data = await res.json().catch(() => ({}));
    if (!res.ok) return { success: false, error: data.message || data.error || 'Erro ao alterar senha.' };
    return { success: true };
  } catch (e) {
    return { success: false, error: e.message || 'Erro de conexão.' };
  }
}

async function updateUserData(userData) {
  try {
    const body = {
      decks: userData.decks || [],
      tags: userData.tags || []
    };
    const res = await request('PUT', '/api/sync', body);
    if (res.status === 401) {
      clearTokens();
      return { success: false, error: 'Não autorizado.' };
    }
    const data = await res.json().catch(() => ({}));
    if (!res.ok) return { success: false, error: data.message || data.error || 'Erro ao salvar.' };
    return { success: true, lastSync: data.lastSync };
  } catch (e) {
    return { success: false, error: e.message || 'Erro de conexão.' };
  }
}

if (typeof window !== 'undefined') {
  window.apiService = {
    API_BASE,
    getAccessToken,
    getRefreshToken,
    getStoredUser,
    setTokens,
    clearTokens,
    isLoggedIn,
    authHeaders,
    refreshAccessToken,
    request,
    register,
    login,
    logout,
    getMe,
    getSync,
    updateUserData,
    updateProfile,
    updatePassword
  };
}
