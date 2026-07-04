import { X, ShieldAlert, Activity, Globe, Map as MapIcon, Users, Clock, Zap } from 'lucide-react';

interface ServerDetailPanelProps {
  server: any; // using any to match ServerCard deferred cleanup constraint, but conceptually it is NormalizedServer
  isWatched: boolean;
  onClose: () => void;
  onToggleWatch: () => void;
}

export function ServerDetailPanel({ server, isWatched, onClose, onToggleWatch }: ServerDetailPanelProps) {
  if (!server) return null;
  const isOnline = server.status === 'online';

  return (
    <div style={{
      position: 'fixed', top: 0, right: 0, bottom: 0, width: '400px',
      backgroundColor: 'var(--bg-card)', borderLeft: '1px solid var(--border-color)',
      boxShadow: '-4px 0 15px rgba(0,0,0,0.5)', zIndex: 100, display: 'flex', flexDirection: 'column',
      padding: '1.5rem', overflowY: 'auto'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
        <h3 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.25rem' }}>
          <span style={{ 
            width: '10px', height: '10px', borderRadius: '50%', 
            backgroundColor: isOnline ? 'var(--status-online)' : 'var(--status-offline)' 
          }}></span>
          {server.name}
        </h3>
        <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
          <X size={20} />
        </button>
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <button 
          onClick={onToggleWatch}
          style={{ 
            width: '100%', padding: '0.75rem', borderRadius: '4px', cursor: 'pointer',
            backgroundColor: isWatched ? 'var(--bg-hover)' : 'var(--accent-rust)',
            color: isWatched ? 'var(--text-color)' : '#fff',
            border: isWatched ? '1px solid var(--border-color)' : 'none',
            fontWeight: 'bold', display: 'flex', justifyContent: 'center', gap: '0.5rem', alignItems: 'center'
          }}
        >
          {isWatched ? '★ Watching' : '☆ Add to Watchlist'}
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div className="card-title">Server Details</div>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', fontSize: '0.875rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
            <span style={{ color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}><Users size={14}/> Players</span>
            <span className="value-highlight">{server.players} / {server.maxPlayers} {server.queue > 0 && `(+${server.queue})`}</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
            <span style={{ color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}><Globe size={14}/> Country</span>
            <span className="value-highlight">{server.country || 'Unknown'}</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
            <span style={{ color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}><MapIcon size={14}/> Map</span>
            <span className="value-highlight">{server.mapName || 'Unknown'}</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
            <span style={{ color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}><Clock size={14}/> Last Wipe</span>
            <span className="value-highlight">{server.lastWipe ? new Date(server.lastWipe).toLocaleDateString() : 'Unknown'}</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
            <span style={{ color: 'var(--text-muted)' }}>Rank</span>
            <span className="value-highlight">#{server.rank || 'N/A'}</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
            <span style={{ color: 'var(--text-muted)' }}>Address</span>
            <span className="value-highlight">{server.address}:{server.port}</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
            <span style={{ color: 'var(--text-muted)' }}>Seed</span>
            <span className="value-highlight">{server.worldSeed || 'N/A'}</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
            <span style={{ color: 'var(--text-muted)' }}>Size</span>
            <span className="value-highlight">{server.worldSize || 'N/A'}</span>
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
             <span style={{ color: 'var(--text-disabled)' }}>{server.fps || 'Gated'}</span>
           </div>
           <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
             <span style={{ color: 'var(--text-disabled)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}><Activity size={14}/> Entities</span>
             <span style={{ color: 'var(--text-disabled)' }}>{server.entityCount?.toLocaleString() || 'Gated'}</span>
           </div>
         </div>
         <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '1rem', borderTop: '1px solid var(--border-color)', paddingTop: '0.5rem' }}>
           Live provider ingestion is currently disabled. Auth required for cloud persistence.
         </p>
      </div>

    </div>
  );
}
