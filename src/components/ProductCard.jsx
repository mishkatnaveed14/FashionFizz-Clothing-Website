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
      whileHover={{ y: -3 }}
      transition={{ duration: 0.22, ease: 'easeOut' }}
      className="group relative flex flex-col overflow-hidden rounded-[20px] border border-line bg-paper-surface shadow-[0_4px_18px_rgba(31,33,30,0.035)] transition-shadow duration-300 hover:shadow-[0_16px_38px_rgba(31,33,30,0.1)]"
    >
      {/* Absolute Badges */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-1">
        {discountPercent && (
          <span className="rounded-full bg-brand px-3 py-1.5 font-body text-[9px] font-semibold uppercase tracking-[0.12em] text-white shadow-sm">
            {discountPercent}% OFF
          </span>
        )}
        {product.is_featured && (
          <span className="rounded-full bg-[#f5f1e9] px-3 py-1.5 font-body text-[9px] font-semibold uppercase tracking-[0.12em] text-ink shadow-sm">
            Featured
          </span>
        )}
      </div>

      {/* Wishlist Button */}
      <button
        onClick={() => toggleWishlist(product.id)}
        aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        aria-pressed={isWishlisted}
        className={`absolute top-3 right-3 z-10 w-9 h-9 rounded-full flex items-center justify-center transition-all cursor-pointer ${
          isWishlisted
            ? 'bg-brand text-white'
            : 'bg-white/95 text-ink hover:bg-brand hover:text-white backdrop-blur-sm'
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
      </Link>

      {/* Details Container */}
      <div className="flex flex-grow flex-col justify-between gap-4 p-4 sm:p-5">
        <div className="flex flex-col gap-1.5">
          <div className="flex flex-wrap items-center justify-between gap-2 text-ink-muted">
            <span className="font-body text-[9px] font-semibold uppercase tracking-[0.16em]">{product.sub_category}</span>
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
                    className={`flex h-7 w-7 items-center justify-center rounded-full transition-transform ${
                      selectedColor === c ? 'ring-2 ring-brand ring-offset-1' : 'hover:scale-110'
                    }`}
                    title={c}
                  >
                    <span
                      aria-hidden="true"
                      className="h-3.5 w-3.5 rounded-full border border-white shadow-[0_0_0_1px_var(--color-line)]"
                      style={{ backgroundColor: getColorSwatch(c) }}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
          <p className="font-body text-[10px] text-ink-muted">Color: <span className="font-medium text-ink">{selectedColor}</span></p>

          <div className="flex items-start justify-between gap-3">
            <Link to={`/product/${product.id}`} className="font-display font-semibold text-base text-ink hover:text-brand transition-colors line-clamp-2">
              {product.title}
            </Link>
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
        <div className="grid grid-cols-2 gap-2 border-t border-line pt-3">
          <Link
            to={`/product/${product.id}`}
            className="flex min-h-10 items-center justify-center gap-1.5 rounded-full border border-line bg-paper-surface py-2.5 font-body text-[11px] font-medium text-ink hover:border-brand hover:text-brand"
          >
            <Eye size={14} /> View
          </Link>
          <button
            type="button"
            onClick={() => addToCart(product, selectedSize, selectedColor, 1)}
            className="flex min-h-10 cursor-pointer items-center justify-center gap-1.5 rounded-full bg-brand py-2.5 font-body text-[11px] font-semibold text-white hover:bg-[#586C55]"
          >
            <ShoppingBag size={14} /> Add
          </button>
        </div>
      </div>
    </motion.div>
  );
}
