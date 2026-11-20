import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { useNavigate, useRouterState } from "@tanstack/react-router";
import { stripLocalePrefix, swapLocalePath } from "./locale";

export type Lang = "en" | "zh";

type Dict = Record<string, { en: string; zh: string }>;

export const t: Dict = {
  // Nav
  "nav.products": { en: "Products", zh: "产品" },
  "nav.products.sw": { en: "Software", zh: "软件方案" },
  "nav.products.hw": { en: "Tags & cards", zh: "标签与卡" },
  "nav.solutions": { en: "Solutions", zh: "行业方案" },
  "nav.platform": { en: "Cloud Services", zh: "云服务" },
  "nav.downloads": { en: "Downloads", zh: "下载中心" },
  "nav.blog": { en: "Blog", zh: "博客" },
  "nav.about": { en: "About", zh: "关于" },
  "nav.privacy": { en: "Privacy", zh: "隐私" },
  "nav.terms": { en: "Terms", zh: "条款" },
  "nav.contact": { en: "Request a Quote", zh: "获取项目报价" },
  "nav.home": { en: "Home", zh: "首页" },
  "nav.getQuote": { en: "Request a Quote", zh: "获取项目报价" },

  "home.protocols": { en: "NFC & smart-card expertise", zh: "NFC 与智能卡技术经验" },
  "home.stats.eyebrow": { en: "Trusted worldwide", zh: "全球客户信赖" },
  "home.featured.products": { en: "Featured products", zh: "精选产品" },
  "home.featured.products.sub": {
    en: "Explore NFC labels, smart cards and custom formats designed around your application, branding and production needs.",
    zh: "探索 NFC 标签、智能卡及多种定制形态，按您的应用、品牌设计和生产要求提供制造方案。",
  },
  "home.partners.title": {
    en: "Technology and Standards",
    zh: "技术与行业标准",
  },
  "home.featured.solutions": { en: "Solutions for Real-World Applications", zh: "面向实际应用的定制方案" },
  "home.featured.solutions.sub": {
    en: "Explore how NFC products and secure authentication can support product protection, access, identification and connected experiences.",
    zh: "了解 NFC 产品与安全认证如何应用于产品防伪、门禁、身份识别及数字化交互。",
  },
  "home.why.eyebrow": { en: "Why NFCTEC", zh: "为什么选择我们" },
  "home.why.title": {
    en: "Custom NFC Manufacturing with Technical Support",
    zh: "NFC 定制制造与技术支持",
  },
  "home.why.1.title": { en: "Full-stack ownership", zh: "全栈自主" },
  "home.why.1.desc": {
    en: "Inlays to wristbands: chip pick, SUN/SDM encoding, antenna tuning, reader firmware and SDKs from one engineering team—not a trader reselling blanks.",
    zh: "从 Inlay 到手环：选型、SUN/SDM 编码、天线匹配、读卡固件与 SDK 同一支工程团队完成，不是倒手空白标签。",
  },
  "home.why.2.title": { en: "Security & compliance", zh: "安全与合规" },
  "home.why.2.desc": {
    en: "FIDO2, hardware wallets, secure elements and EMV / PCI certifications — security built in from chip to cloud.",
    zh: "FIDO2、硬件钱包、安全元件及 EMV / PCI 认证 — 从芯片到云端内置安全能力。",
  },
  "home.why.3.title": { en: "Technical Support from the Start", zh: "从项目初期提供技术支持" },
  "home.why.3.desc": {
    en: "Talk directly to the team that builds the readers and writes the SDK — no sales hand-offs.",
    zh: "直接与开发读卡器、编写 SDK 的工程师沟通 — 无需层层转接。",
  },
  "home.process.eyebrow": { en: "How we work", zh: "合作流程" },
  "home.process.title": { en: "From first call to production.", zh: "从首次沟通到量产交付。" },
  "home.process.1.title": { en: "Discovery", zh: "需求梳理" },
  "home.process.1.desc": {
    en: "Chip (NTAG424, DESFire, JCOP), laminate, encode recipe and compliance — nailed in a technical workshop.",
    zh: "芯片（NTAG424、DESFire、JCOP）、层压、编码配方与合规 — 技术 workshop 一次定清。",
  },
  "home.process.2.title": { en: "Prototype", zh: "原型验证" },
  "home.process.2.desc": {
    en: "Wet inlay or PVC samples, SUN/NDEF encode pull, antenna check on your metal mount — usually within weeks.",
    zh: "湿 Inlay 或 PVC 样品、SUN/NDEF 编码样张、在你们金属件上测天线 — 通常数周内完成。",
  },
  "home.process.3.title": { en: "Production", zh: "量产交付" },
  "home.process.3.desc": {
    en: "Laminate, personalise, QC and ship from Shenzhen — blank, encoded, or with JavaCard/DESFire keys loaded.",
    zh: "层压、个人化、质检，深圳出厂 — 空白、已编码或已灌 JavaCard/DESFire 密钥。",
  },
  "home.viewAll.products": { en: "View all products", zh: "查看全部产品" },
  "home.viewAll.solutions": { en: "View all industries", zh: "查看全部行业" },
  "home.viewAll.blog": { en: "Read more insights", zh: "阅读更多文章" },
  "home.insights": { en: "Latest insights", zh: "最新洞察" },
  "home.insights.sub": {
    en: "Practical guides to NFC products, secure encoding and smart-card integration.",
    zh: "分享 NFC 产品选型、安全编码及智能卡集成的实用技术指南。",
  },
  "ind.sub": {
    en: "Explore NFC and smart-card solutions for brand protection, access control, identification and connected products.",
    zh: "探索 NFC 与智能卡在品牌防伪、门禁、身份识别及智能产品中的应用。",
  },
  "ind.capabilities": { en: "Key capabilities", zh: "核心能力" },
  "ind.learnMore": { en: "Learn more", zh: "了解更多" },
  "about.certs": { en: "Certifications & partnerships", zh: "认证与合作伙伴" },

  // Brand
  "brand.tagline": {
    en: "Custom NFC Manufacturing & Secure Personalization",
    zh: "NFC 定制制造与安全个人化",
  },

  // Hero
  "hero.eyebrow": {
    en: "NFC & smart card manufacturing · OEM / ODM · Secure encoding",
    zh: "NFC 与智能卡制造 · OEM / ODM · 安全编码",
  },
  "hero.title": {
    en: "Custom NFC cards, tags\n& secure elements.",
    zh: "定制 NFC 卡、标签\n与安全元件。",
  },
  "hero.sub": {
    en: "From PVC smart cards and custom NFC labels to wristbands and secure elements, NFCTEC supports OEM/ODM projects with chip selection, antenna engineering, secure encoding, quality control and production-ready delivery.",
    zh: "从 PVC 智能卡、定制 NFC 标签到手环与安全元件，NFCTEC 为 OEM/ODM 项目提供芯片选型、天线工程、安全编码、质量检验与量产交付。",
  },
  "hero.cta1": { en: "Explore Products", zh: "查看产品" },
  "hero.cta2": { en: "Request Samples", zh: "申请样品" },
  "hero.ill.label": { en: "Card factory · Encoding · Verify", zh: "卡厂 · 编码 · 验真" },
  "hero.ill.hw": { en: "PVC & inlays", zh: "PVC 与 Inlay" },
  "hero.ill.sw": { en: "SUN / SDM", zh: "SUN / SDM" },
  "hero.ill.cloud": { en: "Tap verify", zh: "贴卡验真" },

  // Business pillars
  "pillar.eyebrow": {
    en: "PRODUCTS & CAPABILITIES",
    zh: "产品与服务能力",
  },
  "pillar.title": {
    en: "Manufacturing, Personalization & Integration",
    zh: "从定制制造到安全个人化与系统集成",
  },
  "pillar.sw.title": { en: "Encoding & tools", zh: "编码与工具" },
  "pillar.sw.desc": {
    en: "Secure NFC personalization, encoding tools and integration support tailored to your production workflow.",
    zh: "提供 NFC 安全个人化、编码工具及系统集成支持，适配您的生产流程。",
  },
  "pillar.hw.title": { en: "Tags, cards & wristbands", zh: "标签、卡与手环" },
  "pillar.hw.desc": {
    en: "Custom NFC labels, PVC smart cards and wearable formats with options for materials, printing, chips and encoding.",
    zh: "定制 NFC 标签、PVC 智能卡和可穿戴产品，支持材料、印刷、芯片与编码方案选择。",
  },
  "pillar.sol.title": { en: "Cloud Services", zh: "云服务" },
  "pillar.sol.desc": {
    en: "Manage NTAG424 DNA personalization and authentication workflows with server-side key handling and verification services.",
    zh: "通过云端服务管理 NTAG424 DNA 个人化与验真流程，支持服务端密钥处理和认证集成。",
  },
  "pillar.dev.title": { en: "Application Engineering", zh: "应用方案开发" },
  "pillar.dev.desc": {
    en: "Technical support for application-specific NFC and smart-card projects, from feasibility review to integration.",
    zh: "面向不同应用的 NFC 与智能卡项目，提供可行性评估、技术选型和系统集成支持。",
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
  "ind.title": { en: "Industry programmes", zh: "行业项目" },
  "ind.banking.t": { en: "Banking & Payment", zh: "银行与支付" },
  "ind.banking.d": {
    en: "AID table, GP load, PCI bureau, 8583 and wallets (MDES/VTS). We do the card and the host map — not the POS kernel.",
    zh: "AID 表、GP 加载、PCI 制卡、8583，进钱包再加 MDES/VTS。做卡和主机字段，POS 内核不在我们这边。",
  },
  "ind.transit.t": { en: "Transit & Ticketing", zh: "公共交通" },
  "ind.transit.d": {
    en: "Encode against the SAM already in the depots. Time the real validator. Dual-media needs a stop date or Classic never leaves.",
    zh: "按车队现有 SAM 编码。在真验票机上测时。双票种要有截止日期，不然 Classic 退不掉。",
  },
  "ind.gov.t": { en: "Government & ID", zh: "政务与身份" },
  "ind.gov.d": {
    en: "ePassport and eID on the chip, inspection on MRTD readers. CSCA master list is operations, not a slide. mDL only if the RFP says 18013.",
    zh: "证本和 eID 在芯片上，边检走 MRTD。CSCA 主列表是运维，不是一张片子。RFP 写了 18013 才做 mDL。",
  },
  "ind.access.t": { en: "Access Control", zh: "门禁访问" },
  "ind.access.d": {
    en: "DESFire or Seos on the card, OSDP at the door. UID-out Wiegand never authenticated anything. Phone badges need VAS/Smart Tap firmware.",
    zh: "卡上 DESFire 或 Seos，门上 OSDP。只出 UID 的 Wiegand 什么都没认证过。手机工牌要读头会 VAS/Smart Tap。",
  },
  "ind.health.t": { en: "Healthcare", zh: "医疗健康" },
  "ind.health.d": {
    en: "Patient and clinician badges that talk to the EHR you already run. Notes stay in the EHR — not on the chip.",
    zh: "患者卡、医护工牌对上现有病历系统。病程在 EHR 里，不在芯片上。",
  },
  "ind.iot.t": { en: "IoT & Smart Devices", zh: "物联网" },
  "ind.iot.d": {
    en: "Inject identity on the line. Tap to onboard Wi-Fi or Matter. Carton QR is easy to photograph — use SUN if that matters.",
    zh: "产线注入身份。轻触配 Wi-Fi 或 Matter。外箱二维码太好拍，在意克隆就上 SUN。",
  },
  "ind.brand.t": { en: "Brand Protection", zh: "品牌防伪" },
  "ind.brand.d": {
    en: "NTAG 424 DNA SUN: the phone opens a URL, the server checks CMAC and the counter. Same link replayed should fail. No app required.",
    zh: "NTAG 424 DNA SUN：手机打开链接，服务器验 CMAC 和计数器。同一链接再来一次该失败。不用单独做 App。",
  },
  "ind.retail.t": { en: "Retail & Loyalty", zh: "零售与会员" },
  "ind.retail.d": {
    en: "Membership or gift on DESFire — say if the balance lives on the host or the card. Loyalty in Wallet needs VAS/Smart Tap on the POS, not a barcode gun.",
    zh: "DESFire 做会员或礼品，先说余额在主机还是在卡。Wallet 会员要 POS 会 VAS/Smart Tap，条码枪不够。",
  },
  "ind.auto.t": { en: "Automotive", zh: "汽车" },
  "ind.auto.d": {
    en: "CCC Digital Key: UWB when you walk up, NFC when the phone is dead, keys injected per VIN. Wallet sharing only if that programme is actually signed.",
    zh: "CCC 数字钥匙：走近用 UWB，手机没电用 NFC，密钥按 VIN 注入。Wallet 分享签约了才写。",
  },
  "ind.edu.t": { en: "Education & Campus", zh: "教育与校园" },
  "ind.edu.d": {
    en: "One campus card, several DESFire apps: library, meal, door, print. Wallet student ID is extra. SIS is usually a nightly file.",
    zh: "一张校园卡、几个 DESFire 应用：图书、餐、门、打印。Wallet 学生证是加项。SIS 多半是夜间文件。",
  },
  "ind.wallet.t": { en: "Apple Wallet & Google Wallet", zh: "Apple Wallet 与 Google Wallet" },
  "ind.wallet.d": {
    en: "Passes into Apple Wallet and Google Wallet — update, void, check at a gate with a barcode or VAS / Smart Tap. Two issuer programmes, not one JSON twice.",
    zh: "卡券进 Apple Wallet 和 Google Wallet：改字段、作废，闸机扫码或 VAS / Smart Tap。两套发行，不是一份 JSON 拷两遍。",
  },
  "ind.security.t": { en: "Security & Crypto Wallet", zh: "安全与加密货币钱包" },
  "ind.security.d": {
    en: "FIDO2 keys, and separately a coin-signing applet on the same SE if you want it. The seed does not leave the chip.",
    zh: "FIDO2 密钥；若要币，再在同一颗 SE 上做独立签名应用。种子不离卡。",
  },

  // Dev tools
  "tools.eyebrow": { en: "Developer Tools", zh: "开发者工具" },
  "tools.title": { en: "Tools we actually ship and support.", zh: "我们实际交付和支持的工具。" },
  "tools.ntag.t": { en: "NTAG424 DNA Tool", zh: "NTAG424 DNA 工具" },
  "tools.ntag.d": { en: "Configure NTAG 424 DNA, test SUN dynamic URLs and validate anti-counterfeit NFC labels.", zh: "配置 NTAG 424 DNA、测试 SUN 动态 URL，并验证防伪 NFC 标签。" },
  "tools.javacard.t": { en: "JavaCard Tool", zh: "JavaCard 工具" },
  "tools.javacard.d": { en: "Read CPLC, open SCP02/SCP03 secure channels, load CAP files and debug APDU traces.", zh: "读取 CPLC、打开 SCP02/SCP03 安全通道、加载 CAP 文件并调试 APDU trace。" },
  "tools.open": { en: "Open tool →", zh: "打开工具 →" },

  // CTA
  "cta.title": {
    en: "Have a Custom NFC Project in Mind?",
    zh: "有 NFC 产品定制需求？",
  },
  "cta.sub": {
    en: "Tell us what you're looking to build. From custom NFC tags and smart cards to secure personalization, we'll help you find the right solution for your application.",
    zh: "告诉我们您的产品用途和定制要求。从 NFC 标签、智能卡到安全个人化，我们将协助您评估合适的制造与技术方案。",
  },
  "cta.btn": { en: "Request a Quote", zh: "获取定制报价" },
  "cta.btn2": { en: "Browse Downloads", zh: "浏览下载" },

  // Footer
  "foot.product": { en: "Products", zh: "产品" },
  "foot.solution": { en: "Solutions", zh: "方案" },
  "foot.resource": { en: "Resources", zh: "资源" },
  "foot.company": { en: "Company", zh: "公司" },
  "foot.rights": { en: "© 2026 NFCTEC. All rights reserved.", zh: "© 2026 NFCTEC. 保留所有权利." },
  "foot.addr": {
    en: "Room 4-412, Minke Technology Park, Longgang District, Shenzhen, China",
    zh: "中国深圳市龙岗区民科科技园 4-412",
  },

  // Products page
  "ppage.title": { en: "NFC card factory: tags, cards, wristbands", zh: "NFC 卡厂：标签、卡、手环" },
  "ppage.sub": {
    en: "We laminate NTAG, Ultralight EV1/C, DESFire EV2/EV3 (2K–8K), NTAG 424 DNA and JCOP into the body you need — white PVC, print, die-cut tags, silicone wristbands. Send artwork and an IC.",
    zh: "把 NTAG、Ultralight EV1/C、DESFire EV2/EV3（2K–8K）、NTAG 424 DNA、JCOP 做到你要的卡体上：白卡、彩印、异形标签、硅胶手环。给印刷文件和芯片型号即可询价。",
  },
  "ppage.empty": { en: "No products in this category yet.", zh: "该分类暂无产品。" },
  "ppage.sw": { en: "Software", zh: "软件方案" },
  "ppage.hw": { en: "ICs we embed", zh: "可入卡芯片" },
  "ppage.hw.sub": {
    en: "Chip first, then the plant: CR80, custom knife, wristband. DESFire EV2/EV3 2K–8K, Ultralight EV1/C, NTAG, 424 DNA, J3R180 / J3R452 / J2A040.",
    zh: "先定芯片再开模：CR80、异形刀模、手环。DESFire EV2/EV3 2K–8K、Ultralight EV1/C、NTAG、424 DNA、J3R180 / J3R452 / J2A040。",
  },
  "ppage.sw.sub": {
    en: "Issuance and reader software. Hardware SKUs are listed above.",
    zh: "发卡与读卡软件。硬件 SKU 见上方。",
  },

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
  "api.title": { en: "Issue and verify NTAG424 DNA\nin one API call.", zh: "一个 API 调用,\n发行并验证 NTAG424 DNA。" },
  "api.sub": {
    en: "The live cloud API issues and verifies NTAG424 DNA. AES keys and the secure session stay on the server. DESFire, EMV, and ePassport work are separate products.",
    zh: "现有云接口负责 NTAG424 DNA 的发行和验真。AES 密钥和安全会话留在服务器。DESFire、EMV 和电子护照是另外的产品。",
  },
  "api.issue": { en: "Issue any chip", zh: "发行任意芯片" },
  "api.verify": { en: "Verify any scan", zh: "验证任意扫描" },

  // Platform / Cloud page
  "cloud.eyebrow": { en: "Cloud Services", zh: "云服务" },
  "cloud.title": { en: "Issue & verify NFC credentials\nwithout crypto complexity.", zh: "发卡与验证 NFC 凭证\n无需处理复杂密码学。" },
  "cloud.sub": {
    en: "NTAG424 DNA cloud encoding, personalization, read/write, authentication, and product digital identity for anti-counterfeiting.",
    zh: "NTAG424 DNA 云端编码、个人化、读写、认证与产品数字身份，支撑 NFC 防伪。",
  },
  "ntag.issue.eyebrow": {
    en: "NTAG424 DNA encoding · personalization · authentication",
    zh: "NTAG424 DNA 编码 · 个人化 · 认证",
  },
  "ntag.issue.title": { en: "Authentic tags.\nVerified with a tap.", zh: "真标签。\n轻触即可验证。" },
  "ntag.issue.sub": {
    en: "Encode and personalize NTAG424 DNA in the factory with secure read/write. Build product digital identity and authenticate taps for brand anti-counterfeiting.",
    zh: "工厂安全读写完成 NTAG424 编码与个人化，建立产品数字身份，贴卡认证支撑品牌防伪。",
  },
  "ntag.issue.s1.title": { en: "Controlled issuance", zh: "受控发行" },
  "ntag.issue.s1.desc": {
    en: "Personalize from a template, cap the quota, keep the UID.",
    zh: "按模板个性化，控制配额，保留 UID。",
  },
  "ntag.issue.s2.title": { en: "Cryptographic verification", zh: "密码学校验" },
  "ntag.issue.s2.desc": {
    en: "Each tap carries UID, counter, and CMAC. Sites and apps can verify it.",
    zh: "每次轻触携带 UID、计数器与 CMAC。网站和应用都可以校验。",
  },
  "ntag.issue.s3.title": { en: "Keys stay in the vault", zh: "密钥留在保险库" },
  "ntag.issue.s3.desc": {
    en: "Crypto stays in the cloud. The writer only forwards APDUs.",
    zh: "密码学留在云端。写卡器只转发 APDU。",
  },
  "ntag.issue.cta": { en: "Open the platform", zh: "进入平台" },
  "ntag.issue.tagline": { en: "Tap. Connect. Secure.", zh: "Tap. Connect. Secure." },
  "cloud.steps.title": { en: "Three steps to go live", zh: "三步即可上线" },
  "cloud.security.title": { en: "Enterprise-grade security", zh: "企业级安全" },
  "cloud.cta.title": { en: "Ready to connect your product to the cloud?", zh: "准备好让产品对接云端了吗？" },
  "cloud.cta.sub": {
    en: "Sign up for sandbox access or talk to our engineers about production deployment.",
    zh: "注册获取沙箱访问权限，或与我们的工程师讨论量产部署。",
  },

  // FAQ — shared
  "faq.eyebrow": { en: "FAQ", zh: "常见问题" },
  "faq.title": { en: "Frequently asked questions", zh: "常见问题解答" },

  // Platform FAQ
  "faq.p1.q": { en: "Do I need cryptography knowledge to issue NTAG424 DNA tags?", zh: "发行 NTAG424 DNA 标签需要懂密码学吗？" },
  "faq.p1.a": {
    en: "No. The cloud runs the AES session and CMAC checks for NTAG424 DNA. The factory client forwards the card messages. DESFire personalization is not this cloud product.",
    zh: "不需要。云端处理 NTAG424 DNA 的 AES 会话和 CMAC 校验。工厂客户端转发卡片报文。DESFire 个人化不是这套云产品。",
  },
  "faq.p2.q": { en: "Which readers and hardware are supported?", zh: "支持哪些读卡器和硬件？" },
  "faq.p2.a": {
    en: "PC/SC readers on Windows, macOS, and Linux, and NFC Android phones, tablets, and POS devices. iOS provisioning is not part of the current client list.",
    zh: "Windows、macOS、Linux 上的 PC/SC 读卡器，以及带 NFC 的 Android 手机、平板和 POS。当前客户端清单不包含 iOS 写卡。",
  },
  "faq.p3.q": { en: "How are the master keys protected?", zh: "主密钥如何保护？" },
  "faq.p3.a": {
    en: "AES keys and the secure session stay on the server. They are not copied onto the factory computer.",
    zh: "AES 密钥和安全会话留在服务器，不会拷到工厂电脑上。",
  },
  "faq.p4.q": { en: "Can I test before signing anything?", zh: "可以先测试再签约吗?" },
  "faq.p4.a": {
    en: "Yes. Sandbox access is free and includes a full personalisation and verification pipeline. Talk to us when you're ready to move to production.",
    zh: "可以。沙箱访问免费,包含完整的发行与验证流程。准备量产时再联系我们即可。",
  },
  "faq.p5.q": { en: "Do you offer on-premise deployment?", zh: "是否提供本地部署?" },
  "faq.p5.a": {
    en: "Yes. Use the inquiry form on this site and describe your requirements.",
    zh: "可以。请使用本站询价表单说明需求。",
  },

  // Contact FAQ — product support for items already purchased
  "faq.c1.q": { en: "How fast will I get a reply?", zh: "多久能收到回复？" },
  "faq.c1.a": {
    en: "Support mail from this form is answered within one business day, Monday to Sunday, China time (UTC+8).",
    zh: "从这个表单发出的支持邮件，我们在一个工作日内回复，周一至周日，北京时间（UTC+8）。",
  },
  "faq.c2.q": { en: "The product does not work. What should I send?", zh: "产品用不了，要写什么？" },
  "faq.c2.a": {
    en: "The name printed on the package, and what happens when you use it. If the box included an instruction sheet, say which step failed.",
    zh: "包装上印的名称，以及使用时发生了什么。盒子里如果有说明书，写明卡在哪一步。",
  },
  "faq.c3.q": { en: "Where do I ask about an Amazon order?", zh: "亚马逊订单问题在哪里问？" },
  "faq.c3.a": {
    en: "Refunds, returns, and delivery stay in Your Orders on Amazon. This page is only for how the product works.",
    zh: "退款、退货和物流在亚马逊的“我的订单”里处理。这个页面只回答产品怎么用。",
  },
  "faq.c4.q": { en: "What should I include?", zh: "留言里写什么？" },
  "faq.c4.a": {
    en: "The product, the phone or computer and its system version, and what happens when you use it. An Amazon order ID is optional and helps us match the item.",
    zh: "哪一件产品、手机或电脑及系统版本，以及使用时发生了什么。亚马逊订单号可以不填，填了便于对上具体那一件。",
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
    en: "Key handling and the secure session run on the server. The reader forwards APDUs. This cloud path is not an HSM.",
    zh: "密钥和安全会话在服务器上处理。读卡器转发 APDU。这条云路径不是 HSM。",
  },
  "cloud.t1.title": { en: "Keys stay on the server", zh: "密钥留在服务器" },
  "cloud.t1.desc": {
    en: "AES keys stay on the server and are not handed to the operator. This is not a claim that the keys sit in an HSM.",
    zh: "AES 密钥留在服务器，不交给操作员。这不是在说密钥已经放进 HSM。",
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
    en: "No files in this category yet. Refresh the page—published tools from the CMS should appear here.",
    zh: "该分类下暂无文件。请刷新页面；后台已发布的工具会显示在本页。",
  },
  "dl.emptyPage": {
    en: "The download list could not be loaded. Refresh once, or contact us if it stays empty.",
    zh: "未能加载下载列表。请先刷新；若仍为空请联系我们。",
  },
  "dl.unavailable": { en: "Coming soon", zh: "即将提供" },
  "dl.files": { en: "files", zh: "个文件" },
  "dl.groupEmpty": { en: "No files in this category yet.", zh: "该分类下暂无文件。" },
  "dl.contact": { en: "Contact us", zh: "联系我们" },
  "dl.macosNotice.title": { en: "Before you open a macOS app", zh: "macOS 应用打开前请先看" },
  "dl.macosNotice.body": {
    en: "Downloads from the web are quarantined by Gatekeeper. If the app will not open or says it is damaged, clear the quarantine flag on the .app bundle after you unzip.",
    zh: "浏览器下载的文件会被 macOS 隔离。若解压后无法打开或提示已损坏，需要先对 .app 清除隔离属性。",
  },
  "dl.macosNotice.step1": { en: "Download the ZIP and unzip it (for example into Downloads).", zh: "下载 ZIP 并解压（例如在「下载」文件夹）。" },
  "dl.macosNotice.step2": {
    en: "Open Terminal and run the command below with the path to your .app (adjust the name and folder).",
    zh: "打开「终端」，执行下面命令，把路径改成你解压出来的 .app 实际位置。",
  },
  "dl.macosNotice.step3": { en: "Open the app again from Finder.", zh: "再在访达中双击打开应用。" },
  "dl.macosNotice.cmdExample": { en: "xattr -cr ~/Downloads/YourApp.app", zh: "xattr -cr ~/Downloads/YourApp.app" },
  "dl.macosNotice.alt": {
    en: "Example: NFCTEC-NTAG424-Tool.app or NFCTEC-JavaCard-Tool.app in your Downloads folder. On first launch you can also use System Settings → Privacy & Security → Open Anyway.",
    zh: "例如：Downloads 里的 NFCTEC-NTAG424-Tool.app 或 NFCTEC-JavaCard-Tool.app。首次打开也可在 系统设置 → 隐私与安全性 中使用「仍要打开」。",
  },
  "dl.macosNotice.short": {
    en: "After unzip, run xattr -cr on the .app — see steps above.",
    zh: "解压后对 .app 执行 xattr -cr，见上方说明。",
  },

  // Blog page
  "blog.title": { en: "Blog & Insights", zh: "博客与洞察" },
  "blog.sub": {
    en: "Engineering notes on EMV, APDU, JavaCard, NTAG 424 DNA, FIDO2, hardware wallets and NFC readers.",
    zh: "EMV、APDU、JavaCard、NTAG 424 DNA、FIDO2、硬件钱包与 NFC 读卡器的工程笔记。",
  },
  "blog.read": { en: "Read article →", zh: "阅读全文 →" },
  "blog.back": { en: "All articles", zh: "全部文章" },

  // About
  "about.eyebrow": { en: "About NFCTEC", zh: "关于 NFCTEC" },
  "about.title": { en: "15 years\nat the edge of NFC.", zh: "15 年深耕\n站在 NFC 前沿。" },
  "about.intro": {
    en: "Founded in 2010 in Shenzhen, NFCTEC runs an ISO 14443 card factory: laminate PVC and inlays, factory-encode NTAG 424 DNA SUN/SDM and DESFire/JavaCard media, tune antennas, and ship line-ready tags, cards and wristbands. Software and NTAG424 tap-verify sit beside production — not instead of it.",
    zh: "2010 年成立于深圳。NFCTEC 是 ISO 14443 卡厂：层压 PVC 与 Inlay、产线编码 NTAG 424 DNA SUN/SDM 与 DESFire/JavaCard 介质、天线调试，出厂即可上线的标签、卡与手环。软件与 NTAG424 贴卡验真是产线配套，不是倒手空白卡。",
  },
  "about.mission.t": { en: "Mission", zh: "使命" },
  "about.mission.d": {
    en: "Ship secure NFC cards and tags with the right chip, keys and encode recipe — at factory volume and auditability.",
    zh: "以正确的芯片、密钥与编码配方，批量出厂可审计的安全 NFC 卡与标签。",
  },
  "about.values.t": { en: "Values", zh: "价值观" },
  "about.values.d": { en: "Open standards · Engineering rigor · Long-term partnerships.", zh: "开放标准 · 工程严谨 · 长期合作。" },
  "about.stats.founded": { en: "Founded 2010 · Shenzhen", zh: "2010 年成立于深圳" },
  "about.stats.projects": { en: "500+ projects shipped", zh: "已交付 500+ 项目" },
  "about.stats.countries": { en: "60+ countries", zh: "覆盖 60+ 国家" },
  "about.stats.team": { en: "12+ engineers", zh: "12+ 工程师" },
  "about.profile": { en: "Company profile (PDF)", zh: "企业介绍（PDF）" },
  "dl.profile.title": { en: "Company profile", zh: "企业介绍" },
  "dl.profile.desc": {
    en: "English landscape deck covering NFC, smart cards, security, identity and crypto wallets.",
    zh: "英文横版介绍：NFC、智能卡、安全、身份与加密货币钱包。",
  },
  "dl.platformPdf.title": {
    en: "NTAG424 DNA Issuance & Verification Platform",
    zh: "NTAG424 DNA 发行与验真平台",
  },
  "dl.platformPdf.desc": {
    en: "3-page product overview: secure provisioning, web console, operator workbench, and traceable issuance.",
    zh: "英文 3 页产品概览：安全发行、Web 控制台、操作员工作台与可追溯写卡。",
  },
  "legal.privacy.title": { en: "Privacy", zh: "隐私" },
  "legal.privacy.sub": {
    en: "How this website handles inquiries and technical logs.",
    zh: "本网站如何处理询盘与技术日志。",
  },
  "legal.privacy.body": {
    en: "Inquiry forms send name, company, email and the project description to NFCTEC so an engineer can reply. Server logs may keep IP, user-agent and the requested path for operations. This page does not describe a separate analytics product and it does not sell personal data.",
    zh: "询盘表单会把姓名、公司、邮箱和项目说明发给 NFCTEC，方便工程师回复。服务器日志可能保留 IP、User-Agent 和请求路径，用于运维。本页不描述单独的分析产品，也不出售个人数据。",
  },
  "legal.terms.title": { en: "Terms", zh: "条款" },
  "legal.terms.sub": {
    en: "Public website terms for product pages, tools and downloads.",
    zh: "产品页、工具与下载的网站使用说明。",
  },
  "legal.terms.body": {
    en: "Pages, tools and files on this site are for evaluation. A project starts only after a separate written agreement. Datasheets, SDKs and sample code stay under their own licenses. Nothing on the public site is a certification, a warranty or a completed delivery.",
    zh: "本站页面、工具和文件用于评估。项目只在另行书面约定后开始。规格书、SDK 和示例代码遵循各自许可。公开网站上的内容不是认证、保证或已完成的交付。",
  },

  // Contact — support entrance printed on products
  "contact.eyebrow": { en: "SZLEJUN Product Support, by NFCTEC", zh: "SZLEJUN 产品支持，由 NFCTEC 提供" },
  "contact.title": { en: "Help with a product\nyou already have.", zh: "已经买到的产品，\n在这里问。" },
  "contact.sub": {
    en: "This page is for a SZLEJUN product you already bought. We reply within one business day, Monday to Sunday, China time (UTC+8). Refunds, returns, and delivery stay in your Amazon order.",
    zh: "这一页处理已经买到的 SZLEJUN 产品怎么用。我们在一个工作日内回复，周一至周日，北京时间（UTC+8）。退款、退货和物流留在亚马逊订单里。",
  },
  "contact.order": { en: "Amazon order ID (optional)", zh: "亚马逊订单号（选填）" },
  "contact.product": { en: "Product", zh: "产品" },
  "contact.product.detector": { en: "NFC signal detector card", zh: "NFC 信号检测卡" },
  "contact.product.reader": { en: "NFC reader", zh: "NFC 读卡器" },
  "contact.product.cac": { en: "CAC reader", zh: "CAC 读卡器" },
  "contact.product.other": { en: "Other", zh: "其他" },
  "contact.asin": { en: "ASIN or name on the package (optional)", zh: "ASIN 或包装上的名称（选填）" },
  "contact.device": { en: "Phone or computer, and system", zh: "手机或电脑，以及系统" },
  "contact.device.ph": { en: "iPhone 15, iOS 18 — or Windows 11", zh: "iPhone 15，iOS 18，或 Windows 11" },
  "contact.issue": { en: "What do you need help with?", zh: "需要哪一类帮助？" },
  "contact.issue.read": { en: "It does not work", zh: "无法使用" },
  "contact.issue.use": { en: "How to use it", zh: "怎么使用" },
  "contact.issue.damage": { en: "Damaged or incomplete", zh: "损坏或缺件" },
  "contact.issue.other": { en: "Something else about this product", zh: "这件产品的其他问题" },
  "contact.desc": { en: "What happened", zh: "发生了什么" },
  "contact.submit": { en: "Send to support", zh: "发给支持" },
  "contact.photo": {
    en: "This form sends text. For a photo or a short video, email",
    zh: "这个表单只发送文字。照片或短视频请发邮件至",
  },
  "contact.photo.after": {
    en: "and include the order id if you have one.",
    zh: "，有订单号请一并写上。",
  },
  "contact.success": {
    en: "Received. We reply within one business day, Monday to Sunday, China time (UTC+8). Order changes stay in Amazon.",
    zh: "已收到。我们在一个工作日内回复，周一至周日，北京时间（UTC+8）。订单变更仍在亚马逊处理。",
  },
  "form.projectType": { en: "Project type", zh: "项目类型" },
  "form.type.sw": { en: "Encoding software / JavaCard / SDK", zh: "编码软件 / JavaCard / SDK" },
  "form.type.hw": { en: "Cards, tags & wristbands (factory)", zh: "卡、标签与手环（卡厂）" },
  "form.type.cloud": { en: "NTAG424 DNA cloud verify", zh: "NTAG424 DNA 云端验真" },
  "form.type.full": { en: "Card programme (media + encode + verify)", zh: "卡片项目（介质+编码+验真）" },
  "form.error": {
    en: "Failed to send. Please email us directly at support@nfctec.com.",
    zh: "发送失败，请直接发送邮件至 support@nfctec.com。",
  },
  "product.features.title": { en: "Key features", zh: "核心特性" },
  "product.back": { en: "Back to Products", zh: "返回产品列表" },
  "form.name": { en: "Name", zh: "姓名" },
  "form.company": { en: "Company", zh: "公司" },
  "form.email": { en: "Email", zh: "邮箱" },
  "form.phone": { en: "Phone (optional)", zh: "电话（选填）" },
  "form.country": { en: "Country / Region", zh: "国家 / 地区" },
  "form.subject": { en: "Subject", zh: "主题" },
  "form.desc": { en: "Project description", zh: "项目描述" },
  "form.subject.default": { en: "Website inquiry", zh: "网站咨询" },
  "form.submit": { en: "Submit inquiry", zh: "提交需求" },
  "form.sending": { en: "Sending…", zh: "发送中…" },
  "form.success": {
    en: "Thank you — your inquiry has been submitted. We'll respond by email within one business day.",
    zh: "感谢提交！我们已收到您的需求，将在 1 个工作日内通过邮件回复。",
  },
  "form.mailto.hint": { en: "If nothing opened, email us directly at", zh: "如未自动打开，请直接发送邮件至" },
  "project.eyebrow": { en: "Factory quote", zh: "卡厂询价" },
  "project.title": {
    en: "RFQ for NFC cards,\ntags or encoding.",
    zh: "NFC 卡、标签\n或编码询价。",
  },
  "project.sub": {
    en: "Chip (NTAG424, DESFire, JCOP…), form factor, quantity and encode level (blank / NDEF / SUN / keys). Engineers reply by email within one business day.",
    zh: "芯片（NTAG424、DESFire、JCOP 等）、形态、数量与编码级别（空白 / NDEF / SUN / 密钥）。工程师一个工作日内邮件回复。",
  },
  "faq.in1.q": { en: "How fast will I get a reply?", zh: "多久能收到回复？" },
  "faq.in1.a": {
    en: "Inquiries from this form are answered by email within one business day (China Standard Time).",
    zh: "从这个表单提交的询盘，我们在一个工作日内用邮件回复（北京时间）。",
  },
  "faq.in2.q": { en: "Can I request samples?", zh: "可以要样品吗？" },
  "faq.in2.a": {
    en: "Yes. Include the chip, form factor and quantity in the description.",
    zh: "可以。在项目描述里写上芯片、形态和数量。",
  },
  "faq.in3.q": { en: "Do you sign NDAs?", zh: "可以签保密协议吗？" },
  "faq.in3.a": {
    en: "Yes. We sign an NDA before drawings, keys or unreleased designs are exchanged.",
    zh: "可以。图纸、密钥或未公开设计交换之前，我们签保密协议。",
  },
  "faq.in4.q": { en: "Where do you ship from?", zh: "从哪里发货？" },
  "faq.in4.a": {
    en: "Factory shipments leave from Shenzhen, China.",
    zh: "工厂发货从中国深圳发出。",
  },
  "contact.support": { en: "Product support", zh: "产品支持" },
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
