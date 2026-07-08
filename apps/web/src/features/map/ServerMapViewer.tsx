import { useEffect, useState } from 'react';
import { X, Map as MapIcon, Layers, ShieldAlert, Loader2, AlertTriangle } from 'lucide-react';
import type { ServerCardData } from '../dashboard/ServerCard';
import { parseServerToMapModel } from './serverMapModel';
import type { ParsedServerMapModel } from './serverMapModel';
import { MAP_LAYERS } from './mapLayerTypes';
import './ServerMapViewer.css';

interface ServerMapViewerProps {
  server: ServerCardData;
  onClose: () => void;
}

export function ServerMapViewer({ server, onClose }: ServerMapViewerProps) {
  const [model, setModel] = useState<ParsedServerMapModel | null>(null);

  useEffect(() => {
    // Parse the server data into our standard map model
    setModel(parseServerToMapModel(server));

    // Handle escape key to close
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    
    // Prevent background scrolling
    const origOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = origOverflow;
    };
  }, [server, onClose]);

  const [currentImageSrc, setCurrentImageSrc] = useState<string | null>(null);
  const [imageStatus, setImageStatus] = useState<'loading' | 'loaded' | 'error'>('loading');

  useEffect(() => {
    if (model) {
      const initialSrc = model.imageUrl || model.thumbnailUrl || null;
      setCurrentImageSrc(initialSrc);
      setImageStatus(initialSrc ? 'loading' : 'error');
    }
  }, [model]);

  if (!model) return null;

  const handleImageError = () => {
    if (model && currentImageSrc === model.imageUrl && model.thumbnailUrl) {
      setCurrentImageSrc(model.thumbnailUrl);
      setImageStatus('loading');
    } else {
      setImageStatus('error');
    }
  };

  let displayBadge = model.mapSourceBadge;
  if (imageStatus === 'loaded' && currentImageSrc === model.thumbnailUrl && currentImageSrc !== model.imageUrl) {
    displayBadge = 'Map thumbnail preview';
  } else if (imageStatus === 'error') {
    displayBadge = 'No map image';
  }

  return (
    <div className="rm-map-viewer-overlay" onClick={onClose}>
      <div className="rm-map-viewer-container" onClick={(e) => e.stopPropagation()}>
        
        {/* Main Map Area */}
        <div className="rm-map-viewer-main">
          <div className="rm-map-viewer-header">
            <div className="rm-map-viewer-title">
              <h2><MapIcon size={20} /> {model.serverName}</h2>
              <div className="rm-map-viewer-meta">
                <span>Type: {model.mapType}</span>
                {model.worldSize && <span>Size: {model.worldSize}</span>}
                <span className="rm-map-viewer-badge">{displayBadge}</span>
              </div>
            </div>
            <button className="rm-map-viewer-close" onClick={onClose} aria-label="Close Map">
              <X size={24} />
            </button>
          </div>

          <div className="rm-map-viewer-content">
            {imageStatus !== 'error' && currentImageSrc ? (
              <>
                {imageStatus === 'loading' && (
                  <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)' }}>
                    <Loader2 size={32} className="spin" />
                    <span>Loading map...</span>
                  </div>
                )}
                <img 
                  src={currentImageSrc} 
                  alt={`${model.serverName} Map`} 
                  className="rm-map-viewer-image" 
                  onLoad={() => setImageStatus('loaded')}
                  onError={handleImageError}
                  style={{ display: imageStatus === 'loaded' ? 'block' : 'none' }}
                />
              </>
            ) : (
              <div className="rm-map-viewer-empty">
                <ShieldAlert size={48} style={{ opacity: 0.5, marginBottom: '1rem' }} />
                <h3>Map preview could not be loaded.</h3>
                <p>Source unavailable or blocked.</p>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar Area */}
        <div className="rm-map-viewer-sidebar">
          
          <div className="rm-map-sidebar-section">
            <h3><Layers size={16} /> Layers & Overlays</h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              {/* Active Layers */}
              {model.availableLayers.map(layerId => {
                const config = MAP_LAYERS[layerId];
                return (
                  <div key={layerId} className="rm-map-layer-item">
                    <div className="rm-map-layer-item-info">
                      <span className="rm-map-layer-name">{config.label}</span>
                      <span className="rm-map-layer-desc">{config.description}</span>
                    </div>
                    <input type="checkbox" checked readOnly style={{ accentColor: 'var(--accent-rust)' }} />
                  </div>
                );
              })}

              {/* Disabled/Future Layers */}
              {model.disabledFutureLayers.map(layerId => {
                const config = MAP_LAYERS[layerId];
                return (
                  <div key={layerId} className="rm-map-layer-item" style={{ opacity: 0.6 }}>
                    <div className="rm-map-layer-item-info">
                      <span className="rm-map-layer-name">{config.label} <span className="rm-map-layer-future">Coming Later</span></span>
                      <span className="rm-map-layer-desc">{config.description}</span>
                    </div>
                    <input type="checkbox" disabled />
                  </div>
                );
              })}
            </div>

            {model.coordinateMode === 'none' && (
              <div className="rm-map-note">
                <div style={{ fontWeight: 'bold', marginBottom: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  <AlertTriangle size={14} /> Coordinates Unavailable
                </div>
                Monument coordinates are not available in the current data source yet. Markers will be enabled after coordinate enrichment.
              </div>
            )}
          </div>

          <div className="rm-map-sidebar-section">
            <h3>Monuments ({model.classifiedMonuments.length})</h3>
            {model.classifiedMonuments.length > 0 ? (
              <div className="rm-map-monument-list">
                {model.classifiedMonuments.map((mon, idx) => (
                  <div key={`${mon.rawName}-${idx}`} className="rm-map-monument-item">
                    {mon.displayName}
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                No monuments found in current map data.
              </div>
            )}
          </div>

          {model.seed && (
            <div className="rm-map-sidebar-section" style={{ borderBottom: 'none' }}>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-disabled)' }}>
                Advanced Technical Info: Seed {model.seed}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
