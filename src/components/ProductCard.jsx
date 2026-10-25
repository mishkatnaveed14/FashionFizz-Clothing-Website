import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../lib/store';
import { formatCurrency } from '../lib/data';
import { Heart, ShoppingBag, Eye } from 'lucide-react';
import { motion } from 'framer-motion';
import { getProductImage, getColorSwatch } from '../lib/productImages';

export default function ProductCard({ product }) {
  const { addToCart, wishlist, toggleWishlist } = useStore();
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0] || 'Default');
  const [selectedSize] = useState(product.sizes?.[0] || 'Standard');
  const [imageFailed, setImageFailed] = useState(false);

  const isWishlisted = wishlist.includes(product.id);
  const productImage = getProductImage(product);
  const discountPercent = product.sale_price && product.price > product.sale_price
    ? Math.round(((product.price - product.sale_price) / product.price) * 100)
    : null;

  return (
    <motion.div
      whileHover={{ y: -4, borderColor: 'var(--color-brand)' }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className="bg-paper-surface border border-line rounded-2xl overflow-hidden flex flex-col group relative"
    >
      {/* Absolute Badges */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-1">
        {discountPercent && (
          <span className="bg-brand text-ink font-mono text-[10px] font-bold px-2 py-1 uppercase tracking-wider">
            {discountPercent}% OFF
          </span>
        )}
        {product.is_featured && (
          <span className="bg-accent text-ink font-mono text-[10px] font-bold px-2 py-1 uppercase tracking-wider">
            Featured
          </span>
        )}
      </div>

      {/* Wishlist Button */}
      <button
        onClick={() => toggleWishlist(product.id)}
        className={`absolute top-3 right-3 z-10 w-9 h-9 rounded-full flex items-center justify-center transition-all cursor-pointer ${
          isWishlisted
            ? 'bg-brand text-ink'
            : 'bg-paper/90 text-ink hover:bg-brand hover:text-white backdrop-blur-sm'
        }`}
        title="Save to Wishlist"
      >
        <Heart size={16} fill={isWishlisted ? 'currentColor' : 'none'} />
      </button>

      {/* Product Image / Visual Box */}
      <Link to={`/product/${product.id}`} aria-label={`View ${product.title}`} className="relative block aspect-[4/5] overflow-hidden bg-soft">
        {productImage && !imageFailed ? (
          <img
            src={productImage}
            alt={`${product.title} in ${selectedColor}`}
            loading="lazy"
            onError={() => setImageFailed(true)}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          />
        ) : (
          <div className="flex h-full flex-col items-center justify-center gap-3 p-6 text-center">
            <span className="font-mono text-[10px] uppercase tracking-widest text-brand">{product.category}</span>
            <span className="font-display text-lg font-semibold text-ink">{product.title}</span>
          </div>
        )}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 mix-blend-color transition-colors duration-300"
          style={{ backgroundColor: getColorSwatch(selectedColor), opacity: 0.34 }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent opacity-70" />
      </Link>

      {/* Details Container */}
      <div className="p-5 flex flex-col flex-grow justify-between gap-4">
        <div className="flex flex-col gap-1.5">
          <div className="flex flex-wrap items-center justify-between gap-2 text-ink-muted">
            <span className="font-mono text-[10px] uppercase tracking-wider">{product.sub_category}</span>
            {product.colors && product.colors.length > 0 && (
              <div className="flex items-center gap-1" role="group" aria-label="Choose product color">
                {product.colors.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={(event) => {
                      event.preventDefault();
                      event.stopPropagation();
                      setSelectedColor(c);
                    }}
                    aria-label={`Select ${c}`}
                    aria-pressed={selectedColor === c}
                    className={`flex h-8 w-8 items-center justify-center rounded-full transition-transform ${
                      selectedColor === c ? 'ring-2 ring-brand ring-offset-1' : 'hover:scale-110'
                    }`}
                    title={c}
                  >
                    <span
                      aria-hidden="true"
                      className="h-4 w-4 rounded-full border border-white shadow-[0_0_0_1px_var(--color-line)]"
                      style={{ backgroundColor: getColorSwatch(c) }}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
          <p className="font-body text-[11px] text-ink-muted">
            Color: <span className="font-medium text-ink">{selectedColor}</span>
          </p>

          <div className="flex items-start justify-between gap-3">
            <Link to={`/product/${product.id}`} className="font-display font-semibold text-base text-ink hover:text-brand transition-colors line-clamp-2">
              {product.title}
            </Link>
            <span className="shrink-0 rounded-full bg-[#EDF0EA] px-2 py-1 font-body text-[9px] font-medium text-brand">In stock</span>
          </div>

          <div className="flex items-baseline gap-2 mt-1">
            <span className="font-mono font-bold text-base text-ink">
              {formatCurrency(product.sale_price || product.price)}
            </span>
            {product.sale_price && product.sale_price < product.price && (
              <span className="font-mono text-xs text-ink-muted line-through">
                {formatCurrency(product.price)}
              </span>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2 pt-3 border-t border-line">
          <Link
            to={`/product/${product.id}`}
            className="flex items-center justify-center gap-1.5 rounded-full border border-line bg-paper-surface py-2.5 font-body text-[11px] font-medium text-ink hover:border-brand"
          >
            <Eye size={14} /> View
          </Link>
          <button
            type="button"
            onClick={() => addToCart(product, selectedSize, selectedColor, 1)}
            className="flex items-center justify-center gap-1.5 rounded-full bg-brand py-2.5 font-body text-[11px] font-semibold text-white hover:bg-[#586C55] cursor-pointer"
          >
            <ShoppingBag size={14} /> Add
          </button>
        </div>
      </div>
    </motion.div>
  );
}
