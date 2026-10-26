import React, { useRef, useState, useEffect, lazy, Suspense } from 'react';
import useDevice from '../hooks/useDevice';
import Fallback3D from '../components/Fallback3D';
import ErrorBoundary from '../components/ErrorBoundary';

const HeroScene3D = lazy(() => import('./HeroScene3D'));
const FabricViewer3D = lazy(() => import('./FabricViewer3D'));
const DrapedFabricScene = lazy(() => import('./DrapedFabricScene'));

export default function Scene3D({ variant = 'hero', className = '', ...props }) {
  const { canUse3D, isMobile } = useDevice();
  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const isEditorialScene = variant === 'hero' || variant === 'fabricStory';
  const shouldRender = isVisible;
  const fallback = isEditorialScene ? null : <Fallback3D variant={variant} className="h-full w-full" {...props} />;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return undefined;
    if (typeof IntersectionObserver === 'undefined') return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { rootMargin: variant === 'hero' ? '180px' : '120px', threshold: 0.05 }
    );
    observer.observe(container);

    return () => observer.disconnect();
  }, [variant]);

  if (!canUse3D || (isMobile && isEditorialScene)) return fallback;

  return (
    <div ref={containerRef} className={`relative h-full w-full overflow-hidden ${className}`} aria-hidden="true">
      {shouldRender && (
        <ErrorBoundary fallback={fallback}>
          <Suspense fallback={fallback}>
            {variant === 'hero' && <HeroScene3D />}
            {variant === 'fabric' && <FabricViewer3D {...props} />}
            {variant === 'fabricStory' && <DrapedFabricScene />}
          </Suspense>
        </ErrorBoundary>
      )}
    </div>
  );
}
