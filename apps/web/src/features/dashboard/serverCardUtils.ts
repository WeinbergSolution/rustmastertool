import type { BattleMetricsServerSummary } from '../../lib/api/battlemetrics';

export function getServerTypeBadge(
  server: BattleMetricsServerSummary, 
  activeTab?: string
): { label: string, type: 'official' | 'community' | 'modded' | 'mix' | 'unknown' } {
  const rustType = server.rustType?.toLowerCase() || '';
  const serverName = server.name?.toLowerCase() || '';

  // If there's clear indication of mixing in the name despite the tag
  const hasModdedHint = serverName.includes('modded') || serverName.includes('2x') || serverName.includes('3x') || serverName.includes('x');
  const hasVanillaHint = serverName.includes('vanilla');

  if (rustType === 'official') return { label: 'O', type: 'official' };
  
  if (rustType === 'community' && hasModdedHint) return { label: 'Mix', type: 'mix' };
  if (rustType === 'modded' && hasVanillaHint) return { label: 'Mix', type: 'mix' };
  
  if (rustType === 'community') return { label: 'C', type: 'community' };
  if (rustType === 'modded') return { label: 'M', type: 'modded' };

  if (activeTab === 'official') return { label: 'O', type: 'official' };
  if (activeTab === 'community') return { label: 'C', type: 'community' };
  if (activeTab === 'modded') return { label: 'M', type: 'modded' };

  return { label: '?', type: 'unknown' };
}
