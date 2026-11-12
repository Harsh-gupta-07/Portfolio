import { SectionHeader } from "@/components/ui";
import { skills } from "@/data/skills";
import { allProjects } from "@/lib/projects";
import { StackExplorer } from "./stack-explorer";

export function Stack() {
  return (
    <section id="stack" className="section border-t border-rule">
      <div className="shell">
        <SectionHeader index="04" label="Tech stack" title="Tools I reach for, and where I’ve used them." />
        <StackExplorer
          groups={skills}
          projects={allProjects.map(({ slug, title, stack }) => ({ slug, title, stack }))}
        />
      </div>
    </section>
  );
}
