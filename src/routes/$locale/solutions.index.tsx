import { createFileRoute, Link } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";
import { fetchSolutions } from "@/lib/cms";
import * as LucideIcons from "lucide-react";
import { ArrowRight, type LucideIcon } from "lucide-react";
import type { Locale } from "@/lib/locale";

export const Route = createFileRoute("/$locale/solutions/")({
  loader: async ({ params }) => {
    const solutions = await fetchSolutions(params.locale as Locale);
    return { solutions };
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
      <section className="relative pt-24 lg:pt-32 pb-16">
        <div className="absolute inset-0 bg-hero-glow pointer-events-none" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
          <h1 className="font-display text-5xl lg:text-7xl tracking-tight max-w-4xl whitespace-pre-line text-balance">
            {tr("ind.title")}
          </h1>
        </div>
      </section>

      <section className="pb-24 lg:pb-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 space-y-5">
          {solutions.map((ind, i) => {
            const iconName = iconBySlug[ind.slug] ?? "Boxes";
            const Icon = (LucideIcons as unknown as Record<string, LucideIcon>)[iconName] ?? LucideIcons.Boxes;
            return (
              <Link
                key={ind.slug}
                to="/$locale/solutions/$slug"
                params={{ locale, slug: ind.slug }}
                className="card-glow group grid lg:grid-cols-12 gap-px rounded-3xl border border-border bg-border overflow-hidden scroll-mt-20 hover:border-primary/50 transition-colors"
              >
                <div className="lg:col-span-12 bg-card-gradient">
                  <img
                    src={ind.heroImage ?? `/solutions/${ind.slug}.jpg`}
                    alt={`${ind.name} — NFC solution`}
                    width={1216}
                    height={384}
                    loading="lazy"
                    className="w-full h-48 lg:h-56 object-cover"
                  />
                </div>
                <div className="lg:col-span-5 bg-card-gradient p-10 lg:p-12">
                  <div className="flex items-center justify-between mb-8">
                    <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/30 grid place-items-center">
                      <Icon size={24} className="text-primary" />
                    </div>
                    <span className="text-xs font-mono text-muted-foreground">
                      {String(i + 1).padStart(2, "0")} / {solutions.length}
                    </span>
                  </div>
                  <h2 className="font-display text-3xl lg:text-4xl tracking-tight mb-4">{ind.name}</h2>
                  <p className="text-muted-foreground leading-relaxed mb-8">{ind.tagline}</p>
                  <span className="inline-flex items-center gap-2 text-sm font-medium text-primary group-hover:gap-3 transition-all">
                    {tr("hero.cta2")} <ArrowRight size={14} />
                  </span>
                </div>
                <div className="lg:col-span-7 bg-card-gradient p-10 lg:p-12">
                  <div className="text-xs font-mono text-primary uppercase tracking-widest mb-6">Key capabilities</div>
                  <ul className="grid sm:grid-cols-2 gap-3">
                    {ind.capabilities.slice(0, 4).map((c) => (
                      <li key={c.title} className="rounded-lg border border-border bg-background/40 px-4 py-3 text-sm font-mono text-foreground/80">
                        {c.title}
                      </li>
                    ))}
                  </ul>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </>
  );
}
