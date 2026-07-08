import { useState, useEffect } from 'react';
import { X, PlayCircle, Map, AlertTriangle, Lightbulb, ExternalLink, Skull, Gem, ShieldAlert, Crosshair, Layers, Package } from 'lucide-react';
import type { DeepMonumentData } from './mapIntelDeepData';
import type { MapMonument } from './mapIntelData';
import { MONUMENT_CATEGORIES } from './mapIntelData';
import './MapIntelDetailModal.css';

interface MapIntelDetailModalProps {
  deep?: DeepMonumentData;
  base?: MapMonument;
  onClose: () => void;
}

export function MapIntelDetailModal({ deep, base, onClose }: MapIntelDetailModalProps) {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const name = deep?.name || base?.name || '';
  const categoryId = deep?.categoryId || base?.categoryId || '';
  const confidence = deep?.confidence || base?.confidence || 'uncertain';
  const needsReview = deep ? deep.contentQuality.needsOwnerReview : base?.needsOwnerReview;
  const categoryName = MONUMENT_CATEGORIES.find(c => c.id === categoryId)?.name || 'Unknown';

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const extractYoutubeId = (url: string) => {
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&?]+)/);
    return match ? match[1] : null;
  };

  return (
    <div className="monument-modal-overlay" onClick={onClose}>
      <div className="monument-modal deep-modal" onClick={e => e.stopPropagation()}>
        <button className="monument-modal-close" onClick={onClose}>
          <X size={20} />
        </button>
        
        <div className="modal-header-hero" data-category={categoryId}>
          <div className="modal-hero-content">
            <div className="modal-hero-badges">
              <span className="cat-badge">{categoryName}</span>
              <span className="cat-badge" style={confidence === 'verified' ? { color: '#3fb950', borderColor: '#3fb95040' } : { color: '#d29922', borderColor: '#d2992240' }}>{confidence}</span>
              {needsReview && (
                <span className="cat-badge review-badge"><AlertTriangle size={12} /> needs owner review</span>
              )}
            </div>
            <h2 className="modal-title">{name}</h2>
            {deep?.aliasesNote && <div className="modal-subtitle">{deep.aliasesNote}</div>}
          </div>
          {deep?.imageUrl && (
            <div className="modal-hero-image">
              <img src={`/map-intel/${deep.imageUrl}`} alt={name} />
            </div>
          )}
        </div>

        <div className="monument-modal-scroll-body">
          {deep ? (
            <>
              {/* DEEP CONTENT */}
              <section className="intel-section intro-section">
                <p className="intel-overview">{deep.overview}</p>
                <div className="intel-quick-facts">
                  <div className="fact-box">
                    <div className="fact-icon"><Gem size={18} /></div>
                    <div>
                      <strong>Why Run It</strong>
                      <p>{deep.whyRunIt}</p>
                    </div>
                  </div>
                  <div className="fact-box">
                    <div className="fact-icon"><Map size={18} /></div>
                    <div>
                      <strong>Access</strong>
                      <p>{deep.access}</p>
                    </div>
                  </div>
                </div>
              </section>

              <div className="intel-grid">
                {/* Puzzle & Access */}
                <section className="intel-section puzzle-section">
                  <h3><Layers size={18} /> Puzzle & Access</h3>
                  {deep.puzzle.hasPuzzle ? (
                    <div className="puzzle-details">
                      <div className="puzzle-requirements">
                        {deep.puzzle.requiredItems && deep.puzzle.requiredItems.length > 0 && (
                          <div className="req-group">
                            <strong>Required:</strong>
                            <div className="req-items">
                              {deep.puzzle.requiredItems.map(item => (
                                <span key={item} className="req-tag required">{item}</span>
                              ))}
                            </div>
                          </div>
                        )}
                        {deep.puzzle.optionalItems && deep.puzzle.optionalItems.length > 0 && (
                          <div className="req-group">
                            <strong>Optional:</strong>
                            <div className="req-items">
                              {deep.puzzle.optionalItems.map(item => (
                                <span key={item} className="req-tag optional">{item}</span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                      
                      {deep.puzzle.steps && deep.puzzle.steps.length > 0 && (
                        <div className="puzzle-steps">
                          {deep.puzzle.steps.map(step => (
                            <div key={step.order} className="puzzle-step">
                              <div className="step-number">{step.order}</div>
                              <div className="step-content">
                                <strong>{step.title}</strong>
                                <p>{step.instruction}</p>
                                {step.warning && <p className="step-warning"><AlertTriangle size={14} /> {step.warning}</p>}
                                {step.result && <p className="step-result">→ {step.result}</p>}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {deep.puzzle.commonMistakes && deep.puzzle.commonMistakes.length > 0 && (
                        <div className="puzzle-mistakes">
                          <strong>Common Puzzle Mistakes:</strong>
                          <ul>
                            {deep.puzzle.commonMistakes.map((m, i) => <li key={i}>{m}</li>)}
                          </ul>
                        </div>
                      )}
                      
                      {deep.puzzle.resetOrTimingNotes && (
                        <p className="puzzle-timing">⏱️ {deep.puzzle.resetOrTimingNotes}</p>
                      )}
                    </div>
                  ) : (
                    <div className="no-puzzle-box">
                      <p>{deep.puzzle.note || 'No puzzle required for this monument.'}</p>
                    </div>
                  )}
                </section>

                {/* Loot Guide */}
                <section className="intel-section loot-section">
                  <h3><Gem size={18} /> Loot Guide</h3>
                  <div className="loot-details">
                    <p className="expected-loot">{deep.lootGuide.expectedLoot}</p>
                    
                    <div className="loot-highlights">
                      {deep.lootGuide.crateTypes && deep.lootGuide.crateTypes.length > 0 && (
                        <div className="loot-prop">
                          <strong>Crates:</strong> {deep.lootGuide.crateTypes.join(', ')}
                        </div>
                      )}
                      {deep.lootGuide.recyclerLocation && (
                        <div className="loot-prop">
                          <strong>Recycler:</strong> {deep.lootGuide.recyclerLocation}
                        </div>
                      )}
                      {deep.lootGuide.cardSpawns && (
                        <div className="loot-prop">
                          <strong>Card Spawns:</strong> {deep.lootGuide.cardSpawns}
                        </div>
                      )}
                      {deep.lootGuide.lockedCrate && (
                        <div className="loot-prop">
                          <strong>Locked Crate:</strong> {deep.lootGuide.lockedCrate}
                        </div>
                      )}
                      {deep.lootGuide.diesel && (
                        <div className="loot-prop">
                          <strong>Diesel:</strong> {deep.lootGuide.diesel}
                        </div>
                      )}
                    </div>
                  </div>
                </section>

                {/* Threats */}
                <section className="intel-section threats-section">
                  <h3><Skull size={18} /> Threats & Risks</h3>
                  <div className="threats-details">
                    <div className={`threat-radiation rad-${deep.threats.radiation}`}>
                      <strong>Radiation:</strong> <span className="rad-badge">{deep.threats.radiation.toUpperCase()}</span>
                    </div>
                    <div className="threat-prop">
                      <strong>NPCs:</strong> <p>{deep.threats.npcs}</p>
                    </div>
                    {deep.threats.pvpHotspots && (
                      <div className="threat-prop">
                        <strong>PvP Hotspots:</strong> <p>{deep.threats.pvpHotspots}</p>
                      </div>
                    )}
                    {deep.threats.chokePoints && (
                      <div className="threat-prop">
                        <strong>Choke Points:</strong> <p>{deep.threats.chokePoints}</p>
                      </div>
                    )}
                    {deep.threats.campingSpots && (
                      <div className="threat-prop">
                        <strong>Camping Spots:</strong> <p>{deep.threats.campingSpots}</p>
                      </div>
                    )}
                  </div>
                </section>

                {/* Strategy & Tips */}
                <section className="intel-section strategy-section">
                  <h3><Crosshair size={18} /> Strategy & Tips</h3>
                  <div className="strategy-details">
                    {deep.strategy.soloTips && (
                      <div className="strategy-prop">
                        <strong>👤 Solo Tips:</strong> <p>{deep.strategy.soloTips}</p>
                      </div>
                    )}
                    {deep.strategy.groupTips && (
                      <div className="strategy-prop">
                        <strong>👥 Group Tips:</strong> <p>{deep.strategy.groupTips}</p>
                      </div>
                    )}
                    
                    {deep.beginnerMistakes && deep.beginnerMistakes.length > 0 && (
                      <div className="mistakes-list">
                        <strong>⚠️ Beginner Mistakes:</strong>
                        <ul>
                          {deep.beginnerMistakes.map((m, i) => <li key={i}>{m}</li>)}
                        </ul>
                      </div>
                    )}
                    
                    {deep.advancedTips && deep.advancedTips.length > 0 && (
                      <div className="advanced-list">
                        <strong>💡 Advanced Tips:</strong>
                        <ul>
                          {deep.advancedTips.map((m, i) => <li key={i}>{m}</li>)}
                        </ul>
                      </div>
                    )}
                  </div>
                </section>
              </div>

              {/* Video UX */}
              {deep.relatedVideos && deep.relatedVideos.length > 0 && (
                <section className="intel-section video-section">
                  <h3><PlayCircle size={18} /> Related Videos</h3>
                  <div className="video-grid">
                    {deep.relatedVideos.map((url, i) => {
                      const ytId = extractYoutubeId(url);
                      const isPlaying = activeVideo === ytId;

                      if (!ytId) {
                        return (
                          <a key={i} href={url} target="_blank" rel="noopener noreferrer" className="video-external-link">
                            <ExternalLink size={16} /> Open External Video
                          </a>
                        );
                      }

                      return (
                        <div key={ytId} className="video-card">
                          {isPlaying ? (
                            <div className="video-player-container">
                              <iframe 
                                src={`https://www.youtube.com/embed/${ytId}?autoplay=1`} 
                                title="YouTube video player" 
                                frameBorder="0" 
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                allowFullScreen
                              ></iframe>
                            </div>
                          ) : (
                            <div className="video-thumbnail-container" onClick={() => setActiveVideo(ytId)}>
                              <img src={`https://img.youtube.com/vi/${ytId}/maxresdefault.jpg`} alt="Video Thumbnail" />
                              <div className="video-play-overlay">
                                <PlayCircle size={48} color="#ff0000" />
                              </div>
                            </div>
                          )}
                          <div className="video-actions">
                            <a href={url} target="_blank" rel="noopener noreferrer" className="yt-out-link">
                              Watch on YouTube <ExternalLink size={14} />
                            </a>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </section>
              )}
              
              {/* Sources */}
              <section className="intel-section sources-section">
                <h4>Sources</h4>
                <ul>
                  {deep.sources.map((src, i) => (
                    <li key={i}>
                      <a href={src} target="_blank" rel="noopener noreferrer">{new URL(src).hostname}</a>
                    </li>
                  ))}
                </ul>
              </section>
            </>
          ) : (
            // BASE CONTENT FALLBACK
            <>
              <div className="intel-section">
                <p>{base?.explanation}</p>
              </div>
              <div className="intel-section">
                <h4><Package size={16} /> Loot & Progression</h4>
                <p>{base?.lootRelevance}</p>
              </div>
              <div className="intel-section">
                <h4><ShieldAlert size={16} /> Radiation & Access</h4>
                <p>{base?.radiationInfo}</p>
              </div>
              <div className="intel-grid" style={{ marginTop: '1.5rem' }}>
                <div className="intel-section">
                  <h4 style={{ color: '#5a9e5a' }}>Advantages</h4>
                  <ul>
                    {base?.advantages.map((adv, i) => <li key={i}>{adv}</li>)}
                  </ul>
                </div>
                <div className="intel-section">
                  <h4 style={{ color: '#ce422b' }}>Disadvantages</h4>
                  <ul>
                    {base?.disadvantages.map((dis, i) => <li key={i}>{dis}</li>)}
                  </ul>
                </div>
              </div>
              <div className="tip-box">
                <h4><Lightbulb size={16} style={{ display: 'inline', marginRight: '4px', verticalAlign: 'text-bottom' }} /> Quick Tip</h4>
                <p>{base?.quickTip}</p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
