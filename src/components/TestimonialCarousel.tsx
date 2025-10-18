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
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-48 flex items-center justify-center">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl px-6"
        >
          <p className="text-xl md:text-2xl mb-6 tracking-luxury leading-relaxed font-light italic">
            "{testimonials[current].quote}"
          </p>
          <p className="text-sm tracking-luxury-wide uppercase text-muted-foreground">
            — {testimonials[current].client}
          </p>
        </motion.div>
      </AnimatePresence>

      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex gap-2">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === current ? "bg-foreground w-8" : "bg-foreground/30"
            }`}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default TestimonialCarousel;
