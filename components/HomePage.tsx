import React from 'react';
import Hero from './Hero';
import Projects from './Projects';
import Background from './Background';
import Contact from './Contact';
import About from './About';
import DreamBuilder from './DreamBuilder';
import { motion, useScroll, useTransform } from 'framer-motion';

const HomePage: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 80; // Account for fixed header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <div className="font-sans antialiased text-slate-200 selection:bg-brand-500/30 selection:text-brand-200 min-h-screen">
      <Background />
      
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-brand-500 origin-left z-50"
        style={{ scaleX }}
      />

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-40 bg-slate-950/50 backdrop-blur-md border-b border-white/5">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <a 
            href="#" 
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="text-xl font-bold font-mono tracking-tighter text-white cursor-pointer"
          >
            IBRAHIM<span className="text-brand-400">DEV</span>
          </a>
          <div className="hidden md:flex gap-8 text-sm font-medium text-gray-300">
            <a 
              href="#projects" 
              onClick={(e) => scrollToSection(e, 'projects')}
              className="hover:text-white transition-colors"
            >
              Work
            </a>
            <a 
              href="#about" 
              onClick={(e) => scrollToSection(e, 'about')}
              className="hover:text-white transition-colors"
            >
              About
            </a>
            <a 
              href="#contact" 
              onClick={(e) => scrollToSection(e, 'contact')}
              className="hover:text-white transition-colors"
            >
              Contact
            </a>
          </div>
        </div>
      </nav>

      <main className="relative">
        <Hero />
        
        <div className="relative z-10 space-y-24 pb-0">

          <DreamBuilder />

          <Projects />
          
          <About />

          <Contact />
          
          {/* Footer */}
          <footer className="py-8 text-center text-gray-500 text-sm border-t border-slate-900 bg-slate-950">
             <div className="container mx-auto px-4">
                <p>© {new Date().getFullYear()} İbrahim Atmaca. Built with React, Tailwind & Gemini AI.</p>
             </div>
          </footer>
        </div>
      </main>


    </div>
  );
};

export default HomePage;

