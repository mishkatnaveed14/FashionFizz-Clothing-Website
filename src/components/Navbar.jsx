import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '../lib/store';
import { Search, ShoppingBag, Heart, User, Menu, X, ShieldCheck, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import BrandLogo from './BrandLogo';

export default function Navbar() {
  const { user, cart, wishlist, logout } = useStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const wishlistCount = wishlist.length;

  useEffect(() => {
    if (!mobileMenuOpen) return undefined;
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setMobileMenuOpen(false);
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', closeOnEscape);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', closeOnEscape);
    };
  }, [mobileMenuOpen]);

  const toggleCart = () => {
    window.dispatchEvent(new CustomEvent('toggle-cart'));
  };

  const toggleSearch = () => {
    window.dispatchEvent(new CustomEvent('toggle-search'));
  };

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-line/80 bg-paper/90 backdrop-blur-xl">
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Left: Mobile menu trigger & Brand */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
            className="lg:hidden text-ink hover:text-brand transition-colors cursor-pointer"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <Link to="/" aria-label="FashionFizz home" className="group">
            <BrandLogo />
          </Link>
        </div>

        {/* Center: Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-8">
          <Link to="/" className="font-body text-xs font-medium text-ink hover:text-brand transition-colors">
            Home
          </Link>
          <Link to="/collections/unstitched" className="font-body text-xs font-medium text-ink hover:text-brand transition-colors">
            Unstitched
          </Link>
          <Link to="/collections/ready-to-wear" className="font-body text-xs font-medium text-ink hover:text-brand transition-colors">
            Pret
          </Link>
          <Link to="/collections/men-and-kids" className="font-body text-xs font-medium text-ink hover:text-brand transition-colors">
            Men & Kids
          </Link>
          <Link to="/collections/home-and-fragrances" className="font-body text-xs font-medium text-ink hover:text-brand transition-colors">
            Home & Fragrances
          </Link>
          <Link to="/sale" className="font-body text-xs font-semibold text-brand hover:opacity-80 transition-opacity">
            Sale 50%
          </Link>
        </nav>

        {/* Right: Actions (Search, Wishlist, Cart, User) */}
        <div className="flex items-center gap-3 sm:gap-5">
          <button
            onClick={toggleSearch}
            className="max-[440px]:hidden text-ink-muted hover:text-ink transition-colors cursor-pointer"
            title="Search Products"
          >
            <Search size={20} />
          </button>

          <Link
            to={user ? (user.role === 'Admin' ? '/admin/dashboard' : '/account/wishlist') : '/login'}
            className="max-[440px]:hidden relative text-ink-muted hover:text-ink transition-colors"
            title="Wishlist"
          >
            <Heart size={20} />
            {wishlistCount > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-brand text-ink font-mono text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </Link>

          <button
            onClick={toggleCart}
            className="relative text-ink hover:text-brand transition-colors cursor-pointer"
            title="Shopping Cart"
          >
            <ShoppingBag size={20} />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-brand text-ink font-mono text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>

          {/* User Account Menu */}
          <div className="relative max-[360px]:hidden">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 bg-paper-surface border border-line px-3 py-1.5 rounded-[2px] hover:border-brand transition-colors cursor-pointer"
                >
                  <User size={16} className="text-brand" />
                  <span className="font-mono text-xs text-ink hidden sm:inline">{user.name.split(' ')[0]}</span>
                </button>

                <AnimatePresence>
                  {userDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute right-0 mt-2 w-48 bg-paper-surface border border-line rounded-[4px] shadow-2xl py-2 z-50"
                    >
                      <div className="px-4 py-2 border-b border-line mb-1">
                        <p className="font-mono text-xs text-ink font-bold truncate">{user.name}</p>
                        <p className="font-mono text-[10px] text-ink-muted capitalize">{user.role}</p>
                      </div>

                      {user.role === 'Admin' ? (
                        <Link
                          to="/admin/dashboard"
                          onClick={() => setUserDropdownOpen(false)}
                          className="flex items-center gap-2 px-4 py-2 text-xs font-mono text-ink hover:bg-soft transition-colors"
                        >
                          <ShieldCheck size={14} className="text-brand" /> Admin Deck
                        </Link>
                      ) : (
                        <Link
                          to="/account/dashboard"
                          onClick={() => setUserDropdownOpen(false)}
                          className="flex items-center gap-2 px-4 py-2 text-xs font-mono text-ink hover:bg-soft transition-colors"
                        >
                          <User size={14} className="text-brand" /> My Dashboard
                        </Link>
                      )}

                      <Link
                        to="/track-order"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2 px-4 py-2 text-xs font-mono text-ink hover:bg-soft transition-colors"
                      >
                        Track Order
                      </Link>

                      <button
                        onClick={() => {
                          setUserDropdownOpen(false);
                          logout();
                          navigate('/');
                        }}
                        className="w-full text-left flex items-center gap-2 px-4 py-2 text-xs font-mono text-red-400 hover:bg-soft transition-colors mt-1 border-t border-line"
                      >
                        Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link
                to="/login"
                className="font-mono text-xs uppercase tracking-wider bg-soft border border-line text-ink px-4 py-2 rounded-[2px] hover:border-brand transition-colors"
              >
                Login
              </Link>
            )}
          </div>

        </div>

      </div>

      </header>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-[60] lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button
              aria-label="Close navigation menu"
              onClick={() => setMobileMenuOpen(false)}
              className="absolute inset-0 h-full w-full cursor-default bg-ink/35 backdrop-blur-[2px]"
            />
            <motion.aside
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-y-0 left-0 flex h-full w-[min(86vw,380px)] flex-col overflow-y-auto border-r border-line bg-paper-surface shadow-[20px_0_70px_rgba(31,33,30,0.16)]"
            >
              <div className="flex items-center justify-between border-b border-line px-6 py-5">
                <Link to="/" onClick={() => setMobileMenuOpen(false)} aria-label="FashionFizz home">
                  <BrandLogo />
                </Link>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  aria-label="Close navigation menu"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink-muted hover:border-brand hover:text-brand"
                >
                  <X size={19} />
                </button>
              </div>
              <div className="flex flex-col gap-1 px-6 py-7">
                <span className="mb-3 font-body text-[10px] font-semibold uppercase tracking-[0.22em] text-ink-muted">Explore the edit</span>
                {[
                  ['New Arrivals', '/collections/unstitched'],
                  ['Unstitched Fabrics', '/collections/unstitched'],
                  ['Ready to Wear', '/collections/ready-to-wear'],
                  ['Men & Kids', '/collections/men-and-kids'],
                  ['Home & Fragrances', '/collections/home-and-fragrances'],
                  ['Seasonal Sale', '/sale']
                ].map(([label, path], index) => (
                  <Link
                    key={label}
                    to={path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`group flex items-center justify-between border-b border-line/80 py-4 font-display text-[21px] text-ink hover:pl-2 hover:text-brand ${index === 5 ? 'text-brand' : ''}`}
                  >
                    {label}
                    <ArrowUpRight aria-hidden="true" size={17} className="opacity-0 transition-opacity group-hover:opacity-100" />
                  </Link>
                ))}
              </div>
              <div className="mt-auto grid grid-cols-2 gap-3 border-t border-line bg-soft/60 p-6">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    toggleSearch();
                  }}
                  className="flex min-h-12 items-center justify-center gap-2 rounded-full border border-line bg-paper-surface font-body text-xs font-medium text-ink hover:border-brand"
                >
                  <Search size={15} /> Search
                </button>
                <Link
                  to={user ? '/account/wishlist' : '/login'}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex min-h-12 items-center justify-center gap-2 rounded-full border border-line bg-paper-surface font-body text-xs font-medium text-ink hover:border-brand"
                >
                  <Heart size={15} /> Wishlist
                </Link>
                <Link
                  to={user ? (user.role === 'Admin' ? '/admin/dashboard' : '/account/dashboard') : '/login'}
                  onClick={() => setMobileMenuOpen(false)}
                  className="col-span-2 flex min-h-12 items-center justify-center gap-2 rounded-full bg-brand font-body text-xs font-semibold text-white hover:bg-brand/90"
                >
                  <User size={15} /> {user ? 'My Account' : 'Sign in / Create account'}
                </Link>
                <Link
                  to="/track-order"
                  onClick={() => setMobileMenuOpen(false)}
                  className="col-span-2 py-2 text-center font-body text-xs text-ink-muted hover:text-brand"
                >
                  Track your order
                </Link>
              </div>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
