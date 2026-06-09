import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

export type Lang = "en" | "zh";

type Dict = Record<string, { en: string; zh: string }>;

export const t: Dict = {
  // Nav
  "nav.products": { en: "Products", zh: "产品" },
  "nav.products.sw": { en: "Software", zh: "软件方案" },
  "nav.products.hw": { en: "Hardware", zh: "硬件设备" },
  "nav.solutions": { en: "Solutions", zh: "行业方案" },
  "nav.platform": { en: "Platform", zh: "开发平台" },
  "nav.downloads": { en: "Downloads", zh: "下载中心" },
  "nav.blog": { en: "Blog", zh: "博客" },
  "nav.about": { en: "About", zh: "关于" },
  "nav.contact": { en: "Contact Us", zh: "联系我们" },
  "nav.home": { en: "Home", zh: "首页" },

  // Brand
  "brand.tagline": {
    en: "NFC Hardware · Issuance & Verification API",
    zh: "NFC 硬件 · 发卡与验证 API",
  },

  // Hero
  "hero.eyebrow": { en: "NFC Readers · Cards · Cloud API", zh: "NFC 读卡器 · 卡片 · 云端 API" },
  "hero.title": {
    en: "NFC Hardware, plus\nIssuance & Verification API.",
    zh: "NFC 硬件，加上\n发卡与验证 API。",
  },
  "hero.sub": {
    en: "We design NFC readers and modules, and run a cloud platform that issues and verifies NTAG 424 DNA, DESFire and NTAG tags through a simple API — no crypto knowledge required.",
    zh: "我们自主设计 NFC 读卡器与模组，并提供云端发卡与验证平台。一行 API 即可发行或验证 NTAG 424 DNA、DESFire、NTAG 标签，无需了解复杂的加解密过程。",
  },
  "hero.cta1": { en: "Explore Products", zh: "查看产品" },
  "hero.cta2": { en: "Talk to Engineer", zh: "联系工程师" },

  // Business pillars
  "pillar.eyebrow": { en: "What We Do", zh: "我们做什么" },
  "pillar.title": { en: "Hardware, software, API — one NFC partner.", zh: "硬件、软件、API — 一站式 NFC 合作伙伴。" },
  "pillar.sw.title": { en: "Issuance Software", zh: "发卡软件" },
  "pillar.sw.desc": {
    en: "Desktop & server tools to personalize NTAG 424 DNA, DESFire EV2/EV3 and NTAG21x in batches.",
    zh: "桌面与服务端工具，批量个人化 NTAG 424 DNA、DESFire EV2/EV3、NTAG21x。",
  },
  "pillar.hw.title": { en: "NFC Hardware", zh: "NFC 硬件" },
  "pillar.hw.desc": {
    en: "USB / Serial / USB CCID readers, embedded modules and NFC signal detection cards.",
    zh: "USB / 串口 / USB CCID 读卡器、嵌入式模组、NFC 信号检测卡。",
  },
  "pillar.sol.title": { en: "Cloud API", zh: "云端 API" },
  "pillar.sol.desc": {
    en: "Issue and verify NFC tags with a single REST call — keys & crypto handled by us.",
    zh: "一个 REST 接口完成发卡与验证 — 密钥与加密由我们托管。",
  },
  "pillar.dev.title": { en: "Industry Solutions", zh: "行业方案" },
  "pillar.dev.desc": {
    en: "Anti-counterfeit, access control, payment, identity, IoT, retail engagement and more.",
    zh: "防伪溯源、门禁访问、支付、身份识别、物联网、零售互动等。",
  },

  // Protocols
  "proto.eyebrow": { en: "Protocol Coverage", zh: "协议覆盖" },
  "proto.title": { en: "50+ protocols. One stack.", zh: "50+ 协议，一套技术栈。" },
  "proto.sub": {
    en: "From contactless payment to government ID — we speak every NFC dialect.",
    zh: "从非接支付到政务身份证 — 我们精通每一种 NFC 协议。",
  },
  "proto.g1": { en: "Payment", zh: "支付" },
  "proto.g2": { en: "Contactless", zh: "非接通信" },
  "proto.g3": { en: "Smart Card", zh: "智能卡" },
  "proto.g4": { en: "NFC Forum", zh: "NFC 论坛" },
  "proto.g5": { en: "Crypto & Security", zh: "加密与安全" },

  // Stats
  "stat.years": { en: "Years of expertise", zh: "年技术沉淀" },
  "stat.protocols": { en: "Protocols supported", zh: "项协议支持" },
  "stat.projects": { en: "Projects delivered", zh: "个项目交付" },

  // Industries
  "ind.eyebrow": { en: "Industry Solutions", zh: "行业方案" },
  "ind.title": { en: "10 industries.\nProven NFC playbooks.", zh: "10 大行业，\n成熟 NFC 方案。" },
  "ind.banking.t": { en: "Banking & Payment", zh: "银行与支付" },
  "ind.banking.d": { en: "EMV personalization, contactless cards, tokenization.", zh: "EMV 个人化、非接卡、令牌化。" },
  "ind.transit.t": { en: "Transit & Ticketing", zh: "公共交通" },
  "ind.transit.d": { en: "CALYPSO, MIFARE, mobile ticketing, gate readers.", zh: "CALYPSO、MIFARE、移动票务、闸机读卡。" },
  "ind.gov.t": { en: "Government & ID", zh: "政务与身份" },
  "ind.gov.d": { en: "eID, ePassport ICAO 9303, driver license, eSIM.", zh: "电子身份证、电子护照 ICAO 9303、驾照、eSIM。" },
  "ind.access.t": { en: "Access Control", zh: "门禁访问" },
  "ind.access.d": { en: "DESFire, SEOS, mobile credentials, multi-factor.", zh: "DESFire、SEOS、手机凭证、多因子认证。" },
  "ind.health.t": { en: "Healthcare", zh: "医疗健康" },
  "ind.health.d": { en: "Patient ID, eHealth cards, secure prescriptions.", zh: "患者身份、电子健康卡、安全处方。" },
  "ind.iot.t": { en: "IoT & Smart Devices", zh: "物联网" },
  "ind.iot.d": { en: "Device pairing, secure provisioning, NTAG sensors.", zh: "设备配对、安全配置、NTAG 传感。" },
  "ind.brand.t": { en: "Brand Protection", zh: "品牌防伪" },
  "ind.brand.d": { en: "SUN dynamic URL, anti-counterfeit, supply chain.", zh: "SUN 动态 URL、防伪、供应链溯源。" },
  "ind.retail.t": { en: "Retail & Loyalty", zh: "零售与会员" },
  "ind.retail.d": { en: "Tap-to-engage, smart packaging, member cards.", zh: "Tap 互动、智能包装、会员卡。" },
  "ind.auto.t": { en: "Automotive", zh: "汽车" },
  "ind.auto.d": { en: "Digital key (CCC), NFC unlock, in-cabin pairing.", zh: "数字车钥匙 (CCC)、NFC 解锁、车内配对。" },
  "ind.edu.t": { en: "Education & Campus", zh: "教育与校园" },
  "ind.edu.d": { en: "Student ID, library, canteen, attendance.", zh: "学生证、图书馆、食堂、考勤。" },

  // Dev tools
  "tools.eyebrow": { en: "Free Developer Tools", zh: "免费开发者工具" },
  "tools.title": { en: "Build faster with our open tools.", zh: "用我们的开源工具，更快交付。" },
  "tools.emv.t": { en: "EMV Parser", zh: "EMV 解析器" },
  "tools.emv.d": { en: "Decode TLV tags, AIDs, PDOL/CDOL — instantly.", zh: "实时解析 TLV、AID、PDOL/CDOL。" },
  "tools.apdu.t": { en: "APDU Debugger", zh: "APDU 调试器" },
  "tools.apdu.d": { en: "Send APDU commands, log responses, replay traces.", zh: "发送 APDU 指令、记录响应、回放数据。" },
  "tools.ndef.t": { en: "NDEF Editor", zh: "NDEF 编辑器" },
  "tools.ndef.d": { en: "Create URI, vCard, WiFi, smart-poster records.", zh: "创建 URI、vCard、WiFi、智能海报记录。" },
  "tools.mifare.t": { en: "MIFARE Toolkit", zh: "MIFARE 工具集" },
  "tools.mifare.d": { en: "Read sectors, key recovery, dump & clone analysis.", zh: "读取扇区、密钥恢复、镜像与克隆分析。" },
  "tools.open": { en: "Open tool →", zh: "打开工具 →" },

  // CTA
  "cta.title": { en: "Ready to Build Your NFC Solution?", zh: "准备好启动您的 NFC 项目了吗？" },
  "cta.sub": {
    en: "Talk to our engineers — get samples, SDKs and a tailored quote within 24 hours.",
    zh: "联系我们的工程师 — 24 小时内获取样品、SDK 与专属报价。",
  },
  "cta.btn": { en: "Contact Sales", zh: "联系销售" },
  "cta.btn2": { en: "Browse Downloads", zh: "浏览下载" },

  // Footer
  "foot.product": { en: "Products", zh: "产品" },
  "foot.solution": { en: "Solutions", zh: "方案" },
  "foot.resource": { en: "Resources", zh: "资源" },
  "foot.company": { en: "Company", zh: "公司" },
  "foot.rights": { en: "© 2026 NFCTEC. All rights reserved.", zh: "© 2026 NFCTEC. 保留所有权利." },
  "foot.addr": { en: "Shenzhen · Hong Kong · Singapore", zh: "深圳 · 香港 · 新加坡" },

  // Products page
  "ppage.title": { en: "Products", zh: "产品矩阵" },
  "ppage.sub": {
    en: "Software libraries and hardware devices powering the full NFC & Smart Card lifecycle.",
    zh: "覆盖 NFC 与智能卡全生命周期的软件库与硬件设备。",
  },
  "ppage.sw": { en: "Software", zh: "软件方案" },
  "ppage.hw": { en: "Hardware", zh: "硬件设备" },

  // Software items
  "sw.1.t": { en: "NFC SDK (Android / iOS / Win / Linux)", zh: "NFC SDK (Android / iOS / Win / Linux)" },
  "sw.1.d": { en: "Cross-platform read/write, HCE, secure channel, signed dynamic URL.", zh: "跨平台读写、HCE、安全通道、签名动态 URL。" },
  "sw.2.t": { en: "EMV L2 Kernel", zh: "EMV L2 内核" },
  "sw.2.d": { en: "Contact + contactless EMV kernels, certified for Visa, Mastercard, UPI.", zh: "接触/非接触 EMV 内核，通过 Visa、Mastercard、UPI 认证。" },
  "sw.3.t": { en: "JavaCard Applets", zh: "JavaCard 小程序" },
  "sw.3.d": { en: "Payment, ID, transit and loyalty applets — GP 2.3, JC 3.1 ready.", zh: "支付、身份、交通与会员小程序，支持 GP 2.3、JC 3.1。" },
  "sw.4.t": { en: "HCE & Mobile Wallet", zh: "HCE 与移动钱包" },
  "sw.4.d": { en: "Tokenized HCE wallets with TEE/SE binding and remote provisioning.", zh: "TEE/SE 绑定、远程发卡的令牌化 HCE 钱包。" },
  "sw.5.t": { en: "Personalization Suite", zh: "个人化套件" },
  "sw.5.d": { en: "Bulk card issuance, key management (HSM), data prep & QC.", zh: "批量发卡、密钥管理 (HSM)、数据准备与质检。" },
  "sw.6.t": { en: "Server SDK & APIs", zh: "服务端 SDK 与 API" },
  "sw.6.d": { en: "REST/Webhook/MQTT APIs, tag analytics, anti-counterfeit verification.", zh: "REST/Webhook/MQTT 接口、标签分析、防伪验证。" },

  // Hardware items
  "hw.1.t": { en: "Desktop USB Readers", zh: "桌面 USB 读写器" },
  "hw.1.d": { en: "PC/SC class CCID readers, ISO 14443 A/B + ISO 7816 dual-interface.", zh: "PC/SC CCID 读卡器，双界面支持 ISO 14443 A/B + ISO 7816。" },
  "hw.2.t": { en: "Embedded Modules", zh: "嵌入式模组" },
  "hw.2.d": { en: "PN532 / PN5180 modules over UART / SPI / I²C for product integration.", zh: "PN532 / PN5180 模组，UART/SPI/I²C 接口便于集成。" },
  "hw.3.t": { en: "Handheld Terminals", zh: "手持终端" },
  "hw.3.d": { en: "Rugged Android terminals with NFC, 1D/2D scanner, 4G/WiFi.", zh: "三防安卓终端，NFC + 1D/2D 扫码 + 4G/WiFi。" },
  "hw.4.t": { en: "Payment Terminals", zh: "支付终端" },
  "hw.4.d": { en: "PCI-PTS certified contact + contactless EMV terminals.", zh: "通过 PCI-PTS 认证的接触/非接 EMV 终端。" },
  "hw.5.t": { en: "Smart Cards & Tags", zh: "智能卡与标签" },
  "hw.5.d": { en: "JCOP, DESFire, MIFARE, NTAG — printable, custom-shaped, on-metal.", zh: "JCOP、DESFire、MIFARE、NTAG — 可印刷、异形、抗金属。" },
  "hw.6.t": { en: "Antennas & Inlays", zh: "天线与封装" },
  "hw.6.d": { en: "13.56 MHz antennas tuned for metal, liquid, glass and skin contact.", zh: "针对金属、液体、玻璃、皮肤优化的 13.56 MHz 天线。" },

  // Platform page
  "plat.title": { en: "Dev Platform", zh: "开发者平台" },
  "plat.sub": {
    en: "Free tools, SDKs and sandbox APIs to accelerate every NFC project.",
    zh: "免费工具、SDK 与沙箱 API，加速每一个 NFC 项目。",
  },
  "plat.try": { en: "Open in browser", zh: "在浏览器中打开" },

  // Downloads page
  "dl.title": { en: "Download Center", zh: "下载中心" },
  "dl.sub": { en: "SDKs, datasheets, sample code, drivers and certifications.", zh: "SDK、规格书、示例代码、驱动与认证文件。" },
  "dl.cat.sdk": { en: "SDKs", zh: "SDK" },
  "dl.cat.driver": { en: "Drivers", zh: "驱动" },
  "dl.cat.spec": { en: "Datasheets", zh: "规格书" },
  "dl.cat.sample": { en: "Sample Code", zh: "示例代码" },
  "dl.cat.cert": { en: "Certifications", zh: "认证" },
  "dl.download": { en: "Download", zh: "下载" },

  // Blog page
  "blog.title": { en: "Blog & Insights", zh: "博客与洞察" },
  "blog.sub": { en: "Engineering deep-dives, protocol explainers and case studies.", zh: "工程深度解析、协议讲解与客户案例。" },
  "blog.read": { en: "Read article →", zh: "阅读全文 →" },

  // About
  "about.eyebrow": { en: "About NFCTEC", zh: "关于 NFCTEC" },
  "about.title": { en: "15 years\nat the edge of NFC.", zh: "15 年深耕\n站在 NFC 前沿。" },
  "about.intro": {
    en: "Founded in 2010, NFCTEC is a full-stack NFC and Smart Card company. Our engineers build silicon-to-cloud solutions for banks, governments, transit operators and global brands — across software libraries, certified hardware, JavaCard applets and a thriving developer platform.",
    zh: "NFCTEC 成立于 2010 年，是一家全栈式 NFC 与智能卡公司。我们为银行、政府、交通运营商与全球品牌提供从芯片到云端的完整方案 — 包括软件库、认证硬件、JavaCard 小程序与开发者平台。",
  },
  "about.mission.t": { en: "Mission", zh: "使命" },
  "about.mission.d": { en: "Give every object a trusted digital identity.", zh: "让每一件物品都拥有可信的数字身份。" },
  "about.values.t": { en: "Values", zh: "价值观" },
  "about.values.d": { en: "Open standards · Engineering rigor · Long-term partnerships.", zh: "开放标准 · 工程严谨 · 长期合作。" },
  "about.milestone": { en: "Milestones", zh: "发展历程" },
  "about.m1": { en: "Founded in Shenzhen, focused on Smart Card SDK", zh: "于深圳成立，专注智能卡 SDK" },
  "about.m2": { en: "EMV L2 kernel passed Visa / Mastercard certification", zh: "EMV L2 内核通过 Visa / Mastercard 认证" },
  "about.m3": { en: "Hardware line launched — readers, modules, terminals", zh: "硬件产品线发布 — 读卡器、模组、终端" },
  "about.m4": { en: "Developer platform & free tools released", zh: "开发者平台与免费工具发布" },
  "about.m5": { en: "500+ projects shipped in 60+ countries", zh: "已交付 500+ 项目，覆盖 60+ 国家" },

  // Contact
  "contact.eyebrow": { en: "Contact", zh: "联系我们" },
  "contact.title": { en: "Let's build your\nNFC project together.", zh: "一起打造\n您的 NFC 项目。" },
  "contact.sub": { en: "Our solution engineers will respond within one business day.", zh: "我们的方案工程师将在 1 个工作日内回复。" },
  "form.name": { en: "Name", zh: "姓名" },
  "form.company": { en: "Company", zh: "公司" },
  "form.email": { en: "Email", zh: "邮箱" },
  "form.phone": { en: "Phone", zh: "电话" },
  "form.country": { en: "Country / Region", zh: "国家 / 地区" },
  "form.subject": { en: "Subject", zh: "主题" },
  "form.desc": { en: "Project description", zh: "项目描述" },
  "form.budget": { en: "Estimated budget", zh: "预算范围" },
  "form.submit": { en: "Submit inquiry", zh: "提交需求" },
  "form.success": { en: "Thanks — we'll be in touch shortly.", zh: "已收到，我们会尽快联系您。" },
  "contact.email": { en: "Email", zh: "邮箱" },
  "contact.phone": { en: "Phone", zh: "电话" },
  "contact.addr": { en: "Headquarters", zh: "总部地址" },
};

interface I18nCtx {
  lang: Lang;
  setLang: (l: Lang) => void;
  tr: (key: keyof typeof t) => string;
}

const Ctx = createContext<I18nCtx | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

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
