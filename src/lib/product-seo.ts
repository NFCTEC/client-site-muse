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
        a: "No. NTAG215 is a Type 2 tag with a static NDEF URL. NTAG 424 DNA is Type 4: each tap can build a SUN URL with the UID, a read counter and an AES-CMAC. A photo of an NTAG215 link still works. A replayed NTAG 424 DNA link fails if the server checks the counter.",
      },
      {
        q: "Does NTAG 424 DNA SUN need an app?",
        a: "No. The phone's built-in NFC opens the HTTPS link. The tag creates the CMAC. Your server verifies it. The phone does not.",
      },
      {
        q: "Can you encode SUN / SDM before shipping?",
        a: "Yes. We can set the NDEF template, SDM mirror offsets and per-UID AES keys, or ship blank wet inlay, sticker or PVC for your own line.",
      },
    ],
    zh: [
      {
        q: "NTAG 424 DNA 和 NTAG215 一样吗？",
        a: "不一样。NTAG215 是 Type 2，NDEF URL 是静态的。NTAG 424 DNA 是 Type 4，每次拍卡可以生成带 UID、读计数器和 AES-CMAC 的 SUN 链接。NTAG215 的链接拍下来还能用。NTAG 424 DNA 的链接如果服务器核对了计数器，再打开就会失败。",
      },
      {
        q: "NTAG 424 DNA 的 SUN 要装 App 吗？",
        a: "不用。手机自带 NFC 打开 HTTPS。CMAC 由标签生成，由你们的服务器验证。手机不验证。",
      },
      {
        q: "能出厂做 SUN / SDM 编码吗？",
        a: "可以。可写 NDEF 模板、SDM 镜像偏移和按 UID 分散的 AES 密钥，也可交空白湿 Inlay、贴纸或 PVC，接到你们自己的产线。",
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
        q: "Does J3R452 support Ed25519?",
        a: "Yes. JCOP 4.5 on P71D600 can generate an Ed25519 key and sign or verify per RFC 8032, and do X25519 / Curve448 key agreement. Java Card 3.0.5 has no standard Ed25519 algorithm id, so the applet calls the NXP extension. JCOP 4 J3R180 does not have Ed25519.",
      },
      {
        q: "Is J3R452 just a larger J3R180?",
        a: "No. J3R452 is JCOP 4.5 on P71D600: on-card Ed25519, ~450 KB FLASH class, GP 2.3.1, contactless Type A and Type B. J3R180 is JCOP 4 on P71D321: AES / RSA / NIST ECC only, 180 kB class, Type A.",
      },
    ],
    zh: [
      {
        q: "J3R452 支持 Ed25519 吗？",
        a: "支持。P71D600 上的 JCOP 4.5 可片上生成 Ed25519 密钥，并按 RFC 8032 签名、验签，也可做 X25519 / Curve448 密钥协商。Java Card 3.0.5 没有标准 Ed25519 算法号，应用要调 NXP 扩展。JCOP 4 的 J3R180 没有 Ed25519。",
      },
      {
        q: "J3R452 就是容量更大的 J3R180 吗？",
        a: "不是。J3R452 是 P71D600 上的 JCOP 4.5：片上 Ed25519、FLASH 约 450 KB、GP 2.3.1、非接 Type A 和 Type B。J3R180 是 P71D321 上的 JCOP 4：只有 AES / RSA / NIST ECC，180 kB 档，非接 Type A。",
      },
    ],
  },
  "j3r180-javacard": {
    en: [
      {
        q: "Does J3R180 support Ed25519?",
        a: "No. JCOP 4 gives AES-128/192/256, RSA to 4096, and ECDSA/ECDH on NIST and Brainpool curves up to 521 bits. Ed25519 and X25519 are on J3R452 (JCOP 4.5).",
      },
      {
        q: "Where can I buy J3R180?",
        a: "Lab packs: Amazon US B0HD7Z44HJ (dual-interface, that listing has no magstripe). Volume PVC from NFCTEC.",
      },
      {
        q: "J3R180 vs J3R452 vs J2A040?",
        a: "J2A040: JCOP 2.4.1, P5CC040, JC 2.2.2, contact only, ~40 KB, no SCP03. J3R180: JCOP 4, 180 kB, Type A, AES/RSA/NIST ECC, no Ed25519. J3R452: JCOP 4.5, ~450 KB, Type A+B, on-card Ed25519.",
      },
    ],
    zh: [
      {
        q: "J3R180 支持 Ed25519 吗？",
        a: "不支持。JCOP 4 提供 AES-128/192/256、RSA 至 4096，以及 NIST 与 Brainpool 上最高 521 位的 ECDSA/ECDH。Ed25519 和 X25519 在 J3R452（JCOP 4.5）。",
      },
      {
        q: "J3R180 在哪买？",
        a: "实验室用卡：美国 Amazon B0HD7Z44HJ（双界面，该链接无磁条）。批量 PVC 询 NFCTEC。",
      },
      {
        q: "J3R180、J3R452、J2A040 怎么分？",
        a: "J2A040：JCOP 2.4.1、P5CC040、JC 2.2.2、仅接触、约 40 KB、无 SCP03。J3R180：JCOP 4、180 kB、Type A、AES/RSA/NIST ECC、无 Ed25519。J3R452：JCOP 4.5、约 450 KB、Type A+B、片上 Ed25519。",
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
