import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import LanguageToggle from './LanguageToggle';
import { useLanguage } from '../hooks/useLanguage';
import { Theme } from '../hooks/useTheme';
import { contents } from '../lib/i18n';
import { lockScroll, scrollToId, scrollToTop } from '../lib/scroll';

const SECTIONS = [
  { id: 'services', key: 'services' },
  { id: 'projects', key: 'work' },
  { id: 'process', key: 'process' },
  { id: 'about', key: 'about' },
  { id: 'contact', key: 'contact' },
] as const;

type SiteNavProps =
  | { mode: 'home'; theme: Theme; onToggleTheme: () => void }
  | { mode: 'page' };

const EASE_DRAWER = [0.32, 0.72, 0, 1] as const;

/**
 * Floating glass navigation. On the home page it scrolls to sections and offers language and
 * theme switches. On the other pages it links back to the home page and stays English and dark.
 */
const SiteNav: React.FC<SiteNavProps> = (props) => {
  const isHome = props.mode === 'home';
  const { t: current } = useLanguage();
  const t = isHome ? current : contents.en;

  const { scrollY, scrollYProgress } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useMotionValueEvent(scrollY, 'change', (value) => setIsScrolled(value > 24));

  // Mark the section that crosses the middle of the screen.
  useEffect(() => {
    if (!isHome) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          } else {
            setActiveSection((active) => (active === entry.target.id ? null : active));
          }
        });
      },
      { rootMargin: '-50% 0px -50% 0px' },
    );
    SECTIONS.forEach(({ id }) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });
    return () => observer.disconnect();
  }, [isHome]);

  useEffect(() => {
    if (!isMenuOpen) return;
    const menuButton = menuButtonRef.current;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMenuOpen(false);
        menuButton?.focus();
      }
    };
    lockScroll(true);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      lockScroll(false);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isMenuOpen]);

  const closeMenu = () => setIsMenuOpen(false);

  const handleAnchor = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    // Unlock first: restarting Lenis later would cancel the scroll that is about to begin.
    lockScroll(false);
    closeMenu();
    scrollToId(id);
  };

  const renderLink = (id: string, label: string, className: string, children?: React.ReactNode) =>
    isHome ? (
      <a key={id} href={`#${id}`} onClick={(e) => handleAnchor(e, id)} className={className}>
        {label}
        {children}
      </a>
    ) : (
      <Link key={id} to={`/#${id}`} onClick={closeMenu} className={className}>
        {label}
      </Link>
    );

  return (
    <>
      <motion.div
        aria-hidden="true"
        className="fixed inset-x-0 top-0 z-50 h-0.5 origin-left bg-gradient-to-r from-brand-400 via-indigo-400 to-violet-400"
        style={{ scaleX: scrollYProgress }}
      />

      <header className="pointer-events-none fixed inset-x-0 top-0 z-40 flex justify-center px-3 pt-[calc(0.75rem+env(safe-area-inset-top))]">
        <nav
          aria-label="Main"
          className={`pointer-events-auto flex h-14 w-full max-w-5xl items-center justify-between gap-2 rounded-full border pl-5 pr-2 backdrop-blur-xl transition-[background-color,border-color,box-shadow] duration-300 ${
            isScrolled
              ? 'border-line bg-canvas/75 shadow-lg shadow-black/10'
              : 'border-line/50 bg-canvas/40'
          }`}
        >
          {isHome ? (
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                closeMenu();
                scrollToTop();
              }}
              className="flex min-h-11 items-center font-mono text-base font-bold tracking-tighter text-ink sm:text-lg"
            >
              IBRAHIM<span className="text-tint">DEV</span>
            </a>
          ) : (
            <Link to="/" onClick={closeMenu} className="flex min-h-11 items-center font-mono text-base font-bold tracking-tighter text-ink sm:text-lg">
              IBRAHIM<span className="text-tint">DEV</span>
            </Link>
          )}

          <div className="hidden items-center gap-1 text-sm font-medium lg:flex">
            {SECTIONS.map(({ id, key }) =>
              renderLink(
                id,
                t.nav[key],
                `relative flex min-h-11 items-center px-3 transition-colors ${
                  activeSection === id ? 'text-ink' : 'text-ink-2 hover:text-ink'
                }`,
                activeSection === id && (
                  <motion.span
                    layoutId="nav-active"
                    transition={{ type: 'spring', duration: 0.4, bounce: 0.15 }}
                    className="absolute inset-x-1 inset-y-1.5 -z-10 rounded-full bg-raised"
                  />
                ),
              ),
            )}
          </div>

          <div className="flex items-center gap-1">
            {props.mode === 'home' && (
              <>
                <LanguageToggle />
                <ThemeToggle theme={props.theme} onToggle={props.onToggleTheme} />
              </>
            )}
            {renderLink(
              'contact',
              t.nav.talk,
              'press hidden min-h-11 items-center rounded-full bg-fill px-5 text-sm font-semibold text-on-fill sm:flex',
            )}
            <button
              ref={menuButtonRef}
              type="button"
              onClick={() => setIsMenuOpen((open) => !open)}
              className="press flex h-11 w-11 items-center justify-center rounded-full text-ink-2 hover:text-ink lg:hidden"
              aria-label={isMenuOpen ? t.nav.menuClose : t.nav.menuOpen}
              aria-expanded={isMenuOpen}
              aria-controls="site-menu"
            >
              {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </nav>
      </header>

      {/* Lives outside the header: its backdrop blur would trap these fixed elements. */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-30 bg-black/50 lg:hidden"
              onClick={closeMenu}
            />
            <motion.div
              id="site-menu"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%', transition: { duration: 0.2, ease: EASE_DRAWER } }}
              transition={{ duration: 0.32, ease: EASE_DRAWER }}
              className="fixed bottom-0 right-0 top-0 z-[35] w-72 max-w-[85vw] border-l border-line bg-canvas pb-[env(safe-area-inset-bottom)] pt-[calc(5.5rem+env(safe-area-inset-top))] lg:hidden"
            >
              <div className="flex flex-col gap-1 p-6">
                {SECTIONS.map(({ id, key }) =>
                  renderLink(
                    id,
                    t.nav[key],
                    'press flex min-h-11 items-center rounded-xl px-4 py-3 text-lg font-medium text-ink-2 hover:bg-raised hover:text-ink',
                  ),
                )}
                {renderLink(
                  'contact',
                  t.nav.talk,
                  'press mt-4 flex min-h-11 items-center justify-center rounded-full bg-fill px-5 py-3 text-base font-semibold text-on-fill',
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default SiteNav;
