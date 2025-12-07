import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const IntroAnimation = () => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    // Show for 4 seconds
    const timer = setTimeout(() => setShow(false), 4000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="fixed inset-0 z-[200] bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center overflow-hidden"
          aria-hidden
        >
          {/* Background decorative elements */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-20 left-20 w-32 h-32 border border-gray-300 rotate-45"></div>
            <div className="absolute bottom-20 right-20 w-24 h-24 border border-gray-300 rotate-12"></div>
            <div className="absolute top-1/2 left-10 w-16 h-16 border border-gray-300 -rotate-12"></div>
            <div className="absolute bottom-1/3 right-10 w-20 h-20 border border-gray-300 rotate-30"></div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              duration: 1.2,
              ease: [0.25, 0.1, 0.25, 1],
              delay: 0.3
            }}
            className="text-center relative z-10"
          >
            <motion.h1
              className="text-6xl md:text-8xl font-bold font-serif text-gray-900 tracking-wide leading-tight"
              style={{
                textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
                fontFamily: '"Playfair Display", "Times New Roman", serif'
              }}
            >
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                SURYA
              </motion.span>
              <br />
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 1 }}
                className="text-4xl md:text-6xl"
              >
                ARCHITECTS &
              </motion.span>
              <br />
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 1.5 }}
                className="text-4xl md:text-6xl"
              >
                INTERIOR DESIGNERS
              </motion.span>
            </motion.h1>

            {/* Elegant underline */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 1.5, ease: "easeInOut" }}
              className="w-48 h-1 bg-gradient-to-r from-gray-400 to-gray-600 mx-auto mt-6 origin-center"
            />
          </motion.div>

          {/* Subtle particles */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              initial={{
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                opacity: 0,
                scale: 0
              }}
              animate={{
                opacity: [0, 0.6, 0],
                scale: [0, 1, 0],
                rotate: [0, 180, 360]
              }}
              transition={{
                duration: 3,
                delay: Math.random() * 2,
                repeat: Infinity,
                repeatDelay: 2
              }}
              className="absolute w-2 h-2 bg-gray-400 rounded-full"
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default IntroAnimation;
