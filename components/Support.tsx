import React, { useState } from 'react';
import { Mail, Send, HelpCircle, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import Background from './Background';
import content from '../content.json';

const Support: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Construct Mailto Link
    const subject = encodeURIComponent(`Support Request: ${formState.subject} - from ${formState.name}`);
    const body = encodeURIComponent(
      `Name: ${formState.name}\nEmail: ${formState.email}\n\nMessage:\n${formState.message}`
    );
    
    const mailtoLink = `mailto:${content.contact.email}?subject=${subject}&body=${body}`;
    
    // Slight delay for visual feedback then open mail client
    setTimeout(() => {
        window.location.href = mailtoLink;
        setIsSubmitting(false);
        setFormState({ name: '', email: '', subject: '', message: '' });
    }, 800);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value
    });
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
        <section className="py-24 relative min-h-screen flex items-center">
          <div className="container mx-auto px-4 max-w-4xl w-full">
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="w-16 h-16 rounded-xl bg-slate-800 flex items-center justify-center text-brand-400 border border-slate-700">
                  <HelpCircle size={32} />
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-white">Support</h1>
              </div>
              <div className="w-20 h-1 bg-brand-500 mx-auto mb-6"></div>
              <p className="text-gray-400 text-lg leading-relaxed max-w-2xl mx-auto">
                Need help? Have a question or issue? Fill out the form below and we'll get back to you as soon as possible.
              </p>
            </div>

            {/* Support Form */}
            <div className="bg-slate-900 border border-slate-800 p-8 md:p-10 rounded-3xl shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-brand-500/20 transition-colors duration-500"></div>
              
              <form onSubmit={handleSubmit} className="relative z-10 space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-2">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all placeholder-gray-600"
                    placeholder="Your name"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formState.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all placeholder-gray-600"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-400 mb-2">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formState.subject}
                    onChange={handleChange}
                    required
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all placeholder-gray-600"
                    placeholder="What do you need help with?"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-2">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formState.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all placeholder-gray-600 resize-none"
                    placeholder="Please describe your question or issue in detail..."
                  ></textarea>
                </div>

                <div className="flex items-center gap-4 pt-2">
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <Mail size={16} />
                    <span>We'll respond via email</span>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-4 rounded-xl font-bold text-white flex items-center justify-center gap-2 transition-all ${
                    isSubmitting 
                      ? 'bg-slate-700' 
                      : 'bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-500 hover:to-brand-400 shadow-lg shadow-brand-500/25'
                  }`}
                >
                  {isSubmitting ? (
                    <span>Redirecting to Mail...</span>
                  ) : (
                    <>
                      Send Support Request <Send size={18} />
                    </>
                  )}
                </button>
              </form>
            </div>
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

export default Support;

