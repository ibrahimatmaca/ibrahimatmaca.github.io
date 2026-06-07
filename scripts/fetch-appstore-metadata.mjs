#!/usr/bin/env node
/**
 * Fetches App Store metadata at build time and writes appStoreCache to content.json.
 * Run: npm run fetch-appstore
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const contentPath = join(__dirname, '..', 'content.json');

const content = JSON.parse(readFileSync(contentPath, 'utf8'));
const projects = content.projects?.list ?? [];

for (const project of projects) {
  if (!project.appStoreId) {
    continue;
  }

  const url = `https://itunes.apple.com/lookup?id=${project.appStoreId}&country=tr`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      console.warn(`Failed to fetch ${project.title}: HTTP ${response.status}`);
      continue;
    }

    const data = await response.json();
    if (data.resultCount > 0 && data.results[0]) {
      const app = data.results[0];
      project.appStoreCache = {
        icon: app.artworkUrl512 || app.artworkUrl100 || app.artworkUrl60 || null,
        name: app.trackName || project.title,
        price: app.formattedPrice || (app.price === 0 ? 'Free' : 'Paid'),
        genre: app.primaryGenreName || '',
        rating: app.averageUserRating || 0,
        ratingCount: app.userRatingCount || 0,
        contentRating: app.contentAdvisoryRating || '',
        fetchedAt: new Date().toISOString(),
      };
      console.log(`Cached metadata for ${project.title}`);
    }
  } catch (error) {
    console.warn(`Error fetching ${project.title}:`, error.message);
  }
}

writeFileSync(contentPath, `${JSON.stringify(content, null, 2)}\n`);
console.log('Done.');
