
import './PublicHeader.css';
import { Compass } from 'lucide-react';

export function PublicHeader() {
  return (
    <header className="public-header">
      <div className="public-header-content">
        <a href="/" className="public-header-logo">
          <Compass className="logo-icon" size={28} />
          <span className="logo-text">RUSTMASTER<span className="logo-text-light">TOOL</span></span>
          <span className="tactical-badge">BETA</span>
        </a>
        <nav className="public-header-nav">
          <a href="/pricing" className="nav-link">Arsenal / Pricing</a>
          <a href="/auth" className="nav-link sign-in-btn">Sign in with Steam</a>
          <a href="/app" className="nav-link start-free-btn">Enter Command Center</a>
        </nav>
      </div>
    </header>
  );
}
