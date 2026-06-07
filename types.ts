export interface AppStoreCache {
  icon: string | null;
  name: string;
  price: string;
  genre: string;
  rating: number;
  ratingCount: number;
  contentRating: string;
  fetchedAt: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  imageUrl: string;
  link: string;
  appStoreUrl?: string;
  playStoreUrl?: string;
  appStoreId?: string;
  appStoreCache?: AppStoreCache;
}
