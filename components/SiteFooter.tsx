import React from 'react';
import { ArrowUp } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';
import { contents } from '../lib/i18n';
import { scrollToTop } from '../lib/scroll';

/** Page footer. The home page passes `home` to get a back-to-top button and its own language. */
const SiteFooter: React.FC<{ home?: boolean }> = ({ home = false }) => {
  const { t: current } = useLanguage();
  const t = home ? current : contents.en;

  return (
    <footer className="relative border-t border-line/60 bg-canvas/70 pb-[calc(2rem+env(safe-area-inset-bottom))] pt-8 backdrop-blur-md">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 text-sm text-ink-3 sm:flex-row">
        <p>
          © {new Date().getFullYear()} İbrahim Atmaca. {t.footer.built}
        </p>
        {home && (
          <button
            type="button"
            onClick={scrollToTop}
            className="press inline-flex min-h-11 items-center gap-2 rounded-full border border-line px-4 text-ink-2 hover:text-ink"
          >
            {t.footer.top}
            <ArrowUp size={16} aria-hidden="true" />
          </button>
        )}
      </div>
    </footer>
  );
};

export default SiteFooter;
