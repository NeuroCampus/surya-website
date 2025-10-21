import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const IntroAnimation = () => {
  const [show, setShow] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener('change', onChange);

    // Longer duration for construction animation
    const timer = setTimeout(() => setShow(false), 4000);

    return () => {
      clearTimeout(timer);
      mq.removeEventListener('change', onChange);
    };
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="fixed inset-0 z-[200] bg-white overflow-hidden"
          aria-hidden
        >
          {/* Construction Lines Animation */}
          <div className="absolute inset-0">
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 1200 800"
              className="absolute inset-0 w-full h-full"
            >
              {/* Foundation lines */}
              <motion.line
                x1="200"
                y1="600"
                x2="1000"
                y2="600"
                stroke="#374151"
                strokeWidth="2"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1, delay: 0.5, ease: "easeInOut" }}
              />
              <motion.line
                x1="200"
                y1="620"
                x2="1000"
                y2="620"
                stroke="#374151"
                strokeWidth="1"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.8, delay: 0.7, ease: "easeInOut" }}
              />

              {/* Main structure - base */}
              <motion.line
                x1="300"
                y1="600"
                x2="300"
                y2="200"
                stroke="#374151"
                strokeWidth="3"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5, delay: 1, ease: "easeInOut" }}
              />
              <motion.line
                x1="900"
                y1="600"
                x2="900"
                y2="200"
                stroke="#374151"
                strokeWidth="3"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5, delay: 1.2, ease: "easeInOut" }}
              />

              {/* Roof structure */}
              <motion.line
                x1="300"
                y1="200"
                x2="600"
                y2="100"
                stroke="#374151"
                strokeWidth="3"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1, delay: 2, ease: "easeInOut" }}
              />
              <motion.line
                x1="600"
                y1="100"
                x2="900"
                y2="200"
                stroke="#374151"
                strokeWidth="3"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1, delay: 2.2, ease: "easeInOut" }}
              />

              {/* Cross beams */}
              <motion.line
                x1="300"
                y1="350"
                x2="900"
                y2="350"
                stroke="#374151"
                strokeWidth="2"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1, delay: 2.5, ease: "easeInOut" }}
              />
              <motion.line
                x1="300"
                y1="500"
                x2="900"
                y2="500"
                stroke="#374151"
                strokeWidth="2"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1, delay: 2.7, ease: "easeInOut" }}
              />

              {/* Windows */}
              <motion.rect
                x="400"
                y="400"
                width="80"
                height="60"
                fill="none"
                stroke="#374151"
                strokeWidth="2"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.5, delay: 3, ease: "easeInOut" }}
              />
              <motion.rect
                x="520"
                y="400"
                width="80"
                height="60"
                fill="none"
                stroke="#374151"
                strokeWidth="2"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.5, delay: 3.1, ease: "easeInOut" }}
              />
              <motion.rect
                x="720"
                y="400"
                width="80"
                height="60"
                fill="none"
                stroke="#374151"
                strokeWidth="2"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.5, delay: 3.2, ease: "easeInOut" }}
              />

              {/* Door */}
              <motion.rect
                x="580"
                y="520"
                width="40"
                height="80"
                fill="none"
                stroke="#374151"
                strokeWidth="2"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.5, delay: 3.3, ease: "easeInOut" }}
              />

              {/* Chimney */}
              <motion.line
                x1="750"
                y1="200"
                x2="750"
                y2="120"
                stroke="#374151"
                strokeWidth="2"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.5, delay: 3.4, ease: "easeInOut" }}
              />
              <motion.line
                x1="750"
                y1="120"
                x2="780"
                y2="120"
                stroke="#374151"
                strokeWidth="2"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.3, delay: 3.5, ease: "easeInOut" }}
              />
              <motion.line
                x1="780"
                y1="120"
                x2="780"
                y2="140"
                stroke="#374151"
                strokeWidth="2"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.3, delay: 3.6, ease: "easeInOut" }}
              />
            </svg>
          </div>

          {/* Subtle glow effect */}
          {!reducedMotion && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: [0, 0.1, 0], scale: 1 }}
              transition={{
                duration: 3,
                ease: "easeInOut",
                delay: 1,
                repeat: Infinity,
                repeatDelay: 1
              }}
              className="absolute inset-0 bg-gradient-radial from-gray-200/20 via-transparent to-transparent"
            />
          )}

          {/* Construction particles */}
          {!reducedMotion && (
            <>
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{
                    x: Math.random() * window.innerWidth,
                    y: Math.random() * window.innerHeight,
                    opacity: 0
                  }}
                  animate={{
                    y: [null, -20, -40],
                    opacity: [0, 1, 0]
                  }}
                  transition={{
                    duration: 2,
                    delay: Math.random() * 3 + 1,
                    repeat: Infinity,
                    repeatDelay: Math.random() * 2 + 1
                  }}
                  className="absolute w-1 h-1 bg-gray-400 rounded-full"
                />
              ))}
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default IntroAnimation;
