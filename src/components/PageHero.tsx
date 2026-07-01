import type { ReactNode } from "react";

type PageHeroProps = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  meta?: ReactNode;
  actions?: ReactNode;
  align?: "left" | "center";
  compact?: boolean;
};

export function PageHero({
  eyebrow,
  title,
  subtitle,
  meta,
  actions,
  align = "left",
  compact = false,
}: PageHeroProps) {
  const alignClass = align === "center" ? "text-center mx-auto" : "text-left";

  return (
    <section className={`relative page-hero overflow-hidden ${compact ? "page-hero--compact" : ""}`}>
      <div className="absolute inset-0 bg-hero-glow pointer-events-none" />
      <div className={`relative mx-auto max-w-7xl px-6 lg:px-10 ${alignClass}`}>
        {eyebrow && <p className="section-label">{eyebrow}</p>}
        <h1
          className={`section-hero-title font-display font-semibold whitespace-pre-line text-balance max-w-4xl ${
            eyebrow ? "mt-3" : ""
          } ${align === "center" ? "mx-auto" : ""}`}
        >
          {title}
        </h1>
        {subtitle && (
          <p
            className={`mt-5 text-lg text-muted-foreground leading-relaxed max-w-2xl ${
              align === "center" ? "mx-auto" : ""
            }`}
          >
            {subtitle}
          </p>
        )}
        {meta && <div className="mt-4">{meta}</div>}
        {actions && (
          <div className={`mt-8 flex flex-wrap gap-3 ${align === "center" ? "justify-center" : ""}`}>
            {actions}
          </div>
        )}
      </div>
    </section>
  );
}
