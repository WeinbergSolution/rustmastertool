export interface MonumentInfo {
  id: string;
  label: string;
  category: 'Safe / Social' | 'Keycard / Progression' | 'Ocean / Water' | 'Resource / Utility' | 'Other';
  aliases: string[];
}

export const MONUMENTS: MonumentInfo[] = [
  // Safe / Social
  { id: 'outpost', label: 'Outpost', category: 'Safe / Social', aliases: ['outpost', 'compound'] },
  { id: 'bandit_camp', label: 'Bandit Camp', category: 'Safe / Social', aliases: ['bandit camp', 'bandit_camp', 'bandit town'] },
  { id: 'fishing_village', label: 'Fishing Village', category: 'Safe / Social', aliases: ['fishing village', 'fishing_village', 'large fishing village', 'small fishing village'] },

  // Keycard / Progression
  { id: 'launch_site', label: 'Launch Site', category: 'Keycard / Progression', aliases: ['launch site', 'launch_site'] },
  { id: 'military_tunnels', label: 'Military Tunnels', category: 'Keycard / Progression', aliases: ['military tunnels', 'military_tunnels', 'military tunnel'] },
  { id: 'airfield', label: 'Airfield', category: 'Keycard / Progression', aliases: ['airfield'] },
  { id: 'power_plant', label: 'Power Plant', category: 'Keycard / Progression', aliases: ['power plant', 'powerplant', 'power_plant'] },
  { id: 'train_yard', label: 'Train Yard', category: 'Keycard / Progression', aliases: ['train yard', 'trainyard', 'train_yard'] },
  { id: 'water_treatment', label: 'Water Treatment', category: 'Keycard / Progression', aliases: ['water treatment', 'water treatment plant', 'water_treatment'] },
  { id: 'sewer_branch', label: 'Sewer Branch', category: 'Keycard / Progression', aliases: ['sewer branch', 'sewer_branch'] },
  { id: 'satellite_dish', label: 'Satellite Dish', category: 'Keycard / Progression', aliases: ['satellite dish', 'satellite_dish'] },

  // Ocean / Water
  { id: 'large_oil_rig', label: 'Large Oil Rig', category: 'Ocean / Water', aliases: ['large oil rig', 'large_oil_rig'] },
  { id: 'small_oil_rig', label: 'Small Oil Rig', category: 'Ocean / Water', aliases: ['small oil rig', 'small_oil_rig', 'oil rig'] },
  { id: 'harbor', label: 'Harbor', category: 'Ocean / Water', aliases: ['harbor', 'large harbor', 'small harbor', 'harbour'] },
  { id: 'underwater_labs', label: 'Underwater Labs', category: 'Ocean / Water', aliases: ['underwater labs', 'underwater_labs', 'underwater lab'] },
  { id: 'ferry_terminal', label: 'Ferry Terminal', category: 'Ocean / Water', aliases: ['ferry terminal', 'ferry_terminal'] },

  // Resource / Utility
  { id: 'excavator', label: 'Giant Excavator', category: 'Resource / Utility', aliases: ['giant excavator', 'excavator', 'giant excavator pit'] },
  { id: 'junkyard', label: 'Junkyard', category: 'Resource / Utility', aliases: ['junkyard'] },
  { id: 'dome', label: 'The Dome', category: 'Resource / Utility', aliases: ['the dome', 'dome', 'sphere tank'] },
  { id: 'arctic_base', label: 'Arctic Research Base', category: 'Resource / Utility', aliases: ['arctic research base', 'arctic base', 'arctic_base'] },
  { id: 'abandoned_military_base', label: 'Abandoned Military Base', category: 'Resource / Utility', aliases: ['abandoned military base', 'desert base', 'abandoned_military_base'] },
  { id: 'missile_silo', label: 'Missile Silo', category: 'Resource / Utility', aliases: ['missile silo', 'missile_silo', 'silo'] }
];

export function normalizeMonumentName(rawName: string): string | null {
  const normalized = rawName.toLowerCase().trim();
  for (const monument of MONUMENTS) {
    if (monument.aliases.some(alias => normalized.includes(alias))) {
      return monument.id;
    }
  }
  return null;
}
