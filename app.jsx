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

  // Modal States
  const [modalConfig, setModalConfig] = useState({ type: null, data: null });
  const [tempInput, setTempInput] = useState('');

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

  // Modal Helpers
  const closeModal = () => {
    setModalConfig({ type: null, data: null });
    setTempInput('');
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
        const cardsToAdd = newCardsData.map((data, index) => ({
          id: `${timestamp}-${index}-${Math.random().toString(36).substr(2, 5)}`,
          ...data,
          interval: 0,
          nextReview: timestamp
        }));
        
        return {
          ...d,
          cards: [...d.cards, ...cardsToAdd]
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
    setView('review');
  };

  const processReview = (quality) => {
    const currentCard = reviewQueue[currentCardIndex];
    let newInterval;
    let nextReviewDate = Date.now();

    if (quality === 0) {
      newInterval = 0;
      nextReviewDate += 60 * 1000;
    } else if (quality === 1) {
      newInterval = currentCard.interval === 0 ? 1 : Math.ceil(currentCard.interval * 1.2);
      nextReviewDate += 24 * 60 * 60 * 1000;
    } else {
      newInterval = currentCard.interval === 0 ? 1 : Math.ceil(currentCard.interval * 2.5);
      nextReviewDate += newInterval * 24 * 60 * 60 * 1000;
    }

    const updatedDecks = decks.map(d => {
      if (d.id === activeDeckId) {
        return {
          ...d,
          cards: d.cards.map(c => c.id === currentCard.id ? { ...c, interval: newInterval, nextReview: nextReviewDate } : c)
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

  // --- AI GENERATION LOGIC ---
  const handleGenerate = async (promptOverride = null) => {
    const prompt = promptOverride || generatorPrompt;
    if (!prompt || !prompt.trim()) return;
    
    const apiKey = localStorage.getItem('gemini_api_key');
    if (!apiKey) {
      showAlert('Por favor, configure sua chave API do Gemini primeiro.');
      setShowApiKeyModal(true);
      return;
    }
    
    setIsGenerating(true);
    const promptText = `
      Gere um array JSON estrito contendo 5 flashcards de vocabulário japonês focados no tema: "${prompt}".
      
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

  const HomeView = () => (
    <div className="p-4 max-w-2xl mx-auto pb-24">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
          <Brain size={24} className="text-red-500" />
          NihonGo Deck
        </h1>
        <div className="flex gap-2">
           <label className="p-2 bg-gray-200 dark:bg-gray-700 rounded-full cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-600 transition">
             <Upload size={20} className="text-gray-700 dark:text-gray-300" />
             <input type="file" onChange={handleImport} className="hidden" accept=".json" />
           </label>
           <button onClick={handleExportAll} className="p-2 bg-gray-200 dark:bg-gray-700 rounded-full hover:bg-gray-300 dark:hover:bg-gray-600 transition">
             <Download size={20} className="text-gray-700 dark:text-gray-300" />
           </button>
           <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className="p-2 bg-gray-200 dark:bg-gray-700 rounded-full hover:bg-gray-300 dark:hover:bg-gray-600 transition">
            {theme === 'dark' ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} className="text-gray-700" />}
          </button>
        </div>
      </div>

      <div className="grid gap-4">
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

    return (
      <div className="p-4 max-w-2xl mx-auto h-full flex flex-col">
        <div className="flex items-center justify-between mb-6">
          <button onClick={() => setView('home')} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
            <ChevronLeft size={20} className="text-gray-800 dark:text-white" />
          </button>
          <h2 className="text-xl font-bold text-gray-800 dark:text-white truncate max-w-[200px]">{deck.name}</h2>
          <div className="flex gap-2">
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

           {isReviewDue ? (
             <button 
               onClick={() => startReview(deck.id, false)}
               className="w-full bg-red-600 text-white py-3 rounded-lg font-bold shadow-md hover:bg-red-700 active:scale-95 transition flex items-center justify-center gap-2 animate-pulse"
             >
               <Play size={20} fill="currentColor" />
               Iniciar Revisão ({dueCardsCount})
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
                 <>Baralho Vazio</>
               ) : (
                 <>
                   <RotateCw size={20} />
                   Revisão Extra (Rever Todos)
                 </>
               )}
             </button>
           )}
           
           <button 
             onClick={() => setView('generator')}
             className="w-full bg-indigo-600 text-white py-3 rounded-lg font-bold shadow-md hover:bg-indigo-700 active:scale-95 transition flex items-center justify-center gap-2"
           >
             <Sparkles size={20} />
             Gerar Cards com IA (Tema)
           </button>
        </div>

        <div className="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-900 rounded-lg p-2 border border-gray-200 dark:border-gray-700">
          <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2 px-2">Cards Existentes</h3>
          {deck.cards.length === 0 ? (
            <div className="text-center py-8 text-gray-400">Nenhum card ainda. Crie ou Gere um!</div>
          ) : (
            <div className="space-y-2">
              {deck.cards.map((card, idx) => (
                <div key={idx} className="bg-white dark:bg-gray-800 p-3 rounded shadow-sm flex justify-between items-center">
                  <div>
                    <ruby className="text-lg font-bold text-gray-800 dark:text-gray-200">
                      {card.kanji}
                      <rt className="text-xs text-gray-500">{card.reading}</rt>
                    </ruby>
                    <div className="text-sm text-gray-600 dark:text-gray-400">{card.meaning}</div>
                  </div>
                  <button 
                    onClick={() => {
                      const newCards = deck.cards.filter(c => c.id !== card.id);
                      setDecks(decks.map(d => d.id === deck.id ? {...d, cards: newCards} : d));
                    }}
                    className="text-gray-400 hover:text-red-500"
                  >
                    <Trash2 size={16} />
                  </button>
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
        handleGenerate(value);
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

        <div className="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-lg border border-indigo-200 dark:border-indigo-800 mb-6">
           <h4 className="font-bold text-indigo-800 dark:text-indigo-200 text-sm flex items-center gap-2">
             <Sparkles size={16} />
             Power by Google Gemini
           </h4>
           <p className="text-sm text-indigo-700 dark:text-indigo-300 mt-1">
             A IA criará 5 cards únicos para você. O processo pode levar alguns segundos.
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

  const ReviewSessionView = () => {
    const card = reviewQueue[currentCardIndex];
    if (!card) return <div>Erro ao carregar card.</div>;

    return (
      <div className="h-full flex flex-col p-4 max-w-xl mx-auto">
        <div className="flex justify-between items-center mb-4 text-sm text-gray-500 dark:text-gray-400">
           <span>Revisão</span>
           <span>{currentCardIndex + 1} / {reviewQueue.length}</span>
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

      {/* Main Views */}
      {view === 'home' && <HomeView />}
      {view === 'deck' && <DeckDetailView />}
      {view === 'generator' && <GeneratorView />}
      {view === 'review' && <ReviewSessionView />}
    </div>
  );
}

// Renderizar o app
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

