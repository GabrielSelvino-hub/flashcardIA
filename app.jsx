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
const Settings = ({ size, className }) => <Icon size={size} className={className}><circle cx="12" cy="12" r="3"/><path d="M12 1v6m0 6v6M5.64 5.64l4.24 4.24m4.24 4.24l4.24 4.24M1 12h6m6 0h6M5.64 18.36l4.24-4.24m4.24-4.24l4.24-4.24"/></Icon>;
const List = ({ size, className }) => <Icon size={size} className={className}><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></Icon>;
const Grid = ({ size, className }) => <Icon size={size} className={className}><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></Icon>;
const Keyboard = ({ size, className }) => <Icon size={size} className={className}><rect x="2" y="4" width="20" height="16" rx="2" ry="2"/><line x1="6" y1="8" x2="8" y2="8"/><line x1="10" y1="8" x2="12" y2="8"/><line x1="14" y1="8" x2="16" y2="8"/><line x1="18" y1="8" x2="18" y2="8"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="16" x2="12" y2="16"/></Icon>;
const Edit = ({ size, className }) => <Icon size={size} className={className}><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></Icon>;
const History = ({ size, className }) => <Icon size={size} className={className}><path d="M3 3v5h5"/><path d="M3 8a10 10 0 1 1 3 7.7"/><path d="M12 8v4l2 2"/></Icon>;
const Tag = ({ size, className }) => <Icon size={size} className={className}><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><circle cx="7" cy="7" r="1.5"/></Icon>;
const Search = ({ size, className }) => <Icon size={size} className={className}><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></Icon>;
const Filter = ({ size, className }) => <Icon size={size} className={className}><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></Icon>;

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

// --- GENERIC MODAL COMPONENT ---
const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-sm overflow-hidden border border-gray-200 dark:border-gray-700">
        <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
          <h3 className="font-bold text-lg text-gray-800 dark:text-white">{title}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
            <X size={20} />
          </button>
        </div>
        <div className="p-6">
          {children}
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
  
  const [view, setView] = useState('home');
  const [activeDeckId, setActiveDeckId] = useState(null);
  const [theme, setTheme] = useState('dark');
  const [reviewQueue, setReviewQueue] = useState([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [generatorPrompt, setGeneratorPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [furiganaMode, setFuriganaMode] = useState('always');
  const [showApiKeyModal, setShowApiKeyModal] = useState(false);
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

  // Modal States
  const [modalConfig, setModalConfig] = useState({ type: null, data: null });
  const [tempInput, setTempInput] = useState('');

  // JSONBin Sync States
  const [jsonbinBinId, setJsonbinBinId] = useState(() => 
    localStorage.getItem('jsonbin_bin_id') || ''
  );
  const [isSyncing, setIsSyncing] = useState(false);
  const [jsonbinBinIdInput, setJsonbinBinIdInput] = useState('');
  const [showBinIdModal, setShowBinIdModal] = useState(false);
  const [binIdModalMode, setBinIdModalMode] = useState('insert'); // 'insert' ou 'edit'

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

  useEffect(() => {
    // Verifica se a chave API já foi salva
    const savedApiKey = localStorage.getItem('gemini_api_key');
    if (!savedApiKey) {
      setShowApiKeyModal(true);
    }
  }, []);

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
          if (testScore.wrong < 4 && testCurrentIndex < testQueue.length - 1) {
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
      setApiKeyInput('');
      showAlert('Chave API salva com sucesso!');
    }
  };

  // Actions
  const createDeck = (name) => {
    const newDeck = { id: generateId(), name, cards: [] };
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

  const handleImport = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const imported = JSON.parse(event.target.result);
        if (Array.isArray(imported)) {
          setDecks([...decks, ...imported]);
        } else if (imported.cards) {
          setDecks([...decks, { ...imported, id: generateId() }]);
        }
        showAlert('Importação concluída com sucesso!');
      } catch (err) {
        showAlert('Erro ao importar arquivo. Formato inválido.');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
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

  // JSONBin Sync Functions
  const saveData = async () => {
    if (!window.jsonbinService) {
      showAlert('Serviço JSONBin não carregado. Recarregue a página.');
      return { success: false };
    }

    if (!jsonbinBinId) {
      showAlert('Configure o ID de usuário primeiro.');
      return { success: false };
    }

    try {
      // Serializa dados do localStorage
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
      
      const syncData = {
        decks: decks,
        tags: tags,
        lastSync: new Date().toISOString()
      };

      console.log('Salvando dados do usuário:', jsonbinBinId, {
        decksCount: decks.length,
        tagsCount: tags.length
      });

      // Usa a nova função que trabalha com banco de dados compartilhado
      // jsonbinBinId aqui é o ID do usuário, não o bin do JSONBin.io
      const result = await window.jsonbinService.updateUserData(
        jsonbinBinId,
        null, // Usa a Master Key padrão do código
        syncData
      );

      if (!result.success) {
        let errorMessage = result.error;
        
        // Se o bin compartilhado não existe, cria automaticamente
        if (errorMessage.includes('não encontrado') || errorMessage.includes('404') || 
            errorMessage.includes('banco de dados')) {
          
          // Cria o bin compartilhado com os dados do usuário atual
          const createResult = await window.jsonbinService.createSharedBin(null, {
            [jsonbinBinId]: syncData
          });
          
          if (createResult.success) {
            showAlert(`Banco de dados criado automaticamente!\n\n${decks.length} baralho(s) e ${tags.length} tag(s) foram salvos na nuvem.`);
            return { success: true };
          } else {
            showAlert(`Erro ao criar banco de dados: ${createResult.error}`);
            return { success: false };
          }
        } else if (errorMessage.includes('Master Key')) {
          errorMessage = `Erro de autenticação: ${errorMessage}. Verifique a configuração da Master Key.`;
          showAlert(`Erro ao salvar: ${errorMessage}`);
        } else {
          showAlert(`Erro ao salvar: ${errorMessage}`);
        }
        
        return { success: false };
      }

      console.log('Dados salvos com sucesso na nuvem para o usuário:', jsonbinBinId);
      return { success: true };
    } catch (error) {
      showAlert(`Erro ao salvar dados: ${error.message}`);
      return { success: false };
    }
  };

  const loadData = async () => {
    if (!window.jsonbinService) {
      showAlert('Serviço JSONBin não carregado. Recarregue a página.');
      return { success: false };
    }

    if (!jsonbinBinId) {
      showAlert('Configure o ID de usuário primeiro.');
      return { success: false };
    }

    try {
      // Busca dados do usuário específico do banco compartilhado
      // jsonbinBinId aqui é o ID do usuário, não o bin do JSONBin.io
      const result = await window.jsonbinService.getUserData(jsonbinBinId, null);

      if (!result.success) {
        let errorMessage = result.error;
        
        if (errorMessage.includes('Master Key')) {
          errorMessage = `Erro de autenticação: ${errorMessage}. Verifique a configuração da Master Key.`;
        }
        
        showAlert(`Erro ao carregar: ${errorMessage}`);
        return { success: false };
      }

      const cloudData = result.data;

      // Se o usuário não existe ainda no banco
      if (!cloudData) {
        // Tenta listar usuários disponíveis para ajudar no debug
        try {
          const allUsersResult = await window.jsonbinService.getSharedBin(null);
          if (allUsersResult.success && allUsersResult.data) {
            const availableUsers = Object.keys(allUsersResult.data);
            const usersList = availableUsers.length > 0 
              ? `\n\nUsuários encontrados no banco: ${availableUsers.join(', ')}`
              : '\n\nNenhum usuário encontrado no banco ainda.';
            
            showAlert(`Usuário "${jsonbinBinId}" não encontrado no banco de dados.${usersList}\n\nCertifique-se de usar o mesmo ID de usuário em ambos os dispositivos.`);
          } else {
            showAlert(`Usuário "${jsonbinBinId}" não encontrado no banco de dados.\n\nOs dados locais serão mantidos.\n\nPara sincronizar, primeiro salve seus dados no outro dispositivo usando o mesmo ID de usuário.`);
          }
        } catch (e) {
          showAlert(`Usuário "${jsonbinBinId}" não encontrado no banco de dados.\n\nOs dados locais serão mantidos.\n\nPara sincronizar, primeiro salve seus dados no outro dispositivo.`);
        }
        return { success: true };
      }

      // Verifica se há dados para carregar
      const hasDecks = cloudData.decks && Array.isArray(cloudData.decks) && cloudData.decks.length > 0;
      const hasTags = cloudData.tags && Array.isArray(cloudData.tags) && cloudData.tags.length > 0;

      if (!hasDecks && !hasTags) {
        showAlert(`Usuário "${jsonbinBinId}" encontrado, mas não há dados salvos na nuvem.\n\nOs dados locais serão mantidos.`);
        return { success: true };
      }

      // Atualiza localStorage com os dados do usuário
      let loadedCount = 0;
      
      if (hasDecks) {
        localStorage.setItem('nihongo_decks', JSON.stringify(cloudData.decks));
        setDecks(cloudData.decks);
        loadedCount += cloudData.decks.length;
        console.log('Decks carregados:', cloudData.decks.length);
      } else {
        // Se não há decks na nuvem, mantém os locais
        console.log('Nenhum deck encontrado na nuvem, mantendo dados locais');
      }

      if (hasTags) {
        localStorage.setItem('nihongo_tags', JSON.stringify(cloudData.tags));
        setAvailableTags(cloudData.tags);
        console.log('Tags carregadas:', cloudData.tags.length);
      }

      if (hasDecks) {
        showAlert(`Dados carregados com sucesso!\n\n${cloudData.decks.length} baralho(s) sincronizado(s).`);
      }

      return { success: true };
    } catch (error) {
      showAlert(`Erro ao carregar dados: ${error.message}`);
      return { success: false };
    }
  };

  const syncData = async () => {
    if (isSyncing) return;

    setIsSyncing(true);
    try {
      if (!window.jsonbinService) {
        showAlert('Serviço JSONBin não carregado. Recarregue a página.');
        setIsSyncing(false);
        return;
      }

      if (!jsonbinBinId) {
        showAlert('Configure o ID de usuário primeiro.');
        setIsSyncing(false);
        return;
      }

      // 1. Carrega dados locais
      const decksData = localStorage.getItem('nihongo_decks');
      const tagsData = localStorage.getItem('nihongo_tags');
      
      let localDecks = [];
      let localTags = [];
      
      try {
        localDecks = decksData ? JSON.parse(decksData) : [];
      } catch (e) {
        console.error('Erro ao parsear decks locais:', e);
        localDecks = [];
      }
      
      try {
        localTags = tagsData ? JSON.parse(tagsData) : [];
      } catch (e) {
        console.error('Erro ao parsear tags locais:', e);
        localTags = [];
      }

      console.log('📥 Dados locais:', {
        decks: localDecks.length,
        totalCards: localDecks.reduce((sum, d) => sum + (d.cards?.length || 0), 0),
        tags: localTags.length
      });

      // 2. Busca dados da nuvem
      const cloudResult = await window.jsonbinService.getUserData(jsonbinBinId, null);
      
      let cloudDecks = [];
      let cloudTags = [];
      
      if (cloudResult.success && cloudResult.data) {
        cloudDecks = cloudResult.data.decks || [];
        cloudTags = cloudResult.data.tags || [];
        
        console.log('☁️ Dados da nuvem:', {
          decks: cloudDecks.length,
          totalCards: cloudDecks.reduce((sum, d) => sum + (d.cards?.length || 0), 0),
          tags: cloudTags.length
        });
      } else {
        console.log('⚠️ Nenhum dado encontrado na nuvem para este usuário');
      }

      // 3. Faz merge inteligente dos dados
      const mergedDecks = mergeDecksAndCards(localDecks, cloudDecks);
      const mergedTags = mergeTags(localTags, cloudTags);

      const mergedCardsCount = mergedDecks.reduce((sum, d) => sum + (d.cards?.length || 0), 0);
      const localCardsCount = localDecks.reduce((sum, d) => sum + (d.cards?.length || 0), 0);
      const cloudCardsCount = cloudDecks.reduce((sum, d) => sum + (d.cards?.length || 0), 0);

      console.log('🔄 Dados mesclados:', {
        decks: mergedDecks.length,
        totalCards: mergedCardsCount,
        tags: mergedTags.length,
        cardsAdicionados: mergedCardsCount - localCardsCount,
        cardsDaNuvem: cloudCardsCount
      });

      // 4. Atualiza localStorage com dados mesclados
      localStorage.setItem('nihongo_decks', JSON.stringify(mergedDecks));
      localStorage.setItem('nihongo_tags', JSON.stringify(mergedTags));
      setDecks(mergedDecks);
      setAvailableTags(mergedTags);

      // 5. Salva dados mesclados na nuvem
      const syncData = {
        decks: mergedDecks,
        tags: mergedTags,
        lastSync: new Date().toISOString()
      };

      const saveResult = await window.jsonbinService.updateUserData(
        jsonbinBinId,
        null,
        syncData
      );

      if (!saveResult.success) {
        // Se o bin compartilhado não existe, cria automaticamente
        if (saveResult.error.includes('não encontrado') || saveResult.error.includes('404') || 
            saveResult.error.includes('banco de dados')) {
          
          const createResult = await window.jsonbinService.createSharedBin(null, {
            [jsonbinBinId]: syncData
          });
          
          if (!createResult.success) {
            showAlert(`Erro ao criar banco de dados: ${createResult.error}`);
            setIsSyncing(false);
            return;
          }
        } else {
          showAlert(`Erro ao salvar na nuvem: ${saveResult.error}`);
          setIsSyncing(false);
          return;
        }
      }

      // 6. Mostra resultado da sincronização
      const newCardsCount = mergedCardsCount - localCardsCount;
      let message = `✅ Sincronização concluída!\n\n`;
      message += `📚 ${mergedDecks.length} baralho(s)\n`;
      message += `🃏 ${mergedCardsCount} card(s) total\n`;
      message += `🏷️ ${mergedTags.length} tag(s)\n`;
      
      if (newCardsCount > 0) {
        message += `\n✨ ${newCardsCount} novo(s) card(s) adicionado(s) da nuvem!`;
      } else if (cloudCardsCount > 0 && localCardsCount > 0) {
        message += `\n🔄 Dados locais e da nuvem foram combinados.`;
      } else if (cloudCardsCount === 0 && localCardsCount > 0) {
        message += `\n📤 Seus dados locais foram enviados para a nuvem.`;
      }

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

  const startWritingReview = (deckId, answerType = 'meaning', forceAll = false) => {
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

  const checkWritingAnswer = () => {
    const card = reviewQueue[currentCardIndex];
    if (!card || !writingInput.trim()) return;

    const correctAnswer = writingAnswerType === 'meaning' ? card.meaning : card.reading;
    const userAnswer = writingInput.trim();
    
    // Normaliza ambas as respostas para comparação
    const normalizedCorrect = normalizeText(correctAnswer);
    const normalizedUser = normalizeText(userAnswer);
    
    // Comparação exata ou com pequena tolerância
    const isCorrect = normalizedCorrect === normalizedUser || 
                     normalizedCorrect.includes(normalizedUser) ||
                     normalizedUser.includes(normalizedCorrect);

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
    if (!deck || deck.cards.length < 10) {
      showAlert('Este baralho precisa ter pelo menos 10 cards para fazer um teste.');
      return;
    }

    // Seleciona 10 cards aleatórios
    const shuffled = shuffleArray([...deck.cards]);
    const selectedCards = shuffled.slice(0, 10);
    
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
      
      // Verifica se perdeu (4 ou mais erros) ou completou todas as questões
      const isLastQuestion = testCurrentIndex === testQueue.length - 1;
      
      if (newScore.wrong >= 4) {
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
    // Se já perdeu ou completou, não deve chegar aqui
    if (testScore.wrong >= 4 || testCurrentIndex >= testQueue.length - 1) {
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
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: promptText }] }]
          })
        }
      );

      if (!response.ok) throw new Error('Falha na conexão com a IA');

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

  // --- SUB-VIEWS ---

  const StatsView = () => {
    const now = Date.now();
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayStart = today.getTime();
    const weekAgo = todayStart - (7 * 24 * 60 * 60 * 1000);
    const monthAgo = todayStart - (30 * 24 * 60 * 60 * 1000);

    // Calculate statistics
    let totalCards = 0;
    let newCards = 0;
    let dueCards = 0;
    let masteredCards = 0;
    let totalDecks = decks.length;
    let totalReviews = 0;

    decks.forEach(deck => {
      totalCards += deck.cards.length;
      deck.cards.forEach(card => {
        if (card.interval === 0 && card.nextReview <= now) {
          newCards++;
        } else if (card.nextReview <= now && card.interval > 0) {
          dueCards++;
        } else if (card.interval > 7) {
          masteredCards++;
        }
        if (card.reviewHistory) {
          totalReviews += card.reviewHistory.length;
        }
      });
    });

    const inLearning = totalCards - newCards - dueCards - masteredCards;

    // Calculate review history for last 7 days
    const reviewHistory = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date(todayStart - i * 24 * 60 * 60 * 1000);
      const dateStr = date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
      let count = 0;
      
      decks.forEach(deck => {
        deck.cards.forEach(card => {
          if (card.reviewHistory) {
            card.reviewHistory.forEach(review => {
              const reviewDate = new Date(review.date);
              reviewDate.setHours(0, 0, 0, 0);
              if (reviewDate.getTime() === date.getTime()) {
                count++;
              }
            });
          }
        });
      });
      
      reviewHistory.push({ date: dateStr, count });
    }

    const maxReviews = Math.max(...reviewHistory.map(r => r.count), 1);

    return (
      <div className="p-4 max-w-2xl mx-auto pb-24">
        <div className="flex items-center mb-6">
          <button onClick={() => setView('home')} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg mr-2">
            <ChevronLeft size={20} className="text-gray-800 dark:text-white" />
          </button>
          <h2 className="text-xl font-bold text-gray-800 dark:text-white">Estatísticas</h2>
        </div>

        <div className="space-y-4">
          {/* Overview Cards */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">{totalCards}</div>
              <div className="text-xs text-blue-800 dark:text-blue-300 uppercase font-semibold mt-1">Total de Cards</div>
            </div>
            <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg border border-purple-200 dark:border-purple-800">
              <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">{totalDecks}</div>
              <div className="text-xs text-purple-800 dark:text-purple-300 uppercase font-semibold mt-1">Baralhos</div>
            </div>
          </div>

          {/* Cards by Status */}
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">Cards por Status</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <span className="text-sm text-gray-700 dark:text-gray-300">Novos</span>
                </div>
                <span className="text-lg font-bold text-gray-800 dark:text-white">{newCards}</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <span className="text-sm text-gray-700 dark:text-gray-300">Para Revisar</span>
                </div>
                <span className="text-lg font-bold text-gray-800 dark:text-white">{dueCards}</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                  <span className="text-sm text-gray-700 dark:text-gray-300">Em Aprendizado</span>
                </div>
                <span className="text-lg font-bold text-gray-800 dark:text-white">{inLearning}</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span className="text-sm text-gray-700 dark:text-gray-300">Dominados</span>
                </div>
                <span className="text-lg font-bold text-gray-800 dark:text-white">{masteredCards}</span>
              </div>
            </div>
            
            {/* Pie Chart (simulado com barras) */}
            {totalCards > 0 && (
              <div className="mt-4 space-y-2">
                <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div className="h-full bg-red-500" style={{ width: `${(newCards / totalCards) * 100}%` }}></div>
                </div>
                <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div className="h-full bg-yellow-500" style={{ width: `${(dueCards / totalCards) * 100}%` }}></div>
                </div>
                <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500" style={{ width: `${(inLearning / totalCards) * 100}%` }}></div>
                </div>
                <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div className="h-full bg-green-500" style={{ width: `${(masteredCards / totalCards) * 100}%` }}></div>
                </div>
              </div>
            )}
          </div>

          {/* Review History Chart */}
          {totalReviews > 0 && (
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">Revisões nos Últimos 7 Dias</h3>
              <div className="flex items-end justify-between gap-1 h-32">
                {reviewHistory.map((day, idx) => (
                  <div key={idx} className="flex-1 flex flex-col items-center justify-end">
                    <div 
                      className="w-full bg-blue-500 rounded-t transition-all hover:bg-blue-600"
                      style={{ height: `${(day.count / maxReviews) * 100}%` }}
                      title={`${day.date}: ${day.count} revisões`}
                    ></div>
                    <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">{day.date.split('/')[0]}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Deck Statistics */}
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">Estatísticas por Baralho</h3>
            <div className="space-y-3">
              {decks.map(deck => {
                const deckDue = deck.cards.filter(c => c.nextReview <= now).length;
                const deckNew = deck.cards.filter(c => c.interval === 0 && c.nextReview <= now).length;
                const deckMastered = deck.cards.filter(c => c.interval > 7).length;
                const deckTotal = deck.cards.length;
                const accuracy = deckTotal > 0 ? Math.round(((deckTotal - deckNew - deckDue) / deckTotal) * 100) : 0;

                return (
                  <div key={deck.id} className="p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold text-gray-800 dark:text-white">{deck.name}</h4>
                      <span className="text-sm text-gray-500 dark:text-gray-400">{deckTotal} cards</span>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-xs">
                      <div>
                        <span className="text-gray-500 dark:text-gray-400">Novos:</span>
                        <span className="ml-1 font-semibold text-red-600 dark:text-red-400">{deckNew}</span>
                      </div>
                      <div>
                        <span className="text-gray-500 dark:text-gray-400">Revisar:</span>
                        <span className="ml-1 font-semibold text-yellow-600 dark:text-yellow-400">{deckDue}</span>
                      </div>
                      <div>
                        <span className="text-gray-500 dark:text-gray-400">Dominados:</span>
                        <span className="ml-1 font-semibold text-green-600 dark:text-green-400">{deckMastered}</span>
                      </div>
                    </div>
                    {deckTotal > 0 && (
                      <div className="mt-2">
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-gray-500 dark:text-gray-400">Progresso</span>
                          <span className="font-semibold text-gray-700 dark:text-gray-300">{accuracy}%</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full transition-all"
                            style={{ width: `${accuracy}%` }}
                          ></div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const HomeView = () => (
    <div className="p-4 max-w-2xl md:max-w-4xl lg:max-w-6xl xl:max-w-7xl mx-auto pb-24">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
          <img src="logoflashcard.ico" alt="NihonGo Deck" className="w-8 h-8" />
          NihonGo Deck
          {isDevMode() && (
            <span className="px-2 py-1 text-xs font-bold bg-purple-500 text-white rounded animate-pulse" title="Modo Desenvolvedor Ativo">
              DEV
            </span>
          )}
        </h1>
        <div className="relative">
          <button 
            onClick={() => setShowSettingsMenu(!showSettingsMenu)} 
            className="p-2 bg-gray-200 dark:bg-gray-700 rounded-full hover:bg-gray-300 dark:hover:bg-gray-600 transition"
          >
            <Settings size={20} className="text-gray-700 dark:text-gray-300" />
          </button>
          
          {showSettingsMenu && (
            <>
              <div 
                className="fixed inset-0 z-40" 
                onClick={() => setShowSettingsMenu(false)}
              />
              <div className="absolute right-0 top-12 z-50 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 p-3 min-w-[200px]">
                <div className="space-y-2">
                  <label className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition">
                    <Upload size={18} className="text-gray-700 dark:text-gray-300" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">Importar</span>
                    <input type="file" onChange={handleImport} className="hidden" accept=".json" />
                  </label>
                  <button 
                    onClick={() => {
                      handleExportAll();
                      setShowSettingsMenu(false);
                    }} 
                    className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition text-left"
                  >
                    <Download size={18} className="text-gray-700 dark:text-gray-300" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">Exportar</span>
                  </button>
                  <div className="border-t border-gray-200 dark:border-gray-700 my-2" />
                  <button 
                    onClick={() => {
                      setView('stats');
                      setShowSettingsMenu(false);
                    }} 
                    className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition text-left"
                  >
                    <Award size={18} className="text-gray-700 dark:text-gray-300" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">Estatísticas</span>
                  </button>
                  <div className="border-t border-gray-200 dark:border-gray-700 my-2" />
                  <button 
                    onClick={() => {
                      setTheme(theme === 'dark' ? 'light' : 'dark');
                      setShowSettingsMenu(false);
                    }} 
                    className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                  >
                    {theme === 'dark' ? (
                      <>
                        <Sun size={18} className="text-yellow-400" />
                        <span className="text-sm text-gray-700 dark:text-gray-300">Tema Claro</span>
                      </>
                    ) : (
                      <>
                        <Moon size={18} className="text-gray-700 dark:text-gray-300" />
                        <span className="text-sm text-gray-700 dark:text-gray-300">Tema Escuro</span>
                      </>
                    )}
                  </button>
                  <div className="border-t border-gray-200 dark:border-gray-700 my-2" />
                  <div className="px-2 py-1">
                    <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Sincronização</span>
                  </div>
                  {!jsonbinBinId && (
                    <>
                      <button 
                        onClick={() => {
                          createNewBin();
                          setShowSettingsMenu(false);
                        }}
                        disabled={isSyncing}
                        className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition text-left disabled:opacity-50"
                      >
                        <RefreshCw size={18} className={`text-gray-700 dark:text-gray-300 ${isSyncing ? 'animate-spin' : ''}`} />
                        <span className="text-sm text-gray-700 dark:text-gray-300">
                          {isSyncing ? 'Criando...' : 'Criar Novo ID de Usuário'}
                        </span>
                      </button>
                      <button 
                        onClick={() => {
                          setShowSettingsMenu(false);
                          openBinIdModal('insert');
                        }} 
                        className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition text-left"
                      >
                        <Edit size={18} className="text-gray-700 dark:text-gray-300" />
                        <span className="text-sm text-gray-700 dark:text-gray-300">Inserir ID de Usuário</span>
                      </button>
                    </>
                  )}
                  {jsonbinBinId && (
                    <>
                      <div className="px-2 py-1">
                        <div className="text-xs text-gray-500 dark:text-gray-400 truncate" title={jsonbinBinId}>
                          ID: {jsonbinBinId.length > 20 ? jsonbinBinId.substring(0, 20) + '...' : jsonbinBinId}
                        </div>
                      </div>
                      <button 
                        onClick={() => {
                          setShowSettingsMenu(false);
                          openBinIdModal('edit');
                        }} 
                        className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition text-left"
                      >
                        <Edit size={18} className="text-gray-700 dark:text-gray-300" />
                        <span className="text-sm text-gray-700 dark:text-gray-300">Editar ID de Usuário</span>
                      </button>
                      <button 
                        onClick={() => {
                          syncData();
                          setShowSettingsMenu(false);
                        }}
                        disabled={isSyncing}
                        className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition text-left disabled:opacity-50"
                      >
                        <RefreshCw size={18} className={`text-gray-700 dark:text-gray-300 ${isSyncing ? 'animate-spin' : ''}`} />
                        <span className="text-sm text-gray-700 dark:text-gray-300">
                          {isSyncing ? 'Sincronizando...' : 'Sincronizar Dados'}
                        </span>
                      </button>
                    </>
                  )}
                  {isDevMode() && (
                    <>
                      <div className="border-t border-gray-200 dark:border-gray-700 my-2" />
                      <div className="px-2 py-1">
                        <span className="text-xs font-semibold text-purple-600 dark:text-purple-400 uppercase">Modo Desenvolvedor</span>
                      </div>
                      <button 
                        onClick={() => {
                          setView('dev-panel');
                          setShowSettingsMenu(false);
                        }} 
                        className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-purple-50 dark:hover:bg-purple-900/20 transition text-left border border-purple-200 dark:border-purple-800"
                      >
                        <Settings size={18} className="text-purple-600 dark:text-purple-400" />
                        <span className="text-sm text-purple-700 dark:text-purple-300 font-semibold">Painel Dev</span>
                      </button>
                    </>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {decks.map(deck => (
          <div 
            key={deck.id} 
            onClick={() => { setActiveDeckId(deck.id); setView('deck'); }}
            className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 active:scale-95 transition-transform cursor-pointer relative group"
          >
            <h2 className="text-lg font-bold text-gray-800 dark:text-white">{deck.name}</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">{deck.cards.length} cards</p>
            <div className="absolute right-4 top-4 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity">
               <ChevronLeft size={20} className="rotate-180 text-gray-400" />
            </div>
          </div>
        ))}
      </div>

      <button 
        onClick={showPrompt}
        className="fixed bottom-6 right-6 bg-red-600 hover:bg-red-700 text-white p-4 rounded-full shadow-lg transition-colors flex items-center gap-2 z-40"
      >
        <Plus size={24} />
        <span className="font-bold">Novo Baralho</span>
      </button>
    </div>
  );

  const DeckDetailView = () => {
    const deck = decks.find(d => d.id === activeDeckId);
    if (!deck) return null;
    const dueCardsCount = deck.cards.filter(c => c.nextReview <= Date.now()).length;
    const isReviewDue = dueCardsCount > 0;

    // Filter and sort cards
    const now = Date.now();
    let filteredCards = [...deck.cards];

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filteredCards = filteredCards.filter(card => 
        card.kanji.toLowerCase().includes(query) ||
        card.reading.toLowerCase().includes(query) ||
        card.meaning.toLowerCase().includes(query)
      );
    }

    // Apply status filter
    if (filterStatus !== 'all') {
      filteredCards = filteredCards.filter(card => {
        if (filterStatus === 'new') {
          return card.interval === 0 && card.nextReview <= now;
        } else if (filterStatus === 'due') {
          return card.nextReview <= now && card.interval > 0;
        } else if (filterStatus === 'mastered') {
          return card.interval > 7;
        }
        return true;
      });
    }

    // Apply tag filter
    if (tagFilter !== 'all') {
      filteredCards = filteredCards.filter(card => 
        (card.tags || []).includes(tagFilter)
      );
    }

    // Apply sorting
    if (sortBy === 'kanji') {
      filteredCards.sort((a, b) => a.kanji.localeCompare(b.kanji));
    } else if (sortBy === 'created') {
      filteredCards.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
    } else if (sortBy === 'nextReview') {
      filteredCards.sort((a, b) => a.nextReview - b.nextReview);
    }

    return (
      <div className="p-4 max-w-2xl md:max-w-4xl lg:max-w-6xl xl:max-w-7xl mx-auto h-full flex flex-col">
        <div className="flex items-center justify-between mb-6">
          <button onClick={() => setView('home')} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
            <ChevronLeft size={20} className="text-gray-800 dark:text-white" />
          </button>
          <h2 className="text-xl font-bold text-gray-800 dark:text-white truncate max-w-[200px]">{deck.name}</h2>
          <div className="flex gap-2">
            <button 
              onClick={() => setCardViewMode(cardViewMode === 'list' ? 'grid' : 'list')} 
              className="p-2 text-gray-600 dark:text-gray-400 hover:text-indigo-500 transition"
              title={cardViewMode === 'list' ? 'Alternar para Grid' : 'Alternar para Lista'}
            >
              {cardViewMode === 'list' ? <Grid size={20} /> : <List size={20} />}
            </button>
            <button onClick={() => handleExportDeck(deck)} className="p-2 text-gray-600 dark:text-gray-400 hover:text-red-500">
              <Download size={20} />
            </button>
            <button onClick={() => deleteDeck(deck.id)} className="p-2 text-gray-600 dark:text-gray-400 hover:text-red-500">
              <Trash2 size={20} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg text-center">
            <span className="block text-2xl font-bold text-blue-600 dark:text-blue-400">{deck.cards.length}</span>
            <span className="text-xs text-blue-800 dark:text-blue-300 uppercase font-semibold">Total Cards</span>
          </div>
          <div className={`p-4 rounded-lg text-center transition-colors ${isReviewDue ? 'bg-red-50 dark:bg-red-900/20' : 'bg-green-50 dark:bg-green-900/20'}`}>
             <span className={`block text-2xl font-bold ${isReviewDue ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'}`}>
               {dueCardsCount}
             </span>
             <span className={`text-xs uppercase font-semibold ${isReviewDue ? 'text-red-800 dark:text-red-300' : 'text-green-800 dark:text-green-300'}`}>
               Para Revisar
             </span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3 mb-6">
           <div className="bg-white dark:bg-gray-800 p-3 rounded-lg border border-gray-200 dark:border-gray-700 flex justify-between items-center mb-2">
             <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
               {furiganaMode === 'always' ? <Eye size={18} /> : <EyeOff size={18} />}
               <span className="text-sm font-medium">
                 {furiganaMode === 'always' ? 'Furigana Visível' : 'Furigana Oculto na Frente'}
               </span>
             </div>
             <button 
               onClick={() => setFuriganaMode(prev => prev === 'always' ? 'answer' : 'always')}
               className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${furiganaMode === 'always' ? 'bg-indigo-600' : 'bg-gray-400'}`}
             >
               <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${furiganaMode === 'always' ? 'translate-x-6' : 'translate-x-1'}`} />
             </button>
           </div>

           <div className="grid grid-cols-2 gap-3 mb-3">
             <button 
               onClick={showAddCardModal}
               className="w-full bg-green-600 text-white py-3 rounded-lg font-bold shadow-md hover:bg-green-700 active:scale-95 transition flex items-center justify-center gap-2"
             >
               <Plus size={20} />
               Adicionar Card
             </button>
             <button 
               onClick={() => setView('generator')}
               className="w-full bg-indigo-600 text-white py-3 rounded-lg font-bold shadow-md hover:bg-indigo-700 active:scale-95 transition flex items-center justify-center gap-2"
             >
               <Sparkles size={20} />
               Gerar com IA
             </button>
           </div>
           
           <div className="grid grid-cols-2 gap-3">
             {isReviewDue ? (
               <button 
                 onClick={() => startReview(deck.id, false)}
                 className="w-full bg-red-600 text-white py-3 rounded-lg font-bold shadow-md hover:bg-red-700 active:scale-95 transition flex items-center justify-center gap-2 animate-pulse"
               >
                 <Play size={18} fill="currentColor" />
                 Revisão
                 <span>({dueCardsCount})</span>
               </button>
             ) : (
               <button 
                 onClick={() => startReview(deck.id, true)}
                 disabled={deck.cards.length === 0}
                 className={`w-full text-white py-3 rounded-lg font-bold shadow-md active:scale-95 transition flex items-center justify-center gap-2
                   ${deck.cards.length === 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}
                 `}
               >
                 {deck.cards.length === 0 ? (
                   <span className="text-xs">Vazio</span>
                 ) : (
                   <>
                     <RotateCw size={18} />
                     Revisão
                   </>
                 )}
               </button>
             )}
             
             <button 
               onClick={() => setView('test-mode-selection')}
               disabled={deck.cards.length < 10}
               className={`w-full text-white py-3 rounded-lg font-bold shadow-md active:scale-95 transition flex items-center justify-center gap-2
                 ${deck.cards.length < 10 ? 'bg-gray-400 cursor-not-allowed' : 'bg-purple-600 hover:bg-purple-700'}
               `}
             >
               <Award size={18} />
               Teste
             </button>
           </div>
        </div>

        <div className="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-900 rounded-lg p-2 border border-gray-200 dark:border-gray-700">
          <div className="mb-3 space-y-2">
            <div className="relative">
              <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar cards..."
                className="w-full pl-10 pr-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none text-sm"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="flex-1 min-w-[120px] px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-800 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option value="all">Todos</option>
                <option value="new">Novos</option>
                <option value="due">Para Revisar</option>
                <option value="mastered">Dominados</option>
              </select>
              <select
                value={tagFilter}
                onChange={(e) => setTagFilter(e.target.value)}
                className="flex-1 min-w-[120px] px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-800 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option value="all">Todas Tags</option>
                {availableTags.map(tag => (
                  <option key={tag} value={tag}>{tag}</option>
                ))}
              </select>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="flex-1 min-w-[120px] px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-800 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option value="default">Padrão</option>
                <option value="kanji">Por Kanji</option>
                <option value="created">Por Data</option>
                <option value="nextReview">Próxima Revisão</option>
              </select>
            </div>
          </div>
          <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2 px-2">
            Cards Existentes {filteredCards.length !== deck.cards.length && `(${filteredCards.length} de ${deck.cards.length})`}
          </h3>
          {deck.cards.length === 0 ? (
            <div className="text-center py-8 text-gray-400">Nenhum card ainda. Crie ou Gere um!</div>
          ) : filteredCards.length === 0 ? (
            <div className="text-center py-8 text-gray-400">Nenhum card encontrado com os filtros aplicados.</div>
          ) : cardViewMode === 'list' ? (
            <div className="space-y-2">
              {filteredCards.map((card, idx) => (
                <div key={idx} className="bg-white dark:bg-gray-800 p-3 rounded shadow-sm flex justify-between items-center group animate-fadeIn hover:shadow-md transition-all">
                  <div className="flex-1">
                    <ruby className="text-lg font-bold text-gray-800 dark:text-gray-200">
                      {card.kanji}
                      <rt className="text-xs text-gray-500">{card.reading}</rt>
                    </ruby>
                    <div className="text-sm text-gray-600 dark:text-gray-400">{card.meaning}</div>
                    {card.tags && card.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-1">
                        {card.tags.map((tag, tagIdx) => (
                          <span key={tagIdx} className="px-1.5 py-0.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded text-xs">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                      onClick={() => startEditCard(card)}
                      className="text-gray-400 hover:text-blue-500"
                      title="Editar card"
                    >
                      <Edit size={16} />
                    </button>
                    <button 
                      onClick={() => {
                        const newCards = deck.cards.filter(c => c.id !== card.id);
                        setDecks(decks.map(d => d.id === deck.id ? {...d, cards: newCards} : d));
                      }}
                      className="text-gray-400 hover:text-red-500"
                      title="Excluir card"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
              {filteredCards.map((card, idx) => (
                <div 
                  key={idx} 
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 aspect-square flex flex-col justify-between relative group hover:shadow-md transition-all animate-fadeIn"
                >
                  <div className="flex-1 flex flex-col items-center justify-center text-center">
                    <ruby className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-gray-200 mb-2">
                      {card.kanji}
                      <rt className="text-xs sm:text-sm text-gray-500">{card.reading}</rt>
                    </ruby>
                    <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-1">{card.meaning}</div>
                    {card.tags && card.tags.length > 0 && (
                      <div className="flex flex-wrap gap-0.5 justify-center">
                        {card.tags.slice(0, 2).map((tag, tagIdx) => (
                          <span key={tagIdx} className="px-1 py-0.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded text-[10px]">
                            {tag}
                          </span>
                        ))}
                        {card.tags.length > 2 && (
                          <span className="px-1 py-0.5 text-gray-500 text-[10px]">+{card.tags.length - 2}</span>
                        )}
                      </div>
                    )}
                  </div>
                  <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                      onClick={() => startEditCard(card)}
                      className="text-gray-400 hover:text-blue-500 p-1"
                      title="Editar card"
                    >
                      <Edit size={14} />
                    </button>
                    <button 
                      onClick={() => {
                        const newCards = deck.cards.filter(c => c.id !== card.id);
                        setDecks(decks.map(d => d.id === deck.id ? {...d, cards: newCards} : d));
                      }}
                      className="text-gray-400 hover:text-red-500 p-1"
                      title="Excluir card"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  const GeneratorView = () => {
    const inputRef = useRef(null);
    
    const handleGenerateClick = () => {
      const value = inputRef.current?.value || '';
      if (value.trim() && !isGenerating) {
        // Passa o valor diretamente para handleGenerate sem atualizar o estado
        const count = isDevMode() ? devCustomCount : cardsCount;
        handleGenerate(value, count);
        // Limpa o input após gerar
        if (inputRef.current) {
          inputRef.current.value = '';
        }
      }
    };
    
    const handleKeyDown = (e) => {
      if (e.key === 'Enter' && !isGenerating) {
        e.preventDefault();
        handleGenerateClick();
      }
    };
    
    return (
      <div className="p-4 max-w-2xl mx-auto h-full flex flex-col">
         <div className="flex items-center mb-6">
            <button onClick={() => setView('deck')} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg mr-2">
              <ChevronLeft size={20} className="text-gray-800 dark:text-white" />
            </button>
            <h2 className="text-xl font-bold text-gray-800 dark:text-white">Gerador de Cards IA</h2>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              O que você quer estudar?
            </label>
            <input 
              ref={inputRef}
              type="text" 
              defaultValue={generatorPrompt}
              placeholder="Ex: Frutas, Negócios, Gírias de Anime..."
              className="w-full p-3 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-800 dark:text-white focus:ring-2 focus:ring-red-500 outline-none transition"
              onKeyDown={handleKeyDown}
            />
            <p className="text-xs text-gray-500 mt-2">
              *Dica: Seja específico. Ex: "Verbos de cozinha" ou "Palavras médicas".
            </p>
          </div>

          <div className={`bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border ${isDevMode() ? 'border-purple-500 dark:border-purple-400' : 'border-gray-200 dark:border-gray-700'} mb-6`}>
            <div className="flex items-center justify-between mb-3">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Quantidade de cards:
              </label>
              {isDevMode() && (
                <span className="px-2 py-1 text-xs font-bold bg-purple-500 text-white rounded">DEV</span>
              )}
            </div>
            {isDevMode() ? (
              <div className="space-y-2">
                <input
                  type="number"
                  min="1"
                  max="1000"
                  value={devCustomCount}
                  onChange={(e) => {
                    const val = parseInt(e.target.value) || 1;
                    setDevCustomCount(Math.min(Math.max(1, val), 1000));
                  }}
                  className="w-full p-3 bg-gray-50 dark:bg-gray-900 border border-purple-300 dark:border-purple-600 rounded-lg text-gray-800 dark:text-white focus:ring-2 focus:ring-purple-500 outline-none transition"
                  placeholder="Quantidade de cards"
                />
                <p className="text-xs text-purple-600 dark:text-purple-400">
                  Modo Dev: Você pode gerar até 1000 cards por vez
                </p>
              </div>
            ) : (
              <div className="flex gap-2">
                {[3, 5, 8].map((num) => (
                  <button
                    key={num}
                    onClick={() => setCardsCount(num)}
                    className={`flex-1 py-2 px-4 rounded-lg font-bold transition-all ${
                      cardsCount === num
                        ? 'bg-indigo-600 text-white shadow-md'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    {num} cards
                  </button>
                ))}
              </div>
            )}
          </div>

        <div className="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-lg border border-indigo-200 dark:border-indigo-800 mb-6">
           <h4 className="font-bold text-indigo-800 dark:text-indigo-200 text-sm flex items-center gap-2">
             <Sparkles size={16} />
             Power by Google Gemini
           </h4>
           <p className="text-sm text-indigo-700 dark:text-indigo-300 mt-1">
             A IA criará {isDevMode() ? devCustomCount : cardsCount} cards únicos para você. O processo pode levar alguns segundos.
           </p>
        </div>

          <button 
            onClick={handleGenerateClick}
            disabled={isGenerating}
            className={`w-full py-4 rounded-lg font-bold text-white shadow-lg flex items-center justify-center gap-3 transition-all
              ${isGenerating ? 'bg-gray-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 active:scale-95'}
            `}
          >
            {isGenerating ? (
              <>
                <RefreshCw size={20} className="animate-spin" /> Gerando com IA...
              </>
            ) : (
              <>
                <Sparkles size={20} /> Gerar Cards
              </>
            )}
          </button>
      </div>
    );
  };

  const QuickReviewView = () => {
    const card = reviewQueue[currentCardIndex];
    if (!card) return <div>Erro ao carregar card.</div>;
    
    const cardRef = useRef(null);
    const touchStartX = useRef(0);
    const touchStartY = useRef(0);

    const handleTouchStart = (e) => {
      touchStartX.current = e.touches[0].clientX;
      touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchEnd = (e) => {
      if (!touchStartX.current || !touchStartY.current) return;
      
      const touchEndX = e.changedTouches[0].clientX;
      const touchEndY = e.changedTouches[0].clientY;
      const diffX = touchEndX - touchStartX.current;
      const diffY = touchEndY - touchStartY.current;
      
      // Swipe horizontal (esquerda/direita) tem prioridade
      if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
        if (diffX > 0) {
          // Swipe direito = correto (qualidade 2)
          if (showAnswer) {
            processReview(2);
            if (currentCardIndex < reviewQueue.length - 1) {
              setCurrentCardIndex(prev => prev + 1);
              setShowAnswer(false);
            } else {
              showAlert('Revisão rápida concluída!');
              setView('deck');
            }
          }
        } else {
          // Swipe esquerdo = incorreto (qualidade 0)
          if (showAnswer) {
            processReview(0);
            if (currentCardIndex < reviewQueue.length - 1) {
              setCurrentCardIndex(prev => prev + 1);
              setShowAnswer(false);
            } else {
              showAlert('Revisão rápida concluída!');
              setView('deck');
            }
          }
        }
      } else if (Math.abs(diffY) > 50) {
        // Swipe vertical = mostrar/esconder resposta
        if (diffY < 0 && !showAnswer) {
          setShowAnswer(true);
        } else if (diffY > 0 && showAnswer) {
          setShowAnswer(false);
        }
      }
      
      touchStartX.current = 0;
      touchStartY.current = 0;
    };

    return (
      <div className="h-full flex flex-col p-4 max-w-xl mx-auto">
        <div className="flex justify-between items-center mb-4 text-sm text-gray-500 dark:text-gray-400">
           <span>Revisão Rápida</span>
           <span>{currentCardIndex + 1} / {reviewQueue.length}</span>
        </div>
        <div className="text-xs text-gray-400 dark:text-gray-500 mb-2 text-center">
          {!showAnswer ? '⬆️ Deslize para cima ou toque para revelar' : '⬅️ Errado | ➡️ Correto | ⬇️ Esconder'}
        </div>

        <div 
          ref={cardRef}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className="flex-1 flex items-center justify-center min-h-[300px] bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 mb-8 cursor-pointer relative overflow-hidden group touch-pan-y"
          onClick={() => setShowAnswer(!showAnswer)}
        >
           <KanjiCard 
             kanji={card.kanji}
             reading={card.reading}
             meaning={card.meaning}
             showBack={showAnswer}
             furiganaMode={furiganaMode}
             size="large"
           />
        </div>

        {showAnswer ? (
          <div className="grid grid-cols-2 gap-3">
             <button 
               onClick={() => {
                 processReview(0);
                 if (currentCardIndex < reviewQueue.length - 1) {
                   setCurrentCardIndex(prev => prev + 1);
                   setShowAnswer(false);
                 } else {
                   showAlert('Revisão rápida concluída!');
                   setView('deck');
                 }
               }}
               className="bg-red-100 hover:bg-red-200 dark:bg-red-900/30 dark:hover:bg-red-900/50 text-red-700 dark:text-red-300 py-4 rounded-lg font-bold border border-red-200 dark:border-red-800 transition"
             >
               ❌ Errado
             </button>
             <button 
               onClick={() => {
                 processReview(2);
                 if (currentCardIndex < reviewQueue.length - 1) {
                   setCurrentCardIndex(prev => prev + 1);
                   setShowAnswer(false);
                 } else {
                   showAlert('Revisão rápida concluída!');
                   setView('deck');
                 }
               }}
               className="bg-green-100 hover:bg-green-200 dark:bg-green-900/30 dark:hover:bg-green-900/50 text-green-700 dark:text-green-300 py-4 rounded-lg font-bold border border-green-200 dark:border-green-800 transition"
             >
               ✅ Correto
             </button>
          </div>
        ) : (
          <button 
            onClick={() => setShowAnswer(true)}
            className="w-full bg-gray-800 dark:bg-gray-700 text-white py-4 rounded-lg font-bold shadow hover:bg-gray-700 dark:hover:bg-gray-600 transition"
          >
            Mostrar Resposta
          </button>
        )}
        
        <button onClick={() => setView('deck')} className="mt-6 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 text-sm text-center w-full">
          Cancelar Revisão
        </button>
      </div>
    );
  };

  const ReviewSessionView = () => {
    const card = reviewQueue[currentCardIndex];
    if (!card) return <div>Erro ao carregar card.</div>;

    return (
      <div className="h-full flex flex-col p-4 max-w-xl mx-auto">
        <div className="flex justify-between items-center mb-4 text-sm text-gray-500 dark:text-gray-400">
           <span>Revisão</span>
           <span>{currentCardIndex + 1} / {reviewQueue.length}</span>
        </div>
        <div className="text-xs text-gray-400 dark:text-gray-500 mb-2 text-center">
          {!showAnswer ? 'Espaço: Mostrar resposta' : '0: Não sei | 1: Dúvida | 2: Sei'}
        </div>

        <div 
          className="flex-1 flex items-center justify-center min-h-[300px] bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 mb-8 cursor-pointer relative overflow-hidden group"
          onClick={() => setShowAnswer(true)}
        >
           <KanjiCard 
             kanji={card.kanji}
             reading={card.reading}
             meaning={card.meaning}
             showBack={showAnswer}
             furiganaMode={furiganaMode}
             size="large"
           />
           {!showAnswer && (
             <div className="absolute bottom-4 text-xs text-gray-400 uppercase tracking-widest group-hover:text-red-500 transition-colors">
               Toque para revelar
             </div>
           )}
        </div>

        {showAnswer ? (
          <div className="grid grid-cols-3 gap-3">
             <button onClick={() => processReview(0)} className="bg-red-100 hover:bg-red-200 dark:bg-red-900/30 dark:hover:bg-red-900/50 text-red-700 dark:text-red-300 py-4 rounded-lg font-bold border border-red-200 dark:border-red-800 transition">
               Não sei
             </button>
             <button onClick={() => processReview(1)} className="bg-yellow-100 hover:bg-yellow-200 dark:bg-yellow-900/30 dark:hover:bg-yellow-900/50 text-yellow-700 dark:text-yellow-300 py-4 rounded-lg font-bold border border-yellow-200 dark:border-yellow-800 transition">
               Dúvida
             </button>
             <button onClick={() => processReview(2)} className="bg-green-100 hover:bg-green-200 dark:bg-green-900/30 dark:hover:bg-green-900/50 text-green-700 dark:text-green-300 py-4 rounded-lg font-bold border border-green-200 dark:border-green-800 transition">
               Sei
             </button>
          </div>
        ) : (
          <button 
            onClick={() => setShowAnswer(true)}
            className="w-full bg-gray-800 dark:bg-gray-700 text-white py-4 rounded-lg font-bold shadow hover:bg-gray-700 dark:hover:bg-gray-600 transition"
          >
            Mostrar Resposta
          </button>
        )}
        
        <button onClick={() => setView('deck')} className="mt-6 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 text-sm text-center w-full">
          Cancelar Revisão
        </button>
      </div>
    );
  };

  const WritingReviewView = () => {
    const card = reviewQueue[currentCardIndex];
    if (!card) return <div>Erro ao carregar card.</div>;

    const correctAnswer = writingAnswerType === 'meaning' ? card.meaning : card.reading;
    const inputRef = useRef(null);

    useEffect(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, [currentCardIndex]);

    const handleSubmit = (e) => {
      e.preventDefault();
      if (writingInput.trim() && !writingResult) {
        checkWritingAnswer();
      }
    };

    const handleNext = () => {
      if (writingResult === 'wrong') {
        processReview(0); // Não sabe
      }
      setWritingInput('');
      setWritingResult(null);
      if (currentCardIndex < reviewQueue.length - 1) {
        setCurrentCardIndex(prev => prev + 1);
      } else {
        showAlert('Sessão de revisão concluída!');
        setView('deck');
      }
    };

    return (
      <div className="h-full flex flex-col p-4 max-w-xl mx-auto">
        <div className="flex justify-between items-center mb-4 text-sm text-gray-500 dark:text-gray-400">
           <span>Revisão por Escrita</span>
           <span>{currentCardIndex + 1} / {reviewQueue.length}</span>
        </div>
        <div className="text-xs text-gray-400 dark:text-gray-500 mb-2 text-center">
          Enter: {!writingResult ? 'Verificar' : 'Próximo'} | ESC: Cancelar
        </div>

        <div className="flex-1 flex items-center justify-center min-h-[300px] bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 mb-6">
           <KanjiCard 
             kanji={card.kanji}
             reading={card.reading}
             meaning={card.meaning}
             showBack={false}
             furiganaMode={writingAnswerType === 'reading' ? 'never' : 'always'}
             size="large"
           />
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {writingAnswerType === 'meaning' ? 'Digite o significado:' : 'Digite a leitura:'}
            </label>
            <input
              ref={inputRef}
              type="text"
              value={writingInput}
              onChange={(e) => {
                setWritingInput(e.target.value);
                setWritingResult(null);
              }}
              disabled={writingResult !== null}
              className={`w-full p-4 text-lg rounded-lg border-2 transition-all ${
                writingResult === 'correct' 
                  ? 'bg-green-50 dark:bg-green-900/20 border-green-500 text-green-700 dark:text-green-300' 
                  : writingResult === 'wrong'
                  ? 'bg-red-50 dark:bg-red-900/20 border-red-500 text-red-700 dark:text-red-300'
                  : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-800 dark:text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500'
              }`}
              placeholder={writingAnswerType === 'meaning' ? 'Ex: Gato' : 'Ex: ねこ'}
            />
          </div>

          {writingResult === 'correct' && (
            <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg border border-green-200 dark:border-green-800 text-center animate-bounce">
              <p className="text-green-800 dark:text-green-200 font-semibold">✓ Correto!</p>
            </div>
          )}

          {writingResult === 'wrong' && (
            <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-lg border border-red-200 dark:border-red-800 animate-fadeIn">
              <p className="text-red-800 dark:text-red-200 font-semibold text-center mb-2">✗ Incorreto</p>
              <p className="text-sm text-red-700 dark:text-red-300 text-center">
                Resposta correta: <strong>{correctAnswer}</strong>
              </p>
            </div>
          )}

          {!writingResult ? (
            <button
              type="submit"
              disabled={!writingInput.trim()}
              className="w-full bg-blue-600 text-white py-4 rounded-lg font-bold shadow hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              Verificar
            </button>
          ) : (
            <button
              type="button"
              onClick={handleNext}
              className="w-full bg-blue-600 text-white py-4 rounded-lg font-bold shadow hover:bg-blue-700 transition"
            >
              {currentCardIndex < reviewQueue.length - 1 ? 'Próximo Card' : 'Finalizar'}
            </button>
          )}
        </form>
        
        <button onClick={() => setView('deck')} className="mt-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 text-sm text-center w-full">
          Cancelar Revisão
        </button>
      </div>
    );
  };

  const TestModeSelectionView = () => {
    const deck = decks.find(d => d.id === activeDeckId);
    if (!deck) return null;

    return (
      <div className="p-4 max-w-2xl mx-auto h-full flex flex-col">
        <div className="flex items-center mb-6">
          <button onClick={() => setView('deck')} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg mr-2">
            <ChevronLeft size={20} className="text-gray-800 dark:text-white" />
          </button>
          <h2 className="text-xl font-bold text-gray-800 dark:text-white">Escolher Tipo de Teste</h2>
        </div>

        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg mb-6 border border-blue-200 dark:border-blue-800">
          <p className="text-sm text-blue-800 dark:text-blue-200">
            <strong>Regras do Teste:</strong> Você responderá 10 questões. Se errar 4 ou mais, precisará recomeçar o mesmo teste.
          </p>
        </div>

        <div className="flex-1 flex flex-col justify-center gap-4">
          <button
            onClick={() => startTest(activeDeckId, 'translation')}
            disabled={deck.cards.length < 10}
            className={`w-full p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg border-2 border-gray-200 dark:border-gray-700 hover:border-red-500 dark:hover:border-red-500 transition-all ${
              deck.cards.length < 10 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer active:scale-95'
            }`}
          >
            <div className="text-left">
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">Teste de Tradução</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Você verá o kanji e precisará escolher a tradução correta entre duas opções.
              </p>
            </div>
          </button>

          <button
            onClick={() => startTest(activeDeckId, 'reading')}
            disabled={deck.cards.length < 10}
            className={`w-full p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg border-2 border-gray-200 dark:border-gray-700 hover:border-red-500 dark:hover:border-red-500 transition-all ${
              deck.cards.length < 10 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer active:scale-95'
            }`}
          >
            <div className="text-left">
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">Teste de Leitura</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Você verá o kanji e precisará escolher a leitura em hiragana correta entre duas opções.
              </p>
            </div>
          </button>

          <button
            onClick={() => startWritingReview(activeDeckId, 'meaning', true)}
            disabled={deck.cards.length === 0}
            className={`w-full p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg border-2 border-gray-200 dark:border-gray-700 hover:border-orange-500 dark:hover:border-orange-500 transition-all ${
              deck.cards.length === 0 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer active:scale-95'
            }`}
          >
            <div className="text-left">
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2 flex items-center gap-2">
                <Keyboard size={20} />
                Teste de Escrita
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Você verá o kanji e precisará escrever o significado ou a leitura correta.
              </p>
            </div>
          </button>
        </div>

        {deck.cards.length < 10 && (
          <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
            <p className="text-sm text-yellow-800 dark:text-yellow-200 text-center">
              Este baralho precisa ter pelo menos 10 cards para fazer um teste. Atualmente tem {deck.cards.length} cards.
            </p>
          </div>
        )}
      </div>
    );
  };

  const TestView = () => {
    const currentCard = testQueue[testCurrentIndex];
    if (!currentCard) return <div>Erro ao carregar card.</div>;

    const correctAnswer = testMode === 'translation' ? currentCard.meaning : currentCard.reading;
    const isCorrect = testSelectedAnswer === correctAnswer;

    return (
      <div className="h-full flex flex-col p-4 max-w-xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            <span className="font-semibold">Questão {testCurrentIndex + 1} / 10</span>
          </div>
          <div className="text-sm">
            <span className={`font-bold ${testScore.wrong >= 3 ? 'text-red-600 dark:text-red-400' : 'text-gray-600 dark:text-gray-400'}`}>
              Erros: {testScore.wrong} / 4
            </span>
          </div>
        </div>

        <div className="flex-1 flex items-center justify-center min-h-[250px] bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 mb-6">
          <KanjiCard 
            kanji={currentCard.kanji}
            reading={currentCard.reading}
            meaning={currentCard.meaning}
            showBack={false}
            furiganaMode={testMode === 'reading' ? 'never' : 'always'}
            size="large"
          />
        </div>

        <div className="space-y-3 mb-4">
          {testOptions.map((option, index) => {
            let buttonClass = "w-full py-4 px-6 rounded-lg font-bold text-lg transition-all border-2 ";
            let isSelected = testSelectedAnswer === option;
            let isCorrectOption = option === correctAnswer;

            if (testShowResult) {
              if (isCorrectOption) {
                buttonClass += "bg-green-500 text-white border-green-600 dark:bg-green-600 dark:border-green-700";
              } else if (isSelected && !isCorrectOption) {
                buttonClass += "bg-red-500 text-white border-red-600 dark:bg-red-600 dark:border-red-700";
              } else {
                buttonClass += "bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 border-gray-300 dark:border-gray-600 opacity-50";
              }
            } else {
              buttonClass += "bg-white dark:bg-gray-700 text-gray-800 dark:text-white border-gray-300 dark:border-gray-600 hover:border-red-500 dark:hover:border-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 cursor-pointer active:scale-95";
            }

            return (
              <button
                key={index}
                onClick={() => !testShowResult && handleTestAnswer(option)}
                disabled={testShowResult}
                className={buttonClass}
              >
                <div className="flex items-center justify-between">
                  <span>{option}</span>
                  {testShowResult && isCorrectOption && (
                    <Check size={24} className="text-white" />
                  )}
                  {testShowResult && isSelected && !isCorrectOption && (
                    <X size={24} className="text-white" />
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {testShowResult && (
          <div className="mb-4">
            {isCorrect ? (
              <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg border border-green-200 dark:border-green-800 text-center">
                <p className="text-green-800 dark:text-green-200 font-semibold">✓ Correto!</p>
              </div>
            ) : (
              <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-lg border border-red-200 dark:border-red-800 text-center">
                <p className="text-red-800 dark:text-red-200 font-semibold">✗ Incorreto. A resposta correta é: {correctAnswer}</p>
              </div>
            )}
          </div>
        )}

        {testShowResult && testScore.wrong < 4 && testCurrentIndex < testQueue.length - 1 && (
          <button
            onClick={nextTestQuestion}
            className="w-full bg-red-600 text-white py-4 rounded-lg font-bold shadow-lg hover:bg-red-700 active:scale-95 transition"
          >
            Próxima Questão
          </button>
        )}
        
        {testShowResult && (testScore.wrong >= 4 || testCurrentIndex >= testQueue.length - 1) && (
          <div className="w-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 py-4 rounded-lg font-medium text-center">
            Carregando resultado...
          </div>
        )}

        <button 
          onClick={() => setView('deck')} 
          className="mt-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 text-sm text-center w-full"
        >
          Cancelar Teste
        </button>
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
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`,
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
          const error = await response.json();
          showAlert('❌ Erro na conexão: ' + (error.error?.message || 'Erro desconhecido'));
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
      <div className="p-4 max-w-4xl mx-auto h-full flex flex-col pb-24">
        <div className="flex items-center mb-6">
          <button 
            onClick={() => setView('home')} 
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg mr-2"
          >
            <ChevronLeft size={20} className="text-gray-800 dark:text-white" />
          </button>
          <h2 className="text-xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
            <Settings size={24} className="text-purple-600 dark:text-purple-400" />
            Painel Desenvolvedor
            <span className="px-2 py-1 text-xs font-bold bg-purple-500 text-white rounded">DEV</span>
          </h2>
        </div>

        <div className="flex gap-2 mb-6 border-b border-gray-200 dark:border-gray-700 overflow-x-auto">
          {['info', 'export', 'clear', 'cloud', 'api', 'editor'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-sm font-medium border-b-2 transition whitespace-nowrap ${
                activeTab === tab
                  ? 'border-purple-500 text-purple-600 dark:text-purple-400'
                  : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
              }`}
            >
              {tab === 'info' && 'Info'}
              {tab === 'export' && 'Exportar'}
              {tab === 'clear' && 'Limpar'}
              {tab === 'cloud' && 'Nuvem'}
              {tab === 'api' && 'API'}
              {tab === 'editor' && 'Editor'}
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
    const percentage = Math.round((testScore.correct / totalQuestions) * 100);

    return (
      <div className="h-full flex flex-col p-4 max-w-xl mx-auto">
        <div className="flex-1 flex flex-col items-center justify-center">
          {testPassed ? (
            <>
              <div className="mb-6">
                <Award size={80} className="text-green-500 dark:text-green-400 mx-auto" />
              </div>
              <h2 className="text-3xl font-bold text-green-600 dark:text-green-400 mb-4 text-center">
                Parabéns! Você Passou!
              </h2>
              <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-xl border border-green-200 dark:border-green-800 mb-6 w-full">
                <div className="text-center mb-4">
                  <div className="text-4xl font-bold text-green-600 dark:text-green-400 mb-2">
                    {testScore.correct} / {totalQuestions}
                  </div>
                  <div className="text-lg text-green-700 dark:text-green-300">
                    {percentage}% de acertos
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="text-center">
                    <div className="font-semibold text-green-800 dark:text-green-200">Acertos</div>
                    <div className="text-2xl font-bold text-green-600 dark:text-green-400">{testScore.correct}</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-red-800 dark:text-red-200">Erros</div>
                    <div className="text-2xl font-bold text-red-600 dark:text-red-400">{testScore.wrong}</div>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setView('test-mode-selection')}
                className="w-full bg-red-600 text-white py-4 rounded-lg font-bold shadow-lg hover:bg-red-700 active:scale-95 transition mb-3"
              >
                Novo Teste
              </button>
            </>
          ) : (
            <>
              <div className="mb-6">
                <AlertCircle size={80} className="text-red-500 dark:text-red-400 mx-auto" />
              </div>
              <h2 className="text-3xl font-bold text-red-600 dark:text-red-400 mb-4 text-center">
                Você Errou 4 ou Mais
              </h2>
              <div className="bg-red-50 dark:bg-red-900/20 p-6 rounded-xl border border-red-200 dark:border-red-800 mb-6 w-full">
                <div className="text-center mb-4">
                  <div className="text-4xl font-bold text-red-600 dark:text-red-400 mb-2">
                    {testScore.correct} / {totalQuestions}
                  </div>
                  <div className="text-lg text-red-700 dark:text-red-300">
                    {percentage}% de acertos
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="text-center">
                    <div className="font-semibold text-green-800 dark:text-green-200">Acertos</div>
                    <div className="text-2xl font-bold text-green-600 dark:text-green-400">{testScore.correct}</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-red-800 dark:text-red-200">Erros</div>
                    <div className="text-2xl font-bold text-red-600 dark:text-red-400">{testScore.wrong}</div>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
                  <p className="text-sm text-yellow-800 dark:text-yellow-200 text-center">
                    Você precisa acertar pelo menos 7 de 10 para passar. Continue estudando!
                  </p>
                </div>
              </div>
              <button
                onClick={restartTest}
                className="w-full bg-red-600 text-white py-4 rounded-lg font-bold shadow-lg hover:bg-red-700 active:scale-95 transition mb-3"
              >
                Tentar Novamente (Mesmo Teste)
              </button>
            </>
          )}
          
          <button
            onClick={() => setView('deck')}
            className="w-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white py-3 rounded-lg font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition"
          >
            Voltar ao Baralho
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950 transition-colors duration-300 font-sans">
      {/* Modals Layer */}
      {showApiKeyModal && (
        <Modal isOpen={true} onClose={() => {}} title="Configuração Inicial">
          <div className="space-y-4">
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Para usar o gerador de cards com IA, você precisa da sua chave API do Google Gemini.
            </p>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Chave API do Gemini
              </label>
              <input 
                type="password"
                autoFocus
                value={apiKeyInput}
                onChange={(e) => setApiKeyInput(e.target.value)}
                placeholder="Cole sua chave API aqui"
                className="w-full p-3 bg-gray-100 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-800 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && apiKeyInput.trim()) saveApiKey();
                }}
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                Você pode obter sua chave em: <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="text-indigo-600 dark:text-indigo-400 hover:underline">Google AI Studio</a>
              </p>
            </div>
            <button 
              onClick={saveApiKey}
              disabled={!apiKeyInput.trim()}
              className="w-full bg-indigo-600 text-white py-3 rounded-lg font-bold hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              Salvar Chave
            </button>
          </div>
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
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {binIdModalMode === 'edit' 
                ? 'Digite o seu ID de usuário para sincronizar seus dados na nuvem.'
                : 'Digite o seu ID de usuário para sincronizar seus dados na nuvem. Se você não tem um ID, clique em "Criar Novo Bin" no menu de configurações para gerar um automaticamente.'}
            </p>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                ID de Usuário
              </label>
              <input 
                type="text"
                autoFocus
                value={jsonbinBinIdInput}
                onChange={(e) => setJsonbinBinIdInput(e.target.value)}
                placeholder="Digite seu ID de usuário (ex: gselvino, user123)"
                className="w-full p-3 bg-gray-100 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-800 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500 font-mono text-sm"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && jsonbinBinIdInput.trim()) {
                    saveJsonbinBinId();
                  }
                }}
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                O ID de usuário identifica seus dados no banco compartilhado. Cada usuário deve ter seu próprio ID único.
              </p>
            </div>
            <div className="flex gap-2">
              <button 
                onClick={() => {
                  setShowBinIdModal(false);
                  setJsonbinBinIdInput('');
                }}
                className="flex-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white py-3 rounded-lg font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition"
              >
                Cancelar
              </button>
              <button 
                onClick={saveJsonbinBinId}
                disabled={!jsonbinBinIdInput.trim() || isSyncing}
                className="flex-1 bg-indigo-600 text-white py-3 rounded-lg font-bold hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center justify-center gap-2"
              >
                {isSyncing ? (
                  <>
                    <RefreshCw size={16} className="animate-spin" />
                    <span>Verificando...</span>
                  </>
                ) : (
                  <span>{binIdModalMode === 'edit' ? 'Salvar' : 'Conectar'}</span>
                )}
              </button>
            </div>
          </div>
        </Modal>
      )}


      {modalConfig.type === 'create_deck' && (
        <Modal isOpen={true} onClose={closeModal} title="Novo Baralho">
           <input 
              autoFocus
              type="text" 
              placeholder="Nome do baralho (ex: Verbos N5)"
              value={tempInput}
              onChange={(e) => setTempInput(e.target.value)}
              className="w-full p-3 bg-gray-100 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg mb-6 text-gray-800 dark:text-white outline-none focus:ring-2 focus:ring-red-500"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && tempInput.trim()) createDeck(tempInput);
              }}
           />
           <button 
             onClick={() => tempInput.trim() && createDeck(tempInput)}
             disabled={!tempInput.trim()}
             className="w-full bg-red-600 text-white py-3 rounded-lg font-bold hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
           >
             Criar
           </button>
        </Modal>
      )}

      {modalConfig.type === 'add_card' && (
        <Modal isOpen={true} onClose={closeModal} title="Adicionar Card Manualmente">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Kanji / Palavra
              </label>
              <input 
                type="text" 
                autoFocus
                value={newCardForm.kanji}
                onChange={(e) => setNewCardForm({...newCardForm, kanji: e.target.value})}
                placeholder="Ex: 猫"
                className="w-full p-3 bg-gray-100 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-800 dark:text-white outline-none focus:ring-2 focus:ring-green-500"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && newCardForm.kanji.trim() && newCardForm.reading.trim() && newCardForm.meaning.trim()) {
                    saveNewCard();
                  }
                }}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Leitura (Hiragana/Katakana)
              </label>
              <input 
                type="text" 
                value={newCardForm.reading}
                onChange={(e) => setNewCardForm({...newCardForm, reading: e.target.value})}
                placeholder="Ex: ねこ"
                className="w-full p-3 bg-gray-100 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-800 dark:text-white outline-none focus:ring-2 focus:ring-green-500"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && newCardForm.kanji.trim() && newCardForm.reading.trim() && newCardForm.meaning.trim()) {
                    saveNewCard();
                  }
                }}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Significado
              </label>
              <input 
                type="text" 
                value={newCardForm.meaning}
                onChange={(e) => setNewCardForm({...newCardForm, meaning: e.target.value})}
                placeholder="Ex: Gato"
                className="w-full p-3 bg-gray-100 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-800 dark:text-white outline-none focus:ring-2 focus:ring-green-500"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && newCardForm.kanji.trim() && newCardForm.reading.trim() && newCardForm.meaning.trim()) {
                    saveNewCard();
                  }
                }}
              />
            </div>
            <div className="flex gap-3 pt-2">
              <button 
                onClick={closeModal}
                className="flex-1 py-3 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 font-medium transition"
              >
                Cancelar
              </button>
              <button 
                onClick={saveNewCard}
                disabled={!newCardForm.kanji.trim() || !newCardForm.reading.trim() || !newCardForm.meaning.trim()}
                className="flex-1 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed font-bold transition"
              >
                Adicionar
              </button>
            </div>
          </div>
        </Modal>
      )}

      {modalConfig.type === 'confirm' && (
        <Modal isOpen={true} onClose={closeModal} title="Confirmação">
           <p className="text-gray-600 dark:text-gray-300 mb-6">{modalConfig.data.message}</p>
           <div className="flex gap-3">
             <button onClick={closeModal} className="flex-1 py-3 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 font-medium">Cancelar</button>
             <button onClick={modalConfig.data.onConfirm} className="flex-1 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 font-bold">Confirmar</button>
           </div>
        </Modal>
      )}

      {modalConfig.type === 'alert' && (
        <Modal isOpen={true} onClose={closeModal} title="Aviso">
           <p className="text-gray-600 dark:text-gray-300 mb-6 flex items-start gap-3">
             <AlertCircle size={20} className="text-indigo-500 shrink-0 mt-1" />
             {modalConfig.data.message}
           </p>
           <button onClick={closeModal} className="w-full bg-indigo-600 text-white py-3 rounded-lg font-bold hover:bg-indigo-700">OK</button>
        </Modal>
      )}

      {modalConfig.type === 'edit_card' && editingCard && (
        <Modal isOpen={true} onClose={closeModal} title="Editar Card">
          <div className="space-y-4 max-h-[80vh] overflow-y-auto">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Kanji / Palavra
              </label>
              <input 
                type="text" 
                value={editCardForm.kanji}
                onChange={(e) => setEditCardForm({...editCardForm, kanji: e.target.value})}
                className="w-full p-3 bg-gray-100 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-800 dark:text-white outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Leitura (Hiragana/Katakana)
              </label>
              <input 
                type="text" 
                value={editCardForm.reading}
                onChange={(e) => setEditCardForm({...editCardForm, reading: e.target.value})}
                className="w-full p-3 bg-gray-100 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-800 dark:text-white outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Significado
              </label>
              <input 
                type="text" 
                value={editCardForm.meaning}
                onChange={(e) => setEditCardForm({...editCardForm, meaning: e.target.value})}
                className="w-full p-3 bg-gray-100 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-800 dark:text-white outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Tags */}
            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Tags
              </label>
              <div className="flex flex-wrap gap-2 mb-2">
                {(editingCard.tags || []).map((tag, idx) => (
                  <span key={idx} className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded text-xs">
                    <Tag size={12} />
                    {tag}
                    <button
                      onClick={() => removeTagFromCard(editingCard.id, tag)}
                      className="ml-1 text-blue-500 hover:text-blue-700"
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
                  className="flex-1 p-2 bg-gray-100 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-800 dark:text-white outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
                <button
                  onClick={() => {
                    if (newTagInput.trim()) {
                      addTagToCard(editingCard.id, newTagInput);
                      setNewTagInput('');
                    }
                  }}
                  className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium"
                >
                  <Plus size={16} />
                </button>
              </div>
              {availableTags.length > 0 && (
                <div className="mt-2">
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Tags disponíveis:</p>
                  <div className="flex flex-wrap gap-1">
                    {availableTags.filter(tag => !(editingCard.tags || []).includes(tag)).map(tag => (
                      <button
                        key={tag}
                        onClick={() => {
                          addTagToCard(editingCard.id, tag);
                        }}
                        className="px-2 py-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-xs hover:bg-gray-300 dark:hover:bg-gray-600"
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
              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-2 mb-3">
                  <History size={18} className="text-gray-600 dark:text-gray-400" />
                  <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300">Histórico de Revisões</h4>
                </div>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {editingCard.reviewHistory.slice().reverse().map((review, idx) => {
                    const date = new Date(review.date);
                    const qualityLabels = { 0: 'Não sei', 1: 'Dúvida', 2: 'Sei' };
                    const qualityColors = { 0: 'red', 1: 'yellow', 2: 'green' };
                    
                    return (
                      <div key={idx} className="p-2 bg-gray-50 dark:bg-gray-900 rounded text-xs">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-gray-600 dark:text-gray-400">{date.toLocaleString('pt-BR')}</span>
                          <span className={`px-2 py-0.5 rounded font-semibold text-white ${
                            review.quality === 0 ? 'bg-red-500' : review.quality === 1 ? 'bg-yellow-500' : 'bg-green-500'
                          }`}>
                            {qualityLabels[review.quality]}
                          </span>
                        </div>
                        <div className="text-gray-500 dark:text-gray-500 text-xs">
                          Intervalo: {review.intervalBefore} → {review.intervalAfter} dias | 
                          Facilidade: {review.easeFactorBefore.toFixed(2)} → {review.easeFactorAfter.toFixed(2)}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            <div className="flex gap-3 pt-2">
              <button 
                onClick={() => resetCardProgress(editingCard.id)}
                className="flex-1 py-2 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 rounded-lg hover:bg-yellow-200 dark:hover:bg-yellow-900/50 font-medium text-sm"
              >
                Resetar Progresso
              </button>
            </div>
            <div className="flex gap-3 pt-2">
              <button onClick={closeModal} className="flex-1 py-3 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 font-medium">Cancelar</button>
              <button 
                onClick={saveEditedCard}
                disabled={!editCardForm.kanji.trim() || !editCardForm.reading.trim() || !editCardForm.meaning.trim()}
                className="flex-1 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-bold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Salvar
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* Main Views */}
      {view === 'home' && <HomeView />}
      {view === 'stats' && <StatsView />}
      {view === 'deck' && <DeckDetailView />}
      {view === 'generator' && <GeneratorView />}
      {view === 'review' && <ReviewSessionView />}
      {view === 'quick-review' && <QuickReviewView />}
      {view === 'writing-review' && <WritingReviewView />}
      {view === 'test-mode-selection' && <TestModeSelectionView />}
      {view === 'test' && <TestView />}
      {view === 'test-result' && <TestResultView />}
      {view === 'dev-panel' && isDevMode() && <DevPanelView />}
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

