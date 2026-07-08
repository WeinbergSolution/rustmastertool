import { Building, BookOpen, ChevronRight } from 'lucide-react';
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
          <div className="learn-card-title">Base Blueprints</div>
          <div className="learn-card-desc">Browse base blueprints — solo, trio, clan and bunker layouts with raid cost context.</div>
        </div>
        <ChevronRight size={18} className="learn-card-chevron" />
      </button>

      {/* Rust Guides */}
      <button className="learn-card" onClick={() => onViewChange('rust_guides')}>
        <div className="learn-card-icon"><BookOpen size={22} /></div>
        <div className="learn-card-body">
          <div className="learn-card-title">
            Rust Guides
          </div>
          <div className="learn-card-desc">Beginner-to-advanced Rust guides and video walkthroughs.</div>
        </div>
        <ChevronRight size={18} className="learn-card-chevron" />
      </button>
    </div>
  );
}
