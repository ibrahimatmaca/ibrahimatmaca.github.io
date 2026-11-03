import React, { useState } from 'react';
import LegalShell from './LegalShell';
import { usePageTitle } from '../../hooks/usePageTitle';

interface KidTalesLegalLayoutProps {
  englishContent: string;
  turkishContent: string;
  titleEn: string;
  titleTr: string;
}

const LANGUAGES = [
  { value: 'en', label: 'English' },
  { value: 'tr', label: 'Türkçe' },
] as const;

const KidTalesLegalLayout: React.FC<KidTalesLegalLayoutProps> = ({
  englishContent,
  turkishContent,
  titleEn,
  titleTr,
}) => {
  const [language, setLanguage] = useState<'en' | 'tr'>('en');

  const content = language === 'en' ? englishContent : turkishContent;
  const title = language === 'en' ? titleEn : titleTr;

  usePageTitle(`${title} | İbrahim Atmaca`);

  const toolbar = (
    <div className="mb-8 flex justify-center">
      <div className="flex flex-wrap items-center gap-2 rounded-2xl border border-line bg-surface/70 p-3 backdrop-blur-md sm:flex-nowrap sm:gap-3 sm:p-4">
        <strong className="text-sm text-ink-2 sm:text-base">Language / Dil:</strong>
        {LANGUAGES.map(({ value, label }) => (
          <button
            key={value}
            type="button"
            onClick={() => setLanguage(value)}
            aria-pressed={language === value}
            className={`press min-h-11 rounded-full border px-4 text-sm transition-colors sm:text-base ${
              language === value
                ? 'border-fill bg-fill font-semibold text-on-fill'
                : 'border-line bg-transparent text-tint hover:bg-raised'
            }`}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );

  return <LegalShell title={title} html={content} toolbar={toolbar} tables />;
};

export default KidTalesLegalLayout;
