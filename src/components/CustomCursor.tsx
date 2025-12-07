import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [cursorTrail, setCursorTrail] = useState<Array<{ x: number; y: number; id: number }>>([]);

  useEffect(() => {
    let trailId = 0;
    const lastPos = { x: 0, y: 0 };
    let rafId: number | null = null;

    const updateMousePositionRaf = () => {
      setMousePosition({ x: lastPos.x, y: lastPos.y });
      // Add trail effect
      setCursorTrail(prev => {
        const newTrail = [...prev, { x: lastPos.x, y: lastPos.y, id: trailId++ }];
        return newTrail.slice(-5); // Keep only last 5 positions
      });
      rafId = null;
    };

    const updateMousePosition = (e: MouseEvent) => {
      lastPos.x = e.clientX;
      lastPos.y = e.clientY;
      if (rafId === null) {
        rafId = requestAnimationFrame(updateMousePositionRaf);
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'IMG' || target.closest('a') || target.closest('button')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", updateMousePosition);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("mouseover", handleMouseOver);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      {/* Cursor trail */}
      {cursorTrail.map((trail, index) => (
        <motion.div
          key={trail.id}
          className="fixed top-0 left-0 pointer-events-none z-[9998] hidden md:block"
          initial={{ x: trail.x - 4, y: trail.y - 4, opacity: 0.3 }}
          animate={{ 
            x: trail.x - 4, 
            y: trail.y - 4,
            opacity: 0,
            scale: 0.5
          }}
          transition={{ 
            duration: 0.5,
            ease: "easeOut"
          }}
        >
          <div className="w-2 h-2 rounded-full bg-accent/50" />
        </motion.div>
      ))}

      {/* Main cursor */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] hidden md:block"
        animate={{
          x: mousePosition.x - 16,
          y: mousePosition.y - 16,
          scale: isHovering ? 2 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 28,
          mass: 0.5,
        }}
      >
        <div className={`w-8 h-8 rounded-full border transition-colors ${
          isHovering 
            ? "border-accent bg-accent/20 shadow-[0_0_20px_rgba(var(--accent)/0.4)]" 
            : "border-foreground/30 bg-transparent"
        }`} />
      </motion.div>
    </>
  );
};

export default CustomCursor;
