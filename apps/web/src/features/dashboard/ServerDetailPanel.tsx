import { useState, useEffect } from 'react';
import { X, ShieldAlert, Activity, Globe, Map as MapIcon, Users, Clock, Zap, Loader2, AlertTriangle } from 'lucide-react';
import { getServerDetails, type BattleMetricsServerDetail } from '../../lib/api/battlemetrics';

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

    return () => {
      mounted = false;
    };
  }, [serverId]);

  const dataMode = import.meta.env.VITE_DATA_MODE || 'fixture';
  const isLive = dataMode === 'supabase';

  return (
    <div style={{
      position: 'fixed', top: 0, right: 0, bottom: 0, width: '400px',
      backgroundColor: 'var(--bg-card)', borderLeft: '1px solid var(--border-color)',
      boxShadow: '-4px 0 15px rgba(0,0,0,0.5)', zIndex: 100, display: 'flex', flexDirection: 'column',
      padding: '1.5rem', overflowY: 'auto'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
        <h3 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.25rem' }}>
          {!isLoading && server && (
            <span style={{ 
              width: '10px', height: '10px', borderRadius: '50%', 
              backgroundColor: server.status === 'online' ? 'var(--status-online)' : 'var(--status-offline)' 
            }}></span>
          )}
          {isLoading ? 'Loading...' : server?.name || 'Server Details'}
        </h3>
        <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
          <X size={20} />
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
          <div style={{ marginBottom: '2rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <button 
              onClick={() => {
                if (!isAuthenticated) {
                  setShowAuthCta('watchlist');
                  return;
                }
                onToggleWatch(server.id, server.internal_uuid);
              }}
              style={{ 
                width: '100%', padding: '0.75rem', borderRadius: '4px', cursor: 'pointer',
                backgroundColor: isWatched ? 'var(--bg-hover)' : 'var(--accent-rust)',
                color: isWatched ? 'var(--text-color)' : '#fff',
                border: isWatched ? '1px solid var(--border-color)' : 'none',
                fontWeight: 'bold', display: 'flex', justifyContent: 'center', gap: '0.5rem', alignItems: 'center'
              }}
            >
              {isWatched ? `★ ${isLive ? 'Remove from Watchlist' : 'Remove from Local Watchlist'}` : `☆ ${isLive ? 'Add to Watchlist' : 'Add to Local Watchlist'}`}
            </button>
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
                width: '100%', padding: '0.75rem', borderRadius: '4px',
                cursor: isActiveServer ? 'default' : 'pointer',
                backgroundColor: isActiveServer ? 'var(--status-success)' : 'transparent',
                color: isActiveServer ? '#fff' : 'var(--text-primary)',
                border: isActiveServer ? 'none' : '1px solid var(--border-color)',
                fontWeight: 'bold', display: 'flex', justifyContent: 'center', gap: '0.5rem', alignItems: 'center'
              }}
            >
              {isActiveServer ? '✓ Active Server' : 'Set as Active Server'}
            </button>

            {showAuthCta && (
              <div style={{ marginTop: '0.5rem', padding: '1rem', border: '1px dashed var(--accent-rust)', borderRadius: '4px', backgroundColor: 'rgba(205, 65, 43, 0.1)' }}>
                <p style={{ margin: '0 0 1rem 0', fontSize: '0.875rem', textAlign: 'center' }}>
                  {showAuthCta === 'watchlist' ? 'Sign in with Steam to add this server to your Watchlist.' : 'Sign in with Steam to set an Active Server.'}
                </p>
                <button 
                  className="btn-steam" 
                  onClick={() => {
                     // Save context to session storage before redirecting
                     window.sessionStorage.setItem('serverExplorer.pendingAction', showAuthCta);
                     window.sessionStorage.setItem('serverExplorer.selectedServerId', server.id);
                     window.sessionStorage.setItem('serverExplorer.view', 'servers'); // Ensure we return to servers tab
                     const query = (document.querySelector('input[placeholder="Search live Rust servers by name..."]') as HTMLInputElement)?.value || '';
                     window.sessionStorage.setItem('serverExplorer.query', query);
                     
                     // Trigger Steam Login
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
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div className="card-title">Live Server Details</div>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', fontSize: '0.875rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                <span style={{ color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}><Users size={14}/> Players</span>
                <span className="value-highlight">{server.players} / {server.maxPlayers}</span>
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
                <span style={{ color: 'var(--text-muted)' }}>Address</span>
                <span className="value-highlight">{server.ip}:{server.port}</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                <span style={{ color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}><Clock size={14}/> Last Updated</span>
                <span className="value-highlight">{new Date(server.updatedAt).toLocaleString()}</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>BM Server ID</span>
                <span className="value-highlight">{server.id}</span>
              </div>
            </div>
          </div>

          <div className="card" style={{ marginTop: '2rem', backgroundColor: 'var(--bg-panel)' }}>
             <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', color: 'var(--status-warning)' }}>
               <ShieldAlert size={16} />
               <span style={{ fontWeight: 'bold' }}>Gated Intelligence</span>
             </div>
             <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', fontSize: '0.875rem' }}>
               <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                 <span style={{ color: 'var(--text-disabled)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}><Zap size={14}/> FPS</span>
                 <span style={{ color: 'var(--text-disabled)' }}>{server.details?.fps || 'Gated'}</span>
               </div>
               <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                 <span style={{ color: 'var(--text-disabled)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}><Activity size={14}/> Entities</span>
                 <span style={{ color: 'var(--text-disabled)' }}>{server.details?.rust_ent_cnt_i?.toLocaleString() || 'Gated'}</span>
               </div>
             </div>
             <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '1rem', borderTop: '1px solid var(--border-color)', paddingTop: '0.5rem' }}>
               Live provider ingestion for historical data is currently disabled. Auth required for cloud persistence.
             </p>
          </div>
        </>
      )}
    </div>
  );
}
