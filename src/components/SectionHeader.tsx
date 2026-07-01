import type { ReactNode } from "react";

type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  sub?: string;
  action?: ReactNode;
};

export function SectionHeader({ eyebrow, title, sub, action }: SectionHeaderProps) {
  return (
    <div className="section-header flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
      <div className="max-w-2xl">
        {eyebrow && <p className="section-label mb-3">{eyebrow}</p>}
        <h2 className="font-display text-3xl lg:text-4xl tracking-tight text-balance whitespace-pre-line">
          {title}
        </h2>
        {sub && <p className="mt-3 text-muted-foreground leading-relaxed">{sub}</p>}
      </div>
      {action}
    </div>
  );
}
