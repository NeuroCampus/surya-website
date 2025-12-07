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
        loading="lazy"
        decoding="async"
        className="w-full h-full object-cover"
        style={{
          willChange: "transform, opacity",
        }}
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ opacity: isInView ? 1 : 0.8, scale: isInView ? 1 : 1.05 }}
        transition={{
          duration: 0.9,
          ease: [0.25, 0.1, 0.25, 1],
        }}
      />
    </div>
  );
};

export default ImageReveal;
