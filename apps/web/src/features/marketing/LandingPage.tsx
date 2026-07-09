import './LandingPage.css';
import { PublicHeader } from '../../components/public/PublicHeader';
import { Search, Map, BarChart3, Crosshair, Shield, ChevronRight, Activity, Users, AlertTriangle } from 'lucide-react';

export function LandingPage() {
  return (
    <div className="landing-page">
      <PublicHeader />
      
      <main className="landing-main">
        {/* Hero Section */}
        <section className="hero-section">
          <div className="hero-grid-overlay"></div>
          <div className="hero-content">
            <div className="hud-badge">SYSTEM STATUS: ONLINE</div>
            <h1 className="hero-title">
              Plan smarter. Farm faster. <br />
              <span className="hero-accent">Win the wipe.</span>
            </h1>
            <p className="hero-subtitle">
              Your Rust Command Center for every wipe. <br/>
              Know the map before the fight starts.
            </p>
            <div className="hero-actions">
              <a href="/auth" className="btn btn-primary tactical-btn">
                Request Beta Key <ChevronRight size={18} />
              </a>
              <a href="/pricing" className="btn btn-secondary tactical-btn-outline">
                View Arsenal
              </a>
            </div>
          </div>
        </section>

        {/* The 5 Pillars Grid */}
        <section className="pillars-section">
          <div className="section-container">
            <div className="section-header">
              <h2 className="section-title">Tactical Operations</h2>
              <div className="header-line"></div>
            </div>
            
            <div className="pillars-grid">
              
              {/* Pillar 1 */}
              <div className="pillar-card">
                <div className="pillar-header">
                  <Search className="pillar-icon" size={24} />
                  <span className="tactical-label">01 // PREPARE</span>
                </div>
                <h3 className="pillar-title">Server Intelligence</h3>
                <ul className="pillar-features">
                  <li><Crosshair size={14}/> <span>Advanced Server Search & Filters</span></li>
                  <li><Activity size={14}/> <span>Wipe Time & Player Population Tracking</span></li>
                  <li><AlertTriangle size={14}/> <span>Queue & Death Curve Prediction</span></li>
                  <li><Map size={14}/> <span>Map Preview before Wipe</span></li>
                  <li><BarChart3 size={14}/> <span>Server Health: Is it dead or alive?</span></li>
                </ul>
              </div>

              {/* Pillar 2 */}
              <div className="pillar-card highlight-card">
                <div className="pillar-header">
                  <Map className="pillar-icon" size={24} />
                  <span className="tactical-label highlight-label">02 // RESOURCE INTEL</span>
                </div>
                <h3 className="pillar-title">Resource Intelligence</h3>
                <ul className="pillar-features">
                  <li><BarChart3 size={14}/> <span>Estimated Resource Density Heatmaps</span></li>
                  <li><Activity size={14}/> <span>Sulfur, Stone & Metal Ore Potential</span></li>
                  <li><Map size={14}/> <span>Confidence-based Node Predictions</span></li>
                  <li><Crosshair size={14}/> <span>Topography & Monument Risk Analysis</span></li>
                  <li><Shield size={14}/> <span>Build Spot & Farm Route Planning</span></li>
                </ul>
              </div>

              {/* Pillar 3 */}
              <div className="pillar-card">
                <div className="pillar-header">
                  <AlertTriangle className="pillar-icon" size={24} />
                  <span className="tactical-label">03 // LIVE</span>
                </div>
                <h3 className="pillar-title">Event & World Intelligence</h3>
                <ul className="pillar-features">
                  <li><Crosshair size={14}/> <span>Cargo Ship & Patrol Helicopter Alerts</span></li>
                  <li><Search size={14}/> <span>Locked Crate & Airdrop Notifications</span></li>
                  <li><Activity size={14}/> <span>Event Timeline Tracking</span></li>
                  <li><Map size={14}/> <span>World Event Awareness (planned)</span></li>
                  <li><AlertTriangle size={14}/> <span>Live Push Notifications (in dev)</span></li>
                </ul>
              </div>

              {/* Pillar 4 */}
              <div className="pillar-card">
                <div className="pillar-header">
                  <Users className="pillar-icon" size={24} />
                  <span className="tactical-label">04 // SQUAD</span>
                </div>
                <h3 className="pillar-title">In-Game Companion</h3>
                <ul className="pillar-features">
                  <li><Map size={14}/> <span>Live Map & Personal Position</span></li>
                  <li><Users size={14}/> <span>Buddy Position & Distance Tracker</span></li>
                  <li><Crosshair size={14}/> <span>Team Markers & Bed Locations</span></li>
                  <li><Shield size={14}/> <span>Monument Guides & Puzzle Tutorials</span></li>
                  <li><Search size={14}/> <span>Raid Calculator & Base Build Tutorials</span></li>
                </ul>
              </div>

              {/* Pillar 5 */}
              <div className="pillar-card">
                <div className="pillar-header">
                  <BarChart3 className="pillar-icon" size={24} />
                  <span className="tactical-label">05 // REVIEW</span>
                </div>
                <h3 className="pillar-title">After-Game Review</h3>
                <ul className="pillar-features">
                  <li><Activity size={14}/> <span>Session Tracking & Time Invested</span></li>
                  <li><BarChart3 size={14}/> <span>Farm Efficiency & Resource Loot</span></li>
                  <li><Map size={14}/> <span>Pathing, Events & Damage Review</span></li>
                  <li><AlertTriangle size={14}/> <span>Cost vs. Reward Analysis</span></li>
                  <li><Shield size={14}/> <span>Learnings & Setup for the Next Wipe</span></li>
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
                <div className="hud-badge">MODULE: RESOURCE INTEL</div>
                <h3>Plan Farm Routes with Map Intelligence</h3>
                <p>
                  Our engine calculates the estimated <strong>Potential for Sulfur, Stone, and Metal Ore</strong> on any given map. 
                  We utilize confidence-based prediction models to display the general <strong>Node Density</strong> 
                  as interactive heatmap overlays.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  This Map Intelligence is designed to help you strategically plan your <strong>Farm Routes</strong> 
                  before wipe day even starts. No exact coordinates, no cheats – just smart data analysis and probability.
                </p>
              </div>
              <div className="highlight-visual mock-heatmap">
                {/* Visual placeholder for Map Intelligence / Heatmaps */}
                <div className="mock-map-bg"></div>
                <div className="heatmap-overlay-sulfur"></div>
                <div className="heatmap-overlay-stone"></div>
                
                <div className="tactical-overlay-lines"></div>
                <div className="tactical-crosshair"></div>
                
                <span className="mock-heatmap-label">PREVIEW CONCEPT</span>
              </div>
            </div>
            
            <div className="highlight-block reversed">
              <div className="highlight-text">
                <div className="hud-badge">MODULE: SQUAD COMMAND</div>
                <h3>Never lose your team again.</h3>
                <p>
                  The In-Game Companion provides a live tactical map for you and your duo. 
                  Track your own position alongside your <strong>Buddy's Position and Distance</strong> in real-time.
                </p>
                <p style={{ marginTop: '1rem', color: '#ce422b', fontWeight: 'bold' }}>
                  1 Subscription includes your first Buddy Seat! Buy once. Bring one buddy.
                </p>
              </div>
              <div className="highlight-visual mock-hud">
                <div className="hud-distance-box">
                  <span className="hud-label">TARGET: BUDDY</span>
                  <span className="hud-value">245M</span>
                  <span className="hud-status">MOVING (NW)</span>
                </div>
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
