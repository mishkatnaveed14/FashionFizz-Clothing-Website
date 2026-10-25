import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import BrandLogo from './BrandLogo';

export function IntroLoader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setIsDone(true);
            if (onComplete) onComplete();
          }, 300);
          return 100;
        }
        return prev + 4;
      });
    }, 40);

    return () => clearInterval(timer);
  }, [onComplete]);

  if (isDone) return null;

  return (
    <motion.div
      exit={{ y: '-100%', transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }}
      className="fixed inset-0 z-[100] bg-paper flex flex-col items-center justify-center p-6 noise-overlay"
    >
      <div className="flex flex-col items-center gap-6 max-w-md w-full">
        <div className="relative flex h-24 w-24 items-center justify-center border border-line bg-paper-surface">
          <div className="absolute inset-1 border-t-2 border-brand animate-spin" />
          <BrandLogo compact />
        </div>
        <div className="flex flex-col items-center gap-2 text-center">
          <h2 className="font-display text-xl uppercase tracking-[0.3em] text-ink">FashionFizz</h2>
          <p className="font-mono text-xs text-ink-muted">Aura Chromatique Editorial Luxury</p>
        </div>
        <div className="w-full bg-line h-1 rounded-full overflow-hidden mt-4">
          <motion.div
            className="bg-brand h-full"
            style={{ width: `${progress}%` }}
          />
        </div>
        <span className="font-mono text-xs text-brand tracking-widest">
          {progress.toString().padStart(2, '0')}%
        </span>
      </div>
    </motion.div>
  );
}

export function RouteLoader() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center bg-paper">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 border-2 border-brand border-t-transparent rounded-full animate-spin" />
        <span className="font-mono text-xs text-ink-muted uppercase tracking-widest">Loading Atelier...</span>
      </div>
    </div>
  );
}
