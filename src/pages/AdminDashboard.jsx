import React from 'react';
import { useStore } from '../lib/store';
import { formatCurrency } from '../lib/data';
import { Stat, Card, Badge, EmptyState } from '../components/ui';
import { TrendingUp, ShoppingBag, AlertTriangle, Users, DollarSign, PackageCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AdminDashboard() {
  const { products, orders, users } = useStore();

  const totalRevenue = orders.reduce((sum, o) => sum + o.total_amount, 0);
  const totalOrders = orders.length;
  const lowStockProducts = products.filter((p) => p.stock_quantity < 20);
  const totalCustomers = users.filter((u) => u.role === 'Customer').length;

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="font-display text-3xl font-semibold text-ink mb-2">Control Deck Overview</h1>
        <p className="text-ink-muted text-sm font-body">Real-time revenue analytics, inventory health alerts, and recent customer fulfillment transactions.</p>
      </div>

      {/* Stat Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Stat label="Total Revenue" value={formatCurrency(totalRevenue)} change="+14.2%" icon={DollarSign} />
        <Stat label="Total Orders" value={totalOrders} change="+8.1%" icon={ShoppingBag} />
        <Stat label="Registered Customers" value={totalCustomers} change="+12.5%" icon={Users} />
        <Stat label="Low Stock Alerts" value={lowStockProducts.length} change={lowStockProducts.length > 0 ? 'Attention' : 'Optimal'} icon={AlertTriangle} />
      </div>

      {/* Low Stock Warning Section */}
      {lowStockProducts.length > 0 && (
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h3 className="font-display text-xl text-ink flex items-center gap-2">
              <AlertTriangle className="text-red-500" size={20} /> Low Stock Warehouse Warnings
            </h3>
            <Link to="/admin/inventory" className="font-mono text-xs text-brand hover:underline">Manage Inventory →</Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {lowStockProducts.map((p) => (
              <Card key={p.id} className="border-red-500/40 flex flex-col gap-2">
                <div className="flex justify-between items-start">
                  <span className="font-mono text-xs text-brand">{p.sku}</span>
                  <Badge variant="outline">{p.stock_quantity} left</Badge>
                </div>
                <h4 className="font-display text-base font-semibold text-ink line-clamp-1">{p.title}</h4>
                <span className="font-mono text-xs text-ink-muted">{p.category} / {p.sub_category}</span>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Recent Transactions Table */}
      <div className="flex flex-col gap-4 pt-4 border-t border-line">
        <div className="flex items-center justify-between">
          <h3 className="font-display text-xl text-ink">Recent Transactions & Orders</h3>
          <Link to="/admin/orders" className="font-mono text-xs text-brand hover:underline">View All Orders →</Link>
        </div>

        <div className="bg-paper-surface border border-line rounded-[4px] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-soft border-b border-line font-mono text-xs text-ink-muted">
                  <th className="p-4">Order ID</th>
                  <th className="p-4">Shipping Address</th>
                  <th className="p-4">Payment</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Amount</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((o) => (
                  <tr key={o.id} className="border-b border-line hover:bg-soft transition-colors font-mono text-xs">
                    <td className="p-4 font-bold text-ink">{o.id}</td>
                    <td className="p-4 text-ink-muted truncate max-w-xs">{o.shipping_address}</td>
                    <td className="p-4 text-ink">{o.payment_method}</td>
                    <td className="p-4">
                      <Badge variant={o.order_status === 'Dispatched' ? 'brand' : 'outline'}>
                        {o.order_status}
                      </Badge>
                    </td>
                    <td className="p-4 text-right font-bold text-brand">{formatCurrency(o.total_amount)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
