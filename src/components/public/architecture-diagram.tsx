export function ArchitectureDiagram({
  title,
  nodes,
}: {
  title: string;
  nodes: { label: string; detail?: string }[];
}) {
  if (!nodes.length) return null;

  return (
    <figure className="mt-10 overflow-hidden rounded-[16px] border border-line bg-white">
      <figcaption className="flex items-center justify-between border-b border-line px-5 py-4">
        <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-muted">{title}</span>
        <span className="font-mono text-[10px] text-accent">SYSTEM / FLOW</span>
      </figcaption>
      <div className="hero-grid grid gap-0 p-5 sm:grid-cols-2 md:grid-cols-4 md:p-7">
        {nodes.slice(0, 4).map((node, index) => (
          <div key={`${node.label}-${index}`} className="relative pb-8 last:pb-0 sm:p-3 md:pb-3">
            <div className="relative z-10 h-full min-h-24 rounded-xl border border-line bg-white p-4 shadow-sm">
              <p className="font-mono text-[10px] text-accent">0{index + 1}</p>
              <p className="mt-3 font-semibold">{node.label}</p>
              {node.detail ? <p className="mt-1 line-clamp-2 text-xs leading-5 text-muted">{node.detail}</p> : null}
            </div>
            {index < Math.min(nodes.length, 4) - 1 ? (
              <span className="absolute bottom-2 left-1/2 text-accent sm:hidden" aria-hidden>↓</span>
            ) : null}
            {index < Math.min(nodes.length, 4) - 1 ? (
              <span className="absolute -right-1 top-1/2 z-20 hidden -translate-y-1/2 text-accent md:block" aria-hidden>→</span>
            ) : null}
          </div>
        ))}
      </div>
    </figure>
  );
}
