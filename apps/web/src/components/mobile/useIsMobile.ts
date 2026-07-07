import { useEffect, useState } from 'react';

// Mobile / tablet breakpoint. Desktop shell is used >= 1024px.
const MOBILE_QUERY = '(max-width: 1023px)';

/**
 * Returns true when the viewport is below the desktop breakpoint (< 1024px).
 * Presentation-only: does not affect any data/auth logic.
 */
export function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = useState<boolean>(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return false;
    return window.matchMedia(MOBILE_QUERY).matches;
  });

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mql = window.matchMedia(MOBILE_QUERY);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    // Sync immediately in case it changed between render and effect.
    setIsMobile(mql.matches);
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, []);

  return isMobile;
}
