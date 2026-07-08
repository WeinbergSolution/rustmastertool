import { useState } from 'react';
import { Users, Clock, Globe, Map as MapIcon, Copy, Check, Image as ImageIcon } from 'lucide-react';
import { Bookmark, BookmarkCheck } from 'lucide-react';
import type { BattleMetricsServerSummary } from '../../lib/api/battlemetrics';
import { getServerTypeBadge } from '../../features/dashboard/serverCardUtils';
import '../../features/dashboard/serverCards.css';

interface ServerCardMobileProps {
  server: BattleMetricsServerSummary;
  isWatched?: boolean;
  isAuthenticated?: boolean;
  onToggleWatch?: () => void;
  onSelect?: () => void;
  onSelectMap?: () => void;
  onOpenMap?: () => void;
}

function formatWipe(server: BattleMetricsServerSummary): string | null {
  if (server.wipeAge) return server.wipeAge;
  if (server.lastWipe) {
    const then = new Date(server.lastWipe).getTime();
    if (!Number.isNaN(then)) {
      const days = Math.floor((Date.now() - then) / 86_400_000);
      if (days <= 0) return 'today';
      if (days === 1) return '1d ago';
      return `${days}d ago`;
    }
  }
  return null;
}

export function ServerCardMobile({ server, isWatched, isAuthenticated, onToggleWatch, onSelect, onSelectMap, onOpenMap }: ServerCardMobileProps) {
  const [copied, setCopied] = useState(false);
  const isOnline = server.status === 'online';
  const players = server.players || 0;
  const maxPlayers = server.maxPlayers || 0;
  const fill = maxPlayers > 0 ? Math.min(100, (players / maxPlayers) * 100) : 0;
  const wipe = formatWipe(server);
  const connect = server.ip ? `${server.ip}${server.port ? ':' + server.port : ''}` : null;
  const badge = getServerTypeBadge(server);
  const hasMapData = Boolean(server.mapIdentitySeed || server.seed || server.mapIdentitySize || server.mapSize || server.map);
  const mapThumbnailUrl = server.mapThumbnailUrl || server.mapImageUrl;

  const copyConnect = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!connect || !navigator.clipboard) return;
    navigator.clipboard.writeText(connect).then(() => {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1400);
    }).catch(() => {});
  };

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
    <div className="srv-card" onClick={onSelect}>
      <div className="srv-card-layout">
        <div className="srv-card-content">
          {/* Header */}
          <div className="srv-card-head" style={{ paddingRight: '2rem', position: 'relative' }}>
            <span className={`srv-dot ${isOnline ? 'on' : 'off'}`} />
            <span className="srv-name">{server.name}</span>
            <span className="srv-head-badges">
              {typeof server.rank === 'number' && <span className="srv-rank">#{server.rank}</span>}
              <span className={`srv-type-badge srv-type-${badge.type}`} title="Server Type">{badge.label}</span>
            </span>
            <button 
              onClick={handleSave} 
              style={{ position: 'absolute', right: 0, top: 0, background: 'transparent', border: 'none', padding: '0.25rem', color: isWatched ? 'var(--status-error)' : 'var(--text-disabled)', cursor: 'pointer' }}
            >
              {isWatched ? <BookmarkCheck size={20} /> : <Bookmark size={20} />}
            </button>
          </div>

          {/* Population */}
          <div className="srv-pop">
            <Users size={14} className="srv-pop-icon" />
            <span className="srv-pop-count">{players}</span>
            <span className="srv-pop-max">/ {maxPlayers || '?'}</span>
            {(server.queue ?? 0) > 0 && <span className="srv-queue">+{server.queue} queue</span>}
            <span className="srv-pop-bar"><span className="srv-pop-fill" style={{ width: `${fill}%` }} /></span>
          </div>

          {/* Meta grid */}
          <div className="srv-meta">
            <div className="srv-meta-item">
              <Clock size={13} /> <span>{wipe ? `Wiped ${wipe}` : 'Wipe unknown'}</span>
            </div>
            <div className="srv-meta-item">
              <Globe size={13} /> <span>{server.country || 'Unknown'}</span>
            </div>
          </div>
        </div>

        {/* Thumbnail side */}
        <div className="srv-card-thumb" style={{ position: 'relative' }}>
          {mapThumbnailUrl ? (
            <div style={{ position: 'relative' }}>
              <img src={mapThumbnailUrl} alt="Map" className="srv-card-image" loading="lazy" />
              {onOpenMap && (
                <button 
                  onClick={(e) => { e.stopPropagation(); onOpenMap(); }}
                  style={{
                    position: 'absolute',
                    top: '-4px',
                    right: '-4px',
                    backgroundColor: 'var(--status-success)',
                    color: '#000',
                    border: 'none',
                    borderRadius: '50%',
                    padding: '2px',
                    cursor: 'pointer',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.4)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                  title="Open parsed server map"
                  aria-label="Open server map"
                >
                  <MapIcon size={12} />
                </button>
              )}
            </div>
          ) : (
            <div className="srv-card-image-placeholder" style={{ position: 'relative' }}>
              <ImageIcon size={24} />
              {onOpenMap && (
                <button 
                  onClick={(e) => { e.stopPropagation(); onOpenMap(); }}
                  style={{
                    position: 'absolute',
                    top: '-4px',
                    right: '-4px',
                    backgroundColor: 'var(--bg-hover)',
                    color: 'var(--text-disabled)',
                    border: '1px solid var(--border-color)',
                    borderRadius: '50%',
                    padding: '2px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                  title="Map data not available yet"
                  aria-label="Map data not available yet"
                >
                  <MapIcon size={12} />
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Map meta */}
      <div className="srv-meta" style={{ marginTop: '0.5rem', paddingTop: '0.5rem', borderTop: '1px solid var(--border-color)' }}>
        <div className="srv-meta-item">
          <MapIcon size={13} /> <span>{server.mapType || server.map || 'Procedural'} {server.mapIdentitySize || server.mapSize ? `· Map Size: ${server.mapIdentitySize || server.mapSize}` : ''}</span>
        </div>
      </div>

      {/* Connect + map indicator */}
      <div className="srv-foot">
        {connect ? (
          <button className="srv-connect" onClick={copyConnect} title="Copy connect">
            {copied ? <Check size={13} /> : <Copy size={13} />}
            <span>{connect}</span>
          </button>
        ) : <span className="srv-connect srv-connect--none">Connect hidden</span>}
        {hasMapData && (
          <button
            className="srv-map-ind"
            onClick={(e) => { e.stopPropagation(); (onSelectMap || onSelect)?.(); }}
            title="Open map preview"
          >
            <MapIcon size={12} /> Map
          </button>
        )}
      </div>
    </div>
  );
}
