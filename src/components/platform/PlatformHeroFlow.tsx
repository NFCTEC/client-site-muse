import { ArrowRight } from "lucide-react";
import type { Locale } from "@/lib/locale";
import { PlatformDashboardScreen } from "@/components/platform/PlatformDemoScreens";

/** Hero product preview — scaled dashboard mock, same design system as demo tabs. */
export function PlatformHeroFlow({ locale }: { locale: Locale }) {
  const zh = locale === "zh";
  const steps = zh
    ? ["工厂写卡", "NFCTEC Cloud", "验真"]
    : ["Factory", "NFCTEC Cloud", "Verify"];

  return (
    <figure className="w-full max-w-md lg:max-w-none lg:ml-auto">
      <div aria-hidden className="mb-3 flex flex-wrap items-center justify-center gap-2 text-[10px] font-medium text-muted-foreground uppercase tracking-wider">
        {steps.map((label, i) => (
          <span key={label} className="inline-flex items-center gap-2">
            {i > 0 && <ArrowRight size={12} className="opacity-50" />}
            <span>{label}</span>
          </span>
        ))}
      </div>
      <PlatformDashboardScreen locale={locale} />
      <figcaption className="mt-3 text-xs text-muted-foreground leading-relaxed">
        {zh
          ? "云端控制台示意。切换下方标签可查看写卡客户端与验真结果。"
          : "Cloud console mock-up. Use the tabs below for provisioning client and verify result."}
      </figcaption>
    </figure>
  );
}
