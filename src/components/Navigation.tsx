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
          ? "bg-black/20 backdrop-blur-md border-b border-black/10 shadow-lg" 
          : "bg-transparent backdrop-blur-0"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 py-4 md:py-6 flex items-center justify-between">
        <MagneticButton strength={0.2}>
          <Link to="/" className="group flex flex-col" onClick={closeMobileMenu}>
            <motion.span 
              className="text-base sm:text-lg md:text-xl tracking-luxury-wide font-light font-display-1 text-black transition-colors duration-300"
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
                  className={`relative text-sm tracking-luxury uppercase font-medium transition-fast group text-black`}
                >
                  {link.label}
                  <motion.span
                    className="absolute -bottom-1 left-0 h-[1px] bg-black"
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
          className="md:hidden p-2 rounded-lg transition-colors duration-300 text-black hover:bg-black/10"
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
            className="md:hidden border-t border-black/10 bg-black/10 backdrop-blur-md"
          >
            <div className="container mx-auto px-4 sm:px-6 py-4 md:py-6 space-y-2 md:space-y-4">
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
                    className="block py-2 md:py-3 text-base md:text-lg tracking-luxury uppercase font-medium transition-colors duration-300 touch-target text-black"
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
