import { profile } from "@/data/profile";

export function SiteFooter() {
  return (
    <footer id="contact" className="border-t border-ink bg-paper">
      <div className="shell section !pb-10">
        <p className="label text-muted">
          <span className="text-ink">08</span>&nbsp;&nbsp;&nbsp;Contact
        </p>
        <h2 data-split className="mt-8 max-w-[14ch] text-h2 font-bold">
          Have a system that needs building? Let’s talk.
        </h2>

        <a
          data-reveal
          href={`mailto:${profile.email}`}
          className="group mt-12 inline-flex max-w-full items-center gap-4 border-b-2 border-ink pb-2 font-display text-[clamp(20px,4.2vw,56px)] font-semibold tracking-[-0.02em] break-all transition-colors hover:border-signal"
        >
          {profile.email}
          <span
            aria-hidden
            className="shrink-0 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
          >
            ↗
          </span>
        </a>

        <div className="mt-20 grid gap-8 border-t border-rule pt-8 md:grid-cols-12">
          <ul className="flex flex-wrap gap-x-8 gap-y-3 md:col-span-8">
            {profile.socials.map((s) => (
              <li key={s.label}>
                <a href={s.href} target="_blank" rel="noopener" className="label link text-ink">
                  {s.label} ↗
                </a>
              </li>
            ))}
            <li>
              <a href={profile.resume} target="_blank" rel="noopener" className="label link text-ink">
                Résumé (PDF) ↗
              </a>
            </li>
          </ul>
          <p className="label text-muted md:col-span-4 md:text-right">
            Built with Next.js, GSAP & three.js
          </p>
        </div>
      </div>
    </footer>
  );
}
