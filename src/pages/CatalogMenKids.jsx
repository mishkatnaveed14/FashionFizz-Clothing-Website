import React, { useState, useMemo } from 'react';
import { useStore } from '../lib/store';
import ProductCard from '../components/ProductCard';
import { Select, Button, EmptyState } from '../components/ui';
import EditorialBanner from '../components/EditorialBanner';
import CollectionFeature from '../components/CollectionFeature';

export default function CatalogMenKids() {
  const { products } = useStore();
  const [selectedSubCat, setSelectedSubCat] = useState('All');
  const [sortBy, setSortBy] = useState('featured');

  const subCategories = ['All', 'Men', 'Kids'];

  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => p.category === 'Men and Kids')
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
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-brand">Collection 03</span>
            <h1 className="text-4xl md:text-6xl font-display font-bold text-ink mt-2">Men & Kids</h1>
            <p className="text-ink-muted text-base mt-2 max-w-xl">
              Sophisticated karandi shalwar kameez, structured velvet waistcoats, and charming festive wear for young gentlemen.
            </p>
          </div>
          <div className="font-mono text-xs text-ink-muted">
            Showing {filteredProducts.length} items
          </div>
        </div>

        <CollectionFeature
          image="men"
          eyebrow="For every generation"
          title="Tradition, tailored for today."
          description="Explore refined winter layers and occasion-ready looks for men and young gentlemen, with comfort built into every detail."
          points={['Karandi and velvet textures', 'Classic and contemporary cuts', 'Easy size selection', 'Occasion-ready coordinated looks']}
          link="/sale"
          action="See considered offers"
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
            title="No Items Found"
            description="Try selecting a different subcategory."
            action={<Button variant="primary" onClick={() => setSelectedSubCat('All')}>Reset Filters</Button>}
          />
        )}

      </div>
      <EditorialBanner
        image="men"
        eyebrow="Made to move with you"
        title="A little more considered."
        description="Versatile tailoring, enduring fabric and modern design for the occasions that matter."
        link="/collections/ready-to-wear"
        action="Explore more styles"
      />
    </div>
  );
}
