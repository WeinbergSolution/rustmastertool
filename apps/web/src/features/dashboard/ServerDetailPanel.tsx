import { useState, useEffect } from 'react';
import { X, ShieldAlert, Activity, Globe, Map as MapIcon, Users, Zap, Loader2, AlertTriangle, Lock } from 'lucide-react';
import { getServerDetails, type BattleMetricsServerDetail } from '../../lib/api/battlemetrics';
import { getServerSnapshots, type ServerPopulationSnapshot } from '../../lib/api/serverPulse';
import { calculatePulseSummary } from '../../lib/api/retention';
import { LineChart as LineChartIcon } from 'lucide-react';

interface ServerDetailPanelProps {
  serverId: string;
  isWatched: boolean;
  onClose: () => void;
  onToggleWatch: (serverId: string, internalUuid?: string) => void;
  onSetActiveServer?: (serverId: string, internalUuid?: string) => void;
  isActiveServer?: boolean;
  isAuthenticated?: boolean;
}

export function ServerDetailPanel({ serverId, isWatched, onClose, onToggleWatch, onSetActiveServer, isActiveServer, isAuthenticated }: ServerDetailPanelProps) {
  const [server, setServer] = useState<BattleMetricsServerDetail | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showAuthCta, setShowAuthCta] = useState<'watchlist' | 'active_server' | null>(null);
  const [snapshots, setSnapshots] = useState<ServerPopulationSnapshot[]>([]);
  const [isSnapshotsLoading, setIsSnapshotsLoading] = useState(false);

  useEffect(() => {
    let mounted = true;
    if (!serverId) return;
    
    setIsLoading(true);
    setError(null);
    setServer(null);
    
    getServerDetails(serverId)
      .then(data => {
        if (mounted) setServer(data);
      })
      .catch(err => {
        if (mounted) setError(err.message || 'Failed to fetch server details');
      })
      .finally(() => {
        if (mounted) setIsLoading(false);
      });

    // Also fetch snapshots if we have the internal_uuid, but at this point we only have serverId (battlemetrics id)
    // We can fetch snapshots after we get the internal_uuid, or we can fetch by provider_id.
    // Our API expects provider_server_id (internal). So we need to wait until we get server.internal_uuid.
    
    return () => {
      mounted = false;
    };
  }, [serverId]);

  useEffect(() => {
    let mounted = true;
    if (!server?.internal_uuid) return;
    
    setIsSnapshotsLoading(true);
    getServerSnapshots(server.internal_uuid).then(data => {
      if (mounted) setSnapshots(data);
    }).finally(() => {
      if (mounted) setIsSnapshotsLoading(false);
    });
    
    return () => { mounted = false; };
  }, [server?.internal_uuid]);

  return (
    <div style={{
      position: 'fixed', top: 0, right: 0, bottom: 0, width: '450px',
      backgroundColor: 'var(--bg-card)', borderLeft: '1px solid var(--border-color)',
      boxShadow: '-4px 0 25px rgba(0,0,0,0.8)', zIndex: 100, display: 'flex', flexDirection: 'column',
      padding: '2rem', overflowY: 'auto'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
        <h3 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '1.25rem', lineHeight: 1.3 }}>
          {!isLoading && server && (
            <span style={{ 
              width: '12px', height: '12px', borderRadius: '50%', flexShrink: 0,
              backgroundColor: server.status === 'online' ? 'var(--status-online)' : 'var(--status-offline)',
              boxShadow: server.status === 'online' ? '0 0 8px var(--status-online)' : 'none'
            }}></span>
          )}
          {isLoading ? 'Loading...' : server?.name || 'Server Details'}
        </h3>
        <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', flexShrink: 0 }}>
          <X size={24} />
        </button>
      </div>

      {isLoading ? (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)', gap: '1rem' }}>
          <Loader2 size={32} className="spin" />
          <span>Fetching live server details...</span>
        </div>
      ) : error ? (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'var(--status-error)', gap: '1rem' }}>
          <AlertTriangle size={32} />
          <span style={{ textAlign: 'center' }}>{error}</span>
          <button onClick={onClose} style={{ marginTop: '1rem', padding: '0.5rem 1rem', background: 'var(--bg-panel)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', borderRadius: '4px' }}>Close</button>
        </div>
      ) : !server ? null : (
        <>
          {/* Action Buttons */}
          <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
            <button 
              onClick={() => {
                if (!isAuthenticated) {
                  setShowAuthCta('active_server');
                  return;
                }
                if (onSetActiveServer) onSetActiveServer(server.id, server.internal_uuid);
              }}
              disabled={isActiveServer}
              style={{ 
                flex: 1, padding: '0.75rem', borderRadius: '4px',
                cursor: isActiveServer ? 'default' : 'pointer',
                backgroundColor: isActiveServer ? 'var(--status-success)' : 'var(--accent-rust)',
                color: '#fff',
                border: 'none',
                fontWeight: 'bold', display: 'flex', justifyContent: 'center', gap: '0.5rem', alignItems: 'center'
              }}
            >
              {isActiveServer ? '✓ Active Server' : 'Set Active'}
            </button>
            <button 
              onClick={() => {
                if (!isAuthenticated) {
                  setShowAuthCta('watchlist');
                  return;
                }
                onToggleWatch(server.id, server.internal_uuid);
              }}
              style={{ 
                flex: 1, padding: '0.75rem', borderRadius: '4px', cursor: 'pointer',
                backgroundColor: isWatched ? 'var(--bg-hover)' : 'transparent',
                color: isWatched ? 'var(--status-error)' : 'var(--text-primary)',
                border: '1px solid var(--border-color)',
                fontWeight: 'bold', display: 'flex', justifyContent: 'center', gap: '0.5rem', alignItems: 'center'
              }}
            >
              {isWatched ? 'Remove Watchlist' : 'Add Watchlist'}
            </button>
          </div>

          {showAuthCta && (
            <div style={{ marginBottom: '2rem', padding: '1.5rem', border: '1px dashed var(--accent-rust)', borderRadius: '4px', backgroundColor: 'rgba(205, 65, 43, 0.1)' }}>
              <p style={{ margin: '0 0 1rem 0', fontSize: '0.875rem', textAlign: 'center', color: 'var(--text-primary)' }}>
                {showAuthCta === 'watchlist' ? 'Sign in with Steam to add this server to your Watchlist.' : 'Sign in with Steam to set an Active Server.'}
              </p>
              <button 
                className="btn-steam" 
                onClick={() => {
                   window.sessionStorage.setItem('serverExplorer.pendingAction', showAuthCta);
                   window.sessionStorage.setItem('serverExplorer.selectedServerId', server.id);
                   window.sessionStorage.setItem('serverExplorer.view', 'servers');
                   const query = (document.querySelector('input[placeholder="Search live Rust servers by name..."]') as HTMLInputElement)?.value || '';
                   window.sessionStorage.setItem('serverExplorer.query', query);
                   
                   const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
                   if (supabaseUrl) {
                     const origin = encodeURIComponent(window.location.origin);
                     window.location.href = `${supabaseUrl}/functions/v1/steam-auth?action=login&origin=${origin}`;
                   }
                }}
                style={{ width: '100%', justifyContent: 'center' }}
              >
                Sign in with Steam
              </button>
            </div>
          )}

          {/* Map Intelligence (Gated) */}
          <div style={{ marginBottom: '2rem', position: 'relative', borderRadius: '8px', overflow: 'hidden', border: '1px solid var(--border-color)' }}>
            <div style={{ height: '200px', backgroundColor: '#111', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundImage: 'radial-gradient(circle at center, #222 0%, #111 100%)' }}>
               <MapIcon size={48} style={{ color: 'var(--text-muted)', opacity: 0.2, marginBottom: '1rem' }} />
               
               <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(20,20,22,0.85)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '2rem' }}>
                  <Lock size={24} style={{ color: 'var(--accent-rust)', marginBottom: '1rem' }} />
                  <h4 style={{ margin: '0 0 0.5rem 0', color: '#fff' }}>Map Intelligence Locked</h4>
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', margin: 0, lineHeight: 1.5 }}>
                    Requires RustMaps/Map parser integration. Will unlock map preview, monuments, heatmap overlays, and build-location recommendations.
                  </p>
               </div>
            </div>
            <div style={{ backgroundColor: 'var(--bg-panel)', padding: '0.75rem', fontSize: '0.875rem', display: 'flex', justifyContent: 'space-between', borderTop: '1px solid var(--border-color)' }}>
               <span style={{ color: 'var(--text-muted)' }}>Map Seed:</span>
               <span style={{ fontFamily: 'monospace', fontWeight: 'bold' }}>{server.details?.rust_world_seed || 'Unknown'}</span>
            </div>
            <div style={{ backgroundColor: 'var(--bg-panel)', padding: '0.75rem', fontSize: '0.875rem', display: 'flex', justifyContent: 'space-between', borderTop: '1px solid var(--border-color)' }}>
               <span style={{ color: 'var(--text-muted)' }}>Map Size:</span>
               <span style={{ fontFamily: 'monospace', fontWeight: 'bold' }}>{server.details?.rust_world_size || 'Unknown'}</span>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div className="card-title">Live Server Statistics</div>
            {server.details?.rust_type && (
               <div style={{ marginBottom: '1rem' }}>
                 <span className="badge" style={{ backgroundColor: 'var(--bg-panel)', border: '1px solid var(--accent-rust)', color: 'var(--accent-rust)', textTransform: 'capitalize' }}>
                   {server.details.rust_type}
                 </span>
               </div>
            )}
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', fontSize: '0.875rem', backgroundColor: 'var(--bg-panel)', padding: '1rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                <span style={{ color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}><Users size={14}/> Players</span>
                <span className="value-highlight">{server.players} / {server.maxPlayers}</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>Queue</span>
                <span className="value-highlight" style={{ color: server.details?.rust_queued_players ? 'var(--status-warning)' : 'inherit' }}>
                  {server.details?.rust_queued_players || 0}
                </span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                <span style={{ color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}><Globe size={14}/> Country</span>
                <span className="value-highlight">{server.country || 'Unknown'}</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                <span style={{ color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}><MapIcon size={14}/> Map</span>
                <span className="value-highlight">{server.map || 'Unknown'}</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>Status</span>
                <span className="value-highlight">{server.status}</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>Rank</span>
                <span className="value-highlight">#{server.details?.rank || 'N/A'}</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>Wipe</span>
                <span className="value-highlight">{server.details?.rust_last_wipe ? new Date(server.details.rust_last_wipe).toLocaleDateString() : 'Unknown'}</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', gridColumn: '1 / -1' }}>
                <span style={{ color: 'var(--text-muted)' }}>Address</span>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <span className="value-highlight" style={{ flex: 1, fontFamily: 'monospace', backgroundColor: 'var(--bg-hover)', padding: '0.5rem', borderRadius: '4px', userSelect: 'all', display: 'flex', alignItems: 'center' }}>
                    client.connect {server.ip}:{server.port}
                  </span>
                  <button 
                    onClick={(e) => {
                       const btn = e.currentTarget;
                       navigator.clipboard.writeText(`client.connect ${server.ip}:${server.port}`);
                       const originalText = btn.innerText;
                       btn.innerText = 'Copied!';
                       setTimeout(() => { btn.innerText = originalText; }, 2000);
                    }}
                    style={{ padding: '0.5rem 1rem', background: 'var(--bg-panel)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
                    title="Copy connect command"
                  >
                    Copy Command
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div style={{ marginTop: '2rem' }}>
             <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', color: 'var(--accent-rust)' }}>
               <LineChartIcon size={16} />
               <span style={{ fontWeight: 'bold' }}>Server Pulse</span>
             </div>
             <div style={{ backgroundColor: 'var(--bg-panel)', padding: '1.5rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
               {(() => {
                 if (isSnapshotsLoading) {
                   return <div style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Loading historical data...</div>;
                 }
                 const pulse = calculatePulseSummary(snapshots, server.details?.rust_last_wipe);
                 
                 let predictionColor = 'var(--text-muted)';
                 let predictionText = '';
                 
                 switch (pulse.earlyPredictionState) {
                   case 'first_seen':
                     predictionText = 'First observation collected.';
                     break;
                   case 'collecting':
                     predictionText = 'Trend collecting.';
                     break;
                   case 'early_trend':
                     predictionText = `Early signal: ${pulse.earlyTrendDirection === 'population_up' ? '📈 Rising' : pulse.earlyTrendDirection === 'population_down' ? '📉 Falling' : '➖ Stable'}. Improves with more snapshots.`;
                     if (pulse.earlyTrendDirection === 'population_up') predictionColor = 'var(--status-success)';
                     if (pulse.earlyTrendDirection === 'population_down') predictionColor = 'var(--status-error)';
                     if (pulse.earlyTrendDirection === 'population_stable') predictionColor = 'var(--status-warning)';
                     break;
                   case 'retention_ready':
                     predictionText = 'Retention ready.';
                     break;
                 }

                 return (
                   <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                     <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
                       <span style={{ color: 'var(--text-muted)' }}>First seen:</span>
                       <span style={{ fontWeight: 'bold' }}>{pulse.firstObservedAt ? new Date(pulse.firstObservedAt).toLocaleString() : 'Unknown'}</span>
                     </div>
                     <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
                       <span style={{ color: 'var(--text-muted)' }}>Last observed:</span>
                       <span style={{ fontWeight: 'bold' }}>{pulse.lastObservedAt ? new Date(pulse.lastObservedAt).toLocaleString() : 'Unknown'}</span>
                     </div>
                     <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
                       <span style={{ color: 'var(--text-muted)' }}>Snapshots collected:</span>
                       <span style={{ fontWeight: 'bold' }}>{pulse.snapshotCount}</span>
                     </div>
                     
                     <div style={{ padding: '0.75rem', backgroundColor: 'var(--bg-hover)', borderRadius: '4px', borderLeft: `3px solid ${predictionColor}`, marginTop: '0.5rem' }}>
                        <span style={{ fontSize: '0.875rem', color: 'var(--text-primary)', fontWeight: 'bold' }}>{predictionText}</span>
                     </div>

                     {(pulse.status === 'ready' || pulse.status === 'insufficient_data') && pulse.earlyPredictionState === 'retention_ready' && (
                       <>
                         <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', marginTop: '0.5rem' }}>
                           <span style={{ color: 'var(--text-muted)' }}>Health Label:</span>
                           <span style={{ fontWeight: 'bold', color: pulse.healthLabel === 'Strong Retention' ? 'var(--status-success)' : pulse.healthLabel === 'Moderate Drop' ? 'var(--status-warning)' : pulse.healthLabel === 'Fast Dying' ? 'var(--status-error)' : 'var(--text-muted)' }}>
                             {pulse.healthLabel}
                           </span>
                         </div>
  
                         <div style={{ marginTop: '0.5rem' }}>
                           <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '0.5rem', display: 'block' }}>Population Retention (Wipe Age)</span>
                           <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
                             {['h6', 'h12', 'h18', 'h24', 'h30'].map(bucket => {
                               const val = pulse.buckets[bucket as keyof typeof pulse.buckets];
                               return (
                                 <div key={bucket} style={{ flexShrink: 0, padding: '0.5rem', backgroundColor: 'var(--bg-hover)', borderRadius: '4px', border: '1px solid var(--border-color)', minWidth: '60px', textAlign: 'center' }}>
                                   <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{bucket.replace('h', '')}h</div>
                                   <div style={{ fontSize: '1rem', fontWeight: 'bold', color: val !== null ? 'var(--text-primary)' : 'var(--text-disabled)' }}>
                                     {val !== null ? `${val}%` : '-'}
                                   </div>
                                 </div>
                               );
                             })}
                           </div>
                         </div>
                       </>
                     )}
                   </div>
                 );
               })()}
             </div>
          </div>

          <div style={{ marginTop: '2rem' }}>
             <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', color: 'var(--status-warning)' }}>
               <ShieldAlert size={16} />
               <span style={{ fontWeight: 'bold' }}>Performance Intel (Gated)</span>
             </div>
             <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', fontSize: '0.875rem', backgroundColor: 'var(--bg-panel)', padding: '1rem', borderRadius: '8px', border: '1px solid var(--border-color)', opacity: 0.7 }}>
               <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                 <span style={{ color: 'var(--text-disabled)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}><Zap size={14}/> Server FPS</span>
                 <span style={{ color: 'var(--text-disabled)', fontFamily: 'monospace' }}>{server.details?.fps ? `${server.details.fps} fps` : 'Gated'}</span>
               </div>
               <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                 <span style={{ color: 'var(--text-disabled)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}><Activity size={14}/> Entity Count</span>
                 <span style={{ color: 'var(--text-disabled)', fontFamily: 'monospace' }}>{server.details?.rust_ent_cnt_i?.toLocaleString() || 'Gated'}</span>
               </div>
             </div>
          </div>
        </>
      )}
    </div>
  );
}
