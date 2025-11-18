import Navbar from "@/components/portfolio/navbar";
import Hero from "@/components/portfolio/hero";
import About from "@/components/portfolio/about";
import Projects from "@/components/portfolio/projects";
import Social from "@/components/portfolio/social";
import Contact from "@/components/portfolio/contact";
import Particles from "@/components/portfolio/particles";
import Snow from "@/components/portfolio/snow"; // Assuming Snow component is imported

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Particles />
      <Snow /> {/* Snowing effect added here */}
      <Navbar />
      <Hero />
      <About />
      <Projects />
      <Social />
      <Contact />

      {/* Footer */}
      <footer className="py-8 border-t border-border">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-muted-foreground">
            © 2024 PHV. Built with passion and code. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}