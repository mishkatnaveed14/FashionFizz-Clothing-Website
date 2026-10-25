import React from 'react';
import { X, SlidersHorizontal, RotateCcw } from 'lucide-react';
import { motion } from 'framer-motion';

export default function FilterSidebar({
  isOpen,
  onClose,
  categories,
  selectedCategory,
  setSelectedCategory,
  subCategories,
  selectedSubCategory,
  setSelectedSubCategory,
  priceRange,
  setPriceRange,
  colors,
  selectedColor,
  setSelectedColor,
  onReset
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-paper/60 backdrop-blur-sm">
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="w-full max-w-md bg-paper-surface border-l border-line h-full flex flex-col p-6 overflow-y-auto"
      >
        <div className="flex items-center justify-between pb-6 border-b border-line mb-6">
          <div className="flex items-center gap-2">
            <SlidersHorizontal size={20} className="text-brand" />
            <h3 className="font-display font-semibold text-xl text-ink">Advanced Filters</h3>
          </div>
          <button
            onClick={onClose}
            className="text-ink-muted hover:text-ink p-2 transition-colors cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex flex-col gap-6 flex-grow">
          {/* Categories */}
          {categories && categories.length > 0 && (
            <div className="flex flex-col gap-3">
              <label className="font-mono text-xs uppercase tracking-wider text-ink-muted">Category</label>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedCategory('All')}
                  className={`font-mono text-xs px-3 py-1.5 rounded-[2px] border transition-all cursor-pointer ${
                    selectedCategory === 'All' ? 'bg-brand border-brand text-paper font-bold' : 'bg-paper border-line text-ink-muted hover:border-chrome'
                  }`}
                >
                  All
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`font-mono text-xs px-3 py-1.5 rounded-[2px] border transition-all cursor-pointer ${
                      selectedCategory === cat ? 'bg-brand border-brand text-paper font-bold' : 'bg-paper border-line text-ink-muted hover:border-chrome'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Sub-Categories */}
          {subCategories && subCategories.length > 0 && (
            <div className="flex flex-col gap-3">
              <label className="font-mono text-xs uppercase tracking-wider text-ink-muted">Collection Type</label>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedSubCategory('All')}
                  className={`font-mono text-xs px-3 py-1.5 rounded-[2px] border transition-all cursor-pointer ${
                    selectedSubCategory === 'All' ? 'bg-brand border-brand text-paper font-bold' : 'bg-paper border-line text-ink-muted hover:border-chrome'
                  }`}
                >
                  All Types
                </button>
                {subCategories.map((sub) => (
                  <button
                    key={sub}
                    onClick={() => setSelectedSubCategory(sub)}
                    className={`font-mono text-xs px-3 py-1.5 rounded-[2px] border transition-all cursor-pointer ${
                      selectedSubCategory === sub ? 'bg-brand border-brand text-paper font-bold' : 'bg-paper border-line text-ink-muted hover:border-chrome'
                    }`}
                  >
                    {sub}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Price Range */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <label className="font-mono text-xs uppercase tracking-wider text-ink-muted">Max Price</label>
              <span className="font-mono text-xs text-brand font-bold">Rs. {priceRange.toLocaleString()}</span>
            </div>
            <input
              type="range"
              min="3000"
              max="35000"
              step="500"
              value={priceRange}
              onChange={(e) => setPriceRange(Number(e.target.value))}
              className="w-full accent-brand bg-line cursor-pointer"
            />
          </div>

          {/* Color Filter */}
          {colors && colors.length > 0 && (
            <div className="flex flex-col gap-3">
              <label className="font-mono text-xs uppercase tracking-wider text-ink-muted">Color Accent</label>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedColor('All')}
                  className={`font-mono text-xs px-3 py-1.5 rounded-[2px] border transition-all cursor-pointer ${
                    selectedColor === 'All' ? 'bg-brand border-brand text-paper font-bold' : 'bg-paper border-line text-ink-muted hover:border-chrome'
                  }`}
                >
                  All Colors
                </button>
                {colors.map((col) => (
                  <button
                    key={col}
                    onClick={() => setSelectedColor(col)}
                    className={`font-mono text-xs px-3 py-1.5 rounded-[2px] border transition-all cursor-pointer ${
                      selectedColor === col ? 'bg-brand border-brand text-paper font-bold' : 'bg-paper border-line text-ink-muted hover:border-chrome'
                    }`}
                  >
                    {col}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="pt-6 border-t border-line flex items-center gap-4 mt-6">
          <button
            onClick={onReset}
            className="flex-1 flex items-center justify-center gap-2 font-mono text-xs uppercase py-3 border border-line text-ink hover:border-chrome transition-colors cursor-pointer rounded-[2px]"
          >
            <RotateCcw size={14} /> Reset
          </button>
          <button
            onClick={onClose}
            className="flex-1 font-mono text-xs uppercase font-bold py-3 bg-brand text-ink rounded-[2px] hover:opacity-90 transition-opacity cursor-pointer"
          >
            Apply Filters
          </button>
        </div>
      </motion.div>
    </div>
  );
}
