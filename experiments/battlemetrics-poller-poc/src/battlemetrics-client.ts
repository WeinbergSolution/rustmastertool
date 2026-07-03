import fs from 'fs';
import path from 'path';

export class BattleMetricsClient {
  private token?: string;
  private useFixture: boolean;

  constructor(token?: string) {
    this.token = token;
    this.useFixture = !token;
  }

  async getServerInfo(serverId: string) {
    if (this.useFixture) {
      console.log(`[Fixture Mode] Fetching server info for ${serverId}...`);
      const fixturePath = path.join(__dirname, '../fixtures/example-server-response.json');
      const data = JSON.parse(fs.readFileSync(fixturePath, 'utf8'));
      return data;
    }

    console.log(`[Live Mode] Fetching server info for ${serverId}...`);
    try {
      const response = await fetch(`https://api.battlemetrics.com/servers/${serverId}`, {
        headers: {
          'Authorization': `Bearer ${this.token}`,
          'Accept': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }
      return await response.json();
    } catch (err: any) {
      console.error(`Error fetching from BattleMetrics: ${err.message}`);
      throw err;
    }
  }
}
