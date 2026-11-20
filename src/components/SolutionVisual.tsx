import { SolutionArt } from "@/components/SolutionArt";

type SolutionVisualProps = {
  slug?: string;
  src?: string | null;
  alt: string;
  icon?: string;
  className?: string;
};

export function SolutionVisual({ slug, src, alt, className = "aspect-[16/9]" }: SolutionVisualProps) {
  if (src && /^\/(?!\/)|^https:\/\//.test(src)) {
    return (
      <div className={`relative w-full overflow-hidden border-b border-border bg-surface ${className}`}>
        <img src={src} alt={alt} loading="lazy" decoding="async" className="h-full w-full object-contain p-3" />
      </div>
    );
  }

  return (
    <div className={`relative w-full overflow-hidden border-b border-border bg-surface ${className}`}>
      <SolutionArt slug={slug} className="absolute inset-0 h-full w-full" />
      <span className="sr-only">{alt}</span>
    </div>
  );
}
