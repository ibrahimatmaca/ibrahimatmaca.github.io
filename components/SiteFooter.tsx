import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../hooks/useLanguage';
import { contents } from '../lib/i18n';
import { clearIntroSeen } from '../lib/introSeen';
import { scrollToTop } from '../lib/scroll';

const linkClass = 'text-link inline-flex min-h-11 items-center text-[1rem]';

/** Replays the intro: forget the seen flag, ask for it by fragment, start from the top of a fresh load. */
function replayIntro(): void {
  clearIntroSeen();
  // The page is reloaded from the top, so the browser has no deep scroll position to restore.
  document.documentElement.scrollTop = 0;
  window.location.hash = 'intro';
  window.location.reload();
}

/** Page footer. The home page passes `home` to get a back-to-top link and its own language. */
const SiteFooter: React.FC<{ home?: boolean }> = ({ home = false }) => {
  const { t: current } = useLanguage();
  const t = home ? current : contents.en;

  return (
    <footer className="relative border-t border-line pb-[calc(1.5rem+env(safe-area-inset-bottom))] pt-6">
      <div className="mx-auto flex w-full max-w-[80rem] flex-col gap-2 px-4 text-[0.8125rem] leading-[1.4] text-ink-3 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-10">
        <p>© {new Date().getFullYear()} Ibrahim Atmaca</p>

        <nav aria-label="Footer" className="flex flex-wrap items-center gap-x-6">
          <Link to="/privacy-policy" className={linkClass}>
            {t.footer.privacy}
          </Link>
          <Link to="/support" className={linkClass}>
            {t.footer.support}
          </Link>
          <a href="https://github.com/ibrahimatmaca" target="_blank" rel="noopener noreferrer" className={linkClass}>
            {t.footer.github}
          </a>
          {home && (
            <button type="button" onClick={replayIntro} className={linkClass}>
              {t.intro.replay}
            </button>
          )}
        </nav>

        {home && (
          <button type="button" onClick={scrollToTop} className={`${linkClass} justify-start`}>
            {t.footer.top}
          </button>
        )}
      </div>
    </footer>
  );
};

export default SiteFooter;
