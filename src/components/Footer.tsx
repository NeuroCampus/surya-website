import { Instagram } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border py-8">
      <div className="container mx-auto px-6 flex items-center justify-between">
        <p className="text-sm text-muted-foreground tracking-luxury">
          © {new Date().getFullYear()} Surya Architects & Interiors
        </p>
        
        <a
          href="https://www.instagram.com/surya_architects_interiors/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted-foreground hover:text-foreground transition-fast"
          aria-label="Visit our Instagram"
        >
          <Instagram className="w-5 h-5" />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
