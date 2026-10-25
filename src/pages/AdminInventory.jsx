import React, { useState } from 'react';
import { useStore } from '../lib/store';
import { Card, Badge, Button, Input, Modal, EmptyState } from '../components/ui';
import { formatCurrency } from '../lib/data';
import { Layers, AlertTriangle, RefreshCw, CheckCircle2 } from 'lucide-react';

export default function AdminInventory() {
  const { products, updateProduct } = useStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [newStockQty, setNewStockQty] = useState('');

  const filteredProducts = products.filter((p) =>
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) || p.sku.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const lowStockThreshold = 25;
  const lowStockProducts = products.filter((p) => p.stock_quantity <= lowStockThreshold);

  const handleStockUpdate = (e) => {
    e.preventDefault();
    if (!selectedProduct) return;
    updateProduct(selectedProduct.id, { stock_quantity: Number(newStockQty) });
    setSelectedProduct(null);
    setNewStockQty('');
  };

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-display font-semibold text-ink">Inventory Control</h1>
        <p className="text-ink-muted text-sm font-mono mt-1">Track stock levels across warehouses and manage size/color matrices.</p>
      </div>

      {/* Warehouse Overview Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <Card className="flex flex-col gap-2">
          <span className="font-mono text-xs uppercase text-ink-muted">Total SKUs Tracked</span>
          <span className="font-display text-3xl font-bold text-ink">{products.length}</span>
        </Card>
        <Card className="flex flex-col gap-2">
          <span className="font-mono text-xs uppercase text-ink-muted">Low Stock Alerts</span>
          <span className="font-display text-3xl font-bold text-red-400">{lowStockProducts.length} SKUs</span>
        </Card>
        <Card className="flex flex-col gap-2">
          <span className="font-mono text-xs uppercase text-ink-muted">Warehouse Hub</span>
          <span className="font-display text-xl font-bold text-ink">Lahore Central & Isb Hub</span>
        </Card>
      </div>

      {/* Low Stock Warning Banner */}
      {lowStockProducts.length > 0 && (
        <div className="bg-red-500/10 border border-red-500/30 p-6 rounded-[4px] flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <AlertTriangle size={24} className="text-red-400 shrink-0" />
            <div>
              <h3 className="font-display font-semibold text-lg text-ink">Low Stock Warning</h3>
              <p className="font-body text-sm text-ink-muted">The following items are running low on stock and require re-stocking soon.</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-2">
            {lowStockProducts.map((item) => (
              <div key={item.id} className="bg-paper p-4 rounded-[2px] border border-red-500/20 flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="font-body font-bold text-sm text-ink truncate max-w-[180px]">{item.title}</span>
                  <span className="font-mono text-xs text-brand">{item.sku}</span>
                </div>
                <span className="font-mono text-xs bg-red-500/20 text-red-400 px-2 py-1 rounded-[2px]">
                  {item.stock_quantity} left
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Inventory Table */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h3 className="font-display text-xl font-semibold text-ink">Stock Matrix & Warehouses</h3>
          <input
            type="text"
            placeholder="Search SKU or Title..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-paper-surface border border-line text-ink px-4 py-2 rounded-[2px] font-body text-sm outline-none focus:border-brand w-64"
          />
        </div>

        <div className="bg-paper-surface border border-line rounded-[4px] overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-line bg-paper font-mono text-xs text-ink-muted uppercase tracking-wider">
                <th className="p-4">SKU / Item</th>
                <th className="p-4">Category</th>
                <th className="p-4">Sizes Available</th>
                <th className="p-4">Colors</th>
                <th className="p-4">Stock Level</th>
                <th className="p-4 text-right">Quick Restock</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line font-body text-sm">
              {filteredProducts.map((p) => (
                <tr key={p.id} className="hover:bg-soft transition-colors">
                  <td className="p-4">
                    <div className="flex flex-col">
                      <span className="font-bold text-ink">{p.title}</span>
                      <span className="font-mono text-xs text-brand">{p.sku}</span>
                    </div>
                  </td>
                  <td className="p-4 font-mono text-xs text-ink-muted">{p.category}</td>
                  <td className="p-4 font-mono text-xs text-ink">{Array.isArray(p.sizes) ? p.sizes.join(', ') : p.sizes}</td>
                  <td className="p-4 font-mono text-xs text-ink">{Array.isArray(p.colors) ? p.colors.join(', ') : p.colors}</td>
                  <td className="p-4 font-mono text-xs">
                    <span className={`px-2 py-1 rounded-[2px] font-bold ${p.stock_quantity <= lowStockThreshold ? 'bg-red-500/20 text-red-400' : 'bg-soft text-emerald-400'}`}>
                      {p.stock_quantity} units
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <Button
                      variant="outline"
                      className="px-3 py-1.5 text-xs"
                      onClick={() => {
                        setSelectedProduct(p);
                        setNewStockQty(p.stock_quantity);
                      }}
                    >
                      Update Stock
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Stock Update Modal */}
      <Modal
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
        title={`Update Stock: ${selectedProduct?.title}`}
      >
        <form onSubmit={handleStockUpdate} className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <span className="font-mono text-xs text-ink-muted uppercase">SKU: {selectedProduct?.sku}</span>
            <Input
              label="New Stock Quantity"
              type="number"
              required
              value={newStockQty}
              onChange={(e) => setNewStockQty(e.target.value)}
              placeholder="Enter quantity..."
            />
          </div>
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-line">
            <Button type="button" variant="secondary" onClick={() => setSelectedProduct(null)}>
              Cancel
            </Button>
            <Button type="submit">
              Save Stock Level
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
