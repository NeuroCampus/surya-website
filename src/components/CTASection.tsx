import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import MagneticButton from "./MagneticButton";

const CTASection = () => {
  return (
    <div className="relative py-12 md:py-16 lg:py-20 flex items-center justify-center overflow-hidden">
      {/* Subtle Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-luxury-beige/30 to-background" />

      {/* Minimal Decorative Elements */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.05, 0.1, 0.05]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-10 md:top-20 left-10 md:left-20 w-24 h-24 md:w-32 md:h-32 bg-luxury-gold/10 rounded-full blur-2xl"
        />
        <motion.div
          animate={{
            scale: [1.1, 1, 1.1],
            opacity: [0.03, 0.08, 0.03]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
          className="absolute bottom-10 md:bottom-20 right-10 md:right-20 w-32 h-32 md:w-40 md:h-40 bg-luxury-beige/20 rounded-full blur-2xl"
        />
      </div>

      <div className="relative z-10 container mx-auto max-w-4xl text-center px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          viewport={{ once: true }}
        >
          <motion.h2
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl tracking-luxury-wide mb-4 md:mb-6 font-display-1 font-light text-luxury-charcoal"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            {"Let's craft your next space".split(" ").map((word, wordIndex) => (
              <span key={wordIndex} className="inline-block mr-3 last:mr-0">
                {word.split("").map((char, charIndex) => (
                  <motion.span
                    key={`${wordIndex}-${charIndex}`}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: (wordIndex * 5 + charIndex) * 0.02, duration: 0.6 }}
                    viewport={{ once: true }}
                    className="inline-block hover:text-luxury-gold/70 transition-colors duration-300"
                  >
                    {char}
                  </motion.span>
                ))}
              </span>
            ))}
          </motion.h2>

          <motion.p
            className="text-sm sm:text-base md:text-lg lg:text-xl text-black tracking-luxury leading-relaxed mb-6 md:mb-8 lg:mb-10 max-w-2xl mx-auto font-light px-4"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            viewport={{ once: true }}
          >
            Transform your vision into reality with{" "}
            <span className="text-luxury-gold/80 font-medium">timeless design</span>{" "}
            and expert craftsmanship
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            viewport={{ once: true }}
          >
            <MagneticButton strength={0.4}>
              <Link
                to="/contact"
                className="inline-block px-8 sm:px-10 md:px-12 py-3 md:py-4 bg-luxury-gold/10 hover:bg-black text-luxury-charcoal hover:text-white border border-luxury-gold/30 hover:border-black tracking-luxury-wide uppercase text-xs sm:text-sm font-medium hover:shadow-lg hover:shadow-black/10 transition-all duration-300 rounded-xl touch-target"
              >
                Start a Project
              </Link>
            </MagneticButton>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default CTASection;
