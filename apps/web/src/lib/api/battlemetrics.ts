import { supabase } from '../supabaseClient'

export interface BattleMetricsServerSummary {
  id: string
  name: string
  players: number
  maxPlayers: number
  status: 'online' | 'offline' | 'dead' | 'unknown'
  map?: string
  country?: string
  ip?: string
  port?: number
  updatedAt: string
  internal_uuid?: string
  rank?: number
  mapSize?: number
  seed?: number
  wipeAge?: string
  lastWipe?: string
  rustType?: string
  queue?: number
}

export interface BattleMetricsServerDetail extends BattleMetricsServerSummary {
  details: Record<string, any>
}

export interface BattleMetricsSearchResponse {
  data: BattleMetricsServerSummary[]
  meta?: any
  links?: {
    next?: string
  }
}

export interface SearchOptions {
  query?: string
  pageSize?: number
  rustType?: string
  sort?: string
  nextUrl?: string
}

export interface BattleMetricsApiError {
  error: string
}

export async function searchServers(options: SearchOptions | string): Promise<BattleMetricsSearchResponse> {
  if (!supabase) throw new Error('Supabase client not initialized');

  let body: any = { action: 'search' };
  if (typeof options === 'string') {
    body.query = options;
  } else {
    body = { ...body, ...options };
    // map rustType to rust_type for the backend
    if (body.rustType) {
      body.rust_type = body.rustType;
      delete body.rustType;
    }
  }

  const { data, error } = await supabase.functions.invoke('battlemetrics', {
    body
  })

  if (error) {
    console.error('Error searching servers:', error)
    throw new Error(error.message || 'Failed to search servers')
  }

  if (data?.error) {
    throw new Error(data.error)
  }

  const servers = data?.data?.map((item: any) => ({
    id: item.attributes.id,
    name: item.attributes.name,
    players: item.attributes.players,
    maxPlayers: item.attributes.maxPlayers,
    status: item.attributes.status,
    map: item.attributes.details?.map,
    country: item.attributes.country,
    ip: item.attributes.ip,
    port: item.attributes.port,
    updatedAt: item.attributes.updatedAt || new Date().toISOString(),
    rank: item.attributes.rank,
    rustType: item.attributes.details?.rust_type,
    queue: item.attributes.details?.rust_queued_players,
    mapSize: item.attributes.details?.rust_world_size,
    seed: item.attributes.details?.rust_world_seed,
    lastWipe: item.attributes.details?.rust_last_wipe
  })) || []

  return {
    data: servers,
    links: data?.links,
    meta: data?.meta
  }
}

export async function getServerDetails(serverId: string): Promise<BattleMetricsServerDetail> {
  if (!supabase) throw new Error('Supabase client not initialized');

  const { data, error } = await supabase.functions.invoke('battlemetrics', {
    body: { action: 'details', serverId }
  })

  if (error) {
    console.error('Error fetching server details:', error)
    throw new Error(error.message || 'Failed to fetch server details')
  }

  if (data?.error) {
    throw new Error(data.error)
  }

  const item = data?.data
  if (!item) {
    throw new Error('Server not found')
  }

  return {
    id: item.attributes.id,
    name: item.attributes.name,
    players: item.attributes.players,
    maxPlayers: item.attributes.maxPlayers,
    status: item.attributes.status,
    map: item.attributes.details?.map,
    country: item.attributes.country,
    ip: item.attributes.ip,
    port: item.attributes.port,
    updatedAt: item.attributes.updatedAt || new Date().toISOString(),
    details: item.attributes.details || {}
  }
}
