import React from 'react';
import { motion } from 'framer-motion';
import { Rocket, Sparkles, ArrowRight } from 'lucide-react';
import content from '../content.json';

const DreamBuilder: React.FC = () => {
  const scrollToContact = (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById('contact');
    if (element) {
        const headerOffset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
        });
    }
  };

  return (
    <section className="py-24 relative overflow-hidden">


      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-slate-900/50 border border-brand-500/30 rounded-[2.5rem] p-8 md:p-16 relative overflow-hidden shadow-xl backdrop-blur-sm"
        >
          {/* Decorative Grid */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(56,189,248,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(56,189,248,0.03)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none"></div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="flex-1 text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-300 text-sm font-medium mb-6">
                <Rocket size={16} />
                <span>{content.dreamBuilder.slogan}</span>
              </div>
              
              <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                {content.dreamBuilder.title.split(' ').map((word, i) => (
                    <span key={i} className={i === 0 ? "text-brand-400" : ""}>{word} </span>
                ))}
              </h2>
              
              <p className="text-gray-400 text-lg leading-relaxed mb-8 max-w-xl">
                {content.dreamBuilder.description}
              </p>

              <button 
                onClick={scrollToContact}
                className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-slate-950 rounded-2xl font-bold text-lg transition-all hover:bg-brand-50 hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.2)]"
              >
                <span>{content.dreamBuilder.cta}</span>
                <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                <div className="absolute inset-0 rounded-2xl ring-2 ring-white/50 group-hover:ring-brand-400/50 transition-all"></div>
              </button>
            </div>

            {/* Visual Icon */}
            <div className="relative">
                <div className="absolute inset-0 bg-brand-500 blur-[60px] opacity-20"></div>
                <motion.div 
                    animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    className="relative w-64 h-64 md:w-80 md:h-80 bg-gradient-to-br from-slate-800 to-slate-900 rounded-[3rem] border border-slate-700 flex items-center justify-center shadow-2xl"
                >
                    <Sparkles className="text-brand-400 w-32 h-32" strokeWidth={1} />
                    
                    {/* Floating Cards */}
                    <motion.div 
                        animate={{ x: [0, 10, 0] }}
                        transition={{ duration: 4, repeat: Infinity, delay: 1 }}
                        className="absolute -right-8 top-12 bg-slate-800/90 backdrop-blur p-4 rounded-2xl border border-slate-600 shadow-xl"
                    >
                        <div className="h-2 w-16 bg-brand-500/50 rounded mb-2"></div>
                        <div className="h-2 w-8 bg-slate-600 rounded"></div>
                    </motion.div>

                    <motion.div 
                        animate={{ x: [0, -10, 0] }}
                        transition={{ duration: 5, repeat: Infinity, delay: 0.5 }}
                        className="absolute -left-6 bottom-16 bg-slate-800/90 backdrop-blur p-4 rounded-2xl border border-slate-600 shadow-xl"
                    >
                         <div className="flex gap-2">
                             <div className="w-8 h-8 rounded-full bg-accent-500/20"></div>
                             <div className="space-y-1">
                                <div className="h-2 w-12 bg-slate-500 rounded"></div>
                                <div className="h-2 w-20 bg-slate-600 rounded"></div>
                             </div>
                         </div>
                    </motion.div>
                </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default DreamBuilder;