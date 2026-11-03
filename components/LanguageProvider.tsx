import React, { useCallback, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { contents, detectLanguage, Language, LanguageContext, storeLanguage } from '../lib/i18n';

/**
 * The home page has one address per language: / for English and /tr for Turkish, so each can be
 * found and shared on its own. Every other page keeps the language the visitor last chose.
 */
const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [chosen, setChosen] = useState<Language>(detectLanguage);

  const lang: Language = pathname === '/tr' ? 'tr' : chosen;

  const setLang = useCallback(
    (next: Language) => {
      storeLanguage(next);
      setChosen(next);
      if (pathname === '/' || pathname === '/tr') {
        navigate(next === 'tr' ? '/tr' : '/', { replace: true });
      }
    },
    [navigate, pathname],
  );

  const value = useMemo(() => ({ lang, setLang, t: contents[lang] }), [lang, setLang]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export default LanguageProvider;
