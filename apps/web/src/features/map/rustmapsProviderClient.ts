// Frontend client for the rustmaps-provider Edge Function.
// No API key here — the key lives server-side in the Edge Function only.
import { supabase } from '../../lib/supabaseClient';

export type ProviderMapState =
  | 'idle'
  | 'queued'
  | 'in_queue'
  | 'generating'
  | 'processing'
  | 'uploading'
  | 'active'
  | 'failed'
  | 'unavailable'
  | 'quota_exhausted'
  | 'provider_not_configured';

export interface ProviderMonument {
  type?: number;
  coordinates?: { x: number; y: number };
  nameOverride?: string;
}

export interface ProviderMapData {
  seed: number | null;
  worldSize: number | null;
  rustmapsId: string | null;
  mapUrl: string | null;
  imageUrl: string | null;
  rawImageUrl: string | null;
  imageIconUrl: string | null;
  thumbnailUrl: string | null;
  totalMonuments: number | null;
  monuments: ProviderMonument[];
  biomePercentages: Record<string, number> | null;
  mapStats: Record<string, number | null> | null;
  queuePosition: number | null;
  currentStep: string | null;
}

export interface ProviderMapResponse {
  ok: boolean;
  state: ProviderMapState;
  cacheKey: string | null;
  data: ProviderMapData | null;
  message: string | null;
}

export interface RequestProviderMapArgs {
  seed: number;
  worldSize: number;
  battlemetricsServerId?: string;
  staging?: boolean;
}

const PENDING_STATES: ProviderMapState[] = [
  'queued', 'in_queue', 'generating', 'processing', 'uploading',
];

export function isPendingProviderState(state: ProviderMapState): boolean {
  return PENDING_STATES.includes(state);
}

/** Pick the best available generated image, in priority order. */
export function pickProviderImage(data: ProviderMapData | null): string | null {
  if (!data) return null;
  return data.imageIconUrl || data.imageUrl || data.rawImageUrl || data.thumbnailUrl || null;
}

const VALID_STATES: ProviderMapState[] = [
  'idle', 'queued', 'in_queue', 'generating', 'processing', 'uploading',
  'active', 'failed', 'unavailable', 'quota_exhausted', 'provider_not_configured',
];

function fail(message: string, state: ProviderMapState = 'failed'): ProviderMapResponse {
  return { ok: false, state, cacheKey: null, data: null, message };
}

function normalize(raw: unknown): ProviderMapResponse {
  const r = (raw ?? {}) as Record<string, unknown>;
  const state = VALID_STATES.includes(r.state as ProviderMapState)
    ? (r.state as ProviderMapState)
    : 'failed';
  const d = (r.data ?? null) as Record<string, unknown> | null;
  const data: ProviderMapData | null = d
    ? {
        seed: typeof d.seed === 'number' ? d.seed : null,
        worldSize: typeof d.worldSize === 'number' ? d.worldSize : null,
        rustmapsId: typeof d.rustmapsId === 'string' ? d.rustmapsId : null,
        mapUrl: typeof d.mapUrl === 'string' ? d.mapUrl : null,
        imageUrl: typeof d.imageUrl === 'string' ? d.imageUrl : null,
        rawImageUrl: typeof d.rawImageUrl === 'string' ? d.rawImageUrl : null,
        imageIconUrl: typeof d.imageIconUrl === 'string' ? d.imageIconUrl : null,
        thumbnailUrl: typeof d.thumbnailUrl === 'string' ? d.thumbnailUrl : null,
        totalMonuments: typeof d.totalMonuments === 'number' ? d.totalMonuments : null,
        monuments: Array.isArray(d.monuments) ? (d.monuments as ProviderMonument[]) : [],
        biomePercentages: (d.biomePercentages as Record<string, number> | null) ?? null,
        mapStats: (d.mapStats as Record<string, number | null> | null) ?? null,
        queuePosition: typeof d.queuePosition === 'number' ? d.queuePosition : null,
        currentStep: typeof d.currentStep === 'string' ? d.currentStep : null,
      }
    : null;
  return {
    ok: Boolean(r.ok),
    state,
    cacheKey: typeof r.cacheKey === 'string' ? r.cacheKey : null,
    data,
    message: typeof r.message === 'string' ? r.message : null,
  };
}

export async function requestRustMapsProviderMap(
  args: RequestProviderMapArgs,
): Promise<ProviderMapResponse> {
  if (!supabase) return fail('Map provider is not available.', 'provider_not_configured');
  try {
    const { data, error } = await supabase.functions.invoke('rustmaps-provider', {
      body: {
        action: 'get_or_create',
        seed: args.seed,
        worldSize: args.worldSize,
        battlemetricsServerId: args.battlemetricsServerId,
        staging: args.staging ?? false,
      },
    });
    if (error) return fail('Could not reach the map provider.');
    return normalize(data);
  } catch {
    return fail('Could not reach the map provider.');
  }
}

export async function pollRustMapsProviderMap(cacheKey: string): Promise<ProviderMapResponse> {
  if (!supabase) return fail('Map provider is not available.', 'provider_not_configured');
  try {
    const { data, error } = await supabase.functions.invoke('rustmaps-provider', {
      body: { action: 'poll', cacheKey },
    });
    if (error) return fail('Could not reach the map provider.');
    return normalize(data);
  } catch {
    return fail('Could not reach the map provider.');
  }
}
