import React, { useRef, useState, useEffect, lazy, Suspense } from 'react';
import useDevice from '../hooks/useDevice';
import Fallback3D from '../components/Fallback3D';

const HeroScene3D = lazy(() => import('./HeroScene3D'));
const FabricViewer3D = lazy(() => import('./FabricViewer3D'));

export default function Scene3D({ variant = 'hero', className = '', ...props }) {
  const { canUse3D } = useDevice();
  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (variant === 'hero') {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );
    const container = containerRef.current;

    if (container) {
      observer.observe(container);
    }

    return () => {
      if (container) {
        observer.unobserve(container);
      }
      observer.disconnect();
    };
  }, [variant]);

  if (!canUse3D) {
    return <Fallback3D variant={variant} className={className} {...props} />;
  }

  return (
    <div ref={containerRef} className={`relative overflow-hidden ${className}`}>
      {variant === 'hero' || isVisible ? (
        <Suspense fallback={<Fallback3D variant={variant} className="w-full h-full" {...props} />}>
          {variant === 'hero' && <HeroScene3D {...props} />}
          {variant === 'fabric' && <FabricViewer3D {...props} />}
        </Suspense>
      ) : (
        <Fallback3D variant={variant} className={className} {...props} />
      )}
    </div>
  );
}
