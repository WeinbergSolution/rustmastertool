import { useState } from 'react';
import { PublicHeader } from '../../components/public/PublicHeader';
import { ShieldAlert, Crosshair } from 'lucide-react';
import './ResourceIntelligencePage.css';

type ResourceTab = 'sulfur' | 'stone' | 'metal' | 'generic';

export function ResourceIntelligencePage() {
  const [activeTab, setActiveTab] = useState<ResourceTab>('sulfur');

  const getAssetUrl = (tab: ResourceTab) => {
    switch(tab) {
      case 'sulfur': return '/demo/map-intelligence/overview-sulfur-potential.png';
      case 'stone': return '/demo/map-intelligence/overview-stone-potential.png';
      case 'metal': return '/demo/map-intelligence/overview-metal-ore-potential.png';
      case 'generic': return '/demo/map-intelligence/overview-generic-node-density.png';
    }
  };

  const getTabLabel = (tab: ResourceTab) => {
    switch(tab) {
      case 'sulfur': return 'Sulfur Potential';
      case 'stone': return 'Stone Potential';
      case 'metal': return 'Metal Ore Potential';
      case 'generic': return 'Generic Node Density';
    }
  };

  return (
    <div className="ri-page">
      <PublicHeader />
      
      <main className="ri-main">
        <div className="ri-header">
          <h1 className="ri-title">Resource <span>Intelligence</span></h1>
          <p className="ri-subtitle">
            Preview our predictive models for Rust maps. We analyze topography, cliff formations, and mountain logic to estimate resource density before you even spawn.
          </p>
          <div className="confidence-badge">
            <ShieldAlert size={16} />
            PREDICTION MODEL - NOT EXACT SPAWN POSITIONS
          </div>
        </div>

        <div className="ri-console">
          <div className="ri-tabs">
            <button 
              className={`ri-tab ${activeTab === 'sulfur' ? 'active' : ''}`}
              onClick={() => setActiveTab('sulfur')}
            >
              Sulfur
            </button>
            <button 
              className={`ri-tab ${activeTab === 'stone' ? 'active' : ''}`}
              onClick={() => setActiveTab('stone')}
            >
              Stone
            </button>
            <button 
              className={`ri-tab ${activeTab === 'metal' ? 'active' : ''}`}
              onClick={() => setActiveTab('metal')}
            >
              Metal Ore
            </button>
            <button 
              className={`ri-tab ${activeTab === 'generic' ? 'active' : ''}`}
              onClick={() => setActiveTab('generic')}
            >
              All Nodes
            </button>
          </div>

          <div className="ri-preview-panel">
            <div className="ri-image-container">
              <img src={getAssetUrl(activeTab)} alt={`${getTabLabel(activeTab)} Overview`} />
              {/* Optional: We can blend overlay if needed, but overview contains the dark background already */}
              <div className="ri-tactical-overlay"></div>
            </div>

            <div className="ri-sidebar">
              <div className="ri-legend">
                <h4>Density Legend</h4>
                <div className="legend-item">
                  <div className="legend-color color-high"></div>
                  <span>High Potential (Hotspot)</span>
                </div>
                <div className="legend-item">
                  <div className="legend-color color-medium"></div>
                  <span>Medium Potential</span>
                </div>
                <div className="legend-item">
                  <div className="legend-color color-low"></div>
                  <span>Low / Sparse</span>
                </div>
              </div>

              <div className="ri-info">
                <p>
                  <strong>How it works:</strong> Our algorithm reads the map topography, identifying cliffs, mountains, and flatlands. 
                  It then applies confidence-based prediction rules to estimate where certain nodes are most likely to cluster.
                </p>
                <p style={{marginTop: '1rem'}}>
                  <Crosshair size={14} style={{display: 'inline', verticalAlign: 'middle', marginRight: '4px'}}/>
                  <em>Plan your farm route before wipe day. Know the map before the fight starts.</em>
                </p>
              </div>

              <div className="ri-cta-box">
                <h4>Ready for Wipe Day?</h4>
                <p>Get access to our live tactical companion and full map intelligence suite.</p>
                <a href="/pricing" className="ri-cta-btn">View Arsenal</a>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
