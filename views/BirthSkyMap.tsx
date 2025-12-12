import React, { useState } from 'react';
import { generateBirthChartSummary } from '../services/geminiService';
import { BirthChartSummary } from '../types';
import { Loader2, Star, Moon, Sun, MapPin, Calendar, Clock } from 'lucide-react';

const BirthSkyMap: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<BirthChartSummary | null>(null);
  
  // Form State
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [place, setPlace] = useState('');

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if(!date || !place) return;
    
    setLoading(true);
    try {
        const data = await generateBirthChartSummary(date, time || "12:00 PM", place);
        setResult(data);
    } catch (error) {
        console.error("Failed to generate", error);
    } finally {
        setLoading(false);
    }
  };

  if (result) {
      return (
          <div className="p-6 max-w-2xl mx-auto h-full overflow-y-auto pb-20">
              <button onClick={() => setResult(null)} className="mb-4 text-sm text-purple-300 hover:text-white underline">
                  ← Create Another Map
              </button>
              
              <div className="bg-gradient-to-br from-indigo-900 via-purple-900 to-black p-1 rounded-3xl shadow-2xl border border-purple-500/30">
                  <div className="bg-black/40 backdrop-blur-xl rounded-[20px] p-6 md:p-8 text-center">
                      <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 to-amber-500 mb-2">
                          {name}'s Cosmic Map
                      </h2>
                      <p className="text-purple-200 text-sm mb-8">Born in {place}</p>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                          {/* Sun */}
                          <div className="bg-orange-500/20 p-4 rounded-2xl border border-orange-500/30 flex flex-col items-center">
                              <Sun className="text-orange-400 mb-2" size={32} />
                              <div className="text-xs text-orange-200 uppercase font-bold">Sun Sign</div>
                              <div className="text-xl font-bold text-white">{result.sunSign}</div>
                              <div className="text-[10px] text-orange-200/60 mt-1">Your Core Self</div>
                          </div>
                          
                          {/* Moon */}
                          <div className="bg-blue-500/20 p-4 rounded-2xl border border-blue-500/30 flex flex-col items-center">
                              <Moon className="text-blue-300 mb-2" size={32} />
                              <div className="text-xs text-blue-200 uppercase font-bold">Moon Sign</div>
                              <div className="text-xl font-bold text-white">{result.moonSign}</div>
                              <div className="text-[10px] text-blue-200/60 mt-1">Your Emotions</div>
                          </div>

                          {/* Ascendant */}
                          <div className="bg-emerald-500/20 p-4 rounded-2xl border border-emerald-500/30 flex flex-col items-center">
                              <Star className="text-emerald-300 mb-2" size={32} />
                              <div className="text-xs text-emerald-200 uppercase font-bold">Ascendant</div>
                              <div className="text-xl font-bold text-white">{result.ascendant}</div>
                              <div className="text-[10px] text-emerald-200/60 mt-1">Your Style</div>
                          </div>
                      </div>

                      <div className="bg-white/5 p-6 rounded-2xl border border-white/10 text-left mb-6">
                          <h3 className="font-bold text-purple-300 mb-2 text-sm uppercase">Cosmic Message</h3>
                          <p className="text-lg leading-relaxed font-light italic">"{result.kidSummary}"</p>
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-left">
                           <div className="bg-white/5 p-3 rounded-xl">
                               <span className="block text-xs text-gray-400">Lucky Element</span>
                               <span className="font-bold text-pink-300">{result.luckyElement}</span>
                           </div>
                           <div className="bg-white/5 p-3 rounded-xl">
                               <span className="block text-xs text-gray-400">Power Planet</span>
                               <span className="font-bold text-yellow-300">{result.powerPlanet}</span>
                           </div>
                      </div>
                  </div>
              </div>
          </div>
      );
  }

  return (
    <div className="p-6 max-w-lg mx-auto h-full flex flex-col justify-center">
        <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">Create Birth Map</h2>
            <p className="text-purple-200 text-sm">Enter your details to reveal your sky guardians! (Don't worry, this data stays on your device)</p>
        </div>

        <form onSubmit={handleGenerate} className="bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/10 space-y-4">
            <div>
                <label className="block text-xs font-bold text-purple-300 mb-1 ml-1">Hero Name</label>
                <input 
                    type="text" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors"
                    placeholder="Enter your name"
                />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-xs font-bold text-purple-300 mb-1 ml-1"><Calendar size={12} className="inline mr-1"/>Date</label>
                    <input 
                        type="date" 
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 text-sm"
                        required
                    />
                </div>
                <div>
                    <label className="block text-xs font-bold text-purple-300 mb-1 ml-1"><Clock size={12} className="inline mr-1"/>Time</label>
                    <input 
                        type="time" 
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 text-sm"
                    />
                </div>
            </div>

            <div>
                <label className="block text-xs font-bold text-purple-300 mb-1 ml-1"><MapPin size={12} className="inline mr-1"/>Birth City</label>
                <input 
                    type="text" 
                    value={place}
                    onChange={(e) => setPlace(e.target.value)}
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors"
                    placeholder="e.g. Mumbai, India"
                    required
                />
            </div>

            <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold py-4 rounded-xl shadow-lg shadow-purple-900/50 transition-all transform hover:scale-[1.02] flex items-center justify-center gap-2 mt-4"
            >
                {loading ? <Loader2 className="animate-spin" /> : <><Star className="fill-current" size={18}/> Reveal My Sky Map</>}
            </button>
        </form>
    </div>
  );
};

export default BirthSkyMap;