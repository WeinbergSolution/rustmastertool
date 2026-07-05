import { useState, useEffect } from 'react';
import { ServerCard } from './ServerCard';
import { ServerDetailPanel } from './ServerDetailPanel';
import { MOCK_MAPS } from '../../data/fixtures/maps';
import { MOCK_ALERTS } from '../../data/fixtures/alerts';
import { Activity, ShieldAlert, Zap, Bell, X, Eye, Search, AlertTriangle, Loader2 } from 'lucide-react';
import { watchlistRepository } from '../../lib/data/watchlistRepository';
import { searchServers, type BattleMetricsServerSummary } from '../../lib/api/battlemetrics';
import { MOCK_SERVERS } from '../../data/fixtures/servers'; // Kept for watchlist fixture fallback if needed

export function Dashboard() {
  const [watchedServerIds, setWatchedServerIds] = useState<string[]>([]);
  const [isWatchlistLoading, setIsWatchlistLoading] = useState(true);
  const [selectedServerId, setSelectedServerId] = useState<string | null>(null);
  
  // Live Explorer State
  const [searchQuery, setSearchQuery] = useState('');
  const [servers, setServers] = useState<BattleMetricsServerSummary[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  // Initial load
  useEffect(() => {
    let mounted = true;
    watchlistRepository.getWatchedServerIds().then((ids) => {
      if (mounted) {
        setWatchedServerIds(ids);
        setIsWatchlistLoading(false);
      }
    });
    return () => {
      mounted = false;
    };
  }, []);

  const handleSearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    setSearchError(null);
    setHasSearched(true);

    try {
      const results = await searchServers(searchQuery);
      setServers(results);
    } catch (err: any) {
      setSearchError(err.message || 'Failed to search servers');
      setServers([]);
    } finally {
      setIsSearching(false);
    }
  };

  const toggleWatch = async (id: string) => {
    const updated = await watchlistRepository.toggleServer(id);
    setWatchedServerIds(updated);
  };

  // Keep fixture watchlist mapping since we aren't saving details to DB yet
  // In a real scenario, watchlist would pull from DB/provider
  const watchedServers = MOCK_SERVERS.filter(s => watchedServerIds.includes(s.id));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', position: 'relative' }}>
      
      {/* Hero Panel */}
      <div className="card" style={{ backgroundColor: 'var(--bg-hover)', borderLeft: '4px solid var(--accent-rust)' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Rust Companion Dashboard</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>
          Real Provider Mode active. The Server Explorer now fetches live data from BattleMetrics.
        </p>
        <div className="status-list">
          <div className="status-chip success"><Zap size={16}/> BM Edge Function Proxy</div>
          <div className="status-chip success"><Eye size={16}/> Live Provider Integration</div>
          <div className="status-chip pending"><ShieldAlert size={16}/> Cloud Persistence Pending</div>
          <div className="status-chip future"><Activity size={16}/> Steam Auth Planned</div>
        </div>
      </div>

      <div className="dashboard-grid">
        
        {/* Servers Intelligence */}
        <div className="card col-span-8">
          <div className="card-title" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              Real Server Explorer
              <span className="badge" style={{ backgroundColor: 'var(--accent-rust)' }}>BattleMetrics live data</span>
            </div>
          </div>
          
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
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem 0.75rem 2.5rem',
                  backgroundColor: 'var(--bg-panel)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '4px',
                  color: 'var(--text-primary)',
                  fontSize: '0.875rem'
                }}
              />
            </div>
            <button 
              type="submit" 
              disabled={isSearching || !searchQuery.trim()}
              style={{
                padding: '0 1.5rem',
                backgroundColor: 'var(--accent-rust)',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                cursor: (isSearching || !searchQuery.trim()) ? 'not-allowed' : 'pointer',
                opacity: (isSearching || !searchQuery.trim()) ? 0.7 : 1,
                fontWeight: 'bold'
              }}
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
              <p style={{ marginTop: '0.5rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>Make sure the Edge Function is deployed and running.</p>
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
                  onSelect={() => setSelectedServerId(server.id)}
                />
              ))}
            </div>
          ) : (
            <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)', border: '1px dashed var(--border-color)', borderRadius: '4px' }}>
              Enter a search term to query the live BattleMetrics API.
            </div>
          )}
        </div>

        {/* Population Trend & Alerts */}
        <div className="col-span-4" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          <div className="card">
            <div className="card-title">Population Trend</div>
            <div className="gated-overlay" style={{ height: '120px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
               <div style={{ padding: '1rem', textAlign: 'center' }}>
                 <Activity size={32} style={{ color: 'var(--text-disabled)', margin: '0 auto 0.5rem' }} />
                 <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Historical snapshots gated until polling budget recalibrated.</p>
               </div>
            </div>
          </div>

          <div className="card">
            <div className="card-title">Alert Center <Bell size={18} style={{ color: 'var(--text-muted)' }}/></div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--status-warning)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <ShieldAlert size={12}/> Alert rules prepared. Requires Auth + Provider Ingestion.
              </div>
              {MOCK_ALERTS.map(alert => (
                <div key={alert.id} style={{ padding: '0.75rem', backgroundColor: 'var(--bg-panel)', borderRadius: '4px', borderLeft: '3px solid var(--status-warning)' }}>
                   <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>{alert.time}   {alert.serverName}</div>
                   <div style={{ fontSize: '0.875rem' }}>{alert.message}</div>
                </div>
              ))}
              <button disabled style={{ marginTop: '0.5rem', padding: '0.5rem', width: '100%', background: 'transparent', border: '1px solid var(--border-color)', color: 'var(--text-disabled)', borderRadius: '4px', cursor: 'not-allowed' }}>
                Open Discord Delivery (Coming Later)
              </button>
            </div>
          </div>

        </div>

        {/* Watchlist & Map Intel */}
        <div className="card col-span-6">
          <div className="card-title">Watchlist Preview (Fixture)</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {isWatchlistLoading ? (
              <div style={{ padding: '1rem', border: '1px dashed var(--border-color)', borderRadius: '4px', color: 'var(--text-muted)' }}>
                Loading watchlist...
              </div>
            ) : watchedServers.length === 0 ? (
              <div style={{ padding: '1rem', border: '1px dashed var(--border-color)', borderRadius: '4px', color: 'var(--text-muted)' }}>
                No servers currently in watchlist. Click a server to add it.
              </div>
            ) : (
              <div className="server-list" style={{ gridTemplateColumns: '1fr', gap: '0.5rem' }}>
                {watchedServers.map(server => (
                  <div key={server.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'var(--bg-panel)', padding: '0.5rem 1rem', borderRadius: '4px' }}>
                    <span style={{ fontSize: '0.875rem', fontWeight: 'bold' }}>{server.name}</span>
                    <button onClick={() => toggleWatch(server.id)} style={{ background: 'transparent', border: 'none', color: 'var(--status-error)', cursor: 'pointer' }} title="Remove from Watchlist">
                      <X size={16} />
                    </button>
                  </div>
                ))}
              </div>
            )}
            <button disabled style={{ padding: '0.5rem 1rem', background: 'var(--bg-panel)', border: '1px solid var(--border-color)', color: 'var(--text-disabled)', borderRadius: '4px', cursor: 'not-allowed' }}>
              + Sync Watchlist to Cloud (Auth Required)
            </button>
          </div>
        </div>

        <div className="card col-span-6">
          <div className="card-title">Map Intelligence Preview</div>
          {MOCK_MAPS.map(map => (
            <div key={map.id} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <div style={{ display: 'flex', gap: '1rem', fontSize: '0.875rem' }}>
                 <span><span className="value-highlight">Seed:</span> {map.seed}</span>
                 <span><span className="value-highlight">Size:</span> {map.size}</span>
                 <span><span className="value-highlight">Monuments:</span> {map.monuments}</span>
              </div>
              <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                 Top: {map.topMonuments.join(', ')}
              </div>
              <div className="gated-overlay" style={{ height: '140px', backgroundColor: 'var(--bg-panel)', marginTop: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--border-color)' }}>
                 <p style={{ fontSize: '0.875rem', color: 'var(--text-disabled)' }}>Map provider attribution pending. Image rehosting gated.</p>
              </div>
            </div>
          ))}
        </div>

      </div>

      {selectedServerId && (
        <ServerDetailPanel 
          serverId={selectedServerId}
          isWatched={watchedServerIds.includes(selectedServerId)}
          onClose={() => setSelectedServerId(null)}
          onToggleWatch={() => toggleWatch(selectedServerId)}
        />
      )}
    </div>
  );
}
