import React, { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import PageShell from './PageShell';
import { useTheme } from '../hooks/useTheme';
import { useDocumentLang, useLanguage } from '../hooks/useLanguage';
import { usePageTitle } from '../hooks/usePageTitle';

const NotFound: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { t } = useLanguage();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useDocumentLang();
  usePageTitle(t.notFound.pageTitle);

  useEffect(() => {
    const robots = document.createElement('meta');
    robots.name = 'robots';
    robots.content = 'noindex';
    document.head.appendChild(robots);
    return () => robots.remove();
  }, []);

  const goBack = () => {
    // A direct visit has nothing to go back to.
    if (window.history.state?.idx > 0) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  return (
    <>
      <span
        aria-hidden="true"
        className="pointer-events-none fixed inset-x-0 top-1/2 -z-0 -translate-y-1/2 select-none text-center font-display text-[30vw] font-medium leading-none text-line"
      >
        404
      </span>
      <PageShell
        eyebrow="404"
        title={t.notFound.title}
        lead={t.notFound.text}
        nav={{ theme, onToggleTheme: toggleTheme }}
      >
        <p className="mb-8 break-all font-mono text-[0.8125rem] leading-[1.4] text-ink-3">{pathname}</p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link to="/" className="btn btn-primary press">
            {t.notFound.home}
          </Link>
          <button type="button" onClick={goBack} className="btn btn-secondary press">
            {t.notFound.back}
          </button>
        </div>
      </PageShell>
    </>
  );
};

export default NotFound;
