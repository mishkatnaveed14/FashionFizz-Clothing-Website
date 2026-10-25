import React, { useState } from 'react';
import { useStore } from '../lib/store';
import { formatCurrency } from '../lib/data';
import { Card, Badge, Button, Modal, Input, Textarea, Select, EmptyState } from '../components/ui';
import { Package, FileText, RefreshCw, ChevronRight, Clock, CheckCircle2, Truck } from 'lucide-react';

export default function UserOrders() {
  const { orders, notify } = useStore();
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [returnModalOpen, setReturnModalOpen] = useState(false);
  const [returnReason, setReturnReason] = useState('Size Misfit');
  const [returnNotes, setReturnNotes] = useState('');
  const [invoiceModalOpen, setInvoiceModalOpen] = useState(false);
  const [invoiceOrder, setInvoiceOrder] = useState(null);

  const handleReturnSubmit = (e) => {
    e.preventDefault();
    notify('Return & exchange request submitted successfully. Our courier partner will pickup within 48 hours.');
    setReturnModalOpen(false);
    setReturnNotes('');
  };

  if (orders.length === 0) {
    return (
      <EmptyState
        title="No Orders Found"
        description="You haven't placed any orders yet. Explore our exquisite collections to start your fashion journey."
        action={<Button onClick={() => window.location.href = '/collections/unstitched'}>Browse Collections</Button>}
      />
    );
  }

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="font-display text-3xl font-semibold text-ink mb-2">Order History & Invoices</h1>
        <p className="text-ink-muted text-sm font-body">Track past purchases, download invoices, and request hassle-free returns or exchanges.</p>
      </div>

      <div className="flex flex-col gap-4">
        {orders.map((order) => (
          <Card key={order.id} className="flex flex-col gap-6">
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-line">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-soft border border-line flex items-center justify-center text-brand">
                  <Package size={22} />
                </div>
                <div>
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-sm font-bold text-ink">{order.id}</span>
                    <Badge variant={order.order_status === 'Dispatched' ? 'brand' : 'outline'}>
                      {order.order_status}
                    </Badge>
                  </div>
                  <span className="font-mono text-xs text-ink-muted">
                    Placed on {new Date(order.created_at).toLocaleDateString('en-PK', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  onClick={() => {
                    setInvoiceOrder(order);
                    setInvoiceModalOpen(true);
                  }}
                  className="gap-2"
                >
                  <FileText size={14} /> Invoice
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => {
                    setSelectedOrder(order);
                    setReturnModalOpen(true);
                  }}
                  className="gap-2"
                >
                  <RefreshCw size={14} /> Return / Exchange
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {order.items.map((item, idx) => (
                <div key={idx} className="flex items-center gap-3 bg-paper p-3 rounded-[2px] border border-line">
                  <div className="w-12 h-14 bg-soft border border-line flex items-center justify-center font-display text-xs text-ink-muted">
                    FF
                  </div>
                  <div className="flex flex-col flex-grow">
                    <span className="font-body text-xs font-semibold text-ink line-clamp-1">{item.title}</span>
                    <span className="font-mono text-[10px] text-ink-muted">Size: {item.size} | Qty: {item.quantity}</span>
                    <span className="font-mono text-xs text-brand mt-1">{formatCurrency(item.price * item.quantity)}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap items-center justify-between pt-4 border-t border-line text-xs font-mono text-ink-muted">
              <span>Shipping Address: {order.shipping_address}</span>
              <div className="flex items-center gap-4">
                <span>Payment: {order.payment_method} ({order.payment_status})</span>
                <span className="text-ink font-bold text-sm">Total: {formatCurrency(order.total_amount)}</span>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Invoice Modal */}
      <Modal isOpen={invoiceModalOpen} onClose={() => setInvoiceModalOpen(false)} title="Official Tax Invoice">
        {invoiceOrder && (
          <div className="flex flex-col gap-6 font-body text-sm">
            <div className="flex justify-between items-start border-b border-line pb-4">
              <div>
                <h4 className="font-display text-lg font-bold text-ink">FASHIONFIZZ ATELIER</h4>
                <p className="font-mono text-xs text-ink-muted">Gulberg III, Lahore, Pakistan</p>
                <p className="font-mono text-xs text-ink-muted">NTN: 8849201-1 | GST: 32009841</p>
              </div>
              <div className="text-right">
                <span className="font-mono text-xs text-brand block font-bold">{invoiceOrder.id}</span>
                <span className="font-mono text-xs text-ink-muted">{new Date(invoiceOrder.created_at).toLocaleDateString()}</span>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <span className="font-mono text-xs uppercase text-ink-muted">Ship To:</span>
              <p className="text-ink">{invoiceOrder.shipping_address}</p>
            </div>

            <div className="border border-line rounded-[2px] overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-paper-surface border-b border-line font-mono text-xs text-ink-muted">
                    <th className="p-3">Item Description</th>
                    <th className="p-3">Qty</th>
                    <th className="p-3 text-right">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {invoiceOrder.items.map((i, idx) => (
                    <tr key={idx} className="border-b border-line font-mono text-xs">
                      <td className="p-3 text-ink">{i.title} ({i.size})</td>
                      <td className="p-3 text-ink">{i.quantity}</td>
                      <td className="p-3 text-right text-ink">{formatCurrency(i.price * i.quantity)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex justify-between items-center pt-2">
              <span className="font-mono text-xs text-ink-muted">Payment Method: {invoiceOrder.payment_method}</span>
              <div className="flex gap-4 font-mono text-sm">
                <span className="text-ink-muted">Total Amount:</span>
                <span className="font-bold text-brand">{formatCurrency(invoiceOrder.total_amount)}</span>
              </div>
            </div>

            <div className="pt-4 flex justify-end gap-3">
              <Button variant="secondary" onClick={() => window.print()}>Print Invoice</Button>
              <Button onClick={() => setInvoiceModalOpen(false)}>Close</Button>
            </div>
          </div>
        )}
      </Modal>

      {/* Return / Exchange Modal */}
      <Modal isOpen={returnModalOpen} onClose={() => setReturnModalOpen(false)} title="Request Return or Exchange">
        <form onSubmit={handleReturnSubmit} className="flex flex-col gap-4">
          <p className="text-ink-muted text-xs font-body">
            Eligible within 14 days of delivery. Items must be unworn with original tags attached.
          </p>

          <Select
            label="Request Type"
            value={returnReason}
            onChange={(e) => setReturnReason(e.target.value)}
          >
            <option value="Size Misfit">Size Misfit (Exchange)</option>
            <option value="Color Variance">Color Variance (Exchange)</option>
            <option value="Defective Item">Defective Item (Refund / Replacement)</option>
            <option value="Change of Mind">Change of Mind (Store Credit)</option>
          </Select>

          <Textarea
            label="Reason Details & Notes"
            rows={4}
            value={returnNotes}
            onChange={(e) => setReturnNotes(e.target.value)}
            placeholder="Please specify size required or details of defect..."
            required
          />

          <div className="flex justify-end gap-3 mt-4">
            <Button variant="secondary" type="button" onClick={() => setReturnModalOpen(false)}>Cancel</Button>
            <Button type="submit">Submit Request</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
