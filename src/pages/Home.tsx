import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";
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
import BentoGrid from "@/components/BentoGrid";
import project1 from "@/assets/project-1.jpg";
import project2 from "@/assets/project-2.jpg";
import project3 from "@/assets/project-3.jpg";
import project4 from "@/assets/project-4.jpg";
import suryaLogo from "@/assets/suryalogo.png";
import { Phone, Mail, MapPin, Instagram, Youtube, Facebook } from "lucide-react";

const Home = () => {
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [currentStatIndex, setCurrentStatIndex] = useState(0);
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const { scrollY } = useScroll();
  
  // Hero section height and opacity transforms
  const heroHeight = typeof window !== 'undefined' ? window.innerHeight : 1000;
  const heroOpacity = useTransform(scrollY, [0, heroHeight * 0.7, heroHeight], [1, 1, 0]);
  const overlayOpacity = useTransform(scrollY, [0, heroHeight * 0.5, heroHeight], [1, 0.8, 0]);
  const overlayY = useTransform(scrollY, [0, heroHeight], [0, -100]);
  
  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mediaQuery.matches);
    
    const handleChange = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const projects = [
    { id: 1, title: "Luxury Penthouse", subtitle: "Urban Elegance", image: project1 },
    { id: 2, title: "Modern Villa", subtitle: "Contemporary Living", image: project2 },
    { id: 3, title: "Boutique Hotel", subtitle: "Hospitality Design", image: project3 },
    { id: 4, title: "Minimalist Residence", subtitle: "Clean Lines", image: project4 },
  ];

  // Dynamic stats for center card
  const stats = [
    { number: "15+", unit: "Years", subtitle: "of Excellence", description: "Creating spaces that become part of your story" },
    { number: "300+", unit: "Projects", subtitle: "Completed", description: "Transforming dreams into reality" },
    { number: "98%", unit: "Satisfaction", subtitle: "Rate", description: "Happy clients who trust our vision" },
    { number: "25+", unit: "Awards", subtitle: "Won", description: "Recognition for outstanding design excellence" }
  ];

  // Architecture quotes inspired by ARK Architects
  const quotes = [
    {
      text: "Designing Is Not A Profession But An Attitude",
      author: "László Moholy-Nagy"
    },
    {
      text: "God Is In The Details",
      author: "Mies van der Rohe"
    },
    {
      text: "Less Is More",
      author: "Mies van der Rohe"
    },
    {
      text: "Form Ever Follows Function",
      author: "Louis Sullivan"
    },
    {
      text: "Simplicity Is The Ultimate Sophistication",
      author: "Leonardo da Vinci"
    },
    {
      text: "The Sun Never Knew How Great It Was Until It Hit The Side Of A Building",
      author: "Louis Kahn"
    }
  ];

  // Auto-cycle through stats every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStatIndex((prevIndex) => (prevIndex + 1) % stats.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [stats.length]);

  // Auto-cycle through quotes every 6 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuoteIndex((prevIndex) => (prevIndex + 1) % quotes.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [quotes.length]);

  return (
    <div className="min-h-screen bg-background cursor-none overflow-x-hidden ultra-smooth">
      <CustomCursor />
      <ScrollProgress />
      <Navigation />
      
      {/* Hero Section with Luxury 3D Elements */}
      <section className="relative w-full h-screen overflow-hidden">
        <motion.div 
          style={{ opacity: heroOpacity }}
          className="absolute inset-0"
          initial={{ scale: 1.1, rotate: 0.5 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          {/* Luxury background with multiple layers */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ 
              backgroundImage: `url('https://images.unsplash.com/photo-1487958449943-2429e8be8625?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')`,
              backgroundAttachment: 'fixed'
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-luxury-charcoal/60 via-luxury-charcoal/30 to-luxury-charcoal/80" />
          
          {/* 3D Floating Elements */}
          <div className="absolute inset-0 overflow-hidden">
            {/* Geometric shapes */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={`shape-${i}`}
                className="absolute"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                initial={{ opacity: 0, scale: 0, rotate: 0 }}
                animate={{
                  opacity: [0, 0.1, 0],
                  scale: [0, 1, 0],
                  rotate: [0, 180, 360],
                  x: [0, Math.random() * 200 - 100, 0],
                  y: [0, Math.random() * 200 - 100, 0],
                }}
                transition={{
                  duration: 20 + Math.random() * 10,
                  repeat: Infinity,
                  delay: Math.random() * 5,
                }}
              >
                <div className={`w-16 h-16 border border-luxury-gold/20 ${i % 2 === 0 ? 'rounded-full' : 'rounded-lg'}`} 
                     style={{ transform: `rotateX(${Math.random() * 60}deg) rotateY(${Math.random() * 60}deg)` }} />
              </motion.div>
            ))}
            
            {/* Luxury particles */}
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={`particle-${i}`}
                className="absolute rounded-full bg-luxury-gold/20"
                style={{
                  width: Math.random() * 6 + 2,
                  height: Math.random() * 6 + 2,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -200, 0],
                  x: [0, Math.random() * 100 - 50, 0],
                  opacity: [0, 0.6, 0],
                  scale: [0.5, 1.5, 0.5],
                }}
                transition={{
                  duration: 15 + Math.random() * 10,
                  repeat: Infinity,
                  delay: Math.random() * 5,
                }}
              />
            ))}
            
            {/* Floating images */}
            
            
           
          </div>
        </motion.div>
        
        {/* Authentic Sidebar */}
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          className="fixed left-0 top-0 h-screen w-20 lg:w-24 z-20 hidden lg:flex flex-col items-center justify-center bg-gradient-to-b from-luxury-white/95 via-luxury-beige/90 to-luxury-white/95 backdrop-blur-xl border-r-2 border-luxury-gold/40 shadow-2xl shadow-luxury-charcoal/10"
        >
          {/* Subtle background pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-10 left-1/2 transform -translate-x-1/2 w-px h-16 bg-luxury-gold/30"></div>
            <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 w-px h-16 bg-luxury-gold/30"></div>
          </div>

          <div className="relative space-y-6 lg:space-y-8">
            {[
              {
                icon: Phone,
                value: "+91 7483109814",
                href: "tel:+917483109814",
                label: "Phone",
                color: "from-blue-500/20 to-cyan-500/20",
                hoverColor: "from-blue-500/30 to-cyan-500/30"
              },
              {
                icon: Mail,
                value: "suryaarc.int@gmail.com",
                href: "mailto:suryaarc.int@gmail.com",
                label: "Email",
                color: "from-purple-500/20 to-pink-500/20",
                hoverColor: "from-purple-500/30 to-pink-500/30"
              },
              {
                icon: MapPin,
                value: "Bangalore",
                href: "https://maps.app.goo.gl/kdvQjZzf9X2R9MnX8?g_st=aw",
                label: "Location",
                color: "from-green-500/20 to-emerald-500/20",
                hoverColor: "from-green-500/30 to-emerald-500/30"
              },
              {
                icon: Instagram,
                value: "@surya_architects_interiors",
                href: "https://www.instagram.com/surya_architects_interiors?igsh=ZzlqYm55MTVid29r",
                label: "Instagram",
                color: "from-pink-500/20 to-rose-500/20",
                hoverColor: "from-pink-500/30 to-rose-500/30"
              },
              {
                icon: Youtube,
                value: "YouTube",
                href: "#",
                label: "YouTube",
                color: "from-red-500/20 to-orange-500/20",
                hoverColor: "from-red-500/30 to-orange-500/30"
              },
              {
                icon: Facebook,
                value: "Facebook",
                href: "#",
                label: "Facebook",
                color: "from-blue-600/20 to-blue-800/20",
                hoverColor: "from-blue-600/30 to-blue-800/30"
              }
            ].map((item, index) => (
              <motion.a
                key={item.label}
                href={item.href}
                target={item.href.startsWith('http') ? '_blank' : undefined}
                rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{
                  duration: 0.8,
                  delay: 0.8 + index * 0.15,
                  ease: [0.25, 0.46, 0.45, 0.94]
                }}
                className="group relative flex flex-col items-center space-y-3 p-3 rounded-xl hover:bg-gradient-to-br hover:from-luxury-gold/10 hover:to-luxury-beige/10 transition-all duration-500 hover:scale-110 hover:shadow-lg hover:shadow-luxury-gold/20"
                title={item.value}
              >
                {/* Glow effect on hover */}
                <motion.div
                  className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `linear-gradient(135deg, ${item.color.replace('/20', '/10')}, ${item.hoverColor.replace('/30', '/15')})`,
                    filter: 'blur(8px)'
                  }}
                />

                <motion.div
                  whileHover={{
                    scale: 1.3,
                    rotate: [0, -5, 5, 0],
                    transition: { duration: 0.6, ease: "easeInOut" }
                  }}
                  whileTap={{ scale: 0.95 }}
                  className={`relative w-12 h-12 lg:w-14 lg:h-14 bg-gradient-to-br ${item.color} border border-luxury-gold/50 flex items-center justify-center rounded-xl group-hover:bg-gradient-to-br group-hover:${item.hoverColor} transition-all duration-500 shadow-md group-hover:shadow-xl group-hover:shadow-luxury-gold/30`}
                >
                  <item.icon className="w-5 h-5 lg:w-6 lg:h-6 text-luxury-charcoal group-hover:text-luxury-gold transition-colors duration-300" />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 + index * 0.1 }}
                  className="text-xs text-luxury-charcoal/60 font-medium text-center leading-tight max-w-full truncate group-hover:text-luxury-charcoal group-hover:font-semibold transition-all duration-300"
                >
                  {item.label}
                </motion.div>

                {/* Subtle connecting line */}
                {index < 5 && (
                  <motion.div
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    transition={{ delay: 1.5 + index * 0.1, duration: 0.8 }}
                    className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-px h-6 bg-gradient-to-b from-luxury-gold/40 to-transparent"
                  />
                )}
              </motion.a>
            ))}
          </div>

          {/* Bottom decorative element */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 2, duration: 0.8 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <div className="w-8 h-1 bg-gradient-to-r from-transparent via-luxury-gold/60 to-transparent rounded-full"></div>
          </motion.div>
        </motion.div>
        
        {/* Minimal Hero Content - ARK Architects Style */}
        <motion.div 
          style={{ 
            opacity: overlayOpacity,
            y: overlayY
          }}
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 sm:px-6 z-10"
        >
          <div className="max-w-6xl mx-auto relative">
            {/* Logo */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                duration: 1.2,
                ease: [0.23, 1, 0.32, 1],
                delay: 0.2
              }}
              className="mb-16"
            >
              <img
                src={suryaLogo}
                alt="Surya Architects & Interiors"
                className="h-48 sm:h-64 md:h-80 lg:h-96 xl:h-[32rem] w-auto mx-auto drop-shadow-2xl filter brightness-0 invert"
              />
            </motion.div>

            {/* Rotating Quotes Section */}
            <div className="mb-20">
              <motion.div
                key={quotes[currentQuoteIndex].text}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
                className="space-y-6"
              >
                <motion.blockquote
                  className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-light text-luxury-white leading-tight tracking-wide max-w-4xl mx-auto"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                >
                  "{quotes[currentQuoteIndex].text}"
                </motion.blockquote>

                <motion.cite
                  className="text-lg sm:text-xl md:text-2xl text-luxury-gold font-light tracking-wider"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                >
                  — {quotes[currentQuoteIndex].author}
                </motion.cite>
              </motion.div>

              {/* Quote Navigation Dots */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 0.8 }}
                className="flex justify-center space-x-3 mt-12"
              >
                {quotes.map((_, index) => (
                  <motion.button
                    key={index}
                    onClick={() => setCurrentQuoteIndex(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentQuoteIndex
                        ? 'bg-luxury-gold scale-125'
                        : 'bg-luxury-white/40 hover:bg-luxury-white/60'
                    }`}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                  />
                ))}
              </motion.div>
            </div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.2 }}
            >
              <MagneticButton strength={0.4}>
                <Link
                  to="/projects"
                  className="inline-block px-10 py-4 bg-luxury-gold text-luxury-charcoal font-medium tracking-wider uppercase text-sm hover:bg-luxury-white transition-all duration-500 shadow-lg hover:shadow-xl hover:shadow-luxury-gold/30"
                >
                  Explore Our Work
                </Link>
              </MagneticButton>
            </motion.div>
          </div>
        </motion.div>
        
        {/* Scroll indicator */}
        <motion.div 
          className="absolute bottom-12 left-1/2 transform -translate-x-1/2 text-luxury-white/60"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 1 }}
        >
          <div className="flex flex-col items-center space-y-4">
            <motion.span 
              className="text-sm tracking-wider font-light"
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ repeat: Infinity, duration: 3 }}
            >
              Scroll to Discover
            </motion.span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              whileHover={{ scale: 1.1 }}
              className="w-6 h-10 border-2 border-luxury-white/40 rounded-full flex justify-center"
            >
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut", delay: 0.2 }}
                className="w-1 h-3 bg-luxury-gold rounded-full mt-2"
              />
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Vision Section with 3D Elements */}
      <SectionTransition className="relative py-24 px-4 sm:px-6 bg-background overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-luxury-beige/5 via-transparent to-luxury-gold/5"></div>
        
        {/* 3D Floating Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={`vision-float-${i}`}
              className="absolute"
              style={{
                left: `${20 + Math.random() * 60}%`,
                top: `${20 + Math.random() * 60}%`,
              }}
              initial={{ opacity: 0, scale: 0, rotate: 0 }}
              whileInView={{ opacity: 0.1, scale: 1, rotate: 360 }}
              transition={{
                duration: 20 + Math.random() * 10,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
              viewport={{ once: true }}
            >
              <div className={`w-8 h-8 border border-luxury-gold/30 ${i % 2 === 0 ? 'rounded-full' : 'rounded-lg'}`} 
                   style={{ transform: `rotateX(${Math.random() * 45}deg) rotateY(${Math.random() * 45}deg)` }} />
            </motion.div>
          ))}
        </div>
        
        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
              viewport={{ once: true, amount: 0.3 }}
              className="space-y-8"
            >
              <div>
                <motion.h2
                  className="text-3xl sm:text-4xl md:text-5xl font-display-1 font-light text-luxury-charcoal mb-6"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  viewport={{ once: true, amount: 0.3 }}
                >
                  Our <span className="text-luxury-gold">Design</span> Philosophy
                </motion.h2>
                
                <motion.p
                  className="text-lg text-muted-foreground leading-relaxed mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  viewport={{ once: true, amount: 0.3 }}
                >
                  We believe in creating spaces that are not just visually stunning but also emotionally resonant. 
                  Each project is a careful balance of form, function, and the unique story of those who inhabit it.
                </motion.p>
              </div>
              
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                viewport={{ once: true, amount: 0.3 }}
              >
                <MagneticButton strength={0.3}>
                  <Link
                    to="/about"
                    className="inline-flex items-center px-6 py-3 border border-luxury-charcoal text-luxury-charcoal tracking-wider uppercase text-sm hover:bg-luxury-charcoal hover:text-luxury-white transition-all duration-500"
                  >
                    Discover Our Studio
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </Link>
                </MagneticButton>
              </motion.div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
              viewport={{ once: true, amount: 0.3 }}
              className="relative"
            >
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
                <motion.div
                  initial={{ scale: 1.1, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  viewport={{ once: true, amount: 0.3 }}
                  className="w-full h-full"
                >
                  <img
                    src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                    alt="Luxury interior design"
                    className="w-full h-full object-cover"
                  />
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-t from-luxury-charcoal/80 to-transparent" />
                
                {/* Floating stats card with 3D effect */}
                <motion.div 
                  className="absolute bottom-6 left-6 right-6 bg-luxury-white/90 backdrop-blur-sm p-6 rounded-xl shadow-lg"
                  initial={{ opacity: 0, y: 30, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  viewport={{ once: true, amount: 0.3 }}
                  whileHover={{ 
                    y: -10, 
                    rotateX: 5,
                    rotateY: 5,
                    transition: { duration: 0.3 } 
                  }}
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <motion.div 
                        className="text-3xl font-display-1 font-light text-luxury-charcoal"
                        key={stats[currentStatIndex].number}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                      >
                        {stats[currentStatIndex].number}
                      </motion.div>
                      <motion.div 
                        className="text-sm text-muted-foreground uppercase tracking-wider"
                        key={stats[currentStatIndex].unit}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                      >
                        {stats[currentStatIndex].unit}
                      </motion.div>
                    </div>
                    <div className="text-right">
                      <motion.div 
                        className="text-lg font-display-1 text-luxury-charcoal"
                        key={stats[currentStatIndex].subtitle}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                      >
                        {stats[currentStatIndex].subtitle}
                      </motion.div>
                      <motion.div 
                        className="text-xs text-muted-foreground mt-1 max-w-[120px]"
                        key={stats[currentStatIndex].description}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                      >
                        {stats[currentStatIndex].description}
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </SectionTransition>

      {/* Featured Projects Bento Grid */}
      <SectionTransition className="py-24 px-4 sm:px-6 bg-muted/20">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <motion.h2 
              className="text-3xl sm:text-4xl md:text-5xl font-display-1 font-light text-luxury-charcoal mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              Featured <span className="text-luxury-gold">Projects</span>
            </motion.h2>
          </motion.div>

          <BentoGrid className="max-w-6xl mx-auto" items={[
            {
              id: "project-1",
              colSpan: 2,
              rowSpan: 2,
              content: (
                <div className="relative w-full h-full group cursor-pointer">
                  <img
                    src={project1}
                    alt="Luxury Penthouse"
                    className="w-full h-full object-cover rounded-2xl transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent rounded-2xl" />
                  <div className="absolute bottom-6 left-6 right-6 text-white">
                    <h3 className="text-2xl font-display-1 font-light mb-2">Luxury Penthouse</h3>
                    <p className="text-sm opacity-90">Urban Elegance</p>
                  </div>
                </div>
              )
            },
            {
              id: "project-2",
              colSpan: 1,
              rowSpan: 1,
              content: (
                <div className="relative w-full h-full group cursor-pointer">
                  <img
                    src={project2}
                    alt="Modern Villa"
                    className="w-full h-full object-cover rounded-2xl transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-2xl" />
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <h4 className="text-lg font-display-1 font-light">Modern Villa</h4>
                    <p className="text-xs opacity-80">Contemporary Living</p>
                  </div>
                </div>
              )
            },
            {
              id: "project-3",
              colSpan: 1,
              rowSpan: 1,
              content: (
                <div className="relative w-full h-full group cursor-pointer">
                  <img
                    src={project3}
                    alt="Boutique Hotel"
                    className="w-full h-full object-cover rounded-2xl transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-2xl" />
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <h4 className="text-lg font-display-1 font-light">Boutique Hotel</h4>
                    <p className="text-xs opacity-80">Hospitality Design</p>
                  </div>
                </div>
              )
            },
            {
              id: "project-4",
              colSpan: 2,
              rowSpan: 1,
              content: (
                <div className="relative w-full h-full group cursor-pointer">
                  <img
                    src={project4}
                    alt="Minimalist Residence"
                    className="w-full h-full object-cover rounded-2xl transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent rounded-2xl" />
                  <div className="absolute bottom-6 left-6 right-6 text-white">
                    <h3 className="text-2xl font-display-1 font-light mb-2">Minimalist Residence</h3>
                    <p className="text-sm opacity-90">Clean Lines</p>
                  </div>
                </div>
              )
            }
          ]} />

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
                className="inline-block px-10 py-4 border border-luxury-charcoal text-luxury-charcoal tracking-wider uppercase text-sm hover:bg-luxury-charcoal hover:text-luxury-white transition-all duration-500"
              >
                View All Projects
              </Link>
            </MagneticButton>
          </motion.div>
        </div>
      </SectionTransition>

      {/* Services Section */}
      <SectionTransition className="py-24 px-4 sm:px-6 bg-background">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
            viewport={{ once: true, amount: 0.3 }}
            className="text-center mb-20"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display-1 font-light text-luxury-charcoal mb-6">
              Our <span className="text-luxury-gold">Services</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Comprehensive design solutions from concept to completion
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Architecture Design",
                description: "Conceptual design and planning for residential and commercial spaces",
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-luxury-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                )
              },
              {
                title: "Interior Design",
                description: "Transforming spaces with bespoke interior solutions and finishes",
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-luxury-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                )
              },
              {
                title: "Project Management",
                description: "End-to-end oversight ensuring quality, timeline, and budget adherence",
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-luxury-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                )
              }
            ].map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.8,
                  delay: index * 0.15,
                  ease: [0.25, 0.46, 0.45, 0.94]
                }}
                viewport={{ once: true, amount: 0.2 }}
                className="group text-center p-8 bg-muted/10 hover:bg-muted/20 border border-border/50 hover:border-luxury-gold/30 rounded-2xl transition-all duration-500 hover:-translate-y-2"
              >
                <div className="mb-6 flex justify-center">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-display-1 font-light text-luxury-charcoal mb-4">
                  {service.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </SectionTransition>

      {/* Testimonials Section */}
      <SectionTransition className="py-24 px-4 sm:px-6 bg-background text-luxury-charcoal">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display-1 font-light mb-4">
              Client <span className="text-luxury-gold">Testimonials</span>
            </h2>
            <p className="text-luxury-beige/80 max-w-2xl mx-auto">
              What our clients say about their experience
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            viewport={{ once: true }}
            className="relative"
          >
            <TestimonialCarousel />
          </motion.div>
        </div>
      </SectionTransition>

      {/* CTA Section */}
      <SectionTransition className="py-24 px-4 sm:px-6 bg-background">
        <div className="container mx-auto max-w-5xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display-1 font-light text-luxury-charcoal mb-6">
              Ready to Transform Your <span className="text-luxury-gold">Space?</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              Let's create something extraordinary together
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <MagneticButton strength={0.4}>
              <Link
                to="/contact"
                className="inline-block px-10 py-4 bg-luxury-charcoal text-luxury-white font-medium tracking-wider uppercase text-sm hover:bg-luxury-gold hover:text-luxury-charcoal transition-all duration-500"
              >
                Start Your Project
              </Link>
            </MagneticButton>
          </motion.div>
        </div>
      </SectionTransition>

      <InstagramFeed />
      <Footer />
    </div>
  );
};

export default Home;