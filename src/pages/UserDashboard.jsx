import React from 'react';
import { useStore } from '../lib/store';
import { formatCurrency } from '../lib/data';
import { Card, Stat, Badge, Button } from '../components/ui';
import { Package, Heart, Award, MapPin, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function UserDashboard() {
  const { user, orders, wishlist } = useStore();

  const userOrders = orders.filter((o) => o.user_id === user.id || o.user_id === 'usr-customer');
  const recentOrder = userOrders[0];

  return (
    <div className="flex flex-col gap-8">
      {/* Welcome Banner */}
      <Card className="bg-gradient-to-r from-paper-surface to-soft p-8 border-brand/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex flex-col gap-2">
          <Badge variant="brand" className="self-start">Aura Member</Badge>
          <h1 className="text-3xl font-display font-bold text-ink">Welcome back, {user.name}</h1>
          <p className="text-ink-muted text-sm font-mono">Manage your orders, saved addresses, and loyalty rewards.</p>
        </div>
        <div className="flex items-center gap-4 bg-paper p-4 border border-line rounded-[2px]">
          <Award size={28} className="text-brand" />
          <div className="flex flex-col">
            <span className="font-mono text-[10px] text-ink-muted uppercase">Loyalty Balance</span>
            <span className="font-display text-2xl font-bold text-ink">{user.loyalty_points || 450} Pts</span>
          </div>
        </div>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <Stat label="Total Orders" value={userOrders.length} icon={Package} change="+1 this month" />
        <Stat label="Saved Wishlist" value={wishlist.length} icon={Heart} />
        <Stat label="Rewards Tier" value="Gold Elite" icon={Award} />
      </div>

      {/* Recent Order & Saved Addresses */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Order */}
        <Card className="flex flex-col gap-6 p-6">
          <div className="flex items-center justify-between border-b border-line pb-4">
            <h3 className="font-display text-xl text-ink">Recent Order</h3>
            <Link to="/account/orders" className="font-mono text-xs text-brand hover:underline flex items-center gap-1">
              View All <ArrowRight size={14} />
            </Link>
          </div>

          {recentOrder ? (
            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-center font-mono text-xs">
                <span className="text-ink-muted">Order ID: <strong className="text-ink">{recentOrder.id}</strong></span>
                <Badge variant={recentOrder.order_status === 'Dispatched' ? 'brand' : 'outline'}>
                  {recentOrder.order_status}
                </Badge>
              </div>
              <div className="flex flex-col gap-2 bg-paper p-4 rounded-[2px] border border-line">
                {recentOrder.items.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center text-sm">
                    <span className="font-body text-ink">{item.title} (x{item.quantity})</span>
                    <span className="font-mono text-xs text-ink font-bold">{formatCurrency(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>
              <div className="flex justify-between items-center font-mono text-xs pt-2">
                <span className="text-ink-muted">Total Amount:</span>
                <span className="text-brand font-bold text-base">{formatCurrency(recentOrder.total_amount)}</span>
              </div>
            </div>
          ) : (
            <p className="text-ink-muted text-sm">No recent orders found.</p>
          )}
        </Card>

        {/* Saved Addresses */}
        <Card className="flex flex-col gap-6 p-6">
          <div className="flex items-center justify-between border-b border-line pb-4">
            <h3 className="font-display text-xl text-ink">Saved Addresses</h3>
            <MapPin size={20} className="text-brand" />
          </div>

          <div className="flex flex-col gap-4">
            {user.addresses && user.addresses.length > 0 ? (
              user.addresses.map((addr, idx) => (
                <div key={idx} className="p-4 bg-paper border border-line rounded-[2px] flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs uppercase text-brand font-bold">Default Shipping Address</span>
                    <span className="font-mono text-[10px] text-ink-muted">Primary</span>
                  </div>
                  <p className="font-body text-sm text-ink">{addr}</p>
                </div>
              ))
            ) : (
              <p className="text-ink-muted text-sm">No saved addresses found.</p>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
