import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import MagneticButton from "./MagneticButton";

const CTASection = () => {
  return (
    <section className="py-32 px-6">
      <div className="container mx-auto max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.h2 
            className="text-4xl md:text-6xl tracking-luxury-wide mb-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            {"Let's craft your next space".split("").map((char, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.02, duration: 0.5 }}
                viewport={{ once: true }}
                className="inline-block"
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </motion.h2>
          <p className="text-lg text-muted-foreground tracking-luxury mb-12 max-w-2xl mx-auto">
            Transform your vision into reality with timeless design and expert craftsmanship
          </p>
          <MagneticButton strength={0.5}>
            <Link
              to="/contact"
              className="inline-block px-16 py-5 border-2 border-foreground text-foreground tracking-luxury-wide uppercase text-sm hover:bg-foreground hover:text-background transition-smooth ambient-glow"
            >
              Start a Project
            </Link>
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
