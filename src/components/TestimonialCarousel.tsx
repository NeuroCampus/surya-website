import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const testimonials = [
  {
    quote: "Surya transformed our space into a sanctuary of calm and elegance.",
    client: "Priya Sharma"
  },
  {
    quote: "Exceptional attention to detail and a true understanding of timeless design.",
    client: "Rajesh Kumar"
  },
  {
    quote: "They captured our vision perfectly while adding their artistic touch.",
    client: "Ananya Reddy"
  }
];

const TestimonialCarousel = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 6000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative flex items-center justify-center min-h-[300px]">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-center max-w-4xl px-6"
        >
          <blockquote className="text-lg sm:text-xl md:text-2xl font-display-1 font-light italic text-luxury-charcoal leading-relaxed mb-8 tracking-luxury">
            "{testimonials[current].quote}"
          </blockquote>
          <cite className="text-lg sm:text-xl md:text-2xl tracking-luxury-wide uppercase text-luxury-gold font-medium">
            — {testimonials[current].client}
          </cite>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default TestimonialCarousel;
