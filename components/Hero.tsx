import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useScroll } from 'framer-motion';
import { ArrowDown, Github, Linkedin, Instagram } from 'lucide-react';
import content from '../content.json';
import { Project } from '../types';

const projects: Project[] = content.projects.list;

interface iTunesResponse {
  resultCount: number;
  results: Array<{
    artworkUrl512?: string;
    artworkUrl100?: string;
    artworkUrl60?: string;
    trackName?: string;
  }>;
}

// Minimal Project App Icon Component (Moved from Projects.tsx)
const ProjectAppIcon: React.FC<{ project: Project; index: number }> = ({ project, index }) => {
  const [iconUrl, setIconUrl] = useState<string | null>(null);
  const [appName, setAppName] = useState<string>(project.title);

  useEffect(() => {
    if (project.appStoreId && typeof window !== 'undefined') {
      const fetchAppStoreData = async () => {
        try {
          const isDev = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
          let fetchUrl: string;

          if (isDev) {
            fetchUrl = `/itunes-api/lookup?id=${project.appStoreId}&country=tr`;
          } else {
            const itunesUrl = `https://itunes.apple.com/lookup?id=${project.appStoreId}&country=tr`;
            fetchUrl = `https://corsproxy.io/?${encodeURIComponent(itunesUrl)}`;
          }
          
          const response = await fetch(fetchUrl);
          if (!response.ok) throw new Error('Failed');
           
          const data: iTunesResponse = await response.json();
          
          if (data.resultCount > 0 && data.results[0]) {
            const appData = data.results[0];
            const icon = appData.artworkUrl512 || appData.artworkUrl100 || appData.artworkUrl60 || null;
            setIconUrl(icon);
            setAppName(appData.trackName || project.title);
          }
        } catch (error) {
          // Silent fail, use default
        }
      };
      fetchAppStoreData();
    }
  }, [project.appStoreId, project.title]);

  const primaryLink = project.appStoreUrl || project.playStoreUrl || project.link;

  return (
    <a 
      href={primaryLink}
      target="_blank"
      rel="noopener noreferrer"
      className="flex flex-col items-center gap-2 group transition-transform duration-200 hover:scale-105"
    >
      <div className="relative w-[3.5rem] h-[3.5rem] xs:w-16 xs:h-16 sm:w-[4.5rem] sm:h-[4.5rem] bg-slate-800 rounded-[14px] sm:rounded-2xl shadow-lg border border-white/5 overflow-hidden">
        {iconUrl ? (
          <img 
            src={iconUrl} 
            alt={appName} 
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-700 to-slate-800">
             <span className="text-xl sm:text-2xl font-bold text-slate-500">
               {project.title.charAt(0)}
             </span>
          </div>
        )}
      </div>
      <span className="text-[10px] sm:text-xs text-white/90 font-medium text-center line-clamp-2 max-w-[4.5rem] leading-tight">
        {appName}
      </span>
    </a>
  );
};

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
        <div className="flex justify-center items-center h-[600px] sm:h-[680px] md:h-[720px] [perspective:1000px]">
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
            className="relative w-[300px] sm:w-[340px] md:w-[360px] h-[600px] sm:h-[680px] md:h-[720px]"
          >
            {/* Phone Body */}
            <div className="absolute inset-0 bg-slate-950 rounded-[3rem] border-8 border-slate-900 shadow-2xl overflow-hidden backface-hidden ring-1 ring-white/10"
              style={{ transform: "translateZ(20px)" }}
            >
              {/* Dynamic Island / Notch */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-7 bg-black rounded-b-2xl z-30 flex justify-center items-center gap-2">
                 <div className="w-16 h-4 bg-black rounded-full" />
              </div>

               {/* Status Bar (Simulated) */}
               <div className="absolute top-3 left-6 right-6 flex justify-between text-[10px] font-medium text-white z-20">
                 <span>9:41</span>
                 <div className="flex gap-1">
                    <div className="w-4 h-2.5 bg-white rounded-[2px]" />
                    <div className="w-0.5 h-2.5 bg-white rounded-[1px]" />
                 </div>
               </div>

              {/* Screen Content */}
              <div className="w-full h-full bg-slate-900 pt-16 pb-24 px-5 overflow-y-auto no-scrollbar relative flex flex-col">
                {/* Wallpaper Gradient Effect */}
                <div className="absolute inset-0 bg-gradient-to-b from-brand-900/20 to-transparent pointer-events-none" />
                
                {/* App Grid */}
                <div className="grid grid-cols-4 gap-x-4 gap-y-6 sm:gap-x-5 sm:gap-y-8 relative z-10">
                  {projects.map((p, idx) => (
                    <ProjectAppIcon key={p.id} project={p} index={idx} />
                  ))}
                </div>
                
                 {/* Bottom Progress Widget */}
                 <div className="mt-auto relative z-10 bg-slate-800/80 backdrop-blur-md rounded-2xl p-4 border border-white/5">
                  <div className="flex justify-between items-center mb-2">
                     <span className="text-xs text-slate-300 font-medium">Running build...</span>
                     <span className="text-xs text-brand-400 font-bold">98%</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-700/50 rounded-full overflow-hidden">
                     <motion.div 
                       className="h-full bg-brand-500 rounded-full"
                       initial={{ width: "0%" }}
                       whileInView={{ width: "98%" }}
                       transition={{ duration: 2, ease: "circOut" }}
                     />
                  </div>
                </div>
              </div>
              
              {/* Home Indicator */}
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-1/3 h-1 bg-white/20 rounded-full z-30" />
            </div>

            {/* Depth Layers for 3D Feel */}
            <div className="absolute inset-0 bg-slate-800 rounded-[3rem] -z-10" style={{ transform: "translateZ(0px)" }}></div>
            <div className="absolute inset-0 bg-slate-900 rounded-[3rem] -z-20" style={{ transform: "translateZ(-10px)" }}></div>
            <div className="absolute inset-0 bg-black/50 blur-xl rounded-[3rem] -z-30 translate-y-12" style={{ transform: "translateZ(-60px) scale(0.9)" }}></div>
          </motion.div>
          
          {/* Floating Elements - Hidden on Mobile */}
          <motion.div 
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="hidden md:flex absolute -right-16 top-1/4 bg-slate-900/80 backdrop-blur-md border border-slate-700/50 px-4 py-3 rounded-2xl shadow-xl z-50 items-center gap-3"
            style={{ transform: "translateZ(80px)" }}
          >
             <svg className="w-5 h-5 text-brand-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
             </svg>
             <span className="text-white font-medium text-sm">iOS & Android</span>
          </motion.div>

          <motion.div 
            animate={{ y: [0, 15, 0] }}
            transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
            className="hidden md:flex absolute -left-16 bottom-1/3 bg-slate-900/80 backdrop-blur-md border border-slate-700/50 px-4 py-3 rounded-2xl shadow-xl z-50 items-center gap-3"
            style={{ transform: "translateZ(80px)" }}
          >
             <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
             <span className="text-white font-medium text-sm">99.9% Crash Free</span>
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