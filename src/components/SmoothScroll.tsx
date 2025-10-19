import { useEffect, useRef } from "react";
import Lenis from "lenis";

interface SmoothScrollProps {
  children: React.ReactNode;
}

const SmoothScroll = ({ children }: SmoothScrollProps) => {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Initialize Lenis smooth scroll optimized for 8K video performance
    const lenis = new Lenis({
      duration: 1.4, // Slightly longer for ultra-smooth video sync
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      smoothWheel: true,
      touchMultiplier: 2,
      // Performance optimizations for 8K video
      normalizeWheel: true,
      smoothTouch: true,
      // Reduce lerp for more responsive video control
      lerp: 0.08,
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
};

export default SmoothScroll;
