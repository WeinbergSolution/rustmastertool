import { useState, useEffect, useMemo } from 'react';
import { ServerCard } from './ServerCard';
import { ServerDetailPanel } from './ServerDetailPanel';
import { Search, AlertTriangle, Loader2, Filter, HelpCircle, Lock, Bookmark } from 'lucide-react';
import { searchServers, type BattleMetricsServerSummary } from '../../lib/api/battlemetrics';
import { useAuth } from '../../lib/auth/useAuth';
import { watchlistRepository } from '../../lib/data/watchlistRepository';
import { supabase } from '../../lib/supabaseClient';
import { useIsMobile } from '../../components/mobile/useIsMobile';
import { useInAppBack } from '../../components/mobile/useInAppBack';
import { ServerCardMobile } from '../../components/mobile/ServerCardMobile';
import { BottomSheet } from '../../components/mobile/BottomSheet';
import { enrichServerSummariesWithMapIdentity } from './mapIdentityEnrichment';
import { type ServerFilters, defaultFilters, applyClientFilters } from './serverFilters';

type TabType = 'official' | 'community' | 'modded' | 'saved' | 'history';

export function ServersExplorer() {
  const { status, user } = useAuth();
  const [watchedServers, setWatchedServers] = useState<BattleMetricsServerSummary[]>([]);
  
  const [activeTab, setActiveTab] = useState<TabType>(() => {
    return (window.sessionStorage.getItem('serverExplorer.tab') as TabType) || 'community';
  });

  const [searchQuery, setSearchQuery] = useState(() => window.sessionStorage.getItem('serverExplorer.query') || '');
  const [filters, setFilters] = useState<ServerFilters>(defaultFilters);
  const [servers, setServers] = useState<BattleMetricsServerSummary[]>(() => {
    const saved = window.sessionStorage.getItem('serverExplorer.results');
    return saved ? JSON.parse(saved) : [];
  });
  const [nextPageUrl, setNextPageUrl] = useState<string | null>(() => window.sessionStorage.getItem('serverExplorer.nextPageUrl') || null);
  const [hasSearched, setHasSearched] = useState(() => window.sessionStorage.getItem('serverExplorer.hasSearched') === 'true');
  const [selectedServerId, setSelectedServerId] = useState<string | null>(() => window.sessionStorage.getItem('serverExplorer.selectedServerId') || null);
  
  const [isSearching, setIsSearching] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);
  const [activeServerId, setActiveServerId] = useState<string | null>(null);
  const cloudRepo = (status === 'authenticated' && import.meta.env.VITE_DATA_MODE === 'supabase') ? watchlistRepository : null;
  const isMobile = useIsMobile();
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [detailFocus, setDetailFocus] = useState<'map' | null>(null);

  // Mobile browser Back closes the filter sheet / server detail before leaving.
  useInAppBack({ open: filtersOpen, onClose: () => setFiltersOpen(false), enabled: isMobile });
  useInAppBack({
    open: selectedServerId !== null,
    onClose: () => { setSelectedServerId(null); setDetailFocus(null); },
    enabled: isMobile,
  });

  useEffect(() => { window.sessionStorage.setItem('serverExplorer.tab', activeTab); }, [activeTab]);
  useEffect(() => { window.sessionStorage.setItem('serverExplorer.query', searchQuery); }, [searchQuery]);
  useEffect(() => {
    window.sessionStorage.setItem('serverExplorer.results', JSON.stringify(servers));
    window.sessionStorage.setItem('serverExplorer.hasSearched', String(hasSearched));
  }, [servers, hasSearched]);
  useEffect(() => {
    if (nextPageUrl) window.sessionStorage.setItem('serverExplorer.nextPageUrl', nextPageUrl);
    else window.sessionStorage.removeItem('serverExplorer.nextPageUrl');
  }, [nextPageUrl]);
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
           if (saved && mounted) {
             const parsed = JSON.parse(saved);
             enrichServerSummariesWithMapIdentity(parsed).then(enriched => {
               if (mounted) setWatchedServers(enriched);
             });
           }
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
    
    const handleWatchlistUpdated = () => {
      if (status !== 'auth_pending') loadData();
    };
    window.addEventListener('watchlistUpdated', handleWatchlistUpdated);
    
    return () => { 
      mounted = false; 
      window.removeEventListener('watchlistUpdated', handleWatchlistUpdated);
    };
  }, [status, user]);

  const fetchServers = async (isLoadMore = false, overrideQuery?: string) => {
    const queryToUse = overrideQuery !== undefined ? overrideQuery : searchQuery;
    if (!isLoadMore) {
      setIsSearching(true);
      setSearchError(null);
      setHasSearched(true);
      setServers([]);
    } else {
      setIsLoadingMore(true);
    }

    try {
      const options: any = {
        pageSize: 25,
        rustType: (activeTab === 'official' || activeTab === 'community' || activeTab === 'modded') ? activeTab : undefined,
      };

      if (isLoadMore && nextPageUrl) {
        options.nextUrl = nextPageUrl;
      } else {
        options.query = queryToUse;
      }

      const response = await searchServers(options);
      const enrichedData = await enrichServerSummariesWithMapIdentity(response.data);
      
      if (isLoadMore) {
        setServers(prev => [...prev, ...enrichedData]);
      } else {
        setServers(enrichedData);
      }
      
      setNextPageUrl(response.links?.next || null);

    } catch (err: any) {
      setSearchError(err.message || 'Failed to search servers');
      if (!isLoadMore) setServers([]);
    } finally {
      setIsSearching(false);
      setIsLoadingMore(false);
    }
  };

  useEffect(() => {
    const isMainTab = activeTab === 'official' || activeTab === 'community' || activeTab === 'modded';
    if (isMainTab) {
      fetchServers(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab]);

  const handleSearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    fetchServers(false);
  };

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
      const serverToAdd = servers.find(s => s.id === id);
      if (serverToAdd) newServers = [...watchedServers, { ...serverToAdd, internal_uuid: internalUuid }];
      else return; 
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



  const pendingActionMsg = window.sessionStorage.getItem('serverExplorer.pendingAction');

  const rawServers = activeTab === 'saved' ? watchedServers : servers;
  const visibleServers = useMemo(() => applyClientFilters(rawServers, filters), [rawServers, filters]);

  // ---- Mobile presentation (2.2-C). Same state & handlers; different layout only. ----
  if (isMobile) {
    return (
      <>
        <div className="mobile-servers">
          <div className="mobile-seg" role="tablist">
            {(['official', 'community', 'modded', 'saved'] as TabType[]).map(tab => (
              <button
                key={tab}
                className={`mobile-seg-btn${activeTab === tab ? ' active' : ''}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>

          <form className="mobile-search-row" onSubmit={handleSearch}>
            <div className="mobile-search-input">
              <Search size={16} />
              <input
                type="text"
                placeholder="Search Rust servers…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button type="submit" className="mobile-search-btn" disabled={isSearching}>Search</button>
          </form>

          <div className="mobile-servers-toolbar">
            <button className="mobile-filter-btn" onClick={() => setFiltersOpen(true)}>
              <Filter size={14} /> Filters
            </button>
            {visibleServers.length > 0 && <span className="mobile-servers-count">{visibleServers.length} shown ({rawServers.length} loaded)</span>}
          </div>

          {pendingActionMsg && status === 'authenticated' && (
            <div className="mobile-restore-banner">
              Your server search was restored. {pendingActionMsg === 'watchlist' ? 'Continue adding to your Watchlist.' : 'Continue setting your Active Server.'}
            </div>
          )}

          {activeTab === 'saved' && status !== 'authenticated' ? (
            <div className="mobile-servers-state">
              <Bookmark size={28} style={{ opacity: 0.3 }} />
              <span>Sign in with Steam to view your saved servers.</span>
            </div>
          ) : isSearching ? (
            <div className="mobile-servers-state"><Loader2 size={28} className="spin" /><span>Fetching live server data…</span></div>
          ) : searchError ? (
            <div className="mobile-servers-state mobile-servers-state--error">
              <AlertTriangle size={26} /><strong>Search failed</strong><span>{searchError}</span>
            </div>
          ) : (hasSearched || activeTab === 'saved') && visibleServers.length === 0 ? (
            <div className="mobile-servers-state">No servers found. Try adjusting your filters.</div>
          ) : visibleServers.length > 0 ? (
            <div className="mobile-servers-list">
              {visibleServers.map(server => (
                <ServerCardMobile
                  key={server.id}
                  server={server}
                  onSelect={() => {
                    setSelectedServerId(server.id);
                    setDetailFocus(null);
                    window.sessionStorage.removeItem('serverExplorer.pendingAction');
                  }}
                  onSelectMap={() => {
                    setSelectedServerId(server.id);
                    setDetailFocus('map');
                    window.sessionStorage.removeItem('serverExplorer.pendingAction');
                  }}
                />
              ))}
              {nextPageUrl && (
                <button className="mobile-loadmore" onClick={() => fetchServers(true)} disabled={isLoadingMore}>
                  {isLoadingMore ? <Loader2 size={16} className="spin" /> : 'Load more servers'}
                </button>
              )}
            </div>
          ) : (
            <div className="mobile-servers-state"><Filter size={28} style={{ opacity: 0.3 }} />Search live Rust servers by name.</div>
          )}
        </div>

        <BottomSheet open={filtersOpen} onClose={() => setFiltersOpen(false)} title="Filters (Loaded Results)">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', padding: '1rem 0' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <input type="checkbox" checked={filters.hideEmpty} onChange={e => setFilters({ ...filters, hideEmpty: e.target.checked })} />
              Hide Empty Servers
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <input type="checkbox" checked={filters.hideFull} onChange={e => setFilters({ ...filters, hideFull: e.target.checked })} />
              Hide Full Servers
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <input type="checkbox" checked={filters.hasQueue} onChange={e => setFilters({ ...filters, hasQueue: e.target.checked })} />
              Has Queue
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <input type="checkbox" checked={filters.hasMapThumbnail} onChange={e => setFilters({ ...filters, hasMapThumbnail: e.target.checked })} />
              Has Map Thumbnail
            </label>
          </div>
          <hr style={{ borderColor: 'var(--border-color)', margin: '1rem 0' }}/>
          <p className="mobile-filters-note">
            Advanced backend filters (region, wipe schedule, map size) are coming soon.
          </p>
          {['Region / Country', 'Wipe Schedule', 'Map Size'].map(f => (
            <div key={f} className="mobile-filter-coming" style={{ opacity: 0.5 }}><Lock size={13} /> {f}</div>
          ))}
        </BottomSheet>

        {selectedServerId && (
          <ServerDetailPanel
            serverId={selectedServerId}
            isWatched={watchedServers.some(s => s.id === selectedServerId)}
            onClose={() => { setSelectedServerId(null); setDetailFocus(null); }}
            onToggleWatch={toggleWatch}
            onSetActiveServer={handleSetActiveServer}
            isActiveServer={servers.find(s => s.id === selectedServerId)?.internal_uuid ? servers.find(s => s.id === selectedServerId)?.internal_uuid === activeServerId : false}
            isAuthenticated={status === 'authenticated'}
            initialFocus={detailFocus}
          />
        )}
      </>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', position: 'relative', height: '100%' }}>
      
      {/* Tabs */}
      <div style={{ display: 'flex', gap: '0.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
        {(['official', 'community', 'modded', 'saved'] as TabType[]).map(tab => (
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
              disabled={isSearching}
              style={{ padding: '0 2rem', backgroundColor: 'var(--accent-rust)', color: '#fff', border: 'none', borderRadius: '4px', cursor: isSearching ? 'not-allowed' : 'pointer', opacity: isSearching ? 0.7 : 1, fontWeight: 'bold' }}
            >
              Search
            </button>
          </form>
          
          {/* Dynamic UI Filters */}
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.75rem', cursor: 'pointer' }}>
              <input type="checkbox" checked={filters.hideEmpty} onChange={e => setFilters({ ...filters, hideEmpty: e.target.checked })} />
              Hide Empty
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.75rem', cursor: 'pointer' }}>
              <input type="checkbox" checked={filters.hideFull} onChange={e => setFilters({ ...filters, hideFull: e.target.checked })} />
              Hide Full
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.75rem', cursor: 'pointer' }}>
              <input type="checkbox" checked={filters.hasQueue} onChange={e => setFilters({ ...filters, hasQueue: e.target.checked })} />
              Has Queue
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.75rem', cursor: 'pointer' }}>
              <input type="checkbox" checked={filters.hasMapThumbnail} onChange={e => setFilters({ ...filters, hasMapThumbnail: e.target.checked })} />
              Has Map Thumbnail
            </label>
            
            <div className="filter-chip" style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', padding: '0.25rem 0.75rem', backgroundColor: 'transparent', border: '1px dashed var(--border-color)', borderRadius: '16px', fontSize: '0.75rem', color: 'var(--text-disabled)', marginLeft: 'auto' }}>
               <HelpCircle size={12} /> Client-side filters on loaded results.
            </div>
          </div>
        </div>

        {/* Results */}
        {activeTab === 'saved' && status !== 'authenticated' ? (
           <div style={{ padding: '4rem', textAlign: 'center', color: 'var(--text-muted)' }}>
             <Bookmark size={32} style={{ margin: '0 auto 1rem', opacity: 0.3 }} />
             <p>Sign in with Steam to view your saved servers.</p>
           </div>
        ) : isSearching ? (
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
        ) : (hasSearched || activeTab === 'saved') && visibleServers.length === 0 ? (
          <div style={{ padding: '4rem', textAlign: 'center', color: 'var(--text-muted)', border: '1px dashed var(--border-color)', borderRadius: '4px' }}>
            No servers found. Try adjusting your filters.
          </div>
        ) : visibleServers.length > 0 ? (
          <div className="server-list" style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {visibleServers.map(server => (
              <ServerCard 
                key={server.id} 
                server={server} 
                onSelect={() => {
                  setSelectedServerId(server.id);
                  window.sessionStorage.removeItem('serverExplorer.pendingAction');
                }}
              />
            ))}
            
            {nextPageUrl && (
               <button 
                 onClick={() => fetchServers(true)}
                 disabled={isLoadingMore}
                 style={{ padding: '1rem', marginTop: '1rem', backgroundColor: 'var(--bg-hover)', color: 'var(--text-primary)', border: '1px solid var(--border-color)', borderRadius: '4px', cursor: isLoadingMore ? 'not-allowed' : 'pointer', fontWeight: 'bold', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem' }}
               >
                 {isLoadingMore ? <Loader2 size={18} className="spin" /> : 'Load More Servers'}
               </button>
            )}
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
          isActiveServer={rawServers.find(s => s.id === selectedServerId)?.internal_uuid ? rawServers.find(s => s.id === selectedServerId)?.internal_uuid === activeServerId : false}
          isAuthenticated={status === 'authenticated'}
        />
      )}
    </div>
  );
}
