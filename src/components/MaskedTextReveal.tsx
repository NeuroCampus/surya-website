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
                  0 1px 0 rgba(0, 0, 0, 0.3),
                  0 2px 0 rgba(0, 0, 0, 0.25),
                  0 3px 0 rgba(0, 0, 0, 0.2),
                  0 4px 0 rgba(0, 0, 0, 0.15),
                  0 5px 0 rgba(0, 0, 0, 0.1),
                  0 6px 1px rgba(0, 0, 0, 0.05),
                  0 10px 30px rgba(0, 0, 0, 0.4)
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
