import { useState, useEffect } from 'react';

function getViewportInfo() {
  const width = typeof window === 'undefined' ? 0 : window.innerWidth;
  return {
    isMobile: width < 768,
    isTablet: width >= 768 && width < 1024
  };
}

function prefersReducedMotion() {
  return typeof window !== 'undefined'
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function supportsWebGL() {
  if (typeof window === 'undefined') return false;
  try {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('webgl2') || canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    context?.getExtension('WEBGL_lose_context')?.loseContext();
    return Boolean(context);
  } catch {
    return false;
  }
}

function getDeviceInfo() {
  const reduceMotion = prefersReducedMotion();
  return {
    ...getViewportInfo(),
    reduceMotion,
    canUse3D: supportsWebGL() && !reduceMotion
  };
}

export default function useDevice() {
  const [deviceInfo, setDeviceInfo] = useState(getDeviceInfo);

  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updateViewport = () => {
      const viewport = getViewportInfo();
      setDeviceInfo((current) => ({ ...current, ...viewport }));
    };
    const updateMotion = () => {
      const reduceMotion = motionQuery.matches;
      setDeviceInfo((current) => ({
        ...current,
        reduceMotion,
        canUse3D: reduceMotion ? false : current.canUse3D || supportsWebGL()
      }));
    };

    window.addEventListener('resize', updateViewport, { passive: true });
    motionQuery.addEventListener?.('change', updateMotion);
    return () => {
      window.removeEventListener('resize', updateViewport);
      motionQuery.removeEventListener?.('change', updateMotion);
    };
  }, []);

  return deviceInfo;
}
