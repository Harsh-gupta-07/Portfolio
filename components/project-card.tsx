import Link from "next/link";
import type { Project } from "@/content/projects";
import { ProjectVisual } from "@/components/project-visual";
import { Status, Tag } from "@/components/ui";
import { formatDate } from "@/lib/projects";

export function ProjectCard({
  project,
  fig, 
  size = "md",
}:{
  project: Project;
  fig: string;
  size?: "md" | "lg";
}) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group flex h-full flex-col border border-rule bg-paper-raised transition-[border-color,box-shadow,translate] duration-300 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:border-ink hover:shadow-print"
    >
      <div className={`overflow-hidden border-b border-rule ${size === "lg" ? "aspect-video" : "aspect-16/10"}`}>
        <div className="h-full transition-transform duration-700 ease-out group-hover:scale-[1.03]">
          <ProjectVisual
            project={project}
            sizes={size === "lg" ? "(min-width: 1024px) 66vw, 100vw" : "(min-width: 768px) 50vw, 100vw"}
          />
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-4 p-5 md:p-6">
        <div className="label flex items-center justify-between gap-4 text-muted">
          <span>
            <span className="text-ink">FIG. {fig}</span>&nbsp;&nbsp;{formatDate(project.date)}
          </span>
          <Status status={project.status} />
        </div>
        <h3 className={`font-display font-bold tracking-[-0.03em] ${size === "lg" ? "text-[clamp(32px,4vw,48px)] leading-none" : "text-h3"}`}>
          {project.title}
          <span aria-hidden className="ml-2 inline-block text-signal-ink opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100">
            →
          </span>
        </h3>
        <p className="text-muted">{project.summary}</p>
        <ul className="mt-auto flex flex-wrap gap-2 pt-2">
          {project.stack.slice(0, 5).map((s) => (
            <li key={s}>
              <Tag>{s}</Tag>
            </li>
          ))}
          {project.stack.length > 5 && (
            <li>
              <Tag>+{project.stack.length - 5}</Tag>
            </li>
          )}
        </ul>
      </div>
    </Link>
  );
}
