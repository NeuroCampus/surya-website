import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

interface Card3DTiltProps {
  children: React.ReactNode;
  to: string;
  className?: string;
}

const Card3DTilt = ({ children, to, className = "" }: Card3DTiltProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [rotateXY, setRotateXY] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;

    setRotateXY({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotateXY({ x: 0, y: 0 });
  };

  return (
    <Link to={to} className="block">
      <motion.div
        ref={ref}
        className={className}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        animate={{
          rotateX: rotateXY.x,
          rotateY: rotateXY.y,
        }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 20,
        }}
        style={{
          transformStyle: "preserve-3d",
          perspective: 1000,
        }}
      >
        {children}
      </motion.div>
    </Link>
  );
};

export default Card3DTilt;
