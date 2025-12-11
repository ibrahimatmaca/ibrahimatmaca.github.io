import React from 'react';
import { motion, Variants } from 'framer-motion';
import { ExternalLink, ArrowUpRight, Wifi, Battery, Signal, Bell } from 'lucide-react';
import { Project } from '../types';
import content from '../content.json';

const projects: Project[] = content.projects.list;

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
      className="group relative bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden hover:border-brand-500/30 transition-all duration-300 shadow-xl"
    >
      {/* Interactive Preview Area */}
      <a href={primaryLink} target="_blank" rel="noopener noreferrer" className="block relative h-72 overflow-hidden cursor-pointer bg-slate-950">
        
        {/* The Project Image */}
        <img 
          src={project.imageUrl} 
          alt={project.title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
        />

        {/* Live UI Overlay - Appears on Hover */}
        <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
           
           {/* Status Bar */}
           <div className="absolute top-0 w-full h-8 bg-black/40 backdrop-blur-sm flex justify-between px-6 items-center z-20">
              <div className="text-[10px] text-white font-mono font-bold">19:23</div>
              <div className="flex gap-1.5 items-center text-white">
                 <Signal size={10} fill="currentColor" />
                 <Wifi size={10} />
                 <Battery size={10} fill="currentColor" />
              </div>
           </div>

           {/* Simulated Notification Animation */}
           <div className="absolute top-12 left-0 right-0 px-4 z-20 overflow-hidden">
             <div className="transform -translate-y-24 group-hover:translate-y-0 transition-transform duration-500 delay-100 ease-out">
                <div className="bg-slate-900/90 backdrop-blur border border-slate-700 p-3 rounded-2xl shadow-xl flex items-center gap-3">
                   <div className="w-8 h-8 rounded-xl bg-brand-500 flex items-center justify-center shrink-0">
                      <Bell size={14} className="text-white fill-white" />
                   </div>
                   <div className="flex-1 min-w-0">
                      <div className="text-xs font-bold text-white">New Activity</div>
                      <div className="text-[10px] text-gray-300 truncate">Routine 'Morning Code' completed!</div>
                   </div>
                   <div className="text-[10px] text-gray-500">Now</div>
                </div>
             </div>
           </div>

           {/* Home Indicator */}
           <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-white/50 rounded-full z-20"></div>
           
           {/* Gradient Vignette */}
           <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-slate-900/30 z-10"></div>
        </div>

        {/* Static "Preview" Tag (Fades out on hover) */}
        <div className="absolute bottom-4 right-4 bg-black/40 backdrop-blur-md border border-white/10 px-3 py-1 rounded-full text-xs font-medium text-white flex items-center gap-1 group-hover:opacity-0 transition-opacity duration-300">
          Preview App <ArrowUpRight size={12} />
        </div>
      </a>

      <div className="p-8">
         <div className="flex flex-wrap gap-2 mb-4">
           {project.tech.map(t => (
             <span key={t} className="text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded bg-slate-800 text-brand-300 border border-slate-700">
               {t}
             </span>
           ))}
         </div>

         <a href={primaryLink} target="_blank" rel="noopener noreferrer" className="block group-hover:text-brand-400 transition-colors">
            <h3 className="text-2xl font-bold text-white mb-3">{project.title}</h3>
         </a>
         
         <p className="text-gray-400 text-sm leading-relaxed mb-8 border-l-2 border-slate-700 pl-4">
            {project.description}
         </p>
         
         {/* Store Buttons */}
         <div className="flex flex-col sm:flex-row gap-4 mt-auto">
           {project.appStoreUrl && (
             <a 
               href={project.appStoreUrl} 
               target="_blank" 
               rel="noopener noreferrer"
               className="flex-1 flex items-center justify-center gap-3 px-6 py-3 bg-white hover:bg-gray-100 text-black rounded-xl font-bold transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_25px_rgba(255,255,255,0.2)] transform hover:-translate-y-0.5"
             >
               <AppleLogo className="text-xl" /> 
               <div className="flex flex-col items-start leading-none">
                 <span className="text-[10px] uppercase font-medium text-gray-600">Download on the</span>
                 <span className="text-sm">App Store</span>
               </div>
             </a>
           )}
           
           {project.playStoreUrl && (
             <a 
               href={project.playStoreUrl} 
               target="_blank" 
               rel="noopener noreferrer"
               className="flex-1 flex items-center justify-center gap-3 px-6 py-3 bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-slate-600 text-white rounded-xl font-bold transition-all shadow-lg transform hover:-translate-y-0.5"
             >
               <GooglePlayLogo className="text-xl text-green-400" />
               <div className="flex flex-col items-start leading-none">
                 <span className="text-[10px] uppercase font-medium text-gray-400">Get it on</span>
                 <span className="text-sm">Google Play</span>
               </div>
             </a>
           )}

           {!project.appStoreUrl && !project.playStoreUrl && (
              <div className="flex gap-4">
                 <a href={project.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-white font-medium hover:text-brand-400 transition-colors">
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