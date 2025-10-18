import { motion } from "framer-motion";
import { Instagram } from "lucide-react";
import SectionTransition from "./SectionTransition";
import ImageReveal from "./ImageReveal";
import project1 from "@/assets/project-1.jpg";
import project2 from "@/assets/project-2.jpg";
import project3 from "@/assets/project-3.jpg";
import project4 from "@/assets/project-4.jpg";
import heroImage from "@/assets/hero-interior.jpg";
import studioImage from "@/assets/studio-workspace.jpg";

const InstagramFeed = () => {
  const posts = [
    { id: 1, image: project1, alt: "Interior design project showcase" },
    { id: 2, image: project2, alt: "Modern kitchen design" },
    { id: 3, image: project3, alt: "Contemporary living space" },
    { id: 4, image: project4, alt: "Luxury bathroom interior" },
    { id: 5, image: heroImage, alt: "Signature architectural design" },
    { id: 6, image: studioImage, alt: "Design studio workspace" },
  ];

  return (
    <SectionTransition className="py-20 px-6 bg-secondary">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <motion.div 
            className="flex items-center justify-center gap-3 mb-4"
            initial={{ scale: 0.9 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Instagram className="w-6 h-6" />
            <h2 className="text-3xl tracking-luxury-wide">Follow Our Journey</h2>
          </motion.div>
          <a
            href="https://www.instagram.com/surya_architects_interiors/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-fast tracking-luxury"
          >
            @surya_architects_interiors
          </a>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {posts.map((post, index) => (
            <motion.a
              key={post.id}
              href="https://www.instagram.com/surya_architects_interiors/"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ 
                delay: index * 0.08, 
                duration: 0.6,
                ease: [0.25, 0.1, 0.25, 1]
              }}
              viewport={{ once: true, amount: 0.3 }}
              whileHover={{ y: -8 }}
              className="group relative aspect-square overflow-hidden"
            >
              <ImageReveal
                src={post.image}
                alt={post.alt}
                className="w-full h-full"
              />
              <motion.div 
                className="absolute inset-0 bg-black/40 flex items-center justify-center"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <Instagram className="w-8 h-8 text-background" />
              </motion.div>
            </motion.a>
          ))}
        </div>
      </div>
    </SectionTransition>
  );
};

export default InstagramFeed;
