import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, ArrowRight, Star } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import ProjectLightbox from "@/components/ProjectLightbox";
import CTASection from "@/components/CTASection";
import { TestimonialScrollStack, ScrollStackItem } from "@/components/TestimonialScrollStack";
import project1 from "@/assets/project-1.jpg";
import project2 from "@/assets/project-2.jpg";
import project3 from "@/assets/project-3.jpg";
import project4 from "@/assets/project-4.jpg";

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const [currentImages, setCurrentImages] = useState<{ [key: number]: number }>({});
  const [stackComplete, setStackComplete] = useState(false);

  /* ---------------------------------------------
     PROJECT DATA (UNCHANGED)
  --------------------------------------------- */
  const projects = [
    {
      id: 1,
      title: "Deeps Mansion",
      subtitle: "Contemporary Luxury Living",
      description: "This contemporary luxury residence showcases innovative design elements that blend modern aesthetics with functional living spaces, creating an unparalleled living experience for discerning homeowners.",
      image: project1,
      images: [
        "https://res.cloudinary.com/ddcl4drlp/image/upload/v1763274248/SAN_6416-min_bsoioq.jpg",
        "https://res.cloudinary.com/ddcl4drlp/image/upload/v1763274248/SAN_6372-min_nytwnh.jpg",
        "https://res.cloudinary.com/ddcl4drlp/image/upload/v1763274246/SAN_6468-min_zo1xue.jpg",
        "https://res.cloudinary.com/ddcl4drlp/image/upload/v1763274245/SAN_6359-min_em3mhm.jpg",
        "https://res.cloudinary.com/ddcl4drlp/image/upload/v1763274245/SAN_6274-min_cadep4.jpg",
        "https://res.cloudinary.com/ddcl4drlp/image/upload/v1763274245/SAN_6266-min_lostm9.jpg",
        "https://res.cloudinary.com/ddcl4drlp/image/upload/v1763274245/SAN_6255-min_wbxzfz.jpg"
      ],
      category: "Residential",
      featured: true,
      link: "#",
      clientReview: {
        name: "Deepak Sharma",
        role: "Homeowner",
        review: "Surya Architects exceeded our expectations. The modern design perfectly blends luxury with functionality. Every space tells a story of elegance and comfort.",
        rating: 5,
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
      }
    },
    {
      id: 2,
      title: "Sharath Mansion",
      subtitle: "Minimalist Elegance Redefined",
      description: "A masterpiece of minimalist architecture that redefines elegance through clean lines, thoughtful spatial planning, and the perfect balance of form and function in residential design.",
      image: project2,
      images: [
        "https://res.cloudinary.com/ddcl4drlp/image/upload/v1763274906/1J9A7682_vf792r.jpg",
        "https://res.cloudinary.com/ddcl4drlp/image/upload/v1763274907/1J9A7714_srdse2.jpg",
        "https://res.cloudinary.com/ddcl4drlp/image/upload/v1763274908/1J9A7731_f92w8m.jpg",
        "https://res.cloudinary.com/ddcl4drlp/image/upload/v1763275046/1J9A7610_jizwqx.jpg"
      ],
      category: "Residential",
      featured: false,
      link: "#",
      clientReview: {
        name: "Sharath Kumar",
        role: "Business Executive",
        review: "The minimalist approach transformed our space into a sanctuary of peace. The attention to detail in every corner is remarkable.",
        rating: 5,
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
      }
    },
    {
      id: 3,
      title: "Sudharshan Mansion",
      subtitle: "City Views & Modern Comfort",
      description: "An architectural marvel that seamlessly integrates breathtaking city views with contemporary comfort, featuring innovative design solutions that maximize natural light and panoramic vistas.",
      image: project3,
      images: [
        "https://res.cloudinary.com/ddcl4drlp/image/upload/v1763275386/CC023265_daor0z.jpg",
        "https://res.cloudinary.com/ddcl4drlp/image/upload/v1763275383/CC023189_p72jl3.jpg",
        "https://res.cloudinary.com/ddcl4drlp/image/upload/v1763275385/CC023348_koglv4.jpg"
      ],
      category: "Residential",
      featured: true,
      link: "#",
      clientReview: {
        name: "Sudharshan Reddy",
        role: "Entrepreneur",
        review: "Outstanding work! The city views are now perfectly integrated with modern comfort. A masterpiece of contemporary architecture.",
        rating: 5,
        image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
      }
    },
    {
      id: 4,
      title: "Spa Bathroom",
      subtitle: "Serene Sanctuary Experience",
      description: "A transformative bathroom renovation that creates a luxurious spa-like sanctuary, combining elegant materials, soothing color palettes, and thoughtful design elements for ultimate relaxation and rejuvenation.",
      image: project4,
      category: "Renovation",
      featured: false,
      link: "#",
      clientReview: {
        name: "Priya Mehta",
        role: "Wellness Enthusiast",
        review: "Transformed our bathroom into a true spa sanctuary. The serene atmosphere and luxurious details create the perfect relaxation space.",
        rating: 5,
        image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
      }
    },
  ];

  /* ---------------------------------------------
     IMAGE ROTATION (UNCHANGED)
  --------------------------------------------- */
  useEffect(() => {
    const intervals: NodeJS.Timeout[] = [];

    projects.forEach((project, index) => {
      if ('images' in project && Array.isArray(project.images) && project.images.length > 1) {
        const intervalTime = 6000 + (index * 1000); // Longer intervals for better performance

        const interval = setInterval(() => {
          setCurrentImages(prev => ({
            ...prev,
            [project.id]: ((prev[project.id] || 0) + 1) % project.images!.length
          }));
        }, intervalTime);

        intervals.push(interval);
      }
    });

    return () => {
      intervals.forEach(clearInterval);
    };
  }, [projects]); // Added projects dependency

  /* ---------------------------------------------
     TESTIMONIAL CARD STYLE VARIANTS (UPDATED WITH NEW BLACK CARD)
  --------------------------------------------- */
  const testimonialCardVariants = [
    "bg-black text-white border border-white/10 shadow-[0_40px_120px_rgba(0,0,0,0.6)]",
    "bg-white text-luxury-charcoal border border-black/10 shadow-2xl",
    "bg-gradient-to-br from-luxury-gold to-[#b8963f] text-white border border-white/20 shadow-[0_30px_100px_rgba(184,134,11,0.5)]",
    "bg-[#0a0a0a] text-white border border-luxury-gold/20 shadow-[0_30px_100px_rgba(184,134,11,0.3)]" // New black card variant
  ];

  /* ---------------------------------------------
     EXACTLY 4 TESTIMONIALS FOR SCROLLSTACK
  --------------------------------------------- */
  const scrollStackTestimonials = [
    {
      id: 1,
      name: "Aarav Patel",
      role: "Real Estate Developer",
      review: "Working with Surya Architects transformed our luxury residential project. The final result was spectacular.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      project: "Skyline Towers",
      duration: "12 months"
    },
    {
      id: 2,
      name: "Meera Desai",
      role: "Hotel Chain Owner",
      review: "Their architectural vision revolutionized our brand identity across all locations.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      project: "Serenity Hotels",
      duration: "18 months"
    },
    {
      id: 3,
      name: "Rohan Verma",
      role: "Tech CEO",
      review: "Our headquarters design became a landmark and boosted employee productivity.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      project: "Innovate HQ",
      duration: "24 months"
    },
    {
      id: 4,
      name: "Ananya Singh",
      role: "Design Editor",
      review: "Surya Architects consistently push creative and architectural boundaries.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      project: "Design Quarterly",
      duration: "Ongoing"
    }
  ];

  /* ---------------------------------------------
     ADDITIONAL TESTIMONIALS FOR DISPLAY BELOW (OPTIONAL)
  --------------------------------------------- */
  const additionalTestimonials = [
    {
      id: 5,
      name: "Vikram Malhotra",
      role: "Heritage Conservationist",
      review: "They preserved history while seamlessly introducing modern comforts.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1507591064344-03ba9c93a174?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      project: "Heritage Villa",
      duration: "16 months"
    },
    {
      id: 6,
      name: "Priya Nair",
      role: "Art Gallery Owner",
      review: "The gallery space elevates every artwork displayed within it.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1525133790044-03ba9c93a174?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      project: "Urban Art Space",
      duration: "14 months"
    },
    {
      id: 7,
      name: "Rahul Khanna",
      role: "Luxury Villa Owner",
      review: "Every space feels intentional, refined, and deeply personal.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      project: "Palm Grove Villa",
      duration: "11 months"
    },
    {
      id: 8,
      name: "Sneha Iyer",
      role: "Interior Stylist",
      review: "Their sense of spatial storytelling is unmatched.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1544725176-7c40e5a2c9f9?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      project: "Atelier Residence",
      duration: "9 months"
    },
    {
      id: 9,
      name: "Arjun Malhotra",
      role: "Commercial Developer",
      review: "The project became a benchmark in our entire portfolio.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      project: "Urban Crest",
      duration: "20 months"
    },
    {
      id: 10,
      name: "Neha Kapoor",
      role: "Luxury Resort Owner",
      review: "Surya Architects created an architectural masterpiece that perfectly blends with nature while offering ultimate luxury. The design has significantly increased our bookings.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      project: "Serenity Luxury Resort",
      duration: "22 months"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-luxury-beige/5 to-background cursor-none">
      <CustomCursor />
      <Navigation />

      {/* Minimal Hero */}
      <section
        className="relative min-h-[60vh] flex items-center justify-center overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-luxury-beige/10 via-transparent to-luxury-gold/5" />
        <div className="relative z-10 text-center px-4 sm:px-6 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          >
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl tracking-luxury-wide font-display-1 font-light text-luxury-charcoal mb-6">
              Portfolio
            </h1>
            <div className="w-32 h-0.5 bg-gradient-to-r from-luxury-gold to-luxury-gold/50 mx-auto" />
          </motion.div>
        </div>
      </section>

      {/* Projects Gallery - UNCHANGED */}
      <section className="py-8 sm:py-12 px-4 sm:px-6">
        <div className="container mx-auto max-w-screen-2xl">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-12"
          >
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                variants={itemVariants}
                className={`group relative cursor-pointer overflow-hidden optimized-scroll gpu-accelerated ${
                  project.featured ? 'md:col-span-2' : ''
                }`}
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
                onClick={() => setSelectedProject(project.id)}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                style={{ willChange: 'transform' }}
              >
                <div className={`relative overflow-hidden ${
                  project.featured
                    ? 'aspect-[16/9] md:aspect-[21/9]'
                    : 'aspect-[3/2] sm:aspect-[4/3] md:aspect-[3/4]'
                } bg-gradient-to-br from-luxury-beige/20 to-luxury-beige/5 rounded-3xl shadow-2xl`}>

                  {/* Background Image with Carousel */}
                  {'images' in project && Array.isArray(project.images) && project.images.length > 1 ? (
                    <div className="relative w-full h-full overflow-hidden">
                      <motion.img
                        key={`${project.id}-${currentImages[project.id] || 0}`}
                        src={project.images[currentImages[project.id] || 0]}
                        alt={project.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                        style={{ willChange: 'auto' }}
                      />

                      {/* Image Indicators */}
                      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
                        {project.images.map((_, imgIndex) => (
                          <motion.div
                            key={imgIndex}
                            className={`w-3 h-3 rounded-full transition-all duration-500 ${
                              (currentImages[project.id] || 0) === imgIndex
                                ? 'bg-luxury-gold scale-125 shadow-lg'
                                : 'bg-white/40 hover:bg-white/70'
                            }`}
                            whileHover={{ scale: 1.3 }}
                          />
                        ))}
                      </div>
                    </div>
                  ) : (
                    <motion.img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      whileHover={{ scale: 1.05 }}
                      transition={{
                        duration: 0.8,
                        ease: "easeInOut"
                      }}
                      loading="lazy"
                      style={{ willChange: 'transform' }}
                    />
                  )}

                  {/* Gradient Overlay - limit to bottom area and reduce opacity to keep image visible */}
                  <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/60 via-black/30 to-transparent opacity-50 group-hover:opacity-70 transition-opacity duration-700 pointer-events-none" />

                  {/* Content Overlay - keep content anchored to the bottom and limited in height */}
                  <div className="absolute inset-x-0 bottom-0 max-h-1/2 overflow-hidden flex flex-col justify-end p-4 sm:p-6 lg:p-8 pointer-events-auto">
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 + index * 0.1, duration: 0.6 }}
                      className="text-luxury-white"
                    >
                      {/* Category Badge */}
                      <motion.div
                        className="inline-flex items-center gap-1 sm:gap-2 bg-luxury-gold/90 backdrop-blur-sm px-2 sm:px-4 py-1 sm:py-2 rounded-full mb-2 sm:mb-4"
                        whileHover={{ scale: 1.05 }}
                      >
                        <span className="text-xs font-medium tracking-luxury-wide uppercase">
                          {project.category}
                        </span>
                      </motion.div>

                      {/* Title */}
                      <h3 className={`font-display-1 font-light tracking-luxury-wide mb-2 ${
                        project.featured
                          ? 'text-xl sm:text-3xl lg:text-5xl'
                          : 'text-lg sm:text-2xl lg:text-4xl'
                      }`}>
                        {project.title}
                      </h3>

                      {/* Subtitle */}
                      <p className={`opacity-90 mb-4 sm:mb-6 ${
                        project.featured
                          ? 'text-sm sm:text-lg lg:text-xl'
                          : 'text-sm sm:text-base lg:text-lg'
                      }`}>
                        {project.subtitle}
                      </p>

                      {/* Description */}
                      <p className="text-xs sm:text-sm opacity-80 mb-3 sm:mb-4 leading-relaxed">
                        {project.description}
                      </p>

                      {/* Client Review */}
                      {project.clientReview && (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                          className="mb-4 sm:mb-6 p-2 sm:p-4 bg-luxury-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl border border-luxury-white/20"
                        >
                          <div className="flex items-start gap-2 sm:gap-3">
                            <motion.img
                              src={project.clientReview.image}
                              alt={project.clientReview.name}
                              className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover border-2 border-luxury-gold/50"
                              whileHover={{ scale: 1.1 }}
                              transition={{ duration: 0.3 }}
                            />
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-1 sm:gap-2 mb-1 sm:mb-2">
                                <span className="text-xs sm:text-sm font-medium text-luxury-white truncate">
                                  {project.clientReview.name}
                                </span>
                                <span className="text-xs opacity-75 text-luxury-white hidden sm:inline">
                                  {project.clientReview.role}
                                </span>
                              </div>
                              <p className="text-xs sm:text-sm text-luxury-white/90 leading-relaxed italic overflow-hidden" style={{ maxHeight: '2.5rem' }}>
                                "{project.clientReview.review.length > 80 ? `${project.clientReview.review.substring(0, 80)}...` : project.clientReview.review}"
                              </p>
                              <div className="flex items-center gap-1 mt-1 sm:mt-2">
                                {[...Array(project.clientReview.rating)].map((_, i) => (
                                  <motion.div
                                    key={i}
                                    initial={{ opacity: 0, scale: 0 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.4 + index * 0.1 + i * 0.1, duration: 0.3 }}
                                  >
                                    <svg className="w-3 h-3 sm:w-4 sm:h-4 text-luxury-gold fill-current" viewBox="0 0 20 20">
                                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                  </motion.div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}

                      {/* Action Buttons */}
                      <div className="flex items-center gap-2 sm:gap-4">
                        <motion.button
                          className="flex items-center gap-1 sm:gap-2 bg-luxury-white/10 backdrop-blur-sm border border-luxury-white/20 px-3 sm:px-6 py-2 sm:py-3 rounded-full hover:bg-luxury-white/20 transition-all duration-300"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Eye className="w-3 h-3 sm:w-4 sm:h-4" />
                          <span className="text-xs sm:text-sm font-medium tracking-luxury-wide">View Details</span>
                        </motion.button>

                        <motion.a
                          href={project.link}
                          className="flex items-center gap-1 sm:gap-2 text-luxury-gold hover:text-luxury-white transition-colors duration-300"
                          whileHover={{ x: 5 }}
                        >
                          <span className="text-xs sm:text-sm font-medium tracking-luxury-wide">View Project</span>
                          <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
                        </motion.a>
                      </div>
                    </motion.div>
                  </div>

                  {/* Hover Effect Border */}
                  <motion.div
                    className="absolute inset-0 border-2 border-luxury-gold/0 rounded-3xl"
                    animate={{
                      borderColor: hoveredProject === project.id ? 'rgba(184, 134, 11, 0.3)' : 'rgba(184, 134, 11, 0)'
                    }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials ScrollStack Section - UPDATED WITH ONLY 4 CARDS */}
      <section className="pt-20 pb-0 px-4 sm:px-6 relative">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-3 mb-6">
              <div className="w-12 h-0.5 bg-gradient-to-r from-luxury-gold to-luxury-gold/50" />
              <span className="text-luxury-gold font-medium tracking-luxury-wide uppercase text-sm">
                Client Voices
              </span>
              <div className="w-12 h-0.5 bg-gradient-to-l from-luxury-gold to-luxury-gold/50" />
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display-1 font-light text-luxury-charcoal mb-6">
              Stories of Excellence
            </h2>
            <p className="text-lg text-luxury-charcoal/70 max-w-2xl mx-auto">
              Hear from our clients about their journey with Surya Architects and the transformative impact of our designs
            </p>
          </motion.div>

          {/* Testimonial ScrollStack - ONLY 4 CARDS (NO FIXED HEIGHT WRAPPER) */}
          <TestimonialScrollStack 
            useWindowScroll
            onStackComplete={() => setStackComplete(true)}
            itemDistance={120}
            itemStackDistance={50}
            stackPosition="25%"
            scaleEndPosition="20%"
            baseScale={0.85}
            itemScale={0.05}
            rotationAmount={0.4}
            blurAmount={1.0}
            className="mb-10"
          >
            {scrollStackTestimonials.map((testimonial, index) => (
              <ScrollStackItem
                key={testimonial.id}
                itemClassName={testimonialCardVariants[index % testimonialCardVariants.length]}
              >
                <div className="p-8 md:p-10 flex flex-col gap-6 md:gap-8">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 md:gap-6">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover border-4 border-current/20 flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xl md:text-2xl font-light">{testimonial.name}</h3>
                      <p className="opacity-80 text-sm md:text-base">{testimonial.role}</p>
                      <div className="flex gap-1 mt-2">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="w-3 h-3 md:w-4 md:h-4 fill-current" />
                        ))}
                      </div>
                    </div>
                  </div>

                  <p className="text-lg md:text-xl italic leading-relaxed">
                    "{testimonial.review}"
                  </p>

                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center text-sm opacity-70 gap-2">
                    <span className="font-medium">{testimonial.project}</span>
                    <span className="text-xs sm:text-sm">{testimonial.duration}</span>
                  </div>
                </div>
              </ScrollStackItem>
            ))}
          </TestimonialScrollStack>

          {/* Show CTA section only after scroll stack completes and all 4 cards are visible */}
          <AnimatePresence>
            {stackComplete && (
              <motion.div
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center"
              >
                <CTASection />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedProject !== null && (
          <ProjectLightbox
            isOpen={selectedProject !== null}
            onClose={() => setSelectedProject(null)}
            images={
              (() => {
                const project = projects.find(p => p.id === selectedProject);
                if (project && 'images' in project && Array.isArray(project.images) && project.images.length > 1) {
                  return project.images;
                }
                return [project?.image || ""];
              })()
            }
            title={projects.find(p => p.id === selectedProject)?.title || ""}
            description={projects.find(p => p.id === selectedProject)?.subtitle || ""}
          />
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
};

export default Projects;