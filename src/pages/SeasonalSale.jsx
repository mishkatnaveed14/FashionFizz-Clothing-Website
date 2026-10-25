import React, { useState } from 'react';
import { useStore } from '../lib/store';
import ProductCard from '../components/ProductCard';
import { Reveal, Select } from '../components/ui';
import { Percent, Flame } from 'lucide-react';
import EditorialBanner from '../components/EditorialBanner';
import CollectionFeature from '../components/CollectionFeature';

export default function SeasonalSale() {
  const { products } = useStore();
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [sortBy, setSortBy] = useState('discount');

  // Filter products that have a sale_price lower than price
  const saleItems = products.filter((p) => p.sale_price && p.sale_price < p.price);

  const filtered = saleItems.filter((item) => {
    if (categoryFilter === 'All') return true;
    return item.category.toLowerCase() === categoryFilter.toLowerCase();
  });

  const sorted = [...filtered].sort((a, b) => {
    const discountA = ((a.price - a.sale_price) / a.price) * 100;
    const discountB = ((b.price - b.sale_price) / b.price) * 100;
    if (sortBy === 'discount') return discountB - discountA;
    if (sortBy === 'price-low') return a.sale_price - b.sale_price;
    if (sortBy === 'price-high') return b.sale_price - a.sale_price;
    return 0;
  });

  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Banner */}
      <Reveal className="mb-12 bg-gradient-to-r from-brand/20 via-paper-surface to-accent/10 border border-brand/40 p-12 rounded-[4px] relative overflow-hidden">
        <div className="absolute top-0 right-0 bg-brand text-ink font-mono text-xs font-bold px-6 py-2 uppercase tracking-widest rotate-12 translate-x-6 translate-y-4">
          Up to 50% Off
        </div>
        <div className="flex items-center gap-3 text-brand mb-3">
          <Flame size={24} />
          <span className="font-mono text-xs uppercase tracking-[0.3em]">Limited Time Seasonal Event</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-display font-semibold text-ink mb-4">
          Aura Chromatique Sale
        </h1>
        <p className="text-ink-muted text-base max-w-2xl">
          Explore exclusive price reductions across unstitched lawn, festive velvet ensembles, pret kurtis, and signature perfumes.
        </p>
      </Reveal>

      <CollectionFeature
        image="pret"
        eyebrow="The seasonal edit"
        title="Considered pieces, at a little less."
        description="Shop selected wardrobe and home favourites with clear pricing, easy-to-browse categories and the same thoughtful quality."
        points={['Discounts shown on every item', 'New styles added to the edit', 'Filter by collection and price', 'Secure checkout with cash on delivery']}
        link="/collections/unstitched"
        action="Browse all collections"
      />

      {/* Filters */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8 pb-6 border-b border-line">
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
          {['All', 'Unstitched', 'Ready to Wear', 'Men and Kids', 'Home & Fragrances'].map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`font-mono text-xs uppercase px-4 py-2 rounded-[2px] transition-all cursor-pointer whitespace-nowrap ${
                categoryFilter === cat
                  ? 'bg-brand text-ink font-bold shadow-[2px_2px_0px_var(--color-chrome)]'
                  : 'bg-paper-surface text-ink-muted border border-line hover:text-ink'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="w-full md:w-48">
          <Select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="discount">Sort by: Highest Discount</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </Select>
        </div>
      </div>

      {/* Grid */}
      {sorted.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {sorted.map((product, idx) => (
            <Reveal key={product.id} delay={idx * 0.1}>
              <ProductCard product={product} />
            </Reveal>
          ))}
        </div>
      ) : (
        <div className="text-center py-24 bg-paper-surface border border-line rounded-[4px]">
          <Percent size={36} className="text-brand mx-auto mb-4" />
          <h3 className="font-display text-xl text-ink mb-2">No sale items found in this category</h3>
          <p className="text-ink-muted text-sm">Select another category to explore discounted luxury items.</p>
        </div>
      )}
      <EditorialBanner
        image="pret"
        eyebrow="An edit worth keeping"
        title="Good style, for a little less."
        description="Thoughtful pieces, exceptional value. Explore the seasonal edit while your favourites are still here."
        link="/collections/unstitched"
        action="Browse new arrivals"
      />
    </div>
  );
}
