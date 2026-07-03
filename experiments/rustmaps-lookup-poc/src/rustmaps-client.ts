import fs from 'fs';
import path from 'path';

export class RustMapsClient {
  private apiKey?: string;
  private useFixture: boolean;

  constructor(apiKey?: string) {
    this.apiKey = apiKey;
    this.useFixture = !apiKey;
  }

  async lookupMap(seed: number, size: number) {
    if (this.useFixture) {
      console.log(`[Fixture Mode] Lookup map for seed ${seed}, size ${size}...`);
      const fixturePath = path.join(__dirname, '../fixtures/example-map-response.json');
      const data = JSON.parse(fs.readFileSync(fixturePath, 'utf8'));
      return data;
    }

    console.log(`[Live Mode] Lookup map for seed ${seed}, size ${size}...`);
    try {
      const response = await fetch(`https://rustmaps.com/api/v4/maps/${size}/${seed}`, {
        headers: {
          'X-API-Key': this.apiKey!,
          'Accept': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }
      return await response.json();
    } catch (err: any) {
      console.error(`Error fetching from RustMaps: ${err.message}`);
      throw err;
    }
  }
}
