import { useState, useMemo } from 'react';
import { ChevronLeft, Map, PlayCircle } from 'lucide-react';
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

    const VIDEO_OVERRIDES: Record<string, string[]> = {
      bandit_camp: ['https://www.youtube.com/watch?v=IP_JtslXipY', 'https://www.youtube.com/watch?v=7bKCXef5wZk'],
      abandoned_military_base: ['https://www.youtube.com/watch?v=CBZ16qttIO4', 'https://www.youtube.com/watch?v=4Rh3A-62CuA'],
      military_base: ['https://www.youtube.com/watch?v=CBZ16qttIO4', 'https://www.youtube.com/watch?v=4Rh3A-62CuA'],
      cave: ['https://www.youtube.com/watch?v=tiCpirwH_eA', 'https://www.youtube.com/watch?v=pEKyK4xHZdU'],
      cave_small_easy: ['https://www.youtube.com/watch?v=tiCpirwH_eA', 'https://www.youtube.com/watch?v=pEKyK4xHZdU'],
      cave_small_medium: ['https://www.youtube.com/watch?v=tiCpirwH_eA', 'https://www.youtube.com/watch?v=pEKyK4xHZdU'],
      cave_small_hard: ['https://www.youtube.com/watch?v=tiCpirwH_eA', 'https://www.youtube.com/watch?v=pEKyK4xHZdU'],
      cave_medium_easy: ['https://www.youtube.com/watch?v=tiCpirwH_eA', 'https://www.youtube.com/watch?v=pEKyK4xHZdU'],
      cave_medium_medium: ['https://www.youtube.com/watch?v=tiCpirwH_eA', 'https://www.youtube.com/watch?v=pEKyK4xHZdU'],
      cave_large_medium: ['https://www.youtube.com/watch?v=tiCpirwH_eA', 'https://www.youtube.com/watch?v=pEKyK4xHZdU'],
      cave_large_hard: ['https://www.youtube.com/watch?v=tiCpirwH_eA', 'https://www.youtube.com/watch?v=pEKyK4xHZdU'],
      cave_large_sewers_hard: ['https://www.youtube.com/watch?v=tiCpirwH_eA', 'https://www.youtube.com/watch?v=pEKyK4xHZdU'],
      rock_formation: ['https://www.youtube.com/watch?v=LrBPkQzTZIA', 'https://www.youtube.com/watch?v=zc0T6PAAaLM'],
      rock_formation_tiny_god: ['https://www.youtube.com/watch?v=LrBPkQzTZIA', 'https://www.youtube.com/watch?v=zc0T6PAAaLM'],
      rock_formation_anvil: ['https://www.youtube.com/watch?v=LrBPkQzTZIA'],
      rock_formation_medium_god: ['https://www.youtube.com/watch?v=LrBPkQzTZIA'],
      rock_formation_three_wall: ['https://www.youtube.com/watch?v=zc0T6PAAaLM', 'https://www.youtube.com/watch?v=LrBPkQzTZIA'],
      rock_formation_large_god: ['https://www.youtube.com/watch?v=LrBPkQzTZIA', 'https://www.youtube.com/watch?v=zc0T6PAAaLM'],
      power_substation: ['https://www.youtube.com/watch?v=ZqK2gTdJL9Q'],
      power_substation_small: ['https://www.youtube.com/watch?v=ZqK2gTdJL9Q'],
      power_substation_big: ['https://www.youtube.com/watch?v=ZqK2gTdJL9Q']
    };

    const HIDDEN_GENERICS = ['military_base', 'cave', 'rock_formation', 'power_substation'];

    // Helper to dedupe and merge videos
    const getVideos = (id: string, existingVideos?: string[]) => {
      const overrides = VIDEO_OVERRIDES[id] || [];
      const baseVids = existingVideos || [];
      return Array.from(new Set([...baseVids, ...overrides]));
    };

    // 1. Add all Deep Data
    Object.values(DEEP_MONUMENT_DATA).forEach(deepItem => {
      seenIds.add(deepItem.id);
      const baseItem = MAP_MONUMENTS.find(m => m.id === deepItem.id);
      
      const vids = getVideos(deepItem.id, deepItem.relatedVideos);
      const updatedDeepItem = { ...deepItem, relatedVideos: vids };

      merged.push({
        id: deepItem.id,
        isDeep: true,
        deep: updatedDeepItem,
        base: baseItem,
        name: deepItem.name,
        categoryId: deepItem.categoryId,
        needsReview: deepItem.contentQuality?.needsOwnerReview === true
      });
    });

    // 2. Add remaining Base Data
    MAP_MONUMENTS.forEach(baseItem => {
      if (!seenIds.has(baseItem.id) && !HIDDEN_GENERICS.includes(baseItem.id)) {
        // Fallback videos for base items
        const videos = getVideos(baseItem.id);
        
        merged.push({
          id: baseItem.id,
          isDeep: false,
          base: baseItem,
          deep: videos.length > 0 ? { ...baseItem, relatedVideos: videos } as unknown as DeepMonumentData : undefined, 
          // (Hack to pass videos to detail modal without a real DeepMonumentData object)
          name: baseItem.name,
          categoryId: baseItem.categoryId,
          needsReview: baseItem.needsOwnerReview === true
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

  const extractYoutubeId = (url: string) => {
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&?]+)/);
    return match ? match[1] : null;
  };

  return (
    <div className="map-intel-view">
      <div className="intel-header">
        <button className="back-btn" onClick={() => onViewChange('dashboard')}>
          <ChevronLeft size={20} /> Dashboard
        </button>
        <div className="intel-header-info">
          <h2>Map Intel</h2>
          <p>Detailed guides, puzzles, and strategies for {allMergedMonuments.length} locations.</p>
        </div>
      </div>

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
          const videos = monument.deep?.relatedVideos || [];
          const firstVideoId = videos.length > 0 ? extractYoutubeId(videos[0]) : null;
          
          return (
            <div 
              key={monument.id} 
              className="asset-tile"
              data-category={monument.categoryId}
              onClick={() => setSelectedMonument(monument)}
            >
              {firstVideoId ? (
                <img src={`https://img.youtube.com/vi/${firstVideoId}/hqdefault.jpg`} alt="Video Thumbnail" className="asset-tile-bg-thumb" />
              ) : iconSrc ? (
                <img src={iconSrc} alt="" className="asset-tile-bg-svg-center" />
              ) : (
                <div className="asset-tile-bg-fallback"><Map size={120} /></div>
              )}
              
              <div className="asset-tile-content">
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

                {/* Bottom Bar: Title & Watermark */}
                <div className="asset-tile-bottom">
                  <h3 className="asset-title">{monument.name}</h3>
                  <div className="asset-bottom-meta">
                    <span className="asset-watermark">RustMasterTool</span>
                    {videos.length > 0 && (
                      <span className="asset-video-pill">
                        <PlayCircle size={14} /> {videos.length} Guide{videos.length !== 1 && 's'}
                      </span>
                    )}
                  </div>
                </div>
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
