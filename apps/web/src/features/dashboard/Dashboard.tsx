import { useState, useEffect, useMemo } from 'react';
import { ServerCard } from './ServerCard';
import { ServerDetailPanel } from './ServerDetailPanel';
import { MOCK_SERVERS } from '../../data/fixtures/servers';
import { MOCK_MAPS } from '../../data/fixtures/maps';
import { MOCK_ALERTS } from '../../data/fixtures/alerts';
import { Activity, ShieldAlert, Zap, Bell, X, Eye, Search } from 'lucide-react';
import { watchlistRepository } from '../../lib/data/watchlistRepository';

export function Dashboard() {
  const [watchedServerIds, setWatchedServerIds] = useState<string[]>(() => watchlistRepository.getWatchedServerIds());
  const [selectedServerId, setSelectedServerId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Sync state changes back to repository (this covers add/remove toggles)
  useEffect(() => {
    watchlistRepository.setWatchedServerIds(watchedServerIds);
  }, [watchedServerIds]);

  const toggleWatch = (id: string) => {
    setWatchedServerIds(prev => {
      const updated = prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id];
      return updated;
    });
  };

  const selectedServer = MOCK_SERVERS.find(s => s.id === selectedServerId);
  const watchedServers = MOCK_SERVERS.filter(s => watchedServerIds.includes(s.id));

  const filteredServers = useMemo(() => {
    if (!searchQuery) return MOCK_SERVERS;
    const lower = searchQuery.toLowerCase();
    return MOCK_SERVERS.filter(s => 
      s.name.toLowerCase().includes(lower) || 
      s.country.toLowerCase().includes(lower) ||
      s.status.toLowerCase().includes(lower)
    );
  }, [searchQuery]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', position: 'relative' }}>
      
      {/* Hero Panel */}
      <div className="card" style={{ backgroundColor: 'var(--bg-hover)', borderLeft: '4px solid var(--accent-rust)' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Rust Companion Dashboard</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>
          Fixture mode active. This is a static UI shell demonstrating Phase 0.8 product flow. Live provider calls are explicitly gated.
        </p>
        <div className="status-list">
          <div className="status-chip success"><Zap size={16}/> BM Contract Audited</div>
          <div className="status-chip success"><Eye size={16}/> Repository Data Layer</div>
          <div className="status-chip pending"><ShieldAlert size={16}/> Supabase Prepared</div>
          <div className="status-chip future"><Activity size={16}/> Steam Auth Planned</div>
        </div>
      </div>

      <div className="dashboard-grid">
        
        {/* Servers Intelligence */}
        <div className="card col-span-8">
          <div className="card-title" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              Server Explorer Foundation
              <span className="badge" style={{ backgroundColor: 'var(--bg-hover)' }}>{filteredServers.length} Tracking</span>
            </div>
          </div>
          
          <div style={{ marginBottom: '1rem', position: 'relative' }}>
            <div style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}>
              <Search size={16} />
            </div>
            <input 
              type="text" 
              placeholder="Fixture server search (Name, Country, Status) - Live provider search gated..."
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

          {filteredServers.length === 0 ? (
            <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)', border: '1px dashed var(--border-color)', borderRadius: '4px' }}>
              No servers match your fixture search query.
            </div>
          ) : (
            <div className="server-list">
              {filteredServers.map(server => (
                <ServerCard 
                  key={server.id} 
                  server={server} 
                  onSelect={() => setSelectedServerId(server.id)}
                />
              ))}
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
          <div className="card-title">Watchlist Preview</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {watchedServers.length === 0 ? (
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

      {selectedServer && (
        <ServerDetailPanel 
          server={selectedServer}
          isWatched={watchedServerIds.includes(selectedServer.id)}
          onClose={() => setSelectedServerId(null)}
          onToggleWatch={() => toggleWatch(selectedServer.id)}
        />
      )}
    </div>
  );
}
