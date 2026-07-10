import { useState, useMemo } from 'react';
import { TARGETS, RAID_COSTS, RAID_TOOLS, RESOURCES } from './raidCalculatorData';
import type { RaidTargetId, RaidToolId, ResourceId } from './raidCalculatorData';
import './RaidCalculator.css';
import { Minus, Plus, Trash2 } from 'lucide-react';

export function RaidCalculator() {
  const [cart, setCart] = useState<Record<RaidTargetId, number>>({} as any);

  const addToCart = (id: RaidTargetId) => {
    setCart(prev => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  };

  const removeFromCart = (id: RaidTargetId) => {
    setCart(prev => {
      const newCart = { ...prev };
      if (newCart[id] > 1) {
        newCart[id] -= 1;
      } else {
        delete newCart[id];
      }
      return newCart;
    });
  };

  const clearCart = () => setCart({} as any);

  const cartItemsCount = Object.values(cart).reduce((a, b) => a + b, 0);

  const calculations = useMemo(() => {
    const totals: Record<RaidToolId, { qty: number; resources: Record<string, number> }> = {} as any;
    const comboTotals = { items: {} as Record<string, number>, resources: {} as Record<string, number> };

    Object.keys(RAID_TOOLS).forEach(type => {
      totals[type as RaidToolId] = { qty: 0, resources: {} };
    });

    Object.entries(cart).forEach(([id, qty]) => {
      const costs = RAID_COSTS[id as RaidTargetId];
      if (!costs) return;

      Object.keys(RAID_TOOLS).forEach(toolId => {
        if (costs[toolId]) {
          totals[toolId as RaidToolId].qty += costs[toolId] * qty;
        }
      });

      if (costs.combo) {
        if (costs.combo.item1) {
          comboTotals.items[costs.combo.item1] = (comboTotals.items[costs.combo.item1] || 0) + (costs.combo.qty1 * qty);
        }
        if (costs.combo.item2) {
          comboTotals.items[costs.combo.item2] = (comboTotals.items[costs.combo.item2] || 0) + (costs.combo.qty2 * qty);
        }
      }
    });

    Object.entries(totals).forEach(([toolId, data]) => {
      if (data.qty > 0) {
        const toolCosts = RAID_TOOLS[toolId as RaidToolId].costs;
        Object.entries(toolCosts).forEach(([resId, amount]) => {
          data.resources[resId] = (data.resources[resId] || 0) + (amount * data.qty);
        });
      }
    });

    Object.entries(comboTotals.items).forEach(([toolId, qty]) => {
      const toolCosts = RAID_TOOLS[toolId as RaidToolId]?.costs || {};
      Object.entries(toolCosts).forEach(([resId, amount]) => {
        comboTotals.resources[resId] = (comboTotals.resources[resId] || 0) + (amount * qty);
      });
    });

    return { totals, comboTotals };
  }, [cart]);

  return (
    <div className="raid-calculator">
      <div className="raid-calc-header">
        <h2>RAID CALCULATOR</h2>
        <p className="subtitle">Select target structures to calculate explosive costs.</p>
      </div>
      
      <div className="raid-calc-grid">
        <div className="targets-panel tactical-panel">
          <h3>TARGET STRUCTURES</h3>
          <div className="targets-grid">
            {TARGETS.map(target => (
              <button 
                key={target.id} 
                className="target-btn tactical-btn"
                onClick={() => addToCart(target.id)}
              >
                <span className="target-icon">{target.icon}</span>
                <span className="target-name">{target.name}</span>
                {cart[target.id] && (
                  <span className="target-badge">{cart[target.id]}</span>
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="cart-panel tactical-panel">
          <div className="cart-header">
            <h3>RAID PLAN ({cartItemsCount} ITEMS)</h3>
            {cartItemsCount > 0 && (
              <button className="clear-btn" onClick={clearCart} title="Clear Plan">
                <Trash2 size={16} />
              </button>
            )}
          </div>
          
          {cartItemsCount === 0 ? (
            <div className="empty-cart">
              <p>No structures selected.</p>
            </div>
          ) : (
            <div className="cart-items">
              {Object.entries(cart).map(([id, qty]) => {
                const target = TARGETS.find(t => t.id === id);
                if (!target) return null;
                return (
                  <div key={id} className="cart-item">
                    <span className="cart-item-icon">{target.icon}</span>
                    <span className="cart-item-name">{target.name}</span>
                    <div className="cart-item-controls">
                      <button onClick={() => removeFromCart(target.id as RaidTargetId)}><Minus size={14}/></button>
                      <span className="qty">{qty}</span>
                      <button onClick={() => addToCart(target.id as RaidTargetId)}><Plus size={14}/></button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {cartItemsCount > 0 && (
            <div className="costs-summary">
              <h4>EXPLOSIVES REQUIRED (COMBO)</h4>
              <div className="combo-items">
                {Object.entries(calculations.comboTotals.items).map(([toolId, qty]) => {
                  const tool = RAID_TOOLS[toolId as RaidToolId];
                  return (
                    <div key={toolId} className="combo-item tactical-chip">
                      <span className="icon">{tool?.icon}</span>
                      <span className="name">{tool?.name}</span>
                      <span className="qty">x{qty}</span>
                    </div>
                  );
                })}
              </div>

              <h4>RESOURCE COST</h4>
              <div className="resource-costs">
                {Object.entries(calculations.comboTotals.resources)
                  .sort((a, b) => (RESOURCES[a[0] as ResourceId]?.order || 99) - (RESOURCES[b[0] as ResourceId]?.order || 99))
                  .map(([resId, amount]) => {
                    const res = RESOURCES[resId as ResourceId];
                    return (
                      <div key={resId} className="resource-item">
                        <span className="icon">{res?.icon}</span>
                        <span className="name">{res?.name}</span>
                        <span className="amount">{amount.toLocaleString()}</span>
                      </div>
                    );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
