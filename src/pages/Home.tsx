import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";
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
import heroImage from "@/assets/hero-interior.jpg";
import project1 from "@/assets/project-1.jpg";
import project2 from "@/assets/project-2.jpg";
import project3 from "@/assets/project-3.jpg";
import project4 from "@/assets/project-4.jpg";
import finalintVideo from "@/assets/finalint.mp4";

const Home = () => {
  const projectsRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const setHeightRef = useRef<HTMLDivElement>(null);
  const [videoDuration, setVideoDuration] = useState(0);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [heroHeight, setHeroHeight] = useState(0);
  const [displayText, setDisplayText] = useState('SURYA ARCHITECTS');
  const [showCursor, setShowCursor] = useState(false);
  const { scrollY } = useScroll();
  
  const videoOpacity = useTransform(scrollY, [0, heroHeight - 400, heroHeight], [1, 1, 0]);
  
  // Intro overlay fades out over first 600px of scroll (approx 2-3 scrolls)
  const overlayOpacity = useTransform(scrollY, [0, 300, 600], [1, 0.7, 0]);
  
  // Subtle parallax for overlay text (moves slower than scroll)
  const overlayY = useTransform(scrollY, [0, 600], [0, -50]);
  
  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mediaQuery.matches);
    
    const handleChange = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Subtle shimmer effect for the text
  useEffect(() => {
    const shimmerInterval = setInterval(() => {
      // Gentle shimmer animation will be handled by CSS
    }, 3000);
    
    return () => clearInterval(shimmerInterval);
  }, []);
  
  // Scroll-controlled video logic with ultra-smooth 8K optimization
  useEffect(() => {
    if (isReducedMotion || !videoRef.current) return;
    
    const vid = videoRef.current;
    const playbackConst = 2500; // Balanced for smooth 8K control without excessive scrolling
    let ticking = false;
    let lastScrollY = 0;
    
    // Preload video for instant playback
    vid.preload = 'auto';
    vid.load();
    
    const scrollPlay = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollTop = window.scrollY || document.documentElement.scrollTop;
          
          // Smooth interpolation for crisp video playback
          const targetScroll = Math.min(heroHeight, Math.max(0, scrollTop));
          const interpolatedScroll = lastScrollY + (targetScroll - lastScrollY) * 0.08; // Gentler interpolation
          
          // Only calculate scroll fraction if heroHeight is set (video metadata loaded)
          if (heroHeight > 0) {
            // Map scroll only within hero height for precise 8K control
            const scrollFraction = Math.min(1, Math.max(0, interpolatedScroll / heroHeight));
            
            if (vid.duration && !isNaN(vid.duration)) {
              vid.currentTime = vid.duration * scrollFraction;
            }
          }
          
          lastScrollY = interpolatedScroll;
          ticking = false;
        });
        ticking = true;
      }
    };
    
    const handleLoadedMetadata = () => {
      setVideoDuration(vid.duration);
      if (setHeightRef.current) {
        const height = vid.duration * playbackConst;
        setHeightRef.current.style.height = height + "px";
        setHeroHeight(height);
      }
      // Start smooth scroll tracking
      scrollPlay();
    };
    
    const handleCanPlayThrough = () => {
      // Video is fully loaded and ready for ultra-smooth playback
      vid.playbackRate = 1;
    };
    
    vid.addEventListener('loadedmetadata', handleLoadedMetadata);
    vid.addEventListener('canplaythrough', handleCanPlayThrough);
    
    // Passive scroll listener for maximum performance
    const throttledScroll = () => scrollPlay();
    window.addEventListener('scroll', throttledScroll, { passive: true });
    
    return () => {
      vid.removeEventListener('loadedmetadata', handleLoadedMetadata);
      vid.removeEventListener('canplaythrough', handleCanPlayThrough);
      window.removeEventListener('scroll', throttledScroll);
    };
  }, [isReducedMotion, heroHeight]);
  
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
      
      {/* Hero Section with Scroll-Controlled Video */}
      <section className="relative w-full overflow-hidden">
        <motion.div style={{ opacity: videoOpacity }}>
          <video
            ref={videoRef}
            preload="auto"
            muted
            playsInline
            poster={heroImage}
            className="fixed top-0 left-0 w-full h-screen object-cover pointer-events-none scroll-video"
            style={{ 
              zIndex: 0, 
              willChange: 'transform',
              transform: 'translateZ(0)', // Hardware acceleration for ultra-smooth 8K playback
              backfaceVisibility: 'hidden', // Prevent flickering
              imageRendering: 'auto', // Optimize for high-res displays
              filter: 'contrast(1.02) brightness(1.01)' // Subtle enhancement for clarity
            }}
            onError={(e) => console.log('Video failed to load:', e)}
          >
            <source src={finalintVideo} type="video/mp4" />
            {/* Fallback for browsers that don't support MP4 */}
            Your browser does not support the video tag.
          </video>
        </motion.div>
        
        {/* Intro Overlay */}
        <motion.div 
          style={{ 
            opacity: overlayOpacity,
            y: overlayY
          }}
          className="fixed inset-0 flex flex-col items-center justify-center text-center px-4 sm:px-6 pointer-events-none z-30"
        >
          {/* No backgrounds or plates behind the title; only golden text remains */}
          <div className="max-w-5xl mx-auto relative">
            <div className="relative z-10 flex flex-col items-center">
              {/* Elegant logo mark */}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{
                  duration: 0.8,
                  ease: [0.25, 0.1, 0.25, 1],
                  delay: 0.2
                }}
                className="mb-8"
              >
                <div className="w-28 h-28 rounded-full bg-gradient-to-br from-luxury-gold to-luxury-gold/80 flex items-center justify-center shadow-2xl">
                  <svg
                    width="44"
                    height="44"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M3 21h18"/>
                    <path d="M5 21V7l8-4v18"/>
                    <path d="M19 21V11l-6-4"/>
                    <path d="M9 9v.01"/>
                    <path d="M9 12v.01"/>
                    <path d="M9 15v.01"/>
                    <path d="M9 18v.01"/>
                  </svg>
                </div>
              </motion.div>

              {/* Company name with staggered reveal */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.8,
                  ease: [0.25, 0.1, 0.25, 1],
                  delay: 0.6
                }}
                className="mb-2"
              >
                <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-9xl font-playfair font-bold text-luxury-charcoal tracking-tight text-center">
                  SURYA
                </h1>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.8,
                  ease: [0.25, 0.1, 0.25, 1],
                  delay: 0.8
                }}
                className="mb-6"
              >
                <h2 className="text-xl sm:text-2xl md:text-4xl lg:text-6xl font-elegant font-medium text-luxury-charcoal/80 tracking-wide text-center">
                  ARCHITECTS
                </h2>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  ease: [0.25, 0.1, 0.25, 1],
                  delay: 1.0
                }}
                className="mb-10"
              >
                <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground font-light tracking-widest uppercase text-center">
                  & Interiors
                </p>
              </motion.div>

              {/* Minimal progress indicator */}
              <motion.div
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{
                  duration: 0.6,
                  ease: [0.25, 0.1, 0.25, 1],
                  delay: 1.4
                }}
                className="w-40 h-px bg-gradient-to-r from-transparent via-luxury-gold to-transparent mb-8"
              >
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{
                    duration: 1.2,
                    ease: [0.25, 0.1, 0.25, 1],
                    delay: 1.6
                  }}
                  className="h-full bg-luxury-gold origin-left"
                />
              </motion.div>

              {/* Tagline */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  duration: 0.8,
                  ease: [0.25, 0.1, 0.25, 1],
                  delay: 1.8
                }}
                className="text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground font-light tracking-wider text-center max-w-lg px-4"
              >
                Crafting Timeless Spaces with Elegance and Precision  
              </motion.p>
            </div>
          </div>
        </motion.div>
        
        <div ref={setHeightRef} id="set-height" className="relative w-full">
          <div className="relative h-screen flex flex-col items-center justify-center text-center px-4 sm:px-6" style={{ zIndex: 10 }}>
            {/* Original content space - overlay moved outside */}
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <SectionTransition className="relative pt-20 pb-20 px-4 sm:px-6 bg-background">
        <div className="container mx-auto max-w-6xl relative z-20">
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-3xl sm:text-4xl md:text-6xl tracking-luxury-wide font-display-1 font-light text-luxury-charcoal mb-8">
              We Create Homes With Love
            </h2>
            <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground tracking-luxury leading-relaxed max-w-4xl mx-auto font-light">
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
              <h3 className="text-2xl sm:text-3xl md:text-4xl tracking-luxury-wide font-display-1 font-light text-luxury-charcoal mb-6">
                Our Vision
              </h3>
              <p className="text-base sm:text-lg text-muted-foreground tracking-luxury leading-relaxed mb-8">
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
                  <div className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-display-1 font-light text-luxury-gold mb-4">22+</div>
                  <div className="text-base sm:text-lg tracking-luxury-wide uppercase text-luxury-charcoal font-medium">Years of Excellence</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </SectionTransition>

      

      

      {/* Featured Projects with 3D Tilt & Image Reveals */}
      <ScrollStack>
        <SectionTransition className="py-20 px-4 sm:px-6 bg-background">
        <div ref={projectsRef} className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <motion.h2 
              className="text-3xl sm:text-4xl md:text-5xl tracking-luxury-wide mb-4 font-display-1 font-light text-luxury-charcoal"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
            >
              Featured Works
            </motion.h2>
            <motion.p 
              className="text-base sm:text-lg text-muted-foreground tracking-luxury"
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
                initial={{ opacity: 0, y: 80, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ 
                  delay: index * 0.15, 
                  duration: 0.8,
                  ease: [0.25, 0.46, 0.45, 0.94],
                  type: "spring",
                  stiffness: 100,
                  damping: 15
                }}
                viewport={{ once: true, amount: 0.3 }}
                className="group"
              >
                <Card3DTilt to="/projects" className="block relative overflow-hidden aspect-[4/5] bg-background border border-border/30 hover:border-luxury-gold/50 active:border-luxury-gold/50 transition-all duration-700 hover:shadow-2xl hover:shadow-luxury-gold/20 active:shadow-2xl active:shadow-luxury-gold/20 hover:-translate-y-3 active:-translate-y-3 touch-manipulation">
                  {(isActive) => (
                    <>
                      <ImageReveal
                        src={project.image}
                        alt={`${project.title} - ${project.subtitle} interior design project`}
                        className={`w-full h-full object-cover transition-transform duration-700 ${
                          isActive ? 'scale-105' : 'hover:scale-105'
                        }`}
                      />
                      <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-500 flex items-end ${
                        isActive ? 'opacity-100' : 'hover:opacity-100 opacity-0'
                      }`}>
                        <div className="p-8 text-white w-full">
                          <motion.h3
                            className="text-xl sm:text-2xl md:text-3xl tracking-luxury-wide mb-2 font-display-1 font-light"
                            initial={{ y: 20, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.1 }}
                            viewport={{ once: false }}
                          >
                            {project.title}
                          </motion.h3>
                          <motion.p
                            className="text-sm sm:text-base md:text-base tracking-luxury opacity-90 mb-4"
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
                    </>
                  )}
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



      {/* Services Section */}
      <SectionTransition className="py-20 px-4 sm:px-6 bg-muted/30">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-3xl sm:text-4xl md:text-6xl tracking-luxury-wide font-display-1 font-light text-luxury-charcoal mb-8">
              Our Services
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground tracking-luxury leading-relaxed max-w-3xl mx-auto">
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
                  key={service.title}
                  initial={{ opacity: 0, y: 60, rotateX: 15 }}
                  whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                  transition={{ 
                    duration: 0.8, 
                    delay: index * 0.15, 
                    ease: [0.25, 0.46, 0.45, 0.94],
                    type: "spring",
                    stiffness: 120,
                    damping: 20
                  }}
                  viewport={{ once: true }}
                  className="group h-full bg-background border border-border/50 hover:border-luxury-gold/30 transition-all duration-500 rounded-lg overflow-hidden hover:shadow-xl hover:shadow-luxury-gold/10 hover:-translate-y-2 cursor-pointer"
                >
                  <div className="p-8">
                    <div className="mb-6">
                      <div className="w-12 h-12 bg-luxury-gold/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-luxury-gold/20 transition-colors">
                        <span className="text-2xl text-luxury-gold font-display-1">0{index + 1}</span>
                      </div>
                      <h3 className="text-xl sm:text-2xl tracking-luxury-wide font-display-1 font-light text-luxury-charcoal mb-4">
                        {service.title}
                      </h3>
                      <p className="text-sm sm:text-base text-muted-foreground tracking-luxury leading-relaxed mb-6">
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

      {/* Testimonials Section with Enhanced Design */}
      <ScrollStack>
        <SectionTransition className="py-20 px-4 sm:px-6 bg-gradient-to-b from-background to-muted/20">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-3xl sm:text-4xl md:text-6xl tracking-luxury-wide font-display-1 font-light text-luxury-charcoal mb-6">
              Client Stories
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground tracking-luxury leading-relaxed max-w-2xl mx-auto">
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
                initial={{ opacity: 0, y: 30, scale: 0.8 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.1,
                  ease: [0.68, -0.55, 0.265, 1.55],
                  type: "spring",
                  stiffness: 200,
                  damping: 10
                }}
                viewport={{ once: true }}
                className="text-center group"
              >
                <div className="text-2xl sm:text-3xl md:text-4xl font-display-1 font-light text-luxury-gold mb-2">
                  {stat.number}
                </div>
                <div className="text-sm sm:text-sm tracking-luxury-wide uppercase text-muted-foreground font-medium">
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
      <SectionTransition className="py-20 px-4 sm:px-6 bg-background">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl tracking-luxury-wide font-display-1 font-light text-luxury-charcoal mb-8">
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
                    className="flex items-center space-x-3 group/item hover:bg-luxury-beige/20 p-2 rounded-lg transition-colors duration-300 cursor-pointer"
                  >
                    <div className="w-2 h-2 bg-luxury-gold rounded-full flex-shrink-0 group-hover/item:scale-125 transition-transform duration-300"></div>
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
                  <blockquote className="text-lg sm:text-xl md:text-2xl font-display-1 font-light text-luxury-charcoal leading-relaxed mb-6">
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
