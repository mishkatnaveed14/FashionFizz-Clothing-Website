import React from 'react';

export default function BrandLogo({ compact = false, className = '' }) {
  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <span className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-brand/40 bg-paper-surface text-brand">
        <svg aria-hidden="true" viewBox="0 0 32 32" className="h-7 w-7 fill-none">
          <path d="M8 25V7h17M8 15h13" stroke="currentColor" strokeWidth="2.4" strokeLinecap="square" />
          <path d="M20 25V15h6M20 20h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" opacity=".65" />
        </svg>
        <span className="absolute -bottom-1 -right-1 h-2.5 w-2.5 border-2 border-paper-surface bg-brand" />
      </span>
      {!compact && (
        <span className="flex min-w-0 flex-col leading-none">
          <span className="font-display text-[20px] font-medium tracking-[0.04em] text-ink">FASHIONFIZZ</span>
          <span className="mt-1.5 font-body text-[9px] uppercase tracking-[0.19em] text-ink-muted">Aura Chromatique</span>
        </span>
      )}
    </span>
  );
}
