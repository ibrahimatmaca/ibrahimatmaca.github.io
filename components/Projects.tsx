import React, { useState, useEffect } from 'react';
import { motion, Variants } from 'framer-motion';
import { ExternalLink, ArrowUpRight } from 'lucide-react';
import { Project } from '../types';
import content from '../content.json';

const projects: Project[] = content.projects.list;

interface iTunesResponse {
  resultCount: number;
  results: Array<{
    screenshotUrls?: string[];
    ipadScreenshotUrls?: string[];
    artworkUrl512?: string;
    artworkUrl100?: string;
    artworkUrl60?: string;
    trackName?: string;
    description?: string;
    formattedPrice?: string;
    price?: number;
    primaryGenreName?: string;
    averageUserRating?: number;
    userRatingCount?: number;
    contentAdvisoryRating?: string;
    releaseNotes?: string;
    version?: string;
  }>;
}

// App Store Icon - Modern Apple App Store icon
const AppStoreIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} height="1em" width="1em">
    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
  </svg>
);

interface AppStoreInfo {
  icon: string | null;
  screenshots: string[];
  name: string;
  price: string;
  genre: string;
  rating: number;
  ratingCount: number;
  contentRating: string;
}

const ProjectCard: React.FC<{ project: Project; index: number }> = ({ project, index }) => {
  const [appStoreInfo, setAppStoreInfo] = useState<AppStoreInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (project.appStoreId && typeof window !== 'undefined') {
      const fetchAppStoreData = async () => {
        try {
          setLoading(true);
          const isDev = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
          let fetchUrl: string;

          if (isDev) {
            fetchUrl = `/itunes-api/lookup?id=${project.appStoreId}&country=tr`;
          } else {
            const itunesUrl = `https://itunes.apple.com/lookup?id=${project.appStoreId}&country=tr`;
            fetchUrl = `https://corsproxy.io/?${encodeURIComponent(itunesUrl)}`;
          }
          
          const response = await fetch(fetchUrl);
          
          if (!response.ok) {
            throw new Error(`Request failed: ${response.status}`);
          }
           
          const data: iTunesResponse = await response.json();
          
          if (data.resultCount > 0 && data.results[0]) {
            const appData = data.results[0];
            const appScreenshots = appData.screenshotUrls || appData.ipadScreenshotUrls || [];
            const icon = appData.artworkUrl512 || appData.artworkUrl100 || appData.artworkUrl60 || null;
            
            setAppStoreInfo({
              icon,
              screenshots: appScreenshots,
              name: appData.trackName || project.title,
              price: appData.formattedPrice || (appData.price === 0 ? 'Free' : 'Paid'),
              genre: appData.primaryGenreName || '',
              rating: appData.averageUserRating || 0,
              ratingCount: appData.userRatingCount || 0,
              contentRating: appData.contentAdvisoryRating || '',
            });
          }
        } catch (error) {
          console.error('Failed to fetch App Store data:', error);
        } finally {
          setLoading(false);
        }
      };
      fetchAppStoreData();
    } else {
      setLoading(false);
    }
  }, [project.appStoreId]);

  const appIcon = appStoreInfo?.icon || null;

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
      className="group relative bg-slate-800/80 border border-slate-700/60 rounded-2xl overflow-hidden hover:border-brand-500/40 hover:shadow-xl hover:shadow-brand-500/10 transition-all duration-300 backdrop-blur-sm"
    >
      {loading ? (
        <div className="p-4 flex items-center justify-center h-32">
          <div className="animate-pulse text-slate-500 text-sm">Loading...</div>
        </div>
      ) : (
        <div className="flex gap-3 p-4">
          {/* App Icon - Left Side */}
          <div className="flex-shrink-0">
            {appIcon ? (
              <motion.img 
                src={appIcon}
                alt={appStoreInfo?.name || project.title}
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl shadow-lg"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              />
            ) : (
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-slate-800 flex items-center justify-center">
                <span className="text-slate-500 text-xs">No Icon</span>
              </div>
            )}
          </div>

          {/* App Info - Right Side */}
          <div className="flex-1 flex flex-col justify-between min-w-0">
            <div>
              {/* App Name */}
              <a 
                href={primaryLink} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="group/title block"
              >
                <h3 className="text-lg sm:text-xl font-bold text-white group-hover/title:text-brand-400 transition-colors duration-200 mb-1 truncate">
                  {appStoreInfo?.name || project.title}
                </h3>
              </a>

              {/* Subtitle/Genre */}
              {appStoreInfo?.genre && (
                <p className="text-xs sm:text-sm text-slate-400 mb-2">
                  {appStoreInfo.genre}
                </p>
              )}

              {/* Platform & Price Info */}
              <div className="flex items-center gap-2 text-xs text-slate-500 mb-3">
                <span>Only for iPhone</span>
                {appStoreInfo?.price && (
                  <>
                    <span>·</span>
                    <span>{appStoreInfo.price}</span>
                  </>
                )}
                {appStoreInfo?.contentRating && (
                  <>
                    <span>·</span>
                    <span>{appStoreInfo.contentRating}</span>
                  </>
                )}
              </div>

              {/* Rating */}
              {appStoreInfo?.rating && appStoreInfo.rating > 0 && (
                <div className="flex items-center gap-1 mb-3">
                  <span className="text-yellow-400 text-xs">★</span>
                  <span className="text-xs text-slate-400">
                    {appStoreInfo.rating.toFixed(1)}
                    {appStoreInfo.ratingCount > 0 && ` (${appStoreInfo.ratingCount})`}
                  </span>
                </div>
              )}
            </div>

            {/* App Store Button */}
            {project.appStoreUrl && (
              <a 
                href={project.appStoreUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 px-3 py-2 bg-black hover:bg-gray-900 text-white rounded-lg font-semibold text-sm transition-all duration-200 hover:scale-[1.02] w-full whitespace-nowrap"
              >
                <AppStoreIcon className="w-4 h-4 flex-shrink-0" /> 
                <span>View in App Store</span>
                <ArrowUpRight size={12} className="flex-shrink-0" />
              </a>
            )}
          </div>
        </div>
      )}
    </motion.div>
  );
};

const Projects: React.FC = () => {
  return (
    <section className="py-24 relative scroll-mt-24" id="projects">
      <div className="container mx-auto px-4">
        <div className="mb-12">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-white">{content.projects.title}</h2>
          <p className="text-gray-400 text-lg max-w-2xl">
             {content.projects.description}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
          {projects.map((p, idx) => (
            <ProjectCard key={p.id} project={p} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;