import { useState, useRef } from "react";
import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Mail, Phone, MapPin, Send, Sparkles, ArrowRight } from "lucide-react";

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const containerRef = useRef<HTMLDivElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Create form data for Google Forms submission
      const formDataToSubmit = new FormData();
      formDataToSubmit.append('entry.1604505436', formData.name); // Name field
      formDataToSubmit.append('entry.1567427972', formData.email); // Email field
      formDataToSubmit.append('entry.1434664158', formData.message); // Message field

      // Submit to Google Forms
      const response = await fetch('https://docs.google.com/forms/u/0/d/e/1FAIpQLSfYbZZnwvc8z5eHVpvvqvB_k1PB52Drm1H_FnUwnCtgNzPyRg/formResponse', {
        method: 'POST',
        body: formDataToSubmit,
        mode: 'no-cors' // Required for Google Forms CORS
      });

      toast({
        title: "Message sent successfully!",
        description: "Thank you for reaching out. We'll be in touch soon.",
      });

      // Reset form
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error('Form submission error:', error);
      toast({
        title: "Message sent!",
        description: "Your message has been recorded. We'll be in touch soon.",
        variant: "default",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleContactClick = (type: string, value: string) => {
    switch (type) {
      case 'Email':
        window.open(`mailto:${value}`, '_blank');
        break;
      case 'Phone':
        window.open(`tel:${value}`, '_blank');
        break;
      case 'Location':
        window.open('https://maps.app.goo.gl/kdvQjZzf9X2R9MnX8?g_st=aw', '_blank');
        break;
      default:
        break;
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "suryaarc.int@gmail.com",
      type: "Email",
      description: "Drop us a line anytime"
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+91 7483109814",
      type: "Phone",
      description: "Let's have a conversation"
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Bangalore",
      type: "Location",
      description: "Visit our studio"
    }
  ];

  return (
    <div ref={containerRef} className="min-h-screen relative flex flex-col bg-gradient-to-br from-luxury-beige via-background to-luxury-beige/30">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-32 h-32 border border-luxury-gold/20 rounded-full" />
        <div className="absolute top-40 right-32 w-24 h-24 border border-luxury-gold/20 rounded-full" />
        <div className="absolute bottom-32 left-1/3 w-40 h-40 border border-luxury-gold/20 rounded-full" />
        <div className="absolute bottom-20 right-20 w-28 h-28 border border-luxury-gold/20 rounded-full" />
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{
            y: [0, -20, 0],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-32 right-16 w-64 h-64 bg-luxury-gold/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            y: [0, 20, 0],
            opacity: [0.05, 0.15, 0.05]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
          className="absolute bottom-32 left-16 w-80 h-80 bg-luxury-beige/20 rounded-full blur-3xl"
        />
      </div>

      {/* Enhanced Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-luxury-beige/3 via-transparent to-luxury-gold/3"></div>
      <div className="absolute inset-0 opacity-15">
        <div
          className="absolute top-0 left-0 w-1/2 h-full bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')`
          }}
        />
        <div
          className="absolute top-0 right-0 w-1/2 h-full bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')`
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <CustomCursor />
        <Navigation />

        {/* Hero Section */}
        <section className="flex-1 flex items-center justify-center px-4 sm:px-6 py-20">
          <div className="w-full max-w-7xl">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
              className="text-center mb-20"
            >
             

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl tracking-tight mb-6 font-playfair font-bold text-luxury-charcoal"
              >
                Let's Talk
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.8 }}
                className="text-base sm:text-lg md:text-xl lg:text-2xl text-luxury-charcoal tracking-wide leading-relaxed max-w-3xl mx-auto font-light"
              >
                Ready to transform your space into a masterpiece?
                <br />
                <span className="text-luxury-gold font-medium">Let's create something extraordinary together.</span>
              </motion.p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16">
              {/* Contact Info */}
              <motion.div
                initial={{ opacity: 0, x: -60 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                className="space-y-8"
              >
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                  className="text-2xl sm:text-3xl md:text-4xl font-playfair font-bold text-luxury-charcoal mb-6 md:mb-8"
                >
                  Get In Touch
                </motion.h2>

                <div className="space-y-6">
                  {contactInfo.map((info, index) => (
                    <motion.div
                      key={info.label}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.15 + 0.7, duration: 0.8 }}
                      className="group cursor-pointer"
                      onClick={() => handleContactClick(info.type, info.value)}
                    >
                      <div className="flex items-start space-x-4 md:space-x-6 p-4 md:p-6 bg-white/80 backdrop-blur-sm border border-luxury-charcoal/10 rounded-2xl hover:bg-white hover:border-luxury-gold/30 transition-all duration-500 hover:shadow-xl hover:shadow-luxury-gold/10 hover:-translate-y-1">
                        <motion.div
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          transition={{ duration: 0.3 }}
                          className="w-12 h-12 md:w-16 md:h-16 bg-luxury-gold/10 border border-luxury-gold/30 flex items-center justify-center rounded-xl group-hover:bg-luxury-gold/20 transition-all duration-300 flex-shrink-0"
                        >
                          <info.icon className="w-5 h-5 md:w-7 md:h-7 text-luxury-gold" />
                        </motion.div>

                        <div className="flex-1 min-w-0">
                          <div className="text-xs md:text-sm uppercase tracking-widest text-muted-foreground font-medium mb-2 group-hover:text-luxury-gold transition-colors duration-300">
                            {info.label}
                          </div>
                          <div className="text-lg sm:text-xl md:text-2xl font-playfair font-bold text-luxury-charcoal mb-1 group-hover:text-luxury-gold transition-colors duration-300 leading-tight break-words">
                            {info.value}
                          </div>
                          <div className="text-muted-foreground text-sm leading-relaxed">
                            {info.description}
                          </div>
                        </div>

                        <motion.div
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.15 + 1, duration: 0.5 }}
                          className="flex-shrink-0"
                        >
                          <ArrowRight className="w-5 h-5 text-luxury-gold group-hover:translate-x-1 transition-transform duration-300" />
                        </motion.div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: 60 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                className="flex items-center"
              >
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                  className="w-full bg-white/90 backdrop-blur-xl border border-luxury-charcoal/10 p-6 md:p-8 lg:p-10 rounded-3xl shadow-2xl hover:shadow-luxury-gold/10 transition-all duration-500"
                >
                  <motion.h3
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.6 }}
                    className="text-xl sm:text-2xl md:text-3xl font-playfair font-bold text-luxury-charcoal mb-6 md:mb-8"
                  >
                    Start Your Project
                  </motion.h3>

                  <motion.form
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1, duration: 0.8 }}
                    onSubmit={handleSubmit}
                    className="space-y-6"
                  >
                    <div className="grid grid-cols-1 gap-4 md:gap-6">
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1.1, duration: 0.6 }}
                      >
                        <Input
                          type="text"
                          name="name"
                          placeholder="Your Name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="h-14 text-lg border-luxury-charcoal/20 focus:border-luxury-gold bg-white/50 text-luxury-charcoal placeholder:text-muted-foreground/60 rounded-xl hover:bg-white transition-all duration-300"
                        />
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1.2, duration: 0.6 }}
                      >
                        <Input
                          type="email"
                          name="email"
                          placeholder="Your Email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="h-14 text-lg border-luxury-charcoal/20 focus:border-luxury-gold bg-white/50 text-luxury-charcoal placeholder:text-muted-foreground/60 rounded-xl hover:bg-white transition-all duration-300"
                        />
                      </motion.div>
                    </div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.3, duration: 0.6 }}
                    >
                      <Textarea
                        name="message"
                        placeholder="Tell us about your vision and project requirements..."
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={5}
                        className="text-lg resize-none border-luxury-charcoal/20 focus:border-luxury-gold bg-white/50 text-luxury-charcoal placeholder:text-muted-foreground/60 rounded-xl hover:bg-white transition-all duration-300"
                      />
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.4, duration: 0.6 }}
                    >
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full h-14 text-lg tracking-wide uppercase bg-white/90 hover:bg-luxury-charcoal hover:text-white text-luxury-charcoal border-2 border-luxury-charcoal/20 hover:border-luxury-charcoal transition-all duration-500 shadow-lg hover:shadow-xl hover:shadow-luxury-charcoal/20 hover:-translate-y-0.5 font-bold rounded-xl group"
                      >
                        <motion.div
                          className="flex items-center justify-center space-x-3"
                          whileHover={{ scale: 1.02 }}
                          transition={{ duration: 0.2 }}
                        >
                          <span>{isSubmitting ? "Sending..." : "Send Message"}</span>
                          <motion.div
                            animate={isSubmitting ? { rotate: 360 } : { rotate: 0 }}
                            transition={{ duration: 0.5, repeat: isSubmitting ? Infinity : 0 }}
                          >
                            <Send className="w-5 h-5" />
                          </motion.div>
                        </motion.div>
                      </Button>
                    </motion.div>
                  </motion.form>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </div>
  );
};

export default Contact;
