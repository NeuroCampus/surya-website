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
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { scrollY } = useScroll();
  
  // Hero section height and opacity transforms
  const heroHeight = typeof window !== 'undefined' ? window.innerHeight : 1000;
  const heroOpacity = useTransform(scrollY, [0, heroHeight * 0.7, heroHeight], [1, 1, 0]);
  const overlayOpacity = useTransform(scrollY, [0, heroHeight * 0.5, heroHeight], [1, 0.8, 0]);
  const overlayY = useTransform(scrollY, [0, heroHeight], [0, -100]);
  
  // Mouse parallax effect
  const handleMouseMove = (e: React.MouseEvent) => {
    if (isReducedMotion) return;
    const { clientX, clientY } = e;
    const x = (clientX / window.innerWidth - 0.5) * 20;
    const y = (clientY / window.innerHeight - 0.5) * 20;
    setMousePosition({ x, y });
  };
  
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
      <SectionTransition 
        className="relative w-full h-screen overflow-hidden"
        onMouseMove={handleMouseMove}
      >
        <motion.div 
          style={{ opacity: heroOpacity }}
          className="absolute inset-0"
          initial={{ scale: 1.1, rotate: 0.5 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          {/* Luxury background with multiple layers */}
          <motion.div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ 
              backgroundImage: `url('https://images.unsplash.com/photo-1487958449943-2429e8be8625?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')`,
              backgroundAttachment: 'fixed'
            }}
            animate={{
              scale: [1, 1.05, 1],
              rotate: [0, 0.5, 0]
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-luxury-charcoal/60 via-luxury-charcoal/30 to-luxury-charcoal/80" />
          
          {/* Enhanced 3D Floating Elements */}
          <div className="absolute inset-0 overflow-hidden">
            {/* Geometric shapes with enhanced animations */}
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={`shape-${i}`}
                className="absolute"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                initial={{ opacity: 0, scale: 0, rotate: 0 }}
                animate={{
                  opacity: [0, 0.15, 0],
                  scale: [0, 1.2, 0],
                  rotate: [0, 180, 360],
                  x: [0, Math.random() * 300 - 150, 0],
                  y: [0, Math.random() * 300 - 150, 0],
                }}
                transition={{
                  duration: 15 + Math.random() * 15,
                  repeat: Infinity,
                  delay: Math.random() * 8,
                  ease: "easeInOut"
                }}
              >
                <motion.div 
                  className={`w-12 h-12 sm:w-16 sm:h-16 border border-luxury-gold/30 ${i % 3 === 0 ? 'rounded-full' : i % 3 === 1 ? 'rounded-lg' : 'rounded-none rotate-45'}`} 
                  style={{ 
                    transform: `rotateX(${Math.random() * 60}deg) rotateY(${Math.random() * 60}deg)`,
                  }}
                  whileHover={{
                    scale: 1.5,
                    borderColor: 'rgba(212, 175, 55, 0.8)',
                    transition: { duration: 0.3 }
                  }}
                />
              </motion.div>
            ))}
            
            {/* Enhanced luxury particles */}
            {[...Array(30)].map((_, i) => (
              <motion.div
                key={`particle-${i}`}
                className="absolute rounded-full bg-luxury-gold/30"
                style={{
                  width: Math.random() * 8 + 3,
                  height: Math.random() * 8 + 3,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -300, 0],
                  x: [0, Math.random() * 200 - 100, 0],
                  opacity: [0, 0.8, 0],
                  scale: [0.3, 1.8, 0.3],
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 12 + Math.random() * 15,
                  repeat: Infinity,
                  delay: Math.random() * 8,
                  ease: "easeInOut"
                }}
              />
            ))}

            {/* Floating luxury elements */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={`luxury-float-${i}`}
                className="absolute"
                style={{
                  left: `${15 + Math.random() * 70}%`,
                  top: `${15 + Math.random() * 70}%`,
                }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: [0, 0.1, 0],
                  scale: [0, 1, 0],
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 25 + Math.random() * 20,
                  repeat: Infinity,
                  delay: Math.random() * 10,
                  ease: "linear"
                }}
              >
                <div className="w-20 h-20 border-2 border-luxury-gold/20 rounded-full flex items-center justify-center">
                  <div className="w-8 h-8 border border-luxury-gold/40 rounded-lg rotate-45" />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
        
        {/* Enhanced Transparent Sidebar */}
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          className="fixed left-0 top-0 h-screen w-20 lg:w-24 z-20 hidden lg:flex flex-col items-center justify-center"
        >
          {/* Subtle transparent background pattern */}
          <div className="absolute inset-0 opacity-[0.02]">
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
                className="group relative flex flex-col items-center space-y-3 p-4 rounded-2xl transition-all duration-700 cursor-pointer"
                title={item.value}
              >
                {/* Professional hover background */}
                <motion.div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-700"
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileHover={{
                    scale: 1,
                    opacity: 1,
                    background: `linear-gradient(135deg, ${item.color.replace('/20', '/15')}, ${item.hoverColor.replace('/30', '/20')})`,
                    backdropFilter: "blur(20px)",
                    boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(212, 175, 55, 0.1)"
                  }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                />

                {/* Subtle glow effect */}
                <motion.div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-60 transition-opacity duration-700"
                  style={{
                    background: `radial-gradient(circle at center, ${item.color.replace('/20', '/10')} 0%, transparent 70%)`,
                    filter: 'blur(15px)'
                  }}
                  whileHover={{
                    scale: 1.2,
                    opacity: 0.8
                  }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                />

                {/* Icon container with professional animation */}
                <motion.div
                  className="relative w-12 h-12 lg:w-14 lg:h-14 flex items-center justify-center rounded-xl transition-all duration-700 group-hover:scale-110 group-hover:rotate-3"
                  whileHover={{
                    scale: 1.15,
                    rotate: [0, -3, 3, 0],
                    transition: {
                      duration: 0.8,
                      ease: "easeInOut",
                      times: [0, 0.25, 0.75, 1]
                    }
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  {/* Icon background with subtle animation */}
                  <motion.div
                    className={`absolute inset-0 rounded-xl transition-all duration-700 ${item.color} group-hover:${item.hoverColor}`}
                    animate={{
                      boxShadow: [
                        "0 0 0 rgba(212, 175, 55, 0)",
                        "0 0 20px rgba(212, 175, 55, 0.3)",
                        "0 0 0 rgba(212, 175, 55, 0)"
                      ]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: index * 0.5
                    }}
                  />

                  {/* Icon with smooth color transition */}
                  <motion.div
                    whileHover={{
                      scale: 1.1,
                      transition: { duration: 0.3, ease: "easeOut" }
                    }}
                  >
                    <item.icon className="w-5 h-5 lg:w-6 lg:h-6 text-luxury-charcoal group-hover:text-luxury-gold transition-all duration-700 relative z-10" />
                  </motion.div>
                </motion.div>

                {/* Label with professional typography animation */}
                <motion.div
                  className="text-xs text-luxury-charcoal/70 font-medium text-center leading-tight max-w-full truncate group-hover:text-luxury-charcoal group-hover:font-semibold transition-all duration-700 relative z-10"
                  initial={{ opacity: 0.7 }}
                  whileHover={{
                    opacity: 1,
                    y: -2,
                    transition: { duration: 0.4, ease: "easeOut" }
                  }}
                >
                  {item.label}
                </motion.div>

                {/* Connecting line with animation */}
                {index < 5 && (
                  <motion.div
                    className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-px h-6 opacity-30 group-hover:opacity-60 transition-opacity duration-700"
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    transition={{ delay: 1.5 + index * 0.1, duration: 0.8 }}
                    style={{
                      background: `linear-gradient(to bottom, rgba(212, 175, 55, 0.4), transparent)`
                    }}
                  />
                )}

                {/* Professional ripple effect on click */}
                <motion.div
                  className="absolute inset-0 rounded-2xl"
                  whileTap={{
                    scale: [1, 0.95, 1],
                    transition: { duration: 0.2 }
                  }}
                  style={{
                    background: `radial-gradient(circle at center, ${item.color.replace('/20', '/5')} 0%, transparent 50%)`
                  }}
                />
              </motion.a>
            ))}
          </div>

          {/* Enhanced bottom decorative element */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 2, duration: 0.8 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <motion.div
              className="w-8 h-1 bg-gradient-to-r from-transparent via-luxury-gold/60 to-transparent rounded-full"
              animate={{
                opacity: [0.4, 1, 0.4],
                scaleX: [0.8, 1, 0.8]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
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
            {/* Logo with enhanced animation and parallax */}
            <motion.div
              initial={{ scale: 0.5, opacity: 0, rotate: -10 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              transition={{
                duration: 1.5,
                ease: [0.23, 1, 0.32, 1],
                delay: 0.3
              }}
              whileHover={{
                scale: 1.05,
                rotate: [0, -2, 2, 0],
                transition: { duration: 0.8, ease: "easeInOut" }
              }}
              style={{
                x: mousePosition.x * 0.5,
                y: mousePosition.y * 0.5,
              }}
              className="mb-16 cursor-pointer"
            >
              <motion.img
                src={suryaLogo}
                alt="Surya Architects & Interiors"
                className="h-48 sm:h-64 md:h-80 lg:h-96 xl:h-[32rem] w-auto mx-auto drop-shadow-2xl filter brightness-0 invert"
                animate={{
                  filter: [
                    'brightness(0) invert(1)',
                    'brightness(0.1) invert(0.9) sepia(0.3) hue-rotate(45deg) saturate(1.2)',
                    'brightness(0) invert(1)'
                  ]
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </motion.div>

            {/* Rotating Quotes Section with enhanced animations and parallax */}
            <motion.div 
              className="mb-20"
              style={{
                x: mousePosition.x * 0.3,
                y: mousePosition.y * 0.3,
              }}
            >
              <motion.div
                key={quotes[currentQuoteIndex].text}
                initial={{ opacity: 0, y: 50, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -50, scale: 1.05 }}
                transition={{ 
                  duration: 1.2, 
                  ease: [0.25, 0.1, 0.25, 1],
                  type: "spring",
                  stiffness: 100
                }}
                className="space-y-8"
              >
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  className="relative"
                >
                  <motion.blockquote
                    className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-light text-luxury-white leading-tight tracking-wide max-w-4xl mx-auto relative"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                  >
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.8, duration: 1.5 }}
                      className="inline-block"
                    >
                      "{quotes[currentQuoteIndex].text}"
                    </motion.span>
                  </motion.blockquote>

                  {/* Animated quote marks */}
                  <motion.div
                    className="absolute -top-8 -left-8 text-6xl lg:text-8xl text-luxury-gold/30 font-serif"
                    initial={{ opacity: 0, scale: 0, rotate: -45 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    transition={{ delay: 0.6, duration: 0.8, type: "spring" }}
                  >
                    "
                  </motion.div>
                  <motion.div
                    className="absolute -bottom-8 -right-8 text-6xl lg:text-8xl text-luxury-gold/30 font-serif"
                    initial={{ opacity: 0, scale: 0, rotate: 45 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    transition={{ delay: 0.6, duration: 0.8, type: "spring" }}
                  >
                    "
                  </motion.div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.8 }}
                  className="flex items-center justify-center space-x-4"
                >
                  <motion.div
                    className="h-px bg-gradient-to-r from-transparent via-luxury-gold/50 to-transparent flex-1 max-w-32"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 1, duration: 0.8 }}
                  />
                  <motion.cite
                    className="text-lg sm:text-xl md:text-2xl text-luxury-gold font-light tracking-wider px-6"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                  >
                    — {quotes[currentQuoteIndex].author}
                  </motion.cite>
                  <motion.div
                    className="h-px bg-gradient-to-l from-transparent via-luxury-gold/50 to-transparent flex-1 max-w-32"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 1, duration: 0.8 }}
                  />
                </motion.div>
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
            </motion.div>

            {/* Enhanced CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ 
                duration: 1.2, 
                delay: 1.4,
                type: "spring",
                stiffness: 100
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <MagneticButton strength={0.6}>
                <motion.div
                  whileHover={{
                    boxShadow: "0 20px 40px rgba(212, 175, 55, 0.4)",
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <Link
                    to="/projects"
                    className="inline-block px-12 py-5 bg-luxury-gold text-luxury-charcoal font-medium tracking-wider uppercase text-sm hover:bg-luxury-white transition-all duration-500 shadow-2xl hover:shadow-luxury-gold/50 relative overflow-hidden group"
                  >
                    <motion.span
                      className="relative z-10"
                      initial={{ y: 0 }}
                      whileHover={{ y: -2 }}
                      transition={{ duration: 0.2 }}
                    >
                      Explore Our Work
                    </motion.span>
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-luxury-charcoal to-luxury-charcoal/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: "100%" }}
                      transition={{ duration: 0.6 }}
                    />
                  </Link>
                </motion.div>
              </MagneticButton>
            </motion.div>
          </div>
        </motion.div>
        
        {/* Enhanced Scroll indicator */}
        <motion.div 
          className="absolute bottom-12 left-1/2 transform -translate-x-1/2 text-luxury-white/60"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.5, duration: 1 }}
        >
          <div className="flex flex-col items-center space-y-6">
            <motion.span 
              className="text-sm tracking-wider font-light"
              animate={{ 
                opacity: [0.4, 1, 0.4],
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 3,
                ease: "easeInOut"
              }}
            >
              Scroll to Discover
            </motion.span>
            <motion.div
              animate={{ 
                y: [0, 12, 0],
                scale: [1, 1.2, 1]
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 2.5, 
                ease: "easeInOut",
                times: [0, 0.5, 1]
              }}
              whileHover={{ 
                scale: 1.3,
                transition: { duration: 0.3 }
              }}
              className="relative"
            >
              <motion.div
                className="w-8 h-12 border-2 border-luxury-white/50 rounded-full flex justify-center p-2 relative overflow-hidden"
                whileHover={{
                  borderColor: "rgba(212, 175, 55, 0.8)",
                  boxShadow: "0 0 20px rgba(212, 175, 55, 0.3)"
                }}
              >
                <motion.div
                  animate={{ 
                    y: [0, 16, 0],
                    opacity: [0.5, 1, 0.5]
                  }}
                  transition={{ 
                    repeat: Infinity, 
                    duration: 2.5, 
                    ease: "easeInOut",
                    times: [0, 0.5, 1]
                  }}
                  className="w-1 h-3 bg-luxury-gold rounded-full"
                />
              </motion.div>
              
              {/* Animated particles around scroll indicator */}
              {[...Array(4)].map((_, i) => (
                <motion.div
                  key={`scroll-particle-${i}`}
                  className="absolute w-1 h-1 bg-luxury-gold/60 rounded-full"
                  style={{
                    top: "50%",
                    left: "50%",
                  }}
                  animate={{
                    x: [0, Math.cos(i * Math.PI / 2) * 25],
                    y: [0, Math.sin(i * Math.PI / 2) * 25],
                    opacity: [0, 0.8, 0],
                    scale: [0, 1.5, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: i * 0.2,
                    ease: "easeInOut"
                  }}
                />
              ))}
            </motion.div>
          </div>
        </motion.div>
      </SectionTransition>

      {/* Design Philosophy Section - Professional Interior Design Style */}
      <SectionTransition className="relative py-32 px-4 sm:px-6 bg-white overflow-hidden">
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 opacity-[0.02]">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Ccircle cx='30' cy='30' r='1.5'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        {/* Minimal Floating Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={`minimal-float-${i}`}
              className="absolute opacity-[0.03]"
              style={{
                left: `${20 + Math.random() * 60}%`,
                top: `${20 + Math.random() * 60}%`,
              }}
              animate={{
                rotate: [0, 360],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 30 + Math.random() * 20,
                repeat: Infinity,
                ease: "linear",
                delay: Math.random() * 10,
              }}
            >
              <div className="w-24 h-24 border border-luxury-gold rounded-full" />
            </motion.div>
          ))}
        </div>

        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-center">
            {/* Left Content - Professional Typography */}
            <motion.div
              className="lg:col-span-6 space-y-12"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
              viewport={{ once: true, amount: 0.3 }}
            >
              {/* Section Label */}
             

              {/* Main Heading */}
              <motion.div
                className="space-y-6"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display-1 font-light text-gray-900 leading-tight">
                  Crafting Spaces That
                  <span className="block text-luxury-gold font-normal mt-2">
                    Inspire & Endure
                  </span>
                </h2>

                <motion.div
                  className="w-20 h-0.5 bg-luxury-gold"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                  viewport={{ once: true }}
                />
              </motion.div>

              {/* Description */}
              <motion.div
                className="space-y-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                viewport={{ once: true }}
              >
                <p className="text-lg text-gray-600 leading-relaxed max-w-lg">
                  We believe that exceptional design transcends aesthetics. Every space we create is a harmonious blend of functionality, beauty, and the unique narrative of those who inhabit it.
                </p>

                <p className="text-base text-gray-500 leading-relaxed max-w-lg">
                  Our approach combines timeless principles with contemporary innovation, ensuring that each project not only meets today's needs but stands the test of time.
                </p>
              </motion.div>

              {/* Key Principles Grid */}
              <motion.div
                className="grid grid-cols-1 sm:grid-cols-3 gap-8"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                viewport={{ once: true }}
              >
                {[
                  {
                    number: "01",
                    title: "Timeless Design",
                    description: "Creating spaces that remain relevant for generations"
                  },
                  {
                    number: "02",
                    title: "Functional Beauty",
                    description: "Where aesthetics meet practical excellence"
                  },
                  {
                    number: "03",
                    title: "Personal Touch",
                    description: "Every design tells a unique story"
                  }
                ].map((principle, index) => (
                  <motion.div
                    key={principle.title}
                    className="group space-y-4"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1 + index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl font-light text-luxury-gold group-hover:text-luxury-gold/80 transition-colors duration-300">
                        {principle.number}
                      </span>
                      <div className="h-px bg-gray-300 flex-1 group-hover:bg-luxury-gold transition-colors duration-300" />
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-lg font-medium text-gray-900 group-hover:text-luxury-gold transition-colors duration-300">
                        {principle.title}
                      </h3>
                      <p className="text-sm text-gray-500 leading-relaxed">
                        {principle.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {/* CTA Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.2 }}
                viewport={{ once: true }}
              >
                <MagneticButton strength={0.3}>
                  <Link
                    to="/about"
                    className="group inline-flex items-center px-8 py-4 bg-gray-900 text-white font-medium tracking-wide hover:bg-luxury-gold hover:text-gray-900 transition-all duration-500 rounded-lg shadow-lg hover:shadow-xl"
                  >
                    <span className="mr-3">Explore Our Process</span>
                    <motion.svg
                      className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </motion.svg>
                  </Link>
                </MagneticButton>
              </motion.div>
            </motion.div>

            {/* Right Content - Premium Image Display */}
            <motion.div
              className="lg:col-span-6 relative"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
              viewport={{ once: true, amount: 0.3 }}
            >
              {/* Main Image Container */}
              <div className="relative group">
                <motion.div
                  className="relative aspect-[4/5] overflow-hidden rounded-2xl shadow-2xl bg-gray-100"
                  initial={{ scale: 1.05, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 1, delay: 0.3 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02 }}
                >
                  <img
                    src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80"
                    alt="Luxury interior design showcase"
                    className="w-full h-full object-cover"
                  />

                  {/* Subtle Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
                </motion.div>

                {/* Floating Achievement Card */}
                <motion.div
                  className="absolute -top-8 -right-8 bg-white p-6 rounded-xl shadow-xl border border-gray-100"
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                  viewport={{ once: true }}
                  whileHover={{
                    y: -5,
                    boxShadow: "0 20px 40px -12px rgba(0, 0, 0, 0.15)"
                  }}
                >
                  <div className="text-center space-y-2">
                    <motion.div
                      className="text-3xl font-light text-gray-900"
                      key={stats[currentStatIndex].number}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      {stats[currentStatIndex].number}
                    </motion.div>
                    <div className="text-sm font-medium text-luxury-gold uppercase tracking-wider">
                      {stats[currentStatIndex].unit}
                    </div>
                    <div className="text-xs text-gray-500">
                      {stats[currentStatIndex].subtitle}
                    </div>
                  </div>
                </motion.div>

                {/* Quote Card */}
                <motion.div
                  className="absolute -bottom-8 -left-8 bg-luxury-gold p-6 rounded-xl shadow-xl text-black max-w-xs"
                  initial={{ opacity: 0, scale: 0.9, y: -20 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1 }}
                  viewport={{ once: true }}
                  whileHover={{
                    y: 5,
                    boxShadow: "0 20px 40px -12px rgba(212, 175, 55, 0.3)"
                  }}
                >
                  <div className="space-y-3">
                    <div className="text-2xl leading-none">"</div>
                    <p className="text-sm leading-relaxed font-light">
                      {stats[currentStatIndex].description}
                    </p>
                    <div className="text-xs opacity-80 font-medium">
                      — Client Satisfaction
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Decorative Elements */}
              <motion.div
                className="absolute -bottom-16 -right-16 w-32 h-32 border border-luxury-gold/20 rounded-full"
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, delay: 1.2 }}
                viewport={{ once: true }}
                animate={{
                  rotate: 360,
                  transition: { duration: 40, repeat: Infinity, ease: "linear" }
                }}
              />

              <motion.div
                className="absolute -top-16 -left-16 w-24 h-24 border border-gray-200 rounded-lg rotate-45"
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, delay: 1.4 }}
                viewport={{ once: true }}
              />
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
                bgImage: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-luxury-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                )
              },
              {
                title: "Interior Design",
                description: "Transforming spaces with bespoke interior solutions and finishes",
                bgImage: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-luxury-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                )
              },
              {
                title: "Project Management",
                description: "End-to-end oversight ensuring quality, timeline, and budget adherence",
                bgImage: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-luxury-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                )
              }
            ].map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  duration: 0.8,
                  delay: index * 0.15,
                  ease: [0.25, 0.46, 0.45, 0.94]
                }}
                viewport={{ once: true, amount: 0.2 }}
                whileHover={{
                  scale: 1.05,
                  y: -10,
                  transition: { duration: 0.3, ease: "easeOut" }
                }}
                className="group relative text-center p-8 rounded-2xl overflow-hidden transition-all duration-500 cursor-pointer"
                style={{
                  backgroundImage: `url('${service.bgImage}')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat'
                }}
              >
                {/* Overlay for transparency */}
                <div className="absolute inset-0 bg-gradient-to-br from-luxury-charcoal/85 via-luxury-charcoal/75 to-luxury-charcoal/85 group-hover:from-luxury-charcoal/80 group-hover:via-luxury-charcoal/70 group-hover:to-luxury-charcoal/80 transition-all duration-500" />

                {/* Animated background elements */}
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500"
                  initial={false}
                  animate={{
                    background: [
                      'radial-gradient(circle at 20% 20%, rgba(212, 175, 55, 0.1) 0%, transparent 50%)',
                      'radial-gradient(circle at 80% 80%, rgba(212, 175, 55, 0.1) 0%, transparent 50%)',
                      'radial-gradient(circle at 20% 20%, rgba(212, 175, 55, 0.1) 0%, transparent 50%)'
                    ]
                  }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                />

                {/* Content */}
                <div className="relative z-10">
                  <motion.div
                    className="mb-6 flex justify-center"
                    whileHover={{
                      scale: 1.1,
                      rotate: [0, -5, 5, 0],
                      transition: { duration: 0.6, ease: "easeInOut" }
                    }}
                  >
                    {service.icon}
                  </motion.div>

                  <motion.h3
                    className="text-2xl font-display-1 font-light text-luxury-white mb-4 group-hover:text-luxury-gold transition-colors duration-300"
                    initial={{ opacity: 0.9 }}
                    whileHover={{ opacity: 1 }}
                  >
                    {service.title}
                  </motion.h3>

                  <motion.p
                    className="text-luxury-beige/90 leading-relaxed group-hover:text-luxury-white transition-colors duration-300"
                    initial={{ opacity: 0.8 }}
                    whileHover={{ opacity: 1 }}
                  >
                    {service.description}
                  </motion.p>
                </div>

                {/* Hover effect border */}
                <motion.div
                  className="absolute inset-0 border-2 border-transparent group-hover:border-luxury-gold/50 rounded-2xl"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            ))}
          </div>
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

      <InstagramFeed />
      <Footer />
    </div>
  );
};

export default Home;