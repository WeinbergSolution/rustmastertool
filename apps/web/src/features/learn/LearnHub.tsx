import { Building, BookOpen, ChevronRight, Lock } from 'lucide-react';
import type { ViewState } from '../../components/AppShell';

interface LearnHubProps {
  onViewChange: (view: ViewState) => void;
}

/**
 * Learn hub — entry point that bundles Rust learning/reference content.
 * Phase 2.2-B: a clean hub that links to the existing Base Designs (Base Blueprints)
 * and honestly previews the upcoming Rust Guides. No fake tutorial content.
 */
export function LearnHub({ onViewChange }: LearnHubProps) {
  return (
    <div className="learn-hub">
      <div className="learn-hub-header">
        <h2 className="learn-hub-title">Learn</h2>
        <p className="learn-hub-sub">Base designs, guides and reference to prepare for your next wipe.</p>
      </div>

      {/* Base Designs — real, working feature */}
      <button className="learn-card" onClick={() => onViewChange('base_blueprints')}>
        <div className="learn-card-icon"><Building size={22} /></div>
        <div className="learn-card-body">
          <div className="learn-card-title">Base Designs</div>
          <div className="learn-card-desc">Browse base blueprints — solo, trio, clan and bunker layouts with raid cost context.</div>
        </div>
        <ChevronRight size={18} className="learn-card-chevron" />
      </button>

      {/* Rust Guides — honest coming-soon, no fake content */}
      <div className="learn-card learn-card--gated" aria-disabled="true">
        <div className="learn-card-icon"><BookOpen size={22} /></div>
        <div className="learn-card-body">
          <div className="learn-card-title">
            Rust Guides <Lock size={13} style={{ verticalAlign: 'middle', marginLeft: 4, opacity: 0.7 }} />
          </div>
          <div className="learn-card-desc">Beginner-to-advanced Rust guides and video walkthroughs. Coming soon.</div>
        </div>
      </div>
    </div>
  );
}
