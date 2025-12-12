export enum Screen {
  HUB = 'HUB',
  SKY_PLAYGROUND = 'SKY_PLAYGROUND',
  ZODIAC_REALMS = 'ZODIAC_REALMS',
  PLANET_WORLDS = 'PLANET_WORLDS',
  NAKSHATRA_VILLAGE = 'NAKSHATRA_VILLAGE',
  BIRTH_MAP = 'BIRTH_MAP',
  PARENT_MODE = 'PARENT_MODE',
}

export interface PlanetData {
  id: string;
  name: string;
  sanskritName: string;
  color: string;
  description: string;
  icon: string;
  size: number; // Relative size for visual
  orbitSpeed: number; // Relative speed
}

export interface SolarSystemPlanet {
  id: string;
  name: string;
  color: string;
  icon: string;
  size: number;
  orbitSpeed: number;
  description: string;
  orbitPeriod: string;
  moons: number;
  atmosphere: string;
  composition: string;
  temperature: string;
  funFact: string;
}

export interface StarCoordinate {
  id: number;
  x: number; // 0-100%
  y: number; // 0-100%
}

export interface TriviaQuestion {
  question: string;
  options: string[];
  correctAnswer: number; // Index
}

export interface ZodiacSign {
  id: string;
  name: string;
  sanskritName: string;
  element: 'Fire' | 'Earth' | 'Air' | 'Water';
  symbol: string;
  guardian: string;
  traits: string[];
  description: string;
  // New Astronomy Info
  brightestStar: string;
  bestViewingSeason: string;
  astronomyFact: string;
  constellationStars: StarCoordinate[];
  trivia: TriviaQuestion;
}

export interface NakshatraTask {
  question: string;
  options: string[];
  correctAnswer: number;
}

export interface Nakshatra {
  id: number;
  name: string;
  symbol: string;
  animal: string;
  meaning: string;
  deity: string;
  task?: NakshatraTask; 
}

export interface PlayerState {
  shards: number;
  unlockedWorlds: string[];
  badges: string[];
  name: string;
}

export interface BirthChartSummary {
  sunSign: string;
  moonSign: string;
  ascendant: string;
  luckyElement: string;
  powerPlanet: string;
  kidSummary: string;
}