export type RaidTargetId = 
  | 'wood_door' | 'metal_door' | 'garage_door' | 'armored_door'
  | 'wood_wall' | 'stone_wall' | 'metal_wall' | 'armored_wall'
  | 'window_glass' | 'window_bars' | 'tc' | 'turret';

export type ResourceId = 
  | 'sulfur' | 'charcoal' | 'metal' | 'hqm' | 'wood' | 'stone' | 'cloth' 
  | 'lgf' | 'scrap' | 'pipe' | 'tech_trash' | 'rope' | 'gear' | 'blade';

export type RaidToolId = 
  | 'c4' | 'rocket' | 'satchel' | 'explo' | 'beancan' | 'eoka' 
  | 'molotov' | 'fire_arrow' | 'torch' | 'hatchet' | 'pickaxe' 
  | 'sword' | 'spear' | 'chainsaw' | 'jackhammer';

export interface RaidTarget {
  id: RaidTargetId;
  name: string;
  category: string;
  hp: number;
  icon: string;
}

export const TARGETS: RaidTarget[] = [
  { id: 'wood_door', name: 'Wooden Door', category: 'Doors', hp: 200, icon: '🚪' },
  { id: 'metal_door', name: 'Sheet Metal Door', category: 'Doors', hp: 250, icon: '🚪' },
  { id: 'garage_door', name: 'Garage Door', category: 'Doors', hp: 600, icon: '🪟' },
  { id: 'armored_door', name: 'Armored Door', category: 'Doors', hp: 1000, icon: '🛡️' },
  { id: 'wood_wall', name: 'Wooden Wall', category: 'Walls', hp: 250, icon: '🪵' },
  { id: 'stone_wall', name: 'Stone Wall', category: 'Walls', hp: 500, icon: '🪨' },
  { id: 'metal_wall', name: 'Metal Wall', category: 'Walls', hp: 1000, icon: '⛓️' },
  { id: 'armored_wall', name: 'Armored Wall', category: 'Walls', hp: 2000, icon: '⬛' },
  { id: 'window_glass', name: 'Glass Window', category: 'Misc', hp: 250, icon: '🪟' },
  { id: 'window_bars', name: 'Metal Window Bars', category: 'Misc', hp: 250, icon: '⛓️' },
  { id: 'tc', name: 'Tool Cupboard', category: 'Misc', hp: 100, icon: '🗄️' },
  { id: 'turret', name: 'Auto Turret', category: 'Misc', hp: 1000, icon: '🤖' }
];

export const RESOURCES: Record<ResourceId, { name: string; icon: string; order: number }> = {
  sulfur: { name: 'Sulfur', icon: '🟡', order: 1 },
  charcoal: { name: 'Charcoal', icon: '⚫', order: 2 },
  metal: { name: 'Metal Frags', icon: '⚪', order: 3 },
  hqm: { name: 'HQM', icon: '💠', order: 4 },
  wood: { name: 'Wood', icon: '🪵', order: 5 },
  stone: { name: 'Stone', icon: '🪨', order: 6 },
  cloth: { name: 'Cloth', icon: '🧵', order: 7 },
  lgf: { name: 'Low Grade', icon: '🛢️', order: 8 },
  scrap: { name: 'Scrap', icon: '⚙️', order: 9 },
  pipe: { name: 'Metal Pipe', icon: '🪈', order: 10 },
  tech_trash: { name: 'Tech Trash', icon: '💻', order: 11 },
  rope: { name: 'Rope', icon: '🪢', order: 12 },
  gear: { name: 'Gears', icon: '⚙️', order: 13 },
  blade: { name: 'Metal Blade', icon: '🔪', order: 14 }
};

export const RAID_TOOLS: Record<RaidToolId, { name: string; icon: string; category: string; costs: Partial<Record<ResourceId, number>> }> = {
  c4: { name: 'C4', icon: '🧨', category: 'explosive', costs: { sulfur: 2200, charcoal: 3000, metal: 200, lgf: 60, cloth: 5, tech_trash: 2 } },
  rocket: { name: 'Rocket', icon: '🚀', category: 'explosive', costs: { sulfur: 1400, charcoal: 1950, metal: 100, lgf: 30, pipe: 2 } },
  satchel: { name: 'Satchel', icon: '🎒', category: 'explosive', costs: { sulfur: 480, charcoal: 720, metal: 80, cloth: 10, rope: 1 } },
  explo: { name: 'Explo Ammo', icon: '💥', category: 'explosive', costs: { sulfur: 25, charcoal: 30, metal: 5 } },
  beancan: { name: 'Beancan', icon: '🥫', category: 'explosive', costs: { sulfur: 120, charcoal: 180, metal: 20 } },
  eoka: { name: 'Eoka (Ammo)', icon: '🔫', category: 'explosive', costs: { sulfur: 5, charcoal: 7.5, stone: 0.5 } }, 
  molotov: { name: 'Molotov', icon: '🍾', category: 'fire', costs: { cloth: 40, lgf: 10 } },
  fire_arrow: { name: 'Fire Arrow', icon: '🏹', category: 'fire', costs: { wood: 10, cloth: 1, lgf: 5 } },
  torch: { name: 'Torch', icon: '🔥', category: 'melee', costs: { wood: 30, lgf: 1 } },
  hatchet: { name: 'Hatchet', icon: '🪓', category: 'melee', costs: { wood: 100, metal: 75 } },
  pickaxe: { name: 'Pickaxe', icon: '⛏️', category: 'melee', costs: { wood: 100, metal: 125 } },
  sword: { name: 'Sword', icon: '🗡️', category: 'melee', costs: { metal: 15, blade: 1 } },
  spear: { name: 'Spear', icon: '🔱', category: 'melee', costs: { wood: 300 } },
  chainsaw: { name: 'Chainsaw', icon: '🪚', category: 'melee', costs: { hqm: 5, gear: 2, blade: 1, lgf: 50 } },
  jackhammer: { name: 'Jackhammer', icon: '🔨', category: 'melee', costs: { scrap: 150 } }
};

export const RAID_COSTS: Record<RaidTargetId, Record<string, any>> = {
  'wood_door': { 
      c4: 1, rocket: 1, satchel: 2, explo: 19, beancan: 6, eoka: 45, molotov: 2, fire_arrow: 18, 
      torch: 150, hatchet: 70, pickaxe: 70, sword: 50, spear: 120, chainsaw: 1, jackhammer: 1, 
      combo: { item1: 'explo', qty1: 19 } 
  },
  'metal_door': { 
      c4: 1, rocket: 2, satchel: 4, explo: 63, beancan: 18, eoka: 250, molotov: 0, fire_arrow: 0, 
      torch: 0, hatchet: 0, pickaxe: 0, sword: 0, spear: 0, chainsaw: 0, jackhammer: 0, 
      combo: { item1: 'rocket', qty1: 1, item2: 'explo', qty2: 8 } 
  },
  'garage_door': { 
      c4: 2, rocket: 3, satchel: 9, explo: 150, beancan: 42, eoka: 600, molotov: 0, fire_arrow: 0, 
      torch: 0, hatchet: 0, pickaxe: 0, sword: 0, spear: 0, chainsaw: 0, jackhammer: 0, 
      combo: { item1: 'c4', qty1: 1, item2: 'explo', qty2: 40 } 
  },
  'armored_door': { 
      c4: 2, rocket: 4, satchel: 15, explo: 250, beancan: 71, eoka: 1000, molotov: 0, fire_arrow: 0, 
      torch: 0, hatchet: 0, pickaxe: 0, sword: 0, spear: 0, chainsaw: 0, jackhammer: 0, 
      combo: { item1: 'c4', qty1: 1, item2: 'rocket', qty2: 2 } 
  },
  'wood_wall': { 
      c4: 1, rocket: 2, satchel: 3, explo: 49, beancan: 13, eoka: 56, molotov: 3, fire_arrow: 22, 
      torch: 200, hatchet: 90, pickaxe: 90, sword: 60, spear: 150, chainsaw: 1, jackhammer: 1, 
      combo: { item1: 'explo', qty1: 49 } 
  },
  'stone_wall': { 
      c4: 2, rocket: 4, satchel: 10, explo: 185, beancan: 46, eoka: 0, molotov: 0, fire_arrow: 0, 
      torch: 0, hatchet: 0, pickaxe: 700, sword: 0, spear: 0, chainsaw: 0, jackhammer: 7, 
      combo: { item1: 'c4', qty1: 1, item2: 'rocket', qty2: 2 } 
  },
  'metal_wall': { 
      c4: 4, rocket: 8, satchel: 23, explo: 400, beancan: 112, eoka: 0, molotov: 0, fire_arrow: 0, 
      torch: 7500, hatchet: 0, pickaxe: 2500, sword: 0, spear: 0, chainsaw: 0, jackhammer: 0, 
      combo: { item1: 'c4', qty1: 2, item2: 'rocket', qty2: 4 } 
  },
  'armored_wall': { 
      c4: 8, rocket: 15, satchel: 46, explo: 799, beancan: 224, eoka: 0, molotov: 0, fire_arrow: 0, 
      torch: 0, hatchet: 0, pickaxe: 0, sword: 0, spear: 0, chainsaw: 0, jackhammer: 0, 
      combo: { item1: 'c4', qty1: 4, item2: 'rocket', qty2: 7 } 
  },
  'window_glass': { 
      c4: 1, rocket: 2, satchel: 3, explo: 63, beancan: 13, eoka: 250, molotov: 0, fire_arrow: 0, 
      torch: 0, hatchet: 0, pickaxe: 150, sword: 0, spear: 0, chainsaw: 0, jackhammer: 0, 
      combo: { item1: 'rocket', qty1: 1, item2: 'explo', qty2: 8 } 
  },
  'window_bars': { 
      c4: 1, rocket: 2, satchel: 4, explo: 63, beancan: 18, eoka: 250, molotov: 0, fire_arrow: 0, 
      torch: 0, hatchet: 0, pickaxe: 0, sword: 0, spear: 0, chainsaw: 0, jackhammer: 0, 
      combo: { item1: 'rocket', qty1: 1, item2: 'explo', qty2: 8 } 
  },
  'tc': { 
      c4: 1, rocket: 1, satchel: 1, explo: 9, beancan: 3, eoka: 23, molotov: 1, fire_arrow: 9, 
      torch: 100, hatchet: 40, pickaxe: 40, sword: 30, spear: 80, chainsaw: 1, jackhammer: 1, 
      combo: { item1: 'explo', qty1: 9 } 
  },
  'turret': { 
      c4: 1, rocket: 4, satchel: 0, explo: 0, beancan: 0, eoka: 0, molotov: 0, fire_arrow: 60, 
      torch: 0, hatchet: 0, pickaxe: 0, sword: 0, spear: 0, chainsaw: 0, jackhammer: 0, 
      combo: { item1: 'rocket', qty1: 4 } 
  }
};
