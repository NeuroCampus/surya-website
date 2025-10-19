import { useState } from "react";
import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Mail, Phone, MapPin } from "lucide-react";
import heroInterior from "@/assets/hero-interior.jpg";

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));

    toast({
      title: "Message received",
      description: "Thank you for reaching out. We'll be in touch soon.",
    });

    setFormData({ name: "", email: "", message: "" });
    setIsSubmitting(false);
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
      type: "Email"
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+91 7483109814",
      type: "Phone"
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Bangalore",
      type: "Location"
    }
  ];

  return (
    <div className="min-h-screen relative flex flex-col">
      {/* Background Image */}
      <div 
        className="fixed inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroInterior})` }}
      />
      
      {/* Overlay for transparency */}
      <div className="fixed inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />
      
      {/* Content */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <CustomCursor />
        <Navigation />

        {/* Main Content */}
        <main className="flex-1 flex items-center justify-center px-4 sm:px-6 py-20">
          <div className="w-full max-w-7xl">
            {/* Header Section */}
            <motion.div
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
              className="text-center mb-16"
            >
              <h1 className="text-5xl sm:text-6xl md:text-8xl tracking-luxury-wide mb-6 font-display-1 font-light text-white">
                Let's Talk
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl text-white/80 tracking-luxury leading-relaxed max-w-2xl mx-auto">
                Ready to transform your space into a masterpiece?
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
              {/* Left Side - Contact Info */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
                className="lg:col-span-1 space-y-8"
              >
                <div className="space-y-6">
                  {contactInfo.map((info, index) => (
                    <motion.div
                      key={info.label}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 + 0.4, duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                      className="flex items-start space-x-4 group cursor-pointer"
                      onClick={() => handleContactClick(info.type, info.value)}
                    >
                      <div className="w-14 h-14 border border-white/40 group-hover:border-luxury-gold/60 flex items-center justify-center transition-all duration-300 backdrop-blur-sm bg-white/5 group-hover:bg-white/10">
                        <info.icon className="w-6 h-6 text-white group-hover:text-luxury-gold transition-colors duration-300" />
                      </div>
                      <div className="flex-1">
                        <div className="text-base sm:text-lg tracking-luxury-wide uppercase text-white/70 font-medium mb-3 group-hover:text-white transition-colors duration-300">
                          {info.label}
                        </div>
                        <div className="text-lg sm:text-xl md:text-2xl tracking-luxury text-white leading-tight group-hover:text-luxury-gold transition-colors duration-300 font-light">
                          {info.value}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Right Side - Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                className="lg:col-span-2"
              >
                <motion.form
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
                  onSubmit={handleSubmit}
                  className="space-y-8 bg-white/10 backdrop-blur-md border border-white/20 p-8 md:p-12 shadow-2xl"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Input
                        type="text"
                        name="name"
                        placeholder="Your Name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="h-16 text-lg tracking-luxury border-white/30 focus:border-luxury-gold bg-white/5 text-white placeholder:text-white/50 backdrop-blur-sm"
                      />
                    </div>

                    <div>
                      <Input
                        type="email"
                        name="email"
                        placeholder="Your Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="h-16 text-lg tracking-luxury border-white/30 focus:border-luxury-gold bg-white/5 text-white placeholder:text-white/50 backdrop-blur-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <Textarea
                      name="message"
                      placeholder="Tell us about your project vision"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={8}
                      className="text-lg tracking-luxury resize-none border-white/30 focus:border-luxury-gold bg-white/5 text-white placeholder:text-white/50 backdrop-blur-sm"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-16 text-lg tracking-luxury-wide uppercase bg-luxury-gold text-luxury-charcoal hover:bg-luxury-gold/90 transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </motion.form>
              </motion.div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
};

export default Contact;
