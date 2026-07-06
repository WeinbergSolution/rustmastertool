import { useState, useEffect } from 'react';
import { ServerCard } from './ServerCard';
import { ServerDetailPanel } from './ServerDetailPanel';
import { Search, AlertTriangle, Loader2 } from 'lucide-react';
import { searchServers, type BattleMetricsServerSummary } from '../../lib/api/battlemetrics';
import { useAuth } from '../../lib/auth/useAuth';
import { watchlistRepository } from '../../lib/data/watchlistRepository';
import { supabase } from '../../lib/supabaseClient';

export function ServersExplorer() {
  const { status, user } = useAuth();
  const [watchedServers, setWatchedServers] = useState<BattleMetricsServerSummary[]>([]);
  const [selectedServerId, setSelectedServerId] = useState<string | null>(null);
  
  // Live Explorer State
  const [searchQuery, setSearchQuery] = useState('');
  const [servers, setServers] = useState<BattleMetricsServerSummary[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  
  const [activeServerId, setActiveServerId] = useState<string | null>(null);
  const cloudRepo = (status === 'authenticated' && import.meta.env.VITE_DATA_MODE === 'supabase') ? watchlistRepository : null;

  // Restore session storage search context
  useEffect(() => {
    const restoredQuery = window.sessionStorage.getItem('rm_search_query');
    const selectedServer = window.sessionStorage.getItem('rm_search_selected_server');

    if (restoredQuery) {
      setSearchQuery(restoredQuery);
      handleSearch(undefined, restoredQuery).then(() => {
        if (selectedServer) {
          setSelectedServerId(selectedServer);
        }
      });
      window.sessionStorage.removeItem('rm_search_query');
    }
  }, []);

  useEffect(() => {
    let mounted = true;
    async function loadData() {
      try {
        if (status === 'authenticated' && user) {
           const saved = window.localStorage.getItem(`rm_watchlist_${user.id}`);
           if (saved && mounted) setWatchedServers(JSON.parse(saved));
           
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
      }
    }
    if (status !== 'auth_pending') loadData();
    return () => { mounted = false; };
  }, [status, user]);

  const handleSearch = async (e?: React.FormEvent, overrideQuery?: string) => {
    if (e) e.preventDefault();
    const queryToUse = overrideQuery || searchQuery;
    if (!queryToUse.trim()) return;

    setIsSearching(true);
    setSearchError(null);
    setHasSearched(true);

    try {
      const results = await searchServers(queryToUse);
      setServers(results);
    } catch (err: any) {
      setSearchError(err.message || 'Failed to search servers');
      setServers([]);
    } finally {
      setIsSearching(false);
    }
  };

  const toggleWatch = async (id: string, internalUuid?: string) => {
    if (status !== 'authenticated' || !user) return;
    const existingIndex = watchedServers.findIndex(s => s.id === id);
    let newServers: BattleMetricsServerSummary[];
    let resolvedUuid = internalUuid;
    
    if (existingIndex >= 0) {
      resolvedUuid = internalUuid || (watchedServers[existingIndex] as any).internal_uuid;
      newServers = watchedServers.filter(s => s.id !== id);
    } else {
      const serverToAdd = servers.find(s => s.id === id);
      if (serverToAdd) newServers = [...watchedServers, { ...serverToAdd, internal_uuid: internalUuid }];
      else return; 
    }
    setWatchedServers(newServers);
    try { window.localStorage.setItem(`rm_watchlist_${user.id}`, JSON.stringify(newServers)); } catch (e) {}

    if (cloudRepo && resolvedUuid) {
       try { await cloudRepo.toggleServer(id, resolvedUuid); } catch (e) { console.error(e); }
    }
  };

  const handleSetActiveServer = async (_serverId: string, internalUuid?: string) => {
    if (status !== 'authenticated' || !supabase || !user || !internalUuid) return;
    try {
      const { error } = await supabase.from('profiles').update({ active_server_id: internalUuid }).eq('id', user.id);
      if (!error) setActiveServerId(internalUuid);
    } catch (e) {}
  };

  const pendingActionMsg = window.sessionStorage.getItem('rm_search_pending_action');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', position: 'relative' }}>
      <div className="card">
        <div className="card-title" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            Real Server Explorer
            <span className="badge" style={{ backgroundColor: 'var(--accent-rust)' }}>BattleMetrics live data</span>
          </div>
        </div>
        
        {pendingActionMsg && status === 'authenticated' && (
           <div style={{ marginBottom: '1rem', padding: '0.75rem', backgroundColor: 'var(--status-success)', color: '#fff', borderRadius: '4px' }}>
             Your server search was restored. {pendingActionMsg === 'watchlist' ? 'Continue adding this server to your Watchlist.' : 'Continue setting this server as Active Server.'}
           </div>
        )}

        <form onSubmit={handleSearch} style={{ marginBottom: '1rem', position: 'relative', display: 'flex', gap: '0.5rem' }}>
          <div style={{ position: 'relative', flex: 1 }}>
            <div style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}>
              <Search size={16} />
            </div>
            <input 
              type="text" 
              placeholder="Search live Rust servers by name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ width: '100%', padding: '0.75rem 1rem 0.75rem 2.5rem', backgroundColor: 'var(--bg-panel)', border: '1px solid var(--border-color)', borderRadius: '4px', color: 'var(--text-primary)', fontSize: '0.875rem' }}
            />
          </div>
          <button 
            type="submit" 
            disabled={isSearching || !searchQuery.trim()}
            style={{ padding: '0 1.5rem', backgroundColor: 'var(--accent-rust)', color: '#fff', border: 'none', borderRadius: '4px', cursor: (isSearching || !searchQuery.trim()) ? 'not-allowed' : 'pointer', opacity: (isSearching || !searchQuery.trim()) ? 0.7 : 1, fontWeight: 'bold' }}
          >
            Search
          </button>
        </form>

        {isSearching ? (
          <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
            <Loader2 size={32} className="spin" />
            <span>Fetching live server data...</span>
          </div>
        ) : searchError ? (
           <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--status-error)', border: '1px solid var(--status-error)', borderRadius: '4px', backgroundColor: 'rgba(255,50,50,0.1)' }}>
            <AlertTriangle size={32} style={{ margin: '0 auto 0.5rem' }} />
            <strong>Search Failed</strong>
            <p style={{ marginTop: '0.5rem', fontSize: '0.875rem' }}>{searchError}</p>
          </div>
        ) : hasSearched && servers.length === 0 ? (
          <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)', border: '1px dashed var(--border-color)', borderRadius: '4px' }}>
            No servers found. Try a different search term.
          </div>
        ) : servers.length > 0 ? (
          <div className="server-list">
            {servers.map(server => (
              <ServerCard 
                key={server.id} 
                server={server} 
                onSelect={() => {
                  setSelectedServerId(server.id);
                  window.sessionStorage.removeItem('rm_search_pending_action');
                }}
              />
            ))}
          </div>
        ) : (
          <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)', border: '1px dashed var(--border-color)', borderRadius: '4px' }}>
            Enter a search term to query the live BattleMetrics API.
          </div>
        )}
      </div>

      {selectedServerId && (
        <ServerDetailPanel 
          serverId={selectedServerId}
          isWatched={watchedServers.some(s => s.id === selectedServerId)}
          onClose={() => setSelectedServerId(null)}
          onToggleWatch={toggleWatch}
          onSetActiveServer={handleSetActiveServer}
          isActiveServer={servers.find(s => s.id === selectedServerId)?.internal_uuid ? servers.find(s => s.id === selectedServerId)?.internal_uuid === activeServerId : false}
          isAuthenticated={status === 'authenticated'}
        />
      )}
    </div>
  );
}
