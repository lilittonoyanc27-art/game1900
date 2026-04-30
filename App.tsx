import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Music, 
  RotateCcw, 
  ChevronRight, 
  Play, 
  Trophy,
  CheckCircle2,
  XCircle,
  Info,
  Mic2,
  Volume2,
  Eye,
  Glasses,
  Waves,
  Music2,
  Headphones,
  Guitar
} from 'lucide-react';
import { 
  SENSES_QUESTIONS, 
  PLAYER_CONFIG, 
  MUSIC_ASSETS,
  MusicQuestion 
} from './constants';

type GameState = 'start' | 'playing' | 'end';

export default function App() {
  const [gameState, setGameState] = useState<GameState>('start');
  const [activePlayer, setActivePlayer] = useState<'Gor' | 'Gayane'>('Gor');
  const [gorNotes, setGorNotes] = useState(0);
  const [gayaneNotes, setGayaneNotes] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [showGuitarSolo, setShowGuitarSolo] = useState(false);

  const totalToWin = 7;

  const shuffledQuestions = useMemo(() => {
    return [...SENSES_QUESTIONS].sort(() => Math.random() - 0.5);
  }, [gameState === 'playing' && currentIndex === 0]);

  const currentQuestion = shuffledQuestions[currentIndex];

  const handleAnswer = (idx: number) => {
    if (feedback) return;

    const isCorrect = idx === currentQuestion.correctIndex;
    
    if (isCorrect) {
      if (activePlayer === 'Gor') {
        setGorNotes(n => n + 1);
      } else {
        setGayaneNotes(n => n + 1);
      }
      setFeedback('correct');
    } else {
      setFeedback('incorrect');
    }
    setShowExplanation(true);
  };

  const nextTurn = () => {
    // Check win condition
    if (gorNotes >= totalToWin || gayaneNotes >= totalToWin) {
      setGameState('end');
      return;
    }

    setFeedback(null);
    setShowExplanation(false);
    setActivePlayer(prev => prev === 'Gor' ? 'Gayane' : 'Gor');
    
    if (currentIndex < shuffledQuestions.length - 1) {
      setCurrentIndex(i => i + 1);
    } else {
      setGameState('end');
    }
  };

  const restart = () => {
    setGameState('start');
    setCurrentIndex(0);
    setGorNotes(0);
    setGayaneNotes(0);
    setActivePlayer('Gor');
    setFeedback(null);
    setShowExplanation(false);
    setShowGuitarSolo(false);
  };

  const winner = gorNotes >= totalToWin ? 'Gor' : gayaneNotes >= totalToWin ? 'Gayane' : (gorNotes > gayaneNotes ? 'Gor' : 'Gayane');

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-white font-sans selection:bg-yellow-500/30 relative">
      {/* Musical Background */}
      <div className="absolute inset-0 z-0">
        <img 
          src={MUSIC_ASSETS.bg} 
          className="w-full h-full object-cover opacity-10 grayscale" 
          alt="Music Studio" 
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0a0a0c]/80 to-[#0a0a0c]" />
      </div>

      <AnimatePresence mode="wait">
        {/* --- START SCREEN --- */}
        {gameState === 'start' && (
          <motion.div 
            key="start"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="relative z-10 min-h-screen flex flex-col items-center justify-center p-6 text-center"
          >
             <div className="flex gap-12 md:gap-24 mb-16 items-center">
                <motion.div 
                  animate={{ y: [0, -15, 0], rotate: [0, -5, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="relative"
                >
                   <img src={PLAYER_CONFIG.GOR.avatar} className="w-24 h-24 md:w-44 md:h-44 rounded-full border-4 border-blue-500 object-cover shadow-[0_0_50px_rgba(59,130,246,0.2)]" referrerPolicy="no-referrer" />
                   <div className="absolute -bottom-4 inset-x-0 bg-blue-600 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">Գոռ</div>
                </motion.div>

                <div className="relative">
                   <Guitar className="w-16 h-16 md:w-24 md:h-24 text-yellow-500 animate-pulse" />
                   <div className="absolute -top-4 -right-4">
                      <Music2 className="w-8 h-8 text-white opacity-20 animate-bounce" />
                   </div>
                </div>

                <motion.div 
                   animate={{ y: [0, 15, 0], rotate: [0, 5, 0] }}
                   transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                   className="relative"
                >
                   <img src={PLAYER_CONFIG.GAYANE.avatar} className="w-24 h-24 md:w-44 md:h-44 rounded-full border-4 border-pink-500 object-cover shadow-[0_0_50px_rgba(236,72,153,0.2)]" referrerPolicy="no-referrer" />
                   <div className="absolute -bottom-4 inset-x-0 bg-pink-600 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">Գայանե</div>
                </motion.div>
             </div>

             <h1 className="text-6xl md:text-[8rem] font-black mb-8 tracking-tighter uppercase italic leading-none border-y-4 border-white/5 py-4">
                ԵՐԱԺՇՏԱԿԱՆ <br/> <span className="text-yellow-500">ՄՐՑՈՒՅԹ</span>
             </h1>

             <p className="max-w-xl text-lg md:text-2xl text-white/40 mb-12 font-medium">
                Տիրապետիր <span className="text-white">Oír, Escuchar, Ver, Mirar</span> բայերին: <br/> Ճիշտ պատասխանիր, հավաքիր նոտաներ և հաղթիր:
             </p>

             <button 
               onClick={() => setGameState('playing')}
               className="group relative px-20 py-10 bg-yellow-500 text-black rounded-3xl font-black text-3xl hover:bg-white hover:scale-105 transition-all shadow-2xl flex items-center gap-8 uppercase italic tracking-tighter"
             >
               ՍԿՍԵԼ ՆՎԱԳԵԼ <Volume2 className="w-10 h-10 group-hover:scale-125 transition-transform" />
             </button>
          </motion.div>
        )}

        {/* --- GAMEPLAY --- */}
        {gameState === 'playing' && (
          <motion.div 
             key="playing"
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             className="relative z-10 min-h-screen flex flex-col p-4 md:p-12"
          >
             {/* Music Sheet HUD */}
             <div className="max-w-6xl w-full mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 mb-8">
                {/* Gor Stave */}
                <div className={`p-6 rounded-[2.5rem] bg-white/5 border-2 transition-all duration-500 overflow-hidden relative ${activePlayer === 'Gor' ? 'border-blue-500 scale-105 bg-blue-500/5' : 'border-white/5 opacity-50'}`}>
                   <div className="flex items-center gap-4 mb-6">
                      <img src={PLAYER_CONFIG.GOR.avatar} className="w-12 h-12 rounded-full border-2 border-blue-500" />
                      <div>
                         <div className="text-[10px] font-black uppercase text-blue-400">Գոռի Մեղեդին</div>
                         <div className="text-xl font-black italic">{gorNotes} / {totalToWin} Նոտա</div>
                      </div>
                   </div>
                   {/* Visual Stave */}
                   <div className="h-16 md:h-20 flex items-center gap-2 md:gap-4 border-y border-white/10 relative">
                      {[...Array(totalToWin)].map((_, i) => (
                         <motion.div 
                           key={i}
                           initial={{ scale: 0 }}
                           animate={{ scale: i < gorNotes ? 1 : 0.2 }}
                           className={`w-7 h-7 md:w-10 md:h-10 ${i < gorNotes ? 'opacity-100' : 'opacity-20'}`}
                         >
                            <img src={MUSIC_ASSETS.note} className="w-full h-full contrast-150 brightness-200" />
                         </motion.div>
                      ))}
                      {/* Animated Line */}
                      {activePlayer === 'Gor' && <motion.div animate={{ x: [0, 400, 0] }} transition={{ duration: 3, repeat: Infinity }} className="absolute inset-y-0 w-1 bg-blue-500/30 blur-sm" />}
                   </div>
                </div>

                {/* Gayane Stave */}
                <div className={`p-6 rounded-[2.5rem] bg-white/5 border-2 transition-all duration-500 overflow-hidden relative ${activePlayer === 'Gayane' ? 'border-pink-500 scale-105 bg-pink-500/5' : 'border-white/5 opacity-50'}`}>
                   <div className="flex items-center gap-4 mb-6">
                      <img src={PLAYER_CONFIG.GAYANE.avatar} className="w-12 h-12 rounded-full border-2 border-pink-500" />
                      <div>
                         <div className="text-[10px] font-black uppercase text-pink-400">Գայանեի Մեղեդին</div>
                         <div className="text-xl font-black italic">{gayaneNotes} / {totalToWin} Նոտա</div>
                      </div>
                   </div>
                   {/* Visual Stave */}
                   <div className="h-16 md:h-20 flex items-center gap-2 md:gap-4 border-y border-white/10 relative">
                      {[...Array(totalToWin)].map((_, i) => (
                         <motion.div 
                           key={i}
                           initial={{ scale: 0 }}
                           animate={{ scale: i < gayaneNotes ? 1 : 0.2 }}
                           className={`w-7 h-7 md:w-10 md:h-10 ${i < gayaneNotes ? 'opacity-100' : 'opacity-20'}`}
                         >
                            <img src={MUSIC_ASSETS.note} className="w-full h-full contrast-150 brightness-200" />
                         </motion.div>
                      ))}
                      {/* Animated Line */}
                      {activePlayer === 'Gayane' && <motion.div animate={{ x: [0, 400, 0] }} transition={{ duration: 3, repeat: Infinity }} className="absolute inset-y-0 w-1 bg-pink-500/30 blur-sm" />}
                   </div>
                </div>
             </div>

             {/* Main Question Area */}
             <div className="flex-1 flex flex-col items-center justify-center p-4">
                <motion.div 
                   key={currentIndex}
                   initial={{ opacity: 0, scale: 1.1 }}
                   animate={{ opacity: 1, scale: 1 }}
                   className="w-full max-w-4xl"
                >
                   <div className="bg-white/5 backdrop-blur-2xl p-8 md:p-16 rounded-[4rem] border border-white/10 shadow-3xl text-center relative overflow-hidden">
                      <div className="absolute top-0 right-0 p-8 opacity-10">
                         {currentQuestion.sentence.includes('oigo') || currentQuestion.sentence.includes('escucho') ? <Volume2 size={100} /> : <Eye size={100} />}
                      </div>

                      <div className="inline-flex items-center gap-4 mb-8 bg-yellow-500/10 px-6 py-2 rounded-full border border-yellow-500/20 text-yellow-500">
                         <div className="flex gap-1">
                            <i className="w-1.5 h-6 bg-yellow-500 animate-[waves_1s_infinite]" />
                            <i className="w-1.5 h-6 bg-yellow-500 animate-[waves_0.7s_infinite]" />
                            <i className="w-1.5 h-6 bg-yellow-500 animate-[waves_1.2s_infinite]" />
                         </div>
                         <span className="font-black uppercase text-[10px] tracking-widest italic">{currentIndex + 1} / {shuffledQuestions.length} Հարց</span>
                      </div>

                      <h2 className="text-3xl md:text-6xl font-black italic tracking-tighter leading-tight mb-8">
                         "{currentQuestion.sentence}"
                      </h2>

                      <p className="text-white/40 font-bold text-lg md:text-2xl mb-12 uppercase italic tracking-tighter">
                         {currentQuestion.translation}
                      </p>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                         {currentQuestion.options.map((option, idx) => (
                           <button
                             key={idx}
                             disabled={!!feedback}
                             onClick={() => handleAnswer(idx)}
                             className={`group relative py-6 px-4 rounded-2xl font-black text-xl md:text-3xl transition-all border-b-8 transform active:scale-95 ${
                                feedback === null 
                                ? 'bg-white/5 border-b-black hover:border-yellow-500 hover:bg-white/10 text-white/60'
                                : idx === currentQuestion.correctIndex 
                                   ? 'bg-yellow-500 border-b-yellow-700 text-black scale-105 shadow-2xl'
                                   : 'bg-red-500/10 border-b-red-900 text-red-500 opacity-40'
                             }`}
                           >
                              {option}
                           </button>
                         ))}
                      </div>

                      <AnimatePresence>
                         {showExplanation && (
                           <motion.div 
                             initial={{ opacity: 0, y: 20 }}
                             animate={{ opacity: 1, y: 0 }}
                             className="mt-12 bg-white/5 border border-white/10 p-8 rounded-[3rem] text-left"
                           >
                              <div className="flex items-center gap-6 mb-4">
                                 {feedback === 'correct' ? (
                                    <div className="p-4 bg-green-500/20 rounded-full"><CheckCircle2 className="w-8 h-8 text-green-500" /></div>
                                 ) : (
                                    <div className="p-4 bg-red-500/20 rounded-full"><XCircle className="w-8 h-8 text-red-500" /></div>
                                 )}
                                 <div>
                                    <h3 className="font-black text-2xl uppercase italic leading-none">{feedback === 'correct' ? 'ՃԻՇՏ Է!' : 'ՍԽԱԼ Է!'}</h3>
                                    <p className="text-white/40 font-bold text-sm tracking-widest uppercase mt-1">Բացատրություն</p>
                                 </div>
                              </div>
                              <p className="text-white/80 text-xl font-medium mb-10 italic leading-relaxed">
                                 {currentQuestion.explanation}
                              </p>
                              <button 
                                onClick={nextTurn}
                                className="w-full py-6 bg-white text-black rounded-2xl font-black text-2xl hover:bg-yellow-500 transition-all flex items-center justify-center gap-4 italic uppercase tracking-tighter"
                              >
                                 ՀԱՋՈՐԴԸ <ChevronRight className="w-8 h-8" />
                              </button>
                           </motion.div>
                         )}
                      </AnimatePresence>
                   </div>
                </motion.div>
             </div>
          </motion.div>
        )}

        {/* --- END SCREEN --- */}
        {gameState === 'end' && (
          <motion.div 
            key="end"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="relative z-10 min-h-screen flex flex-col items-center justify-center p-6 text-center"
          >
             <div className="max-w-4xl w-full bg-[#111116] border-4 border-white/5 rounded-[6rem] p-12 md:p-24 shadow-2xl relative overflow-hidden">
                <Trophy className="w-32 h-32 mx-auto mb-12 text-yellow-500 animate-bounce" />
                
                <h2 className="text-6xl md:text-9xl font-black mb-8 tracking-tighter uppercase italic leading-none text-white">
                   ՄԵՂԵԴԻՆ <br/> <span className="text-yellow-500 italic">ՎԵՐՋԱՑԱՎ</span>
                </h2>

                <div className="flex flex-col items-center mb-16">
                   <div className="relative mb-10 group">
                      <img 
                        src={winner === 'Gor' ? PLAYER_CONFIG.GOR.avatar : PLAYER_CONFIG.GAYANE.avatar} 
                        className={`w-48 h-48 md:w-64 md:h-64 rounded-full object-cover border-8 shadow-2xl transition-all duration-700 ${winner === 'Gor' ? 'border-blue-500' : 'border-pink-500'} ${showGuitarSolo ? 'scale-110 rotate-3' : ''}`} 
                        referrerPolicy="no-referrer"
                      />
                      <AnimatePresence>
                        {showGuitarSolo && (
                           <>
                              <motion.div 
                                initial={{ scale: 0, rotate: -45 }}
                                animate={{ scale: 1, rotate: 0 }}
                                className="absolute -top-10 -right-10 bg-yellow-500 p-6 rounded-full shadow-2xl"
                              >
                                 <Guitar className="w-16 h-16 text-black" />
                              </motion.div>
                              <motion.div 
                                animate={{ scale: [1, 2], opacity: [0.5, 0] }}
                                transition={{ repeat: Infinity, duration: 1 }}
                                className="absolute inset-0 rounded-full border-4 border-yellow-500" 
                              />
                           </>
                        )}
                      </AnimatePresence>
                   </div>
                   <h3 className={`text-5xl md:text-8xl font-black italic uppercase tracking-tighter ${winner === 'Gor' ? 'text-blue-500' : 'text-pink-500'}`}>
                      {winner === 'Gor' ? 'ԳՈՌԸ ՀԱՂԹԵՑ!' : 'ԳԱՅԱՆԵՆ ՀԱՂԹԵՑ!'}
                   </h3>
                   <div className="mt-8 flex gap-8">
                      <div className="bg-blue-500/10 px-6 py-2 rounded-xl text-blue-400 font-black italic border border-blue-500/20">Գոռ: {gorNotes} Նոտա</div>
                      <div className="bg-pink-500/10 px-6 py-2 rounded-xl text-pink-400 font-black italic border border-pink-500/20">Գայանե: {gayaneNotes} Նոտա</div>
                   </div>
                </div>

                {!showGuitarSolo ? (
                  <button 
                    onClick={() => setShowGuitarSolo(true)}
                    className="w-full py-10 bg-yellow-500 text-black rounded-[3rem] font-black text-3xl md:text-4xl hover:bg-white transition-all shadow-xl flex items-center justify-center gap-8 uppercase italic group mb-6 px-8"
                  >
                    <Play className="w-12 h-12 fill-black" /> ԼՍԵԼ ՀԱՂԹԱԿԱՆ ՄԵՂԵԴԻՆ
                  </button>
                ) : (
                  <div className="mb-12 space-y-6">
                     <p className="text-yellow-500 font-black italic text-2xl uppercase animate-pulse">🎸 ՀԱՂԹԱԿԱՆ ՄԵՂԵԴԻ 🎸</p>
                     
                     <div className="w-full bg-white/5 p-8 rounded-3xl border-2 border-yellow-500 shadow-2xl flex flex-col items-center">
                        <audio 
                          controls 
                          autoPlay 
                          className="w-full max-w-md"
                        >
                          <source src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3" type="audio/mpeg" />
                          Ձեր բրաուզերը չի աջակցում աուդիո նվագարկիչը:
                        </audio>
                        <p className="mt-4 text-white/40 text-sm italic">Աուդիո նվագարկումը միացված է</p>
                     </div>

                     <div className="flex justify-center gap-2">
                        {[...Array(20)].map((_, i) => (
                           <motion.div 
                             key={i}
                             animate={{ height: [10, Math.random() * 60 + 20, 10] }}
                             transition={{ repeat: Infinity, duration: 0.5 + Math.random() }}
                             className="w-1 bg-yellow-500"
                           />
                        ))}
                     </div>
                  </div>
                )}

                <button 
                  onClick={restart}
                  className="w-full py-8 bg-white/5 text-white/40 rounded-[3rem] font-black text-2xl border border-white/5 hover:bg-white/10 hover:text-white transition-all flex items-center justify-center gap-6 uppercase italic tracking-widest"
                >
                  <RotateCcw className="w-10 h-10" /> ՍԿՍԵԼ ՆՈՐ ՄՐՑՈՒՅԹ
                </button>
             </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes waves {
          0%, 100% { height: 10px; }
          50% { height: 24px; }
        }
      `}} />
    </div>
  );
}
