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
import suryaLogo from "@/assets/suryalogo.png";

const Home = () => {
  const projectsRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const setHeightRef = useRef<HTMLDivElement>(null);
  const [videoDuration, setVideoDuration] = useState(0);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [heroHeight, setHeroHeight] = useState(0);
  const [displayText, setDisplayText] = useState('SURYA ARCHITECTS');
  const [showCursor, setShowCursor] = useState(false);
  const [currentStatIndex, setCurrentStatIndex] = useState(0);
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

  // Ultra-smooth scroll-controlled video logic with optimized 8K performance
  useEffect(() => {
    if (isReducedMotion || !videoRef.current) return;
    
    const vid = videoRef.current;
    const playbackConst = 2500; // Balanced for smooth 8K control without excessive scrolling
    let ticking = false;
    let lastScrollY = 0;
    let rafId: number;
    
    // Preload video for instant playback
    vid.preload = 'auto';
    vid.load();
    
    const updateVideoTime = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      
      // Ultra-smooth interpolation for crisp video playback with spring physics
      const targetScroll = Math.min(heroHeight, Math.max(0, scrollTop));
      const currentScroll = lastScrollY;
      const delta = targetScroll - currentScroll;
      
      // Spring-based interpolation for natural movement
      const springStrength = 0.12; // Lower = smoother, more lag
      const interpolatedScroll = currentScroll + delta * springStrength;
      
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
    };
    
    const scrollHandler = () => {
      if (!ticking) {
        ticking = true;
        rafId = requestAnimationFrame(updateVideoTime);
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
      scrollHandler();
    };
    
    const handleCanPlayThrough = () => {
      // Video is fully loaded and ready for ultra-smooth playback
      vid.playbackRate = 1;
    };
    
    vid.addEventListener('loadedmetadata', handleLoadedMetadata);
    vid.addEventListener('canplaythrough', handleCanPlayThrough);
    
    // Passive scroll listener for maximum performance
    window.addEventListener('scroll', scrollHandler, { passive: true });
    
    return () => {
      vid.removeEventListener('loadedmetadata', handleLoadedMetadata);
      vid.removeEventListener('canplaythrough', handleCanPlayThrough);
      window.removeEventListener('scroll', scrollHandler);
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
    };
  }, [isReducedMotion, heroHeight]);
  
  const projects = [
    { id: 1, title: "Bangalore Residence", subtitle: "Contemporary Luxury", image: project1 },
    { id: 2, title: "Modern Kitchen", subtitle: "Minimalist Elegance", image: project2 },
    { id: 3, title: "Urban Living", subtitle: "City Views", image: project3 },
    { id: 4, title: "Spa Bathroom", subtitle: "Serene Sanctuary", image: project4 },
  ];

  // Dynamic stats for center card
  const stats = [
    { number: "22", unit: "Years", subtitle: "of Excellence", description: "Creating spaces that become part of your story" },
    { number: "500+", unit: "Projects", subtitle: "Completed", description: "Transforming dreams into reality" },
    { number: "98%", unit: "Satisfaction", subtitle: "Rate", description: "Happy clients who trust our vision" },
    { number: "15+", unit: "Awards", subtitle: "Won", description: "Recognition for outstanding design excellence" },
    { number: "50+", unit: "Team", subtitle: "Members", description: "Expert designers and craftsmen" },
    { number: "24/7", unit: "Support", subtitle: "Available", description: "Always here when you need us" }
  ];

  // Preload critical assets for ultra-smooth experience
  useEffect(() => {
    const preloadAssets = () => {
      // Preload hero image
      const heroImg = new Image();
      heroImg.src = heroImage;
      
      // Preload project images
      projects.forEach(project => {
        const img = new Image();
        img.src = project.image;
      });
      
      // Preload video (already handled in video logic, but ensure it's cached)
      if (finalintVideo) {
        const video = document.createElement('video');
        video.preload = 'auto';
        video.src = finalintVideo;
      }
    };
    
    preloadAssets();
  }, [projects, heroImage, finalintVideo]);

  // Auto-cycle through stats every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStatIndex((prevIndex) => (prevIndex + 1) % stats.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [stats.length]);

  return (
    <div className="min-h-screen bg-background cursor-none overflow-x-hidden ultra-smooth">
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
            className="fixed top-0 left-0 w-full h-screen object-cover pointer-events-none scroll-video gpu-accelerated"
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
          className="fixed inset-0 flex flex-col items-center justify-start pt-20 text-center px-4 sm:px-6 pointer-events-none z-30 gpu-accelerated"
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
                  ease: [0.23, 1, 0.32, 1],
                  delay: 0.2
                }}
                className="mb-8 gpu-accelerated"
              >
                <img
                  src={suryaLogo}
                  alt="Surya Architects & Interiors"
                  className="h-64 sm:h-80 md:h-96 lg:h-[32rem] w-auto mx-auto"
                />
              </motion.div>
            </div>
          </div>
        </motion.div>
        
        <div ref={setHeightRef} id="set-height" className="relative w-full">
          <div className="relative h-screen flex flex-col items-center justify-center text-center px-4 sm:px-6" style={{ zIndex: 10 }}>
            {/* Original content space - overlay moved outside */}
          </div>
        </div>
      </section>

      {/* Vision Section - Redesigned with Images & Animations */}
      <SectionTransition className="relative py-32 px-4 sm:px-6 bg-background overflow-hidden">
        {/* Enhanced Background with Gradient & Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-luxury-beige/5 via-transparent to-luxury-gold/5"></div>
        <div className="absolute inset-0 opacity-3">
          <div
            className="absolute top-0 left-0 w-1/3 h-full bg-cover bg-center"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')`
            }}
          />
          <div
            className="absolute top-0 right-0 w-1/3 h-full bg-cover bg-center"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')`
            }}
          />
        </div>

        {/* Floating Particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-luxury-gold/20 rounded-full blur-sm"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [-20, -100, -20],
                x: [0, Math.random() * 50 - 25, 0],
                opacity: [0, 0.6, 0],
                scale: [0.5, 1.2, 0.5],
              }}
              transition={{
                duration: 8 + Math.random() * 4,
                repeat: Infinity,
                delay: Math.random() * 5,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        <div className="container mx-auto max-w-7xl relative z-20">
          {/* Main Title */}
          <motion.div
            initial={{ opacity: 0, y: 60, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.5, ease: [0.23, 1, 0.32, 1] }}
            viewport={{ once: true, amount: 0.3 }}
            className="text-center mb-24 gpu-accelerated"
          >
            <motion.h2
              className="text-3xl sm:text-4xl md:text-7xl tracking-luxury-wide font-display-1 font-light text-luxury-charcoal mb-8 relative"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.2 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              We Create Inspired Spaces
              <motion.span
                className="block text-luxury-gold"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.6 }}
                viewport={{ once: true, amount: 0.3 }}
              >
                With Love
              </motion.span>
            </motion.h2>

            <motion.p
              className="text-xl sm:text-2xl md:text-3xl text-muted-foreground tracking-luxury leading-relaxed max-w-4xl mx-auto font-light"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.8 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              Every space tells a story. We craft environments that inspire, comfort, and endure.
            </motion.p>
          </motion.div>

          {/* Visual Elements Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
            {/* Left Image - Enhanced Scroll Animation */}
            <motion.div
              initial={{ opacity: 0, x: -120, rotateY: 25, scale: 0.8 }}
              whileInView={{ opacity: 1, x: 0, rotateY: 0, scale: 1 }}
              transition={{ 
                duration: 1.4, 
                delay: 0.2,
                ease: [0.23, 1, 0.32, 1],
                type: "spring",
                stiffness: 80,
                damping: 20
              }}
              viewport={{ once: true, amount: 0.4 }}
              className="relative group gpu-accelerated"
            >
              <div className="aspect-[4/5] bg-gradient-to-br from-luxury-beige/30 via-luxury-gold/10 to-luxury-beige/20 rounded-3xl overflow-hidden shadow-2xl shadow-luxury-gold/10 hover:shadow-3xl hover:shadow-luxury-gold/20 transition-all duration-700 relative">
                {/* Enhanced Shimmer Effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -skew-x-12 translate-x-[-200%] group-hover:translate-x-[300%] transition-transform duration-1200 ease-out"
                  animate={{
                    translateX: ["-200%", "300%"],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatDelay: 5,
                    ease: "easeInOut"
                  }}
                />

                <motion.div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-110"
                  style={{
                    backgroundImage: `url('https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80')`
                  }}
                  whileHover={{ scale: 1.08 }}
                  transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent group-hover:from-black/80 group-hover:via-black/30 transition-all duration-500" />
                
                {/* Enhanced Content Animation */}
                <motion.div
                  className="absolute bottom-8 left-8 right-8 text-white"
                  initial={{ opacity: 0, y: 30, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                  viewport={{ once: true, amount: 0.3 }}
                >
                  <motion.h3
                    className="text-2xl font-display-1 font-light mb-2"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 1 }}
                    viewport={{ once: true, amount: 0.3 }}
                  >
                    Craftsmanship
                  </motion.h3>
                  <motion.p
                    className="text-sm opacity-90 leading-relaxed"
                    initial={{ opacity: 0, x: -15 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 1.2 }}
                    viewport={{ once: true, amount: 0.3 }}
                  >
                    Attention to every detail
                  </motion.p>
                </motion.div>
                
                {/* Floating Accent Elements */}
                <motion.div
                  className="absolute top-6 right-6 w-3 h-3 bg-luxury-gold/60 rounded-full blur-sm"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.4, 0.8, 0.4]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1
                  }}
                />
              </div>
            </motion.div>

            {/* Center Content */}
            <motion.div
              initial={{ opacity: 0, y: 60, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1.4, delay: 0.5, ease: [0.23, 1, 0.32, 1] }}
              viewport={{ once: true, amount: 0.3 }}
              className="text-center gpu-accelerated"
            >
              <motion.div
                className="relative mb-8"
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1, delay: 0.8 }}
                viewport={{ once: true, amount: 0.3 }}
              >
                {/* Enhanced Glowing Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-luxury-gold/15 via-luxury-beige/8 to-luxury-gold/15 rounded-2xl blur-xl scale-110" />

                <div className="relative bg-gradient-to-br from-background/95 via-luxury-beige/5 to-background/95 backdrop-blur-md border border-luxury-gold/30 rounded-2xl p-6 shadow-xl shadow-luxury-gold/10 hover:shadow-2xl hover:shadow-luxury-gold/20 transition-all duration-500 hover:-translate-y-1">
                  {/* Main Number Display */}
                  <motion.div 
                    key={`number-${currentStatIndex}`}
                    className="text-center mb-4"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
                  >
                    <div className="text-5xl md:text-6xl font-bold text-luxury-gold mb-1 font-display-1 tracking-tight">
                      {stats[currentStatIndex].number}
                    </div>
                    <div className="w-12 h-px bg-gradient-to-r from-transparent via-luxury-gold to-transparent mx-auto" />
                  </motion.div>

                  {/* Unit and Subtitle */}
                  <motion.div 
                    key={`unit-${currentStatIndex}`}
                    className="text-center mb-3"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
                  >
                    <div className="text-lg md:text-xl font-semibold text-luxury-charcoal uppercase tracking-wider font-display-1 mb-1">
                      {stats[currentStatIndex].unit}
                    </div>
                    <div className="text-sm md:text-base text-muted-foreground font-medium tracking-wide">
                      {stats[currentStatIndex].subtitle}
                    </div>
                  </motion.div>

                  {/* Enhanced Decorative Elements */}
                  <motion.div
                    className="absolute -top-2 -right-2 w-8 h-8 bg-luxury-gold/20 rounded-full blur-lg"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.4, 0.8, 0.4]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                  <motion.div
                    className="absolute -bottom-3 -left-3 w-10 h-10 bg-luxury-beige/30 rounded-full blur-xl"
                    animate={{
                      scale: [1.1, 1, 1.1],
                      opacity: [0.3, 0.6, 0.3]
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 1
                    }}
                  />

                  {/* Subtle Sparkle Effects */}
                  {[...Array(4)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1 h-1 bg-luxury-gold/60 rounded-full"
                      style={{
                        left: `${25 + Math.random() * 50}%`,
                        top: `${25 + Math.random() * 50}%`,
                      }}
                      animate={{
                        scale: [0, 1, 0],
                        opacity: [0, 0.8, 0],
                      }}
                      transition={{
                        duration: 2.5,
                        repeat: Infinity,
                        delay: Math.random() * 2,
                        ease: "easeInOut",
                      }}
                    />
                  ))}
                </div>
              </motion.div>

              <motion.div
                className="space-y-4"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1.2 }}
                viewport={{ once: true, amount: 0.3 }}
              >
                <div className="w-16 h-px bg-gradient-to-r from-transparent via-luxury-gold/60 to-transparent mx-auto" />
                <motion.p 
                  key={`description-${currentStatIndex}`}
                  className="text-base md:text-lg text-muted-foreground tracking-wide leading-relaxed font-light max-w-xs mx-auto text-center italic"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.4, ease: [0.23, 1, 0.32, 1] }}
                >
                  {stats[currentStatIndex].description}
                </motion.p>
                <div className="w-16 h-px bg-gradient-to-r from-transparent via-luxury-gold/60 to-transparent mx-auto" />
              </motion.div>
            </motion.div>

            {/* Right Image - Enhanced Scroll Animation */}
            <motion.div
              initial={{ opacity: 0, x: 120, rotateY: -25, scale: 0.8 }}
              whileInView={{ opacity: 1, x: 0, rotateY: 0, scale: 1 }}
              transition={{ 
                duration: 1.4, 
                delay: 0.4,
                ease: [0.23, 1, 0.32, 1],
                type: "spring",
                stiffness: 80,
                damping: 20
              }}
              viewport={{ once: true, amount: 0.4 }}
              className="relative group gpu-accelerated"
            >
              <div className="aspect-[4/5] bg-gradient-to-br from-luxury-gold/20 via-luxury-beige/10 to-luxury-gold/30 rounded-3xl overflow-hidden shadow-2xl shadow-luxury-gold/10 hover:shadow-3xl hover:shadow-luxury-gold/20 transition-all duration-700 relative">
                {/* Enhanced Shimmer Effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -skew-x-12 translate-x-[-200%] group-hover:translate-x-[300%] transition-transform duration-1200 ease-out"
                  animate={{
                    translateX: ["-200%", "300%"],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatDelay: 5,
                    ease: "easeInOut",
                    delay: 1.5
                  }}
                />

                <motion.div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-110"
                  style={{
                    backgroundImage: `url('https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80')`
                  }}
                  whileHover={{ scale: 1.08 }}
                  transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent group-hover:from-black/80 group-hover:via-black/30 transition-all duration-500" />
                
                {/* Enhanced Content Animation */}
                <motion.div
                  className="absolute bottom-8 left-8 right-8 text-white"
                  initial={{ opacity: 0, y: 30, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.8, delay: 1.2 }}
                  viewport={{ once: true, amount: 0.3 }}
                >
                  <motion.h3
                    className="text-2xl font-display-1 font-light mb-2"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 1.4 }}
                    viewport={{ once: true, amount: 0.3 }}
                  >
                    Harmony
                  </motion.h3>
                  <motion.p
                    className="text-sm opacity-90 leading-relaxed"
                    initial={{ opacity: 0, x: 15 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 1.6 }}
                    viewport={{ once: true, amount: 0.3 }}
                  >
                    Balance in every design
                  </motion.p>
                </motion.div>
                
                {/* Floating Accent Elements */}
                <motion.div
                  className="absolute top-6 left-6 w-3 h-3 bg-luxury-gold/60 rounded-full blur-sm"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.4, 0.8, 0.4]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 2
                  }}
                />
              </div>
            </motion.div>
          </div>

          {/* Bottom decorative line with enhanced styling */}
          <motion.div
            className="mt-24 flex justify-center"
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 1.5, delay: 1, ease: [0.23, 1, 0.32, 1] }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <div className="relative">
              <div className="w-32 h-px bg-gradient-to-r from-transparent via-luxury-gold/50 to-transparent" />
              <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-luxury-gold rounded-full"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </div>
          </motion.div>
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
            className="text-center mb-20 gpu-accelerated"
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 80, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ 
                  delay: index * 0.15, 
                  duration: 0.8,
                  ease: [0.23, 1, 0.32, 1],
                  type: "spring",
                  stiffness: 100,
                  damping: 15
                }}
                viewport={{ once: true, amount: 0.3 }}
                className="group gpu-accelerated"
              >
                <Card3DTilt to="/projects" className="block relative overflow-hidden aspect-[5/4] bg-background border border-border/30 hover:border-luxury-gold/50 active:border-luxury-gold/50 transition-all duration-700 hover:shadow-2xl hover:shadow-luxury-gold/20 active:shadow-2xl active:shadow-luxury-gold/20 hover:-translate-y-3 active:-translate-y-3 touch-manipulation gpu-accelerated">
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
                className="inline-block px-12 py-4 border border-foreground text-foreground tracking-luxury uppercase text-sm hover:bg-foreground hover:text-background transition-ultra-smooth micro-hover micro-glow"
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
            viewport={{ once: true, amount: 0.3 }}
            className="text-center mb-16 gpu-accelerated"
          >
            <h2 className="text-3xl sm:text-4xl md:text-6xl tracking-luxury-wide font-display-1 font-light text-luxury-charcoal mb-6">
              Our Services
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground tracking-luxury leading-relaxed max-w-2xl mx-auto">
              Comprehensive design solutions from concept to completion
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Design & Planning",
                description: "Strategic space planning with detailed layouts and material selections",
                image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
              },
              {
                title: "Full Service Design",
                description: "End-to-end project management with expert coordination",
                image: "https://images.unsplash.com/photo-1503387837-b154d5074bd2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
              },
              {
                title: "Turnkey Solutions",
                description: "Complete furnishing and styling for move-in ready spaces",
                image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
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
                  viewport={{ once: true, amount: 0.2 }}
                  className="group h-full bg-background border border-border/50 hover:border-luxury-gold/30 transition-ultra-smooth rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-luxury-gold/10 hover:-translate-y-2 cursor-pointer micro-hover micro-glow relative"
                  style={{ minHeight: '300px' }}
                >
                  {/* Background Image */}
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                    style={{ backgroundImage: `url(${service.image})` }}
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-all duration-500" />

                  {/* Content */}
                  <div className="relative z-10 p-8 h-full flex flex-col justify-end text-center">
                    <motion.div
                      className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500"
                      initial={{ opacity: 0.8 }}
                      whileHover={{ opacity: 1 }}
                    >
                      <h3 className="text-xl sm:text-2xl tracking-luxury-wide font-display-1 font-light text-white mb-4 drop-shadow-lg">
                        {service.title}
                      </h3>
                      <motion.p
                        className="text-sm sm:text-base text-white/90 tracking-luxury leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 drop-shadow-md"
                      >
                        {service.description}
                      </motion.p>
                    </motion.div>
                  </div>
                </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <MagneticButton strength={0.4}>
              <Link
                to="/contact"
                className="inline-block px-12 py-4 border border-luxury-charcoal text-luxury-charcoal tracking-luxury-wide uppercase text-sm hover:bg-luxury-charcoal hover:text-luxury-white transition-ultra-smooth micro-hover micro-glow"
              >
                Start Your Project
              </Link>
            </MagneticButton>
          </motion.div>
        </div>
      </SectionTransition>

      {/* Testimonials Section - Minimalistic Design */}
      <ScrollStack>
        <SectionTransition className="py-32 px-4 sm:px-6 bg-background">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl md:text-7xl tracking-luxury-wide font-display-1 font-light text-luxury-charcoal">
              Client Stories
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Elegant quote mark */}
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-8xl md:text-9xl font-display-1 font-light text-luxury-gold/20">
              "
            </div>
            <TestimonialCarousel />
          </motion.div>
        </div>
      </SectionTransition>
      </ScrollStack>

      <ScrollStack>
        <InstagramFeed />
      </ScrollStack>
      
      {/* About/Expertise Section - Enhanced Visual Design */}
      <SectionTransition className="relative py-20 px-4 sm:px-6 bg-background overflow-hidden mt-16">
        {/* Enhanced Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-luxury-beige/3 via-transparent to-luxury-gold/3"></div>
        <div className="absolute inset-0 opacity-2">
          <div
            className="absolute top-0 left-0 w-1/2 h-full bg-cover bg-center"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')`
            }}
          />
          <div
            className="absolute top-0 right-0 w-1/2 h-full bg-cover bg-center"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')`
            }}
          />
        </div>

        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-3 h-3 bg-luxury-gold/15 rounded-full blur-sm"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [-30, -80, -30],
                x: [0, Math.random() * 60 - 30, 0],
                opacity: [0, 0.4, 0],
                scale: [0.8, 1.4, 0.8],
              }}
              transition={{
                duration: 10 + Math.random() * 6,
                repeat: Infinity,
                delay: Math.random() * 8,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        <div className="container mx-auto max-w-7xl relative z-20">
          {/* Enhanced Title */}
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.4, ease: [0.23, 1, 0.32, 1] }}
            viewport={{ once: true, amount: 0.3 }}
            className="text-center mb-24 gpu-accelerated"
          >
            <motion.h2
              className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl tracking-luxury-wide font-display-1 font-light text-luxury-charcoal mb-8 relative"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.2 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              Why Choose
              <motion.span
                className="block text-luxury-charcoal"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
                viewport={{ once: true, amount: 0.3 }}
              >
                Surya Architects & Interiors?
              </motion.span>
            </motion.h2>

            <motion.p
              className="text-lg sm:text-xl md:text-2xl text-muted-foreground tracking-luxury leading-relaxed max-w-3xl mx-auto font-light"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.7 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              Discover what sets us apart in creating extraordinary living spaces
            </motion.p>
          </motion.div>

          {/* Enhanced Content Grid - Full Screen Before & After Showcase */}
          <div className="relative w-full">
            {/* Full Screen Before & After Images */}
            <div className="grid grid-cols-2 gap-16 h-[80vh] min-h-[600px]">
              {/* Before Image - Left Side */}
              <motion.div
                className="relative group overflow-hidden rounded-3xl"
                initial={{ opacity: 0, x: -100 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
                viewport={{ once: true, amount: 0.3 }}
              >
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-110"
                  style={{
                    backgroundImage: `url('https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')`
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />

                {/* Content Overlay */}
                <div className="relative z-10 h-full flex flex-col justify-center p-12 text-white">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    viewport={{ once: true, amount: 0.3 }}
                  >
                    <h3 className="text-4xl md:text-5xl lg:text-6xl font-display-1 font-light mb-4">Before</h3>
                    <p className="text-lg md:text-xl opacity-90 leading-relaxed mb-8">Empty & Uninspired Space</p>
                    <div className="w-16 h-px bg-luxury-gold mb-6" />
                    <p className="text-base opacity-80 leading-relaxed">
                      Just another ordinary room waiting for transformation
                    </p>
                  </motion.div>
                </div>
              </motion.div>

              {/* After Image - Right Side */}
              <motion.div
                className="relative group overflow-hidden rounded-3xl"
                initial={{ opacity: 0, x: 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 1.2, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
                viewport={{ once: true, amount: 0.3 }}
              >
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-110"
                  style={{
                    backgroundImage: `url('https://images.unsplash.com/photo-1615874959474-d609969a20ed?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')`
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-l from-black/60 via-black/30 to-transparent" />

                {/* Content Overlay */}
                <div className="relative z-10 h-full flex flex-col justify-center p-12 text-white text-right">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    viewport={{ once: true, amount: 0.3 }}
                  >
                    <h3 className="text-4xl md:text-5xl lg:text-6xl font-display-1 font-light mb-4">After</h3>
                    <p className="text-lg md:text-xl opacity-90 leading-relaxed mb-8">Luxurious & Inviting Space</p>
                    <div className="w-16 h-px bg-luxury-gold ml-auto mb-6" />
                    <p className="text-base opacity-80 leading-relaxed">
                      A masterpiece of design and functionality
                    </p>
                  </motion.div>
                </div>
              </motion.div>
            </div>

            {/* Center Arrow and Transformation Text */}
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <div className="bg-luxury-gold/95 backdrop-blur-sm rounded-full p-6 shadow-2xl shadow-luxury-gold/50 border border-white/20">
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="animate-pulse"
                >
                  <path d="M5 12h14"/>
                  <path d="M12 5l7 7-7 7"/>
                </svg>
              </div>
              <motion.div
                className="text-center mt-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1 }}
                viewport={{ once: true, amount: 0.3 }}
              >
                <p className="text-luxury-gold font-display-1 font-medium text-lg tracking-luxury-wide uppercase">
                  Transformation
                </p>
              </motion.div>
            </motion.div>

            {/* Bottom Content Section */}
            <motion.div
              className="mt-8 text-center"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <div className="max-w-4xl mx-auto">
                <motion.p
                  className="text-xl md:text-2xl text-luxury-charcoal tracking-luxury leading-relaxed font-light mb-8"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 0.8 }}
                  viewport={{ once: true, amount: 0.3 }}
                >
                  Transform your space from ordinary to extraordinary. Our expert designers blend timeless elegance with modern functionality, creating interiors that tell your unique story.
                </motion.p>

                {/* Enhanced Features Grid */}
                <motion.div
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 1 }}
                  viewport={{ once: true, amount: 0.3 }}
                >
                  {[
                    { title: "Vision to Reality", desc: "From concept sketches to stunning finished spaces" },
                    { title: "Luxury Materials", desc: "Premium finishes that stand the test of time" },
                    { title: "Personalized Service", desc: "Dedicated team committed to your satisfaction" },
                    { title: "Timeless Design", desc: "Spaces that remain beautiful for generations" }
                  ].map((feature, index) => (
                    <motion.div
                      key={feature.title}
                      initial={{ opacity: 0, y: 30, scale: 0.95 }}
                      whileInView={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{
                        duration: 0.8,
                        delay: 1.2 + index * 0.1,
                        ease: [0.23, 1, 0.32, 1]
                      }}
                      viewport={{ once: true, amount: 0.3 }}
                      className="group bg-gradient-to-br from-background/90 via-luxury-beige/5 to-background/90 backdrop-blur-sm border border-luxury-gold/10 hover:border-luxury-gold/30 p-6 rounded-2xl transition-all duration-500 hover:shadow-lg hover:shadow-luxury-gold/10 cursor-pointer"
                    >
                      <div className="text-center">
                        <motion.div
                          className="w-6 h-6 bg-luxury-gold rounded-full mx-auto mb-4"
                          whileHover={{ scale: 1.5 }}
                          transition={{ duration: 0.3 }}
                        />
                        <h4 className="text-lg font-display-1 font-medium text-luxury-charcoal mb-2 group-hover:text-luxury-gold transition-colors duration-300">
                          {feature.title}
                        </h4>
                        <p className="text-sm text-muted-foreground tracking-luxury leading-relaxed">
                          {feature.desc}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Enhanced Bottom Accent */}
          <motion.div
            className="mt-20 flex justify-center"
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 1.5, delay: 1.2, ease: [0.23, 1, 0.32, 1] }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <div className="relative">
              <div className="w-40 h-px bg-gradient-to-r from-transparent via-luxury-gold/40 to-transparent" />
              <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-luxury-gold rounded-full"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.6, 1, 0.6],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </div>
          </motion.div>
        </div>
      </SectionTransition>

      <ScrollStack>
        <SectionTransition className="pt-32 pb-48 px-4 sm:px-6 bg-background">
          <CTASection />
        </SectionTransition>
      </ScrollStack>

      <Footer />
    </div>
  );
};

export default Home;
