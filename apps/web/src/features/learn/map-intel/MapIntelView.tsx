import { useState, useMemo } from 'react';
import { ChevronLeft, Map, ShieldAlert } from 'lucide-react';
import { MAP_MONUMENTS, MONUMENT_CATEGORIES } from './mapIntelData';
import { DEEP_MONUMENT_DATA } from './mapIntelDeepData';
import type { DeepMonumentData } from './mapIntelDeepData';
import type { MapMonument } from './mapIntelData';
import type { ViewState } from '../../../components/AppShell';
import { MapIntelDetailModal } from './MapIntelDetailModal';
import './MapIntelView.css';

interface MapIntelViewProps {
  onViewChange: (view: ViewState) => void;
}

export type MergedMonument = {
  id: string;
  isDeep: boolean;
  base?: MapMonument;
  deep?: DeepMonumentData;
  name: string;
  categoryId: string;
  needsReview: boolean;
};

export function MapIntelView({ onViewChange }: MapIntelViewProps) {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedMonument, setSelectedMonument] = useState<MergedMonument | null>(null);

  // Merge datasets
  const allMergedMonuments = useMemo(() => {
    const merged: MergedMonument[] = [];
    const seenIds = new Set<string>();

    // 1. Add all Deep Data
    Object.values(DEEP_MONUMENT_DATA).forEach(deepItem => {
      seenIds.add(deepItem.id);
      const baseItem = MAP_MONUMENTS.find(m => m.id === deepItem.id);
      merged.push({
        id: deepItem.id,
        isDeep: true,
        deep: deepItem,
        base: baseItem,
        name: deepItem.name,
        categoryId: deepItem.categoryId,
        needsReview: deepItem.contentQuality.needsOwnerReview
      });
    });

    // 2. Add remaining Base Data
    MAP_MONUMENTS.forEach(baseItem => {
      if (!seenIds.has(baseItem.id)) {
        merged.push({
          id: baseItem.id,
          isDeep: false,
          base: baseItem,
          name: baseItem.name,
          categoryId: baseItem.categoryId,
          needsReview: !!baseItem.needsOwnerReview
        });
      }
    });

    return merged;
  }, []);

  const filteredMonuments = useMemo(() => {
    if (activeCategory === 'all') return allMergedMonuments;
    return allMergedMonuments.filter(m => m.categoryId === activeCategory);
  }, [activeCategory, allMergedMonuments]);

  // Asset Tile puzzle dots
  const getPuzzleDots = (m: MergedMonument) => {
    const dots: { color: string, label: string }[] = [];
    if (m.isDeep && m.deep) {
      if (m.deep.puzzle.requiredItems?.includes('Green Keycard')) dots.push({ color: '#5a9e5a', label: 'Green Card' });
      if (m.deep.puzzle.requiredItems?.includes('Blue Keycard')) dots.push({ color: '#3d7ea6', label: 'Blue Card' });
      if (m.deep.puzzle.requiredItems?.includes('Red Keycard')) dots.push({ color: '#c44545', label: 'Red Card' });
      if (m.deep.puzzle.requiredItems?.some(i => i.includes('Fuse'))) dots.push({ color: '#d29922', label: 'Fuse' });
    } else if (m.base) {
      if (m.base.keycardsRequired.includes('green')) dots.push({ color: '#5a9e5a', label: 'Green Card' });
      if (m.base.keycardsRequired.includes('blue')) dots.push({ color: '#3d7ea6', label: 'Blue Card' });
      if (m.base.keycardsRequired.includes('red')) dots.push({ color: '#c44545', label: 'Red Card' });
    }
    return dots;
  };

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
          <div className="stat-badge"><Map size={16} /> {allMergedMonuments.length} Locations</div>
          <div className="stat-badge"><ShieldAlert size={16} /> {Object.keys(DEEP_MONUMENT_DATA).length} Deep Intel</div>
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
      <div className="monument-asset-grid">
        {filteredMonuments.map(monument => {
          const categoryName = MONUMENT_CATEGORIES.find(c => c.id === monument.categoryId)?.name || 'Unknown';
          const dots = getPuzzleDots(monument);
          const iconSrc = monument.isDeep && monument.deep?.imageUrl ? `/map-intel/${monument.deep.imageUrl}` : null;
          
          return (
            <div 
              key={monument.id} 
              className="asset-tile"
              data-category={monument.categoryId}
              onClick={() => setSelectedMonument(monument)}
            >
              {/* Top Bar: Category Badge + Puzzle Dots */}
              <div className="asset-tile-top">
                <div className="asset-category-badge">{categoryName.toUpperCase()}</div>
                <div className="asset-dots">
                  {monument.needsReview && (
                    <div className="asset-dot review-dot" title="Needs Owner Review">?</div>
                  )}
                  {dots.map((d, i) => (
                    <div key={i} className="asset-dot" style={{ backgroundColor: d.color }} title={d.label} />
                  ))}
                </div>
              </div>
              
              {/* Central Icon */}
              <div className="asset-icon-wrapper">
                {iconSrc ? (
                  <img src={iconSrc} alt="" className="asset-svg-icon" />
                ) : (
                  <Map size={48} className="asset-fallback-icon" />
                )}
              </div>

              {/* Bottom Bar: Title & Watermark */}
              <div className="asset-tile-bottom">
                <h3 className="asset-title">{monument.name}</h3>
                <span className="asset-watermark">RustMasterTool · Map Intel</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Detail Modal */}
      {selectedMonument && (
        <MapIntelDetailModal 
          deep={selectedMonument.deep}
          base={selectedMonument.base}
          onClose={() => setSelectedMonument(null)} 
        />
      )}
    </div>
  );
}
