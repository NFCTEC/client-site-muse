import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";
import {
  Wallet, Train, Landmark, KeyRound, HeartPulse, Boxes,
  ShieldCheck, ShoppingBag, Car, Smartphone, ArrowRight, ArrowLeft, Check,
  Award, FileDown, Workflow,
  type LucideIcon,
} from "lucide-react";

type Bi = { en: string; zh: string };
type Capability = { t: Bi; d: Bi };
type Step = { t: Bi; d: Bi };
type Resource = { t: Bi; kind: Bi };
type Industry = {
  slug: string;
  icon: LucideIcon;
  name: Bi;
  tagline: Bi;
  intro: Bi;
  capabilities: Capability[];
  deliverables: Bi[];
  protocols: string[];
  certifications: string[];
  workflow: Step[];
  resources: Resource[];
};

type BaseIndustry = Omit<Industry, "certifications" | "workflow" | "resources">;

const baseIndustries: BaseIndustry[] = [
  {
    slug: "banking",
    icon: Wallet,
    name: { en: "Banking & Payment", zh: "银行与支付" },
    tagline: {
      en: "From applet to acquirer — full payment stack engineering.",
      zh: "从 Applet 到收单网关 —— 全栈支付工程能力。",
    },
    intro: {
      en: "We design and certify the entire payment chain: Visa / Mastercard / UnionPay / JCB / Amex applets, card issuance and key management systems, EMV L1/L2/L3 certified POS kernels, ISO 8583 host systems and payment gateways.",
      zh: "我们设计并认证整条支付链路：Visa / Mastercard / 银联 / JCB / 美运卡 Applet、发卡与密钥管理系统、通过 EMV L1/L2/L3 认证的 POS 内核、ISO 8583 主机系统与支付网关。",
    },
    capabilities: [
      { t: { en: "Card Applets", zh: "卡片 Applet" }, d: { en: "JavaCard / GlobalPlatform applets for Visa VSDC, Mastercard M/Chip, UnionPay QUICS, JCB J/Smart, Amex AEIPS.", zh: "针对 Visa VSDC、Mastercard M/Chip、银联 QUICS、JCB J/Smart、美运 AEIPS 的 JavaCard / GlobalPlatform Applet。" } },
      { t: { en: "Issuance & Personalization", zh: "发卡与个人化" }, d: { en: "Card production line software, bureau-grade personalization, perso scripts, CPS/GP, EMV data prep.", zh: "卡厂产线软件、规模化个人化、Perso 脚本、CPS/GP、EMV 数据准备。" } },
      { t: { en: "Key Management & HSM", zh: "密钥管理与 HSM" }, d: { en: "Issuer key ceremonies, LMK/ZMK/ZPK lifecycle, Thales / Utimaco / Atalla HSM integration.", zh: "发卡方密钥仪式、LMK/ZMK/ZPK 生命周期、Thales / Utimaco / Atalla HSM 集成。" } },
      { t: { en: "POS EMV L1/L2/L3", zh: "POS EMV L1/L2/L3 认证" }, d: { en: "Contact + contactless kernels, brand-agnostic L2 stack, L3 brand certification with the major schemes.", zh: "接触+非接内核、品牌无关 L2 协议栈、面向主要卡组织的 L3 品牌认证。" } },
      { t: { en: "ISO 8583 Host", zh: "ISO 8583 后台" }, d: { en: "Acquirer/issuer host, authorization, clearing, settlement, dispute & chargeback flows.", zh: "收单 / 发卡主机、授权、清算、结算、争议与拒付流程。" } },
      { t: { en: "Payment Gateway", zh: "支付网关" }, d: { en: "Merchant gateway, 3-DS 2.x, tokenization, multi-acquirer routing, fraud rules engine.", zh: "商户网关、3-DS 2.x、令牌化、多收单路由、风控规则引擎。" } },
    ],
    deliverables: [
      { en: "Visa / Mastercard / UnionPay applet source + certification dossier", zh: "Visa / Mastercard / 银联 Applet 源码 + 认证文档" },
      { en: "Turn-key issuance platform with HSM integration", zh: "交钥匙发卡平台,含 HSM 集成" },
      { en: "EMV L2 kernel + L3 brand certification support", zh: "EMV L2 内核 + L3 品牌认证支持" },
      { en: "ISO 8583 host & payment gateway (on-prem or SaaS)", zh: "ISO 8583 主机与支付网关(本地或 SaaS)" },
    ],
    protocols: ["EMV Contact", "EMV Contactless", "VSDC", "M/Chip", "QUICS", "JCB J/Smart", "ISO 8583", "3-DS 2.x", "GlobalPlatform"],
  },
  {
    slug: "transit",
    icon: Train,
    name: { en: "Transit & Ticketing", zh: "公共交通" },
    tagline: {
      en: "End-to-end AFC — gates, validators, clearing, account-based ticketing.",
      zh: "端到端 AFC —— 闸机、验票机、清分、基于账户的票务。",
    },
    intro: {
      en: "Complete Automated Fare Collection (AFC) systems: card and mobile ticketing, gate and bus validators, station controllers, central clearing house and account-based ticketing (ABT) backends.",
      zh: "完整的自动售检票 (AFC) 系统：卡片与移动票务、闸机与车载验票机、车站控制器、中央清分中心与基于账户的票务 (ABT) 后台。",
    },
    capabilities: [
      { t: { en: "Card & Mobile Tickets", zh: "卡片与手机票" }, d: { en: "CALYPSO, MIFARE DESFire, FeliCa, HCE mobile tickets, QR + NFC hybrid.", zh: "CALYPSO、MIFARE DESFire、FeliCa、HCE 手机票、QR + NFC 混合方案。" } },
      { t: { en: "Gate & Bus Validators", zh: "闸机与车载验票机" }, d: { en: "Reader firmware, anti-passback, two-tap journeys, fare engine, offline whitelist/blacklist.", zh: "读卡器固件、反向通过、两次刷卡行程、计费引擎、离线黑白名单。" } },
      { t: { en: "Station & Line Controller", zh: "车站与线路控制器" }, d: { en: "Real-time monitoring, alarms, equipment health, OTA firmware and parameter push.", zh: "实时监控、告警、设备健康、OTA 固件与参数下发。" } },
      { t: { en: "Central Clearing House", zh: "中央清分中心" }, d: { en: "Multi-operator settlement, revenue apportionment, audit trails, reconciliation.", zh: "多运营商结算、收入分账、审计轨迹、对账。" } },
      { t: { en: "Account-Based Ticketing", zh: "基于账户的票务 (ABT)" }, d: { en: "Open-loop EMV tap-to-ride, best-fare engine, deny-list distribution, risk scoring.", zh: "开放环 EMV 即刷即乘、最优票价引擎、黑名单分发、风险评分。" } },
      { t: { en: "Mobile Wallet Tickets", zh: "手机钱包票" }, d: { en: "Apple Pay / Google Pay / Samsung transit passes, OEM wallet provisioning.", zh: "Apple Pay / Google Pay / Samsung 公交卡、OEM 钱包开通。" } },
    ],
    deliverables: [
      { en: "Full AFC line-of-business software", zh: "完整 AFC 业务线软件" },
      { en: "Gate, validator and TVM firmware", zh: "闸机、验票机与售票机固件" },
      { en: "Central clearing & ABT backend", zh: "中央清分与 ABT 后台" },
      { en: "Mobile ticket SDK (iOS / Android / HCE)", zh: "移动票务 SDK (iOS / Android / HCE)" },
    ],
    protocols: ["CALYPSO", "MIFARE DESFire EV3", "FeliCa", "EMV Open-Loop", "HCE", "ISO 14443 A/B"],
  },
  {
    slug: "gov",
    icon: Landmark,
    name: { en: "Government & ID", zh: "政务与身份" },
    tagline: {
      en: "Credential issuance, verification kiosks, border-control readers.",
      zh: "证件发行、核验自助终端、边检读卡设备。",
    },
    intro: {
      en: "Full credential lifecycle for national ID, ePassport, driver license and eSIM — from CA / PKI and personalization bureaus to inspection systems at borders, police stations and government service halls.",
      zh: "覆盖身份证、电子护照、驾照与 eSIM 的全生命周期 —— 从 CA / PKI 与个人化中心,到边境、派出所与政务大厅的核验系统。",
    },
    capabilities: [
      { t: { en: "Issuance Systems", zh: "证件发行系统" }, d: { en: "CSCA / DS PKI, ePassport / eID data preparation, perso bureau integration, key ceremonies.", zh: "CSCA / DS PKI、电子护照 / 电子身份证数据准备、个人化中心集成、密钥仪式。" } },
      { t: { en: "Verification Services", zh: "核验服务" }, d: { en: "ICAO 9303 BAC / PACE / EAC, passive + active authentication, DG1–DG16 parsing, CSCA trust store.", zh: "ICAO 9303 BAC / PACE / EAC、被动+主动认证、DG1–DG16 解析、CSCA 信任库。" } },
      { t: { en: "Border Control Readers", zh: "边检读卡设备" }, d: { en: "Self-service e-gates, hand-held inspection readers, MRZ OCR + chip cross-check.", zh: "自助 e-Gate、手持核验读卡器、MRZ OCR 与芯片交叉核验。" } },
      { t: { en: "eID Middleware", zh: "电子身份证中间件" }, d: { en: "PKCS#11 / Minidriver, browser plug-ins, signing & login for e-government portals.", zh: "PKCS#11 / Minidriver、浏览器插件、政务门户登录与签名。" } },
      { t: { en: "eSIM / Remote Provisioning", zh: "eSIM / 远程开通" }, d: { en: "SM-DP+ / SM-DS for consumer and M2M eSIM, GSMA-compliant profile management.", zh: "面向消费级与 M2M eSIM 的 SM-DP+ / SM-DS,符合 GSMA 规范的 Profile 管理。" } },
      { t: { en: "Citizen Service Kiosks", zh: "政务自助终端" }, d: { en: "Self-service printing, signing and verification kiosks for government halls.", zh: "政务大厅自助打印、签署与核验终端。" } },
    ],
    deliverables: [
      { en: "ePassport / eID issuance platform", zh: "电子护照 / 电子身份证发行平台" },
      { en: "ICAO 9303 inspection SDK (Windows / Linux / Android)", zh: "ICAO 9303 核验 SDK (Windows / Linux / Android)" },
      { en: "Border e-gate firmware & integration", zh: "边检 e-Gate 固件与集成" },
      { en: "eID middleware & PKI tooling", zh: "电子身份证中间件与 PKI 工具" },
    ],
    protocols: ["ICAO 9303", "BAC", "PACE", "EAC", "ISO 7816", "PKI X.509", "GSMA SGP.22"],
  },
  {
    slug: "access",
    icon: KeyRound,
    name: { en: "Access Control", zh: "门禁访问" },
    tagline: {
      en: "Credentials, readers, mobile keys and access controllers — one stack.",
      zh: "凭证、读卡器、手机钥匙与门禁主控 —— 一站到底。",
    },
    intro: {
      en: "Full access ecosystem: secure credentials (DESFire EV3 / SEOS / HID iCLASS), Wiegand/OSDP readers, mobile credentials over NFC + BLE, controller firmware and visitor management.",
      zh: "完整门禁生态：安全凭证 (DESFire EV3 / SEOS / HID iCLASS)、Wiegand/OSDP 读卡器、NFC + BLE 手机凭证、门禁控制器固件与访客管理。",
    },
    capabilities: [
      { t: { en: "Secure Credentials", zh: "安全凭证" }, d: { en: "Custom DESFire / SEOS card profiles, diversified keys, sector-level access rules.", zh: "定制 DESFire / SEOS 卡片配置、密钥分散、扇区级访问规则。" } },
      { t: { en: "Reader Firmware", zh: "读卡器固件" }, d: { en: "Wiegand / OSDP v2 readers, BLE + NFC dual interface, secure channel SCP03.", zh: "Wiegand / OSDP v2 读卡器、BLE + NFC 双界面、SCP03 安全通道。" } },
      { t: { en: "Mobile Credentials", zh: "手机凭证" }, d: { en: "iOS / Android SDK, Apple Wallet keys, Google Wallet keys, OEM wallet provisioning.", zh: "iOS / Android SDK、Apple Wallet 钥匙、Google Wallet 钥匙、OEM 钱包开通。" } },
      { t: { en: "Access Controller", zh: "门禁控制器" }, d: { en: "Edge controller firmware, anti-passback, time zones, offline operation, OSDP host.", zh: "边缘控制器固件、反向通过、时段管理、离线运行、OSDP 主机。" } },
      { t: { en: "Management Platform", zh: "管理平台" }, d: { en: "Multi-site cardholder management, visitor flow, audit logs, integration to HR systems.", zh: "多站点持卡人管理、访客流程、审计日志、HR 系统集成。" } },
      { t: { en: "Multi-Factor", zh: "多因子" }, d: { en: "Card + PIN + biometric, FIDO2 logical access, just-in-time elevated rights.", zh: "卡 + PIN + 生物识别、FIDO2 逻辑访问、即时权限提升。" } },
    ],
    deliverables: [
      { en: "Custom credential profiles + diversification scheme", zh: "定制凭证配置 + 密钥分散方案" },
      { en: "OSDP reader firmware & reference hardware", zh: "OSDP 读卡器固件与参考硬件" },
      { en: "Mobile credential SDK + wallet provisioning", zh: "手机凭证 SDK + 钱包开通" },
      { en: "Controller firmware & management platform", zh: "控制器固件与管理平台" },
    ],
    protocols: ["DESFire EV3", "HID SEOS", "iCLASS", "OSDP v2", "Wiegand", "FIDO2", "BLE Secure"],
  },
  {
    slug: "health",
    icon: HeartPulse,
    name: { en: "Healthcare", zh: "医疗健康" },
    tagline: {
      en: "Patient ID, eHealth cards, drug authentication, cold-chain NDEF logs.",
      zh: "患者身份、电子健康卡、药品防伪、冷链 NDEF 日志。",
    },
    intro: {
      en: "Hospital-grade NFC: patient wristbands, eHealth ID cards (eGK / CNS / Carte Vitale), pharmaceutical anti-counterfeit tags and temperature-logging NDEF sensors for cold-chain logistics.",
      zh: "医院级 NFC：患者腕带、电子健康卡 (eGK / CNS / Carte Vitale)、药品防伪标签与用于冷链的温度记录 NDEF 传感标签。",
    },
    capabilities: [
      { t: { en: "Patient Wristbands", zh: "患者腕带" }, d: { en: "Tamper-evident NTAG bands, EHR linkage, medication and surgery confirmation flows.", zh: "防撕 NTAG 腕带、EHR 关联、用药与手术确认流程。" } },
      { t: { en: "eHealth ID Card", zh: "电子健康卡" }, d: { en: "JavaCard applets and middleware for national health insurance card schemes.", zh: "面向国家医保卡的 JavaCard Applet 与中间件。" } },
      { t: { en: "Drug Authentication", zh: "药品防伪" }, d: { en: "Per-item NTAG 424 SUN URL verification, supply chain track & trace, recall workflows.", zh: "单品级 NTAG 424 SUN URL 验证、供应链溯源、召回流程。" } },
      { t: { en: "Cold-Chain NDEF", zh: "冷链 NDEF" }, d: { en: "NTAG 22x temperature loggers, threshold breach evidence, NDEF data extraction.", zh: "NTAG 22x 温度记录、阈值越限取证、NDEF 数据读取。" } },
      { t: { en: "Asset Tracking", zh: "资产追踪" }, d: { en: "Equipment, sample tubes and instrument trays — NFC + RFID inventory.", zh: "设备、样本管、器械托盘 —— NFC + RFID 资产盘点。" } },
      { t: { en: "Prescription Signing", zh: "电子处方签署" }, d: { en: "Doctor smart-card signing with eIDAS-grade qualified certificates.", zh: "医生智能卡签署,符合 eIDAS 级合格证书。" } },
    ],
    deliverables: [
      { en: "Wristband issuance & verification app", zh: "腕带发行与核验应用" },
      { en: "eHealth card applet + middleware", zh: "电子健康卡 Applet + 中间件" },
      { en: "Drug authentication SaaS + consumer scan landing", zh: "药品防伪 SaaS + 消费者扫码落地页" },
      { en: "Cold-chain NDEF reader app", zh: "冷链 NDEF 读取应用" },
    ],
    protocols: ["NTAG 424 DNA", "NTAG 22x", "JavaCard", "ISO 7816", "NDEF"],
  },
  {
    slug: "iot",
    icon: Boxes,
    name: { en: "IoT & Smart Devices", zh: "物联网" },
    tagline: {
      en: "Secure pairing, provisioning, OTA key rotation for connected devices.",
      zh: "联网设备的安全配对、配置、OTA 密钥轮换。",
    },
    intro: {
      en: "NFC as the secure side-channel for IoT: out-of-band pairing, factory provisioning, in-field commissioning, NTAG 22x sensing and remote key rotation for fleets of devices.",
      zh: "NFC 作为物联网的安全旁路：带外配对、产线配置、现场调试、NTAG 22x 传感与设备群组的远程密钥轮换。",
    },
    capabilities: [
      { t: { en: "Bluetooth / Wi-Fi Pairing", zh: "蓝牙 / Wi-Fi 配对" }, d: { en: "One-tap NFC handover for BLE LE Secure pairing and Wi-Fi credentials.", zh: "一触式 NFC handover,完成 BLE LE Secure 配对与 Wi-Fi 凭证下发。" } },
      { t: { en: "Factory Provisioning", zh: "产线配置" }, d: { en: "Bulk perso of device certificates, serials and AES keys via NFC on assembly line.", zh: "在产线上通过 NFC 批量个人化设备证书、序列号与 AES 密钥。" } },
      { t: { en: "NTAG 22x Sensing", zh: "NTAG 22x 传感" }, d: { en: "Temperature, tamper and supply-voltage data direct from tag to mobile app.", zh: "温度、防撕与供电数据,标签直接传送至手机应用。" } },
      { t: { en: "OTA Key Rotation", zh: "OTA 密钥轮换" }, d: { en: "Rotate diversified AES keys across a fleet, audit success/failure, rollback safely.", zh: "对设备群组轮换分散 AES 密钥,审计成功 / 失败,安全回滚。" } },
      { t: { en: "Secure Element", zh: "安全元件" }, d: { en: "SE05x / ATECC608 integration, attestation, root of trust for IoT identity.", zh: "SE05x / ATECC608 集成、设备证明、物联网身份信任根。" } },
      { t: { en: "Service App SDK", zh: "服务工程师 App SDK" }, d: { en: "Field technician app — diagnose, configure and re-key devices by tap.", zh: "现场工程师 App —— 一触式诊断、配置与重新发卡。" } },
    ],
    deliverables: [
      { en: "Device-side NFC firmware reference", zh: "设备端 NFC 固件参考实现" },
      { en: "Factory provisioning tooling", zh: "产线配置工具" },
      { en: "Mobile commissioning SDK", zh: "现场调试移动 SDK" },
      { en: "Key management & OTA backend", zh: "密钥管理与 OTA 后台" },
    ],
    protocols: ["NTAG 424 DNA", "NTAG 22x", "ISO 14443", "BLE Secure", "Wi-Fi WPS-NFC"],
  },
  {
    slug: "brand",
    icon: ShieldCheck,
    name: { en: "Brand Protection", zh: "品牌防伪" },
    tagline: {
      en: "SUN dynamic URLs, tamper-evident tags, scan-to-engage at item level.",
      zh: "SUN 动态 URL、防撕标签、单品级扫码互动。",
    },
    intro: {
      en: "Item-level authentication using NTAG 424 DNA SUN messages: tamper-evident tags, scan count, geo + time analytics and a branded scan-to-engage experience the consumer trusts.",
      zh: "基于 NTAG 424 DNA SUN 消息的单品级防伪：防撕标签、扫码计数、地理 + 时间分析,以及消费者信任的品牌互动体验。",
    },
    capabilities: [
      { t: { en: "SUN Dynamic URL", zh: "SUN 动态 URL" }, d: { en: "Per-tap unique URL with CMAC + monotonic counter — verifiable in our cloud or yours.", zh: "每次扫码生成唯一 URL,含 CMAC + 单调计数器,可在我们或您自己的云端验证。" } },
      { t: { en: "Tamper-Evident Tags", zh: "防撕标签" }, d: { en: "Physical tamper loop on inlay; reads as broken after first opening.", zh: "标签封装内置物理防撕环;首次开封后即读出已断开。" } },
      { t: { en: "Issuance Bureau", zh: "标签发行" }, d: { en: "Bulk perso of NTAG 424 DNA with diversified AES keys; tag-to-SKU mapping.", zh: "NTAG 424 DNA 批量个人化,分散 AES 密钥;标签到 SKU 的映射。" } },
      { t: { en: "Verification Cloud", zh: "验证云" }, d: { en: "Public scan endpoint, anti-cloning logic, country / city / time-of-day analytics.", zh: "公开扫码端点、防克隆逻辑、国家 / 城市 / 时段分析。" } },
      { t: { en: "Consumer Landing", zh: "消费者落地页" }, d: { en: "Branded mobile page: authenticity badge, provenance, loyalty enrollment, content.", zh: "品牌移动端落地页:正品标识、溯源、会员注册、内容互动。" } },
      { t: { en: "Track & Trace", zh: "溯源" }, d: { en: "Full supply chain provenance, recall workflow, grey-market detection.", zh: "完整供应链溯源、召回流程、灰市检测。" } },
    ],
    deliverables: [
      { en: "Pre-personalized NTAG 424 DNA tags", zh: "已个人化的 NTAG 424 DNA 标签" },
      { en: "Verification cloud + consumer landing page", zh: "验证云 + 消费者落地页" },
      { en: "Brand dashboard with scan analytics", zh: "品牌端含扫码分析的控制台" },
      { en: "Integration into your DAM / CDP / loyalty stack", zh: "对接您的 DAM / CDP / 会员体系" },
    ],
    protocols: ["NTAG 424 DNA", "SUN Messaging", "CMAC", "ISO 14443-4"],
  },
  {
    slug: "retail",
    icon: ShoppingBag,
    name: { en: "Retail & Loyalty", zh: "零售与会员" },
    tagline: {
      en: "Tap-to-engage packaging, loyalty cards, smart shelves and EAS.",
      zh: "Tap 互动包装、会员卡、智能货架与电子防盗。",
    },
    intro: {
      en: "Connect physical product to digital engagement: NFC-enabled packaging, member cards (physical and mobile), smart shelves for inventory accuracy and integrated EAS for loss prevention.",
      zh: "把物理商品连接到数字互动：NFC 智能包装、会员卡 (实体与手机)、提升库存精度的智能货架,以及集成 EAS 防损方案。",
    },
    capabilities: [
      { t: { en: "Tap-to-Engage Packaging", zh: "Tap 互动包装" }, d: { en: "NTAG 213/215/424 in-pack tags, content router, A/B targeting by region.", zh: "包装内置 NTAG 213/215/424 标签、内容路由、按地区 A/B 投放。" } },
      { t: { en: "Loyalty Cards", zh: "会员卡" }, d: { en: "MIFARE / DESFire member cards + HCE mobile cards + Apple/Google Wallet passes.", zh: "MIFARE / DESFire 会员卡 + HCE 手机卡 + Apple/Google Wallet Pass。" } },
      { t: { en: "Inventory & EAS", zh: "库存与电子防盗" }, d: { en: "Combined NFC + UHF RFID, gate alarm logic, store-level cycle counts.", zh: "NFC + UHF RFID 组合、门口报警逻辑、门店级循环盘点。" } },
      { t: { en: "Smart Shelves", zh: "智能货架" }, d: { en: "RFID + NFC shelf antennas, planogram compliance, real-time stock.", zh: "RFID + NFC 货架天线、陈列合规性、实时库存。" } },
      { t: { en: "Checkout Integration", zh: "收银集成" }, d: { en: "POS plug-ins to read member NFC + reward redemption + EMV tap in one flow.", zh: "POS 插件实现读取会员 NFC + 积分兑换 + EMV 即刷一气呵成。" } },
      { t: { en: "Engagement Analytics", zh: "互动分析" }, d: { en: "Tap heatmaps by SKU and location, conversion funnel, content optimization.", zh: "按 SKU 与门店的扫码热度、转化漏斗、内容优化。" } },
    ],
    deliverables: [
      { en: "Smart packaging tags + content router", zh: "智能包装标签 + 内容路由" },
      { en: "Loyalty card issuance + wallet provisioning", zh: "会员卡发行 + 钱包开通" },
      { en: "Inventory & EAS integration", zh: "库存与 EAS 集成" },
      { en: "POS / e-commerce engagement plug-ins", zh: "POS / 电商互动插件" },
    ],
    protocols: ["NTAG 213/215/424", "MIFARE", "DESFire", "HCE", "Apple Wallet", "Google Wallet"],
  },
  {
    slug: "auto",
    icon: Car,
    name: { en: "Automotive", zh: "汽车" },
    tagline: {
      en: "CCC Digital Key, NFC unlock & start, aftermarket retrofit.",
      zh: "CCC 数字车钥匙、NFC 解锁与启动、后装改装方案。",
    },
    intro: {
      en: "Digital key engineering for OEMs and Tier 1s: CCC Digital Key 3.0 (NFC + UWB + BLE), in-vehicle NFC readers, driver profile sync and aftermarket retrofit kits.",
      zh: "面向 OEM 与 Tier 1 的数字钥匙工程：CCC 数字钥匙 3.0 (NFC + UWB + BLE)、车内 NFC 读卡器、驾驶员档案同步与后装改装套件。",
    },
    capabilities: [
      { t: { en: "CCC Digital Key 3.0", zh: "CCC 数字钥匙 3.0" }, d: { en: "Owner / friend / fleet keys, NFC primary path with UWB ranging + BLE awareness.", zh: "车主 / 朋友 / 车队钥匙,NFC 主通路,UWB 测距 + BLE 感知。" } },
      { t: { en: "In-Vehicle Readers", zh: "车内读卡器" }, d: { en: "Door-handle, B-pillar and wireless-charger pad NFC readers; AEC-Q100 components.", zh: "门把手、B 柱与无线充电板 NFC 读卡器;符合 AEC-Q100 元件。" } },
      { t: { en: "Driver Profile Sync", zh: "驾驶员档案同步" }, d: { en: "Seat, mirror, climate and infotainment profile per key — tap to personalize.", zh: "每把钥匙对应座椅、后视镜、空调、信息娱乐档案 —— 一触即个性化。" } },
      { t: { en: "Owner App SDK", zh: "车主 App SDK" }, d: { en: "iOS / Android SDK for owner pairing, key sharing, remote revocation.", zh: "iOS / Android SDK 实现车主配对、钥匙分享、远程吊销。" } },
      { t: { en: "Backend & Wallet", zh: "后台与钱包" }, d: { en: "OEM key server, Apple Wallet + Google Wallet car key provisioning.", zh: "OEM 钥匙服务器、Apple Wallet + Google Wallet 车钥匙开通。" } },
      { t: { en: "Aftermarket Retrofit", zh: "后装改装" }, d: { en: "CAN-bus interface boxes for non-OEM vehicles; secure NFC unlock kit.", zh: "面向非 OEM 车辆的 CAN-bus 接口盒;安全 NFC 解锁套件。" } },
    ],
    deliverables: [
      { en: "CCC 3.0 applet + vehicle module reference design", zh: "CCC 3.0 Applet + 车端模块参考设计" },
      { en: "Owner app SDK (iOS / Android)", zh: "车主 App SDK (iOS / Android)" },
      { en: "OEM key server + wallet provisioning", zh: "OEM 钥匙服务器 + 钱包开通" },
      { en: "Aftermarket retrofit hardware", zh: "后装改装硬件" },
    ],
    protocols: ["CCC Digital Key 3.0", "NFC", "UWB", "BLE", "ISO 14443-4"],
  },
  {
    slug: "wallet",
    icon: Smartphone,
    name: { en: "Mobile Wallet & Digital Credentials", zh: "手机钱包与数字凭证" },
    tagline: {
      en: "HCE, Secure Element applets, tokenization, digital keys and credentials.",
      zh: "HCE、安全元件 Applet、令牌化、数字钥匙与凭证。",
    },
    intro: {
      en: "Ship credentials to phones: Host Card Emulation, Secure Element JavaCard applets, tokenization for payment, transit, access and identity — plus Apple / Google / Samsung wallet integration.",
      zh: "把凭证发到手机：Host Card Emulation、安全元件 JavaCard Applet、面向支付 / 公交 / 门禁 / 身份的令牌化 —— 以及 Apple / Google / Samsung 钱包集成。",
    },
    capabilities: [
      { t: { en: "HCE Card Emulation", zh: "HCE 卡模拟" }, d: { en: "Android HCE service apps for payment, transit, access and loyalty.", zh: "面向支付、公交、门禁、会员的 Android HCE 服务应用。" } },
      { t: { en: "SE Applets", zh: "安全元件 Applet" }, d: { en: "JavaCard applets loaded to embedded SE / SIM / eSE via GlobalPlatform.", zh: "通过 GlobalPlatform 加载到 eSE / SIM / 嵌入式 SE 的 JavaCard Applet。" } },
      { t: { en: "Tokenization (TSP)", zh: "令牌化 (TSP)" }, d: { en: "Issuer-side tokenization, lifecycle, replenishment, in-app provisioning.", zh: "发卡方令牌化、生命周期、补充、应用内开通。" } },
      { t: { en: "Apple / Google Pay", zh: "Apple / Google Pay" }, d: { en: "Push provisioning of payment cards, transit passes and access keys to OEM wallets.", zh: "把支付卡、公交卡与门禁钥匙推送开通到 OEM 钱包。" } },
      { t: { en: "Digital Identity", zh: "数字身份" }, d: { en: "mDL / ISO 18013-5 mobile driver license, EU Digital Identity Wallet readiness.", zh: "mDL / ISO 18013-5 移动驾照、欧盟数字身份钱包就绪。" } },
      { t: { en: "Wallet Backend", zh: "钱包后台" }, d: { en: "Provisioning server, audit, lifecycle, multi-credential management.", zh: "开通服务器、审计、生命周期、多凭证管理。" } },
    ],
    deliverables: [
      { en: "HCE / SE applet + Android & iOS SDK", zh: "HCE / SE Applet + Android & iOS SDK" },
      { en: "Tokenization service (TSP) integration", zh: "令牌化服务 (TSP) 集成" },
      { en: "Apple / Google / Samsung wallet push provisioning", zh: "Apple / Google / Samsung 钱包推送开通" },
      { en: "Wallet backend & lifecycle management", zh: "钱包后台与生命周期管理" },
    ],
    protocols: ["HCE", "GlobalPlatform", "JavaCard", "EMV Tokenization", "ISO 18013-5"],
  },
];

// Per-industry extras: certifications, typical engagement workflow, downloadable resources
type Extras = Pick<Industry, "certifications" | "workflow" | "resources">;

const defaultWorkflow: Step[] = [
  { t: { en: "1. Discovery", zh: "1. 需求澄清" }, d: { en: "Workshop on chips, volumes, markets, certification targets and timeline.", zh: "围绕芯片、规模、市场、认证目标与时间表的需求工作坊。" } },
  { t: { en: "2. Architecture & PoC", zh: "2. 架构与 PoC" }, d: { en: "System design, key hierarchy, API contracts and a working proof-of-concept.", zh: "系统设计、密钥层级、API 契约,并交付可运行的概念验证。" } },
  { t: { en: "3. Engineering", zh: "3. 工程实施" }, d: { en: "Firmware, applets, backend, mobile SDK — built and tested against your spec.", zh: "固件、Applet、后台、移动 SDK —— 依规格构建与测试。" } },
  { t: { en: "4. Certification & Pilot", zh: "4. 认证与试点" }, d: { en: "Lab certification, field pilot, performance tuning, security review.", zh: "实验室认证、现场试点、性能调优、安全评审。" } },
  { t: { en: "5. Rollout & Support", zh: "5. 上线与运维" }, d: { en: "Production rollout, 24×7 support SLA, key rotation and lifecycle ops.", zh: "正式上线、24×7 支持 SLA、密钥轮换与生命周期运营。" } },
];

const defaultResources: Resource[] = [
  { t: { en: "Solution brief (PDF)", zh: "方案简报 (PDF)" }, kind: { en: "Datasheet", zh: "规格书" } },
  { t: { en: "Reference architecture", zh: "参考架构图" }, kind: { en: "Datasheet", zh: "规格书" } },
  { t: { en: "Sample code & SDK", zh: "示例代码与 SDK" }, kind: { en: "SDK", zh: "SDK" } },
];

const extrasMap: Record<string, Extras> = {
  banking: {
    certifications: ["EMV L1", "EMV L2", "EMV L3", "Visa VCPS", "Mastercard PayPass", "PCI PTS", "PCI DSS", "GlobalPlatform"],
    workflow: defaultWorkflow,
    resources: [
      { t: { en: "EMV L2 kernel datasheet", zh: "EMV L2 内核规格书" }, kind: { en: "Datasheet", zh: "规格书" } },
      { t: { en: "Issuance platform brochure", zh: "发卡平台手册" }, kind: { en: "Datasheet", zh: "规格书" } },
      { t: { en: "ISO 8583 host API reference", zh: "ISO 8583 主机 API 参考" }, kind: { en: "SDK", zh: "SDK" } },
      { t: { en: "Sample EMV trace logs", zh: "EMV 交易示例日志" }, kind: { en: "Sample", zh: "示例" } },
    ],
  },
  transit: {
    certifications: ["CALYPSO Certified", "EMV Transit Profile", "EN 50128", "ISO 14443"],
    workflow: defaultWorkflow,
    resources: [
      { t: { en: "AFC system overview", zh: "AFC 系统总览" }, kind: { en: "Datasheet", zh: "规格书" } },
      { t: { en: "Validator firmware notes", zh: "验票机固件说明" }, kind: { en: "Datasheet", zh: "规格书" } },
      { t: { en: "Mobile ticket SDK", zh: "移动票务 SDK" }, kind: { en: "SDK", zh: "SDK" } },
    ],
  },
  gov: {
    certifications: ["ICAO 9303", "Common Criteria EAL5+", "FIPS 140-2", "GSMA SGP.22", "eIDAS"],
    workflow: defaultWorkflow,
    resources: [
      { t: { en: "ePassport inspection SDK", zh: "电子护照核验 SDK" }, kind: { en: "SDK", zh: "SDK" } },
      { t: { en: "PKI integration guide", zh: "PKI 集成指南" }, kind: { en: "Datasheet", zh: "规格书" } },
      { t: { en: "eID middleware sample", zh: "电子身份证中间件示例" }, kind: { en: "Sample", zh: "示例" } },
    ],
  },
  access: {
    certifications: ["OSDP Verified", "FIPS 197 (AES)", "FIDO2 Certified", "UL 294"],
    workflow: defaultWorkflow,
    resources: [
      { t: { en: "Reader hardware datasheet", zh: "读卡器硬件规格书" }, kind: { en: "Datasheet", zh: "规格书" } },
      { t: { en: "Mobile credential SDK", zh: "手机凭证 SDK" }, kind: { en: "SDK", zh: "SDK" } },
      { t: { en: "Controller integration guide", zh: "控制器集成指南" }, kind: { en: "Datasheet", zh: "规格书" } },
    ],
  },
  health: {
    certifications: ["HIPAA-ready", "GDPR", "GS1 Healthcare", "ISO 13485"],
    workflow: defaultWorkflow,
    resources: defaultResources,
  },
  iot: {
    certifications: ["NFC Forum Certified", "Bluetooth SIG", "Matter-ready", "FCC / CE"],
    workflow: defaultWorkflow,
    resources: defaultResources,
  },
  brand: {
    certifications: ["NTAG 424 DNA SUN", "GS1 Digital Link", "ISO 22376"],
    workflow: defaultWorkflow,
    resources: [
      { t: { en: "SUN URL verification API", zh: "SUN URL 验证 API" }, kind: { en: "SDK", zh: "SDK" } },
      { t: { en: "Brand pilot kit brochure", zh: "品牌试点套件手册" }, kind: { en: "Datasheet", zh: "规格书" } },
      { t: { en: "Sample scan landing page", zh: "扫码落地页示例" }, kind: { en: "Sample", zh: "示例" } },
    ],
  },
  retail: {
    certifications: ["EPCglobal", "GS1", "Apple Wallet", "Google Wallet"],
    workflow: defaultWorkflow,
    resources: defaultResources,
  },
  auto: {
    certifications: ["CCC Digital Key 3.0", "AEC-Q100", "ISO 21434", "Apple CarKey", "Google Digital Car Key"],
    workflow: defaultWorkflow,
    resources: [
      { t: { en: "CCC 3.0 applet datasheet", zh: "CCC 3.0 Applet 规格书" }, kind: { en: "Datasheet", zh: "规格书" } },
      { t: { en: "Owner app SDK", zh: "车主 App SDK" }, kind: { en: "SDK", zh: "SDK" } },
      { t: { en: "Retrofit hardware spec", zh: "改装硬件规格" }, kind: { en: "Datasheet", zh: "规格书" } },
    ],
  },
  wallet: {
    certifications: ["GlobalPlatform", "EMVCo Tokenization", "Apple Wallet", "Google Wallet", "Samsung Wallet", "ISO 18013-5"],
    workflow: defaultWorkflow,
    resources: [
      { t: { en: "HCE / SE applet SDK", zh: "HCE / SE Applet SDK" }, kind: { en: "SDK", zh: "SDK" } },
      { t: { en: "Wallet provisioning guide", zh: "钱包开通集成指南" }, kind: { en: "Datasheet", zh: "规格书" } },
      { t: { en: "mDL reference implementation", zh: "mDL 参考实现" }, kind: { en: "Sample", zh: "示例" } },
    ],
  },
};

const industries: Industry[] = baseIndustries.map((b) => ({ ...b, ...extrasMap[b.slug] }));

const bySlug = new Map(industries.map((i) => [i.slug, i]));

export const Route = createFileRoute("/solutions/$slug")({
  loader: ({ params }) => {
    const ind = bySlug.get(params.slug);
    if (!ind) throw notFound();
    return { ind };
  },
  head: ({ loaderData }) => {
    const ind = loaderData?.ind;
    const title = ind ? `${ind.name.en} — NFCTEC Solutions` : "Solution — NFCTEC";
    const desc = ind?.tagline.en ?? "Industry NFC solution by NFCTEC.";
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="mx-auto max-w-3xl px-6 py-32 text-center">
      <h1 className="font-display text-4xl mb-4">Solution not found</h1>
      <Link to="/solutions" className="text-primary hover:underline">← Back to all solutions</Link>
    </div>
  ),
  errorComponent: ({ error }) => (
    <div className="mx-auto max-w-3xl px-6 py-32 text-center">
      <h1 className="font-display text-4xl mb-4">Something went wrong</h1>
      <p className="text-muted-foreground">{error.message}</p>
    </div>
  ),
  component: SolutionDetail,
});

function SolutionDetail() {
  const { ind } = Route.useLoaderData() as { ind: Industry };
  const { lang, tr } = useI18n();
  const Icon = ind.icon;
  const pick = (b: Bi) => b[lang];

  return (
    <>
      {/* HERO */}
      <section className="relative pt-24 lg:pt-32 pb-16 border-b border-border">
        <div className="absolute inset-0 bg-hero-glow pointer-events-none" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
          <Link
            to="/solutions"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors mb-8"
          >
            <ArrowLeft size={14} /> {lang === "zh" ? "全部行业方案" : "All solutions"}
          </Link>
          <div className="flex items-start gap-6">
            <div className="hidden sm:grid w-16 h-16 rounded-2xl bg-primary/10 border border-primary/30 place-items-center shrink-0">
              <Icon size={28} className="text-primary" />
            </div>
            <div className="flex-1">
              <h1 className="font-display text-4xl lg:text-6xl tracking-tight text-balance">
                {pick(ind.name)}
              </h1>
              <p className="mt-5 text-lg lg:text-xl text-muted-foreground max-w-3xl leading-relaxed">
                {pick(ind.tagline)}
              </p>
            </div>
          </div>
          <p className="mt-10 max-w-4xl text-base lg:text-lg text-foreground/80 leading-relaxed">
            {pick(ind.intro)}
          </p>
        </div>
      </section>

      {/* CAPABILITIES */}
      <section className="py-24 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <h2 className="font-display text-3xl lg:text-4xl tracking-tight mb-12">
            {lang === "zh" ? "我们能做什么" : "What we can build"}
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {ind.capabilities.map((c) => (
              <div
                key={c.t.en}
                className="card-glow rounded-2xl border border-border bg-card-gradient p-7"
              >
                <h3 className="font-display text-lg font-semibold mb-3">{pick(c.t)}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{pick(c.d)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DELIVERABLES + PROTOCOLS */}
      <section className="py-24 lg:py-28 bg-surface/40 border-y border-border">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 grid lg:grid-cols-2 gap-12">
          <div>
            <h2 className="font-display text-3xl lg:text-4xl tracking-tight mb-8">
              {lang === "zh" ? "典型交付物" : "What you get"}
            </h2>
            <ul className="space-y-3">
              {ind.deliverables.map((d) => (
                <li
                  key={d.en}
                  className="flex gap-3 items-start rounded-xl border border-border bg-card-gradient px-5 py-4"
                >
                  <Check size={18} className="text-primary shrink-0 mt-0.5" />
                  <span className="text-sm text-foreground/90">{pick(d)}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="font-display text-3xl lg:text-4xl tracking-tight mb-8">
              {lang === "zh" ? "覆盖协议" : "Protocols covered"}
            </h2>
            <div className="flex flex-wrap gap-2">
              {ind.protocols.map((p) => (
                <span
                  key={p}
                  className="rounded-full border border-border bg-surface/60 px-4 py-1.5 text-xs font-mono text-muted-foreground"
                >
                  {p}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 lg:py-28">
        <div className="mx-auto max-w-5xl px-6 lg:px-10">
          <div className="relative rounded-3xl border border-primary/30 bg-card-gradient p-12 lg:p-14 text-center overflow-hidden shadow-glow">
            <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-72 h-72 bg-primary/15 rounded-full blur-3xl pointer-events-none" />
            <div className="relative">
              <h2 className="font-display text-3xl lg:text-4xl tracking-tight">
                {lang === "zh" ? "需要这套方案？" : "Need this in production?"}
              </h2>
              <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
                {lang === "zh"
                  ? "告诉我们规模、时间表与目标市场,我们会给出方案与报价。"
                  : "Tell us scale, timeline and target markets — we'll come back with a proposal."}
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-7 py-3.5 text-sm font-semibold hover:shadow-glow-strong transition-all"
                >
                  {tr("cta.btn")} <ArrowRight size={16} />
                </Link>
                <Link
                  to="/solutions"
                  className="inline-flex items-center gap-2 rounded-full border border-border-strong bg-background/60 backdrop-blur px-7 py-3.5 text-sm font-medium hover:border-primary hover:text-primary transition-colors"
                >
                  {lang === "zh" ? "查看其他行业" : "Browse other industries"}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
