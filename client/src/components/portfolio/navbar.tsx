import { useState } from "react";
import { motion } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 glass-effect"
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="text-xl font-bold gradient-text" data-testid="logo"></div>
          
          <div className="hidden md:flex space-x-8">
            <button 
              onClick={() => scrollToSection('home')} 
              className="nav-link text-sm font-medium hover:text-primary"
              data-testid="nav-home"
            >
              Home
            </button>
            <button 
              onClick={() => scrollToSection('about')} 
              className="nav-link text-sm font-medium hover:text-primary"
              data-testid="nav-about"
            >
              About
            </button>
            <button 
              onClick={() => scrollToSection('projects')} 
              className="nav-link text-sm font-medium hover:text-primary"
              data-testid="nav-projects"
            >
              Projects
            </button>
            <button 
              onClick={() => scrollToSection('contact')} 
              className="nav-link text-sm font-medium hover:text-primary"
              data-testid="nav-contact"
            >
              Contact
            </button>
          </div>
          
          <button 
            className="md:hidden text-primary"
            onClick={() => setIsOpen(!isOpen)}
            data-testid="mobile-menu-toggle"
          >
            <i className="fas fa-bars text-xl"></i>
          </button>
        </div>
        
        {/* Mobile Menu */}
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden mt-4 space-y-4"
          >
            <button 
              onClick={() => scrollToSection('home')} 
              className="block w-full text-left py-2 text-sm font-medium hover:text-primary"
              data-testid="mobile-nav-home"
            >
              Home
            </button>
            <button 
              onClick={() => scrollToSection('about')} 
              className="block w-full text-left py-2 text-sm font-medium hover:text-primary"
              data-testid="mobile-nav-about"
            >
              About
            </button>
            <button 
              onClick={() => scrollToSection('projects')} 
              className="block w-full text-left py-2 text-sm font-medium hover:text-primary"
              data-testid="mobile-nav-projects"
            >
              Projects
            </button>
            <button 
              onClick={() => scrollToSection('contact')} 
              className="block w-full text-left py-2 text-sm font-medium hover:text-primary"
              data-testid="mobile-nav-contact"
            >
              Contact
            </button>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
}
