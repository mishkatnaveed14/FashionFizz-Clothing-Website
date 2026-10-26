import React, { useState } from 'react';

export default function ImageWithFallback({
  src,
  alt,
  className = '',
  fallbackClassName = '',
  fallbackLabel = 'FashionFizz editorial',
  fallbackStyle = undefined,
  imageRef = null,
  ...imageProps
}) {
  const [failedSrc, setFailedSrc] = useState(null);
  const failed = failedSrc === src;

  if (failed) {
    return (
      <div
        role="img"
        aria-label={`${alt}. Image unavailable.`}
        className={`flex items-center justify-center overflow-hidden bg-[radial-gradient(ellipse_at_top_right,_#eadfd2,_#f8f5ef_65%)] ${className} ${fallbackClassName}`}
        style={fallbackStyle}
      >
        {fallbackLabel && (
          <span aria-hidden="true" className="rounded-full border border-black/10 bg-white/75 px-4 py-2 font-body text-[10px] uppercase tracking-[0.16em] text-ink-muted">
            {fallbackLabel}
          </span>
        )}
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
      onError={() => setFailedSrc(src)}
    />
  );
}
