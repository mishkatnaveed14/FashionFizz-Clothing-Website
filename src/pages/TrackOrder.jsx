import React, { useState } from 'react';
import { useStore } from '../lib/store';
import { Input, Button, Card, Reveal, SectionTitle } from '../components/ui';
import { Search, PackageCheck, Truck, CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import { formatCurrency } from '../lib/data';

export default function TrackOrder() {
  const { trackOrder, notify } = useStore();
  const [searchId, setSearchId] = useState('');
  const [order, setOrder] = useState(null);
  const [searched, setSearched] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchId.trim()) {
      notify('Please enter a valid Order ID', 'error');
      return;
    }
    const found = trackOrder(searchId.trim());
    setOrder(found || null);
    setSearched(true);
    if (!found) {
      notify('Order not found. Please check your ID.', 'error');
    }
  };

  const statuses = ['Confirmed', 'Processing', 'Dispatched', 'Delivered'];
  const getCurrentStepIndex = (status) => {
    const idx = statuses.indexOf(status);
    return idx >= 0 ? idx : 0;
  };

  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <SectionTitle
        subtitle="Live Delivery Status"
        title="Track Your Order"
      />

      <Reveal className="mb-12">
        <Card className="p-8">
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4 items-end">
            <div className="flex-grow w-full">
              <Input
                label="Order ID (e.g., ORD-98421)"
                placeholder="Enter your order tracking ID"
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
              />
            </div>
            <Button type="submit" className="w-full sm:w-auto h-[50px]">
              <Search size={16} className="mr-2" /> Track Order
            </Button>
          </form>
        </Card>
      </Reveal>

      {searched && order && (
        <Reveal>
          <Card className="p-8 space-y-8 border-brand/50">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-line">
              <div>
                <span className="font-mono text-xs text-brand uppercase tracking-widest block mb-1">Order Summary</span>
                <h3 className="text-2xl font-display font-bold text-ink">{order.id}</h3>
                <span className="text-ink-muted text-xs font-mono">Placed on {new Date(order.created_at).toLocaleDateString()}</span>
              </div>
              <div className="text-right">
                <span className="font-mono text-xs text-ink-muted block">Total Amount</span>
                <span className="font-mono text-lg font-bold text-ink">{formatCurrency(order.total_amount)}</span>
              </div>
            </div>

            {/* Progress Stepper */}
            <div>
              <h4 className="font-mono text-xs text-ink-muted uppercase tracking-wider mb-6">Delivery Progress</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {statuses.map((status, idx) => {
                  const currentIdx = getCurrentStepIndex(order.order_status);
                  const isCompleted = idx <= currentIdx;
                  const isCurrent = idx === currentIdx;

                  return (
                    <div
                      key={status}
                      className={`flex flex-col gap-2 p-4 rounded-[4px] border ${
                        isCurrent
                          ? 'border-brand bg-brand/10'
                          : isCompleted
                          ? 'border-chrome/50 bg-paper'
                          : 'border-line bg-paper/50 opacity-50'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-xs text-ink-muted">0{idx + 1}</span>
                        {isCompleted ? <CheckCircle2 size={16} className="text-brand" /> : <Clock size={16} className="text-ink-muted" />}
                      </div>
                      <span className="font-display font-semibold text-ink text-sm">{status}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Shipping Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-line">
              <div>
                <h5 className="font-mono text-xs text-ink-muted uppercase tracking-wider mb-2">Shipping Address</h5>
                <p className="font-body text-sm text-ink">{order.shipping_address}</p>
              </div>
              <div>
                <h5 className="font-mono text-xs text-ink-muted uppercase tracking-wider mb-2">Payment Method</h5>
                <p className="font-body text-sm text-ink">{order.payment_method} ({order.payment_status})</p>
              </div>
            </div>

            {/* Items List */}
            <div>
              <h5 className="font-mono text-xs text-ink-muted uppercase tracking-wider mb-4">Ordered Items</h5>
              <div className="space-y-3">
                {order.items.map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-paper border border-line rounded-[2px]">
                    <div>
                      <p className="font-display text-sm font-semibold text-ink">{item.title}</p>
                      <p className="font-mono text-xs text-ink-muted">Size: {item.size} | Color: {item.color} | Qty: {item.quantity}</p>
                    </div>
                    <span className="font-mono text-sm text-ink font-bold">{formatCurrency(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </Reveal>
      )}

      {searched && !order && (
        <Reveal>
          <div className="p-8 bg-paper-surface border border-red-500/50 text-center rounded-[4px]">
            <AlertCircle size={32} className="text-red-500 mx-auto mb-3" />
            <h3 className="font-display text-xl text-ink mb-1">Order Not Found</h3>
            <p className="text-ink-muted text-sm">We could not locate an order with ID "{searchId}". Please verify and try again.</p>
          </div>
        </Reveal>
      )}
    </div>
  );
}
