const { useState, useEffect, useRef } = React;

// Componentes de Ícones SVG (substituindo lucide-react)
const Icon = ({ children, size = 20, className = "", ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
    {children}
  </svg>
);

const Plus = ({ size, className }) => <Icon size={size} className={className}><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></Icon>;
const Brain = ({ size, className }) => <Icon size={size} className={className}><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44l-2.32-4.64a2.5 2.5 0 0 1 1.07-3.36l.78-.39A2.5 2.5 0 0 1 9.5 2Z"/><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44l2.32-4.64a2.5 2.5 0 0 0-1.07-3.36l-.78-.39A2.5 2.5 0 0 0 14.5 2Z"/></Icon>;
const Download = ({ size, className }) => <Icon size={size} className={className}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></Icon>;
const Upload = ({ size, className }) => <Icon size={size} className={className}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></Icon>;
const Trash2 = ({ size, className }) => <Icon size={size} className={className}><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></Icon>;
const Moon = ({ size, className }) => <Icon size={size} className={className}><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></Icon>;
const Sun = ({ size, className }) => <Icon size={size} className={className}><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></Icon>;
const ChevronLeft = ({ size, className }) => <Icon size={size} className={className}><polyline points="15 18 9 12 15 6"/></Icon>;
const Play = ({ size, className, fill }) => <Icon size={size} className={className}><polygon points="5 3 19 12 5 21 5 3" fill={fill || "none"}/></Icon>;
const RefreshCw = ({ size, className }) => <Icon size={size} className={className}><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M8 16H3v5"/></Icon>;
const Eye = ({ size, className }) => <Icon size={size} className={className}><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></Icon>;
const EyeOff = ({ size, className }) => <Icon size={size} className={className}><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></Icon>;
const RotateCw = ({ size, className }) => <Icon size={size} className={className}><path d="M21 2v6h-6"/><path d="M21 8a10 10 0 1 1-3-7.7L14 6"/></Icon>;
const X = ({ size, className }) => <Icon size={size} className={className}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></Icon>;
const AlertCircle = ({ size, className }) => <Icon size={size} className={className}><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></Icon>;
const Sparkles = ({ size, className }) => <Icon size={size} className={className}><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/><path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/></Icon>;
const Check = ({ size, className }) => <Icon size={size} className={className}><polyline points="20 6 9 17 4 12"/></Icon>;
const Award = ({ size, className }) => <Icon size={size} className={className}><circle cx="12" cy="8" r="6"/><polyline points="9 12 2 22 12 20 22 22 15 12"/></Icon>;
const Settings = ({ size, className }) => <Icon size={size} className={className}><path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></Icon>;
const List = ({ size, className }) => <Icon size={size} className={className}><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></Icon>;
const Grid = ({ size, className }) => <Icon size={size} className={className}><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></Icon>;
const Keyboard = ({ size, className }) => <Icon size={size} className={className}><rect x="2" y="4" width="20" height="16" rx="2" ry="2"/><line x1="6" y1="8" x2="8" y2="8"/><line x1="10" y1="8" x2="12" y2="8"/><line x1="14" y1="8" x2="16" y2="8"/><line x1="18" y1="8" x2="18" y2="8"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="16" x2="12" y2="16"/></Icon>;
const Edit = ({ size, className }) => <Icon size={size} className={className}><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></Icon>;
const History = ({ size, className }) => <Icon size={size} className={className}><path d="M3 3v5h5"/><path d="M3 8a10 10 0 1 1 3 7.7"/><path d="M12 8v4l2 2"/></Icon>;
const Tag = ({ size, className }) => <Icon size={size} className={className}><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><circle cx="7" cy="7" r="1.5"/></Icon>;
const Search = ({ size, className }) => <Icon size={size} className={className}><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></Icon>;
const Filter = ({ size, className }) => <Icon size={size} className={className}><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></Icon>;
const ArrowLeft = ({ size, className }) => <Icon size={size} className={className}><path d="M19 12H5M12 19l-7-7 7-7"/></Icon>;
const Flame = ({ size, className }) => <Icon size={size} className={className}><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></Icon>;
const Zap = ({ size, className }) => <Icon size={size} className={className}><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></Icon>;
const Layers = ({ size, className }) => <Icon size={size} className={className}><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/></Icon>;
const Target = ({ size, className }) => <Icon size={size} className={className}><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></Icon>;
const Pencil = ({ size, className }) => <Icon size={size} className={className}><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></Icon>;
const MessageCircle = ({ size, className }) => <Icon size={size} className={className}><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/></Icon>;
const BarChart2 = ({ size, className }) => <Icon size={size} className={className}><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></Icon>;
const XCircle = ({ size, className }) => <Icon size={size} className={className}><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></Icon>;
const ChevronDown = ({ size, className }) => <Icon size={size} className={className}><path d="m6 9 6 6 6-6"/></Icon>;
const User = ({ size, className }) => <Icon size={size} className={className}><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></Icon>;
const Mail = ({ size, className }) => <Icon size={size} className={className}><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></Icon>;
const Lock = ({ size, className }) => <Icon size={size} className={className}><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></Icon>;

// --- DUO DESIGN: BASE COMPONENTS ---
const DuoButton = ({ children, variant = 'primary', className = '', fullWidth = false, disabled, ...props }) => {
  const variants = {
    primary: 'bg-[#58cc02] border-[#46a302] text-white hover:bg-[#61e002]',
    secondary: 'bg-[#1cb0f6] border-[#1899d6] text-white hover:bg-[#20c4ff]',
    outline: 'bg-white border-[#e5e5e5] text-[#afafaf] border-b-2 active:border-b-2 dark:bg-[#1b2c35] dark:border-[#37464f] dark:text-white',
    danger: 'bg-[#ff4b4b] border-[#d33131] text-white',
    warning: 'bg-[#ff9600] border-[#e18600] text-white',
    indigo: 'bg-[#5844ed] border-[#4636be] text-white',
    white: 'bg-white border-[#e5e5e5] text-[#4b4b4b] border-b-4 active:border-b-2 dark:bg-[#1b2c35] dark:border-[#37464f] dark:text-white',
  };
  const is3D = !['outline'].includes(variant);
  return (
    <button
      className={`px-6 py-3 rounded-2xl font-black uppercase tracking-wider text-sm transition-all active:translate-y-1 active:border-b-0 disabled:opacity-50 disabled:cursor-not-allowed disabled:active:translate-y-0
        ${is3D ? 'border-b-4' : 'border-2'}
        ${variants[variant] || variants.primary}
        ${fullWidth ? 'w-full' : ''}
        ${className}
        flex items-center justify-center gap-2 select-none`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

const DuoCard = ({ children, className = '', active = false, interactive = false, ...props }) => (
  <div className={`bg-white dark:bg-[#1b2c35] border-2 rounded-2xl transition-all p-4
    ${active ? 'border-[#84d8ff] bg-[#ddf4ff] dark:bg-blue-900/20' : 'border-[#e5e5e5] dark:border-[#37464f] shadow-sm'}
    ${interactive ? 'active:translate-y-0.5 cursor-pointer' : ''}
    ${className}`}
    {...props}>
    {children}
  </div>
);

const ProgressBar = ({ progress, color = '#58cc02' }) => (
  <div className="h-4 w-full bg-[#e5e5e5] dark:bg-[#37464f] rounded-full overflow-hidden">
    <div
      className="h-full transition-all duration-1000 rounded-full"
      style={{ width: `${Math.min(100, Math.max(0, progress))}%`, backgroundColor: color, boxShadow: 'inset 0 -4px 0 rgba(0,0,0,0.1)' }}
    />
  </div>
);

// --- DATA STRUCTURES & HELPERS ---

const generateId = () => Math.random().toString(36).substr(2, 9);

// Função para embaralhar array (Fisher-Yates Shuffle)
const shuffleArray = (array) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

const INITIAL_DECKS = [
  {
    id: 'demo-deck-1',
    name: 'JLPT N5 Básico',
    cards: [
      { id: 'c1', kanji: '私', reading: 'わたし', meaning: 'Eu', interval: 0, nextReview: Date.now() },
      { id: 'c2', kanji: '学生', reading: 'がくせい', meaning: 'Estudante', interval: 0, nextReview: Date.now() },
      { id: 'c3', kanji: '先生', reading: 'せんせい', meaning: 'Professor', interval: 0, nextReview: Date.now() },
    ]
  }
];

// --- COMPONENT: CARD DISPLAY (JAPANESE FOCUSED) ---
const KanjiCard = ({ kanji, reading, meaning, showBack, size = 'normal', furiganaMode = 'always' }) => {
  const textSize = size === 'large' ? 'text-6xl' : 'text-2xl';
  const rubySize = size === 'large' ? 'text-xl' : 'text-xs';
  const showFurigana = furiganaMode === 'always' || showBack;

  return (
    <div className="flex flex-col items-center justify-center text-center p-4 w-full">
      <div className={`${textSize} font-bold mb-4 font-sans text-gray-800 dark:text-gray-100 transition-all duration-300`}>
        <ruby>
          {kanji}
          <rt 
            className={`${rubySize} text-gray-500 dark:text-gray-400 font-normal transition-opacity duration-300 ${showFurigana ? 'opacity-100' : 'opacity-0'}`}
            style={{ userSelect: showFurigana ? 'auto' : 'none' }}
          >
            {reading}
          </rt>
        </ruby>
      </div>
      
      {showBack && (
        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700 w-full">
          <p className="text-xl text-blue-600 dark:text-blue-400 font-medium">{meaning}</p>
        </div>
      )}
    </div>
  );
};

// --- DUO MODAL (rounded, border-t, font-black) ---
const Modal = ({ isOpen, onClose, title, children, maxWidthClass = 'max-w-sm' }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/60 backdrop-blur-sm safe-top safe-bottom safe-left safe-right">
      <div className={`bg-white dark:bg-[#131f24] w-full ${maxWidthClass} rounded-[40px] overflow-hidden shadow-2xl border-t-4 border-[#e5e5e5] dark:border-[#37464f] animate-in slide-in-from-bottom-20`}>
        <div className="px-6 pt-6 pb-2 flex justify-between items-center">
          <h3 className="font-black text-xl uppercase tracking-tighter text-[#4b4b4b] dark:text-white">{title}</h3>
          <button onClick={onClose} className="p-2 text-[#afafaf] hover:text-[#4b4b4b] dark:hover:text-white touch-target rounded-2xl">
            <X size={24} />
          </button>
        </div>
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

// --- UX MOBILE COMPONENTS ---

// Indicador de Status Online/Offline (estilo Duo: paleta e tipografia)
const OfflineIndicator = ({ isOnline, pendingCount = 0 }) => {
  if (isOnline && pendingCount === 0) return null;
  return (
    <div
      className="fixed top-0 left-0 right-0 max-w-md mx-auto z-40 safe-top text-white text-center py-2 px-4 text-sm font-black uppercase tracking-wider shadow-md"
      style={{ backgroundColor: !isOnline ? '#ff4b4b' : '#1cb0f6' }}
    >
      {!isOnline ? (
        <span>Sem conexão — Modo offline</span>
      ) : pendingCount > 0 ? (
        <span>{pendingCount} item(s) pendente(s) de sincronização</span>
      ) : null}
    </div>
  );
};

// Status de Sincronização
const SyncStatus = ({ isSyncing, lastSync, onSync }) => {
  const formatTime = (timestamp) => {
    if (!timestamp) return 'Nunca';
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now - date;
    const minutes = Math.floor(diff / 60000);
    if (minutes < 1) return 'Agora';
    if (minutes < 60) return `${minutes}min atrás`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h atrás`;
    const days = Math.floor(hours / 24);
    return `${days}d atrás`;
  };

  return (
    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
      {isSyncing ? (
        <>
          <RefreshCw size={16} className="animate-spin" />
          <span>Sincronizando...</span>
        </>
      ) : (
        <>
          <span>Última sync: {formatTime(lastSync)}</span>
          {onSync && (
            <button
              onClick={onSync}
              className="ml-2 px-3 py-1 bg-blue-500 text-white rounded touch-target text-xs"
              disabled={isSyncing}
            >
              Sincronizar
            </button>
          )}
        </>
      )}
    </div>
  );
};

// Notificação de Atualização do App (estilo Duo: bordas, DuoButtons)
const UpdateNotification = ({ onUpdate, onDismiss }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto z-50 bg-white dark:bg-[#1b2c35] border-t-2 border-[#e5e5e5] dark:border-[#37464f] p-4 shadow-[0_-4px_12px_rgba(0,0,0,0.08)] dark:shadow-[0_-4px_12px_rgba(0,0,0,0.3)] safe-bottom safe-left safe-right">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex-1">
          <p className="font-black text-[#4b4b4b] dark:text-white uppercase tracking-tighter">Nova versão disponível!</p>
          <p className="text-sm font-bold text-[#afafaf] dark:text-zinc-400 mt-1">Atualize para obter as últimas melhorias.</p>
        </div>
        <div className="flex gap-3">
          <DuoButton variant="outline" onClick={onDismiss} className="shrink-0">Depois</DuoButton>
          <DuoButton variant="primary" onClick={onUpdate} className="shrink-0">Atualizar</DuoButton>
        </div>
      </div>
    </div>
  );
};

// --- TELA DE LOGIN FULL-SCREEN (estilo Nihongo Deck) ---
const LoginView = ({ onBack, onLoginSuccess, showAlert }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isRegister, setIsRegister] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!email.trim() || !password) {
      setError('Preencha e-mail e senha.');
      return;
    }
    if (isRegister && password.length < 6) {
      setError('Senha deve ter no mínimo 6 caracteres.');
      return;
    }
    if (!window.apiService) {
      setError('Serviço não carregado. Recarregue a página.');
      return;
    }
    setLoading(true);
    try {
      const result = isRegister
        ? await window.apiService.register(email.trim(), password, name.trim())
        : await window.apiService.login(email.trim(), password);
      if (result.success) {
        onLoginSuccess(result.user);
        onBack();
      } else {
        setError(result.error || 'Erro ao entrar.');
      }
    } catch (err) {
      setError(err.message || 'Erro de conexão.');
    } finally {
      setLoading(false);
    }
  };

  const green = '#5ACD00';
  const blue = '#00AEEF';
  const inputClass = 'w-full bg-[#F3F4F6] dark:bg-[#1b2c35] border-none rounded-2xl py-4 pl-12 pr-4 text-gray-700 dark:text-white placeholder:text-gray-400 focus:ring-2 focus:ring-[#5ACD00] outline-none transition-all font-medium';

  return (
    <div className="min-h-screen bg-white dark:bg-[#131f24] flex flex-col items-center justify-center p-6 font-sans select-none safe-top safe-bottom">
      <button onClick={onBack} className="absolute top-4 left-4 p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-white" aria-label="Voltar">
        <ArrowLeft size={28} strokeWidth={3} />
      </button>

      <div className="w-full max-w-sm flex flex-col items-center">
        {/* Logo NihonGo! deck e balão ようこそ — ícone em 2x para tela nítida */}
        <div className="relative mb-6 flex justify-center">
          <img
            src="./icon-384.png"
            srcSet="./icon-192.png 1x, ./icon-384.png 2x, ./icon-512.png 3x"
            alt="NihonGo Deck"
            className="w-24 h-24 rounded-[28px] shadow-lg shadow-green-200 dark:shadow-none object-contain bg-[#58cc02]/10"
          />
          <div className="absolute left-1/2 top-0 ml-12 sm:ml-14 bg-white dark:bg-[#1b2c35] px-3 py-1.5 rounded-2xl shadow-md border border-gray-100 dark:border-[#37464f] flex items-center gap-1 whitespace-nowrap">
            <span className="text-xs font-bold text-gray-700 dark:text-gray-200">ようこそ!</span>
            <span className="text-xs">✍️</span>
          </div>
        </div>

        <h1 className="text-[#5ACD00] text-2xl sm:text-3xl font-black tracking-wider mb-1 text-center whitespace-nowrap">NIHONGO DECK</h1>
        <p className="text-gray-400 dark:text-gray-500 text-sm font-medium mb-10 text-center">Aprenda japonês do jeito viciante</p>

        <form onSubmit={handleSubmit} className="w-full space-y-4">
          {error && <p className="text-sm font-bold text-[#ff4b4b] text-center">{error}</p>}

          <div className="relative group">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <Mail size={20} className="text-gray-400 group-focus-within:text-[#5ACD00] transition-colors" />
            </div>
            <input type="email" placeholder="E-mail" className={inputClass} value={email} onChange={(e) => setEmail(e.target.value)} required autoComplete="email" />
          </div>

          {isRegister && (
            <div className="relative group">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                <User size={20} className="text-gray-400 group-focus-within:text-[#5ACD00] transition-colors" />
              </div>
              <input type="text" placeholder="Nome (opcional)" className={inputClass} value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" />
            </div>
          )}

          <div className="relative group">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <Lock size={20} className="text-gray-400 group-focus-within:text-[#5ACD00] transition-colors" />
            </div>
            <input type="password" placeholder={isRegister ? 'Mínimo 6 caracteres' : 'Senha'} className={inputClass} value={password} onChange={(e) => setPassword(e.target.value)} required autoComplete={isRegister ? 'new-password' : 'current-password'} />
          </div>

          {!isRegister && (
            <div className="flex justify-end pr-1">
              <button type="button" className="text-[#00AEEF] text-[11px] font-black hover:underline tracking-tight" onClick={() => showAlert('Entre em contato para redefinir a senha.')}>ESQUECEU A SENHA?</button>
            </div>
          )}

          <button type="submit" disabled={loading} className="w-full bg-[#5ACD00] hover:bg-[#4eb300] text-white font-black py-4 rounded-2xl shadow-lg shadow-green-100 dark:shadow-none transition-all active:scale-[0.98] mt-2 tracking-widest disabled:opacity-70">
            {loading ? <span className="flex items-center justify-center gap-2"><RefreshCw size={20} className="animate-spin" /> Aguarde...</span> : (isRegister ? 'CADASTRAR' : 'ENTRAR')}
          </button>
        </form>

        <div className="w-full flex items-center my-8">
          <div className="flex-grow h-[1px] bg-gray-200 dark:bg-[#37464f]" />
          <span className="px-4 text-[10px] font-bold text-gray-400 tracking-widest">OU USE</span>
          <div className="flex-grow h-[1px] bg-gray-200 dark:bg-[#37464f]" />
        </div>

        <button type="button" disabled className="w-full flex items-center justify-center gap-3 bg-white dark:bg-[#1b2c35] border border-gray-100 dark:border-[#37464f] rounded-2xl py-3 shadow-sm opacity-60 cursor-not-allowed">
          <span className="text-gray-500 dark:text-gray-400 font-bold text-xs tracking-wider">CONTINUAR COM GOOGLE (em breve)</span>
        </button>

        <div className="mt-20 text-xs font-bold text-gray-400 dark:text-gray-500 tracking-tight">
          {isRegister ? 'Já tem conta? ' : 'Ainda não tem conta? '}
          <button type="button" className="text-[#00AEEF] hover:underline font-black" onClick={() => { setIsRegister(!isRegister); setError(''); }}>
            {isRegister ? 'ENTRAR' : 'CADASTRE-SE'}
          </button>
        </div>
      </div>
    </div>
  );
};

// --- MAIN APP COMPONENT ---
function App() {
  // State
  const [decks, setDecks] = useState(() => {
    const saved = localStorage.getItem('nihongo_decks');
    return saved ? JSON.parse(saved) : INITIAL_DECKS;
  });
  
  const [view, setView] = useState(() => {
    try {
      if (typeof window !== 'undefined' && window.apiService && window.apiService.isLoggedIn()) return 'home';
    } catch (_) {}
    return 'login';
  });
  const [activeDeckId, setActiveDeckId] = useState(null);
  const [theme, setTheme] = useState('dark');
  const [reviewQueue, setReviewQueue] = useState([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [generatorPrompt, setGeneratorPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [furiganaMode, setFuriganaMode] = useState('always');
  const [showApiKeyModal, setShowApiKeyModal] = useState(false);
  const [apiKeyModalDueToError, setApiKeyModalDueToError] = useState(false);
  const [apiKeyInput, setApiKeyInput] = useState('');
  const [cardsCount, setCardsCount] = useState(5);
  const [showSettingsMenu, setShowSettingsMenu] = useState(false);
  const [cardViewMode, setCardViewMode] = useState('list'); // 'list' ou 'grid'

  // Test States
  const [testMode, setTestMode] = useState(null); // 'translation' | 'reading' | null
  const [testQueue, setTestQueue] = useState([]);
  const [testCurrentIndex, setTestCurrentIndex] = useState(0);
  const [testScore, setTestScore] = useState({ correct: 0, wrong: 0 });
  const [testOptions, setTestOptions] = useState([]);
  const [testSelectedAnswer, setTestSelectedAnswer] = useState(null);
  const [testShowResult, setTestShowResult] = useState(false);
  const [testCompleted, setTestCompleted] = useState(false);
  const [testPassed, setTestPassed] = useState(false);
  const [testQuestionsCount, setTestQuestionsCount] = useState(10); // 10 até o total de cards do baralho

  // Modal States
  const [modalConfig, setModalConfig] = useState({ type: null, data: null });
  const [tempInput, setTempInput] = useState('');
  const [notesInput, setNotesInput] = useState('');

  // JSONBin Sync States
  const [jsonbinBinId, setJsonbinBinId] = useState(() => 
    localStorage.getItem('jsonbin_bin_id') || ''
  );
  const [isSyncing, setIsSyncing] = useState(false);
  const [jsonbinBinIdInput, setJsonbinBinIdInput] = useState('');
  const [showBinIdModal, setShowBinIdModal] = useState(false);
  const [binIdModalMode, setBinIdModalMode] = useState('insert'); // 'insert' ou 'edit'

  // API Auth States (backend flashcard-api)
  const [apiUser, setApiUser] = useState(() => {
    try {
      return (typeof window !== 'undefined' && window.apiService && window.apiService.getStoredUser()) || null;
    } catch (_) {
      return null;
    }
  });
  const skipNextAutoSync = useRef(false);
  const hasLoadedFromApi = useRef(false); // true após o primeiro getSync aplicar dados
  const authCheckedOnMount = useRef(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState('login'); // 'login' | 'register'
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [authName, setAuthName] = useState('');
  const [authError, setAuthError] = useState('');
  const [authLoading, setAuthLoading] = useState(false);
  const [showEditProfileModal, setShowEditProfileModal] = useState(false);
  const [editProfileName, setEditProfileName] = useState('');
  const [editProfileEmail, setEditProfileEmail] = useState('');
  const [editProfileCurrentPassword, setEditProfileCurrentPassword] = useState('');
  const [editProfileNewPassword, setEditProfileNewPassword] = useState('');
  const [editProfileConfirmPassword, setEditProfileConfirmPassword] = useState('');
  const [editProfileError, setEditProfileError] = useState('');
  const [editProfileLoading, setEditProfileLoading] = useState(false);

  // Writing Mode States
  const [reviewMode, setReviewMode] = useState('visual'); // 'visual' | 'writing'
  const [writingInput, setWritingInput] = useState('');
  const [writingResult, setWritingResult] = useState(null); // null | 'correct' | 'wrong'
  const [writingAnswerType, setWritingAnswerType] = useState('meaning'); // 'meaning' | 'reading'

  // Edit Card States
  const [editingCard, setEditingCard] = useState(null);
  const [editCardForm, setEditCardForm] = useState({ kanji: '', reading: '', meaning: '' });
  
  // Add Card States
  const [newCardForm, setNewCardForm] = useState({ kanji: '', reading: '', meaning: '' });

  // Tags States
  const [availableTags, setAvailableTags] = useState(() => {
    const saved = localStorage.getItem('nihongo_tags');
    return saved ? JSON.parse(saved) : [];
  });
  const [tagFilter, setTagFilter] = useState('all'); // 'all' or specific tag
  const [newTagInput, setNewTagInput] = useState('');

  // Search and Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all'); // 'all', 'new', 'due', 'mastered'
  const [sortBy, setSortBy] = useState('default'); // 'default', 'kanji', 'created', 'nextReview'

  // Dev Mode States
  const [devCustomCount, setDevCustomCount] = useState(10);
  const [devLogs, setDevLogs] = useState([]);

  // UX Mobile States
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [pendingSyncCount, setPendingSyncCount] = useState(0);
  const [showUpdateNotification, setShowUpdateNotification] = useState(false);
  const [swRegistration, setSwRegistration] = useState(null);
  const [lastSyncTime, setLastSyncTime] = useState(() => 
    localStorage.getItem('last_sync_time') || null
  );

  // Push Notifications States
  const [pushEnabled, setPushEnabled] = useState(false);
  const [pushPermission, setPushPermission] = useState('default');
  const [pushLoading, setPushLoading] = useState(false);

  // App Version State
  const [appVersion, setAppVersion] = useState(() => {
    return window.APP_VERSION || '1.01';
  });

  // Dev Mode Functions
  const isDevMode = () => {
    return localStorage.getItem('dev') === 'true';
  };

  // Effects
  useEffect(() => {
    // Debounce para evitar salvar a cada mudança e causar re-renders
    const timeoutId = setTimeout(() => {
      localStorage.setItem('nihongo_decks', JSON.stringify(decks));
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [decks]);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  // Validar token ao montar e forçar login se não logado
  useEffect(() => {
    if (authCheckedOnMount.current || typeof window === 'undefined' || !window.apiService) return;
    authCheckedOnMount.current = true;
    (async () => {
      if (!window.apiService.isLoggedIn()) {
        setView('login');
        setApiUser(null);
        return;
      }
      const result = await window.apiService.getMe();
      if (result.success && result.user) {
        setApiUser(result.user);
        setView('home');
      } else {
        setApiUser(null);
        setView('login');
      }
    })();
  }, []);

  // Guard: redirecionar para login se não estiver logado ao sair da tela de login
  useEffect(() => {
    if (typeof window === 'undefined' || !window.apiService) return;
    if (view !== 'login' && !window.apiService.isLoggedIn()) {
      setApiUser(null);
      setView('login');
    }
  }, [view, apiUser]);

  // Ao abrir a tela Editar perfil, preencher formulário com dados do usuário
  useEffect(() => {
    if (view === 'edit-profile' && apiUser) {
      setEditProfileName(apiUser.name || '');
      setEditProfileEmail(apiUser.email || '');
      setEditProfileCurrentPassword('');
      setEditProfileNewPassword('');
      setEditProfileConfirmPassword('');
      setEditProfileError('');
    }
  }, [view, apiUser]);

  // Quando estiver logado na API, carregar baralhos e tags da API preservando reviewHistory local (estatísticas)
  useEffect(() => {
    if (!apiUser || !window.apiService || !window.apiService.isLoggedIn()) return;
    let cancelled = false;
    (async () => {
      try {
        const result = await window.apiService.getSync();
        if (cancelled) return;
        hasLoadedFromApi.current = true;
        if (!result.success || !result.data) return;
        const decksFromApi = result.data.decks || [];
        const tagsFromApi = result.data.tags || [];
        skipNextAutoSync.current = true;
        setDecks(prev => {
          const merged = decksFromApi.map(apiDeck => {
            const localDeck = prev.find(d => d.id === apiDeck.id);
            const cards = (apiDeck.cards || []).map(apiCard => {
              const localCard = localDeck?.cards?.find(c => c.id === apiCard.id);
              const reviewHistory = (localCard?.reviewHistory?.length ? localCard.reviewHistory : apiCard.reviewHistory) || [];
              const qualityHistory = (localCard?.qualityHistory?.length ? localCard.qualityHistory : apiCard.qualityHistory) || [];
              return { ...apiCard, reviewHistory, qualityHistory };
            });
            return { ...apiDeck, cards };
          });
          return merged;
        });
        setAvailableTags(tagsFromApi);
        localStorage.setItem('nihongo_tags', JSON.stringify(tagsFromApi));
        if (result.data.lastSync) {
          setLastSyncTime(result.data.lastSync);
          localStorage.setItem('last_sync_time', result.data.lastSync);
        }
      } catch (_) {}
    })();
    return () => { cancelled = true; };
  }, [apiUser]);

  // Sincronização automática com a API quando logado: envia decks/tags após alterações (debounce)
  useEffect(() => {
    if (!apiUser || !window.apiService || !window.apiService.isLoggedIn()) return;
    if (!hasLoadedFromApi.current) return; // esperar o primeiro carregamento da API
    if (skipNextAutoSync.current) {
      skipNextAutoSync.current = false;
      return;
    }
    const timer = setTimeout(async () => {
      try {
        const payload = { decks, tags: availableTags };
        const result = await window.apiService.updateUserData(payload);
        if (result.success && result.lastSync) {
          setLastSyncTime(result.lastSync);
          localStorage.setItem('last_sync_time', result.lastSync);
        }
      } catch (_) {}
    }, 1500);
    return () => clearTimeout(timer);
  }, [apiUser, decks, availableTags]);

  useEffect(() => {
    // Verifica se a chave API já foi salva
    const savedApiKey = localStorage.getItem('gemini_api_key');
    if (!savedApiKey) {
      setShowApiKeyModal(true);
    }
  }, []);

  // Monitorar status online/offline e sincronizar (API ou JSONBin)
  const canSync = jsonbinBinId || (typeof window !== 'undefined' && window.apiService && window.apiService.isLoggedIn());
  useEffect(() => {
    const handleOnline = async () => {
      setIsOnline(true);
      console.log('Conexão restaurada');
      
      if (window.syncManager && canSync) {
        try {
          const result = await window.syncManager.syncAll();
          if (result.success && result.synced > 0) {
            showAlert(`${result.synced} item(s) sincronizado(s) com sucesso!`);
            setPendingSyncCount(0);
            setLastSyncTime(new Date().toISOString());
            localStorage.setItem('last_sync_time', new Date().toISOString());
          }
        } catch (error) {
          console.error('Erro na sincronização:', error);
        }
      }
    };
    
    const handleOffline = () => {
      setIsOnline(false);
      console.log('Sem conexão');
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    const updatePendingCount = async () => {
      if (window.offlineStorage) {
        const count = await window.offlineStorage.getPendingCount();
        setPendingSyncCount(count);
      }
    };

    updatePendingCount();
    const interval = setInterval(updatePendingCount, 30000);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      clearInterval(interval);
    };
  }, [jsonbinBinId, apiUser]);

  // Registrar Service Worker e detectar atualizações
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')
        .then((registration) => {
          setSwRegistration(registration);
          console.log('Service Worker registrado:', registration.scope);

          // Detectar atualizações — forçar reload para usuário sempre usar versão nova
          registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing;
            if (newWorker) {
              newWorker.addEventListener('statechange', () => {
                if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                  // Forçar atualização: ativar novo SW e recarregar
                  const onControllerChange = () => {
                    navigator.serviceWorker.removeEventListener('controllerchange', onControllerChange);
                    window.location.reload();
                  };
                  navigator.serviceWorker.addEventListener('controllerchange', onControllerChange);
                  if (registration.waiting) {
                    registration.waiting.postMessage({ type: 'SKIP_WAITING' });
                  }
                }
              });
            }
          });

          // Verificar atualizações periodicamente
          setInterval(() => {
            registration.update();
          }, 60000); // A cada minuto

          // Escutar mensagens do service worker sobre atualizações de versão
          navigator.serviceWorker.addEventListener('message', (event) => {
            if (event.data && event.data.type === 'VERSION_UPDATE') {
              console.log('Nova versão detectada:', event.data.version);
              // Forçar reload imediato
              window.location.reload();
            }
          });
        })
        .catch((error) => {
          console.error('Erro ao registrar Service Worker:', error);
        });
    }

    // Verificar versão periodicamente
    const checkVersion = async () => {
      try {
        const response = await fetch('/version.js', { cache: 'no-store' });
        const text = await response.text();
        const match = text.match(/const\s+APP_VERSION\s*=\s*['"]([^'"]+)['"]/);
        const currentVersion = match ? match[1] : null;
        
        if (currentVersion && currentVersion !== appVersion) {
          console.log(`Nova versão detectada: ${appVersion} -> ${currentVersion}`);
          // Solicitar verificação ao service worker
          if (navigator.serviceWorker.controller) {
            navigator.serviceWorker.controller.postMessage({ type: 'CHECK_VERSION' });
          }
          // Forçar reload
          window.location.reload();
        }
      } catch (error) {
        console.error('Erro ao verificar versão:', error);
      }
    };

    // Verificar versão a cada 30 segundos
    const versionInterval = setInterval(checkVersion, 30000);
    
    // Verificar imediatamente ao carregar
    checkVersion();

    return () => {
      clearInterval(versionInterval);
    };
  }, [appVersion]);

  // Handler para atualizar app
  const handleUpdateApp = () => {
    if (swRegistration && swRegistration.waiting) {
      swRegistration.waiting.postMessage({ type: 'SKIP_WAITING' });
      window.location.reload();
    }
  };

  // Verificar status de push notifications
  useEffect(() => {
    const checkPushStatus = async () => {
      if (window.pushService) {
        const permissionStatus = await window.pushService.getPermissionStatus();
        setPushPermission(permissionStatus.status);
        
        const isSub = await window.pushService.isSubscribed();
        setPushEnabled(isSub);
      }
    };
    
    checkPushStatus();
  }, []);

  // Handler para ativar/desativar push
  const handleTogglePush = async () => {
    if (!window.pushService) {
      showAlert('Serviço de push não disponível');
      return;
    }

    setPushLoading(true);

    try {
      if (pushEnabled) {
        // Desativar
        const result = await window.pushService.unsubscribe();
        if (result.success) {
          setPushEnabled(false);
          showAlert('Notificações push desativadas');
        } else {
          showAlert(`Erro ao desativar: ${result.error}`);
        }
      } else {
        // Ativar
        const userId = jsonbinBinId || 'anonymous';
        const result = await window.pushService.subscribe(userId);
        if (result.success) {
          setPushEnabled(true);
          setPushPermission('granted');
          showAlert('Notificações push ativadas!');
        } else {
          showAlert(`Erro ao ativar: ${result.error}`);
        }
      }
    } catch (error) {
      console.error('Erro ao alternar push:', error);
      showAlert('Erro ao alternar notificações push');
    } finally {
      setPushLoading(false);
    }
  };

  // Keyboard Shortcuts
  useEffect(() => {
    const handleKeyPress = (e) => {
      // Ignora se estiver digitando em um input
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
        return;
      }

      // Atalhos na view de revisão
      if (view === 'review' && reviewQueue.length > 0) {
        if (e.key === ' ') {
          e.preventDefault();
          if (!showAnswer) {
            setShowAnswer(true);
          }
        } else if (showAnswer) {
          if (e.key === '0' || e.key === 'Numpad0') {
            e.preventDefault();
            processReview(0);
          } else if (e.key === '1' || e.key === 'Numpad1') {
            e.preventDefault();
            processReview(1);
          } else if (e.key === '2' || e.key === 'Numpad2') {
            e.preventDefault();
            processReview(2);
          }
        }
      }

      // Atalhos na view de escrita
      if (view === 'writing-review' && reviewQueue.length > 0) {
        if (e.key === 'Enter' && writingInput.trim() && !writingResult) {
          e.preventDefault();
          checkWritingAnswer();
        } else if (e.key === 'Enter' && writingResult) {
          e.preventDefault();
          if (writingResult === 'wrong') {
            processReview(0);
          }
          setWritingInput('');
          setWritingResult(null);
          if (currentCardIndex < reviewQueue.length - 1) {
            setCurrentCardIndex(prev => prev + 1);
          } else {
            showAlert('Sessão de revisão concluída!');
            setView('deck');
          }
        }
      }

      // Atalhos na view de teste
      if (view === 'test' && testOptions.length > 0) {
        if (!testShowResult) {
          if (e.key === '1' || e.key === 'Numpad1') {
            e.preventDefault();
            handleTestAnswer(testOptions[0]);
          } else if (e.key === '2' || e.key === 'Numpad2') {
            e.preventDefault();
            handleTestAnswer(testOptions[1]);
          }
        } else if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          const maxErrors = Math.floor(testQueue.length * 0.4);
          if (testScore.wrong < maxErrors && testCurrentIndex < testQueue.length - 1) {
            nextTestQuestion();
          }
        }
      }

      // Escape para voltar
      if (e.key === 'Escape') {
        if (view === 'review' || view === 'writing-review' || view === 'test') {
          setView('deck');
        } else if (view !== 'home') {
          setView('home');
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [view, reviewQueue, showAnswer, currentCardIndex, writingInput, writingResult, testOptions, testShowResult, testCurrentIndex, testScore]);

  // Modal Helpers
  const closeModal = () => {
    setModalConfig({ type: null, data: null });
    setTempInput('');
    setNotesInput('');
    setNewCardForm({ kanji: '', reading: '', meaning: '' });
  };

  const showAlert = (message) => {
    setModalConfig({ type: 'alert', data: { message } });
  };

  const showConfirm = (message, onConfirm) => {
    setModalConfig({ type: 'confirm', data: { message, onConfirm } });
  };

  const showPrompt = () => {
    setTempInput('');
    setModalConfig({ type: 'create_deck', data: null });
  };

  const showAddCardModal = () => {
    setNewCardForm({ kanji: '', reading: '', meaning: '' });
    setModalConfig({ type: 'add_card', data: null });
  };

  const showNotesToCardsModal = () => {
    setNotesInput('');
    setModalConfig({ type: 'notes_to_cards', data: null });
  };

  const saveNewCard = () => {
    if (!newCardForm.kanji.trim() || !newCardForm.reading.trim() || !newCardForm.meaning.trim()) {
      showAlert('Por favor, preencha todos os campos (Kanji, Leitura e Significado).');
      return;
    }

    if (!activeDeckId) {
      showAlert('Nenhum baralho selecionado.');
      return;
    }

    addCardsToActiveDeck([{
      kanji: newCardForm.kanji.trim(),
      reading: newCardForm.reading.trim(),
      meaning: newCardForm.meaning.trim()
    }]);

    showAlert('Card adicionado com sucesso!');
    closeModal();
  };

  const startEditCard = (card) => {
    setEditingCard(card);
    setEditCardForm({ kanji: card.kanji, reading: card.reading, meaning: card.meaning });
    setNewTagInput('');
    setModalConfig({ type: 'edit_card', data: null });
  };

  const saveEditedCard = () => {
    if (!editCardForm.kanji.trim() || !editCardForm.reading.trim() || !editCardForm.meaning.trim()) {
      showAlert('Por favor, preencha todos os campos.');
      return;
    }

    if (!editingCard) return;

    setDecks(prevDecks => prevDecks.map(d => {
      if (d.id === activeDeckId) {
        return {
          ...d,
          cards: d.cards.map(c => 
            c.id === editingCard.id 
              ? { ...c, kanji: editCardForm.kanji.trim(), reading: editCardForm.reading.trim(), meaning: editCardForm.meaning.trim() }
              : c
          )
        };
      }
      return d;
    }));

    setEditingCard(null);
    setEditCardForm({ kanji: '', reading: '', meaning: '' });
    closeModal();
    showAlert('Card editado com sucesso!');
  };

  const resetCardProgress = (cardId) => {
    showConfirm('Tem certeza que deseja resetar o progresso deste card? O intervalo e data de revisão serão resetados.', () => {
      const timestamp = Date.now();
      setDecks(prevDecks => prevDecks.map(d => {
        if (d.id === activeDeckId) {
          return {
            ...d,
            cards: d.cards.map(c => 
              c.id === cardId 
                ? { 
                    ...c, 
                    interval: 0, 
                    easeFactor: 2.5,
                    repetitions: 0,
                    nextReview: timestamp,
                    lastReview: timestamp,
                    qualityHistory: [],
                    reviewHistory: []
                  }
                : c
            )
          };
        }
        return d;
      }));
      closeModal();
      showAlert('Progresso do card resetado!');
    });
  };

  const saveApiKey = () => {
    if (apiKeyInput.trim()) {
      localStorage.setItem('gemini_api_key', apiKeyInput.trim());
      setShowApiKeyModal(false);
      setApiKeyModalDueToError(false);
      setApiKeyInput('');
      showAlert('Chave API salva com sucesso!');
    }
  };

  const openApiKeyModalDueToError = () => {
    localStorage.removeItem('gemini_api_key');
    setApiKeyModalDueToError(true);
    setApiKeyInput('');
    setShowApiKeyModal(true);
  };

  // Actions
  const createDeck = (name) => {
    const newDeck = { 
      id: generateId(), 
      name, 
      cards: [],
      createdAt: new Date().toISOString()
    };

    setDecks([...decks, newDeck]);
    closeModal();
  };

  const deleteDeck = (id) => {
    showConfirm('Tem certeza que deseja excluir este baralho? Esta ação não pode ser desfeita.', () => {
      setDecks(decks.filter(d => d.id !== id));
      if (activeDeckId === id) setView('home');
      closeModal();
    });
  };

  const addCardsToActiveDeck = (newCardsData) => {
    setDecks(prevDecks => prevDecks.map(d => {
      if (d.id === activeDeckId) {
        const timestamp = Date.now();
        
        // Função auxiliar para normalizar e comparar cards
        const normalizeCard = (card) => ({
          kanji: (card.kanji || '').trim().toLowerCase(),
          reading: (card.reading || '').trim().toLowerCase(),
          meaning: (card.meaning || '').trim().toLowerCase()
        });
        
        // Verifica quais cards já existem no baralho
        const existingCardsNormalized = d.cards.map(normalizeCard);
        
        // Filtra cards duplicados
        const uniqueCardsData = newCardsData.filter(newCard => {
          const normalized = normalizeCard(newCard);
          return !existingCardsNormalized.some(existing => 
            existing.kanji === normalized.kanji &&
            existing.reading === normalized.reading &&
            existing.meaning === normalized.meaning
          );
        });
        
        // Cria os cards únicos
        const cardsToAdd = uniqueCardsData.map((data, index) => ({
          id: `${timestamp}-${index}-${Math.random().toString(36).substr(2, 5)}`,
          ...data,
          interval: 0,
          easeFactor: 2.5,
          repetitions: 0,
          nextReview: timestamp,
          lastReview: timestamp,
          qualityHistory: [],
          reviewHistory: [],
          tags: data.tags || [],
          createdAt: timestamp
        }));
        
        return {
          ...d,
          cards: [...d.cards, ...cardsToAdd]
        };
      }
      return d;
    }));
  };

  // Tags functions
  const addTagToCard = (cardId, tag) => {
    if (!tag.trim()) return;
    const tagLower = tag.trim().toLowerCase();
    
    setDecks(prevDecks => prevDecks.map(d => {
      if (d.id === activeDeckId) {
        return {
          ...d,
          cards: d.cards.map(c => 
            c.id === cardId 
              ? { ...c, tags: [...(c.tags || []), tagLower].filter((t, i, arr) => arr.indexOf(t) === i) }
              : c
          )
        };
      }
      return d;
    }));

    // Adiciona tag à lista de tags disponíveis
    if (!availableTags.includes(tagLower)) {
      const newTags = [...availableTags, tagLower].sort();
      setAvailableTags(newTags);
      localStorage.setItem('nihongo_tags', JSON.stringify(newTags));
    }
  };

  const removeTagFromCard = (cardId, tag) => {
    setDecks(prevDecks => prevDecks.map(d => {
      if (d.id === activeDeckId) {
        return {
          ...d,
          cards: d.cards.map(c => 
            c.id === cardId 
              ? { ...c, tags: (c.tags || []).filter(t => t !== tag) }
              : c
          )
        };
      }
      return d;
    }));
  };

  // Importar JSON da versão antiga: normaliza formato e salva direto na API (migração única)
  const handleImport = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const raw = JSON.parse(event.target.result);
        // Formato antigo: array de decks [ { id, name, cards: [ { id, kanji, reading, meaning, interval, nextReview, easeFactor?, ... } ] } ]
        let decksOld = Array.isArray(raw) ? raw : (raw.cards ? [raw] : []);
        const tagsSet = new Set();
        const normalizedDecks = decksOld.map((d) => {
          const deckId = d.id || 'deck_' + generateId();
          const cards = (d.cards || []).map((c) => {
            const tags = Array.isArray(c.tags) ? c.tags : [];
            tags.forEach((t) => t && tagsSet.add(t));
            return {
              id: c.id || 'c_' + generateId(),
              kanji: c.kanji ?? '',
              reading: c.reading ?? '',
              meaning: c.meaning ?? '',
              interval: typeof c.interval === 'number' ? c.interval : 0,
              nextReview: c.nextReview ?? Date.now(),
              easeFactor: typeof c.easeFactor === 'number' ? c.easeFactor : 2.5,
              tags,
            };
          });
          return { id: deckId, name: d.name || 'Sem nome', cards };
        });
        const tagsArray = Array.from(tagsSet).filter(Boolean).sort();
        setDecks(normalizedDecks);
        setAvailableTags(tagsArray);
        localStorage.setItem('nihongo_decks', JSON.stringify(normalizedDecks));
        localStorage.setItem('nihongo_tags', JSON.stringify(tagsArray));
        if (window.apiService && window.apiService.isLoggedIn()) {
          const result = await window.apiService.updateUserData({ decks: normalizedDecks, tags: tagsArray });
          if (result.success) {
            if (result.lastSync) {
              setLastSyncTime(result.lastSync);
              localStorage.setItem('last_sync_time', result.lastSync);
            }
            showAlert(`Importação concluída!\n\n${normalizedDecks.length} baralho(s) e ${normalizedDecks.reduce((s, d) => s + (d.cards?.length || 0), 0)} card(s) foram salvos na sua conta.`);
          } else {
            showAlert('Dados importados localmente, mas falha ao salvar na nuvem: ' + (result.error || ''));
          }
        } else {
          showAlert('Importação concluída localmente. Faça login para sincronizar na nuvem.');
        }
      } catch (err) {
        showAlert('Erro ao importar: ' + (err.message || 'formato inválido. Use o JSON da versão antiga.'));
      }
      if (e.target) e.target.value = '';
    };
    reader.readAsText(file);
  };

  const handleExportAll = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(decks));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "meus_baralhos_nihongo.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  const handleExportDeck = (deck) => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(deck));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", `${deck.name.replace(/\s+/g, '_')}.json`);
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  // Função para fazer merge inteligente de decks e cards
  const mergeDecksAndCards = (localDecks, cloudDecks) => {
    if (!cloudDecks || !Array.isArray(cloudDecks) || cloudDecks.length === 0) {
      return localDecks || [];
    }
    
    if (!localDecks || !Array.isArray(localDecks) || localDecks.length === 0) {
      return cloudDecks;
    }

    // Cria um mapa de decks locais por ID
    const localDecksMap = new Map();
    localDecks.forEach(deck => {
      localDecksMap.set(deck.id, { ...deck });
    });

    // Processa cada deck da nuvem
    cloudDecks.forEach(cloudDeck => {
      const localDeck = localDecksMap.get(cloudDeck.id);
      
      if (!localDeck) {
        // Deck não existe localmente, adiciona completo da nuvem
        localDecksMap.set(cloudDeck.id, { ...cloudDeck });
      } else {
        // Deck existe em ambos, faz merge dos cards
        const localCardsMap = new Map();
        (localDeck.cards || []).forEach(card => {
          localCardsMap.set(card.id, { ...card });
        });

        // Adiciona cards da nuvem que não existem localmente
        (cloudDeck.cards || []).forEach(cloudCard => {
          if (!localCardsMap.has(cloudCard.id)) {
            // Card não existe localmente, adiciona da nuvem
            localCardsMap.set(cloudCard.id, { ...cloudCard });
          } else {
            // Card existe em ambos, mantém o mais recente baseado em lastReview ou createdAt
            const localCard = localCardsMap.get(cloudCard.id);
            const localTime = localCard.lastReview || localCard.createdAt || 0;
            const cloudTime = cloudCard.lastReview || cloudCard.createdAt || 0;
            
            // Se o card da nuvem for mais recente, substitui
            if (cloudTime > localTime) {
              localCardsMap.set(cloudCard.id, { ...cloudCard });
            }
            // Caso contrário, mantém o local (já está no mapa)
          }
        });

        // Atualiza o deck com os cards mesclados
        localDecksMap.set(cloudDeck.id, {
          ...localDeck,
          name: cloudDeck.name || localDeck.name, // Usa o nome mais recente da nuvem
          cards: Array.from(localCardsMap.values())
        });
      }
    });

    // Retorna array de decks mesclados
    return Array.from(localDecksMap.values());
  };

  // Função para fazer merge de tags
  const mergeTags = (localTags, cloudTags) => {
    if (!cloudTags || !Array.isArray(cloudTags) || cloudTags.length === 0) {
      return localTags || [];
    }
    
    if (!localTags || !Array.isArray(localTags) || localTags.length === 0) {
      return cloudTags;
    }

    // Combina tags únicas (remove duplicatas)
    const tagsSet = new Set([...localTags, ...cloudTags]);
    return Array.from(tagsSet).filter(tag => tag && tag.trim());
  };

  // API Auth Handlers
  const handleLogin = async () => {
    if (!authEmail.trim() || !authPassword) {
      setAuthError('Preencha email e senha.');
      return;
    }
    setAuthLoading(true);
    setAuthError('');
    try {
      const result = window.apiService ? await window.apiService.login(authEmail.trim(), authPassword) : { success: false, error: 'Serviço não carregado.' };
      if (result.success) {
        setApiUser(result.user);
        setShowAuthModal(false);
        setAuthEmail('');
        setAuthPassword('');
        setAuthName('');
        setAuthError('');
      } else {
        setAuthError(result.error || 'Erro ao entrar.');
      }
    } catch (e) {
      setAuthError(e.message || 'Erro ao entrar.');
    } finally {
      setAuthLoading(false);
    }
  };

  const handleRegister = async () => {
    if (!authEmail.trim() || !authPassword) {
      setAuthError('Preencha email e senha.');
      return;
    }
    if (authPassword.length < 6) {
      setAuthError('Senha deve ter no mínimo 6 caracteres.');
      return;
    }
    setAuthLoading(true);
    setAuthError('');
    try {
      const result = window.apiService ? await window.apiService.register(authEmail.trim(), authPassword, authName.trim()) : { success: false, error: 'Serviço não carregado.' };
      if (result.success) {
        setApiUser(result.user);
        setShowAuthModal(false);
        setAuthEmail('');
        setAuthPassword('');
        setAuthName('');
        setAuthError('');
        showAlert('Conta criada com sucesso!');
      } else {
        setAuthError(result.error || 'Erro ao registrar.');
      }
    } catch (e) {
      setAuthError(e.message || 'Erro ao registrar.');
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogout = () => {
    if (window.apiService) window.apiService.logout();
    setApiUser(null);
    setShowAuthModal(false);
    setAuthError('');
    setView('login');
    setShowSettingsMenu(false);
  };

  const openAuthModal = (mode) => {
    setAuthMode(mode || 'login');
    setAuthError('');
    setAuthEmail('');
    setAuthPassword('');
    setAuthName('');
    setShowAuthModal(true);
  };

  const closeAuthModal = () => {
    setShowAuthModal(false);
    setAuthError('');
    setAuthEmail('');
    setAuthPassword('');
    setAuthName('');
  };

  // JSONBin / API Sync Functions
  const saveData = async () => {
    const useApi = typeof window !== 'undefined' && window.apiService && window.apiService.isLoggedIn();

    if (useApi) {
      try {
        const decksData = localStorage.getItem('nihongo_decks');
        const tagsData = localStorage.getItem('nihongo_tags');
        let decks = [];
        let tags = [];
        try { decks = decksData ? JSON.parse(decksData) : []; } catch (_) {}
        try { tags = tagsData ? JSON.parse(tagsData) : []; } catch (_) {}
        const result = await window.apiService.updateUserData({ decks, tags });
        if (result.success) {
          setLastSyncTime(result.lastSync || new Date().toISOString());
          localStorage.setItem('last_sync_time', result.lastSync || new Date().toISOString());
          return { success: true };
        }
        showAlert(`Erro ao salvar na nuvem: ${result.error}`);
        return { success: false };
      } catch (e) {
        showAlert(`Erro ao salvar dados: ${e.message}`);
        return { success: false };
      }
    }

    if (!window.jsonbinService) {
      showAlert('Serviço JSONBin não carregado. Recarregue a página.');
      return { success: false };
    }
    if (!jsonbinBinId) {
      showAlert('Faça login ou configure o ID de usuário primeiro.');
      return { success: false };
    }

    try {
      const decksData = localStorage.getItem('nihongo_decks');
      const tagsData = localStorage.getItem('nihongo_tags');
      let decks = [];
      let tags = [];
      try { decks = decksData ? JSON.parse(decksData) : []; } catch (e) { console.error('Erro ao parsear decks:', e); }
      try { tags = tagsData ? JSON.parse(tagsData) : []; } catch (e) { console.error('Erro ao parsear tags:', e); }
      const syncData = { decks, tags, lastSync: new Date().toISOString() };

      const result = await window.jsonbinService.updateUserData(jsonbinBinId, null, syncData);

      if (!result.success) {
        let errorMessage = result.error;
        if (errorMessage.includes('não encontrado') || errorMessage.includes('404') || errorMessage.includes('banco de dados')) {
          const createResult = await window.jsonbinService.createSharedBin(null, { [jsonbinBinId]: syncData });
          if (createResult.success) {
            showAlert(`Banco de dados criado!\n\n${decks.length} baralho(s) e ${tags.length} tag(s) foram salvos na nuvem.`);
            return { success: true };
          }
          showAlert(`Erro ao criar banco: ${createResult.error}`);
          return { success: false };
        }
        if (errorMessage.includes('Master Key')) errorMessage = `Erro de autenticação: ${errorMessage}`;
        showAlert(`Erro ao salvar: ${errorMessage}`);
        return { success: false };
      }
      return { success: true };
    } catch (error) {
      showAlert(`Erro ao salvar dados: ${error.message}`);
      return { success: false };
    }
  };

  const loadData = async () => {
    const useApi = typeof window !== 'undefined' && window.apiService && window.apiService.isLoggedIn();

    if (useApi) {
      try {
        const result = await window.apiService.getSync();
        if (!result.success) {
          showAlert(`Erro ao carregar: ${result.error}`);
          return { success: false };
        }
        const { decks: cloudDecks, tags: cloudTags } = result.data || {};
        const hasDecks = Array.isArray(cloudDecks) && cloudDecks.length > 0;
        const hasTags = Array.isArray(cloudTags) && cloudTags.length > 0;
        if (!hasDecks && !hasTags) {
          showAlert('Não há dados salvos na nuvem. Os dados locais serão mantidos.');
          return { success: true };
        }
        if (hasDecks) {
          localStorage.setItem('nihongo_decks', JSON.stringify(cloudDecks));
          setDecks(cloudDecks);
        }
        if (hasTags) {
          localStorage.setItem('nihongo_tags', JSON.stringify(cloudTags));
          setAvailableTags(cloudTags);
        }
        if (hasDecks) showAlert(`Dados carregados!\n\n${cloudDecks.length} baralho(s) sincronizado(s).`);
        return { success: true };
      } catch (e) {
        showAlert(`Erro ao carregar dados: ${e.message}`);
        return { success: false };
      }
    }

    if (!window.jsonbinService) {
      showAlert('Serviço JSONBin não carregado. Recarregue a página.');
      return { success: false };
    }
    if (!jsonbinBinId) {
      showAlert('Faça login ou configure o ID de usuário primeiro.');
      return { success: false };
    }

    try {
      const result = await window.jsonbinService.getUserData(jsonbinBinId, null);
      if (!result.success) {
        showAlert(`Erro ao carregar: ${result.error}`);
        return { success: false };
      }
      const cloudData = result.data;
      if (!cloudData) {
        showAlert(`Usuário "${jsonbinBinId}" não encontrado no banco.\n\nOs dados locais serão mantidos.`);
        return { success: true };
      }
      const hasDecks = cloudData.decks && Array.isArray(cloudData.decks) && cloudData.decks.length > 0;
      const hasTags = cloudData.tags && Array.isArray(cloudData.tags) && cloudData.tags.length > 0;
      if (!hasDecks && !hasTags) {
        showAlert('Nenhum dado na nuvem. Os dados locais serão mantidos.');
        return { success: true };
      }
      if (hasDecks) {
        localStorage.setItem('nihongo_decks', JSON.stringify(cloudData.decks));
        setDecks(cloudData.decks);
      }
      if (hasTags) {
        localStorage.setItem('nihongo_tags', JSON.stringify(cloudData.tags));
        setAvailableTags(cloudData.tags);
      }
      if (hasDecks) showAlert(`Dados carregados!\n\n${cloudData.decks.length} baralho(s) sincronizado(s).`);
      return { success: true };
    } catch (error) {
      showAlert(`Erro ao carregar dados: ${error.message}`);
      return { success: false };
    }
  };

  const syncData = async () => {
    if (isSyncing) return;

    const useApi = typeof window !== 'undefined' && window.apiService && window.apiService.isLoggedIn();

    setIsSyncing(true);
    try {
      const decksData = localStorage.getItem('nihongo_decks');
      const tagsData = localStorage.getItem('nihongo_tags');
      let localDecks = [];
      let localTags = [];
      try { localDecks = decksData ? JSON.parse(decksData) : []; } catch (_) {}
      try { localTags = tagsData ? JSON.parse(tagsData) : []; } catch (_) {}

      let cloudDecks = [];
      let cloudTags = [];

      if (useApi) {
        const cloudResult = await window.apiService.getSync();
        if (!cloudResult.success) {
          showAlert(`Erro ao carregar da nuvem: ${cloudResult.error}`);
          setIsSyncing(false);
          return;
        }
        const data = cloudResult.data || {};
        cloudDecks = data.decks || [];
        cloudTags = data.tags || [];
      } else {
        if (!window.jsonbinService) {
          showAlert('Serviço não carregado. Recarregue a página.');
          setIsSyncing(false);
          return;
        }
        if (!jsonbinBinId) {
          showAlert('Faça login ou configure o ID de usuário primeiro.');
          setIsSyncing(false);
          return;
        }
        const cloudResult = await window.jsonbinService.getUserData(jsonbinBinId, null);
        if (cloudResult.success && cloudResult.data) {
          cloudDecks = cloudResult.data.decks || [];
          cloudTags = cloudResult.data.tags || [];
        }
      }

      const mergedDecks = mergeDecksAndCards(localDecks, cloudDecks);
      const mergedTags = mergeTags(localTags, cloudTags);
      const mergedCardsCount = mergedDecks.reduce((sum, d) => sum + (d.cards?.length || 0), 0);
      const localCardsCount = localDecks.reduce((sum, d) => sum + (d.cards?.length || 0), 0);
      const cloudCardsCount = cloudDecks.reduce((sum, d) => sum + (d.cards?.length || 0), 0);

      localStorage.setItem('nihongo_decks', JSON.stringify(mergedDecks));
      localStorage.setItem('nihongo_tags', JSON.stringify(mergedTags));
      setDecks(mergedDecks);
      setAvailableTags(mergedTags);

      const payload = { decks: mergedDecks, tags: mergedTags, lastSync: new Date().toISOString() };

      if (useApi) {
        const saveResult = await window.apiService.updateUserData(payload);
        if (!saveResult.success) {
          showAlert(`Erro ao salvar na nuvem: ${saveResult.error}`);
          setIsSyncing(false);
          return;
        }
        if (saveResult.lastSync) {
          setLastSyncTime(saveResult.lastSync);
          localStorage.setItem('last_sync_time', saveResult.lastSync);
        }
      } else {
        const saveResult = await window.jsonbinService.updateUserData(jsonbinBinId, null, payload);
        if (!saveResult.success) {
          if (saveResult.error.includes('não encontrado') || saveResult.error.includes('404') || saveResult.error.includes('banco de dados')) {
            const createResult = await window.jsonbinService.createSharedBin(null, { [jsonbinBinId]: payload });
            if (!createResult.success) {
              showAlert(`Erro ao criar banco: ${createResult.error}`);
              setIsSyncing(false);
              return;
            }
          } else {
            showAlert(`Erro ao salvar na nuvem: ${saveResult.error}`);
            setIsSyncing(false);
            return;
          }
        }
      }

      const newCardsCount = mergedCardsCount - localCardsCount;
      let message = `✅ Sincronização concluída!\n\n📚 ${mergedDecks.length} baralho(s)\n🃏 ${mergedCardsCount} card(s) total\n🏷️ ${mergedTags.length} tag(s)\n`;
      if (newCardsCount > 0) message += `\n✨ ${newCardsCount} novo(s) card(s) da nuvem!`;
      else if (cloudCardsCount > 0 && localCardsCount > 0) message += `\n🔄 Dados locais e nuvem combinados.`;
      else if (cloudCardsCount === 0 && localCardsCount > 0) message += `\n📤 Dados locais enviados para a nuvem.`;
      showAlert(message);
    } catch (error) {
      console.error('Erro na sincronização:', error);
      showAlert(`Erro na sincronização: ${error.message}`);
    } finally {
      setIsSyncing(false);
    }
  };

  const createNewBin = async () => {
    if (isSyncing) return;

    if (!window.jsonbinService) {
      showAlert('Serviço JSONBin não carregado. Recarregue a página.');
      return;
    }

    // Gera um ID único para o usuário
    const newUserBinId = 'user_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now().toString(36);
    
    setIsSyncing(true);
    try {
      // Serializa dados atuais
      const decksData = localStorage.getItem('nihongo_decks');
      const tagsData = localStorage.getItem('nihongo_tags');
      
      let decks = [];
      let tags = [];
      
      try {
        decks = decksData ? JSON.parse(decksData) : [];
      } catch (e) {
        console.error('Erro ao parsear decks:', e);
        decks = [];
      }
      
      try {
        tags = tagsData ? JSON.parse(tagsData) : [];
      } catch (e) {
        console.error('Erro ao parsear tags:', e);
        tags = [];
      }
      
      const userData = {
        decks: decks,
        tags: tags,
        lastSync: new Date().toISOString()
      };

      // Salva os dados do novo usuário no banco compartilhado
      const result = await window.jsonbinService.updateUserData(newUserBinId, null, userData);

      if (!result.success) {
        // Se o banco não existe, tenta criar
        if (result.error.includes('404') || result.error.includes('não encontrado')) {
          const createResult = await window.jsonbinService.createSharedBin(null, {
            [newUserBinId]: userData
          });
          
          if (!createResult.success) {
            showAlert(`Erro ao criar banco de dados: ${createResult.error}`);
            setIsSyncing(false);
            return;
          }
        } else {
          showAlert(`Erro ao salvar dados: ${result.error}`);
          setIsSyncing(false);
          return;
        }
      }

      // Salva o ID do usuário
      setJsonbinBinId(newUserBinId);
      localStorage.setItem('jsonbin_bin_id', newUserBinId);
      showAlert(`ID de usuário criado com sucesso!\n\nSeu ID: ${newUserBinId}\n\nEste ID foi salvo automaticamente. Agora você pode sincronizar seus dados.`);
    } catch (error) {
      console.error('Erro ao criar ID de usuário:', error);
      showAlert(`Erro inesperado: ${error.message}\n\nVerifique o console para mais detalhes.`);
    } finally {
      setIsSyncing(false);
    }
  };

  const saveJsonbinBinId = async () => {
    if (!jsonbinBinIdInput.trim()) {
      showAlert('Por favor, digite um ID de usuário.');
      return;
    }

    const userBinId = jsonbinBinIdInput.trim();
    
    // Validação básica: apenas verifica se não está vazio
    if (userBinId.length < 3) {
      showAlert('O ID de usuário deve ter pelo menos 3 caracteres.');
      return;
    }

    // Salva o ID do usuário (não precisa verificar se existe, será criado automaticamente)
    setJsonbinBinId(userBinId);
    localStorage.setItem('jsonbin_bin_id', userBinId);
    setJsonbinBinIdInput('');
    setShowBinIdModal(false);
    showAlert(`ID de usuário salvo com sucesso!\n\nSeu ID: ${userBinId}\n\nAgora você pode sincronizar seus dados.`);
  };

  const openBinIdModal = (mode = 'insert') => {
    setBinIdModalMode(mode);
    if (mode === 'edit' && jsonbinBinId) {
      setJsonbinBinIdInput(jsonbinBinId);
    } else {
      setJsonbinBinIdInput('');
    }
    setShowBinIdModal(true);
  };

  // SRS Logic
  const startReview = (deckId, forceAll = false) => {
    const deck = decks.find(d => d.id === deckId);
    if (!deck || deck.cards.length === 0) {
       showAlert('Este baralho está vazio. Adicione cards primeiro.');
       return;
    }

    const now = Date.now();
    let cardsToReview = [];

    if (forceAll) {
      cardsToReview = [...deck.cards];
    } else {
      cardsToReview = deck.cards.filter(c => c.nextReview <= now);
    }
    
    if (cardsToReview.length === 0) {
      showConfirm("Sem revisões pendentes. Quer revisar todos os cards agora?", () => {
        setReviewQueue(shuffleArray([...deck.cards]));
        setCurrentCardIndex(0);
        setShowAnswer(false);
        setView('review');
        closeModal();
      });
      return;
    }
    
    setReviewQueue(shuffleArray(cardsToReview));
    setCurrentCardIndex(0);
    setShowAnswer(false);
    setReviewMode('visual');
    setWritingInput('');
    setWritingResult(null);
    setView('review');
  };

  const startQuickReview = (deckId, mode = 'all') => {
    const deck = decks.find(d => d.id === deckId);
    if (!deck || deck.cards.length === 0) {
      showAlert('Este baralho está vazio. Adicione cards primeiro.');
      return;
    }

    const now = Date.now();
    let cardsToReview = [];

    if (mode === 'errors') {
      // Cards com muitos erros (facilidade baixa)
      cardsToReview = deck.cards.filter(c => (c.easeFactor || 2.5) < 2.0);
      if (cardsToReview.length < 5) {
        cardsToReview = [...deck.cards].sort((a, b) => (a.easeFactor || 2.5) - (b.easeFactor || 2.5)).slice(0, 10);
      }
    } else if (mode === 'new') {
      cardsToReview = deck.cards.filter(c => c.interval === 0 && c.nextReview <= now);
    } else {
      cardsToReview = deck.cards.filter(c => c.nextReview <= now);
    }

    if (cardsToReview.length === 0) {
      cardsToReview = [...deck.cards].slice(0, 10);
    }

    setReviewQueue(shuffleArray(cardsToReview.slice(0, 20))); // Limita a 20 para revisão rápida
    setCurrentCardIndex(0);
    setShowAnswer(false);
    setReviewMode('visual');
    setView('quick-review');
  };

  const startWritingReview = (deckId, answerType = 'meaning', forceAll = false, questionCount = null) => {
    const deck = decks.find(d => d.id === deckId);
    if (!deck || deck.cards.length === 0) {
      showAlert('Este baralho está vazio. Adicione cards primeiro.');
      return;
    }

    const now = Date.now();
    let cardsToReview = [];

    if (forceAll) {
      const count = questionCount != null ? Math.min(Math.max(10, questionCount), deck.cards.length) : deck.cards.length;
      const shuffled = shuffleArray([...deck.cards]);
      cardsToReview = shuffled.slice(0, count);
    } else {
      cardsToReview = deck.cards.filter(c => c.nextReview <= now);
    }
    
    if (cardsToReview.length === 0) {
      showConfirm("Sem revisões pendentes. Quer revisar todos os cards agora?", () => {
        setReviewQueue(shuffleArray([...deck.cards]));
        setCurrentCardIndex(0);
        setReviewMode('writing');
        setWritingAnswerType(answerType);
        setWritingInput('');
        setWritingResult(null);
        setView('writing-review');
        closeModal();
      });
      return;
    }
    
    setReviewQueue(shuffleArray(cardsToReview));
    setCurrentCardIndex(0);
    setReviewMode('writing');
    setWritingAnswerType(answerType);
    setWritingInput('');
    setWritingResult(null);
    setView('writing-review');
  };

  // Função para normalizar texto (remove acentos, espaços, converte para minúsculas)
  const normalizeText = (text) => {
    return text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // Remove acentos
      .replace(/\s+/g, '') // Remove espaços
      .trim();
  };

  // Normalizar leitura em japonês (só trim e espaços; não alterar caracteres)
  const normalizeReading = (text) => {
    return (text || '').trim().replace(/\s+/g, '');
  };

  const checkWritingAnswer = () => {
    const card = reviewQueue[currentCardIndex];
    if (!card || !writingInput.trim()) return;

    const correctAnswer = writingAnswerType === 'meaning' ? card.meaning : card.reading;
    const userAnswer = writingInput.trim();
    
    // Normaliza para comparação conforme o tipo (português vs japonês)
    const normalizedCorrect = writingAnswerType === 'meaning' ? normalizeText(correctAnswer) : normalizeReading(correctAnswer);
    const normalizedUserMeaning = normalizeText(userAnswer);
    const normalizedUserReading = normalizeReading(userAnswer);
    
    // Correto se bater com a resposta esperada (significado ou leitura)
    let isCorrect = writingAnswerType === 'meaning'
      ? (normalizedCorrect === normalizedUserMeaning || normalizedCorrect.includes(normalizedUserMeaning) || normalizedUserMeaning.includes(normalizedCorrect))
      : (normalizedCorrect === normalizedUserReading || normalizedCorrect.includes(normalizedUserReading) || normalizedUserReading.includes(normalizedCorrect));
    
    // No modo "significado": também aceita a leitura em japonês como correta (teste de escrita em japonês)
    if (writingAnswerType === 'meaning' && !isCorrect) {
      const normalizedReading = normalizeReading(card.reading);
      isCorrect = normalizedReading === normalizedUserReading ||
                  normalizedReading.includes(normalizedUserReading) ||
                  normalizedUserReading.includes(normalizedReading);
    }

    setWritingResult(isCorrect ? 'correct' : 'wrong');
    
    // Se correto, processa a revisão automaticamente após 2s (mais tempo para ver feedback)
    if (isCorrect) {
      setTimeout(() => {
        processReview(2); // Qualidade 2 = sabe
        setWritingInput('');
        setWritingResult(null);
        if (currentCardIndex < reviewQueue.length - 1) {
          setCurrentCardIndex(prev => prev + 1);
        }
      }, 2000);
    }
  };

  const processReview = (quality) => {
    const currentCard = reviewQueue[currentCardIndex];
    const now = Date.now();
    
    // Initialize SM-2 variables with defaults for old cards
    let easeFactor = currentCard.easeFactor || 2.5;
    let repetitions = currentCard.repetitions || 0;
    let interval = currentCard.interval || 0;
    const qualityHistory = currentCard.qualityHistory || [];
    const reviewHistory = currentCard.reviewHistory || [];
    const lastReview = currentCard.lastReview || now;

    // SM-2 Algorithm
    // Quality: 0 = Não sei, 1 = Dúvida, 2 = Sei
    
    if (quality < 2) {
      // Failed or hard - reset
      repetitions = 0;
      interval = 0;
      easeFactor = Math.max(1.3, easeFactor - 0.15);
    } else {
      // Correct answer
      if (repetitions === 0) {
        interval = 1;
      } else if (repetitions === 1) {
        interval = 6;
      } else {
        interval = Math.round(interval * easeFactor);
      }
      repetitions += 1;
      easeFactor = easeFactor + (0.1 - (2 - quality) * (0.08 + (2 - quality) * 0.02));
      easeFactor = Math.max(1.3, easeFactor);
    }

    const nextReviewDate = now + (interval * 24 * 60 * 60 * 1000);
    const newQualityHistory = [...qualityHistory, quality].slice(-10); // Keep last 10 reviews
    
    // Add to review history
    const newReviewHistory = [...reviewHistory, {
      date: now,
      quality: quality,
      intervalBefore: currentCard.interval || 0,
      intervalAfter: interval,
      easeFactorBefore: currentCard.easeFactor || 2.5,
      easeFactorAfter: easeFactor
    }].slice(-20); // Keep last 20 reviews

    const updatedDecks = decks.map(d => {
      if (d.id === activeDeckId) {
        return {
          ...d,
          cards: d.cards.map(c => 
            c.id === currentCard.id 
              ? { 
                  ...c, 
                  interval: interval,
                  easeFactor: easeFactor,
                  repetitions: repetitions,
                  nextReview: nextReviewDate,
                  lastReview: now,
                  qualityHistory: newQualityHistory,
                  reviewHistory: newReviewHistory
                } 
              : c
          )
        };
      }
      return d;
    });
    setDecks(updatedDecks);

    if (currentCardIndex < reviewQueue.length - 1) {
      setCurrentCardIndex(prev => prev + 1);
      setShowAnswer(false);
    } else {
      showAlert('Sessão de revisão concluída!');
      setView('deck');
    }
  };

  // --- TEST LOGIC ---
  const startTest = (deckId, testType) => {
    const deck = decks.find(d => d.id === deckId);
    if (!deck) return;
    const count = Math.min(Math.max(10, testQuestionsCount), deck.cards.length);
    if (deck.cards.length < 10) {
      showAlert('Este baralho precisa ter pelo menos 10 cards para fazer um teste.');
      return;
    }

    // Seleciona N cards aleatórios (N = até o total de cards do baralho)
    const shuffled = shuffleArray([...deck.cards]);
    const selectedCards = shuffled.slice(0, count);
    
    setTestQueue(selectedCards);
    setTestCurrentIndex(0);
    setTestScore({ correct: 0, wrong: 0 });
    setTestMode(testType);
    setTestCompleted(false);
    setTestPassed(false);
    setTestShowResult(false);
    setTestSelectedAnswer(null);
    
    // Gera opções para o primeiro card
    const firstCard = selectedCards[0];
    const options = generateTestOptions(firstCard, deck.cards, testType);
    setTestOptions(options);
    
    setView('test');
  };

  const generateTestOptions = (card, allCards, testType) => {
    const correctAnswer = testType === 'translation' ? card.meaning : card.reading;
    
    // Encontra um distrator aleatório de outro card
    const otherCards = allCards.filter(c => c.id !== card.id);
    if (otherCards.length === 0) {
      // Fallback se não houver outros cards
      const wrongAnswer = testType === 'translation' ? 'Opção Incorreta' : 'あいうえお';
      return shuffleArray([correctAnswer, wrongAnswer]);
    }
    
    const randomOtherCard = otherCards[Math.floor(Math.random() * otherCards.length)];
    const wrongAnswer = testType === 'translation' ? randomOtherCard.meaning : randomOtherCard.reading;
    
    // Garante que o distrator seja diferente da resposta correta
    let distractor = wrongAnswer;
    let attempts = 0;
    while (distractor === correctAnswer && attempts < 10) {
      const anotherCard = otherCards[Math.floor(Math.random() * otherCards.length)];
      distractor = testType === 'translation' ? anotherCard.meaning : anotherCard.reading;
      attempts++;
    }
    
    return shuffleArray([correctAnswer, distractor]);
  };

  const handleTestAnswer = (selectedOption) => {
    if (testShowResult) return; // Já mostrou resultado, aguarda próximo
    
    const currentCard = testQueue[testCurrentIndex];
    const correctAnswer = testMode === 'translation' ? currentCard.meaning : currentCard.reading;
    const isCorrect = selectedOption === correctAnswer;
    
    setTestSelectedAnswer(selectedOption);
    setTestShowResult(true);
    
    // Atualiza score
    setTestScore(prev => {
      const newScore = {
        correct: isCorrect ? prev.correct + 1 : prev.correct,
        wrong: isCorrect ? prev.wrong : prev.wrong + 1
      };
      
      // Verifica se perdeu (40% ou mais erros) ou completou todas as questões
      const isLastQuestion = testCurrentIndex === testQueue.length - 1;
      const maxErrors = Math.floor(testQueue.length * 0.4);
      
      if (newScore.wrong >= maxErrors) {
        // Perdeu - vai direto para resultado após um pequeno delay
        setTimeout(() => {
          setTestCompleted(true);
          setTestPassed(false);
          setView('test-result');
        }, 1500);
      } else if (isLastQuestion) {
        // Completou todas as questões e passou
        setTimeout(() => {
          setTestCompleted(true);
          setTestPassed(true);
          setView('test-result');
        }, 1500);
      }
      
      return newScore;
    });
  };

  const nextTestQuestion = () => {
    // Se já perdeu (40% ou mais erros) ou completou, não deve chegar aqui
    const maxErrors = Math.floor(testQueue.length * 0.4);
    if (testScore.wrong >= maxErrors || testCurrentIndex >= testQueue.length - 1) {
      return;
    }
    
    // Próxima questão
    const nextIndex = testCurrentIndex + 1;
    setTestCurrentIndex(nextIndex);
    setTestShowResult(false);
    setTestSelectedAnswer(null);
    
    const nextCard = testQueue[nextIndex];
    const deck = decks.find(d => d.id === activeDeckId);
    const options = generateTestOptions(nextCard, deck.cards, testMode);
    setTestOptions(options);
  };

  const restartTest = () => {
    // Reinicia o mesmo teste (mesmos 10 kanjis)
    setTestCurrentIndex(0);
    setTestScore({ correct: 0, wrong: 0 });
    setTestCompleted(false);
    setTestPassed(false);
    setTestShowResult(false);
    setTestSelectedAnswer(null);
    
    // Gera opções para o primeiro card novamente
    const firstCard = testQueue[0];
    const deck = decks.find(d => d.id === activeDeckId);
    const options = generateTestOptions(firstCard, deck.cards, testMode);
    setTestOptions(options);
    
    setView('test');
  };

  // --- AI GENERATION LOGIC ---
  const handleGenerate = async (promptOverride = null, countOverride = null) => {
    const prompt = promptOverride || generatorPrompt;
    const count = countOverride || cardsCount;
    if (!prompt || !prompt.trim()) return;
    
    const apiKey = localStorage.getItem('gemini_api_key');
    if (!apiKey) {
      showAlert('Por favor, configure sua chave API do Gemini primeiro.');
      setShowApiKeyModal(true);
      return;
    }
    
    setIsGenerating(true);
    const promptText = `
      Gere um array JSON estrito contendo ${count} flashcards de vocabulário japonês focados no tema: "${prompt}".
      
      Regras de formato:
      1. A resposta deve ser APENAS um array JSON válido. Sem markdown (como \`\`\`json), sem texto adicional.
      2. Cada objeto do array deve ter estas chaves exatas:
         - "kanji": (O kanji ou palavra principal)
         - "reading": (A leitura em hiragana/katakana para o furigana)
         - "meaning": (O significado em português)
      
      Exemplo de resposta válida:
      [{"kanji": "猫", "reading": "ねこ", "meaning": "Gato"}, {"kanji": "犬", "reading": "いぬ", "meaning": "Cachorro"}]
    `;

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: promptText }] }]
          })
        }
      );

      if (!response.ok) {
        showAlert('Ocorreu um problema na API do Gemini. Insira uma nova chave abaixo.');
        openApiKeyModalDueToError();
        return;
      }

      const data = await response.json();
      const textResponse = data.candidates?.[0]?.content?.parts?.[0]?.text;

      if (!textResponse) throw new Error('Resposta vazia da IA');

      const jsonString = textResponse.replace(/```json\n?|```/g, '').trim();
      const newCards = JSON.parse(jsonString);

      if (Array.isArray(newCards) && newCards.length > 0) {
        addCardsToActiveDeck(newCards);
        showAlert(`Sucesso! ${newCards.length} novos cards sobre "${prompt}" foram criados.`);
        setGeneratorPrompt('');
        setView('deck');
      } else {
        throw new Error('Formato inválido recebido');
      }

    } catch (error) {
      console.error(error);
      showAlert("Não foi possível gerar os cards com IA agora. Tente um tema mais simples ou verifique sua conexão.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleGenerateFromNotes = async (notesText) => {
    const trimmed = (notesText || '').trim();
    if (!trimmed) return;

    const apiKey = localStorage.getItem('gemini_api_key');
    if (!apiKey) {
      showAlert('Por favor, configure sua chave API do Gemini primeiro.');
      setShowApiKeyModal(true);
      return;
    }

    if (!activeDeckId) {
      showAlert('Nenhum baralho selecionado. Abra um baralho primeiro.');
      return;
    }

    setIsGenerating(true);
    const promptText = `
Analise as seguintes anotações de aula e crie flashcards de vocabulário/conceitos em japonês.

ANOTAÇÕES:
---
${trimmed}
---

Regras:
1. Extraia termos, conceitos e vocabulário relevantes para estudo de japonês.
2. DECIDA VOCÊ MESMO quantos flashcards criar: com base na quantidade e densidade do conteúdo, crie entre 3 e 50 flashcards. Poucas anotações = poucos cards; muitas anotações = mais cards, mas só conceitos que valem virar card.
3. Cada flashcard: "kanji" (kanji ou palavra em japonês), "reading" (leitura em hiragana/katakana), "meaning" (significado em português).
4. A resposta deve ser APENAS um array JSON válido. Sem markdown (como \`\`\`json), sem texto antes ou depois.

Exemplo de formato válido:
[{"kanji": "猫", "reading": "ねこ", "meaning": "Gato"}, {"kanji": "犬", "reading": "いぬ", "meaning": "Cachorro"}]
`;

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: promptText }] }]
          })
        }
      );

      if (!response.ok) {
        showAlert('Ocorreu um problema na API do Gemini. Insira uma nova chave abaixo.');
        openApiKeyModalDueToError();
        return;
      }

      const data = await response.json();
      const textResponse = data.candidates?.[0]?.content?.parts?.[0]?.text;

      if (!textResponse) throw new Error('Resposta vazia da IA');

      const jsonString = textResponse.replace(/```json\n?|```/g, '').trim();
      const newCards = JSON.parse(jsonString);

      if (Array.isArray(newCards) && newCards.length > 0) {
        const validCards = newCards.filter(
          c => c && typeof c.kanji === 'string' && typeof c.reading === 'string' && typeof c.meaning === 'string'
        ).map(c => ({ kanji: String(c.kanji), reading: String(c.reading), meaning: String(c.meaning) }));
        if (validCards.length > 0) {
          addCardsToActiveDeck(validCards);
          closeModal();
          showAlert(`${validCards.length} flashcard(s) criado(s) a partir das suas anotações.`);
          setView('deck');
        } else {
          throw new Error('Nenhum card válido na resposta');
        }
      } else {
        throw new Error('Formato inválido recebido');
      }
    } catch (error) {
      console.error(error);
      showAlert('Não foi possível gerar os cards a partir das anotações. Tente novamente ou verifique sua conexão.');
    } finally {
      setIsGenerating(false);
    }
  };

  // --- HELPERS ESTATÍSTICAS (fonte única: reviewHistory) ---
  const getReviewsByDay = (decksList) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayStart = today.getTime();
    const dayMs = 24 * 60 * 60 * 1000;
    const weekAgo = todayStart - 7 * dayMs;
    const monthAgo = todayStart - 30 * dayMs;
    const reviewsByDay = {};
    let reviewsToday = 0, reviewsThisWeek = 0, reviewsThisMonth = 0;
    decksList.forEach(deck => {
      deck.cards.forEach(card => {
        if (!card.reviewHistory) return;
        card.reviewHistory.forEach(review => {
          const d = new Date(review.date);
          d.setHours(0, 0, 0, 0);
          const ts = d.getTime();
          reviewsByDay[ts] = (reviewsByDay[ts] || 0) + 1;
          if (ts === todayStart) reviewsToday++;
          if (ts >= weekAgo) reviewsThisWeek++;
          if (ts >= monthAgo) reviewsThisMonth++;
        });
      });
    });
    return { reviewsByDay, reviewsToday, reviewsThisWeek, reviewsThisMonth, todayStart, dayMs };
  };

  const getCardStatusAndQuality = (decksList, now) => {
    let totalCards = 0, newCards = 0, dueCards = 0, inLearning = 0, masteredCards = 0;
    let totalReviewCount = 0, correctReviewCount = 0;
    const qualityCounts = { 0: 0, 1: 0, 2: 0 };
    decksList.forEach(deck => {
      deck.cards.forEach(card => {
        const iv = card.interval ?? 0;
        const next = card.nextReview ?? 0;
        totalCards++;
        if (iv === 0) newCards++;
        else if (next <= now && iv > 0) dueCards++;
        else if (iv > 0 && iv <= 7 && next > now) inLearning++;
        else if (iv > 7) masteredCards++;
        if (card.reviewHistory && card.reviewHistory.length > 0) {
          card.reviewHistory.forEach(r => {
            totalReviewCount++;
            if (r.quality === 2) correctReviewCount++;
            const q = r.quality;
            if (q === 0 || q === 1 || q === 2) qualityCounts[q] = (qualityCounts[q] || 0) + 1;
          });
        }
      });
    });
    const accuracyGlobal = totalReviewCount > 0 ? Math.round((correctReviewCount / totalReviewCount) * 100) : 0;
    return { totalCards, newCards, dueCards, inLearning, masteredCards, totalReviewCount, correctReviewCount, accuracyGlobal, qualityCounts };
  };

  const getStreaks = (reviewsByDay, todayStart, dayMs) => {
    const daysWithReviews = Object.keys(reviewsByDay).map(Number).sort((a, b) => a - b);
    let currentStreak = 0;
    if (daysWithReviews.length > 0) {
      let check = todayStart;
      while (true) {
        if (daysWithReviews.includes(check)) {
          currentStreak++;
          check -= dayMs;
        } else {
          if (currentStreak === 0 && check === todayStart) { check -= dayMs; continue; }
          break;
        }
      }
    }
    let bestStreak = 0;
    if (daysWithReviews.length > 0) {
      bestStreak = 1;
      let current = 1;
      for (let i = 1; i < daysWithReviews.length; i++) {
        if (daysWithReviews[i] - daysWithReviews[i - 1] === dayMs) {
          current++;
          if (current > bestStreak) bestStreak = current;
        } else current = 1;
      }
    }
    return { currentStreak, bestStreak };
  };

  const getChartDataForDays = (reviewsByDay, todayStart, dayMs, numDays) => {
    const chartData = [];
    for (let i = numDays - 1; i >= 0; i--) {
      const date = new Date(todayStart - i * dayMs);
      const dateStr = date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
      const count = reviewsByDay[date.getTime()] || 0;
      chartData.push({ date: dateStr, count, ts: date.getTime() });
    }
    const maxChart = Math.max(...chartData.map(r => r.count), 1);
    return { chartData, maxChart };
  };

  const getDeckStats = (deck, now) => {
    const deckTotal = deck.cards.length;
    let deckNew = 0, deckDue = 0, deckInLearning = 0, deckMastered = 0, deckReviews = 0, deckCorrect = 0;
    deck.cards.forEach(card => {
      const iv = card.interval ?? 0;
      const next = card.nextReview ?? 0;
      if (iv === 0) deckNew++;
      else if (next <= now && iv > 0) deckDue++;
      else if (iv > 0 && iv <= 7 && next > now) deckInLearning++;
      else if (iv > 7) deckMastered++;
      if (card.reviewHistory) {
        card.reviewHistory.forEach(r => {
          deckReviews++;
          if (r.quality === 2) deckCorrect++;
        });
      }
    });
    const deckAccuracy = deckReviews > 0 ? Math.round((deckCorrect / deckReviews) * 100) : 0;
    const progressPct = deckTotal > 0 ? Math.round(((deckInLearning + deckMastered) / deckTotal) * 100) : 0;
    return { deckTotal, deckNew, deckDue, deckInLearning, deckMastered, deckReviews, deckAccuracy, progressPct };
  };

  // --- SUB-VIEWS ---

  const ProfileView = () => {
    const { reviewsByDay, todayStart, dayMs } = getReviewsByDay(decks);
    const { currentStreak } = getStreaks(reviewsByDay, todayStart, dayMs);
    const totalReviews = Object.values(reviewsByDay).reduce((a, b) => a + b, 0);
    const profileName = apiUser ? (apiUser.name || apiUser.email || 'Estudante') : (() => { try { return localStorage.getItem('profile_display_name') || 'Estudante'; } catch (_) { return 'Estudante'; } })();
    const profileEmail = apiUser ? apiUser.email : '';
    const joinDate = (() => { try { return localStorage.getItem('profile_join_date') || new Date().toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' }); } catch (_) { return '2024'; } })();
    const defaultDailyGoal = 20;
    const dailyGoal = (() => { try { const v = localStorage.getItem('stats_daily_goal'); return v ? Math.max(1, parseInt(v, 10) || defaultDailyGoal) : defaultDailyGoal; } catch (_) { return defaultDailyGoal; } })();
    const reviewsToday = (reviewsByDay[todayStart] || 0);
    const totalCards = decks.reduce((acc, d) => acc + d.cards.length, 0);
    const goalKanji = 500;
    const goalDailyDays = 365;
    let daysHitGoalYear = 0;
    for (let i = 0; i < 365; i++) {
      const dayStart = todayStart - i * dayMs;
      if ((reviewsByDay[dayStart] || 0) >= dailyGoal) daysHitGoalYear++;
    }
    const metaKanjiPct = Math.min(100, totalCards > 0 ? Math.round((totalCards / goalKanji) * 100) : 0);
    const metaDailyPct = Math.min(100, Math.round((daysHitGoalYear / goalDailyDays) * 100));

    const openEditProfile = () => {
      if (!apiUser) { showAlert('Faça login para editar seu perfil.'); return; }
      setEditProfileName(apiUser.name || '');
      setEditProfileEmail(apiUser.email || '');
      setEditProfileCurrentPassword('');
      setEditProfileNewPassword('');
      setEditProfileConfirmPassword('');
      setEditProfileError('');
      setView('edit-profile');
    };

    return (
      <div className="p-6 pt-10 animate-in fade-in h-full overflow-y-auto pb-32">
        <header className="flex justify-between items-center mb-8">
          <h1 className="font-black text-3xl uppercase tracking-tighter dark:text-white">Perfil</h1>
          <DuoButton onClick={openEditProfile} variant="secondary" className="h-10 px-4 py-0 text-xs">Editar perfil</DuoButton>
        </header>
        <div className="flex items-center gap-6 mb-10 pb-6 border-b-2 border-[#e5e5e5] dark:border-[#37464f]">
          <div className="w-24 h-24 rounded-full bg-[#ce82ff] border-b-4 border-[#a558e0] flex items-center justify-center text-white text-4xl font-black shadow-md">
            {(profileName[0] || 'E').toUpperCase()}
          </div>
          <div>
            <h2 className="text-2xl font-black dark:text-white leading-tight">{profileName}</h2>
            <p className="text-[#afafaf] dark:text-zinc-400 font-bold text-sm">Ingressou em {joinDate}</p>
          </div>
        </div>
        <h3 className="font-black text-[#afafaf] dark:text-zinc-400 uppercase text-xs mb-4 px-2 tracking-widest w-full">Estatísticas</h3>
        <div className="grid grid-cols-2 gap-4 mb-10 w-full">
          <DuoCard className="border-b-4 flex items-center gap-3 py-6">
            <Flame size={24} className="text-[#ff9600]" style={{ fill: '#ff9600' }} />
            <div>
              <p className="font-black text-xl leading-none dark:text-white">{currentStreak}</p>
              <p className="text-[10px] font-black text-[#afafaf] dark:text-zinc-400 uppercase">Ofensiva</p>
            </div>
          </DuoCard>
          <DuoCard className="border-b-4 flex items-center gap-3 py-6">
            <Zap size={24} className="text-[#1cb0f6]" style={{ fill: '#1cb0f6' }} />
            <div>
              <p className="font-black text-xl leading-none dark:text-white">{totalReviews}</p>
              <p className="text-[10px] font-black text-[#afafaf] dark:text-zinc-400 uppercase">Total revisões</p>
            </div>
          </DuoCard>
        </div>
        <h3 className="font-black text-[#afafaf] dark:text-zinc-400 uppercase text-xs mb-4 px-2 tracking-widest w-full">Metas</h3>
        <DuoCard className="mb-10 border-b-4 bg-white dark:bg-[#1b2c35] w-full">
          <div className="space-y-6">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="font-black text-[10px] uppercase dark:text-white">Cards no app</span>
                <span className="text-[10px] font-black text-zinc-500 dark:text-zinc-400">{totalCards} / {goalKanji}</span>
              </div>
              <ProgressBar progress={metaKanjiPct} color="#ff9600" />
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="font-black text-[10px] uppercase dark:text-white">Meta diária batida</span>
                <span className="text-[10px] font-black text-zinc-500 dark:text-zinc-400">{daysHitGoalYear} / 365 dias</span>
              </div>
              <ProgressBar progress={metaDailyPct} color="#58cc02" />
            </div>
          </div>
          <p className="text-[10px] font-black text-[#afafaf] mt-4">Meta: {dailyGoal} revisões/dia</p>
        </DuoCard>
      </div>
    );
  };

  const EditProfileView = () => {
    const handleSave = async () => {
      setEditProfileError('');
      const wantPasswordChange = editProfileCurrentPassword || editProfileNewPassword || editProfileConfirmPassword;
      if (wantPasswordChange) {
        if (!editProfileCurrentPassword || !editProfileNewPassword || !editProfileConfirmPassword) {
          setEditProfileError('Preencha senha atual, nova senha e confirmação para alterar a senha.');
          return;
        }
        if (editProfileNewPassword.length < 6) {
          setEditProfileError('A nova senha deve ter no mínimo 6 caracteres.');
          return;
        }
        if (editProfileNewPassword !== editProfileConfirmPassword) {
          setEditProfileError('Nova senha e confirmação não coincidem.');
          return;
        }
      }
      setEditProfileLoading(true);
      try {
        if (editProfileName.trim() !== (apiUser?.name || '')) {
          const result = window.apiService ? await window.apiService.updateProfile({ name: editProfileName.trim() }) : { success: false, error: 'Serviço não disponível.' };
          if (!result.success) {
            setEditProfileError(result.error || 'Erro ao salvar.');
            setEditProfileLoading(false);
            return;
          }
          if (result.user) setApiUser(result.user);
        }
        if (wantPasswordChange) {
          const result = window.apiService ? await window.apiService.updatePassword(editProfileCurrentPassword, editProfileNewPassword) : { success: false, error: 'Serviço não disponível.' };
          if (!result.success) {
            setEditProfileError(result.error || 'Erro ao alterar senha.');
            setEditProfileLoading(false);
            return;
          }
          setEditProfileCurrentPassword('');
          setEditProfileNewPassword('');
          setEditProfileConfirmPassword('');
        }
        const nameChanged = editProfileName.trim() !== (apiUser?.name || '');
        if (nameChanged && wantPasswordChange) showAlert('Perfil e senha atualizados!');
        else if (wantPasswordChange) showAlert('Senha alterada com sucesso!');
        else if (nameChanged) showAlert('Perfil atualizado com sucesso!');
        setView('profile');
      } catch (err) {
        setEditProfileError(err.message || 'Erro ao salvar.');
      } finally {
        setEditProfileLoading(false);
      }
    };
    return (
      <div className="min-h-screen bg-white dark:bg-[#131f24] pb-24 safe-top safe-bottom">
        <header className="sticky top-0 z-30 flex items-center gap-4 p-4 bg-white dark:bg-[#131f24] border-b-2 border-[#e5e5e5] dark:border-[#37464f] safe-top">
          <button onClick={() => setView('profile')} className="p-2 text-[#afafaf] dark:hover:text-white transition-colors touch-target" aria-label="Voltar">
            <ArrowLeft size={28} strokeWidth={3} />
          </button>
          <h1 className="font-black text-xl uppercase tracking-tighter text-[#4b4b4b] dark:text-white flex items-center gap-2">
            <Pencil size={24} className="text-[#1cb0f6]" />
            Editar perfil
          </h1>
        </header>
        <div className="p-6 max-w-md mx-auto">
          {editProfileError && <p className="text-sm font-bold text-[#ff4b4b] mb-4">{editProfileError}</p>}
          <div className="space-y-4 mb-6">
            <div>
              <label className="block font-black text-[10px] text-[#afafaf] dark:text-zinc-400 uppercase tracking-widest mb-2">Nome</label>
              <input type="text" value={editProfileName} onChange={(e) => setEditProfileName(e.target.value)} placeholder="Seu nome" className="w-full p-4 bg-[#f1f1f1] dark:bg-[#1b2c35] border-2 border-[#e5e5e5] dark:border-[#37464f] rounded-2xl font-bold outline-none focus:border-[#1cb0f6] dark:text-white" />
            </div>
          </div>
          <div className="mb-8">
            <h3 className="font-black text-[10px] text-[#afafaf] dark:text-zinc-400 uppercase tracking-widest mb-3">Alterar senha</h3>
            <div className="space-y-4">
              <div>
                <label className="block font-bold text-[10px] text-[#afafaf] dark:text-zinc-400 uppercase tracking-widest mb-2">Senha atual</label>
                <input type="password" value={editProfileCurrentPassword} onChange={(e) => setEditProfileCurrentPassword(e.target.value)} placeholder="••••••••" autoComplete="current-password" className="w-full p-4 bg-[#f1f1f1] dark:bg-[#1b2c35] border-2 border-[#e5e5e5] dark:border-[#37464f] rounded-2xl font-bold outline-none focus:border-[#1cb0f6] dark:text-white" />
              </div>
              <div>
                <label className="block font-bold text-[10px] text-[#afafaf] dark:text-zinc-400 uppercase tracking-widest mb-2">Nova senha</label>
                <input type="password" value={editProfileNewPassword} onChange={(e) => setEditProfileNewPassword(e.target.value)} placeholder="Mín. 6 caracteres" autoComplete="new-password" className="w-full p-4 bg-[#f1f1f1] dark:bg-[#1b2c35] border-2 border-[#e5e5e5] dark:border-[#37464f] rounded-2xl font-bold outline-none focus:border-[#1cb0f6] dark:text-white" />
              </div>
              <div>
                <label className="block font-bold text-[10px] text-[#afafaf] dark:text-zinc-400 uppercase tracking-widest mb-2">Confirmar nova senha</label>
                <input type="password" value={editProfileConfirmPassword} onChange={(e) => setEditProfileConfirmPassword(e.target.value)} placeholder="Repita a nova senha" autoComplete="new-password" className="w-full p-4 bg-[#f1f1f1] dark:bg-[#1b2c35] border-2 border-[#e5e5e5] dark:border-[#37464f] rounded-2xl font-bold outline-none focus:border-[#1cb0f6] dark:text-white" />
              </div>
            </div>
            <p className="text-[10px] text-[#afafaf] dark:text-zinc-400 mt-2">Deixe em branco se não quiser alterar a senha.</p>
          </div>
          <DuoButton variant="primary" fullWidth className="h-14 mb-4" onClick={handleSave} disabled={editProfileLoading}>
            {editProfileLoading ? <><RefreshCw size={18} className="animate-spin" /> Salvando...</> : 'Salvar alterações'}
          </DuoButton>
          <DuoButton variant="outline" fullWidth className="h-14" onClick={() => setView('settings')}>
            <Settings size={18} className="text-[#1cb0f6]" /> Configurações
          </DuoButton>
        </div>
      </div>
    );
  };

  const StatsView = () => {
    const now = Date.now();
    const { reviewsByDay, reviewsToday, reviewsThisWeek, reviewsThisMonth, todayStart, dayMs } = getReviewsByDay(decks);
    const { totalCards, newCards, dueCards, inLearning, masteredCards, totalReviewCount, correctReviewCount, accuracyGlobal, qualityCounts } = getCardStatusAndQuality(decks, now);
    const { currentStreak, bestStreak } = getStreaks(reviewsByDay, todayStart, dayMs);
    const totalDecks = decks.length;

    const defaultDailyGoal = 20;
    const [dailyGoal, setDailyGoalState] = useState(() => {
      try {
        const v = localStorage.getItem('stats_daily_goal');
        return v ? Math.max(1, parseInt(v, 10) || defaultDailyGoal) : defaultDailyGoal;
      } catch (_) {
        return defaultDailyGoal;
      }
    });
    const setDailyGoal = (val) => {
      const n = Math.max(1, parseInt(val, 10) || defaultDailyGoal);
      setDailyGoalState(n);
      try { localStorage.setItem('stats_daily_goal', String(n)); } catch (_) {}
    };

    const goal = dailyGoal;
    const hitGoalToday = reviewsToday >= goal;
    let daysHitGoalWeek = 0, daysHitGoalMonth = 0, daysActiveThisWeek = 0;
    for (let i = 0; i <= 6; i++) {
      const dayStart = todayStart - i * dayMs;
      const count = reviewsByDay[dayStart] || 0;
      if (count >= goal) daysHitGoalWeek++;
      if (count > 0) daysActiveThisWeek++;
    }
    for (let i = 0; i < 30; i++) {
      const dayStart = todayStart - i * dayMs;
      if ((reviewsByDay[dayStart] || 0) >= goal) daysHitGoalMonth++;
    }

    const [chartPeriod, setChartPeriod] = useState(7);
    const { chartData, maxChart } = getChartDataForDays(reviewsByDay, todayStart, dayMs, chartPeriod);

    // Calendário 30 dias (para heatmap)
    const calendarDays = [];
    for (let i = 29; i >= 0; i--) {
      const dayStart = todayStart - i * dayMs;
      const count = reviewsByDay[dayStart] || 0;
      const hitGoal = count >= goal;
      const date = new Date(dayStart);
      calendarDays.push({ ts: dayStart, count, hitGoal, label: date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' }) });
    }

    const q0 = qualityCounts[0] || 0, q1 = qualityCounts[1] || 0, q2 = qualityCounts[2] || 0;
    const totalQ = q0 + q1 + q2;

    return (
      <div className="p-6 pt-10 pb-32 overflow-x-hidden overflow-y-auto h-full">
        <>
        <div className="flex items-center gap-4 mb-8 min-h-[44px]">
          <button onClick={() => setView('home')} className="p-2 text-[#afafaf] hover:text-[#4b4b4b] dark:hover:text-white transition-colors" aria-label="Voltar">
            <ArrowLeft size={28} strokeWidth={3} />
          </button>
          <h1 className="font-black text-3xl uppercase tracking-tighter dark:text-white">Estatísticas</h1>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-8">
          <DuoCard className="border-b-4 flex flex-col items-center gap-1 text-center py-6"><Brain size={28} className="text-[#58cc02]" /><span className="text-2xl font-black dark:text-white leading-none">{reviewsToday}</span><span className="text-[10px] font-black text-[#afafaf] dark:text-zinc-400 uppercase leading-none mt-1">Revisões Hoje</span></DuoCard>
          <DuoCard className="border-b-4 flex flex-col items-center gap-1 text-center py-6"><RefreshCw size={28} className="text-[#1cb0f6]" /><span className="text-2xl font-black dark:text-white leading-none">{reviewsThisWeek}</span><span className="text-[10px] font-black text-[#afafaf] dark:text-zinc-400 uppercase leading-none mt-1">Esta Semana</span></DuoCard>
          <DuoCard className="border-b-4 flex flex-col items-center gap-1 text-center py-6"><Flame size={28} style={{ fill: '#ff9600' }} className="text-[#ff9600]" /><span className="text-2xl font-black dark:text-white leading-none">{currentStreak}</span><span className="text-[10px] font-black text-[#afafaf] dark:text-zinc-400 uppercase leading-none mt-1">Ofensiva</span></DuoCard>
          <DuoCard className="border-b-4 flex flex-col items-center gap-1 text-center py-6"><Zap size={28} style={{ fill: '#ffc800' }} className="text-[#ffc800]" /><span className="text-2xl font-black dark:text-white leading-none">{totalReviewCount > 0 ? accuracyGlobal + '%' : '—'}</span><span className="text-[10px] font-black text-[#afafaf] dark:text-zinc-400 uppercase leading-none mt-1">Taxa Acerto</span></DuoCard>
        </div>

        <h3 className="font-black text-[#afafaf] dark:text-zinc-400 uppercase text-xs mb-4 px-2 tracking-widest">Atividade Recente</h3>
        <DuoCard className="border-b-4 p-5 mb-10">
          <div className="grid grid-cols-7 gap-2">
            {calendarDays.map((day, i) => {
              let bgColor = 'bg-[#f1f1f1] dark:bg-[#2c3e47]';
              if (day.count > 0 && day.count <= 20) bgColor = 'bg-[#1cb0f6]';
              else if (day.count > 20) bgColor = 'bg-[#58cc02]';
              return <div key={i} className={`aspect-square rounded-lg flex items-center justify-center transition-all ${bgColor}`} title={`${day.label}: ${day.count}`}>{day.count > 0 && <span className="text-[9px] font-black text-white">{day.count}</span>}</div>;
            })}
          </div>
          <div className="flex justify-between mt-6 text-[9px] font-black text-[#afafaf] uppercase px-1"><span>Últimos 30 Dias</span><div className="flex gap-3"><div className="flex items-center gap-1"><div className="w-2.5 h-2.5 rounded-sm bg-[#1cb0f6]" /> Baixa</div><div className="flex items-center gap-1"><div className="w-2.5 h-2.5 rounded-sm bg-[#58cc02]" /> Alta</div></div></div>
        </DuoCard>

          {/* Distribuição por qualidade */}
          <h3 className="font-black text-[#afafaf] dark:text-zinc-400 uppercase text-xs mb-4 px-2 tracking-widest">Distribuição por Qualidade</h3>
          <DuoCard className="border-b-4 p-4 mb-6">
            {totalQ === 0 ? (
              <p className="text-sm text-[#afafaf] dark:text-zinc-400">Nenhuma revisão registrada ainda.</p>
            ) : (
              <>
                <div className="grid grid-cols-3 gap-3 mb-3">
                  <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-[#ff4b4b] shrink-0" /><span className="text-xs font-bold dark:text-white">Não sei</span><span className="text-xs font-black dark:text-white ml-auto">{q0} ({totalQ > 0 ? Math.round((q0 / totalQ) * 100) : 0}%)</span></div>
                  <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-[#ff9600] shrink-0" /><span className="text-xs font-bold dark:text-white">Dúvida</span><span className="text-xs font-black dark:text-white ml-auto">{q1} ({totalQ > 0 ? Math.round((q1 / totalQ) * 100) : 0}%)</span></div>
                  <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-[#58cc02] shrink-0" /><span className="text-xs font-bold dark:text-white">Sei</span><span className="text-xs font-black dark:text-white ml-auto">{q2} ({totalQ > 0 ? Math.round((q2 / totalQ) * 100) : 0}%)</span></div>
                </div>
                <div className="h-3 bg-[#e5e5e5] dark:bg-[#37464f] rounded-full overflow-hidden flex"><div className="h-full bg-[#ff4b4b] rounded-l" style={{ width: `${totalQ > 0 ? (q0 / totalQ) * 100 : 0}%` }} /><div className="h-full bg-[#ff9600]" style={{ width: `${totalQ > 0 ? (q1 / totalQ) * 100 : 0}%` }} /><div className="h-full bg-[#58cc02] rounded-r" style={{ width: `${totalQ > 0 ? (q2 / totalQ) * 100 : 0}%` }} /></div>
              </>
            )}
          </DuoCard>

          <h3 className="font-black text-[#afafaf] dark:text-zinc-400 uppercase text-xs mb-4 px-2 tracking-widest mt-6">Cards por Status</h3>
          <DuoCard className="border-b-4 p-4 mb-6">
            <div className="space-y-3">
              <div className="flex justify-between items-center"><div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-[#ff4b4b] shrink-0" /><span className="text-xs font-bold dark:text-white">Novos</span></div><span className="text-lg font-black dark:text-white">{newCards}</span></div>
              <div className="flex justify-between items-center"><div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-[#ff9600] shrink-0" /><span className="text-xs font-bold dark:text-white">Para Revisar</span></div><span className="text-lg font-black dark:text-white">{dueCards}</span></div>
              <div className="flex justify-between items-center"><div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-[#1cb0f6] shrink-0" /><span className="text-xs font-bold dark:text-white">Em Aprendizado</span></div><span className="text-lg font-black dark:text-white">{inLearning}</span></div>
              <div className="flex justify-between items-center"><div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-[#58cc02] shrink-0" /><span className="text-xs font-bold dark:text-white">Dominados</span></div><span className="text-lg font-black dark:text-white">{masteredCards}</span></div>
            </div>
            {totalCards > 0 && <div className="mt-4"><div className="h-3 bg-[#e5e5e5] dark:bg-[#37464f] rounded-full overflow-hidden flex"><div className="h-full bg-[#ff4b4b] rounded-l" style={{ width: `${(newCards / totalCards) * 100}%` }} /><div className="h-full bg-[#ff9600]" style={{ width: `${(dueCards / totalCards) * 100}%` }} /><div className="h-full bg-[#1cb0f6]" style={{ width: `${(inLearning / totalCards) * 100}%` }} /><div className="h-full bg-[#58cc02] rounded-r" style={{ width: `${(masteredCards / totalCards) * 100}%` }} /></div></div>}
          </DuoCard>

          <h3 className="font-black text-[#afafaf] dark:text-zinc-400 uppercase text-xs mb-4 px-2 tracking-widest mt-6">Meta e Ofensiva</h3>
          <DuoCard className="border-b-4 p-4 mb-6">
            <div className="grid grid-cols-2 gap-3 mb-3">
              <div><div className="text-2xl font-black dark:text-white">{currentStreak}</div><div className="text-[10px] font-black text-[#afafaf] uppercase">Sequência atual</div></div>
              <div><div className="text-2xl font-black dark:text-white">{bestStreak}</div><div className="text-[10px] font-black text-[#afafaf] uppercase">Melhor sequência</div></div>
            </div>
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div><div className="font-black dark:text-white">Meta: {goal}/dia</div><div className="text-[10px] text-[#afafaf]">Hoje: {reviewsToday} {hitGoalToday ? '✓' : ''}</div></div>
              <label className="flex items-center gap-2 text-sm"><span className="text-[10px] font-black text-[#afafaf]">Meta:</span><input type="number" min={1} value={goal} onChange={(e) => setDailyGoal(e.target.value)} className="w-14 px-2 py-2 rounded-2xl border-2 border-[#e5e5e5] dark:border-[#37464f] bg-[#f1f1f1] dark:bg-[#1b2c35] dark:text-white text-sm font-bold outline-none focus:border-[#1cb0f6]" aria-label="Meta por dia" /></label>
            </div>
            <p className="text-[10px] font-black text-[#afafaf] mt-2">Semana: {daysHitGoalWeek} dias meta · Mês: {daysHitGoalMonth}</p>
          </DuoCard>

          <h3 className="font-black text-[#afafaf] dark:text-zinc-400 uppercase text-xs mb-4 px-2 tracking-widest">Revisões por Período</h3>
          <DuoCard className="border-b-4 p-4 mb-6">
            <div className="flex gap-2 mb-4">
              {[7, 14, 30].map(n => (<button key={n} onClick={() => setChartPeriod(n)} className={`flex-1 py-2 rounded-2xl font-black text-xs uppercase border-b-2 ${chartPeriod === n ? 'bg-[#1cb0f6] border-[#1899d6] text-white' : 'bg-[#f1f1f1] dark:bg-[#37464f] border-[#e5e5e5] dark:border-[#37464f] dark:text-white'}`}>{n}d</button>))}
            </div>
            <div className="flex items-end justify-between gap-1 h-28">
              {chartData.map((day, idx) => (<div key={idx} className="flex-1 flex flex-col items-center justify-end min-w-0"><div className="w-full min-w-[6px] bg-[#1cb0f6] rounded-t" style={{ height: `${(day.count / maxChart) * 100}%`, minHeight: day.count > 0 ? '4px' : 0 }} title={`${day.date}: ${day.count}`} /><span className="text-[9px] text-[#afafaf] mt-1 truncate w-full text-center">{day.date.split('/')[0]}</span></div>))}
            </div>
          </DuoCard>

          <h3 className="font-black text-[#afafaf] dark:text-zinc-400 uppercase text-xs mb-4 px-2 tracking-widest">Progresso por Baralho</h3>
          <div className="space-y-4 pb-12">
            {decks.length === 0 ? <p className="text-sm text-[#afafaf]">Nenhum baralho.</p> : decks.map(deck => {
              const { deckTotal, deckNew, deckDue, deckInLearning, deckMastered, deckReviews, deckAccuracy, progressPct } = getDeckStats(deck, now);
              const deckColor = DECK_COLORS[decks.indexOf(deck) % DECK_COLORS.length] || '#1cb0f6';
              return (
                <DuoCard key={deck.id} className="border-b-4">
                  <div className="flex justify-between items-center mb-2"><span className="font-black text-xs dark:text-white uppercase">{deck.name}</span><span className="font-black text-[10px] text-[#afafaf]">{deckTotal} cards</span></div>
                  <ProgressBar progress={progressPct} color={deckColor} />
                  <div className="mt-2 text-[10px] font-bold text-[#afafaf]">Acertos: {deckReviews > 0 ? deckAccuracy + '%' : '—'} · Novos: {deckNew} · Revisar: {deckDue} · Dominados: {deckMastered}</div>
                </DuoCard>
              );
            })}
          </div>
        </>
      </div>
    );
  };

  const DECK_COLORS = ['#ff4b4b', '#1cb0f6', '#ff9600', '#58cc02', '#5844ed'];

  const HomeView = () => {
    const { reviewsByDay, reviewsToday, todayStart, dayMs } = getReviewsByDay(decks);
    const { currentStreak } = getStreaks(reviewsByDay, todayStart, dayMs);
    const totalReviews = Object.values(reviewsByDay).reduce((a, b) => a + b, 0);
    return (
      <div className="p-4 pt-6 pb-24">
        <header className="flex justify-between items-center mb-10 px-2 sticky top-0 bg-inherit z-10 py-2">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 text-[#ff9600] font-black"><Flame size={22} style={{ fill: '#ff9600' }} /> {currentStreak}</div>
            <div className="flex items-center gap-1 text-[#1cb0f6] font-black"><Zap size={22} style={{ fill: '#1cb0f6' }} /> {totalReviews}</div>
          </div>
          <div className="flex items-center gap-2">
            {isDevMode() && (
              <span className="px-2 py-1 text-[10px] font-black bg-[#5844ed] text-white rounded animate-pulse">DEV</span>
            )}
            <button onClick={() => setView('settings')} className="p-2 text-[#afafaf] dark:hover:text-white transition-colors touch-target" aria-label="Configurações">
              <Settings size={28} />
            </button>
          </div>
        </header>
        <h2 className="font-black text-2xl uppercase tracking-tighter mb-8 px-2 dark:text-white">Meus Baralhos</h2>
        <div className="grid grid-cols-3 gap-y-12 gap-x-4 justify-items-center">
          {decks.map((deck, idx) => {
            const now = Date.now();
            const { progressPct } = getDeckStats(deck, now);
            const dueCount = deck.cards.filter(c => c.nextReview <= now).length;
            const color = DECK_COLORS[idx % DECK_COLORS.length];
            return (
              <div key={deck.id} className="relative flex flex-col items-center w-full max-w-[120px] group cursor-pointer" onClick={() => { setActiveDeckId(deck.id); setView('deck'); }}>
                <div
                  className="w-22 h-22 rounded-full border-[8px] border-[#e5e5e5] dark:border-[#37464f] relative flex items-center justify-center shadow-lg transition-transform active:scale-95 min-w-[88px] min-h-[88px]"
                  style={{ borderTopColor: color, borderRightColor: progressPct >= 25 ? color : '', borderBottomColor: progressPct >= 50 ? color : '', borderLeftColor: progressPct >= 75 ? color : '' }}
                >
                  <div className="w-14 h-14 rounded-full flex items-center justify-center text-white" style={{ backgroundColor: color }}><Brain size={30} /></div>
                </div>
                <span className="mt-3 font-black text-[10px] uppercase text-center dark:text-zinc-300 leading-tight">{deck.name}</span>
                {dueCount > 0 && <span className="text-[9px] font-black text-[#ff4b4b] mt-0.5">{dueCount} para revisar</span>}
              </div>
            );
          })}
          <button onClick={showPrompt} className="w-20 h-20 rounded-full border-4 border-dashed border-[#e5e5e5] dark:border-[#37464f] flex items-center justify-center text-[#afafaf] hover:bg-[#f1f1f1] dark:hover:bg-[#1b2c35] shadow-sm active:scale-95 transition-all min-w-[80px] min-h-[80px]">
            <Plus size={32} />
          </button>
        </div>
      </div>
    );
  };

  const DeckDetailView = () => {
    const deck = decks.find(d => d.id === activeDeckId);
    if (!deck) return null;
    const now = Date.now();
    const dueCardsCount = deck.cards.filter(c => c.nextReview <= now).length;
    const isReviewDue = dueCardsCount > 0;
    const { progressPct } = getDeckStats(deck, now);
    const deckColor = DECK_COLORS[decks.findIndex(d => d.id === deck.id) % DECK_COLORS.length] || '#1cb0f6';

    let filteredCards = [...deck.cards];
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filteredCards = filteredCards.filter(card =>
        card.kanji.toLowerCase().includes(query) || card.reading.toLowerCase().includes(query) || card.meaning.toLowerCase().includes(query)
      );
    }
    if (filterStatus !== 'all') {
      filteredCards = filteredCards.filter(card => {
        if (filterStatus === 'new') return card.interval === 0 && card.nextReview <= now;
        if (filterStatus === 'due') return card.nextReview <= now && card.interval > 0;
        if (filterStatus === 'mastered') return card.interval > 7;
        return true;
      });
    }
    if (tagFilter !== 'all') filteredCards = filteredCards.filter(card => (card.tags || []).includes(tagFilter));
    if (sortBy === 'kanji') filteredCards.sort((a, b) => a.kanji.localeCompare(b.kanji));
    else if (sortBy === 'created') filteredCards.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
    else if (sortBy === 'nextReview') filteredCards.sort((a, b) => a.nextReview - b.nextReview);

    return (
      <div className="p-6 pt-10 h-full overflow-y-auto pb-24">
        <header className="flex justify-between items-center mb-8">
          <button onClick={() => setView('home')} className="text-[#afafaf] hover:text-[#4b4b4b] dark:hover:text-white transition-colors p-2">
            <ArrowLeft size={28} strokeWidth={3} />
          </button>
          <div className="flex gap-4">
            <button onClick={() => deleteDeck(deck.id)} className="text-[#ff4b4b] p-2" aria-label="Excluir baralho"><Trash2 size={24} /></button>
          </div>
        </header>
        <div className="flex items-center gap-4 mb-10">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-white shadow-lg min-w-[64px] min-h-[64px]" style={{ backgroundColor: deckColor }}><Layers size={32} strokeWidth={2.5} /></div>
          <div>
            <h1 className="text-2xl font-black uppercase tracking-tighter dark:text-white leading-none mb-1">{deck.name}</h1>
            <p className="font-bold text-[#afafaf] dark:text-zinc-400 text-[10px] uppercase tracking-wider">{deck.cards.length} CARDS NO TOTAL</p>
          </div>
        </div>
        <DuoCard className="mb-10 border-b-4 dark:bg-[#1b2c35]">
          <div className="flex justify-between items-center mb-3">
            <span className="font-black text-[10px] text-[#afafaf] dark:text-zinc-400 uppercase tracking-widest leading-none">PROGRESSO DE DOMÍNIO</span>
            <span className="font-black text-sm text-[#58cc02] leading-none">{progressPct}%</span>
          </div>
          <ProgressBar progress={progressPct} color={deckColor} />
        </DuoCard>
        <DuoCard className="mb-6 p-4 flex justify-between items-center">
          <div className="flex items-center gap-2 text-[#4b4b4b] dark:text-white">
            {furiganaMode === 'always' ? <Eye size={18} /> : <EyeOff size={18} />}
            <span className="text-sm font-black uppercase">{furiganaMode === 'always' ? 'Furigana visível' : 'Furigana oculto'}</span>
          </div>
          <button onClick={() => setFuriganaMode(prev => prev === 'always' ? 'answer' : 'always')} className={`relative w-14 h-8 rounded-full border-b-2 transition-colors ${furiganaMode === 'always' ? 'bg-[#58cc02] border-[#46a302]' : 'bg-[#e5e5e5] dark:bg-[#37464f] border-[#afafaf]'}`}>
            <div className={`absolute top-0.5 w-6 h-6 bg-white rounded-full shadow transition-all ${furiganaMode === 'always' ? 'left-7' : 'left-0.5'}`} />
          </button>
        </DuoCard>
        <div className="grid grid-cols-2 gap-4 mb-8">
          {isReviewDue ? (
            <DuoButton onClick={() => startReview(deck.id, false)} variant="primary" className="h-28 flex-col relative" fullWidth>
              <Brain size={28} /><span>REVISÃO</span>
              <div className="absolute bottom-4 bg-white/20 px-3 py-0.5 rounded-full text-[10px] font-black">{dueCardsCount}</div>
            </DuoButton>
          ) : (
            <DuoButton onClick={() => startReview(deck.id, true)} disabled={deck.cards.length === 0} variant="primary" className="h-28 flex-col" fullWidth>
              <RotateCw size={28} /><span>{deck.cards.length === 0 ? 'VAZIO' : 'REVISÃO'}</span>
            </DuoButton>
          )}
          <DuoButton onClick={() => setView('test-mode-selection')} disabled={deck.cards.length < 10} variant="indigo" className="h-28 flex-col" fullWidth><Target size={28} /><span>TESTES</span></DuoButton>
          <DuoButton onClick={() => setView('generator')} variant="secondary" className="h-20" fullWidth><Sparkles size={18} /><span className="text-[10px]">GERAR COM IA</span></DuoButton>
          <DuoButton onClick={showAddCardModal} variant="white" className="h-20 border-2" fullWidth><Plus size={18} /><span className="text-[10px]">ADD CARD</span></DuoButton>
        </div>
        <div className="space-y-4 pb-12">
          <div className="flex justify-between items-center px-2">
            <h3 className="font-black text-[#afafaf] dark:text-zinc-400 uppercase text-xs tracking-widest">LISTA DE CARDS</h3>
            <Search size={18} className="text-[#afafaf]" />
          </div>
          <div className="relative mb-3">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#afafaf]" />
            <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Buscar..." className="w-full pl-10 pr-4 py-3 bg-[#f1f1f1] dark:bg-[#1b2c35] border-2 border-[#e5e5e5] dark:border-[#37464f] rounded-2xl font-bold outline-none focus:border-[#1cb0f6] dark:text-white text-sm" />
          </div>
          <div className="flex gap-2 flex-wrap">
            <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="flex-1 min-w-[100px] px-3 py-2 bg-[#f1f1f1] dark:bg-[#1b2c35] border-2 border-[#e5e5e5] dark:border-[#37464f] rounded-2xl text-[#4b4b4b] dark:text-white text-xs font-bold outline-none focus:border-[#1cb0f6]">
              <option value="all">Todos</option><option value="new">Novos</option><option value="due">Revisar</option><option value="mastered">Dominados</option>
            </select>
            <select value={tagFilter} onChange={(e) => setTagFilter(e.target.value)} className="flex-1 min-w-[100px] px-3 py-2 bg-[#f1f1f1] dark:bg-[#1b2c35] border-2 border-[#e5e5e5] dark:border-[#37464f] rounded-2xl text-[#4b4b4b] dark:text-white text-xs font-bold outline-none focus:border-[#1cb0f6]">
              <option value="all">Tags</option>
              {availableTags.map(tag => <option key={tag} value={tag}>{tag}</option>)}
            </select>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="flex-1 min-w-[100px] px-3 py-2 bg-[#f1f1f1] dark:bg-[#1b2c35] border-2 border-[#e5e5e5] dark:border-[#37464f] rounded-2xl text-[#4b4b4b] dark:text-white text-xs font-bold outline-none focus:border-[#1cb0f6]">
              <option value="default">Padrão</option><option value="kanji">Kanji</option><option value="created">Data</option><option value="nextReview">Revisão</option>
            </select>
          </div>
          {deck.cards.length === 0 ? (
            <div className="text-center py-12 text-[#afafaf] font-bold text-sm">Nenhum card ainda. Crie ou gere com IA!</div>
          ) : filteredCards.length === 0 ? (
            <div className="text-center py-12 text-[#afafaf] font-bold text-sm">Nenhum card com os filtros.</div>
          ) : cardViewMode === 'list' ? (
            <div className="grid grid-cols-2 gap-4">
              {filteredCards.map((card, i) => (
                <DuoCard key={card.id || i} className="flex flex-col items-center justify-center border-b-4 py-6 relative" interactive onClick={() => startEditCard(card)}>
                  <div className="absolute top-3 left-3 w-2.5 h-2.5 rounded-full" style={{ backgroundColor: deckColor }} />
                  <div className="flex flex-col items-center text-center">
                    <ruby className="font-black text-2xl dark:text-white leading-tight mb-2">{card.kanji} <rt className="text-[10px] text-[#ff4b4b] uppercase font-black tracking-tighter">{card.reading}</rt></ruby>
                    <p className="text-[11px] font-bold text-[#afafaf] dark:text-zinc-400 uppercase tracking-wide">{card.meaning}</p>
                  </div>
                  <div className="absolute top-2 right-2 flex gap-1">
                    <button onClick={(e) => { e.stopPropagation(); startEditCard(card); }} className="text-[#afafaf] hover:text-[#1cb0f6] p-1"><Edit size={14} /></button>
                    <button onClick={(e) => { e.stopPropagation(); const newCards = deck.cards.filter(c => c.id !== card.id); setDecks(decks.map(d => d.id === deck.id ? { ...d, cards: newCards } : d)); }} className="text-[#afafaf] hover:text-[#ff4b4b] p-1"><Trash2 size={14} /></button>
                  </div>
                </DuoCard>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {filteredCards.map((card, i) => (
                <DuoCard key={card.id || i} className="p-4 flex flex-col items-center justify-center border-b-4 relative min-h-[140px]" interactive onClick={() => startEditCard(card)}>
                  <ruby className="font-black text-xl dark:text-white mb-1">{card.kanji} <rt className="text-[9px] text-[#ff4b4b]">{card.reading}</rt></ruby>
                  <p className="text-[10px] font-bold text-[#afafaf] dark:text-zinc-400 line-clamp-2">{card.meaning}</p>
                  <div className="absolute top-2 right-2 flex gap-1">
                    <button onClick={(e) => { e.stopPropagation(); startEditCard(card); }} className="text-[#afafaf] hover:text-[#1cb0f6] p-1"><Edit size={12} /></button>
                    <button onClick={(e) => { e.stopPropagation(); const newCards = deck.cards.filter(c => c.id !== card.id); setDecks(decks.map(d => d.id === deck.id ? { ...d, cards: newCards } : d)); }} className="text-[#afafaf] hover:text-[#ff4b4b] p-1"><Trash2 size={12} /></button>
                  </div>
                </DuoCard>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  const GeneratorView = () => {
    const [showNotes, setShowNotes] = useState(false);
    const inputRef = useRef(null);
    const handleGenerateClick = () => {
      const value = inputRef.current?.value || '';
      if (value.trim() && !isGenerating) {
        const count = isDevMode() ? devCustomCount : cardsCount;
        handleGenerate(value, count);
        if (inputRef.current) inputRef.current.value = '';
      }
    };
    const handleKeyDown = (e) => { if (e.key === 'Enter' && !isGenerating) { e.preventDefault(); handleGenerateClick(); } };
    return (
      <div className="p-6 pt-10 h-screen flex flex-col overflow-y-auto bg-white dark:bg-[#131f24]">
        <header className="flex items-center gap-4 mb-10">
          <button onClick={() => setView('deck')} className="text-[#afafaf] hover:text-[#4b4b4b] dark:hover:text-white transition-colors p-2"><ArrowLeft size={28} strokeWidth={3} /></button>
          <h1 className="font-black text-2xl uppercase tracking-tighter dark:text-white leading-none">Gerador IA</h1>
        </header>
        <div className="flex-1 space-y-10 pb-32 px-1">
          <div className="space-y-3">
            <label className="block font-black text-xs text-[#afafaf] dark:text-zinc-400 uppercase px-2 tracking-widest">O que você quer estudar?</label>
            <input ref={inputRef} type="text" defaultValue={generatorPrompt} placeholder="Ex: Frutas, Anime..." onKeyDown={handleKeyDown} className="w-full bg-[#f1f1f1] dark:bg-[#1b2c35] border-2 border-[#e5e5e5] dark:border-[#37464f] rounded-2xl px-5 py-5 font-bold outline-none focus:border-[#5844ed] dark:text-white shadow-sm" />
          </div>
          <div className="space-y-3">
            <label className="block font-black text-xs text-[#afafaf] dark:text-zinc-400 uppercase px-2 tracking-widest">Quantidade de Cards</label>
            {isDevMode() ? (
              <div className="space-y-2">
                <input type="number" min="1" max="1000" value={devCustomCount} onChange={(e) => setDevCustomCount(Math.min(Math.max(1, parseInt(e.target.value) || 1), 1000))} className="w-full bg-[#f1f1f1] dark:bg-[#1b2c35] border-2 border-[#5844ed] rounded-2xl px-5 py-5 font-bold outline-none dark:text-white" />
                <p className="text-[10px] font-bold text-[#5844ed]">DEV: até 1000 cards</p>
              </div>
            ) : (
              <div className="grid grid-cols-3 gap-3">
                {[3, 5, 8].map(qty => (
                  <button key={qty} onClick={() => setCardsCount(qty)} className={`py-5 rounded-2xl font-black uppercase text-sm transition-all border-b-4 active:translate-y-1 active:border-b-0 ${cardsCount === qty ? 'bg-[#5844ed] border-[#4636be] text-white shadow-lg' : 'bg-white dark:bg-[#1b2c35] border-[#e5e5e5] dark:border-[#37464f] text-[#afafaf]'}`}>{qty} Cards</button>
                ))}
              </div>
            )}
          </div>
          <div className="space-y-4">
            <button onClick={() => setShowNotes(!showNotes)} className="w-full flex justify-between items-center bg-white dark:bg-[#1b2c35] border-2 border-[#e5e5e5] dark:border-[#37464f] border-b-4 rounded-2xl p-6 active:translate-y-1 active:border-b-0 transition-all shadow-sm">
              <div className="flex items-center gap-4"><Pencil size={22} className="text-[#1cb0f6]" /><span className="font-black text-xs uppercase text-[#4b4b4b] dark:text-white tracking-widest">Criar a partir de anotações</span></div>
              <ChevronDown size={24} className={`text-[#afafaf] transition-transform ${showNotes ? 'rotate-180' : ''}`} />
            </button>
            {showNotes && (
              <div className="animate-in slide-in-from-top-2">
                <p className="text-[10px] font-bold text-[#afafaf] mb-2">Ou abra pelo botão no baralho.</p>
                <button type="button" onClick={showNotesToCardsModal} className="w-full py-3 rounded-2xl font-black uppercase text-sm bg-[#1b2c35] dark:bg-[#37464f] text-white border-b-4 border-[#1cb0f6]">Abrir Anotações</button>
              </div>
            )}
          </div>
        </div>
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 w-full max-w-md px-6">
          <DuoButton onClick={handleGenerateClick} disabled={isGenerating} variant="primary" fullWidth className="h-16 text-lg shadow-xl">
            {isGenerating ? <><RefreshCw size={20} className="animate-spin" /> GERANDO...</> : <><Zap size={20} style={{ fill: 'white' }} /> GERAR CARDS</>}
          </DuoButton>
        </div>
      </div>
    );
  };

  const QuickReviewView = () => {
    const card = reviewQueue[currentCardIndex];
    if (!card) return <div className="p-6 text-[#afafaf]">Erro ao carregar card.</div>;
    const cardRef = useRef(null);
    const touchStartX = useRef(0);
    const touchStartY = useRef(0);
    const handleTouchStart = (e) => { touchStartX.current = e.touches[0].clientX; touchStartY.current = e.touches[0].clientY; };
    const handleTouchEnd = (e) => {
      if (!touchStartX.current || !touchStartY.current) return;
      const touchEndX = e.changedTouches[0].clientX;
      const touchEndY = e.changedTouches[0].clientY;
      const diffX = touchEndX - touchStartX.current;
      const diffY = touchEndY - touchStartY.current;
      if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
        if (showAnswer) {
          if (diffX > 0) processReview(2); else processReview(0);
          if (currentCardIndex < reviewQueue.length - 1) { setCurrentCardIndex(prev => prev + 1); setShowAnswer(false); } else { showAlert('Revisão rápida concluída!'); setView('deck'); }
        }
      } else if (Math.abs(diffY) > 50) {
        if (diffY < 0 && !showAnswer) setShowAnswer(true); else if (diffY > 0 && showAnswer) setShowAnswer(false);
      }
      touchStartX.current = 0; touchStartY.current = 0;
    };
    const progress = reviewQueue.length ? ((currentCardIndex + 1) / reviewQueue.length) * 100 : 0;
    return (
      <div className="h-screen flex flex-col p-6 bg-white dark:bg-[#131f24] overflow-hidden">
        <header className="flex items-center gap-4 mb-8">
          <button onClick={() => setView('deck')} className="text-[#afafaf] p-2"><XCircle size={32} /></button>
          <ProgressBar progress={progress} />
        </header>
        <div ref={cardRef} onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd} className="flex-1 flex items-center justify-center">
          <DuoCard className="p-10 border-b-8 min-w-[300px] cursor-pointer touch-pan-y" interactive onClick={() => setShowAnswer(!showAnswer)}>
            <KanjiCard kanji={card.kanji} reading={card.reading} meaning={card.meaning} showBack={showAnswer} furiganaMode={furiganaMode} size="large" />
          </DuoCard>
        </div>
        <footer className="pt-8 mb-4">
          {showAnswer ? (
            <div className="grid grid-cols-2 gap-3">
              <DuoButton variant="danger" fullWidth className="h-14" onClick={() => { processReview(0); if (currentCardIndex < reviewQueue.length - 1) { setCurrentCardIndex(prev => prev + 1); setShowAnswer(false); } else { showAlert('Revisão rápida concluída!'); setView('deck'); } }}>Errado</DuoButton>
              <DuoButton variant="primary" fullWidth className="h-14" onClick={() => { processReview(2); if (currentCardIndex < reviewQueue.length - 1) { setCurrentCardIndex(prev => prev + 1); setShowAnswer(false); } else { showAlert('Revisão rápida concluída!'); setView('deck'); } }}>Correto</DuoButton>
            </div>
          ) : (
            <DuoButton variant="primary" fullWidth className="h-16 text-lg" onClick={() => setShowAnswer(true)}>Ver Resposta</DuoButton>
          )}
          <button onClick={() => setView('deck')} className="mt-4 w-full text-[#afafaf] font-black uppercase text-[10px]">Cancelar</button>
        </footer>
      </div>
    );
  };

  const ReviewSessionView = () => {
    const card = reviewQueue[currentCardIndex];
    if (!card) return <div className="p-6 text-[#afafaf]">Erro ao carregar card.</div>;
    const progress = reviewQueue.length ? ((currentCardIndex + 1) / reviewQueue.length) * 100 : 0;
    return (
      <div className="h-screen flex flex-col p-6 bg-white dark:bg-[#131f24] overflow-hidden">
        <header className="flex items-center gap-4 mb-8">
          <button onClick={() => setView('deck')} className="text-[#afafaf] hover:text-[#4b4b4b] dark:hover:text-white transition-colors p-2"><XCircle size={32} /></button>
          <ProgressBar progress={progress} />
        </header>
        <div className="flex-1 flex flex-col items-center justify-center text-center">
          <DuoCard className="p-10 border-b-8 mb-12 min-w-[300px] flex flex-col items-center justify-center shadow-xl cursor-pointer" interactive onClick={() => setShowAnswer(true)}>
            <KanjiCard kanji={card.kanji} reading={card.reading} meaning={card.meaning} showBack={showAnswer} furiganaMode={furiganaMode} size="large" />
          </DuoCard>
          {!showAnswer ? (
            <p className="text-[#afafaf] dark:text-zinc-500 font-black text-sm uppercase animate-pulse">Toque no card para revelar</p>
          ) : (
            <p className="text-2xl font-black text-[#4b4b4b] dark:text-white uppercase">Significado: {card.meaning}</p>
          )}
        </div>
        <footer className="pt-8 mb-4">
          {showAnswer ? (
            <div className="grid grid-cols-3 gap-3">
              <DuoButton onClick={() => processReview(0)} variant="danger" fullWidth className="h-14 text-xs">Não sei</DuoButton>
              <DuoButton onClick={() => processReview(1)} variant="warning" fullWidth className="h-14 text-xs">Dúvida</DuoButton>
              <DuoButton onClick={() => processReview(2)} variant="primary" fullWidth className="h-14 text-xs">Sei</DuoButton>
            </div>
          ) : (
            <DuoButton onClick={() => setShowAnswer(true)} variant="primary" fullWidth className="h-16 text-lg">Ver Resposta</DuoButton>
          )}
          <button onClick={() => setView('deck')} className="mt-4 w-full text-[#afafaf] font-black uppercase text-[10px] text-center">Cancelar</button>
        </footer>
      </div>
    );
  };

  const WritingReviewView = () => {
    const card = reviewQueue[currentCardIndex];
    if (!card) return <div className="p-6 text-[#afafaf]">Erro ao carregar card.</div>;
    const correctAnswer = writingAnswerType === 'meaning' ? card.meaning : card.reading;
    const inputRef = useRef(null);
    useEffect(() => { if (inputRef.current) inputRef.current.focus(); }, [currentCardIndex]);
    const handleSubmit = (e) => { e.preventDefault(); if (writingInput.trim() && !writingResult) checkWritingAnswer(); };
    const handleNext = () => {
      if (writingResult === 'wrong') processReview(0);
      setWritingInput(''); setWritingResult(null);
      if (currentCardIndex < reviewQueue.length - 1) setCurrentCardIndex(prev => prev + 1); else { showAlert('Sessão de revisão concluída!'); setView('deck'); }
    };
    const progress = reviewQueue.length ? ((currentCardIndex + 1) / reviewQueue.length) * 100 : 0;
    return (
      <div className="h-screen flex flex-col p-6 bg-white dark:bg-[#131f24] overflow-y-auto">
        <header className="flex items-center gap-4 mb-8">
          <button onClick={() => setView('deck')} className="text-[#afafaf] p-2"><XCircle size={32} /></button>
          <ProgressBar progress={progress} />
        </header>
        <div className="flex-1 flex flex-col items-center justify-center">
          <DuoCard className="p-10 border-b-8 mb-8 min-w-[300px]">
            <KanjiCard kanji={card.kanji} reading={card.reading} meaning={card.meaning} showBack={false} furiganaMode="never" size="large" />
          </DuoCard>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4 pb-8">
          <div>
            <label className="block font-black text-[10px] text-[#afafaf] dark:text-zinc-400 uppercase tracking-widest mb-2">{writingAnswerType === 'meaning' ? 'Digite o significado' : 'Digite a leitura'}</label>
            <input ref={inputRef} type="text" value={writingInput} onChange={(e) => { setWritingInput(e.target.value); setWritingResult(null); }} disabled={writingResult !== null} placeholder={writingAnswerType === 'meaning' ? 'Ex: Gato' : 'Ex: ねこ'} className={`w-full p-5 rounded-2xl border-2 font-bold outline-none transition-all ${writingResult === 'correct' ? 'bg-[#58cc02]/20 border-[#58cc02] text-[#46a302] dark:text-[#61e002]' : writingResult === 'wrong' ? 'bg-[#ff4b4b]/20 border-[#ff4b4b] text-[#d33131] dark:text-[#ff6b6b]' : 'bg-[#f1f1f1] dark:bg-[#1b2c35] border-[#e5e5e5] dark:border-[#37464f] dark:text-white focus:border-[#1cb0f6]'}`} />
          </div>
          {writingResult === 'correct' && <DuoCard className="border-[#58cc02] bg-[#58cc02]/10"><p className="font-black text-[#58cc02] text-center">✓ Correto!</p></DuoCard>}
          {writingResult === 'wrong' && <DuoCard className="border-[#ff4b4b] bg-[#ff4b4b]/10"><p className="font-black text-[#ff4b4b] text-center mb-2">✗ Incorreto</p><p className="text-xs font-bold text-[#afafaf] text-center">Correto: {correctAnswer}</p></DuoCard>}
          {!writingResult ? <DuoButton type="submit" disabled={!writingInput.trim()} variant="secondary" fullWidth className="h-14">Verificar</DuoButton> : <DuoButton type="button" onClick={handleNext} variant="primary" fullWidth className="h-14">{currentCardIndex < reviewQueue.length - 1 ? 'Próximo Card' : 'Finalizar'}</DuoButton>}
        </form>
        <button onClick={() => setView('deck')} className="text-[#afafaf] font-black uppercase text-[10px] text-center w-full pb-4">Cancelar</button>
      </div>
    );
  };

  const TestModeSelectionView = () => {
    const deck = decks.find(d => d.id === activeDeckId);
    if (!deck) return null;
    const challenges = [
      { title: 'Teste de Tradução', desc: 'Kanji -> Tradução', color: '#58cc02', icon: <MessageCircle size={32} />, onClick: () => startTest(activeDeckId, 'translation') },
      { title: 'Teste de Leitura', desc: 'Kanji -> Hiragana', color: '#1cb0f6', icon: <Layers size={32} />, onClick: () => startTest(activeDeckId, 'reading') },
      { title: 'Teste de Escrita', desc: 'Significado -> Kanji', color: '#ff9600', icon: <Pencil size={32} />, onClick: () => startWritingReview(activeDeckId, 'meaning', true, testQuestionsCount) },
    ];
    return (
      <div className="p-6 pt-10 h-screen bg-white dark:bg-[#131f24] overflow-y-auto">
        <header className="flex items-center gap-4 mb-10">
          <button onClick={() => setView('deck')} className="text-[#afafaf] dark:hover:text-white transition-colors p-2"><ArrowLeft size={28} strokeWidth={3} /></button>
          <h1 className="font-black text-2xl uppercase tracking-tighter dark:text-white">Desafios</h1>
        </header>
        <DuoCard className="mb-6 border-b-4">
          <p className="text-xs font-bold text-[#4b4b4b] dark:text-white mb-3">{testQuestionsCount} questões • 60% para passar (máx. {Math.floor(testQuestionsCount * 0.4)} erros)</p>
          <label className="block text-[10px] font-black text-[#afafaf] uppercase mb-2">Questões</label>
          <select value={Math.min(testQuestionsCount, deck.cards.length)} onChange={(e) => setTestQuestionsCount(Number(e.target.value))} className="w-full px-4 py-3 rounded-2xl bg-[#f1f1f1] dark:bg-[#37464f] border-2 border-[#e5e5e5] dark:border-[#37464f] font-bold dark:text-white outline-none focus:border-[#1cb0f6]">
            {Array.from({ length: Math.max(0, deck.cards.length - Math.min(10, deck.cards.length) + 1) }, (_, i) => Math.min(10, deck.cards.length) + i).filter((n) => n >= 1).map((n) => <option key={n} value={n}>{n}</option>)}
          </select>
        </DuoCard>
        <div className="space-y-4">
          {challenges.map((c, i) => (
            <DuoCard key={i} className="p-6 border-b-8 flex items-center gap-6 cursor-pointer active:translate-y-1 active:border-b-4" interactive onClick={deck.cards.length >= 10 ? c.onClick : undefined}>
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-white shadow-md min-w-[64px]" style={{ backgroundColor: c.color }}>{c.icon}</div>
              <div className="flex-1">
                <h3 className="font-black text-lg dark:text-white leading-tight mb-1">{c.title}</h3>
                <p className="text-xs font-bold text-[#afafaf] dark:text-zinc-400">{c.desc}</p>
              </div>
              {deck.cards.length < 10 && <span className="text-[10px] font-black text-[#ff9600]">Mín. 10 cards</span>}
            </DuoCard>
          ))}
        </div>
        {deck.cards.length < 10 && (
          <DuoCard className="mt-6 border-[#ff9600] bg-[#ff9600]/10">
            <p className="text-sm font-bold text-[#4b4b4b] dark:text-white text-center">O baralho precisa de pelo menos 10 cards. Atualmente: {deck.cards.length}.</p>
          </DuoCard>
        )}
      </div>
    );
  };

  const TestView = () => {
    const currentCard = testQueue[testCurrentIndex];
    if (!currentCard) return <div className="p-6 text-[#afafaf]">Erro ao carregar card.</div>;
    const correctAnswer = testMode === 'translation' ? currentCard.meaning : currentCard.reading;
    const isCorrect = testSelectedAnswer === correctAnswer;
    const maxErrors = Math.floor(testQueue.length * 0.4);

    return (
      <div className="h-full flex flex-col p-6 bg-white dark:bg-[#131f24] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm font-black text-[#afafaf] dark:text-zinc-400">Questão {testCurrentIndex + 1} / {testQueue.length}</span>
          <span className={`text-sm font-black ${testScore.wrong >= maxErrors ? 'text-[#ff4b4b]' : 'text-[#afafaf] dark:text-zinc-400'}`}>Erros: {testScore.wrong} / {maxErrors}</span>
        </div>
        <DuoCard className="flex-1 flex items-center justify-center min-h-[250px] mb-6 border-b-8">
          <KanjiCard kanji={currentCard.kanji} reading={currentCard.reading} meaning={currentCard.meaning} showBack={false} furiganaMode={testMode === 'reading' ? 'never' : 'always'} size="large" />
        </DuoCard>
        <div className="space-y-3 mb-4">
          {testOptions.map((option, index) => {
            const isCorrectOption = option === correctAnswer;
            const isSelected = testSelectedAnswer === option;
            let bg = 'bg-white dark:bg-[#1b2c35] border-[#e5e5e5] dark:border-[#37464f] text-[#4b4b4b] dark:text-white hover:border-[#1cb0f6]';
            if (testShowResult) {
              if (isCorrectOption) bg = 'bg-[#58cc02] border-[#46a302] text-white';
              else if (isSelected && !isCorrectOption) bg = 'bg-[#ff4b4b] border-[#d33131] text-white';
              else bg = 'bg-[#f1f1f1] dark:bg-[#37464f] text-[#afafaf] dark:text-zinc-500 opacity-70';
            }
            return (
              <button key={index} onClick={() => !testShowResult && handleTestAnswer(option)} disabled={testShowResult} className={`w-full py-4 px-6 rounded-2xl font-black text-lg border-2 border-b-4 transition-all ${bg}`}>
                <div className="flex items-center justify-between">
                  <span>{option}</span>
                  {testShowResult && isCorrectOption && <Check size={24} className="text-white" />}
                  {testShowResult && isSelected && !isCorrectOption && <X size={24} className="text-white" />}
                </div>
              </button>
            );
          })}
        </div>
        {testShowResult && (
          <DuoCard className={`mb-4 ${isCorrect ? 'border-[#58cc02] bg-[#58cc02]/10' : 'border-[#ff4b4b] bg-[#ff4b4b]/10'}`}>
            <p className={`font-black text-center ${isCorrect ? 'text-[#58cc02]' : 'text-[#ff4b4b]'}`}>{isCorrect ? '✓ Correto!' : '✗ Incorreto. Correta: ' + correctAnswer}</p>
          </DuoCard>
        )}
        {testShowResult && testScore.wrong < maxErrors && testCurrentIndex < testQueue.length - 1 && (
          <DuoButton onClick={nextTestQuestion} variant="danger" fullWidth className="h-14">Próxima Questão</DuoButton>
        )}
        {testShowResult && (testScore.wrong >= maxErrors || testCurrentIndex >= testQueue.length - 1) && (
          <div className="w-full py-4 rounded-2xl font-bold text-center text-[#afafaf] dark:text-zinc-400">Carregando resultado...</div>
        )}
        <button onClick={() => setView('deck')} className="mt-4 w-full text-[#afafaf] font-black uppercase text-[10px] text-center">Cancelar</button>
      </div>
    );
  };

  // Dev Panel View
  const DevPanelView = () => {
    const [activeTab, setActiveTab] = useState('info');
    const [cloudData, setCloudData] = useState(null);
    const [loadingCloud, setLoadingCloud] = useState(false);
    const [jsonEditor, setJsonEditor] = useState('');
    const [editingKey, setEditingKey] = useState('');

    // Funções Dev
    const getLocalStorageData = () => {
      const data = {};
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        try {
          data[key] = JSON.parse(localStorage.getItem(key));
        } catch {
          data[key] = localStorage.getItem(key);
        }
      }
      return data;
    };

    const exportLocalStorage = () => {
      const data = getLocalStorageData();
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `localStorage-${new Date().toISOString().split('T')[0]}.json`;
      a.click();
      URL.revokeObjectURL(url);
      showAlert('Dados do localStorage exportados com sucesso!');
    };

    const exportCloudData = async () => {
      if (!jsonbinBinId) {
        showAlert('Configure o ID de usuário primeiro.');
        return;
      }
      setLoadingCloud(true);
      try {
        const result = await window.jsonbinService.getUserData(jsonbinBinId, null);
        if (result.success && result.data) {
          const blob = new Blob([JSON.stringify(result.data, null, 2)], { type: 'application/json' });
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `cloud-data-${new Date().toISOString().split('T')[0]}.json`;
          a.click();
          URL.revokeObjectURL(url);
          showAlert('Dados da nuvem exportados com sucesso!');
        } else {
          showAlert('Erro ao buscar dados da nuvem: ' + (result.error || 'Dados não encontrados'));
        }
      } catch (error) {
        showAlert('Erro ao exportar dados da nuvem: ' + error.message);
      } finally {
        setLoadingCloud(false);
      }
    };

    const loadCloudData = async () => {
      if (!jsonbinBinId) {
        showAlert('Configure o ID de usuário primeiro.');
        return;
      }
      setLoadingCloud(true);
      try {
        const result = await window.jsonbinService.getSharedBin(null);
        if (result.success) {
          setCloudData(result.data);
        } else {
          showAlert('Erro ao carregar dados da nuvem: ' + result.error);
        }
      } catch (error) {
        showAlert('Erro ao carregar dados da nuvem: ' + error.message);
      } finally {
        setLoadingCloud(false);
      }
    };

    const clearData = (type) => {
      const messages = {
        decks: 'Tem certeza que deseja limpar TODOS os decks? Esta ação não pode ser desfeita.',
        tags: 'Tem certeza que deseja limpar TODAS as tags? Esta ação não pode ser desfeita.',
        all: 'Tem certeza que deseja limpar TODOS os dados? Esta ação não pode ser desfeita.'
      };
      showConfirm(messages[type], () => {
        if (type === 'decks' || type === 'all') {
          setDecks([]);
          localStorage.removeItem('nihongo_decks');
        }
        if (type === 'tags' || type === 'all') {
          setAvailableTags([]);
          localStorage.removeItem('nihongo_tags');
        }
        if (type === 'all') {
          localStorage.removeItem('jsonbin_bin_id');
          setJsonbinBinId('');
          if (typeof window !== 'undefined' && window.apiService) {
            window.apiService.clearTokens();
          }
          setApiUser(null);
        }
        showAlert('Dados limpos com sucesso!');
      });
    };

    const testApiConnection = async () => {
      const apiKey = localStorage.getItem('gemini_api_key');
      if (!apiKey) {
        showAlert('Configure a chave API primeiro.');
        return;
      }
      setIsGenerating(true);
      try {
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [{ parts: [{ text: 'Teste de conexão. Responda apenas: OK' }] }]
            })
          }
        );
        if (response.ok) {
          const data = await response.json();
          showAlert('✅ Conexão com API bem-sucedida!');
        } else {
          showAlert('❌ Ocorreu um problema na API do Gemini. Insira uma nova chave.');
          openApiKeyModalDueToError();
        }
      } catch (error) {
        showAlert('❌ Erro ao testar conexão: ' + error.message);
      } finally {
        setIsGenerating(false);
      }
    };

    const loadTestData = () => {
      showConfirm('Carregar dados de teste? Isso adicionará um deck de exemplo com muitos cards.', () => {
        const testDeck = {
          id: 'test-deck-' + Date.now(),
          name: 'Deck de Teste (Dev)',
          cards: Array.from({ length: 50 }, (_, i) => ({
            id: 'test-card-' + i,
            kanji: `漢字${i}`,
            reading: `かんじ${i}`,
            meaning: `Significado ${i}`,
            interval: 0,
            nextReview: Date.now()
          }))
        };
        setDecks([...decks, testDeck]);
        showAlert('Deck de teste carregado com sucesso!');
      });
    };

    const localStorageData = getLocalStorageData();
    const totalCards = decks.reduce((sum, d) => sum + (d.cards?.length || 0), 0);
    const apiKey = localStorage.getItem('gemini_api_key');
    const maskedApiKey = apiKey ? apiKey.substring(0, 8) + '...' + apiKey.substring(apiKey.length - 4) : 'Não configurada';

    return (
      <div className="p-6 pt-10 h-screen bg-white dark:bg-[#131f24] overflow-y-auto pb-24">
        <header className="flex items-center gap-4 mb-8">
          <button onClick={() => setView('home')} className="text-[#afafaf] hover:text-[#4b4b4b] dark:hover:text-white transition-colors p-2">
            <ArrowLeft size={28} strokeWidth={3} />
          </button>
          <h1 className="font-black text-2xl uppercase tracking-tighter text-[#a855f7] dark:text-[#a855f7] flex items-center gap-2">
            <Settings size={24} className="text-[#a855f7]" />
            Painel Dev
          </h1>
          <span className="px-2 py-1 text-[10px] font-black bg-[#5844ed] text-white rounded">DEV</span>
        </header>

        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {['info', 'export', 'clear', 'cloud', 'api', 'editor'].map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} className={`px-4 py-3 rounded-2xl font-black text-xs uppercase border-b-2 whitespace-nowrap transition-all ${activeTab === tab ? 'bg-[#5844ed] border-[#4636be] text-white' : 'bg-[#f1f1f1] dark:bg-[#1b2c35] border-[#e5e5e5] dark:border-[#37464f] dark:text-white'}`}>
              {tab === 'info' && 'Info'}{tab === 'export' && 'Exportar'}{tab === 'clear' && 'Limpar'}{tab === 'cloud' && 'Nuvem'}{tab === 'api' && 'API'}{tab === 'editor' && 'Editor'}
            </button>
          ))}
        </div>

        <div className="flex-1 overflow-y-auto">

          {activeTab === 'info' && (
            <div className="space-y-4">
              <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg border border-purple-200 dark:border-purple-800">
                <h3 className="font-bold text-purple-800 dark:text-purple-200 mb-2">Estado da Aplicação</h3>
                <div className="space-y-2 text-sm">
                  <div><strong>Decks:</strong> {decks.length}</div>
                  <div><strong>Total de Cards:</strong> {totalCards}</div>
                  <div><strong>Tags:</strong> {availableTags.length}</div>
                  <div><strong>ID Usuário JSONBin:</strong> {jsonbinBinId || 'Não configurado'}</div>
                  <div><strong>Chave API:</strong> {maskedApiKey}</div>
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                <h3 className="font-bold text-gray-800 dark:text-gray-200 mb-2">LocalStorage</h3>
                <div className="space-y-2 text-xs max-h-96 overflow-y-auto">
                  {Object.entries(localStorageData).map(([key, value]) => (
                    <div key={key} className="p-2 bg-white dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-700">
                      <div className="font-semibold text-gray-700 dark:text-gray-300">{key}:</div>
                      <pre className="text-xs mt-1 overflow-x-auto text-gray-600 dark:text-gray-400">
                        {typeof value === 'object' ? JSON.stringify(value, null, 2).substring(0, 200) + '...' : String(value).substring(0, 100)}
                      </pre>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'export' && (
            <div className="space-y-4">
              <button
                onClick={exportLocalStorage}
                className="w-full p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
              >
                <Download size={18} className="inline mr-2" />
                Exportar LocalStorage
              </button>
              <button
                onClick={exportCloudData}
                disabled={loadingCloud || !jsonbinBinId}
                className="w-full p-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium disabled:opacity-50"
              >
                <Download size={18} className="inline mr-2" />
                {loadingCloud ? 'Carregando...' : 'Exportar Dados da Nuvem'}
              </button>
              <button
                onClick={() => {
                  const allData = {
                    localStorage: getLocalStorageData(),
                    timestamp: new Date().toISOString()
                  };
                  const blob = new Blob([JSON.stringify(allData, null, 2)], { type: 'application/json' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = `full-export-${new Date().toISOString().split('T')[0]}.json`;
                  a.click();
                  URL.revokeObjectURL(url);
                  showAlert('Exportação completa realizada!');
                }}
                className="w-full p-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-medium"
              >
                <Download size={18} className="inline mr-2" />
                Exportar Tudo
              </button>
            </div>
          )}

          {activeTab === 'clear' && (
            <div className="space-y-4">
              <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg border border-red-200 dark:border-red-800">
                <p className="text-sm text-red-800 dark:text-red-200 font-semibold mb-2">⚠️ Atenção: Estas ações são irreversíveis!</p>
              </div>
              <button
                onClick={() => clearData('decks')}
                className="w-full p-3 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 font-medium"
              >
                Limpar Todos os Decks
              </button>
              <button
                onClick={() => clearData('tags')}
                className="w-full p-3 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 font-medium"
              >
                Limpar Todas as Tags
              </button>
              <button
                onClick={() => clearData('all')}
                className="w-full p-3 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium"
              >
                Limpar Tudo
              </button>
            </div>
          )}

          {activeTab === 'cloud' && (
            <div className="space-y-4">
              <button
                onClick={loadCloudData}
                disabled={loadingCloud || !jsonbinBinId}
                className="w-full p-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium disabled:opacity-50"
              >
                {loadingCloud ? 'Carregando...' : 'Carregar Dados da Nuvem'}
              </button>
              {cloudData && (
                <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                  <h3 className="font-bold mb-2">Usuários no Bin Compartilhado:</h3>
                  <div className="text-xs max-h-96 overflow-y-auto">
                    <pre className="whitespace-pre-wrap font-mono">{JSON.stringify(cloudData, null, 2)}</pre>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'api' && (
            <div className="space-y-4">
              <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                <div className="text-sm mb-2"><strong>Chave API:</strong> {maskedApiKey}</div>
              </div>
              <button
                onClick={testApiConnection}
                disabled={isGenerating || !apiKey}
                className="w-full p-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium disabled:opacity-50"
              >
                {isGenerating ? 'Testando...' : 'Testar Conexão com API'}
              </button>
            </div>
          )}

          {activeTab === 'editor' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Chave do LocalStorage:</label>
                <input
                  type="text"
                  value={editingKey}
                  onChange={(e) => {
                    setEditingKey(e.target.value);
                    const value = localStorage.getItem(e.target.value);
                    try {
                      setJsonEditor(value ? (typeof JSON.parse(value) === 'object' ? JSON.stringify(JSON.parse(value), null, 2) : value) : '');
                    } catch {
                      setJsonEditor(value || '');
                    }
                  }}
                  className="w-full p-3 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-800 dark:text-white focus:ring-2 focus:ring-purple-500 outline-none mb-2"
                  placeholder="Ex: nihongo_decks"
                />
              </div>
              {editingKey && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Valor (JSON):</label>
                    <textarea
                      value={jsonEditor}
                      onChange={(e) => setJsonEditor(e.target.value)}
                      className="w-full p-3 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg font-mono text-xs text-gray-800 dark:text-white focus:ring-2 focus:ring-purple-500 outline-none"
                      rows="15"
                    />
                  </div>
                  <button
                    onClick={() => {
                      try {
                        const parsed = JSON.parse(jsonEditor);
                        localStorage.setItem(editingKey, JSON.stringify(parsed));
                        if (editingKey === 'nihongo_decks') {
                          setDecks(parsed);
                        } else if (editingKey === 'nihongo_tags') {
                          setAvailableTags(parsed);
                        }
                        showAlert('Dados salvos com sucesso!');
                      } catch (e) {
                        showAlert('Erro: JSON inválido - ' + e.message);
                      }
                    }}
                    className="w-full p-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-medium"
                  >
                    Salvar Alterações
                  </button>
                </>
              )}
              <button
                onClick={loadTestData}
                className="w-full p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
              >
                Carregar Dados de Teste
              </button>
            </div>
          )}
        </div>
      </div>
    );
  };

  const TestResultView = () => {
    const totalQuestions = 10;
    const percentage = totalQuestions > 0 ? Math.round((testScore.correct / totalQuestions) * 100) : 0;
    return (
      <div className="h-full flex flex-col p-6 bg-white dark:bg-[#131f24] overflow-y-auto">
        <div className="flex-1 flex flex-col items-center justify-center">
          {testPassed ? (
            <>
              <Award size={64} className="text-[#58cc02] mx-auto mb-4" />
              <h2 className="font-black text-2xl uppercase tracking-tighter text-[#58cc02] mb-6 text-center">Parabéns! Você passou!</h2>
              <DuoCard className="w-full mb-6 border-[#58cc02] bg-[#58cc02]/10 border-b-4">
                <div className="text-center mb-4">
                  <div className="text-4xl font-black text-[#58cc02] mb-2">{testScore.correct} / {totalQuestions}</div>
                  <div className="text-sm font-bold text-[#afafaf] dark:text-zinc-400">{percentage}% de acertos</div>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="text-center"><span className="text-[10px] font-black text-[#afafaf] uppercase">Acertos</span><div className="text-2xl font-black text-[#58cc02]">{testScore.correct}</div></div>
                  <div className="text-center"><span className="text-[10px] font-black text-[#afafaf] uppercase">Erros</span><div className="text-2xl font-black text-[#ff4b4b]">{testScore.wrong}</div></div>
                </div>
              </DuoCard>
              <DuoButton onClick={() => setView('test-mode-selection')} variant="danger" fullWidth className="mb-3 h-14">Novo Teste</DuoButton>
            </>
          ) : (
            <>
              <AlertCircle size={64} className="text-[#ff4b4b] mx-auto mb-4" />
              <h2 className="font-black text-2xl uppercase tracking-tighter text-[#ff4b4b] mb-6 text-center">Você errou 4 ou mais</h2>
              <DuoCard className="w-full mb-6 border-[#ff4b4b] bg-[#ff4b4b]/10 border-b-4">
                <div className="text-center mb-4">
                  <div className="text-4xl font-black text-[#ff4b4b] mb-2">{testScore.correct} / {totalQuestions}</div>
                  <div className="text-sm font-bold text-[#afafaf] dark:text-zinc-400">{percentage}% de acertos</div>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="text-center"><span className="text-[10px] font-black text-[#afafaf] uppercase">Acertos</span><div className="text-2xl font-black text-[#58cc02]">{testScore.correct}</div></div>
                  <div className="text-center"><span className="text-[10px] font-black text-[#afafaf] uppercase">Erros</span><div className="text-2xl font-black text-[#ff4b4b]">{testScore.wrong}</div></div>
                </div>
                <p className="text-[10px] font-bold text-[#ff9600] text-center mt-4">Precisa de pelo menos 60% para passar. Continue estudando!</p>
              </DuoCard>
              <DuoButton onClick={restartTest} variant="danger" fullWidth className="mb-3 h-14">Tentar Novamente</DuoButton>
            </>
          )}
          <DuoButton onClick={() => setView('deck')} variant="outline" fullWidth className="h-14">Voltar ao Baralho</DuoButton>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen font-sans bg-white dark:bg-[#131f24] text-[#4b4b4b] dark:text-white transition-colors duration-300">
      <div className="max-w-md mx-auto min-h-screen flex flex-col shadow-2xl bg-white dark:bg-[#131f24] relative overflow-hidden">
      {/* Modals Layer */}
      {showApiKeyModal && (
        <Modal isOpen={true} onClose={() => { if (apiKeyModalDueToError) { setShowApiKeyModal(false); setApiKeyModalDueToError(false); } }} title={apiKeyModalDueToError ? 'Problema na API do Gemini' : 'Configuração Inicial'}>
          {apiKeyModalDueToError ? (
            <>
              <p className="text-sm font-bold text-[#afafaf] dark:text-zinc-400 mb-4">Ocorreu um problema na API do Gemini. Insira uma nova chave abaixo.</p>
              <label className="block font-black text-[10px] text-[#afafaf] dark:text-zinc-400 uppercase tracking-widest mb-2">Nova Chave API do Gemini</label>
              <input type="password" autoFocus value={apiKeyInput} onChange={(e) => setApiKeyInput(e.target.value)} placeholder="Cole sua nova chave aqui" onKeyDown={(e) => { if (e.key === 'Enter' && apiKeyInput.trim()) saveApiKey(); }} className="w-full p-4 bg-[#f1f1f1] dark:bg-[#1b2c35] border-2 border-[#e5e5e5] dark:border-[#37464f] rounded-2xl font-bold outline-none focus:border-[#1cb0f6] dark:text-white mb-3" />
              <p className="text-[10px] font-bold text-[#afafaf] mb-2"><a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="text-[#1cb0f6] hover:underline">Obter nova chave no Google AI Studio</a></p>
              <p className="text-xs font-bold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-700 rounded-xl p-3 mb-4">Delete a API Key antiga e crie uma nova para resolver o erro.</p>
              <DuoButton onClick={saveApiKey} disabled={!apiKeyInput.trim()} variant="primary" fullWidth className="h-14">Salvar nova chave</DuoButton>
            </>
          ) : (
            <>
              <p className="text-sm font-bold text-[#afafaf] dark:text-zinc-400 mb-4">Para usar o gerador com IA, use sua chave API do Google Gemini.</p>
              <label className="block font-black text-[10px] text-[#afafaf] dark:text-zinc-400 uppercase tracking-widest mb-2">Chave API do Gemini</label>
              <input type="password" autoFocus value={apiKeyInput} onChange={(e) => setApiKeyInput(e.target.value)} placeholder="Cole sua chave aqui" onKeyDown={(e) => { if (e.key === 'Enter' && apiKeyInput.trim()) saveApiKey(); }} className="w-full p-4 bg-[#f1f1f1] dark:bg-[#1b2c35] border-2 border-[#e5e5e5] dark:border-[#37464f] rounded-2xl font-bold outline-none focus:border-[#1cb0f6] dark:text-white mb-4" />
              <p className="text-[10px] font-bold text-[#afafaf] mb-6"><a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="text-[#1cb0f6] hover:underline">Google AI Studio</a></p>
              <DuoButton onClick={saveApiKey} disabled={!apiKeyInput.trim()} variant="primary" fullWidth className="h-14">Salvar Chave</DuoButton>
            </>
          )}
        </Modal>
      )}

      {showBinIdModal && (
        <Modal 
          isOpen={true} 
          onClose={() => {
            setShowBinIdModal(false);
            setJsonbinBinIdInput('');
          }} 
          title={binIdModalMode === 'edit' ? 'Editar ID de Usuário' : 'Inserir ID de Usuário'}
        >
          <div className="space-y-4">
            <p className="text-sm font-bold text-[#afafaf] dark:text-zinc-400">{binIdModalMode === 'edit' ? 'Altere o ID para sincronizar na nuvem.' : 'Digite seu ID. Sem ID? Use "Criar Novo ID" no menu.'}</p>
            <div>
              <label className="block font-black text-[10px] text-[#afafaf] uppercase tracking-widest mb-2">ID de Usuário</label>
              <input type="text" autoFocus value={jsonbinBinIdInput} onChange={(e) => setJsonbinBinIdInput(e.target.value)} placeholder="Ex: user123" onKeyDown={(e) => { if (e.key === 'Enter' && jsonbinBinIdInput.trim()) saveJsonbinBinId(); }} className="w-full p-4 bg-[#f1f1f1] dark:bg-[#1b2c35] border-2 border-[#e5e5e5] dark:border-[#37464f] rounded-2xl font-bold font-mono outline-none focus:border-[#1cb0f6] dark:text-white"
              />
              <p className="text-[10px] font-bold text-[#afafaf] mt-2">ID único para seus dados na nuvem.</p>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-6">
              <DuoButton variant="outline" onClick={() => { setShowBinIdModal(false); setJsonbinBinIdInput(''); }} fullWidth>Cancelar</DuoButton>
              <DuoButton variant="secondary" onClick={saveJsonbinBinId} disabled={!jsonbinBinIdInput.trim() || isSyncing} fullWidth>{isSyncing ? <><RefreshCw size={18} className="animate-spin" /> Verificando...</> : (binIdModalMode === 'edit' ? 'Salvar' : 'Conectar')}</DuoButton>
            </div>
          </div>
        </Modal>
      )}

      {showAuthModal && (
        <Modal isOpen={true} onClose={closeAuthModal} title={authMode === 'register' ? 'Criar conta' : 'Entrar'}>
          <div className="space-y-4">
            {authError && <p className="text-sm font-bold text-[#ff4b4b]">{authError}</p>}
            <div>
              <label className="block font-black text-[10px] text-[#afafaf] uppercase tracking-widest mb-2">Email</label>
              <input type="email" autoComplete="email" value={authEmail} onChange={(e) => setAuthEmail(e.target.value)} placeholder="seu@email.com" className="w-full p-4 bg-[#f1f1f1] dark:bg-[#1b2c35] border-2 border-[#e5e5e5] dark:border-[#37464f] rounded-2xl font-bold outline-none focus:border-[#1cb0f6] dark:text-white" />
            </div>
            {authMode === 'register' && (
              <div>
                <label className="block font-black text-[10px] text-[#afafaf] uppercase tracking-widest mb-2">Nome (opcional)</label>
                <input type="text" autoComplete="name" value={authName} onChange={(e) => setAuthName(e.target.value)} placeholder="Seu nome" className="w-full p-4 bg-[#f1f1f1] dark:bg-[#1b2c35] border-2 border-[#e5e5e5] dark:border-[#37464f] rounded-2xl font-bold outline-none focus:border-[#1cb0f6] dark:text-white" />
              </div>
            )}
            <div>
              <label className="block font-black text-[10px] text-[#afafaf] uppercase tracking-widest mb-2">Senha</label>
              <input type="password" autoComplete={authMode === 'register' ? 'new-password' : 'current-password'} value={authPassword} onChange={(e) => setAuthPassword(e.target.value)} placeholder={authMode === 'register' ? 'Mínimo 6 caracteres' : 'Senha'} className="w-full p-4 bg-[#f1f1f1] dark:bg-[#1b2c35] border-2 border-[#e5e5e5] dark:border-[#37464f] rounded-2xl font-bold outline-none focus:border-[#1cb0f6] dark:text-white" />
            </div>
            <button type="button" onClick={() => { setAuthMode(authMode === 'login' ? 'register' : 'login'); setAuthError(''); }} className="text-sm font-bold text-[#1cb0f6] hover:underline">
              {authMode === 'login' ? 'Criar conta' : 'Já tenho conta'}
            </button>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <DuoButton variant="outline" onClick={closeAuthModal} fullWidth>Cancelar</DuoButton>
              <DuoButton variant="primary" onClick={authMode === 'login' ? handleLogin : handleRegister} disabled={authLoading || !authEmail.trim() || !authPassword} fullWidth>
                {authLoading ? <><RefreshCw size={18} className="animate-spin" /> Aguarde...</> : (authMode === 'login' ? 'Entrar' : 'Registrar')}
              </DuoButton>
            </div>
          </div>
        </Modal>
      )}

      {modalConfig.type === 'create_deck' && (
        <Modal isOpen={true} onClose={closeModal} title="Novo Baralho">
          <p className="text-sm font-bold text-[#afafaf] dark:text-zinc-400 mb-4">Dê um nome para o baralho.</p>
          <input autoFocus type="text" placeholder="Ex: Verbos N5" value={tempInput} onChange={(e) => setTempInput(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter' && tempInput.trim()) createDeck(tempInput); }} className="w-full p-4 bg-[#f1f1f1] dark:bg-[#1b2c35] border-2 border-[#e5e5e5] dark:border-[#37464f] rounded-2xl font-bold outline-none focus:border-[#58cc02] dark:text-white mb-6" />
          <DuoButton onClick={() => tempInput.trim() && createDeck(tempInput)} disabled={!tempInput.trim()} variant="primary" fullWidth className="h-14">Criar</DuoButton>
        </Modal>
      )}

      {modalConfig.type === 'notes_to_cards' && (
        <Modal isOpen={true} onClose={closeModal} title="Anotações de aula → Flashcards" maxWidthClass="max-w-lg">
          <div className="space-y-4">
            <label className="block font-black text-[10px] text-[#afafaf] dark:text-zinc-400 uppercase tracking-widest mb-2">Texto das anotações</label>
            <textarea
              value={notesInput}
              onChange={(e) => setNotesInput(e.target.value)}
              placeholder="Cole aqui todas as anotações da aula..."
              className="w-full min-h-[200px] p-4 bg-[#f1f1f1] dark:bg-[#1b2c35] border-2 border-[#e5e5e5] dark:border-[#37464f] rounded-2xl font-bold text-[#4b4b4b] dark:text-white outline-none focus:border-[#1cb0f6] transition resize-y"
              disabled={isGenerating}
            />
            <p className="text-[10px] font-bold text-[#afafaf] dark:text-zinc-400">
              A IA analisará o texto e criará a quantidade de flashcards adequada ao conteúdo (entre 3 e 50).
            </p>
            <div className="grid grid-cols-2 gap-4 pt-2">
              <DuoButton variant="outline" onClick={closeModal} fullWidth>Cancelar</DuoButton>
              <DuoButton
                variant="indigo"
                onClick={() => handleGenerateFromNotes(notesInput)}
                disabled={!notesInput.trim() || isGenerating}
                fullWidth
                className="flex items-center justify-center gap-2"
              >
                {isGenerating ? (
                  <><RefreshCw size={18} className="animate-spin" /> Gerando...</>
                ) : (
                  <><Sparkles size={18} /> Gerar flashcards</>
                )}
              </DuoButton>
            </div>
          </div>
        </Modal>
      )}

      {modalConfig.type === 'add_card' && (
        <Modal isOpen={true} onClose={closeModal} title="Adicionar Card Manualmente">
          <div className="space-y-4">
            <div>
              <label className="block font-black text-[10px] text-[#afafaf] dark:text-zinc-400 uppercase tracking-widest mb-2">Kanji / Palavra</label>
              <input 
                type="text" 
                autoFocus
                value={newCardForm.kanji}
                onChange={(e) => setNewCardForm({...newCardForm, kanji: e.target.value})}
                placeholder="Ex: 猫"
                className="w-full p-4 bg-[#f1f1f1] dark:bg-[#1b2c35] border-2 border-[#e5e5e5] dark:border-[#37464f] rounded-2xl font-bold text-[#4b4b4b] dark:text-white outline-none focus:border-[#58cc02]"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && newCardForm.kanji.trim() && newCardForm.reading.trim() && newCardForm.meaning.trim()) {
                    saveNewCard();
                  }
                }}
              />
            </div>
            <div>
              <label className="block font-black text-[10px] text-[#afafaf] dark:text-zinc-400 uppercase tracking-widest mb-2">Leitura (Hiragana/Katakana)</label>
              <input 
                type="text" 
                value={newCardForm.reading}
                onChange={(e) => setNewCardForm({...newCardForm, reading: e.target.value})}
                placeholder="Ex: ねこ"
                className="w-full p-4 bg-[#f1f1f1] dark:bg-[#1b2c35] border-2 border-[#e5e5e5] dark:border-[#37464f] rounded-2xl font-bold text-[#4b4b4b] dark:text-white outline-none focus:border-[#58cc02]"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && newCardForm.kanji.trim() && newCardForm.reading.trim() && newCardForm.meaning.trim()) {
                    saveNewCard();
                  }
                }}
              />
            </div>
            <div>
              <label className="block font-black text-[10px] text-[#afafaf] dark:text-zinc-400 uppercase tracking-widest mb-2">Significado</label>
              <input 
                type="text" 
                value={newCardForm.meaning}
                onChange={(e) => setNewCardForm({...newCardForm, meaning: e.target.value})}
                placeholder="Ex: Gato"
                className="w-full p-4 bg-[#f1f1f1] dark:bg-[#1b2c35] border-2 border-[#e5e5e5] dark:border-[#37464f] rounded-2xl font-bold text-[#4b4b4b] dark:text-white outline-none focus:border-[#58cc02]"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && newCardForm.kanji.trim() && newCardForm.reading.trim() && newCardForm.meaning.trim()) {
                    saveNewCard();
                  }
                }}
              />
            </div>
            <div className="grid grid-cols-2 gap-4 pt-2">
              <DuoButton variant="outline" onClick={closeModal} fullWidth>Cancelar</DuoButton>
              <DuoButton variant="primary" onClick={saveNewCard} disabled={!newCardForm.kanji.trim() || !newCardForm.reading.trim() || !newCardForm.meaning.trim()} fullWidth>Adicionar</DuoButton>
            </div>
          </div>
        </Modal>
      )}

      {modalConfig.type === 'confirm' && (
        <Modal isOpen={true} onClose={closeModal} title="Confirmação">
          <p className="text-sm font-bold text-[#afafaf] dark:text-zinc-400 mb-6">{modalConfig.data.message}</p>
          <div className="grid grid-cols-2 gap-4">
            <DuoButton variant="outline" onClick={closeModal} fullWidth>Cancelar</DuoButton>
            <DuoButton variant="danger" onClick={modalConfig.data.onConfirm} fullWidth>Confirmar</DuoButton>
          </div>
        </Modal>
      )}

      {modalConfig.type === 'alert' && (
        <Modal isOpen={true} onClose={closeModal} title="Aviso">
          <p className="text-sm font-bold text-[#afafaf] dark:text-zinc-400 mb-6 flex items-start gap-3">
            <AlertCircle size={22} className="text-[#1cb0f6] shrink-0 mt-0.5" />
            {modalConfig.data.message}
          </p>
          <DuoButton onClick={closeModal} variant="secondary" fullWidth className="h-14">OK</DuoButton>
        </Modal>
      )}

      {modalConfig.type === 'edit_card' && editingCard && (
        <Modal isOpen={true} onClose={closeModal} title="Editar Card">
          <div className="space-y-4 max-h-[80vh] overflow-y-auto">
            <div>
              <label className="block font-black text-[10px] text-[#afafaf] dark:text-zinc-400 uppercase tracking-widest mb-2">Kanji / Palavra</label>
              <input 
                type="text" 
                value={editCardForm.kanji}
                onChange={(e) => setEditCardForm({...editCardForm, kanji: e.target.value})}
                className="w-full p-4 bg-[#f1f1f1] dark:bg-[#1b2c35] border-2 border-[#e5e5e5] dark:border-[#37464f] rounded-2xl font-bold text-[#4b4b4b] dark:text-white outline-none focus:border-[#1cb0f6]"
              />
            </div>
            <div>
              <label className="block font-black text-[10px] text-[#afafaf] dark:text-zinc-400 uppercase tracking-widest mb-2">Leitura (Hiragana/Katakana)</label>
              <input 
                type="text" 
                value={editCardForm.reading}
                onChange={(e) => setEditCardForm({...editCardForm, reading: e.target.value})}
                className="w-full p-4 bg-[#f1f1f1] dark:bg-[#1b2c35] border-2 border-[#e5e5e5] dark:border-[#37464f] rounded-2xl font-bold text-[#4b4b4b] dark:text-white outline-none focus:border-[#1cb0f6]"
              />
            </div>
            <div>
              <label className="block font-black text-[10px] text-[#afafaf] dark:text-zinc-400 uppercase tracking-widest mb-2">Significado</label>
              <input 
                type="text" 
                value={editCardForm.meaning}
                onChange={(e) => setEditCardForm({...editCardForm, meaning: e.target.value})}
                className="w-full p-4 bg-[#f1f1f1] dark:bg-[#1b2c35] border-2 border-[#e5e5e5] dark:border-[#37464f] rounded-2xl font-bold text-[#4b4b4b] dark:text-white outline-none focus:border-[#1cb0f6]"
              />
            </div>

            {/* Tags */}
            <div className="mt-4 pt-4 border-t-2 border-[#e5e5e5] dark:border-[#37464f]">
              <label className="block font-black text-[10px] text-[#afafaf] dark:text-zinc-400 uppercase tracking-widest mb-2">Tags</label>
              <div className="flex flex-wrap gap-2 mb-2">
                {(editingCard.tags || []).map((tag, idx) => (
                  <span key={idx} className="inline-flex items-center gap-1 px-2 py-1 bg-[#1cb0f6]/20 text-[#1cb0f6] dark:text-[#84d8ff] rounded-xl text-xs font-bold">
                    <Tag size={12} />
                    {tag}
                    <button
                      onClick={() => removeTagFromCard(editingCard.id, tag)}
                      className="ml-1 text-[#1cb0f6] hover:opacity-80 touch-target"
                    >
                      <X size={12} />
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newTagInput}
                  onChange={(e) => setNewTagInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && newTagInput.trim()) {
                      e.preventDefault();
                      addTagToCard(editingCard.id, newTagInput);
                      setNewTagInput('');
                    }
                  }}
                  placeholder="Adicionar tag..."
                  className="flex-1 p-3 bg-[#f1f1f1] dark:bg-[#1b2c35] border-2 border-[#e5e5e5] dark:border-[#37464f] rounded-2xl text-[#4b4b4b] dark:text-white outline-none focus:border-[#1cb0f6] text-sm font-bold"
                />
                <DuoButton variant="secondary" className="shrink-0" onClick={() => {
                  if (newTagInput.trim()) {
                    addTagToCard(editingCard.id, newTagInput);
                    setNewTagInput('');
                  }
                }}>
                  <Plus size={16} />
                </DuoButton>
              </div>
              {availableTags.length > 0 && (
                <div className="mt-2">
                  <p className="text-[10px] font-bold text-[#afafaf] dark:text-zinc-400 uppercase tracking-widest mb-1">Tags disponíveis</p>
                  <div className="flex flex-wrap gap-1">
                    {availableTags.filter(tag => !(editingCard.tags || []).includes(tag)).map(tag => (
                      <button
                        key={tag}
                        onClick={() => addTagToCard(editingCard.id, tag)}
                        className="px-2 py-1 bg-[#f1f1f1] dark:bg-[#37464f] text-[#4b4b4b] dark:text-white rounded-xl text-xs font-bold hover:bg-[#e5e5e5] dark:hover:bg-[#4b5a62] transition"
                      >
                        + {tag}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Histórico de Revisões */}
            {editingCard.reviewHistory && editingCard.reviewHistory.length > 0 && (
              <div className="mt-4 pt-4 border-t-2 border-[#e5e5e5] dark:border-[#37464f]">
                <div className="flex items-center gap-2 mb-3">
                  <History size={18} className="text-[#afafaf] dark:text-zinc-400" />
                  <h4 className="text-[10px] font-black text-[#afafaf] dark:text-zinc-400 uppercase tracking-widest">Histórico de Revisões</h4>
                </div>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {editingCard.reviewHistory.slice().reverse().map((review, idx) => {
                    const date = new Date(review.date);
                    const qualityLabels = { 0: 'Não sei', 1: 'Dúvida', 2: 'Sei' };
                    return (
                      <div key={idx} className="p-3 bg-[#f1f1f1] dark:bg-[#1b2c35] border-2 border-[#e5e5e5] dark:border-[#37464f] rounded-2xl text-xs">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-[#afafaf] dark:text-zinc-400 font-bold">{date.toLocaleString('pt-BR')}</span>
                          <span className={`px-2 py-0.5 rounded-xl font-black text-white text-[10px] uppercase ${
                            review.quality === 0 ? 'bg-[#ff4b4b]' : review.quality === 1 ? 'bg-[#ff9600]' : 'bg-[#58cc02]'
                          }`}>
                            {qualityLabels[review.quality]}
                          </span>
                        </div>
                        <div className="text-[#afafaf] dark:text-zinc-400 text-[10px]">
                          Intervalo: {review.intervalBefore} → {review.intervalAfter} dias | Facilidade: {review.easeFactorBefore.toFixed(2)} → {review.easeFactorAfter.toFixed(2)}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            <div className="pt-4">
              <DuoButton variant="warning" fullWidth className="mb-3" onClick={() => resetCardProgress(editingCard.id)}>Resetar Progresso</DuoButton>
            </div>
            <div className="grid grid-cols-2 gap-4 pt-2">
              <DuoButton variant="outline" onClick={closeModal} fullWidth>Cancelar</DuoButton>
              <DuoButton variant="secondary" onClick={saveEditedCard} disabled={!editCardForm.kanji.trim() || !editCardForm.reading.trim() || !editCardForm.meaning.trim()} fullWidth>Salvar</DuoButton>
            </div>
          </div>
        </Modal>
      )}

      {/* Tela de Configurações (abre ao clicar na engrenagem) */}
      {view === 'settings' && (
        <div className="min-h-screen bg-white dark:bg-[#131f24] pb-24 safe-top safe-bottom">
          <header className="sticky top-0 z-30 flex items-center gap-4 p-4 bg-white dark:bg-[#131f24] border-b-2 border-[#e5e5e5] dark:border-[#37464f] safe-top">
            <button onClick={() => setView('home')} className="p-2 text-[#afafaf] dark:hover:text-white transition-colors touch-target" aria-label="Voltar">
              <ArrowLeft size={28} strokeWidth={3} />
            </button>
            <h1 className="font-black text-xl uppercase tracking-tighter text-[#4b4b4b] dark:text-white flex items-center gap-2">
              <Settings size={24} className="text-[#1cb0f6]" />
              Configurações
            </h1>
          </header>
          <div className="p-4 max-w-md mx-auto space-y-1">
            <label className="flex items-center gap-3 p-3 rounded-xl hover:bg-[#f1f1f1] dark:hover:bg-[#37464f] cursor-pointer transition">
              <Upload size={18} className="text-[#4b4b4b] dark:text-white" />
              <span className="text-sm font-bold text-[#4b4b4b] dark:text-white">Importar dados da versão antiga (JSON)</span>
              <input type="file" onChange={handleImport} className="hidden" accept=".json" />
            </label>
            <div className="border-t-2 border-[#e5e5e5] dark:border-[#37464f] my-2" />
            <button onClick={() => setView('stats')} className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-[#f1f1f1] dark:hover:bg-[#37464f] transition text-left">
              <BarChart2 size={18} className="text-[#4b4b4b] dark:text-white" />
              <span className="text-sm font-bold text-[#4b4b4b] dark:text-white">Estatísticas</span>
            </button>
            <div className="border-t-2 border-[#e5e5e5] dark:border-[#37464f] my-2" />
            <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-[#f1f1f1] dark:hover:bg-[#37464f] transition">
              {theme === 'dark' ? <Sun size={18} className="text-[#ff9600]" /> : <Moon size={18} className="text-[#4b4b4b] dark:text-white" />}
              <span className="text-sm font-bold text-[#4b4b4b] dark:text-white">{theme === 'dark' ? 'Tema Claro' : 'Tema Escuro'}</span>
            </button>
            <div className="border-t-2 border-[#e5e5e5] dark:border-[#37464f] my-2" />
            <div className="px-2 py-1"><span className="text-[10px] font-black text-[#afafaf] uppercase tracking-widest">Notificações</span></div>
            {window.pushService && (
              <button onClick={handleTogglePush} disabled={pushLoading || pushPermission === 'denied'} className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-[#f1f1f1] dark:hover:bg-[#37464f] transition text-left disabled:opacity-50">
                <div className="flex items-center gap-3">
                  <Sparkles size={18} className={pushEnabled ? 'text-[#1cb0f6]' : 'text-[#afafaf]'} />
                  <span className="text-sm font-bold text-[#4b4b4b] dark:text-white">{pushLoading ? 'Carregando...' : pushEnabled ? 'Push Ativado' : 'Push Desativado'}</span>
                </div>
                {pushPermission !== 'denied' && (
                  <div className={`relative w-14 h-8 rounded-full border-b-2 transition-colors ${pushEnabled ? 'bg-[#58cc02] border-[#46a302]' : 'bg-[#e5e5e5] dark:bg-[#37464f] border-[#afafaf]'}`}>
                    <div className={`absolute top-0.5 w-6 h-6 bg-white rounded-full shadow transition-all ${pushEnabled ? 'left-7' : 'left-0.5'}`} />
                  </div>
                )}
              </button>
            )}
            {pushPermission === 'denied' && <p className="text-[10px] font-bold text-[#ff4b4b] px-2">Permissão negada.</p>}
            <div className="border-t-2 border-[#e5e5e5] dark:border-[#37464f] my-2" />
            {apiUser ? (
              <>
                <button onClick={() => handleLogout()} className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-[#f1f1f1] dark:hover:bg-[#37464f] transition text-left">
                  <X size={18} /> <span className="text-sm font-bold">Sair</span>
                </button>
                <div className="px-2 py-1"><span className="text-[10px] font-bold text-[#afafaf]">Versão {typeof window !== 'undefined' && window.APP_VERSION ? window.APP_VERSION : '1.0.0'}</span></div>
              </>
            ) : (
              <>
                <button onClick={() => setView('login')} className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-[#f1f1f1] dark:hover:bg-[#37464f] transition text-left">
                  <User size={18} /> <span className="text-sm font-bold">Entrar (Login)</span>
                </button>
                <button onClick={() => setView('login')} className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-[#f1f1f1] dark:hover:bg-[#37464f] transition text-left">
                  <Edit size={18} /> <span className="text-sm font-bold">Registrar conta</span>
                </button>
                {!jsonbinBinId && (
                  <>
                    <button onClick={() => createNewBin()} disabled={isSyncing} className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-[#f1f1f1] dark:hover:bg-[#37464f] transition text-left disabled:opacity-50">
                      <RefreshCw size={18} className={isSyncing ? 'animate-spin' : ''} /> <span className="text-sm font-bold">{isSyncing ? 'Criando...' : 'Criar Novo ID'}</span>
                    </button>
                    <button onClick={() => openBinIdModal('insert')} className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-[#f1f1f1] dark:hover:bg-[#37464f] transition text-left">
                      <Edit size={18} /> <span className="text-sm font-bold">Inserir ID</span>
                    </button>
                  </>
                )}
                {jsonbinBinId && (
                  <>
                    <div className="px-2 py-1"><div className="text-[10px] font-bold text-[#afafaf] truncate" title={jsonbinBinId}>ID: {jsonbinBinId.length > 18 ? jsonbinBinId.substring(0, 18) + '...' : jsonbinBinId}</div></div>
                    <button onClick={() => openBinIdModal('edit')} className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-[#f1f1f1] dark:hover:bg-[#37464f] transition text-left"><Edit size={18} /> <span className="text-sm font-bold">Editar ID</span></button>
                  </>
                )}
                <div className="px-2 py-1"><span className="text-[10px] font-bold text-[#afafaf]">Versão {typeof window !== 'undefined' && window.APP_VERSION ? window.APP_VERSION : '1.0.0'}</span></div>
              </>
            )}
            {isDevMode() && (
              <>
                <div className="border-t-2 border-[#e5e5e5] dark:border-[#37464f] my-2" />
                <div className="px-2 py-1"><span className="text-[10px] font-black text-[#a855f7] uppercase">Modo Dev</span></div>
                <button onClick={() => setView('dev-panel')} className="w-full flex items-center gap-3 p-3 rounded-xl bg-[#5844ed]/10 dark:bg-[#5844ed]/20 border-2 border-[#5844ed] transition text-left">
                  <Settings size={18} className="text-[#a855f7]" /> <span className="text-sm font-bold text-[#a855f7]">Painel Dev</span>
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {/* Main Views */}
      {view === 'login' && (
        <LoginView
          onBack={() => setView('home')}
          onLoginSuccess={(user) => setApiUser(user)}
          showAlert={showAlert}
        />
      )}
      {view === 'edit-profile' && <EditProfileView />}
      {view === 'home' && <HomeView />}
      {view === 'stats' && <StatsView />}
      {view === 'profile' && <ProfileView />}
      {view === 'deck' && <DeckDetailView />}
      {view === 'generator' && <GeneratorView />}
      {view === 'review' && <ReviewSessionView />}
      {view === 'quick-review' && <QuickReviewView />}
      {view === 'writing-review' && <WritingReviewView />}
      {view === 'test-mode-selection' && <TestModeSelectionView />}
      {view === 'test' && <TestView />}
      {view === 'test-result' && <TestResultView />}
      {view === 'dev-panel' && isDevMode() && <DevPanelView />}

      {/* Bottom Nav (Home / Estatísticas / Perfil) */}
      {(view === 'home' || view === 'stats' || view === 'profile' || view === 'settings' || view === 'edit-profile') && (
        <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto z-30 bg-white dark:bg-[#1b2c35] border-t-2 border-[#e5e5e5] dark:border-[#37464f] safe-bottom shadow-[0_-4px_12px_rgba(0,0,0,0.08)] dark:shadow-[0_-4px_12px_rgba(0,0,0,0.3)]">
          <div className="grid grid-cols-3 flex-1 w-full items-stretch py-2">
            <button
              onClick={() => setView('home')}
              className={`flex flex-col items-center justify-center gap-1 py-2 px-2 rounded-2xl transition-colors touch-target min-h-[56px] ${view === 'home' ? 'text-[#1cb0f6] bg-[#1cb0f6]/10' : 'text-[#afafaf] hover:text-[#4b4b4b] dark:hover:text-white'}`}
              aria-label="Home"
            >
              <Layers size={24} />
              <span className="text-[10px] font-black uppercase tracking-wider">Home</span>
            </button>
            <button
              onClick={() => setView('stats')}
              className={`flex flex-col items-center justify-center gap-1 py-2 px-2 rounded-2xl transition-colors touch-target min-h-[56px] ${view === 'stats' ? 'text-[#1cb0f6] bg-[#1cb0f6]/10' : 'text-[#afafaf] hover:text-[#4b4b4b] dark:hover:text-white'}`}
              aria-label="Estatísticas"
            >
              <BarChart2 size={24} />
              <span className="text-[10px] font-black uppercase tracking-wider">Estatísticas</span>
            </button>
            <button
              onClick={() => setView('profile')}
              className={`flex flex-col items-center justify-center gap-1 py-2 px-2 rounded-2xl transition-colors touch-target min-h-[56px] ${view === 'profile' ? 'text-[#1cb0f6] bg-[#1cb0f6]/10' : 'text-[#afafaf] hover:text-[#4b4b4b] dark:hover:text-white'}`}
              aria-label="Perfil"
            >
              <User size={24} />
              <span className="text-[10px] font-black uppercase tracking-wider">Perfil</span>
            </button>
          </div>
        </nav>
      )}

      {/* UX Mobile Components */}
      <OfflineIndicator isOnline={isOnline} pendingCount={pendingSyncCount} />
      </div>
    </div>
  );
}

// Registrar Service Worker para PWA
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js');
  });
}

// Renderizar o app
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

