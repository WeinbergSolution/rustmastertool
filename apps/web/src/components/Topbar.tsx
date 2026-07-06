import { ShieldAlert, Database, AlertCircle, Menu } from 'lucide-react';
import { AuthUI } from './AuthUI';

export function Topbar({ onMenuClick }: { onMenuClick?: () => void }) {
  const dataMode = import.meta.env.VITE_DATA_MODE || 'fixture';
  const isLive = dataMode === 'supabase';

  return (
    <header className="topbar">
      <div className="brand" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <button className="mobile-menu-btn" onClick={onMenuClick}>
          <Menu size={24} />
        </button>
        <h1 style={{ fontSize: '1.25rem', fontWeight: 700, margin: 0, display: 'flex', alignItems: 'center' }}>
          <span className="brand-full">RustMasterTool</span>
          <span className="brand-short" style={{ display: 'none' }}>RMT</span>
          <span className="hide-on-mobile" style={{ color: 'var(--text-disabled)', fontSize: '0.875rem', marginLeft: '0.5rem' }}>Alpha</span>
        </h1>
      </div>
      
      <div className="badges hide-on-mobile">
        {isLive ? (
          <>
            <div className="badge success" title="Using live BattleMetrics API">
              <AlertCircle size={14} style={{ display: 'inline', verticalAlign: 'text-bottom', marginRight: '4px' }} />
              Live Provider Mode
            </div>
            <div className="badge success" title="Live features are active via Edge Function">
              <ShieldAlert size={14} style={{ display: 'inline', verticalAlign: 'text-bottom', marginRight: '4px' }} />
              BattleMetrics Live
            </div>
          </>
        ) : (
          <>
            <div className="badge warning" title="No live provider calls">
              <AlertCircle size={14} style={{ display: 'inline', verticalAlign: 'text-bottom', marginRight: '4px' }} />
              Fixture Mode
            </div>
            <div className="badge danger" title="Live features are disconnected">
              <ShieldAlert size={14} style={{ display: 'inline', verticalAlign: 'text-bottom', marginRight: '4px' }} />
              Live APIs Disabled
            </div>
          </>
        )}
        <div className="badge" style={{ backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid #333' }}>
          <Database size={14} style={{ display: 'inline', verticalAlign: 'text-bottom', marginRight: '4px' }} />
          Supabase Prepared
        </div>
      </div>

      <div className="user-actions">
        <AuthUI />
      </div>
    </header>
  );
}

