import React, { useState, useEffect } from 'react';
import { 
  Settings, Plus, ArrowLeft, LayoutGrid, List, Download, Trash2, 
  Search, BarChart2, Zap, PenTool, Brain, CheckCircle2, XCircle, 
  Clock, Calendar, Flame, Target, Sparkles, 
  WifiOff, RefreshCw, Layers, Shield, Database, Code, Globe, MessageCircle,
  BookOpen, Pencil, HelpCircle, Trophy, ChevronRight, User, UserPlus, Users,
  Star, Camera, Share2, Mail, Lock, Chrome, Heart, Bell, ChevronDown, CheckCircle,
  Target as TargetIcon
} from 'lucide-react';

// --- COMPONENTES AUXILIARES 3D (REUTILIZÁVEIS) ---

const DuoButton = ({ children, variant = 'primary', className = '', fullWidth = false, ...props }) => {
  const variants = {
    primary: 'bg-[#58cc02] border-[#46a302] text-white hover:bg-[#61e002]',
    secondary: 'bg-[#1cb0f6] border-[#1899d6] text-white hover:bg-[#20c4ff]',
    outline: 'bg-white border-[#e5e5e5] text-[#afafaf] border-b-2 active:border-b-2 dark:bg-[#1b2c35] dark:border-[#37464f] dark:text-white',
    danger: 'bg-[#ff4b4b] border-[#d33131] text-white',
    warning: 'bg-[#ff9600] border-[#e18600] text-white',
    indigo: 'bg-[#5844ed] border-[#4636be] text-white',
    white: 'bg-white border-[#e5e5e5] text-[#4b4b4b] border-b-4 active:border-b-2 dark:bg-[#1b2c35] dark:border-[#37464f] dark:text-white',
    social: 'bg-white border-[#e5e5e5] text-[#4b4b4b] border-b-4 active:border-b-2 dark:bg-[#1b2c35] dark:border-[#37464f] dark:text-white flex gap-3',
  };

  const is3D = !['ghost', 'outline'].includes(variant);

  return (
    <button 
      className={`px-6 py-3 rounded-2xl font-black uppercase tracking-wider text-sm transition-all active:translate-y-1 active:border-b-0
        ${is3D ? 'border-b-4' : 'border-2'}
        ${variants[variant]} 
        ${fullWidth ? 'w-full' : ''}
        ${className}
        flex items-center justify-center gap-2 select-none`}
      {...props}
    >
      {children}
    </button>
  );
};

const DuoCard = ({ children, className = '', active = false, interactive = false }) => (
  <div className={`bg-white dark:bg-[#1b2c35] border-2 rounded-2xl transition-all p-4
    ${active ? 'border-[#84d8ff] bg-[#ddf4ff] dark:bg-blue-900/20' : 'border-[#e5e5e5] dark:border-[#37464f] shadow-sm'}
    ${interactive ? 'active:translate-y-0.5 cursor-pointer' : ''}
    ${className}`}>
    {children}
  </div>
);

const ProgressBar = ({ progress, color = '#58cc02' }) => (
  <div className="h-4 w-full bg-[#e5e5e5] dark:bg-[#37464f] rounded-full overflow-hidden">
    <div 
      className="h-full transition-all duration-1000 rounded-full" 
      style={{ width: `${Math.min(100, progress)}%`, backgroundColor: color, boxShadow: 'inset 0 -4px 0 rgba(0,0,0,0.1)' }}
    ></div>
  </div>
);

// --- COMPONENTES DE VISTA (DEFINIDOS FORA DO APP PARA EVITAR REFERENCE ERRORS) ---

const LoginView = ({ navigate }) => (
  <div className="flex-1 flex flex-col p-8 items-center justify-center h-screen animate-in fade-in zoom-in-95 duration-700">
    <div className="w-32 h-32 bg-[#58cc02] rounded-[40px] flex items-center justify-center text-white shadow-2xl animate-bounce-slow mb-8">
      <Brain size={64} strokeWidth={2.5} />
    </div>
    <h1 className="text-3xl font-black uppercase tracking-tighter text-[#58cc02] dark:text-[#61e002] text-center mb-10">NihonGo Deck</h1>
    <div className="w-full space-y-4">
      <DuoButton onClick={() => navigate('home')} fullWidth className="h-16 text-lg">Começar Agora</DuoButton>
      <DuoButton variant="social" fullWidth className="h-16">
        <Chrome size={20} className="text-[#ea4335]" /> <span className="font-black uppercase text-xs">Entrar com Google</span>
      </DuoButton>
    </div>
  </div>
);

const HomeView = ({ decks, user, navigate, setModal }) => (
  <div className="p-4 pt-6 animate-in fade-in">
    <header className="flex justify-between items-center mb-10 px-2 sticky top-0 bg-inherit z-10 py-2">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1 text-[#ff9600] font-black"><Flame size={22} fill="#ff9600" /> {user.streak}</div>
        <div className="flex items-center gap-1 text-[#1cb0f6] font-black"><Zap size={22} fill="#1cb0f6" /> 1.2k</div>
      </div>
      <button onClick={() => setModal('settings')} className="p-2 text-[#afafaf] dark:hover:text-white transition-colors"><Settings size={28} /></button>
    </header>
    <h2 className="font-black text-2xl uppercase tracking-tighter mb-8 px-2 dark:text-white">Meus Baralhos</h2>
    <div className="grid grid-cols-3 gap-y-12 gap-x-4 justify-items-center">
      {decks.map((deck) => (
        <div key={deck.id} className="relative flex flex-col items-center w-full group cursor-pointer" onClick={() => navigate('deck', deck)}>
          <div className="w-22 h-22 rounded-full border-[8px] border-[#e5e5e5] dark:border-[#37464f] relative flex items-center justify-center shadow-lg transition-transform active:scale-95"
            style={{ borderTopColor: deck.color, borderRightColor: deck.progress >= 25 ? deck.color : '', borderBottomColor: deck.progress >= 50 ? deck.color : '', borderLeftColor: deck.progress >= 75 ? deck.color : '' }}>
            <div className="w-14 h-14 rounded-full flex items-center justify-center text-white" style={{ backgroundColor: deck.color }}><Brain size={30} /></div>
          </div>
          <span className="mt-3 font-black text-[10px] uppercase text-center dark:text-zinc-300 leading-tight">{deck.name}</span>
        </div>
      ))}
      <button onClick={() => setModal('new-deck')} className="w-20 h-20 rounded-full border-4 border-dashed border-[#e5e5e5] dark:border-[#37464f] flex items-center justify-center text-[#afafaf] hover:bg-zinc-50 dark:hover:bg-[#1b2c35] shadow-sm active:scale-95 transition-all"><Plus size={32} /></button>
    </div>
  </div>
);

const DeckDetailView = ({ deck, navigate, setModal }) => {
  if (!deck) return null;
  return (
    <div className="p-6 pt-10 animate-in slide-in-from-right h-full overflow-y-auto pb-24">
      <header className="flex justify-between items-center mb-8">
        <button onClick={() => navigate('home')} className="text-[#afafaf] hover:text-white transition-colors"><ArrowLeft size={28} strokeWidth={3} /></button>
        <div className="flex gap-4">
           <button className="text-[#afafaf] hover:text-[#1cb0f6]"><Download size={24} /></button>
           <button className="text-[#ff4b4b]"><Trash2 size={24} /></button>
        </div>
      </header>
      <div className="flex items-center gap-4 mb-10">
        <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-white shadow-lg bg-[#ff4b4b]"><Layers size={32} strokeWidth={2.5} /></div>
        <div><h1 className="text-2xl font-black uppercase tracking-tighter dark:text-white leading-none mb-1">{deck.name}</h1><p className="font-bold text-[#afafaf] dark:text-zinc-400 text-[10px] uppercase tracking-wider">{deck.cards} CARDS NO TOTAL</p></div>
      </div>
      <DuoCard className="mb-10 border-b-4 dark:bg-[#1b2c35]">
        <div className="flex justify-between items-center mb-3"><span className="font-black text-[10px] text-[#afafaf] dark:text-zinc-400 uppercase tracking-widest leading-none">PROGRESSO DE DOMÍNIO</span><span className="font-black text-sm text-[#58cc02] leading-none">{deck.progress}%</span></div>
        <ProgressBar progress={deck.progress} color="#ff4b4b" />
      </DuoCard>
      <div className="grid grid-cols-2 gap-4 mb-12">
        <DuoButton onClick={() => navigate('review')} variant="primary" className="h-28 flex-col relative" fullWidth><Brain size={28} /><span>REVISÃO</span><div className="absolute bottom-4 bg-white/20 px-3 py-0.5 rounded-full text-[10px] font-black">{deck.toReview}</div></DuoButton>
        <DuoButton onClick={() => navigate('test-select')} variant="indigo" className="h-28 flex-col" fullWidth><TargetIcon size={28} /><span>TESTES</span></DuoButton>
        <DuoButton onClick={() => navigate('ia-generator')} variant="secondary" className="h-20" fullWidth><Sparkles size={18} /><span className="text-[10px]">GERAR COM IA</span></DuoButton>
        <DuoButton onClick={() => setModal('add-card')} variant="white" className="h-20 border-2" fullWidth><Plus size={18} /><span className="text-[10px]">ADD CARD</span></DuoButton>
      </div>
      <div className="space-y-4 pb-12">
        <div className="flex justify-between items-center px-2"><h3 className="font-black text-[#afafaf] dark:text-zinc-400 uppercase text-xs tracking-widest">LISTA DE CARDS</h3><Search size={18} className="text-[#afafaf]" /></div>
        <div className="grid grid-cols-2 gap-4">
          {[ { j: '食べる', r: 'たべる', p: 'Comer', s: '#58cc02' }, { j: '行く', r: 'いく', p: 'Ir', s: '#ff9600' }, { j: '見る', r: 'みる', p: 'Ver', s: '#1cb0f6' }, { j: '来る', r: 'くる', p: 'Vir', s: '#afafaf' } ].map((c, i) => (
            <DuoCard key={i} className="flex flex-col items-center justify-center border-b-4 py-8 relative" interactive>
              <div className="absolute top-3 left-3 w-2.5 h-2.5 rounded-full shadow-sm" style={{ backgroundColor: c.s }}></div>
              <div className="flex flex-col items-center text-center">
                <ruby className="font-black text-3xl dark:text-white leading-tight mb-2">{c.j} <rt className="text-[10px] text-[#ff4b4b] uppercase font-black tracking-tighter">{c.r}</rt></ruby>
                <p className="text-[11px] font-bold text-[#afafaf] dark:text-zinc-400 uppercase tracking-wide">{c.p}</p>
              </div>
            </DuoCard>
          ))}
        </div>
      </div>
    </div>
  );
};

const StatsView = () => {
  const activityData = [82, 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 14, 0, 0, 0, 0, 113, 14, 0];
  return (
    <div className="p-6 pt-10 animate-in fade-in h-full overflow-y-auto pb-32">
      <h1 className="font-black text-3xl uppercase tracking-tighter mb-8 px-2 dark:text-white text-center sm:text-left">Estatísticas</h1>
      <div className="grid grid-cols-2 gap-4 mb-8">
        <DuoCard className="border-b-4 flex flex-col items-center gap-1 text-center py-6 bg-white dark:bg-[#1b2c35]"><Brain size={28} className="text-[#58cc02]" /><span className="text-2xl font-black dark:text-white leading-none">42</span><span className="text-[10px] font-black text-[#afafaf] dark:text-zinc-400 uppercase leading-none mt-1">Revisões Hoje</span></DuoCard>
        <DuoCard className="border-b-4 flex flex-col items-center gap-1 text-center py-6 bg-white dark:bg-[#1b2c35]"><RefreshCw size={28} className="text-[#1cb0f6]" /><span className="text-2xl font-black dark:text-white leading-none">248</span><span className="text-[10px] font-black text-[#afafaf] dark:text-zinc-400 uppercase leading-none mt-1">Esta Semana</span></DuoCard>
        <DuoCard className="border-b-4 flex flex-col items-center gap-1 text-center py-6 bg-white dark:bg-[#1b2c35]"><Flame size={28} className="text-[#ff9600] fill-[#ff9600]" /><span className="text-2xl font-black dark:text-white leading-none">15</span><span className="text-[10px] font-black text-[#afafaf] dark:text-zinc-400 uppercase leading-none mt-1">Ofensiva</span></DuoCard>
        <DuoCard className="border-b-4 flex flex-col items-center gap-1 text-center py-6 bg-white dark:bg-[#1b2c35]"><Zap size={28} className="text-[#ffc800] fill-[#ffc800]" /><span className="text-2xl font-black dark:text-white leading-none">88%</span><span className="text-[10px] font-black text-[#afafaf] dark:text-zinc-400 uppercase leading-none mt-1">Taxa Acerto</span></DuoCard>
      </div>
      <h3 className="font-black text-[#afafaf] dark:text-zinc-400 uppercase text-xs mb-4 px-2 tracking-widest uppercase">Atividade Recente</h3>
      <DuoCard className="border-b-4 p-5 bg-white dark:bg-[#1b2c35] mb-10">
        <div className="grid grid-cols-7 gap-2">
          {activityData.map((count, i) => {
            let bgColor = 'bg-[#f1f1f1] dark:bg-[#2c3e47]';
            if (count > 0 && count <= 20) bgColor = 'bg-[#1cb0f6]';
            else if (count > 20) bgColor = 'bg-[#58cc02]';
            return <div key={i} className={`aspect-square rounded-lg flex items-center justify-center transition-all ${bgColor}`}>{count > 0 && <span className="text-[9px] font-black text-white">{count}</span>}</div>;
          })}
        </div>
        <div className="flex justify-between mt-6 text-[9px] font-black text-[#afafaf] uppercase px-1"><span>Últimos 30 Dias</span><div className="flex gap-3"><div className="flex items-center gap-1"><div className="w-2.5 h-2.5 rounded-sm bg-[#1cb0f6]"></div> Baixa</div><div className="flex items-center gap-1"><div className="w-2.5 h-2.5 rounded-sm bg-[#58cc02]"></div> Alta</div></div></div>
      </DuoCard>
      <h3 className="font-black text-[#afafaf] dark:text-zinc-400 uppercase text-xs mb-4 px-2 tracking-widest uppercase">Progresso por Baralho</h3>
      <div className="space-y-4 pb-12">
        {[{ name: 'VERBOS N5', current: 12, total: 45, color: '#58cc02' }, { name: 'ADJETIVOS', current: 32, total: 32, color: '#1cb0f6' }].map((p, i) => (
          <DuoCard key={i} className="border-b-4 bg-white dark:bg-[#1b2c35]"><div className="flex justify-between items-center mb-2"><span className="font-black text-xs dark:text-white uppercase">{p.name}</span><span className="font-black text-[10px] text-[#afafaf] leading-none">{p.current}/{p.total} CARDS</span></div><ProgressBar progress={(p.current / p.total) * 100} color={p.color} /></DuoCard>
        ))}
      </div>
    </div>
  );
};

const ProfileView = ({ user, navigate }) => (
  <div className="p-6 pt-10 animate-in fade-in h-full overflow-y-auto pb-32">
    <header className="flex justify-between items-center mb-8">
      <h1 className="font-black text-3xl uppercase tracking-tighter dark:text-white">Perfil</h1>
      <DuoButton onClick={() => navigate('edit-profile')} variant="secondary" className="h-10 px-4 py-0 text-xs">EDITAR</DuoButton>
    </header>
    <div className="flex items-center gap-6 mb-10 pb-6 border-b-2 border-[#e5e5e5] dark:border-[#37464f]">
      <div className="w-24 h-24 rounded-full bg-[#ce82ff] border-b-4 border-[#a558e0] flex items-center justify-center text-white text-4xl font-black shadow-md">U</div>
      <div><h2 className="text-2xl font-black dark:text-white leading-tight">{user.name}</h2><p className="text-[#afafaf] dark:text-zinc-400 font-bold text-sm">Ingressou em {user.joinDate}</p><div className="flex items-center gap-1 mt-1 text-[#afafaf] font-black text-[10px] uppercase"><Users size={12} /> 12 SEGUINDO • 4 SEGUIDORES</div></div>
    </div>
    <h3 className="font-black text-[#afafaf] dark:text-zinc-400 uppercase text-xs mb-4 px-2 tracking-widest uppercase text-left w-full">Estatísticas</h3>
    <div className="grid grid-cols-2 gap-4 mb-10 w-full">
      <DuoCard className="border-b-4 flex items-center gap-3 py-6"><Flame size={24} className="text-[#ff9600] fill-[#ff9600]" /><div><p className="font-black text-xl leading-none dark:text-white">15</p><p className="text-[10px] font-black text-[#afafaf] dark:text-zinc-400 uppercase">Ofensiva</p></div></DuoCard>
      <DuoCard className="border-b-4 flex items-center gap-3 py-6"><Zap size={24} className="text-[#1cb0f6] fill-[#1cb0f6]" /><div><p className="font-black text-xl leading-none dark:text-white">1.2k</p><p className="text-[10px] font-black text-[#afafaf] dark:text-zinc-400 uppercase">Total XP</p></div></DuoCard>
    </div>
    <h3 className="font-black text-[#afafaf] dark:text-zinc-400 uppercase text-xs mb-4 px-2 tracking-widest uppercase text-left w-full">Metas de 2024</h3>
    <DuoCard className="mb-10 border-b-4 bg-white dark:bg-[#1b2c35] w-full"><div className="space-y-6"><div><div className="flex justify-between items-center mb-2"><span className="font-black text-[10px] uppercase dark:text-white">APRENDER 500 KANJIS</span><span className="text-[10px] font-black text-zinc-500">120/500</span></div><ProgressBar progress={24} color="#ff9600" /></div><div><div className="flex justify-between items-center mb-2"><span className="font-black text-[10px] uppercase dark:text-white">BATER META DIÁRIA</span><span className="text-[10px] font-black text-zinc-500">45/365</span></div><ProgressBar progress={12} color="#58cc02" /></div></div><button className="w-full mt-6 text-[#1cb0f6] font-black uppercase text-[10px] text-center hover:underline">VER TODAS AS METAS</button></DuoCard>
    <DuoButton variant="outline" fullWidth className="h-14 mt-4" onClick={() => navigate('friends-list')}><UserPlus size={18} className="text-[#1cb0f6]" /> ADICIONAR AMIGOS</DuoButton>
  </div>
);

const EditProfileView = ({ user, navigate, setModal }) => (
  <div className="p-6 pt-10 animate-in h-screen flex flex-col bg-white dark:bg-[#131f24] overflow-y-auto">
    <header className="flex items-center gap-4 mb-10"><button onClick={() => navigate('profile')} className="text-[#afafaf] hover:text-[#4b4b4b] dark:hover:text-white"><ArrowLeft size={28} strokeWidth={3} /></button><h1 className="font-black text-2xl uppercase tracking-tighter dark:text-white">Editar Perfil</h1></header>
    <div className="flex-1 space-y-8 pb-32">
      <div className="flex flex-col items-center"><div className="relative"><div className="w-32 h-32 rounded-full border-b-8 border-black/10 flex items-center justify-center text-white text-5xl font-black bg-[#ce82ff] shadow-lg">{user.name[0]}</div><div className="absolute bottom-0 right-0 bg-[#1cb0f6] border-4 border-white dark:border-[#131f24] p-2 rounded-full text-white shadow-xl"><Camera size={20} /></div></div></div>
      <div className="space-y-6">
        <div className="space-y-2"><label className="block font-black text-[11px] text-[#afafaf] dark:text-zinc-400 uppercase px-2 tracking-widest">Nome de Exibição</label><input type="text" defaultValue={user.name} className="w-full bg-[#f1f1f1] dark:bg-[#1b2c35] border-2 border-[#e5e5e5] dark:border-[#37464f] rounded-2xl px-5 py-5 font-bold outline-none focus:border-[#1cb0f6] dark:text-white shadow-sm" /></div>
        <div className="space-y-2"><label className="block font-black text-[11px] text-[#afafaf] dark:text-zinc-400 uppercase px-2 tracking-widest">Nickname (ID Único)</label><input type="text" defaultValue={user.nick} className="w-full bg-[#f1f1f1] dark:bg-[#1b2c35] border-2 border-[#e5e5e5] dark:border-[#37464f] rounded-2xl px-5 py-5 font-bold outline-none focus:border-[#1cb0f6] dark:text-white shadow-sm" /></div>
        <div className="space-y-2"><label className="block font-black text-[11px] text-[#afafaf] dark:text-zinc-400 uppercase px-2 tracking-widest">Metas de Aprendizado</label>
          <button onClick={() => setModal('goals')} className="w-full text-left active:scale-[0.98] transition-all"><DuoCard className="border-b-4 flex flex-col gap-4 hover:border-[#1cb0f6] dark:bg-[#1b2c35] p-6 shadow-sm" interactive><div className="flex justify-between items-center"><span className="text-xs font-black uppercase text-[#4b4b4b] dark:text-white tracking-tighter">Meta Anual</span><span className="font-black text-[#1cb0f6]">500 Kanjis</span></div><div className="flex justify-between items-center"><span className="text-xs font-black uppercase text-[#4b4b4b] dark:text-white tracking-tighter">Ritmo Diário</span><span className="font-black text-[#1cb0f6]">20 XP</span></div><div className="text-[9px] font-black text-[#afafaf] dark:text-zinc-500 uppercase text-center border-t border-[#e5e5e5] dark:border-[#37464f] pt-3 mt-1 text-center w-full">Toque para alterar</div></DuoCard></button>
        </div>
      </div>
    </div>
    <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md p-6 bg-white/90 dark:bg-[#131f24]/90 backdrop-blur-md flex gap-4"><DuoButton variant="outline" className="flex-1" onClick={() => navigate('profile')}>DESCARTAR</DuoButton><DuoButton variant="primary" className="flex-[2]" onClick={() => navigate('profile')}>SALVAR</DuoButton></div>
  </div>
);

const IAGeneratorView = ({ navigate }) => {
  const [showNotes, setShowNotes] = useState(false);
  const [selectedQty, setSelectedQty] = useState(5);
  return (
    <div className="p-6 pt-10 animate-in slide-in-from-right h-screen flex flex-col overflow-y-auto bg-white dark:bg-[#131f24]">
      <header className="flex items-center gap-4 mb-10"><button onClick={() => navigate('deck')} className="text-[#afafaf] hover:text-[#4b4b4b] dark:hover:text-white transition-colors"><ArrowLeft size={28} strokeWidth={3} /></button><h1 className="font-black text-2xl uppercase tracking-tighter dark:text-white leading-none">Gerador IA</h1></header>
      <div className="flex-1 space-y-10 pb-32 px-1">
        <div className="space-y-3"><label className="block font-black text-xs text-[#afafaf] dark:text-zinc-400 uppercase px-2 tracking-widest">O que você quer estudar?</label><input type="text" placeholder="Ex: Frutas, Anime..." className="w-full bg-[#f1f1f1] dark:bg-[#1b2c35] border-2 border-[#e5e5e5] dark:border-[#37464f] rounded-2xl px-5 py-5 font-bold outline-none focus:border-[#5844ed] dark:text-white shadow-sm" /></div>
        <div className="space-y-3"><label className="block font-black text-xs text-[#afafaf] dark:text-zinc-400 uppercase px-2 tracking-widest">Quantidade de Cards</label><div className="grid grid-cols-3 gap-3">{[3, 5, 8].map(qty => (<button key={qty} onClick={() => setSelectedQty(qty)} className={`py-5 rounded-2xl font-black uppercase text-sm transition-all border-b-4 active:translate-y-1 active:border-b-0 ${selectedQty === qty ? 'bg-[#5844ed] border-[#4636be] text-white shadow-lg' : 'bg-white dark:bg-[#1b2c35] border-[#e5e5e5] dark:border-[#37464f] text-[#afafaf]'}`}>{qty} Cards</button>))}</div></div>
        <div className="space-y-4"><button onClick={() => setShowNotes(!showNotes)} className="w-full flex justify-between items-center bg-white dark:bg-[#1b2c35] border-2 border-[#e5e5e5] dark:border-[#37464f] border-b-4 rounded-2xl p-6 active:translate-y-1 active:border-b-0 transition-all shadow-sm"><div className="flex items-center gap-4"><Pencil className="text-[#1cb0f6]" size={22} /><span className="font-black text-xs uppercase text-[#4b4b4b] dark:text-white tracking-widest">Criar a partir de anotações</span></div><ChevronDown className={`text-[#afafaf] transition-transform ${showNotes ? 'rotate-180' : ''}`} /></button>{showNotes && <textarea placeholder="Cole aqui suas anotações..." className="w-full h-80 bg-[#f1f1f1] dark:bg-[#1b2c35] border-2 border-[#e5e5e5] dark:border-[#37464f] rounded-2xl p-6 font-bold outline-none focus:border-[#5844ed] dark:text-white animate-in slide-in-from-top-2 resize-none" />}</div>
      </div>
      <div className="fixed bottom-24 left-1/2 -translate-x-1/2 w-full max-w-md px-6"><DuoButton variant="primary" fullWidth className="h-16 text-lg shadow-xl"><Zap size={20} fill="white" /> GERAR CARDS</DuoButton></div>
    </div>
  );
};

const TestSelectView = ({ navigate }) => {
  const challenges = [
    { title: 'Teste de Tradução', desc: 'Kanji -> Tradução', color: '#58cc02', icon: <MessageCircle /> },
    { title: 'Teste de Leitura', desc: 'Kanji -> Hiragana', color: '#1cb0f6', icon: <Layers /> },
    { title: 'Teste de Escrita', desc: 'Significado -> Kanji', color: '#ff9600', icon: <Pencil /> },
  ];
  return (
    <div className="p-6 pt-10 animate-in fade-in h-screen bg-white dark:bg-[#131f24]">
      <header className="flex items-center gap-4 mb-10"><button onClick={() => navigate('deck')} className="text-[#afafaf] dark:hover:text-white transition-colors"><ArrowLeft size={28} strokeWidth={3} /></button><h1 className="font-black text-2xl uppercase tracking-tighter dark:text-white">Desafios</h1></header>
      <div className="space-y-4">{challenges.map((c, i) => (<DuoCard key={i} className="p-6 border-b-8 flex items-center gap-6 cursor-pointer active:translate-y-1 active:border-b-4" interactive><div className="w-16 h-16 rounded-2xl flex items-center justify-center text-white shadow-md" style={{ backgroundColor: c.color }}>{c.icon}</div><div><h3 className="font-black text-lg dark:text-white leading-tight mb-1">{c.title}</h3><p className="text-xs font-bold text-[#afafaf] dark:text-zinc-400">{c.desc}</p></div></DuoCard>))}</div>
    </div>
  );
};

const FriendsListView = ({ navigate }) => (
  <div className="p-6 pt-10 animate-in h-screen flex flex-col bg-white dark:bg-[#131f24]">
    <header className="flex items-center gap-4 mb-8"><button onClick={() => navigate('profile')} className="text-[#afafaf] hover:text-[#4b4b4b] dark:hover:text-white transition-colors"><ArrowLeft size={28} strokeWidth={3} /></button><h1 className="font-black text-2xl uppercase tracking-tighter dark:text-white leading-none">Amigos</h1></header>
    <div className="flex-1 overflow-y-auto space-y-3 pb-24"><DuoCard className="flex items-center justify-between border-b-4 py-4" interactive><div className="flex items-center gap-4"><span className="w-5 font-black text-sm text-[#ffc800] text-center">1</span><div className="w-12 h-12 rounded-full bg-pink-400 flex items-center justify-center text-white font-black text-lg shadow-sm">Y</div><div><p className="font-black text-sm dark:text-white">YukiChan</p><p className="text-[10px] font-bold text-[#afafaf] dark:text-zinc-400 uppercase">12,400 XP</p></div></div><div className="flex items-center gap-1 text-[#ff9600] font-black text-xs"><Flame size={14} fill="#ff9600" /> 45</div></DuoCard></div>
  </div>
);

const ReviewSessionView = ({ navigate }) => {
  const [show, setShow] = useState(false);
  return (
    <div className="h-screen flex flex-col p-6 animate-in bg-white dark:bg-[#131f24] overflow-hidden">
      <header className="flex items-center gap-4 mb-8"><button onClick={() => navigate('home')} className="text-[#afafaf] hover:text-[#4b4b4b] dark:hover:text-white transition-colors"><XCircle size={32} /></button><ProgressBar progress={33} /></header>
      <div className="flex-1 flex flex-col items-center justify-center text-center"><DuoCard className="p-10 border-b-8 mb-12 min-w-[300px] flex flex-col items-center justify-center shadow-xl"><h2 className="text-7xl font-black mb-4 dark:text-white">食べる</h2>{show && <p className="text-[#ff4b4b] font-black text-xl animate-in fade-in">たべる</p>}</DuoCard>{show ? <div className="animate-in slide-in-from-bottom-4"><p className="text-4xl font-black text-[#4b4b4b] dark:text-white uppercase">COMER</p></div> : <p className="text-[#afafaf] dark:text-zinc-500 font-black text-sm uppercase animate-pulse text-center">Toque no card para revelar</p>}</div>
      <footer className="pt-8 mb-4"><DuoButton onClick={() => (show ? navigate('home') : setShow(true))} variant="primary" fullWidth className="h-16 text-lg">{show ? 'Continuar' : 'Ver Resposta'}</DuoButton></footer>
    </div>
  );
};

const DevPanelView = ({ navigate }) => (
  <div className="p-6 pt-10 animate-in h-screen bg-white dark:bg-[#131f24]">
     <header className="flex items-center gap-4 mb-8"><button onClick={() => navigate('home')} className="text-[#afafaf] hover:text-[#4b4b4b] dark:hover:text-white transition-colors"><ArrowLeft size={28} strokeWidth={3} /></button><h1 className="font-black text-2xl uppercase tracking-tighter text-[#a855f7]">Painel Dev</h1></header>
     <DuoCard className="border-b-4 border-[#a855f7]/30 h-40 flex items-center justify-center text-[#a855f7] font-black uppercase">Debugger Ativo</DuoCard>
  </div>
);

const ModalController = ({ type, close, onOpenDev, isDarkMode, toggleDarkMode }) => {
  const [selectedXp, setSelectedXp] = useState(20);
  const content = { 'new-deck': { title: 'Novo Baralho', desc: 'Dê um nome para o baralho.', btn: 'Criar', color: '#58cc02' }, 'settings': { title: 'Configurações', desc: 'Ajuste sua experiência.', options: true, btn: 'Ok', color: '#afafaf' }, 'goals': { title: 'Metas de Estudo', desc: 'Qual é o teu ritmo?', goals: true, btn: 'Confirmar', color: '#ff9600' }, 'add-card': { title: 'Novo Card', desc: 'Preencha os campos abaixo.', btn: 'Salvar', color: '#1cb0f6' } }[type];
  const goalOptions = [{ name: 'Casual', xp: 10, desc: '5 min / dia' }, { name: 'Regular', xp: 20, desc: '10 min / dia' }, { name: 'Sério', xp: 30, desc: '15 min / dia' }, { name: 'Insano', xp: 50, desc: '30 min / dia' }];
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-end sm:items-center justify-center p-4">
      <div className="bg-white dark:bg-[#131f24] w-full max-w-md rounded-[40px] overflow-hidden shadow-2xl animate-in slide-in-from-bottom-20 border-t-4 border-[#e5e5e5] dark:border-[#37464f] p-8 flex flex-col items-center text-center">
        <h2 className="text-2xl font-black uppercase tracking-tighter mb-2 dark:text-white leading-none">{content.title}</h2><p className="text-sm font-bold text-[#afafaf] dark:text-zinc-400 mb-8">{content.desc}</p>
        {content.options && <div className="w-full space-y-4 mb-8 text-left"><div className="flex justify-between items-center bg-[#f1f1f1] dark:bg-[#1b2c35] p-5 rounded-2xl border-2 border-[#e5e5e5] dark:border-[#37464f]"><span className="font-black text-xs uppercase text-[#4b4b4b] dark:text-white">Tema Escuro</span><button onClick={toggleDarkMode} className={`w-14 h-8 rounded-full transition-all relative border-b-2 ${isDarkMode ? 'bg-[#58cc02] border-[#46a302]' : 'bg-[#e5e5e5] dark:bg-[#37464f] border-zinc-400 dark:border-[#131f24]'}`}><div className={`absolute top-0.5 w-6 h-6 bg-white rounded-full shadow-md transition-all ${isDarkMode ? 'left-7' : 'left-0.5'}`} /></button></div><button onClick={onOpenDev} className="w-full py-3 bg-[#f3e8ff] dark:bg-[#5844ed]/20 text-[#a855f7] rounded-2xl font-black uppercase text-xs flex items-center justify-center gap-2 border-b-4 border-[#a855f7] active:scale-95 transition-all"><Code size={18} /> Painel Dev</button></div>}
        {content.goals && <div className="w-full space-y-3 mb-8">{goalOptions.map(opt => (<button key={opt.xp} onClick={() => setSelectedXp(opt.xp)} className={`w-full p-5 rounded-2xl border-2 flex justify-between items-center transition-all ${selectedXp === opt.xp ? 'border-[#ff9600] bg-[#fff4e5] dark:bg-[#ff9600]/10 shadow-sm' : 'border-[#e5e5e5] dark:border-[#37464f]'}`}><div className="text-left"><p className={`font-black uppercase text-sm ${selectedXp === opt.xp ? 'text-[#e18600]' : 'dark:text-white'}`}>{opt.name}</p><p className="text-[10px] font-bold text-[#afafaf] dark:text-zinc-400 uppercase tracking-tighter">{opt.desc}</p></div><span className="font-black text-[#ff9600]">{opt.xp} XP</span></button>))}</div>}
        <div className="grid grid-cols-2 gap-4 w-full"><DuoButton onClick={close} variant="outline">Cancelar</DuoButton><DuoButton onClick={close} style={{ backgroundColor: content.color }}>{content.btn}</DuoButton></div>
      </div>
    </div>
  );
};

// --- COMPONENTE APP PRINCIPAL ---

export default function App() {
  const [view, setView] = useState('home');
  const [modal, setModal] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [currentDeck, setCurrentDeck] = useState({ id: '1', name: 'NEGÓCIOS', cards: 50, toReview: 5, progress: 15, color: '#ff4b4b' });

  const [decks] = useState([
    { id: '1', name: 'NEGÓCIOS', cards: 50, toReview: 5, progress: 15, color: '#ff4b4b' },
    { id: '2', name: 'ADJETIVOS', cards: 32, toReview: 0, progress: 85, color: '#1cb0f6' },
    { id: '3', name: 'FRUTAS', cards: 8, toReview: 2, progress: 10, color: '#ff9600' },
  ]);

  const [user] = useState({
    name: 'Usuário_Nihon',
    nick: 'user_nihon_01',
    xp: 1240,
    gems: 250,
    hearts: 5,
    streak: 15,
    joinDate: 'Maio de 2024'
  });

  const navigate = (v, data = null) => {
    if (data) setCurrentDeck(data);
    setView(v);
    window.scrollTo(0, 0);
  };

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  return (
    <div className={`${isDarkMode ? 'dark' : ''} min-h-screen font-sans bg-white dark:bg-[#131f24] text-[#4b4b4b] dark:text-white transition-colors duration-300`}>
      <div className="max-w-md mx-auto min-h-screen flex flex-col shadow-2xl bg-white dark:bg-[#131f24] relative overflow-hidden">
        
        {view === 'login' && <LoginView navigate={navigate} />}
        {view === 'home' && <HomeView decks={decks} user={user} navigate={navigate} setModal={setModal} />}
        {view === 'deck' && <DeckDetailView deck={currentDeck} navigate={navigate} setModal={setModal} />}
        {view === 'review' && <ReviewSessionView navigate={navigate} />}
        {view === 'stats' && <StatsView />}
        {view === 'profile' && <ProfileView user={user} navigate={navigate} />}
        {view === 'edit-profile' && <EditProfileView user={user} navigate={navigate} setModal={setModal} />}
        {view === 'friends-list' && <FriendsListView navigate={navigate} />}
        {view === 'ia-generator' && <IAGeneratorView navigate={navigate} />}
        {view === 'test-select' && <TestSelectView navigate={navigate} />}
        {view === 'dev' && <DevPanelView navigate={navigate} />}

        {modal && (
          <ModalController 
            type={modal} 
            close={() => setModal(null)} 
            onOpenDev={() => { setModal(null); setView('dev'); }} 
            isDarkMode={isDarkMode} 
            toggleDarkMode={toggleDarkMode} 
          />
        )}

        {['home', 'stats', 'profile', 'dev', 'friends-list', 'ia-generator', 'test-select', 'deck', 'edit-profile'].includes(view) && (
          <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white dark:bg-[#131f24] border-t-2 border-[#e5e5e5] dark:border-[#37464f] px-6 py-3 flex justify-around items-center z-40 shadow-xl">
            <button onClick={() => navigate('home')} className={`p-3 rounded-2xl transition-all ${view === 'home' ? 'bg-[#ddf4ff] dark:bg-blue-900/20 text-[#1cb0f6] border-b-4 border-[#1cb0f6]' : 'text-[#afafaf] dark:text-zinc-500'}`}><Layers size={28} /></button>
            <button onClick={() => navigate('stats')} className={`p-3 rounded-2xl transition-all ${view === 'stats' ? 'bg-[#ddf4ff] dark:bg-blue-900/20 text-[#1cb0f6] border-b-4 border-[#1cb0f6]' : 'text-[#afafaf] dark:text-zinc-500'}`}><BarChart2 size={28} /></button>
            <button onClick={() => navigate('profile')} className={`p-3 rounded-2xl transition-all ${['profile', 'friends-list', 'edit-profile'].includes(view) ? 'bg-[#ddf4ff] dark:bg-blue-900/20 text-[#1cb0f6] border-b-4 border-[#1cb0f6]' : 'text-[#afafaf] dark:text-zinc-500'}`}><User size={28} /></button>
          </nav>
        )}
      </div>
    </div>
  );
}