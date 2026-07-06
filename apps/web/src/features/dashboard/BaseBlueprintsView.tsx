import { useState, useEffect } from 'react';
import { Play, Search, MonitorPlay, ShieldAlert, Bookmark, BookmarkCheck } from 'lucide-react';
import { discoverBaseBlueprints, searchBaseBlueprints, saveBlueprint, unsaveBlueprint, getSavedBlueprintIds, getSavedBlueprintsFull, type DiscoverRowResponse, type YouTubeVideoSnippet } from '../../lib/api/baseBlueprints';
import { supabase } from '../../lib/supabaseClient';
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
    return <span style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', color: '#ccc', padding: '2px 6px', borderRadius: '4px', fontSize: '0.65rem', marginLeft: '0.75rem', fontWeight: 'bold', verticalAlign: 'middle', border: '1px solid rgba(255,255,255,0.2)' }}>INFORMATIONAL</span>;
  }
  if (key === 'rust2_reveal' || key === 'rust2_news') {
    return <span style={{ backgroundColor: 'rgba(51, 153, 255, 0.1)', color: '#3399ff', padding: '2px 6px', borderRadius: '4px', fontSize: '0.65rem', marginLeft: '0.75rem', fontWeight: 'bold', verticalAlign: 'middle', border: '1px solid rgba(51,153,255,0.2)' }}>SPECULATIVE</span>;
  }
  if (key === 'cheater_reports') {
    return <span style={{ backgroundColor: 'rgba(229, 9, 20, 0.1)', color: '#E50914', padding: '2px 6px', borderRadius: '4px', fontSize: '0.65rem', marginLeft: '0.75rem', fontWeight: 'bold', verticalAlign: 'middle', border: '1px solid rgba(229,9,20,0.2)' }}>REPORTS / BANS</span>;
  }
  return null;
};

export function BaseBlueprintsView() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSearch, setActiveSearch] = useState('');
  
  // Auth State
  const [userId, setUserId] = useState<string | null>(null);

  // Saved State
  const [savedVideoIds, setSavedVideoIds] = useState<Set<string>>(new Set());
  const [savedBlueprints, setSavedBlueprints] = useState<YouTubeVideoSnippet[]>([]);

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
    if (!supabase) return;
    
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUserId(session?.user?.id || null);
    });
    
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUserId(session?.user?.id || null);
    });
    return () => authListener.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (userId) {
      getSavedBlueprintIds().then(ids => setSavedVideoIds(new Set(ids)));
      getSavedBlueprintsFull().then(bps => setSavedBlueprints(bps));
    } else {
      setSavedVideoIds(new Set());
      setSavedBlueprints([]);
    }
  }, [userId]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && activeVideoId) {
        setActiveVideoId(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeVideoId]);

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
    const isSaved = savedVideoIds.has(video.id);
    
    const handleSaveToggle = async (e: React.MouseEvent) => {
      e.stopPropagation();
      if (!userId) {
        alert('Please log in via Steam to save blueprints.');
        return;
      }
      
      const newSavedIds = new Set(savedVideoIds);
      if (isSaved) {
        newSavedIds.delete(video.id);
        setSavedVideoIds(newSavedIds);
        setSavedBlueprints(prev => prev.filter(v => v.id !== video.id));
        await unsaveBlueprint(video.id);
      } else {
        newSavedIds.add(video.id);
        setSavedVideoIds(newSavedIds);
        setSavedBlueprints(prev => [video, ...prev]);
        await saveBlueprint(video.id);
      }
    };

    return (
      <div 
        onClick={() => setActiveVideoId(video.id)}
        style={{ 
          overflow: 'visible',
          cursor: 'pointer',
          transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          display: 'flex',
          flexDirection: 'column',
          minWidth: '280px',
          maxWidth: '280px',
          transform: isHovered ? 'scale(1.06) translateY(-4px)' : 'scale(1)',
          zIndex: isHovered ? 10 : 1,
          position: 'relative',
          borderRadius: '8px'
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div style={{ position: 'relative', width: '100%', paddingTop: '56.25%', backgroundColor: '#111', borderRadius: '8px', overflow: 'hidden', boxShadow: isHovered ? '0 10px 20px rgba(0,0,0,0.8)' : '0 4px 6px rgba(0,0,0,0.3)' }}>
          <img 
            src={video.thumbnailUrl} 
            alt={video.title} 
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }}
          />
          {isHovered && (
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background-color 0.2s' }}>
              <div style={{ backgroundColor: 'rgba(229, 9, 20, 0.9)', borderRadius: '50%', padding: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(229, 9, 20, 0.4)' }}>
                <Play size={24} fill="#fff" color="#fff" style={{ marginLeft: '4px' }} />
              </div>
            </div>
          )}
          <div 
            onClick={handleSaveToggle}
            style={{ 
              position: 'absolute', top: '0.5rem', right: '0.5rem', 
              padding: '0.5rem', borderRadius: '50%', 
              backgroundColor: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)',
              display: isHovered || isSaved ? 'flex' : 'none',
              transition: 'background-color 0.2s',
              zIndex: 20
            }}
            title={isSaved ? "Remove from saved" : "Save blueprint"}
          >
            {isSaved ? <BookmarkCheck size={16} color="#E50914" /> : <Bookmark size={16} color="#fff" />}
          </div>
        </div>
        <div style={{ padding: '0.75rem 0.25rem', display: 'flex', flexDirection: 'column', gap: '0.25rem', flex: 1 }}>
          <h3 style={{ margin: 0, fontSize: '0.9rem', fontWeight: '600', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', lineHeight: 1.4, color: '#fff', textShadow: '0 1px 2px rgba(0,0,0,0.8)' }}>
            {video.title.replace(/&#39;/g, "'").replace(/&amp;/g, '&')}
          </h3>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
            <div style={{ color: '#888', fontSize: '0.75rem', fontWeight: '500' }}>
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
          <div key={i} style={{ minWidth: '280px', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <div style={{ width: '100%', paddingTop: '56.25%', backgroundColor: 'var(--bg-panel)', borderRadius: '8px', animation: 'pulse 1.5s infinite' }} />
            <div style={{ width: '90%', height: '16px', backgroundColor: 'var(--bg-panel)', borderRadius: '2px', animation: 'pulse 1.5s infinite' }} />
            <div style={{ width: '60%', height: '14px', backgroundColor: 'var(--bg-panel)', borderRadius: '2px', animation: 'pulse 1.5s infinite' }} />
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', overflowY: 'auto', overflowX: 'hidden', backgroundColor: '#0a0a0a' }}>
      <style>{`
        @keyframes pulse {
          0% { opacity: 1; }
          50% { opacity: 0.5; }
          100% { opacity: 1; }
        }
        .netflix-scrollbar {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .netflix-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
      
      {/* Hero & Search Section */}
      <div style={{ marginBottom: '2.5rem', padding: '2rem 1rem 0 1rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <div>
          <h2 style={{ fontSize: '2.5rem', margin: '0 0 0.5rem 0', display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#fff' }}>
            <MonitorPlay size={40} style={{ color: '#E50914' }} />
            Base Blueprints
          </h2>
          <p style={{ color: '#aaa', fontSize: '1.1rem', margin: 0, maxWidth: '800px' }}>
            Watch Rust base builds, bunker designs, starter layouts and raid-resistant concepts without leaving RustMasterTool.
          </p>
        </div>
        
        <form onSubmit={handleSearchSubmit} style={{ position: 'relative', maxWidth: '400px' }}>
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
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid transparent',
              borderRadius: '24px',
              color: '#fff',
              fontSize: '0.95rem',
              outline: 'none',
              transition: 'all 0.2s ease',
              boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.5)'
            }}
            onFocus={(e) => {
              e.target.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
              e.target.style.borderColor = '#E50914';
            }}
            onBlur={(e) => {
              if(!searchQuery) {
                e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
                e.target.style.borderColor = 'transparent';
              }
            }}
          />
        </form>
      </div>

      {/* Search Results Section */}
      {activeSearch && (
        <div style={{ marginBottom: '3rem', padding: '0 1rem' }}>
          <h2 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', color: '#aaa', fontWeight: '600', letterSpacing: '1px', textTransform: 'uppercase' }}>SEARCH RESULTS: {activeSearch}</h2>
          
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
          <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
            
            {savedBlueprints.length > 0 && !activeSearch && (
              <div key="saved_blueprints_rail">
                <h2 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', color: '#fff', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.5rem', letterSpacing: '0.5px' }}>
                  <BookmarkCheck size={20} color="#E50914" /> MY SAVED BLUEPRINTS
                </h2>
                <div 
                  className="netflix-scrollbar"
                  style={{ display: 'flex', gap: '0.75rem', overflowX: 'auto', paddingBottom: '1rem', paddingRight: '1rem' }}
                >
                  {savedBlueprints.map(video => <VideoCard key={`saved-${video.id}`} video={video} />)}
                </div>
              </div>
            )}

            {!activeSearch && GROUPS.map(group => {
              const groupRows = discoverData.filter((r: any) => r.group === group);
              if (groupRows.length === 0) return null;
              
              return (
                <div key={group}>
                  <h2 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', color: '#aaa', fontWeight: '600', letterSpacing: '1px', textTransform: 'uppercase' }}>
                    {group}
                  </h2>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                    {groupRows.map((row: any) => {
                      if (row.items?.length === 0) return null; // Hide empty rows
                      
                      return (
                        <div key={row.key} style={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>
                          <h3 style={{ fontSize: '1.15rem', margin: '0 0 0.75rem 0', color: '#fff', fontWeight: 'bold', letterSpacing: '0.5px', display: 'flex', alignItems: 'center' }}>
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
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(10px)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
           <div style={{ width: '100%', maxWidth: '1200px', aspectRatio: '16/9', position: 'relative', padding: '1rem' }}>
             <button 
               onClick={() => setActiveVideoId(null)}
               style={{ position: 'absolute', top: '-3rem', right: '1rem', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '24px', color: '#fff', fontSize: '0.9rem', cursor: 'pointer', padding: '0.5rem 1.5rem', fontWeight: 'bold', transition: 'background 0.2s' }}
               onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.2)'}
               onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'}
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

