import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useScroll } from 'framer-motion';
import { ArrowDown, Github, Linkedin, Smartphone, Instagram } from 'lucide-react';
import content from '../content.json';

const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();

  // Parallax Effects
  const textY = useTransform(scrollY, [0, 500], [0, 150]);
  const phoneY = useTransform(scrollY, [0, 500], [0, -50]);
  const scrollIndicatorOpacity = useTransform(scrollY, [0, 100], [1, 0]);
  
  // 3D Mouse Movement Logic
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const mouseXSpring = useSpring(x, { stiffness: 100, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 100, damping: 20 });
  
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [15, -15]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [-15, 15]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const socialLinks = [
    { Icon: Github, href: "https://github.com/ibrahimatmaca" },
    { Icon: Linkedin, href: "https://www.linkedin.com/in/ibrahimatmaca" },
    { Icon: Instagram, href: "https://www.instagram.com/com.ibrahimatmaca" }
  ];

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden pt-20"
    >
      <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-6 md:gap-12 items-center">
        
        {/* Text Content */}
        <motion.div 
          style={{ y: textY }}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="z-10 text-left"
        >
          <div className="flex items-center gap-2 mb-4">
            <span className="w-12 h-[1px] bg-brand-400"></span>
            <span className="text-brand-400 tracking-widest text-sm font-mono uppercase">{content.hero.label}</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 font-sans bg-clip-text text-transparent bg-gradient-to-r from-white via-brand-100 to-brand-400">
            {content.hero.title}
          </h1>
          <h2 className="text-xl sm:text-2xl md:text-3xl text-gray-400 mb-8 font-light" dangerouslySetInnerHTML={{ __html: content.hero.subtitle.replace("Mobile Engineer", '<span class="text-brand-400 font-semibold">Mobile Engineer</span>') }}>
          </h2>
          <p className="text-gray-400 max-w-lg mb-8 leading-relaxed">
            {content.hero.description}
          </p>
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
            <a href="#projects" className="bg-brand-500 hover:bg-brand-600 text-white px-6 sm:px-8 py-3 rounded-full font-medium transition-all shadow-lg shadow-brand-500/25">
              {content.hero.cta}
            </a>
            <div className="flex gap-3 sm:gap-4">
              {socialLinks.map(({ Icon, href }, idx) => (
                <a 
                  key={idx} 
                  href={href} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-slate-800/50 hover:bg-slate-700 text-gray-300 hover:text-white transition-colors border border-slate-700"
                >
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>
        </motion.div>

        {/* 3D Phone Mockup */}
        <div className="flex justify-center items-center h-[400px] sm:h-[450px] md:h-[500px] [perspective:1000px]">
          <motion.div
            style={{ 
              rotateX, 
              rotateY,
              y: phoneY,
              transformStyle: "preserve-3d"
            }}
            initial={{ opacity: 0, scale: 0.8, rotateZ: -5 }}
            animate={{ opacity: 1, scale: 1, rotateZ: 0 }}
            transition={{ duration: 1, type: "spring", bounce: 0.4 }}
            className="relative w-[200px] sm:w-[240px] md:w-[280px] h-[400px] sm:h-[480px] md:h-[560px]"
          >
            {/* Phone Body */}
            <div className="absolute inset-0 bg-slate-900 rounded-[3rem] border-8 border-slate-800 shadow-2xl overflow-hidden backface-hidden"
              style={{ transform: "translateZ(20px)" }}
            >
              {/* Screen Content */}
              <div className="absolute inset-0 bg-gradient-to-b from-slate-900 to-slate-950 flex flex-col overflow-hidden">
                {/* Status Bar */}
                <div className="h-8 w-full flex justify-between px-6 items-center pt-2">
                  <div className="text-[10px] text-white font-mono">{content.hero.status.time}</div>
                  <div className="flex gap-1">
                    <div className="w-3 h-3 rounded-full bg-white/20"></div>
                    <div className="w-3 h-3 rounded-full bg-white/20"></div>
                  </div>
                </div>
                
                {/* App UI */}
                <div className="p-6 flex-1 flex flex-col gap-4">
                   <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-400 to-accent-600 mb-4 shadow-lg shadow-brand-500/20"></div>
                   <div className="space-y-2">
                     <div className="h-6 w-3/4 bg-slate-800 rounded animate-pulse"></div>
                     <div className="h-4 w-1/2 bg-slate-800/60 rounded animate-pulse"></div>
                   </div>
                   
                   <div className="mt-8 grid grid-cols-2 gap-3">
                     {[1,2,3,4].map(i => (
                       <div key={i} className="aspect-square rounded-2xl bg-slate-800/40 border border-slate-700/50 p-3 relative overflow-hidden group">
                         <div className="absolute inset-0 bg-brand-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                         <div className="w-8 h-8 rounded-full bg-slate-700 mb-2"></div>
                         <div className="h-2 w-12 bg-slate-700/50 rounded"></div>
                       </div>
                     ))}
                   </div>
                   
                   <div className="mt-auto bg-slate-800/80 backdrop-blur-md rounded-2xl p-4 border border-slate-700">
                      <div className="flex justify-between items-center text-xs text-gray-400 font-mono">
                         <span>{content.hero.status.build}</span>
                         <span className="text-green-400">98%</span>
                      </div>
                      <div className="w-full h-1 bg-slate-700 mt-2 rounded-full overflow-hidden">
                        <div className="h-full bg-brand-400 w-[98%]"></div>
                      </div>
                   </div>
                </div>
              </div>
            </div>

            {/* Depth Layers for 3D Feel */}
            <div className="absolute inset-0 bg-slate-700 rounded-[3rem] -z-10" style={{ transform: "translateZ(0px)" }}></div>
            <div className="absolute inset-0 bg-slate-800 rounded-[3rem] -z-20" style={{ transform: "translateZ(-10px)" }}></div>
            <div className="absolute inset-0 bg-black/50 blur-xl rounded-[3rem] -z-30 translate-y-12" style={{ transform: "translateZ(-60px) scale(0.9)" }}></div>
            


          </motion.div>
          {/* Floating Elements - Hidden on Mobile */}
          <motion.div 
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="hidden md:block absolute -right-12 top-20 bg-slate-800/90 backdrop-blur border border-slate-600 p-3 rounded-xl shadow-xl z-50"
            style={{ transform: "translateZ(80px)" }}
          >
            <div className="flex items-center gap-3">
              <Smartphone className="text-brand-400" size={20} />
              <span className="text-sm font-semibold text-white">{content.hero.status.platform}</span>
            </div>
          </motion.div>

          <motion.div 
            animate={{ y: [0, 15, 0] }}
            transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
            className="hidden md:block absolute -left-12 bottom-40 bg-slate-800/90 backdrop-blur border border-slate-600 p-3 rounded-xl shadow-xl z-50"
            style={{ transform: "translateZ(80px)" }}
          >
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              <span className="text-sm font-semibold text-white">{content.hero.status.stability}</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        style={{ opacity: scrollIndicatorOpacity }}
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-gray-500"
      >
        <ArrowDown size={24} />
      </motion.div>
    </section>
  );
};

export default Hero;