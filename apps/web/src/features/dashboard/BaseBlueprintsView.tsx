import { useState, useEffect } from 'react';
import { Play, Search, MonitorPlay, ShieldAlert } from 'lucide-react';
import { discoverBaseBlueprints, searchBaseBlueprints, type DiscoverRowResponse, type YouTubeVideoSnippet } from '../../lib/api/baseBlueprints';

const DISCOVER_ROWS = [
  { key: 'solo', title: 'Solo Base Builds', query: 'rust solo base build', maxResults: 12 },
  { key: 'duo', title: 'Duo Base Builds', query: 'rust duo base build', maxResults: 12 },
  { key: 'trio', title: 'Trio Base Builds', query: 'rust trio base build', maxResults: 12 },
  { key: 'starter', title: 'Starter / Wipe Day Bases', query: 'rust starter base wipe day build', maxResults: 12 },
  { key: 'bunker', title: 'Bunker Bases', query: 'rust bunker base build', maxResults: 12 },
  { key: 'trap', title: 'Trap Bases', query: 'rust trap base build', maxResults: 12 },
  { key: 'air', title: 'Air Bases', query: 'rust air base build', maxResults: 12 },
  { key: 'monument', title: 'Monument / Near Monument Bases', query: 'rust monument base build near monument', maxResults: 12 },
  { key: 'unraidable', title: 'Unraidable / High Defense Bases', query: 'rust unraidable base build high defense', maxResults: 12 },
  { key: 'cheap', title: 'Cheap / Low Cost Bases', query: 'rust cheap base build low cost', maxResults: 12 },
  { key: 'clan', title: 'Big Clan Bases', query: 'rust clan base build large group', maxResults: 12 },
  { key: 'funny', title: 'Funny / Troll Bases', query: 'rust funny base build troll base', maxResults: 12 },
  { key: 'cave', title: 'Cave Bases', query: 'rust cave base build', maxResults: 12 },
  { key: 'ocean', title: 'Ocean / Water Bases', query: 'rust ocean base water base build', maxResults: 12 },
  { key: 'widegap', title: 'Widegap Bases', query: 'rust widegap base build', maxResults: 12 }
];

export function BaseBlueprintsView() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSearch, setActiveSearch] = useState('');
  
  // Discover State
  const [discoverData, setDiscoverData] = useState<DiscoverRowResponse[]>([]);
  const [isDiscoverLoading, setIsDiscoverLoading] = useState(true);
  const [discoverGlobalError, setDiscoverGlobalError] = useState<string | null>(null);
  
  // Search State
  const [searchResults, setSearchResults] = useState<YouTubeVideoSnippet[]>([]);
  const [isSearchLoading, setIsSearchLoading] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);

  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);

  useEffect(() => {

    let mounted = true;
    setIsDiscoverLoading(true);
    discoverBaseBlueprints(DISCOVER_ROWS)
      .then(rows => {
        if (mounted) setDiscoverData(rows);
      })
      .catch(err => {
        if (mounted) {
          if (err.message === 'NOT_DEPLOYED') {
            setDiscoverGlobalError('Base Blueprints backend is not deployed yet.');
          } else if (err.message === 'YOUTUBE_API_KEY_MISSING') {
            setDiscoverGlobalError('YouTube integration is not configured yet.');
          } else {
            setDiscoverGlobalError(err.message || 'Failed to load discover rows');
          }
        }
      })
      .finally(() => {
        if (mounted) setIsDiscoverLoading(false);
      });

    return () => { mounted = false; };
  }, []);

  useEffect(() => {
    if (!activeSearch) {
      setSearchResults([]);
      setSearchError(null);
      return;
    }

    let mounted = true;
    setIsSearchLoading(true);
    setSearchError(null);

    searchBaseBlueprints(`rust ${activeSearch} base build`)
      .then(results => {
        if (mounted) setSearchResults(results);
      })
      .catch(err => {
        if (mounted) {
          if (err.message === 'NOT_DEPLOYED') {
            setSearchError('Base Blueprints backend is not deployed yet.');
          } else if (err.message === 'YOUTUBE_API_KEY_MISSING') {
            setSearchError('YouTube integration is not configured yet.');
          } else {
            setSearchError(err.message || 'Error fetching search results');
          }
        }
      })
      .finally(() => {
        if (mounted) setIsSearchLoading(false);
      });

    return () => { mounted = false; };
  }, [activeSearch]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setActiveSearch(searchQuery.trim());
  };

  const VideoCard = ({ video }: { video: YouTubeVideoSnippet }) => {
    const [isHovered, setIsHovered] = useState(false);
    
    return (
      <div 
        onClick={() => setActiveVideoId(video.id)}
        style={{ 
          overflow: 'hidden',
          cursor: 'pointer',
          transition: 'transform 0.3s, z-index 0.3s',
          display: 'flex',
          flexDirection: 'column',
          minWidth: '320px',
          maxWidth: '320px',
          transform: isHovered ? 'scale(1.05)' : 'scale(1)',
          zIndex: isHovered ? 10 : 1,
          position: 'relative'
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div style={{ position: 'relative', width: '100%', paddingTop: '56.25%', backgroundColor: '#111', borderRadius: '4px', overflow: 'hidden' }}>
          <img 
            src={video.thumbnailUrl} 
            alt={video.title} 
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }}
          />
          {/* Subtle gradient for text legibility if needed, but Netflix usually keeps it clean */}
          {isHovered && (
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)', borderRadius: '50%', padding: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(4px)' }}>
                <Play size={24} fill="#fff" color="#fff" />
              </div>
            </div>
          )}
        </div>
        <div style={{ padding: '0.5rem 0', display: 'flex', flexDirection: 'column', gap: '0.25rem', flex: 1 }}>
          <h3 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 'bold', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', lineHeight: 1.3, color: '#fff' }}>
            {video.title.replace(/&#39;/g, "'").replace(/&amp;/g, '&')}
          </h3>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
            <div style={{ color: '#aaa', fontSize: '0.8rem' }}>
              {video.channelTitle}
            </div>
            <span style={{ fontSize: '0.75rem', color: '#888' }}>
              {new Date(video.publishedAt).toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>
    );
  };

  const SkeletonRail = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div style={{ width: '200px', height: '24px', backgroundColor: 'var(--bg-panel)', borderRadius: '4px', animation: 'pulse 1.5s infinite' }} />
      <div style={{ display: 'flex', gap: '1rem', overflow: 'hidden' }}>
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} style={{ minWidth: '320px', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <div style={{ width: '100%', paddingTop: '56.25%', backgroundColor: 'var(--bg-panel)', borderRadius: '4px', animation: 'pulse 1.5s infinite' }} />
            <div style={{ width: '90%', height: '16px', backgroundColor: 'var(--bg-panel)', borderRadius: '2px', animation: 'pulse 1.5s infinite' }} />
            <div style={{ width: '60%', height: '14px', backgroundColor: 'var(--bg-panel)', borderRadius: '2px', animation: 'pulse 1.5s infinite' }} />
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', overflowY: 'auto', backgroundColor: '#0a0a0a' }}>
      <style>{`
        @keyframes pulse {
          0% { opacity: 1; }
          50% { opacity: 0.5; }
          100% { opacity: 1; }
        }
        .netflix-scrollbar::-webkit-scrollbar {
          height: 8px;
        }
        .netflix-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .netflix-scrollbar::-webkit-scrollbar-thumb {
          background-color: rgba(255, 255, 255, 0.2);
          border-radius: 4px;
        }
        .netflix-scrollbar::-webkit-scrollbar-thumb:hover {
          background-color: rgba(255, 255, 255, 0.4);
        }
      `}</style>
      
      {/* Hero Section */}
      <div style={{ marginBottom: '2rem', padding: '2rem 1rem 0 1rem' }}>
        <h2 style={{ fontSize: '2.5rem', margin: '0 0 0.5rem 0', display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#fff' }}>
          <MonitorPlay size={40} style={{ color: '#E50914' }} />
          Base Blueprints
        </h2>
        <p style={{ color: '#aaa', fontSize: '1.1rem', margin: 0, maxWidth: '800px' }}>
          Watch Rust base builds, bunker designs, starter layouts and raid-resistant concepts without leaving RustMasterTool.
        </p>
      </div>

      {/* Search & Quick Chips */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2.5rem', padding: '0 1rem' }}>
        <form onSubmit={handleSearchSubmit} style={{ position: 'relative', width: '100%', maxWidth: '600px' }}>
          <Search size={20} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#888' }} />
          <input 
            type="text" 
            placeholder="Search for Rust Base Builds..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '0.8rem 1rem 0.8rem 3rem',
              backgroundColor: '#1a1a1a',
              border: '1px solid #333',
              borderRadius: '4px',
              color: '#fff',
              fontSize: '1rem',
              outline: 'none'
            }}
            onFocus={(e) => e.target.style.borderColor = '#E50914'}
            onBlur={(e) => e.target.style.borderColor = '#333'}
          />
        </form>
      </div>

      {/* Search Results Section */}
      {activeSearch && (
        <div style={{ marginBottom: '3rem', padding: '0 1rem' }}>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', color: '#fff' }}>Search Results: {activeSearch}</h3>
          
          {isSearchLoading ? (
            <SkeletonRail />
          ) : searchError ? (
            <div style={{ color: '#ff4444', padding: '1rem', backgroundColor: 'rgba(255, 68, 68, 0.1)', borderRadius: '4px', border: '1px solid #ff4444' }}>
               <ShieldAlert size={16} style={{ display: 'inline', marginRight: '0.5rem', verticalAlign: 'text-bottom' }} />
               {searchError}
            </div>
          ) : searchResults.length === 0 ? (
            <div style={{ color: '#888' }}>No blueprints found for this search.</div>
          ) : (
            <div 
              className="netflix-scrollbar"
              style={{ display: 'flex', gap: '1rem', overflowX: 'auto', paddingBottom: '1rem' }}
            >
              {searchResults.map(video => <VideoCard key={`search-${video.id}`} video={video} />)}
            </div>
          )}
          <hr style={{ border: 'none', borderTop: '1px solid #333', margin: '2rem 0' }} />
        </div>
      )}

      {/* Discover Rails (Netflix Style) */}
      <div style={{ paddingBottom: '3rem', paddingLeft: '1rem' }}>
        {isDiscoverLoading ? (
           <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
             <SkeletonRail />
             <SkeletonRail />
             <SkeletonRail />
           </div>
        ) : discoverGlobalError ? (
           <div style={{ color: '#ff4444', padding: '1rem', backgroundColor: 'rgba(255, 68, 68, 0.1)', borderRadius: '4px', border: '1px solid #ff4444', marginRight: '1rem' }}>
             <ShieldAlert size={16} style={{ display: 'inline', marginRight: '0.5rem', verticalAlign: 'text-bottom' }} />
             {discoverGlobalError}
             <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.875rem' }}>
               Base Blueprints features are currently locked until the backend is fully deployed.
             </p>
           </div>
        ) : discoverData.length === 0 ? (
           <div style={{ color: '#888', padding: '1rem' }}>No base blueprint videos returned yet.</div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
            {discoverData.map((row) => (
              <div key={row.key} style={{ display: 'flex', flexDirection: 'column' }}>
                <h3 style={{ fontSize: '1.25rem', margin: '0 0 0.75rem 0', color: '#fff', fontWeight: 'bold' }}>{row.title}</h3>
                
                {row.error ? (
                  <div style={{ color: '#ff4444', fontSize: '0.875rem' }}>Could not load {row.title.toLowerCase()}.</div>
                ) : row.items.length === 0 ? (
                  <div style={{ color: '#888', fontSize: '0.875rem' }}>No videos found for this category.</div>
                ) : (
                  <div 
                    className="netflix-scrollbar"
                    style={{ 
                      display: 'flex', 
                      gap: '0.5rem', 
                      overflowX: 'auto', 
                      paddingBottom: '1rem',
                      paddingRight: '1rem'
                    }}
                  >
                    {row.items.map(video => <VideoCard key={`${row.key}-${video.id}`} video={video} />)}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Video Modal */}
      {activeVideoId && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.95)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
           <div style={{ width: '100%', maxWidth: '1200px', aspectRatio: '16/9', position: 'relative', padding: '1rem' }}>
             <button 
               onClick={() => setActiveVideoId(null)}
               style={{ position: 'absolute', top: '-3rem', right: '1rem', background: '#1a1a1a', border: '1px solid #333', borderRadius: '4px', color: '#fff', fontSize: '1rem', cursor: 'pointer', padding: '0.5rem 1.5rem', fontWeight: 'bold' }}
             >
               Close
             </button>
             <iframe
               width="100%"
               height="100%"
               src={`https://www.youtube.com/embed/${activeVideoId}?autoplay=1`}
               title="YouTube video player"
               frameBorder="0"
               allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
               allowFullScreen
               style={{ borderRadius: '4px', backgroundColor: '#000', boxShadow: '0 20px 40px rgba(0,0,0,0.5)' }}
             ></iframe>
             <div style={{ marginTop: '1rem', textAlign: 'center' }}>
               <a 
                 href={`https://www.youtube.com/watch?v=${activeVideoId}`} 
                 target="_blank" 
                 rel="noopener noreferrer"
                 style={{ color: '#888', textDecoration: 'none', fontSize: '0.875rem', padding: '0.5rem 1rem', border: '1px solid #333', borderRadius: '20px' }}
                 onClick={(e) => e.stopPropagation()}
               >
                 Open on YouTube ↗
               </a>
             </div>
           </div>
        </div>
      )}
    </div>
  );
}

