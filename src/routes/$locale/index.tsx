import { createFileRoute, Link } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";
import {
  fetchDisplayConfig,
  fetchPosts,
  fetchProducts,
  fetchSolutions,
  toBlogPost,
  type CmsProduct,
  type CmsSolution,
} from "@/lib/cms";
import { filterByDisplayConfig, isModuleEnabled, type ModuleKey } from "@/lib/display-config";
import { absLocaleUrl, type Locale } from "@/lib/locale";
import { hreflangLinks } from "@/lib/seo";
import {
  ArrowRight,
  Boxes,
  Car,
  CheckCircle2,
  Code2,
  Cpu,
  Fingerprint,
  HeartPulse,
  KeyRound,
  Landmark,
  Layers,
  ShieldCheck,
  ShoppingBag,
  Smartphone,
  Train,
  Wallet,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { SectionHeader } from "@/components/SectionHeader";
import { CtaBand } from "@/components/CtaBand";
import { HeroIllustration } from "@/components/HeroIllustration";
import * as LucideIcons from "lucide-react";

export const Route = createFileRoute("/$locale/")({
  loader: async ({ params }) => {
    const locale = params.locale as Locale;
    const config = await fetchDisplayConfig(locale);
    const [products, solutions, posts] = await Promise.all([
      fetchProducts(locale),
      fetchSolutions(locale),
      fetchPosts(locale),
    ]);

    const filteredProducts = filterByDisplayConfig(products, config.modules.products);
    const filteredSolutions = filterByDisplayConfig(solutions, config.modules.solutions);
    const filteredPosts = filterByDisplayConfig(posts, config.modules.blog);

    return {
      modules: {
        products: isModuleEnabled(config, "products"),
        solutions: isModuleEnabled(config, "solutions"),
        blog: isModuleEnabled(config, "blog"),
        platform: isModuleEnabled(config, "platform"),
        downloads: isModuleEnabled(config, "downloads"),
        contact: isModuleEnabled(config, "contact"),
      },
      products: filteredProducts.slice(0, 4),
      solutions: filteredSolutions.slice(0, 3),
      solutionSlugs: new Set(filteredSolutions.map((s) => s.slug)),
      posts: filteredPosts.slice(0, 3).map(toBlogPost),
    };
  },
  head: ({ params }) => {
    const locale = params.locale as Locale;
    const url = absLocaleUrl(locale, "/");
    return {
      meta: [
        { title: "NFCTEC — Full-Stack NFC & Smart Card Solutions" },
        {
          name: "description",
          content:
            "NFC hardware, software SDKs and an issuance & verification API — one partner for every NFC project.",
        },
        { property: "og:title", content: "NFCTEC — Full-Stack NFC & Smart Card Solutions" },
        {
          property: "og:description",
          content: "Hardware, software, API — everything NFC, from one partner.",
        },
        { property: "og:url", content: url },
        { property: "og:type", content: "website" },
      ],
      links: [{ rel: "canonical", href: url }, ...hreflangLinks("/")],
    };
  },
  component: Home,
});

const protocolGroups = [
  {
    label: "proto.g1",
    items: [
      "EMV Contactless",
      "Apple Pay",
      "Apple VAS",
      "Apple ECP 2.0",
      "Google Pay",
      "Google Smart Tap",
      "UnionPay QuickPass",
      "Samsung Wallet",
    ],
  },
  {
    label: "proto.g2",
    items: ["NCI 1.0 / 2.0 / 2.2", "ISO 14443 Type A/B", "ISO 15693", "ISO 18092", "FeliCa", "PC/SC"],
  },
  {
    label: "proto.g3",
    items: ["ISO 7816", "JavaCard 3.1", "GlobalPlatform 2.3", "ICAO 9303", "PACE / BAC / EAC", "ePassport"],
  },
  {
    label: "proto.g4",
    items: ["NDEF Type 2/4/5", "LLCP / SNEP", "SUN Dynamic URL", "HCE", "Tag Reading / Writing", "Peer-to-Peer"],
  },
  {
    label: "proto.g5",
    items: ["FIDO2 / WebAuthn", "Passkeys", "U2F Security Keys", "CC EAL5+ / EAL6+", "PKCS#11", "Secure Channel"],
  },
  {
    label: "proto.g6",
    items: ["secp256k1", "ed25519", "BIP-32 / BIP-39", "Hardware Wallet", "Cold Storage Card", "On-card Signing"],
  },
  {
    label: "proto.g7",
    items: [
      "NTAG 213 / 215 / 216",
      "NTAG 424 DNA",
      "MIFARE Classic / Plus",
      "MIFARE Ultralight",
      "MIFARE DESFire EV2/EV3",
      "ST25 / ICODE SLIX",
    ],
  },
  {
    label: "proto.g8",
    items: [
      "NXP PN7160 (NCI 2.0)",
      "NXP PN7220 (NCI 2.2)",
      "NXP PN557 / PN5190",
      "NXP PN5180",
      "ST ST25R3916 / ST25R500",
      "NXP SE050 / SE051",
    ],
  },
  {
    label: "proto.g9",
    items: ["ISO 9001", "PCI-PTS", "EMV L1 / L2", "NXP Partner", "GSMA SAS-SM", "Common Criteria"],
  },
] as const;

const industries = [
  { icon: Wallet, k: "ind.banking" },
  { icon: Train, k: "ind.transit" },
  { icon: Landmark, k: "ind.gov" },
  { icon: KeyRound, k: "ind.access" },
  { icon: HeartPulse, k: "ind.health" },
  { icon: Boxes, k: "ind.iot" },
  { icon: ShieldCheck, k: "ind.brand" },
  { icon: ShoppingBag, k: "ind.retail" },
  { icon: Car, k: "ind.auto" },
  { icon: Smartphone, k: "ind.wallet" },
  { icon: Fingerprint, k: "ind.security" },
] as const;

const stats = [
  { value: "15+", label: "stat.years" },
  { value: "50+", label: "stat.protocols" },
  { value: "500+", label: "stat.projects" },
  { value: "60+", label: "stat.countries" },
] as const;

const devTools = [
  { k: "tools.emv.t", d: "tools.emv.d" },
  { k: "tools.apdu.t", d: "tools.apdu.d" },
  { k: "tools.ndef.t", d: "tools.ndef.d" },
  { k: "tools.mifare.t", d: "tools.mifare.d" },
] as const;

type PillarDef = {
  icon: LucideIcon;
  titleKey: "pillar.sw.title" | "pillar.hw.title" | "pillar.sol.title" | "pillar.dev.title";
  descKey: "pillar.sw.desc" | "pillar.hw.desc" | "pillar.sol.desc" | "pillar.dev.desc";
  module: ModuleKey;
  to: "/$locale/products" | "/$locale/platform" | "/$locale/solutions";
  search?: { tab: "sw" | "hw" };
};

const pillarDefs: PillarDef[] = [
  {
    icon: Code2,
    titleKey: "pillar.sw.title",
    descKey: "pillar.sw.desc",
    module: "products",
    to: "/$locale/products",
    search: { tab: "sw" },
  },
  {
    icon: Cpu,
    titleKey: "pillar.hw.title",
    descKey: "pillar.hw.desc",
    module: "products",
    to: "/$locale/products",
    search: { tab: "hw" },
  },
  {
    icon: Layers,
    titleKey: "pillar.sol.title",
    descKey: "pillar.sol.desc",
    module: "platform",
    to: "/$locale/platform",
  },
  {
    icon: Wrench,
    titleKey: "pillar.dev.title",
    descKey: "pillar.dev.desc",
    module: "solutions",
    to: "/$locale/solutions",
  },
];

function getIcon(name: string): LucideIcon {
  const icons = LucideIcons as unknown as Record<string, LucideIcon>;
  return icons[name] ?? LucideIcons.Boxes;
}

function Home() {
  const { tr } = useI18n();
  const { locale } = Route.useParams();
  const { products, solutions, solutionSlugs, posts, modules } = Route.useLoaderData();

  const visiblePillars = pillarDefs
    .filter((p) => modules[p.module])
    .map((p) => ({
      icon: p.icon,
      t: tr(p.titleKey),
      d: tr(p.descKey),
      to: p.to,
      search: p.search,
    }));

  const visibleIndustries = modules.solutions
    ? industries.filter((ind) => solutionSlugs.has(ind.k.replace("ind.", "")))
    : [];

  const heroPrimary =
    modules.solutions
      ? { to: "/$locale/solutions" as const, label: tr("home.viewAll.solutions"), params: { locale } }
      : modules.products
        ? { to: "/$locale/products" as const, label: tr("hero.cta1"), params: { locale } }
        : modules.contact
          ? { to: "/$locale/contact" as const, label: tr("nav.getQuote"), params: { locale } }
          : null;

  const pillarGridClass =
    visiblePillars.length >= 4
      ? "lg:grid-cols-4"
      : visiblePillars.length === 3
        ? "lg:grid-cols-3"
        : visiblePillars.length === 2
          ? "lg:grid-cols-2"
          : "lg:grid-cols-1";

  const whyItems = [
    { t: tr("home.why.1.title"), d: tr("home.why.1.desc") },
    { t: tr("home.why.2.title"), d: tr("home.why.2.desc") },
    { t: tr("home.why.3.title"), d: tr("home.why.3.desc") },
  ];

  const processSteps = [
    { step: "01", t: tr("home.process.1.title"), d: tr("home.process.1.desc") },
    { step: "02", t: tr("home.process.2.title"), d: tr("home.process.2.desc") },
    { step: "03", t: tr("home.process.3.title"), d: tr("home.process.3.desc") },
  ];

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden section-hero">
        <div className="absolute inset-0 bg-hero-glow pointer-events-none" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-10 w-full">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
            <div className="text-center lg:text-left">
              <p className="section-label">{tr("hero.eyebrow")}</p>
              <h1 className="mt-4 section-hero-title font-bold whitespace-pre-line">
                {tr("hero.title")}
              </h1>
              <p className="mt-5 text-lg text-muted-foreground leading-relaxed max-w-xl mx-auto lg:mx-0">
                {tr("hero.sub")}
              </p>
              <div className="mt-8 flex flex-wrap gap-3 justify-center lg:justify-start">
                {heroPrimary && (
                  <Link
                    to={heroPrimary.to}
                    params={heroPrimary.params}
                    className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-6 py-3 text-sm font-semibold hover:opacity-90 transition-opacity"
                  >
                    {heroPrimary.label} <ArrowRight size={16} />
                  </Link>
                )}
                {modules.contact && (
                  <Link
                    to="/$locale/contact"
                    params={{ locale }}
                    className="inline-flex items-center gap-2 rounded-full border border-border-strong bg-surface/60 backdrop-blur px-6 py-3 text-sm font-medium hover:border-primary hover:text-primary transition-colors"
                  >
                    {tr("hero.cta2")}
                  </Link>
                )}
              </div>
            </div>

            <div className="flex justify-center lg:justify-end px-4 lg:px-0">
              <HeroIllustration className="w-full max-w-[520px] lg:max-w-[560px]" />
            </div>
          </div>
        </div>
      </section>

      {/* Featured solutions — industry first */}
      {modules.solutions && solutions.length > 0 && (
        <section className="section-main bg-surface/40 border-y border-border">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <SectionHeader
              eyebrow={tr("ind.eyebrow")}
              title={tr("home.featured.solutions")}
              sub={tr("home.featured.solutions.sub")}
              action={
                <Link
                  to="/$locale/solutions"
                  params={{ locale }}
                  className="inline-flex items-center gap-1 text-sm text-primary hover:gap-2 transition-all shrink-0"
                >
                  {tr("home.viewAll.solutions")} <ArrowRight size={14} />
                </Link>
              }
            />
            <div className="grid md:grid-cols-3 gap-5">
              {solutions.map((s: CmsSolution) => (
                <Link
                  key={s.slug}
                  to="/$locale/solutions/$slug"
                  params={{ locale, slug: s.slug }}
                  className="card-glow group flex flex-col rounded-2xl border border-border bg-card-gradient overflow-hidden min-h-[20rem]"
                >
                  <img
                    src={s.heroImage ?? `/solutions/${s.slug}.webp`}
                    alt={s.name}
                    width={400}
                    height={180}
                    loading="lazy"
                    className="w-full h-36 object-cover"
                  />
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="font-display text-lg font-semibold group-hover:text-primary transition-colors">
                      {s.name}
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed flex-1 line-clamp-3">
                      {s.tagline}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1 text-sm text-primary">
                      {tr("ind.learnMore")} <ArrowRight size={14} />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All industries */}
      {modules.solutions && visibleIndustries.length > 0 && (
        <section className="section-main">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <SectionHeader
              eyebrow={tr("ind.eyebrow")}
              title={tr("ind.title")}
              sub={tr("ind.sub")}
              action={
                <Link
                  to="/$locale/solutions"
                  params={{ locale }}
                  className="inline-flex items-center gap-1 text-sm text-primary hover:gap-2 transition-all shrink-0"
                >
                  {tr("home.viewAll.solutions")} <ArrowRight size={14} />
                </Link>
              }
            />
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3">
              {visibleIndustries.map((ind) => {
                const Icon = ind.icon;
                const slug = ind.k.replace("ind.", "");
                return (
                  <Link
                    key={ind.k}
                    to="/$locale/solutions/$slug"
                    params={{ locale, slug }}
                    className="card-glow group flex flex-col items-center text-center gap-2.5 rounded-xl border border-border bg-card-gradient p-4 min-h-[7.5rem] justify-center"
                  >
                    <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/30 grid place-items-center">
                      <Icon size={18} className="text-primary" />
                    </div>
                    <div className="text-xs sm:text-sm font-medium leading-tight">
                      {tr(`${ind.k}.t` as never)}
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Pillars */}
      {visiblePillars.length > 0 && (
        <section className="section-main bg-surface/40 border-y border-border">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <SectionHeader eyebrow={tr("pillar.eyebrow")} title={tr("pillar.title")} />
            <div className={`grid sm:grid-cols-2 gap-5 ${pillarGridClass}`}>
              {visiblePillars.map((p) => {
                const Icon = p.icon;
                return (
                  <Link
                    key={p.t}
                    to={p.to}
                    params={{ locale }}
                    search={p.search}
                    className="card-glow card-equal group rounded-2xl border border-border bg-card-gradient p-7"
                  >
                    <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/30 grid place-items-center mb-5">
                      <Icon size={20} className="text-primary" />
                    </div>
                    <h3 className="font-display text-xl font-semibold mb-2">{p.t}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed flex-1">{p.d}</p>
                    <span className="mt-5 inline-flex items-center gap-1 text-sm text-primary">
                      {tr("ind.learnMore")} <ArrowRight size={14} />
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Stats + protocols, chips & security — after industry */}
      <section className="section-main">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <SectionHeader
            eyebrow={tr("proto.eyebrow")}
            title={tr("proto.title")}
            sub={tr("proto.sub")}
          />

          <dl className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-10 pb-10 border-b border-border">
            {stats.map((s) => (
              <div
                key={s.label}
                className="text-center lg:text-left lg:pl-6 lg:border-l lg:border-border first:lg:pl-0 first:lg:border-l-0"
              >
                <dt className="font-display text-2xl lg:text-3xl font-semibold tracking-tight">{s.value}</dt>
                <dd className="mt-1 text-sm text-muted-foreground">{tr(s.label)}</dd>
              </div>
            ))}
          </dl>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {protocolGroups.map((group) => (
              <div
                key={group.label}
                className="rounded-2xl border border-border bg-card-gradient p-5 lg:p-6"
              >
                <h3 className="font-display text-sm font-semibold mb-3">{tr(group.label)}</h3>
                <div className="flex flex-wrap gap-1.5">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="rounded-md border border-border bg-background/70 px-2 py-0.5 text-[11px] leading-relaxed text-muted-foreground"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured products */}
      {modules.products && products.length > 0 && (
        <section className="section-main bg-surface/40 border-y border-border">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <SectionHeader
              eyebrow={tr("nav.products")}
              title={tr("home.featured.products")}
              sub={tr("home.featured.products.sub")}
              action={
                <Link
                  to="/$locale/products"
                  params={{ locale }}
                  className="inline-flex items-center gap-1 text-sm text-primary hover:gap-2 transition-all shrink-0"
                >
                  {tr("home.viewAll.products")} <ArrowRight size={14} />
                </Link>
              }
            />
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {products.map((p: CmsProduct) => {
                const Icon = getIcon(p.icon);
                const linkProps = p.hasDetailPage
                  ? { to: "/$locale/products/$slug" as const, params: { locale, slug: p.slug } }
                  : modules.contact
                    ? { to: "/$locale/contact" as const, params: { locale } }
                    : { to: "/$locale/products" as const, params: { locale } };
                return (
                  <Link
                    key={p.id}
                    {...linkProps}
                    className="card-glow card-equal rounded-2xl border border-border bg-card-gradient p-6 group"
                  >
                    <div className="w-11 h-11 rounded-xl bg-primary/10 border border-primary/30 grid place-items-center mb-4">
                      <Icon size={18} className="text-primary" />
                    </div>
                    <h3 className="font-display font-semibold mb-2 group-hover:text-primary transition-colors">
                      {p.name}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed flex-1 line-clamp-3">
                      {p.description}
                    </p>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Why NFCTEC */}
      <section className="section-main bg-surface/40 border-y border-border">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <SectionHeader eyebrow={tr("home.why.eyebrow")} title={tr("home.why.title")} />
          <div className="grid md:grid-cols-3 gap-5">
            {whyItems.map((item) => (
              <div
                key={item.t}
                className="rounded-2xl border border-border bg-card-gradient p-7 min-h-[14rem]"
              >
                <CheckCircle2 size={20} className="text-primary mb-4" />
                <h3 className="font-display text-lg font-semibold mb-2">{item.t}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="section-tight">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <SectionHeader eyebrow={tr("home.process.eyebrow")} title={tr("home.process.title")} />
          <div className="grid md:grid-cols-3 gap-5">
            {processSteps.map((step, i) => (
              <div
                key={step.step}
                className="relative rounded-2xl border border-border bg-card-gradient p-7 min-h-[11rem]"
              >
                <span className="font-display text-4xl font-bold text-primary/15">{step.step}</span>
                <h3 className="mt-2 font-display text-lg font-semibold">{step.t}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{step.d}</p>
                {i < processSteps.length - 1 && (
                  <ArrowRight
                    size={16}
                    className="hidden md:block absolute top-1/2 -right-3 -translate-y-1/2 text-border"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dev tools */}
      {modules.platform && (
        <section className="section-tight bg-surface/40 border-y border-border">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <SectionHeader
              eyebrow={tr("tools.eyebrow")}
              title={tr("tools.title")}
              action={
                <Link
                  to="/$locale/platform"
                  params={{ locale }}
                  className="inline-flex items-center gap-1 text-sm text-primary hover:gap-2 transition-all shrink-0"
                >
                  {tr("tools.open")} <ArrowRight size={14} />
                </Link>
              }
            />
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {devTools.map((tool) => (
                <Link
                  key={tool.k}
                  to="/$locale/platform"
                  params={{ locale }}
                  className="card-glow rounded-xl border border-border bg-card-gradient p-5 min-h-[8.5rem] group"
                >
                  <h3 className="font-display text-sm font-semibold group-hover:text-primary transition-colors">
                    {tr(tool.k)}
                  </h3>
                  <p className="mt-2 text-xs text-muted-foreground leading-relaxed">{tr(tool.d)}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Blog insights */}
      {modules.blog && posts.length > 0 && (
        <section className="section-main">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <SectionHeader
              eyebrow={tr("nav.blog")}
              title={tr("home.insights")}
              sub={tr("home.insights.sub")}
              action={
                <Link
                  to="/$locale/blog"
                  params={{ locale }}
                  className="inline-flex items-center gap-1 text-sm text-primary hover:gap-2 transition-all shrink-0"
                >
                  {tr("home.viewAll.blog")} <ArrowRight size={14} />
                </Link>
              }
            />
            <div className="grid md:grid-cols-3 gap-5">
              {posts.map((p: ReturnType<typeof toBlogPost>) => (
                <Link
                  key={p.slug}
                  to="/$locale/blog/$slug"
                  params={{ locale, slug: p.slug }}
                  className="card-glow card-equal rounded-2xl border border-border bg-card-gradient p-6 group"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span className="rounded-full bg-primary/10 border border-primary/20 px-2 py-0.5 text-[10px] text-primary">
                      {p.cat}
                    </span>
                    <span className="text-xs text-muted-foreground">{p.date}</span>
                  </div>
                  <h3 className="font-display font-semibold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                    {p.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed flex-1 line-clamp-3">
                    {p.excerpt}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <CtaBand />
    </>
  );
}
