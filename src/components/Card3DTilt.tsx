import { useState, ReactNode } from "react";
import { Link } from "react-router-dom";

interface Card3DTiltProps {
  children: (isActive: boolean) => ReactNode;
  to: string;
  className?: string;
}

const Card3DTilt = ({ children, to, className = "" }: Card3DTiltProps) => {
  const [isActive, setIsActive] = useState(false);

  const handleTouchStart = () => {
    setIsActive(true);
  };

  const handleTouchEnd = () => {
    setIsActive(false);
  };

  return (
    <Link
      to={to}
      className={`block ${className} ${isActive ? 'active' : ''}`}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleTouchStart}
      onMouseUp={handleTouchEnd}
      onMouseLeave={handleTouchEnd}
    >
      {children(isActive)}
    </Link>
  );
};

export default Card3DTilt;
