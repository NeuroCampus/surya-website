import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import MagneticButton from "./MagneticButton";
import { Menu, X } from "lucide-react";

const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Check if current page has dark background
  const isDarkPage = false; // location.pathname === '/contact';

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/projects", label: "Projects" },
    { path: "/about", label: "Studio" },
    { path: "/contact", label: "Contact" },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 3, ease: [0.25, 0.1, 0.25, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-cinematic ${
        scrolled 
          ? isDarkPage 
            ? "bg-black/70 backdrop-blur-xl border-b border-white/20 shadow-lg" 
            : "bg-background/70 backdrop-blur-xl border-b border-border/40 shadow-lg"
          : "bg-transparent backdrop-blur-0"
      }`}
    >
      <div className="container mx-auto px-6 py-6 flex items-center justify-between">
        <MagneticButton strength={0.2}>
          <Link to="/" className="group flex flex-col" onClick={closeMobileMenu}>
            <motion.span 
              className={`text-xl tracking-luxury-wide font-light transition-colors duration-300 ${
                isDarkPage ? "text-white" : "text-foreground"
              }`}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              Surya Architects & Interiors
            </motion.span>
          </Link>
        </MagneticButton>
        
        {/* Desktop Navigation */}
        <motion.div 
          className="hidden md:flex gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.2, duration: 0.8 }}
        >
          {navLinks.map((link, index) => (
            <motion.div
              key={link.path}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                delay: 3.3 + index * 0.1, 
                duration: 0.5,
                ease: [0.25, 0.1, 0.25, 1]
              }}
            >
              <MagneticButton strength={0.15}>
                <Link
                  to={link.path}
                  className={`relative text-sm tracking-luxury uppercase transition-fast group ${
                    location.pathname === link.path
                      ? isDarkPage ? "text-white" : "text-foreground"
                      : isDarkPage ? "text-white/70 hover:text-white" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {link.label}
                  <motion.span
                    className={`absolute -bottom-1 left-0 h-[1px] ${
                      isDarkPage ? "bg-white" : "bg-foreground"
                    }`}
                    initial={{ width: location.pathname === link.path ? "100%" : "0%" }}
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                  />
                </Link>
              </MagneticButton>
            </motion.div>
          ))}
        </motion.div>

        {/* Mobile Menu Button */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.2, duration: 0.8 }}
          onClick={toggleMobileMenu}
          className={`md:hidden p-2 rounded-lg transition-colors duration-300 ${
            isDarkPage ? "text-white hover:bg-white/10" : "text-foreground hover:bg-foreground/10"
          }`}
          aria-label="Toggle mobile menu"
        >
          <motion.div
            animate={{ rotate: isMobileMenuOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.div>
        </motion.button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className={`md:hidden border-t ${
              isDarkPage ? "border-white/20 bg-black/90" : "border-border/40 bg-background/95"
            } backdrop-blur-xl`}
          >
            <div className="container mx-auto px-6 py-6 space-y-4">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.3 }}
                >
                  <Link
                    to={link.path}
                    onClick={closeMobileMenu}
                    className={`block py-3 text-lg tracking-luxury uppercase transition-colors duration-300 ${
                      location.pathname === link.path
                        ? isDarkPage ? "text-white font-medium" : "text-foreground font-medium"
                        : isDarkPage ? "text-white/70 hover:text-white" : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navigation;
