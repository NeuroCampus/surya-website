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
import ScrollVideo from "@/components/ScrollVideo";
import PinnedSection from "@/components/PinnedSection";
import ScrollStack from "@/components/ScrollStack";
import { useParallax } from "@/hooks/useParallax";
import { useScrollVelocity } from "@/hooks/useScrollVelocity";
import heroImage from "@/assets/hero-interior.jpg";
import project1 from "@/assets/project-1.jpg";
import project2 from "@/assets/project-2.jpg";
import project3 from "@/assets/project-3.jpg";
import project4 from "@/assets/project-4.jpg";

const Home = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const { velocityFactor } = useScrollVelocity();
  
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
            className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-background"
            style={{ opacity: heroOpacity }}
          />
        </motion.div>
        
        <div className="relative h-full flex flex-col items-center justify-center text-center px-6">
          {/* Main hero heading */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3.2, duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
            className="mb-6"
          >
            <h1 className="text-6xl md:text-8xl lg:text-9xl tracking-luxury-wide text-white font-display-1 font-light leading-none">
              SURYA
            </h1>
            <h2 className="text-2xl md:text-4xl lg:text-5xl tracking-luxury-wide text-luxury-gold font-display-1 font-light mt-4">
              LUXE CANVAS
            </h2>
          </motion.div>

          {/* Subtitle */}
          <motion.p 
            initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ delay: 3.8, duration: 0.8 }}
            className="text-lg md:text-xl text-white tracking-luxury max-w-2xl font-light leading-relaxed"
          >
            Crafting timeless interiors for modern living • We design spaces that bring you joy
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 4.2, duration: 0.8 }}
            className="mt-12"
          >
            <MagneticButton strength={0.4}>
              <Link
                to="/projects"
                className="inline-block px-8 py-4 bg-luxury-gold text-luxury-charcoal tracking-luxury-wide uppercase text-sm font-medium hover:bg-luxury-gold/90 transition-smooth"
              >
                Explore Our Work
              </Link>
            </MagneticButton>
          </motion.div>
        </div>
      </section>

      {/* Vision Section */}
      <SectionTransition className="py-32 px-6 bg-background">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-6xl tracking-luxury-wide font-display-1 font-light text-luxury-charcoal mb-8">
              We Create Homes With Love
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground tracking-luxury leading-relaxed max-w-4xl mx-auto font-light">
              Great design is about solving problems and creating spaces that bring you joy. We believe the spaces we spend time in affect how we feel and view the world around us.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
              viewport={{ once: true }}
            >
              <h3 className="text-3xl md:text-4xl tracking-luxury-wide font-display-1 font-light text-luxury-charcoal mb-6">
                Our Vision
              </h3>
              <p className="text-lg text-muted-foreground tracking-luxury leading-relaxed mb-8">
                We are inspired daily to design spaces that ground us into who we uniquely are, so we move into the world renewed, energized and inspired to impact everyone in a positive way.
              </p>
              <div className="flex flex-wrap gap-4">
                <span className="px-4 py-2 bg-luxury-beige text-luxury-charcoal text-sm tracking-luxury-wide uppercase font-medium">Luxury Design</span>
                <span className="px-4 py-2 bg-luxury-beige text-luxury-charcoal text-sm tracking-luxury-wide uppercase font-medium">Timeless Spaces</span>
                <span className="px-4 py-2 bg-luxury-beige text-luxury-charcoal text-sm tracking-luxury-wide uppercase font-medium">Modern Living</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-square bg-gradient-to-br from-luxury-beige/20 to-luxury-gold/10 rounded-2xl flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl md:text-8xl font-display-1 font-light text-luxury-gold mb-4">22+</div>
                  <div className="text-lg tracking-luxury-wide uppercase text-luxury-charcoal font-medium">Years of Excellence</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </SectionTransition>

      {/* Scroll-controlled video section */}
      <PinnedSection height="300vh">
        <div className="h-screen flex items-center justify-center bg-background">
          <ScrollVideo posterImage={project1} />
        </div>
      </PinnedSection>

      {/* Services Section */}
      <SectionTransition className="py-32 px-6 bg-muted/30">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-6xl tracking-luxury-wide font-display-1 font-light text-luxury-charcoal mb-8">
              Our Services
            </h2>
            <p className="text-xl text-muted-foreground tracking-luxury leading-relaxed max-w-3xl mx-auto">
              From concept to completion, we offer comprehensive interior design solutions tailored to your vision
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Space Planning & Design",
                description: "We design your space and provide detailed plans, color palettes, and furniture recommendations for a cohesive design.",
                features: ["Dimensioned Plans", "Color Palettes", "Furniture Selection", "Lighting Design"]
              },
              {
                title: "Full Service Design",
                description: "Complete project management from initial concept through installation, handling every detail of your vision.",
                features: ["Project Management", "Vendor Coordination", "Installation Oversight", "Quality Assurance"]
              },
              {
                title: "Turnkey Solutions",
                description: "Walk into your completely designed and furnished home with minimal involvement on your part.",
                features: ["Complete Furnishing", "Soft Furnishings", "Accessories & Art", "Move-in Ready"]
              }
            ].map((service, index) => (
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2, ease: [0.25, 0.1, 0.25, 1] }}
                  viewport={{ once: true }}
                  className="group h-full bg-background border border-border/50 hover:border-luxury-gold/30 transition-colors duration-500 rounded-lg overflow-hidden"
                >
                  <div className="p-8">
                    <div className="mb-6">
                      <div className="w-12 h-12 bg-luxury-gold/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-luxury-gold/20 transition-colors">
                        <span className="text-2xl text-luxury-gold font-display-1">0{index + 1}</span>
                      </div>
                      <h3 className="text-2xl tracking-luxury-wide font-display-1 font-light text-luxury-charcoal mb-4">
                        {service.title}
                      </h3>
                      <p className="text-muted-foreground tracking-luxury leading-relaxed mb-6">
                        {service.description}
                      </p>
                    </div>

                    <ul className="space-y-3">
                      {service.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center text-sm tracking-luxury">
                          <span className="w-2 h-2 bg-luxury-gold rounded-full mr-3 flex-shrink-0"></span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mt-16"
          >
            <MagneticButton strength={0.4}>
              <Link
                to="/contact"
                className="inline-block px-12 py-4 border border-luxury-charcoal text-luxury-charcoal tracking-luxury-wide uppercase text-sm hover:bg-luxury-charcoal hover:text-luxury-white transition-smooth"
              >
                Start Your Project
              </Link>
            </MagneticButton>
          </motion.div>
        </div>
      </SectionTransition>

      {/* Featured Projects with 3D Tilt & Image Reveals */}
      <ScrollStack>
        <SectionTransition className="py-32 px-6 bg-background">
        <div ref={projectsRef} className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <motion.h2 
              className="text-4xl md:text-5xl tracking-luxury-wide mb-4 font-display-1 font-light text-luxury-charcoal"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
            >
              Featured Works
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
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
                className="group"
              >
                <Card3DTilt to="/projects" className="group block relative overflow-hidden aspect-[4/5] bg-background border border-border/30 hover:border-luxury-gold/50 transition-all duration-700 hover:shadow-2xl">
                  <ImageReveal
                    src={project.image}
                    alt={`${project.title} - ${project.subtitle} interior design project`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end">
                    <div className="p-8 text-white w-full">
                      <motion.h3 
                        className="text-2xl md:text-3xl tracking-luxury-wide mb-2 font-display-1 font-light"
                        initial={{ y: 20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.1 }}
                        viewport={{ once: false }}
                      >
                        {project.title}
                      </motion.h3>
                      <motion.p 
                        className="text-sm md:text-base tracking-luxury opacity-90 mb-4"
                        initial={{ y: 20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        viewport={{ once: false }}
                      >
                        {project.subtitle}
                      </motion.p>
                      <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        viewport={{ once: false }}
                        className="text-luxury-gold text-sm tracking-luxury-wide uppercase font-medium"
                      >
                        View Project →
                      </motion.div>
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
      </ScrollStack>

      {/* Testimonials Section with Enhanced Design */}
      <ScrollStack>
        <SectionTransition className="py-32 px-6 bg-gradient-to-b from-background to-muted/20">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-6xl tracking-luxury-wide font-display-1 font-light text-luxury-charcoal mb-6">
              Client Stories
            </h2>
            <p className="text-xl text-muted-foreground tracking-luxury leading-relaxed max-w-2xl mx-auto">
              Hear from our clients about their transformative experiences
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            viewport={{ once: true }}
            className="bg-background border border-border/50 rounded-2xl p-12 shadow-lg"
          >
            <TestimonialCarousel />
          </motion.div>

          {/* Stats Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20"
          >
            {[
              { number: "200+", label: "Projects Completed" },
              { number: "22+", label: "Years Experience" },
              { number: "50+", label: "Happy Clients" },
              { number: "15+", label: "Design Awards" }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-display-1 font-light text-luxury-gold mb-2">
                  {stat.number}
                </div>
                <div className="text-sm tracking-luxury-wide uppercase text-muted-foreground font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </SectionTransition>
      </ScrollStack>

      <ScrollStack>
        <InstagramFeed />
      </ScrollStack>
      
      {/* About/Expertise Section */}
      <SectionTransition className="py-32 px-6 bg-background">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl tracking-luxury-wide font-display-1 font-light text-luxury-charcoal mb-8">
                Why Choose Surya Luxe Canvas
              </h2>
              <div className="space-y-6">
                <p className="text-lg text-muted-foreground tracking-luxury leading-relaxed">
                  With over two decades of experience in luxury interior design, we specialize in creating timeless spaces that reflect your unique personality and lifestyle.
                </p>
                <p className="text-lg text-muted-foreground tracking-luxury leading-relaxed">
                  Our approach combines artistic vision with technical expertise, ensuring every detail contributes to a harmonious and functional environment.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-12">
                {[
                  "Bespoke Design Solutions",
                  "Premium Material Selection",
                  "Expert Project Management",
                  "Post-Installation Support"
                ].map((feature, index) => (
                  <motion.div
                    key={feature}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center space-x-3"
                  >
                    <div className="w-2 h-2 bg-luxury-gold rounded-full flex-shrink-0"></div>
                    <span className="text-sm tracking-luxury font-medium text-luxury-charcoal">{feature}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-square bg-gradient-to-br from-luxury-beige/30 to-luxury-gold/20 rounded-2xl flex items-center justify-center">
                <div className="text-center p-12">
                  <div className="text-6xl md:text-7xl font-display-1 font-light text-luxury-gold mb-6">"</div>
                  <blockquote className="text-xl md:text-2xl font-display-1 font-light text-luxury-charcoal leading-relaxed mb-6">
                    Design is not just what it looks like and feels like. Design is how it works.
                  </blockquote>
                  <cite className="text-sm tracking-luxury-wide uppercase text-muted-foreground font-medium">
                    — Steve Jobs
                  </cite>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </SectionTransition>

      <ScrollStack>
        <CTASection />
      </ScrollStack>

      <Footer />
    </div>
  );
};

export default Home;
