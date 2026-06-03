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
  "brand.name": { zh: "凌芯科技", en: "NFCTec" },
  "brand.tagline": { zh: "下一代 NFC / RFID 智能连接", en: "Next-gen NFC / RFID connectivity" },

  // Hero
  "hero.eyebrow": { zh: "NFC · RFID · IoT", en: "NFC · RFID · IoT" },
  "hero.title": { zh: "让每一件物品\n都拥有数字身份", en: "Give every object\na digital identity." },
  "hero.sub": {
    zh: "我们为品牌、零售、物流与工业客户提供端到端的 NFC/RFID 标签、读写设备与云端平台解决方案。",
    en: "End-to-end NFC/RFID tags, readers and cloud platform for brands, retail, logistics and industrial customers.",
  },
  "hero.cta1": { zh: "查看产品方案", en: "Explore solutions" },
  "hero.cta2": { zh: "申请样品 →", en: "Request samples →" },
  "hero.stat1": { zh: "亿+ 标签出货", en: "B+ tags shipped" },
  "hero.stat2": { zh: "家全球客户", en: "Global customers" },
  "hero.stat3": { zh: "国家覆盖", en: "Countries served" },
  "hero.stat4": { zh: "项专利认证", en: "Patents & certs" },

  // Products section
  "prod.eyebrow": { zh: "产品矩阵", en: "Product matrix" },
  "prod.title": { zh: "为每一个场景，\n打造合适的连接方案。", en: "The right connection\nfor every scenario." },
  "prod.viewAll": { zh: "查看全部产品 →", en: "View all products →" },

  "prod.1.tag": { zh: "NFC 标签", en: "NFC Tags" },
  "prod.1.title": { zh: "NTAG 系列智能标签", en: "NTAG Smart Labels" },
  "prod.1.desc": { zh: "基于 NXP NTAG 213/215/216 芯片，支持碰一碰开启品牌互动、防伪溯源。", en: "Built on NXP NTAG 213/215/216, tap to launch brand experiences and anti-counterfeit flows." },

  "prod.2.tag": { zh: "UHF RFID", en: "UHF RFID" },
  "prod.2.title": { zh: "超高频远距离标签", en: "UHF Long-range Tags" },
  "prod.2.desc": { zh: "10 米读取距离，适配服装零售、仓储物流、资产盘点等大规模场景。", en: "10m read range for apparel retail, warehousing and asset tracking at scale." },

  "prod.3.tag": { zh: "读写设备", en: "Readers" },
  "prod.3.title": { zh: "工业级读写器", en: "Industrial Readers" },
  "prod.3.desc": { zh: "固定式与手持式读写设备，IP65 防护，支持以太网/4G/蓝牙通信。", en: "Fixed and handheld readers, IP65 rated, with Ethernet/4G/Bluetooth connectivity." },

  "prod.4.tag": { zh: "云平台", en: "Cloud" },
  "prod.4.title": { zh: "NFCTec Cloud 平台", en: "NFCTec Cloud Platform" },
  "prod.4.desc": { zh: "标签生命周期管理、数据看板、API 集成，支持千万级设备并发。", en: "Tag lifecycle management, analytics and APIs supporting tens of millions of devices." },

  // Tech
  "tech.eyebrow": { zh: "核心技术", en: "Core technology" },
  "tech.title": { zh: "从芯片到云端，\n全栈自研。", en: "From silicon to cloud,\nbuilt in-house." },
  "tech.1.title": { zh: "芯片设计", en: "Chip Design" },
  "tech.1.desc": { zh: "符合 ISO 14443 / ISO 18000-6C / NFC Forum 标准。", en: "Compliant with ISO 14443 / ISO 18000-6C / NFC Forum." },
  "tech.2.title": { zh: "天线工程", en: "Antenna Engineering" },
  "tech.2.desc": { zh: "针对金属、液体等复杂环境优化的天线设计。", en: "Antenna design optimized for metal and liquid environments." },
  "tech.3.title": { zh: "安全加密", en: "Security" },
  "tech.3.desc": { zh: "AES-128 加密、动态 URL、SUN 防伪机制。", en: "AES-128 encryption, dynamic URLs and SUN authentication." },
  "tech.4.title": { zh: "云端架构", en: "Cloud Architecture" },
  "tech.4.desc": { zh: "Kubernetes 弹性架构，全球边缘节点低延迟接入。", en: "Kubernetes-based elastic infra with global edge access." },

  // Industries
  "ind.eyebrow": { zh: "行业应用", en: "Industries" },
  "ind.title": { zh: "被全球品牌信任。", en: "Trusted by leading brands." },
  "ind.1": { zh: "品牌互动", en: "Brand Experience" },
  "ind.2": { zh: "防伪溯源", en: "Anti-counterfeit" },
  "ind.3": { zh: "智慧零售", en: "Smart Retail" },
  "ind.4": { zh: "仓储物流", en: "Logistics" },
  "ind.5": { zh: "智能制造", en: "Manufacturing" },
  "ind.6": { zh: "数字身份", en: "Digital Identity" },

  // CTA
  "cta.title": { zh: "准备好开启您的连接项目了吗？", en: "Ready to start your connectivity project?" },
  "cta.sub": { zh: "联系我们的方案工程师，48 小时内获取专属报价与样品。", en: "Talk to our solution engineers — quotes and samples within 48 hours." },
  "cta.btn": { zh: "联系销售", en: "Contact sales" },

  // Footer
  "footer.rights": { zh: "© 2026 凌芯科技. 保留所有权利.", en: "© 2026 NFCTec. All rights reserved." },
  "footer.addr": { zh: "深圳市南山区科技园南区·8 栋", en: "Building 8, Tech Park South, Nanshan, Shenzhen" },

  // About
  "about.eyebrow": { zh: "关于凌芯", en: "About NFCTec" },
  "about.title": { zh: "用 12 年，\n把一枚标签做到极致。", en: "12 years\nperfecting a single tag." },
  "about.intro": {
    zh: "凌芯科技成立于 2014 年，专注于 NFC/RFID 智能连接技术，是国内最早实现 NTAG 系列芯片量产封装的企业之一。我们在深圳设有研发中心，在东莞拥有两座智能工厂，年产能超过 30 亿枚。",
    en: "Founded in 2014, NFCTec specializes in NFC/RFID connectivity. We were among the first in China to mass-produce NTAG-series chips. With R&D in Shenzhen and two smart factories in Dongguan, our annual capacity exceeds 3 billion units.",
  },
  "about.mission.title": { zh: "我们的使命", en: "Our mission" },
  "about.mission.desc": { zh: "让物理世界与数字世界无缝连接。", en: "Seamlessly connect the physical and digital worlds." },
  "about.values.title": { zh: "我们的价值观", en: "Our values" },
  "about.values.desc": { zh: "极致工艺 · 客户优先 · 长期主义。", en: "Craftsmanship · Customer first · Long-term thinking." },

  "about.milestone.title": { zh: "发展历程", en: "Milestones" },
  "about.m1": { zh: "公司成立，专注 NFC 标签研发", en: "Founded, focusing on NFC tag R&D" },
  "about.m2": { zh: "通过 NXP 官方授权合作伙伴认证", en: "Certified NXP authorized partner" },
  "about.m3": { zh: "东莞智能工厂投产", en: "Dongguan smart factory online" },
  "about.m4": { zh: "NFCTec Cloud 平台发布", en: "NFCTec Cloud platform launched" },
  "about.m5": { zh: "累计出货突破 30 亿枚", en: "Over 3 billion units shipped" },

  // Contact
  "contact.eyebrow": { zh: "联系我们", en: "Contact" },
  "contact.title": { zh: "我们一起聊聊\n您的项目。", en: "Let's talk\nabout your project." },
  "contact.sub": { zh: "填写下方表单，我们的方案工程师将在 1 个工作日内与您联系。", en: "Fill out the form — our engineers will get back within one business day." },
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
  "ppage.title": { zh: "产品 & 解决方案", en: "Products & Solutions" },
  "ppage.sub": { zh: "完整的 NFC/RFID 端到端方案，覆盖从芯片到云端的每一环。", en: "End-to-end NFC/RFID across silicon, devices and cloud." },
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
