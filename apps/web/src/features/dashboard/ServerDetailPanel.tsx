import { useState, useEffect, useRef, type CSSProperties } from 'react';
import { X, ShieldAlert, Globe, Map as MapIcon, Users, Loader2, AlertTriangle, Maximize2 } from 'lucide-react';
import { getServerDetails, type BattleMetricsServerDetail } from '../../lib/api/battlemetrics';
import { getServerSnapshots, type ServerPopulationSnapshot } from '../../lib/api/serverPulse';
import { calculatePulseSummary } from '../../lib/api/retention';
import { LineChart as LineChartIcon } from 'lucide-react';
import { useIsMobile } from '../../components/mobile/useIsMobile';
import { classifyMonument, type MonumentClassification } from '../learn/map-intel/monumentClassification';
import { MAP_MONUMENTS, MONUMENT_CATEGORIES, type MonumentCategoryId } from '../learn/map-intel/mapIntelData';

interface ServerDetailPanelProps {
  serverId: string;
  isWatched: boolean;
  onClose: () => void;
  onToggleWatch: (serverId: string, internalUuid?: string) => void;
  onSetActiveServer?: (serverId: string, internalUuid?: string) => void;
  isActiveServer?: boolean;
  isAuthenticated?: boolean;
  initialFocus?: 'map' | null;
  serverSummary?: any;
}

import { supabase } from '../../lib/supabaseClient';

export function ServerDetailPanel({ serverId, isWatched, onClose, onToggleWatch, onSetActiveServer, isActiveServer, isAuthenticated, initialFocus, serverSummary }: ServerDetailPanelProps) {
  const [server, setServer] = useState<BattleMetricsServerDetail | null>(null);
  const [mapIdentity, setMapIdentity] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showAuthCta, setShowAuthCta] = useState<'watchlist' | 'active_server' | null>(null);
  const [snapshots, setSnapshots] = useState<ServerPopulationSnapshot[]>([]);
  const [isSnapshotsLoading, setIsSnapshotsLoading] = useState(false);
  const [isMapEnlarged, setIsMapEnlarged] = useState(false);
  const [isMonumentsExpanded, setIsMonumentsExpanded] = useState(false);
  const [selectedMonument, setSelectedMonument] = useState<MonumentClassification | null>(null);
  const isMobile = useIsMobile();
  const mapSectionRef = useRef<HTMLDivElement>(null);

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

    // Also fetch map identity from DB
    if (supabase) {
      supabase
        .from('server_map_identity')
        .select('rustmaps_thumbnail_url, rustmaps_map_url, is_custom_map, seed, world_size, map_type')
        .eq('battlemetrics_server_id', serverId)
        .order('created_at', { ascending: false })
        .limit(1)
        .then(({ data }) => {
          if (mounted && data && data.length > 0) {
            setMapIdentity(data[0]);
          }
        });
    }

    return () => {
      mounted = false;
    };
  }, [serverId]);

  const [pulseError, setPulseError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    if (!server?.id) return;
    
    setIsSnapshotsLoading(true);
    setPulseError(null);
    getServerSnapshots(server.id).then(data => {
      if (mounted) setSnapshots(data);
    }).catch(e => {
      if (mounted) setPulseError(e.message || 'Pulse data could not be loaded');
    }).finally(() => {
      if (mounted) setIsSnapshotsLoading(false);
    });
    
    return () => { mounted = false; };
  }, [server?.id]);

  // When opened via the card's map indicator, scroll to the map section once loaded.
  useEffect(() => {
    if (!isLoading && server && initialFocus === 'map' && mapSectionRef.current) {
      mapSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [isLoading, server, initialFocus]);

  const containerStyle: CSSProperties = isMobile
    ? {
        position: 'fixed', inset: 0, width: '100%', maxWidth: 'none',
        backgroundColor: 'var(--bg-card)', zIndex: 100,
        display: 'flex', flexDirection: 'column',
        padding: '1rem',
        paddingTop: 'calc(1rem + env(safe-area-inset-top))',
        paddingBottom: 'calc(1.5rem + env(safe-area-inset-bottom))',
        overflowX: 'hidden', overflowY: 'auto',
      }
    : {
        position: 'fixed', top: 0, right: 0, bottom: 0, width: '450px',
        backgroundColor: 'var(--bg-card)', borderLeft: '1px solid var(--border-color)',
        boxShadow: '-4px 0 25px rgba(0,0,0,0.8)', zIndex: 100, display: 'flex', flexDirection: 'column',
        padding: '2rem', overflowY: 'auto',
      };

  return (
    <div style={containerStyle}>
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
                if (!serverSummary?.internal_uuid) {
                  alert('You must save this server to your watchlist before setting it as active.');
                  return;
                }
                if (onSetActiveServer) onSetActiveServer(server.id, serverSummary.internal_uuid);
              }}
              disabled={isActiveServer || !serverSummary?.internal_uuid}
              title={!serverSummary?.internal_uuid ? 'Save this server to your Watchlist first' : ''}
              style={{ 
                flex: 1, padding: '0.75rem', borderRadius: '4px',
                cursor: isActiveServer || !serverSummary?.internal_uuid ? 'not-allowed' : 'pointer',
                backgroundColor: isActiveServer ? 'var(--status-success)' : 'var(--accent-rust)',
                color: '#fff',
                border: 'none',
                opacity: !serverSummary?.internal_uuid ? 0.5 : 1,
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
              {isWatched ? 'Remove Saved' : 'Save Server'}
            </button>
          </div>

          {showAuthCta && (
            <div style={{ marginBottom: '2rem', padding: '1.5rem', border: '1px dashed var(--accent-rust)', borderRadius: '4px', backgroundColor: 'rgba(205, 65, 43, 0.1)' }}>
              <p style={{ margin: '0 0 1rem 0', fontSize: '0.875rem', textAlign: 'center', color: 'var(--text-primary)' }}>
                {showAuthCta === 'watchlist' ? 'Sign in with Steam to save this server.' : 'Sign in with Steam to set an Active Server.'}
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

          {/* Map Preview MVP */}
          <div ref={mapSectionRef} style={{ flexShrink: 0, marginBottom: '2rem', position: 'relative', borderRadius: '8px', overflow: 'hidden', border: '1px solid var(--border-color)', scrollMarginTop: '1rem', backgroundColor: 'var(--bg-panel)' }}>
             {(() => {
                const details = server.details || {};
                const mapType = mapIdentity?.map_type || (details.map === 'Procedural Map' ? 'procedural' : details.map === 'Barren' ? 'barren' : 'custom');
                const hasRustMaps = !!details.rust_maps;
                
                // Priority 1: DB server_map_identity.rustmaps_thumbnail_url
                // Priority 2: BM embedded details.rust_maps.thumbnailUrl
                // Priority 3: Enriched serverSummary.mapThumbnailUrl
                const thumbnailUrl = mapIdentity?.rustmaps_thumbnail_url || (hasRustMaps ? details.rust_maps?.thumbnailUrl : null) || serverSummary?.mapThumbnailUrl || serverSummary?.mapImageUrl;
                const fullImageUrl = mapIdentity?.rustmaps_map_url || (hasRustMaps ? details.rust_maps?.url : null) || serverSummary?.mapImageUrl || thumbnailUrl;
                const isCustomMap = mapIdentity?.is_custom_map || mapType === 'custom';
                const mapSize = mapIdentity?.world_size || details.rust_world_size || serverSummary?.mapSize || serverSummary?.mapIdentitySize;
                
                const displayUrl = thumbnailUrl || fullImageUrl;

                return (
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <div 
                      style={{ position: 'relative', width: '100%', height: '200px', backgroundColor: '#111', cursor: fullImageUrl ? 'zoom-in' : 'default', overflow: 'hidden' }} 
                      onClick={() => fullImageUrl && setIsMapEnlarged(true)}
                    >
                      {displayUrl ? (
                        <img src={displayUrl} alt="Map Thumbnail" style={{ display: 'block', width: '100%', height: '100%', objectFit: 'cover' }} />
                      ) : (
                        // Radar/Blueprint Placeholder
                        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)', backgroundSize: '20px 20px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>
                          {isCustomMap ? <AlertTriangle size={48} style={{ opacity: 0.5, marginBottom: '0.5rem', color: 'var(--status-warning)' }} /> : <MapIcon size={48} style={{ opacity: 0.2, marginBottom: '0.5rem' }} />}
                          <span style={{ fontSize: '1rem', fontWeight: 'bold', color: isCustomMap ? 'var(--status-warning)' : 'var(--text-muted)' }}>{isCustomMap ? 'Custom Map' : 'Map Pending'}</span>
                          <span style={{ fontSize: '0.75rem', opacity: 0.7 }}>{isCustomMap ? 'No preview available' : 'Awaiting telemetry'}</span>
                        </div>
                      )}
                      
                      {fullImageUrl && (
                        <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0, transition: 'opacity 0.2s', ':hover': { opacity: 1 } } as any}>
                          <Maximize2 size={32} color="#fff" />
                        </div>
                      )}
                      
                      <div style={{ position: 'absolute', top: '0.5rem', left: '0.5rem', backgroundColor: 'rgba(0,0,0,0.7)', padding: '0.25rem 0.5rem', borderRadius: '4px', fontSize: '0.75rem', color: '#fff', fontWeight: 'bold' }}>
                        {mapType === 'barren' ? 'Barren' : mapType === 'custom' ? 'Custom Map' : 'Procedural Map'} {mapSize ? `· Size: ${mapSize}` : ''}
                      </div>
                    </div>
                    
                    {isMapEnlarged && fullImageUrl && (
                      <div 
                        style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.85)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'zoom-out' }}
                        onClick={() => setIsMapEnlarged(false)}
                      >
                        <img 
                          src={fullImageUrl} 
                          alt="Map Enlarged" 
                          style={{ width: 'min(92vw, 1100px)', height: '88vh', objectFit: 'contain', borderRadius: '8px', boxShadow: '0 4px 20px rgba(0,0,0,0.5)' }} 
                          onError={(e) => {
                            if (displayUrl && e.currentTarget.src !== displayUrl) {
                              e.currentTarget.src = displayUrl;
                            }
                          }}
                        />
                      </div>
                    )}

                    {details.rust_maps?.monuments && details.rust_maps.monuments.length > 0 && (
                      <div style={{ padding: '0.75rem', backgroundColor: 'var(--bg-panel)', borderTop: '1px solid var(--border-color)' }}>
                        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                          {(isMonumentsExpanded ? details.rust_maps.monuments : details.rust_maps.monuments.slice(0, 5)).map((m: string) => {
                            const cls = classifyMonument(m);
                            const known = cls.canonicalId !== null;
                            return (
                              <button
                                key={m}
                                type="button"
                                onClick={() => setSelectedMonument(cls)}
                                title={known ? `${cls.category.replace('_', ' ')}${cls.needsOwnerReview ? ' · needs review' : ''}` : 'Not yet classified'}
                                style={{ fontSize: '0.75rem', backgroundColor: 'var(--bg-hover)', border: '1px solid var(--border-color)', padding: '0.25rem 0.5rem', borderRadius: '4px', color: known ? 'var(--text-primary)' : 'var(--text-muted)', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.35rem', fontStyle: known ? 'normal' : 'italic' }}
                              >
                                <span style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: monumentCategoryColor(cls.category), display: 'inline-block', flexShrink: 0 }} />
                                {m}
                              </button>
                            );
                          })}
                          {!isMonumentsExpanded && details.rust_maps.monuments.length > 5 && (
                            <button 
                              onClick={() => setIsMonumentsExpanded(true)}
                              style={{ fontSize: '0.75rem', color: 'var(--text-muted)', backgroundColor: 'transparent', border: '1px dashed var(--border-color)', padding: '0.25rem 0.5rem', borderRadius: '4px', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                            >
                              +{details.rust_maps.monuments.length - 5} more
                            </button>
                          )}
                          {isMonumentsExpanded && details.rust_maps.monuments.length > 5 && (
                            <button 
                              onClick={() => setIsMonumentsExpanded(false)}
                              style={{ fontSize: '0.75rem', color: 'var(--text-muted)', backgroundColor: 'transparent', border: 'none', padding: '0.25rem 0.5rem', cursor: 'pointer', textDecoration: 'underline' }}
                            >
                              Show less
                            </button>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                );
             })()}
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
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  <span className="value-highlight" style={{ flex: '1 1 auto', fontFamily: 'monospace', backgroundColor: 'var(--bg-hover)', padding: '0.5rem', borderRadius: '4px', userSelect: 'all', display: 'flex', alignItems: 'center', wordBreak: 'break-all' }}>
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
                 if (pulseError) {
                   return <div style={{ color: 'var(--status-error)', fontSize: '0.875rem', padding: '1rem', textAlign: 'center' }}>{pulseError}</div>;
                 }
                 if (snapshots.length === 0) {
                   return (
                     <div style={{ color: 'var(--text-muted)', fontSize: '0.875rem', textAlign: 'center', padding: '1rem' }}>
                       Monitoring is enabled, but no snapshots have been collected for this server yet.
                     </div>
                   );
                 }
                 const pulse = calculatePulseSummary(snapshots, server.details?.rust_last_wipe);
                  
                  // Crash Game SVG Chart Calculation
                  const chronological = [...snapshots].reverse();
                  const w = 300;
                  const h = 100;
                  const minP = Math.min(...chronological.map(s => s.players || 0));
                  const maxP = Math.max(...chronological.map(s => s.players || 0));
                  const rangeP = maxP - minP || 1;
                  
                  const points = chronological.map((s, i) => {
                    const x = chronological.length > 1 ? (i / (chronological.length - 1)) * w : w / 2;
                    const y = h - (((s.players || 0) - minP) / rangeP) * (h - 20) - 10;
                    return `${x},${y}`;
                  });
                  const pathD = `M ${points.join(' L ')}`;
                  const areaD = `M ${points[0]?.split(',')[0]},${h} L ${points.join(' L ')} L ${points[points.length - 1]?.split(',')[0]},${h} Z`;
                  
                  const firstP = chronological[0]?.players || 0;
                  const lastP = chronological[chronological.length - 1]?.players || 0;
                  const trendDiff = lastP - firstP;
                  const isRising = trendDiff >= 0;
                  const themeColor = isRising ? '#00e676' : '#ff1744'; // Neon green vs Neon red

                  // Retention Helper text
                  const allRetentionNull = ['h6', 'h12', 'h18', 'h24', 'h30'].every(bucket => pulse.buckets[bucket as keyof typeof pulse.buckets] === null);

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
                      
                      {chronological.length > 1 && (
                        <div style={{ marginTop: '0.5rem', backgroundColor: '#0a0a0a', border: '1px solid #222', borderRadius: '8px', padding: '1rem', position: 'relative', overflow: 'hidden' }}>
                          <div style={{ position: 'absolute', top: '1rem', left: '1rem', display: 'flex', flexDirection: 'column' }}>
                            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>Current Trend</span>
                            <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: themeColor, textShadow: `0 0 10px ${themeColor}88` }}>
                              {trendDiff > 0 ? '+' : ''}{trendDiff} Players
                            </span>
                          </div>
                          
                          <svg viewBox={`0 0 ${w} ${h}`} style={{ width: '100%', height: '100px', display: 'block', marginTop: '1.5rem' }}>
                            <defs>
                              <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor={themeColor} stopOpacity="0.3" />
                                <stop offset="100%" stopColor={themeColor} stopOpacity="0.0" />
                              </linearGradient>
                            </defs>
                            <path d={areaD} fill="url(#chartGradient)" />
                            <path d={pathD} fill="none" stroke={themeColor} strokeWidth="2" style={{ filter: `drop-shadow(0 0 4px ${themeColor})` }} />
                            
                            {/* Latest point dot */}
                            {points.length > 0 && (
                              <circle 
                                cx={points[points.length - 1].split(',')[0]} 
                                cy={points[points.length - 1].split(',')[1]} 
                                r="4" 
                                fill={themeColor} 
                                style={{ filter: `drop-shadow(0 0 6px ${themeColor})` }} 
                              />
                            )}
                          </svg>
                        </div>
                      )}

                      {(pulse.status === 'ready' || pulse.status === 'insufficient_data' || pulse.snapshotCount > 0) && (
                        <>
                          {pulse.earlyPredictionState === 'retention_ready' && (
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', marginTop: '0.5rem' }}>
                              <span style={{ color: 'var(--text-muted)' }}>Health Label:</span>
                              <span style={{ fontWeight: 'bold', color: pulse.healthLabel === 'Strong Retention' ? 'var(--status-success)' : pulse.healthLabel === 'Moderate Drop' ? 'var(--status-warning)' : pulse.healthLabel === 'Fast Dying' ? 'var(--status-error)' : 'var(--text-muted)' }}>
                                {pulse.healthLabel}
                              </span>
                            </div>
                          )}
   
                          <div style={{ marginTop: '0.5rem' }}>
                            <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '0.5rem', display: 'flex', justifyContent: 'space-between' }}>
                              Population Retention (Wipe Age)
                            </span>
                            
                            {allRetentionNull && (
                              <div style={{ fontSize: '0.8rem', color: 'var(--status-warning)', marginBottom: '0.75rem', backgroundColor: 'rgba(234, 179, 8, 0.1)', padding: '0.5rem', borderRadius: '4px', borderLeft: '2px solid var(--status-warning)' }}>
                                No snapshots were recorded during the initial hours after the last wipe. Waiting for next wipe to calculate early retention.
                              </div>
                            )}

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
             <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', color: 'var(--text-disabled)' }}>
               <ShieldAlert size={16} />
               <span style={{ fontWeight: 'bold' }}>Performance Intel (Gated)</span>
             </div>
             <div style={{ padding: '1rem', border: '1px dashed var(--border-color)', borderRadius: '4px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
               Coming later: FPS/entity/performance signals once map parsing and live telemetry are available.
             </div>
           </div>
        </>
      )}

      {selectedMonument && (
        <MonumentInfoModal classification={selectedMonument} onClose={() => setSelectedMonument(null)} />
      )}
    </div>
  );
}

const CATEGORY_COLORS: Record<MonumentCategoryId, string> = {
  safe_zone: '#3fb950',
  tier_1: '#57ab5a',
  tier_2: '#4a7a9e',
  tier_3: '#ce422b',
  offshore: '#d29922',
  quarry: '#8b6d3f',
  roadside: '#6e7681',
  cave: '#8957e5',
  tunnel: '#8957e5',
  infrastructure: '#6e7681',
  terrain: '#2f81a3',
  rock_formation: '#a0724a',
  event: '#db61a2',
  unknown: '#484f58',
};

function monumentCategoryColor(category: MonumentCategoryId): string {
  return CATEGORY_COLORS[category] ?? CATEGORY_COLORS.unknown;
}

function MonumentInfoModal({ classification, onClose }: { classification: MonumentClassification; onClose: () => void }) {
  const entry = classification.canonicalId
    ? MAP_MONUMENTS.find((m) => m.id === classification.canonicalId) ?? null
    : null;
  const categoryName =
    MONUMENT_CATEGORIES.find((c) => c.id === classification.category)?.name ??
    classification.category.replace('_', ' ');
  const title = entry?.name ?? classification.rawName;
  const variantLabel = classification.variant ? classification.variant.replace(/_/g, ' ') : null;

  return (
    <div
      onClick={onClose}
      style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(4px)', zIndex: 10000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{ backgroundColor: 'var(--bg-panel, #1e1e24)', border: '1px solid var(--border-color, rgba(255,255,255,0.1))', borderRadius: '8px', width: '100%', maxWidth: '520px', maxHeight: '85vh', overflowY: 'auto', position: 'relative', color: 'var(--text-primary, #fff)' }}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          style={{ position: 'absolute', top: '0.75rem', right: '0.75rem', background: 'rgba(0,0,0,0.4)', border: 'none', color: '#fff', width: 30, height: 30, borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <X size={18} />
        </button>

        <div style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
            <span style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: monumentCategoryColor(classification.category), flexShrink: 0 }} />
            <h2 style={{ margin: 0, fontSize: '1.4rem' }}>{title}</h2>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1rem' }}>
            <span style={{ fontSize: '0.7rem', background: 'rgba(255,255,255,0.08)', padding: '0.2rem 0.55rem', borderRadius: '10px', textTransform: 'capitalize' }}>{categoryName}</span>
            {variantLabel && (
              <span style={{ fontSize: '0.7rem', background: 'rgba(255,255,255,0.08)', padding: '0.2rem 0.55rem', borderRadius: '10px', textTransform: 'capitalize' }}>{variantLabel}</span>
            )}
            <span style={{ fontSize: '0.7rem', background: classification.confidence === 'verified' ? 'rgba(63,185,80,0.15)' : 'rgba(210,153,34,0.15)', color: classification.confidence === 'verified' ? '#3fb950' : '#d29922', padding: '0.2rem 0.55rem', borderRadius: '10px' }}>{classification.confidence}</span>
            {classification.needsOwnerReview && (
              <span style={{ fontSize: '0.7rem', background: 'rgba(210,153,34,0.15)', color: '#d29922', padding: '0.2rem 0.55rem', borderRadius: '10px' }}>needs review</span>
            )}
          </div>

          {entry ? (
            <>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary, #c9d1d9)', lineHeight: 1.5, marginTop: 0 }}>{entry.explanation}</p>

              <MonumentSection title="Loot & Progression" body={entry.lootRelevance} />
              <MonumentSection title="Radiation" body={entry.radiationInfo} />

              {(entry.advantages.length > 0 || entry.disadvantages.length > 0) && (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', margin: '1rem 0' }}>
                  <div>
                    <h4 style={{ margin: '0 0 0.35rem', fontSize: '0.85rem', color: '#3fb950' }}>Advantages</h4>
                    <ul style={{ margin: 0, paddingLeft: '1.1rem', fontSize: '0.82rem', color: 'var(--text-secondary, #a0a0a0)' }}>
                      {entry.advantages.map((a, i) => <li key={i}>{a}</li>)}
                    </ul>
                  </div>
                  <div>
                    <h4 style={{ margin: '0 0 0.35rem', fontSize: '0.85rem', color: '#ce422b' }}>Disadvantages</h4>
                    <ul style={{ margin: 0, paddingLeft: '1.1rem', fontSize: '0.82rem', color: 'var(--text-secondary, #a0a0a0)' }}>
                      {entry.disadvantages.map((d, i) => <li key={i}>{d}</li>)}
                    </ul>
                  </div>
                </div>
              )}

              <div style={{ background: 'rgba(206,66,43,0.1)', borderLeft: '3px solid #ce422b', padding: '0.75rem', borderRadius: '0 4px 4px 0', marginTop: '0.5rem' }}>
                <strong style={{ fontSize: '0.8rem', color: '#ce422b' }}>Quick Tip</strong>
                <p style={{ margin: '0.25rem 0 0', fontSize: '0.82rem', color: 'var(--text-secondary, #e0e0e0)' }}>{entry.quickTip}</p>
              </div>
            </>
          ) : (
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted, #a0a0a0)', lineHeight: 1.5, marginTop: 0 }}>
              This location isn't classified in Map Intel yet. It's shown here exactly as the server reports it, without any guessed details.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

function MonumentSection({ title, body }: { title: string; body: string }) {
  return (
    <div style={{ marginBottom: '0.85rem' }}>
      <h4 style={{ margin: '0 0 0.25rem', fontSize: '0.85rem', color: 'var(--text-primary, #fff)' }}>{title}</h4>
      <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--text-secondary, #a0a0a0)', lineHeight: 1.5 }}>{body}</p>
    </div>
  );
}
