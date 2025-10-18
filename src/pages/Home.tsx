import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import TestimonialCarousel from "@/components/TestimonialCarousel";
import InstagramFeed from "@/components/InstagramFeed";
import CTASection from "@/components/CTASection";
import heroImage from "@/assets/hero-interior.jpg";
import project1 from "@/assets/project-1.jpg";
import project2 from "@/assets/project-2.jpg";
import project3 from "@/assets/project-3.jpg";
import project4 from "@/assets/project-4.jpg";

const Home = () => {
  const projects = [
    { id: 1, title: "Bangalore Residence", subtitle: "Contemporary Luxury", image: project1 },
    { id: 2, title: "Modern Kitchen", subtitle: "Minimalist Elegance", image: project2 },
    { id: 3, title: "Urban Living", subtitle: "City Views", image: project3 },
    { id: 4, title: "Spa Bathroom", subtitle: "Serene Sanctuary", image: project4 },
  ];

  return (
    <div className="min-h-screen bg-background cursor-none">
      <CustomCursor />
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative h-screen w-full overflow-hidden">
        <motion.div
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <img
            src={heroImage}
            alt="Luxury interior design"
            className="w-full h-full object-cover"
          />
          {/* Warm gradient overlay for cozy elegance */}
          <div className="absolute inset-0 bg-gradient-to-br from-amber-900/20 via-transparent to-orange-900/10" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-background" />
        </motion.div>
        
        <div className="relative h-full flex flex-col items-center justify-center text-center px-6">
          {/* Animated typography with staggered appearance */}
          <div className="overflow-hidden">
            <motion.h1 
              className="text-5xl md:text-7xl lg:text-8xl mb-6 tracking-luxury-wide text-background mix-blend-difference"
            >
              {["Design", "•", "Space", "•", "Emotion"].map((word, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    delay: 0.5 + index * 0.2, 
                    duration: 0.8,
                    ease: "easeOut"
                  }}
                  className="inline-block mx-2"
                >
                  {word}
                </motion.span>
              ))}
            </motion.h1>
          </div>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.8 }}
            className="text-lg md:text-xl text-background mix-blend-difference tracking-luxury max-w-md"
          >
            Crafting timeless interiors for modern living
          </motion.p>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-32 px-6">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl tracking-luxury-wide mb-4">Featured Works</h2>
            <p className="text-muted-foreground tracking-luxury">Selected projects</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.15, duration: 0.8 }}
                viewport={{ once: true }}
              >
                <Link to="/projects" className="group block relative overflow-hidden aspect-square">
                  <motion.img
                    src={project.image}
                    alt={project.title}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-smooth flex items-center justify-center">
                    <div className="text-center text-background">
                      <h3 className="text-2xl tracking-luxury-wide mb-2">{project.title}</h3>
                      <p className="text-sm tracking-luxury">{project.subtitle}</p>
                    </div>
                  </div>
                </Link>
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
            <Link
              to="/projects"
              className="inline-block px-12 py-4 border border-foreground text-foreground tracking-luxury uppercase text-sm hover:bg-foreground hover:text-background transition-smooth"
            >
              View All Projects
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-32 px-6 bg-muted">
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
      </section>

      <InstagramFeed />
      <CTASection />

      <Footer />
    </div>
  );
};

export default Home;
