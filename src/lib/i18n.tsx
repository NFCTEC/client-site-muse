import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { useNavigate, useRouterState } from "@tanstack/react-router";
import { stripLocalePrefix, swapLocalePath } from "./locale";

export type Lang = "en" | "zh";

type Dict = Record<string, { en: string; zh: string }>;

export const t: Dict = {
  // Nav
  "nav.products": { en: "Products", zh: "产品" },
  "nav.products.sw": { en: "Software", zh: "软件方案" },
  "nav.products.hw": { en: "Hardware", zh: "硬件设备" },
  "nav.solutions": { en: "Solutions", zh: "行业方案" },
  "nav.platform": { en: "Cloud Services", zh: "云服务" },
  "nav.downloads": { en: "Downloads", zh: "下载中心" },
  "nav.blog": { en: "Blog", zh: "博客" },
  "nav.about": { en: "About", zh: "关于" },
  "nav.contact": { en: "Contact Us", zh: "联系我们" },
  "nav.home": { en: "Home", zh: "首页" },
  "nav.getQuote": { en: "Get a Quote", zh: "获取报价" },

  "home.protocols": { en: "50+ protocols supported", zh: "支持 50+ 协议标准" },
  "home.stats.eyebrow": { en: "Trusted worldwide", zh: "全球客户信赖" },
  "home.featured.products": { en: "Featured products", zh: "精选产品" },
  "home.featured.products.sub": {
    en: "SDKs, readers and modules ready to evaluate — samples available on request.",
    zh: "SDK、读卡器与模组均可评估 — 样品可按需寄送。",
  },
  "home.featured.solutions": { en: "Industry playbooks", zh: "行业成熟方案" },
  "home.featured.solutions.sub": {
    en: "Proven architectures for payment, transit, identity and IoT — from pilot to production.",
    zh: "覆盖支付、交通、身份与物联网的成熟架构 — 从试点到量产。",
  },
  "home.why.eyebrow": { en: "Why NFCTEC", zh: "为什么选择我们" },
  "home.why.title": { en: "One partner for the entire NFC stack.", zh: "NFC 全栈，一个合作伙伴。" },
  "home.why.1.title": { en: "Full-stack ownership", zh: "全栈自主" },
  "home.why.1.desc": {
    en: "Hardware, firmware, SDKs and cloud API — designed together, not stitched from vendors.",
    zh: "硬件、固件、SDK 与云端 API 一体设计，而非拼凑多家供应商。",
  },
  "home.why.2.title": { en: "Security & compliance", zh: "安全与合规" },
  "home.why.2.desc": {
    en: "FIDO2, hardware wallets, secure elements and EMV / PCI certifications — security built in from chip to cloud.",
    zh: "FIDO2、硬件钱包、安全元件及 EMV / PCI 认证 — 从芯片到云端内置安全能力。",
  },
  "home.why.3.title": { en: "Engineer to engineer", zh: "工程师直连" },
  "home.why.3.desc": {
    en: "Talk directly to the team that builds the readers and writes the SDK — no sales hand-offs.",
    zh: "直接与开发读卡器、编写 SDK 的工程师沟通 — 无需层层转接。",
  },
  "home.process.eyebrow": { en: "How we work", zh: "合作流程" },
  "home.process.title": { en: "From first call to production.", zh: "从首次沟通到量产交付。" },
  "home.process.1.title": { en: "Discovery", zh: "需求梳理" },
  "home.process.1.desc": {
    en: "Protocol, chip and compliance requirements mapped in a technical workshop.",
    zh: "通过技术 workshop 明确协议、芯片与合规要求。",
  },
  "home.process.2.title": { en: "Prototype", zh: "原型验证" },
  "home.process.2.desc": {
    en: "Samples, SDK integration and lab validation within weeks — not months.",
    zh: "数周内完成样品、SDK 集成与实验室验证 — 而非数月。",
  },
  "home.process.3.title": { en: "Production", zh: "量产交付" },
  "home.process.3.desc": {
    en: "Certification support, manufacturing and ongoing firmware updates.",
    zh: "认证辅导、量产支持及持续固件更新。",
  },
  "home.viewAll.products": { en: "View all products", zh: "查看全部产品" },
  "home.viewAll.solutions": { en: "View all industries", zh: "查看全部行业" },
  "home.viewAll.blog": { en: "Read more insights", zh: "阅读更多文章" },
  "home.insights": { en: "Latest insights", zh: "最新洞察" },
  "home.insights.sub": {
    en: "Engineering notes, protocol explainers and customer stories.",
    zh: "工程笔记、协议解读与客户案例。",
  },
  "ind.sub": {
    en: "Tap an industry to explore capabilities, protocols and deliverables.",
    zh: "点击行业，查看能力清单、协议支持与交付物。",
  },
  "ind.capabilities": { en: "Key capabilities", zh: "核心能力" },
  "ind.learnMore": { en: "Learn more", zh: "了解更多" },
  "about.certs": { en: "Certifications & partnerships", zh: "认证与合作伙伴" },

  // Brand
  "brand.tagline": {
    en: "Software · Hardware · Cloud — built with your team",
    zh: "软件 · 硬件 · 云服务 — 与您的团队共建",
  },

  // Hero
  "hero.eyebrow": { en: "Product development · Firmware · Cloud", zh: "产品开发 · 固件 · 云服务" },
  "hero.title": {
    en: "We help you ship\nNFC-enabled products.",
    zh: "助您交付\nNFC 智能产品。",
  },
  "hero.sub": {
    en: "Co-develop software, design hardware and connect cloud backends — from first prototype to certified mass production. You bring the product vision; we bring the NFC stack.",
    zh: "联合开发软件、设计硬件、对接云端服务 — 从首版原型到认证量产。您负责产品方向，我们负责 NFC 全栈能力。",
  },
  "hero.cta1": { en: "Explore Products", zh: "查看产品" },
  "hero.cta2": { en: "Talk to Engineer", zh: "联系工程师" },
  "hero.ill.label": { en: "NFC Product Stack", zh: "NFC 产品全栈" },
  "hero.ill.hw": { en: "Hardware", zh: "硬件" },
  "hero.ill.sw": { en: "Software", zh: "软件" },
  "hero.ill.cloud": { en: "Cloud API", zh: "云端 API" },

  // Business pillars
  "pillar.eyebrow": { en: "What We Do", zh: "我们做什么" },
  "pillar.title": { en: "How we help you build", zh: "我们如何与您共建" },
  "pillar.sw.title": { en: "Software", zh: "软件" },
  "pillar.sw.desc": {
    en: "Mobile wallet SDKs, issuance & reading software for ePassports, bank cards (EMV), NTAG 424 DNA, DESFire, MIFARE, FeliCa, JavaCard and more.",
    zh: "手机钱包 SDK、面向电子护照、银行卡 (EMV)、NTAG 424 DNA、DESFire、MIFARE、FeliCa、JavaCard 等的发卡与读卡软件。",
  },
  "pillar.hw.title": { en: "Hardware", zh: "硬件" },
  "pillar.hw.desc": {
    en: "USB / Serial / USB CCID readers, embedded modules, NFC signal detection cards, antennas and blank cards.",
    zh: "USB / 串口 / USB CCID 读卡器、嵌入式模组、NFC 信号检测卡、天线与空白卡。",
  },
  "pillar.sol.title": { en: "Cloud Services", zh: "云服务" },
  "pillar.sol.desc": {
    en: "Issuance & verification APIs, HSM-backed keys and SaaS consoles — connect your hardware to the cloud without crypto complexity.",
    zh: "发卡与验证 API、HSM 托管密钥与 SaaS 控制台 — 无需深入密码学，即可让硬件对接云端。",
  },
  "pillar.dev.title": { en: "Industry Solutions", zh: "行业方案" },
  "pillar.dev.desc": {
    en: "Turn-key architectures for payment, transit, identity, access and IoT — tailored to your product requirements.",
    zh: "面向支付、交通、身份、门禁与物联网的交钥匙架构 — 按您的产品需求定制。",
  },

  // Protocols, chips & security
  "proto.eyebrow": { en: "Technology Coverage", zh: "技术覆盖" },
  "proto.title": { en: "50+ protocols, chips & security.\nOne stack.", zh: "50+ 协议、芯片与安全能力\n一套技术栈。" },
  "proto.sub": {
    en: "Payment protocols, Apple VAS / ECP, NCI controller chips, secure elements, FIDO / Passkeys, crypto wallets and industry certifications — engineered as one integrated stack.",
    zh: "支付协议、Apple VAS / ECP、NCI 控制器芯片、安全元件、FIDO / Passkeys、加密货币钱包与行业认证 — 以一套集成技术栈交付。",
  },
  "proto.g1": { en: "Payment & Wallet", zh: "支付与钱包" },
  "proto.g2": { en: "Contactless RF", zh: "非接射频" },
  "proto.g3": { en: "Smart Card & ID", zh: "智能卡与身份" },
  "proto.g4": { en: "NFC Forum", zh: "NFC 论坛" },
  "proto.g5": { en: "Security & FIDO", zh: "安全与 FIDO" },
  "proto.g6": { en: "Crypto & Wallet", zh: "加密货币与钱包" },
  "proto.g7": { en: "NFC Tags & Chips", zh: "NFC 标签与芯片" },
  "proto.g8": { en: "NCI Controllers & SE", zh: "NCI 控制器与安全芯片" },
  "proto.g9": { en: "Certifications", zh: "认证与合规" },

  // Stats
  "stat.years": { en: "Years of expertise", zh: "年技术沉淀" },
  "stat.protocols": { en: "Protocols supported", zh: "项协议支持" },
  "stat.projects": { en: "Projects delivered", zh: "个项目交付" },
  "stat.countries": { en: "Countries served", zh: "个国家与地区" },

  // Industries
  "ind.eyebrow": { en: "Industry Solutions", zh: "行业方案" },
  "ind.title": { en: "Vertical expertise\nfor your product roadmap.", zh: "垂直行业经验，\n支撑您的产品路线。" },
  "ind.banking.t": { en: "Banking & Payment", zh: "银行与支付" },
  "ind.banking.d": {
    en: "End-to-end payment engineering — from card applet to acquirer host. We deliver EMV-certified applets, PCI-compliant issuance, tokenization for mobile wallets and the ISO 8583 host systems that move money at scale.",
    zh: "端到端的支付工程能力 — 从卡片 Applet 到收单主机。提供 EMV 认证 Applet、PCI 合规发卡、移动钱包令牌化,以及承载大规模交易的 ISO 8583 后台系统。",
  },
  "ind.transit.t": { en: "Transit & Ticketing", zh: "公共交通" },
  "ind.transit.d": {
    en: "Complete AFC systems for metros, buses and open-loop tap-to-ride. From card and mobile tickets to gates, validators and the central clearing house that settles revenue across operators.",
    zh: "面向地铁、公交与开放环即刷即乘的完整 AFC 系统。从卡片与手机票,到闸机、验票机,再到跨运营商分账的中央清分中心。",
  },
  "ind.gov.t": { en: "Government & ID", zh: "政务与身份" },
  "ind.gov.d": {
    en: "Trusted credentials for national ID, ePassport and driver license. Issuance platforms, border-control inspection, eID middleware and GSMA-compliant eSIM — meeting ICAO 9303 and CC EAL5+ requirements.",
    zh: "面向身份证、电子护照与驾照的可信凭证方案。提供发行平台、边检核验、电子身份证中间件与符合 GSMA 规范的 eSIM — 满足 ICAO 9303 与 CC EAL5+ 要求。",
  },
  "ind.access.t": { en: "Access Control", zh: "门禁访问" },
  "ind.access.d": {
    en: "Modern physical access — DESFire EV3 / SEOS cards, OSDP readers and mobile credentials over NFC + BLE. Engineered for enterprise campuses, multi-site operations and FIDO2-grade logical access.",
    zh: "面向现代物理门禁的完整方案 — DESFire EV3 / SEOS 卡片、OSDP 读卡器与 NFC + BLE 手机凭证。专为多站点企业园区与 FIDO2 级逻辑访问而设计。",
  },
  "ind.health.t": { en: "Healthcare", zh: "医疗健康" },
  "ind.health.d": {
    en: "Hospital-grade NFC for patient ID, eHealth cards, pharmaceutical authentication and cold-chain compliance. HIPAA-ready, GDPR-aligned, with NTAG 424 SUN verification at item level.",
    zh: "面向医疗场景的 NFC 方案 — 患者身份、电子健康卡、药品防伪与冷链合规。符合 HIPAA 与 GDPR 要求,支持 NTAG 424 SUN 单品级验证。",
  },
  "ind.iot.t": { en: "IoT & Smart Devices", zh: "物联网" },
  "ind.iot.d": {
    en: "NFC as the secure side-channel for connected products. One-tap BLE / Wi-Fi pairing, factory provisioning, OTA key rotation and field-engineer tooling — built around NXP NTAG and Secure Element families.",
    zh: "把 NFC 作为联网产品的安全旁路。一触式 BLE / Wi-Fi 配对、产线批量配置、OTA 密钥轮换与现场工程师工具 — 基于 NXP NTAG 与安全元件系列构建。",
  },
  "ind.brand.t": { en: "Brand Protection", zh: "品牌防伪" },
  "ind.brand.d": {
    en: "Item-level authentication and consumer engagement. NTAG 424 DNA SUN dynamic URLs, tamper-evident tags, scan analytics and branded landing pages — turning every product into a trusted digital touchpoint.",
    zh: "单品级防伪与消费者互动。基于 NTAG 424 DNA SUN 动态 URL、防撕标签、扫码分析与品牌落地页 — 让每件产品都成为可信赖的数字触点。",
  },
  "ind.retail.t": { en: "Retail & Loyalty", zh: "零售与会员" },
  "ind.retail.d": {
    en: "Connect product to customer with NFC. Smart packaging, physical and wallet-based loyalty cards, RFID smart shelves and POS plug-ins — driving engagement, inventory accuracy and loss prevention.",
    zh: "用 NFC 把商品与消费者连接起来。智能包装、实体与钱包会员卡、RFID 智能货架与 POS 插件 — 驱动互动、提升库存精度、降低损耗。",
  },
  "ind.auto.t": { en: "Automotive", zh: "汽车" },
  "ind.auto.d": {
    en: "Digital key systems for OEMs and Tier 1s. CCC Digital Key 3.0 over NFC + UWB + BLE, in-cabin readers qualified to AEC-Q100, owner apps and aftermarket retrofit kits for non-OEM vehicles.",
    zh: "面向 OEM 与 Tier 1 的数字钥匙系统。基于 CCC 数字钥匙 3.0 (NFC + UWB + BLE)、符合 AEC-Q100 的车内读卡器、车主 App 与非 OEM 车辆后装改装套件。",
  },
  "ind.edu.t": { en: "Education & Campus", zh: "教育与校园" },
  "ind.edu.d": {
    en: "One card for student ID, library, canteen and attendance — physical DESFire plus mobile wallet credentials, with a central issuance and access platform ready for multi-campus deployments.",
    zh: "一张卡覆盖学生证、图书馆、食堂与考勤 — 实体 DESFire 加手机钱包凭证,配合可扩展到多校区的中央发卡与门禁平台。",
  },
  "ind.wallet.t": { en: "Mobile Wallet & Digital Credentials", zh: "手机钱包与数字凭证" },
  "ind.wallet.d": {
    en: "Ship any credential to a phone. HCE card emulation, Secure Element applets, EMV tokenization and push provisioning to Apple, Google and Samsung wallets — plus ISO 18013-5 mDL readiness.",
    zh: "把任何凭证发到手机上。HCE 卡模拟、安全元件 Applet、EMV 令牌化,以及推送开通到 Apple、Google 与 Samsung 钱包 — 同时支持 ISO 18013-5 mDL。",
  },
  "ind.security.t": { en: "Security & Crypto Wallet", zh: "安全与加密货币钱包" },
  "ind.security.d": {
    en: "Hardware-grade security for the modern web. FIDO2 / Passkey security keys, crypto-wallet smart cards signing secp256k1 / ed25519 transactions on-card, cold backup cards and seed-phrase recovery — built on Secure Elements certified to CC EAL6+.",
    zh: "面向现代互联网的硬件级安全。FIDO2 / Passkey 安全密钥、片上签名 secp256k1 / ed25519 交易的加密货币智能卡、冷备份卡与助记词恢复 — 基于 CC EAL6+ 认证的安全元件。",
  },

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
    en: "Reference designs, SDKs and devices — ready to integrate into your product, with engineering support from our team.",
    zh: "参考设计、SDK 与设备 — 可直接集成到您的产品中，并由我们的工程师提供技术支持。",
  },
  "ppage.empty": { en: "No products in this category yet.", zh: "该分类暂无产品。" },
  "ppage.sw": { en: "Software", zh: "软件方案" },
  "ppage.hw": { en: "Hardware", zh: "硬件设备" },

  // Software items
  "sw.1.t": { en: "ePassport Reader Software", zh: "电子护照阅读软件" },
  "sw.1.d": { en: "ICAO 9303 compliant — BAC/PACE/EAC, MRZ OCR, DG1–DG16 parsing & PA verification.", zh: "符合 ICAO 9303 — BAC/PACE/EAC、MRZ 识别、DG1–DG16 解析与 PA 验证。" },
  "sw.2.t": { en: "Bank Card (EMV) Reading SDK", zh: "银行卡 (EMV) 读卡 SDK" },
  "sw.2.d": { en: "Read PAN, expiry, track data and cardholder info from contactless EMV cards.", zh: "从非接 EMV 银行卡读取 PAN、有效期、磁道数据与持卡人信息。" },
  "sw.3.t": { en: "NTAG / DESFire / MIFARE Issuance", zh: "NTAG / DESFire / MIFARE 发卡" },
  "sw.3.d": { en: "Personalize NTAG 424 DNA, DESFire EV2/EV3, MIFARE Classic & Ultralight in bulk.", zh: "批量个人化 NTAG 424 DNA、DESFire EV2/EV3、MIFARE Classic 与 Ultralight。" },
  "sw.4.t": { en: "Issuance API", zh: "发卡 API" },
  "sw.4.d": { en: "POST a card UID → we return personalization data. No keys leave our HSM.", zh: "POST 卡片 UID → 返回个人化数据。密钥全程托管于 HSM。" },
  "sw.5.t": { en: "Verification API", zh: "验证 API" },
  "sw.5.d": { en: "Verify SUN URLs, CMAC, MAC counters — one REST call, JSON result.", zh: "校验 SUN URL、CMAC、计数器 — 一个 REST 接口，返回 JSON。" },
  "sw.6.t": { en: "Issuance Platform (SaaS)", zh: "发卡平台 (SaaS)" },
  "sw.6.d": { en: "Web console for tag projects, key profiles, batch jobs and audit logs.", zh: "Web 控制台管理标签项目、密钥配置、批量任务与审计日志。" },
  "sw.7.t": { en: "Mobile Wallet SDK", zh: "手机钱包 SDK" },
  "sw.7.d": { en: "HCE card emulation, Secure Element applets, tokenization, Apple Pay / Google Pay integration, digital car keys and mobile credentials.", zh: "HCE 卡模拟、安全元件小程序、令牌化、Apple Pay / Google Pay 集成、数字车钥匙与手机凭证。" },

  // Hardware items
  "hw.1.t": { en: "USB NFC Readers", zh: "USB NFC 读卡器" },
  "hw.1.d": { en: "Plug-and-play USB CCID / PC/SC readers — ISO 14443 A/B, 13.56 MHz.", zh: "即插即用 USB CCID / PC/SC 读卡器,支持 ISO 14443 A/B,13.56 MHz。" },
  "hw.2.t": { en: "Serial (UART) Readers", zh: "串口 (UART) 读卡器" },
  "hw.2.d": { en: "RS-232 / TTL serial NFC readers for industrial PCs, kiosks and embedded hosts.", zh: "RS-232 / TTL 串口 NFC 读卡器,适配工控机、自助设备与嵌入式主机。" },
  "hw.3.t": { en: "Embedded NFC Modules", zh: "嵌入式 NFC 模组" },
  "hw.3.d": { en: "PN532 / PN5180 modules over UART / SPI / I²C — integrate into your product.", zh: "PN532 / PN5180 模组,UART/SPI/I²C 接口,便于集成到您的产品。" },
  "hw.4.t": { en: "NFC Signal Detection Card", zh: "NFC 信号检测卡" },
  "hw.4.d": { en: "Pocket card with LED — visually verify reader RF field strength on-site.", zh: "口袋大小带 LED 检测卡,现场直观检测读卡器射频信号强度。" },
  "hw.5.t": { en: "Blank NFC Cards & Tags", zh: "空白 NFC 卡与标签" },
  "hw.5.d": { en: "NTAG 424 DNA, DESFire EV2/EV3, NTAG213/215/216 — ready for issuance.", zh: "NTAG 424 DNA、DESFire EV2/EV3、NTAG213/215/216,即开即发。" },
  "hw.6.t": { en: "Antennas & Custom Inlays", zh: "天线与定制封装" },
  "hw.6.d": { en: "13.56 MHz antennas and inlays tuned for metal, liquid and custom form factors.", zh: "13.56 MHz 天线与封装,针对金属、液体与异形需求调优。" },

  // API / How it works
  "api.eyebrow": { en: "Issuance & Verification API", zh: "发卡与验证 API" },
  "api.title": { en: "Issue or verify any credential\nin one API call.", zh: "一个 API 调用,\n发行或验证任意凭证。" },
  "api.sub": {
    en: "NTAG 424 DNA, DESFire EV2/EV3, MIFARE, EMV bank cards, national ID and ICAO ePassports — one platform, one REST endpoint. We handle the AES keys, CMAC, SUN URLs, PACE/BAC sessions and HSM. You just POST and read JSON.",
    zh: "NTAG 424 DNA、DESFire EV2/EV3、MIFARE、EMV 银行卡、身份证与 ICAO 电子护照 —— 一个平台、一个 REST 接口。AES 密钥、CMAC、SUN URL、PACE/BAC 会话与 HSM 全部由我们处理,您只需 POST 调用并读取 JSON。",
  },
  "api.issue": { en: "Issue any chip", zh: "发行任意芯片" },
  "api.verify": { en: "Verify any scan", zh: "验证任意扫描" },

  // Platform / Cloud page
  "cloud.eyebrow": { en: "Cloud Services", zh: "云服务" },
  "cloud.title": { en: "Issue & verify NFC credentials\nwithout crypto complexity.", zh: "发卡与验证 NFC 凭证\n无需处理复杂密码学。" },
  "cloud.sub": {
    en: "Cloud personalization and verification for NTAG424 DNA and MIFARE DESFire. Simple REST API — we handle keys, HSM and secure messaging.",
    zh: "面向 NTAG424 DNA 与 MIFARE DESFire 的云端个性化与验证。简洁 REST API — 密钥、HSM 与安全报文由我们处理。",
  },
  "cloud.steps.title": { en: "Three steps to go live", zh: "三步即可上线" },
  "cloud.security.title": { en: "Enterprise-grade security", zh: "企业级安全" },
  "cloud.cta.title": { en: "Ready to connect your product to the cloud?", zh: "准备好让产品对接云端了吗？" },
  "cloud.cta.sub": {
    en: "Sign up for sandbox access or talk to our engineers about production deployment.",
    zh: "注册获取沙箱访问权限，或与我们的工程师讨论量产部署。",
  },
  "cloud.getStarted": { en: "Get Started Free", zh: "免费开始" },
  "cloud.s1.title": { en: "Connect any hardware", zh: "连接任意硬件" },
  "cloud.s1.desc": {
    en: "Any NFC reader, terminal, phone or embedded device — if it speaks APDU, it connects to our API.",
    zh: "任意 NFC 读卡器、终端、手机或嵌入式设备 — 只要能收发 APDU，即可对接我们的 API。",
  },
  "cloud.s2.title": { en: "Call a simple API", zh: "调用简单 API" },
  "cloud.s2.desc": {
    en: "Issue and verify with REST endpoints — no key files, no APDU scripts, no crypto expertise required.",
    zh: "通过 REST 接口发卡与验证 — 无需密钥文件、APDU 脚本或密码学背景。",
  },
  "cloud.s3.title": { en: "We handle the crypto", zh: "加密由我们处理" },
  "cloud.s3.desc": {
    en: "Key derivation, authentication and secure messaging run in our HSM. Your product relays bytes.",
    zh: "密钥派生、认证与安全报文在 HSM 中完成，您的产品只负责传输数据。",
  },
  "cloud.t1.title": { en: "HSM-backed keys", zh: "HSM 托管密钥" },
  "cloud.t1.desc": {
    en: "Card keys never leave hardware security modules — not exposed in plaintext.",
    zh: "卡密钥存放于硬件安全模块，不以明文暴露。",
  },
  "cloud.t2.title": { en: "Encrypted in transit", zh: "传输全程加密" },
  "cloud.t2.desc": { en: "All device ↔ cloud traffic is encrypted end-to-end.", zh: "设备与云端之间的流量全程加密。" },
  "cloud.t3.title": { en: "Full audit trail", zh: "完整审计日志" },
  "cloud.t3.desc": {
    en: "Every issuance and verification logged with exportable audit records.",
    zh: "每次发卡与验证均有完整、可导出的审计记录。",
  },
  "plat.title": { en: "Developer Tools", zh: "开发者工具" },
  "plat.sub": {
    en: "Free browser tools to debug EMV, APDU, NDEF and MIFARE — or browse SDKs in the download center.",
    zh: "免费浏览器工具，调试 EMV、APDU、NDEF 与 MIFARE — 或在下载中心获取 SDK。",
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
  "dl.empty": {
    en: "No downloads published yet. Contact us for SDK access or check back soon.",
    zh: "暂无已发布的下载资源。如需 SDK 请联系我们的工程师，或稍后再来查看。",
  },
  "dl.unavailable": { en: "Coming soon", zh: "即将提供" },
  "dl.files": { en: "files", zh: "个文件" },
  "dl.groupEmpty": { en: "No files in this category yet.", zh: "该分类下暂无文件。" },
  "dl.contact": { en: "Request access", zh: "申请获取" },

  // Blog page
  "blog.title": { en: "Blog & Insights", zh: "博客与洞察" },
  "blog.sub": { en: "Engineering deep-dives, protocol explainers and case studies.", zh: "工程深度解析、协议讲解与客户案例。" },
  "blog.read": { en: "Read article →", zh: "阅读全文 →" },

  // About
  "about.eyebrow": { en: "About NFCTEC", zh: "关于 NFCTEC" },
  "about.title": { en: "15 years\nat the edge of NFC.", zh: "15 年深耕\n站在 NFC 前沿。" },
  "about.intro": {
    en: "Founded in 2010, NFCTEC partners with product teams worldwide — co-developing NFC software, designing hardware and building cloud backends, from early prototypes to certified mass production.",
    zh: "NFCTEC 成立于 2010 年，与全球产品团队深度合作 — 联合开发 NFC 软件、设计硬件、搭建云服务，从早期原型到认证量产。",
  },
  "about.mission.t": { en: "Mission", zh: "使命" },
  "about.mission.d": {
    en: "Help product teams ship secure, connected NFC experiences — faster, with less integration risk.",
    zh: "帮助产品团队更快、更低风险地交付安全、互联的 NFC 体验。",
  },
  "about.values.t": { en: "Values", zh: "价值观" },
  "about.values.d": { en: "Open standards · Engineering rigor · Long-term partnerships.", zh: "开放标准 · 工程严谨 · 长期合作。" },
  "about.stats.founded": { en: "Founded 2010 · Shenzhen", zh: "2010 年成立于深圳" },
  "about.stats.projects": { en: "500+ projects shipped", zh: "已交付 500+ 项目" },
  "about.stats.countries": { en: "60+ countries", zh: "覆盖 60+ 国家" },
  "about.stats.team": { en: "12+ engineers", zh: "12+ 工程师" },

  // Contact
  "contact.eyebrow": { en: "Contact", zh: "联系我们" },
  "contact.title": { en: "Tell us what\nyou're building.", zh: "告诉我们\n您要做什么产品。" },
  "contact.sub": {
    en: "Software, hardware or cloud — our engineers respond within one business day with a practical next step.",
    zh: "软件、硬件或云服务 — 我们的工程师将在 1 个工作日内回复，并给出可行的下一步建议。",
  },
  "form.projectType": { en: "Project type", zh: "项目类型" },
  "form.type.sw": { en: "Software development", zh: "软件开发" },
  "form.type.hw": { en: "Hardware / product design", zh: "硬件 / 产品设计" },
  "form.type.cloud": { en: "Cloud / API integration", zh: "云服务 / API 集成" },
  "form.type.full": { en: "Full-stack (SW + HW + Cloud)", zh: "全栈（软+硬+云）" },
  "form.error": {
    en: "Failed to send. Please email us directly.",
    zh: "发送失败，请直接发送邮件联系我们。",
  },
  "product.features.title": { en: "Key features", zh: "核心特性" },
  "product.back": { en: "Back to Products", zh: "返回产品列表" },
  "form.name": { en: "Name", zh: "姓名" },
  "form.company": { en: "Company", zh: "公司" },
  "form.email": { en: "Email", zh: "邮箱" },
  "form.whatsapp": { en: "WhatsApp", zh: "WhatsApp" },
  "form.country": { en: "Country / Region", zh: "国家 / 地区" },
  "form.subject": { en: "Subject", zh: "主题" },
  "form.desc": { en: "Project description", zh: "项目描述" },
  "form.submit": { en: "Submit inquiry", zh: "提交需求" },
  "form.success": { en: "Thank you — your inquiry has been submitted. We'll respond within one business day.", zh: "感谢提交！我们已收到您的需求，将在 1 个工作日内回复。" },
  "form.mailto.hint": { en: "If nothing opened, email us directly at", zh: "如未自动打开，请直接发送邮件至" },
  "contact.support": { en: "Support / Inquiries", zh: "客服 / 询盘" },
  "contact.sales": { en: "Sales", zh: "销售" },
  "contact.addr": { en: "Headquarters", zh: "总部地址" },
};

interface I18nCtx {
  lang: Lang;
  setLang: (l: Lang) => void;
  tr: (key: keyof typeof t) => string;
}

const Ctx = createContext<I18nCtx | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const navigate = useNavigate();
  const { locale: urlLocale } = stripLocalePrefix(pathname);
  const [lang, setLangState] = useState<Lang>(urlLocale ?? "en");

  useEffect(() => {
    if (urlLocale) {
      setLangState(urlLocale);
      if (typeof window !== "undefined") localStorage.setItem("lang", urlLocale);
    }
  }, [urlLocale]);

  const setLang = (l: Lang) => {
    if (urlLocale) {
      navigate({ to: swapLocalePath(pathname, l) });
      return;
    }
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
