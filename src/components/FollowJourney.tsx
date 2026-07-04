import { useEffect } from "react";
import { Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import project1 from "@/assets/project-1.jpg";
import project2 from "@/assets/project-2.jpg";
import project3 from "@/assets/project-3.jpg";
import project4 from "@/assets/project-4.jpg";
import heroImage from "@/assets/hero-interior.jpg";
import studioImage from "@/assets/studio-workspace.jpg";

const FollowJourney = () => {
  const photos = [
    { id: 1, image: project1, alt: "Deeps mansion - living" },
    { id: 2, image: project2, alt: "Sharath mansion - kitchen" },
    { id: 3, image: project3, alt: "Sudharshan mansion - lounge" },
    { id: 4, image: project4, alt: "Spa bathroom" },
    { id: 5, image: heroImage, alt: "Signature architecture" },
    { id: 6, image: studioImage, alt: "Design studio workspace" },
  ];

  // Preload images into browser cache so scrolling is perfectly smooth
  useEffect(() => {
    photos.forEach(photo => {
      const img = new Image();
      img.src = photo.image;
    });
  }, []);

  return (
    <section className="py-20 px-6 bg-background overflow-hidden">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-8">
          <h3 className="text-3xl sm:text-4xl font-display-1 font-light text-luxury-charcoal">Follow Our <span className="text-luxury-gold">Journey</span></h3>
          <p className="text-muted-foreground">Moments from our studio: projects, materials and the stories behind the spaces.</p>
          <div className="mt-4 flex items-center justify-center">
            <Button asChild variant="outline" size="default" className="group">
              <a
                href="https://www.instagram.com/surya_architects_interiors/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Open our Instagram page in a new window"
                className="inline-flex items-center gap-2"
              >
                <Instagram className="w-4 h-4 text-luxury-gold group-hover:animate-pulse" />
                <span className="text-luxury-charcoal">Follow on Instagram</span>
              </a>
            </Button>
          </div>
        </div>

        <div className="relative overflow-hidden">
          <div
            className="carousel-track flex w-max gap-4 items-center animating"
            style={{ willChange: "transform" }}
          >
            {/* First set */}
            {photos.map((p) => (
              <figure key={`first-${p.id}`} className="group relative flex-shrink-0 w-64 h-64 sm:w-72 sm:h-72 overflow-hidden rounded-xl shadow-md">
                <img src={p.image} alt={p.alt} className="w-full h-full object-cover" />
                <div className="absolute inset-x-0 bottom-0 h-24 sm:h-28 bg-black/20 opacity-0 group-hover:opacity-90 transition-opacity duration-200 flex items-end p-3 pointer-events-none group-hover:pointer-events-auto">
                  <span className="text-background text-sm">{p.alt}</span>
                </div>
              </figure>
            ))}

            {/* Duplicate for seamless loop */}
            {photos.map((p) => (
              <figure key={`second-${p.id}`} className="group relative flex-shrink-0 w-64 h-64 sm:w-72 sm:h-72 overflow-hidden rounded-xl shadow-md">
                <img src={p.image} alt={p.alt} className="w-full h-full object-cover" />
                <div className="absolute inset-x-0 bottom-0 h-24 sm:h-28 bg-black/20 opacity-0 group-hover:opacity-90 transition-opacity duration-200 flex items-end p-3 pointer-events-none group-hover:pointer-events-auto">
                  <span className="text-background text-sm">{p.alt}</span>
                </div>
              </figure>
            ))}
          </div>

          {/* Helpful accessibility: pause animation when user interacts by mouse or keyboard */}
          <noscript>
            <div className="mt-4 text-sm text-muted-foreground">Animations are disabled — enable JavaScript for a live preview.</div>
          </noscript>
        </div>
      </div>
    </section>
  );
};

export default FollowJourney;
