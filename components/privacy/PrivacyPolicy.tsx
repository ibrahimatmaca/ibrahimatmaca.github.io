import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Background from '../Background';

interface PrivacyPolicyProps {
  title: string;
  htmlContent: string;
}

const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({ title, htmlContent }) => {
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
        <div className="container mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link 
            to="/" 
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-xl font-bold font-mono tracking-tighter text-white cursor-pointer"
          >
            IBRAHIM<span className="text-brand-400">DEV</span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-8 text-sm font-medium text-gray-300">
            <Link 
              to="/#projects" 
              className="hover:text-white transition-colors"
            >
              Work
            </Link>
            <Link 
              to="/#about" 
              className="hover:text-white transition-colors"
            >
              About
            </Link>
            <Link 
              to="/#contact" 
              className="hover:text-white transition-colors"
            >
              Contact
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-gray-300 hover:text-white transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm md:hidden z-30"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          
          {/* Slide-in Menu */}
          <div className="fixed top-16 right-0 bottom-0 w-64 bg-slate-950/95 backdrop-blur-md border-l border-white/5 md:hidden z-30">
            <div className="flex flex-col gap-2 p-6">
              <Link 
                to="/#projects" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-lg font-medium text-gray-300 hover:text-white transition-colors py-3 px-4 rounded-lg hover:bg-slate-800/50"
              >
                Work
              </Link>
              <Link 
                to="/#about" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-lg font-medium text-gray-300 hover:text-white transition-colors py-3 px-4 rounded-lg hover:bg-slate-800/50"
              >
                About
              </Link>
              <Link 
                to="/#contact" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-lg font-medium text-gray-300 hover:text-white transition-colors py-3 px-4 rounded-lg hover:bg-slate-800/50"
              >
                Contact
              </Link>
            </div>
          </div>
        </>
      )}

      <main className="relative pt-20">
        <section className="py-24 relative min-h-screen">
          <div className="container mx-auto px-4 max-w-4xl w-full">
            {/* Title */}
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">{title}</h1>
              <div className="w-20 h-1 bg-brand-500 mx-auto"></div>
            </div>

            {/* HTML Content Container */}
            <div 
              className="bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl p-8 md:p-12 max-w-none
                [&_h1]:hidden
                [&_h2]:text-white [&_h2]:text-3xl [&_h2]:md:text-4xl [&_h2]:font-bold [&_h2]:mt-12 [&_h2]:mb-6 [&_h2]:leading-tight [&_h2]:border-b [&_h2]:border-slate-700 [&_h2]:pb-3 [&_h2]:first:mt-0
                [&_h3]:text-white [&_h3]:text-xl [&_h3]:md:text-2xl [&_h3]:font-semibold [&_h3]:mt-8 [&_h3]:mb-4 [&_h3]:leading-tight
                [&_h5]:text-white [&_h5]:text-xl [&_h5]:md:text-2xl [&_h5]:font-semibold [&_h5]:mt-8 [&_h5]:mb-4 [&_h5]:leading-tight [&_h5]:border-b [&_h5]:border-slate-700 [&_h5]:pb-2
                [&_p]:text-gray-300 [&_p]:leading-relaxed [&_p]:mb-6 [&_p]:text-base [&_p]:md:text-lg
                [&_ul]:text-gray-300 [&_ul]:mb-8 [&_ul]:space-y-3 [&_ul]:list-disc [&_ul]:list-inside [&_ul]:ml-4 [&_ul]:md:ml-6
                [&_li]:text-gray-300 [&_li]:mb-2 [&_li]:leading-relaxed [&_li]:text-base [&_li]:md:text-lg
                [&_strong]:text-white [&_strong]:font-semibold
                [&_em]:text-gray-400 [&_em]:italic
                [&_a]:text-brand-400 [&_a]:no-underline [&_a]:hover:text-brand-300 [&_a]:transition-colors"
              dangerouslySetInnerHTML={{ __html: htmlContent }}
            />
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 text-center text-gray-500 text-sm border-t border-slate-900 bg-slate-950">
          <div className="container mx-auto px-4">
            <p>© {new Date().getFullYear()} İbrahim Atmaca. Built with React, Tailwind & Gemini AI.</p>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default PrivacyPolicy;

