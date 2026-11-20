import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";
import { fetchDisplayConfig, fetchProducts, type CmsProduct } from "@/lib/cms";
import { filterByDisplayConfig } from "@/lib/display-config";
import { mergeCatalogProducts } from "@/lib/products-catalog";
import { absLocaleUrl, type Locale } from "@/lib/locale";
import { hreflangLinks } from "@/lib/seo";
import { itemListJsonLd, jsonLdScript, socialMeta } from "@/lib/product-seo";
import * as LucideIcons from "lucide-react";
import { ArrowRight, type LucideIcon } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { PageSection } from "@/components/PageSection";
import { SectionHeader } from "@/components/SectionHeader";
import { CtaBand } from "@/components/CtaBand";

export const Route = createFileRoute("/$locale/products/")({
  loader: async ({ params }) => {
    const locale = params.locale as Locale;
    const config = await fetchDisplayConfig(locale);
    const moduleConfig = config.modules.products;
    if (!moduleConfig.enabled) throw notFound();

    const [softwareRows, hardwareRows] = await Promise.all([
      fetchProducts(locale, "software"),
      fetchProducts(locale, "hardware"),
    ]);

    return {
      software: mergeCatalogProducts(filterByDisplayConfig(softwareRows, moduleConfig), locale, "software"),
      hardware: mergeCatalogProducts(filterByDisplayConfig(hardwareRows, moduleConfig), locale, "hardware"),
      showPlatform: config.modules.platform.enabled,
    };
  },
  head: ({ params, loaderData }) => {
    const locale = params.locale as Locale;
    const url = absLocaleUrl(locale, "/products");
    const zh = locale === "zh";
    const title = zh
      ? "NFC 标签与智能卡定制制造商 | NFCTEC"
      : "Custom NFC Tags & Smart Cards Manufacturer | NFCTEC";
    const description = zh
      ? "NFCTEC 提供 NFC 标签、彩印智能卡及手环 OEM/ODM 定制制造，支持 NTAG424 DNA、MIFARE DESFire 等芯片及安全个人化编码。"
      : "Explore custom NFC tags, printed smart cards and wristbands. NFCTEC supports OEM/ODM manufacturing, NTAG424 DNA, MIFARE DESFire and secure personalization.";
    // Only list products with real, indexable detail URLs; RFQ-only entries are still visible in the catalog.
    const listed = [...(loaderData?.hardware ?? []), ...(loaderData?.software ?? [])].filter((p) => p.hasDetailPage);
    return {
      meta: socialMeta({ title, description, url, locale }),
      links: [{ rel: "canonical", href: url }, ...hreflangLinks("/products")],
      scripts: [
        jsonLdScript(
          itemListJsonLd(
            title,
            description,
            url,
            listed.map((p) => ({
              name: p.name,
              url: absLocaleUrl(locale, `/products/${p.slug}`),
            })),
          ),
        ),
      ],
    };
  },
  component: Products,
});

function getIcon(name: string): LucideIcon {
  const icons = LucideIcons as unknown as Record<string, LucideIcon>;
  return icons[name] ?? LucideIcons.Boxes;
}

function ProductGrid({ items, locale }: { items: CmsProduct[]; locale: string }) {
  const { tr } = useI18n();
  if (items.length === 0) {
    return <p className="text-muted-foreground">{tr("ppage.empty")}</p>;
  }
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {items.map((p) => {
        const Icon = getIcon(p.icon);
        const ctaTo = p.hasDetailPage
          ? { to: "/$locale/products/$slug" as const, params: { locale, slug: p.slug } }
          : { to: "/$locale/inquiry" as const, params: { locale } };
        return (
          <div
            key={p.id}
            className="card-glow card-equal group rounded-xl border border-border bg-card p-6"
          >
            {p.heroImage ? (
              <div className="mb-5 aspect-[4/3] w-full overflow-hidden rounded-lg border border-border bg-surface p-4">
                <img
                  src={p.heroImage}
                  alt={p.name}
                  width={640}
                  height={480}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-[1.02]"
                />
              </div>
            ) : (
              <div className="w-12 h-12 rounded-lg bg-surface border border-border grid place-items-center mb-6">
                <Icon size={20} className="text-primary" />
              </div>
            )}
            <h3 className="font-display text-lg font-semibold mb-2">{p.name}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed flex-1 mb-6">{p.description}</p>
            <Link
              {...ctaTo}
              className="text-sm text-primary inline-flex items-center gap-1 group-hover:gap-2 transition-all"
            >
              {p.hasDetailPage ? tr("ind.learnMore") : tr("hero.cta2")} <ArrowRight size={14} />
            </Link>
          </div>
        );
      })}
    </div>
  );
}

function Products() {
  const { tr } = useI18n();
  const { locale } = Route.useParams();
  const { software, hardware, showPlatform } = Route.useLoaderData();

  return (
    <>
      <PageHero eyebrow={tr("nav.products")} title={tr("ppage.title")} subtitle={tr("ppage.sub")} />

      <section className="border-b border-border bg-surface/30 py-8">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <h2 className="font-display text-xl font-semibold">
            {locale === "zh" ? "按采购需求浏览" : "Find the Right NFC Product"}
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground">
            {locale === "zh"
              ? "浏览 NFC 标签、智能卡及安全个人化产品。批量采购、OEM/ODM 印刷与定制编码可直接咨询。"
              : "Explore NFC labels, smart cards and secure personalization products. Ask us about bulk manufacturing, OEM/ODM printing and custom encoding."}
          </p>
          <nav aria-label={locale === "zh" ? "产品分类快捷导航" : "Product category shortcuts"} className="mt-5 flex flex-wrap gap-3">
            <a href="#hardware" className="rounded-md border border-border bg-background px-5 py-2.5 text-sm font-medium hover:border-primary hover:text-primary transition-colors">
              {locale === "zh" ? "NFC 标签与智能卡" : "NFC Tags & Smart Cards"}
            </a>
            {software.length > 0 && (
              <a href="#software" className="rounded-md border border-border bg-background px-5 py-2.5 text-sm font-medium hover:border-primary hover:text-primary transition-colors">
                {locale === "zh" ? "软件与开发工具" : "Software & Developer Tools"}
              </a>
            )}
            <Link to="/$locale/inquiry" params={{ locale }} className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90">
              {locale === "zh" ? "获取工厂报价" : "Request a Factory Quote"} <ArrowRight size={15} />
            </Link>
          </nav>
        </div>
      </section>

      <PageSection id="hardware" spacing="main">
        <SectionHeader title={tr("ppage.hw")} sub={tr("ppage.hw.sub")} />
        <div className="mt-10">
          <ProductGrid items={hardware} locale={locale} />
        </div>
      </PageSection>

      {software.length > 0 && (
      <PageSection id="software" tone="muted" spacing="main">
        <SectionHeader title={tr("ppage.sw")} sub={tr("ppage.sw.sub")} />
        <div className="mt-10">
          <ProductGrid items={software} locale={locale} />
        </div>
      </PageSection>
      )}

      {showPlatform && (
        <PageSection spacing="main">
          <SectionHeader eyebrow={tr("api.eyebrow")} title={tr("api.title")} sub={tr("api.sub")} />
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/$locale/platform"
              params={{ locale }}
              className="inline-flex items-center gap-2 rounded-md bg-primary text-primary-foreground px-6 py-3 text-sm font-semibold hover:opacity-90 transition-opacity"
            >
              {tr("cloud.getStarted")} <ArrowRight size={16} />
            </Link>
            <Link
              to="/$locale/inquiry"
              params={{ locale }}
              className="inline-flex items-center gap-2 rounded-md border border-border-strong bg-background/60 px-6 py-3 text-sm font-medium hover:border-primary hover:text-primary transition-colors"
            >
              {tr("hero.cta2")}
            </Link>
          </div>
        </PageSection>
      )}

      <CtaBand />
    </>
  );
}
