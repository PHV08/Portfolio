import { motion } from "framer-motion";

export default function Hero() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative">
      <div className="max-w-4xl mx-auto px-6 text-center z-10">
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="animate-float mb-8"
        >
          <img 
            src="https://images-ext-1.discordapp.net/external/ehpicofGDwOCYWjdmethbZYpHdKEgQThiJWA2tbb5A8/%3Fsize%3D4096/https/cdn.discordapp.com/avatars/998202571560861706/bfee6edfce89c6b1b9abb2a12ba0664f.webp?format=webp&width=453&height=453" 
            alt="PHV Avatar" 
            className="w-32 h-32 rounded-full mx-auto border-4 border-primary shadow-2xl animate-glow"
            data-testid="hero-avatar"
          />
        </motion.div>
        
        <motion.h1 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-5xl md:text-7xl font-bold mb-6"
          data-testid="hero-title"
        >
          <span className="gradient-text">PHV</span>
        </motion.h1>
        
        <motion.p 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-xl md:text-2xl text-muted-foreground mb-4"
          data-testid="hero-subtitle"
        >
          Backend Developer
        </motion.p>
        
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-wrap justify-center gap-3 mb-8"
        >
          <span className="skill-tag bg-card px-4 py-2 rounded-full text-sm font-medium border border-border" data-testid="skill-javascript">
            JavaScript
          </span>
          <span className="skill-tag bg-card px-4 py-2 rounded-full text-sm font-medium border border-border" data-testid="skill-html">
            HTML
          </span>
          <span className="skill-tag bg-card px-4 py-2 rounded-full text-sm font-medium border border-border" data-testid="skill-discord">
            Discord Bots
          </span>
          <span className="skill-tag bg-card px-4 py-2 rounded-full text-sm font-medium border border-border" data-testid="skill-web">
            Web Development
          </span>
        </motion.div>
        
        <motion.p 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8"
          data-testid="hero-description"
        >
          18-year-old backend developer with 4 years of experience in JavaScript & HTML. 
          Creating innovative solutions and bringing ideas to life through code.
        </motion.p>
        
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="flex flex-wrap justify-center gap-4"
        >
          <button 
            onClick={() => scrollToSection('projects')}
            className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-all duration-300 hover:scale-105"
            data-testid="button-view-projects"
          >
            View Projects
          </button>
          <button 
            onClick={() => scrollToSection('contact')}
            className="border border-border px-8 py-3 rounded-lg font-semibold hover:bg-card transition-all duration-300"
            data-testid="button-get-in-touch"
          >
            Get In Touch
          </button>
          <a 
            href="https://ko-fi.com/phv08/donate"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-accent text-accent-foreground px-8 py-3 rounded-lg font-semibold hover:bg-accent/90 transition-all duration-300 hover:scale-105 flex items-center gap-2"
            data-testid="button-donate"
          >
            <i className="fas fa-coffee"></i>
            Buy Me a Coffee
          </a>
        </motion.div>
      </div>
    </section>
  );
}
