import { SolutionArt } from "@/components/SolutionArt";

const SOLUTION_IMAGE_BY_SLUG: Record<string, string> = {
  brand: "/images/nfctec-brand-protection-authentication.webp",
  security: "/images/nfctec-brand-protection-authentication.webp",
  access: "/images/nfctec-access-control-transit.webp",
  transit: "/images/nfctec-access-control-transit.webp",
  banking: "/images/nfctec-desfire-ev2-ev3-products.webp",
  gov: "/images/nfctec-desfire-ev2-ev3-products.webp",
  edu: "/images/nfctec-access-control-transit.webp",
  health: "/images/nfctec-healthcare-nfc-identification.webp",
  retail: "/images/nfctec-brand-protection-authentication.webp",
  auto: "/images/nfctec-nfc-manufacturing-applications.webp",
  wallet: "/images/nfctec-cloud-services-security.webp",
  iot: "/images/nfctec-nfc-manufacturing-applications.webp",
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
