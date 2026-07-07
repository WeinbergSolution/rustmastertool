import { useState } from 'react';
import { Users, Clock, Globe, Map as MapIcon, Copy, Check } from 'lucide-react';
import type { BattleMetricsServerSummary } from '../../lib/api/battlemetrics';

interface ServerCardMobileProps {
  server: BattleMetricsServerSummary;
  onSelect?: () => void;
  onSelectMap?: () => void;
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

/**
 * Mobile-first server card. Rust-server-browser feel (not admin monitoring):
 * name + population up top, scannable meta (wipe / region / map+size / seed),
 * tappable connect string. Compact rank / modded badges. No "pulse collecting",
 * no faked death curve (reserved for when health scores exist).
 */
export function ServerCardMobile({ server, onSelect, onSelectMap }: ServerCardMobileProps) {
  const [copied, setCopied] = useState(false);
  const isOnline = server.status === 'online';
  const players = server.players || 0;
  const maxPlayers = server.maxPlayers || 0;
  const fill = maxPlayers > 0 ? Math.min(100, (players / maxPlayers) * 100) : 0;
  const wipe = formatWipe(server);
  const connect = server.ip ? `${server.ip}${server.port ? ':' + server.port : ''}` : null;
  const isModded = (server.rustType || '').toLowerCase() === 'modded';
  const hasMapData = Boolean(server.seed || server.mapSize || server.map);

  const copyConnect = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!connect || !navigator.clipboard) return;
    navigator.clipboard.writeText(connect).then(() => {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1400);
    }).catch(() => {});
  };

  return (
    <div className="srv-card" onClick={onSelect}>
      {/* Header: status + name, compact rank / M badge */}
      <div className="srv-card-head">
        <span className={`srv-dot ${isOnline ? 'on' : 'off'}`} />
        <span className="srv-name">{server.name}</span>
        <span className="srv-head-badges">
          {typeof server.rank === 'number' && <span className="srv-rank">#{server.rank}</span>}
          {isModded && <span className="srv-mod" title="Modded">M</span>}
        </span>
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
        <div className="srv-meta-item">
          <MapIcon size={13} /> <span>{server.map || 'Procedural'}{server.mapSize ? ` · ${server.mapSize}` : ''}</span>
        </div>
        <div className="srv-meta-item">
          <span className="srv-meta-key">Seed</span> <span>{server.seed ?? 'Hidden'}</span>
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
