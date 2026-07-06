import { Map as MapIcon, Globe, Clock, ChevronRight } from 'lucide-react';

export type ServerCardData = {
  id: string;
  name: string;
  status: string;
  players?: number;
  maxPlayers?: number;
  country?: string;
  address?: string;
  ip?: string;
  port?: number;
  queue?: number;
  rank?: number | null;
  mapName?: string;
  map?: string;
  lastWipe?: string | null;
  updatedAt?: string;
  fps?: number | null;
  worldSeed?: number | null;
  worldSize?: number | null;
  entityCount?: number | null;
  [key: string]: any;
};

export function ServerCard({ server, onSelect }: { server: ServerCardData, onSelect?: () => void }) {
  const isOnline = server.status === 'online';
  const players = server.players || 0;
  const maxPlayers = server.maxPlayers || 1; // avoid div by 0
  const fillPercentage = Math.min(100, (players / maxPlayers) * 100);
  
  return (
    <div className="server-item" onClick={onSelect} style={{ 
      cursor: onSelect ? 'pointer' : 'default',
      backgroundColor: 'var(--bg-panel)',
      border: '1px solid var(--border-color)',
      borderRadius: '8px',
      padding: '1rem',
      display: 'flex',
      alignItems: 'center',
      gap: '1.5rem',
      transition: 'all 0.2s ease',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      {/* Status & Players Column */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.25rem', minWidth: '80px' }}>
        <div style={{ fontSize: '1.25rem', fontWeight: 'bold', fontFamily: 'monospace', color: isOnline ? '#fff' : 'var(--text-disabled)' }}>
          {players}
          <span style={{ color: 'var(--text-muted)', fontSize: '1rem' }}>/{server.maxPlayers || 0}</span>
        </div>
        <div style={{ width: '100%', height: '4px', backgroundColor: 'var(--bg-hover)', borderRadius: '2px', overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${fillPercentage}%`, backgroundColor: fillPercentage > 95 ? 'var(--status-error)' : fillPercentage > 75 ? 'var(--status-warning)' : 'var(--status-success)' }}></div>
        </div>
        {(server.queue ?? 0) > 0 && <span style={{ color: 'var(--status-warning)', fontSize: '0.75rem', fontWeight: 'bold' }}>Queue: {server.queue}</span>}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1 }}>
        <h4 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.1rem', margin: 0, color: 'var(--text-primary)' }}>
          <span style={{ 
            width: '10px', height: '10px', borderRadius: '50%', 
            backgroundColor: isOnline ? 'var(--status-online)' : 'var(--status-offline)' 
          }}></span>
          {server.name}
        </h4>
        
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <MapIcon size={14} /> {server.map || server.mapName || 'Unknown'} {server.worldSize ? `(${server.worldSize})` : ''}
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Globe size={14} /> {server.country || 'Unknown'}
          </span>
          {server.lastWipe && (
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Clock size={14} /> Wipe: {new Date(server.lastWipe).toLocaleDateString()}
            </span>
          )}
          {server.rustType && (
            <span className="badge" style={{ backgroundColor: 'var(--bg-panel)', border: '1px solid var(--accent-rust)', color: 'var(--accent-rust)', textTransform: 'capitalize' }}>
              {server.rustType}
            </span>
          )}
          {server.rank && <span className="badge" style={{ backgroundColor: 'var(--bg-hover)' }}>Rank #{server.rank}</span>}
          <span className="badge" style={{ backgroundColor: 'rgba(205, 65, 43, 0.1)', color: 'var(--accent-rust)', border: '1px solid rgba(205, 65, 43, 0.3)' }}>Pulse collecting</span>
        </div>
      </div>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.25rem', fontSize: '0.75rem', color: 'var(--text-disabled)' }}>
          <span>{server.ip || server.address || 'Unknown'}:{server.port}</span>
          <span>Seed: {server.worldSeed || 'Hidden'}</span>
        </div>
        
        <button 
          style={{ 
            background: 'transparent', border: '1px solid var(--border-color)', borderRadius: '4px', 
            color: 'var(--text-primary)', padding: '0.5rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}
          title="View Details"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}

