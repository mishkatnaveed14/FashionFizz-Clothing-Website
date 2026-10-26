import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../lib/store';
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';

export function Button({ 
  children, 
  variant = 'primary', 
  className = '', 
  onClick, 
  type = 'button',
  disabled = false,
  ...props 
}) {
  const baseStyle = "inline-flex items-center justify-center font-mono text-xs uppercase tracking-wider transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-brand text-white px-6 py-3.5 rounded-full font-semibold hover:-translate-y-0.5 hover:bg-[#586C55] hover:shadow-[0_10px_24px_rgba(77,100,75,0.18)] active:translate-y-0",
    secondary: "bg-paper-surface border border-line text-ink px-6 py-3.5 rounded-full hover:bg-soft hover:border-brand",
    outline: "bg-transparent border border-line text-ink-muted px-5 py-2.5 rounded-full hover:text-ink hover:border-brand",
    danger: "bg-red-700 text-white px-6 py-3.5 rounded-full font-semibold hover:bg-red-600"
  };

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      whileHover={!disabled ? { y: -2 } : {}}
      whileTap={!disabled ? { y: 0 } : {}}
      className={`${baseStyle} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
}

export function Card({ children, className = '', hover = true, ...props }) {
  return (
    <motion.div
      whileHover={hover ? { y: -4, borderColor: 'var(--color-brand)' } : {}}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className={`bg-paper-surface border border-line p-6 rounded-2xl relative shadow-[0_5px_24px_rgba(31,33,30,0.035)] ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function Badge({ children, variant = 'brand', className = '', ...props }) {
  const variants = {
    brand: "bg-brand text-white font-body text-[10px] uppercase font-semibold px-3 py-1.5 rounded-full tracking-widest",
    accent: "bg-accent text-ink font-body text-[10px] uppercase font-semibold px-3 py-1.5 rounded-full tracking-widest",
    outline: "border border-chrome text-ink font-mono text-[10px] uppercase px-2.5 py-1 rounded-full tracking-widest",
    muted: "bg-soft text-ink-muted font-mono text-[10px] uppercase px-2.5 py-1 rounded-full tracking-widest"
  };

  return (
    <span className={`inline-flex items-center ${variants[variant]} ${className}`} {...props}>
      {children}
    </span>
  );
}

export function Input({ label, error, className = '', ...props }) {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && <label className="font-mono text-xs text-ink-muted uppercase tracking-wider">{label}</label>}
      <input
        className={`bg-paper-surface border border-line text-ink px-4 py-3.5 rounded-xl font-body text-sm outline-none transition-all duration-200 focus:border-brand focus:shadow-[0_0_0_1px_var(--color-brand)] ${className}`}
        {...props}
      />
      {error && <span className="text-red-500 font-mono text-xs">{error}</span>}
    </div>
  );
}

export function Select({ label, error, children, className = '', ...props }) {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && <label className="font-mono text-xs text-ink-muted uppercase tracking-wider">{label}</label>}
      <select
        className={`bg-paper-surface border border-line text-ink px-4 py-3.5 rounded-xl font-body text-sm outline-none transition-all duration-200 focus:border-brand focus:shadow-[0_0_0_1px_var(--color-brand)] ${className}`}
        {...props}
      >
        {children}
      </select>
      {error && <span className="text-red-500 font-mono text-xs">{error}</span>}
    </div>
  );
}

export function Textarea({ label, error, className = '', ...props }) {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && <label className="font-mono text-xs text-ink-muted uppercase tracking-wider">{label}</label>}
      <textarea
        className={`bg-paper-surface border border-line text-ink p-4 rounded-xl font-body text-sm outline-none transition-all duration-200 focus:border-brand focus:shadow-[0_0_0_1px_var(--color-brand)] ${className}`}
        {...props}
      />
      {error && <span className="text-red-500 font-mono text-xs">{error}</span>}
    </div>
  );
}

export function Modal({ isOpen, onClose, title, children }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-paper/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="bg-paper-surface border border-line w-full max-w-xl p-8 rounded-2xl shadow-[0_24px_64px_rgba(31,33,30,0.16),0_0_0_1px_var(--color-line)] relative max-h-[90vh] overflow-y-auto"
        >
          <div className="flex items-center justify-between pb-6 mb-6 border-b border-line">
            <h3 className="text-2xl font-display font-semibold text-ink">{title}</h3>
            <button
              onClick={onClose}
              className="text-ink-muted hover:text-ink p-2 transition-colors cursor-pointer"
            >
              <X size={20} />
            </button>
          </div>
          {children}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

export function Reveal({ children, className = '', delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function SectionTitle({ subtitle, title, alignment = 'center', className = '' }) {
  const alignments = {
    center: 'text-center items-center',
    left: 'text-left items-start',
    right: 'text-right items-end'
  };

  return (
    <div className={`flex flex-col gap-3 mb-12 ${alignments[alignment]} ${className}`}>
      {subtitle && (
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-brand">
          {subtitle}
        </span>
      )}
      <h2 className="text-3xl md:text-5xl font-display font-medium text-ink tracking-tight">
        {title}
      </h2>
    </div>
  );
}

export function Stat({ label, value, change, icon: Icon }) {
  return (
    <Card className="flex flex-col gap-3">
      <div className="flex items-center justify-between text-ink-muted">
        <span className="font-mono text-xs uppercase tracking-wider">{label}</span>
        {Icon && <Icon size={20} className="text-brand" />}
      </div>
      <div className="flex items-baseline gap-3">
        <span className="font-display text-3xl font-bold text-ink">{value}</span>
        {change && (
          <span className={`font-mono text-xs ${change.startsWith('+') ? 'text-emerald-400' : 'text-red-400'}`}>
            {change}
          </span>
        )}
      </div>
    </Card>
  );
}

export function EmptyState({ title, description, action }) {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center bg-paper-surface border border-line rounded-[4px]">
      <Info size={40} className="text-brand mb-4" />
      <h3 className="font-display text-xl text-ink mb-2">{title}</h3>
      <p className="text-ink-muted text-sm max-w-md mb-6">{description}</p>
      {action}
    </div>
  );
}

export function Toaster() {
  const { toasts } = useStore();

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-sm w-full pointer-events-none">
      <AnimatePresence>
        {toasts.map((t) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, x: 50, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 50, scale: 0.9 }}
            className={`pointer-events-auto flex items-center gap-3 p-4 rounded-[4px] border shadow-[0_12px_32px_rgba(0,0,0,0.6)] ${
              t.type === 'error'
                ? 'bg-paper-surface border-red-500/50 text-ink'
                : 'bg-paper-surface border-brand/50 text-ink'
            }`}
          >
            {t.type === 'error' ? (
              <AlertCircle size={20} className="text-red-500 shrink-0" />
            ) : (
              <CheckCircle size={20} className="text-brand shrink-0" />
            )}
            <p className="font-body text-sm text-ink">{t.message}</p>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
