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
    const url = absLocaleUrl(params.locale as Locale, "/solutions");
    return {
      meta: [
        { title: "Industry Solutions — NFCTEC" },
        { name: "description", content: "End-to-end NFC solutions for banking, transit, government, IoT, brand protection and more." },
        { property: "og:title", content: "Industry Solutions — NFCTEC" },
        { property: "og:description", content: "Proven NFC playbooks across 11 industries." },
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
                className="card-glow group flex flex-col rounded-2xl border border-border bg-card-gradient overflow-hidden min-h-[20rem]"
              >
                <div className="relative w-full aspect-[16/9] overflow-hidden">
                  <img
                    src={ind.heroImage ?? `/solutions/${ind.slug}.jpg`}
                    alt={`${ind.name} — NFC solution`}
                    width={600}
                    height={240}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover dark:[filter:none] [filter:brightness(1.08)_saturate(0.9)_contrast(0.95)]"
                  />
                  {/* Light-mode only: soft white fade + brand tint to bridge dark art with white page */}
                  <div className="pointer-events-none absolute inset-0 dark:hidden bg-gradient-to-b from-white/30 via-transparent to-white/55" />
                  <div className="pointer-events-none absolute inset-0 dark:hidden bg-gradient-to-tr from-[color-mix(in_oklab,var(--primary)_10%,transparent)] via-transparent to-[color-mix(in_oklab,#7B2FFF_10%,transparent)]" />
                  <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-border/60 dark:ring-transparent" />
                </div>
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
