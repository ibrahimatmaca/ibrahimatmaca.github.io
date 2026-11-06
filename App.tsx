import React, { lazy, Suspense, useEffect, useRef } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import HomePage from './components/HomePage';
import NotFound from './components/NotFound';

// The legal pages load on demand, so the home page stays small.
const Support = lazy(() => import('./components/Support'));
const ElevanaPrivacy = lazy(() => import('./components/privacy/ElevanaPrivacy'));
const KidTalesPrivacy = lazy(() => import('./components/privacy/KidTalesPrivacy'));
const KidTalesTerms = lazy(() => import('./components/privacy/KidTalesTerms'));
const GeneralPrivacy = lazy(() => import('./components/privacy/GeneralPrivacy'));
const WadaClosetPrivacy = lazy(() => import('./components/privacy/WadaClosetPrivacy'));
const WadaClosetTerms = lazy(() => import('./components/privacy/WadaClosetTerms'));

const isHome = (pathname: string) => pathname === '/' || pathname === '/tr';

const ScrollManager: React.FC = () => {
  const { pathname, hash } = useLocation();
  const previous = useRef(pathname);

  useEffect(() => {
    // Switching between / and /tr changes the language, not the page, so keep the scroll position.
    const switchedLanguage = previous.current !== pathname && isHome(previous.current) && isHome(pathname);
    previous.current = pathname;
    if (switchedLanguage) return;

    if (hash) {
      document.getElementById(hash.slice(1))?.scrollIntoView();
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
};

export const App: React.FC = () => {
  return (
    <>
      <ScrollManager />
      <Suspense fallback={null}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/tr" element={<HomePage />} />
        <Route path="/support" element={<Support />} />
        <Route path="/elevana-privacy" element={<ElevanaPrivacy />} />
        {/* Elevana paywall links to this legacy URL. */}
        <Route path="/elevana_privacy_policy.html" element={<ElevanaPrivacy />} />
        <Route path="/kidtales-privacy" element={<KidTalesPrivacy />} />
        <Route path="/kidtales-terms" element={<KidTalesTerms />} />
        <Route path="/privacy-policy" element={<GeneralPrivacy />} />
        <Route path="/wada-closet-privacy" element={<WadaClosetPrivacy />} />
        <Route path="/wada-closet-terms" element={<WadaClosetTerms />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      </Suspense>
    </>
  );
};