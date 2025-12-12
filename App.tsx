import React, { useState } from 'react';
import { Screen, PlayerState } from './types';
import Layout from './components/Layout';
import StarryBackground from './components/StarryBackground';

// Views
import CosmicHub from './views/CosmicHub';
import SkyPlayground from './views/SkyPlayground';
import ZodiacExplorer from './views/ZodiacExplorer';
import PlanetWorlds from './views/PlanetWorlds';
import BirthSkyMap from './views/BirthSkyMap';
import ParentDashboard from './views/ParentDashboard';
import NakshatraVillage from './views/NakshatraVillage';

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>(Screen.HUB);
  const [playerState, setPlayerState] = useState<PlayerState>({
    shards: 150,
    unlockedWorlds: ['Earth'],
    badges: ['Explorer'],
    name: '',
  });

  const addReward = (amount: number) => {
      setPlayerState(prev => ({
          ...prev,
          shards: prev.shards + amount
      }));
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case Screen.HUB:
        return <CosmicHub setScreen={setCurrentScreen} />;
      case Screen.SKY_PLAYGROUND:
        return <SkyPlayground onReward={addReward} />;
      case Screen.ZODIAC_REALMS:
        return <ZodiacExplorer onReward={addReward} />;
      case Screen.PLANET_WORLDS:
        return <PlanetWorlds onReward={addReward} />;
      case Screen.NAKSHATRA_VILLAGE:
        return <NakshatraVillage onReward={addReward} />;
      case Screen.BIRTH_MAP:
        return <BirthSkyMap />;
      case Screen.PARENT_MODE:
        return <ParentDashboard />;
      default:
        return <CosmicHub setScreen={setCurrentScreen} />;
    }
  };

  return (
    <>
      <StarryBackground />
      <Layout currentScreen={currentScreen} setScreen={setCurrentScreen} playerState={playerState}>
        {renderScreen()}
      </Layout>
    </>
  );
};

export default App;