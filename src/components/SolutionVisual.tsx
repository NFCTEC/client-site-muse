import { SolutionArt } from "@/components/SolutionArt";

const SOLUTION_IMAGE_BY_SLUG: Record<string, string> = {
  brand: "/images/nfctec-nfc-security-labels.webp",
  security: "/images/nfctec-nfc-security-labels.webp",
  access: "/images/nfctec-custom-smart-cards.webp",
  transit: "/images/nfctec-custom-smart-cards.webp",
  iot: "/images/nfctec-nfc-tags-and-inlays.webp",
};

type SolutionVisualProps = {
  slug?: string;
  src?: string | null;
  alt: string;
  icon?: string;
  className?: string;
};

export function SolutionVisual({ slug, src, alt, className = "aspect-[16/9]" }: SolutionVisualProps) {
  const imageSrc = src && /^\/(?!\/)|^https:\/\//.test(src) ? src : SOLUTION_IMAGE_BY_SLUG[slug ?? ""];
  if (imageSrc) {
    return (
      <div className={`relative w-full overflow-hidden border-b border-border bg-white ${className}`}>
        <img src={imageSrc} alt={alt} loading="lazy" decoding="async" className="h-full w-full object-contain p-2 sm:p-3" />
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
