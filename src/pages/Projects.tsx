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
      category: "Residential",
      caseStudy: "Timber & Light: Merging natural materials for a serene living space."
    },
    { 
      id: 2, 
      title: "Modern Kitchen", 
      description: "Minimalist Elegance", 
      image: project2,
      year: "2025",
      category: "Residential",
      caseStudy: "Form meets function in this contemporary culinary sanctuary."
    },
    { 
      id: 3, 
      title: "Urban Living", 
      description: "City Views", 
      image: project3,
      year: "2025",
      category: "Luxury Suites",
      caseStudy: "Elevated living with panoramic vistas and refined interiors."
    },
    { 
      id: 4, 
      title: "Spa Bathroom", 
      description: "Serene Sanctuary", 
      image: project4,
      year: "2025",
      category: "Renovation",
      caseStudy: "A tranquil retreat inspired by natural stone and flowing water."
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
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl md:text-7xl tracking-luxury-wide mb-6">Projects</h1>
            <p className="text-muted-foreground tracking-luxury text-lg mb-12">
              A collection of our recent work
            </p>

            {/* Category Filters */}
            <div className="flex flex-wrap items-center justify-center gap-4">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-2 text-sm tracking-luxury uppercase transition-smooth ${
                    selectedCategory === category
                      ? "bg-foreground text-background"
                      : "border border-foreground text-foreground hover:bg-foreground hover:text-background"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.15, duration: 0.8 }}
                viewport={{ once: true }}
                className="group cursor-pointer"
                onClick={() => setSelectedProject(project.id)}
              >
                <div className="relative overflow-hidden aspect-[4/3] mb-6">
                  <motion.img
                    src={project.image}
                    alt={project.title}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.6 }}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent opacity-0 group-hover:opacity-100 transition-smooth" />
                  
                  {/* Hover icon for lightbox */}
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-smooth">
                    <div className="bg-background/90 p-3 backdrop-blur-sm">
                      <Maximize2 className="w-5 h-5" />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-baseline justify-between">
                    <h2 className="text-2xl tracking-luxury-wide">{project.title}</h2>
                    <span className="text-sm text-muted-foreground tracking-luxury">{project.year}</span>
                  </div>
                  <p className="text-muted-foreground tracking-luxury">{project.description}</p>
                  <p className="text-xs text-muted-foreground tracking-luxury uppercase">{project.category}</p>
                </div>
              </motion.div>
            ))}
          </div>
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
          caseStudy={projects.find(p => p.id === selectedProject)?.caseStudy}
        />
      )}

      <CTASection />

      <Footer />
    </div>
  );
};

export default Projects;
