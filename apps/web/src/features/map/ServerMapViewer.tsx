import { useCallback, useEffect, useRef, useState } from 'react';
import { X, Map as MapIcon, Layers, ShieldAlert, Loader2, AlertTriangle, Info, Wand2, RefreshCw, ZoomIn, ZoomOut, Maximize, Minimize, ChevronLeft } from 'lucide-react';
import type { ServerCardData } from '../dashboard/ServerCard';
import { parseServerToMapModel } from './serverMapModel';
import type { ParsedServerMapModel } from './serverMapModel';
import { MAP_LAYERS } from './mapLayerTypes';
import type { MapLayerId } from './mapLayerTypes';
import { RustMapsTileViewer } from './RustMapsTileViewer';
import {
  requestRustMapsProviderMap,
  pollRustMapsProviderMap,
  pickCleanMapImage,
  pickIconMapImage,
  isPendingProviderState,
  type ProviderMapResponse,
  type ProviderMapState,
} from './rustmapsProviderClient';
import './ServerMapViewer.css';

interface ServerMapViewerProps {
  server: ServerCardData;
  onClose: () => void;
}

const POLL_INTERVAL_MS = 9000;
const MAX_POLL_MS = 5 * 60 * 1000;

const BIOME_LABELS: Record<string, string> = { s: 'Snow', d: 'Desert', f: 'Forest', t: 'Tundra', j: 'Jungle' };
const STAT_LABELS: Record<string, string> = {
  rivers: 'Rivers', lakes: 'Lakes', mountains: 'Mountains', islands: 'Islands',
  buildableRocks: 'Build Rocks', canyons: 'Canyons', oases: 'Oases', iceLakes: 'Ice Lakes',
};

function pendingCopy(state: ProviderMapState, currentStep: string | null): string {
  if (currentStep) return currentStep;
  switch (state) {
    case 'queued':
    case 'in_queue': return 'Map generation queued…';
    case 'generating': return 'Generating terrain…';
    case 'processing': return 'Processing map images…';
    case 'uploading': return 'Finalising map…';
    default: return 'Working…';
  }
}

export function ServerMapViewer({ server, onClose }: ServerMapViewerProps) {
  const [model, setModel] = useState<ParsedServerMapModel | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const mapWrapperRef = useRef<HTMLDivElement>(null);

  const [isFullscreen, setIsFullscreen] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const isDragging = useRef(false);
  const lastPanPos = useRef({ x: 0, y: 0 });

  const handleClose = useCallback(() => {
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    }
    onClose();
  }, [onClose]);

  useEffect(() => {
    const handleFullscreenChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  useEffect(() => {
    setModel(parseServerToMapModel(server));
    const handleKeyDown = (e: KeyboardEvent) => { if (e.key === 'Escape') handleClose(); };
    window.addEventListener('keydown', handleKeyDown);
    const origOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = origOverflow;
    };
  }, [server, handleClose]);

  // Zoom & Pan Handlers
  const handleZoomIn = () => setZoom(z => Math.min(5, z + 0.5));
  const handleZoomOut = () => setZoom(z => Math.max(1, z - 0.5));
  const handleResetZoom = () => { setZoom(1); setPan({ x: 0, y: 0 }); };

  useEffect(() => {
    const wrapper = mapWrapperRef.current;
    if (!wrapper) return;
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (e.deltaY < 0) handleZoomIn();
      else handleZoomOut();
    };
    wrapper.addEventListener('wheel', handleWheel, { passive: false });
    return () => wrapper.removeEventListener('wheel', handleWheel);
  }, []);

  const handlePointerDown = (e: React.PointerEvent) => {
    if (zoom <= 1) return;
    isDragging.current = true;
    lastPanPos.current = { x: e.clientX, y: e.clientY };
    e.currentTarget.setPointerCapture(e.pointerId);
  };
  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current) return;
    const dx = e.clientX - lastPanPos.current.x;
    const dy = e.clientY - lastPanPos.current.y;
    lastPanPos.current = { x: e.clientX, y: e.clientY };
    // Clamp pan roughly so image doesn't disappear completely
    setPan(p => ({ 
      x: Math.max(-1000 * zoom, Math.min(1000 * zoom, p.x + dx)), 
      y: Math.max(-1000 * zoom, Math.min(1000 * zoom, p.y + dy)) 
    }));
  };
  const handlePointerUp = (e: React.PointerEvent) => {
    isDragging.current = false;
    e.currentTarget.releasePointerCapture(e.pointerId);
  };

  const toggleFullscreen = async () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      await containerRef.current.requestFullscreen().catch(() => {});
    } else {
      await document.exitFullscreen().catch(() => {});
    }
  };
  const canFullscreen = document.fullscreenEnabled;


  // --- Provider generation state -------------------------------------------
  const [provider, setProvider] = useState<ProviderMapResponse | null>(null);
  const [isRequesting, setIsRequesting] = useState(false);
  const [pollTimedOut, setPollTimedOut] = useState(false);
  const pollStartRef = useRef(0);

  const [activeMapLayer, setActiveMapLayer] = useState<'clean' | 'icons'>('clean');

  const providerState = provider?.state ?? null;
  const providerData = provider?.data ?? null;
  const providerImageClean = providerState === 'active' ? pickCleanMapImage(providerData) : null;
  const providerImageIcon = providerState === 'active' ? pickIconMapImage(providerData) : null;
  const providerImage = activeMapLayer === 'clean' ? providerImageClean : providerImageIcon;

  const [viewerMode, setViewerMode] = useState<'image' | 'tile'>('image');
  const [heatmapOpacity, setHeatmapOpacity] = useState(0.65);
  const [activeTileLayers, setActiveTileLayers] = useState<Set<MapLayerId>>(new Set());

  useEffect(() => {
    if (providerData?.tileBaseUrl) {
      setViewerMode('tile');
    }
  }, [providerData?.tileBaseUrl]);

  const toggleTileLayer = (layerId: MapLayerId) => {
    setActiveTileLayers(prev => {
      const next = new Set(prev);
      if (next.has(layerId)) next.delete(layerId);
      else next.add(layerId);
      return next;
    });
  };

  const canGenerate = Boolean(model?.worldSize && model?.seed);

  const startGeneration = useCallback(async () => {
    if (!model || !canGenerate || isRequesting) return;
    setIsRequesting(true);
    setPollTimedOut(false);
    pollStartRef.current = Date.now();
    const res = await requestRustMapsProviderMap({
      seed: model.seed as number,
      worldSize: model.worldSize as number,
      battlemetricsServerId: model.serverId,
    });
    setProvider(res);
    setIsRequesting(false);
  }, [model, canGenerate, isRequesting]);

  // Refresh status WITHOUT re-POSTing: poll by cacheKey (server does a lookup),
  // falling back to get_or_create which also looks up for accepted-no-payload.
  const refreshStatus = useCallback(async () => {
    if (isRequesting) return;
    setIsRequesting(true);
    const res = provider?.cacheKey
      ? await pollRustMapsProviderMap(provider.cacheKey)
      : await requestRustMapsProviderMap({
          seed: model!.seed as number,
          worldSize: model!.worldSize as number,
          battlemetricsServerId: model!.serverId,
        });
    setProvider(res);
    setIsRequesting(false);
  }, [provider, model, isRequesting]);

  // Auto-poll while the provider map is pending (capped at MAX_POLL_MS).
  useEffect(() => {
    if (!provider?.cacheKey || !isPendingProviderState(provider.state)) return;
    if (pollStartRef.current === 0) pollStartRef.current = Date.now();
    if (Date.now() - pollStartRef.current > MAX_POLL_MS) { setPollTimedOut(true); return; }
    const cacheKey = provider.cacheKey;
    const timer = window.setTimeout(async () => {
      const res = await pollRustMapsProviderMap(cacheKey);
      setProvider(res);
    }, POLL_INTERVAL_MS);
    return () => window.clearTimeout(timer);
  }, [provider]);

  // --- Image (generated preferred, then preview) ---------------------------
  const previewImage = model ? (model.imageUrl || model.thumbnailUrl || null) : null;
  const [currentImageSrc, setCurrentImageSrc] = useState<string | null>(null);
  const [imageStatus, setImageStatus] = useState<'loading' | 'loaded' | 'error'>('loading');

  useEffect(() => {
    const src = providerImage || previewImage;
    setCurrentImageSrc(src);
    setImageStatus(src ? 'loading' : 'error');
  }, [providerImage, previewImage]);

  const handleImageError = () => {
    if (providerImage && currentImageSrc === providerImage && previewImage && previewImage !== providerImage) {
      setCurrentImageSrc(previewImage);
      setImageStatus('loading');
    } else if (model && currentImageSrc === model.imageUrl && model.thumbnailUrl) {
      setCurrentImageSrc(model.thumbnailUrl);
      setImageStatus('loading');
    } else {
      setImageStatus('error');
    }
  };

  if (!model) return null;

  let displayBadge = model.mapSourceBadge;
  if (providerState === 'active' && providerImage) displayBadge = 'Generated map';
  else if (imageStatus === 'loaded' && currentImageSrc === model.thumbnailUrl && currentImageSrc !== model.imageUrl) displayBadge = 'Map thumbnail preview';
  else if (imageStatus === 'error') displayBadge = 'No map image';

  const isPending = provider ? isPendingProviderState(provider.state) : false;
  const showProviderDiag =
    providerState === 'provider_bad_request' ||
    providerState === 'provider_success_without_data' ||
    providerState === 'provider_lookup_failed';
  const biomeEntries = providerData?.biomePercentages
    ? Object.entries(providerData.biomePercentages).filter(([, v]) => typeof v === 'number')
    : [];
  const statEntries = providerData?.mapStats
    ? Object.entries(providerData.mapStats).filter(([k, v]) => STAT_LABELS[k] && typeof v === 'number' && (v as number) > 0)
    : [];

  const renderCta = () => {
    if (!canGenerate) {
      return <span className="rm-map-provider-cta" aria-disabled="true" title="Seed and map size are required to generate a map."><Info size={16} /> Seed and map size required</span>;
    }
    if (providerState === 'provider_not_configured') {
      return <span className="rm-map-provider-cta" aria-disabled="true"><Info size={16} /> RustMaps Provider is not configured yet</span>;
    }
    if (providerState === 'active') {
      return <span className="rm-map-cta-status success"><MapIcon size={16} /> Generated map loaded</span>;
    }
    if (isRequesting) {
      return <span className="rm-map-cta-status"><Loader2 size={16} className="spin" /> Requesting RustMaps generation…</span>;
    }
    if (isPending) {
      if (pollTimedOut) {
        return (
          <button type="button" className="rm-map-provider-cta active" onClick={startGeneration}>
            <RefreshCw size={16} /> Still generating — check again
          </button>
        );
      }
      return <span className="rm-map-cta-status"><Loader2 size={16} className="spin" /> {pendingCopy(provider!.state, providerData?.currentStep ?? null)}</span>;
    }
    if (providerState === 'quota_exhausted') {
      return (
        <button type="button" className="rm-map-provider-cta active" onClick={startGeneration}>
          <RefreshCw size={16} /> Quota reached — try again
        </button>
      );
    }
    if (providerState === 'unavailable') {
      // Transport/CORS/function-not-deployed — distinct from a real generation error.
      return (
        <button type="button" className="rm-map-provider-cta active" onClick={startGeneration}>
          <RefreshCw size={16} /> Retry provider request
        </button>
      );
    }
    if (providerState === 'provider_success_without_data' || providerState === 'active_lookup_required' || providerState === 'provider_lookup_failed') {
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', width: '100%', alignItems: 'center' }}>
          <span className="rm-map-cta-status" style={{ color: 'var(--text-normal)' }}>
            <MapIcon size={16} /> RustMaps accepted the request
          </span>
          <span className="rm-map-provider-cta-note" style={{ textAlign: 'center', marginBottom: '0.25rem' }}>
            Waiting for map details from the provider.
          </span>
          <button type="button" className="rm-map-provider-cta active" onClick={refreshStatus}>
            <RefreshCw size={16} /> Refresh map status
          </button>
        </div>
      );
    }
    if (providerState === 'validation_error') {
      return <span className="rm-map-provider-cta" aria-disabled="true"><AlertTriangle size={16} /> {provider?.message ?? 'Invalid map request'}</span>;
    }
    if (providerState === 'provider_bad_request') {
      return (
        <button type="button" className="rm-map-provider-cta active" onClick={startGeneration}>
          <RefreshCw size={16} /> RustMaps rejected the generation request — retry
        </button>
      );
    }
    if (providerState === 'failed') {
      return (
        <button type="button" className="rm-map-provider-cta active" onClick={startGeneration}>
          <RefreshCw size={16} /> Generation failed — retry
        </button>
      );
    }
    return (
      <button type="button" className="rm-map-provider-cta active" onClick={startGeneration}>
        <Wand2 size={16} /> Generate full map in RustMasterTool
      </button>
    );
  };

  return (
    <div className="rm-map-viewer-overlay" onClick={handleClose}>
      <div className="rm-map-viewer-container" ref={containerRef} onClick={(e) => e.stopPropagation()}>

        {/* Main Map Area */}
        <div className="rm-map-viewer-main">
          <div className="rm-map-viewer-header">
            <div className="rm-map-viewer-title-row">
              <button className="rm-map-mobile-back" onClick={handleClose} aria-label="Go back">
                <ChevronLeft size={24} />
              </button>
              <div className="rm-map-viewer-title">
                <h2><MapIcon size={20} className="desktop-only-icon" /> {model.serverName}</h2>
                <div className="rm-map-viewer-meta">
                  <span>Type: {model.mapType}</span>
                  {model.worldSize && <span>Size: {model.worldSize}</span>}
                  <span className="rm-map-viewer-badge">{displayBadge}</span>
                </div>
              </div>
            </div>

            <div className="rm-map-viewer-header-controls">
              <div className="rm-map-header-cta">
                {renderCta()}
              </div>

              {providerState === 'active' && (
                <div className="rm-map-layer-toggle">
                  {providerData?.tileBaseUrl && (
                    <>
                      <button 
                        className={`rm-map-layer-btn ${viewerMode === 'tile' ? 'active' : ''}`}
                        onClick={() => setViewerMode('tile')}
                      >
                        Tile Mode
                      </button>
                      <button 
                        className={`rm-map-layer-btn ${viewerMode === 'image' ? 'active' : ''}`}
                        onClick={() => setViewerMode('image')}
                      >
                        Image Mode
                      </button>
                      <div style={{ width: '1px', backgroundColor: 'var(--border-color)', margin: '0 0.25rem' }}></div>
                    </>
                  )}
                  <button 
                    className={`rm-map-layer-btn ${viewerMode === 'image' && activeMapLayer === 'clean' ? 'active' : ''}`}
                    onClick={() => { setViewerMode('image'); setActiveMapLayer('clean'); }}
                    disabled={viewerMode === 'tile'}
                  >
                    Clean Image
                  </button>
                  <button 
                    className={`rm-map-layer-btn ${viewerMode === 'image' && activeMapLayer === 'icons' ? 'active' : ''}`}
                    onClick={() => { setViewerMode('image'); setActiveMapLayer('icons'); }}
                    disabled={!providerData?.imageIconUrl || viewerMode === 'tile'}
                    title={!providerData?.imageIconUrl ? "Icon map is not available for this generated map." : undefined}
                  >
                    Icon Image
                  </button>
                </div>
              )}
              
              {canFullscreen && (
                <button className="rm-map-viewer-icon-btn desktop-only" onClick={toggleFullscreen} aria-label="Toggle Fullscreen" title="Toggle Fullscreen">
                  {isFullscreen ? <Minimize size={20} /> : <Maximize size={20} />}
                </button>
              )}

              <button className="rm-map-viewer-close desktop-only" onClick={handleClose} aria-label="Close Map">
                <X size={24} />
              </button>
            </div>
          </div>

          <div 
            className="rm-map-viewer-content"
            ref={mapWrapperRef}
            onPointerDown={viewerMode === 'image' ? handlePointerDown : undefined}
            onPointerMove={viewerMode === 'image' ? handlePointerMove : undefined}
            onPointerUp={viewerMode === 'image' ? handlePointerUp : undefined}
            onPointerLeave={viewerMode === 'image' ? handlePointerUp : undefined}
            style={{ touchAction: viewerMode === 'image' && zoom > 1 ? 'none' : 'auto' }}
          >
            {viewerMode === 'tile' && providerData?.tileBaseUrl ? (
              <RustMapsTileViewer
                tileBaseUrl={providerData.tileBaseUrl}
                activeHeatmaps={providerData.heatMaps?.filter(hm => activeTileLayers.has(hm.name.toLowerCase() as MapLayerId)) ?? []}
                heatmapOpacity={heatmapOpacity}
                undergroundOverlayUrl={activeTileLayers.has('underground') ? providerData.undergroundOverlayUrl : null}
              />
            ) : (
              <>
                {imageStatus === 'loaded' && currentImageSrc && (
                  <div className="rm-map-zoom-controls">
                    <button onClick={handleZoomOut} title="Zoom Out"><ZoomOut size={18} /></button>
                    <button onClick={handleResetZoom} title="Reset Zoom" style={{ fontSize: '0.75rem', fontWeight: 'bold' }}>{Math.round(zoom * 100)}%</button>
                    <button onClick={handleZoomIn} title="Zoom In"><ZoomIn size={18} /></button>
                  </div>
                )}

            {imageStatus !== 'error' && currentImageSrc ? (
              <>
                {imageStatus === 'loading' && (
                  <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)' }}>
                    <Loader2 size={32} className="spin" />
                    <span>{providerImage ? 'Loading generated map…' : 'Loading map preview…'}</span>
                  </div>
                )}
                <img
                  src={currentImageSrc}
                  alt={`${model.serverName} Map`}
                  className="rm-map-viewer-image"
                  onLoad={() => setImageStatus('loaded')}
                  onError={handleImageError}
                  draggable={false}
                  style={{ 
                    display: imageStatus === 'loaded' ? 'block' : 'none',
                    transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
                    transformOrigin: 'center',
                    cursor: zoom > 1 ? (isDragging.current ? 'grabbing' : 'grab') : 'default',
                    transition: isDragging.current ? 'none' : 'transform 0.15s ease-out'
                  }}
                />
              </>
            ) : (
              <div className="rm-map-viewer-empty">
                <ShieldAlert size={48} style={{ opacity: 0.5, marginBottom: '1rem' }} />
                <h3>Map preview could not be loaded.</h3>
                <p>Source unavailable or blocked.</p>
              </div>
            )}
          </>
        )}
      </div>
          {/* Diagnostics only - CTA buttons moved to header */}
          {(provider?.message || showProviderDiag) && (
            <div className="rm-map-viewer-cta diagnostics-only">
              {provider?.message && providerState !== 'active' && !['provider_success_without_data', 'active_lookup_required', 'provider_lookup_failed'].includes(providerState!) && (
                <span className="rm-map-provider-cta-note">{provider.message}</span>
              )}
              {showProviderDiag && provider?.providerMessage && (
                <span className="rm-map-cta-provider-msg">Provider: {provider.providerMessage.slice(0, 200)}</span>
              )}
              {showProviderDiag && provider?.requestDebug && (
                <span className="rm-map-cta-debug">
                  debug · {provider.requestDebug.method} {provider.requestDebug.endpoint} · status {provider.providerStatus ?? '—'} · seed {provider.requestDebug.seed} · size {provider.requestDebug.worldSize} · body [{provider.requestDebug.sentBodyKeys.join(', ')}]
                </span>
              )}
            </div>
          )}
        </div>

        {/* Sidebar Area */}
        <div className="rm-map-viewer-sidebar">

          <div className="rm-map-sidebar-section">
            <h3><Layers size={16} /> Resource Layers</h3>
            
            {viewerMode === 'image' && (
              <div style={{ fontSize: '0.75rem', color: 'var(--status-warning)', marginBottom: '0.75rem', padding: '0.5rem', background: 'rgba(210, 153, 34, 0.1)', borderRadius: '4px', borderLeft: '3px solid var(--status-warning)' }}>
                You are viewing the image fallback. Switch to <strong>Tile Mode</strong> (top bar) to enable interactive overlays.
              </div>
            )}

            {viewerMode === 'tile' && (
              <div style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Heatmap Opacity:</span>
                <input 
                  type="range" 
                  min="0.1" max="1" step="0.05" 
                  value={heatmapOpacity} 
                  onChange={e => setHeatmapOpacity(parseFloat(e.target.value))} 
                  style={{ flex: 1, accentColor: 'var(--accent-rust)' }}
                />
              </div>
            )}

            {['Map', 'Resources', 'Wildlife', 'Spawns'].map(category => {
              const catLayers = model.availableLayers.filter(l => MAP_LAYERS[l].category === category);
              if (catLayers.length === 0) return null;
              return (
                <div key={category} style={{ marginBottom: '1rem' }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>{category}</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                    {catLayers.map(layerId => {
                      const config = MAP_LAYERS[layerId];
                      // Check if layer is actually available in providerData (if it's a heatmap)
                      let isAvailable = true;
                      if (category === 'Resources' || category === 'Wildlife' || category === 'Spawns') {
                        isAvailable = providerData?.heatMaps?.some(hm => hm.name.toLowerCase() === layerId) ?? false;
                      } else if (layerId === 'underground') {
                        isAvailable = Boolean(providerData?.undergroundOverlayUrl);
                      } else if (layerId === 'building_blocks') {
                        isAvailable = Boolean(providerData?.buildingBlockAreaUrl);
                      } else if (layerId === 'clean_tiles') {
                        isAvailable = Boolean(providerData?.tileBaseUrl);
                      }
                      
                      const canToggle = viewerMode === 'tile' && isAvailable;
                      
                      // Base maps in tile mode are always on, don't show checkbox for clean_tiles
                      if (layerId === 'clean_tiles' || layerId === 'icon_image') return null;

                      return (
                        <div key={layerId} className="rm-map-layer-item" style={{ opacity: isAvailable ? 1 : 0.5 }}>
                          <div className="rm-map-layer-item-info">
                            <span className="rm-map-layer-name">{config.label}</span>
                            {!isAvailable && <span className="rm-map-layer-desc" style={{ color: 'var(--status-warning)' }}>Not generated for this map</span>}
                            {isAvailable && config.description && <span className="rm-map-layer-desc">{config.description}</span>}
                          </div>
                          <input 
                            type="checkbox" 
                            disabled={!canToggle} 
                            checked={activeTileLayers.has(layerId)}
                            onChange={() => toggleTileLayer(layerId)}
                            style={{ accentColor: 'var(--accent-rust)' }}
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}

            <div style={{ marginBottom: '1rem' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Planned / Unconfirmed</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                {model.disabledFutureLayers.map(layerId => {
                  const config = MAP_LAYERS[layerId];
                  return (
                    <div key={layerId} className="rm-map-layer-item" style={{ opacity: 0.6 }} title={config.unconfirmedReason}>
                      <div className="rm-map-layer-item-info">
                        <span className="rm-map-layer-name">{config.label} <span className="rm-map-layer-future" style={{ backgroundColor: 'rgba(205, 65, 43, 0.1)', color: 'var(--accent-rust)' }}>Planned</span></span>
                        {config.unconfirmedReason && <span className="rm-map-layer-desc">{config.unconfirmedReason}</span>}
                      </div>
                      <input type="checkbox" disabled />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="rm-map-sidebar-section">
            <div className="rm-map-note" style={{ background: 'rgba(59, 130, 246, 0.08)', borderLeftColor: 'var(--accent-rust)' }}>
              <div style={{ fontWeight: 'bold', marginBottom: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <Info size={14} /> Provider Integration
              </div>
              {providerState === 'active'
                ? 'Generated via RustMaps Provider and displayed inside RustMasterTool.'
                : 'Full generated maps are produced by the RustMaps Provider and displayed inside RustMasterTool. No external redirect.'}
            </div>
          </div>

          {/* Provider biome / stats */}
          {(biomeEntries.length > 0 || statEntries.length > 0) && (
            <div className="rm-map-sidebar-section">
              <h3>Map Stats</h3>
              <div className="rm-map-biome-tiles">
                {biomeEntries.map(([k, v]) => (
                  <div key={`b-${k}`} className="rm-map-biome-tile">
                    <span className="rm-map-biome-value">{Math.round(v as number)}%</span>
                    <span className="rm-map-biome-label">{BIOME_LABELS[k] || k}</span>
                  </div>
                ))}
                {statEntries.map(([k, v]) => (
                  <div key={`s-${k}`} className="rm-map-biome-tile">
                    <span className="rm-map-biome-value">{v as number}</span>
                    <span className="rm-map-biome-label">{STAT_LABELS[k]}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="rm-map-sidebar-section">
            <h3>Monuments ({(providerData?.totalMonuments ?? model.classifiedMonuments.length) || 0})</h3>
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
            {providerState === 'active' && (providerData?.totalMonuments ?? 0) > 0 && (
              <div style={{ fontSize: '0.7rem', color: 'var(--text-disabled)', marginTop: '0.5rem' }}>
                RustMaps Provider returned {providerData?.totalMonuments} monuments.
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
