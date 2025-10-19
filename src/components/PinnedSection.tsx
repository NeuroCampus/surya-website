import { useEffect, useRef, ReactNode } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface PinnedSectionProps {
  children: ReactNode;
  className?: string;
  height?: string;
}

const PinnedSection = ({ 
  children, 
  className = "", 
  height = "200vh" 
}: PinnedSectionProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const content = contentRef.current;

    if (!container || !content) return;

    // Pin the section during scroll
    const pinTrigger = ScrollTrigger.create({
      trigger: container,
      start: "top top",
      end: `+=${height}`,
      pin: content,
      pinSpacing: true,
      scrub: 1,
    });

    // Animate content within pinned section
    gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: `+=${height}`,
        scrub: 1,
      }
    })
    .fromTo(content, 
      { scale: 0.9, opacity: 0.5 },
      { scale: 1, opacity: 1, duration: 0.5 }
    )
    .to(content, 
      { scale: 1.05, duration: 0.5 }
    );

    return () => {
      pinTrigger.kill();
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger === container) {
          trigger.kill();
        }
      });
    };
  }, [height]);

  return (
    <div ref={containerRef} style={{ height }} className={`relative ${className}`}>
      <div ref={contentRef} className="w-full h-screen">
        {children}
      </div>
    </div>
  );
};

export default PinnedSection;
