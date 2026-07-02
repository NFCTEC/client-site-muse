import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";
import { fetchDisplayConfig, fetchProducts, type CmsProduct } from "@/lib/cms";
import { filterByDisplayConfig } from "@/lib/display-config";
import { absLocaleUrl, type Locale } from "@/lib/locale";
import { hreflangLinks } from "@/lib/seo";
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

    const [software, hardware] = await Promise.all([
      fetchProducts(locale, "software"),
      fetchProducts(locale, "hardware"),
    ]);

    return {
      software: filterByDisplayConfig(software, moduleConfig),
      hardware: filterByDisplayConfig(hardware, moduleConfig),
      showPlatform: config.modules.platform.enabled,
    };
  },
  component: Products,
});

function getIcon(name: string): LucideIcon {
  const icons = LucideIcons as unknown as Record<string, LucideIcon>;
  return icons[name] ?? LucideIcons.Boxes;
}

function Products() {
  const { tr } = useI18n();
  const { locale } = Route.useParams();
  const search = Route.useSearch() as { tab?: string };
  const navigate = Route.useNavigate();
  const { software, hardware, showPlatform } = Route.useLoaderData();
  const tab: "sw" | "hw" = search.tab === "hw" ? "hw" : "sw";
  const items = tab === "sw" ? software : hardware;

  const setTab = (k: "sw" | "hw") => {
    navigate({ search: (prev: Record<string, unknown>) => ({ ...prev, tab: k }), replace: true });
  };

  const tabSwitcher = (
    <div className="inline-flex rounded-full border border-border bg-surface/60 p-1">
      {(["sw", "hw"] as const).map((k) => (
        <button
          key={k}
          onClick={() => setTab(k)}
          className={`px-6 py-2 text-sm font-medium rounded-full transition-colors ${
            tab === k ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
          }`}
        >
          {tr(k === "sw" ? "ppage.sw" : "ppage.hw")}
        </button>
      ))}
    </div>
  );

  return (
    <>
      <PageHero
        eyebrow={tr("nav.products")}
        title={tr("ppage.title")}
        subtitle={tr("ppage.sub")}
        actions={tabSwitcher}
      />

      <PageSection spacing="main">
        {items.length === 0 ? (
          <p className="text-muted-foreground">{tr("ppage.empty")}</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {items.map((p: CmsProduct) => {
              const Icon = getIcon(p.icon);
              const ctaTo = p.hasDetailPage
                ? { to: "/$locale/products/$slug" as const, params: { locale, slug: p.slug } }
                : { to: "/$locale/contact" as const, params: { locale } };
              return (
                <div
                  key={p.id}
                  className="card-glow card-equal group rounded-2xl border border-border bg-card-gradient p-7"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/30 grid place-items-center mb-6">
                    <Icon size={20} className="text-primary" />
                  </div>
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
        )}
      </PageSection>

      {showPlatform && (
        <PageSection tone="muted" spacing="main">
          <SectionHeader eyebrow={tr("api.eyebrow")} title={tr("api.title")} sub={tr("api.sub")} />
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/$locale/platform"
              params={{ locale }}
              className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-6 py-3 text-sm font-semibold hover:opacity-90 transition-opacity"
            >
              {tr("cloud.getStarted")} <ArrowRight size={16} />
            </Link>
            <Link
              to="/$locale/contact"
              params={{ locale }}
              className="inline-flex items-center gap-2 rounded-full border border-border-strong bg-background/60 px-6 py-3 text-sm font-medium hover:border-primary hover:text-primary transition-colors"
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
