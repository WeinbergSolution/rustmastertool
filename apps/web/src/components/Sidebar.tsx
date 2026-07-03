import { LayoutDashboard, Server, Eye, Map as MapIcon, Bell, Settings } from 'lucide-react';

export function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div style={{ width: '24px', height: '24px', backgroundColor: 'var(--accent-rust)', borderRadius: '4px' }}></div>
        <span>Companion</span>
      </div>
      
      <nav className="sidebar-nav">
        <div className="nav-item active">
          <LayoutDashboard size={20} />
          <span>Dashboard</span>
        </div>
        <div className="nav-item">
          <Server size={20} />
          <span>Servers</span>
        </div>
        <div className="nav-item">
          <Eye size={20} />
          <span>Watchlist</span>
        </div>
        <div className="nav-item">
          <MapIcon size={20} />
          <span>Map Intel</span>
        </div>
        <div className="nav-item">
          <Bell size={20} />
          <span>Alerts</span>
        </div>
      </nav>

      <div className="sidebar-footer" style={{ padding: '1rem' }}>
        <div className="nav-item">
          <Settings size={20} />
          <span>Settings</span>
        </div>
      </div>
    </aside>
  );
}

