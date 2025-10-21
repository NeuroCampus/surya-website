import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
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
  const controls = useAnimation();

  const posts = [
    { id: 1, image: project1, alt: "Interior design project showcase" },
    { id: 2, image: project2, alt: "Modern kitchen design" },
    { id: 3, image: project3, alt: "Contemporary living space" },
    { id: 4, image: project4, alt: "Luxury bathroom interior" },
    { id: 5, image: heroImage, alt: "Signature architectural design" },
    { id: 6, image: studioImage, alt: "Design studio workspace" },
    { id: 7, image: project1, alt: "Elegant dining area design" },
    { id: 8, image: project2, alt: "Minimalist bedroom design" },
    { id: 9, image: project3, alt: "Open concept living design" },
    { id: 10, image: project4, alt: "Luxury spa bathroom" },
    { id: 11, image: heroImage, alt: "Modern architectural masterpiece" },
    { id: 12, image: studioImage, alt: "Creative design workspace" },
  ];

  useEffect(() => {
    const startAutoScroll = async () => {
      while (true) {
        await controls.start({
          x: -100 * (posts.length / 2), // Scroll halfway through the duplicated content
          transition: {
            duration: 20, // Slow, smooth scroll duration
            ease: "linear",
          },
        });
        // Reset position instantly
        await controls.set({ x: 0 });
      }
    };

    startAutoScroll();
  }, [controls, posts.length]);

  return (
    <SectionTransition className="py-20 px-6 bg-secondary overflow-hidden">
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
            <h2 className="text-3xl tracking-luxury-wide font-display-1">Follow Our Journey</h2>
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

        <div className="relative overflow-hidden">
          <motion.div
            animate={controls}
            className="flex gap-4"
            style={{ width: `${posts.length * 100}%` }}
          >
            {/* First set of images */}
            {posts.map((post, index) => (
              <motion.a
                key={`first-${post.id}`}
                href="https://www.instagram.com/surya_architects_interiors/"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex-shrink-0 w-64 h-64 overflow-hidden"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <ImageReveal
                  src={post.image}
                  alt={post.alt}
                  className="w-full h-full object-cover filter grayscale transition-all duration-500 group-hover:grayscale-0"
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
            {/* Duplicate set for seamless loop */}
            {posts.map((post, index) => (
              <motion.a
                key={`second-${post.id}`}
                href="https://www.instagram.com/surya_architects_interiors/"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex-shrink-0 w-64 h-64 overflow-hidden"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <ImageReveal
                  src={post.image}
                  alt={post.alt}
                  className="w-full h-full object-cover filter grayscale transition-all duration-500 group-hover:grayscale-0"
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
          </motion.div>
        </div>
      </div>
    </SectionTransition>
  );
};

export default InstagramFeed;
