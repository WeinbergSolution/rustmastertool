export interface PuzzleStep {
  order: number;
  title: string;
  instruction: string;
  warning?: string;
  result?: string;
}

export interface PuzzleInfo {
  hasPuzzle: boolean;
  puzzleType: 'none' | 'green' | 'blue' | 'red' | 'multi_card' | 'climbing' | 'switch';
  note?: string;
  requiredItems?: string[];
  optionalItems?: string[];
  steps?: PuzzleStep[];
  commonMistakes?: string[];
  resetOrTimingNotes?: string;
  exitTips?: string[];
}

export interface LootGuide {
  expectedLoot: string;
  recyclerLocation?: string;
  cardSpawns?: string;
  crateTypes?: string[];
  diesel?: string;
  lockedCrate?: string;
}

export interface ThreatsInfo {
  radiation: 'none' | 'low' | 'medium' | 'high' | 'extreme';
  npcs: string;
  pvpHotspots?: string;
  chokePoints?: string;
  campingSpots?: string;
}

export interface StrategyInfo {
  soloTips?: string;
  groupTips?: string;
}

export interface ContentQuality {
  depth: 'short' | 'standard' | 'deep';
  puzzleVerified: boolean;
  needsOwnerReview: boolean;
  notes: string;
}

export interface DeepMonumentData {
  id: string;
  name: string;
  categoryId: string;
  confidence: 'verified' | 'likely' | 'uncertain';
  overview: string;
  whyRunIt: string;
  access: string;
  puzzle: PuzzleInfo;
  lootGuide: LootGuide;
  threats: ThreatsInfo;
  strategy: StrategyInfo;
  beginnerMistakes: string[];
  advancedTips?: string[];
  relatedVideos?: string[];
  contentQuality: ContentQuality;
  imageUrl?: string;
  sources: string[];
  aliasesNote?: string;
  variant?: string;
}

import deepContentJson from './map-intel-deep-content.json';

export const DEEP_MONUMENT_DATA: Record<string, DeepMonumentData> = {};

(deepContentJson as DeepMonumentData[]).forEach(item => {
  DEEP_MONUMENT_DATA[item.id] = item;
});
