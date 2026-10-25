import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../lib/store';
import { Button, Input } from './ui';
import { formatCurrency } from '../lib/data';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CartDrawer() {
  const { cart, removeFromCart, updateCartQuantity, clearCart, discounts, notify } = useStore();
  const [isOpen, setIsOpen] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleToggle = () => setIsOpen((prev) => !prev);
    window.addEventListener('toggle-cart', handleToggle);
    return () => window.removeEventListener('toggle-cart', handleToggle);
  }, []);

  const subtotal = cart.reduce((acc, item) => acc + (item.product.sale_price || item.product.price) * item.quantity, 0);
  const discountAmount = appliedDiscount ? (subtotal * appliedDiscount.discount_percentage) / 100 : 0;
  const total = subtotal - discountAmount;

  const handleApplyPromo = (e) => {
    e.preventDefault();
    const found = discounts.find((d) => d.code.toUpperCase() === promoCode.toUpperCase() && d.status === 'Active');
    if (found) {
      setAppliedDiscount(found);
      notify(`Promo code ${found.code} applied! ${found.discount_percentage}% OFF`);
    } else {
      notify('Invalid or expired promo code', 'error');
    }
  };

  const handleCheckout = () => {
    setIsOpen(false);
    navigate('/checkout');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="absolute inset-0 bg-paper/80 backdrop-blur-md"
          />

          <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="w-screen max-w-md bg-paper-surface border-l border-line flex flex-col shadow-2xl"
            >
              {/* Header */}
              <div className="p-6 border-b border-line flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <ShoppingBag className="text-brand" size={22} />
                  <h3 className="font-display text-xl font-semibold text-ink">Your Atelier Bag</h3>
                  <span className="bg-soft text-ink font-mono text-xs px-2.5 py-0.5 rounded-full">
                    {cart.reduce((a, c) => a + c.quantity, 0)}
                  </span>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-ink-muted hover:text-ink p-2 transition-colors cursor-pointer"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Items List */}
              <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-4">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center py-16">
                    <ShoppingBag size={48} className="text-ink-muted mb-4 opacity-40" />
                    <h4 className="font-display text-lg text-ink mb-2">Your bag is empty</h4>
                    <p className="text-ink-muted text-xs max-w-xs mb-6">Explore our latest unstitched and pret collections to begin styling.</p>
                    <Button onClick={() => setIsOpen(false)} variant="secondary">
                      Browse Collections
                    </Button>
                  </div>
                ) : (
                  cart.map((item) => {
                    const itemKey = `${item.product.id}-${item.size}-${item.color}`;
                    const price = item.product.sale_price || item.product.price;
                    return (
                      <div key={itemKey} className="flex gap-4 p-4 bg-paper border border-line rounded-[4px] relative group">
                        <div className="w-20 h-24 bg-soft border border-line rounded-[2px] flex items-center justify-center font-mono text-xs text-ink-muted">
                          {item.product.category[0]}
                        </div>
                        <div className="flex-1 flex flex-col justify-between">
                          <div>
                            <h5 className="font-display text-sm font-semibold text-ink line-clamp-1">{item.product.title}</h5>
                            <p className="font-mono text-[11px] text-ink-muted mt-0.5">
                              Size: {item.size} | Color: {item.color}
                            </p>
                          </div>
                          <div className="flex items-center justify-between mt-3">
                            <div className="flex items-center border border-line bg-paper-surface rounded-[2px]">
                              <button
                                onClick={() => updateCartQuantity(itemKey, item.quantity - 1)}
                                className="p-1.5 text-ink-muted hover:text-ink transition-colors cursor-pointer"
                              >
                                <Minus size={12} />
                              </button>
                              <span className="font-mono text-xs px-3 text-ink">{item.quantity}</span>
                              <button
                                onClick={() => updateCartQuantity(itemKey, item.quantity + 1)}
                                className="p-1.5 text-ink-muted hover:text-ink transition-colors cursor-pointer"
                              >
                                <Plus size={12} />
                              </button>
                            </div>
                            <span className="font-mono text-sm font-bold text-ink">{formatCurrency(price * item.quantity)}</span>
                          </div>
                        </div>
                        <button
                          onClick={() => removeFromCart(itemKey)}
                          className="absolute top-3 right-3 text-ink-muted hover:text-red-400 transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    );
                  })
                )}
              </div>

              {/* Footer / Summary */}
              {cart.length > 0 && (
                <div className="p-6 border-t border-line bg-paper flex flex-col gap-4">
                  {/* Promo Code Input */}
                  <form onSubmit={handleApplyPromo} className="flex gap-2">
                    <Input
                      placeholder="Promo Code (e.g. AURA50)"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                    />
                    <Button type="submit" variant="secondary" className="px-4">Apply</Button>
                  </form>

                  {appliedDiscount && (
                    <div className="flex items-center justify-between bg-brand/10 border border-brand/40 px-3 py-2 rounded-[2px] font-mono text-xs text-brand">
                      <span>Code {appliedDiscount.code} applied ({appliedDiscount.discount_percentage}% OFF)</span>
                      <button onClick={() => setAppliedDiscount(null)} className="hover:underline">Remove</button>
                    </div>
                  )}

                  <div className="flex flex-col gap-2 font-mono text-xs text-ink-muted">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span className="text-ink">{formatCurrency(subtotal)}</span>
                    </div>
                    {appliedDiscount && (
                      <div className="flex justify-between text-brand">
                        <span>Discount ({appliedDiscount.discount_percentage}%)</span>
                        <span>-{formatCurrency(discountAmount)}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span>Shipping</span>
                      <span className="text-emerald-400">FREE</span>
                    </div>
                    <div className="flex justify-between pt-2 border-t border-line text-sm font-bold text-ink">
                      <span>Total Amount</span>
                      <span className="text-brand font-display text-lg">{formatCurrency(total)}</span>
                    </div>
                  </div>

                  <Button onClick={handleCheckout} variant="primary" className="w-full justify-center mt-2">
                    Proceed to Secure Checkout <ArrowRight size={16} className="ml-2" />
                  </Button>
                </div>
              )}

            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
