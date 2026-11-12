/** goQueue architecture: API → Redis priority lanes → Go workers → Postgres, with the scheduler loop. */
export function GoqueueDiagram({ className = "" }: { className?: string }) {
  const box = "fill-paper-raised stroke-ink";
  const mono = "font-mono text-[13px] fill-ink";
  const small = "font-mono text-[11px] fill-muted";
  return (
    <svg
      viewBox="0 0 800 440"
      role="img"
      aria-labelledby="gq-title"
      className={`graph-paper block h-auto w-full bg-paper ${className}`}
    >
      <title id="gq-title">
        goQueue architecture: the REST API writes jobs to PostgreSQL and pushes them onto High, Normal and Low
        Redis lanes; worker goroutines drain the lanes and record results in PostgreSQL; a scheduler promotes
        due jobs.
      </title>
      <defs>
        <marker id="gq-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
          <path d="M0 0 10 5 0 10z" className="fill-ink" />
        </marker>
        <marker id="gq-arrow-signal" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
          <path d="M0 0 10 5 0 10z" className="fill-signal" />
        </marker>
      </defs>

      {/* API */}
      <rect x="40" y="70" width="150" height="96" className={box} strokeWidth="1.5" />
      <text x="56" y="100" className={mono}>REST API</text>
      <text x="56" y="124" className={small}>POST /jobs</text>
      <text x="56" y="142" className={small}>POST /jobs/schedule</text>

      {/* Redis lanes */}
      <text x="300" y="56" className={small}>REDIS · PRIORITY LANES</text>
      {[
        { y: 70, label: "HIGH", fill: "fill-signal" },
        { y: 118, label: "NORMAL", fill: "fill-paper-raised" },
        { y: 166, label: "LOW", fill: "fill-paper-raised" },
      ].map((lane) => (
        <g key={lane.label}>
          <rect x="300" y={lane.y} width="200" height="36" className={`${lane.fill} stroke-ink`} strokeWidth="1.5" />
          <text x="314" y={lane.y + 23} className={mono}>{lane.label}</text>
          {[0, 1, 2].map((k) => (
            <rect key={k} x={430 + k * 20} y={lane.y + 10} width="12" height="16" className="fill-ink" opacity={0.85 - k * 0.25} />
          ))}
        </g>
      ))}

      {/* Workers */}
      <rect x="610" y="70" width="150" height="132" className={box} strokeWidth="1.5" />
      <text x="626" y="100" className={mono}>WORKERS × N</text>
      {[0, 1, 2, 3].map((k) => (
        <circle key={k} cx={640 + k * 28} cy="140" r="9" className="fill-paper stroke-ink" strokeWidth="1.5" />
      ))}
      <text x="626" y="184" className={small}>goroutines</text>

      {/* Postgres */}
      <rect x="40" y="300" width="720" height="84" className={box} strokeWidth="1.5" />
      <text x="56" y="332" className={mono}>POSTGRESQL · source of truth</text>
      <text x="56" y="358" className={small}>jobs · status · retries · logs · results</text>

      {/* Scheduler */}
      <rect x="300" y="226" width="200" height="40" className="fill-paper stroke-ink" strokeWidth="1.5" strokeDasharray="5 4" />
      <text x="314" y="251" className={mono}>SCHEDULER LOOP</text>

      {/* Flows */}
      <path d="M190 118 H300" className="stroke-ink" strokeWidth="1.5" fill="none" markerEnd="url(#gq-arrow)" />
      <path d="M115 166 V300" className="stroke-ink" strokeWidth="1.5" fill="none" markerEnd="url(#gq-arrow)" />
      <text x="124" y="240" className={small}>persist</text>
      <path d="M500 136 H610" className="stroke-ink" strokeWidth="1.5" fill="none" markerEnd="url(#gq-arrow)" />
      <path d="M685 202 V300" className="stroke-ink" strokeWidth="1.5" fill="none" markerEnd="url(#gq-arrow)" />
      <text x="694" y="256" className={small}>result</text>
      <path d="M400 300 V266" className="stroke-ink" strokeWidth="1.5" fill="none" markerEnd="url(#gq-arrow)" />
      <path d="M400 226 V202" className="stroke-ink" strokeWidth="1.5" fill="none" markerEnd="url(#gq-arrow)" />
      <text x="410" y="290" className={small}>due jobs</text>

      {/* One High-priority job, end to end */}
      <path
        d="M190 96 H250 V88 H300 M500 88 H560 V96 H610"
        className="gq-flow stroke-signal"
        strokeWidth="2.5"
        fill="none"
        strokeDasharray="8 6"
        markerEnd="url(#gq-arrow-signal)"
      />
      <style>{`
        .gq-flow { animation: gq-dash 1.1s linear infinite; }
        @keyframes gq-dash { to { stroke-dashoffset: -28; } }
      `}</style>
    </svg>
  );
}
