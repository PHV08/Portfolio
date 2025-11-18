import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

export default function Social() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const socialPlatforms = [
    {
      name: "GitHub",
      icon: "fab fa-github",
      color: "#333333",
      description: "Open source projects & code",
      href: "https://github.com/PHV08",
      testId: "social-github"
    },
    {
      name: "Discord",
      icon: "fab fa-discord",
      color: "#5865F2",
      description: "Active in developer communities",
      href: "https://discord.com/users/998202571560861706",
      testId: "social-discord"
    },
    {
      name: "Reddit",
      icon: "fab fa-reddit",
      color: "#FF4500",
      description: "Sharing knowledge & insights",
      href: "https://www.reddit.com/user/UNKNOWN_PHV/",
      testId: "social-reddit"
    },
    {
      name: "YouTube",
      icon: "fab fa-youtube",
      color: "#FF0000",
      description: "Educational programming content",
      href: "https://youtube.com/@phvdev04",
      testId: "social-youtube"
    }
  ];

  return (
    <section className="py-20 relative" ref={ref}>
      <div className="max-w-4xl mx-auto px-6 text-center">
        <motion.h2 
          initial={{ y: 50, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl font-bold gradient-text mb-8"
          data-testid="social-title"
        >
          Connect With Me
        </motion.h2>
        <motion.p 
          initial={{ y: 50, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl text-muted-foreground mb-12"
          data-testid="social-subtitle"
        >
          Find me across the web - let's connect and collaborate!
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {socialPlatforms.map((platform, index) => (
            <motion.a
              key={platform.name}
              href={platform.href}
              target={platform.href.startsWith('http') ? '_blank' : undefined}
              rel={platform.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              initial={{ y: 50, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.4 + index * 0.2 }}
              className="glass-effect p-8 rounded-xl hover:scale-105 transition-all duration-300 group"
              data-testid={platform.testId}
            >
              <div 
                className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300"
                style={{ color: platform.color }}
              >
                <i className={platform.icon}></i>
              </div>
              <h3 className="text-xl font-semibold mb-2" data-testid={`${platform.testId}-name`}>
                {platform.name}
              </h3>
              <p className="text-muted-foreground text-sm" data-testid={`${platform.testId}-description`}>
                {platform.description}
              </p>
            </motion.a>
          ))}
          {/* Add Donate button to social section */}
          <a 
            href="https://ko-fi.com/phv08/donate" 
            target="_blank" 
            rel="noopener noreferrer"
            className="social-link flex flex-col items-center gap-3 p-6 glass-effect rounded-xl hover:scale-105 transition-all duration-300"
            data-testid="social-donate"
          >
            <i className="fas fa-coffee text-4xl text-accent"></i>
            <span className="text-sm font-medium">Donate</span>
          </a>
        </div>
      </div>
    </section>
  );
}