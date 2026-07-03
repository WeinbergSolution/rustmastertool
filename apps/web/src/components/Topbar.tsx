import { ShieldAlert, Database, AlertCircle, User } from 'lucide-react';

export function Topbar() {
  return (
    <header className="topbar">
      <div className="brand">
        <h1 style={{ fontSize: '1.25rem', fontWeight: 700 }}>RustMasterTool <span style={{ color: 'var(--text-disabled)', fontSize: '0.875rem' }}>Phase 0.5</span></h1>
      </div>
      
      <div className="badges">
        <div className="badge warning" title="No live provider calls">
          <AlertCircle size={14} style={{ display: 'inline', verticalAlign: 'text-bottom', marginRight: '4px' }} />
          Fixture Mode
        </div>
        <div className="badge danger" title="Live features are disconnected">
          <ShieldAlert size={14} style={{ display: 'inline', verticalAlign: 'text-bottom', marginRight: '4px' }} />
          Live APIs Disabled
        </div>
        <div className="badge" style={{ backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid #333' }}>
          <Database size={14} style={{ display: 'inline', verticalAlign: 'text-bottom', marginRight: '4px' }} />
          Supabase Prepared
        </div>
      </div>

      <div className="user-actions">
        <button className="btn-steam" disabled title="Steam sign-in planned for Phase 1">
          <User size={16} />
          Sign in with Steam
        </button>
      </div>
    </header>
  );
}

