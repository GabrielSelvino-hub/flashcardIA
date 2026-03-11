/**
 * Serviço de efeitos sonoros com Howler.js.
 * Exposto em window.soundService para uso no app (play, setMuted, setVolume).
 */
(function () {
  if (typeof window === 'undefined' || !window.Howl) {
    window.soundService = {
      play: function () {},
      setMuted: function () {},
      setVolume: function () {},
      isMuted: function () { return true; }
    };
    return;
  }

  const baseUrl = (typeof window !== 'undefined' && window.API_BASE_URL)
    ? window.API_BASE_URL.replace(/\/$/, '')
    : (typeof location !== 'undefined' ? location.origin : '');
  const STORAGE_KEY = 'sound_muted';

  const soundUrls = {
    correct: baseUrl + '/sounds/correct.mp3',
    wrong: baseUrl + '/sounds/error.mp3',
    flip: [
      baseUrl + '/sounds/card-flip-01.mp3',
      baseUrl + '/sounds/card-flip-02.mp3'
    ]
  };

  let muted = false;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored !== null) muted = stored === 'true';
  } catch (_) {}

  const sounds = {};
  function getHowl(id, url) {
    const key = url ? id + '_' + url : id;
    if (!sounds[key]) {
      const src = url || soundUrls[id];
      if (!src) return null;
      const urls = Array.isArray(src) ? src : [src];
      try {
        sounds[key] = new window.Howl({ src: urls, volume: 0.6 });
      } catch (_) {
        return null;
      }
    }
    return sounds[key];
  }

  function play(id) {
    if (muted) return;
    if (id === 'flip' && Array.isArray(soundUrls.flip)) {
      const urls = soundUrls.flip;
      const url = urls[Math.floor(Math.random() * urls.length)];
      const howl = getHowl('flip', url);
      if (howl) {
        try {
          howl.stop();
          howl.play();
        } catch (_) {}
      }
      return;
    }
    const howl = getHowl(id);
    if (howl) {
      try {
        howl.stop();
        howl.play();
      } catch (_) {}
    }
  }

  function setMuted(value) {
    muted = !!value;
    try {
      localStorage.setItem(STORAGE_KEY, String(muted));
    } catch (_) {}
  }

  function setVolume(value) {
    const v = Math.max(0, Math.min(1, value));
    Object.keys(sounds).forEach(function (id) {
      try {
        sounds[id].volume(v);
      } catch (_) {}
    });
  }

  function isMuted() {
    return muted;
  }

  window.soundService = {
    play: play,
    setMuted: setMuted,
    setVolume: setVolume,
    isMuted: isMuted
  };
})();
