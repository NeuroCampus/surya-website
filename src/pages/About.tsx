import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import CTASection from "@/components/CTASection";
import studioImage from "@/assets/studio-workspace.jpg";
import { Lightbulb, Layers, Ruler } from "lucide-react";

const About = () => {
  const values = [
    {
      icon: Lightbulb,
      title: "Vision",
      description: "Timeless design"
    },
    {
      icon: Layers,
      title: "Craft",
      description: "Expert execution"
    },
    {
      icon: Ruler,
      title: "Precision",
      description: "Perfect details"
    }
  ];

  return (
    <div className="min-h-screen bg-background cursor-none">
      <CustomCursor />
      <Navigation />

      <div className="pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-6xl">
          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative overflow-hidden aspect-[16/9] mb-20 group"
          >
            <motion.img
              src={studioImage}
              alt="Studio workspace"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          </motion.div>

          {/* Studio Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
            viewport={{ once: true }}
            className="text-center mb-24"
          >
            <h1 className="text-6xl md:text-8xl tracking-luxury-wide mb-8 font-display-1 font-light text-luxury-charcoal">
              Studio
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground tracking-luxury leading-relaxed max-w-2xl mx-auto font-light">
              Timeless design meets modern living
            </p>
          </motion.div>

          {/* Values */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-16"
          >
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
                viewport={{ once: true }}
                className="text-center group"
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                  className="inline-flex items-center justify-center w-20 h-20 mb-8 border border-luxury-charcoal/30 group-hover:border-luxury-gold/50 transition-colors duration-300"
                >
                  <value.icon className="w-8 h-8 text-luxury-charcoal group-hover:text-luxury-gold transition-colors duration-300" />
                </motion.div>
                <h3 className="text-2xl tracking-luxury-wide mb-4 font-display-1 font-light text-luxury-charcoal">
                  {value.title}
                </h3>
                <p className="text-muted-foreground tracking-luxury text-lg">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* Minimal Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-24"
          >
            {[
              { number: "22+", label: "Years" },
              { number: "200+", label: "Projects" },
              { number: "50+", label: "Clients" },
              { number: "15+", label: "Awards" }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-display-1 font-light text-luxury-gold mb-2">
                  {stat.number}
                </div>
                <div className="text-sm tracking-luxury-wide uppercase text-muted-foreground font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      <CTASection />

      <Footer />
    </div>
  );
};

export default About;
