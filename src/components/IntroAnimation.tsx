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

    // Shorter duration for a more professional feel
    const timer = setTimeout(() => setShow(false), 2800);

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
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[200] bg-gradient-to-br from-luxury-white via-background to-luxury-beige flex items-center justify-center overflow-hidden"
          aria-hidden
        >
          {/* Subtle background pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 25% 25%, hsl(var(--warm-gold)) 1px, transparent 1px),
                               radial-gradient(circle at 75% 75%, hsl(var(--warm-gold)) 1px, transparent 1px)`,
              backgroundSize: '60px 60px'
            }} />
          </div>

          {/* Content */}
          <div className="relative flex flex-col items-center text-center">
            {/* Elegant logo mark */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                duration: 0.8,
                ease: [0.25, 0.1, 0.25, 1],
                delay: 0.2
              }}
              className="mb-8"
            >
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-luxury-gold to-luxury-gold/80 flex items-center justify-center shadow-2xl">
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 21h18"/>
                  <path d="M5 21V7l8-4v18"/>
                  <path d="M19 21V11l-6-4"/>
                  <path d="M9 9v.01"/>
                  <path d="M9 12v.01"/>
                  <path d="M9 15v.01"/>
                  <path d="M9 18v.01"/>
                </svg>
              </div>
            </motion.div>

            {/* Company name with staggered reveal */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                ease: [0.25, 0.1, 0.25, 1],
                delay: 0.6
              }}
              className="mb-2"
            >
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-playfair font-bold text-luxury-charcoal tracking-tight">
                SURYA
              </h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                ease: [0.25, 0.1, 0.25, 1],
                delay: 0.8
              }}
              className="mb-6"
            >
              <h2 className="text-2xl md:text-4xl lg:text-5xl font-elegant font-medium text-luxury-charcoal/80 tracking-wide">
                ARCHITECTS
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                ease: [0.25, 0.1, 0.25, 1],
                delay: 1.0
              }}
            >
              <p className="text-lg md:text-xl text-muted-foreground font-light tracking-widest uppercase">
                & Interiors
              </p>
            </motion.div>

            {/* Minimal progress indicator */}
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{
                duration: 0.6,
                ease: [0.25, 0.1, 0.25, 1],
                delay: 1.4
              }}
              className="mt-12 w-32 h-px bg-gradient-to-r from-transparent via-luxury-gold to-transparent"
            >
              {!reducedMotion && (
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{
                    duration: 1.2,
                    ease: [0.25, 0.1, 0.25, 1],
                    delay: 1.6
                  }}
                  className="h-full bg-luxury-gold origin-left"
                />
              )}
            </motion.div>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: 0.8,
                ease: [0.25, 0.1, 0.25, 1],
                delay: 1.8
              }}
              className="mt-8 text-sm md:text-base text-muted-foreground font-light tracking-wider"
            >
              Crafting Timeless Spaces with Elegance and Precision  
            </motion.p>
          </div>

          {/* Subtle light rays */}
          {!reducedMotion && (
            <>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: [0, 0.1, 0], scale: 1 }}
                transition={{
                  duration: 2.5,
                  ease: "easeInOut",
                  delay: 0.5,
                  repeat: Infinity,
                  repeatDelay: 1
                }}
                className="absolute top-1/4 left-1/4 w-96 h-96 bg-luxury-gold/10 rounded-full blur-3xl"
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: [0, 0.08, 0], scale: 1 }}
                transition={{
                  duration: 2.5,
                  ease: "easeInOut",
                  delay: 1,
                  repeat: Infinity,
                  repeatDelay: 1
                }}
                className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-luxury-gold/8 rounded-full blur-3xl"
              />
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default IntroAnimation;
