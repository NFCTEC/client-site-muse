import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import * as LucideIcons from "lucide-react";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Radio,
  ShoppingCart,
  type LucideIcon,
} from "lucide-react";
import { useI18n } from "@/lib/i18n";
import type { CmsProduct } from "@/lib/cms";
import { PostBody } from "@/components/PostBody";

function getIcon(name: string): LucideIcon {
  const icons = LucideIcons as unknown as Record<string, LucideIcon>;
  return icons[name] ?? LucideIcons.Boxes;
}

function CtaLink({
  url,
  label,
  locale,
  className,
}: {
  url: string;
  label: ReactNode;
  locale: string;
  className: string;
}) {
  if (url.startsWith("http://") || url.startsWith("https://")) {
    return (
      <a href={url} target="_blank" rel="noreferrer" className={className}>
        {label}
      </a>
    );
  }
  if (url.startsWith("/")) {
    const path = url.replace(/^\/(en|zh)/, "") || "/";
    return (
      <Link to={`/$locale${path}` as "/$locale/contact"} params={{ locale }} className={className}>
        {label}
      </Link>
    );
  }
  return (
    <Link to="/$locale/contact" params={{ locale }} className={className}>
      {label}
    </Link>
  );
}

export function ProductDetailPage({ product, locale }: { product: CmsProduct; locale: string }) {
  const { lang, tr } = useI18n();
  const t = (en: string, zh: string) => (lang === "zh" ? zh : en);
  const categoryLabel =
    product.category === "hardware"
      ? t("HARDWARE", "硬件")
      : t("SOFTWARE", "软件");

  const images =
    product.images.length > 0
      ? product.images
      : product.heroImage
        ? [{ src: product.heroImage, label: "" }]
        : [];

  const primaryCta = product.ctaUrl
    ? { url: product.ctaUrl, label: product.ctaLabel ?? t("Learn more", "了解更多") }
    : { url: "/contact", label: t("Request a Quote", "获取报价") };

  const secondaryCta =
    product.secondaryCtaUrl && product.secondaryCtaLabel
      ? { url: product.secondaryCtaUrl, label: product.secondaryCtaLabel }
      : null;

  const isAmazon = primaryCta.url.includes("amazon.com");

  return (
    <>
      <section className="pt-6 pb-4">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <Link
            to="/$locale/products"
            params={{ locale }}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft size={14} /> {tr("product.back")}
          </Link>
        </div>
      </section>

      <section className="pb-16 lg:pb-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {images.length > 0 && (
            <div className={`grid gap-4 ${images.length > 1 ? "grid-cols-2" : "grid-cols-1"}`}>
              {images.map((img) => (
                <div
                  key={img.src}
                  className="relative rounded-2xl border border-border bg-surface/40 overflow-hidden aspect-[4/5] grid place-items-center p-6"
                >
                  <img src={img.src} alt={product.name} className="max-h-full max-w-full object-contain" />
                  {img.label && (
                    <span className="absolute bottom-3 left-3 text-[10px] font-mono text-muted-foreground bg-background/80 backdrop-blur-sm border border-border rounded-full px-2.5 py-0.5">
                      {img.label}
                    </span>
                  )}
                </div>
              ))}
            </div>
          )}

          <div>
            <div className="inline-flex items-center gap-2 text-[11px] font-mono text-primary border border-primary/30 rounded-full px-3 py-1 mb-5">
              <Radio size={12} /> {categoryLabel}
            </div>
            <h1 className="font-display text-4xl lg:text-5xl tracking-tight text-balance">{product.name}</h1>
            {product.tagline && (
              <p className="mt-3 text-base text-muted-foreground">{product.tagline}</p>
            )}
            {product.intro && <p className="mt-6 text-lg leading-relaxed">{product.intro}</p>}

            {product.highlights.length > 0 && (
              <ul className="mt-6 space-y-2 text-sm">
                {product.highlights.map((line) => (
                  <li key={line} className="flex items-start gap-2">
                    <CheckCircle2 size={16} className="text-primary mt-0.5 shrink-0" />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            )}

            <div className="mt-8 flex flex-wrap gap-3">
              <CtaLink
                url={primaryCta.url}
                label={
                  <>
                    {isAmazon && <ShoppingCart size={14} />}
                    {primaryCta.label}
                    {!isAmazon && <ArrowRight size={14} />}
                  </>
                }
                locale={locale}
                className={`inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-opacity hover:opacity-90 ${
                  isAmazon
                    ? "bg-[#FF9900] text-black font-semibold"
                    : "bg-primary text-primary-foreground shadow-glow"
                }`}
              />
              {secondaryCta && (
                <CtaLink
                  url={secondaryCta.url}
                  label={secondaryCta.label}
                  locale={locale}
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-6 py-3 text-sm font-medium hover:border-primary/40 transition-colors"
                />
              )}
            </div>
          </div>
        </div>
      </section>

      {product.features.length > 0 && (
        <section className="py-16 lg:py-24 border-t border-border">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <p className="section-label mb-3">{t("KEY FEATURES", "核心特性")}</p>
            <h2 className="font-display text-3xl lg:text-4xl tracking-tight">{tr("product.features.title")}</h2>
            <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {product.features.map((f) => {
                const Icon = getIcon(f.icon);
                return (
                  <div key={f.title} className="card-glow rounded-2xl border border-border bg-card-gradient p-7">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/30 grid place-items-center mb-5">
                      <Icon size={20} className="text-primary" />
                    </div>
                    <h3 className="font-display text-lg font-semibold mb-2">{f.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{f.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {(product.specs.length > 0 || product.useCases.length > 0) && (
        <section className="py-16 lg:py-24 border-t border-border">
          <div className="mx-auto max-w-7xl px-6 lg:px-10 grid lg:grid-cols-2 gap-12 lg:gap-16">
            {product.specs.length > 0 && (
              <div>
                <p className="text-xs font-mono text-primary mb-3">{t("SPECIFICATIONS", "规格参数")}</p>
                <h2 className="font-display text-3xl tracking-tight mb-8">{t("Technical specs", "技术规格")}</h2>
                <dl className="divide-y divide-border border border-border rounded-2xl overflow-hidden bg-surface/40">
                  {product.specs.map(({ key, value }) => (
                    <div key={key} className="grid grid-cols-5 gap-4 px-5 py-3 text-sm">
                      <dt className="col-span-2 text-muted-foreground">{key}</dt>
                      <dd className="col-span-3 font-mono">{value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}

            {product.useCases.length > 0 && (
              <div>
                <p className="text-xs font-mono text-primary mb-3">{t("WHERE IT'S USED", "适用场景")}</p>
                <h2 className="font-display text-3xl tracking-tight mb-8">{t("Use cases", "典型用途")}</h2>
                <ul className="space-y-4">
                  {product.useCases.map((u, i) => (
                    <li key={u} className="flex gap-4 rounded-xl border border-border bg-surface/40 p-5">
                      <span className="font-mono text-xs text-primary shrink-0 mt-0.5">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-sm leading-relaxed">{u}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </section>
      )}

      {product.body && product.body !== "<p></p>" && (
        <section className="py-16 border-t border-border">
          <div className="mx-auto max-w-3xl px-6">
            <PostBody body={product.body} />
          </div>
        </section>
      )}

      <section className="py-20 lg:py-28 border-t border-border">
        <div className="mx-auto max-w-4xl px-6 lg:px-10 text-center">
          <h2 className="font-display text-3xl lg:text-4xl tracking-tight text-balance">
            {t("Questions about this product?", "对此产品有疑问？")}
          </h2>
          <div className="mt-8 flex justify-center gap-3 flex-wrap">
            <Link
              to="/$locale/contact"
              params={{ locale }}
              className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-6 py-3 text-sm font-medium shadow-glow hover:opacity-90 transition-opacity"
            >
              {t("Talk to Sales", "联系销售")} <ArrowRight size={14} />
            </Link>
            <Link
              to="/$locale/products"
              params={{ locale }}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-6 py-3 text-sm font-medium hover:border-primary/40 transition-colors"
            >
              {t("Browse all products", "查看全部产品")}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
