import { NormalizedServerSnapshot, WipeDetectionResult } from './types';

export function detectWipe(oldSnap: NormalizedServerSnapshot, newSnap: NormalizedServerSnapshot): WipeDetectionResult {
  const reasons: string[] = [];
  let wipeDetected = false;
  let confidence: 'low' | 'medium' | 'high' = 'low';
  let kind: 'map' | 'full' | 'unknown' = 'unknown';

  if (oldSnap.rustLastWipe !== newSnap.rustLastWipe && newSnap.rustLastWipe) {
    reasons.push('rustLastWipe changed');
    wipeDetected = true;
    confidence = 'high';
  }
  
  if (oldSnap.rustWorldSeed !== newSnap.rustWorldSeed) {
    reasons.push('Seed changed');
    wipeDetected = true;
    confidence = 'high';
    kind = 'map';
  }
  
  if (oldSnap.rustWorldSize !== newSnap.rustWorldSize) {
    reasons.push('Size changed');
    wipeDetected = true;
  }
  
  if (oldSnap.mapName !== newSnap.mapName) {
    reasons.push('Map name changed');
    wipeDetected = true;
  }

  if (oldSnap.rustEntityCount && newSnap.rustEntityCount) {
    if (newSnap.rustEntityCount < oldSnap.rustEntityCount * 0.3) {
      reasons.push('Entity count dropped significantly (likely wipe)');
      if (!wipeDetected) {
        wipeDetected = true;
        confidence = 'medium';
      }
    }
  }

  if (!wipeDetected) {
    return { wipeDetected: false, confidence: 'low', kind: 'unknown', reasons: [] };
  }

  return { wipeDetected, confidence, kind: kind !== 'unknown' ? kind : 'full', reasons };
}
