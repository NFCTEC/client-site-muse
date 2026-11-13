import { absLocaleUrl, type Locale } from "@/lib/locale";
import { hreflangLinks } from "@/lib/seo";
import { faqJsonLd, type FaqItem } from "@/components/FaqSection";

export const PLATFORM_APP_URL = "https://platform.nfctec.com/";

export type PlatformPageId =
  | "home"
  | "features"
  | "provisioning"
  | "authentication"
  | "pricing"
  | "enterprise"
  | "private"
  | "developers"
  | "faq";

type Copy = { en: string; zh: string };

export type PlatformPageMeta = {
  id: PlatformPageId;
  path: string;
  nav: Copy;
  title: Copy;
  description: Copy;
};

export const PLATFORM_PAGES: PlatformPageMeta[] = [
  {
    id: "home",
    path: "/cloud-services/platform",
    nav: { en: "Overview", zh: "概览" },
    title: {
      en: "NFCTEC Platform | NTAG424 DNA Provisioning & NFC Authentication",
      zh: "NFCTEC 平台 | NTAG424 DNA 安全发行与 NFC 验真",
    },
    description: {
      en: "Securely provision NTAG424 DNA tags, manage product identities, and verify NFC authenticity with server-side AES key management and cloud APIs.",
      zh: "安全发行 NTAG424 DNA 标签，管理产品身份，并用留在服务器上的 AES 密钥与云端 API 完成验真。",
    },
  },
  {
    id: "features",
    path: "/cloud-services/platform/features",
    nav: { en: "Features", zh: "功能" },
    title: {
      en: "NFCTEC Platform Features | Provisioning, Identity, Authentication",
      zh: "NFCTEC 平台功能 | 发行、身份与验真",
    },
    description: {
      en: "NTAG424 DNA provisioning templates, product lifecycle, server-side keys, and cryptographic authentication in one NFCTEC Platform feature map.",
      zh: "一张功能地图看清 NTAG424 DNA 发行模板、产品生命周期、服务器端密钥和密码学验真。",
    },
  },
  {
    id: "provisioning",
    path: "/cloud-services/platform/provisioning",
    nav: { en: "Provisioning", zh: "发行" },
    title: {
      en: "NTAG424 DNA Secure Provisioning | NFCTEC Platform",
      zh: "NTAG424 DNA 安全发行 | NFCTEC 平台",
    },
    description: {
      en: "Provision NTAG424 DNA tags from Windows, macOS, Linux, or Android. The client relays NFC messages. Cryptography stays on the server.",
      zh: "用 Windows、macOS、Linux 或 Android 发行 NTAG424 DNA。客户端转发 NFC 报文，密码学运算留在服务器。",
    },
  },
  {
    id: "authentication",
    path: "/cloud-services/platform/authentication",
    nav: { en: "Authentication", zh: "验真" },
    title: {
      en: "NTAG424 DNA Authentication API | NFCTEC Platform",
      zh: "NTAG424 DNA 验真 API | NFCTEC 平台",
    },
    description: {
      en: "Verify NTAG424 DNA dynamic messages in the cloud with AES-128 CMAC checks, replay detection, and tag lifecycle rules.",
      zh: "在云端校验 NTAG424 DNA 动态报文：AES-128 CMAC、重放识别，以及标签生命周期规则。",
    },
  },
  {
    id: "pricing",
    path: "/cloud-services/platform/pricing",
    nav: { en: "Pricing", zh: "价格" },
    title: {
      en: "NFCTEC Platform Pricing | Issuance Quota & Authentication API",
      zh: "NFCTEC 平台价格 | 发行额度与验真 API",
    },
    description: {
      en: "Buy NTAG424 issuance quota once and subscribe to authentication API plans. Confirmed public prices: 1,000 issuances for $69, API from $39/month.",
      zh: "发行额度一次买断，验真 API 按月订阅。已确认标价：1,000 张发行 $69，API 自 $39/月起。",
    },
  },
  {
    id: "enterprise",
    path: "/cloud-services/platform/enterprise",
    nav: { en: "Enterprise", zh: "企业版" },
    title: {
      en: "Enterprise NFC Infrastructure | NFCTEC Platform",
      zh: "企业级 NFC 基础设施 | NFCTEC 平台",
    },
    description: {
      en: "Proposed enterprise plans for multi-brand, multi-factory NTAG424 DNA provisioning. Indicative pricing, confirmed with sales.",
      zh: "面向多品牌、多工厂的 NTAG424 DNA 发行。企业套餐为拟定价格，以销售确认为准。",
    },
  },
  {
    id: "private",
    path: "/cloud-services/platform/private-deployment",
    nav: { en: "Private Deployment", zh: "私有部署" },
    title: {
      en: "Private Deployment (Planned) | NFCTEC Platform",
      zh: "私有部署（规划中）| NFCTEC 平台",
    },
    description: {
      en: "NFCTEC is planning private deployment for dedicated infrastructure and customer-controlled key policies. Available now for a feasibility assessment.",
      zh: "NFCTEC 正在规划私有部署，面向需要独立环境和自有密钥策略的企业。现在可以做可行性评估。",
    },
  },
  {
    id: "developers",
    path: "/cloud-services/platform/developers",
    nav: { en: "Developers", zh: "开发者" },
    title: {
      en: "NFCTEC Platform API | Bind, Activate, Verify NFC Tags",
      zh: "NFCTEC 平台 API | 绑定、启用与验真",
    },
    description: {
      en: "Integrate tag inventory, product binding, activation, revocation, verification, and webhooks. Credentials and field contracts are issued inside the platform.",
      zh: "对接标签库存、产品绑定、启用、作废、验真和 Webhook。凭证和字段约定在平台内发放。",
    },
  },
  {
    id: "faq",
    path: "/cloud-services/platform/faq",
    nav: { en: "FAQ", zh: "常见问题" },
    title: {
      en: "NFCTEC Platform FAQ | NTAG424 DNA Provisioning",
      zh: "NFCTEC 平台常见问题 | NTAG424 DNA 发行",
    },
    description: {
      en: "Answers on NTAG424 DNA provisioning, where AES keys live, readers, Android clients, pricing, ERP integration, and private deployment.",
      zh: "关于 NTAG424 DNA 发行、AES 密钥放在哪里、读卡器、Android 客户端、价格、ERP 对接和私有部署的问答。",
    },
  },
];

export function platformPage(id: PlatformPageId) {
  const page = PLATFORM_PAGES.find((item) => item.id === id);
  if (!page) throw new Error(`Unknown platform page: ${id}`);
  return page;
}

export function tx(locale: Locale, copy: Copy) {
  return locale === "zh" ? copy.zh : copy.en;
}

/** Confirmed public issuance price. Other quantities are quoted in the platform, not invented here. */
export const ISSUANCE_TIERS = [500, 1000, 5000, 10000, 25000, 50000] as const;
export const CONFIRMED_ISSUANCE = { quantity: 1000, priceUsd: 69 } as const;

export const API_PLANS = [
  { id: "standard", name: "Standard", monthlyUsd: 39, checks: 50_000 },
  { id: "growth", name: "Growth", monthlyUsd: 99, checks: 500_000 },
  { id: "scale", name: "Scale", monthlyUsd: 299, checks: 5_000_000 },
] as const;

export const API_PREPAY_MONTHS = [0, 1, 3, 6, 12, 24, 60] as const;

/** Indicative only. Not a live checkout SKU. */
export const ENTERPRISE_PLANS = [
  { id: "business", name: "Business", monthlyUsd: 499, issuance: 10_000, checks: 500_000 },
  { id: "pro", name: "Enterprise Pro", monthlyUsd: 1299, issuance: 50_000, checks: 5_000_000 },
  { id: "scale", name: "Enterprise Scale", monthlyUsd: 2999, issuance: 200_000, checks: 20_000_000, plus: true },
] as const;

export const PLATFORM_FAQS: Record<Locale, FaqItem[]> = {
  en: [
    {
      q: "What is NTAG424 DNA?",
      a: "NTAG424 DNA is an NXP NFC chip that can emit a different message on every tap, protected by AES. NFCTEC Platform personalizes those tags in the factory and checks the message later in the cloud.",
    },
    {
      q: "How does secure NFC provisioning work?",
      a: "An operator signs in, takes an issuance task, and taps the tag with a desktop reader or an Android NFC device. The client forwards the card messages. Key handling and the secure session run on the server.",
    },
    {
      q: "Are AES keys stored on factory computers?",
      a: "No. AES keys stay on the server. The provisioning client does not hold the brand keys and does not run the cryptographic session.",
    },
    {
      q: "Can I use NFC tags from another supplier?",
      a: "Yes, if they are NTAG424 DNA tags that match the issuance profile. Confirm a sample before a production run. The platform does not claim every label construction will behave the same.",
    },
    {
      q: "Which NFC readers are supported?",
      a: "Desktop provisioning uses PC/SC readers on Windows, macOS, and Linux. The client lists the readers it can open. This website does not publish a separate approved-model list.",
    },
    {
      q: "Can Android phones provision tags?",
      a: "Yes. NFC-capable Android phones, tablets, and POS devices can run the provisioning client. The phone relays NFC messages. It does not receive the AES keys.",
    },
    {
      q: "What is the difference between issuance quota and the API subscription?",
      a: "Issuance quota is a one-time purchase, counted on successful writes, and it does not expire into a monthly plan. The authentication API is a monthly allowance for binding, activation, revocation, and verification. The confirmed public issuance price is 1,000 successful writes for $69. API plans are $39, $99, and $299 per month.",
    },
    {
      q: "Can I integrate NFCTEC with ERP or MES?",
      a: "Yes. After you create API credentials in the platform, your system can pull issued tags, bind products, activate or revoke them, and receive webhooks. Field-level documentation is shown in the platform, not duplicated as an unverified sample on this site.",
    },
    {
      q: "How does CMAC verification work?",
      a: "Each tap carries a dynamic message. The server rebuilds the expected AES-128 CMAC with the keys used when that tag was issued, and it rejects a counter value that was already accepted.",
    },
    {
      q: "Can I revoke a tag?",
      a: "Yes. A revoked tag stays in the record, and later verification does not treat it as an authentic product in circulation.",
    },
    {
      q: "Is Enterprise Cloud available to buy online?",
      a: "Not as a self-serve checkout item. The Business, Enterprise Pro, and Enterprise Scale figures on this site are indicative and subject to confirmation. Use the sales form to request a quote.",
    },
    {
      q: "Can NFCTEC be deployed on my own server?",
      a: "Private deployment is planned. It is open for a feasibility assessment, covering dedicated infrastructure, an independent database, and customer-controlled key management. It is not a standard product you can switch on today.",
    },
  ],
  zh: [
    {
      q: "NTAG424 DNA 是什么？",
      a: "NTAG424 DNA 是 NXP 的 NFC 芯片，每次贴卡都可以给出不同的、由 AES 保护的报文。NFCTEC 平台负责在工厂完成个人化，并在之后于云端校验这张报文。",
    },
    {
      q: "安全发行是怎么进行的？",
      a: "操作员登录、领取发行任务，再用电脑读卡器或带 NFC 的 Android 设备贴卡。客户端只转发卡片报文。密钥处理和安全会话在服务器上完成。",
    },
    {
      q: "AES 密钥会放在工厂电脑里吗？",
      a: "不会。AES 密钥留在服务器。写卡客户端不持有品牌密钥，也不在本地做加密会话。",
    },
    {
      q: "可以用其他供应商的 NFC 标签吗？",
      a: "可以，前提是 NTAG424 DNA，并且和发行模板匹配。量产前先用样品确认。平台不保证每一种标签结构表现都一样。",
    },
    {
      q: "支持哪些读卡器？",
      a: "电脑端通过 PC/SC 读卡器，支持 Windows、macOS 和 Linux。客户端会列出它能打开的读卡器。本页不另发布一份型号白名单。",
    },
    {
      q: "Android 手机可以写卡吗？",
      a: "可以。带 NFC 的 Android 手机、平板和 POS 可以运行写卡客户端。手机只转发 NFC 报文，不会拿到 AES 密钥。",
    },
    {
      q: "发行额度和 API 订阅有什么区别？",
      a: "发行额度一次购买，按写卡成功张数计算，不是按月订阅。验真 API 是按月的调用额度，用于绑定、启用、作废和验真。已确认的公开标价是 1,000 张成功发行 $69。API 为每月 $39、$99 和 $299。",
    },
    {
      q: "能对接 ERP 或 MES 吗？",
      a: "可以。在平台里创建 API 凭证后，业务系统可以拉取已发行标签、绑定产品、启用或作废，并接收 Webhook。字段级说明在平台内查看，本站不放一份未经核对的示例契约。",
    },
    {
      q: "CMAC 验真在做什么？",
      a: "每次贴卡带上一条动态报文。服务器用这张标签发行时的密钥重算 AES-128 CMAC，并拒绝已经接受过的计数器值。",
    },
    {
      q: "可以作废一张标签吗？",
      a: "可以。作废后记录仍在，之后的验真不会再把它当作仍在流通的真品。",
    },
    {
      q: "企业云可以在线直接购买吗？",
      a: "还不能。页面上的 Business、Enterprise Pro、Enterprise Scale 都是拟定价格，需要销售确认。请通过商务表单询价。",
    },
    {
      q: "可以部署到我们自己的服务器吗？",
      a: "私有部署处于规划中，现在可以做可行性评估，范围包括独立环境、独立数据库和客户自行掌控的密钥管理。它还不是今天就能开通的标准产品。",
    },
  ],
};

export function platformHead(locale: Locale, id: PlatformPageId) {
  const page = platformPage(id);
  const url = absLocaleUrl(locale, page.path);
  const title = tx(locale, page.title);
  const description = tx(locale, page.description);
  const crumbs = [
    { name: locale === "zh" ? "首页" : "Home", path: "/" },
    { name: locale === "zh" ? "云服务" : "Cloud Services", path: "/platform" },
    { name: "NFCTEC Platform", path: "/cloud-services/platform" },
  ];
  if (id !== "home") crumbs.push({ name: tx(locale, page.nav), path: page.path });

  const scripts = [
    {
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: crumbs.map((crumb, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: crumb.name,
          item: absLocaleUrl(locale, crumb.path),
        })),
      }),
    },
  ];

  if (id === "faq") {
    scripts.push({
      type: "application/ld+json",
      children: JSON.stringify(faqJsonLd(PLATFORM_FAQS[locale])),
    });
  }

  return {
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: url },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: url }, ...hreflangLinks(page.path)],
    scripts,
  };
}

export function platformSitemapEntries(lastmod = "2026-11-13") {
  return (["en", "zh"] as const).flatMap((locale) =>
    PLATFORM_PAGES.map((page) => ({
      loc: absLocaleUrl(locale, page.path),
      lastmod,
    })),
  );
}
