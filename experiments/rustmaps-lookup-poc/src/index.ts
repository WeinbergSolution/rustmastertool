import dotenv from 'dotenv';
import { RustMapsClient } from './rustmaps-client';
import { normalizeMapData } from './map-lookup-normalizer';
import { logAttributionNotes } from './attribution-notes';

dotenv.config({ path: '.env.local' });

async function main() {
  console.log('Starting RustMaps Lookup PoC...');
  
  const apiKey = process.env.RUSTMAPS_API_KEY;
  const client = new RustMapsClient(apiKey);
  
  const testSeed = 123456789;
  const testSize = 4500;
  
  try {
    const rawData = await client.lookupMap(testSeed, testSize);
    const snapshot = normalizeMapData(rawData);
    
    console.log('\n--- Normalized Map Data ---');
    console.log(JSON.stringify(snapshot, null, 2));
    
    logAttributionNotes();
    
  } catch (err) {
    console.error('PoC Failed:', err);
  }
}

main();
