/**
 * A real wchr session (from the screenshot in public/projects/wchr), redrawn
 * as HTML so it stays sharp and its lines can print in one by one on scroll.
 */
type Line = { text: string; tone?: "cmd" | "ok" | "info" | "run" | "save" | "stop" | "out" };

const session: Line[] = [
  { text: '~/Github/figs % wchr "cargo run"', tone: "cmd" },
  { text: "✓ Using .gitignore to filter watched files.", tone: "ok" },
  { text: "ℹ Current directory: ~/Github/figs", tone: "info" },
  { text: "✓ Watching ~/Github/figs for changes...", tone: "ok" },
  { text: "▶ Running command: 'cargo run'", tone: "run" },
  { text: "    Finished `dev` profile [unoptimized + debuginfo] in 0.07s", tone: "out" },
  { text: "     Running `target/debug/figs`", tone: "out" },
  { text: "Starting static file server on 127.0.0.1:9000" },
  { text: '↻ Saved: "~/Github/figs/src/lib.rs"', tone: "save" },
  { text: "! Stopping the current command...", tone: "stop" },
  { text: "▶ Running command: 'cargo run'", tone: "run" },
  { text: "   Compiling figs v0.2.1", tone: "out" },
  { text: "    Finished `dev` profile [unoptimized + debuginfo] in 0.25s", tone: "out" },
  { text: "     Running `target/debug/figs`", tone: "out" },
  { text: "Starting static file server on 127.0.0.1:9000" },
];

const toneClass: Record<NonNullable<Line["tone"]>, string> = {
  cmd: "text-paper",
  ok: "text-paper",
  info: "text-paper/70",
  run: "text-signal",
  save: "text-signal",
  stop: "text-paper/70",
  out: "text-paper/45",
};

export function WchrTerminal() {
  return (
    <div
      role="img"
      aria-label="Terminal running wchr: it watches the figs project, reruns cargo run on start, then stops and reruns it after src/lib.rs is saved."
      className="flex h-full min-h-full flex-col bg-ink font-mono text-[11px] leading-[1.65] md:text-[13px]"
    >
      <div className="flex items-center gap-2 border-b border-paper/10 px-4 py-2.5">
        {[0, 1, 2].map((i) => (
          <span key={i} className="size-2.5 rounded-full bg-paper/20" />
        ))}
        <span className="ml-3 text-[11px] text-paper/50">zsh: figs</span>
      </div>
      <div aria-hidden className="flex-1 overflow-hidden px-4 py-3 whitespace-pre">
        {session.map((line, i) => (
          <div key={i} data-reveal="line" className={toneClass[line.tone ?? "info"]}>
            {line.text}
          </div>
        ))}
        <span className="mt-0.5 inline-block h-[1.1em] w-[0.6em] animate-pulse bg-paper/80 align-middle" />
      </div>
    </div>
  );
}
