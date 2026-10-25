import React from 'react';
import { motion } from 'framer-motion';
import { getColorSwatch } from '../lib/productImages';

export default function Fallback3D({ variant = 'hero', className = '', selectedColor = 'Crimson Red' }) {
  if (variant === 'fabric') {
    return (
      <div className={`relative flex h-full w-full flex-col items-center justify-center overflow-hidden border border-line bg-[#F5F1E9] ${className}`} style={{ perspective: '1000px' }}>
        <motion.div
          animate={{ rotateY: [-8, 8, -8], y: [0, -4, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="relative h-[210px] w-[190px] sm:h-[250px] sm:w-[220px]"
          style={{ transformStyle: 'preserve-3d' }}
        >
          <div className="absolute left-[4%] top-[12%] h-[48%] w-[34%] -rotate-[20deg] [clip-path:polygon(25%_0,100%_18%,70%_100%,0_86%)]" style={{ backgroundColor: getColorSwatch(selectedColor), filter: 'brightness(.84)' }} />
          <div className="absolute right-[4%] top-[12%] h-[48%] w-[34%] rotate-[20deg] [clip-path:polygon(75%_0,100%_86%,30%_100%,0_18%)]" style={{ backgroundColor: getColorSwatch(selectedColor), filter: 'brightness(.84)' }} />
          <div className="absolute left-[15%] top-[7%] h-[88%] w-[70%] shadow-[0_18px_30px_rgba(31,33,30,.18)] [clip-path:polygon(28%_0,43%_8%,50%_18%,57%_8%,72%_0,100%_14%,87%_35%,79%_31%,90%_100%,10%_100%,21%_31%,13%_35%,0_14%)]" style={{ background: `linear-gradient(120deg, ${getColorSwatch(selectedColor)}, color-mix(in srgb, ${getColorSwatch(selectedColor)} 70%, #171717))` }}>
            <div className="absolute left-1/2 top-[19%] h-[63%] w-[2px] -translate-x-1/2 bg-[#D7C9B3]/80" />
            <div className="absolute left-1/2 top-[22%] flex -translate-x-1/2 flex-col gap-3">
              {[0, 1, 2, 3].map((button) => (
                <span key={button} className="h-1 w-1 rounded-full bg-[#F5E8CF]" />
              ))}
            </div>
            <div className="absolute bottom-[8%] left-[12%] h-[2px] w-[76%] bg-[#D7C9B3]/70" />
          </div>
        </motion.div>
        <span className="absolute left-3 top-3 rounded-full border border-line bg-paper/90 px-3 py-1.5 font-body text-[10px] font-medium text-ink">{selectedColor} · garment preview</span>
      </div>
    );
  }

  return (
    <div className={`w-full h-full bg-paper flex items-center justify-end relative overflow-hidden ${className}`} style={{ perspective: '1200px' }}>
      <div className="absolute right-[8%] top-1/2 h-[min(74vw,590px)] w-[min(74vw,590px)] -translate-y-1/2 rounded-full border border-brand/15" />
      <div className="absolute right-[13%] top-1/2 h-[min(58vw,460px)] w-[min(58vw,460px)] -translate-y-1/2 rounded-full border border-chrome/50" />
      <motion.div
        animate={{ rotateX: [0, 3, 0, -3, 0], rotateY: [-8, 8, -8], y: [0, -8, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        className="relative mr-[7%] h-[min(70vh,530px)] w-[min(68vw,390px)] min-w-[230px]"
        style={{ transformStyle: 'preserve-3d' }}
      >
        <div className="absolute left-[5%] top-[19%] h-[43%] w-[28%] rotate-[23deg] bg-gradient-to-br from-[#8C4A3E] to-[#4B2420] shadow-[-18px_22px_36px_rgba(45,25,20,0.18)] [clip-path:polygon(40%_0,100%_14%,74%_100%,0_88%)]" />
        <div className="absolute right-[5%] top-[19%] h-[43%] w-[28%] -rotate-[23deg] bg-gradient-to-bl from-[#8C4A3E] to-[#4B2420] shadow-[18px_22px_36px_rgba(45,25,20,0.18)] [clip-path:polygon(60%_0,100%_88%,26%_100%,0_14%)]" />
        <div className="absolute left-[15%] top-[10%] h-[82%] w-[70%] bg-gradient-to-br from-[#99584A] via-[#70382F] to-[#40211F] shadow-[22px_30px_48px_rgba(45,25,20,0.22)] [clip-path:polygon(28%_0,43%_8%,57%_8%,72%_0,100%_14%,87%_34%,79%_31%,89%_100%,11%_100%,21%_31%,13%_34%,0_14%)]">
          <div className="absolute left-1/2 top-[8%] h-[11%] w-[22%] -translate-x-1/2 border-b-2 border-brand/80 [clip-path:polygon(0_0,100%_0,50%_100%)]" />
          <div className="absolute bottom-[8%] left-[14%] h-px w-[72%] bg-brand/65" />
          <div className="absolute left-1/2 top-[24%] h-[45%] w-px -translate-x-1/2 bg-brand/50" />
          <div className="absolute left-1/2 top-[25%] flex -translate-x-1/2 flex-col gap-5">
            {[0, 1, 2, 3, 4].map((button) => (
              <span key={button} className="h-1.5 w-1.5 rounded-full bg-[#E4B07C] shadow-[0_0_8px_rgba(209,121,62,0.6)]" />
            ))}
          </div>
          <span className="absolute bottom-[18%] left-1/2 -translate-x-1/2 font-display text-xs tracking-[0.18em] text-[#E4B07C]/80">FF</span>
        </div>
      </motion.div>
      <span className="absolute bottom-8 right-[9%] font-mono text-[9px] uppercase tracking-[0.22em] text-ink-muted">
        Aura Chromatique · 3D preview
      </span>
    </div>
  );
}
