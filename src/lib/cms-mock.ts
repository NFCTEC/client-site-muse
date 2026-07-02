// Fallback mock data used when the external CMS is unreachable (e.g. 403 / offline).
// Shapes match what `cms.ts` normalizers expect.
import { posts as blogPosts } from "./blog-posts";
import type { Locale } from "./locale";

type Cap = { titleEn: string; titleZh: string; descEn: string; descZh: string };

type Industry = {
  slug: string;
  nameEn: string;
  nameZh: string;
  taglineEn: string;
  taglineZh: string;
  introEn: string;
  introZh: string;
  icon: string;
  capabilities: Cap[];
  protocols: string[];
  certifications: string[];
};

const INDUSTRIES: Industry[] = [
  {
    slug: "banking",
    nameEn: "Banking & Payment",
    nameZh: "银行与支付",
    icon: "Landmark",
    taglineEn: "EMV-certified issuance from applet to acquirer host.",
    taglineZh: "从应用到收单主机的 EMV 认证发卡方案。",
    introEn:
      "End-to-end payment card programs: EMV contact/contactless applets on JavaCard SE, PCI-compliant personalization bureaus, tokenization for Apple Pay / Google Pay / Samsung Pay, and ISO 8583 acquirer host integration. Support for M/Chip, VIS, JCB J/Smart, UPI QUICPass and dual-interface metal cards.",
    introZh:
      "端到端支付卡项目:基于 JavaCard SE 的 EMV 接触/非接应用、符合 PCI DSS 的个人化制卡、面向 Apple Pay / Google Pay / Samsung Pay 的令牌化,以及 ISO 8583 收单主机对接。覆盖 M/Chip、VIS、JCB J/Smart、银联 QUICPass 与双界面金属卡。",
    capabilities: [
      { titleEn: "EMV L1/L2 applets", titleZh: "EMV L1/L2 应用", descEn: "M/Chip 4.1, VIS 1.6, PayPass/payWave dual-interface builds.", descZh: "M/Chip 4.1、VIS 1.6、PayPass/payWave 双界面应用。" },
      { titleEn: "PCI personalization", titleZh: "PCI 个人化", descEn: "PCI CP-certified bureau: HSM key ceremony, GP script gen, DDA/CDA.", descZh: "PCI CP 认证制卡厂:HSM 密钥仪式、GP 脚本、DDA/CDA 支持。" },
      { titleEn: "Tokenization & wallets", titleZh: "令牌化与钱包", descEn: "MDES, VTS and Push Provisioning for Apple/Google/Samsung Pay.", descZh: "MDES、VTS 与 Push Provisioning,推送至 Apple/Google/Samsung Pay。" },
      { titleEn: "Metal & dual-interface", titleZh: "金属与双界面卡", descEn: "0.76mm hybrid metal cards, coil-on-module, laser personalization.", descZh: "0.76mm 混合金属卡、线圈模块、激光个人化。" },
      { titleEn: "Host & switch", titleZh: "主机与交换", descEn: "ISO 8583 (87/93) message specs, HSM-backed PIN translation.", descZh: "ISO 8583(87/93)报文规范、基于 HSM 的 PIN 翻译。" },
      { titleEn: "3-D Secure 2.x", titleZh: "3-D Secure 2.x", descEn: "ACS integration, biometric OOB, EMV 3DS SDK for issuer apps.", descZh: "ACS 集成、生物识别带外验证、发行方 App 的 EMV 3DS SDK。" },
    ],
    protocols: ["ISO 14443 Type A/B", "ISO 7816-3/4", "EMV Contactless 2.6+", "GlobalPlatform 2.3", "ISO 8583"],
    certifications: ["EMVCo L1/L2", "PCI CP", "PCI DSS", "Visa VIS", "Mastercard M/Chip", "Common Criteria EAL5+"],
  },
  {
    slug: "transit",
    nameEn: "Transit & Ticketing",
    nameZh: "公共交通",
    icon: "Train",
    taglineEn: "CALYPSO, MIFARE DESFire and account-based ticketing (ABT).",
    taglineZh: "CALYPSO、MIFARE DESFire 与账户制票务(ABT)。",
    introEn:
      "Full fare-collection stack for metros, buses, ferries and multimodal networks: CALYPSO Rev 3.1 and DESFire EV3 fare media, ITSO/Rita compatible readers, cEMV open-loop acceptance, and cloud back-office for reconciliation, fare capping and account-based ticketing.",
    introZh:
      "面向地铁、公交、轮渡与多式联运的完整票务方案:CALYPSO Rev 3.1 与 DESFire EV3 票卡、兼容 ITSO/Rita 的验票机、cEMV 开放式支付受理,以及支持清分、封顶计费与账户制票务的云端后台。",
    capabilities: [
      { titleEn: "CALYPSO fare media", titleZh: "CALYPSO 票卡", descEn: "Rev 3.1 apps on CD21/CD97 chips, SAM key management.", descZh: "CD21/CD97 芯片上的 Rev 3.1 应用与 SAM 密钥管理。" },
      { titleEn: "cEMV open-loop", titleZh: "cEMV 开放支付", descEn: "Tap-to-ride with any contactless bank card or wallet.", descZh: "任意非接银行卡或手机钱包一触乘车。" },
      { titleEn: "Validators & gates", titleZh: "验票机与闸机", descEn: "<300ms transaction, offline risk, deny-list sync.", descZh: "<300ms 交易、离线风控、黑名单同步。" },
      { titleEn: "Account-based ticketing", titleZh: "账户制票务(ABT)", descEn: "Token → account resolution, fare capping, best-fare.", descZh: "令牌 → 账户解析、票价封顶、最优票价计算。" },
      { titleEn: "Mobile ticketing", titleZh: "手机票务", descEn: "HCE, Apple/Google Wallet transit passes, QR fallback.", descZh: "HCE、Apple/Google Wallet 交通卡、QR 兜底方案。" },
      { titleEn: "Back-office clearing", titleZh: "后台清分", descEn: "ISO 20022 settlement, revenue split across operators.", descZh: "ISO 20022 结算、多运营商收入分账。" },
    ],
    protocols: ["CALYPSO Rev 3.1", "ISO 14443-4", "MIFARE DESFire EV3", "cEMV (Transit)", "ITSO 2.1.4"],
    certifications: ["CALYPSO CNA", "EMVCo Transit", "Common Criteria EAL4+", "ISO 20022"],
  },
  {
    slug: "gov",
    nameEn: "Government & ID",
    nameZh: "政务与身份",
    icon: "Fingerprint",
    taglineEn: "ICAO 9303 ePassports, eID cards and mobile driving licenses.",
    taglineZh: "ICAO 9303 电子护照、eID 卡与手机驾照。",
    introEn:
      "National ID programs from silicon to citizen: ICAO 9303 LDS2 ePassports with BAC/PACE/EAC and Active Authentication, ePolyC/PC eID cards, MRTD inspection systems, PKI/CSCA hierarchies, and ISO 18013-5 mobile driving licenses that verify offline.",
    introZh:
      "覆盖从芯片到公民的国家 ID 项目:ICAO 9303 LDS2 电子护照(BAC/PACE/EAC 与主动认证)、ePolyC/PC eID 卡、MRTD 检查系统、PKI/CSCA 层级,以及可离线验证的 ISO 18013-5 手机驾照(mDL)。",
    capabilities: [
      { titleEn: "ePassport applets", titleZh: "电子护照应用", descEn: "LDS1/LDS2, BAC, PACE-GM/IM, EAC v2, Chip Authentication.", descZh: "LDS1/LDS2、BAC、PACE-GM/IM、EAC v2、芯片认证。" },
      { titleEn: "eID & residence cards", titleZh: "eID 与居留卡", descEn: "Match-on-card fingerprint, qualified signatures (eIDAS).", descZh: "卡内指纹比对、eIDAS 合格电子签名。" },
      { titleEn: "CSCA / DS PKI", titleZh: "CSCA / DS PKI 体系", descEn: "Country Signing CA, Document Signer, ML/CRL distribution.", descZh: "国家签名 CA、文件签发者、主列表/CRL 分发。" },
      { titleEn: "Inspection systems", titleZh: "查验系统", descEn: "Border MRTD readers, live face-to-chip biometric match.", descZh: "边检 MRTD 阅读机、现场人脸-芯片生物特征比对。" },
      { titleEn: "Mobile driving license", titleZh: "手机驾照 mDL", descEn: "ISO 18013-5 mDL, offline QR/NFC engagement, selective disclosure.", descZh: "ISO 18013-5 mDL、离线 QR/NFC 交互、选择性披露。" },
      { titleEn: "Secure printing", titleZh: "安全印刷", descEn: "Datapage lamination, MLI/CLI, tactile relief, UV/IR features.", descZh: "证件页覆膜、MLI/CLI、触感浮雕、紫外/红外防伪。" },
    ],
    protocols: ["ISO/IEC 14443", "ICAO 9303", "ISO/IEC 7816-4/8/9", "ISO/IEC 18013-5 (mDL)", "eIDAS 2.0"],
    certifications: ["Common Criteria EAL5+/EAL6+", "ICAO PKD", "BSI TR-03110", "FIPS 140-3"],
  },
  {
    slug: "access",
    nameEn: "Access Control",
    nameZh: "门禁访问",
    icon: "KeyRound",
    taglineEn: "MIFARE DESFire EV3, Seos, Apple Wallet keys and mobile credentials.",
    taglineZh: "MIFARE DESFire EV3、Seos 与 Apple/Google Wallet 手机凭证。",
    introEn:
      "Modern access programs beyond legacy 125 kHz: MIFARE DESFire EV3 and HID Seos with diversified AES keys, employee badges provisioned into Apple Wallet (PassKit) and Google Wallet, NFC + BLE mobile credentials, OSDP v2.2 reader firmware, and OSS-SO cloud key management to revoke access instantly across sites.",
    introZh:
      "超越 125 kHz 老旧方案的现代门禁:采用分散 AES 密钥的 MIFARE DESFire EV3 与 HID Seos、下发至 Apple Wallet(PassKit)与 Google Wallet 的员工工牌、NFC + BLE 手机凭证、OSDP v2.2 读卡器固件,以及可跨站点即时吊销权限的 OSS-SO 云端密钥管理。",
    capabilities: [
      { titleEn: "DESFire EV3 issuance", titleZh: "DESFire EV3 发卡", descEn: "AES-128 diversified keys, AID design, LRP for post-quantum roadmap.", descZh: "AES-128 分散密钥、AID 结构设计、面向后量子的 LRP。" },
      { titleEn: "Apple Wallet keys", titleZh: "Apple Wallet 钥匙", descEn: "PassKit employee badges, VAS payload, Express Mode, ECP 2.0.", descZh: "PassKit 员工卡、VAS 载荷、快捷模式、ECP 2.0。" },
      { titleEn: "Google Wallet passes", titleZh: "Google Wallet 卡券", descEn: "Smart Tap objects, JWT signing, HCE fallback for legacy readers.", descZh: "Smart Tap 对象、JWT 签名、面向旧读卡器的 HCE 兜底。" },
      { titleEn: "OSDP readers", titleZh: "OSDP 读卡器", descEn: "OSDP v2.2 Secure Channel, firmware OTA, tamper reporting.", descZh: "OSDP v2.2 安全通道、固件 OTA、防拆报警。" },
      { titleEn: "Mobile SDK (NFC+BLE)", titleZh: "手机 SDK(NFC+BLE)", descEn: "iOS Core NFC + BLE, Android HCE, background unlock in <500ms.", descZh: "iOS Core NFC + BLE、Android HCE,后台开门 <500ms。" },
      { titleEn: "Cloud key management", titleZh: "云端密钥管理", descEn: "OSS-SO compatible, real-time revocation, audit trail export.", descZh: "兼容 OSS-SO、实时吊销、审计日志导出。" },
    ],
    protocols: ["ISO 14443-4", "MIFARE DESFire EV3", "HID Seos", "Apple ECP 2.0 / VAS", "Google Smart Tap 2", "OSDP v2.2", "BLE 5.x"],
    certifications: ["Common Criteria EAL5+", "FIPS 140-2/3", "OSS-SO", "Apple MFi Wallet"],
  },
  {
    slug: "health",
    nameEn: "Healthcare",
    nameZh: "医疗健康",
    icon: "HeartPulse",
    taglineEn: "Patient ID, e-prescriptions and cold-chain NFC monitoring.",
    taglineZh: "患者身份识别、电子处方与 NFC 冷链监测。",
    introEn:
      "HIPAA and GDPR-aligned healthcare programs: patient smart cards with match-on-card biometrics, PKI-signed e-prescriptions, clinician PIV-style badges with tap-and-PIN EHR sign-on, and NTAG 22x DNA temperature-logging labels for vaccine and biologic cold chains.",
    introZh:
      "符合 HIPAA 与 GDPR 的医疗方案:内置卡上生物比对的患者智能卡、PKI 签名的电子处方、支持轻触+PIN 登录电子病历的医护 PIV 型工牌,以及用于疫苗与生物制剂冷链的 NTAG 22x DNA 温度记录标签。",
    capabilities: [
      { titleEn: "Patient smart cards", titleZh: "患者智能卡", descEn: "Encrypted health record pointer, emergency data zone, MoC biometrics.", descZh: "加密病历指针、紧急数据区、卡上生物特征比对。" },
      { titleEn: "e-Prescription signing", titleZh: "电子处方签名", descEn: "Qualified signatures via SE, DSC audit, HL7 FHIR integration.", descZh: "SE 内的合格签名、DSC 审计、HL7 FHIR 集成。" },
      { titleEn: "Clinician badge SSO", titleZh: "医护工牌单点登录", descEn: "Tap-and-PIN into Epic/Cerner, Imprivata OneSign compatible.", descZh: "轻触+PIN 登录 Epic/Cerner,兼容 Imprivata OneSign。" },
      { titleEn: "Cold-chain NFC labels", titleZh: "冷链 NFC 标签", descEn: "NTAG 22x DNA + temp sensor, tamper-evident, cloud verification.", descZh: "NTAG 22x DNA + 温度传感器、防撕、云端验证。" },
      { titleEn: "Medical device pairing", titleZh: "医疗器械配对", descEn: "Tap-to-pair infusion pumps and monitors with EHR context.", descZh: "轻触配对输液泵与监护仪,自动带入电子病历上下文。" },
      { titleEn: "Consent & audit", titleZh: "知情同意与审计", descEn: "Cryptographically signed consent records, immutable audit log.", descZh: "密码学签名的同意记录、不可篡改审计日志。" },
    ],
    protocols: ["ISO 14443-4", "ISO 7816", "NFC Forum Type 2/4", "HL7 FHIR R4", "IHE PIX/PDQ"],
    certifications: ["HIPAA", "GDPR", "ISO 27001", "ISO 13485", "Common Criteria EAL4+"],
  },
  {
    slug: "iot",
    nameEn: "IoT & Smart Devices",
    nameZh: "物联网",
    icon: "Cpu",
    taglineEn: "NTAG 424 DNA tap-to-configure and secure onboarding at scale.",
    taglineZh: "NTAG 424 DNA 让设备一触即配,规模化安全上线。",
    introEn:
      "Zero-touch provisioning for connected products: NTAG 424 DNA + SUN for Wi-Fi/BLE credential handoff, tap-to-onboard for Matter / Thread / Zigbee, per-device X.509 birth certificates from a factory HSM, and lifecycle telemetry via signed NDEF records verified server-side.",
    introZh:
      "面向物联网产品的零接触部署:NTAG 424 DNA + SUN 完成 Wi-Fi/BLE 凭证下发、Matter / Thread / Zigbee 一触上线、由工厂 HSM 颁发的每设备 X.509 出厂证书,以及通过签名 NDEF 记录实现服务端可验证的生命周期遥测。",
    capabilities: [
      { titleEn: "Tap-to-onboard", titleZh: "一触上线", descEn: "Wi-Fi/BLE credential handoff via signed NDEF, no QR needed.", descZh: "通过签名 NDEF 完成 Wi-Fi/BLE 凭证下发,无需 QR 码。" },
      { titleEn: "Matter commissioning", titleZh: "Matter 配网", descEn: "NFC-based Matter Onboarding Payload, DAC/PAI attestation.", descZh: "基于 NFC 的 Matter 配网载荷、DAC/PAI 器件证明。" },
      { titleEn: "Factory identity", titleZh: "工厂身份", descEn: "Per-device X.509 birth cert from HSM, injected on the line.", descZh: "产线注入的 HSM 颁发的每设备 X.509 出厂证书。" },
      { titleEn: "Secure firmware update", titleZh: "安全固件升级", descEn: "Signed manifest verified in SE, rollback protection, A/B slots.", descZh: "SE 内校验签名清单、防回滚、A/B 分区。" },
      { titleEn: "Anti-clone SUN URLs", titleZh: "防克隆 SUN 链接", descEn: "Per-tap CMAC ensures only genuine devices phone home.", descZh: "每次点击 CMAC 校验,只有正品设备可回联云端。" },
      { titleEn: "Lifecycle telemetry", titleZh: "全生命周期遥测", descEn: "Tap-verified service events, warranty and re-commission.", descZh: "轻触核验的售后事件、保修与二次配网记录。" },
    ],
    protocols: ["NFC Forum Type 2/4/5", "NTAG 424 DNA (SUN/CMAC)", "Matter 1.3", "Thread 1.3", "Zigbee 3.0", "MQTT 5"],
    certifications: ["Matter Certified", "CSA Product Security Verified", "Common Criteria EAL4+", "FCC / CE / RCM"],
  },
  {
    slug: "brand",
    nameEn: "Brand Protection",
    nameZh: "品牌防伪",
    icon: "ShieldCheck",
    taglineEn: "SUN dynamic URLs stop cloning at the tap.",
    taglineZh: "SUN 动态 URL 一触验真、拒绝复制。",
    introEn:
      "Per-tap cryptographic authenticity for luxury, spirits, cosmetics and pharma: NTAG 424 DNA SUN messages with server-side CMAC verification, tamper-evident label constructions, cloud verification API with geo/velocity analytics, and consumer engagement flows (registration, reorder, loyalty).",
    introZh:
      "面向奢侈品、烈酒、化妆品与药品的每次点击密码学真伪验证:NTAG 424 DNA SUN 报文与服务端 CMAC 校验、防撕封条结构、带地理/频次分析的云端验证 API,以及消费者互动流程(注册、复购、会员)。",
    capabilities: [
      { titleEn: "SUN URL verification", titleZh: "SUN 动态链接验证", descEn: "CMAC-signed URL, per-tap counter, replay + clone detection.", descZh: "CMAC 签名 URL、每次点击计数器、防重放与克隆检测。" },
      { titleEn: "Tamper-evident labels", titleZh: "防撕封签", descEn: "Wet-inlay bottle-neck, break-on-open constructions.", descZh: "湿法瓶颈 inlay、开瓶即毁结构。" },
      { titleEn: "Verification API", titleZh: "验证 API", descEn: "REST/GraphQL, custom rules, geo & velocity risk scoring.", descZh: "REST/GraphQL、自定义规则、地理与频次风险评分。" },
      { titleEn: "Grey-market detection", titleZh: "串货识别", descEn: "First-scan geo fencing, distributor territory alerts.", descZh: "首次扫描地理围栏、经销商区域告警。" },
      { titleEn: "Consumer engagement", titleZh: "消费者互动", descEn: "Landing pages, warranty registration, reorder & loyalty.", descZh: "落地页、保修登记、复购与会员体系。" },
      { titleEn: "Supply chain traceability", titleZh: "供应链追溯", descEn: "GS1 Digital Link, EPCIS 2.0 events, batch/lot recall.", descZh: "GS1 Digital Link、EPCIS 2.0 事件、批次召回。" },
    ],
    protocols: ["NTAG 424 DNA (SUN/CMAC)", "NFC Forum Type 2/4", "GS1 Digital Link", "EPCIS 2.0"],
    certifications: ["GS1 Certified", "ISO/IEC 22383", "Common Criteria EAL4+"],
  },
  {
    slug: "retail",
    nameEn: "Retail & Loyalty",
    nameZh: "零售与会员",
    icon: "ShoppingBag",
    taglineEn: "Tap-to-earn loyalty, gift cards and closed-loop payment.",
    taglineZh: "一触即享的会员积分、礼品卡与闭环支付。",
    introEn:
      "Unified customer identity across channels: DESFire membership cards, Apple/Google Wallet loyalty passes with Smart Tap and VAS, closed-loop stored-value with EMV-style offline authentication, POS terminal integration (Verifone/Ingenico/PAX), and a real-time promotions engine.",
    introZh:
      "跨渠道统一客户身份:DESFire 会员卡、支持 Smart Tap 与 VAS 的 Apple/Google Wallet 会员卡、EMV 式离线认证的闭环储值、POS 终端集成(Verifone/Ingenico/PAX),以及实时促销引擎。",
    capabilities: [
      { titleEn: "Wallet loyalty passes", titleZh: "钱包会员卡", descEn: "Smart Tap (Google) + VAS (Apple), auto-update tier & points.", descZh: "Smart Tap(Google)+ VAS(Apple),自动更新等级与积分。" },
      { titleEn: "Stored-value & gift", titleZh: "储值与礼品卡", descEn: "Offline-capable purse, MAC-protected top-up, fraud rules.", descZh: "支持离线的电子钱包、MAC 保护充值、风控规则。" },
      { titleEn: "POS integration", titleZh: "POS 集成", descEn: "Verifone, Ingenico, PAX; NEXO, Nayax and cEMV kernels.", descZh: "Verifone、Ingenico、PAX;NEXO、Nayax 与 cEMV 内核。" },
      { titleEn: "Promotions engine", titleZh: "促销引擎", descEn: "Real-time coupons at the tap, per-store rules, A/B tests.", descZh: "轻触即得的实时优惠券、门店规则、A/B 测试。" },
      { titleEn: "Unified customer ID", titleZh: "统一客户 ID", descEn: "Merge POS, e-com and app identities into one profile.", descZh: "合并 POS、电商与 App 身份为统一客户档案。" },
      { titleEn: "Reconciliation", titleZh: "对账与清分", descEn: "Daily settlement, chargeback tools, GAAP-ready exports.", descZh: "日终结算、拒付处理、可对接会计系统的导出。" },
    ],
    protocols: ["MIFARE DESFire EV3", "Apple VAS / ECP 2.0", "Google Smart Tap 2", "cEMV Kernel 2-7", "NEXO retailer protocols"],
    certifications: ["EMVCo L2", "PCI DSS", "Google Smart Tap Certified", "Apple Wallet Partner"],
  },
  {
    slug: "auto",
    nameEn: "Automotive",
    nameZh: "汽车",
    icon: "Car",
    taglineEn: "CCC Digital Key 3.0: UWB + NFC + BLE, Apple & Google ready.",
    taglineZh: "CCC 数字车钥匙 3.0:UWB + NFC + BLE,支持 Apple 与 Google。",
    introEn:
      "Digital key architectures aligned with Car Connectivity Consortium (CCC) Digital Key Release 3.0: UWB ranging for hands-free entry, NFC fallback for dead phones, BLE for proximity wake, in-vehicle Secure Element, OEM key sharing via Apple Wallet and Google Wallet, and personalization tooling for the assembly line.",
    introZh:
      "符合车联网联盟(CCC)数字车钥匙 R3.0 的完整架构:UWB 测距实现无感进入、NFC 作为手机没电时的兜底、BLE 用于近场唤醒、车载 Secure Element、通过 Apple Wallet 与 Google Wallet 的整车厂钥匙分享,以及面向总装线的个人化工具。",
    capabilities: [
      { titleEn: "CCC Digital Key R3.0", titleZh: "CCC 数字钥匙 R3.0", descEn: "Owner pairing, key sharing, revocation, secure ranging.", descZh: "车主配对、钥匙分享、吊销、安全测距。" },
      { titleEn: "UWB secure ranging", titleZh: "UWB 安全测距", descEn: "IEEE 802.15.4z HRP, cm-level distance bounding.", descZh: "IEEE 802.15.4z HRP、厘米级距离限定。" },
      { titleEn: "NFC fallback", titleZh: "NFC 兜底方案", descEn: "Tap the door handle to unlock when phone battery is dead.", descZh: "手机没电时轻触门把手即可开锁。" },
      { titleEn: "In-vehicle SE", titleZh: "车载 SE", descEn: "AEC-Q100 grade, hosts CCC applets and OEM credentials.", descZh: "AEC-Q100 等级,承载 CCC 应用与整车厂凭证。" },
      { titleEn: "OEM cloud & TSM", titleZh: "整车厂云端与 TSM", descEn: "Key provisioning, over-the-air update, sharing service.", descZh: "钥匙下发、OTA 升级、钥匙分享服务。" },
      { titleEn: "Assembly line tools", titleZh: "总装线工具", descEn: "Line-side HSM, per-VIN key injection, quality gates.", descZh: "线边 HSM、按 VIN 密钥注入、质量门控。" },
    ],
    protocols: ["CCC Digital Key R3.0", "UWB (IEEE 802.15.4z)", "NFC Forum Type 4", "BLE 5.3", "ISO 21434"],
    certifications: ["CCC Certified", "Common Criteria EAL5+ (SE)", "ISO/SAE 21434", "AEC-Q100"],
  },
  {
    slug: "wallet",
    nameEn: "Mobile Wallet & Digital Credentials",
    nameZh: "手机钱包与数字凭证",
    icon: "Smartphone",
    taglineEn: "Apple Wallet PassKit, Google Wallet and ISO 18013-5 mDoc.",
    taglineZh: "Apple Wallet PassKit、Google Wallet 与 ISO 18013-5 mDoc。",
    introEn:
      "Pass issuance and verification across every major wallet: Apple PassKit passes (boarding, event, coupon, generic, ID) with VAS and ECP 2.0, Google Wallet passes with Smart Tap 2 payloads, ISO 18013-5 mobile driving licenses, W3C Verifiable Credentials, and terminal-side verification SDKs.",
    introZh:
      "覆盖主流钱包的卡券发行与验证:Apple PassKit 卡券(登机牌、活动、优惠券、通用、身份证件)含 VAS 与 ECP 2.0、带 Smart Tap 2 载荷的 Google Wallet 卡券、ISO 18013-5 手机驾照、W3C 可验证凭证,以及终端侧验证 SDK。",
    capabilities: [
      { titleEn: "Apple PassKit issuance", titleZh: "Apple PassKit 发行", descEn: "All 5 pass types, personalization, APNs auto-update.", descZh: "全部 5 种卡券类型、个人化、APNs 自动更新。" },
      { titleEn: "Google Wallet passes", titleZh: "Google Wallet 卡券", descEn: "Class/object API, JWT signing, Smart Tap 2 payloads.", descZh: "Class/Object API、JWT 签名、Smart Tap 2 载荷。" },
      { titleEn: "VAS & ECP 2.0", titleZh: "VAS 与 ECP 2.0", descEn: "Merchant/reader configuration for Express Mode payments.", descZh: "面向快捷模式支付的商户/读卡器配置。" },
      { titleEn: "mDL / mDoc (ISO 18013)", titleZh: "mDL / mDoc(ISO 18013)", descEn: "18013-5 device retrieval + 18013-7 remote presentation.", descZh: "18013-5 设备端呈现 + 18013-7 远程呈现。" },
      { titleEn: "Verifiable credentials", titleZh: "可验证凭证", descEn: "W3C VC + SD-JWT, OpenID4VP/VCI for issuers & verifiers.", descZh: "W3C VC + SD-JWT、面向发行方与验证方的 OpenID4VP/VCI。" },
      { titleEn: "Verifier SDKs", titleZh: "验证方 SDK", descEn: "iOS/Android reader SDK, offline trust list, revocation.", descZh: "iOS/Android 读卡端 SDK、离线信任列表、吊销。" },
    ],
    protocols: ["Apple PassKit", "Apple VAS / ECP 2.0", "Google Smart Tap 2", "ISO 18013-5 / 18013-7", "W3C VC 2.0", "OpenID4VP / OpenID4VCI"],
    certifications: ["Apple Wallet Partner", "Google Smart Tap Certified", "ISO 18013 conformance", "eIDAS 2.0 (EUDI)"],
  },
  {
    slug: "security",
    nameEn: "Security & Crypto Wallet",
    nameZh: "安全与加密货币钱包",
    icon: "ShieldCheck",
    taglineEn: "FIDO2 / Passkey security keys and hardware crypto wallets.",
    taglineZh: "FIDO2 / Passkey 安全密钥与硬件加密货币钱包。",
    introEn:
      "Phishing-resistant authentication and self-custody built on CC EAL6+ Secure Elements: FIDO2 / WebAuthn security keys with device-bound passkeys, on-card secp256k1 / ed25519 signing for Bitcoin, Ethereum, Solana and EVM chains, BIP-32/39/44 HD wallets, and NFC/USB cold-backup cards for seed and shard storage (SSSS / Shamir).",
    introZh:
      "基于 CC EAL6+ 安全元件的抗钓鱼身份认证与自托管方案:FIDO2 / WebAuthn 安全密钥与设备绑定 Passkey、卡内 secp256k1 / ed25519 签名(支持比特币、以太坊、Solana 与 EVM 链)、BIP-32/39/44 HD 钱包,以及用于种子与分片存储(SSSS / Shamir)的 NFC/USB 冷备份卡。",
    capabilities: [
      { titleEn: "FIDO2 / WebAuthn keys", titleZh: "FIDO2 / WebAuthn 密钥", descEn: "USB-C / NFC / Lightning, resident keys, PIN + biometric.", descZh: "USB-C / NFC / Lightning、常驻凭证、PIN + 生物识别。" },
      { titleEn: "Device-bound passkeys", titleZh: "设备绑定 Passkey", descEn: "Non-syncable passkeys for high-assurance enterprise SSO.", descZh: "不可同步的 Passkey,面向高保障企业 SSO。" },
      { titleEn: "On-card crypto signing", titleZh: "卡内加密签名", descEn: "secp256k1, ed25519, EdDSA, Schnorr; PSBT & EIP-712.", descZh: "secp256k1、ed25519、EdDSA、Schnorr;PSBT 与 EIP-712。" },
      { titleEn: "HD wallet & seed", titleZh: "HD 钱包与种子", descEn: "BIP-32/39/44/85, key never leaves the SE, no export.", descZh: "BIP-32/39/44/85,密钥永不离开 SE,不可导出。" },
      { titleEn: "Cold-backup cards", titleZh: "冷备份卡", descEn: "NFC seed shard cards, SLIP-39 / Shamir Secret Sharing.", descZh: "NFC 种子分片卡、SLIP-39 / Shamir 秘密分享。" },
      { titleEn: "Enterprise MDM", titleZh: "企业 MDM 管理", descEn: "Zero-touch enrollment, revocation, audit for 10k+ keys.", descZh: "零接触激活、吊销、面向 10k+ 密钥的审计。" },
    ],
    protocols: ["FIDO2 / CTAP2.1", "WebAuthn L3", "PIV (NIST SP 800-73)", "OpenPGP card", "BIP-32/39/44/85", "SLIP-39"],
    certifications: ["FIDO L2 Authenticator", "Common Criteria EAL6+", "FIPS 140-3 Level 3", "PCI PTS"],
  },
  {
    slug: "edu",
    nameEn: "Education & Campus",
    nameZh: "教育与校园",
    icon: "Boxes",
    taglineEn: "One-card campus for library, cafeteria, dorm access and payment.",
    taglineZh: "一卡通覆盖图书馆、食堂、宿舍门禁与消费。",
    introEn:
      "Unified student credentials across the whole campus: DESFire EV3 one-card for library, cafeteria stored value, dorm access and printing quota, mobile student IDs in Apple Wallet and Google Wallet, attendance readers, and back-office integration with SIS (Ellucian, Workday Student).",
    introZh:
      "覆盖整个校园的统一学生凭证:用于图书馆、食堂储值、宿舍门禁与打印额度的 DESFire EV3 一卡通、Apple Wallet 与 Google Wallet 内的手机学生证、考勤读卡器,以及与 SIS(Ellucian、Workday Student)的后台对接。",
    capabilities: [
      { titleEn: "One-card issuance", titleZh: "一卡通发行", descEn: "DESFire EV3 with library, meal, access, print AIDs.", descZh: "DESFire EV3 承载图书馆、餐饮、门禁、打印多个 AID。" },
      { titleEn: "Mobile student ID", titleZh: "手机学生证", descEn: "Apple Wallet + Google Wallet passes with photo & barcode.", descZh: "Apple Wallet + Google Wallet 卡券,含照片与条码。" },
      { titleEn: "Cafeteria & vending", titleZh: "餐饮与自助售货", descEn: "Offline stored value, subsidy programs, dietary rules.", descZh: "离线储值、补贴计划、饮食规则。" },
      { titleEn: "Attendance & exams", titleZh: "考勤与考试", descEn: "Tap-in class attendance, exam seat verification.", descZh: "轻触到课、考场座位核验。" },
      { titleEn: "Dorm & lab access", titleZh: "宿舍与实验室门禁", descEn: "Time-based access, buddy rules, alarm on tailgate.", descZh: "按时段开门、结对规则、尾随报警。" },
      { titleEn: "SIS integration", titleZh: "教务系统集成", descEn: "Ellucian, Workday Student, SIF/Ed-Fi data pipelines.", descZh: "Ellucian、Workday Student、SIF/Ed-Fi 数据管道。" },
    ],
    protocols: ["MIFARE DESFire EV3", "Apple VAS", "Google Smart Tap 2", "ISO 14443-4", "SIF / Ed-Fi"],
    certifications: ["FERPA aligned", "ISO 27001", "Common Criteria EAL4+"],
  },
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
    capabilities: i.capabilities.map((c) => ({
      title: locale === "zh" ? c.titleZh : c.titleEn,
      description: locale === "zh" ? c.descZh : c.descEn,
    })),
    deliverables: [],
    protocols: i.protocols,
    certifications: i.certifications,
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
