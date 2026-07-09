
import './LandingPage.css';
import { PublicHeader } from '../../components/public/PublicHeader';
import { Search, Map, BarChart3, Crosshair, Shield, Play, ChevronRight, Activity } from 'lucide-react';

export function LandingPage() {
  return (
    <div className="landing-page">
      <PublicHeader />
      
      <main className="landing-main">
        {/* Hero Section */}
        <section className="hero-section">
          <div className="hero-content">
            <h1 className="hero-title">
              Plan smarter. Farm faster. <br />
              <span className="hero-accent">Win the wipe.</span>
            </h1>
            <p className="hero-subtitle">
              Dein Rust Command Center — Server Scouting, Map Analysis, Sulfur & Stone Heatmaps, Live Companion und Session Review in einer Plattform. <br/>
              Know the map before the fight starts.
            </p>
            <div className="hero-actions">
              <a href="/auth" className="btn btn-primary">
                Start Free <ChevronRight size={18} />
              </a>
              <a href="/pricing" className="btn btn-secondary">
                View Pricing
              </a>
            </div>
          </div>
        </section>

        {/* The 3 Phases */}
        <section className="phases-section">
          <div className="section-container">
            <h2 className="section-title">Dein Command Center für jeden Wipe</h2>
            
            <div className="phases-grid">
              
              <div className="phase-card">
                <div className="phase-icon-wrapper">
                  <Search className="phase-icon" size={32} />
                </div>
                <h3 className="phase-title">1. Prepare / Spielvorbereitung</h3>
                <ul className="phase-features">
                  <li><Crosshair size={16}/> <span>Server Health & Wipe Prediction</span></li>
                  <li><Map size={16}/> <span>Map Preview vor dem Wipe</span></li>
                  <li><Shield size={16}/> <span>Monument Analysis</span></li>
                  <li><BarChart3 size={16}/> <span>Sulfur, Stone & Metal Potential</span></li>
                  <li><Search size={16}/> <span>Build Spot & Farm Route Planning</span></li>
                </ul>
              </div>

              <div className="phase-card">
                <div className="phase-icon-wrapper">
                  <Play className="phase-icon" size={32} />
                </div>
                <h3 className="phase-title">2. Play / Spielbegleitung</h3>
                <ul className="phase-features">
                  <li><Map size={16}/> <span>Live Companion Map (in dev)</span></li>
                  <li><Crosshair size={16}/> <span>Team, Marker & Beds (in dev)</span></li>
                  <li><Search size={16}/> <span>Raid Calculator (coming soon)</span></li>
                  <li><Shield size={16}/> <span>Monument Guides & Puzzle Tutorials</span></li>
                  <li><Activity size={16}/> <span>Base Build Tutorials</span></li>
                </ul>
              </div>

              <div className="phase-card">
                <div className="phase-icon-wrapper">
                  <BarChart3 className="phase-icon" size={32} />
                </div>
                <h3 className="phase-title">3. Review / Spielaufbereitung</h3>
                <ul className="phase-features">
                  <li><Activity size={16}/> <span>Session Tracking (coming soon)</span></li>
                  <li><BarChart3 size={16}/> <span>Farm Review & Resource Efficiency</span></li>
                  <li><Map size={16}/> <span>Damage, Route & Event Review</span></li>
                  <li><Shield size={16}/> <span>Learnings für den nächsten Wipe</span></li>
                </ul>
              </div>

            </div>
          </div>
        </section>

        {/* Feature Highlights Section */}
        <section className="highlights-section">
          <div className="section-container">
            <div className="highlight-block">
              <div className="highlight-text">
                <h3>Resource Intelligence</h3>
                <p>
                  Unsere Engine berechnet das geschätzte <strong>Potential für Sulfur, Stone und Metal Ore</strong> auf jeder Map. 
                  Wir nutzen Confidence-basierte Prediction-Modelle, um die generelle <strong>Node Density</strong> 
                  als interaktive Heatmap-Overlays darzustellen.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  Diese Map Intelligence ist darauf ausgelegt, dir bei der strategischen Planung deiner <strong>Farm Routes</strong> 
                  vor dem Wipe Day zu helfen. Keine echten Positionen, keine Cheats – nur smarte Datenanalyse.
                </p>
              </div>
              <div className="highlight-visual mock-heatmap">
                {/* Visual placeholder for Map Intelligence / Heatmaps */}
                <div className="mock-map-bg"></div>
                <div className="heatmap-overlay-sulfur"></div>
                <div className="heatmap-overlay-stone"></div>
                <span className="mock-heatmap-label">Preview Concept / In Development</span>
              </div>
            </div>
          </div>
        </section>
        
      </main>

      <footer className="public-footer">
        <div className="footer-content">
          <p>&copy; 2026 RustMasterTool. All rights reserved.</p>
          <p className="footer-note">RustMasterTool is an independent project and is not affiliated with Facepunch Studios.</p>
        </div>
      </footer>
    </div>
  );
}
