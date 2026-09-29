import type { CmsProduct } from "./cms";
import type { Locale } from "./locale";
import { DEFAULT_OG_IMAGE, SITE_NAME, SITE_URL } from "./seo";

const NXP = { "@type": "Brand" as const, name: "NXP" };

const MPN: Record<string, string> = {
  "ntag213-215-216": "NTAG213 / NTAG215 / NTAG216",
  "ntag424-dna": "NTAG 424 DNA",
  "mifare-desfire-ev3": "MIFARE DESFire EV2 / EV3",
  "mifare-ultralight": "MIFARE Ultralight EV1 / C",
  "j3r452-javacard": "J3R452",
  "j3r180-javacard": "J3R180",
  "j2a040-javacard": "J2A040",
};

const SAME_AS: Record<string, string[]> = {
  "j3r180-javacard": [
    "https://www.amazon.com/J3R180-Magnetic-Stripe-Interface-EEPROM/dp/B0HD7Z44HJ",
  ],
};

export const PRODUCT_FAQS: Record<string, Record<Locale, { q: string; a: string }[]>> = {
  "ntag213-215-216": {
    en: [
      {
        q: "What is the difference between NTAG213, NTAG215 and NTAG216?",
        a: "All three are NXP NFC Forum Type 2 tags on ISO/IEC 14443-A. User memory is 144, 504 and 888 bytes. UID is 7 bytes. Pick 213 for a short URL, 215 for typical marketing tags, 216 when you need the larger NDEF.",
      },
      {
        q: "Does NFCTEC sell NTAG213 / 215 / 216 tags?",
        a: "Yes. Wet inlay, sticker and PVC, blank or NDEF-encoded. Request a quote with quantity, form factor and which IC.",
      },
    ],
    zh: [
      {
        q: "NTAG213、NTAG215、NTAG216 有什么区别？",
        a: "都是 NXP 的 NFC Forum Type 2，ISO/IEC 14443-A。用户区分别是 144、504、888 字节，UID 7 字节。短 URL 用 213，常规营销用 215，需要更大 NDEF 用 216。",
      },
      {
        q: "NFCTEC 卖 NTAG213 / 215 / 216 吗？",
        a: "卖。湿 Inlay、贴纸、PVC，空白或预写 NDEF。询价请写数量、形态和芯片型号。",
      },
    ],
  },
  "ntag424-dna": {
    en: [
      {
        q: "Is NTAG 424 DNA the same as NTAG215?",
        a: "No. NTAG215 is Type 2 with a static NDEF. NTAG 424 DNA is Type 4 with AES-128 and SDM/SUN CMAC URLs so a copied link can be rejected on the server.",
      },
      {
        q: "Can you encode SUN / SDM before shipping?",
        a: "Yes. We can set SDM files, keys and the NDEF template, or ship blank for your own HSM line.",
      },
    ],
    zh: [
      {
        q: "NTAG 424 DNA 和 NTAG215 一样吗？",
        a: "不一样。NTAG215 是 Type 2 静态 NDEF。NTAG 424 DNA 是 Type 4，带 AES-128 和 SDM/SUN CMAC，服务器可拒绝被复制的链接。",
      },
      {
        q: "能出厂做 SUN / SDM 编码吗？",
        a: "可以。可配置 SDM 文件、密钥和 NDEF 模板，或空白交付接入你们的 HSM 线。",
      },
    ],
  },
  "mifare-desfire-ev3": {
    en: [
      {
        q: "Do you make DESFire EV2 and EV3, and which sizes?",
        a: "Yes. EV2 and EV3 in 2K, 4K and 8K. EV1 is quoted for replacements. White PVC, print, fob, inlay or wristband from the same plant.",
      },
      {
        q: "Is this MIFARE Classic?",
        a: "No. DESFire EV2/EV3 are ISO/IEC 14443-4 AES multi-application PICCs, not Classic 1K.",
      },
    ],
    zh: [
      {
        q: "做 DESFire EV2 和 EV3 吗？容量呢？",
        a: "做。EV2、EV3 均有 2K、4K、8K。替换件可询 EV1。白卡、彩印、钥匙扣、Inlay、手环同一工厂。",
      },
      {
        q: "这是 MIFARE Classic 吗？",
        a: "不是。DESFire EV2/EV3 是 ISO/IEC 14443-4 AES 多应用，不是 Classic 1K。",
      },
    ],
  },
  "mifare-ultralight": {
    en: [
      {
        q: "What Ultralight parts do you laminate?",
        a: "Ultralight EV1 with 48- or 128-byte user memory, and Ultralight C (3DES, 144-byte user). Tickets, stickers, PVC, wristbands.",
      },
      {
        q: "Should I use Ultralight or NTAG215?",
        a: "NTAG215/216 if you only need a larger NDEF. Ultralight EV1 for cheap limited-use tickets. Ultralight C only when the spec requires 3DES on Type 2.",
      },
    ],
    zh: [
      {
        q: "做哪些 Ultralight？",
        a: "Ultralight EV1 用户区 48 或 128 字节，以及 Ultralight C（3DES，用户区 144 字节）。票、贴纸、PVC、手环。",
      },
      {
        q: "用 Ultralight 还是 NTAG215？",
        a: "只要更大 NDEF 用 NTAG215/216。低成本限次票用 UL EV1。规范要求 Type 2 上 3DES 才用 Ultralight C。",
      },
    ],
  },
  "nfc-labels-and-cards": {
    en: [
      {
        q: "Are you a card factory or only a chip trader?",
        a: "We tool and finish: CR80 print, die-cut tags, on-metal, epoxy, silicone/woven/snap wristbands. You pick the IC; we match the antenna to the body.",
      },
      {
        q: "Can you cut a custom tag shape or wristband?",
        a: "Yes. Send the knife drawing or wristband CAD. MOQ depends on IC and tooling. Samples before mass.",
      },
    ],
    zh: [
      {
        q: "你们是卡厂还是只卖芯片？",
        a: "开模和后道都做：CR80 印刷、异形标签、抗金属、环氧、硅胶/织造/按扣手环。你选定芯片，天线按卡体匹配。",
      },
      {
        q: "标签异形和手环能定制吗？",
        a: "能。给刀模图或手环结构。起订看芯片和模具。可先打样再量产。",
      },
    ],
  },
  "j3r452-javacard": {
    en: [
      {
        q: "Is J3R452 the same as J3R180 with more memory?",
        a: "No. J3R452 is JCOP 4.5 on SmartMX3 P71D600, FLASH ~450 KB class before add-ons, GP 2.3.1, contactless Type A and Type B. J3R180 is JCOP 4 on the P71D321 SECID line, 180 kB class, contactless Type A.",
      },
      {
        q: "What is the 450 KB figure?",
        a: "NXP’s available FLASH before MIFARE implementations, applets and OS add-ons. Loaded cards have less free NVM. Quote the configuration.",
      },
    ],
    zh: [
      {
        q: "J3R452 就是容量更大的 J3R180 吗？",
        a: "不是。J3R452 是 P71D600 上的 JCOP 4.5，加载插件前 FLASH 约 450 KB，GP 2.3.1，非接 Type A 和 Type B。J3R180 是 P71D321 SECID 线上的 JCOP 4，180 kB 档，非接 Type A。",
      },
      {
        q: "450 KB 是空闲空间吗？",
        a: "是 NXP 在加载 MIFARE 实现、应用、OS 插件之前的 FLASH。装载后空闲 NVM 更小。询价请写配置。",
      },
    ],
  },
  "j3r180-javacard": {
    en: [
      {
        q: "Where can I buy J3R180?",
        a: "Lab packs: Amazon US B0HD7Z44HJ (dual-interface, that listing has no magstripe). Volume PVC from NFCTEC. J3R180 is JCOP 4 P71 / P71D321, JC 3.0.5 Classic, GP 2.3, 180 kB FLASH class, Type A contactless.",
      },
      {
        q: "J3R180 vs J3R452 vs J2A040?",
        a: "J2A040: JCOP 2.4.1, P5CC040, JC 2.2.2, GP 2.1.1, contact only, ~40 KB EEPROM. J3R180: JCOP 4, 180 kB class, DIF Type A. J3R452: JCOP 4.5, P71D600, ~450 KB class, DIF Type A+B.",
      },
    ],
    zh: [
      {
        q: "J3R180 在哪买？",
        a: "实验室用卡：美国 Amazon B0HD7Z44HJ（双界面，该链接无磁条）。批量 PVC 询 NFCTEC。J3R180 是 JCOP 4 P71 / P71D321，JC 3.0.5 Classic，GP 2.3，FLASH 180 kB 档，非接 Type A。",
      },
      {
        q: "J3R180、J3R452、J2A040 怎么分？",
        a: "J2A040：JCOP 2.4.1、P5CC040、JC 2.2.2、GP 2.1.1、仅接触、EEPROM 约 40 KB。J3R180：JCOP 4、180 kB 档、双界面 Type A。J3R452：JCOP 4.5、P71D600、约 450 KB 档、双界面 Type A+B。",
      },
    ],
  },
  "j2a040-javacard": {
    en: [
      {
        q: "Do you still sell J2A040?",
        a: "Yes, for JCOP 2.4.1 / P5CC040 / Java Card 2.2.2 / GP 2.1.1 contact cards only. It has no T=CL and no SCP03. New dual-interface: J3R180 or J3R452.",
      },
      {
        q: "Is J2A040 dual-interface?",
        a: "No. J2A040 is contact ISO/IEC 7816 only.",
      },
    ],
    zh: [
      {
        q: "还卖 J2A040 吗？",
        a: "卖，仅给 JCOP 2.4.1 / P5CC040 / Java Card 2.2.2 / GP 2.1.1 接触卡。无 T=CL、无 SCP03。新的双界面用 J3R180 或 J3R452。",
      },
      {
        q: "J2A040 是双界面吗？",
        a: "不是。只有 ISO/IEC 7816 接触。",
      },
    ],
  },
};

export function socialMeta(opts: {
  title: string;
  description: string;
  url: string;
  locale: Locale;
  type?: string;
  image?: string;
}) {
  const image = opts.image ?? DEFAULT_OG_IMAGE;
  const ogLocale = opts.locale === "zh" ? "zh_CN" : "en_US";
  const ogAlt = opts.locale === "zh" ? "en_US" : "zh_CN";
  return [
    { title: opts.title },
    { name: "description", content: opts.description },
    { property: "og:title", content: opts.title },
    { property: "og:description", content: opts.description },
    { property: "og:url", content: opts.url },
    { property: "og:type", content: opts.type ?? "website" },
    { property: "og:image", content: image },
    { property: "og:locale", content: ogLocale },
    { property: "og:locale:alternate", content: ogAlt },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: opts.title },
    { name: "twitter:description", content: opts.description },
    { name: "twitter:image", content: image },
  ];
}

export function jsonLdScript(data: unknown) {
  return { type: "application/ld+json" as const, children: JSON.stringify(data) };
}

export function productJsonLd(
  product: CmsProduct,
  locale: Locale,
  url: string,
  image: string | undefined,
  offerUrl: string,
) {
  const mpn = MPN[product.slug];
  const sameAs = SAME_AS[product.slug];
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.seoDescription ?? product.description,
    url,
    image: image ?? DEFAULT_OG_IMAGE,
    sku: product.slug,
    mpn,
    brand: mpn ? NXP : { "@type": "Brand", name: SITE_NAME },
    manufacturer: mpn
      ? { "@type": "Organization", name: "NXP Semiconductors" }
      : { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
    seller: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
    category: product.category === "hardware" ? "NFC hardware" : "NFC software",
    additionalProperty: product.specs.map((s) => ({
      "@type": "PropertyValue",
      name: s.key,
      value: s.value,
    })),
    sameAs,
    offers: {
      "@type": "Offer",
      url: offerUrl,
      availability: "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
      priceCurrency: "USD",
      price: "0",
      seller: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
    },
  };
}

export function productFaqJsonLd(slug: string, locale: Locale) {
  const faqs = PRODUCT_FAQS[slug]?.[locale];
  if (!faqs?.length) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}

export function breadcrumbJsonLd(
  locale: Locale,
  items: { name: string; path: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: locale === "zh" ? "首页" : "Home",
        item: `${SITE_URL}/${locale}`,
      },
      ...items.map((item, i) => ({
        "@type": "ListItem",
        position: i + 2,
        name: item.name,
        item: item.path.startsWith("http") ? item.path : `${SITE_URL}/${locale}${item.path}`,
      })),
    ],
  };
}

export function itemListJsonLd(
  name: string,
  description: string,
  url: string,
  items: { name: string; url: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name,
    description,
    url,
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: items.length,
      itemListElement: items.map((item, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: item.name,
        url: item.url,
      })),
    },
  };
}

export function resolveProductImage(product: CmsProduct): string {
  const src = product.ogImage ?? product.images[0]?.src ?? product.heroImage;
  if (!src) return DEFAULT_OG_IMAGE;
  if (src.startsWith("http")) return src;
  return `${SITE_URL}${src.startsWith("/") ? src : `/${src}`}`;
}
