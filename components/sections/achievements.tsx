import Image from "next/image";
import Link from "next/link";
import { Figure, SectionHeader } from "@/components/ui";
import { achievements } from "@/data/achievements";

export function Achievements() {
  return (
    <section id="achievements" className="section border-t border-rule">
      <div className="shell">
        <SectionHeader index="03" label="Achievements" title="Tested against hundreds of teams." />

        <div className="grid gap-16">
          {achievements.map((a) => (
            <article key={a.title + a.org} className="grid gap-10 md:grid-cols-12">
              <div className="md:col-span-5">
                <p data-reveal className="label flex items-center gap-3 text-muted">
                  <span className="text-ink">{a.year}</span>
                  <span>{a.org}</span>
                </p>
                <h3
                  data-reveal
                  className="mt-4 font-display text-[clamp(56px,8vw,112px)] leading-[0.9] font-extrabold tracking-[-0.045em]"
                >
                  {a.title}
                  <span className="text-signal">.</span>
                </h3>
                <p data-reveal className="mt-6 text-lg">
                  {a.summary}
                </p>
                <ul className="mt-6 grid gap-4 border-t border-rule pt-6">
                  {a.points.map((p) => (
                    <li key={p} data-reveal className="grid grid-cols-[20px_1fr] text-muted">
                      <span aria-hidden className="text-signal-ink">→</span>
                      {p}
                    </li>
                  ))}
                </ul>
                {a.project && (
                  <div data-reveal className="mt-8">
                    <Link href={`/projects/${a.project}`} className="btn btn-primary">
                      Read the project <span aria-hidden>→</span>
                    </Link>
                  </div>
                )}
              </div>
              {a.image && (
                <div data-reveal className="md:col-span-7 md:self-center">
                  <Figure fig="03" caption="OpenEnv playground - the agent’s action form">
                    <Image
                      src={a.image.src}
                      alt={a.image.alt}
                      width={2000}
                      height={1225}
                      sizes="(min-width: 768px) 58vw, 100vw"
                      className="h-auto w-full"
                    />
                  </Figure>
                </div>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
