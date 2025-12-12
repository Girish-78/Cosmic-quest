import React from 'react';
import { Screen, PlayerState } from '../types';
import { Home, Sun, Star, Map, User, Sparkles } from 'lucide-react';

interface LayoutProps {
  currentScreen: Screen;
  setScreen: (s: Screen) => void;
  playerState: PlayerState;
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ currentScreen, setScreen, playerState, children }) => {
  const NavButton = ({ target, icon: Icon, label }: { target: Screen; icon: any; label: string }) => (
    <button
      onClick={() => setScreen(target)}
      className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-all duration-300 min-w-[60px] ${
        currentScreen === target ? 'bg-purple-600/80 text-white scale-105 shadow-lg shadow-purple-500/20' : 'text-purple-300 hover:text-white hover:bg-white/5'
      }`}
    >
      <Icon size={20} strokeWidth={2} />
      <span className="text-[10px] mt-0.5 font-medium leading-tight">{label}</span>
    </button>
  );

  return (
    <div className="relative w-full h-screen flex flex-col overflow-hidden bg-[#0f0c29]">
      {/* Top Bar - Compact */}
      <div className="flex justify-between items-center px-4 py-2 bg-black/30 backdrop-blur-sm z-40 border-b border-white/5 shrink-0">
        <div className="flex items-center gap-2">
           <div className="w-8 h-8 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center font-bold text-sm shadow-lg border-2 border-white text-black shrink-0">
             CQ
           </div>
           <div>
             <h1 className="text-sm font-bold leading-none text-white drop-shadow-md">Cosmic Quest</h1>
             <p className="text-[10px] text-purple-200">Sky Detective</p>
           </div>
        </div>

        <div className="flex items-center gap-4">
           <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1 rounded-full border border-white/20">
             <Sparkles className="text-yellow-400 fill-yellow-400" size={12} />
             <span className="font-bold text-yellow-100 text-xs">
                {playerState.shards} <span className="text-white/50">/ 1000</span>
             </span>
           </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto overflow-x-hidden relative scroll-smooth w-full">
        {children}
      </main>

      {/* Bottom Navigation - Compact & Darker background for visibility */}
      <div className="px-2 py-2 bg-[#120f2e] backdrop-blur-xl border-t border-white/10 z-40 shrink-0 pb-safe">
        <div className="flex justify-around items-center max-w-lg mx-auto">
          <NavButton target={Screen.HUB} icon={Home} label="Hub" />
          <NavButton target={Screen.SKY_PLAYGROUND} icon={Sun} label="Sky" />
          <NavButton target={Screen.ZODIAC_REALMS} icon={Star} label="Zodiac" />
          <NavButton target={Screen.PLANET_WORLDS} icon={Map} label="Planets" />
          <NavButton target={Screen.BIRTH_MAP} icon={User} label="My Sky" />
        </div>
      </div>
    </div>
  );
};

export default Layout;