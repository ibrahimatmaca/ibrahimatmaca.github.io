import React from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { Language } from '../lib/i18n';

const OPTIONS: { value: Language; label: string }[] = [
  { value: 'tr', label: 'TR' },
  { value: 'en', label: 'EN' },
];

/** Two-way switch between Turkish and English. */
const LanguageToggle: React.FC = () => {
  const { lang, setLang, t } = useLanguage();

  return (
    <div role="group" aria-label={t.nav.language} className="flex items-center rounded-full border border-line bg-surface/60 p-px">
      {OPTIONS.map(({ value, label }) => (
        <button
          key={value}
          type="button"
          onClick={() => setLang(value)}
          aria-pressed={lang === value}
          className={`flex h-11 min-w-11 items-center justify-center rounded-full px-2 font-mono text-xs font-semibold transition-colors ${
            lang === value ? 'bg-fill text-on-fill' : 'text-ink-2 hover:text-ink'
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
};

export default LanguageToggle;
