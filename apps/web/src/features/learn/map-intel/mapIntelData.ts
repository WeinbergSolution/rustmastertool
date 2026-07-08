export interface MonumentCategory {
  id: string;
  name: string;
  description: string;
}

export interface MapMonument {
  id: string;
  name: string;
  categoryId: string;
  explanation: string;
  advantages: string[];
  disadvantages: string[];
  lootRelevance: string;
  radiationInfo: string;
  keycardsRequired: string[];
  quickTip: string;
  imageUrl?: string;
}

export const MONUMENT_CATEGORIES: MonumentCategory[] = [
  { id: 'safe_zone', name: 'Safe Zones', description: 'No-combat zones for trading and resting.' },
  { id: 'tier_1', name: 'Tier 1 (Low)', description: 'Low radiation, basic loot, green cards. Ideal for fresh spawns.' },
  { id: 'tier_2', name: 'Tier 2 (Medium)', description: 'Medium radiation, better loot, blue cards. Mid-game hubs.' },
  { id: 'tier_3', name: 'Tier 3 (High)', description: 'High radiation, top-tier loot, red cards. Endgame monuments.' },
  { id: 'offshore', name: 'Offshore', description: 'Oil Rigs and Underwater Labs.' }
];

export const MAP_MONUMENTS: MapMonument[] = [
  {
    id: 'outpost',
    name: 'Outpost',
    categoryId: 'safe_zone',
    explanation: 'A large, heavily guarded safe zone where players can trade resources, refine oil, and buy items.',
    advantages: ['Safe trading', 'Public recyclers', 'Vending machines for critical items'],
    disadvantages: ['High traffic area', 'Hostile if you carry weapons or deal damage nearby'],
    lootRelevance: 'No direct loot, but crucial for acquiring resources via trade (Stone/Wood, Scrap).',
    radiationInfo: 'None.',
    keycardsRequired: [],
    quickTip: 'Always unequip your weapons before entering the aggro radius to avoid being killed by turrets.',
  },
  {
    id: 'bandit_camp',
    name: 'Bandit Camp',
    categoryId: 'safe_zone',
    explanation: 'A swamp-based safe zone featuring a casino, black market vendors, and public utilities.',
    advantages: ['Gambling (Scrap wheel)', 'Black market items (weapons)', 'Recyclers'],
    disadvantages: ['Laggy for some PCs', 'Easier to get roof-camped near the edges compared to Outpost'],
    lootRelevance: 'Trading and Scrap multiplication via gambling.',
    radiationInfo: 'None.',
    keycardsRequired: [],
    quickTip: 'You can buy a Mini-copter or Scrap Transport Helicopter here.',
  },
  {
    id: 'gas_station',
    name: 'Oxum\'s Gas Station',
    categoryId: 'tier_1',
    explanation: 'A small abandoned gas station. Great for early-game players looking for quick scrap.',
    advantages: ['Easy to loot', 'Contains a Green Keycard', 'Public Recycler'],
    disadvantages: ['Very popular among fresh spawns', 'Low tier loot overall'],
    lootRelevance: 'Provides basic crates, food, and a Green Keycard.',
    radiationInfo: 'Minor radiation inside the garage in some iterations (usually none).',
    keycardsRequired: [],
    quickTip: 'Check the office desk for the Green Keycard, and the roof for military crates.',
  },
  {
    id: 'supermarket',
    name: 'Abandoned Supermarket',
    categoryId: 'tier_1',
    explanation: 'A decayed grocery store with basic loot and a recycler.',
    advantages: ['Green Keycard spawn', 'Recycler in the back', 'Food boxes'],
    disadvantages: ['High traffic for nakeds', 'Very exposed from the outside'],
    lootRelevance: 'Good source of food and basic scrap.',
    radiationInfo: 'None.',
    keycardsRequired: [],
    quickTip: 'Climb the shelves or the roof for hidden crates.',
  },
  {
    id: 'dome',
    name: 'The Dome',
    categoryId: 'tier_2',
    explanation: 'A massive spherical industrial ruin. Requires parkour to reach the top.',
    advantages: ['4 Military Crates at the top', 'No keycards needed', 'High density of crude oil barrels'],
    disadvantages: ['Parkour can be deadly if you fall', 'Snipers can easily target you while you climb'],
    lootRelevance: 'Excellent mid-game loot for no keycard investment.',
    radiationInfo: 'Low radiation (Hazmat suit or basic clothing required).',
    keycardsRequired: [],
    quickTip: 'Practice the jumps on a creative server. Bring meds in case you take fall damage.',
  },
  {
    id: 'water_treatment',
    name: 'Water Treatment Plant',
    categoryId: 'tier_2',
    explanation: 'A sprawling facility with a Blue card puzzle and many jump puzzles.',
    advantages: ['Huge amount of scattered loot', 'Blue keycard puzzle rewards Red card', 'Multiple recyclers'],
    disadvantages: ['Very large area, hard to defend', 'Lots of hiding spots for grubs'],
    lootRelevance: 'High volume of crates, great for scrap runs and getting a Red Keycard.',
    radiationInfo: 'Medium. Hazmat suit recommended. Inside the main building has higher rads.',
    keycardsRequired: ['green', 'blue'],
    quickTip: 'You can access a lot of crates via the jump puzzles without needing any keycards.',
  },
  {
    id: 'launch_site',
    name: 'Launch Site',
    categoryId: 'tier_3',
    explanation: 'The ultimate mainland monument. Features the Bradley APC boss and a massive Red card puzzle.',
    advantages: ['Elite crates at the top of the main building', 'Bradley APC drops high-tier loot', 'Huge scrap potential'],
    disadvantages: ['Extremely high radiation', 'Guarded by Bradley APC', 'PVP hotspot for clans'],
    lootRelevance: 'Endgame loot, C4, rockets, and high-tier weapons.',
    radiationInfo: 'Extreme. Hazmat suit AND water jug/pills required to survive the main building.',
    keycardsRequired: ['green', 'red'],
    quickTip: 'Wait for the Bradley to be on the other side before crossing the open areas.',
  },
  {
    id: 'large_oil_rig',
    name: 'Large Oil Rig',
    categoryId: 'offshore',
    explanation: 'A massive offshore drilling platform guarded by scientists. Features a locked crate event.',
    advantages: ['Locked crate guarantees high-tier loot', 'Heavy scientists drop good weapons', 'Isolated from fresh spawns'],
    disadvantages: ['Can only approach by boat or heli', 'Counters can easily trap you on the rig'],
    lootRelevance: 'Endgame. Best place to get Tier 3 weapons and armor.',
    radiationInfo: 'None by default, but radiation hits the rig if players stay too long after the crate unlocks.',
    keycardsRequired: ['green', 'blue', 'red'],
    quickTip: 'Hold the crane or the helipad to defend against counters.',
  }
];
