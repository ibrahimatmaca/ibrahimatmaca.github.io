import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion, useMotionValueEvent, useScroll, useSpring, useTransform } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Project } from '../types';
import AppIcon from './AppIcon';
import InProgressBadge from './InProgressBadge';
import Stage3D from './Stage3D';
import SectionHeading from './SectionHeading';
import Reveal from './Reveal';
import { isInProgressProject, getProjectStoreUrl } from '../lib/projectUtils';
import { buildStageIcons, type StageIcon } from '../lib/stageIcons';
import { scrollToId } from '../lib/scroll';
import { DESKTOP, useMediaQuery } from '../hooks/useMediaQuery';
import { useLanguage } from '../hooks/useLanguage';
import { fill } from '../lib/i18n';

const SCROLL_SPRING = { stiffness: 120, damping: 28, mass: 0.4 };

const AppStoreIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} height="1em" width="1em" aria-hidden="true">
    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
  </svg>
);

/** Text block of one project. Always in the DOM, so nothing lives only in 3D. */
const ProjectInfo: React.FC<{ project: Project }> = ({ project }) => {
  const { t } = useLanguage();
  const cache = project.appStoreCache;
  const inProgress = isInProgressProject(project);
  const storeUrl = getProjectStoreUrl(project);
  const name = cache?.name ?? project.title;
  const platform = [cache?.genre, t.ui.onlyIphone, cache?.price].filter(Boolean).join(' · ');

  return (
    <div className="max-w-[40rem]">
      {inProgress && (
        <div className="mb-4">
          <InProgressBadge label={t.ui.inProgress} />
        </div>
      )}
      <h3 className="font-display text-[1.75rem] font-medium leading-[1.15] tracking-[-0.01em] text-ink">{name}</h3>
      {!inProgress && <p className="mt-2 font-mono text-[0.8125rem] leading-[1.4] text-ink-3">{platform}</p>}
      <p className="mt-4 line-clamp-3 text-[1.0625rem] leading-[1.6] text-ink-2">{project.description}</p>
      {storeUrl && !inProgress && (
        <a
          href={storeUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={fill(t.ui.openInStore, { name })}
          className="btn btn-secondary press mt-6"
        >
          <AppStoreIcon className="h-4 w-4 shrink-0" />
          {t.ui.viewAppStore}
          <ArrowUpRight size={16} aria-hidden="true" />
        </a>
      )}
    </div>
  );
};

/**
 * Static CSS tilt of an icon, the poster for a project when 3D is off.
 * The icon is sized as a share of the stage height (see ICON_SHARE), so the poster and the 3D tile frame alike.
 */
const ICON_SHARE = 'h-[54%] aspect-square';
const TiltedIcon: React.FC<{ project: Project; sizeClass?: string; shadow?: boolean }> = ({
  project,
  sizeClass = ICON_SHARE,
  shadow = true,
}) => {
  const cache = project.appStoreCache;
  return (
    <div aria-hidden="true" className="css3d-stage absolute inset-0 flex items-center justify-center">
      <div className={sizeClass} style={{ transform: 'rotateY(-8deg) rotateX(3deg)', transformStyle: 'preserve-3d' }}>
        <AppIcon
          src={cache?.icon ?? (!isInProgressProject(project) ? project.imageUrl : null)}
          name={cache?.name ?? project.title}
          muted={isInProgressProject(project)}
          className={`h-full w-full ${shadow ? 'shadow-float' : ''}`}
        />
      </div>
    </div>
  );
};

/** Calm stage behind a tile: a faint radial tone, the icon's own colour blurred at low opacity, and a soft ground shadow. */
const TileBackdrop: React.FC<{ project: Project }> = ({ project }) => {
  const cache = project.appStoreCache;
  const src = cache?.icon ?? (!isInProgressProject(project) ? project.imageUrl : null);
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0">
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 60% 70% at 50% 46%, rgb(var(--raised) / 0.9), transparent 75%)' }} />
      {src && !isInProgressProject(project) && (
        <img
          src={src}
          alt=""
          className="absolute left-1/2 top-1/2 h-[70%] w-auto aspect-square -translate-x-1/2 -translate-y-1/2 opacity-[0.16] blur-3xl saturate-150 dark:opacity-[0.14]"
        />
      )}
      <div
        className="absolute left-1/2 top-[79%] h-[5%] w-[34%] -translate-x-1/2 rounded-[50%] bg-black/30 blur-xl"
      />
    </div>
  );
};

/** Scene spec for one project on its own, so the mobile canvas draws a single tile over its own scroll slice. */
const MobileStage: React.FC<{ project: Project; icon: StageIcon; target: React.RefObject<HTMLElement | null>; poster: React.ReactNode }> = ({
  icon,
  target,
  poster,
}) => {
  const { scrollYProgress } = useScroll({ target, offset: ['start end', 'end start'] });
  const progress = useSpring(scrollYProgress, SCROLL_SPRING);
  const spec = useMemo(() => ({ kind: 'projects' as const, icons: [icon] }), [icon]);
  return <Stage3D spec={spec} progress={progress} poster={poster} margin="40%" className="h-full w-full" />;
};

/**
 * Below 1024px: a 16:10 box per project. Only the project nearest the viewport centre mounts a canvas,
 * so there is never more than one WebGL context. The others keep the static icon.
 */
const MobileTile: React.FC<{ project: Project; icon: StageIcon; active: boolean; register: (node: HTMLElement | null, id: string) => void }> = ({
  project,
  icon,
  active,
  register,
}) => {
  const { t } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  const poster = <TiltedIcon project={project} shadow={false} />;
  const name = icon.name;

  return (
    <div
      ref={(node) => {
        ref.current = node;
        register(node, project.id);
      }}
      className="relative mb-8 aspect-[16/10] max-h-[48svh] w-full overflow-hidden rounded-3xl bg-canvas"
    >
      <TileBackdrop project={project} />
      {active ? <MobileStage project={project} icon={icon} target={ref} poster={poster} /> : <div className="absolute inset-0">{poster}</div>}
      {icon.href && !icon.inProgress && (
        <a
          href={icon.href}
          target="_blank"
          rel="noopener noreferrer"
          tabIndex={-1}
          aria-hidden="true"
          title={fill(t.ui.openInStore, { name })}
          className="absolute inset-0"
        />
      )}
    </div>
  );
};

/**
 * One article of the desktop stack. Its text parks under the pinned 3D stage while the stage shows this
 * project, then fades out before it can slide behind the tile.
 */
const StackArticle: React.FC<{ project: Project; index: number }> = ({ project, index }) => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const opacity = useTransform(scrollYProgress, [0.04, 0.14, 0.5, 0.58], [0, 1, 1, 0]);

  return (
    <article
      ref={ref}
      id={`project-${project.id}`}
      aria-label={project.appStoreCache?.name ?? project.title}
      data-index={index}
      className="pointer-events-none relative min-h-[100svh]"
    >
      <motion.div style={{ opacity }} className="pointer-events-auto sticky top-[calc(6rem+52svh+2rem)]">
        <ProjectInfo project={project} />
      </motion.div>
    </article>
  );
};

const Projects: React.FC = () => {
  const { t } = useLanguage();
  const desktop = useMediaQuery(DESKTOP);
  const projects = t.projects.list as Project[];
  const listRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({ target: listRef, offset: ['start 68%', 'end 68%'] });
  const progress = useSpring(scrollYProgress, SCROLL_SPRING);
  useMotionValueEvent(scrollYProgress, 'change', (value: number) => {
    setActive(Math.min(projects.length - 1, Math.max(0, Math.floor(value * projects.length))));
  });

  const stageIcons = useMemo(
    () => buildStageIcons(projects, []).filter((icon) => icon.id.startsWith('project-')),
    [projects],
  );
  // The stage and the list must agree on order, and buildStageIcons sorts. Look projects up by id.
  const ordered = useMemo(
    () => stageIcons.map((icon) => projects.find((project) => `project-${project.id}` === icon.id) as Project),
    [stageIcons, projects],
  );
  const spec = useMemo(() => ({ kind: 'projects' as const, icons: stageIcons }), [stageIcons]);
  const [mobileActive, setMobileActive] = useState<string | null>(null);
  const tileNodes = useRef(new Map<string, HTMLElement>());
  const observer = useRef<IntersectionObserver | null>(null);
  const registerTile = (node: HTMLElement | null, id: string) => {
    const known = tileNodes.current.get(id);
    if (known === node) return;
    if (known) observer.current?.unobserve(known);
    if (node) {
      node.dataset.projectId = id;
      tileNodes.current.set(id, node);
      observer.current?.observe(node);
    } else tileNodes.current.delete(id);
  };
  useEffect(() => {
    if (desktop) return;
    // A band around the viewport centre decides which single tile owns the canvas.
    const io = new IntersectionObserver(
      (entries) => {
        const hit = entries.filter((entry) => entry.isIntersecting).pop();
        if (hit) setMobileActive((hit.target as HTMLElement).dataset.projectId ?? null);
      },
      { rootMargin: '-30% 0px -30% 0px' },
    );
    observer.current = io;
    tileNodes.current.forEach((node) => io.observe(node));
    return () => {
      io.disconnect();
      observer.current = null;
    };
  }, [desktop]);
  const current = ordered[Math.min(active, ordered.length - 1)];
  const currentIcon = stageIcons[Math.min(active, stageIcons.length - 1)];

  return (
    <section id="projects" aria-labelledby="projects-title" className="relative scroll-mt-24 bg-surface py-[clamp(6rem,12vw,10rem)]">
      <div className="mx-auto w-full max-w-[80rem] px-4 sm:px-6 lg:px-10">
        {projects.length === 0 ? (
          <>
            <SectionHeading index="02" kicker={t.projects.kicker} title={t.projects.title} titleId="projects-title" />
            <p className="text-[1.0625rem] text-ink-2">{t.projects.empty}</p>
            <a href="https://github.com/ibrahimatmaca" target="_blank" rel="noopener noreferrer" className="text-link mt-2">
              {t.footer.github}
            </a>
          </>
        ) : desktop ? (
          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-4 self-start lg:sticky lg:top-28">
              <Reveal>
                <p className="mb-5 flex items-center gap-3 font-mono text-[0.8125rem] font-medium uppercase leading-[1.2] tracking-[0.08em] text-ink-3">
                  <span className="text-tint">02</span>
                  <span>{t.projects.kicker}</span>
                </p>
                <h2 id="projects-title" className="font-display text-[clamp(2.25rem,1.4rem+3.6vw,4.5rem)] font-medium leading-[1.02] tracking-[-0.02em] text-ink">
                  {t.projects.title}
                </h2>
                <p className="mt-6 text-[1.0625rem] leading-[1.6] text-ink-2">{t.projects.description}</p>
              </Reveal>

              <nav aria-label={t.projects.indexLabel} className="mt-10">
                <ul className="font-mono text-[0.8125rem] leading-[1.2]">
                  {ordered.map((project, index) => (
                    <li key={project.id}>
                      <button
                        type="button"
                        onClick={() => scrollToId(`project-${project.id}`)}
                        aria-current={index === active ? 'true' : undefined}
                        className={`flex min-h-11 w-full items-center gap-3 border-t border-line text-left transition-colors duration-150 ${
                          index === active ? 'text-ink' : 'text-ink-3 hover:text-ink'
                        }`}
                      >
                        <span aria-hidden="true" className={`h-2 w-2 rounded-full ${index === active ? 'bg-ink' : 'border border-ink-3'}`} />
                        {project.appStoreCache?.name ?? project.title}
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            <div ref={listRef} className="relative col-span-8 grid">
              <div className="pointer-events-none sticky top-24 z-10 col-start-1 row-start-1 h-[52svh] self-start">
                <Stage3D
                  spec={spec}
                  progress={progress}
                  poster={current ? <TiltedIcon project={current} /> : null}
                  className="h-full w-full"
                />
                {current && currentIcon?.href && !currentIcon.inProgress && (
                  <a
                    href={currentIcon.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={fill(t.ui.openInStore, { name: currentIcon.name })}
                    className="pointer-events-auto absolute left-1/2 top-1/2 h-[28svh] w-[28svh] -translate-x-1/2 -translate-y-1/2 rounded-[22.37%]"
                  />
                )}
              </div>
              <div className="col-start-1 row-start-1">
                {ordered.map((project, index) => (
                  <StackArticle key={project.id} project={project} index={index} />
                ))}
              </div>
            </div>
          </div>
        ) : (
          <>
            <SectionHeading index="02" kicker={t.projects.kicker} title={t.projects.title} titleId="projects-title" description={t.projects.description} />
            <div ref={listRef}>
            <ul className="space-y-16">
              {ordered.map((project, index) => (
                <Reveal as="li" key={project.id} delay={index * 0.06}>
                  <MobileTile project={project} icon={stageIcons[index]} active={mobileActive === project.id} register={registerTile} />
                  <ProjectInfo project={project} />
                </Reveal>
              ))}
            </ul>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Projects;
