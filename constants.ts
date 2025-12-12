import { PlanetData, ZodiacSign, Nakshatra, SolarSystemPlanet } from './types';

// Indian Astrology Planets (Navagrahas)
export const PLANETS: PlanetData[] = [
  { id: 'sun', name: 'Sun', sanskritName: 'Surya', color: '#FDB813', description: 'The King of the Planets. Full of energy and light!', icon: '☀️', size: 60, orbitSpeed: 0 },
  { id: 'moon', name: 'Moon', sanskritName: 'Chandra', color: '#F4F6F0', description: 'The Queen. Rules emotions and mind.', icon: '🌙', size: 25, orbitSpeed: 1 },
  { id: 'mars', name: 'Mars', sanskritName: 'Mangal', color: '#E27B58', description: 'The Warrior. Full of action and courage.', icon: '🔴', size: 30, orbitSpeed: 2 },
  { id: 'mercury', name: 'Mercury', sanskritName: 'Budh', color: '#A5C9CA', description: 'The Messenger. Smart and quick.', icon: '☿️', size: 20, orbitSpeed: 4 },
  { id: 'jupiter', name: 'Jupiter', sanskritName: 'Guru', color: '#D4AF37', description: 'The Teacher. Brings luck and wisdom.', icon: '♃', size: 50, orbitSpeed: 10 },
  { id: 'venus', name: 'Venus', sanskritName: 'Shukra', color: '#E6A9EC', description: 'The Artist. Loves beauty and fun.', icon: '♀️', size: 30, orbitSpeed: 3 },
  { id: 'saturn', name: 'Saturn', sanskritName: 'Shani', color: '#5C5C5C', description: 'The Judge. Teaches discipline and hard work.', icon: '🪐', size: 45, orbitSpeed: 25 },
  { id: 'rahu', name: 'Rahu', sanskritName: 'Rahu', color: '#4B0082', description: 'The Shadow. Mysterious and ambitious.', icon: '🐲', size: 35, orbitSpeed: 18 },
  { id: 'ketu', name: 'Ketu', sanskritName: 'Ketu', color: '#8B0000', description: 'The Tail. Spiritual and detached.', icon: '🐉', size: 35, orbitSpeed: 18 },
];

// Real Astronomy Solar System
export const SOLAR_SYSTEM: SolarSystemPlanet[] = [
  { 
    id: 'mercury', name: 'Mercury', color: '#A5C9CA', icon: '☿️', size: 15, orbitSpeed: 4, 
    description: 'The smallest planet closest to the Sun.',
    orbitPeriod: '88 Days', moons: 0, atmosphere: 'Thin (Oxygen, Sodium)', composition: 'Rocky', temperature: '167°C',
    funFact: 'A year on Mercury is shorter than a day on Mercury!'
  },
  { 
    id: 'venus', name: 'Venus', color: '#E6A9EC', icon: '♀️', size: 35, orbitSpeed: 3, 
    description: 'The hottest planet wrapped in thick clouds.',
    orbitPeriod: '225 Days', moons: 0, atmosphere: 'Thick Carbon Dioxide', composition: 'Rocky', temperature: '464°C',
    funFact: 'Venus spins backwards compared to other planets!'
  },
  { 
    id: 'earth', name: 'Earth', color: '#4F86F7', icon: '🌍', size: 36, orbitSpeed: 2.5, 
    description: 'Our home! The Blue Planet.',
    orbitPeriod: '365 Days', moons: 1, atmosphere: 'Nitrogen, Oxygen', composition: 'Rocky & Water', temperature: '15°C',
    funFact: 'Earth is the only known planet with life.'
  },
  { 
    id: 'mars', name: 'Mars', color: '#E27B58', icon: '🔴', size: 20, orbitSpeed: 2, 
    description: 'The Red Planet with giant volcanoes.',
    orbitPeriod: '687 Days', moons: 2, atmosphere: 'Carbon Dioxide', composition: 'Rocky & Dusty', temperature: '-65°C',
    funFact: 'Mars has the tallest volcano in the solar system, Olympus Mons.'
  },
  { 
    id: 'jupiter', name: 'Jupiter', color: '#D4AF37', icon: '♃', size: 80, orbitSpeed: 1, 
    description: 'The King of Planets. A giant gas ball.',
    orbitPeriod: '12 Years', moons: 95, atmosphere: 'Hydrogen, Helium', composition: 'Gas Giant', temperature: '-110°C',
    funFact: 'The Great Red Spot is a storm bigger than Earth!'
  },
  { 
    id: 'saturn', name: 'Saturn', color: '#F4D03F', icon: '🪐', size: 70, orbitSpeed: 0.8, 
    description: 'Famous for its beautiful rings.',
    orbitPeriod: '29 Years', moons: 146, atmosphere: 'Hydrogen, Helium', composition: 'Gas Giant', temperature: '-140°C',
    funFact: 'Saturn could float in a giant bathtub of water.'
  },
  { 
    id: 'uranus', name: 'Uranus', color: '#73C6B6', icon: '♅', size: 50, orbitSpeed: 0.5, 
    description: 'The Ice Giant that spins on its side.',
    orbitPeriod: '84 Years', moons: 27, atmosphere: 'Hydrogen, Helium, Methane', composition: 'Ice Giant', temperature: '-195°C',
    funFact: 'It is the coldest planet in the solar system.'
  },
  { 
    id: 'neptune', name: 'Neptune', color: '#2E86C1', icon: '♆', size: 48, orbitSpeed: 0.4, 
    description: 'The windy, blue Ice Giant far away.',
    orbitPeriod: '165 Years', moons: 14, atmosphere: 'Hydrogen, Helium, Methane', composition: 'Ice Giant', temperature: '-200°C',
    funFact: 'Neptune has the strongest winds in the solar system.'
  },
];

export const ZODIAC_SIGNS: ZodiacSign[] = [
  { 
    id: 'aries', name: 'Aries', sanskritName: 'Mesha', element: 'Fire', symbol: '♈', guardian: 'The Ram', 
    traits: ['Brave', 'Active'], description: 'Always ready for an adventure!',
    brightestStar: 'Hamal', bestViewingSeason: 'Autumn', 
    astronomyFact: 'The star Hamal is an orange giant, twice as massive as our Sun!',
    constellationStars: [{id:1, x:20, y:60}, {id:2, x:40, y:50}, {id:3, x:60, y:45}, {id:4, x:80, y:30}],
    trivia: { question: "What animal represents Aries?", options: ["Lion", "Ram", "Fish"], correctAnswer: 1 }
  },
  { 
    id: 'taurus', name: 'Taurus', sanskritName: 'Vrishabha', element: 'Earth', symbol: '♉', guardian: 'The Bull', 
    traits: ['Strong', 'Patient'], description: 'Loves yummy food and comfort.',
    brightestStar: 'Aldebaran', bestViewingSeason: 'Winter',
    astronomyFact: 'Aldebaran is the "Bull\'s Eye" and glows red!',
    constellationStars: [{id:1, x:30, y:70}, {id:2, x:45, y:60}, {id:3, x:60, y:55}, {id:4, x:75, y:40}, {id:5, x:50, y:30}, {id:6, x:25, y:40}],
    trivia: { question: "Taurus is an ____ sign.", options: ["Air", "Earth", "Fire"], correctAnswer: 1 }
  },
  { 
    id: 'gemini', name: 'Gemini', sanskritName: 'Mithuna', element: 'Air', symbol: '♊', guardian: 'The Twins', 
    traits: ['Smart', 'Chatty'], description: 'Curious about everything!',
    brightestStar: 'Pollux', bestViewingSeason: 'Winter',
    astronomyFact: 'Castor and Pollux are the "Twin stars" at the head of the constellation.',
    constellationStars: [{id:1, x:30, y:30}, {id:2, x:30, y:70}, {id:3, x:70, y:30}, {id:4, x:70, y:70}, {id:5, x:50, y:50}],
    trivia: { question: "Gemini is represented by...", options: ["The Twins", "The Scales", "The Crab"], correctAnswer: 0 }
  },
  { 
    id: 'cancer', name: 'Cancer', sanskritName: 'Karka', element: 'Water', symbol: '♋', guardian: 'The Crab', 
    traits: ['Caring', 'Loving'], description: 'Protects friends and family.',
    brightestStar: 'Altarf', bestViewingSeason: 'Spring',
    astronomyFact: 'Cancer is one of the faintest constellations, hard to see in the city!',
    constellationStars: [{id:1, x:50, y:50}, {id:2, x:20, y:80}, {id:3, x:80, y:80}, {id:4, x:50, y:20}],
    trivia: { question: "Which element is Cancer?", options: ["Fire", "Water", "Earth"], correctAnswer: 1 }
  },
  { 
    id: 'leo', name: 'Leo', sanskritName: 'Simha', element: 'Fire', symbol: '♌', guardian: 'The Lion', 
    traits: ['Leader', 'Proud'], description: 'Shines bright like the Sun.',
    brightestStar: 'Regulus', bestViewingSeason: 'Spring',
    astronomyFact: 'Regulus means "Little King". It sits at the heart of the Lion.',
    constellationStars: [{id:1, x:70, y:60}, {id:2, x:50, y:80}, {id:3, x:30, y:60}, {id:4, x:40, y:40}, {id:5, x:50, y:30}, {id:6, x:65, y:20}],
    trivia: { question: "The bright star Regulus is in...", options: ["Leo", "Virgo", "Pisces"], correctAnswer: 0 }
  },
  { 
    id: 'virgo', name: 'Virgo', sanskritName: 'Kanya', element: 'Earth', symbol: '♍', guardian: 'The Maiden', 
    traits: ['Helpful', 'Neat'], description: 'Loves to solve puzzles.',
    brightestStar: 'Spica', bestViewingSeason: 'Spring',
    astronomyFact: 'Spica is a bright blue giant star, 260 light-years away!',
    constellationStars: [{id:1, x:50, y:20}, {id:2, x:30, y:40}, {id:3, x:30, y:70}, {id:4, x:50, y:80}, {id:5, x:70, y:70}, {id:6, x:70, y:40}],
    trivia: { question: "Virgo's symbol is...", options: ["The Lion", "The Maiden", "The Archer"], correctAnswer: 1 }
  },
  { 
    id: 'libra', name: 'Libra', sanskritName: 'Tula', element: 'Air', symbol: '♎', guardian: 'The Scales', 
    traits: ['Fair', 'Friendly'], description: 'Wants everyone to be happy.',
    brightestStar: 'Zubeneschamali', bestViewingSeason: 'Summer',
    astronomyFact: 'This is the only zodiac sign that is an object (scales), not an animal or person!',
    constellationStars: [{id:1, x:50, y:20}, {id:2, x:20, y:50}, {id:3, x:80, y:50}, {id:4, x:50, y:80}],
    trivia: { question: "What does Libra measure?", options: ["Balance", "Temperature", "Speed"], correctAnswer: 0 }
  },
  { 
    id: 'scorpio', name: 'Scorpio', sanskritName: 'Vrishchika', element: 'Water', symbol: '♏', guardian: 'The Scorpion', 
    traits: ['Secretive', 'Deep'], description: 'Full of mystery and power.',
    brightestStar: 'Antares', bestViewingSeason: 'Summer',
    astronomyFact: 'Antares is a red supergiant star. Its name means "Rival of Mars".',
    constellationStars: [{id:1, x:80, y:20}, {id:2, x:70, y:40}, {id:3, x:60, y:50}, {id:4, x:50, y:60}, {id:5, x:40, y:70}, {id:6, x:20, y:60}],
    trivia: { question: "Antares is a star that looks...", options: ["Blue", "Red", "Green"], correctAnswer: 1 }
  },
  { 
    id: 'sagittarius', name: 'Sagittarius', sanskritName: 'Dhanu', element: 'Fire', symbol: '♐', guardian: 'The Archer', 
    traits: ['Fun', 'Honest'], description: 'Loves to travel far away.',
    brightestStar: 'Kaus Australis', bestViewingSeason: 'Summer',
    astronomyFact: 'The center of our Milky Way galaxy is located in the direction of Sagittarius!',
    constellationStars: [{id:1, x:30, y:70}, {id:2, x:70, y:70}, {id:3, x:80, y:50}, {id:4, x:50, y:20}, {id:5, x:20, y:50}],
    trivia: { question: "Sagittarius looks like a...", options: ["Teapot", "Box", "Circle"], correctAnswer: 0 }
  },
  { 
    id: 'capricorn', name: 'Capricorn', sanskritName: 'Makara', element: 'Earth', symbol: '♑', guardian: 'The Sea-Goat', 
    traits: ['Hardworking', 'Wise'], description: 'Climbs the highest mountains.',
    brightestStar: 'Deneb Algedi', bestViewingSeason: 'Autumn',
    astronomyFact: 'Capricorn is one of the oldest known constellations.',
    constellationStars: [{id:1, x:20, y:20}, {id:2, x:50, y:50}, {id:3, x:80, y:20}, {id:4, x:50, y:80}],
    trivia: { question: "Capricorn represents a...", options: ["Sea-Goat", "Water Bearer", "Ram"], correctAnswer: 0 }
  },
  { 
    id: 'aquarius', name: 'Aquarius', sanskritName: 'Kumbha', element: 'Air', symbol: '♒', guardian: 'The Water Bearer', 
    traits: ['Unique', 'Kind'], description: 'Invents new cool things.',
    brightestStar: 'Sadalsuud', bestViewingSeason: 'Autumn',
    astronomyFact: 'Sadalsuud means "Luck of Lucks". It is a rare yellow supergiant.',
    constellationStars: [{id:1, x:20, y:30}, {id:2, x:35, y:50}, {id:3, x:50, y:30}, {id:4, x:65, y:50}, {id:5, x:80, y:30}],
    trivia: { question: "Aquarius is an ____ sign.", options: ["Water", "Air", "Earth"], correctAnswer: 1 }
  },
  { 
    id: 'pisces', name: 'Pisces', sanskritName: 'Meena', element: 'Water', symbol: '♓', guardian: 'The Fish', 
    traits: ['Dreamy', 'Artistic'], description: 'Lost in a world of imagination.',
    brightestStar: 'Alpherg', bestViewingSeason: 'Autumn',
    astronomyFact: 'Pisces is two fish tied together by a cord so they don’t get lost!',
    constellationStars: [{id:1, x:20, y:20}, {id:2, x:40, y:50}, {id:3, x:20, y:80}, {id:4, x:80, y:50}],
    trivia: { question: "How many fish are in Pisces?", options: ["One", "Two", "Three"], correctAnswer: 1 }
  },
];

export const NAKSHATRAS: Nakshatra[] = [
  { 
    id: 1, name: 'Ashwini', symbol: 'Horse Head', animal: 'Horse', meaning: 'The Star of Transport', deity: 'Ashwini Kumaras',
    task: { question: "What is the animal symbol for Ashwini?", options: ["Elephant", "Horse", "Snake"], correctAnswer: 1 }
  },
  { 
    id: 2, name: 'Bharani', symbol: 'Yoni', animal: 'Elephant', meaning: 'The Star of Restraint', deity: 'Yama',
    task: { question: "Who is the deity of Bharani?", options: ["Agni", "Yama", "Indra"], correctAnswer: 1 }
  },
  { 
    id: 3, name: 'Krittika', symbol: 'Knife', animal: 'Sheep', meaning: 'The Star of Fire', deity: 'Agni',
    task: { question: "Krittika is known as the Star of...", options: ["Water", "Fire", "Wind"], correctAnswer: 1 }
  },
  { 
    id: 4, name: 'Rohini', symbol: 'Chariot', animal: 'Serpent', meaning: 'The Star of Ascent', deity: 'Brahma',
    task: { question: "What vehicle represents Rohini?", options: ["Car", "Boat", "Chariot"], correctAnswer: 2 }
  },
  { 
    id: 5, name: 'Mrigashira', symbol: 'Deer Head', animal: 'Serpent', meaning: 'The Searching Star', deity: 'Soma',
    task: { question: "Mrigashira is represented by the head of a...", options: ["Lion", "Deer", "Eagle"], correctAnswer: 1 }
  },
  { 
    id: 6, name: 'Ardra', symbol: 'Teardrop', animal: 'Dog', meaning: 'The Star of Sorrow', deity: 'Rudra',
    task: { question: "The symbol for Ardra is a...", options: ["Smile", "Teardrop", "Sun"], correctAnswer: 1 }
  },
  { 
    id: 7, name: 'Punarvasu', symbol: 'Bow & Quiver', animal: 'Cat', meaning: 'The Star of Renewal', deity: 'Aditi',
    task: { question: "Punarvasu brings...", options: ["Renewal", "Storms", "Darkness"], correctAnswer: 0 }
  },
  { 
    id: 27, name: 'Revati', symbol: 'Drum', animal: 'Elephant', meaning: 'The Wealthy Star', deity: 'Pushan',
    task: { question: "Revati is the ___ Nakshatra.", options: ["First", "Last (27th)", "Middle"], correctAnswer: 1 }
  },
];

export const ELEMENT_COLORS = {
  Fire: 'from-red-500 to-orange-500',
  Earth: 'from-green-500 to-emerald-700',
  Air: 'from-blue-300 to-indigo-400',
  Water: 'from-blue-600 to-cyan-400',
};