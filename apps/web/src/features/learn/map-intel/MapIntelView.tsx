import { useState, useMemo } from 'react';
import { ChevronLeft, Map, ShieldAlert, Box, X, Lightbulb } from 'lucide-react';
import { MAP_MONUMENTS, MONUMENT_CATEGORIES } from './mapIntelData';
import type { MapMonument } from './mapIntelData';
import type { ViewState } from '../../../components/AppShell';
import './MapIntelView.css';

interface MapIntelViewProps {
  onViewChange: (view: ViewState) => void;
}

export function MapIntelView({ onViewChange }: MapIntelViewProps) {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedMonument, setSelectedMonument] = useState<MapMonument | null>(null);

  const filteredMonuments = useMemo(() => {
    if (activeCategory === 'all') return MAP_MONUMENTS;
    return MAP_MONUMENTS.filter(m => m.categoryId === activeCategory);
  }, [activeCategory]);

  return (
    <div className="map-intel-container">
      {/* Navigation */}
      <div className="map-intel-nav">
        <button className="back-btn" onClick={() => onViewChange('learn')}>
          <ChevronLeft size={20} />
          <span>Back to Learn</span>
        </button>
      </div>

      {/* Hero */}
      <header className="map-intel-hero">
        <h1 className="hero-title">Map Intel</h1>
        <p className="hero-subtitle">Encyclopedia of Rust Monuments</p>
        <div className="hero-stats">
          <div className="stat-badge"><Map size={16} /> {MAP_MONUMENTS.length} Monuments</div>
          <div className="stat-badge"><ShieldAlert size={16} /> Knowledge Base</div>
        </div>
      </header>

      {/* Category Filters */}
      <div className="category-filters">
        <button 
          className={`category-chip ${activeCategory === 'all' ? 'active' : ''}`}
          onClick={() => setActiveCategory('all')}
        >
          All Monuments
        </button>
        {MONUMENT_CATEGORIES.map(cat => (
          <button
            key={cat.id}
            className={`category-chip ${activeCategory === cat.id ? 'active' : ''}`}
            onClick={() => setActiveCategory(cat.id)}
            title={cat.description}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="monument-grid">
        {filteredMonuments.map(monument => {
          const categoryName = MONUMENT_CATEGORIES.find(c => c.id === monument.categoryId)?.name || 'Unknown';
          
          return (
            <div 
              key={monument.id} 
              className="monument-card"
              onClick={() => setSelectedMonument(monument)}
            >
              <div className="monument-image-placeholder">
                <Map size={48} opacity={0.2} />
              </div>
              <div className="monument-card-content">
                <div className="monument-card-header">
                  <h3 className="monument-card-title">{monument.name}</h3>
                </div>
                <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '0.5rem' }}>
                  <span className="monument-card-category">{categoryName}</span>
                  {monument.confidence !== 'verified' && (
                    <span className="monument-card-category" style={{ color: '#d29922' }}>{monument.confidence}</span>
                  )}
                  {monument.needsOwnerReview && (
                    <span className="monument-card-category" style={{ color: '#d29922' }}>needs review</span>
                  )}
                </div>
                <p className="monument-card-desc">{monument.explanation}</p>
                
                <div className="monument-card-meta">
                  {monument.keycardsRequired.map(kc => (
                    <div key={kc} className={`keycard-badge ${kc}`} title={`${kc} keycard required`} />
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Detail Modal */}
      {selectedMonument && (
        <MonumentModal 
          monument={selectedMonument} 
          onClose={() => setSelectedMonument(null)} 
        />
      )}
    </div>
  );
}

function MonumentModal({ monument, onClose }: { monument: MapMonument, onClose: () => void }) {
  const categoryName = MONUMENT_CATEGORIES.find(c => c.id === monument.categoryId)?.name || 'Unknown';

  return (
    <div className="monument-modal-overlay" onClick={onClose}>
      <div className="monument-modal" onClick={e => e.stopPropagation()}>
        <button className="monument-modal-close" onClick={onClose}>
          <X size={20} />
        </button>
        
        <div className="monument-modal-hero">
          <Map size={64} opacity={0.1} />
          {/* Note: Placeholder image used here. Real imagery requires backend parsing or external hosting. */}
        </div>

        <div className="monument-modal-body">
          <h2>{monument.name}</h2>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <span className="cat-badge">{categoryName}</span>
            <span className="cat-badge" style={monument.confidence === 'verified' ? { color: '#3fb950' } : { color: '#d29922' }}>{monument.confidence}</span>
            {monument.needsOwnerReview && (
              <span className="cat-badge" style={{ color: '#d29922' }}>needs owner review</span>
            )}
          </div>
          
          <div className="monument-modal-section">
            <p>{monument.explanation}</p>
          </div>

          <div className="monument-modal-section">
            <h4><Box size={16} /> Loot & Progression</h4>
            <p>{monument.lootRelevance}</p>
          </div>

          <div className="monument-modal-section">
            <h4><ShieldAlert size={16} /> Radiation & Access</h4>
            <p>{monument.radiationInfo}</p>
            {monument.keycardsRequired.length > 0 && (
              <div style={{ marginTop: '0.5rem', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <span style={{ fontSize: '14px', color: '#a0a0a0' }}>Keycards:</span>
                {monument.keycardsRequired.map(kc => (
                  <div key={kc} className={`keycard-badge ${kc}`} title={`${kc} keycard required`} />
                ))}
              </div>
            )}
          </div>

          <div className="monument-modal-section" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '1.5rem' }}>
            <div>
              <h4 style={{ color: '#5a9e5a' }}>Advantages</h4>
              <ul>
                {monument.advantages.map((adv, i) => <li key={i}>{adv}</li>)}
              </ul>
            </div>
            <div>
              <h4 style={{ color: '#ce422b' }}>Disadvantages</h4>
              <ul>
                {monument.disadvantages.map((dis, i) => <li key={i}>{dis}</li>)}
              </ul>
            </div>
          </div>

          <div className="tip-box">
            <h4><Lightbulb size={16} style={{ display: 'inline', marginRight: '4px', verticalAlign: 'text-bottom' }} /> Quick Tip</h4>
            <p>{monument.quickTip}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
