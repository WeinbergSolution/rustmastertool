import { useCallback, useEffect, useRef, useState } from 'react';
import { X, Map as MapIcon, Layers, ShieldAlert, Loader2, AlertTriangle, Info, Wand2, RefreshCw } from 'lucide-react';
import type { ServerCardData } from '../dashboard/ServerCard';
import { parseServerToMapModel } from './serverMapModel';
import type { ParsedServerMapModel } from './serverMapModel';
import { MAP_LAYERS } from './mapLayerTypes';
import {
  requestRustMapsProviderMap,
  pollRustMapsProviderMap,
  pickProviderImage,
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

  useEffect(() => {
    setModel(parseServerToMapModel(server));
    const handleKeyDown = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleKeyDown);
    const origOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = origOverflow;
    };
  }, [server, onClose]);

  // --- Provider generation state -------------------------------------------
  const [provider, setProvider] = useState<ProviderMapResponse | null>(null);
  const [isRequesting, setIsRequesting] = useState(false);
  const [pollTimedOut, setPollTimedOut] = useState(false);
  const pollStartRef = useRef(0);

  const providerState = provider?.state ?? null;
  const providerData = provider?.data ?? null;
  const providerImage = providerState === 'active' ? pickProviderImage(providerData) : null;

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
    if (providerState === 'failed' || providerState === 'unavailable') {
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
                    <span>{providerImage ? 'Loading generated map…' : 'Loading map preview…'}</span>
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

          {/* Internal generation CTA — no external redirect. */}
          <div className="rm-map-viewer-cta">
            {renderCta()}
            {provider?.message && providerState !== 'active' && (
              <span className="rm-map-provider-cta-note">{provider.message}</span>
            )}
          </div>
        </div>

        {/* Sidebar Area */}
        <div className="rm-map-viewer-sidebar">

          <div className="rm-map-sidebar-section">
            <h3><Layers size={16} /> Layers & Overlays</h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
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

            <div className="rm-map-note">
              <div style={{ fontWeight: 'bold', marginBottom: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <AlertTriangle size={14} /> Interactive markers
              </div>
              Interactive markers require validated coordinate projection.
            </div>

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
                RustMaps Provider returned {providerData?.totalMonuments} monuments with coordinates. Interactive markers unlock after validated coordinate projection.
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
