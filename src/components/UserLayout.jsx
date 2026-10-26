import React from 'react';
import { Outlet, NavLink, Link } from 'react-router-dom';
import { useStore } from '../lib/store';
import { LayoutDashboard, ShoppingBag, Heart, Award, ArrowRight } from 'lucide-react';

export default function UserLayout() {
  const { user } = useStore();

  const navItems = [
    { to: '/account/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/account/orders', label: 'Order History', icon: ShoppingBag },
    { to: '/account/wishlist', label: 'My Wishlist', icon: Heart },
    { to: '/account/rewards', label: 'Rewards & Lookbook', icon: Award }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <section className="mb-8 flex flex-col justify-between gap-5 overflow-hidden rounded-2xl bg-[#E8DCC6] p-6 sm:flex-row sm:items-center sm:p-8">
        <div>
          <span className="font-body text-[10px] font-semibold uppercase tracking-[0.2em] text-brand">Your FashionFizz account</span>
          <h1 className="mt-2 text-3xl text-ink sm:text-4xl">Good to see you, {user?.name?.split(' ')[0] || 'again'}.</h1>
          <p className="mt-2 max-w-xl font-body text-sm text-ink-muted">Your orders, saved pieces and rewards—together in one place.</p>
        </div>
        <Link to="/collections/ready-to-wear" className="inline-flex shrink-0 items-center gap-2 rounded-full bg-brand px-5 py-3 font-body text-xs font-semibold text-white hover:bg-[#7E3146]">
          Continue exploring <ArrowRight size={15} />
        </Link>
      </section>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Sidebar Navigation */}
        <div className="lg:col-span-1 flex flex-col gap-6">
          <div className="bg-paper-surface border border-line p-6 rounded-[4px] flex items-center gap-4">
            <div className="w-12 h-12 bg-brand/10 border border-brand/30 rounded-full flex items-center justify-center text-brand font-display font-bold text-xl">
              {user?.name?.[0] || 'U'}
            </div>
            <div className="flex flex-col overflow-hidden">
              <span className="font-display font-bold text-lg text-ink truncate">{user?.name}</span>
              <span className="font-mono text-xs text-brand">{user?.loyalty_points || 0} Points</span>
            </div>
          </div>

          <div className="bg-paper-surface border border-line p-2 rounded-[4px] flex flex-col gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded-[2px] font-mono text-xs uppercase tracking-wider transition-all ${
                      isActive
                        ? 'bg-brand text-white font-bold'
                        : 'text-ink-muted hover:text-ink hover:bg-soft'
                    }`
                  }
                >
                  <Icon size={16} />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </div>
        </div>

        {/* Main Content Outlet */}
        <div className="lg:col-span-3">
          <Outlet />
        </div>

      </div>
    </div>
  );
}
