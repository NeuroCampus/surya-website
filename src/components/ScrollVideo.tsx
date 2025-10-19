import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ScrollVideoProps {
  videoSrc?: string;
  posterImage?: string;
  className?: string;
}

const ScrollVideo = ({ videoSrc, posterImage, className = "" }: ScrollVideoProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current;

    if (!video || !container) return;

    // Set video to play based on scroll position
    const scrollTrigger = ScrollTrigger.create({
      trigger: container,
      start: "top bottom",
      end: "bottom top",
      scrub: true,
      onUpdate: (self) => {
        if (video.duration) {
          const videoTime = video.duration * self.progress;
          video.currentTime = videoTime;
        }
      },
    });

    return () => {
      scrollTrigger.kill();
    };
  }, []);

  return (
    <motion.div
      ref={containerRef}
      style={{ scale, opacity }}
      className={`relative w-full h-screen flex items-center justify-center ${className}`}
    >
      <div className="relative w-full max-w-7xl mx-auto px-6">
        {videoSrc ? (
          <video
            ref={videoRef}
            className="w-full h-auto rounded-lg"
            poster={posterImage}
            muted
            playsInline
            preload="auto"
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
        ) : (
          <div className="w-full aspect-video bg-muted rounded-lg flex items-center justify-center">
            <p className="text-muted-foreground tracking-luxury">Scroll-controlled video placeholder</p>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ScrollVideo;
