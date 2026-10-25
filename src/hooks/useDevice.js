import { useState, useEffect } from 'react';

function getDeviceInfo() {
  const width = typeof window === 'undefined' ? 0 : window.innerWidth;
  const isMobile = width < 768;
  const isTablet = width >= 768 && width < 1024;
  const reduceMotion = typeof window !== 'undefined'
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let hasWebGL = false;
  if (typeof window !== 'undefined') {
    try {
      const canvas = document.createElement('canvas');
      hasWebGL = !!(
        window.WebGLRenderingContext
        && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
      );
    } catch {
      hasWebGL = false;
    }
  }

  return {
    isMobile,
    isTablet,
    reduceMotion,
    canUse3D: hasWebGL && !reduceMotion
  };
}

export default function useDevice() {
  const [deviceInfo, setDeviceInfo] = useState(getDeviceInfo);

  useEffect(() => {
    const checkDevice = () => setDeviceInfo(getDeviceInfo());
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  return deviceInfo;
}
