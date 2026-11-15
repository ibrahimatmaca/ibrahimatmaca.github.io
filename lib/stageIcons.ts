import { Project } from '../types';
import { isInProgressProject, getProjectStoreUrl } from './projectUtils';

/** One app icon shown on a 3D stage or its CSS fallback. */
export interface StageIcon {
  id: string;
  name: string;
  icon: string | null;
  inProgress: boolean;
  href?: string;
}

interface Tool {
  id: string;
  title: string;
  icon?: string;
}

/** Projects with an icon first, then the open source tools. In-progress projects come last. */
export function buildStageIcons(projects: Project[], tools: Tool[]): StageIcon[] {
  const fromProjects = projects.map<StageIcon>((project) => ({
    id: `project-${project.id}`,
    name: project.appStoreCache?.name ?? project.title,
    icon: project.appStoreCache?.icon ?? null,
    inProgress: isInProgressProject(project),
    href: getProjectStoreUrl(project),
  }));
  const fromTools = tools.map<StageIcon>((tool) => ({
    id: `tool-${tool.id}`,
    name: tool.title,
    icon: tool.icon ?? null,
    inProgress: false,
    href: '#open-source',
  }));
  const rank = (icon: StageIcon) => (icon.inProgress ? 2 : icon.icon ? 0 : 1);
  return [...fromProjects, ...fromTools].sort((a, b) => rank(a) - rank(b));
}
