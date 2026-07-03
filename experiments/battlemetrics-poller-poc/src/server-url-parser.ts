export function parseBattlemetricsInput(input: string): { battlemetricsServerId?: string, parseStatus: 'success' | 'error', error?: string } {
  input = input.trim();
  
  if (/^\d+$/.test(input)) {
    return { battlemetricsServerId: input, parseStatus: 'success' };
  }
  
  const urlMatch = input.match(/battlemetrics\.com\/servers\/rust\/(\d+)/i);
  if (urlMatch && urlMatch[1]) {
    return { battlemetricsServerId: urlMatch[1], parseStatus: 'success' };
  }
  
  return { parseStatus: 'error', error: 'Could not parse BattleMetrics Server ID from input.' };
}
