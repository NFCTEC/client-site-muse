// Fallback mock data used when the external CMS is unreachable (e.g. 403 / offline).
// Shapes match what `cms.ts` normalizers expect.
import { posts as blogPosts } from "./blog-posts";
import type { Locale } from "./locale";

const zh = (en: string, zhText: string, locale: Locale) => (locale === "zh" ? zhText : en);

type Industry = {
  slug: string;
  nameEn: string;
  nameZh: string;
  taglineEn: string;
  taglineZh: string;
  introEn: string;
  introZh: string;
  icon: string;
};

const INDUSTRIES: Industry[] = [
  { slug: "banking", nameEn: "Banking & Payment", nameZh: "银行与支付", icon: "Landmark",
    taglineEn: "EMV-certified issuance from applet to acquirer host.",
    taglineZh: "从应用到收单主机的 EMV 认证发卡方案。",
    introEn: "End-to-end payment engineering — EMV applets, PCI-compliant issuance, tokenization and ISO 8583 hosts.",
    introZh: "端到端支付工程 — EMV 应用、PCI 合规发卡、令牌化与 ISO 8583 主机系统。" },
  { slug: "transit", nameEn: "Transit & Ticketing", nameZh: "公共交通", icon: "Train",
    taglineEn: "CALYPSO, MIFARE DESFire and account-based ticketing.",
    taglineZh: "CALYPSO、MIFARE DESFire 与账户制票务。",
    introEn: "Fare media, validators and back-office reconciliation for metros, buses and multimodal networks.",
    introZh: "覆盖地铁、公交与多式联运的票卡、验票机与后台清分系统。" },
  { slug: "gov", nameEn: "Government & ID", nameZh: "政务与身份", icon: "Fingerprint",
    taglineEn: "ICAO 9303 ePassports and eID card issuance.",
    taglineZh: "ICAO 9303 电子护照与 eID 发行。",
    introEn: "Biometric personalization, PKI, BAC/PACE and secure printing for national ID programs.",
    introZh: "面向国家 ID 项目的生物特征个人化、PKI、BAC/PACE 与安全印刷。" },
  { slug: "access", nameEn: "Access Control", nameZh: "门禁访问", icon: "KeyRound",
    taglineEn: "MIFARE DESFire EV3 and mobile credentials.",
    taglineZh: "MIFARE DESFire EV3 与手机凭证。",
    introEn: "Diversified-key issuance, reader firmware and mobile wallet passes for enterprise access.",
    introZh: "面向企业门禁的分散密钥发卡、读卡器固件与手机钱包卡。" },
  { slug: "health", nameEn: "Healthcare", nameZh: "医疗健康", icon: "HeartPulse",
    taglineEn: "Patient identification and secure prescription.",
    taglineZh: "患者身份识别与安全处方。",
    introEn: "HIPAA-aligned smart cards, e-prescriptions and staff authentication.",
    introZh: "符合 HIPAA 的智能卡、电子处方与员工身份认证。" },
  { slug: "iot", nameEn: "IoT & Smart Devices", nameZh: "物联网", icon: "Cpu",
    taglineEn: "NTAG 424 DNA tap-to-configure for connected products.",
    taglineZh: "NTAG 424 DNA 让设备一触即配。",
    introEn: "Zero-touch provisioning, secure firmware attestation and lifecycle telemetry.",
    introZh: "零接触部署、安全固件证明与全生命周期遥测。" },
  { slug: "brand", nameEn: "Brand Protection", nameZh: "品牌防伪", icon: "ShieldCheck",
    taglineEn: "SUN dynamic URLs stop cloning at the tap.",
    taglineZh: "SUN 动态 URL 一触验真、拒绝复制。",
    introEn: "Per-tap signed URLs, consumer engagement analytics and cloud verification APIs.",
    introZh: "每次点击签名 URL、消费者互动分析与云端验证 API。" },
  { slug: "retail", nameEn: "Retail & Loyalty", nameZh: "零售与会员", icon: "ShoppingBag",
    taglineEn: "Tap-to-earn loyalty and closed-loop payment.",
    taglineZh: "一触即享的会员积分与闭环支付。",
    introEn: "Membership cards, gift and stored-value programs integrated with POS.",
    introZh: "会员卡、礼品卡与储值方案，与 POS 深度集成。" },
  { slug: "auto", nameEn: "Automotive", nameZh: "汽车", icon: "Car",
    taglineEn: "Digital car keys aligned with CCC.",
    taglineZh: "符合 CCC 标准的数字车钥匙。",
    introEn: "UWB + NFC digital key architectures, in-vehicle SE and personalization tools.",
    introZh: "UWB + NFC 数字钥匙架构、车载 SE 与个人化工具。" },
  { slug: "edu", nameEn: "Education & Campus", nameZh: "教育与校园", icon: "Boxes",
    taglineEn: "One-card campus for library, cafeteria and access.",
    taglineZh: "一卡通覆盖图书馆、食堂与门禁。",
    introEn: "Unified student credentials, payments and attendance across campus systems.",
    introZh: "统一的学生凭证、校园支付与考勤,贯通各校园系统。" },
  { slug: "wallet", nameEn: "Mobile Wallet & Digital Credentials", nameZh: "手机钱包与数字凭证", icon: "Smartphone",
    taglineEn: "Apple Wallet, Google Wallet and ISO mDoc.",
    taglineZh: "Apple Wallet、Google Wallet 与 ISO mDoc。",
    introEn: "Pass issuance, VAS/ECP terminal integration and ISO 18013-5 mobile driving licenses.",
    introZh: "卡券发行、VAS/ECP 终端集成与 ISO 18013-5 手机驾照方案。" },
  { slug: "security", nameEn: "Security & Crypto Wallet", nameZh: "安全与加密货币钱包", icon: "ShieldCheck",
    taglineEn: "FIDO2 security keys and hardware crypto wallets.",
    taglineZh: "FIDO2 安全密钥与硬件加密货币钱包。",
    introEn: "FIDO2 / Passkey keys, on-card secp256k1 / ed25519 signing and cold backup cards on CC EAL6+ SE.",
    introZh: "FIDO2 / Passkey 安全密钥、卡内 secp256k1 / ed25519 签名与冷备份卡,基于 CC EAL6+ 安全元件。" },
];

function solutions(locale: Locale) {
  return INDUSTRIES.map((i, idx) => ({
    id: i.slug,
    locale,
    slug: i.slug,
    name: locale === "zh" ? i.nameZh : i.nameEn,
    tagline: locale === "zh" ? i.taglineZh : i.taglineEn,
    intro: locale === "zh" ? i.introZh : i.introEn,
    icon: i.icon,
    heroImage: `/solutions/${i.slug}.jpg`,
    capabilities: [
      { title: zh("Reference architecture", "参考架构", locale), description: zh("Proven blueprints for pilot and scale.", "从试点到规模化的成熟蓝图。", locale) },
      { title: zh("Certified components", "认证组件", locale), description: zh("Chips, applets and readers pre-validated.", "预验证的芯片、应用与读卡器。", locale) },
      { title: zh("Cloud APIs", "云端 API", locale), description: zh("Issue and verify without touching crypto.", "无需接触加解密即可发行与验证。", locale) },
    ],
    deliverables: [],
    protocols: ["ISO 14443", "ISO 7816", "NFC Forum"],
    certifications: ["EMVCo", "Common Criteria"],
    workflow: [],
    resources: [],
    sortOrder: idx,
    seoTitle: null,
    seoDescription: null,
    ogImage: null,
  }));
}

const PRODUCTS = [
  { slug: "nfc-field-detector", nameEn: "NFC Field Detector Card", nameZh: "NFC 信号检测卡",
    descEn: "Passive tool that visualizes NFC field strength for terminal QA.",
    descZh: "用于终端测试的被动式 NFC 场强可视化工具。",
    category: "hardware" as const, icon: "Wrench" },
  { slug: "nfc-issuance-sdk", nameEn: "NFC Issuance SDK", nameZh: "NFC 发卡 SDK",
    descEn: "One API to personalize NTAG 424 DNA and MIFARE DESFire.",
    descZh: "统一 API 完成 NTAG 424 DNA 与 MIFARE DESFire 个人化。",
    category: "software" as const, icon: "Code2" },
  { slug: "desktop-reader", nameEn: "Desktop NFC Reader", nameZh: "桌面 NFC 读卡器",
    descEn: "USB PC/SC reader supporting Type A/B and NFC-V.",
    descZh: "支持 Type A/B 与 NFC-V 的 USB PC/SC 读卡器。",
    category: "hardware" as const, icon: "Cpu" },
];

function products(locale: Locale) {
  return PRODUCTS.map((p, idx) => ({
    id: p.slug,
    locale,
    slug: p.slug,
    name: locale === "zh" ? p.nameZh : p.nameEn,
    description: locale === "zh" ? p.descZh : p.descEn,
    tagline: null,
    intro: null,
    category: p.category,
    icon: p.icon,
    heroImage: null,
    images: [],
    features: [],
    specs: [],
    useCases: [],
    highlights: [],
    body: "",
    hasDetailPage: p.slug === "nfc-field-detector",
    ctaUrl: null,
    ctaLabel: null,
    secondaryCtaUrl: null,
    secondaryCtaLabel: null,
    sortOrder: idx,
    seoTitle: null,
    seoDescription: null,
    ogImage: null,
  }));
}

function mockPosts(locale: Locale) {
  return blogPosts.map((p) => ({
    id: p.slug,
    locale,
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt,
    body: p.body,
    category: p.cat,
    readMinutes: p.readMinutes,
    viewCount: 0,
    publishedAt: p.date,
    seoTitle: null,
    seoDescription: null,
    ogImage: null,
  }));
}

export function mockResponse(path: string): unknown {
  const url = new URL(`http://x${path}`);
  const p = url.pathname;
  const locale = (url.searchParams.get("locale") as Locale) || "en";

  if (p.endsWith("/public/display-config")) return { modules: {} };
  if (p.endsWith("/public/solutions")) return solutions(locale);
  if (p.endsWith("/public/products")) {
    const cat = url.searchParams.get("category");
    const all = products(locale);
    return cat ? all.filter((x) => x.category === cat) : all;
  }
  if (p.endsWith("/public/posts")) return mockPosts(locale);
  if (p.endsWith("/public/downloads")) return [];
  if (p.endsWith("/public/sitemap")) return { urls: [] };

  const solMatch = p.match(/\/public\/solutions\/([^/]+)$/);
  if (solMatch) return solutions(locale).find((s) => s.slug === solMatch[1]) ?? null;
  const prodMatch = p.match(/\/public\/products\/([^/]+)$/);
  if (prodMatch) return products(locale).find((s) => s.slug === prodMatch[1]) ?? null;
  const postMatch = p.match(/\/public\/posts\/([^/]+)$/);
  if (postMatch) return mockPosts(locale).find((s) => s.slug === postMatch[1]) ?? null;

  return null;
}
