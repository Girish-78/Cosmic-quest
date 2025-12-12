import React, { useState, useEffect, useRef } from 'react';
import { PLANETS } from '../constants';
import { ArrowLeft, Sun, Snowflake, CloudRain, Leaf, ThermometerSun, Play, CheckCircle2, Trophy, HelpCircle, Gamepad2, Moon, AlertCircle, Sparkles, RotateCcw, ChevronRight, Star } from 'lucide-react';

interface PlanetWorldsProps {
    onReward?: (amount: number) => void;
}

const SEASONS = [
    { name: 'Winter', icon: <Snowflake size={20} />, months: [11, 0, 1], desc: 'North Pole tilts away from Sun.' },
    { name: 'Spring', icon: <Leaf size={20} />, months: [2, 3, 4], desc: 'Sun shines equally on both hemispheres.' },
    { name: 'Summer', icon: <ThermometerSun size={20} />, months: [5, 6, 7], desc: 'North Pole tilts towards Sun.' },
    { name: 'Autumn', icon: <CloudRain size={20} />, months: [8, 9, 10], desc: 'Days start getting shorter.' },
];

const SEASON_ITEMS = [
    { id: 1, name: 'Snowman', season: 'Winter', icon: '⛄' },
    { id: 2, name: 'Hot Cocoa', season: 'Winter', icon: '☕' },
    { id: 3, name: 'Sunglasses', season: 'Summer', icon: '😎' },
    { id: 4, name: 'Ice Cream', season: 'Summer', icon: '🍦' },
    { id: 5, name: 'Flower', season: 'Spring', icon: '🌸' },
    { id: 6, name: 'Butterfly', season: 'Spring', icon: '🦋' },
    { id: 7, name: 'Falling Leaf', season: 'Autumn', icon: '🍂' },
    { id: 8, name: 'Pumpkin', season: 'Autumn', icon: '🎃' },
];

// --- ECLIPSE GAME DATA ---
interface EclipseLevel {
    id: number;
    title: string;
    instruction: string;
    targetAngleStart: number;
    targetAngleEnd: number;
    quiz: {
        question: string;
        options: string[];
        correct: number;
        fact: string;
    };
    reward: number;
}

const ECLIPSE_LEVELS: EclipseLevel[] = [
    {
        id: 1,
        title: "Level 1: The New Moon",
        instruction: "Move the Moon between the Earth and Sun, but not perfectly aligned.",
        targetAngleStart: 160,
        targetAngleEnd: 200, // Wide range
        quiz: {
            question: "When the Moon is between Earth and Sun, we can't see it. What is this phase called?",
            options: ["Full Moon", "New Moon", "Blue Moon"],
            correct: 1,
            fact: "Correct! The bright side is facing the Sun, so we see the shadow side!"
        },
        reward: 20
    },
    {
        id: 2,
        title: "Level 2: Solar Eclipse",
        instruction: "Perfectly align the Moon to block the Sun!",
        targetAngleStart: 175,
        targetAngleEnd: 185, // Narrow range
        quiz: {
            question: "During a Solar Eclipse, what blocks the Sun?",
            options: ["Clouds", "The Moon", "Mars"],
            correct: 1,
            fact: "Correct! The Moon casts a shadow on Earth, turning day into night!"
        },
        reward: 50
    },
    {
        id: 3,
        title: "Level 3: The Full Moon",
        instruction: "Move the Moon behind the Earth.",
        targetAngleStart: 340,
        targetAngleEnd: 20, // Wide range around 0/360
        quiz: {
            question: "The Earth is now between the Sun and Moon. What phase is this?",
            options: ["Full Moon", "Crescent Moon", "New Moon"],
            correct: 0,
            fact: "Correct! The Sun shines fully on the side of the Moon we can see."
        },
        reward: 20
    },
    {
        id: 4,
        title: "Level 4: Lunar Eclipse",
        instruction: "Hide the Moon in Earth's shadow!",
        targetAngleStart: 355,
        targetAngleEnd: 5, // Narrow range (handling wrap around 360 in logic)
        quiz: {
            question: "Why does the Moon look red during a Lunar Eclipse?",
            options: ["It's hot", "Earth's atmosphere bends red light", "It's rusty"],
            correct: 1,
            fact: "Correct! It's called a Blood Moon because Earth's sunsets reflect onto it!"
        },
        reward: 100
    }
];

// --- MOON LAB DATA ---
interface MoonLevel {
    id: number;
    targetPhase: string;
    targetDay: number; // Approx day in cycle (0-29.5)
    tolerance: number; // +/- days
    hint: string;
    fact: string;
    reward: number;
}

const MOON_LEVELS: MoonLevel[] = [
    {
        id: 1,
        targetPhase: "New Moon",
        targetDay: 0, // Also 29.5
        tolerance: 1.5,
        hint: "The Moon is hidden in darkness.",
        fact: "The New Moon marks the beginning of the lunar cycle.",
        reward: 20
    },
    {
        id: 2,
        targetPhase: "Full Moon",
        targetDay: 14.8,
        tolerance: 1.5,
        hint: "The Moon looks like a bright, complete circle.",
        fact: "Wolves don't actually howl at the Moon, they just communicate!",
        reward: 20
    },
    {
        id: 3,
        targetPhase: "First Quarter",
        targetDay: 7.4,
        tolerance: 1.5,
        hint: "The Right half of the Moon is lit up.",
        fact: "It's called a Quarter Moon because it's 1/4 through orbit, even though looks half-full.",
        reward: 30
    },
    {
        id: 4,
        targetPhase: "Third Quarter",
        targetDay: 22.1,
        tolerance: 1.5,
        hint: "The Left half of the Moon is lit up.",
        fact: "The Moon rises at midnight during this phase!",
        reward: 30
    },
    {
        id: 5,
        targetPhase: "Waxing Gibbous",
        targetDay: 11,
        tolerance: 2,
        hint: "Almost full! 'Waxing' means growing.",
        fact: "Gibbous means 'hump-backed' because of its shape.",
        reward: 40
    }
];

const PlanetWorlds: React.FC<PlanetWorldsProps> = ({ onReward }) => {
    const [view, setView] = useState<'list' | 'earthLab' | 'eclipseLab' | 'moonLab'>('list');

    if (view === 'earthLab') {
        return <EarthLab onBack={() => setView('list')} onReward={onReward} />;
    }

    if (view === 'eclipseLab') {
        return <EclipseLab onBack={() => setView('list')} onReward={onReward} />;
    }

    if (view === 'moonLab') {
        return <MoonLab onBack={() => setView('list')} onReward={onReward} />;
    }

    return (
        <div className="p-6 max-w-5xl mx-auto pb-20">
             <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-orange-200">Planet Worlds</h2>
                <p className="text-sm text-gray-400">Explore the Navagrahas & Earth's Mysteries</p>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                 {/* Earth Lab Banner */}
                 <button 
                    onClick={() => setView('earthLab')}
                    className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 to-teal-500 p-1 group shadow-xl hover:shadow-2xl transition-all hover:scale-[1.01] text-left min-h-[160px]"
                 >
                     <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:scale-125 transition-transform duration-700">
                         <Sun size={80} />
                     </div>
                     <div className="bg-black/20 backdrop-blur-sm p-4 rounded-[22px] flex flex-col h-full relative z-10">
                         <div className="w-10 h-10 bg-blue-400 rounded-full shadow-lg flex items-center justify-center text-xl animate-float mb-2">
                            🌍
                         </div>
                         <h3 className="text-lg font-bold text-white mb-1">Earth Lab: Seasons</h3>
                         <p className="text-blue-100 text-[10px] flex-1">Why do we have Summer and Winter?</p>
                         <div className="mt-2 flex items-center gap-2 text-[10px] font-bold bg-white/20 self-start px-2 py-1 rounded-full">
                             <Play size={8} fill="currentColor"/> Play Lab
                         </div>
                     </div>
                 </button>

                 {/* Moon Lab Banner - NEW */}
                 <button 
                    onClick={() => setView('moonLab')}
                    className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-gray-700 to-gray-900 p-1 group shadow-xl hover:shadow-2xl transition-all hover:scale-[1.01] text-left min-h-[160px] border border-gray-600"
                 >
                     <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:scale-125 transition-transform duration-700">
                         <Moon size={80} />
                     </div>
                     <div className="bg-black/20 backdrop-blur-sm p-4 rounded-[22px] flex flex-col h-full relative z-10">
                         <div className="w-10 h-10 bg-gray-200 rounded-full shadow-lg flex items-center justify-center text-xl animate-float-delayed mb-2 text-black">
                            🌑
                         </div>
                         <h3 className="text-lg font-bold text-white mb-1">Moon Lab: Phases</h3>
                         <p className="text-gray-300 text-[10px] flex-1">Why does the Moon change shape?</p>
                         <div className="mt-2 flex items-center gap-2 text-[10px] font-bold bg-white/20 self-start px-2 py-1 rounded-full">
                             <Play size={8} fill="currentColor"/> Play Lab
                         </div>
                     </div>
                 </button>

                 {/* Eclipse Lab Banner */}
                 <button 
                    onClick={() => setView('eclipseLab')}
                    className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-900 to-purple-800 p-1 group shadow-xl hover:shadow-2xl transition-all hover:scale-[1.01] text-left min-h-[160px] border border-purple-500/30"
                 >
                     <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:scale-125 transition-transform duration-700">
                         <AlertCircle size={80} />
                     </div>
                     <div className="bg-black/20 backdrop-blur-sm p-4 rounded-[22px] flex flex-col h-full relative z-10">
                         <div className="w-10 h-10 bg-purple-900 border border-white/20 rounded-full shadow-lg flex items-center justify-center text-xl animate-float mb-2 text-white overflow-hidden">
                             <div className="absolute inset-0 bg-black/50 rounded-full translate-x-1"></div>
                         </div>
                         <h3 className="text-lg font-bold text-white mb-1">Eclipse Theater</h3>
                         <p className="text-purple-200 text-[10px] flex-1">Create solar & lunar eclipses!</p>
                         <div className="mt-2 flex items-center gap-2 text-[10px] font-bold bg-white/20 self-start px-2 py-1 rounded-full">
                             <Play size={8} fill="currentColor"/> Play Lab
                         </div>
                     </div>
                 </button>
             </div>

             <h3 className="text-xl font-bold mb-4 text-orange-200 border-l-4 border-orange-500 pl-3">The 9 Grahas (Navagrahas)</h3>
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                 {PLANETS.map(planet => (
                     <div key={planet.id} className="bg-white/5 border border-white/10 p-4 rounded-2xl flex items-center gap-4 hover:bg-white/10 transition-colors cursor-pointer group">
                         <div 
                           className="w-12 h-12 rounded-full flex items-center justify-center text-2xl shadow-lg shrink-0 group-hover:scale-110 transition-transform"
                           style={{ backgroundColor: planet.color }}
                         >
                            {planet.icon}
                         </div>
                         <div>
                             <h3 className="text-lg font-bold text-white">{planet.name}</h3>
                             <p className="text-xs text-orange-300 font-semibold">{planet.sanskritName}</p>
                             <p className="text-[10px] text-gray-400 line-clamp-2">{planet.description}</p>
                         </div>
                     </div>
                 ))}
             </div>
        </div>
    );
};

// --- ECLIPSE LAB COMPONENT ---
const EclipseLab: React.FC<{ onBack: () => void; onReward?: (n:number) => void }> = ({ onBack, onReward }) => {
    const [levelIndex, setLevelIndex] = useState(0);
    const [angle, setAngle] = useState(0); // 0 to 360
    const [showQuiz, setShowQuiz] = useState(false);
    const [quizSolved, setQuizSolved] = useState(false);
    const [feedback, setFeedback] = useState("");
    const [score, setScore] = useState(0);

    const currentLevel = ECLIPSE_LEVELS[levelIndex];
    const isCompleted = levelIndex >= ECLIPSE_LEVELS.length;

    const checkAlignment = () => {
        // Normalize angle 0-360
        let normAngle = angle % 360;
        if (normAngle < 0) normAngle += 360;
        
        // Handle wrap around range logic if needed (e.g. 350 to 10)
        let inRange = false;
        if (currentLevel.targetAngleStart <= currentLevel.targetAngleEnd) {
            inRange = normAngle >= currentLevel.targetAngleStart && normAngle <= currentLevel.targetAngleEnd;
        } else {
            // Wrap around case
            inRange = normAngle >= currentLevel.targetAngleStart || normAngle <= currentLevel.targetAngleEnd;
        }

        if (inRange) {
            setShowQuiz(true);
            setFeedback("Perfect Alignment! Answer the question.");
        } else {
            setFeedback("Not aligned yet. Look closely at the instruction!");
        }
    };

    const handleQuizAnswer = (idx: number) => {
        if (idx === currentLevel.quiz.correct) {
            setQuizSolved(true);
            setFeedback("Correct! " + currentLevel.quiz.fact);
            setScore(s => s + currentLevel.reward);
            if (onReward) onReward(currentLevel.reward);
        } else {
            setFeedback("Try again!");
        }
    };

    const nextLevel = () => {
        if (levelIndex < ECLIPSE_LEVELS.length - 1) {
            setLevelIndex(prev => prev + 1);
            setAngle(0);
            setShowQuiz(false);
            setQuizSolved(false);
            setFeedback("");
        } else {
            setLevelIndex(prev => prev + 1); // Finished
        }
    };

    return (
        <div className="flex flex-col h-full bg-[#050b14] text-white">
             {/* Header */}
             <div className="p-4 flex items-center justify-between border-b border-white/10 bg-[#0d1b2a] z-30 shrink-0">
                <button onClick={onBack} className="flex items-center gap-2 text-gray-400 hover:text-white transition">
                    <ArrowLeft size={20} /> Exit
                </button>
                <h2 className="font-bold text-lg text-gray-200 hidden md:block">Eclipse Theater</h2>
                <div className="flex items-center gap-2">
                     <button 
                        onClick={() => { setLevelIndex(0); setAngle(0); setScore(0); setShowQuiz(false); }}
                        className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors"
                     >
                         <RotateCcw size={14} /> Reset
                     </button>
                     <div className="flex items-center gap-2 bg-yellow-500/20 px-3 py-1 rounded-full border border-yellow-500/30 ml-2">
                        <Trophy size={14} className="text-yellow-400" />
                        <span className="font-bold text-yellow-100">{score}</span>
                    </div>
                </div>
            </div>

            {/* Visual Area */}
            <div className="flex-1 relative bg-black flex flex-col items-center justify-center p-4 overflow-hidden">
                {!isCompleted ? (
                    <>
                        <div className="absolute top-4 left-0 right-0 text-center pointer-events-none z-10">
                            <h3 className="text-xl font-bold text-purple-300">{currentLevel.title}</h3>
                            <p className="text-sm text-gray-400">{currentLevel.instruction}</p>
                        </div>

                        {/* Simulation */}
                        <div className="relative w-full max-w-lg aspect-square flex items-center justify-center">
                            {/* Sun (Fixed Left) */}
                             <div className="absolute left-[-20%] top-1/2 -translate-y-1/2 w-40 h-40 bg-yellow-500 blur-[60px] opacity-40 rounded-full pointer-events-none"></div>
                             <div className="absolute left-4 top-1/2 -translate-y-1/2 flex flex-col items-center z-20">
                                 <Sun size={60} className="text-yellow-400 animate-pulse" />
                             </div>

                             {/* Earth (Center) */}
                             <div className="relative z-10 w-24 h-24 bg-blue-600 rounded-full shadow-lg flex items-center justify-center text-4xl">
                                 🌍
                                 {/* Shadow side of Earth (Right side is shadow if Sun is Left) */}
                                 <div className="absolute inset-0 rounded-full bg-gradient-to-l from-black/80 to-transparent pointer-events-none"></div>
                             </div>

                             {/* Moon Orbit */}
                             <div 
                                className="absolute w-[80%] h-[80%] rounded-full border border-white/10 border-dashed pointer-events-none"
                             ></div>

                             {/* Moon (Rotates) */}
                             <div 
                                className="absolute w-[80%] h-[80%] pointer-events-none"
                                style={{ transform: `rotate(${angle}deg)` }}
                             >
                                 <div className="absolute top-1/2 right-[-20px] -translate-y-1/2 w-10 h-10 bg-gray-300 rounded-full shadow-md flex items-center justify-center text-xs text-black font-bold transform -rotate-90">
                                     <div 
                                        className="absolute inset-0 rounded-full bg-gradient-to-l from-black/90 to-transparent"
                                        style={{ transform: `rotate(${-angle}deg)` }} 
                                     ></div>
                                 </div>
                             </div>
                        </div>

                        {/* Controls - Positioned Absolute Bottom but Safe */}
                        <div className="absolute bottom-8 right-0 md:right-8 w-full md:w-80 px-4 z-20">
                            {showQuiz ? (
                                <div className="bg-[#1a1a2e] p-6 rounded-2xl border border-purple-500/50 shadow-2xl animate-in slide-in-from-bottom-10">
                                    <h4 className="font-bold text-white mb-4 text-center">{currentLevel.quiz.question}</h4>
                                    {!quizSolved ? (
                                        <div className="space-y-2">
                                            {currentLevel.quiz.options.map((opt, i) => (
                                                <button 
                                                    key={i}
                                                    onClick={() => handleQuizAnswer(i)}
                                                    className="w-full p-3 bg-white/10 hover:bg-purple-600 rounded-xl text-left transition-colors"
                                                >
                                                    {opt}
                                                </button>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="text-center">
                                            <p className="text-green-400 font-bold mb-4">{feedback}</p>
                                            <button 
                                                onClick={nextLevel}
                                                className="px-6 py-2 bg-green-500 text-white rounded-xl font-bold hover:scale-105 transition-transform"
                                            >
                                                Next Level
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className="bg-black/80 backdrop-blur-md p-4 rounded-2xl border border-white/10">
                                    <label className="block text-xs font-bold text-gray-400 mb-2 text-center">Rotate the Moon</label>
                                    <input 
                                        type="range" 
                                        min="0" 
                                        max="360" 
                                        value={angle} 
                                        onChange={(e) => setAngle(parseInt(e.target.value))}
                                        className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-purple-500 mb-4"
                                    />
                                    <button 
                                        onClick={checkAlignment}
                                        className="w-full py-3 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-xl shadow-lg transition-transform active:scale-95"
                                    >
                                        Check Alignment
                                    </button>
                                    {feedback && <p className="text-center text-red-300 text-xs font-bold mt-2">{feedback}</p>}
                                </div>
                            )}
                        </div>
                    </>
                ) : (
                    <div className="text-center max-w-md mx-auto p-6">
                        <Trophy size={64} className="text-yellow-400 mx-auto mb-4 animate-bounce" />
                        <h3 className="text-3xl font-bold text-white mb-2">Eclipse Master!</h3>
                        <p className="text-gray-400 mb-8">You understand how shadows create eclipses.</p>
                        <button 
                             onClick={() => { setLevelIndex(0); setAngle(0); setScore(0); setShowQuiz(false); }}
                             className="w-full py-4 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl"
                        >
                            Play Again
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

// --- MOON LAB COMPONENT ---

const MoonLab: React.FC<{ onBack: () => void; onReward?: (n:number) => void }> = ({ onBack, onReward }) => {
    const [day, setDay] = useState(0); // 0 to 29.5
    const [levelIndex, setLevelIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [feedback, setFeedback] = useState("");
    const [showSuccess, setShowSuccess] = useState(false);

    const currentLevel = MOON_LEVELS[levelIndex];
    const isCompleted = levelIndex >= MOON_LEVELS.length;

    // Phase Name Helper
    const getPhaseName = (d: number) => {
        if (d <= 1 || d >= 28.5) return "New Moon";
        if (d > 1 && d < 6.5) return "Waxing Crescent";
        if (d >= 6.5 && d <= 8.5) return "First Quarter";
        if (d > 8.5 && d < 14) return "Waxing Gibbous";
        if (d >= 14 && d <= 15.5) return "Full Moon";
        if (d > 15.5 && d < 21.5) return "Waning Gibbous";
        if (d >= 21.5 && d <= 23.5) return "Third Quarter";
        if (d > 23.5 && d < 28.5) return "Waning Crescent";
        return "New Moon";
    };

    const currentPhaseName = getPhaseName(day);

    const orbitAngle = (180 - (day * (360 / 29.5))) % 360;

    const checkAnswer = () => {
        let diff = Math.abs(day - currentLevel.targetDay);
        if (currentLevel.targetDay === 0 && Math.abs(day - 29.5) < diff) diff = Math.abs(day - 29.5);
        if (currentLevel.targetDay === 29.5 && Math.abs(day - 0) < diff) diff = Math.abs(day - 0);

        if (diff <= currentLevel.tolerance) {
            setFeedback("Correct! It's the " + currentLevel.targetPhase + ".");
            setShowSuccess(true);
            if (!showSuccess) {
                setScore(s => s + currentLevel.reward);
                if (onReward) onReward(currentLevel.reward);
            }
        } else {
            setFeedback(`That is a ${currentPhaseName}. Look for the ${currentLevel.targetPhase}!`);
            setShowSuccess(false);
        }
    };

    const nextLevel = () => {
        if (levelIndex < MOON_LEVELS.length - 1) {
            setLevelIndex(prev => prev + 1);
            setShowSuccess(false);
            setFeedback("");
        } else {
            setLevelIndex(prev => prev + 1); 
        }
    };

    // Improved SVG Path for Moon Phase
    const getMoonPath = (day: number) => {
        const period = 29.5;
        const phase = (day % period) / period; // 0 to 1
        
        // At phase 0 (New Moon) -> dark
        // At phase 0.5 (Full Moon) -> bright
        
        let path = "";
        
        if (phase <= 0.5) {
            // Waxing (Light on Right)
            // Outer Edge: Top to Bottom via Right Semicircle
            // Inner Edge: Bottom to Top (Terminator)
            
            const rX = 50 * Math.cos(phase * 2 * Math.PI); // 50 at 0, 0 at 0.25, -50 at 0.5
            const absRx = Math.abs(rX);
            const termSweep = phase < 0.25 ? 0 : 1; 
            // < 0.25 (Crescent): Terminator curves Right (0)
            // > 0.25 (Gibbous): Terminator curves Left (1)

            // Draw area between right semicircle and terminator
            path = `M 50 0 A 50 50 0 0 1 50 100 A ${absRx} 50 0 0 ${termSweep} 50 0`;
        } else {
            // Waning (Light on Left)
            // Outer Edge: Top to Bottom via Left Semicircle (CCW is 0)
            
            const p2 = phase - 0.5;
            const rX = 50 * Math.cos(p2 * 2 * Math.PI);
            const absRx = Math.abs(rX);
            const termSweep = p2 < 0.25 ? 0 : 1;
            // < 0.25 (Gibbous): Terminator curves Right (0)
            // > 0.25 (Crescent): Terminator curves Left (1)

             path = `M 50 0 A 50 50 0 0 0 50 100 A ${absRx} 50 0 0 ${termSweep} 50 0`;
        }
        return path;
    };

    return (
        <div className="flex flex-col h-full bg-[#050b14] text-white">
             {/* Header */}
             <div className="p-3 flex items-center justify-between border-b border-white/10 bg-[#0d1b2a] z-30 shrink-0">
                <button onClick={onBack} className="flex items-center gap-2 text-gray-400 hover:text-white transition">
                    <ArrowLeft size={18} /> Exit
                </button>
                <h2 className="font-bold text-base text-gray-200 hidden md:block">Moon Lab: Phases</h2>
                <div className="flex items-center gap-2">
                     <button 
                        onClick={() => { setDay(0); setLevelIndex(0); setScore(0); setShowSuccess(false); }}
                        className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors"
                     >
                         <RotateCcw size={14} /> Reset
                     </button>
                     <div className="flex items-center gap-2 bg-yellow-500/20 px-3 py-1 rounded-full border border-yellow-500/30 ml-2">
                        <Trophy size={14} className="text-yellow-400" />
                        <span className="font-bold text-yellow-100 text-xs">{score}</span>
                    </div>
                </div>
            </div>

            {/* Content Container */}
            <div className="flex-1 flex flex-col md:flex-row overflow-hidden relative min-h-0">
                
                {/* LEFT: ORBIT SIMULATION */}
                <div className="flex-1 relative bg-[#050b14] flex items-center justify-center p-4 border-b md:border-b-0 md:border-r border-white/10 min-h-[180px]">
                     <div className="absolute top-2 left-2 text-[10px] font-bold text-gray-500 uppercase tracking-widest">Orbit View</div>
                     
                     <div className="absolute left-[-20%] top-1/2 -translate-y-1/2 w-40 h-40 bg-yellow-400 blur-[80px] opacity-20 rounded-full pointer-events-none"></div>
                     <div className="absolute left-2 top-1/2 -translate-y-1/2 flex flex-col items-center">
                         <Sun size={24} className="text-yellow-500" />
                     </div>

                     <div className="relative w-[180px] h-[180px] md:w-[260px] md:h-[260px] rounded-full border border-dashed border-white/10 flex items-center justify-center shrink-0">
                         <div className="w-10 h-10 md:w-16 md:h-16 bg-blue-600 rounded-full shadow-lg relative z-10 flex items-center justify-center">
                             <span className="text-xl md:text-2xl">🌍</span>
                             <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent to-black/80 pointer-events-none"></div>
                         </div>

                         <div 
                            className="absolute w-full h-full"
                            style={{ transform: `rotate(${-orbitAngle}deg)` }}
                         >
                             <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-[12px]">
                                 <div className="w-6 h-6 md:w-8 md:h-8 bg-gray-300 rounded-full relative shadow-[0_0_10px_rgba(255,255,255,0.2)] overflow-hidden">
                                     <div 
                                        className="w-full h-full"
                                        style={{ transform: `rotate(${orbitAngle}deg)` }}
                                     >
                                         <div className="absolute inset-0 bg-gradient-to-r from-white to-black"></div>
                                     </div>
                                 </div>
                             </div>
                         </div>
                     </div>
                </div>

                {/* RIGHT: EARTH VIEW (Result) */}
                <div className="flex-1 bg-[#0b1020] flex flex-col items-center justify-center p-4 relative min-h-[180px]">
                     <div className="absolute top-2 left-2 text-[10px] font-bold text-blue-400 uppercase tracking-widest">View from Earth</div>

                     <div className={`mb-2 text-xl md:text-3xl font-bold text-center transition-colors ${showSuccess ? 'text-green-400' : 'text-white'}`}>
                        {currentPhaseName}
                     </div>

                     <div className="w-32 h-32 md:w-48 md:h-48 bg-black rounded-full relative shadow-2xl border border-gray-800 mb-4 shrink-0">
                         <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                             {/* Base Circle is Black/Dark */}
                             <circle cx="50" cy="50" r="50" fill="#050505" />
                             {/* Path is Light */}
                             <path d={getMoonPath(day)} fill="#f1f5f9" />
                         </svg>
                     </div>

                     <div className="flex gap-8 text-center">
                         <div>
                             <div className="text-gray-500 text-[9px] uppercase font-bold">Moon Age</div>
                             <div className="text-base font-bold text-gray-300">{day.toFixed(1)} <span className="text-xs">days</span></div>
                         </div>
                         <div>
                             <div className="text-gray-500 text-[9px] uppercase font-bold">Lit</div>
                             <div className="text-base font-bold text-blue-300">
                                 {Math.round( (1 - Math.cos((day/29.5)*2*Math.PI))/2 * 100 )}%
                             </div>
                         </div>
                     </div>
                </div>
            </div>

            {/* Bottom Control Panel - Compacted */}
            <div className="bg-[#1a1a2e] border-t border-white/10 px-4 py-3 z-40 shrink-0">
                {!isCompleted ? (
                    <div className="max-w-3xl mx-auto w-full">
                        <div className="flex items-center justify-between mb-2">
                            <div>
                                <h3 className="text-[10px] font-bold text-yellow-400 uppercase tracking-wide">Mission {levelIndex + 1}</h3>
                                <p className="text-white font-bold text-sm">Find: <span className="text-blue-300">{currentLevel.targetPhase}</span></p>
                            </div>
                            {showSuccess && (
                                <div className="animate-bounce bg-green-500 text-white px-2 py-0.5 rounded-full text-[10px] font-bold shadow-lg">
                                    + {currentLevel.reward}
                                </div>
                            )}
                        </div>

                        <div className="flex items-center gap-3 mb-2">
                            <span className="text-[9px] font-bold text-gray-500">New</span>
                            <input 
                                type="range" 
                                min="0" 
                                max="29.5" 
                                step="0.1" 
                                value={day} 
                                onChange={(e) => {
                                    setDay(parseFloat(e.target.value));
                                    setShowSuccess(false);
                                    setFeedback("");
                                }}
                                className="flex-1 h-8 rounded-lg bg-gray-700 accent-blue-500 cursor-pointer"
                            />
                            <span className="text-[9px] font-bold text-gray-500">New</span>
                        </div>

                        <div className="flex items-center gap-3">
                            {!showSuccess ? (
                                <>
                                    <button 
                                        onClick={checkAnswer}
                                        className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl shadow-lg shadow-blue-900/50 transition-all active:scale-95 text-xs"
                                    >
                                        Check
                                    </button>
                                    <div className="flex-1 text-xs text-gray-400 italic px-2 leading-tight">
                                        {feedback || currentLevel.hint}
                                    </div>
                                </>
                            ) : (
                                <div className="flex-1 flex items-center gap-3 animate-in fade-in slide-in-from-bottom-2">
                                    <div className="flex-1 bg-green-900/30 border border-green-500/30 px-3 py-1.5 rounded-xl text-center">
                                        <p className="text-green-300 text-[10px] font-bold">{currentLevel.fact}</p>
                                    </div>
                                    <button 
                                        onClick={nextLevel}
                                        className="px-4 py-2 bg-green-500 hover:bg-green-400 text-white font-bold rounded-xl shadow-lg transition-all active:scale-95 flex items-center gap-1 text-xs"
                                    >
                                        Next <ChevronRight size={14} />
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                ) : (
                    <div className="text-center max-w-md mx-auto">
                        <Trophy size={32} className="text-yellow-400 mx-auto mb-1" />
                        <h3 className="text-lg font-bold text-white">Moon Master!</h3>
                        <p className="text-xs text-gray-400 mb-3">You have mastered all the phases.</p>
                        <button 
                             onClick={() => { setLevelIndex(0); setDay(0); setScore(0); setShowSuccess(false); }}
                             className="w-full py-2 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl text-xs"
                        >
                            Play Again
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

// --- Earth Lab Component ---

const EarthLab: React.FC<{ onBack: () => void; onReward?: (n:number) => void }> = ({ onBack, onReward }) => {
    const [month, setMonth] = useState(5); // 0 = Jan, 5 = June
    const [isPlaying, setIsPlaying] = useState(false);

    // Game State
    const [gameActive, setGameActive] = useState(false);
    const [targetItem, setTargetItem] = useState(SEASON_ITEMS[0]);
    const [feedback, setFeedback] = useState("");
    const [score, setScore] = useState(0);

    useEffect(() => {
        let interval: any;
        if (isPlaying && !gameActive) {
            interval = setInterval(() => {
                setMonth(prev => (prev + 0.05) % 12);
            }, 50);
        }
        return () => clearInterval(interval);
    }, [isPlaying, gameActive]);

    const getMonthName = (m: number) => {
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        return months[Math.floor(m) % 12];
    };

    const getCurrentSeason = (m: number) => {
        const floorMonth = Math.floor(m) % 12;
        return SEASONS.find(s => s.months.includes(floorMonth)) || SEASONS[0];
    };

    const currentSeason = getCurrentSeason(month);

    // Coordinate Math
    // We align the months to screen coordinates manually to match intuition
    // Right (0 rad) = Dec (Winter)
    // Bottom (0.5 PI) = March (Spring)
    // Left (PI) = June (Summer)
    // Top (1.5 PI) = Sep (Autumn)
    // Formula: (month - 11) / 6 * PI
    const orbitAngle = ((month - 11) / 6) * Math.PI;

    const startGame = () => {
        setGameActive(true);
        setIsPlaying(false);
        nextRound();
    };

    const nextRound = () => {
        const randomItem = SEASON_ITEMS[Math.floor(Math.random() * SEASON_ITEMS.length)];
        setTargetItem(randomItem);
        setFeedback("Drag the slider to find the season!");
    };

    const submitAnswer = () => {
        const season = currentSeason.name;
        if (season === targetItem.season) {
            setFeedback("Correct! +20 Shards!");
            setScore(s => s + 20);
            if (onReward) onReward(20);
            setTimeout(nextRound, 1500);
        } else {
            setFeedback(`Not quite! ${targetItem.name} belongs in ${targetItem.season}. Try again.`);
        }
    };

    return (
        <div className="flex flex-col h-full bg-[#0a0a1a] text-white">
            {/* Header */}
            <div className="p-4 flex items-center justify-between border-b border-white/10 bg-[#121225]">
                <button onClick={onBack} className="flex items-center gap-2 text-gray-400 hover:text-white transition">
                    <ArrowLeft size={20} /> Back
                </button>
                <h2 className="font-bold text-lg flex items-center gap-2">
                    🌍 Earth Lab <span className="text-xs bg-blue-600 px-2 py-0.5 rounded text-white">Seasons</span>
                </h2>
                <div className="flex items-center gap-2 bg-yellow-500/20 px-3 py-1 rounded-full border border-yellow-500/30">
                    <Trophy size={14} className="text-yellow-400" />
                    <span className="font-bold text-yellow-100">{score}</span>
                </div>
            </div>

            {/* Main Interactive Area */}
            <div className="flex-1 relative overflow-hidden flex flex-col items-center justify-center p-4">
                
                {/* Info HUD */}
                <div className="absolute top-4 left-4 right-4 flex justify-between pointer-events-none z-20">
                    <div className="bg-black/60 backdrop-blur-md p-4 rounded-xl border border-white/20 max-w-[200px]">
                        <div className="text-xs text-gray-400 uppercase font-bold mb-1">Month</div>
                        <div className="text-2xl font-bold text-white mb-2">{getMonthName(month)}</div>
                        <div className="flex items-center gap-2 text-blue-300">
                             {currentSeason.icon}
                             <span className="font-bold">{currentSeason.name}</span>
                        </div>
                        <div className="text-[10px] text-gray-300 mt-2 leading-tight">
                            {currentSeason.desc}
                        </div>
                    </div>

                    {/* Game Target Display (Right Side) */}
                    {gameActive && (
                        <div className="bg-indigo-900/80 backdrop-blur-md p-4 rounded-xl border border-indigo-400/50 shadow-lg pointer-events-auto max-w-[150px] text-center animate-in slide-in-from-right">
                             <h4 className="font-bold text-white mb-2 text-[10px] uppercase">Find this Season</h4>
                             <div className="bg-white/10 w-12 h-12 rounded-full mx-auto flex items-center justify-center text-2xl mb-2 shadow-inner">
                                 {targetItem.icon}
                             </div>
                             <div className="font-bold text-indigo-200 text-sm mb-1">{targetItem.name}</div>
                             <div className="text-[10px] text-yellow-300 font-bold">{feedback}</div>
                        </div>
                    )}
                </div>

                {/* VISUALIZATION */}
                <div className="relative w-full max-w-lg aspect-square flex items-center justify-center mt-10 md:mt-0">
                    {/* Orbit Path */}
                    <div className="absolute w-[80%] h-[80%] rounded-full border border-white/10 border-dashed"></div>
                    
                    {/* Sun */}
                    <div className="absolute w-24 h-24 bg-yellow-400 rounded-full shadow-[0_0_100px_rgba(253,184,19,0.5)] flex items-center justify-center z-10">
                        <span className="text-4xl animate-pulse">☀️</span>
                    </div>

                    {/* Earth Container (Rotates around Sun) */}
                    <div 
                        className="absolute w-[80%] h-[80%] pointer-events-none"
                        style={{ transform: `rotate(${orbitAngle}rad)` }}
                    >
                        {/* Earth (Positioned at edge) */}
                        <div 
                            className="absolute right-0 top-1/2 -translate-y-1/2 w-16 h-16 md:w-24 md:h-24 bg-blue-500 rounded-full shadow-lg overflow-hidden transition-transform z-20 flex items-center justify-center"
                            style={{ transform: `rotate(${-orbitAngle}rad)` }} // Counter-rotate to keep upright orientation relative to screen
                        >
                           {/* Tilt Wrapper - Fixed Tilt of 23.5deg */}
                           <div className="w-full h-full relative" style={{ transform: 'rotate(23.5deg)' }}>
                               {/* Axis Line */}
                               <div className="absolute top-[-20%] left-1/2 w-[2px] h-[140%] bg-white/30 -translate-x-1/2 z-30"></div>
                               
                               <div className="absolute inset-0 rounded-full bg-blue-600 overflow-hidden">
                                   {/* Continent (Abstract) */}
                                   <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 bg-green-500 rounded-full opacity-80 blur-[1px]"></div>
                                   <div className="absolute bottom-1/4 right-1/4 w-1/3 h-1/3 bg-green-600 rounded-full opacity-80 blur-[1px]"></div>
                               </div>

                               {/* Shadow Overlay */}
                               <div 
                                  className="absolute inset-[-50%] w-[200%] h-[200%] bg-black/60 blur-md"
                                  style={{ 
                                      background: `conic-gradient(from ${(orbitAngle - Math.PI/2)}rad at center, rgba(0,0,0,0.8) 0deg, transparent 180deg, rgba(0,0,0,0.8) 360deg)`
                                   }}
                               ></div>
                           </div>
                        </div>
                    </div>
                    
                    {/* Season Labels - Fixed to Screen Logic */}
                    <div className="absolute top-4 left-1/2 -translate-x-1/2 text-white/20 font-bold text-xl md:text-2xl select-none">Autumn (Sep)</div>
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/20 font-bold text-xl md:text-2xl select-none">Spring (Mar)</div>
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 text-white/20 font-bold text-xl md:text-2xl select-none rotate-90 md:rotate-0">Winter (Dec)</div>
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 text-white/20 font-bold text-xl md:text-2xl select-none -rotate-90 md:rotate-0">Summer (Jun)</div>
                </div>
            </div>

            {/* Controls */}
            <div className="p-6 bg-[#121225] border-t border-white/10 z-30 pb-safe">
                 <div className="flex flex-col gap-4">
                     {/* Month Timeline / Visual Indicator */}
                     <div className="flex items-center justify-between text-xs text-gray-400 font-bold uppercase tracking-widest px-1">
                         <span>Dec</span>
                         <span>Mar</span>
                         <span>Jun</span>
                         <span>Sep</span>
                         <span>Dec</span>
                     </div>
                     
                     {/* Slider - ALWAYS VISIBLE */}
                     <input 
                        type="range" 
                        min="0" 
                        max="11.9" 
                        step="0.1"
                        value={month}
                        onChange={(e) => {
                            setMonth(parseFloat(e.target.value));
                            setIsPlaying(false);
                        }}
                        className={`w-full h-4 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500 hover:accent-blue-400 ${gameActive ? 'ring-2 ring-yellow-400 shadow-[0_0_10px_rgba(234,179,8,0.5)]' : ''}`}
                     />

                     {/* Action Buttons */}
                     {!gameActive ? (
                         <div className="flex gap-3 mt-2">
                             <button 
                                onClick={() => setIsPlaying(!isPlaying)}
                                className={`flex-1 py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${isPlaying ? 'bg-red-500/20 text-red-400' : 'bg-blue-600 text-white shadow-lg shadow-blue-900/50'}`}
                             >
                                 {isPlaying ? 'Pause Orbit' : <><Play size={18} fill="currentColor"/> Start Orbit</>}
                             </button>
                             <button 
                                onClick={startGame}
                                className="flex-1 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-bold shadow-lg flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform"
                             >
                                 <Gamepad2 size={18} /> Play Season Game
                             </button>
                         </div>
                     ) : (
                         <div className="flex gap-3 mt-2 animate-in slide-in-from-bottom-2">
                             <button 
                                onClick={submitAnswer}
                                className="flex-[2] py-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-xl font-bold shadow-lg flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform"
                             >
                                 <CheckCircle2 size={18} /> Submit Season
                             </button>
                             <button 
                                onClick={() => setGameActive(false)}
                                className="flex-1 py-3 bg-white/10 hover:bg-white/20 text-gray-300 rounded-xl font-bold transition-colors"
                             >
                                 Quit
                             </button>
                         </div>
                     )}
                 </div>
            </div>
        </div>
    );
};

export default PlanetWorlds;