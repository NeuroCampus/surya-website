import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import { ArrowLeft } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-background cursor-none flex flex-col">
      <CustomCursor />
      <Navigation />

      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 pt-32 pb-20">
        <div className="text-center max-w-2xl">
          {/* 404 Number */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
            className="mb-8"
          >
            <h1 className="text-6xl sm:text-8xl md:text-9xl font-display-1 font-light text-luxury-charcoal tracking-luxury-wide">
              404
            </h1>
          </motion.div>

          {/* Message */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            className="mb-12"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display-1 font-light text-luxury-charcoal tracking-luxury-wide mb-6">
              Page Not Found
            </h2>
            <p className="text-base sm:text-xl text-muted-foreground tracking-luxury leading-relaxed">
              The page you're looking for doesn't exist or has been moved.
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            className="flex flex-col sm:flex-row gap-6 justify-center"
          >
            <Link
              to="/"
              className="group inline-flex items-center px-8 py-4 bg-luxury-charcoal text-luxury-white tracking-luxury-wide uppercase text-sm font-medium hover:bg-luxury-gold hover:text-luxury-charcoal transition-smooth"
            >
              <ArrowLeft className="w-4 h-4 mr-3 group-hover:-translate-x-1 transition-transform duration-300" />
              Back to Home
            </Link>

            <Link
              to="/projects"
              className="inline-block px-8 py-4 border border-luxury-charcoal text-luxury-charcoal tracking-luxury-wide uppercase text-sm hover:bg-luxury-charcoal hover:text-luxury-white transition-smooth"
            >
              View Projects
            </Link>
          </motion.div>

          {/* Decorative Element */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.9, duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            className="mt-16"
          >
            <div className="w-24 h-px bg-gradient-to-r from-transparent via-luxury-gold to-transparent mx-auto"></div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default NotFound;
