import { Project } from '../types';

export function isPublishedProject(project: Project): boolean {
  return Boolean(project.appStoreId || project.appStoreUrl);
}

export function isInProgressProject(project: Project): boolean {
  return !isPublishedProject(project);
}
