import Link from "next/link";
import { ProjectCard } from "@/components/project-card";
import { SectionHeader, Status, Tag } from "@/components/ui";
import { ProjectVisual } from "@/components/project-visual";
import { formatDate, projectsIn } from "@/lib/projects";
import { profile } from "@/data/profile";
import { FeaturedTrack } from "./featured-track";

export function SelectedWork() {
  const featured = projectsIn("featured");
  return (
    <section id="work" className="border-t border-rule pt-[var(--section-y)] lg:pt-0">
      <FeaturedTrack>
        <div className="flex flex-col justify-between gap-8 lg:w-[30vw] lg:max-w-[420px] lg:shrink-0">
          <div>
            <p className="label flex items-center gap-4 text-muted">
              <span className="text-ink">05</span> Selected work
            </p>
            <h2 data-split className="mt-8 text-h2 font-bold">
              Systems I’ve designed end to end.
            </h2>
          </div>
          <p className="text-muted">
            From a Go job queue to an RL environment for LLMs. Each one has its own write-up — architecture,
            decisions and numbers.
          </p>
          <p className="label hidden text-muted lg:block">Keep scrolling →</p>
        </div>
        {featured.map((p, i) => (
          <div key={p.slug} className="lg:w-[min(62vw,860px,calc((100svh-320px)*1.78))] lg:shrink-0">
            <ProjectCard project={p} fig={`05.${i + 1}`} size="lg" />
          </div>
        ))}
      </FeaturedTrack>
    </section>
  );
}

export function DailyDrivers() {
  const daily = projectsIn("daily");
  if (!daily.length) return null;
  return (
    <section id="daily" className="section border-t border-rule">
      <div className="shell">
        <SectionHeader index="06" label="Projects I use myself" title="Built it, then kept using it.">
          Software I wrote that’s part of my own routine — the best test of whether something actually works.
        </SectionHeader>

        <div className="grid gap-10">
          {daily.map((p) => (
            <Link
              key={p.slug}
              href={`/projects/${p.slug}`}
              data-reveal
              className="group grid border border-rule bg-paper-raised transition-[border-color,box-shadow,translate] duration-300 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:border-ink hover:shadow-print md:grid-cols-12"
            >
              <div className="overflow-hidden border-b border-rule md:col-span-7 md:border-r md:border-b-0">
                <div className="aspect-[16/10] h-full transition-transform duration-700 group-hover:scale-[1.03]">
                  <ProjectVisual project={p} sizes="(min-width: 768px) 58vw, 100vw" />
                </div>
              </div>
              <div className="flex flex-col gap-5 p-6 md:col-span-5 md:p-8">
                <div className="label flex items-center justify-between text-muted">
                  <span>{formatDate(p.date)}</span>
                  <Status status={p.status} />
                </div>
                <h3 className="font-display text-[clamp(36px,4vw,56px)] leading-none font-bold tracking-[-0.035em]">
                  {p.title}
                </h3>
                <p className="text-muted">{p.summary}</p>
                {p.usage && (
                  <p className="border-l-2 border-signal pl-4">
                    <span className="label block text-muted">How I use it</span>
                    {p.usage}
                  </p>
                )}
                <ul className="mt-auto flex flex-wrap gap-2">
                  {p.stack.map((s) => (
                    <li key={s}>
                      <Tag>{s}</Tag>
                    </li>
                  ))}
                </ul>
                <span className="label text-ink">
                  Open project <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export function OtherProjects() {
  const other = projectsIn("other");
  const github = profile.socials.find((s) => s.label === "GitHub")!;
  return (
    <section id="other" className="section border-t border-rule">
      <div className="shell">
        <SectionHeader index="07" label="Other projects" title="Smaller builds and experiments.">
          <Link href="/projects" className="link text-ink">
            Browse all projects →
          </Link>
        </SectionHeader>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {other.map((p, i) => (
            <div key={p.slug} data-reveal>
              <ProjectCard project={p} fig={`07.${i + 1}`} />
            </div>
          ))}
          <a
            data-reveal
            href={github.href}
            target="_blank"
            rel="noopener"
            className="group graph-paper flex min-h-[320px] flex-col justify-between border border-dashed border-rule-strong bg-paper p-6 transition-colors hover:border-ink"
          >
            <span className="label text-muted">More on the way</span>
            <span>
              <span className="block font-display text-h3 font-bold tracking-[-0.02em]">
                More projects are being written up.
              </span>
              <span className="label mt-4 inline-block text-ink">
                Meanwhile, on GitHub <span className="inline-block transition-transform group-hover:translate-x-1">↗</span>
              </span>
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
