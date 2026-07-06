import "jsr:@supabase/functions-js/edge-runtime.d.ts"
import { createClient } from 'npm:@supabase/supabase-js@2.39.3'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, server-pulse-ingest-secret',
}

interface IngestOptions {
  category?: string;
  query?: string;
  maxPages?: number;
  pageSize?: number;
  dryRun?: boolean;
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const ingestSecret = req.headers.get('server-pulse-ingest-secret') || req.headers.get('SERVER_PULSE_INGEST_SECRET');
    const validSecret = Deno.env.get('SERVER_PULSE_INGEST_SECRET');
    
    // We expect the secret to be set in env for actual runs, or at least provided correctly
    // If not set in env, it's a security risk to allow anyone.
    if (!validSecret || ingestSecret !== validSecret) {
      return new Response(JSON.stringify({ error: 'Unauthorized: Invalid Ingest Secret' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    const body: IngestOptions = await req.json().catch(() => ({}));
    const { category, query, maxPages = 1, pageSize = 25, dryRun = false } = body;
    
    // Setup BM Request
    const bmToken = Deno.env.get('BATTLEMETRICS_TOKEN');
    const headers: Record<string, string> = {
      'Content-Type': 'application/json'
    };
    if (bmToken) {
      headers['Authorization'] = `Bearer ${bmToken}`;
    }

    let maxP = Math.min(maxPages, 5); // Default from payload, might be overridden by state

    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    
    if (!supabaseUrl || !supabaseServiceKey) {
      throw new Error('Supabase configuration missing');
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const mode = body.mode || 'manual';
    let runId: string | undefined;

    const startTime = new Date();
    const catLower = category ? category.toLowerCase() : '';

    // -- STATE RETRIEVAL FOR ROTATION --
    let pSize = Math.min(pageSize, 100);
    let currentUrl: string | null = `https://api.battlemetrics.com/servers?filter[game]=rust&page[size]=${pSize}`;
    let startPage = 1;
    let startPageUrl = currentUrl;
    let maxPageWindow = 20;

    if (['official', 'community', 'modded'].includes(catLower)) {
      const { data: stateData } = await supabase
        .from('server_pulse_scheduler_state')
        .select('*')
        .eq('id', catLower)
        .single();
        
      if (stateData) {
         maxPageWindow = stateData.max_page_window || 20;
         startPage = stateData.current_page || 1;
         
         if (mode === 'scheduled') {
           maxP = stateData.max_pages_per_run || 1;
         }
         
         if (stateData.page_size) {
           pSize = Math.min(stateData.page_size, 100);
         }
         
         if (stateData.next_page_url) {
           currentUrl = stateData.next_page_url;
         } else {
           currentUrl = `https://api.battlemetrics.com/servers?filter[game]=rust&filter[search]=${encodeURIComponent(catLower)}&page[size]=${pSize}`;
         }
         startPageUrl = currentUrl;
      }
    } else if (query) {
      currentUrl += `&filter[search]=${encodeURIComponent(query.slice(0, 100))}`;
      startPageUrl = currentUrl;
    }

    // Log start of run
    const { data: runData, error: runError } = await supabase
      .from('server_pulse_ingest_runs')
      .insert({
        category: category || query || 'unknown',
        mode,
        dry_run: dryRun,
        max_pages: maxP,
        start_page: startPage,
        start_page_url: startPageUrl,
        started_at: startTime.toISOString(),
        status: 'running'
      })
      .select('id')
      .single();
      
    if (runData && !runError) {
      runId = runData.id;
    }

    let endNextPageUrl: string | null = null;



    let pagesProcessed = 0;
    let serversFound = 0;
    let serverUpsertAttempts = 0;
    let snapshotInsertAttempts = 0;
    const errors: string[] = [];

    // Bucket for snapshot time (truncate to nearest minute to avoid spam)
    const snapshotBucket = new Date();
    snapshotBucket.setSeconds(0, 0);

    while (currentUrl && pagesProcessed < maxP) {
      pagesProcessed++;
      const res = await fetch(currentUrl, { headers });
      
      if (!res.ok) {
        errors.push(`BM API Error on page ${pagesProcessed}: ${res.status}`);
        break;
      }
      
      const json = await res.json();
      const servers = json.data || [];
      serversFound += servers.length;

      if (!dryRun && servers.length > 0) {
        // Prepare Upserts for provider_servers
        const upsertRows = servers.map((s: any) => ({
          provider_type: 'battlemetrics',
          provider_id: s.id,
          name: s.attributes?.name || 'Unknown',
          address: s.attributes?.address,
          port: s.attributes?.port,
          status: s.attributes?.status || 'offline',
          players: s.attributes?.players || 0,
          max_players: s.attributes?.maxPlayers || 0,
          country: s.attributes?.country,
          map_name: s.attributes?.details?.map,
          last_wipe: s.attributes?.details?.rust_last_wipe ? new Date(s.attributes.details.rust_last_wipe) : null,
          world_seed: s.attributes?.details?.rust_world_seed,
          world_size: s.attributes?.details?.rust_world_size,
          fps: s.attributes?.details?.fps,
          entity_count: s.attributes?.details?.rust_ent_cnt_i
        }));

        const { data: upsertedServers, error: upsertError } = await supabase
          .from('provider_servers')
          .upsert(upsertRows, { onConflict: 'provider_type,provider_id', ignoreDuplicates: false })
          .select('id, provider_id, last_wipe');

        if (upsertError) {
          errors.push(`Upsert Error: ${upsertError.message}`);
        } else if (upsertedServers) {
          serverUpsertAttempts += upsertRows.length;
          
          // Prepare Snapshots
          const snapshotRows = upsertedServers.map(us => {
            const s = servers.find((bmS: any) => bmS.id === us.provider_id);
            if (!s) return null;
            return {
              provider_server_id: us.id,
              provider_type: 'battlemetrics',
              provider_id: s.id,
              observed_at: new Date().toISOString(),
              snapshot_bucket: snapshotBucket.toISOString(),
              players: s.attributes?.players,
              max_players: s.attributes?.maxPlayers,
              queued_players: s.attributes?.details?.rust_queued_players || 0,
              rank: s.attributes?.rank,
              status: s.attributes?.status,
              country: s.attributes?.country,
              rust_type: s.attributes?.details?.rust_type,
              map_name: s.attributes?.details?.map,
              map_size: s.attributes?.details?.rust_world_size,
              map_seed: s.attributes?.details?.rust_world_seed ? String(s.attributes.details.rust_world_seed) : null,
              last_wipe_at: s.attributes?.details?.rust_last_wipe ? new Date(s.attributes.details.rust_last_wipe).toISOString() : null,
              last_seed_change_at: s.attributes?.details?.rust_last_seed_change ? new Date(s.attributes.details.rust_last_seed_change).toISOString() : null
            };
          }).filter(Boolean);

          if (snapshotRows.length > 0) {
            const { error: snapError } = await supabase
              .from('server_population_snapshots')
              .upsert(snapshotRows, { onConflict: 'provider_server_id,snapshot_bucket', ignoreDuplicates: true });
            
            if (snapError) {
              errors.push(`Snapshot Error: ${snapError.message}`);
            } else {
              snapshotInsertAttempts += snapshotRows.length;
            }
          }

          // Phase 2.0-A Map Identity Extractor MVP
          const identityRows = upsertedServers.map(us => {
            const s = servers.find((bmS: any) => bmS.id === us.provider_id);
            if (!s) return null;
            const details = s.attributes?.details || {};
            
            let mapType = 'unknown';
            if (details.map === 'Procedural Map') mapType = 'procedural';
            else if (details.map === 'Barren') mapType = 'barren';
            else if (details.map) mapType = 'custom';
            
            const hasRustMaps = !!details.rust_maps;
            let conf = 0.2;
            if (hasRustMaps) conf = 1.0;
            else if (mapType === 'procedural' && details.rust_world_seed && details.rust_world_size) conf = 0.7;
            else if (mapType === 'custom' && details.rust_world_levelurl) conf = 0.4;
            
            // To satisfy unique constraint, wipe_detected_at should have a default if missing
            const wipeAt = details.rust_last_wipe ? new Date(details.rust_last_wipe).toISOString() : new Date(0).toISOString();

            return {
              provider_server_id: us.id,
              battlemetrics_server_id: s.id,
              server_ip: s.attributes?.ip,
              server_port: s.attributes?.port,
              map_type: mapType,
              level_name: details.map,
              seed: details.rust_world_seed,
              world_size: details.rust_world_size,
              wipe_detected_at: wipeAt,
              source: hasRustMaps ? 'battlemetrics_rust_maps' : 'battlemetrics_details',
              confidence: conf,
              is_custom_map: mapType === 'custom',
              custom_map_url: details.rust_world_levelurl,
              raw_source: hasRustMaps ? details.rust_maps : { 
                map: details.map, 
                rust_world_seed: details.rust_world_seed, 
                rust_world_size: details.rust_world_size, 
                rust_world_levelurl: details.rust_world_levelurl 
              }
            };
          }).filter(Boolean);

          if (identityRows.length > 0) {
            const { error: idError } = await supabase
              .from('server_map_identity')
              .upsert(identityRows, { onConflict: 'provider_server_id,wipe_detected_at', ignoreDuplicates: true });
            if (idError) {
              errors.push(`Identity Error: ${idError.message}`);
            }
          }

          // TODO: Wipe Events logic (future enhancement)
        }
      }

      endNextPageUrl = json.links?.next || null;
      currentUrl = endNextPageUrl;
    }

    const finishedAt = new Date();
    const finalStatus = errors.length > 0 ? (serverUpsertAttempts > 0 ? 'partial_success' : 'failed') : 'success';
    const noteStr = dryRun ? "Dry run complete. No database writes occurred." : "Actual persisted rows may be lower due to database deduplication constraints.";
    
    const endPage = startPage + Math.max(0, pagesProcessed - 1);

    if (runId) {
      // Update run log
      await supabase
        .from('server_pulse_ingest_runs')
        .update({
          finished_at: finishedAt.toISOString(),
          pages_processed: pagesProcessed,
          start_page: startPage,
          end_page: endPage,
          end_next_page_url: endNextPageUrl,
          servers_found: serversFound,
          server_upsert_attempts: dryRun ? serversFound : serverUpsertAttempts,
          snapshot_insert_attempts: dryRun ? serversFound : snapshotInsertAttempts,
          errors_count: errors.length,
          errors: errors.length > 0 ? errors : null,
          status: finalStatus,
          note: noteStr
        })
        .eq('id', runId);

      // Also update scheduler state if category is one of the defaults
      if (['official', 'community', 'modded'].includes(catLower) && !dryRun) {
         let nextCurrentPage = startPage + pagesProcessed;
         let nextUrlToStore = endNextPageUrl;
         let resetAt: string | null = null;
         
         if (!endNextPageUrl || nextCurrentPage > maxPageWindow) {
           nextCurrentPage = 1;
           nextUrlToStore = null;
           resetAt = finishedAt.toISOString();
         }

         const updateObj: any = {
           last_run_at: finishedAt.toISOString(),
           updated_at: finishedAt.toISOString(),
           last_page_processed: endPage,
           current_page: nextCurrentPage,
           next_page_url: nextUrlToStore
         };
         
         if (resetAt) {
           updateObj.last_reset_at = resetAt;
         }

         if (finalStatus === 'success' || finalStatus === 'partial_success') {
           updateObj.last_success_at = finishedAt.toISOString();
           updateObj.consecutive_errors = 0;
         } else {
           updateObj.last_error_at = finishedAt.toISOString();
           updateObj.last_error_message = errors[0] || 'Unknown error';
         }
         
         await supabase
           .from('server_pulse_scheduler_state')
           .update(updateObj)
           .eq('id', catLower);
      }
    }
    
    return new Response(
      JSON.stringify({
        dryRun,
        category,
        pages_processed: pagesProcessed,
        start_page: startPage,
        end_page: endPage,
        servers_found: serversFound,
        server_upsert_attempts: dryRun ? serversFound : serverUpsertAttempts,
        snapshot_insert_attempts: dryRun ? serversFound : snapshotInsertAttempts,
        errors_count: errors.length,
        errors: errors.length > 0 ? errors : undefined,
        note: noteStr,
        started_at: startTime,
        finished_at: finishedAt
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error: any) {
    console.error('Edge Function Error:', error);
    return new Response(JSON.stringify({ error: error.message || 'Internal Server Error' }), {
      status: 200, // Return 200 to allow client error parsing
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
})
