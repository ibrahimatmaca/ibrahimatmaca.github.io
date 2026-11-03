import { useContext, useEffect } from 'react';
import { LanguageContext, LanguageState } from '../lib/i18n';

export function useLanguage(): LanguageState {
  const state = useContext(LanguageContext);
  if (!state) throw new Error('useLanguage must be used inside LanguageProvider');
  return state;
}

/** Keeps <html lang> in step with the page language. Other pages stay English. */
export function useDocumentLang(): void {
  const { lang } = useLanguage();

  useEffect(() => {
    document.documentElement.lang = lang;
    return () => {
      document.documentElement.lang = 'en';
    };
  }, [lang]);
}
