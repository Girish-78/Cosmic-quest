import React, { useState, useEffect } from 'react';
import { ZODIAC_SIGNS, ELEMENT_COLORS } from '../constants';
import { ZodiacSign, StarCoordinate } from '../types';
import { Flame, Droplets, Wind, Mountain, X, Telescope, BookOpen, Gamepad2, CheckCircle2, Award, Star } from 'lucide-react';

interface ZodiacExplorerProps {
    onReward?: (amount: number) => void;
}

const ZodiacExplorer: React.FC<ZodiacExplorerProps> = ({ onReward }) => {
  const [selectedSign, setSelectedSign] = useState<ZodiacSign | null>(null);

  const getElementIcon = (el: string) => {
      switch(el) {
          case 'Fire': return <Flame size={14} />;
          case 'Water': return <Droplets size={14} />;
          case 'Air': return <Wind size={14} />;
          case 'Earth': return <Mountain size={14} />;
          default: return null;
      }
  };

  return (
    <div className="p-4 md:p-6 max-w-5xl mx-auto pb-20">
        <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-center text-purple-200">The 12 Zodiac Realms</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
            {ZODIAC_SIGNS.map((sign) => (
                <button
                    key={sign.id}
                    onClick={() => setSelectedSign(sign)}
                    className={`relative overflow-hidden rounded-2xl p-4 h-36 md:h-40 flex flex-col items-center justify-center gap-2 bg-gradient-to-br ${ELEMENT_COLORS[sign.element]} hover:scale-105 transition-transform shadow-lg group`}
                >
                    <div className="text-4xl group-hover:scale-125 transition-transform duration-500">{sign.symbol}</div>
                    <div className="text-base md:text-lg font-bold text-white shadow-black drop-shadow-sm">{sign.name}</div>
                    <div className="text-[10px] md:text-xs text-white/80 italic">{sign.sanskritName}</div>
                    <div className="absolute bottom-2 right-2 bg-black/20 p-1 rounded-full text-white">
                        {getElementIcon(sign.element)}
                    </div>
                </button>
            ))}
        </div>

        {/* Modal Detail View */}
        {selectedSign && (
            <ZodiacDetailModal 
                sign={selectedSign} 
                onClose={() => setSelectedSign(null)} 
                onReward={onReward}
            />
        )}
    </div>
  );
};

// --- Subcomponents for Detail Modal ---

interface ModalProps {
    sign: ZodiacSign;
    onClose: () => void;
    onReward?: (amount: number) => void;
}

const ZodiacDetailModal: React.FC<ModalProps> = ({ sign, onClose, onReward }) => {
    const [activeTab, setActiveTab] = useState<'story' | 'astronomy' | 'play'>('story');

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
            <div className={`relative w-full max-w-2xl bg-gradient-to-br ${ELEMENT_COLORS[sign.element]} rounded-3xl p-1 shadow-2xl h-[85vh] md:h-auto flex flex-col`}>
                <div className="bg-[#1a1a2e] rounded-[22px] p-0 h-full overflow-hidden flex flex-col relative">
                    
                    {/* Header */}
                    <div className={`p-4 md:p-6 bg-gradient-to-r ${ELEMENT_COLORS[sign.element]} relative shrink-0`}>
                         <button 
                            onClick={onClose}
                            className="absolute top-4 right-4 bg-black/20 hover:bg-black/40 text-white rounded-full p-2 backdrop-blur-sm"
                        >
                            <X size={20} />
                        </button>
                        <div className="flex items-center gap-4">
                            <div className="text-4xl md:text-6xl bg-white/20 w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center shadow-inner">
                                {sign.symbol}
                            </div>
                            <div>
                                <h2 className="text-2xl md:text-3xl font-bold text-white">{sign.name}</h2>
                                <p className="text-white/80 italic text-sm">{sign.sanskritName}</p>
                            </div>
                        </div>
                    </div>

                    {/* Tabs */}
                    <div className="flex bg-black/20 border-b border-white/5 shrink-0">
                        <TabButton label="Story" icon={BookOpen} isActive={activeTab === 'story'} onClick={() => setActiveTab('story')} />
                        <TabButton label="Astronomy" icon={Telescope} isActive={activeTab === 'astronomy'} onClick={() => setActiveTab('astronomy')} />
                        <TabButton label="Games" icon={Gamepad2} isActive={activeTab === 'play'} onClick={() => setActiveTab('play')} />
                    </div>

                    {/* Content Area */}
                    <div className="p-4 md:p-6 flex-1 overflow-y-auto">
                        {activeTab === 'story' && <StoryTab sign={sign} />}
                        {activeTab === 'astronomy' && <AstronomyTab sign={sign} />}
                        {activeTab === 'play' && <PlayTab sign={sign} onReward={onReward} />}
                    </div>
                </div>
            </div>
        </div>
    );
};

const TabButton = ({ label, icon: Icon, isActive, onClick }: any) => (
    <button 
        onClick={onClick}
        className={`flex-1 py-3 flex items-center justify-center gap-2 text-sm font-bold transition-colors ${isActive ? 'bg-white/10 text-white' : 'text-gray-400 hover:bg-white/5'}`}
    >
        <Icon size={16} /> {label}
    </button>
);

const StoryTab = ({ sign }: { sign: ZodiacSign }) => (
    <div className="space-y-6">
        <p className="text-base md:text-lg leading-relaxed text-gray-200">{sign.description}</p>
        
        <div className="bg-white/5 p-4 rounded-xl border border-white/10">
            <h3 className="font-bold text-purple-300 mb-2 uppercase text-xs tracking-wider">Guardian</h3>
            <div className="flex items-center gap-3">
                <div className="bg-purple-500/20 p-2 rounded-full text-2xl">🦁</div>
                <span className="text-lg md:text-xl font-bold">{sign.guardian}</span>
            </div>
        </div>

        <div>
            <h3 className="font-bold text-gray-400 mb-2 uppercase text-xs tracking-wider">Traits</h3>
            <div className="flex flex-wrap gap-2">
                {sign.traits.map(t => (
                    <span key={t} className="px-3 py-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg text-sm font-bold shadow-sm">
                        {t}
                    </span>
                ))}
            </div>
        </div>
    </div>
);

const AstronomyTab = ({ sign }: { sign: ZodiacSign }) => (
    <div className="space-y-4 md:space-y-6">
         <div className="bg-blue-900/20 p-4 rounded-2xl border border-blue-500/20 text-center">
             <div className="w-full max-w-[200px] h-32 mx-auto bg-black rounded-lg border border-white/10 relative mb-4 overflow-hidden">
                {/* Simulated Constellation View */}
                {sign.constellationStars.map((star, i) => (
                    <React.Fragment key={star.id}>
                        <div 
                            className="absolute w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_4px_white]"
                            style={{ left: `${star.x}%`, top: `${star.y}%` }}
                        />
                         {i < sign.constellationStars.length - 1 && (
                            <svg className="absolute top-0 left-0 w-full h-full pointer-events-none">
                                <line 
                                    x1={`${sign.constellationStars[i].x}%`} 
                                    y1={`${sign.constellationStars[i].y}%`}
                                    x2={`${sign.constellationStars[i+1].x}%`} 
                                    y2={`${sign.constellationStars[i+1].y}%`}
                                    stroke="rgba(255,255,255,0.3)" 
                                    strokeWidth="1"
                                />
                            </svg>
                        )}
                    </React.Fragment>
                ))}
             </div>
             <p className="text-xs text-blue-300">Constellation Pattern</p>
         </div>

         <div className="grid grid-cols-2 gap-4">
             <div className="bg-white/5 p-4 rounded-xl">
                 <h4 className="text-xs text-gray-400 mb-1">Brightest Star</h4>
                 <div className="text-sm md:text-lg font-bold text-yellow-300 flex items-center gap-2">
                     <Star size={16} fill="currentColor" className="shrink-0" /> <span className="truncate">{sign.brightestStar}</span>
                 </div>
             </div>
             <div className="bg-white/5 p-4 rounded-xl">
                 <h4 className="text-xs text-gray-400 mb-1">Best Season</h4>
                 <div className="text-sm md:text-lg font-bold text-green-300">
                      {sign.bestViewingSeason}
                 </div>
             </div>
         </div>

         <div className="bg-indigo-900/30 p-4 rounded-xl border-l-4 border-indigo-500">
             <h4 className="font-bold text-indigo-300 mb-1 flex items-center gap-2 text-sm">
                 <Telescope size={14} /> Sky Fact
             </h4>
             <p className="text-sm italic text-gray-300">"{sign.astronomyFact}"</p>
         </div>
    </div>
);

// --- Game Logic ---

const PlayTab = ({ sign, onReward }: { sign: ZodiacSign; onReward?: (n:number) => void }) => {
    const [game, setGame] = useState<'none' | 'connect' | 'quiz'>('none');

    if (game === 'none') {
        return (
            <div className="space-y-4">
                 <button 
                    onClick={() => setGame('connect')}
                    className="w-full p-4 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl shadow-lg flex items-center gap-4 hover:scale-[1.02] transition-transform"
                 >
                     <div className="bg-white/20 p-3 rounded-full shrink-0">
                         <Star size={24} className="text-yellow-300 fill-yellow-300" />
                     </div>
                     <div className="text-left">
                         <h3 className="font-bold text-lg">Constellation Connect</h3>
                         <p className="text-sm text-blue-200">Draw the stars in the sky!</p>
                     </div>
                 </button>

                 <button 
                    onClick={() => setGame('quiz')}
                    className="w-full p-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl shadow-lg flex items-center gap-4 hover:scale-[1.02] transition-transform"
                 >
                     <div className="bg-white/20 p-3 rounded-full shrink-0">
                         <Award size={24} className="text-white" />
                     </div>
                     <div className="text-left">
                         <h3 className="font-bold text-lg">Cosmic Trivia</h3>
                         <p className="text-sm text-purple-200">Test your knowledge!</p>
                     </div>
                 </button>
            </div>
        );
    }

    return (
        <div className="h-full flex flex-col">
            <button 
                onClick={() => setGame('none')} 
                className="self-start text-sm text-gray-400 hover:text-white mb-4 flex items-center gap-1"
            >
                ← Back to Games
            </button>
            
            {game === 'connect' && <ConstellationGame sign={sign} onReward={onReward} />}
            {game === 'quiz' && <TriviaGame sign={sign} onReward={onReward} />}
        </div>
    );
};

const ConstellationGame = ({ sign, onReward }: { sign: ZodiacSign, onReward?: (n:number)=>void }) => {
    const [connectedCount, setConnectedCount] = useState(0); // 0 means just started
    const [completed, setCompleted] = useState(false);

    const handleStarClick = (index: number) => {
        if (index === connectedCount) {
            const next = connectedCount + 1;
            setConnectedCount(next);
            if (next === sign.constellationStars.length) {
                setCompleted(true);
                if (onReward) onReward(20);
            }
        }
    };

    return (
        <div className="flex-1 flex flex-col items-center justify-start pt-4">
            <div className="text-center mb-6">
                <h3 className="font-bold text-xl">Connect the Stars</h3>
                <p className="text-xs text-gray-400">Tap the pulsing star to draw the shape!</p>
            </div>

            <div className="relative w-full max-w-[280px] aspect-square bg-black rounded-2xl border-2 border-indigo-500/30 shadow-[0_0_30px_rgba(79,70,229,0.2)]">
                <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
                    {/* Draw lines for connected stars */}
                    {sign.constellationStars.map((star, i) => {
                        if (i >= connectedCount && !completed) return null;
                        if (i === sign.constellationStars.length - 1) return null; // No line from last star
                        
                        // If we completed connection i to i+1
                        const nextStar = sign.constellationStars[i+1];
                        return (
                            <line 
                                key={i}
                                x1={`${star.x}%`} 
                                y1={`${star.y}%`}
                                x2={`${nextStar.x}%`} 
                                y2={`${nextStar.y}%`}
                                stroke="#FDB813" 
                                strokeWidth="2"
                                className="animate-draw"
                            />
                        );
                    })}
                </svg>

                {sign.constellationStars.map((star, i) => {
                    const isNext = i === connectedCount && !completed;
                    const isDone = i < connectedCount || completed;

                    return (
                        <button
                            key={star.id}
                            onClick={() => handleStarClick(i)}
                            disabled={completed || (!isNext && !isDone)}
                            className={`absolute w-8 h-8 -ml-4 -mt-4 rounded-full flex items-center justify-center transition-all duration-300 z-20 
                                ${isDone ? 'bg-yellow-400 scale-75' : 'bg-gray-700'}
                                ${isNext ? 'animate-ping bg-blue-500 ring-4 ring-blue-500/30' : ''}
                            `}
                            style={{ left: `${star.x}%`, top: `${star.y}%` }}
                        >
                            {isDone && <Star size={12} className="text-black fill-black" />}
                        </button>
                    );
                })}
                
                {completed && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/60 z-30 animate-fade-in rounded-2xl">
                         <div className="text-center">
                             <CheckCircle2 size={48} className="text-green-400 mx-auto mb-2" />
                             <h4 className="text-xl font-bold text-white">Constellation Complete!</h4>
                             <p className="text-yellow-300 font-bold">+20 Shards</p>
                         </div>
                    </div>
                )}
            </div>
        </div>
    );
};

const TriviaGame = ({ sign, onReward }: { sign: ZodiacSign, onReward?: (n:number)=>void }) => {
    const [answered, setAnswered] = useState<number | null>(null);
    const [isCorrect, setIsCorrect] = useState(false);

    const handleAnswer = (index: number) => {
        if (answered !== null) return;
        setAnswered(index);
        const correct = index === sign.trivia.correctAnswer;
        setIsCorrect(correct);
        if (correct && onReward) onReward(10);
    };

    return (
        <div className="flex-1 flex flex-col justify-start pt-4">
            <div className="bg-white/5 p-6 rounded-2xl text-center mb-6">
                <h3 className="text-lg font-bold mb-4">{sign.trivia.question}</h3>
                <div className="space-y-3">
                    {sign.trivia.options.map((opt, idx) => (
                        <button
                            key={idx}
                            onClick={() => handleAnswer(idx)}
                            disabled={answered !== null}
                            className={`w-full py-3 px-4 rounded-xl font-bold transition-all text-sm
                                ${answered === null ? 'bg-white/10 hover:bg-white/20' : ''}
                                ${answered === idx && idx === sign.trivia.correctAnswer ? 'bg-green-500 text-white' : ''}
                                ${answered === idx && idx !== sign.trivia.correctAnswer ? 'bg-red-500 text-white' : ''}
                                ${answered !== null && idx === sign.trivia.correctAnswer ? 'bg-green-500 text-white' : ''}
                            `}
                        >
                            {opt}
                        </button>
                    ))}
                </div>
            </div>
            
            {answered !== null && (
                <div className={`text-center p-4 rounded-xl animate-in fade-in slide-in-from-bottom-2 ${isCorrect ? 'bg-green-500/20 text-green-200' : 'bg-red-500/20 text-red-200'}`}>
                    {isCorrect ? 'Correct! You are a genius! +10 Shards' : 'Oops! Good try though!'}
                </div>
            )}
        </div>
    );
};

export default ZodiacExplorer;