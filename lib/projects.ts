import { projects, type Project, type ProjectCategory, type ProjectStatus } from "@/content/projects";

const byDateDesc = (a: Project, b: Project) => b.date.localeCompare(a.date);

export const allProjects = [...projects].sort(byDateDesc);

export function getProject(slug: string) {
  return allProjects.find((p) => p.slug === slug);
}

export function projectsIn(category: ProjectCategory) {
  return allProjects.filter((p) => p.category === category);
}

/** Previous / next in the full list, wrapping around. */
export function adjacentProjects(slug: string) {
  const i = allProjects.findIndex((p) => p.slug === slug);
  const n = allProjects.length;
  return {
    prev: allProjects[(i - 1 + n) % n],
    next: allProjects[(i + 1) % n],
  };
}

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export function formatDate(date: string) {
  const [year, month] = date.split("-");
  return month ? `${MONTHS[Number(month) - 1]} ${year}` : year;
}

export const statusLabel: Record<ProjectStatus, string> = {
  live: "Live",
  shipped: "Shipped",
  wip: "In progress",
  archived: "Archived",
};
