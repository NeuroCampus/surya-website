import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import suryaLogo from "@/assets/suryalogo.png";

const IntroAnimation = () => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    // Show logo intro smoothly for ~1.6s before revealing the page
    const timer = setTimeout(() => setShow(false), 1400);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.01 }}
          transition={{ duration: 0.65, ease: [0.25, 0.1, 0.25, 1] }}
          className="fixed inset-0 z-[9999] bg-[#faf8f5] flex items-center justify-center overflow-hidden"
          aria-hidden
        >
          {/* Subtle architectural background pattern */}
          <div className="absolute inset-0 opacity-[0.04] pointer-events-none">
            <div className="absolute top-20 left-20 w-32 h-32 border border-luxury-charcoal rotate-45" />
            <div className="absolute bottom-20 right-20 w-24 h-24 border border-luxury-charcoal rotate-12" />
            <div className="absolute top-1/2 left-10 w-16 h-16 border border-luxury-charcoal -rotate-12" />
            <div className="absolute bottom-1/3 right-10 w-20 h-20 border border-luxury-charcoal rotate-30" />
          </div>

          {/* Logo Showcase Animation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{
              duration: 0.75,
              ease: [0.25, 0.1, 0.25, 1],
              delay: 0.05
            }}
            className="text-center relative z-10 px-6 max-w-2xl mx-auto"
          >
            {/* Logo display */}
            <div className="relative flex items-center justify-center">
              <img
                src={suryaLogo}
                alt="Surya Architects Logo"
                className="relative h-48 sm:h-64 md:h-80 w-auto max-w-full object-contain"
              />
            </div>

            {/* Retained original typography code for Surya Architects & Interior Designers */}
            {/*
            <motion.h1
              className="text-6xl md:text-8xl font-bold font-serif text-gray-900 tracking-wide leading-tight mt-6"
              style={{
                textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
                fontFamily: '"Playfair Display", "Times New Roman", serif'
              }}
            >
              <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.5 }}>
                SURYA
              </motion.span>
              <br />
              <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 1 }} className="text-4xl md:text-6xl">
                ARCHITECTS &
              </motion.span>
              <br />
              <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 1.5 }} className="text-4xl md:text-6xl">
                INTERIOR DESIGNERS
              </motion.span>
            </motion.h1>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 1.5, ease: "easeInOut" }}
              className="w-48 h-1 bg-gradient-to-r from-gray-400 to-gray-600 mx-auto mt-6 origin-center"
            />
            */}
          </motion.div>

          {/* Subtle ambient particles */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              initial={{
                x: Math.random() * 800 - 400,
                y: Math.random() * 600 - 300,
                opacity: 0,
                scale: 0
              }}
              animate={{
                opacity: [0, 0.4, 0],
                scale: [0, 1, 0]
              }}
              transition={{
                duration: 2.5,
                delay: i * 0.3,
                repeat: Infinity,
                repeatDelay: 1.5
              }}
              className="absolute w-1.5 h-1.5 bg-luxury-gold/50 rounded-full blur-[0.5px]"
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default IntroAnimation;
