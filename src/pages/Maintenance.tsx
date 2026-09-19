import { motion } from "framer-motion";
import CustomCursor from "@/components/CustomCursor";
import { Instagram } from "lucide-react";
import suryaLogo from "@/assets/suryalogo.png";

const Maintenance = () => {
  return (
    <div className="min-h-screen relative flex flex-col justify-between bg-background text-foreground overflow-hidden selection:bg-black/10 selection:text-luxury-charcoal">
      <CustomCursor />

      {/* Subtle Architectural Grid Lines Overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-0">
        <div className="w-full h-full border-x border-foreground/10 max-w-7xl mx-auto grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-12">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="border-r border-foreground/10 h-full" />
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 sm:px-6 md:px-10 py-12">
        <div className="max-w-3xl w-full mx-auto text-center">
          {/* Logo Showcase */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
            className="mb-8 inline-block"
          >
            <img
              src={suryaLogo}
              alt="Surya Architects Logo"
              className="relative h-44 sm:h-60 md:h-80 lg:h-96 w-auto max-w-full mx-auto object-contain"
            />
          </motion.div>

          {/* Headline: We will be back soon */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3 }}
            className="space-y-4"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-playfair font-bold text-luxury-charcoal tracking-tight leading-[1.15]">
              We Will Be <span className="text-luxury-gold italic">Back Soon</span>
            </h1>

            <p className="max-w-xl mx-auto text-muted-foreground text-base sm:text-lg md:text-xl font-light leading-relaxed tracking-wide px-2">
              We are currently refining our digital presence. An elevated spatial and architectural experience is in progress.
            </p>
          </motion.div>

          {/* Decorative Divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.5, ease: "easeInOut" }}
            className="w-24 h-px bg-gradient-to-r from-transparent via-luxury-gold to-transparent mx-auto mt-8"
          />
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 w-full border-t border-luxury-charcoal/10 py-6 px-6 sm:px-10 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <p className="text-xs text-muted-foreground tracking-luxury">
            © {new Date().getFullYear()} SURYA ARCHITECTS & INTERIOR DESIGNERS. ALL RIGHTS RESERVED.
          </p>

          <a
            href="https://www.instagram.com/surya_architects_interiors?igsh=ZzlqYm55MTVid29r"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-muted-foreground hover:text-luxury-gold transition-colors tracking-luxury inline-flex items-center gap-2"
          >
            <Instagram className="w-3.5 h-3.5 text-luxury-gold" />
            @surya_architects_interiors
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Maintenance;
