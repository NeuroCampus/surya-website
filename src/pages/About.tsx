import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import CTASection from "@/components/CTASection";
import studioImage from "@/assets/studio-workspace.jpg";
import heroInterior from "@/assets/hero-interior.jpg";
import project1 from "@/assets/project-1.jpg";
import project2 from "@/assets/project-2.jpg";
import project3 from "@/assets/project-3.jpg";
import project4 from "@/assets/project-4.jpg";
import { Lightbulb, Layers, Ruler, Users, Award, Compass, Heart, Star, Camera } from "lucide-react";

const About = () => {
  const values = [
    {
      icon: Lightbulb,
      title: "Vision",
      description: "We see beyond the ordinary, crafting spaces that tell stories and create memories that last generations."
    },
    {
      icon: Layers,
      title: "Craftsmanship",
      description: "Every detail is meticulously considered, every material carefully selected for timeless quality and beauty."
    },
    {
      icon: Ruler,
      title: "Precision",
      description: "From concept to completion, we maintain uncompromising standards in every aspect of our work."
    }
  ];

  const team = [
    {
      name: "Mr Chiru",
      role: "Principal Architect",
      experience: "22+ years",
      specialization: "Luxury Residential & Commercial"
    },
    {
      name: "Sowmya Chiru",
      role: "Design Director",
      experience: "18+ years",
      specialization: "Interior Architecture & Styling"
    }
  ];

  const process = [
    {
      step: "01",
      title: "Discovery",
      description: "Understanding your vision, lifestyle, and aspirations through deep conversation and site analysis."
    },
    {
      step: "02",
      title: "Concept",
      description: "Developing innovative design concepts that blend functionality, aesthetics, and your unique personality."
    },
    {
      step: "03",
      title: "Design",
      description: "Creating detailed architectural and interior plans with precision and attention to every element."
    },
    {
      step: "04",
      title: "Realization",
      description: "Bringing your vision to life with expert project management and quality craftsmanship."
    }
  ];

  return (
    <div className="min-h-screen bg-background cursor-none">
      <CustomCursor />
      <Navigation />

      <div className="pt-24 sm:pt-32 pb-20 px-4 sm:px-6">
        <div className="container mx-auto max-w-7xl">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative overflow-hidden aspect-[21/9] mb-24 group"
          >
            <motion.img
              src={studioImage}
              alt="Surya Architects Studio workspace"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
            <div className="absolute bottom-12 left-12 right-12 text-white">
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl tracking-tight mb-4 font-playfair font-bold"
              >
                Our Studio
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="text-lg sm:text-xl md:text-2xl font-light tracking-wide max-w-2xl"
              >
                Where vision meets craftsmanship, creating spaces that inspire and endure.
              </motion.p>
            </div>
          </motion.div>

          {/* Studio Story */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
            viewport={{ once: true }}
            className="mb-32"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <motion.h2
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="text-3xl sm:text-4xl md:text-5xl font-playfair font-bold text-luxury-charcoal mb-8"
                >
                  Crafting Timeless
                  <br />
                  <span className="text-luxury-gold">Architecture</span>
                </motion.h2>
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  viewport={{ once: true }}
                  className="space-y-6 text-base sm:text-lg text-muted-foreground leading-relaxed"
                >
                  <p>
                    Founded in 2003, Surya Architects has been at the forefront of luxury architectural design,
                    blending traditional craftsmanship with contemporary innovation. Our studio represents the
                    culmination of over two decades of architectural excellence.
                  </p>
                  <p>
                    We believe that great architecture transcends mere functionality—it must inspire, comfort,
                    and endure. Every project we undertake is a testament to our commitment to creating spaces
                    that harmonize with their environment while reflecting the unique personality of our clients.
                  </p>
                  <p>
                    Our approach combines meticulous attention to detail with a deep understanding of spatial
                    dynamics, material science, and human psychology. The result is architecture that feels
                    both timeless and profoundly contemporary.
                  </p>
                </motion.div>
              </div>
              <div className="relative">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1, delay: 0.3 }}
                  viewport={{ once: true }}
                  className="relative aspect-square overflow-hidden rounded-2xl shadow-2xl group"
                >
                  <motion.img
                    src={studioImage}
                    alt="Surya Architects Studio workspace"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Values */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            viewport={{ once: true }}
            className="mb-32"
          >
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-3xl sm:text-4xl md:text-5xl font-playfair font-bold text-center text-luxury-charcoal mb-16"
            >
              Our Values
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2, duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
                  viewport={{ once: true }}
                  className="text-center group"
                >
                  <motion.div
                    whileHover={{ scale: 1.05, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                    className="inline-flex items-center justify-center w-24 h-24 mb-8 bg-gradient-to-br from-luxury-beige to-luxury-white border border-luxury-charcoal/20 group-hover:border-luxury-gold/50 transition-all duration-500 shadow-lg"
                  >
                    <value.icon className="w-10 h-10 text-luxury-charcoal group-hover:text-luxury-gold transition-colors duration-300" />
                  </motion.div>
                  <h3 className="text-2xl font-playfair font-bold mb-4 text-luxury-charcoal">
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed text-lg">
                    {value.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Process */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
            viewport={{ once: true }}
            className="mb-32"
          >
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-3xl sm:text-4xl md:text-5xl font-playfair font-bold text-center text-luxury-charcoal mb-16"
            >
              Our Process
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {process.map((step, index) => (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
                  viewport={{ once: true }}
                  className="text-center group"
                >
                  <div className="text-6xl font-playfair font-bold text-luxury-gold/30 mb-4 group-hover:text-luxury-gold/60 transition-colors duration-300">
                    {step.step}
                  </div>
                  <h3 className="text-xl font-playfair font-bold mb-3 text-luxury-charcoal">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Team */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
            viewport={{ once: true }}
            className="mb-32"
          >
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-3xl sm:text-4xl md:text-5xl font-playfair font-bold text-center text-luxury-charcoal mb-16"
            >
              Meet Our Team
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {team.map((member, index) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2, duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
                  viewport={{ once: true }}
                  className="text-center group"
                >
                  <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-luxury-beige to-luxury-white rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                    <Users className="w-12 h-12 text-luxury-charcoal" />
                  </div>
                  <h3 className="text-xl font-playfair font-bold mb-2 text-luxury-charcoal">
                    {member.name}
                  </h3>
                  <p className="text-luxury-gold font-medium mb-2">
                    {member.role}
                  </p>
                  <p className="text-sm text-muted-foreground mb-2">
                    {member.experience}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {member.specialization}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Studio Gallery */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
            viewport={{ once: true }}
            className="mb-32"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <Camera className="w-12 h-12 text-luxury-gold mx-auto mb-6" />
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-playfair font-bold text-luxury-charcoal mb-4">
                Our Work
              </h2>
              <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
                A glimpse into the spaces we've crafted, where design meets functionality in perfect harmony.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  image: heroInterior,
                  title: "Modern Luxury Living",
                  category: "Residential Design"
                },
                {
                  image: project1,
                  title: "Contemporary Office Space",
                  category: "Commercial Architecture"
                },
                {
                  image: project2,
                  title: "Minimalist Villa",
                  category: "Residential Architecture"
                },
                {
                  image: project3,
                  title: "Urban Loft Conversion",
                  category: "Interior Renovation"
                },
                {
                  image: project4,
                  title: "Boutique Hotel Lobby",
                  category: "Hospitality Design"
                },
                {
                  image: studioImage,
                  title: "Studio Workspace",
                  category: "Office Design"
                }
              ].map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1, duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
                  viewport={{ once: true }}
                  className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-500"
                >
                  <motion.img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                    <h3 className="text-xl font-playfair font-bold mb-2">
                      {item.title}
                    </h3>
                    <p className="text-sm text-white/80 uppercase tracking-wide">
                      {item.category}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Studio Atmosphere */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
            viewport={{ once: true }}
            className="mb-32"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-playfair font-bold text-luxury-charcoal mb-8">
                  Where Ideas
                  <br />
                  <span className="text-luxury-gold">Come to Life</span>
                </h2>
                <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                  <p>
                    Our studio is more than just a workspace—it's a creative sanctuary where traditional
                    architectural principles meet cutting-edge design technology. Every project begins
                    with a conversation and evolves through collaborative exploration.
                  </p>
                  <p>
                    We believe in the power of human connection and the importance of understanding
                    our clients' stories. This deep empathy allows us to create spaces that truly
                    reflect their vision and enhance their lives.
                  </p>
                  <p>
                    From initial sketches to final construction, we maintain the same level of
                    passion and precision throughout every phase of the design process.
                  </p>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.4 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="aspect-[4/3] overflow-hidden rounded-lg shadow-2xl">
                  <motion.img
                    src={studioImage}
                    alt="Surya Architects Studio Interior"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
                
              </motion.div>
            </div>
          </motion.div>

          {/* Achievements */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-32"
          >
            {[
              { number: "22+", label: "Years of Excellence", icon: Compass },
              { number: "200+", label: "Completed Projects", icon: Layers },
              { number: "50+", label: "Satisfied Clients", icon: Heart },
              { number: "15+", label: "Design Awards", icon: Award }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
                viewport={{ once: true }}
                className="text-center group"
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                  className="inline-flex items-center justify-center w-16 h-16 mb-4 bg-luxury-gold/10 rounded-full group-hover:bg-luxury-gold/20 transition-colors duration-300"
                >
                  <stat.icon className="w-6 h-6 text-luxury-gold" />
                </motion.div>
                <div className="text-4xl md:text-5xl font-playfair font-bold text-luxury-charcoal mb-2">
                  {stat.number}
                </div>
                <div className="text-sm tracking-wide uppercase text-muted-foreground font-medium leading-tight">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Vision Statement */}
          
        </div>
      </div>

      <CTASection />

      <Footer />
    </div>
  );
};

export default About;
