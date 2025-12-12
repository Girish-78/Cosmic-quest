import React from 'react';
import { Screen } from '../types';
import { Play, BookOpen, Shield, Users } from 'lucide-react';

interface CosmicHubProps {
  setScreen: (s: Screen) => void;
}

const CosmicHub: React.FC<CosmicHubProps> = ({ setScreen }) => {
  const HubCard = ({ title, desc, screen, color, icon: Icon }: { title: string, desc: string, screen: Screen, color: string, icon: any }) => (
    <button 
      onClick={() => setScreen(screen)}
      className={`relative group overflow-hidden p-6 rounded-3xl text-left transition-all duration-300 transform hover:scale-105 hover:shadow-2xl border border-white/20 ${color}`}
    >
      <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:scale-150 transition-transform duration-500">
        <Icon size={100} />
      </div>
      <div className="relative z-10">
        <div className="bg-white/20 w-12 h-12 rounded-full flex items-center justify-center mb-4 backdrop-blur-sm">
          <Icon size={24} className="text-white" />
        </div>
        <h2 className="text-2xl font-bold mb-1 text-white shadow-black drop-shadow-lg">{title}</h2>
        <p className="text-white/90 text-sm font-medium">{desc}</p>
        <div className="mt-4 inline-flex items-center gap-2 text-xs font-bold bg-white/20 px-3 py-1 rounded-full uppercase tracking-wider">
           Play Now <Play size={10} fill="currentColor" />
        </div>
      </div>
    </button>
  );

  return (
    <div className="p-6 max-w-4xl mx-auto w-full">
      <div className="text-center mb-8 animate-float">
        <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-pink-400 to-purple-400 drop-shadow-sm">
          Cosmic Clock Hub
        </h1>
        <p className="text-purple-200 mt-2">Restore the balance of the universe, Detective!</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <HubCard 
          title="Sky Playground" 
          desc="Build the Solar System & watch planets orbit."
          screen={Screen.SKY_PLAYGROUND}
          color="bg-gradient-to-br from-blue-600 to-indigo-800"
          icon={Play}
        />
        <HubCard 
          title="Zodiac Realms" 
          desc="Meet the 12 Guardians and find constellations."
          screen={Screen.ZODIAC_REALMS}
          color="bg-gradient-to-br from-purple-600 to-pink-700"
          icon={Shield}
        />
        <HubCard 
          title="Planet Worlds" 
          desc="Visit the 9 Grahas and learn their powers."
          screen={Screen.PLANET_WORLDS}
          color="bg-gradient-to-br from-orange-500 to-red-600"
          icon={BookOpen}
        />
        <HubCard 
          title="Nakshatra Village" 
          desc="Explore the 27 Star Villages."
          screen={Screen.NAKSHATRA_VILLAGE}
          color="bg-gradient-to-br from-emerald-500 to-teal-700"
          icon={Users}
        />
      </div>

      <div className="mt-8 flex justify-center">
        <button 
           onClick={() => setScreen(Screen.PARENT_MODE)}
           className="px-6 py-2 bg-white/5 border border-white/10 rounded-full text-sm text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
        >
          Enter Parent Mode
        </button>
      </div>
    </div>
  );
};

export default CosmicHub;