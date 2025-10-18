import { motion } from "framer-motion";
import { Instagram } from "lucide-react";
import project1 from "@/assets/project-1.jpg";
import project2 from "@/assets/project-2.jpg";
import project3 from "@/assets/project-3.jpg";
import project4 from "@/assets/project-4.jpg";
import heroImage from "@/assets/hero-interior.jpg";
import studioImage from "@/assets/studio-workspace.jpg";

const InstagramFeed = () => {
  const posts = [
    { id: 1, image: project1 },
    { id: 2, image: project2 },
    { id: 3, image: project3 },
    { id: 4, image: project4 },
    { id: 5, image: heroImage },
    { id: 6, image: studioImage },
  ];

  return (
    <section className="py-20 px-6 bg-secondary">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Instagram className="w-6 h-6" />
            <h2 className="text-3xl tracking-luxury-wide">Follow Our Journey</h2>
          </div>
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
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05, duration: 0.5 }}
              viewport={{ once: true }}
              className="group relative aspect-square overflow-hidden"
            >
              <img
                src={post.image}
                alt={`Instagram post ${post.id}`}
                className="w-full h-full object-cover transition-smooth group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-smooth flex items-center justify-center">
                <Instagram className="w-8 h-8 text-background" />
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InstagramFeed;
