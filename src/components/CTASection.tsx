import { motion } from "framer-motion";
import { Link } from "react-router-dom";

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
          <h2 className="text-4xl md:text-6xl tracking-luxury-wide mb-8">
            Let's craft your next space
          </h2>
          <p className="text-lg text-muted-foreground tracking-luxury mb-12 max-w-2xl mx-auto">
            Transform your vision into reality with timeless design and expert craftsmanship
          </p>
          <Link
            to="/contact"
            className="inline-block px-16 py-5 border-2 border-foreground text-foreground tracking-luxury-wide uppercase text-sm hover:bg-foreground hover:text-background transition-smooth"
          >
            Start a Project
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
