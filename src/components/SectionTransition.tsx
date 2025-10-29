import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface SectionTransitionProps {
  children: React.ReactNode;
  className?: string;
  onMouseMove?: (e: React.MouseEvent) => void;
}

const SectionTransition = ({ children, className = "", onMouseMove }: SectionTransitionProps) => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.3, 1, 1, 0.3]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.95, 1, 1, 0.95]);
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [50, 0, 0, 50]);

  return (
    <motion.section
      ref={ref}
      style={{ 
        opacity, 
        scale,
        y
      }}
      className={className}
      onMouseMove={onMouseMove}
    >
      {children}
    </motion.section>
  );
};

export default SectionTransition;
