export type MapLayerCategory = 'Map' | 'Resources' | 'Wildlife' | 'Spawns' | 'Unconfirmed';

export type MapLayerId = 
  | 'clean_tiles'
  | 'icon_image'
  | 'underground'
  | 'building_blocks'
  | 'nodes'
  | 'hemp'
  | 'berries'
  | 'bears'
  | 'boars'
  | 'horses'
  | 'player_spawns'
  | 'stone'
  | 'sulfur'
  | 'metal';

export interface MapLayerConfig {
  id: MapLayerId;
  label: string;
  category: MapLayerCategory;
  description?: string;
  isPlanned?: boolean;
  isUnconfirmed?: boolean;
  unconfirmedReason?: string;
}

export const MAP_LAYERS: Record<MapLayerId, MapLayerConfig> = {
  clean_tiles: { id: 'clean_tiles', label: 'Clean Tiles', category: 'Map' },
  icon_image: { id: 'icon_image', label: 'Icon Image fallback', category: 'Map' },
  underground: { id: 'underground', label: 'Underground', category: 'Map', isPlanned: true },
  building_blocks: { id: 'building_blocks', label: 'No-build zones', category: 'Map', isPlanned: true },
  
  nodes: { 
    id: 'nodes', 
    label: 'Generic Nodes (Potential)', 
    category: 'Resources',
    description: 'Estimated areas, not exact spawn positions.'
  },
  hemp: { id: 'hemp', label: 'Hemp', category: 'Resources' },
  berries: { id: 'berries', label: 'Berries', category: 'Resources' },
  
  bears: { id: 'bears', label: 'Bears', category: 'Wildlife' },
  boars: { id: 'boars', label: 'Boars', category: 'Wildlife' },
  horses: { id: 'horses', label: 'Horses', category: 'Wildlife' },
  
  player_spawns: { id: 'player_spawns', label: 'Player Spawns', category: 'Spawns' },
  
  stone: { 
    id: 'stone', 
    label: 'Stone Ore Potential (Estimated)', 
    category: 'Resources', 
    description: 'Estimated heatmap based on topology and biome data. Not exact spawn positions.' 
  },
  sulfur: { 
    id: 'sulfur', 
    label: 'Sulfur Ore Potential (Estimated)', 
    category: 'Resources', 
    description: 'Estimated heatmap based on topology and biome data. Not exact spawn positions.' 
  },
  metal: { 
    id: 'metal', 
    label: 'Metal Ore Potential (Estimated)', 
    category: 'Resources', 
    description: 'Estimated heatmap based on topology and biome data. Not exact spawn positions.' 
  }
};
