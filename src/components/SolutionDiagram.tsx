export type DiagramLane = { name: string; nodes: string[] };

export function SolutionDiagram({ title, lanes }: { title: string; lanes: DiagramLane[] }) {
  return (
    <figure className="my-8 rounded-2xl border border-border bg-card/70 p-4 sm:p-6">
      <figcaption className="mb-4 font-display text-base font-semibold tracking-tight">{title}</figcaption>
      <div className={`grid gap-4 ${lanes.length > 2 ? "lg:grid-cols-4" : "md:grid-cols-2"}`}>
        {lanes.map((lane) => (
          <div key={lane.name} className="min-w-0">
            <div className="mb-2 text-[11px] font-mono uppercase tracking-[0.14em] text-primary">{lane.name}</div>
            <ol className="space-y-2">
              {lane.nodes.map((node, index) => (
                <li key={node}>
                  <div className="rounded-lg border border-border bg-background px-3 py-2.5 text-sm leading-snug">
                    <span className="mb-1 block font-mono text-[10px] text-muted-foreground">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    {node}
                  </div>
                  {index < lane.nodes.length - 1 ? (
                    <div className="py-1 text-center text-xs text-muted-foreground" aria-hidden>
                      ↓
                    </div>
                  ) : null}
                </li>
              ))}
            </ol>
          </div>
        ))}
      </div>
    </figure>
  );
}
