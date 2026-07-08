import { useState } from 'react';
import { Clock, Globe, Map as MapIcon, Image as ImageIcon, ChevronRight, Bookmark, BookmarkCheck } from 'lucide-react';
import type { BattleMetricsServerSummary } from '../../lib/api/battlemetrics';
import { getServerTypeBadge } from './serverCardUtils';
import './serverCards.css';

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

export function ServerCard({ server, isWatched, isAuthenticated, onToggleWatch, onSelect, onOpenMap }: { server: ServerCardData, isWatched?: boolean, isAuthenticated?: boolean, onToggleWatch?: () => void, onSelect?: () => void, onOpenMap?: () => void }) {
  const isOnline = server.status === 'online';
  const badge = getServerTypeBadge(server as unknown as BattleMetricsServerSummary);
  const mapThumbnailUrl = server.mapThumbnailUrl || server.mapImageUrl;
  const players = server.players || 0;
  const maxPlayers = server.maxPlayers || 1; // avoid div by 0
  const fillPercentage = Math.min(100, (players / maxPlayers) * 100);
  const [isMapEnlarged, setIsMapEnlarged] = useState(false);

  const handleSave = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isAuthenticated) {
      window.sessionStorage.setItem('serverExplorer.pendingAction', 'watchlist');
      window.sessionStorage.setItem('serverExplorer.selectedServerId', server.id);
      window.sessionStorage.setItem('serverExplorer.view', 'servers');
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      if (supabaseUrl) {
        const origin = encodeURIComponent(window.location.origin);
        window.location.href = `${supabaseUrl}/functions/v1/steam-auth?action=login&origin=${origin}`;
      }
      return;
    }
    if (onToggleWatch) onToggleWatch();
  };
  
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

      {/* Center: Thumbnail */}
      <div style={{ flexShrink: 0, width: '100px', display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
        {mapThumbnailUrl ? (
          <div style={{ position: 'relative' }}>
            <img 
              src={mapThumbnailUrl} 
              alt="Map" 
              className="srv-card-image" 
              loading="lazy" 
              style={{ cursor: 'zoom-in' }}
              onClick={(e) => { e.stopPropagation(); setIsMapEnlarged(true); }}
            />
            {isMapEnlarged && (
              <div 
                style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.85)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'zoom-out' }}
                onClick={(e) => { e.stopPropagation(); setIsMapEnlarged(false); }}
              >
                <img src={mapThumbnailUrl} alt="Map Enlarged" style={{ maxWidth: '90vw', maxHeight: '90vh', borderRadius: '8px', boxShadow: '0 4px 20px rgba(0,0,0,0.5)' }} />
              </div>
            )}
            {onOpenMap && (
              <button 
                type="button"
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); onOpenMap(); }}
                onPointerDown={(e) => e.stopPropagation()}
                onMouseDown={(e) => e.stopPropagation()}
                onTouchStart={(e) => e.stopPropagation()}
                style={{
                  position: 'absolute',
                  top: '-8px',
                  right: '-8px',
                  zIndex: 10,
                  backgroundColor: 'var(--status-success)',
                  color: '#000',
                  border: 'none',
                  borderRadius: '50%',
                  padding: '4px',
                  cursor: 'pointer',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.4)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                title="Open parsed server map"
                aria-label="Open server map"
              >
                <MapIcon size={16} />
              </button>
            )}
          </div>
        ) : (
          <div className="srv-card-image-placeholder" style={{ position: 'relative' }}>
            <ImageIcon size={24} />
            {onOpenMap && (
              <button 
                type="button"
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); onOpenMap(); }}
                onPointerDown={(e) => e.stopPropagation()}
                onMouseDown={(e) => e.stopPropagation()}
                onTouchStart={(e) => e.stopPropagation()}
                style={{
                  position: 'absolute',
                  top: '-8px',
                  right: '-8px',
                  zIndex: 10,
                  backgroundColor: 'var(--bg-hover)',
                  color: 'var(--text-disabled)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '50%',
                  padding: '4px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                title="Map data not available yet"
                aria-label="Map data not available yet"
              >
                <MapIcon size={16} />
              </button>
            )}
          </div>
        )}
        <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '0.25rem', textAlign: 'center' }}>
          {server.mapIdentitySize || server.mapSize ? `Map Size: ${server.mapIdentitySize || server.mapSize}` : ''}
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
          <span style={{ 
            display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', 
            backgroundColor: isOnline ? 'var(--status-success)' : 'var(--status-error)',
            boxShadow: isOnline ? '0 0 8px rgba(74, 222, 128, 0.4)' : 'none'
          }} title={isOnline ? 'Online' : 'Offline'} />
          <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 600, color: 'var(--text-primary)' }}>{server.name}</h3>
          {typeof server.rank === 'number' && (
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', backgroundColor: 'var(--bg-hover)', padding: '0.1rem 0.4rem', borderRadius: '4px' }}>
              #{server.rank}
            </span>
          )}
          <span className={`srv-type-badge srv-type-${badge.type}`} style={{ marginLeft: 'auto' }} title="Server Type">{badge.label}</span>
        </div>
        
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
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <button 
            onClick={handleSave}
            style={{ 
              background: 'transparent', border: '1px solid var(--border-color)', borderRadius: '4px', 
              color: isWatched ? 'var(--status-error)' : 'var(--text-disabled)', padding: '0.5rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}
            title={isWatched ? 'Remove Saved' : 'Save Server'}
          >
            {isWatched ? <BookmarkCheck size={20} /> : <Bookmark size={20} />}
          </button>
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
    </div>
  );
}
