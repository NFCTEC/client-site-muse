import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

export type Lang = "zh" | "en";

type Dict = Record<string, { zh: string; en: string }>;

export const t: Dict = {
  // Nav
  "nav.home": { zh: "首页", en: "Home" },
  "nav.products": { zh: "产品方案", en: "Solutions" },
  "nav.about": { zh: "关于我们", en: "About" },
  "nav.contact": { zh: "联系我们", en: "Contact" },
  "nav.cta": { zh: "获取样品", en: "Get Samples" },

  // Brand
  "brand.name": { zh: "凌芯 NFC", en: "NFCTec" },
  "brand.tagline": {
    zh: "专注 13.56MHz NFC 软硬件一体化方案",
    en: "13.56MHz NFC — hardware, software, end-to-end.",
  },

  // Hero
  "hero.eyebrow": { zh: "NFC · 13.56MHz · ISO 14443", en: "NFC · 13.56MHz · ISO 14443" },
  "hero.title": {
    zh: "一次轻触，\n连接万物。",
    en: "One tap.\nEverything connected.",
  },
  "hero.sub": {
    zh: "我们是一家专注 13.56MHz NFC 技术的公司，自研 NFC 芯片标签、读写硬件与软件 SDK / 云平台，覆盖身份识别、移动支付、防伪溯源、门禁访问与数据安全等全行业应用。",
    en: "A 13.56MHz NFC company building tags, readers, SDKs and cloud — powering identity, mobile payment, anti-counterfeit, access control and data security across industries.",
  },
  "hero.cta1": { zh: "查看产品方案", en: "Explore solutions" },
  "hero.cta2": { zh: "申请样品 →", en: "Request samples →" },
  "hero.stat1": { zh: "亿+ NFC 标签出货", en: "B+ NFC tags shipped" },
  "hero.stat2": { zh: "家全球客户", en: "Global customers" },
  "hero.stat3": { zh: "国家覆盖", en: "Countries served" },
  "hero.stat4": { zh: "项专利与认证", en: "Patents & certs" },

  // Products section
  "prod.eyebrow": { zh: "NFC 产品矩阵", en: "NFC product matrix" },
  "prod.title": {
    zh: "硬件 + 软件，\n一站式 NFC 方案。",
    en: "Hardware + software,\none NFC stack.",
  },
  "prod.viewAll": { zh: "查看全部产品 →", en: "View all products →" },

  "prod.1.tag": { zh: "NFC 标签 / 卡片", en: "NFC Tags / Cards" },
  "prod.1.title": { zh: "NFC 智能标签与卡片", en: "NFC Tags & Cards" },
  "prod.1.desc": {
    zh: "13.56MHz NFC 标签、防金属标签、PVC 卡、硅胶腕带、防伪标签，支持 NTAG / Mifare / DESFire 全系列芯片。",
    en: "13.56MHz NFC labels, on-metal tags, PVC cards, silicone wristbands and anti-tamper seals — NTAG / Mifare / DESFire chip families.",
  },

  "prod.2.tag": { zh: "NFC 读写设备", en: "NFC Readers" },
  "prod.2.title": { zh: "NFC 读写器与模组", en: "NFC Readers & Modules" },
  "prod.2.desc": {
    zh: "桌面式、嵌入式、工业手持 NFC 读写设备，及可集成的 PN532 / PN5180 模组，支持 USB / 串口 / 蓝牙 / 以太网。",
    en: "Desktop, embedded and rugged handheld NFC readers, plus PN532 / PN5180 modules over USB / UART / BT / Ethernet.",
  },

  "prod.3.tag": { zh: "NFC 软件 SDK", en: "NFC SDK" },
  "prod.3.title": { zh: "NFC SDK 与中间件", en: "NFC SDK & Middleware" },
  "prod.3.desc": {
    zh: "Android / iOS / Windows / Linux SDK，覆盖标签发卡、读写、加密认证、动态 URL(SUN)、HCE 模拟卡等核心能力。",
    en: "Cross-platform SDK for tag issuance, read/write, mutual authentication, dynamic URL (SUN) and HCE card emulation.",
  },

  "prod.4.tag": { zh: "NFC 云平台", en: "NFC Cloud" },
  "prod.4.title": { zh: "NFC 数字身份云平台", en: "NFC Digital Identity Cloud" },
  "prod.4.desc": {
    zh: "标签发行管理、一物一码、防伪验证、扫码数据看板、开放 API，支持千万级标签并发管理。",
    en: "Tag issuance, unique-ID management, anti-counterfeit verification, analytics and open APIs at scale.",
  },

  // Tech
  "tech.eyebrow": { zh: "核心技术", en: "Core technology" },
  "tech.title": { zh: "从芯片到云端，\n13.56MHz 全栈自研。", en: "From silicon to cloud,\nfull-stack 13.56MHz NFC." },
  "tech.1.title": { zh: "NFC 芯片方案", en: "NFC Chip Solutions" },
  "tech.1.desc": {
    zh: "兼容 ISO 14443 A/B、ISO 15693、NFC Forum Type 2/4/5 等全系标准。",
    en: "Supports ISO 14443 A/B, ISO 15693 and NFC Forum Type 2 / 4 / 5.",
  },
  "tech.2.title": { zh: "天线与封装", en: "Antenna & Inlay" },
  "tech.2.desc": {
    zh: "针对金属、液体、玻璃、皮肤等复杂介质的 13.56MHz 天线匹配优化。",
    en: "13.56MHz antenna tuning for metal, liquid, glass and skin-contact environments.",
  },
  "tech.3.title": { zh: "安全与加密", en: "Security & Crypto" },
  "tech.3.desc": {
    zh: "AES-128 / 3DES 加密、动态 URL(SUN)、双向认证、防克隆与防篡改。",
    en: "AES-128 / 3DES, dynamic URL (SUN), mutual auth, clone- and tamper-proof.",
  },
  "tech.4.title": { zh: "云端 & API", en: "Cloud & API" },
  "tech.4.desc": {
    zh: "Kubernetes 弹性架构，REST / Webhook 开放接口，全球边缘节点低延迟接入。",
    en: "Kubernetes elastic infra with REST / Webhook APIs and global edge access.",
  },

  // Industries / Applications
  "ind.eyebrow": { zh: "NFC 应用场景", en: "NFC applications" },
  "ind.title": { zh: "一个 NFC 标签，\n覆盖六大核心场景。", en: "One NFC tag,\nsix core scenarios." },
  "ind.1": { zh: "身份识别", en: "Identity" },
  "ind.2": { zh: "移动支付", en: "Mobile Payment" },
  "ind.3": { zh: "防伪溯源", en: "Anti-counterfeit" },
  "ind.4": { zh: "门禁访问", en: "Access Control" },
  "ind.5": { zh: "数据安全", en: "Data Security" },
  "ind.6": { zh: "智能包装 / 品牌互动", en: "Smart Packaging" },

  // CTA
  "cta.title": { zh: "准备好启动您的 NFC 项目了吗？", en: "Ready to start your NFC project?" },
  "cta.sub": {
    zh: "无论是定制 NFC 标签、读写硬件，还是软件 SDK 与云平台 — 48 小时内获取专属报价与样品。",
    en: "Custom NFC tags, readers, SDK or cloud — quotes and samples within 48 hours.",
  },
  "cta.btn": { zh: "联系销售", en: "Contact sales" },

  // Footer
  "footer.rights": { zh: "© 2026 凌芯 NFC. 保留所有权利.", en: "© 2026 NFCTec. All rights reserved." },
  "footer.addr": { zh: "深圳市南山区科技园南区·8 栋", en: "Building 8, Tech Park South, Nanshan, Shenzhen" },

  // About
  "about.eyebrow": { zh: "关于凌芯 NFC", en: "About NFCTec" },
  "about.title": {
    zh: "用 12 年，\n把 NFC 做到极致。",
    en: "12 years\nperfecting NFC.",
  },
  "about.intro": {
    zh: "凌芯科技成立于 2014 年，是一家专注于 13.56MHz NFC 技术的软硬件一体化企业。我们自主研发 NFC 标签、读写设备、SDK 与云平台，服务于身份识别、移动支付、防伪溯源、门禁访问与数据安全等行业。深圳研发中心 + 东莞两座智能工厂，NFC 标签年产能超 30 亿枚。",
    en: "Founded in 2014, NFCTec is a vertically-integrated 13.56MHz NFC company. We design NFC tags, readers, SDK and cloud — serving identity, mobile payment, anti-counterfeit, access control and data security. R&D in Shenzhen, two smart factories in Dongguan, 3B+ NFC tags per year.",
  },
  "about.mission.title": { zh: "我们的使命", en: "Our mission" },
  "about.mission.desc": {
    zh: "让每一件物品都拥有可信的数字身份。",
    en: "Give every object a trusted digital identity.",
  },
  "about.values.title": { zh: "我们的价值观", en: "Our values" },
  "about.values.desc": { zh: "极致工艺 · 客户优先 · 长期主义。", en: "Craftsmanship · Customer first · Long-term thinking." },

  "about.milestone.title": { zh: "发展历程", en: "Milestones" },
  "about.m1": { zh: "公司成立，专注 13.56MHz NFC 标签研发", en: "Founded, focusing on 13.56MHz NFC tags" },
  "about.m2": { zh: "通过 NXP 官方授权合作伙伴认证", en: "Certified NXP authorized partner" },
  "about.m3": { zh: "东莞 NFC 智能工厂投产", en: "Dongguan NFC smart factory online" },
  "about.m4": { zh: "NFC 云平台与 SDK 正式发布", en: "NFC Cloud & SDK launched" },
  "about.m5": { zh: "NFC 标签累计出货突破 30 亿枚", en: "Over 3B NFC tags shipped" },

  // Contact
  "contact.eyebrow": { zh: "联系我们", en: "Contact" },
  "contact.title": { zh: "我们一起聊聊\n您的 NFC 项目。", en: "Let's talk\nabout your NFC project." },
  "contact.sub": {
    zh: "填写下方表单，我们的 NFC 方案工程师将在 1 个工作日内与您联系。",
    en: "Fill out the form — our NFC engineers will get back within one business day.",
  },
  "form.name": { zh: "姓名", en: "Name" },
  "form.company": { zh: "公司", en: "Company" },
  "form.email": { zh: "邮箱", en: "Email" },
  "form.phone": { zh: "电话", en: "Phone" },
  "form.message": { zh: "项目需求", en: "Project details" },
  "form.submit": { zh: "提交需求", en: "Submit inquiry" },
  "form.success": { zh: "已收到您的需求，我们会尽快联系您。", en: "Thanks — we'll be in touch shortly." },
  "contact.email": { zh: "邮箱", en: "Email" },
  "contact.phone": { zh: "电话", en: "Phone" },
  "contact.addr": { zh: "地址", en: "Address" },

  // Products page
  "ppage.title": { zh: "NFC 产品 & 解决方案", en: "NFC Products & Solutions" },
  "ppage.sub": {
    zh: "完整的 13.56MHz NFC 软硬件方案 — 从芯片标签、读写设备，到 SDK 与云平台。",
    en: "Full-stack 13.56MHz NFC — from chips and tags to readers, SDK and cloud.",
  },
  "ppage.spec": { zh: "技术规格", en: "Specs" },
};

interface I18nCtx {
  lang: Lang;
  setLang: (l: Lang) => void;
  tr: (key: keyof typeof t) => string;
}

const Ctx = createContext<I18nCtx | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("zh");

  useEffect(() => {
    const stored = typeof window !== "undefined" ? (localStorage.getItem("lang") as Lang | null) : null;
    if (stored === "zh" || stored === "en") setLangState(stored);
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    if (typeof window !== "undefined") localStorage.setItem("lang", l);
  };

  const tr = (key: keyof typeof t) => t[key]?.[lang] ?? String(key);

  return <Ctx.Provider value={{ lang, setLang, tr }}>{children}</Ctx.Provider>;
}

export function useI18n() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useI18n must be used inside I18nProvider");
  return ctx;
}
