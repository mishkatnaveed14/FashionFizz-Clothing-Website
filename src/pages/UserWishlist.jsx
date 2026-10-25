import React from 'react';
import { useStore } from '../lib/store';
import { formatCurrency } from '../lib/data';
import { Card, Button, Badge, EmptyState } from '../components/ui';
import { Heart, ShoppingBag, Trash2, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function UserWishlist() {
  const { wishlist, products, toggleWishlist, addToCart } = useStore();

  const wishlistProducts = products.filter((p) => wishlist.includes(p.id));

  if (wishlistProducts.length === 0) {
    return (
      <EmptyState
        title="Your Wishlist is Empty"
        description="Save your favorite unstitched suits, luxury pret, and fragrances to keep track of availability and price drops."
        action={<Button onClick={() => window.location.href = '/collections/unstitched'}>Explore Collections</Button>}
      />
    );
  }

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="font-display text-3xl font-semibold text-ink mb-2">My Curated Wishlist</h1>
        <p className="text-ink-muted text-sm font-body">Items saved for future purchases with instant price drop alerts.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {wishlistProducts.map((product) => (
          <Card key={product.id} className="flex flex-col justify-between gap-6 group">
            <div className="relative aspect-[4/5] bg-paper-surface border border-line flex items-center justify-center overflow-hidden">
              <div className="absolute top-3 left-3 z-10">
                <Badge variant="brand">{product.category}</Badge>
              </div>
              <button
                onClick={() => toggleWishlist(product.id)}
                className="absolute top-3 right-3 z-10 w-9 h-9 bg-paper/80 backdrop-blur-md border border-line rounded-full flex items-center justify-center text-brand hover:bg-brand hover:text-paper transition-all cursor-pointer"
                title="Remove from wishlist"
              >
                <Heart size={16} fill="currentColor" />
              </button>
              <div className="flex flex-col items-center justify-center gap-2 text-ink-muted font-display text-lg">
                <span>{product.title}</span>
                <span className="font-mono text-xs">{product.sku}</span>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <Link to={`/product/${product.id}`} className="font-display text-lg font-semibold text-ink hover:text-brand transition-colors line-clamp-1 flex items-center gap-2">
                {product.title} <ArrowUpRight size={16} />
              </Link>

              <div className="flex items-baseline gap-3">
                <span className="font-mono text-base font-bold text-brand">{formatCurrency(product.sale_price || product.price)}</span>
                {product.sale_price && product.sale_price < product.price && (
                  <span className="font-mono text-xs text-ink-muted line-through">{formatCurrency(product.price)}</span>
                )}
              </div>

              <div className="flex gap-2 pt-2">
                <Button
                  onClick={() => addToCart(product, product.sizes[0], product.colors[0], 1)}
                  className="w-full justify-center gap-2"
                >
                  <ShoppingBag size={14} /> Add to Cart
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
