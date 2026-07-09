
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
              Plan smarter. Survive longer. <br />
              <span className="hero-accent">Win the wipe.</span>
            </h1>
            <p className="hero-subtitle">
              Dein Rust Command Center — vom Server-Scouting bis zur Wipe-Auswertung.
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
                  <li><Crosshair size={16}/> <span>Server Intelligence & Scouting</span></li>
                  <li><Activity size={16}/> <span>Server Health & Death Curve Prediction</span></li>
                  <li><Map size={16}/> <span>Map Intelligence vor dem Wipe</span></li>
                  <li><BarChart3 size={16}/> <span>Resource Density Prediction (Stone, Sulfur, Metal)</span></li>
                  <li><Shield size={16}/> <span>Monument & Build Spot Analyse</span></li>
                </ul>
              </div>

              <div className="phase-card">
                <div className="phase-icon-wrapper">
                  <Play className="phase-icon" size={32} />
                </div>
                <h3 className="phase-title">2. Play / Spielbegleitung</h3>
                <ul className="phase-features">
                  <li><Map size={16}/> <span>Live Map & Second Screen (in development)</span></li>
                  <li><Search size={16}/> <span>Raid Calculator (coming soon)</span></li>
                  <li><Crosshair size={16}/> <span>In-App Rust Guides & Puzzle Erklärungen</span></li>
                  <li><Shield size={16}/> <span>Base Build Tutorials</span></li>
                  <li><Activity size={16}/> <span>Rust+ Companion Features (planned)</span></li>
                </ul>
              </div>

              <div className="phase-card">
                <div className="phase-icon-wrapper">
                  <BarChart3 className="phase-icon" size={32} />
                </div>
                <h3 className="phase-title">3. Review / Spielaufbereitung</h3>
                <ul className="phase-features">
                  <li><Activity size={16}/> <span>Session Tracking (coming soon)</span></li>
                  <li><BarChart3 size={16}/> <span>Ressourcen & Zeit Auswertung</span></li>
                  <li><Map size={16}/> <span>Damage, Events & Wege Analyse</span></li>
                  <li><Shield size={16}/> <span>Learnings für den nächsten Wipe</span></li>
                  <li><Crosshair size={16}/> <span>Wipe History & Team-Auswertung (planned)</span></li>
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
                <h3>Map Generation & Intelligence</h3>
                <p>
                  RustMasterTool baut langfristig eine eigene Map-Generation- und Map-Intelligence-Pipeline. 
                  Nutzer sollen Maps erzeugen, analysieren, individualisieren und später gestalten können. 
                  Wir nutzen professionelle Prediction-Modelle für Spawns und Nodes, um dir den strategischen 
                  Vorteil zu geben. Keine Cheats, nur legitime Datenanalyse.
                </p>
              </div>
              <div className="highlight-visual mock-heatmap">
                {/* Visual placeholder for Map Intelligence */}
                <div className="heatmap-overlay"></div>
                <span>Resource Density Prediction</span>
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
