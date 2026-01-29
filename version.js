// Versão do aplicativo NihonGo Deck
// Formato: X.XX (ex: 1.01, 1.02, ..., 1.99, 2.00, etc.)
const APP_VERSION = '1.06';

// Tornar disponível globalmente
if (typeof window !== 'undefined') {
  window.APP_VERSION = APP_VERSION;
}
