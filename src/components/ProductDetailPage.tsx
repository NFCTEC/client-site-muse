import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import * as LucideIcons from "lucide-react";
import {
  ArrowRight,
  CheckCircle2,
  Radio,
  ShoppingCart,
  type LucideIcon,
} from "lucide-react";
import { useI18n } from "@/lib/i18n";
import type { CmsProduct } from "@/lib/cms";
import { PRODUCT_FAQS } from "@/lib/product-seo";
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
      <Link
        to={`/$locale${path}` as "/$locale/inquiry"}
        params={{ locale }}
        search={{}}
        className={className}
      >
        {label}
      </Link>
    );
  }
  return (
    <Link to="/$locale/inquiry" params={{ locale }} className={className}>
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
    : { url: "/inquiry", label: t("Request a Quote", "获取报价") };

  const secondaryCta =
    product.secondaryCtaUrl && product.secondaryCtaLabel
      ? { url: product.secondaryCtaUrl, label: product.secondaryCtaLabel }
      : null;

  const faqs = PRODUCT_FAQS[product.slug]?.[lang === "zh" ? "zh" : "en"] ?? [];
  const isAmazon = primaryCta.url.includes("amazon.com");
  const isHardware = product.category === "hardware";

  return (
    <>
      <section className="pt-6 pb-4">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <nav aria-label={t("Breadcrumb", "面包屑")} className="text-sm text-muted-foreground">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link to="/$locale" params={{ locale }} className="hover:text-primary transition-colors">
                  {t("Home", "首页")}
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link to="/$locale/products" params={{ locale }} className="hover:text-primary transition-colors">
                  {tr("nav.products")}
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-foreground">{product.name}</li>
            </ol>
          </nav>
        </div>
      </section>

      <section className="pb-16 lg:pb-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {images.length > 0 && (
            <div className={`grid gap-4 ${images.length > 1 ? "grid-cols-2" : "grid-cols-1"}`}>
              {images.map((img) => (
                <div
                  key={img.src}
                  className="relative rounded-xl border border-border bg-surface overflow-hidden aspect-[4/3] grid place-items-center p-4 sm:p-6"
                >
                  <img
                    src={img.src}
                    alt={img.label ? `${product.name} — ${img.label}` : product.name}
                    width={800}
                    height={600}
                    loading={img.src === images[0]?.src ? "eager" : "lazy"}
                    fetchPriority={img.src === images[0]?.src ? "high" : "auto"}
                    decoding="async"
                    className="h-full w-full object-contain"
                  />
                  {img.label && (
                    <span className="absolute bottom-3 left-3 text-[10px] font-mono text-muted-foreground bg-background border border-border rounded-md px-2.5 py-0.5">
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

            {isHardware && (
              <div className="mt-7 rounded-xl border border-border bg-surface p-5">
                <h2 className="font-display text-base font-semibold">
                  {t("Custom manufacturing & secure personalization", "定制制造与安全个人化")}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {t(
                    "Planning a bulk order? Tell us your chip type, dimensions, artwork, quantity and personalization needs. We can review OEM/ODM production, printing and encoding options.",
                    "计划批量采购？请提供芯片型号、尺寸、印刷设计、数量及个人化要求。我们可以评估 OEM/ODM 制造、印刷与编码方案。",
                  )}
                </p>
                <Link
                  to="/$locale/inquiry"
                  params={{ locale }}
                  className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
                >
                  {t("Request a factory quotation", "获取工厂定制报价")} <ArrowRight size={15} />
                </Link>
              </div>
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
                className={`inline-flex items-center gap-2 rounded-md px-6 py-3 text-sm font-medium transition-opacity hover:opacity-90 ${
                  isAmazon
                    ? "bg-[#FF9900] text-black font-semibold"
                    : "bg-primary text-primary-foreground"
                }`}
              />
              {secondaryCta && (
                <CtaLink
                  url={secondaryCta.url}
                  label={secondaryCta.label}
                  locale={locale}
                  className="inline-flex items-center gap-2 rounded-md border border-border bg-surface px-6 py-3 text-sm font-medium hover:border-primary/40 transition-colors"
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
                  <div key={f.title} className="rounded-xl border border-border bg-card p-7">
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

      {faqs.length > 0 && (
        <section className="py-16 lg:py-24 border-t border-border">
          <div className="mx-auto max-w-3xl px-6 lg:px-10">
            <h2 className="font-display text-3xl tracking-tight mb-8">
              {t("Questions", "常见问题")}
            </h2>
            <dl className="space-y-6">
              {faqs.map((item) => (
                <div key={item.q} className="rounded-xl border border-border bg-surface/40 p-6">
                  <dt className="font-display text-lg font-semibold">{item.q}</dt>
                  <dd className="mt-2 text-sm text-muted-foreground leading-relaxed">{item.a}</dd>
                </div>
              ))}
            </dl>
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
            {t("Need a Custom Version of This Product?", "需要定制这款产品？")}
          </h2>
          <div className="mt-8 flex justify-center gap-3 flex-wrap">
            <Link
              to="/$locale/inquiry"
              params={{ locale }}
              className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-6 py-3 text-sm font-medium hover:opacity-90 transition-opacity"
            >
              {t("Request a Quote", "获取定制报价")} <ArrowRight size={14} />
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
