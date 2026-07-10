import { 
  LayoutDashboard, Server, Map as MapIcon, Filter, 
  Activity, MapPin, Calculator, BookOpen, User, Settings, LineChart
} from 'lucide-react';
import type { ViewState } from './AppShell';

interface SidebarProps {
  currentView?: ViewState;
  onViewChange?: (view: ViewState) => void;
}

function NavGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: '1.5rem' }}>
      <div style={{ 
        fontSize: '0.7rem', 
        textTransform: 'uppercase', 
        letterSpacing: '0.05em', 
        color: 'var(--text-disabled)',
        padding: '0 1.25rem',
        marginBottom: '0.5rem',
        fontWeight: 'bold'
      }}>
        {title}
      </div>
      {children}
    </div>
  );
}

function NavItem({ 
  icon: Icon, label, view, currentView, onViewChange, badge, disabled = false 
}: { 
  icon: any; label: string; view?: ViewState; currentView?: ViewState; 
  onViewChange?: (view: ViewState) => void; badge?: string; disabled?: boolean;
}) {
  const isActive = currentView === view;
  
  return (
    <div 
      className={`nav-item ${isActive ? 'active' : ''}`} 
      style={{ 
        cursor: 'pointer',
        opacity: disabled ? 0.7 : 1,
        padding: '0.6rem 1.25rem',
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        position: 'relative'
      }}
      onClick={() => view && onViewChange?.(view)}
    >
      <Icon size={18} style={{ color: isActive ? 'var(--accent-rust)' : 'inherit' }} />
      <span style={{ fontSize: '0.9rem', flex: 1 }}>{label}</span>
      {badge && (
        <span style={{ 
          fontSize: '0.65rem', 
          backgroundColor: 'rgba(205, 65, 43, 0.15)',
          color: 'var(--accent-rust)',
          padding: '2px 6px',
          borderRadius: '4px',
          border: '1px solid rgba(205, 65, 43, 0.3)'
        }}>
          {badge}
        </span>
      )}
    </div>
  );
}

export function Sidebar({ currentView = 'dashboard', onViewChange }: SidebarProps) {
  return (
    <aside className="sidebar">
      <div className="sidebar-header" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem', borderBottom: '1px solid var(--border-color)', marginBottom: '1rem' }}>
        <div style={{ width: '28px', height: '28px', backgroundColor: 'var(--accent-rust)', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
           <span style={{ color: '#fff', fontWeight: 'bold', fontSize: '14px' }}>RM</span>
        </div>
        <span style={{ fontWeight: 'bold', letterSpacing: '0.02em' }}>RustMasterTool</span>
      </div>
      
      <nav className="sidebar-nav" style={{ flex: 1, overflowY: 'auto' }}>
        
        <NavGroup title="Command Center">
          <NavItem icon={LayoutDashboard} label="Dashboard" view="dashboard" currentView={currentView} onViewChange={onViewChange} />
        </NavGroup>

        <NavGroup title="Pre-Game">
          <NavItem icon={BookOpen} label="Learning" view="learn" currentView={currentView} onViewChange={onViewChange} />
          <NavItem icon={Server} label="Servers" view="servers" currentView={currentView} onViewChange={onViewChange} />
          <NavItem icon={LineChart} label="Server Pulse" view="server_pulse" currentView={currentView} onViewChange={onViewChange} badge="partial" />
          <NavItem icon={MapIcon} label="Map Intel" view="map_intel" currentView={currentView} onViewChange={onViewChange} badge="gated" />
          <NavItem icon={Filter} label="Filter Profiles" view="filter_profiles" currentView={currentView} onViewChange={onViewChange} badge="soon" />
        </NavGroup>

        <NavGroup title="In-Game • Live Companion">
          <NavItem icon={Activity} label="Current Connection" view="current_connection" currentView={currentView} onViewChange={onViewChange} badge="partial" />
          <NavItem icon={MapPin} label="Live Map" view="live_map" currentView={currentView} onViewChange={onViewChange} badge="gated" />
          <NavItem icon={Calculator} label="Raid Calculator" view="raid_calculator" currentView={currentView} onViewChange={onViewChange} />
        </NavGroup>

        <NavGroup title="After-Game">
          <NavItem icon={BookOpen} label="Session Battle Log" view="session_battle_log" currentView={currentView} onViewChange={onViewChange} badge="gated" />
        </NavGroup>

        <NavGroup title="Account">
          <NavItem icon={User} label="MyRust" view="my_rust" currentView={currentView} onViewChange={onViewChange} />
          <NavItem icon={Settings} label="Settings" view="settings" currentView={currentView} onViewChange={onViewChange} badge="roadmap" />
        </NavGroup>

      </nav>
    </aside>
  );
}

