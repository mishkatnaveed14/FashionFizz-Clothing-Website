import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { LayoutDashboard, Package, ShoppingCart, Warehouse, Tag, ShieldCheck, ArrowUpRight } from 'lucide-react';

export default function AdminLayout() {
  const adminNav = [
    { to: '/admin/dashboard', label: 'Overview', icon: LayoutDashboard },
    { to: '/admin/products', label: 'Products', icon: Package },
    { to: '/admin/orders', label: 'Orders', icon: ShoppingCart },
    { to: '/admin/inventory', label: 'Inventory', icon: Warehouse },
    { to: '/admin/discounts', label: 'Discounts', icon: Tag }
  ];

  return (
    <div className="min-h-screen bg-paper flex flex-col lg:flex-row">
      
      {/* Control Deck Sidebar */}
      <aside className="w-full lg:w-72 bg-paper-surface border-r border-line p-6 flex flex-col justify-between shrink-0">
        <div className="flex flex-col gap-8">
          <div className="flex items-center gap-3 pb-6 border-b border-line">
            <div className="w-10 h-10 bg-brand text-white flex items-center justify-center font-display font-bold">
              <ShieldCheck size={20} />
            </div>
            <div className="flex flex-col">
              <span className="font-display font-bold text-lg text-ink tracking-widest">CONTROL DECK</span>
              <span className="font-mono text-[9px] text-brand uppercase tracking-widest">Admin Workspace</span>
            </div>
          </div>

          <nav className="flex flex-col gap-1.5">
            {adminNav.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
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
          </nav>
        </div>

        <div className="pt-6 border-t border-line mt-6">
          <span className="font-mono text-[10px] text-ink-muted uppercase tracking-widest block">FashionFizz v2.5</span>
          <span className="font-mono text-[9px] text-emerald-400 block mt-1">● Live Database Synchronized</span>
        </div>
      </aside>

      {/* Main Control View */}
      <div className="flex-grow overflow-y-auto p-5 sm:p-7 lg:p-12">
      <div className="mb-8 flex flex-col justify-between gap-4 rounded-2xl bg-[#E8DCC6] p-6 sm:flex-row sm:items-center">
        <div>
          <span className="font-body text-[10px] font-semibold uppercase tracking-[0.2em] text-brand">The FashionFizz atelier</span>
          <h1 className="mt-2 text-3xl text-ink">Your workspace.</h1>
          <p className="mt-1 font-body text-sm text-ink-muted">A clear view of your collections, orders and inventory.</p>
        </div>
        <span className="inline-flex items-center gap-2 font-body text-xs font-medium text-ink-muted">
          Store overview <ArrowUpRight size={15} className="text-brand" />
        </span>
      </div>
      <Outlet />
      </div>

    </div>
  );
}
