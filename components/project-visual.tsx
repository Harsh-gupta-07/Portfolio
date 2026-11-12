import Image from "next/image";
import { ViewTransition } from "react";
import type { Project } from "@/content/projects";
import { GoqueueDiagram } from "@/components/goqueue-diagram";

/**
 * The project's cover (image or built-in diagram). Wrapped in a named
 * ViewTransition so it morphs from the card into the project page hero.
 */
export function ProjectVisual({
  project,
  sizes,
  priority = false,
  className = "",
}: {
  project: Project;
  sizes: string;
  priority?: boolean;
  className?: string;
}) {
  let visual: React.ReactNode = null;
  if (project.diagram === "goqueue") visual = <GoqueueDiagram />;
  else if (project.cover)
    visual = (
      <Image
        src={project.cover.src}
        alt={project.cover.alt}
        width={project.cover.width}
        height={project.cover.height}
        sizes={sizes}
        priority={priority}
        className={`h-full w-full object-cover object-top ${className}`}
      />
    );
  else
    visual = (
      <div className="graph-paper grid aspect-[16/10] place-items-center bg-paper">
        <span className="font-display text-[64px] font-extrabold tracking-[-0.04em]">{project.title}</span>
      </div>
    );

  return (
    <ViewTransition name={`project-${project.slug}`} share="morph" default="none">
      <div className="h-full w-full">{visual}</div>
    </ViewTransition>
  );
}
