import * as LucideIcons from "lucide-react";
import type { LucideIcon } from "lucide-react";

type SolutionVisualProps = {
  src?: string | null;
  alt: string;
  icon?: string;
  className?: string;
};

function getIcon(name?: string): LucideIcon {
  const icons = LucideIcons as unknown as Record<string, LucideIcon>;
  return (name && icons[name]) || LucideIcons.Boxes;
}

export function SolutionVisual({ src, alt, icon, className = "aspect-[16/9]" }: SolutionVisualProps) {
  const Icon = getIcon(icon);

  return (
    <div className={`relative w-full overflow-hidden bg-card-gradient ${className}`}>
      {src ? (
        <>
          <img
            src={src}
            alt={alt}
            width={800}
            height={450}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover dark:[filter:none] [filter:brightness(1.08)_saturate(0.9)_contrast(0.95)]"
          />
          <div className="pointer-events-none absolute inset-0 dark:hidden bg-gradient-to-b from-white/30 via-transparent to-white/55" />
          <div className="pointer-events-none absolute inset-0 dark:hidden bg-gradient-to-tr from-[color-mix(in_oklab,var(--primary)_10%,transparent)] via-transparent to-[color-mix(in_oklab,#7B2FFF_10%,transparent)]" />
        </>
      ) : (
        <div className="absolute inset-0 grid place-items-center">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,oklch(0.58_0.18_255_/_0.12),transparent_62%)]" />
          <div className="absolute h-40 w-40 rounded-full border border-primary/15" />
          <div className="absolute h-28 w-28 rounded-full border border-dashed border-primary/25" />
          <div className="relative grid h-16 w-16 place-items-center rounded-2xl border border-primary/25 bg-primary/10 text-primary">
            <Icon size={28} />
          </div>
        </div>
      )}
      <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-border/60 dark:ring-transparent" />
    </div>
  );
}
