"use client";

import Link from "next/link";
import { useState } from "react";

type ProjectRef = { slug: string; title: string; stack: string[] };

/**
 * Skills on the left, projects on the right. Hover or focus a skill to light up
 * the projects that use it; hover a project to light up its skills.
 */
export function StackExplorer({
  groups,
  projects,
}: {
  groups: { group: string; items: string[] }[];
  projects: ProjectRef[];
}) {
  const [skill, setSkill] = useState<string | null>(null);
  const [project, setProject] = useState<string | null>(null);

  const usage = (s: string) => projects.filter((p) => p.stack.includes(s)).length;
  const activeStack = project ? projects.find((p) => p.slug === project)?.stack ?? [] : null;

  const skillOn = (s: string) => (skill ? s === skill : activeStack ? activeStack.includes(s) : null);
  const projectOn = (p: ProjectRef) => (project ? p.slug === project : skill ? p.stack.includes(skill) : null);

  return (
    <div className="grid gap-12 md:grid-cols-12">
      <div className="grid gap-8 sm:grid-cols-2 md:col-span-8" onMouseLeave={() => setSkill(null)}>
        {groups.map((g) => (
          <div key={g.group} data-reveal>
            <p className="label border-b border-rule pb-2 text-muted">{g.group}</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {g.items.map((s) => {
                const on = skillOn(s);
                const n = usage(s);
                return (
                  <li key={s}>
                    <button
                      type="button"
                      onMouseEnter={() => setSkill(s)}
                      onFocus={() => setSkill(s)}
                      onBlur={() => setSkill(null)}
                      onClick={() => setSkill(s)}
                      aria-pressed={skill === s}
                      className={`inline-flex h-9 items-center gap-2 rounded-chip border px-3 text-sm transition-all duration-200 ${
                        on === true
                          ? "border-ink bg-signal text-ink"
                          : on === false
                            ? "border-rule text-faint"
                            : "border-rule-strong bg-paper-raised text-ink hover:border-ink"
                      }`}
                    >
                      {s}
                      {n > 0 && (
                        <span className="font-mono text-[11px] text-muted" aria-label={`used in ${n} projects`}>
                          {n}
                        </span>
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>

      <aside className="md:col-span-4" onMouseLeave={() => setProject(null)}>
        <div className="md:sticky md:top-24">
          <p className="label border-b border-ink pb-2 text-ink">
            {skill ? `Built with ${skill}` : "Where it’s used"}
          </p>
          <ul>
            {projects.map((p) => {
              const on = projectOn(p);
              return (
                <li key={p.slug}>
                  <Link
                    href={`/projects/${p.slug}`}
                    onMouseEnter={() => setProject(p.slug)}
                    onFocus={() => setProject(p.slug)}
                    onBlur={() => setProject(null)}
                    className={`flex items-baseline justify-between gap-4 border-b border-rule py-4 transition-opacity duration-200 ${
                      on === false ? "opacity-30" : "opacity-100"
                    }`}
                  >
                    <span className="flex items-center gap-3 font-display text-[22px] font-semibold tracking-[-0.02em]">
                      <span
                        aria-hidden
                        className={`size-2 rounded-full transition-colors ${on ? "bg-signal" : "bg-rule-strong"}`}
                      />
                      {p.title}
                    </span>
                    <span className="label text-muted">{p.stack.length} tools →</span>
                  </Link>
                </li>
              );
            })}
          </ul>
          <p className="mt-4 text-sm text-muted">Hover a skill to see where I’ve used it or a project to see what it’s made of.</p>
        </div>
      </aside>
    </div>
  );
}
