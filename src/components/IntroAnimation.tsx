import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const IntroAnimation = () => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[200] bg-background flex items-center justify-center"
        >
          <div className="relative">
            {/* Architectural line drawing animation */}
            <svg
              width="200"
              height="200"
              viewBox="0 0 200 200"
              className="absolute inset-0"
            >
              <motion.line
                x1="20"
                y1="180"
                x2="100"
                y2="20"
                stroke="currentColor"
                strokeWidth="0.5"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1, ease: "easeInOut" }}
              />
              <motion.line
                x1="100"
                y1="20"
                x2="180"
                y2="180"
                stroke="currentColor"
                strokeWidth="0.5"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1, delay: 0.3, ease: "easeInOut" }}
              />
              <motion.line
                x1="20"
                y1="180"
                x2="180"
                y2="180"
                stroke="currentColor"
                strokeWidth="0.5"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1, delay: 0.6, ease: "easeInOut" }}
              />
            </svg>

            {/* Brand name */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="text-4xl tracking-luxury-wide text-center"
            >
              SURYA
            </motion.h1>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default IntroAnimation;
