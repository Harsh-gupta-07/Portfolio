import { HeroCanvas } from "@/components/three/hero-canvas";
import { profile, type Stat } from "@/data/profile";

function StatValue({ stat }: { stat: Stat }) {
  if ("text" in stat) return <>{stat.text}</>;
  const final =
    stat.value.toLocaleString("en-US", {
      minimumFractionDigits: stat.decimals ?? 0,
      maximumFractionDigits: stat.decimals ?? 0,
    }) + (stat.suffix ?? "");
  return (
    <span data-count={stat.value} data-decimals={stat.decimals ?? 0} data-suffix={stat.suffix ?? ""}>
      {final}
    </span>
  );
}

export function Hero() {
  return (
    <section id="top" className="relative isolate flex min-h-svh flex-col overflow-hidden pt-16">
      <div
        aria-hidden
        className="graph-paper absolute inset-0 -z-10 [mask-image:linear-gradient(to_bottom,black_55%,transparent)]"
      />
      <div className="absolute inset-0 -z-10">
        <HeroCanvas />
      </div>

      <div className="shell flex flex-1 flex-col pt-10 md:pt-16">
        <p data-reveal className="label flex items-center gap-3 text-muted">
          <span className="live-dot" aria-hidden />
          B.Tech CS & AI · Newton School of Technology ’28
        </p>

        <h1 data-split="load" className="mt-8 text-h1 font-extrabold tracking-[-0.035em]">
          {profile.firstName}
          <br />
          {profile.lastName}
          <span className="text-signal">.</span>
        </h1>

        <div className="mt-10 grid max-w-[640px] gap-8 md:mt-12">
          <p data-reveal className="max-w-[40ch] text-lg text-ink">
            {profile.tagline}
          </p>
          <div data-reveal className="flex flex-wrap items-start gap-3">
            <a href="#work" className="btn btn-primary">
              See the work <span aria-hidden>↓</span>
            </a>
            {profile.socials.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener" className="btn btn-secondary">
                {s.label} <span aria-hidden>↗</span>
              </a>
            ))}
          </div>
        </div>

        <p
          aria-hidden
          className="label mt-10 hidden self-end text-muted md:block md:mt-auto md:pt-10"
        >
          <span className="text-ink">FIG. 01</span>&nbsp;&nbsp;Jobs hopping through a queue graph move your cursor
        </p>
      </div>

      {/* 2×2 on phones, 1×4 from md. Borders drawn between cells only. */}
      <dl className="shell mt-10 grid grid-cols-2 md:grid-cols-4">
        {profile.stats.map((stat) => (
          <div
            key={stat.label}
            data-reveal
            className="flex flex-col-reverse justify-end border-t border-ink py-6 pr-4 pl-4 nth-[odd]:pl-0 nth-[even]:border-l nth-[even]:border-l-rule md:pl-6 md:nth-[odd]:pl-6 md:first:pl-0 md:not-first:border-l md:not-first:border-l-rule"
          >
            <dt className="label mt-2 text-muted">{stat.label}</dt>
            <dd className="font-display text-[clamp(28px,3.4vw,44px)] font-bold tracking-[-0.03em]">
              <StatValue stat={stat} />
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
