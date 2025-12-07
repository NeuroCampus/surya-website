import { useEffect, useRef, useState } from "react";
import { Instagram } from "lucide-react";
import project1 from "@/assets/project-1.jpg";
import project2 from "@/assets/project-2.jpg";
import project3 from "@/assets/project-3.jpg";
import project4 from "@/assets/project-4.jpg";
import heroImage from "@/assets/hero-interior.jpg";
import studioImage from "@/assets/studio-workspace.jpg";

const InstagramFeed = () => {
  const ref = useRef(null);
  // const feedInViewRef = useRef<IntersectionObserver | null>(null);
  const [isInView, setIsInView] = useState(false);

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

  // Toggle CSS-driven animation only while in view using IntersectionObserver
  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current as HTMLElement;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => setIsInView(entry.isIntersecting));
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="py-20 px-6 bg-secondary overflow-hidden">
      <div className="container mx-auto">
        {/* Simple auto-scrolling carousel with no entrance animations */}

        <div className="relative overflow-hidden">
          <div
            className={`carousel-track flex gap-4 ${isInView ? "animating" : ""}`}
            style={{ willChange: "transform" }}
          >
            {/* First set of images */}
            {posts.map((post) => (
              <a
                key={`first-${post.id}`}
                href="https://www.instagram.com/surya_architects_interiors/"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex-shrink-0 w-64 h-64 overflow-hidden"
              >
                <img
                  src={post.image}
                  alt={post.alt}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <Instagram className="w-8 h-8 text-background" />
                </div>
              </a>
            ))}
            {/* Duplicate set for seamless loop */}
            {posts.map((post) => (
              <a
                key={`second-${post.id}`}
                href="https://www.instagram.com/surya_architects_interiors/"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex-shrink-0 w-64 h-64 overflow-hidden"
              >
                <img
                  src={post.image}
                  alt={post.alt}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <Instagram className="w-8 h-8 text-background" />
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default InstagramFeed;
