import { useState, useMemo } from 'react';
import { Search, ExternalLink, PlaySquare, ChevronDown, ChevronUp, ChevronLeft } from 'lucide-react';
import { 
  RUST_GUIDE_STAGES, 
  RUST_GUIDE_CATEGORIES, 
  ALL_RUST_GUIDE_VIDEOS, 
} from './rustGuidesData';
import type { 
  RustGuideVideo,
  RustGuideCategory 
} from './rustGuidesData';
import type { ViewState } from '../../../components/AppShell';
import './RustGuidesView.css';

interface RustGuidesViewProps {
  onViewChange: (view: ViewState) => void;
}

export function RustGuidesView({ onViewChange }: RustGuidesViewProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeStage, setActiveStage] = useState<string | null>(null);

  // Memoized search filtering
  const filteredVideos = useMemo(() => {
    if (!searchQuery.trim()) return [];
    
    const query = searchQuery.toLowerCase();
    // Limit to max 50 results for performance
    return ALL_RUST_GUIDE_VIDEOS.filter(video => 
      video.title.toLowerCase().includes(query) ||
      RUST_GUIDE_CATEGORIES.find(c => c.slug === video.categorySlug)?.title.toLowerCase().includes(query)
    ).slice(0, 50);
  }, [searchQuery]);

  const displayedStages = activeStage 
    ? RUST_GUIDE_STAGES.filter(s => s.slug === activeStage)
    : RUST_GUIDE_STAGES;

  return (
    <div className="rust-guides-container">
      {/* Back to Learn Hub */}
      <div className="rust-guides-nav">
        <button className="back-btn" onClick={() => onViewChange('learn')}>
          <ChevronLeft size={20} />
          <span>Back to Learn</span>
        </button>
      </div>

      {/* Hero Section */}
      <header className="rust-guides-hero">
        <h1 className="hero-title">Rust Guides</h1>
        <p className="hero-subtitle">From beach spawn to endgame.</p>
        <div className="hero-stats">
          <div className="stat-badge"><PlaySquare size={16} /> 713 Videos</div>
          <div className="stat-badge">54 Categories</div>
          <div className="stat-badge">8 Stages</div>
        </div>
      </header>

      {/* Search Input */}
      <div className="rust-guides-search-wrapper">
        <div className="search-input-container">
          <Search className="search-icon" size={20} />
          <input 
            type="text" 
            className="search-input" 
            placeholder="Search farming, launch site, minicopter..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Search Results */}
      {searchQuery.trim() && (
        <section className="search-results-section">
          <h3 className="section-title">Search Results ({filteredVideos.length})</h3>
          <div className="video-grid">
            {filteredVideos.map(video => (
              <VideoCard key={`search-${video.id}`} video={video} />
            ))}
          </div>
          {filteredVideos.length === 0 && (
            <p className="no-results">No videos found for "{searchQuery}".</p>
          )}
        </section>
      )}

      {/* Main Content (when not searching) */}
      {!searchQuery.trim() && (
        <>
          {/* Stage Filter Chips */}
          <div className="stage-filters">
            <button 
              className={`stage-chip ${activeStage === null ? 'active' : ''}`}
              onClick={() => setActiveStage(null)}
            >
              All Stages
            </button>
            {RUST_GUIDE_STAGES.map(stage => (
              <button 
                key={stage.slug}
                className={`stage-chip ${activeStage === stage.slug ? 'active' : ''}`}
                onClick={() => setActiveStage(stage.slug)}
              >
                {stage.title}
              </button>
            ))}
          </div>

          {/* Stages and Categories */}
          <div className="stages-content">
            {displayedStages.map(stage => (
              <section key={stage.slug} className="stage-section">
                <div className="stage-header">
                  <h2>{stage.title}</h2>
                  <p>{stage.description}</p>
                </div>
                
                <div className="category-list">
                  {stage.categorySlugs.map(catSlug => {
                    const category = RUST_GUIDE_CATEGORIES.find(c => c.slug === catSlug);
                    if (!category) return null;
                    return <CategorySection key={category.slug} category={category} />;
                  })}
                </div>
              </section>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function CategorySection({ category }: { category: RustGuideCategory }) {
  const [expanded, setExpanded] = useState(false);
  
  const displayLimit = 6;
  const showToggle = category.videos.length > displayLimit;
  const displayedVideos = expanded ? category.videos : category.videos.slice(0, displayLimit);

  return (
    <div className="category-section">
      <div className="category-header">
        <h3>{category.title} <span className="category-count">({category.count})</span></h3>
      </div>
      
      <div className="video-grid">
        {displayedVideos.map(video => (
          <VideoCard key={video.id} video={video} />
        ))}
      </div>
      
      {showToggle && (
        <button className="expand-category-btn" onClick={() => setExpanded(!expanded)}>
          {expanded ? (
            <><ChevronUp size={16} /> Show less</>
          ) : (
            <><ChevronDown size={16} /> Show all {category.videos.length} videos</>
          )}
        </button>
      )}
    </div>
  );
}

function VideoCard({ video }: { video: RustGuideVideo }) {
  const thumbnailUrl = `https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`;
  
  return (
    <a 
      href={video.url} 
      target="_blank" 
      rel="noopener noreferrer" 
      className="video-card"
    >
      <div className="video-thumb-container">
        <img src={thumbnailUrl} alt={video.title} className="video-thumbnail" loading="lazy" />
        <div className="play-overlay">
          <PlaySquare size={24} />
        </div>
      </div>
      <div className="video-info">
        <h4 className="video-title" title={video.title}>{video.title}</h4>
        <div className="video-meta">
          <span className="external-link">Watch on YouTube <ExternalLink size={12} /></span>
        </div>
      </div>
    </a>
  );
}
