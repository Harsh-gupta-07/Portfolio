import { SectionHeader, Tag } from "@/components/ui";
import { coursework, education } from "@/data/education";

export function Education() {
  return (
    <section id="education" className="section border-t border-rule">
      <div className="shell">
        <SectionHeader index="02" label="Education" title="Where I’m learning the fundamentals." />

        <ol className="relative md:ml-[calc(100%/12*4)]">
          <span aria-hidden data-draw className="absolute top-2 bottom-0 left-[5px] w-px bg-ink" />
          {education.map((e) => (
            <li key={e.title} data-reveal className="relative grid gap-4 pb-14 pl-10 last:pb-0 md:grid-cols-[1fr_auto] md:gap-10">
              <span
                aria-hidden
                className={`absolute top-2 left-0 size-[11px] rounded-full border border-ink ${
                  e.primary ? "bg-signal" : "bg-paper"
                }`}
              />
              <div>
                <p className="label text-muted">{e.period}</p>
                <h3 className={`mt-2 font-display font-semibold tracking-[-0.02em] ${e.primary ? "text-h3 md:text-[36px]" : "text-[22px]"}`}>
                  {e.title}
                </h3>
                <p className="mt-1 text-muted">{e.institute}</p>
                {e.note && <p className="mt-3 text-sm text-muted">{e.note}</p>}
              </div>
              <div className="md:text-right">
                <p className={`font-display font-bold tracking-[-0.03em] ${e.primary ? "text-[56px] leading-none" : "text-[32px] leading-none"}`}>
                  {e.score}
                </p>
                <p className="label mt-2 text-muted">{e.scoreLabel}</p>
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-20 grid gap-10 border-t border-rule pt-10 md:grid-cols-12">
          <h3 data-reveal className="label text-ink md:col-span-4">
            Relevant coursework
          </h3>
          <div className="grid gap-8 sm:grid-cols-2 md:col-span-8">
            {coursework.map((c) => (
              <div key={c.group} data-reveal>
                <p className="text-sm font-medium">{c.group}</p>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {c.items.map((item) => (
                    <li key={item}>
                      <Tag>{item}</Tag>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
