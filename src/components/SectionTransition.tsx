import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface SectionTransitionProps {
  children: React.ReactNode;
  className?: string;
}

const SectionTransition = ({ children, className = "" }: SectionTransitionProps) => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0.7, 1, 1, 0.7]);
  const scale = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0.98, 1, 1, 0.98]);

  return (
    <motion.section
      ref={ref}
      style={{ opacity, scale }}
      className={className}
    >
      {children}
    </motion.section>
  );
};

export default SectionTransition;
