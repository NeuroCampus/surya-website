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

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "hello@suryaluxecanvas.com"
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+91 98765 43210"
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Mumbai, India"
    }
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col cursor-none">
      <CustomCursor />
      <Navigation />

      <div className="flex-1 flex items-center justify-center px-6 pt-32 pb-20">
        <div className="w-full max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            {/* Left Side - Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
              className="space-y-12"
            >
              <div>
                <h1 className="text-5xl md:text-7xl tracking-luxury-wide mb-6 font-display-1 font-light text-luxury-charcoal">
                  Let's Talk
                </h1>
                <p className="text-xl text-muted-foreground tracking-luxury leading-relaxed">
                  Ready to transform your space?
                </p>
              </div>

              <div className="space-y-8">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={info.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 + 0.3, duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                    className="flex items-center space-x-6 group"
                  >
                    <div className="w-12 h-12 border border-luxury-charcoal/30 group-hover:border-luxury-gold/50 flex items-center justify-center transition-colors duration-300">
                      <info.icon className="w-5 h-5 text-luxury-charcoal group-hover:text-luxury-gold transition-colors duration-300" />
                    </div>
                    <div>
                      <div className="text-sm tracking-luxury-wide uppercase text-muted-foreground font-medium mb-1">
                        {info.label}
                      </div>
                      <div className="text-lg tracking-luxury text-luxury-charcoal">
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
              transition={{ duration: 1, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <motion.form
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
                onSubmit={handleSubmit}
                className="space-y-6 bg-background border border-border/50 p-8"
              >
                <div>
                  <Input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="h-14 text-base tracking-luxury border-border/50 focus:border-luxury-gold bg-background"
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
                    className="h-14 text-base tracking-luxury border-border/50 focus:border-luxury-gold bg-background"
                  />
                </div>

                <div>
                  <Textarea
                    name="message"
                    placeholder="Tell us about your project"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="text-base tracking-luxury resize-none border-border/50 focus:border-luxury-gold bg-background"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-14 text-base tracking-luxury-wide uppercase bg-luxury-charcoal text-luxury-white hover:bg-luxury-gold hover:text-luxury-charcoal transition-smooth"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </motion.form>
            </motion.div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Contact;
