import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const IntroAnimation = () => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  const pathVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: { 
      pathLength: 1, 
      opacity: 1
    }
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="fixed inset-0 z-[200] bg-background flex items-center justify-center"
        >
          <div className="flex flex-col items-center">
            {/* Architectural mansion line drawing */}
            <motion.svg
              width="300"
              height="200"
              viewBox="0 0 300 200"
              className="mb-12 text-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {/* Foundation */}
              <motion.path
                d="M 50 180 L 250 180"
                stroke="currentColor"
                strokeWidth="1"
                fill="none"
                variants={pathVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0, duration: 0.8, ease: [0.25, 0.1, 0.25, 1] as any }}
              />
              
              {/* Left wall */}
              <motion.path
                d="M 60 180 L 60 100"
                stroke="currentColor"
                strokeWidth="1"
                fill="none"
                variants={pathVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.15, duration: 0.8, ease: [0.25, 0.1, 0.25, 1] as any }}
              />
              
              {/* Right wall */}
              <motion.path
                d="M 240 180 L 240 100"
                stroke="currentColor"
                strokeWidth="1"
                fill="none"
                variants={pathVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.3, duration: 0.8, ease: [0.25, 0.1, 0.25, 1] as any }}
              />
              
              {/* Left roof slope */}
              <motion.path
                d="M 60 100 L 150 40"
                stroke="currentColor"
                strokeWidth="1"
                fill="none"
                variants={pathVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.45, duration: 0.8, ease: [0.25, 0.1, 0.25, 1] as any }}
              />
              
              {/* Right roof slope */}
              <motion.path
                d="M 150 40 L 240 100"
                stroke="currentColor"
                strokeWidth="1"
                fill="none"
                variants={pathVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.6, duration: 0.8, ease: [0.25, 0.1, 0.25, 1] as any }}
              />
              
              {/* Door */}
              <motion.path
                d="M 135 180 L 135 145 L 165 145 L 165 180"
                stroke="currentColor"
                strokeWidth="1"
                fill="none"
                variants={pathVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.75, duration: 0.8, ease: [0.25, 0.1, 0.25, 1] as any }}
              />
              
              {/* Left window */}
              <motion.path
                d="M 80 140 L 80 120 L 105 120 L 105 140 L 80 140 M 92.5 120 L 92.5 140 M 80 130 L 105 130"
                stroke="currentColor"
                strokeWidth="0.8"
                fill="none"
                variants={pathVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.9, duration: 0.8, ease: [0.25, 0.1, 0.25, 1] as any }}
              />
              
              {/* Right window */}
              <motion.path
                d="M 195 140 L 195 120 L 220 120 L 220 140 L 195 140 M 207.5 120 L 207.5 140 M 195 130 L 220 130"
                stroke="currentColor"
                strokeWidth="0.8"
                fill="none"
                variants={pathVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: 1.05, duration: 0.8, ease: [0.25, 0.1, 0.25, 1] as any }}
              />
              
              {/* Center upper window */}
              <motion.path
                d="M 140 85 L 140 70 L 160 70 L 160 85 L 140 85 M 150 70 L 150 85"
                stroke="currentColor"
                strokeWidth="0.8"
                fill="none"
                variants={pathVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: 1.2, duration: 0.8, ease: [0.25, 0.1, 0.25, 1] as any }}
              />
              
              {/* Pillars */}
              <motion.path
                d="M 90 180 L 90 100 M 210 180 L 210 100"
                stroke="currentColor"
                strokeWidth="0.6"
                fill="none"
                variants={pathVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: 1.35, duration: 0.8, ease: [0.25, 0.1, 0.25, 1] as any }}
              />
            </motion.svg>

            {/* Company name */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 2 }}
              className="text-center"
            >
              <h1 className="text-5xl md:text-6xl tracking-luxury-wide mb-2 font-display-1">
                Surya Architects
              </h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 2.5 }}
                className="text-xl tracking-luxury text-muted-foreground"
              >
                & Interiors
              </motion.p>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default IntroAnimation;
