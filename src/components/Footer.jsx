import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../lib/store';
import { Button, Input } from './ui';
import { Send, Camera, Share2, Globe, Video } from 'lucide-react';
import BrandLogo from './BrandLogo';

export default function Footer() {
  const { notify } = useStore();
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      notify('Please enter a valid email address', 'error');
      return;
    }
    notify('Successfully subscribed to FashionFizz newsletter!');
    setEmail('');
  };

  return (
    <footer className="border-t border-line bg-[#F1EDE5] pb-10 pt-14 text-ink">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 pb-16 border-b border-line">
          
          {/* Brand Column */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <Link to="/" aria-label="FashionFizz home" className="w-fit">
              <BrandLogo />
            </Link>
            <p className="text-ink-muted text-sm leading-relaxed max-w-sm">
              Discover the finest Pakistani unstitched fabrics, luxury pret, festive menswear, and aromatic signatures curated for the global connoisseur.
            </p>
            <div className="flex items-center gap-4 text-ink-muted">
              <a href="#instagram" className="w-10 h-10 rounded-[2px] bg-paper border border-line flex items-center justify-center hover:text-brand hover:border-brand transition-colors">
                <Camera size={18} />
              </a>
              <a href="#facebook" className="w-10 h-10 rounded-[2px] bg-paper border border-line flex items-center justify-center hover:text-brand hover:border-brand transition-colors">
                <Share2 size={18} />
              </a>
              <a href="#twitter" className="w-10 h-10 rounded-[2px] bg-paper border border-line flex items-center justify-center hover:text-brand hover:border-brand transition-colors">
                <Globe size={18} />
              </a>
              <a href="#youtube" className="w-10 h-10 rounded-[2px] bg-paper border border-line flex items-center justify-center hover:text-brand hover:border-brand transition-colors">
                <Video size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-4">
            <h4 className="font-mono text-xs uppercase tracking-[0.2em] text-brand font-bold">Collections</h4>
            <div className="flex flex-col gap-2.5">
              <Link to="/collections/unstitched" className="text-sm text-ink-muted hover:text-ink transition-colors">Unstitched Fabrics</Link>
              <Link to="/collections/ready-to-wear" className="text-sm text-ink-muted hover:text-ink transition-colors">Ready to Wear (Pret)</Link>
              <Link to="/collections/men-and-kids" className="text-sm text-ink-muted hover:text-ink transition-colors">Men & Kids Festive</Link>
              <Link to="/collections/home-and-fragrances" className="text-sm text-ink-muted hover:text-ink transition-colors">Home & Fragrances</Link>
              <Link to="/sale" className="text-sm text-brand font-semibold hover:opacity-80">Seasonal Sale 50%</Link>
            </div>
          </div>

          {/* Customer Care */}
          <div className="flex flex-col gap-4">
            <h4 className="font-mono text-xs uppercase tracking-[0.2em] text-brand font-bold">Customer Care</h4>
            <div className="flex flex-col gap-2.5">
              <Link to="/track-order" className="text-sm text-ink-muted hover:text-ink transition-colors">Track Live Order</Link>
              <Link to="/account/orders" className="text-sm text-ink-muted hover:text-ink transition-colors">Returns & Exchanges</Link>
              <Link to="/account/rewards" className="text-sm text-ink-muted hover:text-ink transition-colors">Loyalty Rewards</Link>
              <Link to="/login" className="text-sm text-ink-muted hover:text-ink transition-colors">Client Login</Link>
            </div>
          </div>

          {/* Newsletter */}
          <div className="flex flex-col gap-4">
            <h4 className="font-mono text-xs uppercase tracking-[0.2em] text-brand font-bold">Atelier Bulletin</h4>
            <p className="text-ink-muted text-xs leading-relaxed">
              Subscribe to receive exclusive collection drops, VIP access, and private sale codes.
            </p>
            <form onSubmit={handleSubscribe} className="flex flex-col gap-3">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Button type="submit" variant="primary" className="w-full justify-center">
                Subscribe <Send size={14} className="ml-2" />
              </Button>
            </form>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-ink-muted text-xs font-mono">
          <p>&copy; {new Date().getFullYear()} FashionFizz Aura Chromatique. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#privacy" className="hover:text-ink transition-colors">Privacy Policy</a>
            <a href="#terms" className="hover:text-ink transition-colors">Terms of Service</a>
            <a href="#shipping" className="hover:text-ink transition-colors">Global Shipping</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
