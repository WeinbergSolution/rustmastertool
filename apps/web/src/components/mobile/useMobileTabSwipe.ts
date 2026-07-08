import { useEffect } from 'react';

export type SwipeTab = 'home' | 'servers' | 'live' | 'learn';

interface MobileTabSwipeOptions {
  currentTab: SwipeTab | 'more';
  onTabChange: (tab: SwipeTab) => void;
  enabled: boolean;
}

const TAB_ORDER: SwipeTab[] = ['home', 'servers', 'live', 'learn'];

export function useMobileTabSwipe({ currentTab, onTabChange, enabled }: MobileTabSwipeOptions) {
  useEffect(() => {
    if (!enabled) return;

    let touchStartX = 0;
    let touchStartY = 0;

    const handleTouchStart = (e: TouchEvent) => {
      // Don't intercept multi-touch
      if (e.touches.length > 1) return;

      const target = e.target as HTMLElement;
      if (!target) return;

      // Ensure we don't swipe when touching interactive elements
      const interactiveTags = ['INPUT', 'TEXTAREA', 'SELECT', 'IFRAME'];
      if (interactiveTags.includes(target.tagName)) return;
      if (target.isContentEditable) return;

      // Exclude interactive / horizontal scrolling areas and overlays
      const excludedClasses = [
        '.bottom-sheet',
        '.bottom-sheet-scrim',
        '.stage-filters',
        '.mobile-seg',
        '.mobile-home-rail',
        '.video-card',
        '.server-card',
        '.srv-connect',
        '.srv-map-ind',
        '.video-modal-overlay'
      ];
      if (target.closest(excludedClasses.join(', '))) return;

      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      // Only process single touch releases
      if (e.changedTouches.length > 1) return;
      if (touchStartX === 0 && touchStartY === 0) return;

      const touchEndX = e.changedTouches[0].clientX;
      const touchEndY = e.changedTouches[0].clientY;

      const dx = touchEndX - touchStartX;
      const dy = touchEndY - touchStartY;

      // Reset for next swipe
      touchStartX = 0;
      touchStartY = 0;

      // Minimum distance to count as a swipe
      if (Math.abs(dx) < 60) return;

      // Swipe must be predominantly horizontal (dx must be larger than dy * 1.5)
      if (Math.abs(dx) <= Math.abs(dy) * 1.5) return;

      // We don't swipe from the 'more' tab view since it's not strictly part of the horizontal flow
      if (currentTab === 'more') return;
      
      const currentIndex = TAB_ORDER.indexOf(currentTab);
      if (currentIndex === -1) return;

      if (dx > 0) {
        // Swipe Right -> Previous Tab
        if (currentIndex > 0) {
          onTabChange(TAB_ORDER[currentIndex - 1]);
        }
      } else {
        // Swipe Left -> Next Tab
        if (currentIndex < TAB_ORDER.length - 1) {
          onTabChange(TAB_ORDER[currentIndex + 1]);
        }
      }
    };

    const container = document.querySelector('main.mobile-content') as HTMLElement;
    if (!container) return;

    // Use passive listener so we don't block vertical scrolling
    container.addEventListener('touchstart', handleTouchStart, { passive: true });
    container.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchend', handleTouchEnd);
    };
  }, [currentTab, onTabChange, enabled]);
}
