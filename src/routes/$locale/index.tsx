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
import { featuredSellableProducts, mergeCatalogProducts } from "@/lib/products-catalog";
import { absLocaleUrl, type Locale } from "@/lib/locale";
import { hreflangLinks } from "@/lib/seo";
import { itemListJsonLd, jsonLdScript, socialMeta } from "@/lib/product-seo";
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

import { SolutionVisual } from "@/components/SolutionVisual";
import * as LucideIcons from "lucide-react";

const procurementFaq = {
  en: [
    { q: "Can NFCTEC manufacture custom NFC tags and smart cards?", a: "Yes. We support OEM/ODM NFC labels and smart cards with custom dimensions, artwork, chip selection and personalization requirements. Share your specifications for a tailored quotation." },
    { q: "Do you support NTAG424 DNA secure personalization?", a: "Yes. NFCTEC provides NTAG424 DNA personalization, Secure Dynamic Messaging (SDM) configuration, key management workflows and server-side authentication integration." },
    { q: "Can you make tamper-evident NFC security labels?", a: "We offer custom NFC security label projects, including NTAG424 DNA TagTamper options. Final construction, antenna design and tamper performance depend on the packaging and application." },
    { q: "How can I request a quotation?", a: "Send your product type, dimensions, chip requirements, artwork, quantity and destination through the inquiry form. Our team will review your project requirements." },
  ],
  zh: [
    { q: "NFCTEC 可以定制 NFC 标签和智能卡吗？", a: "可以。我们提供 NFC 标签与智能卡 OEM/ODM 定制，包括尺寸、印刷设计、芯片选型及个人化要求。请提供规格以获取针对性报价。" },
    { q: "支持 NTAG424 DNA 安全个人化吗？", a: "支持。NFCTEC 提供 NTAG424 DNA 个人化、SDM 安全动态消息配置、密钥管理流程及服务端认证集成。" },
    { q: "可以生产 NFC 防拆防伪标签吗？", a: "我们提供定制 NFC 安全标签方案，包括 NTAG424 DNA TagTamper 选项。最终结构、天线设计和防拆效果需要结合包装及应用场景确认。" },
    { q: "如何获取定制报价？", a: "请通过询价表单提供产品类型、尺寸、芯片要求、设计文件、数量和收货国家，我们将评估您的项目需求。" },
  ],
} as const;

export const Route = createFileRoute("/$locale/")({
  loader: async ({ params }) => {
    const locale = params.locale as Locale;
    const config = await fetchDisplayConfig(locale);
    const [products, solutions, posts] = await Promise.all([
      fetchProducts(locale),
      fetchSolutions(locale),
      fetchPosts(locale),
    ]);

    const filteredProducts = mergeCatalogProducts(
      filterByDisplayConfig(products, config.modules.products),
      locale,
    );
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
      products: featuredSellableProducts(filteredProducts, 4),
      solutions: filteredSolutions.slice(0, 3),
      solutionSlugs: new Set(filteredSolutions.map((s) => s.slug)),
      posts: filteredPosts.slice(0, 3).map(toBlogPost),
    };
  },
  head: ({ params, loaderData }) => {
    const locale = params.locale as Locale;
    const url = absLocaleUrl(locale, "/");
    const zh = locale === "zh";
    const title = zh
      ? "NFCTEC｜NFC 标签与智能卡制造商 · 安全发行方案"
      : "NFCTEC | Custom NFC Tag & Smart Card Manufacturer";
    const description = zh
      ? "NFCTEC 提供 NFC 标签、智能卡、防拆防伪标签 OEM/ODM 定制制造，以及 NTAG424 DNA 安全个人化、密钥管理和在线验真解决方案。欢迎询价。"
      : "Custom NFC tags, smart cards and tamper-evident security labels from NFCTEC. OEM/ODM manufacturing, NTAG424 DNA secure personalization, key management and authentication solutions. Request a quote.";
    const products = loaderData?.products ?? [];
    return {
      meta: socialMeta({ title, description, url, locale }),
      links: [{ rel: "canonical", href: url }, ...hreflangLinks("/")],
      scripts: [
        jsonLdScript({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: procurementFaq[zh ? "zh" : "en"].map((item) => ({ "@type": "Question", name: item.q, acceptedAnswer: { "@type": "Answer", text: item.a } })) }),
        ...(products.length > 0 ? [
              jsonLdScript(
                itemListJsonLd(
                  title,
                  description,
                  url,
                  products.map((p) => ({
                    name: p.name,
                    url: absLocaleUrl(locale, p.hasDetailPage ? `/products/${p.slug}` : "/products"),
                  })),
                ),
              ),
            ] : []),
      ],
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
  { value: "20+", label: "stat.years" },
  { value: "50+", label: "stat.protocols" },
  { value: "500+", label: "stat.projects" },
  { value: "60+", label: "stat.countries" },
] as const;

// Silicon vendors and standards bodies we work with day-to-day.
// Text wordmarks (no image assets) — safe re: licensing, and looks
// clean in both light and dark themes.
const techPartners = [
  "NXP",
  "Infineon",
  "STMicro",
  "Sony FeliCa",
  "Broadcom",
  "Samsung",
  "Apple Wallet",
  "Google Pay",
  "EMVCo",
  "GlobalPlatform",
  "GSMA",
  "FIDO Alliance",
] as const;

const devTools = [
  { k: "tools.ntag.t", d: "tools.ntag.d", slug: "ntag424-tool" },
  { k: "tools.javacard.t", d: "tools.javacard.d", slug: "javacard-tool" },
] as const;

type PillarDef = {
  icon: LucideIcon;
  titleKey: "pillar.sw.title" | "pillar.hw.title" | "pillar.sol.title" | "pillar.dev.title";
  descKey: "pillar.sw.desc" | "pillar.hw.desc" | "pillar.sol.desc" | "pillar.dev.desc";
  module: ModuleKey;
  to: "/$locale/products" | "/$locale/platform" | "/$locale/solutions";
  search?: { tab: "sw" | "hw" };
  image?: string;
};

const pillarDefs: PillarDef[] = [
  {
    icon: Cpu,
    titleKey: "pillar.hw.title",
    descKey: "pillar.hw.desc",
    module: "products",
    to: "/$locale/products",
    search: { tab: "hw" },
    image: "/images/nfctec-custom-smart-cards.webp",
  },
  {
    icon: Code2,
    titleKey: "pillar.sw.title",
    descKey: "pillar.sw.desc",
    module: "products",
    to: "/$locale/products",
    search: { tab: "sw" },
    image: "/images/nfctec-secure-personalization.webp",
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
    image: "/images/nfctec-nfc-security-labels.webp",
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
      image: p.image,
    }));

  const visibleIndustries = modules.solutions
    ? industries.filter((ind) => solutionSlugs.has(ind.k.replace("ind.", "")))
    : [];

  const heroPrimary =
    modules.contact
      ? { to: "/$locale/inquiry" as const, label: tr("nav.getQuote"), params: { locale } }
      : modules.products
        ? { to: "/$locale/products" as const, label: tr("hero.cta1"), params: { locale } }
        : modules.solutions
          ? { to: "/$locale/solutions" as const, label: tr("home.viewAll.solutions"), params: { locale } }
          : null;

  const pillarGridClass =
    visiblePillars.length >= 4
      ? "lg:grid-cols-4"
      : visiblePillars.length === 3
        ? "lg:grid-cols-3"
        : visiblePillars.length === 2
          ? "lg:grid-cols-2"
          : "lg:grid-cols-1";

  const whyItems = locale === "zh"
    ? [
        { t: "按应用定制，而不是只能选现货", d: "根据包装、安装表面、尺寸和使用环境评估芯片、天线、材料及印刷工艺。" },
        { t: "制造与安全编码衔接", d: "同一项目可协调标签或卡片生产、UID 数据交付、NTAG424 DNA 密钥配置与个人化测试。" },
        { t: "从样品验证到批量交付", d: "先确认样品、读取效果和编码要求，再安排批量生产与质量检查。" },
      ]
    : [
        { t: "Built Around Your Application", d: "Specify the packaging, mounting surface, size and environment. We help evaluate chip, antenna, material and print options." },
        { t: "Manufacturing Meets Secure Encoding", d: "Coordinate card or label production with UID data export, NTAG424 DNA key configuration and personalization testing." },
        { t: "Validate Before Scaling", d: "Review samples, NFC read performance and encoding requirements before bulk production and quality checks." },
      ];

  const processSteps = locale === "zh"
    ? [
        { step: "01", t: "提交项目要求", d: "告诉我们产品类型、尺寸、数量、使用场景，以及印刷和编码需求。" },
        { step: "02", t: "确认规格与样品", d: "共同确认芯片、材料、天线结构、设计文件及需要的测试。" },
        { step: "03", t: "生产、编码与交付", d: "按确认的规格生产并检测；如需个人化编码，可同步安排数据交付。" },
      ]
    : [
        { step: "01", t: "Share Your Requirements", d: "Tell us the product type, dimensions, quantity, application, artwork and encoding needs." },
        { step: "02", t: "Confirm Specs & Samples", d: "Review chip selection, materials, antenna construction, artwork and required tests." },
        { step: "03", t: "Produce, Encode & Deliver", d: "Manufacture and inspect to the agreed specification, with personalization and data export when requested." },
      ];

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden section-hero">
        <div className="relative mx-auto max-w-7xl px-6 lg:px-10 w-full">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
            <div className="text-center lg:text-left">
              <p className="section-label">{locale === "zh" ? "NFC 标签与智能卡制造 · OEM/ODM 定制" : "NFC TAG & SMART CARD MANUFACTURING · OEM/ODM"}</p>
              <h1 className="mt-4 section-hero-title font-bold whitespace-pre-line">
                {locale === "zh" ? "定制 NFC 标签与智能卡\n制造与安全发行一站式服务" : "Custom NFC Tags & Smart Cards\nBuilt for Your Application"}
              </h1>
              <p className="mt-5 text-lg text-muted-foreground leading-relaxed max-w-xl mx-auto lg:mx-0">
                {locale === "zh" ? "从 NFC 标签、智能卡到防拆安全封条，提供芯片选型、结构与印刷定制、批量生产及安全个人化服务，并支持 NTAG424 DNA SDM 配置与在线验真系统集成。" : "From custom NFC labels and smart cards to tamper-evident security seals, we help you choose the right chip, manufacture your product and securely personalize it. NTAG424 DNA SDM and authentication integration available."}
              </p>
              <div className="mt-8 flex flex-wrap gap-3 justify-center lg:justify-start">
                {heroPrimary && (
                  <Link
                    to={heroPrimary.to}
                    params={heroPrimary.params}
                    className="inline-flex items-center gap-2 rounded-md bg-primary text-primary-foreground px-6 py-3 text-sm font-semibold hover:opacity-90 transition-opacity"
                  >
                    {heroPrimary.label} <ArrowRight size={16} />
                  </Link>
                )}
                {modules.products && (
                  <Link
                    to="/$locale/products"
                    params={{ locale }}
                    className="inline-flex items-center gap-2 rounded-md border border-border-strong bg-background px-6 py-3 text-sm font-medium hover:border-primary hover:text-primary transition-colors"
                  >
                    {locale === "zh" ? "浏览产品" : "Explore Products"} <ArrowRight size={16} />
                  </Link>
                )}
              </div>
            </div>

            {/* Product-focused concept imagery, not a photograph of NFCTEC's actual factory. */}
            <div className="w-full max-w-[560px] mx-auto lg:ml-auto">
              <div className="overflow-hidden rounded-xl border border-border bg-surface">
                <img
                  src="/images/nfctec-nfc-tags-and-inlays.webp"
                  alt={locale === "zh" ? "NFC 智能卡、标签、天线及定制材料展示示意图" : "Illustrative selection of NFC smart cards, labels, antenna inlays and customization materials"}
                  width={1536}
                  height={1024}
                  fetchPriority="high"
                  decoding="async"
                  className="block aspect-[3/2] w-full object-cover"
                />
                <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border bg-background px-4 py-3 sm:px-5">
                  <span className="text-xs font-semibold tracking-wide text-foreground">NFCTEC / OEM & ODM</span>
                  <span className="text-xs text-muted-foreground">{locale === "zh" ? "产品与定制能力示意" : "Product & customization illustration"}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Procurement-first product discovery */}
      {modules.products && (
        <section className="section-main border-y border-border bg-surface/30">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <div className="mb-8 max-w-2xl">
              <p className="section-label">{locale === "zh" ? "定制制造" : "CUSTOM MANUFACTURING"}</p>
              <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight">
                {locale === "zh" ? "按需求定制 NFC 标签与智能卡" : "NFC Products Made to Your Specifications"}
              </h2>
              <p className="mt-3 text-muted-foreground">
                {locale === "zh" ? "根据应用选择标签结构、芯片、印刷和编码方式。支持 NFC 标签、智能卡及防拆安全封条 OEM/ODM 定制。" : "Choose the form factor, chip, printing and encoding you need. We support custom NFC labels, smart cards and security seals for OEM/ODM orders."}
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { icon: Layers, en: "NFC Labels & Stickers", zh: "NFC 标签与贴纸", descEn: "Custom shapes, inlays and printed labels", descZh: "定制形状、Inlay 与印刷标签" },
                { icon: Cpu, en: "Smart Cards & JavaCard", zh: "智能卡与 JavaCard", descEn: "PVC cards, dual-interface and secure chips", descZh: "PVC 卡、双界面卡与安全芯片" },
                { icon: ShieldCheck, en: "Tamper-Evident Labels", zh: "防拆防伪标签", descEn: "NTAG424 DNA TagTamper security labels", descZh: "NTAG424 DNA TagTamper 安全标签" },
                { icon: Fingerprint, en: "Secure Personalization", zh: "安全个人化编码", descEn: "Key management, SDM and authentication", descZh: "密钥管理、SDM 与在线验证" },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <Link key={item.en} to="/$locale/products" params={{ locale }} className="group rounded-xl border border-border bg-card p-6 transition-colors hover:border-primary/60">
                    <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary"><Icon size={22} /></div>
                    <h3 className="font-display text-lg font-semibold group-hover:text-primary">{locale === "zh" ? item.zh : item.en}</h3>
                    <p className="mt-2 min-h-12 text-sm leading-relaxed text-muted-foreground">{locale === "zh" ? item.descZh : item.descEn}</p>
                    <span className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-primary">{locale === "zh" ? "浏览产品" : "Explore products"} <ArrowRight size={15} /></span>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

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
                    ? { to: "/$locale/inquiry" as const, params: { locale } }
                    : { to: "/$locale/products" as const, params: { locale } };
                return (
                  <Link
                    key={p.id}
                    {...linkProps}
                    className="card-equal rounded-xl border border-border bg-card p-5 group"
                  >
                    {p.heroImage ? (
                       <div className="mb-4 aspect-[4/3] overflow-hidden rounded-lg border border-border bg-surface p-3">
                         <img src={p.heroImage} alt={p.name} width={480} height={360} loading="lazy" decoding="async" className="h-full w-full object-contain" />
                       </div>
                     ) : (
                       <div className="w-11 h-11 rounded-lg bg-surface border border-border grid place-items-center mb-4">
                         <Icon size={18} className="text-primary" />
                       </div>
                     )}
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

      {/* Featured industry solutions follow product discovery */}
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
                  className="group flex flex-col rounded-xl border border-border bg-card overflow-hidden min-h-[20rem] hover:border-primary/40 transition-colors"
                >
                  <SolutionVisual slug={s.slug} src={s.heroImage} alt={s.name} icon={s.icon} className="h-44" />
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
                    className="group flex flex-col items-center text-center gap-2.5 rounded-xl border border-border bg-card p-4 min-h-[7.5rem] justify-center hover:border-primary/40 transition-colors"
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
                    className="group card-equal rounded-xl border border-border bg-card p-7 hover:border-primary/40 transition-colors"
                  >
                    {p.image ? (
                      <div className="mb-5 overflow-hidden rounded-lg border border-border bg-surface">
                        <img
                          src={p.image}
                          alt={locale === "zh" ? `${p.t}产品与应用示意图` : `${p.t} product and application illustration`}
                          width={640}
                          height={420}
                          loading="lazy"
                          decoding="async"
                          className="aspect-[3/2] w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                        />
                      </div>
                    ) : (
                      <div className="w-12 h-12 rounded-xl bg-surface border border-border grid place-items-center mb-5">
                        <Icon size={20} className="text-primary" />
                      </div>
                    )}
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

      {/* Custom manufacturing capabilities: illustrative product imagery, not factory photographs. */}
      <section className="section-main border-y border-border bg-background">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="mb-8 max-w-3xl">
            <p className="section-label">{locale === "zh" ? "定制产品与安全服务" : "CUSTOM PRODUCTS & SECURE SERVICES"}</p>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight">
              {locale === "zh" ? "从产品制造到安全个人化" : "From Custom Manufacturing to Secure Personalization"}
            </h2>
            <p className="mt-3 text-muted-foreground leading-relaxed">
              {locale === "zh" ? "选择适合项目的产品形式、印刷工艺与编码服务。我们根据您的应用需求评估可行方案。" : "Explore product formats, print options and secure encoding services tailored to your application."}
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { src: "/images/nfctec-nfc-tags-and-inlays.webp", en: "NFC Tags & Inlays", zh: "NFC 标签与 Inlay", den: "Custom antenna formats, adhesive labels and chip selection.", dzh: "定制天线结构、背胶标签及芯片选型。", to: "/$locale/products" as const },
              { src: "/images/nfctec-custom-smart-cards.webp", en: "Custom Smart Cards", zh: "定制智能卡", den: "Printed PVC cards, chip options and bulk production.", dzh: "PVC 卡片印刷、芯片选型与批量制造。", to: "/$locale/products" as const },
              { src: "/images/nfctec-nfc-security-labels.webp", en: "Tamper-Evident Labels", zh: "防拆安全标签", den: "Custom die-cut shapes and holographic security finishes.", dzh: "定制模切形状与全息安全印刷效果。", to: "/$locale/solutions" as const },
              { src: "/images/nfctec-secure-personalization.webp", en: "Secure Personalization", zh: "安全个人化编码", den: "NFC issuance, key workflows and authentication integration.", dzh: "NFC 发行、密钥流程与验真系统集成。", to: "/$locale/solutions" as const },
            ].map((item) => (
              <Link key={item.src} to={item.to} params={{ locale }} className="group overflow-hidden rounded-xl border border-border bg-card hover:border-primary/40 transition-colors">
                <div className="aspect-[4/3] overflow-hidden bg-white">
                  <img src={item.src} alt={locale === "zh" ? `${item.zh}产品展示示意图` : `${item.en} illustrative product photography`} width={640} height={480} loading="lazy" decoding="async" className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-[1.02]" />
                </div>
                <div className="p-5">
                  <h3 className="font-display text-lg font-semibold group-hover:text-primary transition-colors">{locale === "zh" ? item.zh : item.en}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{locale === "zh" ? item.dzh : item.den}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">{locale === "zh" ? "了解更多" : "Explore options"} <ArrowRight size={14} /></span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why NFCTEC */}
      <section className="section-main bg-surface/40 border-y border-border">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <SectionHeader eyebrow={locale === "zh" ? "为什么选择 NFCTEC" : "WHY NFCTEC"} title={locale === "zh" ? "不仅提供产品，更帮助您解决应用问题" : "More Than a Product Supplier"} sub={locale === "zh" ? "从选型到批量制造，减少您在材料、读卡性能与安全编码之间的协调成本。" : "Bring product design, manufacturing and secure encoding into one coordinated workflow."} />
          <div className="grid md:grid-cols-3 gap-5">
            {whyItems.map((item) => (
              <div
                key={item.t}
                className="rounded-xl border border-border bg-card p-7 min-h-[14rem]"
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
          <SectionHeader eyebrow={locale === "zh" ? "合作流程" : "HOW WE WORK"} title={locale === "zh" ? "从需求到交付，流程清晰" : "From Requirements to Delivery"} />
          <div className="grid md:grid-cols-3 gap-5">
            {processSteps.map((step, i) => (
              <div
                key={step.step}
                className="relative rounded-xl border border-border bg-card p-7 min-h-[11rem]"
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
            <div className="grid sm:grid-cols-2 gap-4">
              {devTools.map((tool) => (
                <Link
                  key={tool.k}
                  to="/$locale/tools/$slug"
                  params={{ locale, slug: tool.slug }}
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

      {/* Buyer FAQ: visible answers match structured data and preserve existing pages. */}
      <section className="section-main border-t border-border">
        <div className="mx-auto max-w-5xl px-6 lg:px-10">
          <div className="mb-8">
            <p className="section-label">{locale === "zh" ? "采购常见问题" : "BUYER FAQ"}</p>
            <h2 className="mt-3 font-display text-3xl font-semibold">{locale === "zh" ? "定制 NFC 产品常见问题" : "Custom NFC Manufacturing FAQs"}</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {procurementFaq[locale === "zh" ? "zh" : "en"].map((item) => (
              <article key={item.q} className="rounded-2xl border border-border bg-card-gradient p-6">
                <h3 className="font-display text-base font-semibold">{item.q}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.a}</p>
              </article>
            ))}
          </div>
          {modules.contact && (
            <div className="mt-8">
              <Link to="/$locale/inquiry" params={{ locale }} className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90">
                {locale === "zh" ? "提交定制需求" : "Request a Custom Quote"} <ArrowRight size={16} />
              </Link>
            </div>
          )}
        </div>
      </section>

      <CtaBand />
    </>
  );
}
