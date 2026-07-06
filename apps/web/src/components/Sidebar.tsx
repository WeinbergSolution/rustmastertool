import { LayoutDashboard, Server, Eye, Map as MapIcon, Bell, Settings } from 'lucide-react';

export function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div style={{ width: '24px', height: '24px', backgroundColor: 'var(--accent-rust)', borderRadius: '4px' }}></div>
        <span>Companion</span>
      </div>
      
      <nav className="sidebar-nav">
        <div className="nav-item active" style={{ cursor: 'pointer' }}>
          <LayoutDashboard size={20} />
          <span>Dashboard</span>
        </div>
        <div className="nav-item" style={{ opacity: 0.5, cursor: 'not-allowed' }} title="Coming in a future update">
          <Server size={20} />
          <span>Servers <span style={{ fontSize: '0.65rem', marginLeft: '4px', color: 'var(--accent-rust)' }}>(Roadmap)</span></span>
        </div>
        <div className="nav-item" style={{ opacity: 0.5, cursor: 'not-allowed' }} title="Coming in a future update">
          <Eye size={20} />
          <span>Watchlist <span style={{ fontSize: '0.65rem', marginLeft: '4px', color: 'var(--accent-rust)' }}>(Roadmap)</span></span>
        </div>
        <div className="nav-item" style={{ opacity: 0.5, cursor: 'not-allowed' }} title="Coming in a future update">
          <MapIcon size={20} />
          <span>Map Intel <span style={{ fontSize: '0.65rem', marginLeft: '4px', color: 'var(--accent-rust)' }}>(Roadmap)</span></span>
        </div>
        <div className="nav-item" style={{ opacity: 0.5, cursor: 'not-allowed' }} title="Coming in a future update">
          <Bell size={20} />
          <span>Alerts <span style={{ fontSize: '0.65rem', marginLeft: '4px', color: 'var(--accent-rust)' }}>(Roadmap)</span></span>
        </div>
      </nav>

      <div className="sidebar-footer" style={{ padding: '1rem' }}>
        <div className="nav-item" style={{ opacity: 0.5, cursor: 'not-allowed' }} title="Settings will be available soon">
          <Settings size={20} />
          <span>Settings</span>
        </div>
      </div>
    </aside>
  );
}

