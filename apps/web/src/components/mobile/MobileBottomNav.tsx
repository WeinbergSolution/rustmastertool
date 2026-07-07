import { Home, Server, Crosshair, BookOpen, Menu } from 'lucide-react';

export type MobileTab = 'home' | 'servers' | 'live' | 'learn' | 'more';

interface MobileBottomNavProps {
  activeTab: MobileTab;
  onTabSelect: (tab: MobileTab) => void;
}

const TABS: { key: MobileTab; label: string; icon: typeof Home }[] = [
  { key: 'home', label: 'Home', icon: Home },
  { key: 'servers', label: 'Servers', icon: Server },
  { key: 'live', label: 'Live', icon: Crosshair },
  { key: 'learn', label: 'Learn', icon: BookOpen },
  { key: 'more', label: 'More', icon: Menu },
];

/**
 * Primary mobile navigation. Always fixed at the bottom.
 * Only live/primary destinations — no gated/roadmap features live here.
 */
export function MobileBottomNav({ activeTab, onTabSelect }: MobileBottomNavProps) {
  return (
    <nav className="mobile-bottomnav" aria-label="Primary">
      {TABS.map(({ key, label, icon: Icon }) => {
        const isActive = activeTab === key;
        return (
          <button
            key={key}
            className={`mobile-bottomnav-item${isActive ? ' active' : ''}`}
            onClick={() => onTabSelect(key)}
            aria-current={isActive ? 'page' : undefined}
          >
            <Icon size={20} />
            <span>{label}</span>
          </button>
        );
      })}
    </nav>
  );
}
