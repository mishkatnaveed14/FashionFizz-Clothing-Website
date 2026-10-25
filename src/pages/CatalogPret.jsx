import React, { useState, useMemo } from 'react';
import { useStore } from '../lib/store';
import ProductCard from '../components/ProductCard';
import { Select, Button, EmptyState } from '../components/ui';
import EditorialBanner from '../components/EditorialBanner';
import CollectionFeature from '../components/CollectionFeature';

export default function CatalogPret() {
  const { products } = useStore();
  const [selectedSubCat, setSelectedSubCat] = useState('All');
  const [sortBy, setSortBy] = useState('featured');

  const subCategories = ['All', 'Kurti', '2-Piece', '3-Piece'];

  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => p.category === 'Ready to Wear')
      .filter((p) => {
        return selectedSubCat === 'All' || p.sub_category === selectedSubCat;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return (a.sale_price || a.price) - (b.sale_price || b.price);
        if (sortBy === 'price-high') return (b.sale_price || b.price) - (a.sale_price || a.price);
        return 0;
      });
  }, [products, selectedSubCat, sortBy]);

  return (
    <div className="min-h-screen bg-paper py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="border-b border-line pb-12 mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-brand">Collection 02</span>
            <h1 className="text-4xl md:text-6xl font-display font-bold text-ink mt-2">Ready to Wear (Pret)</h1>
            <p className="text-ink-muted text-base mt-2 max-w-xl">
              Impeccably tailored ready-to-wear kurtis, two-piece suits, and three-piece outfits designed for effortless everyday and festive elegance.
            </p>
          </div>
          <div className="font-mono text-xs text-ink-muted">
            Showing {filteredProducts.length} styles
          </div>
        </div>

        <CollectionFeature
          image="pret"
          eyebrow="Ready when you are"
          title="Everyday dressing, thoughtfully finished."
          description="Easy silhouettes, considered details and polished sets designed to move from weekday plans to evening occasions."
          points={['Ready-to-wear silhouettes', 'Sizes from XS to XL', 'Soft fabrics for all-day comfort', 'Coordinated sets with finishing details']}
          link="/collections/unstitched"
          action="Shop the fabric edit"
        />

        <div className="bg-paper-surface border border-line p-6 rounded-[4px] mb-12 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0">
            {subCategories.map((sub) => (
              <button
                key={sub}
                onClick={() => setSelectedSubCat(sub)}
                className={`font-mono text-xs uppercase px-4 py-2.5 rounded-[2px] transition-colors cursor-pointer ${
                  selectedSubCat === sub
                    ? 'bg-brand text-ink font-bold'
                    : 'bg-paper border border-line text-ink-muted hover:text-ink hover:border-chrome'
                }`}
              >
                {sub}
              </button>
            ))}
          </div>

          <div className="w-full sm:w-48">
            <Select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="featured">Sort: Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </Select>
          </div>
        </div>

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <EmptyState
            title="No Pret Styles Found"
            description="Try selecting a different outfit category."
            action={<Button variant="primary" onClick={() => setSelectedSubCat('All')}>Reset Filters</Button>}
          />
        )}

      </div>
      <EditorialBanner
        image="pret"
        eyebrow="The everyday, elevated"
        title="Easy pieces. Exceptional feel."
        description="Discover soft silhouettes and polished details, made for plans that start early and end late."
        link="/collections/unstitched"
        action="Explore the fabric edit"
      />
    </div>
  );
}
