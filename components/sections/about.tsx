import { SectionHeader } from "@/components/ui";

const facts = [
  { k: "Now", v: "B.Tech in Computer Science & AI, Newton School of Technology" },
  { k: "Focus", v: "Backend systems, queues & data, RL environments for LLMs" },
  { k: "Reach for", v: "Go, TypeScript, Python, PostgreSQL, Redis, Docker" },
];

export function About() {
  return (
    <section id="about" className="section">
      <div className="shell">
        <SectionHeader index="01" label="About" title="The part of software nobody sees." />
        <div className="grid gap-12 md:grid-cols-12">
          <p data-scrub-words className="text-statement font-display font-medium md:col-span-8">
            I’m a computer science and AI student who likes the layer under the interface the queue
            behind the button, the API behind the page, the environment behind the model. I build things
            end to end, then measure them: jobs per second, products served, reward per episode.
          </p>
          <dl className="self-end border-t border-ink md:col-span-4">
            {facts.map((f) => (
              <div key={f.k} data-reveal className="grid grid-cols-[96px_1fr] gap-4 border-b border-rule py-4">
                <dt className="label pt-1 text-muted">{f.k}</dt>
                <dd>{f.v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
