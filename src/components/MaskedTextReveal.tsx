import { motion } from "framer-motion";
import { ReactNode } from "react";

interface MaskedTextRevealProps {
  children: string;
  className?: string;
  delay?: number;
  staggerDelay?: number;
}

const MaskedTextReveal = ({ 
  children, 
  className = "",
  delay = 0,
  staggerDelay = 0.03
}: MaskedTextRevealProps) => {
  const words = children.split(" ");

  return (
    <div className={`overflow-hidden ${className}`}>
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="inline-block overflow-hidden mr-2">
          {word.split("").map((char, charIndex) => (
            <motion.span
              key={`${wordIndex}-${charIndex}`}
              initial={{ y: "100%", opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{
                delay: delay + (wordIndex * word.length + charIndex) * staggerDelay,
                duration: 0.5,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              viewport={{ once: true }}
              className="inline-block"
              style={{
                textShadow: `
                  2px 2px 0px rgba(0, 0, 0, 0.1),
                  4px 4px 0px rgba(0, 0, 0, 0.08),
                  6px 6px 0px rgba(0, 0, 0, 0.06),
                  8px 8px 10px rgba(0, 0, 0, 0.15)
                `
              }}
            >
              {char}
            </motion.span>
          ))}
        </span>
      ))}
    </div>
  );
};

export default MaskedTextReveal;
