import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useStore } from '../lib/store';
import { Button, Badge } from '../components/ui';
import { ShoppingBag, Heart, ShieldCheck, Truck, RotateCcw } from 'lucide-react';
import { formatCurrency } from '../lib/data';
import { getProductImage, isDemoProductImage } from '../lib/productImages';
import ImageWithFallback from '../components/ImageWithFallback';
import ProductCard from '../components/ProductCard';
import EditorialBanner from '../components/EditorialBanner';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, addToCart, wishlist, toggleWishlist } = useStore();

  const product = products.find((p) => p.id === id);

  const [selection, setSelection] = useState(() => ({
    productId: id,
    size: product?.sizes?.[0] || '',
    color: product?.colors?.[0] || '',
    quantity: 1
  }));
  const isCurrentProduct = selection.productId === id;
  const selectedSize = isCurrentProduct ? selection.size : product?.sizes?.[0] || '';
  const selectedColor = isCurrentProduct ? selection.color : product?.colors?.[0] || '';
  const quantity = isCurrentProduct ? selection.quantity : 1;
  const updateSelection = (updates) => {
    setSelection((current) => ({
      productId: id,
      size: isCurrentProduct ? current.size : product?.sizes?.[0] || '',
      color: isCurrentProduct ? current.color : product?.colors?.[0] || '',
      quantity: isCurrentProduct ? current.quantity : 1,
      ...updates
    }));
  };

  if (!product) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-2xl font-display text-ink mb-4">Product Not Found</h2>
        <Button onClick={() => navigate('/')}>Return to Home</Button>
      </div>
    );
  }

  const isWishlisted = wishlist.includes(product.id);
  const isDemoImage = isDemoProductImage(product);
  const recommendedProducts = products
    .filter((item) => item.id !== product.id && item.category === product.category)
    .slice(0, 4);
  const handleAddToCart = () => {
    addToCart(product, selectedSize, selectedColor, quantity);
  };

  return (
    <main className="mx-auto min-h-screen w-full max-w-7xl px-3 py-6 sm:px-6 sm:py-10 lg:px-8">
      <div className="grid min-w-0 grid-cols-1 items-start gap-7 lg:grid-cols-2 lg:gap-12">
        
        <div className="flex flex-col gap-4">
          <div className="editorial-image group relative aspect-[4/5] max-h-[680px] overflow-hidden rounded-2xl bg-soft">
            <ImageWithFallback
              src={getProductImage(product, 1400)}
              alt={isDemoImage ? `Editorial sample image for ${product.title}` : `${product.title} in ${selectedColor}`}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              fallbackClassName="bg-[#F2E7E4]"
            />
            <div className="absolute left-5 top-5 z-10 flex gap-2">
              <Badge variant="brand">{product.category}</Badge>
              {product.sale_price && product.sale_price < product.price && (
                <Badge variant="accent">
                  {Math.round(((product.price - product.sale_price) / product.price) * 100)}% OFF
                </Badge>
              )}
            </div>
            {isDemoImage && (
              <span className="absolute bottom-5 left-5 rounded-full border border-white/60 bg-white/90 px-3 py-1.5 font-body text-[9px] font-semibold uppercase tracking-[0.14em] text-ink backdrop-blur-sm">
                Editorial sample image
              </span>
            )}
            <span className="sr-only">
              {product.sub_category} · {product.sku}
            </span>
          </div>

        </div>

        {/* Right: Details & Purchase Actions */}
        <div className="flex min-w-0 flex-col gap-5 sm:gap-6">
          <div>
            <span className="font-mono text-xs text-ink-muted uppercase tracking-widest block mb-2">
              SKU: {product.sku}
            </span>
            <h1 className="mb-4 break-words text-3xl font-display font-medium leading-tight text-ink sm:text-4xl lg:text-5xl">
              {product.title}
            </h1>
            <div className="flex items-baseline gap-4">
              {product.sale_price && product.sale_price < product.price ? (
                <>
                  <span className="font-mono text-2xl font-bold text-brand">{formatCurrency(product.sale_price)}</span>
                  <span className="font-mono text-lg text-ink-muted line-through">{formatCurrency(product.price)}</span>
                </>
              ) : (
                <span className="font-mono text-2xl font-bold text-ink">{formatCurrency(product.price)}</span>
              )}
            </div>
          </div>

          <p className="text-ink-muted text-base leading-relaxed">
            {product.description}
          </p>

          <div className="space-y-4 pt-4 border-t border-line">
            {/* Colors */}
            <div>
              <label className="font-mono text-xs text-ink-muted uppercase tracking-wider block mb-2">
                Color Variant: <span className="text-ink font-bold">{selectedColor}</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => updateSelection({ color })}
                    aria-pressed={selectedColor === color}
                    className={`min-h-11 rounded-full border px-4 py-2 font-mono text-xs transition-all cursor-pointer ${
                      selectedColor === color
                        ? 'border-brand bg-brand/10 text-ink font-bold shadow-[0_0_0_1px_var(--color-brand)]'
                        : 'border-line bg-paper-surface text-ink-muted hover:border-brand'
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* Sizes */}
            <div>
              <label className="font-mono text-xs text-ink-muted uppercase tracking-wider block mb-2">
                Size / Cut: <span className="text-ink font-bold">{selectedSize}</span>
              </label>
              <div className="flex gap-3 flex-wrap">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => updateSelection({ size })}
                    className={`font-mono text-xs px-4 py-2 rounded-[2px] border transition-all cursor-pointer ${
                      selectedSize === size
                      ? 'border-brand bg-brand text-white font-bold'
                        : 'border-line bg-paper-surface text-ink-muted hover:border-chrome'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="flex flex-wrap items-center gap-4">
              <label className="font-mono text-xs text-ink-muted uppercase tracking-wider">Quantity</label>
              <div className="flex items-center border border-line rounded-[2px] bg-paper-surface">
                <button
                  onClick={() => updateSelection({ quantity: Math.max(1, quantity - 1) })}
                  className="px-3 py-2 text-ink-muted hover:text-ink font-mono"
                >
                  -
                </button>
                <span className="px-4 font-mono text-sm text-ink font-bold">{quantity}</span>
                <button
                  onClick={() => updateSelection({ quantity: quantity + 1 })}
                  className="px-3 py-2 text-ink-muted hover:text-ink font-mono"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-2 sm:pt-4">
            <Button onClick={handleAddToCart} className="flex-grow py-4">
              <ShoppingBag size={18} className="mr-2" /> Add to Cart
            </Button>
            <button
              onClick={() => toggleWishlist(product.id)}
              className={`flex h-12 w-12 items-center justify-center rounded-full border transition-colors cursor-pointer ${
                isWishlisted
                  ? 'border-brand bg-brand text-white'
                  : 'border-line bg-paper-surface text-ink-muted hover:text-ink hover:border-chrome'
              }`}
              title="Save to Wishlist"
            >
              <Heart size={20} fill={isWishlisted ? 'currentColor' : 'none'} />
            </button>
          </div>

          {/* Value props */}
          <div className="grid grid-cols-1 gap-3 border-t border-line pt-5 text-center min-[420px]:grid-cols-3 sm:gap-4 sm:pt-6">
            <div className="flex flex-col items-center gap-2 p-3 bg-paper-surface border border-line rounded-[2px]">
              <Truck size={18} className="text-brand" />
              <span className="font-mono text-[10px] uppercase text-ink-muted">Express Delivery Across Pakistan</span>
            </div>
            <div className="flex flex-col items-center gap-2 p-3 bg-paper-surface border border-line rounded-[2px]">
              <RotateCcw size={18} className="text-brand" />
              <span className="font-mono text-[10px] uppercase text-ink-muted">7-Day Easy Return & Exchange</span>
            </div>
            <div className="flex flex-col items-center gap-2 p-3 bg-paper-surface border border-line rounded-[2px]">
              <ShieldCheck size={18} className="text-brand" />
              <span className="font-mono text-[10px] uppercase text-ink-muted">100% Authentic Fabric Guarantee</span>
            </div>

          </div>

        </div>

      </div>
      <section className="editorial-section mt-12 border-t border-line py-10 sm:mt-16 sm:py-16">
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <span className="font-body text-[10px] font-semibold uppercase tracking-[0.22em] text-brand">A little more to love</span>
            <h2 className="mt-2 text-3xl text-ink sm:text-4xl">You may also like</h2>
          </div>
          <p className="max-w-sm font-body text-sm leading-relaxed text-ink-muted">Pieces chosen to pair beautifully with your latest find.</p>
        </div>
        {recommendedProducts.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {recommendedProducts.map((item) => <ProductCard key={item.id} product={item} />)}
          </div>
        ) : (
          <p className="rounded-2xl border border-line bg-paper-surface p-6 font-body text-sm text-ink-muted">
            Explore the collection for more pieces we think you’ll love.
          </p>
        )}
      </section>
      <EditorialBanner
        image="unstitched"
        eyebrow="The details make the difference"
        title="Good pieces, made to be kept."
        description="Find the fabrics, finishes and thoughtful design that feel right for your everyday."
        link="/collections/unstitched"
        action="Explore the collection"
      />
    </main>
  );
}
