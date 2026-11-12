import type { ReactNode } from "react";
import type { ProjectStatus } from "@/content/projects";
import { statusLabel } from "@/lib/projects";

export function SectionHeader({
  index,
  label,
  title,
  children,
}: {
  index: string;
  label: string;
  title: ReactNode;
  children?: ReactNode;
}) {
  return (
    <header className="mb-12 md:mb-20">
      <div className="label flex items-center gap-4 text-muted">
        <span className="text-ink">{index}</span>
        <span>{label}</span>
        <span aria-hidden className="h-px flex-1 bg-rule" />
      </div>
      <div className="mt-8 grid gap-6 md:grid-cols-12">
        <h2 data-split className="text-h2 font-bold md:col-span-8">
          {title}
        </h2>
        {children && (
          <div data-reveal className="self-end text-muted md:col-span-4">
            {children}
          </div>
        )}
      </div>
    </header>
  );
}

export function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-chip bg-paper-sunk px-2 py-1 font-mono text-[12px] leading-none text-muted">
      {children}
    </span>
  );
}

const statusDot: Record<ProjectStatus, string> = {
  live: "live-dot",
  shipped: "bg-ok",
  wip: "bg-warn",
  archived: "bg-faint",
};

export function Status({ status }: { status: ProjectStatus }) {
  return (
    <span className="label inline-flex items-center gap-2 text-muted">
      <span className={`inline-block size-2 rounded-full ${statusDot[status]}`} aria-hidden />
      {statusLabel[status]}
    </span>
  );
}

/** Screenshot / diagram frame with a mono caption strip. */
export function Figure({
  fig,
  caption,
  children,
  className = "",
}: {
  fig?: string;
  caption?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <figure className={`border border-rule bg-paper-raised ${className}`}>
      <div className="overflow-hidden">{children}</div>
      {(fig || caption) && (
        <figcaption className="label flex gap-3 border-t border-rule px-3 py-2 text-muted">
          {fig && <span className="text-ink">FIG. {fig}</span>}
          {caption && <span className="truncate normal-case tracking-normal">{caption}</span>}
        </figcaption>
      )}
    </figure>
  );
}

export function ExternalArrow() {
  return <span aria-hidden>↗</span>;
}
