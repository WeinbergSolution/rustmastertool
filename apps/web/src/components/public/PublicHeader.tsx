
import './PublicHeader.css';
import { Compass } from 'lucide-react';

export function PublicHeader() {
  return (
    <header className="public-header">
      <div className="public-header-content">
        <a href="/" className="public-header-logo">
          <Compass className="logo-icon" size={28} />
          <span className="logo-text">RustMasterTool</span>
        </a>
        <nav className="public-header-nav">
          <a href="/pricing" className="nav-link">Pricing</a>
          <a href="/auth" className="nav-link sign-in-btn">Sign In</a>
          <a href="/app" className="nav-link start-free-btn">App / Dashboard</a>
        </nav>
      </div>
    </header>
  );
}
