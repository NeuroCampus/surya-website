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
      title: "Integrity",
      description: "Honest design rooted in authenticity"
    },
    {
      icon: Layers,
      title: "Light",
      description: "Natural illumination as a design element"
    },
    {
      icon: Ruler,
      title: "Materiality",
      description: "Thoughtful selection of textures and finishes"
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
            transition={{ duration: 0.8 }}
            className="relative overflow-hidden aspect-[16/9] mb-20"
          >
            <img
              src={studioImage}
              alt="Studio workspace"
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Studio Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-24"
          >
            <h1 className="text-5xl md:text-7xl tracking-luxury-wide mb-8">Studio</h1>
            <p className="text-lg md:text-xl text-muted-foreground tracking-luxury leading-relaxed max-w-3xl mx-auto">
              Founded in 2025, Surya Architects & Interiors merges timeless design with modern 
              functionality — creating spaces defined by calmness, craftsmanship, and character.
            </p>
          </motion.div>

          {/* Values */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-12"
          >
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.8 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 mb-6 border border-foreground">
                  <value.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl tracking-luxury-wide mb-3">{value.title}</h3>
                <p className="text-muted-foreground tracking-luxury">{value.description}</p>
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
