import { useState, useEffect, useMemo, useRef } from 'react';
import { ServerCard } from './ServerCard';
import { ServerDetailPanel } from './ServerDetailPanel';
import { Search, AlertTriangle, Loader2, Filter, HelpCircle, Bookmark, MapPin } from 'lucide-react';
import { searchServers, type BattleMetricsServerSummary } from '../../lib/api/battlemetrics';
import { useAuth } from '../../lib/auth/useAuth';
import { watchlistRepository } from '../../lib/data/watchlistRepository';
import { supabase } from '../../lib/supabaseClient';
import { useIsMobile } from '../../components/mobile/useIsMobile';
import { useInAppBack } from '../../components/mobile/useInAppBack';
import { ServerCardMobile } from '../../components/mobile/ServerCardMobile';
import { BottomSheet } from '../../components/mobile/BottomSheet';
import { enrichServerSummariesWithMapIdentity } from './mapIdentityEnrichment';
import { type ServerFilters, defaultFilters, applyClientFilters, type SortOption, applySort } from './serverFilters';
import { MONUMENTS } from './monumentFilters';
import { classifyMonuments } from '../learn/map-intel/monumentClassification';

type TabType = 'official' | 'community' | 'modded' | 'saved' | 'history';

export function ServersExplorer() {
  const { status, user } = useAuth();
  const [watchedServers, setWatchedServers] = useState<BattleMetricsServerSummary[]>([]);
  
  const [activeTab, setActiveTab] = useState<TabType>(() => {
    return (window.sessionStorage.getItem('serverExplorer.tab') as TabType) || 'community';
  });

  const [searchQuery, setSearchQuery] = useState(() => window.sessionStorage.getItem('serverExplorer.query') || '');
  const [filters, setFilters] = useState<ServerFilters>(defaultFilters);
  const [sortBy, setSortBy] = useState<SortOption>('players_desc');
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

  const TARGET_VISIBLE_RESULTS = 50;
  const MAX_FILTER_SCAN_PAGES = 10;
  const MAX_FILTER_SCAN_RESULTS = 1000;
  const [isAutoScanning, setIsAutoScanning] = useState(false);
  const pagesScannedRef = useRef(0);
  const currentScanIdRef = useRef<number>(0);

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

  const fetchServers = async (isLoadMore = false, overrideQuery?: string, isAutoScan = false) => {
    const queryToUse = overrideQuery !== undefined ? overrideQuery : searchQuery;
    const scanId = Date.now();
    currentScanIdRef.current = scanId;

    if (!isLoadMore) {
      setIsSearching(true);
      setSearchError(null);
      setHasSearched(true);
      setServers([]);
      pagesScannedRef.current = 0;
    } else {
      if (isAutoScan) setIsAutoScanning(true);
      else setIsLoadingMore(true);
    }

    try {
      const options: any = {
        pageSize: 100,
        rustType: (activeTab === 'official' || activeTab === 'community' || activeTab === 'modded') ? activeTab : undefined,
      };

      if (isLoadMore && nextPageUrl) {
        options.nextUrl = nextPageUrl;
      } else {
        options.query = queryToUse;
      }

      const response = await searchServers(options);
      if (currentScanIdRef.current !== scanId) return;

      const enrichedData = await enrichServerSummariesWithMapIdentity(response.data);
      if (currentScanIdRef.current !== scanId) return;
      
      if (isLoadMore) {
        setServers(prev => {
           const newServers = [...prev];
           for (const s of enrichedData) {
             if (!newServers.some(existing => existing.id === s.id)) {
               newServers.push(s);
             }
           }
           return newServers;
        });
        pagesScannedRef.current += 1;
      } else {
        setServers(enrichedData);
      }
      
      setNextPageUrl(response.links?.next || null);

    } catch (err: any) {
      if (currentScanIdRef.current === scanId) {
        setSearchError(err.message || 'Failed to search servers');
        if (!isLoadMore) setServers([]);
      }
    } finally {
      if (currentScanIdRef.current === scanId) {
        setIsSearching(false);
        setIsLoadingMore(false);
        setIsAutoScanning(false);
      }
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
  const filteredServers = useMemo(() => applyClientFilters(rawServers, filters), [rawServers, filters]);
  const visibleServers = useMemo(() => applySort(filteredServers, sortBy), [filteredServers, sortBy]);
  const serversWithMapIntel = useMemo(() => rawServers.filter(s => classifyMonuments(s.monumentNames).some(c => c.hasMapIntelEntry)).length, [rawServers]);

  const toggleMonumentFilter = (monumentId: string) => {
    setFilters(prev => {
      const current = prev.monuments || [];
      if (current.includes(monumentId)) {
        return { ...prev, monuments: current.filter(id => id !== monumentId) };
      } else {
        return { ...prev, monuments: [...current, monumentId] };
      }
    });
  };

  const hasActiveFilters = filters.hideEmpty || filters.hideFull || filters.hasQueue || filters.hasMapThumbnail || filters.secure || filters.country !== null || filters.mode !== null || filters.minPlayers !== null || (filters.monuments && filters.monuments.length > 0);

  useEffect(() => {
    if (activeTab === 'saved') return;
    if (!hasActiveFilters) return;
    if (isSearching || isLoadingMore || isAutoScanning) return;
    if (!nextPageUrl) return;
    
    if (
      visibleServers.length < TARGET_VISIBLE_RESULTS &&
      rawServers.length < MAX_FILTER_SCAN_RESULTS &&
      pagesScannedRef.current < MAX_FILTER_SCAN_PAGES
    ) {
      fetchServers(true, undefined, true);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visibleServers.length, hasActiveFilters, isSearching, isLoadingMore, isAutoScanning, nextPageUrl, activeTab, rawServers.length]);

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
              {filters.monuments.length > 0 && <span style={{ marginLeft: '4px', background: 'var(--accent-rust)', color: '#fff', borderRadius: '50%', padding: '0 4px', fontSize: '10px' }}>{filters.monuments.length}</span>}
            </button>
            {rawServers.length > 0 && <span className="mobile-servers-count">{visibleServers.length} shown / {rawServers.length} loaded / {serversWithMapIntel} with map intel</span>}
          </div>

          {pendingActionMsg && status === 'authenticated' && (
            <div className="mobile-restore-banner">
              Your server search was restored. {pendingActionMsg === 'watchlist' ? 'Continue saving the server.' : 'Continue setting your Active Server.'}
            </div>
          )}

          {isAutoScanning && (
            <div className="mobile-restore-banner" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem', backgroundColor: 'var(--bg-hover)', color: 'var(--text-secondary)', border: '1px dashed var(--border-color)' }}>
              <Loader2 size={14} className="spin" />
              <span>Expanding search because filters reduced the result set...</span>
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
          ) : (hasSearched || activeTab === 'saved') && visibleServers.length === 0 && !isAutoScanning && !isSearching && !isLoadingMore ? (
            <div className="mobile-servers-state">No matching servers found after scanning {rawServers.length} loaded servers. Try relaxing your filters.</div>
          ) : visibleServers.length > 0 ? (
            <div className="mobile-servers-list">
              {visibleServers.map(server => (
                <ServerCardMobile
                  key={server.id}
                  server={server}
                  isWatched={watchedServers.some(s => s.id === server.id)}
                  isAuthenticated={status === 'authenticated'}
                  onToggleWatch={() => toggleWatch(server.id, server.internal_uuid)}
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
          <details style={{ marginBottom: '1.5rem', backgroundColor: 'var(--bg-hover)', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
             <summary style={{ cursor: 'pointer', fontWeight: 600, color: 'var(--text-primary)', fontSize: '0.9rem', padding: '0 1rem', minHeight: '44px', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>⚙️ Advanced Filters</summary>
             <div style={{ padding: '0 1rem 1rem 1rem', borderTop: '1px dashed var(--border-color)', marginTop: '0.5rem', paddingTop: '1rem' }}>

                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <input type="checkbox" checked={filters.secure} onChange={e => setFilters({ ...filters, secure: e.target.checked })} />
                  Secure only (EAC)
                </label>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-primary)' }} title="Filters by time elapsed since the server's last reported wipe.">Wipe Age</label>
                    <select className="rm-select mobile" value={filters.maxWipeAgeHours === null ? 'any' : filters.maxWipeAgeHours} onChange={e => setFilters({ ...filters, maxWipeAgeHours: e.target.value === 'any' ? null : parseFloat(e.target.value) })}>
                       <option value="any">Any</option>
                       <option value="0.166">≤ 10m</option>
                       <option value="0.5">≤ 30m</option>
                       <option value="1">≤ 1h</option>
                       <option value="2">≤ 2h</option>
                       <option value="4">≤ 4h</option>
                       <option value="8">≤ 8h</option>
                       <option value="12">≤ 12h</option>
                       <option value="24">≤ 24h</option>
                       <option value="72">≤ 3d</option>
                       <option value="168">≤ 7d</option>
                       <option value="336">≤ 14d</option>
                       <option value="720">≤ 30d</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-primary)' }} title="Derived from the last wipe timestamp. Uses reported wipe date/time.">Wipe Day</label>
                    <select className="rm-select mobile" value={filters.wipeTiming === null ? 'any' : filters.wipeTiming} onChange={e => setFilters({ ...filters, wipeTiming: e.target.value === 'any' ? null : e.target.value as any })}>
                       <option value="any">Any</option>
                       <option value="today">Today</option>
                       <option value="thursday">Thursday</option>
                       <option value="weekend">Weekend</option>
                    </select>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-primary)' }}>Region</label>
                    <select className="rm-select mobile" value={filters.region === null ? 'any' : filters.region} onChange={e => setFilters({ ...filters, region: e.target.value === 'any' ? null : e.target.value as any })}>
                       <option value="any">Any Region</option>
                       <option value="EU">EU</option>
                       <option value="NA">NA</option>
                       <option value="SA">SA</option>
                       <option value="AS">AS</option>
                       <option value="OCE">OCE</option>
                       <option value="AF">AF</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-primary)' }}>Rank</label>
                    <select className="rm-select mobile" value={filters.rankRange === null ? 'any' : filters.rankRange} onChange={e => setFilters({ ...filters, rankRange: e.target.value === 'any' ? null : e.target.value as any })}>
                       <option value="any">Any Rank</option>
                       <option value="top100">Top 100</option>
                       <option value="top500">Top 500</option>
                       <option value="top1000">Top 1000</option>
                    </select>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-primary)' }}>Map Type</label>
                    <select className="rm-select mobile" value={filters.mapType === null ? 'any' : filters.mapType} onChange={e => setFilters({ ...filters, mapType: e.target.value === 'any' ? null : e.target.value as any })}>
                       <option value="any">Any Type</option>
                       <option value="procedural">Procedural</option>
                       <option value="custom">Custom</option>
                       <option value="barren">Barren</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-primary)' }}>Map Size</label>
                    <select className="rm-select mobile" value={filters.minMapSize === null ? 'any' : filters.minMapSize} onChange={e => setFilters({ ...filters, minMapSize: e.target.value === 'any' ? null : parseInt(e.target.value, 10), maxMapSize: e.target.value === 'any' ? null : parseInt(e.target.value, 10) + 999 })}>
                       <option value="any">Any Size</option>
                       <option value="1000">1000 - 1999</option>
                       <option value="2000">2000 - 2999</option>
                       <option value="3000">3000 - 3999</option>
                       <option value="4000">4000 - 4999</option>
                       <option value="5000">5000 - 5999</option>
                       <option value="6000">6000+</option>
                    </select>
                  </div>
                </div>

                <div style={{ borderTop: '1px dashed var(--border-color)', paddingTop: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                   <div style={{ fontSize: '0.875rem', fontWeight: 'bold', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                     Heuristic Filters
                     <span style={{ fontSize: '0.65rem', backgroundColor: 'var(--status-warning)', color: '#000', padding: '0.1rem 0.4rem', borderRadius: '8px' }}>Approximate</span>
                   </div>

                   <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                     <div>
                       <label style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-primary)' }}>Farm/Loot</label>
                       <select className="rm-select mobile" value={filters.lootMultiplier === null ? 'any' : filters.lootMultiplier} onChange={e => setFilters({ ...filters, lootMultiplier: e.target.value === 'any' ? null : e.target.value as any })}>
                          <option value="any">Any</option>
                          <option value="1x">1x (Vanilla)</option>
                          <option value="2x">2x</option>
                          <option value="3x">3x</option>
                          <option value="5x">5x</option>
                          <option value="10x">10x</option>
                          <option value="10x+">10x+</option>
                       </select>
                     </div>
                     <div>
                       <label style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-primary)' }}>Group Limit</label>
                       <select className="rm-select mobile" value={filters.teamLimit === null ? 'any' : filters.teamLimit} onChange={e => setFilters({ ...filters, teamLimit: e.target.value === 'any' ? null : e.target.value as any })}>
                          <option value="any">Any</option>
                          <option value="solo">Solo</option>
                          <option value="duo">Duo</option>
                          <option value="trio">Trio</option>
                          <option value="quad">Quad (4)</option>
                          <option value="5+">5+ / Zerg</option>
                          <option value="clan">Clan</option>
                       </select>
                     </div>
                   </div>

                   <div>
                     <label style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-primary)' }}>Mode</label>
                     <select className="rm-select mobile" value={filters.mode === null ? 'any' : filters.mode} onChange={e => setFilters({ ...filters, mode: e.target.value === 'any' ? null : e.target.value as any })}>
                        <option value="any">Any Mode</option>
                        <option value="vanilla">Vanilla</option>
                        <option value="pve">PvE</option>
                        <option value="roleplay">Roleplay</option>
                        <option value="combat">Combat / Arena</option>
                        <option value="creative">Creative / Build</option>
                        <option value="softcore">Softcore</option>
                        <option value="hardcore">Hardcore</option>
                     </select>
                   </div>
                   
                   <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem' }}>
                     <input type="checkbox" checked={filters.hasRaidWindows} onChange={e => setFilters({ ...filters, hasRaidWindows: e.target.checked })} />
                     Raid Windows / ORP
                   </label>
                   <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem' }}>
                     <input type="checkbox" checked={filters.hasScheduledRestart} onChange={e => setFilters({ ...filters, hasScheduledRestart: e.target.checked })} />
                     Scheduled Restarts
                   </label>
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-primary)' }}>Country <span style={{ fontSize: '0.7rem', color: 'var(--text-disabled)', fontWeight: 400 }}>(Loaded only)</span></label>
                  <select className="rm-select mobile" value={filters.country === null ? 'any' : filters.country} onChange={e => setFilters({ ...filters, country: e.target.value === 'any' ? null : e.target.value })}>
                     <option value="any">Any Country</option>
                     {Array.from(new Set(rawServers.map(s => s.country).filter(Boolean))).sort().map(c => (
                        <option key={c} value={c as string}>{c as string}</option>
                     ))}
                  </select>
                </div>
             </div>
          </details>
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
            
            <div style={{ marginTop: '0.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)' }}>Sort By</label>
              <select className="rm-select mobile" value={sortBy} onChange={e => setSortBy(e.target.value as SortOption)}>
                <option value="players_desc">Players: High to Low</option>
                <option value="players_asc">Players: Low to High</option>
                <option value="fill_desc">Fill Rate: High to Low</option>
                <option value="rank_asc">Rank: Best First</option>
                <option value="queue_desc">Queue: High to Low</option>
                <option value="updated_desc">Recently Updated</option>
              </select>
            </div>

            <div style={{ marginTop: '0.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)' }}>Minimum Players</label>
              <select className="rm-select mobile" value={filters.minPlayers === null ? 'any' : filters.minPlayers} onChange={e => setFilters({ ...filters, minPlayers: e.target.value === 'any' ? null : parseInt(e.target.value, 10) })}>
                <option value="any">Any</option>
                <option value="100">100+</option>
                <option value="200">200+</option>
                <option value="300">300+</option>
                <option value="400">400+</option>
                <option value="500">500+</option>
                <option value="600">600+</option>
                <option value="700">700+</option>
                <option value="800">800+</option>
                <option value="900">900+</option>
                <option value="1000">1000+</option>
              </select>
            </div>
          </div>
          
          <div style={{ padding: '0 0 1rem 0' }}>
            <div style={{ fontSize: '0.875rem', fontWeight: 'bold', marginBottom: '0.5rem', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><MapPin size={14} /> Monuments Filter</div>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Applies to loaded servers with known map intel.</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {MONUMENTS.filter(m => ['launch_site', 'power_plant', 'military_tunnels', 'train_yard', 'airfield', 'water_treatment', 'large_oil_rig', 'small_oil_rig', 'excavator', 'outpost'].includes(m.id)).map(mon => {
                const isActive = filters.monuments?.includes(mon.id);
                return (
                  <button
                    key={mon.id}
                    onClick={() => toggleMonumentFilter(mon.id)}
                    style={{
                      padding: '0.25rem 0.5rem',
                      borderRadius: '16px',
                      fontSize: '0.75rem',
                      border: `1px solid ${isActive ? 'var(--accent-rust)' : 'var(--border-color)'}`,
                      backgroundColor: isActive ? 'rgba(205, 65, 43, 0.1)' : 'transparent',
                      color: isActive ? 'var(--accent-rust)' : 'var(--text-primary)',
                      cursor: 'pointer'
                    }}
                  >
                    {mon.label}
                  </button>
                );
              })}
            </div>
          </div>

        </BottomSheet>

        {selectedServerId && (
          <ServerDetailPanel
            serverId={selectedServerId}
            isWatched={watchedServers.some(s => s.id === selectedServerId)}
            onClose={() => { setSelectedServerId(null); setDetailFocus(null); }}
            onToggleWatch={toggleWatch}
            onSetActiveServer={handleSetActiveServer}
            isActiveServer={rawServers.find(s => s.id === selectedServerId)?.internal_uuid ? rawServers.find(s => s.id === selectedServerId)?.internal_uuid === activeServerId : false}
            isAuthenticated={status === 'authenticated'}
            serverSummary={rawServers.find(s => s.id === selectedServerId)}
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
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
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
               
               <div style={{ height: '24px', width: '1px', backgroundColor: 'var(--border-color)', margin: '0 0.5rem' }}></div>
               
               <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                 <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Sort:</label>
                 <select className="rm-select" value={sortBy} onChange={e => setSortBy(e.target.value as SortOption)}>
                   <option value="players_desc">Players: High to Low</option>
                   <option value="players_asc">Players: Low to High</option>
                   <option value="fill_desc">Fill Rate: High to Low</option>
                   <option value="rank_asc">Rank: Best First</option>
                   <option value="queue_desc">Queue: High to Low</option>
                   <option value="updated_desc">Recently Updated</option>
                 </select>
               </div>

               <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                 <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Min Players:</label>
                 <select className="rm-select" value={filters.minPlayers === null ? 'any' : filters.minPlayers} onChange={e => setFilters({ ...filters, minPlayers: e.target.value === 'any' ? null : parseInt(e.target.value, 10) })}>
                   <option value="any">Any</option>
                   <option value="100">100+</option>
                   <option value="200">200+</option>
                   <option value="300">300+</option>
                   <option value="400">400+</option>
                   <option value="500">500+</option>
                   <option value="600">600+</option>
                   <option value="700">700+</option>
                   <option value="800">800+</option>
                   <option value="900">900+</option>
                   <option value="1000">1000+</option>
                 </select>
               </div>
             </div>

             <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
               <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}><MapPin size={12}/> Monuments:</span>
               <div style={{ display: 'flex', gap: '0.25rem', flexWrap: 'wrap' }}>
                 {MONUMENTS.filter(m => ['launch_site', 'power_plant', 'military_tunnels', 'train_yard', 'airfield', 'water_treatment', 'large_oil_rig', 'small_oil_rig', 'excavator', 'outpost'].includes(m.id)).map(mon => {
                   const isActive = filters.monuments?.includes(mon.id);
                   return (
                     <button
                       key={mon.id}
                       onClick={() => toggleMonumentFilter(mon.id)}
                       style={{
                         padding: '0.15rem 0.5rem',
                         borderRadius: '12px',
                         fontSize: '0.7rem',
                         border: `1px solid ${isActive ? 'var(--accent-rust)' : 'var(--border-color)'}`,
                         backgroundColor: isActive ? 'rgba(205, 65, 43, 0.1)' : 'var(--bg-panel)',
                         color: isActive ? 'var(--accent-rust)' : 'var(--text-secondary)',
                         cursor: 'pointer'
                       }}
                     >
                       {mon.label}
                     </button>
                   );
                 })}
               </div>
             </div>

             <details style={{ marginTop: '0.5rem' }}>
                <summary style={{ cursor: 'pointer', fontWeight: 600, color: 'var(--text-primary)', fontSize: '0.875rem' }}>Advanced Filters</summary>
                <div style={{ marginTop: '0.75rem', display: 'flex', gap: '1.5rem', flexWrap: 'wrap', padding: '1rem', backgroundColor: 'var(--bg-hover)', borderRadius: '4px', border: '1px solid var(--border-color)' }}>
                   
                   {/* Column 1: Core & Wipe */}
                   <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.75rem', cursor: 'pointer' }} title="Only servers with confirmed EAC secure flag from BattleMetrics.">
                        <input type="checkbox" checked={filters.secure} onChange={e => setFilters({ ...filters, secure: e.target.checked })} />
                        Secure only (EAC)
                      </label>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }} title="Filters by time elapsed since the server's last reported wipe.">Wipe Age:</label>
                        <select className="rm-select" value={filters.maxWipeAgeHours === null ? 'any' : filters.maxWipeAgeHours} onChange={e => setFilters({ ...filters, maxWipeAgeHours: e.target.value === 'any' ? null : parseFloat(e.target.value) })}>
                           <option value="any">Any</option>
                           <option value="0.166">≤ 10m</option>
                           <option value="0.5">≤ 30m</option>
                           <option value="1">≤ 1h</option>
                           <option value="2">≤ 2h</option>
                           <option value="4">≤ 4h</option>
                           <option value="8">≤ 8h</option>
                           <option value="12">≤ 12h</option>
                           <option value="24">≤ 24h</option>
                           <option value="72">≤ 3d</option>
                           <option value="168">≤ 7d</option>
                           <option value="336">≤ 14d</option>
                           <option value="720">≤ 30d</option>
                        </select>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }} title="Derived from the last wipe timestamp. Uses reported wipe date/time.">Wipe Day:</label>
                        <select className="rm-select" value={filters.wipeTiming === null ? 'any' : filters.wipeTiming} onChange={e => setFilters({ ...filters, wipeTiming: e.target.value === 'any' ? null : e.target.value as any })}>
                           <option value="any">Any</option>
                           <option value="today">Wiped Today</option>
                           <option value="thursday">Thursday Wipe</option>
                           <option value="weekend">Weekend Wipe</option>
                        </select>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Rank:</label>
                        <select className="rm-select" value={filters.rankRange === null ? 'any' : filters.rankRange} onChange={e => setFilters({ ...filters, rankRange: e.target.value === 'any' ? null : e.target.value as any })}>
                           <option value="any">Any Rank</option>
                           <option value="top100">Top 100</option>
                           <option value="top500">Top 500</option>
                           <option value="top1000">Top 1000</option>
                        </select>
                      </div>
                   </div>

                   {/* Column 2: Region & Map */}
                   <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', borderLeft: '1px solid var(--border-color)', paddingLeft: '1.5rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }} title="Derived from the server country code.">Region:</label>
                        <select className="rm-select" value={filters.region === null ? 'any' : filters.region} onChange={e => setFilters({ ...filters, region: e.target.value === 'any' ? null : e.target.value as any })}>
                           <option value="any">Any Region</option>
                           <option value="EU">Europe (EU)</option>
                           <option value="NA">North America (NA)</option>
                           <option value="SA">South America (SA)</option>
                           <option value="AS">Asia (AS)</option>
                           <option value="OCE">Oceania (OCE)</option>
                           <option value="AF">Africa (AF)</option>
                        </select>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Country:</label>
                        <select className="rm-select" value={filters.country === null ? 'any' : filters.country} onChange={e => setFilters({ ...filters, country: e.target.value === 'any' ? null : e.target.value })}>
                           <option value="any">Any Country</option>
                           {Array.from(new Set(rawServers.map(s => s.country).filter(Boolean))).sort().map(c => (
                              <option key={c} value={c as string}>{c as string}</option>
                           ))}
                        </select>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }} title="Reported or derived map type, e.g. procedural or custom.">Map Type:</label>
                        <select className="rm-select" value={filters.mapType === null ? 'any' : filters.mapType} onChange={e => setFilters({ ...filters, mapType: e.target.value === 'any' ? null : e.target.value as any })}>
                           <option value="any">Any</option>
                           <option value="procedural">Procedural</option>
                           <option value="custom">Custom Map</option>
                           <option value="barren" title="Special map type. Rare; many server lists may have none.">Barren</option>
                        </select>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }} title="Rust world size in map units.">Map Size:</label>
                        <select className="rm-select" value={filters.minMapSize === null ? 'any' : filters.minMapSize} onChange={e => setFilters({ ...filters, minMapSize: e.target.value === 'any' ? null : parseInt(e.target.value, 10), maxMapSize: e.target.value === 'any' ? null : parseInt(e.target.value, 10) + 999 })}>
                           <option value="any">Any Size</option>
                           <option value="1000">1000 - 1999 (Tiny)</option>
                           <option value="2000">2000 - 2999 (Small)</option>
                           <option value="3000">3000 - 3999 (Medium)</option>
                           <option value="4000">4000 - 4999 (Standard)</option>
                           <option value="5000">5000 - 5999 (Large)</option>
                           <option value="6000">6000+ (Huge)</option>
                        </select>
                      </div>
                   </div>

                   {/* Column 3: Rules & Heuristics */}
                   <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', borderLeft: '1px solid var(--border-color)', paddingLeft: '1.5rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Mode <span style={{ fontSize: '0.65rem', color: 'var(--status-warning)' }}>(Heur)</span>:</label>
                        <select className="rm-select" value={filters.mode === null ? 'any' : filters.mode} onChange={e => setFilters({ ...filters, mode: e.target.value === 'any' ? null : e.target.value as any })}>
                           <option value="any">Any Mode</option>
                           <option value="vanilla">Vanilla</option>
                           <option value="pve">PvE</option>
                           <option value="roleplay">Roleplay</option>
                           <option value="combat">Combat / Arena</option>
                           <option value="creative">Creative / Build</option>
                           <option value="softcore">Softcore</option>
                           <option value="hardcore">Hardcore</option>
                        </select>
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }} title="Heuristic: detected from server name/tags. May be approximate.">Farm/Loot:</label>
                          <select className="rm-select" value={filters.lootMultiplier === null ? 'any' : filters.lootMultiplier} onChange={e => setFilters({ ...filters, lootMultiplier: e.target.value === 'any' ? null : e.target.value as any })}>
                             <option value="any">Any</option>
                             <option value="1x">Vanilla / likely 1x</option>
                             <option value="2x">2x</option>
                             <option value="3x">3x</option>
                             <option value="5x">5x</option>
                             <option value="10x">10x</option>
                             <option value="10x+">10x+</option>
                          </select>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }} title="Heuristic: detected from server name/tags. Means maximum likely team size.">Group Limit:</label>
                          <select className="rm-select" value={filters.teamLimit === null ? 'any' : filters.teamLimit} onChange={e => setFilters({ ...filters, teamLimit: e.target.value === 'any' ? null : e.target.value as any })}>
                             <option value="any">Any</option>
                             <option value="solo">Solo</option>
                             <option value="duo">Duo</option>
                             <option value="trio">Trio</option>
                             <option value="quad">Quad (4)</option>
                          </select>
                        </div>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', marginTop: '0.25rem' }}>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.75rem', cursor: 'pointer' }} title="Heuristic: detects raid windows or Offline Raid Protection keywords.">
                          <input type="checkbox" checked={filters.hasRaidWindows} onChange={e => setFilters({ ...filters, hasRaidWindows: e.target.checked })} />
                          Raid Windows / ORP <span style={{ fontSize: '0.65rem', color: 'var(--status-warning)' }}>(Heur)</span>
                        </label>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.75rem', cursor: 'pointer' }} title="Heuristic: detects restart/reboot schedule keywords.">
                          <input type="checkbox" checked={filters.hasScheduledRestart} onChange={e => setFilters({ ...filters, hasScheduledRestart: e.target.checked })} />
                          Scheduled Restarts <span style={{ fontSize: '0.65rem', color: 'var(--status-warning)' }}>(Heur)</span>
                        </label>
                      </div>
                   </div>
                </div>
             </details>
             
             <div className="filter-chip" style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', padding: '0.25rem 0.75rem', backgroundColor: 'transparent', border: '1px dashed var(--border-color)', borderRadius: '16px', fontSize: '0.75rem', color: 'var(--text-disabled)', alignSelf: 'flex-start' }}>
                <HelpCircle size={12} /> {visibleServers.length} shown / {rawServers.length} scanned / {serversWithMapIntel} with map intel / sorted by {sortBy.replace('_', ' ')}
             </div>
          </div>
        </div>

        {isAutoScanning && (
          <div style={{ padding: '0.75rem', backgroundColor: 'var(--bg-hover)', color: 'var(--text-secondary)', border: '1px dashed var(--border-color)', borderRadius: '4px', fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
             <Loader2 size={16} className="spin" />
             <span>Expanding search because filters reduced the result set...</span>
          </div>
        )}

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
        ) : (hasSearched || activeTab === 'saved') && visibleServers.length === 0 && !isAutoScanning && !isSearching && !isLoadingMore ? (
          <div style={{ padding: '4rem', textAlign: 'center', color: 'var(--text-muted)', border: '1px dashed var(--border-color)', borderRadius: '4px' }}>
            No matching servers found after scanning {rawServers.length} loaded servers. Try relaxing your filters.
          </div>
        ) : visibleServers.length > 0 ? (
          <div className="server-list" style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {visibleServers.map(server => (
              <ServerCard 
                key={server.id} 
                server={server} 
                isWatched={watchedServers.some(s => s.id === server.id)}
                isAuthenticated={status === 'authenticated'}
                onToggleWatch={() => toggleWatch(server.id, server.internal_uuid)}
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
          serverSummary={rawServers.find(s => s.id === selectedServerId)}
        />
      )}
    </div>
  );
}
