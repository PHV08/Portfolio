import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-20 relative" ref={ref}>
      <div className="max-w-6xl mx-auto px-6">
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold gradient-text mb-4" data-testid="about-title">About Me</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="about-subtitle">
            Passionate about creating efficient backend solutions and helping clients bring their visions to life
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ x: -50, opacity: 0 }}
            animate={isInView ? { x: 0, opacity: 1 } : { x: -50, opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-semibold text-primary" data-testid="about-journey-title">My Journey</h3>
            <p className="text-muted-foreground leading-relaxed" data-testid="about-journey-text-1">
              Started my development journey at 14, diving deep into JavaScript and backend technologies. 
              Over the past 4 years, I've built multiple projects for clients, specializing in Discord bots, 
              web applications, and custom utility solutions.
            </p>
            <p className="text-muted-foreground leading-relaxed" data-testid="about-journey-text-2">
              I'm active in the developer community on Discord and Reddit, sharing knowledge and collaborating 
              with fellow developers. I also create content on my YouTube channel to help others 
              learn programming.
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ x: 50, opacity: 0 }}
            animate={isInView ? { x: 0, opacity: 1 } : { x: 50, opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-2 gap-6"
          >
            <div className="glass-effect p-6 rounded-xl text-center" data-testid="stat-experience">
              <div className="text-3xl font-bold text-primary mb-2">4+</div>
              <div className="text-sm text-muted-foreground">Years Experience</div>
            </div>
            <div className="glass-effect p-6 rounded-xl text-center" data-testid="stat-projects">
              <div className="text-3xl font-bold text-accent mb-2">68+</div>
              <div className="text-sm text-muted-foreground">Projects Completed</div>
            </div>
            <div className="glass-effect p-6 rounded-xl text-center" data-testid="stat-satisfaction">
              <div className="text-3xl font-bold text-secondary mb-2">100%</div>
              <div className="text-sm text-muted-foreground">Client Satisfaction</div>
            </div>
            <div className="glass-effect p-6 rounded-xl text-center" data-testid="stat-support">
              <div className="text-3xl font-bold text-primary mb-2">24/7</div>
              <div className="text-sm text-muted-foreground">Support Available</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
