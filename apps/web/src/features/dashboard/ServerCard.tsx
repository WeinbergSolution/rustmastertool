import { Users, Map as MapIcon, Globe, Clock, Zap } from 'lucide-react';

// Use generic type to allow mock data without forcing full DB schema in fixtures
export type ServerCardData = {
  id: string;
  name: string;
  status: string;
  players?: number;
  maxPlayers?: number;
  country?: string;
  address?: string;
  port?: number;
  queue?: number;
  rank?: number | null;
  mapName?: string;
  lastWipe?: string | null;
  fps?: number | null;
  worldSeed?: number | null;
  worldSize?: number | null;
  entityCount?: number | null;
  [key: string]: any;
};

export function ServerCard({ server, onSelect }: { server: ServerCardData, onSelect?: () => void }) {
  const isOnline = server.status === 'online';
  
  return (
    <div className="server-item" onClick={onSelect} style={{ cursor: onSelect ? 'pointer' : 'default' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <h4 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1rem', margin: 0 }}>
          <span style={{ 
            width: '8px', height: '8px', borderRadius: '50%', 
            backgroundColor: isOnline ? 'var(--status-online)' : 'var(--status-offline)' 
          }}></span>
          {server.name}
          {server.rank && <span className="badge" style={{ backgroundColor: 'var(--bg-card)', fontSize: '0.65rem' }}>Rank #{server.rank}</span>}
        </h4>
        
        <div className="server-meta">
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Users size={14} /> 
            <span className="value-highlight">{server.players || 0}</span>/{server.maxPlayers || 0}
            {(server.queue ?? 0) > 0 && <span style={{ color: 'var(--status-warning)', marginLeft: '4px' }}>(+{server.queue})</span>}
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <MapIcon size={14} /> {server.mapName || 'Unknown'}
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Globe size={14} /> {server.country}
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Clock size={14} /> {server.lastWipe ? new Date(server.lastWipe).toLocaleDateString() : 'Not provided'}
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Zap size={14} /> {server.fps ? `${server.fps} fps` : 'Gated'}
          </span>
        </div>
      </div>
      
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.25rem', fontSize: '0.75rem', color: 'var(--text-disabled)' }}>
        <span>Seed: {server.worldSeed || 'Unknown'} | Size: {server.worldSize || 'Unknown'}</span>
        <span>Entities: {server.entityCount?.toLocaleString() || 'Fixture only'}</span>
        <span>{server.address}:{server.port}</span>
      </div>
    </div>
  );
}

