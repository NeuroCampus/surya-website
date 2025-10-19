import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import TestimonialCarousel from "@/components/TestimonialCarousel";
import InstagramFeed from "@/components/InstagramFeed";
import CTASection from "@/components/CTASection";
import ScrollProgress from "@/components/ScrollProgress";
import MagneticButton from "@/components/MagneticButton";
import ImageReveal from "@/components/ImageReveal";
import Card3DTilt from "@/components/Card3DTilt";
import SectionTransition from "@/components/SectionTransition";
import { useParallax } from "@/hooks/useParallax";
import heroImage from "@/assets/hero-interior.jpg";
import project1 from "@/assets/project-1.jpg";
import project2 from "@/assets/project-2.jpg";
import project3 from "@/assets/project-3.jpg";
import project4 from "@/assets/project-4.jpg";

const Home = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  
  const heroY = useParallax(heroRef, 150);
  const heroScale = useTransform(scrollYProgress, [0, 0.3], [1, 1.1]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  const projects = [
    { id: 1, title: "Bangalore Residence", subtitle: "Contemporary Luxury", image: project1 },
    { id: 2, title: "Modern Kitchen", subtitle: "Minimalist Elegance", image: project2 },
    { id: 3, title: "Urban Living", subtitle: "City Views", image: project3 },
    { id: 4, title: "Spa Bathroom", subtitle: "Serene Sanctuary", image: project4 },
  ];

  return (
    <div className="min-h-screen bg-background cursor-none overflow-x-hidden">
      <CustomCursor />
      <ScrollProgress />
      <Navigation />
      
      {/* Hero Section with Parallax */}
      <section ref={heroRef} className="relative h-screen w-full overflow-hidden">
        <motion.div
          style={{ y: heroY, scale: heroScale }}
          className="absolute inset-0"
        >
          <motion.img
            src={heroImage}
            alt="Luxury interior design showcasing timeless architectural elegance"
            className="w-full h-full object-cover"
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 2, ease: [0.25, 0.1, 0.25, 1] }}
          />
          {/* Ambient light effect */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-br from-amber-900/20 via-transparent to-orange-900/10"
            animate={{
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div 
            className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-background"
            style={{ opacity: heroOpacity }}
          />
        </motion.div>
        
        <div className="relative h-full flex flex-col items-center justify-center text-center px-6">
          {/* Masked text animation */}
          <div className="overflow-hidden">
            <motion.h1 
              className="text-5xl md:text-7xl lg:text-8xl mb-6 tracking-luxury-wide text-background mix-blend-difference"
            >
              {["Design", "•", "Space", "•", "Emotion"].map((word, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, y: 100, filter: "blur(10px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ 
                    delay: 3.5 + index * 0.15,
                    duration: 1,
                    ease: [0.25, 0.1, 0.25, 1]
                  }}
                  className="inline-block mx-2"
                >
                  {word}
                </motion.span>
              ))}
            </motion.h1>
          </div>
          <motion.p 
            initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ delay: 4.5, duration: 1 }}
            className="text-lg md:text-xl text-background mix-blend-difference tracking-luxury max-w-md"
          >
            Crafting timeless interiors for modern living
          </motion.p>
        </div>
      </section>

      {/* Featured Projects with 3D Tilt & Image Reveals */}
      <SectionTransition className="py-32 px-6">
        <div ref={projectsRef} className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <motion.h2 
              className="text-4xl md:text-5xl tracking-luxury-wide mb-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2 }}
            >
              {"Featured Works".split("").map((char, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.03, duration: 0.5 }}
                  viewport={{ once: true }}
                  className="inline-block"
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </motion.h2>
            <motion.p 
              className="text-muted-foreground tracking-luxury"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              viewport={{ once: true }}
            >
              Selected projects
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ 
                  delay: index * 0.2, 
                  duration: 1,
                  ease: [0.25, 0.1, 0.25, 1]
                }}
                viewport={{ once: true, amount: 0.3 }}
              >
                <Card3DTilt to="/projects" className="group block relative overflow-hidden aspect-square">
                  <ImageReveal
                    src={project.image}
                    alt={`${project.title} - ${project.subtitle} interior design project`}
                    className="w-full h-full"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-400">
                    <div className="text-center text-white">
                      <motion.h3 
                        className="text-2xl tracking-luxury-wide mb-2"
                        initial={{ y: 20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.1 }}
                        viewport={{ once: false }}
                      >
                        {project.title}
                      </motion.h3>
                      <motion.p 
                        className="text-sm tracking-luxury"
                        initial={{ y: 20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        viewport={{ once: false }}
                      >
                        {project.subtitle}
                      </motion.p>
                    </div>
                  </div>
                </Card3DTilt>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mt-16"
          >
            <MagneticButton strength={0.4}>
              <Link
                to="/projects"
                className="inline-block px-12 py-4 border border-foreground text-foreground tracking-luxury uppercase text-sm hover:bg-foreground hover:text-background transition-smooth"
              >
                View All Projects
              </Link>
            </MagneticButton>
          </motion.div>
        </div>
      </SectionTransition>

      {/* Testimonials Section */}
      <SectionTransition className="py-32 px-6 bg-muted">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl tracking-luxury-wide">What Our Clients Say</h2>
          </motion.div>
          <TestimonialCarousel />
        </div>
      </SectionTransition>

      <InstagramFeed />
      <CTASection />

      <Footer />
    </div>
  );
};

export default Home;
