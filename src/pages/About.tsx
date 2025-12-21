import { useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Play, Pause, Volume2, VolumeX, Lightbulb, Layers, Ruler, Users, Award, Compass, Heart, Star, Camera, ArrowRight, Quote } from "lucide-react";
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
import visualVideo from "@/assets/visual.mp4";
import visual1Video from "@/assets/visual1.mp4";
import visual2Video from "@/assets/visual2.mp4";
import whatsappImage from "@/assets/WhatsApp Image 2025-12-17 at 6.14.09 PM.jpeg";

const About = () => {
  const [selectedVideo, setSelectedVideo] = useState<number | null>(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [hoveredValue, setHoveredValue] = useState<string | null>(null);
  const [displayedText, setDisplayedText] = useState("");
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0.8]);
  const heroScale = useTransform(scrollYProgress, [0, 0.3], [1, 1.05]);

  const fullQuote = "Architecture is not just about building structures, but about crafting experiences that enrich lives and create lasting memories.";

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (displayedText.length < fullQuote.length) {
      timeout = setTimeout(() => {
        setDisplayedText(fullQuote.slice(0, displayedText.length + 1));
      }, 50); // Adjust speed here
    } else {
      setIsTypingComplete(true);
    }
    return () => clearTimeout(timeout);
  }, [displayedText, fullQuote.length]);

  const values = [
    {
      icon: Lightbulb,
      title: "Vision",
      description: "We see beyond the ordinary, crafting spaces that tell stories and create memories that last generations.",
      color: "from-amber-400 to-orange-500"
    },
    {
      icon: Layers,
      title: "Craftsmanship",
      description: "Every detail is meticulously considered, every material carefully selected for timeless quality and beauty.",
      color: "from-blue-400 to-indigo-500"
    },
    {
      icon: Ruler,
      title: "Precision",
      description: "From concept to completion, we maintain uncompromising standards in every aspect of our work.",
      color: "from-emerald-400 to-teal-500"
    }
  ];

  const team = [
    {
      name: "Sowmya Chiru",
      role: "Design Director",
      experience: "18+ years",
      specialization: "Interior Architecture & Styling",
      image: project2
    }
  ];

  const process = [
    {
      step: "01",
      title: "Discovery",
      description: "Understanding your vision, lifestyle, and aspirations through deep conversation and site analysis.",
      icon: Compass
    },
    {
      step: "02",
      title: "Concept",
      description: "Developing innovative design concepts that blend functionality, aesthetics, and your unique personality.",
      icon: Lightbulb
    },
    {
      step: "03",
      title: "Design",
      description: "Creating detailed architectural and interior plans with precision and attention to every element.",
      icon: Ruler
    },
    {
      step: "04",
      title: "Realization",
      description: "Bringing your vision to life with expert project management and quality craftsmanship.",
      icon: Layers
    }
  ];

  const videoShowcase = [
    {
      id: 1,
      title: "Design Process",
      description: "Watch how we transform ideas into reality",
      video: visual1Video,
      thumbnail: project1,
      duration: "2:34"
    },
    {
      id: 2,
      title: "Studio Tour",
      description: "Explore our creative workspace at Surya Architects",
      video: visual2Video,
      thumbnail: project2,
      duration: "3:12"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-luxury-beige/5 to-background cursor-none">
      <CustomCursor />
      <Navigation />

      {/* Hero Section with Video Background */}
      <motion.section
        className="relative min-h-screen flex items-center justify-center overflow-hidden pt-32 sm:pt-40 pb-32 sm:pb-40"
        style={{ opacity: heroOpacity, scale: heroScale }}
      >
        {/* Background Video */}
        <div className="absolute inset-0 z-0">
          <video
            className="w-full h-full object-cover opacity-20"
            autoPlay
            muted
            loop
            playsInline
          >
            <source src={visualVideo} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/70 to-background/80" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 px-4 sm:px-6 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center"
          >
            {/* Content on Left */}
            <div className="space-y-8">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3, duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl tracking-luxury-wide font-display-1 font-light text-luxury-charcoal mb-4">
                  Our Studio
                </h1>
                <div className="w-24 h-1 bg-gradient-to-r from-luxury-gold to-luxury-gold/50 mb-8" />
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground tracking-luxury leading-relaxed"
              >
                Where architectural vision meets unparalleled craftsmanship, creating extraordinary spaces that inspire and endure through generations.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.8 }}
                className="space-y-6"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-luxury-gold/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Compass className="w-6 h-6 text-luxury-gold" />
                  </div>
                  <div>
                    <h4 className="text-xl font-display-1 font-light text-luxury-charcoal mb-2">
                      Visionary Design
                    </h4>
                    <p className="text-muted-foreground leading-relaxed">
                      We blend traditional architectural principles with contemporary innovation to create spaces that transcend time.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-luxury-gold/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Award className="w-6 h-6 text-luxury-gold" />
                  </div>
                  <div>
                    <h4 className="text-xl font-display-1 font-light text-luxury-charcoal mb-2">
                      Award-Winning Craftsmanship
                    </h4>
                    <p className="text-muted-foreground leading-relaxed">
                      Our commitment to excellence has earned us recognition across the architectural community for outstanding design and execution.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-luxury-gold/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Users className="w-6 h-6 text-luxury-gold" />
                  </div>
                  <div>
                    <h4 className="text-xl font-display-1 font-light text-luxury-charcoal mb-2">
                      Collaborative Excellence
                    </h4>
                    <p className="text-muted-foreground leading-relaxed">
                      Our multidisciplinary team works seamlessly to bring your architectural dreams to life with precision and passion.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Video on Right */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8, duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
              className="relative flex items-center justify-center"
            >
              <div className="relative w-full max-w-[280px] sm:max-w-[320px] md:max-w-[400px] lg:max-w-[360px]">
                <video
                  className="w-full aspect-[9/16] object-cover rounded-3xl shadow-2xl border border-luxury-gold/20"
                  autoPlay
                  muted
                  loop
                  playsInline
                >
                  <source src={visual1Video} type="video/mp4" />
                </video>
                <div className="absolute -inset-4 bg-gradient-to-r from-luxury-gold/20 to-transparent rounded-3xl blur-xl -z-10" />
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Subtle section separator */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-luxury-gold/30 to-transparent"></div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-6 h-10 border-2 border-luxury-gold/50 rounded-full flex justify-center"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-1 h-3 bg-luxury-gold rounded-full mt-2"
            />
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Studio Story */}
      <section className="py-20 px-4 sm:px-6">
        <div className="container mx-auto max-w-7xl">
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
                  className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl tracking-luxury-wide font-display-1 font-light text-luxury-charcoal mb-8"
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
                  className="space-y-6 text-lg text-muted-foreground leading-relaxed"
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
                  className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-2xl group"
                >
                  <motion.img
                    src={heroInterior}
                    alt="Surya Architects Studio workspace"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Video Showcase Section */}
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
              <h2 className="text-4xl sm:text-5xl md:text-6xl tracking-luxury-wide font-display-1 font-light text-luxury-charcoal mb-4">
                Behind the Scenes
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Experience our creative process and studio atmosphere through exclusive video content
              </p>
            </motion.div>

            {/* Video and Content Side by Side */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Video on Left */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="relative group"
              >
                <div className="relative aspect-[16/9] overflow-hidden rounded-2xl shadow-2xl bg-gradient-to-br from-luxury-beige/20 to-luxury-beige/5">
                  <video
                    className="w-full h-full object-cover"
                    autoPlay
                    muted
                    loop
                    playsInline
                  >
                    <source src={videoShowcase[1].video} type="video/mp4" />
                  </video>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                  {/* Video Controls Overlay */}
                  <div className="absolute top-6 left-6 right-6 flex items-center justify-between">
                    <div className="bg-luxury-white/90 backdrop-blur-sm rounded-full px-4 py-2">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                        <span className="text-sm font-medium text-luxury-charcoal">
                          LIVE
                        </span>
                      </div>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedVideo(2)}
                      className="bg-luxury-white/90 backdrop-blur-sm rounded-full p-3 hover:bg-luxury-white transition-colors duration-300"
                    >
                      <svg className="w-5 h-5 text-luxury-charcoal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </motion.button>
                  </div>

                  {/* Content Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-8 text-luxury-white">
                    <div className="flex items-center gap-2 mb-2">
                      <Play className="w-4 h-4" />
                      <span className="text-sm tracking-luxury-wide uppercase opacity-80">
                        {videoShowcase[1].duration}
                      </span>
                    </div>
                    <h3 className="text-2xl tracking-luxury-wide font-display-1 font-light mb-2">
                      {videoShowcase[1].title}
                    </h3>
                    <p className="text-sm opacity-90">
                      {videoShowcase[1].description}
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Content on Right */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
                className="space-y-8"
              >
                <div>
                  <motion.h3
                    className="text-3xl sm:text-4xl md:text-5xl tracking-luxury-wide font-display-1 font-light text-luxury-charcoal mb-6"
                  >
                    {videoShowcase[1].title}
                  </motion.h3>
                  <motion.p
                    className="text-lg text-muted-foreground leading-relaxed mb-8"
                  >
                    {videoShowcase[1].description}
                  </motion.p>

                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-luxury-gold/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <Camera className="w-6 h-6 text-luxury-gold" />
                      </div>
                      <div>
                        <h4 className="text-xl font-display-1 font-light text-luxury-charcoal mb-2">
                          Studio Environment
                        </h4>
                        <p className="text-muted-foreground leading-relaxed">
                          Take a virtual tour of our creative workspace where innovation meets inspiration.
                          See the space that brings our architectural visions to life.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-luxury-gold/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <Users className="w-6 h-6 text-luxury-gold" />
                      </div>
                      <div>
                        <h4 className="text-xl font-display-1 font-light text-luxury-charcoal mb-2">
                          Creative Workspace
                        </h4>
                        <p className="text-muted-foreground leading-relaxed">
                          Discover the collaborative environment where our team of architects, designers,
                          and craftsmen work together to create extraordinary spaces.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-luxury-gold/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <Award className="w-6 h-6 text-luxury-gold" />
                      </div>
                      <div>
                        <h4 className="text-xl font-display-1 font-light text-luxury-charcoal mb-2">
                          Design Philosophy
                        </h4>
                        <p className="text-muted-foreground leading-relaxed">
                          Experience how our studio atmosphere fosters creativity and precision,
                          combining traditional techniques with modern design thinking.
                        </p>
                      </div>
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedVideo(2)}
                    className="inline-flex items-center gap-3 bg-luxury-charcoal text-luxury-white px-8 py-4 rounded-full hover:bg-luxury-charcoal/90 transition-colors duration-300 mt-8"
                  >
                    <Play className="w-5 h-5" />
                    <span className="font-medium tracking-luxury-wide">Watch Full Tour</span>
                  </motion.button>
                </div>
              </motion.div>
            </div>

            {/* Second Video Option */}
           
          </motion.div>

          {/* Our Philosophy */}
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
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl tracking-luxury-wide font-display-1 font-light text-center text-luxury-charcoal mb-12 md:mb-16"
            >
              Our Philosophy
            </motion.h2>

            

            {/* Process Steps */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="relative"
            >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                {process.map((step, index) => (
                  <motion.div
                    key={step.step}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    viewport={{ once: true }}
                    className="text-center group relative"
                  >
                    <div className="relative">
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-luxury-gold to-luxury-gold/80 rounded-full flex items-center justify-center shadow-lg"
                      >
                        <step.icon className="w-8 h-8 text-white" />
                      </motion.div>
                      {index < process.length - 1 && (
                        <div className="hidden lg:block absolute top-10 left-full w-full h-0.5 bg-gradient-to-r from-luxury-gold/50 to-transparent transform -translate-x-10" />
                      )}
                    </div>
                    <div className="text-3xl font-display-1 font-light text-luxury-gold mb-4">
                      {step.step}
                    </div>
                    <h4 className="text-xl tracking-luxury-wide font-display-1 font-light mb-3 text-luxury-charcoal">
                      {step.title}
                    </h4>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Team Section - Replaced with high-end editorial design */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
            viewport={{ once: true }}
            className="mb-32"
          >
            <div className="container mx-auto max-w-7xl px-4 sm:px-6">
              {/* High-end editorial hero section for Meet Our Team */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-8 items-center">
                {/* Left: Name introduction text */}
                <div className="flex flex-col justify-center">
                  <div className="mb-6">
                    <h3 className="text-2xl sm:text-3xl md:text-4xl uppercase tracking-[0.5em] text-luxury-charcoal font-sans font-bold">
                      MEET
                    </h3>
                  </div>
                  <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-light text-luxury-charcoal leading-none">
                    SOWMYA
                  </h2>
                </div>

                {/* Center: Black-and-white cut-out photo of a person */}
                <div className="flex justify-center">
                  <div className="relative">
                    <motion.img
                      src={whatsappImage}
                      alt={team[0].name}
                      className="w-full max-w-md mx-auto object-contain"
                      style={{ 
                        mixBlendMode: 'multiply',
                        filter: 'grayscale(100%) contrast(110%) brightness(110%)'
                      }}
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                </div>

                {/* Right: Descriptive keywords */}
                <div className="flex flex-col justify-center">
                  <div className="space-y-6">
                    <h3 className="text-3xl sm:text-4xl md:text-5xl bbh-bartle-regular text-luxury-charcoal font-bold">
                      VISIONARY
                    </h3>
                    <h3 className="text-3xl sm:text-4xl md:text-5xl bbh-bartle-regular text-luxury-charcoal font-bold">
                      DISTINGUISHED
                    </h3>
                    <h3 className="text-3xl sm:text-4xl md:text-5xl bbh-bartle-regular text-luxury-charcoal font-bold">
                      RENOWNED
                    </h3>
                    <blockquote className="text-lg sm:text-xl font-sans text-luxury-charcoal tracking-wide max-w-xs">
                      Architecture shaped by context,<br />
                      defined by purpose.
                    </blockquote>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Achievements */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            viewport={{ once: true }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-6 md:gap-8 mb-20 md:mb-32"
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
                <div className="text-3xl sm:text-4xl md:text-5xl font-display-1 font-light text-luxury-charcoal mb-2">
                  {stat.number}
                </div>
                <div className="text-sm tracking-wide uppercase text-muted-foreground font-medium leading-tight">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Vision Statement */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
            viewport={{ once: true }}
            className="text-center mb-32"
          >
            <Quote className="w-16 h-16 text-luxury-gold mx-auto mb-8" />
            <blockquote className="text-2xl sm:text-3xl md:text-4xl tracking-luxury leading-relaxed font-display-1 font-light text-luxury-charcoal max-w-4xl mx-auto mb-8 relative">
              "{displayedText}"
              {!isTypingComplete && (
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
                  className="inline-block w-0.5 h-12 bg-luxury-gold ml-1"
                />
              )}
            </blockquote>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: isTypingComplete ? 1 : 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <cite className="text-lg text-muted-foreground tracking-luxury">
                — Surya Architects Team
              </cite>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Video Modal */}
      <AnimatePresence>
        {selectedVideo !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
            onClick={() => setSelectedVideo(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative max-w-4xl w-full mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <video
                className="w-full aspect-video rounded-2xl shadow-2xl"
                controls
                autoPlay
                muted={isMuted}
              >
                <source src={videoShowcase.find(v => v.id === selectedVideo)?.video} type="video/mp4" />
              </video>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setSelectedVideo(null)}
                className="absolute -top-12 right-0 text-white hover:text-luxury-gold transition-colors duration-300"
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <CTASection />
      <Footer />
    </div>
  );
};

export default About;