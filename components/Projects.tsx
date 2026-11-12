import React from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Project } from '../types';
import ProjectPlaceholder from './ProjectPlaceholder';
import InProgressBadge from './InProgressBadge';
import Reveal from './Reveal';
import SectionHeading from './SectionHeading';
import SpotlightCard from './SpotlightCard';
import { isInProgressProject, getProjectStoreUrl } from '../lib/projectUtils';
import { FINE_POINTER, useMediaQuery } from '../hooks/useMediaQuery';
import { useLanguage } from '../hooks/useLanguage';
import { fill } from '../lib/i18n';

const TILT_DEGREES = 3;
const TILT_SPRING = { stiffness: 180, damping: 20 };

const AppStoreIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} height="1em" width="1em" aria-hidden="true">
    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
  </svg>
);

const ProjectCard: React.FC<{ project: Project; index: number }> = ({ project, index }) => {
  const { t } = useLanguage();
  const appStoreInfo = project.appStoreCache;

  const isInProgress = isInProgressProject(project);
  const storeUrl = getProjectStoreUrl(project);
  const appIcon = appStoreInfo?.icon || (!isInProgress ? project.imageUrl : null);
  const appName = appStoreInfo?.name || project.title;

  // Pointer position inside the card, as 0 to 1 on each axis.
  const finePointer = useMediaQuery(FINE_POINTER);
  const pointerX = useMotionValue(0.5);
  const pointerY = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(pointerY, [0, 1], [TILT_DEGREES, -TILT_DEGREES]), TILT_SPRING);
  const rotateY = useSpring(useTransform(pointerX, [0, 1], [-TILT_DEGREES, TILT_DEGREES]), TILT_SPRING);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!finePointer) return;
    const rect = e.currentTarget.getBoundingClientRect();
    pointerX.set((e.clientX - rect.left) / rect.width);
    pointerY.set((e.clientY - rect.top) / rect.height);
  };

  const handleMouseLeave = () => {
    pointerX.set(0.5);
    pointerY.set(0.5);
  };

  const body = (
    <div className="relative flex gap-5 p-5 sm:p-7">
      <div className="relative flex-shrink-0">
        {appIcon && (
          <div aria-hidden="true" className="absolute inset-2 rounded-[22%] bg-tint/30 blur-2xl transition-opacity duration-300 group-hover:opacity-100" />
        )}
        {appIcon ? (
          <img
            src={appIcon}
            alt=""
            width={128}
            height={128}
            loading="lazy"
            className="relative h-24 w-24 rounded-[22%] shadow-xl sm:h-32 sm:w-32"
          />
        ) : (
          <ProjectPlaceholder title={project.title} className="h-24 w-24 sm:h-32 sm:w-32" />
        )}
      </div>

      <div className="flex min-w-0 flex-1 flex-col">
        {isInProgress && (
          <div className="mb-2">
            <InProgressBadge label={t.ui.inProgress} />
          </div>
        )}
        <h3 className="mb-1 line-clamp-2 text-xl font-bold text-ink transition-colors duration-200 group-hover:text-tint sm:text-2xl">
          {appName}
        </h3>

        {!isInProgress && (
          <div className="mb-2 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs text-ink-3">
            {appStoreInfo?.genre && <span>{appStoreInfo.genre}</span>}
            <span>{t.ui.onlyIphone}</span>
            {appStoreInfo?.price && <span>{appStoreInfo.price}</span>}
            {appStoreInfo?.contentRating && <span>{appStoreInfo.contentRating}</span>}
            {appStoreInfo && appStoreInfo.rating > 0 && (
              <span>
                <span className="text-amber-500" aria-hidden="true">★ </span>
                {appStoreInfo.rating.toFixed(1)}
                {appStoreInfo.ratingCount > 0 && ` (${appStoreInfo.ratingCount})`}
              </span>
            )}
          </div>
        )}

        <p className="mb-3 line-clamp-4 text-sm text-ink-2 sm:text-base">{project.description}</p>

        {project.tech.length > 0 && (
          <div className="mb-4 flex flex-wrap gap-1.5">
            {project.tech.slice(0, 4).map((tech) => (
              <span key={tech} className="rounded-full bg-raised px-2.5 py-1 text-xs text-ink-2">
                {tech}
              </span>
            ))}
          </div>
        )}

        {storeUrl && !isInProgress && (
          <div className="mt-auto flex min-h-11 w-full items-center justify-center gap-1.5 whitespace-nowrap rounded-xl bg-black px-3 py-2 text-sm font-semibold text-white">
            <AppStoreIcon className="h-4 w-4 flex-shrink-0" />
            <span>{t.ui.viewAppStore}</span>
            <ArrowUpRight size={14} className="flex-shrink-0" aria-hidden="true" />
          </div>
        )}
      </div>
    </div>
  );

  return (
    <Reveal delay={index * 0.08} className="h-full">
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={finePointer ? { rotateX, rotateY, transformPerspective: 900 } : undefined}
        className="h-full"
      >
        <SpotlightCard className="h-full transition-[border-color,box-shadow] duration-200 hover:border-tint/50 hover:shadow-xl hover:shadow-brand-500/10">
          {storeUrl ? (
            <a
              href={storeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="press block h-full"
              aria-label={
                isInProgress
                  ? fill(t.ui.openProject, { name: project.title })
                  : fill(t.ui.openInStore, { name: appName })
              }
            >
              {body}
            </a>
          ) : (
            body
          )}
        </SpotlightCard>
      </motion.div>
    </Reveal>
  );
};

const Projects: React.FC = () => {
  const { t } = useLanguage();
  const projects = t.projects.list as Project[];

  return (
    <section className="relative scroll-mt-24 py-16 md:py-24" id="projects">
      <div className="container mx-auto px-4">
        <SectionHeading kicker={t.projects.kicker} title={t.projects.title} description={t.projects.description} />

        <div className="grid grid-cols-1 gap-4 md:gap-6 xl:grid-cols-2">
          {projects.map((p, idx) => (
            <ProjectCard key={p.id} project={p} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
