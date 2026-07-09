
import './PricingPage.css';
import { PublicHeader } from '../../components/public/PublicHeader';
import { Check } from 'lucide-react';

export function PricingPage() {
  return (
    <div className="pricing-page">
      <PublicHeader />
      
      <main className="pricing-main">
        <div className="pricing-header">
          <h1>Choose your Arsenal</h1>
          <p>Start free, upgrade when you need more power.</p>
        </div>

        <div className="pricing-grid">
          {/* Free / Scout */}
          <div className="pricing-card">
            <div className="pricing-card-header">
              <h2>Free / Scout</h2>
              <div className="price">
                <span className="amount">€0</span>
                <span className="period">/mo</span>
              </div>
              <p className="description">Essential tools for the solo survivor.</p>
            </div>
            <div className="pricing-card-features">
              <ul>
                <li><Check size={16} /> Server suchen</li>
                <li><Check size={16} /> Basis-Filter</li>
                <li><Check size={16} /> Begrenzte Watchlist</li>
                <li><Check size={16} /> Map Preview</li>
                <li><Check size={16} /> Ausgewählte Guides</li>
              </ul>
            </div>
            <div className="pricing-card-action">
              <a href="/auth" className="btn btn-secondary w-full">Start Free</a>
            </div>
          </div>

          {/* Pro / Wipe Planner */}
          <div className="pricing-card popular">
            <div className="popular-badge">Most Popular</div>
            <div className="pricing-card-header">
              <h2>Pro / Wipe Planner</h2>
              <div className="price">
                <span className="amount">Coming Soon</span>
              </div>
              <p className="description">Advanced intelligence for the dedicated player.</p>
            </div>
            <div className="pricing-card-features">
              <ul>
                <li><Check size={16} /> Bessere Server Filter</li>
                <li><Check size={16} /> Server Health Prediction</li>
                <li><Check size={16} /> Map Intel & Build Spot Planning</li>
                <li><Check size={16} /> Resource Density Prediction</li>
                <li><Check size={16} /> Raid Calculator</li>
                <li><Check size={16} /> Erweiterte Guides</li>
              </ul>
            </div>
            <div className="pricing-card-action">
              <button className="btn btn-primary w-full" disabled>Join Waitlist</button>
            </div>
          </div>

          {/* Squad / Team Command */}
          <div className="pricing-card">
            <div className="pricing-card-header">
              <h2>Squad / Team Command</h2>
              <div className="price">
                <span className="amount">Coming Soon</span>
              </div>
              <p className="description">Coordinate and dominate with your team.</p>
            </div>
            <div className="pricing-card-features">
              <ul>
                <li><Check size={16} /> Team Watchlists & Geteilte Planung</li>
                <li><Check size={16} /> Live Map Features</li>
                <li><Check size={16} /> Team Guides & Raid Planning</li>
                <li><Check size={16} /> Session Review & Wipe History</li>
                <li><Check size={16} /> Mehrere Seats</li>
              </ul>
            </div>
            <div className="pricing-card-action">
              <button className="btn btn-secondary w-full" disabled>Join Waitlist</button>
            </div>
          </div>

          {/* Creator / Map Maker */}
          <div className="pricing-card">
            <div className="pricing-card-header">
              <h2>Creator / Map Maker</h2>
              <div className="price">
                <span className="amount">Planned Add-on</span>
              </div>
              <p className="description">For server owners and map creators.</p>
            </div>
            <div className="pricing-card-features">
              <ul>
                <li><Check size={16} /> Eigene Map-Generation</li>
                <li><Check size={16} /> Deep Map Analyse</li>
                <li><Check size={16} /> Custom Map Tools</li>
                <li><Check size={16} /> Heatmap Export</li>
                <li><Check size={16} /> Map Creation Features</li>
              </ul>
            </div>
            <div className="pricing-card-action">
              <button className="btn btn-secondary w-full" disabled>In Development</button>
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
