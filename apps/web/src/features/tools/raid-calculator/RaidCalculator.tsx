import { useState, useMemo } from 'react';
import { TARGETS, RAID_COSTS, RAID_TOOLS, RESOURCES } from './raidCalculatorData';
import type { RaidTargetId, RaidToolId, ResourceId } from './raidCalculatorData';
import './RaidCalculator.css';
import { Trash2, CheckSquare, Square } from 'lucide-react';

export function RaidCalculator() {
  const [cart, setCart] = useState<Record<RaidTargetId, number>>({} as any);

  const addToCart = (id: RaidTargetId) => {
    setCart(prev => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  };

  const setQty = (id: RaidTargetId, qty: number) => {
    setCart(prev => {
      const newCart = { ...prev };
      if (qty <= 0) {
        delete newCart[id];
      } else {
        newCart[id] = qty;
      }
      return newCart;
    });
  };

  const clearCart = () => setCart({} as any);

  const calculations = useMemo(() => {
    const totals: Record<RaidToolId, { qty: number; resources: Record<string, number> }> = {} as any;
    const comboTotals = { items: {} as Record<string, number>, resources: {} as Record<string, number> };
    let totalHp = 0;

    Object.keys(RAID_TOOLS).forEach(type => {
      totals[type as RaidToolId] = { qty: 0, resources: {} };
    });

    Object.entries(cart).forEach(([id, qty]) => {
      const target = TARGETS.find(t => t.id === id);
      if (target) {
        totalHp += target.hp * qty;
      }

      const costs = RAID_COSTS[id as RaidTargetId];
      if (!costs) return;

      if (costs.combo) {
        if (costs.combo.item1) {
          comboTotals.items[costs.combo.item1] = (comboTotals.items[costs.combo.item1] || 0) + (costs.combo.qty1 * qty);
        }
        if (costs.combo.item2) {
          comboTotals.items[costs.combo.item2] = (comboTotals.items[costs.combo.item2] || 0) + (costs.combo.qty2 * qty);
        }
      }
    });

    Object.entries(comboTotals.items).forEach(([toolId, qty]) => {
      const toolCosts = RAID_TOOLS[toolId as RaidToolId]?.costs || {};
      Object.entries(toolCosts).forEach(([resId, amount]) => {
        comboTotals.resources[resId] = (comboTotals.resources[resId] || 0) + (amount * qty);
      });
    });

    const totalExplosives = Object.values(comboTotals.items).reduce((a, b) => a + b, 0);

    return { totals, comboTotals, totalHp, totalExplosives };
  }, [cart]);

  // For the display grid, we can just show the first 6 targets as the image shows, or all of them.
  // The image shows: Stone Wall, Metal Door, Armored Door, Garage Door, Sheet Metal Wall, High External Stone Wall.
  // We have slightly different targets, so we just map the ones we have.
  const displayTargets = TARGETS; 

  // For the explosives list, we show C4, Rockets, Satchels, Explo Ammo, Beancan
  const explosivesList: RaidToolId[] = ['c4', 'rocket', 'satchel', 'explo', 'beancan'];

  // For the resources list, we show Sulfur, GP, LGF, Metal, Scrap
  const resourcesList: ResourceId[] = ['sulfur', 'charcoal', 'lgf', 'metal', 'scrap']; 
  // Wait, charcoal is basically GP cost indicator in standard Rust unless we strictly calculate GP. Let's assume charcoal = GP for now or just display what we have.

  return (
    <div className="raid-calculator">
      <div className="raid-header">
        <div className="header-left">
          <div className="rust-logo-placeholder"></div>
          <h2>RUST <span>RAID CALCULATOR</span></h2>
        </div>
        <div className="header-right">
          <div className="stats-col">
            <div className="stat-row">
              <span className="stat-label">Total HP:</span>
              <span className="stat-value hp-color">{calculations.totalHp}</span>
            </div>
            <div className="stat-row">
              <span className="stat-label">Total Explosives:</span>
              <span className="stat-value explo-color">{calculations.totalExplosives}</span>
            </div>
          </div>
          <div className="total-badge">{calculations.totalExplosives}</div>
        </div>
      </div>
      
      <div className="raid-columns">
        {/* Column 1: TARGET STRUCTURES */}
        <div className="raid-col">
          <div className="col-header">
            <h3>TARGET STRUCTURES</h3>
            <div className="header-actions">
              <button className="icon-btn" onClick={clearCart} title="Clear"><Trash2 size={14} /></button>
            </div>
          </div>
          <div className="targets-grid-3x2">
            {displayTargets.map(target => {
              const isSelected = !!cart[target.id];
              let hpColorClass = 'hp-white';
              if (target.hp >= 800) hpColorClass = 'hp-red';
              if (target.hp === 500) hpColorClass = 'hp-green';

              return (
                <button 
                  key={target.id} 
                  className={`target-card ${isSelected ? 'selected' : ''}`}
                  onClick={() => addToCart(target.id)}
                >
                  <div className="card-icon">{target.icon}</div>
                  <div className="card-name">{target.name}</div>
                  <div className={`card-hp ${hpColorClass}`}>HP {target.hp}</div>
                </button>
              );
            })}
          </div>
          <div className="selected-targets-list">
            {Object.entries(cart).map(([id, qty]) => {
              const target = TARGETS.find(t => t.id === id);
              if (!target) return null;
              return (
                <div key={id} className="selected-row">
                  <div className="qty-selector">
                    <span>{qty}x</span>
                    <div className="qty-arrows">
                       <button onClick={() => setQty(id as RaidTargetId, qty + 1)}>?</button>
                       <button onClick={() => setQty(id as RaidTargetId, qty - 1)}>?</button>
                    </div>
                  </div>
                  <span className="row-icon">{target.icon}</span>
                  <span className="row-name">{target.name}</span>
                  <CheckSquare size={16} className="check-icon" />
                </div>
              );
            })}
          </div>
        </div>

        {/* Column 2: EXPLOSIVES REQUIRED */}
        <div className="raid-col mid-col">
          <div className="col-header">
            <h3>EXPLOSIVES REQUIRED</h3>
          </div>
          <div className="explosives-list">
            {explosivesList.map(toolId => {
              const tool = RAID_TOOLS[toolId];
              const qty = calculations.comboTotals.items[toolId] || 0;
              return (
                <div key={toolId} className="explosive-row">
                  <div className="ex-icon-box">
                    <span className="ex-icon">{tool?.icon}</span>
                    <span className="ex-static-qty">x{qty}</span>
                  </div>
                  <div className="ex-details">
                    <div className="ex-name">{tool?.name}</div>
                    <div className="ex-input-wrap">
                      <span className="prefix">x</span>
                      <input type="number" value={qty} readOnly className="ex-input" />
                    </div>
                  </div>
                  {qty > 0 ? <CheckSquare size={16} className="check-icon" /> : <Square size={16} className="uncheck-icon" />}
                </div>
              );
            })}
          </div>
        </div>

        {/* Column 3: PLANNING & COST */}
        <div className="raid-col right-col">
          <div className="col-header">
            <h3>PLANNING & COST</h3>
          </div>
          <div className="resources-section">
            <h4 className="sub-title">TOTAL RESOURCES:</h4>
            <div className="resources-list">
              {resourcesList.map(resId => {
                const res = RESOURCES[resId];
                const amount = calculations.comboTotals.resources[resId] || 0;
                return (
                  <div key={resId} className="resource-row">
                    <div className="res-left">
                      <span className="res-icon">{res?.icon}</span>
                      <span className="res-name">{res?.name}</span>
                    </div>
                    <div className="res-amount">{amount}</div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="raid-path-section">
            <h4 className="sub-title">RE Raid Path:</h4>
            <textarea className="raid-path-input" placeholder="Text Raid Path..."></textarea>
          </div>
          <button className="btn-berechnen">BERECHNEN</button>
        </div>
      </div>
    </div>
  );
}
