import dotenv from 'dotenv';
import { parseBattlemetricsInput } from './server-url-parser';
import { BattleMetricsClient } from './battlemetrics-client';
import { normalizeServerSnapshot } from './snapshot-normalizer';
import { detectWipe } from './wipe-detector';
import { simulatePollingBudget } from './polling-budget-simulator';

dotenv.config({ path: '.env.local' });

async function main() {
  console.log('Starting BattleMetrics Poller PoC...');
  
  const token = process.env.BATTLEMETRICS_TOKEN;
  const client = new BattleMetricsClient(token);
  
  const testInput = 'https://www.battlemetrics.com/servers/rust/123456';
  const { battlemetricsServerId, parseStatus, error } = parseBattlemetricsInput(testInput);
  
  if (parseStatus === 'error') {
    console.error(error);
    return;
  }
  
  try {
    const rawData = await client.getServerInfo(battlemetricsServerId!);
    const snapshot = normalizeServerSnapshot(rawData);
    
    console.log('\n--- Normalized Snapshot ---');
    console.log(JSON.stringify(snapshot, null, 2));
    
    // Simulate wipe detection
    const oldSnapshot = { ...snapshot, rustWorldSeed: 99999, rustLastWipe: '2023-01-01T00:00:00Z', rustEntityCount: 150000 };
    const wipeResult = detectWipe(oldSnapshot, snapshot);
    
    console.log('\n--- Wipe Detection ---');
    console.log(JSON.stringify(wipeResult, null, 2));
    
    console.log('\n');
    simulatePollingBudget();
    
  } catch (err) {
    console.error('PoC Failed:', err);
  }
}

main();
