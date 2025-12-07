import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import CTASection from "@/components/CTASection";
import ImageReveal from "@/components/ImageReveal";
import MaskedTextReveal from "@/components/MaskedTextReveal";
import TestimonialCarousel from "@/components/TestimonialCarousel";
import FollowJourney from "@/components/FollowJourney";
import project1 from "@/assets/project-1.jpg";
import project2 from "@/assets/project-2.jpg";
import project3 from "@/assets/project-3.jpg";
import project4 from "@/assets/project-4.jpg";
import studioImage from "@/assets/studio-workspace.jpg";
import visual from "@/assets/visual.mp4";
import heroInterior from "@/assets/hero-interior.jpg";
import suryaLogo from "@/assets/suryalogo.png";

const Home = () => {
  const featured = [
    { id: 1, title: "Deeps Mansion", image: project1 },
    { id: 2, title: "Sharath Mansion", image: studioImage },
    { id: 3, title: "Sudharshan Mansion", image: project3 },
    { id: 4, title: "Spa Bathroom", image: project4 },
  ];

  const stats = [
    { number: "15+", unit: "Years", subtitle: "of Excellence", description: "Creating spaces that become part of your story" },
    { number: "300+", unit: "Projects", subtitle: "Completed", description: "Transforming dreams into reality" },
    { number: "98%", unit: "Satisfaction", subtitle: "Rate", description: "Happy clients who trust our vision" },
    { number: "25+", unit: "Awards", subtitle: "Won", description: "Recognition for outstanding design excellence" }
  ];

  const [currentStatIndex, setCurrentStatIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStatIndex(prev => (prev + 1) % stats.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [stats.length]);

  const quotes = [
    { text: "Designing Is Not A Profession But An Attitude", author: "László Moholy-Nagy" },
    { text: "God Is In The Details", author: "Mies van der Rohe" },
    { text: "Less Is More", author: "Mies van der Rohe" },
    { text: "Form Ever Follows Function", author: "Louis Sullivan" },
    { text: "Simplicity Is The Ultimate Sophistication", author: "Leonardo da Vinci" },
    { text: "The Sun Never Knew How Great It Was Until It Hit The Side Of A Building", author: "Louis Kahn" }
  ];

  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuoteIndex(prev => (prev + 1) % quotes.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [quotes.length]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-luxury-beige/5 to-background cursor-none">
      <CustomCursor />
      <Navigation />

      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 sm:pt-32">
        {/* background video */}
        <div className="absolute inset-0 z-0">
          <video className="w-full h-full object-cover opacity-20" autoPlay muted loop playsInline poster={heroInterior}>
            <source src={visual} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background/80" />
        </div>

        <div className="relative z-10 text-center px-4 sm:px-6 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <motion.img
              src={suryaLogo}
              alt="Surya Architects logo"
              className="mx-auto mb-6 h-24 sm:h-32 md:h-40 lg:h-48"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
            />

            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl tracking-luxury-wide font-display-1 font-light text-luxury-charcoal mb-4">
              Minimal, Luxurious & Timeless.
            </h2>

            <p className="max-w-2xl mx-auto text-muted-foreground text-base sm:text-lg md:text-xl leading-relaxed mb-8">
              We craft elegant spaces with relentless attention to detail — balancing modern design with refined materiality.
            </p>

            <div className="flex items-center justify-center gap-4">
              <Link to="/projects" className="inline-flex items-center px-6 py-3 bg-luxury-charcoal text-luxury-white uppercase text-xs sm:text-sm tracking-luxury-wide rounded-lg hover:bg-luxury-gold/90 transition-colors duration-300">
                View Projects
              </Link>
              <Link to="/contact" className="inline-flex items-center px-6 py-3 border border-luxury-charcoal text-luxury-charcoal uppercase text-xs sm:text-sm tracking-luxury-wide rounded-lg hover:bg-luxury-charcoal hover:text-white transition-all duration-300">
                Start a Project
              </Link>
            </div>
          </motion.div>

          {/* Decorative image band */}
          <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4">
            {featured.map((f, idx) => (
              <motion.div
                key={f.id}
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.35 + idx * 0.12, duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
                viewport={{ once: true }}
                className="rounded-xl shadow-2xl overflow-hidden"
              >
                <ImageReveal src={f.image} alt={f.title} className="aspect-[4/3] rounded-xl" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

     

      {/* Design Philosophy */}
      <section className="py-16 px-4 sm:px-6 bg-white">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-3xl sm:text-4xl font-display-1 font-light text-luxury-charcoal mb-4">Crafting Spaces That<span className="block text-luxury-gold mt-2">Inspire & Endure</span></h3>
              <p className="text-lg text-muted-foreground leading-relaxed mb-4">We believe that exceptional design transcends aesthetics. Every space we create is a harmonious blend of functionality, beauty, and the unique narrative of those who inhabit it.</p>
              <p className="text-base text-muted-foreground leading-relaxed mb-4">Our approach combines timeless principles with contemporary innovation, ensuring that each project not only meets today's needs but stands the test of time.</p>
            </div>
            <div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-gradient-to-br from-luxury-beige/10 to-background">
                  <div className="text-xl font-medium text-luxury-charcoal">Timeless Design</div>
                  <p className="text-sm text-muted-foreground mt-2">Creating spaces that remain relevant for generations</p>
                </div>
                <div className="p-4 rounded-xl bg-gradient-to-br from-luxury-beige/10 to-background">
                  <div className="text-xl font-medium text-luxury-charcoal">Functional Beauty</div>
                  <p className="text-sm text-muted-foreground mt-2">Where aesthetics meet practical excellence</p>
                </div>
                <div className="p-4 rounded-xl bg-gradient-to-br from-luxury-beige/10 to-background">
                  <div className="text-xl font-medium text-luxury-charcoal">Personal Touch</div>
                  <p className="text-sm text-muted-foreground mt-2">Every design tells a unique story</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured projects (grid) */}
      <section className="py-16 px-4 sm:px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-8">
            <h2 className="text-3xl sm:text-4xl font-display-1 font-light text-luxury-charcoal mb-2">Featured <span className="text-luxury-gold">Projects</span></h2>
            <p className="text-muted-foreground">A selection of recent works that capture our aesthetic and approach.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
            {featured.map(p => (
              <div key={p.id} className="rounded-2xl overflow-hidden shadow-2xl h-full flex flex-col">
                <ImageReveal src={p.image} alt={p.title} className="aspect-[4/3] rounded-t-2xl w-full" />
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <h4 className="font-display-1 font-light text-luxury-charcoal mb-1">{p.title}</h4>
                  <p className="text-sm text-muted-foreground">A short glance at a project that showcases our approach to form and material.</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link to="/projects" className="inline-flex items-center px-6 py-3 border border-luxury-charcoal text-luxury-charcoal uppercase text-xs sm:text-sm tracking-luxury-wide rounded-lg hover:bg-luxury-charcoal hover:text-white transition-all duration-300">Browse Full Portfolio</Link>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 px-4 sm:px-6 bg-background">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-8">
            <h3 className="text-3xl sm:text-4xl font-display-1 font-light text-luxury-charcoal">Our <span className="text-luxury-gold">Services</span></h3>
            <p className="text-muted-foreground">Comprehensive design solutions from concept through completion.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-white shadow-sm">
              <h4 className="text-lg font-medium text-luxury-charcoal">Architecture Design</h4>
              <p className="text-sm mt-2 text-muted-foreground">Conceptual design and planning for residential and commercial spaces</p>
            </div>
            <div className="p-6 rounded-2xl bg-white shadow-sm">
              <h4 className="text-lg font-medium text-luxury-charcoal">Interior Design</h4>
              <p className="text-sm mt-2 text-muted-foreground">Transforming spaces with bespoke interior solutions and finishes</p>
            </div>
            <div className="p-6 rounded-2xl bg-white shadow-sm">
              <h4 className="text-lg font-medium text-luxury-charcoal">Project Management</h4>
              <p className="text-sm mt-2 text-muted-foreground">End-to-end oversight ensuring quality, timeline, and budget adherence</p>
            </div>
          </div>
        </div>
      </section>

      

     

      {/* Follow our journey */}
      <FollowJourney />

      {/* CTA Section */}
      <CTASection />

      <Footer />
    </div>
  );
};

export default Home;
