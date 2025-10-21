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

  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0.8]);
  const heroScale = useTransform(scrollYProgress, [0, 0.3], [1, 1.05]);

  const projects = [
    {
      id: 1,
      title: "Bangalore Residence",
      description: "Contemporary Luxury Living",
      image: project1,
      year: "2025",
      category: "Residential",
      featured: true
    },
    {
      id: 2,
      title: "Modern Kitchen",
      description: "Minimalist Elegance Redefined",
      image: project2,
      year: "2025",
      category: "Residential",
      featured: false
    },
    {
      id: 3,
      title: "Urban Living",
      description: "City Views & Modern Comfort",
      image: project3,
      year: "2025",
      category: "Luxury Suites",
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
              <h1 className="text-6xl sm:text-7xl md:text-9xl tracking-luxury-wide font-display-1 font-light text-luxury-charcoal mb-4">
                Projects
              </h1>
              <div className="w-24 h-1 bg-gradient-to-r from-luxury-gold to-luxury-gold/50 mx-auto mb-8" />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="text-xl sm:text-2xl text-muted-foreground tracking-luxury leading-relaxed max-w-3xl mx-auto"
            >
              Crafting extraordinary spaces that tell your unique story
            </motion.p>

            {/* Featured Video Showcase */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8, duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
              className="mt-16 relative"
            >
              <div className="relative max-w-lg mx-auto">
                <video
                  className="w-full aspect-[9/16] object-cover rounded-2xl shadow-2xl border border-luxury-gold/20 transform rotate-[270deg]"
                  autoPlay
                  muted
                  loop
                  playsInline
                >
                  <source src={visualVideo} type="video/mp4" />
                </video>
                <div className="absolute -inset-4 bg-gradient-to-r from-luxury-gold/20 to-transparent rounded-2xl blur-xl -z-10" />
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
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl md:text-6xl tracking-luxury-wide font-display-1 font-light text-luxury-charcoal mb-6">
              Our Portfolio
            </h2>
            <p className="text-lg text-muted-foreground tracking-luxury max-w-2xl mx-auto">
              Discover our curated collection of exceptional design projects
            </p>
          </motion.div>

          {/* Controls */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-12"
          >
            {/* Category Filters */}
            <div className="flex flex-wrap items-center gap-3">
              <Filter className="w-5 h-5 text-luxury-gold mr-2" />
              {categories.map((category, index) => (
                <motion.button
                  key={category}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                  onClick={() => setSelectedCategory(category)}
                  onHoverStart={() => setHoveredCategory(category)}
                  onHoverEnd={() => setHoveredCategory(null)}
                  className={`relative px-6 py-3 text-sm tracking-luxury-wide uppercase transition-all duration-300 rounded-full border ${
                    selectedCategory === category
                      ? "bg-luxury-charcoal text-luxury-white border-luxury-charcoal shadow-lg"
                      : "border-luxury-charcoal/30 text-luxury-charcoal hover:bg-luxury-charcoal hover:text-luxury-white hover:border-luxury-charcoal"
                  }`}
                >
                  {category}
                  {hoveredCategory === category && (
                    <motion.div
                      layoutId="activeCategory"
                      className="absolute inset-0 bg-luxury-gold/10 rounded-full -z-10"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </motion.button>
              ))}
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center gap-2 bg-luxury-beige/10 rounded-full p-1">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setViewMode("grid")}
                className={`p-3 rounded-full transition-all duration-300 ${
                  viewMode === "grid"
                    ? "bg-luxury-charcoal text-luxury-white shadow-lg"
                    : "text-luxury-charcoal hover:bg-luxury-charcoal/10"
                }`}
              >
                <Grid3X3 className="w-4 h-4" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setViewMode("masonry")}
                className={`p-3 rounded-full transition-all duration-300 ${
                  viewMode === "masonry"
                    ? "bg-luxury-charcoal text-luxury-white shadow-lg"
                    : "text-luxury-charcoal hover:bg-luxury-charcoal/10"
                }`}
              >
                <List className="w-4 h-4" />
              </motion.button>
            </div>
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
                  ? "grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12"
                  : "columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8"
              }
            >
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  variants={itemVariants}
                  layout
                  className={`group cursor-pointer break-inside-avoid ${
                    viewMode === "masonry" ? "mb-8" : ""
                  }`}
                  onClick={() => setSelectedProject(project.id)}
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className={`relative overflow-hidden ${
                    viewMode === "masonry"
                      ? "aspect-[4/5] mb-6"
                      : "aspect-[4/3] mb-6"
                  } bg-gradient-to-br from-luxury-beige/20 to-luxury-beige/5 rounded-2xl shadow-lg`}>
                    <motion.img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                    />

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />

                    {/* Featured Badge */}
                    {project.featured && (
                      <div className="absolute top-4 left-4 bg-luxury-gold text-luxury-white px-3 py-1 rounded-full text-xs font-medium tracking-luxury-wide uppercase z-10">
                        Featured
                      </div>
                    )}

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
                          <span className="text-sm tracking-luxury-wide uppercase opacity-80">
                            View Project
                          </span>
                        </div>
                        <h3 className="text-xl sm:text-2xl tracking-luxury-wide font-display-1 font-light mb-1">
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
            className="text-center mt-16"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto">
              <div className="space-y-2">
                <div className="text-3xl font-display-1 font-light text-luxury-charcoal">
                  {projects.length}+
                </div>
                <div className="text-sm text-muted-foreground tracking-luxury uppercase">
                  Projects
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-display-1 font-light text-luxury-charcoal">
                  5+
                </div>
                <div className="text-sm text-muted-foreground tracking-luxury uppercase">
                  Years
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-display-1 font-light text-luxury-charcoal">
                  100%
                </div>
                <div className="text-sm text-muted-foreground tracking-luxury uppercase">
                  Satisfaction
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-display-1 font-light text-luxury-charcoal">
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
            images={[projects.find(p => p.id === selectedProject)?.image || ""]}
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
