import { Download } from "lucide-react";
import type { Locale } from "@/lib/locale";
import { PLATFORM_OVERVIEW_PDF } from "@/lib/platform-site";

export function PlatformOverviewPdfLink({ locale, className }: { locale: Locale; className?: string }) {
  const zh = locale === "zh";
  const base =
    className ??
    "inline-flex items-center gap-2 rounded-full border border-border-strong bg-surface/60 px-6 py-3 text-sm font-medium hover:border-primary hover:text-primary transition-colors";

  return (
    <a href={PLATFORM_OVERVIEW_PDF} className={base} target="_blank" rel="noopener noreferrer">
      <Download size={16} aria-hidden />
      {zh ? "下载平台介绍（PDF）" : "Platform overview (PDF)"}
    </a>
  );
}