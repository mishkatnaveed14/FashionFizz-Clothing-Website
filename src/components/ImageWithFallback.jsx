import React, { useEffect, useState } from 'react';

export default function ImageWithFallback({
  src,
  alt,
  className = '',
  fallbackClassName = '',
  imageRef = null,
  ...imageProps
}) {
  const [failed, setFailed] = useState(false);

  useEffect(() => setFailed(false), [src]);

  if (failed) {
    return (
      <div
        role="img"
        aria-label={`${alt}. Image unavailable.`}
        className={`flex items-center justify-center overflow-hidden bg-[radial-gradient(ellipse_at_top_right,_#eadfd2,_#f8f5ef_65%)] ${className} ${fallbackClassName}`}
      >
        <span aria-hidden="true" className="rounded-full border border-black/10 bg-white/75 px-4 py-2 font-body text-[10px] uppercase tracking-[0.16em] text-ink-muted">
          FashionFizz editorial
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      ref={imageRef}
      {...imageProps}
      onError={() => setFailed(true)}
    />
  );
}
