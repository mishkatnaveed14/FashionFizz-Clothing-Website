import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../lib/store';
import { formatCurrency } from '../lib/data';
import { Button, Input, Textarea, Card, Badge } from '../components/ui';
import { ShieldCheck, Truck, CreditCard, CheckCircle2 } from 'lucide-react';

export default function Checkout() {
  const { cart, user, placeOrder } = useStore();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: user ? user.name : '',
    email: user ? user.email : '',
    phone: user ? user.phone : '',
    address: user && user.addresses?.[0] ? user.addresses[0] : '',
    city: 'Lahore',
    postalCode: '54000',
    paymentMethod: 'Cash on Delivery',
    promoCode: ''
  });

  const [discountApplied, setDiscountApplied] = useState(false);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [errors, setErrors] = useState({});
  const [orderCompleted, setOrderCompleted] = useState(null);

  const subtotal = cart.reduce((acc, item) => acc + (item.product.sale_price || item.product.price) * item.quantity, 0);
  const shippingFee = subtotal > 15000 ? 0 : 500;
  const finalTotal = subtotal - discountAmount + shippingFee;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: null });
    }
  };

  const handleApplyPromo = () => {
    if (formData.promoCode.toUpperCase() === 'AURA50') {
      const disc = Math.round(subtotal * 0.5);
      setDiscountAmount(disc);
      setDiscountApplied(true);
    } else if (formData.promoCode.toUpperCase() === 'FESTIVE20') {
      const disc = Math.round(subtotal * 0.2);
      setDiscountAmount(disc);
      setDiscountApplied(true);
    } else {
      setErrors({ ...errors, promoCode: 'Invalid promo code' });
    }
  };

  const validate = () => {
    const errs = {};
    if (!formData.fullName.trim()) errs.fullName = 'Full name is required';
    if (!formData.email.trim()) errs.email = 'Email is required';
    if (!formData.phone.trim()) errs.phone = 'Phone number is required';
    if (!formData.address.trim()) errs.address = 'Shipping address is required';
    if (!formData.city.trim()) errs.city = 'City is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    if (cart.length === 0) {
      navigate('/');
      return;
    }

    const orderPayload = {
      total_amount: finalTotal,
      shipping_address: `${formData.address}, ${formData.city} (${formData.postalCode})`,
      payment_method: formData.paymentMethod
    };

    const newOrder = placeOrder(orderPayload);
    setOrderCompleted(newOrder);
  };

  if (orderCompleted) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4 py-16">
        <Card className="max-w-xl w-full text-center p-12 flex flex-col items-center gap-6">
          <div className="w-20 h-20 bg-brand/10 border border-brand rounded-full flex items-center justify-center text-brand">
            <CheckCircle2 size={40} />
          </div>
          <div className="flex flex-col gap-2">
            <span className="font-mono text-xs uppercase text-brand tracking-widest">Order Confirmed</span>
            <h1 className="text-3xl font-display font-semibold text-ink">Thank You For Your Order</h1>
            <p className="text-ink-muted text-sm max-w-md mx-auto">
              Your order <span className="font-mono text-ink font-bold">{orderCompleted.id}</span> has been placed successfully and is now being processed.
            </p>
          </div>
          <div className="w-full bg-paper p-6 rounded-[2px] border border-line text-left flex flex-col gap-3">
            <div className="flex justify-between font-mono text-xs">
              <span className="text-ink-muted">Total Amount:</span>
              <span className="text-ink font-bold">{formatCurrency(orderCompleted.total_amount)}</span>
            </div>
            <div className="flex justify-between font-mono text-xs">
              <span className="text-ink-muted">Payment Method:</span>
              <span className="text-ink">{orderCompleted.payment_method}</span>
            </div>
            <div className="flex justify-between font-mono text-xs">
              <span className="text-ink-muted">Delivery Address:</span>
              <span className="text-ink truncate max-w-[240px]">{orderCompleted.shipping_address}</span>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 w-full mt-4">
            <Button onClick={() => navigate('/track-order')} variant="secondary" className="flex-1">
              Track Order
            </Button>
            <Button onClick={() => navigate('/')} className="flex-1">
              Return Home
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4">
        <Card className="text-center p-12 max-w-md w-full flex flex-col items-center gap-6">
          <h2 className="text-2xl font-display text-ink">Your Cart Is Empty</h2>
          <p className="text-ink-muted text-sm">Add items to your shopping bag before proceeding to checkout.</p>
          <Button onClick={() => navigate('/')}>Explore Collections</Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="flex flex-col gap-2 mb-12">
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-brand">Secure Checkout</span>
        <h1 className="text-3xl md:text-4xl font-display font-semibold text-ink">Complete Your Order</h1>
        <p className="max-w-xl font-body text-sm leading-relaxed text-ink-muted">A few details, then your new favourites will be on their way.</p>
      </div>

      <section aria-label="Checkout benefits" className="mb-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
        {[
          ['01', 'Your details stay private', 'Secure checkout, every step of the way.'],
          ['02', 'Carefully packed', 'Each piece is prepared with care.'],
          ['03', 'Order updates', 'We’ll keep you informed as it travels.']
        ].map(([number, title, description]) => (
          <div key={number} className="flex items-start gap-3 rounded-2xl border border-line bg-paper-surface p-4">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#EDF0EA] font-body text-[10px] font-semibold text-brand">{number}</span>
            <div>
              <h2 className="font-body text-xs font-semibold text-ink">{title}</h2>
              <p className="mt-1 font-body text-[11px] leading-relaxed text-ink-muted">{description}</p>
            </div>
          </div>
        ))}
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left: Form */}
        <form onSubmit={handleSubmit} className="lg:col-span-7 flex flex-col gap-8">
          <Card className="flex flex-col gap-6 p-8">
            <h3 className="font-display text-xl text-ink border-b border-line pb-4 flex items-center gap-2">
              <Truck size={20} className="text-brand" /> Shipping Information
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Full Name"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                error={errors.fullName}
                placeholder="Zoya Khan"
              />
              <Input
                label="Email Address"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
                placeholder="zoya@example.com"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Phone Number"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                error={errors.phone}
                placeholder="+92 300 1234567"
              />
              <Input
                label="City"
                name="city"
                value={formData.city}
                onChange={handleChange}
                error={errors.city}
                placeholder="Lahore / Karachi / Islamabad"
              />
            </div>

            <Textarea
              label="Street Address & House / Apt"
              name="address"
              value={formData.address}
              onChange={handleChange}
              error={errors.address}
              placeholder="House 42, Street 12, F-7/2"
              rows={3}
            />

            <Input
              label="Postal Code"
              name="postalCode"
              value={formData.postalCode}
              onChange={handleChange}
              placeholder="54000"
            />
          </Card>

          <Card className="flex flex-col gap-6 p-8">
            <h3 className="font-display text-xl text-ink border-b border-line pb-4 flex items-center gap-2">
              <CreditCard size={20} className="text-brand" /> Payment Method
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <label className={`flex items-center gap-3 p-4 border rounded-[2px] cursor-pointer transition-colors ${formData.paymentMethod === 'Cash on Delivery' ? 'border-brand bg-brand/5' : 'border-line bg-paper'}`}>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="Cash on Delivery"
                  checked={formData.paymentMethod === 'Cash on Delivery'}
                  onChange={handleChange}
                  className="accent-brand"
                />
                <div className="flex flex-col">
                  <span className="font-mono text-xs uppercase text-ink font-bold">Cash on Delivery</span>
                  <span className="text-[11px] text-ink-muted">Pay securely upon delivery</span>
                </div>
              </label>

              <label className={`flex items-center gap-3 p-4 border rounded-[2px] cursor-pointer transition-colors ${formData.paymentMethod === 'Credit Card' ? 'border-brand bg-brand/5' : 'border-line bg-paper'}`}>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="Credit Card"
                  checked={formData.paymentMethod === 'Credit Card'}
                  onChange={handleChange}
                  className="accent-brand"
                />
                <div className="flex flex-col">
                  <span className="font-mono text-xs uppercase text-ink font-bold">Credit / Debit Card</span>
                  <span className="text-[11px] text-ink-muted">Visa, Mastercard, UnionPay</span>
                </div>
              </label>
            </div>
          </Card>

          <Button type="submit" className="w-full py-5 text-sm">
            Place Secure Order ({formatCurrency(finalTotal)})
          </Button>
        </form>

        {/* Right: Summary */}
        <div className="lg:col-span-5">
          <Card className="sticky top-28 flex flex-col gap-6 p-8">
            <h3 className="font-display text-xl text-ink border-b border-line pb-4">Order Summary</h3>

            <div className="flex flex-col gap-4 max-h-80 overflow-y-auto pr-2">
              {cart.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between gap-4 pb-4 border-b border-line">
                  <div className="flex flex-col">
                    <span className="font-body text-sm font-semibold text-ink">{item.product.title}</span>
                    <span className="font-mono text-xs text-ink-muted">Qty: {item.quantity} | {item.size} / {item.color}</span>
                  </div>
                  <span className="font-mono text-xs text-ink font-bold">
                    {formatCurrency((item.product.sale_price || item.product.price) * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            {/* Promo code */}
            <div className="flex gap-2">
              <Input
                placeholder="Promo Code (e.g. AURA50)"
                name="promoCode"
                value={formData.promoCode}
                onChange={handleChange}
                error={errors.promoCode}
              />
              <Button type="button" variant="secondary" onClick={handleApplyPromo} className="self-end">
                Apply
              </Button>
            </div>
            {discountApplied && (
              <Badge variant="brand" className="self-start">Discount Applied (-{formatCurrency(discountAmount)})</Badge>
            )}

            <div className="flex flex-col gap-2 pt-4 border-t border-line font-mono text-xs">
              <div className="flex justify-between text-ink-muted">
                <span>Subtotal</span>
                <span>{formatCurrency(subtotal)}</span>
              </div>
              {discountApplied && (
                <div className="flex justify-between text-brand">
                  <span>Discount</span>
                  <span>-{formatCurrency(discountAmount)}</span>
                </div>
              )}
              <div className="flex justify-between text-ink-muted">
                <span>Shipping</span>
                <span>{shippingFee === 0 ? 'FREE' : formatCurrency(shippingFee)}</span>
              </div>
              <div className="flex justify-between text-ink font-bold text-base pt-3 border-t border-line">
                <span>Total</span>
                <span className="text-brand">{formatCurrency(finalTotal)}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-ink-muted text-xs font-mono pt-4 border-t border-line">
              <ShieldCheck size={16} className="text-brand" />
              <span>256-Bit SSL Encrypted Checkout</span>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
