import { useState, useEffect } from 'react';
import { Play, Search, MonitorPlay, ShieldAlert } from 'lucide-react';
import { searchBaseBlueprints, type YouTubeVideoSnippet } from '../../lib/api/baseBlueprints';

const PRESETS = [
  { label: 'Starter', query: 'Rust starter base' },
  { label: 'Solo', query: 'Rust solo base build' },
  { label: 'Duo', query: 'Rust duo base build' },
  { label: 'Trio', query: 'Rust trio base build' },
  { label: 'Bunker', query: 'Rust bunker base' },
  { label: 'Widegap', query: 'Rust widegap base' },
  { label: 'Cheap', query: 'Rust cheap base build' },
  { label: 'Clan', query: 'Rust clan base' },
  { label: 'Cave', query: 'Rust cave base' },
  { label: 'Ocean', query: 'Rust ocean base' },
  { label: 'Wipe Day', query: 'Rust wipe day base' },
];

export function BaseBlueprintsView() {
  const [activePreset, setActivePreset] = useState(PRESETS[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [videos, setVideos] = useState<YouTubeVideoSnippet[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    const q = searchQuery.trim() || activePreset.query;
    
    setIsLoading(true);
    setError(null);
    searchBaseBlueprints(q).then(results => {
      if (mounted) {
        setVideos(results);
      }
    }).catch(err => {
      if (mounted) {
        setError(err.message || 'Error fetching videos');
      }
    }).finally(() => {
      if (mounted) setIsLoading(false);
    });

    return () => { mounted = false; };
  }, [activePreset, searchQuery]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Hero */}
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '2rem', margin: '0 0 0.5rem 0', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <MonitorPlay size={32} style={{ color: '#FF0000' }} />
          Base Blueprints
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', margin: 0 }}>
          Find Rust base builds, bunker designs, wipe-day starters and raid-resistant layouts.
        </p>
      </div>

      {/* Controls */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '2rem' }}>
        <div style={{ position: 'relative', width: '100%', maxWidth: '600px' }}>
          <Search size={20} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input 
            type="text" 
            placeholder="Search for Rust Base Builds..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '1rem 1rem 1rem 3rem',
              backgroundColor: 'var(--bg-panel)',
              border: '1px solid var(--border-color)',
              borderRadius: '8px',
              color: 'var(--text-primary)',
              fontSize: '1rem',
              outline: 'none'
            }}
          />
        </div>

        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {PRESETS.map((preset) => (
            <button
              key={preset.label}
              onClick={() => {
                setActivePreset(preset);
                setSearchQuery('');
              }}
              style={{
                padding: '0.5rem 1rem',
                backgroundColor: activePreset.label === preset.label && !searchQuery ? 'var(--accent-rust)' : 'var(--bg-panel)',
                color: activePreset.label === preset.label && !searchQuery ? '#fff' : 'var(--text-primary)',
                border: '1px solid',
                borderColor: activePreset.label === preset.label && !searchQuery ? 'var(--accent-rust)' : 'var(--border-color)',
                borderRadius: '20px',
                cursor: 'pointer',
                transition: 'all 0.2s',
                fontWeight: 'bold',
                fontSize: '0.875rem'
              }}
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div style={{ flex: 1, overflowY: 'auto', paddingRight: '1rem' }}>
        {isLoading ? (
          <div style={{ color: 'var(--text-muted)' }}>Loading blueprints...</div>
        ) : error ? (
          <div style={{ color: 'var(--status-error)', padding: '1rem', backgroundColor: 'rgba(255, 68, 68, 0.1)', borderRadius: '8px', border: '1px solid var(--status-error)' }}>
             <ShieldAlert size={16} style={{ display: 'inline', marginRight: '0.5rem', verticalAlign: 'text-bottom' }} />
             {error}
          </div>
        ) : videos.length === 0 ? (
           <div style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '4rem 0' }}>
             No blueprints found for this category.
           </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
            {videos.map(video => (
              <div 
                key={video.id} 
                onClick={() => setActiveVideoId(video.id)}
                style={{ 
                  backgroundColor: 'var(--bg-panel)', 
                  borderRadius: '12px', 
                  overflow: 'hidden',
                  border: '1px solid var(--border-color)',
                  cursor: 'pointer',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  display: 'flex',
                  flexDirection: 'column'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div style={{ position: 'relative', width: '100%', paddingTop: '56.25%', backgroundColor: '#000' }}>
                  <img 
                    src={video.thumbnailUrl} 
                    alt={video.title} 
                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'rgba(0,0,0,0.6)', borderRadius: '50%', padding: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Play size={24} fill="#fff" />
                  </div>
                </div>
                <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1 }}>
                  <h3 style={{ margin: 0, fontSize: '1rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', lineHeight: 1.4 }}>
                    {video.title.replace(/&#39;/g, "'").replace(/&amp;/g, '&')}
                  </h3>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.875rem', fontWeight: 'bold' }}>
                    {video.channelTitle}
                  </div>
                  <div style={{ display: 'flex', gap: '0.5rem', marginTop: 'auto', paddingTop: '0.5rem' }}>
                    <span className="badge" style={{ backgroundColor: 'var(--bg-hover)' }}>
                      {new Date(video.publishedAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Video Modal */}
      {activeVideoId && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.9)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
           <div style={{ width: '100%', maxWidth: '1000px', aspectRatio: '16/9', position: 'relative', padding: '1rem' }}>
             <button 
               onClick={() => setActiveVideoId(null)}
               style={{ position: 'absolute', top: '-2rem', right: '1rem', background: 'none', border: 'none', color: '#fff', fontSize: '1.25rem', cursor: 'pointer', padding: '0.5rem' }}
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
               style={{ borderRadius: '12px', backgroundColor: '#000' }}
             ></iframe>
             <div style={{ marginTop: '1rem', textAlign: 'center' }}>
               <a 
                 href={`https://www.youtube.com/watch?v=${activeVideoId}`} 
                 target="_blank" 
                 rel="noopener noreferrer"
                 style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.875rem' }}
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
