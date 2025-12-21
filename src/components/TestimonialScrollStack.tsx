import { useLayoutEffect, useRef, useCallback, type ReactNode } from 'react';
import Lenis from 'lenis';

/* ---------------------------------------------
   Small utility for smooth interpolation
--------------------------------------------- */
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

interface ScrollStackItemProps {
  children: ReactNode;
  itemClassName?: string;
}

export const ScrollStackItem = ({
  children,
  itemClassName = ''
}: ScrollStackItemProps) => (
  <div
    className={`scroll-stack-card relative w-full my-4 p-8 rounded-3xl shadow-xl box-border origin-top will-change-transform ${itemClassName}`.trim()}
    style={{
      backfaceVisibility: 'hidden',
      transformStyle: 'preserve-3d'
    }}
  >
    {children}
  </div>
);

interface ScrollStackProps {
  className?: string;
  children: ReactNode;
  itemDistance?: number;
  itemScale?: number;
  itemStackDistance?: number;
  stackPosition?: string;
  scaleEndPosition?: string;
  baseScale?: number;
  scaleDuration?: number;
  rotationAmount?: number;
  blurAmount?: number;
  useWindowScroll?: boolean;
  onStackComplete?: () => void;
}

const ScrollStack = ({
  children,
  className = '',
  itemDistance = 70,
  itemScale = 0.025,
  itemStackDistance = 35,
  stackPosition = '30%',
  scaleEndPosition = '15%',
  baseScale = 0.8,
  scaleDuration = 0.5,
  rotationAmount = 0.2,
  blurAmount = 0.6,
  useWindowScroll = false,
  onStackComplete
}: ScrollStackProps) => {
  const stackCompletedRef = useRef(false);
  const animationFrameRef = useRef<number | null>(null);
  const lenisRef = useRef<Lenis | null>(null);
  const cardsRef = useRef<HTMLElement[]>([]);
  const lastTransformsRef = useRef(
    new Map<number, { translateY: number; scale: number; rotation: number; blur: number }>()
  );
  const isUpdatingRef = useRef(false);

  const calculateProgress = useCallback((scrollTop: number, start: number, end: number) => {
    if (scrollTop < start) return 0;
    if (scrollTop > end) return 1;
    return (scrollTop - start) / (end - start);
  }, []);

  const parsePercentage = useCallback((value: string | number, containerHeight: number) => {
    if (typeof value === 'string' && value.includes('%')) {
      return (parseFloat(value) / 100) * containerHeight;
    }
    return parseFloat(value as string);
  }, []);

  const getScrollData = useCallback(() => {
    return {
      scrollTop: window.scrollY,
      containerHeight: window.innerHeight
    };
  }, []);

  const getElementOffset = useCallback((element: HTMLElement) => {
    const rect = element.getBoundingClientRect();
    return rect.top + window.scrollY;
  }, []);

  const updateCardTransforms = useCallback(() => {
    if (!cardsRef.current.length || isUpdatingRef.current) return;
    isUpdatingRef.current = true;

    const { scrollTop, containerHeight } = getScrollData();
    const stackPositionPx = parsePercentage(stackPosition, containerHeight);
    const scaleEndPositionPx = parsePercentage(scaleEndPosition, containerHeight);

    const endElement = document.querySelector('.scroll-stack-end') as HTMLElement | null;
    const endElementTop = endElement ? getElementOffset(endElement) : 0;

    // Calculate total stack height
    const lastCardIndex = cardsRef.current.length - 1;
    const lastCard = cardsRef.current[lastCardIndex];
    const lastCardTop = getElementOffset(lastCard);
    const lastCardPinStart = lastCardTop - stackPositionPx - itemStackDistance * lastCardIndex;
    const totalStackHeight = lastCardPinStart + (containerHeight * 0.9);

    cardsRef.current.forEach((card, i) => {
      const cardTop = getElementOffset(card);

      const triggerStart = cardTop - stackPositionPx - itemStackDistance * i;
      const triggerEnd = cardTop - scaleEndPositionPx;
      const pinStart = triggerStart;
      
      // Use the calculated total stack height for all cards
      const pinEnd = totalStackHeight - containerHeight / 2;

      const scaleProgress = calculateProgress(scrollTop, triggerStart, triggerEnd);
      const targetScale = baseScale + i * itemScale;

      let translateY = 0;
      const isPinned = scrollTop >= pinStart && scrollTop <= pinEnd;

      if (isPinned) {
        translateY = scrollTop - cardTop + stackPositionPx + itemStackDistance * i;
      } else if (scrollTop > pinEnd) {
        translateY = pinEnd - cardTop + stackPositionPx + itemStackDistance * i;
      }

      const desired = {
        translateY,
        scale: 1 - scaleProgress * (1 - targetScale),
        rotation: rotationAmount ? i * rotationAmount * scaleProgress : 0,
        blur: 0
      };

      if (blurAmount) {
        let topIndex = 0;
        for (let j = 0; j < cardsRef.current.length; j++) {
          const jTop = getElementOffset(cardsRef.current[j]);
          const jTrigger = jTop - stackPositionPx - itemStackDistance * j;
          if (scrollTop >= jTrigger) topIndex = j;
        }
        if (i < topIndex) desired.blur = (topIndex - i) * blurAmount;
      }

      const prev =
        lastTransformsRef.current.get(i) ?? desired;

      const scrollDelta = scrollTop - prev.translateY;
      const smooth = scrollDelta > 0 ? 0.08 : 0.12;

      const eased = {
        translateY: lerp(prev.translateY, desired.translateY, smooth),
        scale: lerp(prev.scale, desired.scale, 0.1),
        rotation: lerp(prev.rotation, desired.rotation, 0.1),
        blur: lerp(prev.blur, desired.blur, 0.1)
      };

      card.style.transform = `translate3d(0, ${eased.translateY}px, 0) scale(${eased.scale}) rotate(${eased.rotation}deg)`;
      card.style.filter = eased.blur > 0 ? `blur(${eased.blur}px)` : '';

      lastTransformsRef.current.set(i, eased);

      if (i === lastCardIndex) {
        const inView = scrollTop >= pinStart && scrollTop <= pinEnd;
        if (inView && !stackCompletedRef.current) {
          stackCompletedRef.current = true;
          onStackComplete?.();
        } else if (!inView && stackCompletedRef.current) {
          stackCompletedRef.current = false;
        }
      }
    });

    isUpdatingRef.current = false;
  }, [
    itemScale,
    itemStackDistance,
    stackPosition,
    scaleEndPosition,
    baseScale,
    rotationAmount,
    blurAmount,
    calculateProgress,
    parsePercentage,
    getScrollData,
    getElementOffset,
    onStackComplete
  ]);

  const setupLenis = useCallback(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      lerp: 0.08,
      syncTouch: true,
      syncTouchLerp: 0.06
    });

    lenis.on('scroll', updateCardTransforms);

    const raf = (time: number) => {
      lenis.raf(time);
      animationFrameRef.current = requestAnimationFrame(raf);
    };
    animationFrameRef.current = requestAnimationFrame(raf);

    lenisRef.current = lenis;
  }, [updateCardTransforms]);

  useLayoutEffect(() => {
    cardsRef.current = Array.from(
      document.querySelectorAll('.scroll-stack-card')
    ) as HTMLElement[];

    cardsRef.current.forEach((card, i) => {
      if (i < cardsRef.current.length - 1) {
        card.style.marginBottom = `${itemDistance}px`;
      }
      card.style.willChange = 'transform, filter';
      card.style.transformOrigin = 'top center';
      card.style.backfaceVisibility = 'hidden';
      card.style.transform = 'translateZ(0)';
      card.style.perspective = '1000px';
    });

    setupLenis();
    updateCardTransforms();

    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      lenisRef.current?.destroy();
      lastTransformsRef.current.clear();
    };
  }, [itemDistance, setupLenis, updateCardTransforms]);

  return (
    <div className={`relative w-full ${className}`.trim()}>
      <div className="scroll-stack-inner pt-[20vh] px-4 sm:px-8 md:px-12 lg:px-20 pb-[150vh] min-h-[300vh]">
        {children}
        <div className="scroll-stack-end w-full h-px" />
      </div>
    </div>
  );
};

export default ScrollStack;
export { ScrollStack as TestimonialScrollStack };