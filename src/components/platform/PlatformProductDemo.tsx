import { useState } from "react";
import type { Locale } from "@/lib/locale";
import {
  PlatformClientScreen,
  PlatformDashboardScreen,
  PlatformVerifyScreen,
} from "@/components/platform/PlatformDemoScreens";

const TABS = ["dashboard", "client", "verify"] as const;

export function PlatformProductDemo({ locale }: { locale: Locale }) {
  const zh = locale === "zh";
  const [tab, setTab] = useState<(typeof TABS)[number]>("dashboard");

  const tabLabel = (id: (typeof TABS)[number]) =>
    id === "dashboard"
      ? zh
        ? "控制台"
        : "Dashboard"
      : id === "client"
        ? zh
          ? "写卡软件"
          : "Provisioning"
        : zh
          ? "验真"
          : "Verify";

  const panel =
    tab === "dashboard" ? (
      <PlatformDashboardScreen locale={locale} />
    ) : tab === "client" ? (
      <PlatformClientScreen locale={locale} />
    ) : (
      <PlatformVerifyScreen locale={locale} />
    );

  return (
    <div>
      <div className="flex flex-wrap gap-2" role="tablist" aria-label={zh ? "产品界面" : "Product interfaces"}>
        {TABS.map((id) => (
          <button
            key={id}
            type="button"
            role="tab"
            aria-selected={tab === id}
            onClick={() => setTab(id)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              tab === id
                ? "bg-primary text-primary-foreground"
                : "border border-border text-muted-foreground hover:text-foreground"
            }`}
          >
            {tabLabel(id)}
          </button>
        ))}
      </div>
      <div role="tabpanel" className="mt-6 platform-rise">
        {panel}
        <p className="mt-3 text-xs text-muted-foreground leading-relaxed">
          {zh
            ? "营销用界面示意，示例数据已脱敏，非客户生产环境截图。"
            : "Marketing UI mock-up with redacted sample data, not a customer production capture."}
        </p>
      </div>
    </div>
  );
}
