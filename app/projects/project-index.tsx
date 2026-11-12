"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { Project, ProjectCategory } from "@/content/projects";
import { Status } from "@/components/ui";
import { formatDate } from "@/lib/projects";

const filters: { id: ProjectCategory | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "featured", label: "Selected" },
  { id: "daily", label: "I use these" },
  { id: "other", label: "Other" },
];

export function ProjectIndex({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState<ProjectCategory | "all">("all");
  const [tech, setTech] = useState<string | null>(null);

  const allTech = useMemo(() => [...new Set(projects.flatMap((p) => p.stack))].sort(), [projects]);
  const shown = projects.filter(
    (p) => (filter === "all" || p.category === filter) && (!tech || p.stack.includes(tech)),
  );

  return (
    <div className="mt-14">
      <div className="flex flex-col gap-4 border-t border-ink pt-4 md:flex-row md:items-center md:justify-between">
        <div role="group" aria-label="Filter by category" className="flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f.id}
              type="button"
              aria-pressed={filter === f.id}
              onClick={() => setFilter(f.id)}
              className={`label h-9 rounded-chip border px-3 transition-colors ${
                filter === f.id ? "border-ink bg-ink text-paper" : "border-rule-strong hover:border-ink"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
        <label className="label flex items-center gap-3 text-muted">
          Tech
          <select
            value={tech ?? ""}
            onChange={(e) => setTech(e.target.value || null)}
            className="h-9 rounded-chip border border-rule-strong bg-paper-raised px-2 font-sans text-sm tracking-normal text-ink normal-case"
          >
            <option value="">Any</option>
            {allTech.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </label>
      </div>

      <ul className="mt-6">
        {shown.map((p, i) => (
          <li key={p.slug}>
            <Link
              href={`/projects/${p.slug}`}
              className="group grid gap-2 border-b border-rule py-6 transition-colors hover:bg-paper-raised md:grid-cols-12 md:items-baseline md:gap-6 md:px-2"
            >
              <span className="label text-muted md:col-span-1">{String(i + 1).padStart(2, "0")}</span>
              <span className="font-display text-[clamp(28px,3.4vw,44px)] leading-none font-bold tracking-[-0.03em] transition-colors group-hover:text-signal-ink md:col-span-4">
                {p.title}
              </span>
              <span className="text-muted md:col-span-4">{p.summary}</span>
              <span className="label text-muted md:col-span-2">{formatDate(p.date)}</span>
              <span className="md:col-span-1 md:justify-self-end">
                <Status status={p.status} />
              </span>
            </Link>
          </li>
        ))}
        {shown.length === 0 && (
          <li className="border-b border-rule py-10 text-muted">
            Nothing matches that filter yet.{" "}
            <button type="button" className="link text-ink" onClick={() => (setFilter("all"), setTech(null))}>
              Clear filters
            </button>
          </li>
        )}
      </ul>
    </div>
  );
}
