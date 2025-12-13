import React, { useState, useEffect } from 'react';
import { motion, Variants, useMotionValue, useTransform } from 'framer-motion';
import { ExternalLink, ArrowUpRight, Wifi, Battery, Signal, Bell } from 'lucide-react';
import { Project } from '../types';
import content from '../content.json';

const projects: Project[] = content.projects.list;

interface AppStoreData {
  success: boolean;
  screenshotUrls?: string[];
  artworkUrl512?: string;
  description?: string;
}

// Custom SVGs for Logos
const AppleLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 384 512" fill="currentColor" className={className} height="1em" width="1em">
    <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5c0 66.2 23.9 149.4 58.5 202.7 17.2 26.5 42.6 54.3 68.8 54.3 26.1 0 34.6-17.6 67.5-17.6 33.5 0 41.5 17.6 67.5 17.6 28.1 0 55.1-32.3 71.3-58.4 8.7-13.8 24-40.4 25.1-42-57.1-23.7-64.4-96.6-44-161.4zM222 101.9c16.2-22.2 27.6-49.7 23.8-77.8-24.8 2.8-54.7 18.2-70.6 40.5-14.8 21.6-26.6 53.6-22.5 77.2 28.4 3.7 54-19.1 69.3-39.9z"/>
  </svg>
);

const GooglePlayLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 512 512" fill="currentColor" className={className} height="1em" width="1em">
    <path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z"/>
  </svg>
);

const ProjectCard: React.FC<{ project: Project; index: number }> = ({ project, index }) => {
  const [appStoreData, setAppStoreData] = useState<AppStoreData | null>(null);
  const [imageError, setImageError] = useState(false);
  const [currentScreenshotIndex, setCurrentScreenshotIndex] = useState(0);

  // Fetch App Store screenshots if appStoreId is available
  useEffect(() => {
    if (project.appStoreId && typeof window !== 'undefined') {
      const fetchAppStoreData = async () => {
        try {
          const response = await fetch(`/api/appstore-lookup?appId=${project.appStoreId}&country=tr`);
          if (response.ok) {
            const data = await response.json();
            setAppStoreData(data);
          }
        } catch (error) {
          console.error('Failed to fetch App Store data:', error);
        }
      };
      fetchAppStoreData();
    }
  }, [project.appStoreId]);

  // Determine image source: App Store screenshot > fallback imageUrl
  const imageSource = appStoreData?.screenshotUrls?.[currentScreenshotIndex] || project.imageUrl;
  const hasMultipleScreenshots = (appStoreData?.screenshotUrls?.length || 0) > 1;

  // Motion values for parallax effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useTransform(mouseY, [-0.5, 0.5], [2, -2]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-2, 2]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  // Rotate through screenshots on hover (only when hovering)
  const [isHovering, setIsHovering] = useState(false);
  const screenshotCount = appStoreData?.screenshotUrls?.length || 0;
  
  useEffect(() => {
    if (screenshotCount <= 1 || !isHovering) return;
    
    const interval = setInterval(() => {
      setCurrentScreenshotIndex((prev) => {
        const maxIndex = screenshotCount - 1;
        return prev < maxIndex ? prev + 1 : 0;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [screenshotCount, isHovering]);

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.5, 
        delay: index * 0.1, 
        ease: "easeOut" 
      } 
    }
  };

  // Determine primary link for the card click
  const primaryLink = project.appStoreUrl || project.playStoreUrl || project.link;

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="group relative bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 border border-slate-800/50 rounded-3xl overflow-hidden hover:border-brand-500/40 transition-all duration-500 shadow-2xl hover:shadow-brand-500/10"
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => {
        handleMouseLeave();
        setIsHovering(false);
      }}
      onMouseEnter={() => setIsHovering(true)}
    >
      {/* Sheen effect on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-30">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent transform -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
      </div>

      {/* Interactive Preview Area */}
      <a 
        href={primaryLink} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="block relative h-72 overflow-hidden cursor-pointer bg-gradient-to-br from-slate-950 to-black"
      >
        {/* iPhone Frame Effect - Only show if we have App Store screenshots */}
        {appStoreData?.screenshotUrls && appStoreData.screenshotUrls.length > 0 && (
          <div className="absolute inset-4 rounded-[2.5rem] border-2 border-white/10 bg-black/20 backdrop-blur-sm z-10 pointer-events-none">
            {/* Notch */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-black rounded-b-2xl border-x border-b border-white/10"></div>
          </div>
        )}
        
        {/* The Project Image / Screenshot */}
        <motion.img 
          src={imageError ? project.imageUrl : imageSource}
          alt={project.title}
          onError={() => {
            if (!imageError) setImageError(true);
          }}
          className={`absolute inset-0 w-full h-full ${
            appStoreData?.screenshotUrls && appStoreData.screenshotUrls.length > 0
              ? 'object-contain' 
              : 'object-cover'
          }`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          style={{
            scale: appStoreData?.screenshotUrls && appStoreData.screenshotUrls.length > 0 ? 1 : 1.05,
          }}
        />

        {/* Gradient overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent z-5"></div>

        {/* Live UI Overlay - Refined for modern look */}
        <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20">
           
           {/* Status Bar - More subtle */}
           <div className="absolute top-0 w-full h-7 bg-black/30 backdrop-blur-md flex justify-between px-5 items-center border-b border-white/5">
              <div className="text-[9px] text-white/90 font-mono font-semibold">9:41</div>
              <div className="flex gap-1 items-center text-white/90">
                 <Signal size={9} fill="currentColor" />
                 <Wifi size={9} />
                 <Battery size={9} fill="currentColor" />
              </div>
           </div>

           {/* Notification - More refined */}
           <div className="absolute top-10 left-0 right-0 px-4 overflow-hidden">
             <motion.div 
               initial={{ y: -20, opacity: 0 }}
               animate={{ y: 0, opacity: 1 }}
               transition={{ delay: 0.2, duration: 0.4 }}
               className="bg-slate-900/95 backdrop-blur-md border border-slate-700/50 p-2.5 rounded-xl shadow-xl flex items-center gap-2.5"
             >
               <div className="w-7 h-7 rounded-lg bg-brand-500/90 flex items-center justify-center shrink-0">
                  <Bell size={12} className="text-white fill-white" />
               </div>
               <div className="flex-1 min-w-0">
                  <div className="text-[10px] font-bold text-white">New Activity</div>
                  <div className="text-[9px] text-gray-300 truncate">Routine completed!</div>
               </div>
               <div className="text-[9px] text-gray-400">Now</div>
             </motion.div>
           </div>

           {/* Home Indicator - More subtle */}
           <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-28 h-1 bg-white/30 rounded-full"></div>
        </div>

        {/* Screenshot indicator dots (if multiple screenshots) */}
        {hasMultipleScreenshots && appStoreData?.screenshotUrls && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-20">
            {appStoreData.screenshotUrls.map((_, idx) => (
              <div
                key={idx}
                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                  idx === currentScreenshotIndex 
                    ? 'bg-brand-400 w-4' 
                    : 'bg-white/30'
                }`}
              />
            ))}
          </div>
        )}

        {/* Static "Preview" Tag - More refined */}
        <div className="absolute bottom-4 right-4 bg-black/50 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-full text-[10px] font-medium text-white/90 flex items-center gap-1.5 group-hover:opacity-0 transition-opacity duration-300 z-20">
          Preview <ArrowUpRight size={10} />
        </div>
      </a>

      <div className="p-8 relative z-10">
         <div className="flex flex-wrap gap-2 mb-5">
           {project.tech.map(t => (
             <span key={t} className="text-[10px] uppercase tracking-wider font-bold px-2.5 py-1 rounded-lg bg-slate-800/80 text-brand-300 border border-slate-700/50 backdrop-blur-sm">
               {t}
             </span>
           ))}
         </div>

         <a href={primaryLink} target="_blank" rel="noopener noreferrer" className="block group-hover:text-brand-400 transition-colors duration-300">
            <h3 className="text-2xl font-bold text-white mb-3 group-hover:translate-x-1 transition-transform duration-300">{project.title}</h3>
         </a>
         
         <p className="text-gray-400 text-sm leading-relaxed mb-8 border-l-2 border-brand-500/30 pl-4">
            {project.description}
         </p>
         
         {/* Store Buttons */}
         <div className="flex flex-col sm:flex-row gap-4 mt-auto">
           {project.appStoreUrl && (
             <motion.a 
               href={project.appStoreUrl} 
               target="_blank" 
               rel="noopener noreferrer"
               className="flex-1 flex items-center justify-center gap-3 px-6 py-3.5 bg-white hover:bg-gray-50 text-black rounded-xl font-bold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
               whileHover={{ scale: 1.02 }}
               whileTap={{ scale: 0.98 }}
             >
               <AppleLogo className="text-xl" /> 
               <div className="flex flex-col items-start leading-none">
                 <span className="text-[10px] uppercase font-medium text-gray-600">Download on the</span>
                 <span className="text-sm">App Store</span>
               </div>
             </motion.a>
           )}
           
           {project.playStoreUrl && (
             <motion.a 
               href={project.playStoreUrl} 
               target="_blank" 
               rel="noopener noreferrer"
               className="flex-1 flex items-center justify-center gap-3 px-6 py-3.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-slate-600 text-white rounded-xl font-bold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
               whileHover={{ scale: 1.02 }}
               whileTap={{ scale: 0.98 }}
             >
               <GooglePlayLogo className="text-xl text-green-400" />
               <div className="flex flex-col items-start leading-none">
                 <span className="text-[10px] uppercase font-medium text-gray-400">Get it on</span>
                 <span className="text-sm">Google Play</span>
               </div>
             </motion.a>
           )}

           {!project.appStoreUrl && !project.playStoreUrl && (
              <div className="flex gap-4">
                 <a href={project.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-white font-medium hover:text-brand-400 transition-colors duration-300">
                    <ExternalLink size={20} /> Visit Project
                 </a>
              </div>
           )}
         </div>
      </div>
    </motion.div>
  );
};

const Projects: React.FC = () => {
  return (
    <section className="py-24 relative scroll-mt-24" id="projects">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">{content.projects.title}</h2>
            <div className="w-20 h-1 bg-brand-500 mb-4"></div>
            <p className="text-gray-400 max-w-xl">
               {content.projects.description}
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 gap-8">
          {projects.map((p, idx) => (
            <ProjectCard key={p.id} project={p} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;