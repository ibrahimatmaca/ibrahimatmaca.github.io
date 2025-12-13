export interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  imageUrl: string;
  link: string;
  appStoreUrl?: string;
  playStoreUrl?: string;
  appStoreId?: string; // App Store ID for dynamic screenshot fetching (e.g., "6745828686")
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