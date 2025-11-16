import { useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Play, Pause, Filter, Grid3X3, List, Eye } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import ProjectLightbox from "@/components/ProjectLightbox";
import CTASection from "@/components/CTASection";
import project1 from "@/assets/project-1.jpg";
import project2 from "@/assets/project-2.jpg";
import project3 from "@/assets/project-3.jpg";
import project4 from "@/assets/project-4.jpg";
import visualVideo from "@/assets/visual.mp4";

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [viewMode, setViewMode] = useState<"grid" | "masonry">("grid");
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const [currentImages, setCurrentImages] = useState<{ [key: number]: number }>({});
  const [currentReview, setCurrentReview] = useState(0);

  // Sample reviews data
  const reviews = [
    {
      id: 1,
      name: "Priya Sharma",
      role: "Homeowner",
      review: "Surya Architects transformed our vision into reality. The attention to detail and creative solutions exceeded our expectations. Our home is now a masterpiece of modern design and functionality.",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 2,
      name: "Rajesh Kumar",
      role: "Commercial Client",
      review: "Working with Surya Architects was a game-changer for our business. The innovative design solutions not only enhanced our workspace but also boosted employee productivity and client satisfaction.",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 3,
      name: "Anita Desai",
      role: "Interior Design Client",
      review: "The team's expertise in creating luxurious yet functional spaces is unparalleled. They understood our aesthetic preferences perfectly and delivered beyond our wildest dreams.",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    }
  ];

  // Handle review rotation
  useEffect(() => {
    const intervals: NodeJS.Timeout[] = [];
    
    // Staggered image rotation for each project
    projects.forEach((project, index) => {
      // Check if project has images array and more than one image
      if ('images' in project && Array.isArray(project.images) && project.images.length > 1) {
        // Special handling for Deeps Mansion (id: 1), Sharath Mansion (id: 2), and Sudharshan Mansion (id: 3) to rotate every 3 seconds
        const intervalTime = (project.id === 1 || project.id === 2 || project.id === 3) ? 3000 : 5000 + (index * 1000);
        
        const interval = setInterval(() => {
          setCurrentImages(prev => ({
            ...prev,
            [project.id]: ((prev[project.id] || 0) + 1) % project.images!.length
          }));
        }, intervalTime);
        
        intervals.push(interval);
      }
    });
    
    // Add interval for review rotation
    const reviewInterval = setInterval(() => {
      setCurrentReview(prev => (prev + 1) % reviews.length);
    }, 6000); // Change review every 6 seconds
    
    intervals.push(reviewInterval);
    
    return () => {
      intervals.forEach(clearInterval);
    };
  }, [reviews]);

  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0.8]);
  const heroScale = useTransform(scrollYProgress, [0, 0.3], [1, 1.05]);

  const projects = [
    {
      id: 1,
      title: "Deeps Mansion",
      description: "Contemporary Luxury Living",
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
      year: "2025",
      category: "Residential",
      featured: true
    },
    {
      id: 2,
      title: "Sharath Mansion",
      description: "Minimalist Elegance Redefined",
      image: project2,
      images: [
        "https://res.cloudinary.com/ddcl4drlp/image/upload/v1763274906/1J9A7682_vf792r.jpg",
        "https://res.cloudinary.com/ddcl4drlp/image/upload/v1763274907/1J9A7714_srdse2.jpg",
        "https://res.cloudinary.com/ddcl4drlp/image/upload/v1763274908/1J9A7731_f92w8m.jpg",
        "https://res.cloudinary.com/ddcl4drlp/image/upload/v1763275046/1J9A7610_jizwqx.jpg"
      ],
      year: "2025",
      category: "Residential",
      featured: false
    },
    {
      id: 3,
      title: "Sudharshan Mansion",
      description: "City Views & Modern Comfort",
      image: project3,
      images: [
        "https://res.cloudinary.com/ddcl4drlp/image/upload/v1763275386/CC023265_daor0z.jpg",
        "https://res.cloudinary.com/ddcl4drlp/image/upload/v1763275383/CC023189_p72jl3.jpg",
        "https://res.cloudinary.com/ddcl4drlp/image/upload/v1763275385/CC023348_koglv4.jpg"
      ],
      year: "2025",
      category: "Residential",
      featured: true
    },
    {
      id: 4,
      title: "Spa Bathroom",
      description: "Serene Sanctuary Experience",
      image: project4,
      year: "2025",
      category: "Renovation",
      featured: false
    },
  ];

  const categories = ["All", "Residential", "Commercial", "Renovation", "Luxury Suites"];

  const filteredProjects = selectedCategory === "All"
    ? projects
    : projects.filter(p => p.category === selectedCategory);

  const featuredProjects = projects.filter(p => p.featured);

  // Stagger animation for project cards
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-luxury-beige/5 to-background cursor-none">
      <CustomCursor />
      <Navigation />

      {/* Hero Section with Video Background */}
      <motion.section
        className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 sm:pt-32"
        style={{ opacity: heroOpacity, scale: heroScale }}
      >
        {/* Background Video */}
        <div className="absolute inset-0 z-0">
          <video
            className="w-full h-full object-cover opacity-30"
            autoPlay
            muted
            loop
            playsInline
          >
            <source src={visualVideo} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-4 sm:px-6 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
            className="space-y-8"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-9xl tracking-luxury-wide font-display-1 font-light text-luxury-charcoal mb-4">
                Projects
              </h1>
              <div className="w-24 h-1 bg-gradient-to-r from-luxury-gold to-luxury-gold/50 mx-auto mb-8" />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground tracking-luxury leading-relaxed max-w-3xl mx-auto"
            >
              Crafting extraordinary spaces that tell your unique story
            </motion.p>

            {/* Featured Video Showcase */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8, duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
              className="mt-8 md:mt-12 lg:mt-16 relative"
            >
              <div className="relative max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg mx-auto">
                <video
                  className="w-full aspect-[9/16] object-cover rounded-2xl shadow-2xl border border-luxury-gold/20 transform rotate-[270deg]"
                  autoPlay
                  muted
                  loop
                  playsInline
                >
                  <source src={visualVideo} type="video/mp4" />
                </video>
                <div className="absolute -inset-2 md:-inset-4 bg-gradient-to-r from-luxury-gold/20 to-transparent rounded-2xl blur-xl -z-10" />
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
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

      {/* Projects Section */}
      <section className="py-20 px-4 sm:px-6">
        <div className="container mx-auto max-w-7xl">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            viewport={{ once: true }}
            className="text-center mb-12 md:mb-16"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl tracking-luxury-wide font-display-1 font-light text-luxury-charcoal mb-6">
              Our Portfolio
            </h2>
            <p className="text-lg text-muted-foreground tracking-luxury max-w-2xl mx-auto">
              Discover our curated collection of exceptional design projects
            </p>
          </motion.div>

          {/* Projects Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`${selectedCategory}-${viewMode}`}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, scale: 0.95 }}
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 lg:gap-12"
                  : "columns-1 sm:columns-2 lg:columns-3 gap-6 md:gap-8 space-y-6 md:space-y-8"
              }
            >
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  variants={itemVariants}
                  layout
                  className={`group cursor-pointer break-inside-avoid ${
                    viewMode === "masonry" ? "mb-6 md:mb-8" : ""
                  }`}
                  onClick={() => setSelectedProject(project.id)}
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className={`relative overflow-hidden ${
                    viewMode === "masonry"
                      ? "aspect-[4/5] mb-4 md:mb-6"
                      : "aspect-[4/3] mb-4 md:mb-6"
                  } bg-gradient-to-br from-luxury-beige/20 to-luxury-beige/5 rounded-2xl shadow-lg`}>
                    {/* Carousel for projects with multiple images, static image for others */}
                    {'images' in project && Array.isArray(project.images) && project.images.length > 1 ? (
                      <div className="relative w-full h-full">
                        <AnimatePresence mode="wait">
                          <motion.img
                            key={`${project.id}-${currentImages[project.id] || 0}`}
                            src={project.images[currentImages[project.id] || 0]}
                            alt={`${project.title} - Image ${(currentImages[project.id] || 0) + 1}`}
                            className="w-full h-full object-cover"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ 
                              duration: 1.2,
                              ease: [0.25, 0.1, 0.25, 1]
                            }}
                            whileHover={{ scale: 1.1 }}
                          />
                        </AnimatePresence>
                      </div>
                    ) : (
                      <motion.img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover"
                        whileHover={{ scale: 1.1 }}
                        transition={{ 
                          duration: 1.2,
                          ease: [0.25, 0.1, 0.25, 1]
                        }}
                      />
                    )}

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />

                    {/* Hover Content */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileHover={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className="absolute inset-0 flex items-end p-6"
                    >
                      <div className="text-luxury-white">
                        <div className="flex items-center gap-2 mb-2">
                          <Eye className="w-4 h-4" />
                          <span className="text-xs md:text-sm tracking-luxury-wide uppercase opacity-80">
                            View Project
                          </span>
                        </div>
                        <h3 className="text-lg sm:text-xl md:text-2xl tracking-luxury-wide font-display-1 font-light mb-1">
                          {project.title}
                        </h3>
                        <p className="text-sm opacity-90 mb-3">
                          {project.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs tracking-luxury-wide uppercase bg-luxury-white/20 px-3 py-1 rounded-full">
                            {project.category}
                          </span>
                          <span className="text-xs opacity-80">
                            {project.year}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Load More / Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mt-12 md:mt-16"
          >
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 md:gap-8 max-w-2xl mx-auto">
              <div className="space-y-2">
                <div className="text-2xl md:text-3xl font-display-1 font-light text-luxury-charcoal">
                  {projects.length}+
                </div>
                <div className="text-sm text-muted-foreground tracking-luxury uppercase">
                  Projects
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-2xl md:text-3xl font-display-1 font-light text-luxury-charcoal">
                  5+
                </div>
                <div className="text-sm text-muted-foreground tracking-luxury uppercase">
                  Years
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-2xl md:text-3xl font-display-1 font-light text-luxury-charcoal">
                  100%
                </div>
                <div className="text-sm text-muted-foreground tracking-luxury uppercase">
                  Satisfaction
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-2xl md:text-3xl font-display-1 font-light text-luxury-charcoal">
                  24/7
                </div>
                <div className="text-sm text-muted-foreground tracking-luxury uppercase">
                  Support
                </div>
              </div>
            </div>
          </motion.div>
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
            description={projects.find(p => p.id === selectedProject)?.description || ""}
          />
        )}
      </AnimatePresence>

      <CTASection />
      <Footer />
    </div>
  );
};

export default Projects;
