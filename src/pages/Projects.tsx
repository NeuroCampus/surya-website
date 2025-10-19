import { useState } from "react";
import { motion } from "framer-motion";
import { Maximize2 } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import ProjectLightbox from "@/components/ProjectLightbox";
import CTASection from "@/components/CTASection";
import project1 from "@/assets/project-1.jpg";
import project2 from "@/assets/project-2.jpg";
import project3 from "@/assets/project-3.jpg";
import project4 from "@/assets/project-4.jpg";

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const projects = [
    { 
      id: 1, 
      title: "Bangalore Residence", 
      description: "Contemporary Luxury", 
      image: project1,
      year: "2025",
      category: "Residential"
    },
    { 
      id: 2, 
      title: "Modern Kitchen", 
      description: "Minimalist Elegance", 
      image: project2,
      year: "2025",
      category: "Residential"
    },
    { 
      id: 3, 
      title: "Urban Living", 
      description: "City Views", 
      image: project3,
      year: "2025",
      category: "Luxury Suites"
    },
    { 
      id: 4, 
      title: "Spa Bathroom", 
      description: "Serene Sanctuary", 
      image: project4,
      year: "2025",
      category: "Renovation"
    },
  ];

  const categories = ["All", "Residential", "Commercial", "Renovation", "Luxury Suites"];

  const filteredProjects = selectedCategory === "All" 
    ? projects 
    : projects.filter(p => p.category === selectedCategory);

  return (
    <div className="min-h-screen bg-background cursor-none">
      <CustomCursor />
      <Navigation />
      
      <div className="pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-center mb-16"
          >
            <h1 className="text-6xl md:text-8xl tracking-luxury-wide mb-6 font-display-1 font-light text-luxury-charcoal">
              Projects
            </h1>
            <p className="text-xl text-muted-foreground tracking-luxury leading-relaxed max-w-2xl mx-auto">
              Our work speaks for itself
            </p>

            {/* Category Filters */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
              className="flex flex-wrap items-center justify-center gap-4 mt-12"
            >
              {categories.map((category, index) => (
                <motion.button
                  key={category}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 + 0.4, duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-3 text-sm tracking-luxury-wide uppercase transition-smooth border ${
                    selectedCategory === category
                      ? "bg-luxury-charcoal text-luxury-white border-luxury-charcoal"
                      : "border-luxury-charcoal/30 text-luxury-charcoal hover:bg-luxury-charcoal hover:text-luxury-white"
                  }`}
                >
                  {category}
                </motion.button>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12"
          >
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                transition={{ delay: index * 0.1, duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
                className="group cursor-pointer"
                onClick={() => setSelectedProject(project.id)}
              >
                <div className="relative overflow-hidden aspect-[4/3] mb-6 bg-luxury-beige/10">
                  <motion.img
                    src={project.image}
                    alt={project.title}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Hover overlay */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <div className="bg-luxury-white/90 backdrop-blur-sm px-6 py-3 border border-luxury-charcoal/20">
                      <span className="text-luxury-charcoal tracking-luxury-wide uppercase text-sm font-medium">
                        View Project
                      </span>
                    </div>
                  </motion.div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-baseline justify-between">
                    <h2 className="text-2xl md:text-3xl tracking-luxury-wide font-display-1 font-light text-luxury-charcoal">
                      {project.title}
                    </h2>
                    <span className="text-sm text-muted-foreground tracking-luxury font-medium">
                      {project.year}
                    </span>
                  </div>
                  <p className="text-muted-foreground tracking-luxury text-lg">
                    {project.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs tracking-luxury-wide uppercase text-luxury-gold font-medium">
                      {project.category}
                    </span>
                    <motion.div
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                      className="text-luxury-gold"
                    >
                      →
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Lightbox */}
      {selectedProject !== null && (
        <ProjectLightbox
          isOpen={selectedProject !== null}
          onClose={() => setSelectedProject(null)}
          images={[projects.find(p => p.id === selectedProject)?.image || ""]}
          title={projects.find(p => p.id === selectedProject)?.title || ""}
          description={projects.find(p => p.id === selectedProject)?.description || ""}
        />
      )}

      <CTASection />

      <Footer />
    </div>
  );
};

export default Projects;
