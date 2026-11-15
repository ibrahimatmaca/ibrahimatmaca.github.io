import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll } from 'framer-motion';
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
  { id: 'open-source', key: 'openSource' },
  { id: 'process', key: 'process' },
  { id: 'about', key: 'about' },
  { id: 'contact', key: 'contact' },
] as const;

// Contact is the call to action, so it is not repeated in the centre of the bar.
const BAR_SECTIONS = SECTIONS.filter(({ id }) => id !== 'contact');

type SiteNavProps =
  | { mode: 'home'; theme: Theme; onToggleTheme: () => void }
  | { mode: 'page'; theme?: Theme; onToggleTheme?: () => void };

const EASE_DRAWER = [0.32, 0.72, 0, 1] as const;
const FOCUSABLE = 'a[href], button:not([disabled])';

/**
 * Fixed navigation. On the home page it scrolls to sections and offers language and theme
 * switches. On the other pages it links to Home and Support, in English unless the page passes
 * theme controls (the 404 page does).
 */
const SiteNav: React.FC<SiteNavProps> = (props) => {
  const isHome = props.mode === 'home';
  const hasControls = props.theme !== undefined && props.onToggleTheme !== undefined;
  const { t: current } = useLanguage();
  const t = isHome || hasControls ? current : contents.en;
  const { pathname } = useLocation();
  const reduceMotion = useReducedMotion();

  const { scrollY, scrollYProgress } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);

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

  // Menu: lock scroll, trap focus, close on Esc, give focus back to the button.
  useEffect(() => {
    if (!isMenuOpen) return;
    const menuButton = menuButtonRef.current;
    const sheet = sheetRef.current;
    sheet?.querySelector<HTMLElement>(FOCUSABLE)?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMenuOpen(false);
        return;
      }
      if (e.key !== 'Tab' || !sheet) return;
      const items = Array.from(sheet.querySelectorAll<HTMLElement>(FOCUSABLE));
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    lockScroll(true);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      lockScroll(false);
      window.removeEventListener('keydown', handleKeyDown);
      menuButton?.focus({ preventScroll: true });
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

  const sectionLink = (id: string, label: string, className: string, active = false) =>
    isHome ? (
      <a key={id} href={`#${id}`} onClick={(e) => handleAnchor(e, id)} className={className} aria-current={active ? 'location' : undefined}>
        {label}
      </a>
    ) : (
      <Link key={id} to={`/#${id}`} onClick={closeMenu} className={className}>
        {label}
      </Link>
    );

  const pageLinks = [
    { to: '/', label: t.nav.home },
    { to: '/support', label: t.nav.support },
  ];

  const barLinkClass = (active: boolean) =>
    `relative flex min-h-11 items-center px-3 text-base font-medium transition-colors duration-150 ${
      active ? 'text-ink' : 'text-ink-2 hover:text-ink'
    }`;

  const underline = <span aria-hidden="true" className="absolute inset-x-3 bottom-1.5 h-0.5 bg-tint" />;

  const wordmarkClass = 'flex min-h-11 items-center text-base font-semibold tracking-tight text-ink';

  return (
    <>
      <a href="#main" className="skip-link" onClick={(e) => {
        e.preventDefault();
        const main = document.getElementById('main');
        main?.focus({ preventScroll: true });
        main?.scrollIntoView();
      }}>
        {t.nav.skip}
      </a>

      <header
        className={`nav-blur fixed inset-x-0 top-0 z-40 border-b pt-[env(safe-area-inset-top)] transition-[background-color,border-color,backdrop-filter] duration-200 ${
          isScrolled
            ? 'border-line bg-canvas/85 backdrop-blur-[16px]'
            : 'border-transparent bg-transparent'
        }`}
      >
        <nav aria-label="Main" className="mx-auto flex h-16 w-full max-w-[80rem] items-center justify-between gap-4 px-4 sm:px-6 lg:px-10">
          {isHome ? (
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                closeMenu();
                scrollToTop();
              }}
              className={wordmarkClass}
            >
              Ibrahim Atmaca
            </a>
          ) : (
            <Link to="/" onClick={closeMenu} className={wordmarkClass}>
              Ibrahim Atmaca
            </Link>
          )}

          <div className="hidden items-center lg:flex">
            {isHome
              ? BAR_SECTIONS.map(({ id, key }) =>
                  sectionLink(id, t.nav[key], barLinkClass(activeSection === id), activeSection === id),
                )
              : pageLinks.map(({ to, label }) => {
                  const active = pathname === to;
                  return (
                    <Link key={to} to={to} aria-current={active ? 'page' : undefined} className={barLinkClass(active)}>
                      {label}
                      {active && underline}
                    </Link>
                  );
                })}
          </div>

          <div className="flex items-center gap-2">
            {(isHome || hasControls) && (
              <div className="hidden items-center gap-1 sm:flex">
                <LanguageToggle />
                <ThemeToggle theme={props.theme as Theme} onToggle={props.onToggleTheme as () => void} />
              </div>
            )}
            {isHome &&
              sectionLink('contact', t.nav.talk, 'btn btn-primary press hidden lg:inline-flex')}
            <button
              ref={menuButtonRef}
              type="button"
              onClick={() => setIsMenuOpen((open) => !open)}
              className="press flex h-11 w-11 items-center justify-center rounded-full text-ink hover:bg-raised lg:hidden"
              aria-label={isMenuOpen ? t.nav.menuClose : t.nav.menuOpen}
              aria-expanded={isMenuOpen}
              aria-controls="site-menu"
            >
              {isMenuOpen ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
            </button>
          </div>
        </nav>

        {!reduceMotion && (
          <motion.div
            aria-hidden="true"
            className="absolute inset-x-0 bottom-[-1px] h-0.5 origin-left bg-tint"
            style={{ scaleX: scrollYProgress }}
          />
        )}
      </header>

      {/* Lives outside the header: its backdrop blur would trap this fixed element. */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            id="site-menu"
            ref={sheetRef}
            role="dialog"
            aria-modal="true"
            aria-label={t.nav.menuTitle}
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, transition: { duration: 0.16 } }}
            transition={{ duration: 0.24, ease: EASE_DRAWER }}
            className="fixed inset-0 z-50 flex flex-col overflow-y-auto bg-canvas px-4 pb-[calc(1.5rem+env(safe-area-inset-bottom))] pt-[env(safe-area-inset-top)] sm:px-6 lg:hidden"
          >
            <div className="flex h-16 shrink-0 items-center justify-between">
              <span className={wordmarkClass}>Ibrahim Atmaca</span>
              <button
                type="button"
                onClick={closeMenu}
                className="press flex h-11 w-11 items-center justify-center rounded-full text-ink hover:bg-raised"
                aria-label={t.nav.menuClose}
              >
                <X size={22} aria-hidden="true" />
              </button>
            </div>

            <ul className="mt-6 flex flex-1 flex-col">
              {isHome
                ? SECTIONS.map(({ id, key }) => (
                    <li key={id} className="border-t border-line first:border-t-0">
                      {sectionLink(
                        id,
                        t.nav[key],
                        'press flex min-h-14 items-center font-display text-[1.75rem] font-medium leading-[1.15] tracking-[-0.01em] text-ink',
                        activeSection === id,
                      )}
                    </li>
                  ))
                : pageLinks.map(({ to, label }) => (
                    <li key={to} className="border-t border-line first:border-t-0">
                      <Link
                        to={to}
                        onClick={closeMenu}
                        aria-current={pathname === to ? 'page' : undefined}
                        className="press flex min-h-14 items-center font-display text-[1.75rem] font-medium leading-[1.15] tracking-[-0.01em] text-ink"
                      >
                        {label}
                      </Link>
                    </li>
                  ))}
            </ul>

            {(isHome || hasControls) && (
              <div className="mt-8 flex items-center justify-between border-t border-line pt-6">
                <LanguageToggle />
                <ThemeToggle theme={props.theme as Theme} onToggle={props.onToggleTheme as () => void} />
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default SiteNav;
