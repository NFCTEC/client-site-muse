import type { Locale } from "@/lib/locale";

/** App Store / Google Play badges — decorative until store URLs are published. */
export function MobileAppStoreComingSoon({ locale }: { locale: Locale }) {
  const zh = locale === "zh";

  return (
    <div className="rounded-2xl border border-border bg-card-gradient p-6 sm:p-7">
      <p className="text-sm font-medium text-foreground">
        {zh ? "手机写卡 App" : "Mobile provisioning app"}
      </p>
      <p className="mt-1 text-sm text-muted-foreground leading-relaxed max-w-xl">
        {zh
          ? "适用于带 NFC 的 Android 与 iPhone 产线贴卡。App Store 与 Google Play 版本即将发布；上架前请使用下载中心的桌面客户端。"
          : "NFC tap-to-provision on Android phones and iPhones. App Store and Google Play releases are coming soon—use the desktop client from the download center until then."}
      </p>
      <div className="mt-5 flex flex-wrap items-center gap-3">
        <StoreBadge kind="apple" label={zh ? "App Store" : "App Store"} soonLabel={zh ? "即将发布" : "Coming soon"} />
        <StoreBadge kind="google" label={zh ? "Google Play" : "Google Play"} soonLabel={zh ? "即将发布" : "Coming soon"} />
      </div>
    </div>
  );
}

function StoreBadge({
  kind,
  label,
  soonLabel,
}: {
  kind: "apple" | "google";
  label: string;
  soonLabel: string;
}) {
  return (
    <span
      className="relative inline-flex items-center gap-3 rounded-xl border border-border bg-background/80 px-3 py-2.5 opacity-80 cursor-not-allowed select-none"
      aria-disabled="true"
      title={soonLabel}
    >
      {kind === "apple" ? <AppleIcon /> : <PlayIcon />}
      <span className="text-left leading-tight">
        <span className="block text-[9px] uppercase tracking-wide text-muted-foreground">
          {kind === "apple" ? "Download on the" : "Get it on"}
        </span>
        <span className="block text-sm font-semibold">{label}</span>
      </span>
      <span className="absolute -top-2 -right-2 rounded-full bg-primary/90 px-2 py-0.5 text-[10px] font-semibold text-primary-foreground shadow-sm">
        {soonLabel}
      </span>
    </span>
  );
}

function AppleIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" aria-hidden className="shrink-0 fill-current">
      <path d="M16.365 1.43c.05 1.05-.3 2.08-.92 2.87-.65.83-1.74 1.47-2.78 1.38-.07-.98.32-2.02.9-2.78.66-.85 1.88-1.53 2.8-1.47zm.1 2.87c1.55.05 2.95 1.02 3.72 1.02.77 0 1.96-.97 3.32-.92 1.7.07 3.2 1 4.01 2.52-3.52 2.11-2.94 7.62.65 9.02-.6 1.56-1.38 3.1-2.48 4.55-1 .52-2.12 1.46-3.21 1.42-1.2-.05-1.64-.76-3.08-.76-1.44 0-1.94.74-3.15.73-1.26-.02-2.2-1.17-3.24-1.7C5.36 16.48 3.4 12.3 5.06 8.43c.78-1.78 2.38-3.02 4.3-3.12 1.25-.08 2.44.54 3.2.54.76 0 2.2-.66 3.71-.56.63.03 2.4.25 3.53 1.88-.09.06-2.11 1.23-2.09 3.68z" />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" aria-hidden className="shrink-0">
      <path fill="#34A853" d="M3.6 2.4l12.6 7.2-2.3 1.3L3.6 2.4z" />
      <path fill="#FBBC04" d="M3.6 21.6l10.3-8.5 2.3 1.3L3.6 21.6z" />
      <path fill="#4285F4" d="M14 12L3.6 2.4l10.4 9.6z" />
      <path fill="#EA4335" d="M14 12l10 6.8V5.2L14 12z" />
    </svg>
  );
}