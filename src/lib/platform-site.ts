import { absLocaleUrl, type Locale } from "@/lib/locale";
import { hreflangLinks } from "@/lib/seo";
import { faqJsonLd, type FaqItem } from "@/components/FaqSection";

export const PLATFORM_APP_URL = "https://platform.nfctec.com/";

export function platformRoute(id: PlatformPageId) {
  switch (id) {
    case "home":
      return "/$locale/cloud-services/platform" as const;
    case "features":
      return "/$locale/cloud-services/platform/features" as const;
    case "provisioning":
      return "/$locale/cloud-services/platform/provisioning" as const;
    case "authentication":
      return "/$locale/cloud-services/platform/authentication" as const;
    case "pricing":
      return "/$locale/cloud-services/platform/pricing" as const;
    case "developers":
      return "/$locale/cloud-services/platform/developers" as const;
    case "faq":
      return "/$locale/cloud-services/platform/faq" as const;
  }
}

export type PlatformPageId =
  | "home"
  | "features"
  | "provisioning"
  | "authentication"
  | "pricing"
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
      en: "NTAG424 DNA Encoding & Personalization | Product Digital Identity & Anti-Counterfeiting",
      zh: "NTAG424 DNA 编码与个人化 | 产品数字身份与 NFC 防伪认证",
    },
    description: {
      en: "Cloud NTAG424 DNA encoding and personalization with secure factory read/write. Build product digital identity, authenticate every tap, and fight counterfeiting with SUN and AES-128 CMAC.",
      zh: "NTAG424 DNA 云端编码与个人化，工厂安全读写。建立产品数字身份，贴卡密码学认证，SUN 与 CMAC 支撑 NFC 防伪。",
    },
  },
  {
    id: "features",
    path: "/cloud-services/platform/features",
    nav: { en: "Features", zh: "功能" },
    title: {
      en: "NTAG424 DNA Features | Encoding, Personalization, Read/Write, Digital Identity",
      zh: "NTAG424 DNA 功能 | 编码、个人化、读写与数字身份",
    },
    description: {
      en: "NTAG424 DNA encoding templates, SUN/SDM personalization, authorized tag read/write, UID binding, product digital identity, and authentication for anti-counterfeiting.",
      zh: "NTAG424 编码模板、SUN/SDM 个人化、授权读写、UID 绑定、产品数字身份与认证防伪能力一览。",
    },
  },
  {
    id: "provisioning",
    path: "/cloud-services/platform/provisioning",
    nav: { en: "Provisioning", zh: "个人化" },
    title: {
      en: "NTAG424 DNA Encoding & Personalization | Secure Read/Write in Production",
      zh: "NTAG424 DNA 编码与个人化 | 产线安全读写",
    },
    description: {
      en: "Personalize NTAG424 DNA in the factory: cloud encoding, PC/SC or Android read/write, server-side AES keys, UID records for product digital identity and label data export.",
      zh: "工厂 NTAG424 DNA 个人化：云端编码，PC/SC 或 Android 读写，服务器保管密钥，UID 建档与产品数字身份、印刷数据导出。",
    },
  },
  {
    id: "authentication",
    path: "/cloud-services/platform/authentication",
    nav: { en: "Authentication", zh: "认证" },
    title: {
      en: "NTAG424 DNA Authentication & Anti-Counterfeiting API | SUN CMAC Verify",
      zh: "NTAG424 DNA 认证与防伪 API | SUN / CMAC 校验",
    },
    description: {
      en: "Authenticate NTAG424 DNA taps in the cloud: AES-128 CMAC, SUN dynamic messages, replay detection, and lifecycle rules for product digital identity and brand protection.",
      zh: "云端 NTAG424 DNA 认证：AES-128 CMAC、SUN 动态报文、防重放与生命周期，支撑产品数字身份与品牌防伪。",
    },
  },
  {
    id: "pricing",
    path: "/cloud-services/platform/pricing",
    nav: { en: "Pricing", zh: "价格" },
    title: {
      en: "NTAG424 DNA Encoding Pricing | Personalization Quota & Authentication API",
      zh: "NTAG424 编码价格 | 个人化额度与认证 API",
    },
    description: {
      en: "Pricing for NTAG424 DNA encoding volume and monthly authentication API—support anti-counterfeiting and product digital identity programs. One order, tax at checkout.",
      zh: "NTAG424 编码发行量与认证 API 月费，支撑防伪与产品数字身份项目。一笔订单计价，税金在收银台处理。",
    },
  },
  {
    id: "developers",
    path: "/cloud-services/platform/developers",
    nav: { en: "Developers", zh: "开发者" },
    title: {
      en: "NTAG424 DNA API | Digital Identity, Bind, Authenticate & Anti-Counterfeiting",
      zh: "NTAG424 DNA API | 数字身份、绑定与认证防伪",
    },
    description: {
      en: "Open API for NTAG424 DNA: issued inventory, UID–product binding, tap authentication, webhooks—integrate encoding, personalization, and anti-counterfeiting apps.",
      zh: "NTAG424 开放 API：发行库存、UID 产品绑定、贴卡认证、Webhook，对接编码个人化与防伪系统。",
    },
  },
  {
    id: "faq",
    path: "/cloud-services/platform/faq",
    nav: { en: "FAQ", zh: "常见问题" },
    title: {
      en: "NTAG424 DNA FAQ | Encoding, Personalization, Authentication & Anti-Counterfeiting",
      zh: "NTAG424 DNA 常见问题 | 编码、个人化、认证与防伪",
    },
    description: {
      en: "FAQ on NTAG424 DNA encoding, personalization, secure read/write, authentication, product digital identity, anti-counterfeiting, pricing, and ERP integration.",
      zh: "NTAG424 编码、个人化、读写、认证、产品数字身份、防伪、价格与 ERP 对接常见问题。",
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

export { API_PLANS as API_PLANS_PRICING, ISSUANCE_SNAP_QUANTITIES, issuanceCents, orderTotalCents } from "@/lib/platform-pricing";

/** @deprecated Use issuanceCents from platform-pricing; kept for marketing anchors. */
export const CONFIRMED_ISSUANCE = { quantity: 1000, priceUsd: 69 } as const;

/** Legacy shape for home cards (USD dollars, not cents). */
export const API_PLANS = [
  { id: "standard", name: "Standard", monthlyUsd: 39, checks: 50_000 },
  { id: "growth", name: "Growth", monthlyUsd: 99, checks: 500_000 },
  { id: "scale", name: "Scale", monthlyUsd: 299, checks: 5_000_000 },
] as const;

export const PLATFORM_FAQS: Record<Locale, FaqItem[]> = {
  en: [
    {
      q: "What is NTAG424 DNA encoding and personalization on NFCTEC Platform?",
      a: "NTAG424 DNA is an NXP NFC chip with AES-protected dynamic messages (SUN). NFCTEC Platform handles cloud encoding and personalization with secure factory read/write, then links each UID to product digital identity and authenticates taps for anti-counterfeiting.",
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
      a: "Issuance quota is a one-time purchase, counted on successful writes only, and it does not expire. The verify API is prepaid months × monthly fee for bind, activate, revoke, and verify. You can buy either or both in one order. Issuance uses a continuous price curve (for example 1,000 cards for $69); API tiers are $39, $99, and $299 per month with no annual discount.",
    },
    {
      q: "Can I integrate NFCTEC with ERP or MES?",
      a: "Yes. After you create API credentials in the platform, your system can pull issued tags, bind products, activate or revoke them, and receive webhooks. Field-level documentation is shown in the platform, not duplicated as an unverified sample on this site.",
    },
    {
      q: "Can we export UID and binding data for label printing?",
      a: "Yes. Successful issuance stores the UID. Bind product code, name, batch, or other fields in the console or through the API. For print shops or packaging lines, export files can match the columns and format you specify. Issued or bound tags are also available through the open API.",
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
      a: "No. Use the site inquiry form or contact sales for custom deployment and volume requirements.",
    },
    {
      q: "Can NFCTEC be deployed on my own server?",
      a: "Yes. Describe your requirements in the inquiry form and we will follow up by email.",
    },
  ],
  zh: [
    {
      q: "NFCTEC 平台上的 NTAG424 DNA 编码与个人化是什么？",
      a: "NTAG424 DNA 是 NXP 芯片，可用 AES 保护动态报文（SUN）。NFCTEC 在云端做编码与个人化，工厂设备安全读写写卡，再将 UID 关联产品数字身份，并在云端认证贴卡以支撑防伪。",
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
      a: "发行额度一次购买，只计写卡成功，不会过期。验真 API 按预付月数 × 月费，用于 bind、activate、verify 等。一笔订单可以只买其一或一起买。发行按连续曲线计价（例如 1,000 张 $69）；API 三档月费 $39、$99、$299，没有年付折扣。",
    },
    {
      q: "能对接 ERP 或 MES 吗？",
      a: "可以。在平台里创建 API 凭证后，业务系统可以拉取已发行标签、绑定产品、启用或作废，并接收 Webhook。字段级说明在平台内查看，本站不放一份未经核对的示例契约。",
    },
    {
      q: "可以导出印刷用的 UID 和绑定数据吗？",
      a: "可以。写卡成功会记录 UID；在控制台或通过 API 绑定产品编号、名称、批次等。面向标签印刷或包装产线，可按你要求的列和文件格式导出；也可用开放接口拉取已发行或已绑定标签。",
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
      a: "不能自助购买。定制规模或部署方式请通过网站询价表单联系销售。",
    },
    {
      q: "可以部署到我们自己的服务器吗？",
      a: "可以。在询价表单中说明需求，我们会通过邮件跟进。",
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

  if (id === "home") {
    scripts.push({
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        name: "NFCTEC Platform",
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web",
        url,
        description,
        offers: {
          "@type": "Offer",
          url: absLocaleUrl(locale, "/cloud-services/platform/pricing"),
          priceCurrency: "USD",
        },
      }),
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
