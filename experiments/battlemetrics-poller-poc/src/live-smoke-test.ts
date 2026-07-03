import * as dotenv from 'dotenv';
import path from 'path';
import { BattleMetricsClient } from './battlemetrics-client';

// Load .env.local if exists
dotenv.config({ path: path.join(__dirname, '../../../.env.local') });

async function runSmokeTest() {
  const liveCallsEnabled = process.env.BATTLEMETRICS_LIVE_CALLS_ENABLED === 'true';
  const token = process.env.BATTLEMETRICS_TOKEN;

  if (!liveCallsEnabled || !token) {
    console.log("Live calls disabled. Fixture mode only.");
    process.exit(0);
  }

  console.log("Live calls enabled. Running smoke validation...");
  
  const client = new BattleMetricsClient(token);
  
  // We will run max 1 requests just to test the server endpoint as described
  // We avoid loops and use a fixed server id (e.g. 5967676 for Facepunch EU 1, just a known rust server)
  const testServerId = "5967676";
  
  try {
    const data = await client.getServerInfo(testServerId);
    console.log(`Successfully fetched server detail for ID: ${testServerId}`);
    
    // Check relevant fields
    const attrs = data.data?.attributes;
    if (attrs) {
      console.log(`- Server Name: ${attrs.name}`);
      console.log(`- Game: ${data.data.relationships?.game?.data?.id}`);
      console.log(`- Players: ${attrs.players}/${attrs.maxPlayers}`);
      console.log(`- Status: ${attrs.status}`);
      if (attrs.details) {
        console.log(`- Rust Map: ${attrs.details.map}`);
        console.log(`- Rust Seed: ${attrs.details.rust_world_seed}`);
        console.log(`- Rust Size: ${attrs.details.rust_world_size}`);
      }
    } else {
      console.log("No attributes found in response.");
    }
    
  } catch (err: any) {
    console.error(`Smoke test failed: ${err.message}`);
    process.exit(1);
  }
}

runSmokeTest();
