import { Link } from "react-router-dom";

interface Card3DTiltProps {
  children: React.ReactNode;
  to: string;
  className?: string;
}

// Simplified card wrapper — removed 3D tilt interactions to match a cleaner, gallery-style layout.
const Card3DTilt = ({ children, to, className = "" }: Card3DTiltProps) => {
  return (
    <Link to={to} className="block">
      <div className={className}>
        {children}
      </div>
    </Link>
  );
};

export default Card3DTilt;
