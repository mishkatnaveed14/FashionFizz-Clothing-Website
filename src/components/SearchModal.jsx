import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../lib/store';
import { formatCurrency } from '../lib/data';
import { Search, X, ArrowRight } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';
import { getProductImage, isDemoProductImage } from '../lib/productImages';
import ImageWithFallback from './ImageWithFallback';

export default function SearchModal() {
  const { products } = useStore();
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    const handleToggle = () => setIsOpen((prev) => !prev);
    window.addEventListener('toggle-search', handleToggle);
    return () => window.removeEventListener('toggle-search', handleToggle);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  const categories = ['All', 'Unstitched', 'Ready to Wear', 'Men and Kids', 'Home & Fragrances'];

  const filteredProducts = products.filter((p) => {
    const matchesQuery = p.title.toLowerCase().includes(query.toLowerCase()) ||
      p.description.toLowerCase().includes(query.toLowerCase()) ||
      p.sub_category.toLowerCase().includes(query.toLowerCase());
    const matchesCat = selectedCategory === 'All' || p.category === selectedCategory;
    return matchesQuery && matchesCat;
  });

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex flex-col bg-paper/95 backdrop-blur-xl p-4 sm:p-8 overflow-y-auto">
        <div className="max-w-4xl mx-auto w-full flex flex-col gap-6">
          
          {/* Header & Input */}
          <div className="flex items-center justify-between pb-6 border-b border-line">
            <div className="flex items-center gap-3 w-full max-w-2xl">
              <Search size={24} className="text-brand" />
              <input
                type="text"
                autoFocus
                placeholder="Search unstitched, pret, silk, velvet, oud..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full bg-transparent text-2xl md:text-3xl font-display text-ink outline-none placeholder:text-ink-muted/40"
              />
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-ink-muted hover:text-ink p-3 bg-paper-surface border border-line rounded-[4px] cursor-pointer"
            >
              <X size={20} />
            </button>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`font-mono text-xs uppercase px-4 py-2 rounded-full whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-brand text-white font-bold'
                    : 'bg-paper-surface border border-line text-ink-muted hover:text-ink'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Results Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
            {filteredProducts.length === 0 ? (
              <div className="col-span-2 text-center py-16">
                <p className="font-mono text-sm text-ink-muted">No exquisite pieces found matching "{query}".</p>
              </div>
            ) : (
              filteredProducts.map((p) => (
                <Link
                  key={p.id}
                  to={`/product/${p.id}`}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-4 p-4 bg-paper-surface border border-line rounded-[4px] hover:border-brand transition-all group"
                >
                  <div className="w-16 h-20 shrink-0 overflow-hidden bg-soft border border-line rounded-[2px]">
                    <ImageWithFallback
                      src={getProductImage(p, 240)}
                      alt={isDemoProductImage(p) ? `Editorial sample image for ${p.title}` : p.title}
                      loading="lazy"
                      className="h-full w-full object-cover"
                      fallbackClassName="bg-[#F2E7E4]"
                    />
                  </div>
                  <div className="flex-1">
                    <span className="font-mono text-[10px] uppercase text-brand tracking-widest">{p.category} / {p.sub_category}</span>
                    <h4 className="font-display text-base font-semibold text-ink group-hover:text-brand transition-colors line-clamp-1">{p.title}</h4>
                    <span className="font-mono text-xs font-bold text-ink mt-1 block">{formatCurrency(p.sale_price || p.price)}</span>
                  </div>
                  <ArrowRight size={18} className="text-ink-muted group-hover:text-brand group-hover:translate-x-1 transition-all" />
                </Link>
              ))
            )}
          </div>

        </div>
      </div>
    </AnimatePresence>
  );
}
