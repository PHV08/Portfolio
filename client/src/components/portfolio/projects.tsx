import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

export default function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const projects = [
    {
      id: 1,
      client: ".xavier32",
      avatar: "https://i.pinimg.com/280x280_RS/ec/8e/69/ec8e6948024ea82757fac742c7ef29b4.jpg",
      title: "All-in-One Discord Bot",
      duration: "1 week",
      description: "Developed a comprehensive Discord bot solution featuring moderation tools, custom commands, automated responses, and server management utilities. The bot includes advanced features like role management, welcome messages, and anti-spam protection.",
      technologies: ["Discord.js", "Node.js", "MongoDB", "Moderation"],
      testimonial: "PHV delivered exactly what I needed and more. The bot works flawlessly and the development process was smooth and professional.",
      color: "primary"
    },
    {
      id: 2,
      client: ".kaicinter",
      avatar: "https://wallpapers-clan.com/wp-content/uploads/2023/05/cool-pfp-02.jpg",
      title: "Custom Utility & Music Bot + Website",
      duration: "2 weeks",
      description: "Created a dual-purpose Discord bot combining utility functions with high-quality music streaming, plus a custom website for bot management and server statistics. Features include playlist management, queue controls, and web-based configuration panel.",
      technologies: ["Discord.js", "HTML/CSS", "Music Streaming", "Web Dashboard"],
      testimonial: "Outstanding work! The bot and website exceeded my expectations. Professional quality at a reasonable price.",
      color: "secondary"
    },
    {
      id: 3,
      client: "krishna34_",
      avatar: "https://i.pinimg.com/originals/a9/1f/46/a91f46a7b6d1111f69ad89f660cc29f5.jpg",
      title: "Custom Website Development",
      duration: "1.5 weeks",
      description: "Built a fully responsive custom website from scratch with modern design principles, optimized performance, and seamless user experience. Implemented custom animations, interactive elements, and mobile-first responsive design.",
      technologies: ["HTML5", "CSS3", "JavaScript", "Responsive Design"],
      testimonial: "Amazing developer! PHV created exactly what I envisioned and delivered on time. Highly recommended!",
      color: "accent"
    }
  ];

  return (
    <section id="projects" className="py-20 relative" ref={ref}>
      <div className="max-w-6xl mx-auto px-6">
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold gradient-text mb-4" data-testid="projects-title">Featured Projects</h2>
          <p className="text-xl text-muted-foreground" data-testid="projects-subtitle">
            Recent work that showcases my expertise and dedication to quality
          </p>
        </motion.div>
        
        <div className="space-y-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ y: 50, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="glass-effect rounded-xl p-8 hover:transform hover:scale-105 transition-all duration-300"
              data-testid={`project-card-${project.id}`}
            >
              <div className="flex items-start gap-6 mb-6">
                <img 
                  src={project.avatar} 
                  alt={`${project.client} Avatar`} 
                  className={`w-16 h-16 rounded-full border-2 border-${project.color} object-cover`}
                  data-testid={`project-avatar-${project.id}`}
                />
                <div>
                  <h3 className={`text-2xl font-semibold text-${project.color} mb-2`} data-testid={`project-title-${project.id}`}>
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground mb-2" data-testid={`project-client-${project.id}`}>
                    Client: {project.client}
                  </p>
                  <div className="flex items-center gap-2 text-sm text-accent">
                    <i className="fas fa-clock"></i>
                    <span data-testid={`project-duration-${project.id}`}>Completed in {project.duration}</span>
                  </div>
                </div>
              </div>
              
              <p className="text-muted-foreground mb-6 leading-relaxed" data-testid={`project-description-${project.id}`}>
                {project.description}
              </p>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {project.technologies.map((tech, techIndex) => (
                  <span 
                    key={techIndex}
                    className={`bg-${project.color}/20 text-${project.color} px-3 py-1 rounded-full text-sm`}
                    data-testid={`project-tech-${project.id}-${techIndex}`}
                  >
                    {tech}
                  </span>
                ))}
              </div>
              
              <div className="bg-card/50 p-4 rounded-lg border border-border">
                <p className="text-sm text-muted-foreground italic" data-testid={`project-testimonial-${project.id}`}>
                  "{project.testimonial}"
                </p>
                <div className="text-right mt-2">
                  <span className={`text-${project.color} font-medium`} data-testid={`project-testimonial-author-${project.id}`}>
                    - {project.client}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
