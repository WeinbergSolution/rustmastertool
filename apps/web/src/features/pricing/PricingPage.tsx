import './PricingPage.css';
import { PublicHeader } from '../../components/public/PublicHeader';
import { Check, ShieldAlert, Crosshair, Users } from 'lucide-react';

export function PricingPage() {
  return (
    <div className="pricing-page">
      <PublicHeader />
      
      <main className="pricing-main">
        <div className="pricing-header">
          <div className="hud-badge">MODULE: ARSENAL</div>
          <h1>Choose your Arsenal</h1>
          <p>Equip yourself for the wipe. Upgrade when you need more power.</p>
        </div>

        <div className="pricing-grid">
          
          {/* Beta / Founders Access */}
          <div className="pricing-card">
            <div className="pricing-card-header">
              <h2>Beta / Founders Access</h2>
              <div className="price">
                <span className="amount">€1.49</span>
                <span className="period">/mo</span>
              </div>
              <p className="description">Early supporter price. Requires Beta Key.</p>
            </div>
            <div className="pricing-card-features">
              <ul>
                <li><Check size={16} /> <span>Core Server Scouting & Filters</span></li>
                <li><Check size={16} /> <span>Map Intelligence Previews</span></li>
                <li><Check size={16} /> <span>Resource Intelligence Previews</span></li>
                <li><Check size={16} /> <span>Single Account Access</span></li>
              </ul>
            </div>
            <div className="pricing-card-action">
              <a href="/auth" className="btn btn-primary tactical-btn w-full justify-center">
                <ShieldAlert size={16} /> Request Beta Key
              </a>
            </div>
          </div>

          {/* RustMaster Pro */}
          <div className="pricing-card popular">
            <div className="popular-badge">TACTICAL ADVANTAGE</div>
            <div className="pricing-card-header">
              <h2>RustMaster Pro</h2>
              <div className="price">
                <span className="amount">€2.99</span>
                <span className="period">/mo</span>
              </div>
              <p className="description">Advanced intelligence for the dedicated player. Includes 1 Buddy Seat.</p>
            </div>
            
            <div className="buddy-seat-highlight">
              <Users size={16} /> 
              <div>
                <strong>Buy once. Bring one buddy.</strong>
                <p>1 subscription includes your first Buddy Seat. Track buddy position and distance during your wipe planning.</p>
              </div>
            </div>

            <div className="pricing-card-features">
              <ul>
                <li><Check size={16} /> <span>Full Server Intelligence</span></li>
                <li><Check size={16} /> <span>Resource Density Heatmaps</span></li>
                <li><Check size={16} /> <span>Live Companion & Buddy Distance</span></li>
                <li><Check size={16} /> <span>Raid Calculator & Advanced Guides</span></li>
                <li><Check size={16} /> <span>Session Review & Wipe History</span></li>
                <li><Check size={16} /> <span>World Event Alerts</span></li>
              </ul>
            </div>
            <div className="pricing-card-action">
              <button className="btn btn-secondary tactical-btn-outline w-full justify-center" disabled>
                <Crosshair size={16} /> Coming Soon
              </button>
            </div>
          </div>

        </div>
      </main>

      <footer className="public-footer">
        <div className="footer-content">
          <p>&copy; 2026 RustMasterTool. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
