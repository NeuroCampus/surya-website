import { Instagram } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border py-8 px-6">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground tracking-luxury text-center md:text-left">
            © {new Date().getFullYear()} SURYA ARCHITECTS & INTERIOR DESIGNERS
          </p>

          <a
            href="https://www.instagram.com/surya_architects_interiors?igsh=ZzlqYm55MTVid29r"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-fast flex items-center gap-2"
            aria-label="Visit our Instagram"
          >
            <Instagram className="w-5 h-5" />
            <span className="text-sm tracking-luxury">@surya_architects_interiors</span>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
