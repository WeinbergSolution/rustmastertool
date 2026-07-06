import { useState, useEffect } from 'react';
import { ServerCard } from './ServerCard';
import { ServerDetailPanel } from './ServerDetailPanel';
import { Search, AlertTriangle, Loader2, Filter, Globe, Users, Map as MapIcon, Clock, HardDrive, HelpCircle } from 'lucide-react';
import { searchServers, type BattleMetricsServerSummary } from '../../lib/api/battlemetrics';
import { useAuth } from '../../lib/auth/useAuth';
import { watchlistRepository } from '../../lib/data/watchlistRepository';
import { supabase } from '../../lib/supabaseClient';

type TabType = 'official' | 'community' | 'modded' | 'favorites' | 'history';

export function ServersExplorer() {
  const { status, user } = useAuth();
  const [watchedServers, setWatchedServers] = useState<BattleMetricsServerSummary[]>([]);
  
  const [activeTab, setActiveTab] = useState<TabType>(() => {
    return (window.sessionStorage.getItem('serverExplorer.tab') as TabType) || 'community';
  });

  const [searchQuery, setSearchQuery] = useState(() => window.sessionStorage.getItem('serverExplorer.query') || '');
  const [servers, setServers] = useState<BattleMetricsServerSummary[]>(() => {
    const saved = window.sessionStorage.getItem('serverExplorer.results');
    return saved ? JSON.parse(saved) : [];
  });
  const [hasSearched, setHasSearched] = useState(() => window.sessionStorage.getItem('serverExplorer.hasSearched') === 'true');
  const [selectedServerId, setSelectedServerId] = useState<string | null>(() => window.sessionStorage.getItem('serverExplorer.selectedServerId') || null);
  
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);
  const [activeServerId, setActiveServerId] = useState<string | null>(null);
  const cloudRepo = (status === 'authenticated' && import.meta.env.VITE_DATA_MODE === 'supabase') ? watchlistRepository : null;

  useEffect(() => { window.sessionStorage.setItem('serverExplorer.tab', activeTab); }, [activeTab]);
  useEffect(() => { window.sessionStorage.setItem('serverExplorer.query', searchQuery); }, [searchQuery]);
  useEffect(() => {
    window.sessionStorage.setItem('serverExplorer.results', JSON.stringify(servers));
    window.sessionStorage.setItem('serverExplorer.hasSearched', String(hasSearched));
  }, [servers, hasSearched]);
  useEffect(() => {
    if (selectedServerId) window.sessionStorage.setItem('serverExplorer.selectedServerId', selectedServerId);
    else window.sessionStorage.removeItem('serverExplorer.selectedServerId');
  }, [selectedServerId]);

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
      } catch (e) {}
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
       try { await cloudRepo.toggleServer(id, resolvedUuid); } catch (e) {}
    }
  };

  const handleSetActiveServer = async (_serverId: string, internalUuid?: string) => {
    if (status !== 'authenticated' || !supabase || !user || !internalUuid) return;
    try {
      const { error } = await supabase.from('profiles').update({ active_server_id: internalUuid }).eq('id', user.id);
      if (!error) setActiveServerId(internalUuid);
    } catch (e) {}
  };

  const pendingActionMsg = window.sessionStorage.getItem('serverExplorer.pendingAction');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', position: 'relative', height: '100%' }}>
      
      {/* Tabs */}
      <div style={{ display: 'flex', gap: '0.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
        {(['official', 'community', 'modded'] as TabType[]).map(tab => (
          <button 
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{ 
              padding: '0.5rem 1.5rem', 
              background: activeTab === tab ? 'var(--bg-panel)' : 'transparent', 
              border: 'none', 
              borderBottom: activeTab === tab ? '2px solid var(--accent-rust)' : '2px solid transparent',
              color: activeTab === tab ? 'var(--text-primary)' : 'var(--text-muted)', 
              cursor: 'pointer', 
              fontWeight: 'bold',
              textTransform: 'capitalize'
            }}
          >
            {tab}
          </button>
        ))}
        <button disabled style={{ padding: '0.5rem 1.5rem', background: 'transparent', border: 'none', borderBottom: '2px solid transparent', color: 'var(--text-disabled)', cursor: 'not-allowed', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
          Favorites <span style={{ fontSize: '0.6rem', color: 'var(--accent-rust)' }}>(Soon)</span>
        </button>
        <button disabled style={{ padding: '0.5rem 1.5rem', background: 'transparent', border: 'none', borderBottom: '2px solid transparent', color: 'var(--text-disabled)', cursor: 'not-allowed', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
          History <span style={{ fontSize: '0.6rem', color: 'var(--accent-rust)' }}>(Soon)</span>
        </button>
      </div>

      <div className="card" style={{ display: 'flex', flexDirection: 'column', padding: '1.5rem' }}>
        
        {pendingActionMsg && status === 'authenticated' && (
           <div style={{ marginBottom: '1rem', padding: '0.75rem', backgroundColor: 'rgba(74, 222, 128, 0.1)', color: 'var(--status-success)', border: '1px solid rgba(74, 222, 128, 0.3)', borderRadius: '4px' }}>
             Your server search was restored. {pendingActionMsg === 'watchlist' ? 'Continue adding this server to your Watchlist.' : 'Continue setting this server as Active Server.'}
           </div>
        )}

        {/* Filter Bar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem', paddingBottom: '1.5rem', borderBottom: '1px solid var(--border-color)' }}>
          <form onSubmit={handleSearch} style={{ display: 'flex', gap: '0.5rem' }}>
            <div style={{ position: 'relative', flex: 1 }}>
              <div style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}>
                <Search size={18} />
              </div>
              <input 
                type="text" 
                placeholder="Search live Rust servers by name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ width: '100%', padding: '0.75rem 1rem 0.75rem 2.5rem', backgroundColor: 'var(--bg-hover)', border: '1px solid var(--border-color)', borderRadius: '4px', color: 'var(--text-primary)', fontSize: '0.875rem' }}
              />
            </div>
            <button 
              type="submit" 
              disabled={isSearching || !searchQuery.trim()}
              style={{ padding: '0 2rem', backgroundColor: 'var(--accent-rust)', color: '#fff', border: 'none', borderRadius: '4px', cursor: (isSearching || !searchQuery.trim()) ? 'not-allowed' : 'pointer', opacity: (isSearching || !searchQuery.trim()) ? 0.7 : 1, fontWeight: 'bold' }}
            >
              Search
            </button>
          </form>
          
          {/* Static UI Filters */}
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <div className="filter-chip" style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', padding: '0.25rem 0.75rem', backgroundColor: 'var(--bg-hover)', border: '1px solid var(--border-color)', borderRadius: '16px', fontSize: '0.75rem', color: 'var(--text-muted)', cursor: 'not-allowed', opacity: 0.7 }}>
               <Globe size={12} /> Region / Country
            </div>
            <div className="filter-chip" style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', padding: '0.25rem 0.75rem', backgroundColor: 'var(--bg-hover)', border: '1px solid var(--border-color)', borderRadius: '16px', fontSize: '0.75rem', color: 'var(--text-muted)', cursor: 'not-allowed', opacity: 0.7 }}>
               <Users size={12} /> Players
            </div>
            <div className="filter-chip" style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', padding: '0.25rem 0.75rem', backgroundColor: 'var(--bg-hover)', border: '1px solid var(--border-color)', borderRadius: '16px', fontSize: '0.75rem', color: 'var(--text-muted)', cursor: 'not-allowed', opacity: 0.7 }}>
               <HardDrive size={12} /> Server Type
            </div>
            <div className="filter-chip" style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', padding: '0.25rem 0.75rem', backgroundColor: 'var(--bg-hover)', border: '1px solid var(--border-color)', borderRadius: '16px', fontSize: '0.75rem', color: 'var(--text-muted)', cursor: 'not-allowed', opacity: 0.7 }}>
               <MapIcon size={12} /> Map Size
            </div>
            <div className="filter-chip" style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', padding: '0.25rem 0.75rem', backgroundColor: 'var(--bg-hover)', border: '1px solid var(--border-color)', borderRadius: '16px', fontSize: '0.75rem', color: 'var(--text-muted)', cursor: 'not-allowed', opacity: 0.7 }}>
               <Clock size={12} /> Wipe Schedule
            </div>
            <div className="filter-chip" style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', padding: '0.25rem 0.75rem', backgroundColor: 'transparent', border: '1px dashed var(--border-color)', borderRadius: '16px', fontSize: '0.75rem', color: 'var(--text-disabled)', marginLeft: 'auto' }}>
               <HelpCircle size={12} /> Using current provider search until category feed is expanded.
            </div>
          </div>
        </div>

        {/* Results */}
        {isSearching ? (
          <div style={{ padding: '4rem', textAlign: 'center', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
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
          <div style={{ padding: '4rem', textAlign: 'center', color: 'var(--text-muted)', border: '1px dashed var(--border-color)', borderRadius: '4px' }}>
            No servers found in this category. Try adjusting your filters.
          </div>
        ) : servers.length > 0 ? (
          <div className="server-list" style={{ flex: 1, overflowY: 'auto' }}>
            {servers.map(server => (
              <ServerCard 
                key={server.id} 
                server={server} 
                onSelect={() => {
                  setSelectedServerId(server.id);
                  window.sessionStorage.removeItem('serverExplorer.pendingAction');
                }}
              />
            ))}
          </div>
        ) : (
          <div style={{ padding: '4rem', textAlign: 'center', color: 'var(--text-muted)', border: '1px dashed var(--border-color)', borderRadius: '4px' }}>
            <Filter size={32} style={{ margin: '0 auto 1rem', opacity: 0.3 }} />
            Enter a search term to query the live BattleMetrics API for {activeTab} servers.
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
