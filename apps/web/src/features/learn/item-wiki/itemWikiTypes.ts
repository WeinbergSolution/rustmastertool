/**
 * Rust Item Wiki Architecture Foundation
 * 
 * This file serves as the core type definition for the upcoming
 * comprehensive Rust Item Wiki in RustMasterTool.
 * 
 * Note: Actual data entry will be populated in future phases.
 */

export type ItemCategory = 
  | 'weapons' 
  | 'tools' 
  | 'medical' 
  | 'food' 
  | 'clothing' 
  | 'armor' 
  | 'construction' 
  | 'items' 
  | 'resources' 
  | 'ammunition' 
  | 'traps' 
  | 'electrical' 
  | 'components';

export interface ItemCraftingCost {
  itemId: string; // references another RustItem.id
  amount: number;
}

export interface RaidCostMatrix {
  // Number of explosive/tool required to break this item (if applicable)
  c4?: number;
  rocket?: number;
  satchel?: number;
  explo_ammo?: number;
  beancan?: number;
  eoka_ammo?: number;
  // Melee/Fire fallback costs
  melee_hits?: number; // Approximate
  fire_arrows?: number;
}

export interface RustItem {
  id: string; // e.g., 'assault_rifle', 'stone_wall'
  name: string;
  category: ItemCategory;
  description: string;
  
  // Media / Visuals
  iconUrl?: string; // Shortname or external CDN link for the item icon
  
  // Game Stats (if applicable)
  hp?: number; // Health for deployables/structures
  decayTimeHrs?: number; // Time to decay outside TC range
  
  // Acquisition
  craftable: boolean;
  craftingCost?: ItemCraftingCost[];
  workbenchLevelRequired?: 0 | 1 | 2 | 3;
  blueprintCost?: number; // Scrap required to research
  
  // Raid Info (for doors, walls, deployables)
  isRaidableTarget?: boolean;
  raidCosts?: RaidCostMatrix;
}

// FUTURE EXPANSION:
// export const RUST_ITEMS: Record<string, RustItem> = { ... }
