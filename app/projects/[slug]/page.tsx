import type { Metadata } from "next";
import { MotionController } from "@/components/motion/motion-controller";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense, type ComponentType } from "react";
import { ProjectVisual } from "@/components/project-visual";
import { Figure, Status, Tag } from "@/components/ui";
import { adjacentProjects, allProjects, formatDate, getProject } from "@/lib/projects";

export function generateStaticParams() {
  return allProjects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.summary,
    openGraph: {
      title: project.title,
      description: project.summary,
      images: project.cover ? [{ url: project.cover.src }] : undefined,
    },
  };
}

/** The MDX write-up is optional — a project can ship with just its data entry. */
async function loadBody(slug: string): Promise<ComponentType | null> {
  try {
    return (await import(`@/content/projects/${slug}.mdx`)).default;
  } catch {
    return null;
  }
}

export default function ProjectPage({ params }: PageProps<"/projects/[slug]">) {
  // Known slugs are prerendered; the fallback only covers unknown ones while they 404.
  return (
    <Suspense fallback={<div className="min-h-svh" />}>
      <ProjectContent params={params} />
    </Suspense>
  );
}

async function ProjectContent({ params }: Pick<PageProps<"/projects/[slug]">, "params">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const Body = await loadBody(slug);
  const { prev, next } = adjacentProjects(slug);
  const primaryLink = project.links[0];

  return (
    <article className="pt-16">
      <header className="shell pt-12 md:pt-20">
        <Link href="/projects" className="label link text-muted">
          ← All projects
        </Link>

        <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2">
          <p className="label text-muted">
            <span className="text-ink">Project</span>&nbsp;&nbsp;{formatDate(project.date)}
          </p>
          <Status status={project.status} />
        </div>

        <h1
          data-split="load"
          className="mt-6 font-display text-[clamp(52px,10vw,144px)] leading-[0.88] font-extrabold tracking-[-0.045em]"
        >
          {project.title}
          <span className="text-signal">.</span>
        </h1>

        <div className="mt-10 grid gap-10 md:grid-cols-12">
          <p data-reveal className="text-lg md:col-span-7">
            {project.description}
          </p>
          <dl data-reveal className="grid gap-0 border-t border-ink text-sm md:col-span-4 md:col-start-9">
            {project.role && (
              <div className="grid grid-cols-[88px_1fr] gap-4 border-b border-rule py-3">
                <dt className="label pt-0.5 text-muted">Role</dt>
                <dd>{project.role}</dd>
              </div>
            )}
            <div className="grid grid-cols-[88px_1fr] gap-4 border-b border-rule py-3">
              <dt className="label pt-0.5 text-muted">Stack</dt>
              <dd className="flex flex-wrap gap-1.5">
                {project.stack.map((s) => (
                  <Tag key={s}>{s}</Tag>
                ))}
              </dd>
            </div>
            <div className="grid grid-cols-[88px_1fr] gap-4 border-b border-rule py-3">
              <dt className="label pt-0.5 text-muted">Links</dt>
              <dd className="flex flex-col gap-1.5">
                {project.links.map((l) => (
                  <a key={l.href} href={l.href} target="_blank" rel="noopener" className="link w-fit">
                    {l.label} ↗
                  </a>
                ))}
              </dd>
            </div>
          </dl>
        </div>

        {primaryLink && (
          <div data-reveal className="mt-10 flex flex-wrap gap-3">
            {project.links.slice(0, 2).map((l, i) => (
              <a
                key={l.href}
                href={l.href}
                target="_blank"
                rel="noopener"
                className={`btn ${i === 0 ? "btn-primary" : "btn-secondary"}`}
              >
                {l.label} <span aria-hidden>↗</span>
              </a>
            ))}
          </div>
        )}
      </header>

      <div className="shell mt-14 md:mt-20">
        <Figure fig="01" caption={project.diagram ? "Architecture" : project.cover?.alt}>
          <ProjectVisual project={project} sizes="(min-width: 1280px) 1184px, 100vw" priority />
        </Figure>
      </div>

      {project.metrics && (
        <div className="shell">
          <dl className="grid grid-cols-3 border-b border-rule">
            {project.metrics.map((m) => (
              <div key={m.label} data-reveal className="flex flex-col-reverse justify-end py-6 pr-4 not-first:border-l not-first:border-rule not-first:pl-4 md:not-first:pl-6">
                <dt className="label mt-2 text-muted">{m.label}</dt>
                <dd className="font-display text-[clamp(28px,4vw,52px)] leading-none font-bold tracking-[-0.03em]">{m.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      )}

      {Body && (
        <div className="shell section !pb-0">
          <div className="grid md:grid-cols-12">
            <div className="md:col-span-8 md:col-start-5">
              <Body />
            </div>
          </div>
        </div>
      )}

      {project.gallery && project.gallery.length > 0 && (
        <div className="shell section !pb-0">
          <p className="label mb-6 text-muted">Gallery</p>
          <div className="grid gap-6 md:grid-cols-2">
            {project.gallery.map((g, i) => (
              <div key={g.src} data-reveal className={project.gallery!.length === 1 ? "md:col-span-2" : ""}>
                <Figure fig={`0${i + 2}`} caption={g.caption}>
                  <Image src={g.src} alt={g.alt} width={g.width} height={g.height} sizes="(min-width: 768px) 50vw, 100vw" className="h-auto w-full" />
                </Figure>
              </div>
            ))}
          </div>
        </div>
      )}

      <nav aria-label="More projects" className="shell section">
        <div className="grid border-t border-ink md:grid-cols-2">
          {[
            { dir: "Previous", p: prev },
            { dir: "Next", p: next },
          ].map(({ dir, p }) => (
            <Link
              key={dir}
              href={`/projects/${p.slug}`}
              className={`group flex flex-col gap-3 border-b border-rule py-8 transition-colors hover:bg-paper-raised md:px-6 ${
                dir === "Next" ? "md:border-l md:text-right" : "md:pl-0"
              }`}
            >
              <span className="label text-muted">
                {dir === "Previous" ? "← " : ""}
                {dir} project
                {dir === "Next" ? " →" : ""}
              </span>
              <span className="font-display text-[clamp(32px,4vw,52px)] leading-none font-bold tracking-[-0.03em] transition-colors group-hover:text-signal-ink">
                {p.title}
              </span>
              <span className="text-sm text-muted">{p.summary}</span>
            </Link>
          ))}
        </div>
      </nav>
      <MotionController />
    </article>
  );
}
