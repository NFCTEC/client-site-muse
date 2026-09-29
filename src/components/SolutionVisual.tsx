import { SolutionArt } from "@/components/SolutionArt";

type SolutionVisualProps = {
  slug?: string;
  src?: string | null;
  alt: string;
  icon?: string;
  className?: string;
};

export function SolutionVisual({ slug, alt, className = "aspect-[16/9]" }: SolutionVisualProps) {
  return (
    <div className={`relative w-full overflow-hidden bg-card-gradient ${className}`}>
      <SolutionArt slug={slug} className="absolute inset-0 h-full w-full" />
      <span className="sr-only">{alt}</span>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/20 via-transparent to-white/[0.04]" />
      <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-border/50 dark:ring-white/10" />
    </div>
  );
}
