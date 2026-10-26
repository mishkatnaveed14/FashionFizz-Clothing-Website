import React, { useState } from 'react';
import { useStore } from '../lib/store';
import ProductCard from '../components/ProductCard';
import { Reveal, Select } from '../components/ui';
import { Sparkles } from 'lucide-react';
import EditorialBanner from '../components/EditorialBanner';
import CollectionFeature from '../components/CollectionFeature';

export default function CatalogHomeFragrances() {
  const { products } = useStore();
  const [subFilter, setSubFilter] = useState('All');
  const [sortBy, setSortBy] = useState('featured');

  const homeItems = products.filter((p) => p.category === 'Home & Fragrances');

  const filtered = homeItems.filter((item) => {
    if (subFilter === 'All') return true;
    return item.sub_category.toLowerCase() === subFilter.toLowerCase();
  });

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === 'price-low') return (a.sale_price || a.price) - (b.sale_price || b.price);
    if (sortBy === 'price-high') return (b.sale_price || b.price) - (a.sale_price || a.price);
    return 0;
  });

  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header Banner */}
      <Reveal className="mb-12 text-center bg-paper-surface border border-line p-12 rounded-[4px] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-full blur-2xl" />
        <span className="font-mono text-xs uppercase tracking-[0.3em] text-accent mb-3 block">
          Sanctuary & Essence
        </span>
        <h1 className="text-4xl md:text-6xl font-display font-semibold text-ink mb-4">
          Home & Fragrances
        </h1>
        <p className="text-ink-muted text-base max-w-2xl mx-auto">
          Transform your living spaces with plush quilted velvet bedding sets and signature oriental extrait de parfums crafted for lasting elegance.
        </p>
      </Reveal>

      <CollectionFeature
        image="home"
        eyebrow="At home, in your own time"
        title="Comfort in every little ritual."
        description="Layer the room with tactile bedding and warm fragrance notes that turn everyday moments into something personal."
        points={['Plush bedroom layers', 'Thoughtful finishing details', 'Warm oud and amber notes', 'Gift-worthy home accents']}
        link="/sale"
        action="Explore special offers"
      />

      {/* Controls Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8 pb-6 border-b border-line">
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
          {['All', 'Home', 'Fragrances'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSubFilter(cat)}
              className={`font-mono text-xs uppercase px-4 py-2 rounded-[2px] transition-all cursor-pointer whitespace-nowrap ${
                subFilter === cat
                  ? 'bg-brand text-white font-bold shadow-[2px_2px_0px_var(--color-chrome)]'
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
            <option value="featured">Sort by: Featured</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </Select>
        </div>
      </div>

      {/* Product Grid */}
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
          <Sparkles size={36} className="text-accent mx-auto mb-4" />
          <h3 className="font-display text-xl text-ink mb-2">No items found</h3>
          <p className="text-ink-muted text-sm">Please check back soon for new home & fragrance drops.</p>
        </div>
      )}
      <EditorialBanner
        image="home"
        eyebrow="A softer kind of luxury"
        title="Make room for rituals."
        description="Bring home calming textures, beautiful scents and small details that make a space feel like yours."
        link="/collections/home-and-fragrances"
        action="Shop home & fragrance"
      />
    </div>
  );
}
