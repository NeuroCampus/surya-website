import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface ImageRevealProps {
  src: string;
  alt: string;
  className?: string;
}

const ImageReveal = ({ src, alt, className = "" }: ImageRevealProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.img
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
        style={{
          filter: isInView ? "grayscale(0)" : "grayscale(1)",
        }}
        animate={{
          scale: isInView ? 1 : 1.1,
          filter: isInView ? "grayscale(0)" : "grayscale(1)",
        }}
        transition={{
          duration: 1.2,
          ease: [0.25, 0.1, 0.25, 1],
        }}
      />
    </div>
  );
};

export default ImageReveal;
