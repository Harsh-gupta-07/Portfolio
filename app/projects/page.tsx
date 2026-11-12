import type { Metadata } from "next";
import { MotionController } from "@/components/motion/motion-controller";
import { allProjects } from "@/lib/projects";
import { ProjectIndex } from "./project-index";

export const metadata: Metadata = {
  title: "All projects",
  description: "Every project Harshvardhan Gupta has written up backend systems, full-stack apps and AI.",
};

export default function ProjectsPage() {
  return (
    <div className="shell pt-28 pb-[var(--section-y)] md:pt-36">
      <p className="label text-muted">
        <span className="text-ink">Index</span>&nbsp;&nbsp;{allProjects.length} projects
      </p>
      <h1 data-split="load" className="mt-6 text-h1 font-extrabold">
        All projects<span className="text-signal">.</span>
      </h1>
      <ProjectIndex projects={allProjects} />
      <MotionController />
    </div>
  );
}
