import { useEffect, useRef, useImperativeHandle, forwardRef } from "react";
import Lenis from "lenis";

interface SmoothScrollProps {
  children: React.ReactNode;
}

export interface SmoothScrollRef {
  scrollToTop: () => void;
}

const SmoothScroll = forwardRef<SmoothScrollRef, SmoothScrollProps>(({ children }, ref) => {
  const lenisRef = useRef<Lenis | null>(null);

  useImperativeHandle(ref, () => ({
    scrollToTop: () => {
      if (lenisRef.current) {
        lenisRef.current.scrollTo(0, { immediate: false });
      }
    }
  }));

  useEffect(() => {
    // Initialize Lenis smooth scroll optimized for ultra-smooth 8K video performance
    const lenis = new Lenis({
      duration: 1.2, // Slightly longer for ultra-smooth video sync
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      smoothWheel: true,
      touchMultiplier: 2,
      // Performance optimizations for 8K video (removed unsupported 'smoothTouch' option)
      // Reduce lerp for more responsive video control
      lerp: 0.1, // Even smoother interpolation
      wheelMultiplier: 0.8, // Gentler wheel scrolling
    });

    lenisRef.current = lenis;

    // High-performance animation frame loop for 8K video sync
    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    return () => {
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
});

SmoothScroll.displayName = "SmoothScroll";

export default SmoothScroll;
