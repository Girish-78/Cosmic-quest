import React, { useState, useEffect } from 'react';
import { SOLAR_SYSTEM } from '../constants';
import { SolarSystemPlanet } from '../types';
import { RefreshCcw, CheckCircle, Info, Sparkles, Trophy } from 'lucide-react';

interface SkyPlaygroundProps {
  onReward: (amount: number) => void;
}

const SkyPlayground: React.FC<SkyPlaygroundProps> = ({ onReward }) => {
  const [placedPlanets, setPlacedPlanets] = useState<SolarSystemPlanet[]>([]);
  const [availablePlanets, setAvailablePlanets] = useState<SolarSystemPlanet[]>(SOLAR_SYSTEM);
  const [animating, setAnimating] = useState(true);
  
  // Challenge State
  const [currentMission, setCurrentMission] = useState<SolarSystemPlanet | null>(null);
  const [showInfoModal, setShowInfoModal] = useState<SolarSystemPlanet | null>(null);
  const [feedback, setFeedback] = useState("Tap on the correct planet to add it to orbit!");

  useEffect(() => {
    // Start the first mission
    if (availablePlanets.length > 0 && !currentMission && placedPlanets.length < SOLAR_SYSTEM.length) {
       selectNewMission(availablePlanets);
    }
  }, [availablePlanets, placedPlanets]);

  const selectNewMission = (pool: SolarSystemPlanet[]) => {
      if(pool.length === 0) return;
      // Simple logic: The next planet in order (to build the system correctly)
      const nextPlanet = pool[0]; 
      setCurrentMission(nextPlanet);
      setFeedback(`Mission: Find the ${nextPlanet.name}. Hint: ${nextPlanet.description}`);
  };

  const handlePlanetClick = (planet: SolarSystemPlanet) => {
    // Check if user clicked the correct planet for the mission
    if (currentMission && planet.id === currentMission.id) {
        // Correct! Show info modal before placing
        setShowInfoModal(planet);
    } else if (currentMission) {
        setFeedback(`Oops! That's not ${currentMission.name}. Try again!`);
    } else {
        // Just viewing info for already placed planet
        setShowInfoModal(planet);
    }
  };

  const confirmPlacement = () => {
      if (!showInfoModal) return;
      const planet = showInfoModal;
      
      // Only reward if it's currently in the available pool (newly placed)
      if (availablePlanets.find(p => p.id === planet.id)) {
          onReward(50); // Give 50 shards
          setAvailablePlanets(prev => prev.filter(p => p.id !== planet.id));
          setPlacedPlanets(prev => [...prev, planet]);
          setFeedback(`Great job! You placed ${planet.name}. +50 Shards!`);
      }
      
      setShowInfoModal(null);
      setCurrentMission(null); // Will trigger useEffect to pick next
  };

  const reset = () => {
    setPlacedPlanets([]);
    setAvailablePlanets(SOLAR_SYSTEM);
    setCurrentMission(null);
    setFeedback("Resetting the solar system...");
  };

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center overflow-hidden bg-black/20">
      
      {/* Top HUD - Adjusted Position */}
      <div className="absolute top-2 left-2 right-2 z-20 flex justify-between items-start pointer-events-none">
          <div className="bg-black/60 p-3 rounded-xl backdrop-blur-md border border-white/10 max-w-xs md:max-w-md pointer-events-auto shadow-lg">
            <h3 className="font-bold text-yellow-300 flex items-center gap-2 text-sm">
                <Trophy size={14} /> Mission
            </h3>
            <p className="text-xs text-gray-200 mt-1 leading-tight">{feedback}</p>
          </div>

          <div className="pointer-events-auto flex flex-col gap-2">
            <button onClick={reset} className="p-2 bg-red-500/50 hover:bg-red-500 rounded-lg transition text-white backdrop-blur-sm">
                <RefreshCcw size={16}/>
            </button>
            <button 
                onClick={() => setAnimating(!animating)} 
                className={`p-2 rounded-lg text-xs font-bold transition flex items-center justify-center ${animating ? 'bg-green-600/80' : 'bg-gray-600/80'} text-white backdrop-blur-sm`}
            >
                {animating ? 'Orbit' : 'Stop'}
            </button>
          </div>
      </div>

      {/* Solar System View */}
      <div className="relative w-full h-full flex items-center justify-center overflow-hidden pb-16"> 
         {/* Sun */}
         <div className="absolute z-10 w-12 h-12 md:w-20 md:h-20 bg-yellow-400 rounded-full shadow-[0_0_80px_rgba(255,200,0,0.6)] flex items-center justify-center text-2xl md:text-4xl animate-pulse">
            ☀️
         </div>

         {/* Orbits */}
         {SOLAR_SYSTEM.map((planet, index) => {
             const orbitSize = 80 + (index * 32); // Compacted orbits
             const isPlaced = placedPlanets.find(p => p.id === planet.id);
             
             return (
                 <div 
                    key={planet.id}
                    className={`absolute rounded-full border flex items-center justify-center transition-all duration-1000 ${isPlaced ? 'border-white/20' : 'border-white/5 border-dashed'}`}
                    style={{
                        width: `${orbitSize * 2}px`,
                        height: `${orbitSize * 2}px`,
                        animation: (isPlaced && animating) ? `spin ${planet.orbitPeriod === '88 Days' ? 5 : 5 + index * 2}s linear infinite` : 'none'
                    }}
                 >
                     {isPlaced && (
                         <div 
                            className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer hover:scale-125 transition-transform z-20"
                            onClick={(e) => {
                                e.stopPropagation();
                                setShowInfoModal(planet);
                            }}
                         >
                             <div 
                                className="rounded-full flex items-center justify-center text-lg shadow-lg relative group"
                                style={{ 
                                    backgroundColor: planet.color,
                                    width: `${planet.size * 0.8}px`, // Slightly smaller
                                    height: `${planet.size * 0.8}px`
                                }}
                             >
                                <span className="drop-shadow-md text-xs">{planet.icon}</span>
                             </div>
                         </div>
                     )}
                 </div>
             );
         })}
      </div>

      {/* Inventory / Selection Bar - Compacted */}
      {availablePlanets.length > 0 ? (
          <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-2 overflow-x-auto px-4 z-20 pb-2 scrollbar-hide">
            {availablePlanets.map(planet => (
                <button
                    key={planet.id}
                    onClick={() => handlePlanetClick(planet)}
                    className="flex-shrink-0 w-14 h-16 bg-black/40 backdrop-blur-md rounded-xl flex flex-col items-center justify-center border border-white/20 hover:bg-white/20 hover:border-yellow-400 transition-all hover:-translate-y-1 group shadow-lg"
                >
                    <span className="text-xl mb-0.5 group-hover:scale-110 transition-transform">{planet.icon}</span>
                    <span className="text-[9px] text-gray-300 font-bold uppercase tracking-wide">{planet.name}</span>
                </button>
            ))}
          </div>
      ) : (
          <div className="absolute bottom-4 z-20 px-6 py-2 bg-green-500 rounded-full flex items-center gap-2 animate-bounce shadow-lg">
             <CheckCircle size={20} className="text-white"/> 
             <span className="font-bold text-white text-sm">Solar System Complete!</span>
          </div>
      )}

      {/* Info Modal - High Z-Index to overlay layout */}
      {showInfoModal && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
              <div className="bg-[#1a1a2e] border border-white/20 w-full max-w-md rounded-3xl overflow-hidden shadow-2xl relative animate-float max-h-[90vh] flex flex-col">
                  
                  {/* Header with Planet Color */}
                  <div className="h-20 shrink-0 relative flex items-center justify-center" style={{ backgroundColor: showInfoModal.color }}>
                      <div className="text-5xl drop-shadow-lg transform translate-y-2">{showInfoModal.icon}</div>
                      <button 
                        onClick={() => setShowInfoModal(null)}
                        className="absolute top-3 right-3 bg-black/20 hover:bg-black/40 rounded-full p-1 text-white transition backdrop-blur-sm"
                      >
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                      </button>
                  </div>

                  <div className="p-6 overflow-y-auto">
                      <h2 className="text-2xl font-bold text-center mb-1 text-white">{showInfoModal.name}</h2>
                      <p className="text-center text-purple-300 text-xs mb-4">{showInfoModal.description}</p>

                      <div className="grid grid-cols-2 gap-2 mb-4">
                          <div className="bg-white/5 p-2 rounded-xl border border-white/5">
                              <span className="text-[10px] text-gray-400 block uppercase">Orbit Period</span>
                              <span className="font-bold text-white text-sm">{showInfoModal.orbitPeriod}</span>
                          </div>
                          <div className="bg-white/5 p-2 rounded-xl border border-white/5">
                              <span className="text-[10px] text-gray-400 block uppercase">Moons</span>
                              <span className="font-bold text-white text-sm">{showInfoModal.moons}</span>
                          </div>
                          <div className="bg-white/5 p-2 rounded-xl border border-white/5">
                              <span className="text-[10px] text-gray-400 block uppercase">Temperature</span>
                              <span className="font-bold text-white text-sm">{showInfoModal.temperature}</span>
                          </div>
                          <div className="bg-white/5 p-2 rounded-xl border border-white/5">
                              <span className="text-[10px] text-gray-400 block uppercase">Type</span>
                              <span className="font-bold text-white text-sm">{showInfoModal.composition}</span>
                          </div>
                      </div>

                      <div className="bg-indigo-900/30 p-3 rounded-xl mb-4 border border-indigo-500/20">
                          <div className="flex items-center gap-2 mb-1 text-indigo-300 font-bold text-xs">
                              <Info size={14} /> Did you know?
                          </div>
                          <p className="text-xs text-indigo-100 italic">"{showInfoModal.funFact}"</p>
                      </div>

                      {availablePlanets.find(p => p.id === showInfoModal.id) ? (
                           <button 
                             onClick={confirmPlacement}
                             className="w-full py-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl font-bold text-white shadow-lg hover:scale-[1.02] transition-transform flex items-center justify-center gap-2 text-sm"
                           >
                               <Sparkles className="fill-yellow-300 text-yellow-300" size={16} /> 
                               Collect 50 Shards & Launch
                           </button>
                      ) : (
                          <div className="text-center text-green-400 font-bold flex items-center justify-center gap-2 text-sm">
                              <CheckCircle size={16} /> Currently in Orbit
                          </div>
                      )}
                  </div>
              </div>
          </div>
      )}
    </div>
  );
};

export default SkyPlayground;