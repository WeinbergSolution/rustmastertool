import fs from 'fs';
import path from 'path';

export class BattleMetricsClient {
  private token?: string;
  private useFixture: boolean;

  constructor(token?: string) {
    this.token = token;
    const liveCallsEnabled = process.env.BATTLEMETRICS_LIVE_CALLS_ENABLED === 'true';
    this.useFixture = !token || !liveCallsEnabled;
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
      
      const rateLimitLimit = response.headers.get('X-Rate-Limit-Limit');
      const rateLimitRemaining = response.headers.get('X-Rate-Limit-Remaining');
      console.log(`[Rate Limit] Limit: ${rateLimitLimit || 'unknown'}, Remaining: ${rateLimitRemaining || 'unknown'}`);

      if (!response.ok) {
        if (response.status === 429) {
          throw new Error(`API Error: 429 Too Many Requests. Stopping and backing off.`);
        }
        if (response.status === 401 || response.status === 403) {
          throw new Error(`API Error: ${response.status} Unauthorized/Forbidden. Check token scopes.`);
        }
        if (response.status === 404) {
          throw new Error(`API Error: 404 Not Found. Resource ${serverId} does not exist.`);
        }
        if (response.status >= 500) {
          throw new Error(`API Error: ${response.status} Server Error. BattleMetrics might be down.`);
        }
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }
      return await response.json();
    } catch (err: any) {
      console.error(`Error fetching from BattleMetrics: ${err.message}`);
      throw err;
    }
  }
}
