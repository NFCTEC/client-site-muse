import { useTheme } from "@/lib/theme";
import { LOGO_DARK_SRC, LOGO_SRC } from "@/lib/brand";

type LogoProps = {
  className?: string;
};

/** Theme-aware logo: transparent background, larger default size, dark-mode variant. */
export function Logo({ className = "h-11 md:h-12 w-auto" }: LogoProps) {
  const { theme } = useTheme();
  const src = theme === "dark" ? LOGO_DARK_SRC : LOGO_SRC;

  return (
    <img
      src={src}
      alt="NFCTEC"
      width={180}
      height={48}
      className={className}
      decoding="async"
    />
  );
}
