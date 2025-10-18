import { useScroll, useTransform, MotionValue } from "framer-motion";
import { RefObject } from "react";

export const useParallax = (ref: RefObject<HTMLElement>, distance = 100) => {
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [-distance, distance]);
  
  return y;
};

export const useParallaxHorizontal = (ref: RefObject<HTMLElement>, distance = 50) => {
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const x = useTransform(scrollYProgress, [0, 1], [-distance, distance]);
  
  return x;
};
