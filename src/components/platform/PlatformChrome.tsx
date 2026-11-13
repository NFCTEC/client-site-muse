import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { PageSection } from "@/components/PageSection";
import type { Locale } from "@/lib/locale";
import {
  PLATFORM_APP_URL,
  PLATFORM_PAGES,
  platformPage,
  tx,
  type PlatformPageId,
} from "@/lib/platform-site";

export function PlatformLink({
  locale,
  intent,
  children,
}: {
  locale: Locale;
  intent: "start" | "pricing" | "features" | "sales" | "private";
  children: ReactNode;
}) {
  const className =
    intent === "start"
      ? "inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-6 py-3 text-sm font-semibold hover:opacity-90 transition-opacity"
      : "inline-flex items-center gap-2 rounded-full border border-border-strong bg-surface/60 px-6 py-3 text-sm font-medium hover:border-primary hover:text-primary transition-colors";

  if (intent === "start") {
    return (
      <a href={PLATFORM_APP_URL} className={className}>
        {children} <ArrowRight size={16} />
      </a>
    );
  }

  const path =
    intent === "pricing"
      ? "/cloud-services/platform/pricing"
      : intent === "features"
        ? "/cloud-services/platform/features"
        : intent === "private"
          ? "/cloud-services/platform/private-deployment"
          : "/cloud-services/platform/enterprise";

  return (
    <Link to={`/$locale${path}`} params={{ locale }} className={className}>
      {children}
    </Link>
  );
}

export function PlatformFrame({
  locale,
  page,
  title,
  eyebrow,
  subtitle,
  actions,
  children,
}: {
  locale: Locale;
  page: PlatformPageId;
  title: string;
  eyebrow?: string;
  subtitle?: string;
  actions?: ReactNode;
  children: ReactNode;
}) {
  const zh = locale === "zh";
  const current = platformPage(page);

  return (
    <>
      <PageHero eyebrow={eyebrow} title={title} subtitle={subtitle} actions={actions} />
      <div className="border-b border-border bg-background">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 py-4">
          <nav aria-label="Breadcrumb" className="text-xs text-muted-foreground mb-4">
            <ol className="flex flex-wrap items-center gap-1.5">
              <li>
                <Link to="/$locale" params={{ locale }} className="hover:text-primary">
                  {zh ? "首页" : "Home"}
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link to="/$locale/platform" params={{ locale }} className="hover:text-primary">
                  {zh ? "云服务" : "Cloud Services"}
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                {page === "home" ? (
                  <span className="text-foreground">NFCTEC Platform</span>
                ) : (
                  <Link to="/$locale/cloud-services/platform" params={{ locale }} className="hover:text-primary">
                    NFCTEC Platform
                  </Link>
                )}
              </li>
              {page !== "home" && (
                <>
                  <li aria-hidden="true">/</li>
                  <li className="text-foreground">{tx(locale, current.nav)}</li>
                </>
              )}
            </ol>
          </nav>
          <nav aria-label={zh ? "平台页面" : "Platform"} className="flex gap-2 overflow-x-auto pb-1">
            {PLATFORM_PAGES.map((item) => {
              const active = item.id === page;
              return (
                <Link
                  key={item.id}
                  to={`/$locale${item.path}`}
                  params={{ locale }}
                  aria-current={active ? "page" : undefined}
                  className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-medium border transition-colors ${
                    active
                      ? "border-primary bg-primary/10 text-foreground"
                      : "border-border text-muted-foreground hover:text-foreground hover:border-primary/40"
                  }`}
                >
                  {tx(locale, item.nav)}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
      {children}
      <PageSection spacing="tight">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-3xl lg:text-4xl tracking-tight text-balance">
            {zh ? "准备用 NFC 保护你的产品了吗？" : "Ready to Secure Your Products with NFC?"}
          </h2>
          <p className="mt-4 text-muted-foreground">
            {zh
              ? "从 NTAG424 DNA 安全发行开始，在同一套平台上接上验真。"
              : "Start with NTAG424 DNA secure provisioning and build your authentication workflow on one integrated platform."}
          </p>
          <div className="mt-8 flex flex-wrap gap-3 justify-center">
            <PlatformLink locale={locale} intent="start">
              {zh ? "免费开始" : "Start Free"}
            </PlatformLink>
            <a
              href={PLATFORM_APP_URL}
              className="inline-flex items-center gap-2 rounded-full border border-border-strong bg-surface/60 px-6 py-3 text-sm font-medium hover:border-primary hover:text-primary transition-colors"
            >
              {zh ? "登录" : "Sign In"}
            </a>
            <PlatformLink locale={locale} intent="sales">
              {zh ? "联系企业销售" : "Contact Enterprise Sales"}
            </PlatformLink>
          </div>
        </div>
      </PageSection>
    </>
  );
}

export function StatusBadge({ children, tone = "live" }: { children: ReactNode; tone?: "live" | "planned" }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-medium tracking-wide ${
        tone === "planned"
          ? "bg-muted text-muted-foreground border border-border"
          : "bg-primary/10 text-primary border border-primary/30"
      }`}
    >
      {children}
    </span>
  );
}
