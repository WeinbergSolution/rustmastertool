import { MAP_MONUMENTS } from './mapIntelData';
import { DEEP_MONUMENT_DATA } from './mapIntelDeepData';
import type { MapMonument } from './mapIntelData';
import type { DeepMonumentData } from './mapIntelDeepData';

export interface MapIntelLookupResult {
  id: string;
  base?: MapMonument;
  deep?: DeepMonumentData;
  name: string;
  categoryId: string;
}

export function findMapIntelEntryByCanonicalId(canonicalId: string): MapIntelLookupResult | undefined {
  if (!canonicalId) return undefined;
  
  // Normalize
  const normalizedId = canonicalId.trim().toLowerCase();
  
  // Base entry
  const baseEntry = MAP_MONUMENTS.find(m => m.id === normalizedId);
  
  // Deep entry
  const deepEntry = DEEP_MONUMENT_DATA[normalizedId];
  
  // If neither exists, we don't have map intel for it
  if (!baseEntry && !deepEntry) {
    return undefined;
  }
  
  // Alias mapping for inconsistencies between Base and Deep databases,
  // or variations in raw server names.
  const aliases: Record<string, string> = {
    'military_base': 'abandoned_military_base',
    'abandoned_military_base': 'military_base',
    'military_tunnel': 'military_tunnels',
    'sewer': 'sewer_branch',
    'launchsite': 'launch_site',
    'ferry': 'ferry_terminal'
  };
  
  // Generic fallbacks for Base Data when only specific variants exist in Deep
  let mappedId = aliases[normalizedId] || normalizedId;
  let genericBaseId = mappedId;
  
  if (mappedId.startsWith('cave_')) {
    genericBaseId = 'cave';
  } else if (mappedId.startsWith('rock_formation_')) {
    genericBaseId = 'rock_formation';
  } else if (mappedId.startsWith('power_substation_')) {
    genericBaseId = 'power_substation';
  }
  
  const mappedBaseEntry = MAP_MONUMENTS.find(m => m.id === mappedId || m.id === genericBaseId) || baseEntry;
  const mappedDeepEntry = DEEP_MONUMENT_DATA[mappedId] || deepEntry;
  
  // If no content found after aliasing, return undefined
  if (!mappedBaseEntry && !mappedDeepEntry) {
    return undefined;
  }
  
  return {
    id: mappedId,
    base: mappedBaseEntry,
    deep: mappedDeepEntry,
    name: mappedBaseEntry?.name || mappedDeepEntry?.name || mappedId,
    categoryId: mappedBaseEntry?.categoryId || 'unknown'
  };
}
