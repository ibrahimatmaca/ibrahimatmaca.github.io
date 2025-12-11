export interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  imageUrl: string;
  link: string;
  appStoreUrl?: string;
  playStoreUrl?: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  isThinking?: boolean;
}

export interface SearchResult {
  text: string;
  sources: {
    uri: string;
    title: string;
  }[];
}

export enum Section {
  HERO = 'hero',
  ABOUT = 'about',
  PROJECTS = 'projects',
  TECH_INSIGHT = 'tech_insight',
  CONTACT = 'contact',
}