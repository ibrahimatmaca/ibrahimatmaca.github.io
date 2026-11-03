import { createContext } from 'react';
import en from '../content.json';
import trJson from '../content.tr.json';

export type Language = 'en' | 'tr';
export type Content = typeof en;

const STORAGE_KEY = 'lang';

// The Turkish file only carries the text of each project. The rest comes from the English list,
// which scripts/fetch-appstore-metadata.mjs keeps up to date.
const trProjects = trJson.projects.list as { id: string; description: string; tech: string[] }[];

const tr = {
  ...(trJson as unknown as Content),
  projects: {
    ...(trJson.projects as unknown as Content['projects']),
    list: en.projects.list.map((project) => ({
      ...project,
      ...trProjects.find((item) => item.id === project.id),
    })),
  },
} as Content;

export const contents: Record<Language, Content> = { en, tr };

export function detectLanguage(): Language {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'en' || stored === 'tr') return stored;
  } catch {
    // Storage can be blocked. Fall back to the browser language.
  }
  return navigator.language.toLowerCase().startsWith('tr') ? 'tr' : 'en';
}

export function storeLanguage(lang: Language): void {
  try {
    localStorage.setItem(STORAGE_KEY, lang);
  } catch {
    // The language still changes for this visit.
  }
}

export function fill(template: string, values: Record<string, string>): string {
  return template.replace(/\{(\w+)\}/g, (_, key: string) => values[key] ?? '');
}

export interface LanguageState {
  lang: Language;
  setLang: (lang: Language) => void;
  t: Content;
}

export const LanguageContext = createContext<LanguageState | null>(null);
