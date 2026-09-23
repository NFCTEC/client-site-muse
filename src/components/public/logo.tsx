import Image from "next/image";

export function Logo({ className = "h-9 w-auto", priority = false }: { className?: string; priority?: boolean }) {
  return <Image src="/nfctec-logo.png" alt="NFCTEC" width={359} height={107} className={className} priority={priority} />;
}
