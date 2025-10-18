import { useScroll, useVelocity, useSpring, useTransform } from "framer-motion";

export const useScrollVelocity = () => {
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400
  });
  
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false
  });

  return { scrollY, scrollVelocity, smoothVelocity, velocityFactor };
};
