import { supabase } from '../supabaseClient'

export interface ServerPopulationSnapshot {
  id: string
  provider_server_id: string
  provider_type: string
  provider_id: string
  observed_at: string
  snapshot_bucket: string
  players: number | null
  max_players: number | null
  queued_players: number | null
  rank: number | null
  status: string | null
  country: string | null
  rust_type: string | null
  map_name: string | null
  map_size: number | null
  map_seed: string | null
  last_wipe_at: string | null
  last_seed_change_at: string | null
}

export async function getServerSnapshots(providerServerId: string): Promise<ServerPopulationSnapshot[]> {
  if (!supabase) return [];
  
  const { data, error } = await supabase
    .from('server_population_snapshots')
    .select('*')
    .eq('provider_id', providerServerId)
    .order('observed_at', { ascending: false })
    .limit(50); // Get last 50 snapshots
    
  if (error) {
    // If the table doesn't exist yet (migration not deployed), suppress error and return empty array
    if (error.code === '42P01') {
      return [];
    }
    console.error(`Failed to fetch server snapshots for provider_id ${providerServerId}:`, error);
    throw new Error('Pulse data could not be loaded');
  }
  
  return data || [];
}
