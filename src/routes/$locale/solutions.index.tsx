import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";
import { fetchDisplayConfig, fetchSolutions, type CmsSolution } from "@/lib/cms";
import { filterByDisplayConfig } from "@/lib/display-config";
import * as LucideIcons from "lucide-react";
import { ArrowRight, type LucideIcon } from "lucide-react";
import { absLocaleUrl, type Locale } from "@/lib/locale";
import { hreflangLinks } from "@/lib/seo";
import { PageHero } from "@/components/PageHero";
import { PageSection } from "@/components/PageSection";
import { CtaBand } from "@/components/CtaBand";
import { SolutionVisual } from "@/components/SolutionVisual";

export const Route = createFileRoute("/$locale/solutions/")({
  loader: async ({ params }) => {
    const locale = params.locale as Locale;
    const config = await fetchDisplayConfig(locale);
    const moduleConfig = config.modules.solutions;
    if (!moduleConfig.enabled) throw notFound();
    const solutions = await fetchSolutions(locale);
    return { solutions: filterByDisplayConfig(solutions, moduleConfig) };
  },
  head: ({ params }) => {
    const locale = params.locale as Locale;
    const url = absLocaleUrl(locale, "/solutions");
    const zh = locale === "zh";
    const title = zh
      ? "NFC 与智能卡行业应用方案 | NFCTEC"
      : "NFC & Smart Card Solutions by Application | NFCTEC";
    const description = zh
      ? "探索 NFC 与智能卡在品牌防伪、门禁、身份识别和智能产品中的应用，支持定制制造与安全编码。"
      : "Explore NFC and smart-card applications for brand authentication, access control, identification and connected products, with custom manufacturing and encoding support.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:url", content: url },
        { property: "og:type", content: "website" },
      ],
      links: [{ rel: "canonical", href: url }, ...hreflangLinks("/solutions")],
    };
  },
  component: SolutionsIndex,
});

const iconBySlug: Record<string, keyof typeof LucideIcons> = {
  banking: "Wallet",
  transit: "Train",
  gov: "Landmark",
  access: "KeyRound",
  health: "HeartPulse",
  iot: "Boxes",
  brand: "ShieldCheck",
  retail: "ShoppingBag",
  auto: "Car",
  wallet: "Smartphone",
  security: "Fingerprint",
};

function SolutionsIndex() {
  const { tr } = useI18n();
  const { solutions } = Route.useLoaderData();
  const { locale } = Route.useParams();

  return (
    <>
      <PageHero
        eyebrow={tr("ind.eyebrow")}
        title={tr("ind.title")}
        subtitle={tr("ind.sub")}
      />

      <PageSection spacing="main">
        <div className="grid md:grid-cols-2 gap-5">
          {solutions.map((ind: CmsSolution) => {
            const iconName = iconBySlug[ind.slug] ?? "Boxes";
            const Icon = (LucideIcons as unknown as Record<string, LucideIcon>)[iconName] ?? LucideIcons.Boxes;
            return (
              <Link
                key={ind.slug}
                to="/$locale/solutions/$slug"
                params={{ locale, slug: ind.slug }}
                className="group flex flex-col rounded-xl border border-border bg-card overflow-hidden min-h-[20rem] hover:border-primary/40 transition-colors"
              >
                <SolutionVisual slug={ind.slug} src={ind.heroImage} alt={`${ind.name} — NFC solution`} icon={ind.icon} />
                <div className="p-8 flex flex-col flex-1">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 shrink-0 rounded-xl bg-primary/10 border border-primary/30 grid place-items-center">
                      <Icon size={20} className="text-primary" />
                    </div>
                    <div>
                      <h2 className="font-display text-xl lg:text-2xl tracking-tight">{ind.name}</h2>
                      <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{ind.tagline}</p>
                    </div>
                  </div>
                  {ind.capabilities.length > 0 && (
                    <ul className="mt-6 space-y-2">
                      {ind.capabilities.slice(0, 3).map((c) => (
                        <li key={c.title} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span className="w-1 h-1 shrink-0 rounded-full bg-primary" />
                          {c.title}
                        </li>
                      ))}
                    </ul>
                  )}
                  <span className="mt-auto pt-6 inline-flex items-center gap-2 text-sm font-medium text-primary group-hover:gap-3 transition-all">
                    {tr("ind.learnMore")} <ArrowRight size={14} />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </PageSection>

      <CtaBand />
    </>
  );
}
