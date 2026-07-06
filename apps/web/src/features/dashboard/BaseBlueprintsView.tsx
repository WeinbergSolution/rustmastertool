import { useState, useEffect } from 'react';
import { Play, Search, MonitorPlay, ShieldAlert } from 'lucide-react';
import { discoverBaseBlueprints, searchBaseBlueprints, refreshBaseBlueprints, type DiscoverRowResponse, type YouTubeVideoSnippet } from '../../lib/api/baseBlueprints';

const DISCOVER_ROWS = [
  // Base Builds
  { key: 'solo', title: 'Solo Base Builds', group: 'Base Builds' },
  { key: 'duo', title: 'Duo Base Builds', group: 'Base Builds' },
  { key: 'trio', title: 'Trio Base Builds', group: 'Base Builds' },
  { key: 'starter_wipe_day', title: 'Starter / Wipe Day Bases', group: 'Base Builds' },
  { key: 'bunker', title: 'Bunker Bases', group: 'Base Builds' },
  { key: 'trap', title: 'Trap Bases', group: 'Base Builds' },
  { key: 'air_airlock', title: 'Air / Airlock', group: 'Base Builds' },
  { key: 'near_monument', title: 'Near Monument Bases', group: 'Base Builds' },
  { key: 'unraidable', title: 'Unraidable Fortresses', group: 'Base Builds' },
  { key: 'cheap', title: 'Cheap Bases', group: 'Base Builds' },
  { key: 'big_clan', title: 'Big Clan Bases', group: 'Base Builds' },
  { key: 'funny_troll', title: 'Funny / Troll Bases', group: 'Base Builds' },
  { key: 'cave', title: 'Cave Bases', group: 'Base Builds' },
  { key: 'ocean_water', title: 'Ocean / Water Bases', group: 'Base Builds' },
  { key: 'widegap', title: 'Widegap Bases', group: 'Base Builds' },
  { key: 'beautiful', title: 'Beautiful Bases', group: 'Base Builds' },
  { key: 'crazy', title: 'Crazy Bases', group: 'Base Builds' },
  
  // Rust Guides
  { key: 'tips', title: 'Tips', group: 'Rust Guides' },
  { key: 'tricks', title: 'Tricks', group: 'Rust Guides' },
  { key: 'green_card', title: 'Green Card Puzzles', group: 'Rust Guides' },
  { key: 'blue_card', title: 'Blue Card Puzzles', group: 'Rust Guides' },
  { key: 'red_card', title: 'Red Card Puzzles', group: 'Rust Guides' },
  { key: 'farming', title: 'Farming Guides', group: 'Rust Guides' },
  
  // Community / Risky
  { key: 'journey_wipe', title: 'Journey / Movie / Wipe', group: 'Community / Risky' },
  { key: 'cheater_reports', title: 'Hacks / Cheater Exposed', group: 'Community / Risky' },
  { key: 'bandit_camp_casino', title: 'Bandit Camp / Casino', group: 'Community / Risky' },
  { key: 'rust2_reveal', title: 'Rust 2 – First Scene / Reveal', group: 'Community / Risky' },
  { key: 'rust2_news', title: 'Rust 2 – Release Date / News', group: 'Community / Risky' }
].map(r => ({ ...r, maxResults: 12, query: '' })); // query is no longer used for DB fetches

const GROUPS = ['Base Builds', 'Rust Guides', 'Community / Risky'];

const getRowBadge = (key: string) => {
  if (key === 'bandit_camp_casino') {
    return <span style={{ backgroundColor: '#ff9900', color: '#000', padding: '2px 6px', borderRadius: '4px', fontSize: '0.65rem', marginLeft: '0.5rem', fontWeight: 'bold', verticalAlign: 'middle' }}>GAMBLING</span>;
  }
  if (key === 'rust2_reveal' || key === 'rust2_news') {
    return <span style={{ backgroundColor: '#3399ff', color: '#fff', padding: '2px 6px', borderRadius: '4px', fontSize: '0.65rem', marginLeft: '0.5rem', fontWeight: 'bold', verticalAlign: 'middle' }}>SPECULATION / LEAK</span>;
  }
  return null;
};

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
  const [isRefreshing, setIsRefreshing] = useState(false);

  const isDev = import.meta.env.DEV;

  const handleRefreshLibrary = async () => {
    setIsRefreshing(true);
    try {
      // Dev only action to fill DB if needed from API
      const rowsToRefresh = DISCOVER_ROWS.slice(0, 3);
      await refreshBaseBlueprints(rowsToRefresh);
      
      setIsDiscoverLoading(true);
      const rows = await discoverBaseBlueprints(DISCOVER_ROWS);
      setDiscoverData(rows);
    } catch (err) {
      console.error('Failed to refresh library', err);
    } finally {
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    let mounted = true;
    setIsDiscoverLoading(true);
    discoverBaseBlueprints(DISCOVER_ROWS)
      .then(rows => {
        if (mounted) setDiscoverData(rows as DiscoverRowResponse[]);
      })
      .catch(err => {
        if (mounted) {
          if (err.message === 'NOT_DEPLOYED') {
            setDiscoverGlobalError('Base Blueprints backend is not deployed yet.');
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

    searchBaseBlueprints(activeSearch)
      .then(results => {
        if (mounted) setSearchResults(results);
      })
      .catch(err => {
        if (mounted) {
          if (err.message === 'NOT_DEPLOYED') {
            setSearchError('Base Blueprints backend is not deployed yet.');
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
              {video.channelTitle || 'YouTube'}
            </div>
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

      {/* Search & Header */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2.5rem', padding: '0 1rem' }}>
        <div style={{ marginBottom: '1rem' }}>
          <h2 style={{ fontSize: '1.75rem', margin: '0', color: '#fff', fontWeight: 'bold' }}>Library</h2>
          <p style={{ margin: '0.5rem 0 0 0', color: '#ccc', fontSize: '0.95rem' }}>
            Discover top tier base designs and guides from the community.
          </p>
        </div>
        
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          {isDev && (
            <button
              onClick={handleRefreshLibrary}
              disabled={isRefreshing}
              style={{
                padding: '0.5rem 1rem',
                backgroundColor: '#1a1a1a',
                color: isRefreshing ? '#666' : '#fff',
                border: '1px solid #333',
                borderRadius: '4px',
                cursor: isRefreshing ? 'not-allowed' : 'pointer',
                fontSize: '0.875rem'
              }}
            >
              {isRefreshing ? 'Refreshing...' : '[DEV] Fetch Live YT'}
            </button>
          )}
          
          <form onSubmit={handleSearchSubmit} style={{ position: 'relative', minWidth: '300px' }}>
            <div style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#888' }}>
              <Search size={18} />
            </div>
            <input
              type="text"
              placeholder="Search builds (e.g. 'solo bunker')"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem 1rem 0.75rem 2.5rem',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                border: '1px solid #333',
                borderRadius: '24px',
                color: '#fff',
                fontSize: '0.95rem',
                outline: 'none',
                transition: 'border-color 0.2s'
              }}
              onFocus={(e) => e.target.style.borderColor = '#E50914'}
              onBlur={(e) => e.target.style.borderColor = '#333'}
            />
          </form>
        </div>
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
           </div>
        ) : discoverData.every(r => (r as any).items?.length === 0) ? (
           <div style={{ color: '#ccc', padding: '2rem 1rem', textAlign: 'center' }}>
             <h3 style={{ margin: '0 0 1rem 0' }}>No cached base blueprint videos yet.</h3>
             <p style={{ color: '#888' }}>
               Please run the database seed migration to populate the library.
             </p>
           </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem' }}>
            {GROUPS.map(group => {
              const groupRows = discoverData.filter((r: any) => r.group === group);
              if (groupRows.length === 0) return null;
              
              return (
                <div key={group}>
                  <h2 style={{ fontSize: '1.75rem', marginBottom: '1.5rem', color: '#fff', borderBottom: '1px solid #333', paddingBottom: '0.5rem', marginRight: '1rem' }}>
                    {group}
                  </h2>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                    {groupRows.map((row: any) => {
                      if (row.items?.length === 0) return null; // Hide empty rows
                      
                      return (
                        <div key={row.key} style={{ display: 'flex', flexDirection: 'column' }}>
                          <h3 style={{ fontSize: '1.25rem', margin: '0 0 0.75rem 0', color: '#fff', fontWeight: 'bold' }}>
                            {row.title}
                            {getRowBadge(row.key)}
                          </h3>
                          
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
                            {row.items.map((video: YouTubeVideoSnippet) => <VideoCard key={`${row.key}-${video.id}`} video={video} />)}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
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

