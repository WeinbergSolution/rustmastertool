import { useState, useEffect } from 'react';
import { X, ShieldAlert, Loader2 } from 'lucide-react';
import { useAuth } from '../../lib/auth/useAuth';
import { watchlistRepository } from '../../lib/data/watchlistRepository';
import type { BattleMetricsServerSummary } from '../../lib/api/battlemetrics';
import { ServerDetailPanel } from './ServerDetailPanel';
import { supabase } from '../../lib/supabaseClient';

export function Watchlist() {
  const { status, user } = useAuth();
  const [watchedServers, setWatchedServers] = useState<BattleMetricsServerSummary[]>([]);
  const [isWatchlistLoading, setIsWatchlistLoading] = useState(true);
  const [selectedServerId, setSelectedServerId] = useState<string | null>(null);
  const [activeServerId, setActiveServerId] = useState<string | null>(null);

  const cloudRepo = (status === 'authenticated' && import.meta.env.VITE_DATA_MODE === 'supabase') ? watchlistRepository : null;

  useEffect(() => {
    let mounted = true;
    async function loadData() {
      setIsWatchlistLoading(true);
      try {
        if (status === 'authenticated' && user) {
           const saved = window.localStorage.getItem(`rm_watchlist_${user.id}`);
           if (saved && mounted) {
             setWatchedServers(JSON.parse(saved));
           } else if (mounted) {
             setWatchedServers([]);
           }
           if (supabase) {
             const { data: p } = await supabase.from('profiles').select('active_server_id').eq('id', user.id).single();
             if (p?.active_server_id && mounted) setActiveServerId(p.active_server_id);
           }
        } else if (status === 'unauthenticated' && mounted) {
           setWatchedServers([]);
           setActiveServerId(null);
        }
      } catch (e) {
        console.warn('Failed to load data', e);
      } finally {
        if (mounted) setIsWatchlistLoading(false);
      }
    }
    if (status !== 'auth_pending') loadData();
    
    const handleWatchlistUpdated = () => {
      if (status !== 'auth_pending') loadData();
    };
    window.addEventListener('watchlistUpdated', handleWatchlistUpdated);
    
    return () => { 
      mounted = false; 
      window.removeEventListener('watchlistUpdated', handleWatchlistUpdated);
    };
  }, [status, user]);

  const toggleWatch = async (id: string, internalUuid?: string) => {
    if (status !== 'authenticated' || !user) return;
    const existingIndex = watchedServers.findIndex(s => s.id === id);
    const oldServers = [...watchedServers];
    let newServers: BattleMetricsServerSummary[];
    let resolvedUuid = internalUuid;
    
    if (existingIndex >= 0) {
      resolvedUuid = internalUuid || (watchedServers[existingIndex] as any).internal_uuid;
      newServers = watchedServers.filter(s => s.id !== id);
    } else {
      return; 
    }
    
    setWatchedServers(newServers);
    try { window.localStorage.setItem(`rm_watchlist_${user.id}`, JSON.stringify(newServers)); } catch (e) {}
    window.dispatchEvent(new Event('watchlistUpdated'));

    if (cloudRepo && resolvedUuid) {
       try { 
         await cloudRepo.toggleServer(id, resolvedUuid); 
       } catch (e) {
         console.error(e);
         setWatchedServers(oldServers);
         try { window.localStorage.setItem(`rm_watchlist_${user.id}`, JSON.stringify(oldServers)); } catch (err) {}
         window.dispatchEvent(new Event('watchlistUpdated'));
         alert('Failed to update watchlist on server. Changes reverted.');
       }
    }
  };

  const handleSetActiveServer = async (_serverId: string, internalUuid?: string) => {
    if (status !== 'authenticated' || !supabase || !user || !internalUuid) return;
    try {
      const { error } = await supabase.from('profiles').update({ active_server_id: internalUuid }).eq('id', user.id);
      if (!error) setActiveServerId(internalUuid);
    } catch (e) {}
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', height: '100%' }}>
      <div className="card" style={{ flex: 1 }}>
        <div className="card-title" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <span>Your Watchlist</span>
          <span className="badge" style={{ backgroundColor: 'var(--bg-hover)' }}>{watchedServers.length} Servers</span>
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', height: '100%' }}>
          {status !== 'authenticated' ? (
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '4rem', textAlign: 'center', border: '1px dashed var(--border-color)', borderRadius: '4px', color: 'var(--text-muted)' }}>
              <ShieldAlert size={48} style={{ margin: '0 auto 1rem', opacity: 0.5 }} />
              <h3>Authentication Required</h3>
              <p style={{ maxWidth: '400px', marginTop: '0.5rem' }}>Sign in with Steam to manage and view your Watchlist. Your watchlist is securely bound to your Steam Identity.</p>
            </div>
          ) : isWatchlistLoading ? (
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '4rem', color: 'var(--text-muted)' }}>
              <Loader2 size={32} className="spin" />
            </div>
          ) : watchedServers.length === 0 ? (
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '4rem', border: '1px dashed var(--border-color)', borderRadius: '4px', color: 'var(--text-muted)' }}>
              <h3 style={{ marginBottom: '0.5rem' }}>Watchlist is Empty</h3>
              <p>Open the Server Explorer to find live Rust servers and add them here.</p>
            </div>
          ) : (
            <div className="server-list" style={{ gridTemplateColumns: '1fr', gap: '0.75rem' }}>
              {watchedServers.map(server => (
                <div key={server.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'var(--bg-panel)', padding: '1rem 1.5rem', borderRadius: '4px', border: '1px solid var(--border-color)', cursor: 'pointer' }} onClick={() => setSelectedServerId(server.id)}>
                  <div>
                    <div style={{ fontSize: '1rem', fontWeight: 'bold', marginBottom: '0.25rem' }}>{server.name}</div>
                    <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>{server.players} / {server.maxPlayers} Players • {server.status}</div>
                  </div>
                  <button onClick={(e) => { e.stopPropagation(); toggleWatch(server.id); }} style={{ background: 'rgba(255, 50, 50, 0.1)', border: '1px solid rgba(255, 50, 50, 0.3)', color: 'var(--status-error)', padding: '0.5rem', borderRadius: '4px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }} title="Remove from Watchlist">
                    <X size={20} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      
      {selectedServerId && (
        <ServerDetailPanel 
          serverId={selectedServerId}
          isWatched={true}
          onClose={() => setSelectedServerId(null)}
          onToggleWatch={toggleWatch}
          onSetActiveServer={handleSetActiveServer}
          isActiveServer={watchedServers.find(s => s.id === selectedServerId)?.internal_uuid ? watchedServers.find(s => s.id === selectedServerId)?.internal_uuid === activeServerId : false}
          isAuthenticated={status === 'authenticated'}
        />
      )}
    </div>
  );
}
