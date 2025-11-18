import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    projectType: "",
    message: ""
  });

  const submitContactForm = useMutation({
    mutationFn: async (data: typeof formData) => {
      return await apiRequest("POST", "/api/contact", data);
    },
    onSuccess: () => {
      toast({
        title: "Message sent!",
        description: "Thank you for your message. I'll get back to you soon!",
      });
      setFormData({ name: "", email: "", projectType: "", message: "" });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to send message. Please try again.",
        variant: "destructive",
      });
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }
    submitContactForm.mutate(formData);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <section id="contact" className="py-20 relative" ref={ref}>
      <div className="max-w-4xl mx-auto px-6">
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold gradient-text mb-4" data-testid="contact-title">Let's Work Together</h2>
          <p className="text-xl text-muted-foreground" data-testid="contact-subtitle">
            Ready to bring your project to life? Let's discuss your ideas!
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 gap-12">
          <motion.div 
            initial={{ x: -50, opacity: 0 }}
            animate={isInView ? { x: 0, opacity: 1 } : { x: -50, opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-semibold text-primary mb-4" data-testid="contact-get-in-touch">Get In Touch</h3>
              <p className="text-muted-foreground leading-relaxed mb-6" data-testid="contact-description">
                I'm always excited to work on new projects and help clients achieve their goals. 
                Whether you need a Discord bot, website, or custom solution, I'm here to help.
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center gap-4" data-testid="contact-info-email">
                <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                  <i className="fas fa-envelope text-primary"></i>
                </div>
                <div>
                  <div className="font-medium">Email</div>
                  <a href="mailto:unknownphv@gmail.com" className="text-primary hover:underline">
                    unknownphv@gmail.com
                  </a>
                </div>
              </div>
              
              <div className="flex items-center gap-4" data-testid="contact-info-response">
                <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center">
                  <i className="fas fa-clock text-accent"></i>
                </div>
                <div>
                  <div className="font-medium">Response Time</div>
                  <div className="text-muted-foreground">Usually within 24 hours</div>
                </div>
              </div>
              
              <div className="flex items-center gap-4" data-testid="contact-info-business">
                <div className="w-12 h-12 bg-secondary/20 rounded-lg flex items-center justify-center">
                  <i className="fas fa-handshake text-secondary"></i>
                </div>
                <div>
                  <div className="font-medium">Business Inquiries</div>
                  <div className="text-muted-foreground">Open for new projects</div>
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ x: 50, opacity: 0 }}
            animate={isInView ? { x: 0, opacity: 1 } : { x: 50, opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="glass-effect p-8 rounded-xl"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2" data-testid="label-name">Name *</label>
                <Input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="bg-card border-border"
                  placeholder="Your name"
                  data-testid="input-name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2" data-testid="label-email">Email *</label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="bg-card border-border"
                  placeholder="your.email@example.com"
                  data-testid="input-email"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2" data-testid="label-project-type">Project Type</label>
                <Select value={formData.projectType} onValueChange={(value) => handleInputChange('projectType', value)}>
                  <SelectTrigger className="bg-card border-border" data-testid="select-project-type">
                    <SelectValue placeholder="Select project type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="discord-bot" data-testid="option-discord-bot">Discord Bot</SelectItem>
                    <SelectItem value="website" data-testid="option-website">Website Development</SelectItem>
                    <SelectItem value="custom" data-testid="option-custom">Custom Solution</SelectItem>
                    <SelectItem value="other" data-testid="option-other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2" data-testid="label-message">Message *</label>
                <Textarea
                  rows={4}
                  value={formData.message}
                  onChange={(e) => handleInputChange('message', e.target.value)}
                  className="bg-card border-border"
                  placeholder="Tell me about your project..."
                  data-testid="textarea-message"
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                disabled={submitContactForm.isPending}
                data-testid="button-send-message"
              >
                {submitContactForm.isPending ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
