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
}

export interface BattleMetricsServerDetail extends BattleMetricsServerSummary {
  details: Record<string, any>
}

export interface BattleMetricsSearchResponse {
  data: BattleMetricsServerSummary[]
  meta?: any
}

export interface BattleMetricsApiError {
  error: string
}

export async function searchServers(query: string): Promise<BattleMetricsServerSummary[]> {
  if (!supabase) throw new Error('Supabase client not initialized');

  const { data, error } = await supabase.functions.invoke('battlemetrics', {
    body: { action: 'search', query }
  })

  if (error) {
    console.error('Error searching servers:', error)
    throw new Error(error.message || 'Failed to search servers')
  }

  if (data?.error) {
    throw new Error(data.error)
  }

  // Map JSON:API to our Summary interface
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
    updatedAt: item.attributes.updatedAt || new Date().toISOString()
  })) || []

  return servers
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
