import React, { useState } from 'react';
import { NAKSHATRAS } from '../constants';
import { Lock, Unlock, Star, HelpCircle, CheckCircle2, ArrowRight, LogOut, Trophy } from 'lucide-react';
import { Nakshatra } from '../types';

interface NakshatraVillageProps {
    onReward?: (amount: number) => void;
}

const NakshatraVillage: React.FC<NakshatraVillageProps> = ({ onReward }) => {
    // Game State: Levels and Selection
    const [unlockedLevel, setUnlockedLevel] = useState<number>(1);
    const [selectedStar, setSelectedStar] = useState<Nakshatra | null>(null);
    const [view, setView] = useState<'map' | 'game'>('map');

    // In-Level Game State
    const [currentTaskSolved, setCurrentTaskSolved] = useState(false);
    const [feedback, setFeedback] = useState("");

    const handleStarClick = (star: Nakshatra) => {
        if (star.id <= unlockedLevel) {
            setSelectedStar(star);
            setView('game');
            setCurrentTaskSolved(star.id < unlockedLevel); // Already solved if strictly less
            setFeedback("");
        }
    };

    const handleAnswer = (index: number) => {
        if (!selectedStar || !selectedStar.task) return;
        
        if (index === selectedStar.task.correctAnswer) {
            setFeedback("Correct! The stars align!");
            if (!currentTaskSolved) {
                setCurrentTaskSolved(true);
                // Reward logic
                if (onReward) onReward(30);
                // Unlock next level if this was the highest level
                if (selectedStar.id === unlockedLevel) {
                    setUnlockedLevel(prev => prev + 1);
                }
            }
        } else {
            setFeedback("Not quite. Consult the stars and try again!");
        }
    };

    const nextLevel = () => {
        const currentIndex = NAKSHATRAS.findIndex(n => n.id === selectedStar?.id);
        if (currentIndex !== -1 && currentIndex < NAKSHATRAS.length - 1) {
            const nextStar = NAKSHATRAS[currentIndex + 1];
            // Only can go to next if it's actually unlocked (which it should be now)
            if (nextStar.id <= unlockedLevel) {
                handleStarClick(nextStar);
            }
        } else {
            setView('map');
        }
    };

    // --- VIEW: LEVEL GAME ---
    if (view === 'game' && selectedStar) {
        return (
            <div className="h-full flex flex-col p-4 max-w-2xl mx-auto bg-[#0d1b2a] text-white">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <button 
                        onClick={() => setView('map')}
                        className="flex items-center gap-2 bg-white/10 px-3 py-2 rounded-lg text-sm font-bold hover:bg-red-500/20 hover:text-red-300 transition-colors"
                    >
                        <LogOut size={16} /> Quit Game
                    </button>
                    <div className="flex items-center gap-2 text-teal-300">
                        <span className="font-bold text-lg">Level {selectedStar.id}</span>
                        <div className="w-2 h-2 rounded-full bg-teal-500 animate-pulse"/>
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex-1 overflow-y-auto">
                    {/* Visual Hero */}
                    <div className="bg-gradient-to-b from-teal-900/40 to-black p-8 rounded-3xl border border-teal-500/30 flex flex-col items-center justify-center mb-6 relative overflow-hidden">
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30"></div>
                        <div className="w-24 h-24 rounded-full bg-teal-500 flex items-center justify-center text-4xl shadow-[0_0_50px_rgba(20,184,166,0.5)] z-10 animate-float">
                            ✨
                        </div>
                        <h2 className="text-3xl font-bold mt-4 z-10">{selectedStar.name}</h2>
                        <p className="text-teal-200 italic z-10">{selectedStar.meaning}</p>
                    </div>

                    {/* Info Cards */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
                            <span className="text-xs text-gray-400 uppercase tracking-widest">Guardian Deity</span>
                            <div className="text-xl font-bold text-yellow-200">{selectedStar.deity}</div>
                        </div>
                        <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
                            <span className="text-xs text-gray-400 uppercase tracking-widest">Animal Symbol</span>
                            <div className="text-xl font-bold text-green-200">{selectedStar.animal}</div>
                        </div>
                        <div className="col-span-2 bg-white/5 p-4 rounded-2xl border border-white/10 flex items-center gap-4">
                            <div className="bg-purple-500/20 p-2 rounded-full">
                                <Star size={20} className="text-purple-300" />
                            </div>
                            <div>
                                <span className="text-xs text-gray-400 uppercase tracking-widest">Symbol</span>
                                <div className="text-lg font-bold text-white">{selectedStar.symbol}</div>
                            </div>
                        </div>
                    </div>

                    {/* Challenge Section */}
                    {selectedStar.task && (
                        <div className="bg-indigo-900/30 p-6 rounded-3xl border border-indigo-500/30 animate-in slide-in-from-bottom-4">
                            <h3 className="flex items-center gap-2 font-bold text-indigo-300 mb-4">
                                <HelpCircle size={20} /> Star Challenge
                            </h3>
                            <p className="text-lg font-medium mb-4">{selectedStar.task.question}</p>
                            
                            {!currentTaskSolved ? (
                                <div className="space-y-3">
                                    {selectedStar.task.options.map((opt, i) => (
                                        <button
                                            key={i}
                                            onClick={() => handleAnswer(i)}
                                            className="w-full text-left p-3 rounded-xl bg-white/5 hover:bg-indigo-500/20 border border-white/10 hover:border-indigo-400 transition-all font-semibold"
                                        >
                                            {opt}
                                        </button>
                                    ))}
                                    {feedback && (
                                        <p className="text-center text-red-300 mt-2 font-bold animate-pulse">{feedback}</p>
                                    )}
                                </div>
                            ) : (
                                <div className="text-center">
                                    <div className="inline-flex items-center justify-center p-3 bg-green-500/20 rounded-full mb-3">
                                        <CheckCircle2 size={32} className="text-green-400" />
                                    </div>
                                    <h4 className="text-xl font-bold text-green-300 mb-1">Level Complete!</h4>
                                    <p className="text-sm text-gray-400 mb-4">{feedback}</p>
                                    <button 
                                        onClick={nextLevel}
                                        className="w-full py-3 bg-gradient-to-r from-teal-500 to-emerald-600 rounded-xl font-bold text-white shadow-lg flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform"
                                    >
                                        Next Star <ArrowRight size={18} />
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        );
    }

    // --- VIEW: VILLAGE MAP ---
    return (
        <div className="p-6 max-w-4xl mx-auto h-full flex flex-col">
             <div className="text-center mb-6">
                 <h2 className="text-3xl font-bold text-teal-200 mb-2">Nakshatra Village</h2>
                 <p className="text-gray-400 text-sm">Travel the path of 27 Stars. Unlock secrets!</p>
                 <div className="flex justify-center mt-2">
                     <span className="bg-teal-900/50 text-teal-300 px-3 py-1 rounded-full text-xs font-bold border border-teal-500/30 flex items-center gap-1">
                         <Trophy size={12} /> Progress: {unlockedLevel - 1} / {NAKSHATRAS.length} Unlocked
                     </span>
                 </div>
             </div>

             <div className="flex-1 overflow-y-auto pb-20 scrollbar-hide">
                 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                     {NAKSHATRAS.map((star, index) => {
                         const isUnlocked = star.id <= unlockedLevel;
                         const isCompleted = star.id < unlockedLevel;

                         return (
                             <button
                                key={star.id}
                                disabled={!isUnlocked}
                                onClick={() => handleStarClick(star)}
                                className={`relative p-4 rounded-2xl border-2 transition-all duration-300 flex items-center gap-4 text-left group
                                    ${isUnlocked 
                                        ? 'bg-gradient-to-br from-teal-900/40 to-black border-teal-500/30 hover:border-teal-400 hover:shadow-[0_0_20px_rgba(20,184,166,0.3)] cursor-pointer' 
                                        : 'bg-black/40 border-gray-800 opacity-60 cursor-not-allowed grayscale'}
                                `}
                             >
                                 {/* Icon Circle */}
                                 <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 font-bold text-lg shadow-inner
                                     ${isUnlocked ? 'bg-teal-500 text-black' : 'bg-gray-800 text-gray-500'}
                                 `}>
                                     {isCompleted ? <CheckCircle2 size={24} /> : star.id}
                                 </div>

                                 <div className="flex-1">
                                     <h3 className={`font-bold text-lg ${isUnlocked ? 'text-white' : 'text-gray-500'}`}>
                                         {star.name}
                                     </h3>
                                     <p className="text-[10px] text-gray-400 uppercase tracking-wider">
                                         {isUnlocked ? star.meaning : 'Locked'}
                                     </p>
                                 </div>

                                 <div className="absolute top-4 right-4">
                                     {isUnlocked ? (
                                         <Unlock size={16} className="text-teal-500 opacity-50 group-hover:opacity-100" />
                                     ) : (
                                         <Lock size={16} className="text-gray-600" />
                                     )}
                                 </div>
                             </button>
                         );
                     })}
                     
                     {/* Placeholder for missing stars visualization */}
                     <div className="col-span-full text-center py-8 opacity-30">
                         <div className="w-1 bg-gradient-to-b from-teal-500/50 to-transparent h-16 mx-auto rounded-full"></div>
                         <p className="text-xs mt-2">More stars appearing soon...</p>
                     </div>
                 </div>
             </div>
        </div>
    );
};

export default NakshatraVillage;