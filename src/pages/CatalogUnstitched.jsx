import React, { useState, useMemo } from 'react';
import { useStore } from '../lib/store';
import ProductCard from '../components/ProductCard';
import { Input, Select, Button, EmptyState } from '../components/ui';
import EditorialBanner from '../components/EditorialBanner';
import CollectionFeature from '../components/CollectionFeature';

export default function CatalogUnstitched() {
  const { products } = useStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubCat, setSelectedSubCat] = useState('All');
  const [selectedColor, setSelectedColor] = useState('All');
  const [sortBy, setSortBy] = useState('featured');

  const subCategories = ['All', 'Lawn', 'Winter', 'Festive'];
  const colors = ['All', 'Crimson Red', 'Antique Gold', 'Sapphire Blue', 'Ivory', 'Obsidian Black', 'Gold'];

  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => p.category === 'Unstitched')
      .filter((p) => {
        const matchesSub = selectedSubCat === 'All' || p.sub_category === selectedSubCat;
        const matchesColor = selectedColor === 'All' || p.colors.includes(selectedColor);
        const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || p.description.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesSub && matchesColor && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return (a.sale_price || a.price) - (b.sale_price || b.price);
        if (sortBy === 'price-high') return (b.sale_price || b.price) - (a.sale_price || a.price);
        return 0;
      });
  }, [products, selectedSubCat, selectedColor, searchQuery, sortBy]);

  return (
    <div className="min-h-screen bg-paper py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="border-b border-line pb-12 mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-brand">Collection 01</span>
            <h1 className="text-4xl md:text-6xl font-display font-bold text-ink mt-2">Unstitched Fabrics</h1>
            <p className="text-ink-muted text-base mt-2 max-w-xl">
              Explore exquisite lawn, micro-velvet, and heavy festive unstitched suits featuring intricate tilla, zari, and resham embroidery.
            </p>
          </div>
          <div className="font-mono text-xs text-ink-muted">
            Showing {filteredProducts.length} masterpieces
          </div>
        </div>

        <CollectionFeature
          image="unstitched"
          eyebrow="Fabric stories · Lawn to festive"
          title="Make it yours, stitch by stitch."
          description="Discover breathable everyday prints and richly worked occasion fabrics, selected to make your own silhouette."
          points={['Unstitched 3-piece sets', 'Seasonal lawn and winter edits', 'Embroidery-led festive designs', 'Color options shown on every style']}
          link="/collections/ready-to-wear"
          action="Explore ready to wear"
        />

        {/* Filters and Controls */}
        <div className="bg-paper-surface border border-line p-6 rounded-[4px] mb-12 flex flex-col lg:flex-row items-center justify-between gap-6">
          
          <div className="flex flex-wrap items-center gap-4 w-full lg:w-auto">
            {/* Sub-category pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0">
              {subCategories.map((sub) => (
                <button
                  key={sub}
                  onClick={() => setSelectedSubCat(sub)}
                  className={`font-mono text-xs uppercase px-4 py-2.5 rounded-[2px] transition-colors cursor-pointer ${
                    selectedSubCat === sub
                      ? 'bg-brand text-white font-bold'
                      : 'bg-paper border border-line text-ink-muted hover:text-ink hover:border-chrome'
                  }`}
                >
                  {sub}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 w-full lg:w-auto justify-end">
            <div className="w-full sm:w-56">
              <Input
                type="search"
                aria-label="Search unstitched products"
                placeholder="Search this collection"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
              />
            </div>
            <div className="w-full sm:w-48">
              <Select
                value={selectedColor}
                onChange={(e) => setSelectedColor(e.target.value)}
              >
                {colors.map((c) => (
                  <option key={c} value={c}>Color: {c}</option>
                ))}
              </Select>
            </div>

            <div className="w-full sm:w-48">
              <Select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="featured">Sort: Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </Select>
            </div>
          </div>

        </div>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <EmptyState
            title="No Unstitched Ensembles Found"
            description="Try adjusting your color filter or sub-category to find what you're looking for."
            action={
              <Button variant="primary" onClick={() => { setSelectedSubCat('All'); setSelectedColor('All'); setSearchQuery(''); }}>
                Reset Filters
              </Button>
            }
          />
        )}

      </div>
      <EditorialBanner
        image="unstitched"
        eyebrow="Crafted to be cherished"
        title="The art is in every detail."
        description="Explore beautiful prints, considered fabrics and the finishing touches that make an outfit your own."
        link="/collections/ready-to-wear"
        action="Discover ready to wear"
      />
    </div>
  );
}
