import React, { useState } from 'react';
import { useStore } from '../lib/store';
import { Card, Badge, Button, Select, EmptyState } from '../components/ui';
import { formatCurrency } from '../lib/data';
import { ShoppingBag, Truck, CheckCircle2, Clock, RefreshCw, XCircle } from 'lucide-react';

export default function AdminOrders() {
  const { orders, updateOrderStatus } = useStore();
  const [statusFilter, setStatusFilter] = useState('All');

  const statuses = ['All', 'Confirmed', 'Processing', 'Dispatched', 'Delivered', 'Cancelled'];

  const filteredOrders = orders.filter((o) => {
    if (statusFilter === 'All') return true;
    return o.order_status === statusFilter;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Confirmed': return <Badge variant="outline">Confirmed</Badge>;
      case 'Processing': return <Badge variant="accent">Processing</Badge>;
      case 'Dispatched': return <Badge variant="brand">Dispatched</Badge>;
      case 'Delivered': return <Badge variant="brand">Delivered</Badge>;
      case 'Cancelled': return <span className="bg-red-500/20 text-red-400 font-mono text-[10px] uppercase px-2.5 py-1 rounded-full">Cancelled</span>;
      default: return <Badge variant="muted">{status}</Badge>;
    }
  };

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-display font-semibold text-ink">Order Fulfillment</h1>
        <p className="text-ink-muted text-sm font-mono mt-1">Manage customer purchases, update shipping statuses, and process returns.</p>
      </div>

      {/* Status Filter Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {statuses.map((s) => (
          <button
            key={s}
            onClick={() => setStatusFilter(s)}
            className={`px-4 py-2 font-mono text-xs rounded-[2px] whitespace-nowrap cursor-pointer transition-colors ${
              statusFilter === s ? 'bg-brand text-ink font-bold' : 'bg-paper-surface border border-line text-ink-muted hover:text-ink'
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      {/* Orders List */}
      {filteredOrders.length === 0 ? (
        <EmptyState title="No orders found" description="There are no orders matching the selected status filter." />
      ) : (
        <div className="flex flex-col gap-4">
          {filteredOrders.map((order) => (
            <Card key={order.id} className="flex flex-col gap-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-line">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-soft border border-line flex items-center justify-center font-mono font-bold text-brand">
                    <ShoppingBag size={20} />
                  </div>
                  <div>
                    <span className="font-mono text-xs text-brand font-bold">{order.id}</span>
                    <p className="font-mono text-[11px] text-ink-muted">
                      {new Date(order.created_at).toLocaleString()} • {order.payment_method} ({order.payment_status})
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex flex-col items-end">
                    <span className="font-mono text-xs text-ink-muted">Total Amount</span>
                    <span className="font-display font-bold text-lg text-ink">{formatCurrency(order.total_amount)}</span>
                  </div>
                  {getStatusBadge(order.order_status)}
                </div>
              </div>

              {/* Items Summary */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-3">
                  <span className="font-mono text-xs uppercase text-ink-muted">Ordered Items</span>
                  <div className="flex flex-col gap-2">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between bg-paper p-3 rounded-[2px] border border-line">
                        <div className="flex flex-col">
                          <span className="font-body text-sm font-bold text-ink">{item.title}</span>
                          <span className="font-mono text-xs text-ink-muted">
                            Size: {item.size} | Color: {item.color} | Qty: {item.quantity}
                          </span>
                        </div>
                        <span className="font-mono text-xs text-ink">{formatCurrency(item.price * item.quantity)}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Shipping & Status Control */}
                <div className="flex flex-col justify-between bg-paper p-4 rounded-[2px] border border-line gap-4">
                  <div>
                    <span className="font-mono text-xs uppercase text-ink-muted block mb-1">Shipping Address</span>
                    <p className="font-body text-sm text-ink">{order.shipping_address}</p>
                  </div>

                  <div className="flex flex-col gap-2 pt-4 border-t border-line">
                    <span className="font-mono text-xs uppercase text-ink-muted">Update Fulfillment Status</span>
                    <div className="flex gap-2">
                      <select
                        value={order.order_status}
                        onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                        className="bg-paper-surface border border-line text-ink px-4 py-2.5 rounded-[2px] font-mono text-xs outline-none focus:border-brand flex-grow"
                      >
                        <option value="Confirmed">Confirmed</option>
                        <option value="Processing">Processing</option>
                        <option value="Dispatched">Dispatched</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                      <Button variant="secondary" className="px-4 py-2 text-xs">
                        Save
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
