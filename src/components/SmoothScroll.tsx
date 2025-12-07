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
    // Initialize Lenis smooth scroll optimized for performance
    const lenis = new Lenis({
      duration: 1.0, // Balanced duration
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      smoothWheel: true,
      touchMultiplier: 2,
      // Performance optimizations
      lerp: 0.15, // More responsive interpolation
      wheelMultiplier: 1.0, // Standard wheel scrolling
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
