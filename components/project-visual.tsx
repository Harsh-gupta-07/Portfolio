import Image from "next/image";
import { ViewTransition } from "react";
import type { Project } from "@/content/projects";
import { GoqueueDiagram } from "@/components/goqueue-diagram";
import { WchrTerminal } from "@/components/wchr-terminal";

const diagrams = {
  goqueue: { Component: GoqueueDiagram, caption: "Architecture" },
  wchr: { Component: WchrTerminal, caption: "A real session: save a file, wchr reruns cargo run" },
} satisfies Record<NonNullable<Project["diagram"]>, unknown>;

/** Caption for the project's cover in a <Figure>. */
export function visualCaption(project: Project) {
  return project.diagram ? diagrams[project.diagram].caption : project.cover?.alt;
}

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
  if (project.diagram) {
    const { Component } = diagrams[project.diagram];
    visual = <Component />;
  } else if (project.cover?.fit === "contain")
    visual = (
      <div className="flex h-full w-full items-center justify-center bg-ink p-6 md:p-10">
        <Image
          src={project.cover.src}
          alt={project.cover.alt}
          width={project.cover.width}
          height={project.cover.height}
          sizes="(min-width: 768px) 560px, 90vw"
          priority={priority}
          // Definite width: with w-auto the srcset density would shrink a small source to a third of its size.
          className={`h-auto max-h-full w-full max-w-[560px] object-contain ${className}`}
        />
      </div>
    );
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
