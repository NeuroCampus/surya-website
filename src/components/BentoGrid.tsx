import { motion } from "framer-motion";
import { ReactNode } from "react";

interface BentoItem {
  id: string;
  content: ReactNode;
  className?: string;
  colSpan?: number;
  rowSpan?: number;
}

interface BentoGridProps {
  items: BentoItem[];
  className?: string;
}

const BentoGrid = ({ items, className = "" }: BentoGridProps) => {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 ${className}`}>
      {items.map((item, index) => (
        <motion.div
          key={item.id}
          className={`relative overflow-hidden rounded-2xl bg-muted/10 border border-border/30 hover:border-luxury-gold/50 transition-all duration-500 hover:shadow-2xl hover:shadow-luxury-gold/20 ${item.className || ""}`}
          style={{
            gridColumn: item.colSpan ? `span ${item.colSpan}` : undefined,
            gridRow: item.rowSpan ? `span ${item.rowSpan}` : undefined,
          }}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: index * 0.1,
            duration: 0.8,
            ease: [0.23, 1, 0.32, 1]
          }}
          viewport={{ once: true, amount: 0.3 }}
          whileHover={{ y: -10, transition: { duration: 0.3 } }}
        >
          {item.content}
        </motion.div>
      ))}
    </div>
  );
};

export default BentoGrid;