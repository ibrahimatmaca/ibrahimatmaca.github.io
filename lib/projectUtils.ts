import { Project } from '../types';

export function isPublishedProject(project: Project): boolean {
  return Boolean(project.appStoreId || project.appStoreUrl);
}

export function isInProgressProject(project: Project): boolean {
  return !isPublishedProject(project);
}

/** Canonical App Store URL from Apple ID — works globally without slug/country. */
export function getAppStoreUrlFromId(appStoreId: string): string {
  return `https://apps.apple.com/app/id${appStoreId}`;
}

export function getProjectStoreUrl(
  project: Pick<Project, 'appStoreId' | 'appStoreUrl' | 'playStoreUrl' | 'link'>,
): string | undefined {
  if (project.appStoreId) {
    return getAppStoreUrlFromId(project.appStoreId);
  }
  if (project.appStoreUrl) {
    return project.appStoreUrl;
  }
  if (project.playStoreUrl) {
    return project.playStoreUrl;
  }
  return project.link || undefined;
}
