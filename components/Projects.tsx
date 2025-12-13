import React, { useState, useEffect } from 'react';
import { motion, Variants } from 'framer-motion';
import { ExternalLink, ArrowUpRight } from 'lucide-react';
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
  const imageSource = appStoreData?.screenshotUrls?.[0] || project.imageUrl;

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
      className="group relative bg-slate-900/50 border border-slate-800/30 rounded-xl overflow-hidden hover:border-slate-700/50 transition-all duration-300 backdrop-blur-sm"
    >
      {/* Compact Image Preview */}
      <a 
        href={primaryLink} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="block relative h-40 sm:h-48 overflow-hidden bg-slate-950/50"
      >
        <motion.img 
          src={imageError ? project.imageUrl : imageSource}
          alt={project.title}
          onError={() => {
            if (!imageError) setImageError(true);
          }}
          className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        />
        
        {/* Minimal external link indicator */}
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <div className="bg-black/70 backdrop-blur-sm rounded-md p-1.5">
            <ArrowUpRight size={14} className="text-white" />
          </div>
        </div>
      </a>

      {/* Compact Content Section */}
      <div className="p-4">
        {/* Title and Tech Tags - Compact */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <a 
            href={primaryLink} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex-1 group/title"
          >
            <h3 className="text-base sm:text-lg font-semibold text-white group-hover/title:text-brand-400 transition-colors duration-200">
              {project.title}
            </h3>
          </a>
          <div className="flex flex-wrap gap-1.5">
            {project.tech.slice(0, 2).map(t => (
              <span key={t} className="text-[10px] font-medium px-2 py-0.5 rounded bg-slate-800/50 text-slate-300 border border-slate-700/30">
                {t}
              </span>
            ))}
          </div>
        </div>
        
        {/* Description - 120 chars max */}
        <p className="text-xs text-slate-400 leading-relaxed mb-4 line-clamp-2">
          {project.description.length > 120 
            ? project.description.substring(0, 120).trim() + '...'
            : project.description
          }
        </p>
        
        {/* Store Buttons - Compact */}
        <div className="flex gap-2">
          {project.appStoreUrl && (
            <a 
              href={project.appStoreUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-white hover:bg-gray-50 text-black rounded-lg font-medium text-xs transition-all duration-200 hover:scale-[1.02]"
            >
              <AppleLogo className="text-base" /> 
              <span>App Store</span>
            </a>
          )}
          
          {project.playStoreUrl && (
            <a 
              href={project.playStoreUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700/50 text-white rounded-lg font-medium text-xs transition-all duration-200 hover:scale-[1.02]"
            >
              <GooglePlayLogo className="text-base text-green-400" />
              <span>Play Store</span>
            </a>
          )}

          {!project.appStoreUrl && !project.playStoreUrl && (
            <a 
              href={project.link} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center justify-center gap-1.5 px-3 py-2 text-slate-300 hover:text-brand-400 transition-colors duration-200 text-xs font-medium"
            >
              <ExternalLink size={14} /> 
              <span>Visit</span>
            </a>
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
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-white">{content.projects.title}</h2>
            <div className="w-20 h-1 bg-brand-500 mb-4"></div>
            <p className="text-gray-400 max-w-xl">
               {content.projects.description}
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((p, idx) => (
            <ProjectCard key={p.id} project={p} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;