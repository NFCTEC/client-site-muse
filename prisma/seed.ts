import bcrypt from "bcryptjs";
import { PrismaClient, type Prisma } from "@prisma/client";
import { ensureArticles } from "./seed-articles";

const prisma = new PrismaClient();

async function main() {
  await upsertAdmin();
  await ensureSocialLinks();
  if ((await prisma.technology.count()) > 0) {
    await ensureArticles(prisma);
    console.log("Content already present, skipped catalog seed.");
    return;
  }
  const tech = await seedTechnologies();
  const solutions = await seedSolutions();
  const products = await seedProducts();
  await seedTools(products, tech);
  await linkSolutions(solutions, tech, products);
  await seedPages();
  await seedNavigation();
  await ensureSocialLinks();
  await seedHomepage();
  await ensureArticles(prisma);
  console.log("Seeded NFCTEC catalog.");
}

async function ensureSocialLinks() {
  const company = await prisma.navItem.findFirst({
    where: {
      location: "FOOTER",
      href: "/about",
      parentId: null,
    },
  });
  if (!company) return;

  const links = [
    { href: "https://www.youtube.com/@NFCTEC", previous: ["https://youtube.com/@lejuntech"], sortOrder: 55, label: "YouTube" },
    { href: "https://www.amazon.com/s?k=SZLEJUN&ref=bl_dp_s_web_0", previous: [], sortOrder: 56, label: "Amazon" },
  ];

  for (const link of links) {
    const existing = await prisma.navItem.findFirst({
      where: { location: "FOOTER", parentId: company.id, href: { in: [link.href, ...link.previous] } },
    });
    if (existing) {
      await prisma.navItem.update({
        where: { id: existing.id },
        data: { href: link.href, external: true, visible: true, sortOrder: link.sortOrder },
      });
      continue;
    }
    await prisma.navItem.create({
      data: {
        location: "FOOTER",
        href: link.href,
        external: true,
        sortOrder: link.sortOrder,
        parentId: company.id,
        translations: {
          create: [
            { locale: "en", label: link.label },
            { locale: "zh", label: link.label },
          ],
        },
      },
    });
  }
}

async function upsertAdmin() {
  const email = (process.env.ADMIN_EMAIL || "admin@nfctec.local").toLowerCase();
  const password = process.env.ADMIN_PASSWORD;
  if (!password) {
    console.warn("ADMIN_PASSWORD is empty, admin user was not created.");
    return;
  }
  const passwordHash = await bcrypt.hash(password, 12);
  await prisma.user.upsert({
    where: { email },
    update: { name: process.env.ADMIN_NAME || "NFCTEC Admin" },
    create: {
      email,
      name: process.env.ADMIN_NAME || "NFCTEC Admin",
      passwordHash,
      role: "SUPER_ADMIN",
    },
  });
}

type Copy = { name: string; description: string; capabilities: string[] };

async function seedTechnologies() {
  const rows: {
    slug: string;
    category: "NFC_RF" | "SMART_CARDS" | "SECURITY_IDENTITY";
    parent?: string;
    sort: number;
    protocols: string[];
    chips: string[];
    en: Copy;
    zh: Copy;
  }[] = [
    {
      slug: "nfc-rf",
      category: "NFC_RF",
      sort: 1,
      protocols: ["NFC", "RFID", "ISO/IEC 14443", "ISO/IEC 15693", "NFC Forum", "NDEF"],
      chips: ["PN5180", "PN7150", "ST25R3916"],
      en: {
        name: "NFC & RF",
        description: "Radio interfaces, NFC protocols, antennas, reader controllers and the firmware that lets a reader talk to a card.",
        capabilities: ["RF design", "NFC antennas", "Reader firmware", "RF testing and diagnostics", "Embedded NFC"],
      },
      zh: {
        name: "NFC 与射频",
        description: "射频接口、NFC 协议、天线、读卡控制器，以及让读卡器与卡片通信的固件。",
        capabilities: ["射频设计", "NFC 天线", "读卡器固件", "射频测试与诊断", "嵌入式 NFC"],
      },
    },
    {
      slug: "smart-cards",
      category: "SMART_CARDS",
      sort: 2,
      protocols: ["JavaCard", "GlobalPlatform", "SCP02", "SCP03", "EMV", "APDU", "PC/SC", "DESFire EV2/EV3", "MIFARE", "FeliCa", "PIV"],
      chips: [],
      en: {
        name: "Smart Cards",
        description: "Card operating systems, application protocols and the path from personalization to issuance.",
        capabilities: ["Card personalization", "Card issuance", "APDU exchange", "Secure smart cards"],
      },
      zh: {
        name: "智能卡",
        description: "卡片操作系统、应用协议，以及从个人化到发行的实现路径。",
        capabilities: ["卡片个人化", "卡片发行", "APDU 交换", "安全智能卡"],
      },
    },
    {
      slug: "security-identity",
      category: "SECURITY_IDENTITY",
      sort: 3,
      protocols: ["AES", "3DES", "RSA", "ECC", "FIDO2", "WebAuthn", "ICAO 9303", "PACE", "BAC", "EAC"],
      chips: ["SE050", "SE051", "NTAG 424 DNA"],
      en: {
        name: "Security & Identity",
        description: "Cryptography, key infrastructure, secure elements and identity credentials used together with NFC and smart cards.",
        capabilities: ["Cryptography", "HSM", "Secure Element", "PKI", "FIDO2", "Digital identity", "NFC security"],
      },
      zh: {
        name: "安全与身份",
        description: "与 NFC、智能卡一起使用的密码学、密钥基础设施、安全元件和身份凭证。",
        capabilities: ["密码学", "HSM", "安全元件", "PKI", "FIDO2", "数字身份", "NFC 安全"],
      },
    },
    child("cryptography", 1, ["AES", "3DES", "RSA", "ECC", "CMAC"], [], {
      en: ["Cryptography", "Encryption, signatures, hashing and key derivation used inside card, reader and cloud protocols.", ["AES", "3DES", "RSA", "ECC", "CMAC", "Secure messaging", "Digital signatures"]],
      zh: ["密码学", "用于卡片、读卡器和云协议内部的加密、签名、散列与密钥派生。", ["AES", "3DES", "RSA", "ECC", "CMAC", "安全报文", "数字签名"]],
    }),
    child("hsm", 2, ["PKCS#11"], [], {
      en: ["HSM", "Hardware security modules for key storage, provisioning and operations that should not live in application memory.", ["Key provisioning", "Key rotation", "Secure storage"]],
      zh: ["HSM", "用于密钥保存、注入和运算的硬件安全模块，避免密钥只放在应用内存里。", ["密钥注入", "密钥轮换", "安全存储"]],
    }),
    child("secure-element", 3, [], ["SE050", "SE051"], {
      en: ["Secure Element", "A hardware root for device keys and credentials, including secure elements such as SE050 and SE051.", ["Hardware-backed security", "Credential storage"]],
      zh: ["安全元件", "为设备密钥和凭证提供硬件根，包括 SE050、SE051 这一类安全元件。", ["硬件保护的安全", "凭证存储"]],
    }),
    child("pki", 4, ["X.509"], [], {
      en: ["PKI & Key Management", "Certificates, key lifetimes and the provisioning flow that connects cards, devices and backend services.", ["Key management", "Credential management"]],
      zh: ["PKI 与密钥管理", "证书、密钥生命周期，以及把卡片、设备和后台连起来的注入流程。", ["密钥管理", "凭证管理"]],
    }),
    child("fido2", 5, ["FIDO2", "WebAuthn", "CTAP"], [], {
      en: ["FIDO2 / WebAuthn", "Phishing-resistant authentication for users and devices, including FIDO2 and WebAuthn.", ["Device authentication", "Credential authentication"]],
      zh: ["FIDO2 / WebAuthn", "面向用户和设备的抗钓鱼认证，包括 FIDO2 与 WebAuthn。", ["设备认证", "凭证认证"]],
    }),
    child("digital-identity", 6, ["ICAO 9303", "BAC", "PACE", "EAC", "PIV"], [], {
      en: ["Digital Identity", "Travel documents and enterprise credentials, including ePassport, ICAO 9303 and PIV.", ["ePassport", "Credential issuance", "Credential verification"]],
      zh: ["数字身份", "旅行证件与企业凭证，包括 ePassport、ICAO 9303 和 PIV。", ["ePassport", "凭证发行", "凭证核验"]],
    }),
    child("nfc-security", 7, ["SUN"], ["NTAG 424 DNA"], {
      en: ["NFC Security", "Secure NFC tags and authentication messages, including NTAG 424 DNA and SUN.", ["Authentication tags", "Anti-counterfeit verification"]],
      zh: ["NFC 安全", "安全 NFC 标签与认证报文，包括 NTAG 424 DNA 和 SUN。", ["认证标签", "防伪核验"]],
    }),
  ];

  const ids = new Map<string, string>();
  for (const row of rows.filter((item) => !item.parent)) {
    ids.set(row.slug, await createTechnology(row, null));
  }
  for (const row of rows.filter((item) => item.parent)) {
    ids.set(row.slug, await createTechnology(row, ids.get(row.parent!)!));
  }
  return ids;
}

function child(
  slug: string,
  sort: number,
  protocols: string[],
  chips: string[],
  copy: { en: [string, string, string[]]; zh: [string, string, string[]] },
) {
  return {
    slug,
    category: "SECURITY_IDENTITY" as const,
    parent: "security-identity",
    sort,
    protocols,
    chips,
    en: { name: copy.en[0], description: copy.en[1], capabilities: copy.en[2] },
    zh: { name: copy.zh[0], description: copy.zh[1], capabilities: copy.zh[2] },
  };
}

async function createTechnology(
  row: {
    slug: string;
    category: "NFC_RF" | "SMART_CARDS" | "SECURITY_IDENTITY";
    sort: number;
    protocols: string[];
    chips: string[];
    en: Copy;
    zh: Copy;
  },
  parentId: string | null,
) {
  const created = await prisma.technology.create({
    data: {
      category: row.category,
      parentId,
      status: "PUBLISHED",
      featured: !parentId,
      sortOrder: row.sort,
      protocols: row.protocols,
      chips: row.chips,
      translations: {
        create: (["en", "zh"] as const).map((locale) => ({
          locale,
          name: row[locale].name,
          slug: row.slug,
          description: row[locale].description,
          capabilities: row[locale].capabilities,
          seoTitle: row[locale].name,
          seoDescription: row[locale].description,
        })),
      },
    },
  });
  return created.id;
}

async function seedSolutions() {
  const items = [
    solution("payment", "PAYMENT", 1, "Payment", "支付", "Card payment and personalization engineering.", "卡片支付与个人化工程。", {
      en: [
        "Payment projects need a card application, a personalization path and a reader that can exchange EMV and smart-card APDUs.",
        "NFCTEC engineers the reader, card software and personalization flow used to build and issue payment cards.",
        "A card application sits on Java Card and GlobalPlatform. Readers expose PC/SC or an SDK. Issuance can be driven from a backend API when the project needs it.",
        "Secure channel protocols and key management belong in issuance. This site does not state a certification level.",
        "Start with a prototype reader and card, then firmware, personalization and production issuance.",
        ["Card personalization", "Payment reader integration", "EMV application development"],
      ],
      zh: [
        "支付项目需要卡应用、个人化路径，以及能够交换 EMV 和智能卡 APDU 的读卡器。",
        "NFCTEC 负责读卡器、卡软件和个人化流程，用来开发和发行支付卡。",
        "卡应用跑在 Java Card 和 GlobalPlatform 上。读卡器通过 PC/SC 或 SDK 暴露接口。需要集中控制时，可以由后台 API 驱动发行。",
        "安全通道和密钥管理是发行的一部分。本站不宣称任何认证等级。",
        "先做读卡器和卡片原型，再进入固件、个人化和量产发行。",
        ["卡片个人化", "支付读卡器集成", "EMV 应用开发"],
      ],
    }),
    solution("identity", "IDENTITY", 2, "Identity", "身份", "Credentials, ePassport and FIDO2.", "凭证、ePassport 与 FIDO2。", {
      en: [
        "Identity projects have to issue a credential and later prove it, across a card, a document or a FIDO authenticator.",
        "NFCTEC engineers the reader, card or secure-element path and the verification step behind it.",
        "A credential is issued to a card, secure element or authenticator. A reader or API checks it.",
        "Keys stay in a card, secure element or HSM. Verification does not require the private key to be copied into the page.",
        "Prototype the credential and reader, then connect issuance and verification services.",
        ["ePassport inspection", "PIV credential use", "FIDO2 registration and sign-in"],
      ],
      zh: [
        "身份项目要先发行凭证，再在卡片、证件或 FIDO 认证器上完成核验。",
        "NFCTEC 负责读卡器、卡片或安全元件路径，以及后面的核验步骤。",
        "凭证发到卡片、安全元件或认证器。读卡器或 API 负责检查。",
        "密钥留在卡片、安全元件或 HSM 中。核验不需要把私钥复制到页面里。",
        "先做凭证和读卡器原型，再接上发行与核验服务。",
        ["ePassport 查验", "PIV 凭证使用", "FIDO2 注册与登录"],
      ],
    }),
    solution("access-control", "ACCESS_CONTROL", 3, "Access Control", "门禁", "Readers and credentials for access.", "门禁读卡器与凭证。", {
      en: [
        "Access projects fail when the reader, card and controller do not share a credential model.",
        "NFCTEC engineers NFC and smart-card readers, credential data and the link to an access controller.",
        "A reader speaks ISO/IEC 14443 to DESFire, MIFARE or FeliCa media, then passes a result toward a controller. OSDP is part of that reader-to-controller conversation when the project uses it.",
        "Credential keys and application settings are provisioned, not left at factory defaults.",
        "Prove the card and reader together, then connect the controller and a credential update path.",
        ["Door readers", "DESFire credentials", "Controller integration"],
      ],
      zh: [
        "读卡器、卡片和控制器如果没有统一的凭证模型，门禁项目就会对不上。",
        "NFCTEC 负责 NFC 和智能卡读卡器、凭证数据，以及与门禁控制器的连接。",
        "读卡器通过 ISO/IEC 14443 访问 DESFire、MIFARE 或 FeliCa，再把结果交给控制器。项目需要时，读卡器到控制器可以使用 OSDP。",
        "凭证密钥和应用配置需要注入，而不是停留在出厂默认值。",
        "先把卡片和读卡器跑通，再连接控制器和凭证更新路径。",
        ["门禁读卡器", "DESFire 凭证", "控制器集成"],
      ],
    }),
    solution("brand-protection", "BRAND_PROTECTION", 4, "Brand Protection", "品牌保护", "Secure tags and product authentication.", "安全标签与产品认证。", {
      en: [
        "A public NFC tag can be copied. Brand protection needs a tag that can prove itself.",
        "NFCTEC engineers secure NFC tags such as NTAG 424 DNA, SUN messages and a verification service.",
        "The tag produces an authentication message. A phone or reader sends it to a verification API. The result is tied to that product item.",
        "The authentication key is not printed on the tag. Verification happens server-side.",
        "Personalize tags, publish the verification endpoint, then test with the production tag encoding.",
        ["Product authentication", "Anti-counterfeit tags", "Cloud verification"],
      ],
      zh: [
        "普通 NFC 标签可以被复制。品牌保护需要标签能够证明自己。",
        "NFCTEC 负责 NTAG 424 DNA 这类安全标签、SUN 报文和核验服务。",
        "标签生成认证报文。手机或读卡器把它交给核验 API。结果对应到具体产品。",
        "认证密钥不会印在标签上。核验在服务端完成。",
        "先个人化标签，发布核验接口，再用量产编码做测试。",
        ["产品认证", "防伪标签", "云核验"],
      ],
    }),
    solution("transit", "TRANSIT", 5, "Transit", "交通", "Fare media and ticket validation.", "票卡介质与验票。", {
      en: [
        "Transit needs fare media, a reader that can validate it quickly, and a way to issue or update that media.",
        "NFCTEC engineers the reader, the card or token, and the validation path.",
        "A gate or validator reader checks the fare media. Issuance and updates can sit behind an API.",
        "Ticket keys and secure messaging follow the card scheme used by the project.",
        "Prototype the media and reader, then connect validation to the back office.",
        ["NFC ticketing", "Fare media", "Ticket validation"],
      ],
      zh: [
        "交通系统需要票卡介质、能够完成验票的读卡器，以及发行或更新介质的方法。",
        "NFCTEC 负责读卡器、卡片或令牌，以及验票路径。",
        "闸机或验票读卡器检查票卡。发行和更新可以放在 API 后面。",
        "票卡密钥和安全报文遵循项目采用的卡片方案。",
        "先做介质和读卡器原型，再把验票接到后台。",
        ["NFC 票务", "票卡介质", "验票"],
      ],
    }),
    solution("iot", "IOT", 6, "IoT", "物联网", "Commissioning and device identity.", "设备开通与设备身份。", {
      en: [
        "A connected device still needs a safe way to receive its identity and configuration.",
        "NFCTEC uses NFC to commission a device and a secure element to hold its identity.",
        "A phone or reader writes configuration over NFC. The device key stays in a secure element. A cloud service can check that identity later.",
        "Commissioning does not leave the device key in the mobile app.",
        "Prototype the tap, then the device credential, then the cloud check.",
        ["Device commissioning", "Secure device identity", "Embedded NFC"],
      ],
      zh: [
        "联网设备仍然需要一种安全的方式接收身份和配置。",
        "NFCTEC 用 NFC 完成设备开通，用安全元件保存设备身份。",
        "手机或读卡器通过 NFC 写入配置。设备密钥留在安全元件里。云服务可以在之后核验这个身份。",
        "开通过程不会把设备密钥留在手机应用里。",
        "先做贴卡开通，再做设备凭证，然后做云端核验。",
        ["设备开通", "安全的设备身份", "嵌入式 NFC"],
      ],
    }),
  ];
  const ids = new Map<string, string>();
  for (const item of items) {
    const created = await prisma.solution.create({
      data: {
        category: item.category,
        status: "PUBLISHED",
        sortOrder: item.sort,
        translations: {
          create: (["en", "zh"] as const).map((locale) => {
            const copy = item[locale];
            return {
              locale,
              name: copy.name,
              slug: item.slug,
              heroTitle: copy.name,
              heroDescription: copy.hero,
              problem: copy.blocks[0],
              solutionText: copy.blocks[1],
              architecture: copy.blocks[2],
              security: copy.blocks[3],
              deployment: copy.blocks[4],
              useCases: copy.blocks[5],
              seoTitle: copy.name,
              seoDescription: copy.hero,
            };
          }),
        },
      },
    });
    ids.set(item.slug, created.id);
  }
  return ids;
}

function solution(
  slug: string,
  category: "PAYMENT" | "IDENTITY" | "ACCESS_CONTROL" | "BRAND_PROTECTION" | "TRANSIT" | "IOT",
  sort: number,
  enName: string,
  zhName: string,
  enHero: string,
  zhHero: string,
  blocks: { en: [string, string, string, string, string, string[]]; zh: [string, string, string, string, string, string[]] },
) {
  return {
    slug,
    category,
    sort,
    en: { name: enName, hero: enHero, blocks: blocks.en },
    zh: { name: zhName, hero: zhHero, blocks: blocks.zh },
  };
}

async function seedProducts() {
  const items: Prisma.ProductCreateInput[] = [
    product("reader-sdk", "SOFTWARE", 1, true, ["ISO/IEC 14443", "ISO/IEC 15693", "NFC Forum"], [], ["Windows", "Linux", "Android"], {
      en: ["Reader SDK", "Libraries for discovering a reader, detecting a card and exchanging APDUs.", "A reader SDK for Windows, Linux and Android. It covers reader discovery, card detection, APDU exchange, NDEF and diagnostics over USB, serial or PC/SC.", ["Reader discovery", "Card detection", "APDU exchange", "NDEF", "Smart-card communication", "Diagnostics"], [{ label: "Interfaces", value: "USB, Serial, PC/SC" }]],
      zh: ["读卡器 SDK", "用于发现读卡器、检测卡片并交换 APDU 的软件库。", "面向 Windows、Linux 和 Android 的读卡器 SDK。覆盖读卡器发现、卡片检测、APDU 交换、NDEF 和诊断，接口为 USB、串口或 PC/SC。", ["读卡器发现", "卡片检测", "APDU 交换", "NDEF", "智能卡通信", "诊断"], [{ label: "接口", value: "USB、串口、PC/SC" }]],
    }),
    product("smart-card-sdk", "SOFTWARE", 2, true, ["JavaCard", "GlobalPlatform", "APDU", "PC/SC"], [], ["Windows", "Linux"], {
      en: ["Smart Card SDK", "Libraries for Java Card, GlobalPlatform and PC/SC application work.", "Used to talk to card applications, prepare personalization commands and inspect APDU exchanges.", ["APDU exchange", "GlobalPlatform secure channel", "Card application development"], []],
      zh: ["智能卡 SDK", "用于 Java Card、GlobalPlatform 和 PC/SC 应用开发的软件库。", "用来访问卡应用、准备个人化指令，并查看 APDU 交换。", ["APDU 交换", "GlobalPlatform 安全通道", "卡应用开发"], []],
    }),
    product("personalization-tools", "SOFTWARE", 3, false, ["GlobalPlatform", "JavaCard"], [], ["Windows"], {
      en: ["Personalization Tools", "Desktop tools for preparing and checking card personalization data.", "Operators use these tools to load card data and review the result before a production issuance run.", ["Data preparation", "Personalization review"], []],
      zh: ["个人化工具", "用于准备和检查卡片个人化数据的桌面工具。", "操作人员在量产发行前用这些工具装载卡片数据并核对结果。", ["数据准备", "个人化核对"], []],
    }),
    product("nfc-readers", "HARDWARE", 4, true, ["ISO/IEC 14443", "ISO/IEC 15693", "NFC Forum"], ["PN5180", "PN7150", "ST25R3916"], ["USB", "Serial", "CCID"], {
      en: ["NFC Readers", "Reader hardware for USB, serial and CCID integration.", "Engineering for desk readers and embedded readers. Controller work includes PN5180, PN7150 and ST25R3916 designs.", ["Card detection", "APDU exchange", "Host interfaces"], [{ label: "Host interfaces", value: "USB, Serial, CCID" }]],
      zh: ["NFC 读卡器", "用于 USB、串口和 CCID 集成的读卡器硬件。", "包括桌面读卡器和嵌入式读卡器。控制器工程覆盖 PN5180、PN7150 和 ST25R3916。", ["卡片检测", "APDU 交换", "主机接口"], [{ label: "主机接口", value: "USB、串口、CCID" }]],
    }),
    product("embedded-nfc-modules", "HARDWARE", 5, false, ["ISO/IEC 14443", "NFC Forum"], [], ["UART", "SPI", "I2C"], {
      en: ["Embedded NFC Modules", "Modules and antennas for products that need NFC inside the device.", "Used when a host such as ESP32 or STM32 must commission, configure or authenticate over NFC.", ["Antenna matching", "Host integration", "Firmware interface"], []],
      zh: ["嵌入式 NFC 模块", "放进设备内部的模块和天线。", "当 ESP32 或 STM32 等主机需要通过 NFC 开通、配置或认证时使用。", ["天线匹配", "主机集成", "固件接口"], []],
    }),
    product("credential-apis", "CLOUD", 6, true, ["REST"], [], ["HTTPS"], {
      en: ["Credential APIs", "Issuance and verification APIs for credentials and NFC authentication results.", "A project backend can request issuance or submit a verification payload. Keys stay with the key-management service, not in the browser.", ["Issuance", "Verification", "Credential status"], []],
      zh: ["凭证 API", "用于凭证发行和 NFC 认证结果核验的 API。", "项目后台可以请求发行，或提交核验数据。密钥留在密钥管理服务中，不放在浏览器里。", ["发行", "核验", "凭证状态"], []],
    }),
  ];
  const ids = new Map<string, string>();
  for (const item of items) {
    const created = await prisma.product.create({ data: item });
    const en = item.translations?.create;
    const slug = Array.isArray(en) ? en[0]?.slug : undefined;
    if (slug) ids.set(slug, created.id);
  }
  const links: [string, string][] = [
    ["reader-sdk", "nfc-rf"],
    ["reader-sdk", "smart-cards"],
    ["smart-card-sdk", "smart-cards"],
    ["personalization-tools", "smart-cards"],
    ["nfc-readers", "nfc-rf"],
    ["embedded-nfc-modules", "nfc-rf"],
    ["credential-apis", "security-identity"],
  ];
  const tech = await prisma.technologyTranslation.findMany({ where: { locale: "en" }, select: { slug: true, technologyId: true } });
  const techBySlug = new Map(tech.map((item) => [item.slug, item.technologyId]));
  await prisma.productTechnology.createMany({
    data: links
      .filter(([productSlug, techSlug]) => ids.has(productSlug) && techBySlug.has(techSlug))
      .map(([productSlug, techSlug]) => ({ productId: ids.get(productSlug)!, technologyId: techBySlug.get(techSlug)! })),
  });
  return ids;
}

function product(
  slug: string,
  category: "SOFTWARE" | "HARDWARE" | "CLOUD",
  sort: number,
  featured: boolean,
  protocols: string[],
  chips: string[],
  platforms: string[],
  copy: {
    en: [string, string, string, string[], { label: string; value: string }[]];
    zh: [string, string, string, string[], { label: string; value: string }[]];
  },
): Prisma.ProductCreateInput {
  return {
    category,
    status: "PUBLISHED",
    featured,
    sortOrder: sort,
    supportedProtocols: protocols,
    supportedChips: chips,
    platforms,
    translations: {
      create: (["en", "zh"] as const).map((locale) => ({
        locale,
        name: copy[locale][0],
        slug,
        shortDescription: copy[locale][1],
        description: copy[locale][2],
        features: copy[locale][3],
        specifications: copy[locale][4],
        seoTitle: copy[locale][0],
        seoDescription: copy[locale][1],
      })),
    },
  };
}

async function seedTools(products: Map<string, string>, tech: Map<string, string>) {
  const tools = [
    {
      slug: "reader-sdk",
      kind: "SDK" as const,
      version: "",
      platforms: ["Windows", "Linux", "Android"],
      product: "reader-sdk",
      technologies: ["nfc-rf"],
      en: ["Reader SDK", "Discover readers, detect cards and exchange APDUs.", ["Reader discovery", "Card detection", "APDU exchange", "NDEF", "Diagnostics"]],
      zh: ["读卡器 SDK", "发现读卡器、检测卡片并交换 APDU。", ["读卡器发现", "卡片检测", "APDU 交换", "NDEF", "诊断"]],
    },
    {
      slug: "apdu-tools",
      kind: "TOOL" as const,
      version: "",
      platforms: ["Windows", "Linux"],
      product: "smart-card-sdk",
      technologies: ["smart-cards"],
      en: ["APDU Tools", "Inspect and send APDU exchanges while developing a card or reader integration.", ["APDU log", "Manual command exchange"]],
      zh: ["APDU 工具", "在开发卡片或读卡器集成时查看并发送 APDU。", ["APDU 日志", "手工指令交换"]],
    },
    {
      slug: "credential-api",
      kind: "API" as const,
      version: "",
      platforms: ["HTTPS"],
      product: "credential-apis",
      technologies: ["security-identity", "digital-identity"],
      en: ["Credential API", "Request issuance or submit a verification payload from the project backend.", ["Issuance", "Verification"]],
      zh: ["凭证 API", "由项目后台请求发行，或提交核验数据。", ["发行", "核验"]],
    },
    {
      slug: "integration-notes",
      kind: "DOCUMENTATION" as const,
      version: "",
      platforms: [],
      product: "reader-sdk",
      technologies: ["nfc-rf", "smart-cards"],
      en: ["Integration Notes", "How the published SDKs, readers and APIs fit together on a project.", ["Platform notes", "Protocol coverage"]],
      zh: ["集成说明", "已发布的 SDK、读卡器和 API 在项目里如何配合。", ["平台说明", "协议覆盖"]],
    },
  ];
  for (const tool of tools) {
    const created = await prisma.developerTool.create({
      data: {
        kind: tool.kind,
        version: tool.version,
        platforms: tool.platforms,
        status: "PUBLISHED",
        featured: true,
        sortOrder: tools.indexOf(tool) + 1,
        translations: {
          create: (["en", "zh"] as const).map((locale) => ({
            locale,
            name: tool[locale][0] as string,
            slug: tool.slug,
            description: tool[locale][1] as string,
            features: tool[locale][2],
            seoTitle: tool[locale][0] as string,
            seoDescription: tool[locale][1] as string,
          })),
        },
        products: products.has(tool.product) ? { create: [{ productId: products.get(tool.product)! }] } : undefined,
        technologies: {
          create: tool.technologies.filter((slug) => tech.has(slug)).map((slug) => ({ technologyId: tech.get(slug)! })),
        },
      },
    });
    void created;
  }
}

async function linkSolutions(solutions: Map<string, string>, tech: Map<string, string>, products: Map<string, string>) {
  const techLinks: [string, string][] = [
    ["payment", "smart-cards"],
    ["payment", "nfc-rf"],
    ["identity", "security-identity"],
    ["identity", "digital-identity"],
    ["identity", "fido2"],
    ["access-control", "nfc-rf"],
    ["access-control", "smart-cards"],
    ["brand-protection", "nfc-security"],
    ["transit", "nfc-rf"],
    ["transit", "smart-cards"],
    ["iot", "nfc-rf"],
    ["iot", "secure-element"],
  ];
  const productLinks: [string, string][] = [
    ["payment", "smart-card-sdk"],
    ["payment", "nfc-readers"],
    ["payment", "personalization-tools"],
    ["identity", "credential-apis"],
    ["identity", "nfc-readers"],
    ["access-control", "nfc-readers"],
    ["brand-protection", "credential-apis"],
    ["transit", "nfc-readers"],
    ["iot", "embedded-nfc-modules"],
  ];
  await prisma.solutionTechnology.createMany({
    data: techLinks.filter(([s, t]) => solutions.has(s) && tech.has(t)).map(([s, t]) => ({ solutionId: solutions.get(s)!, technologyId: tech.get(t)! })),
  });
  await prisma.productSolution.createMany({
    data: productLinks.filter(([s, p]) => solutions.has(s) && products.has(p)).map(([s, p]) => ({ solutionId: solutions.get(s)!, productId: products.get(p)! })),
  });
}

async function seedPages() {
  const pages = [
    {
      key: "about",
      en: ["About NFCTEC", "NFC and secure-technology engineering.", "NFCTEC works across NFC and RF, smart cards, and security and identity. Delivery covers hardware, software and cloud, from a prototype through production.\n\nSecurity and identity includes cryptography, HSM, secure elements, PKI, FIDO2, ePassport, PIV and secure NFC. Cryptography here means the engineering of keys and protocols. It is not a cryptocurrency business."],
      zh: ["关于 NFCTEC", "NFC 与安全技术工程。", "NFCTEC 的工作覆盖 NFC 与射频、智能卡，以及安全与身份。交付包括硬件、软件和云，从原型做到生产。\n\n安全与身份包括密码学、HSM、安全元件、PKI、FIDO2、ePassport、PIV 和安全 NFC。这里的密码学是密钥和协议工程，不是加密货币业务。"],
    },
    {
      key: "privacy",
      en: ["Privacy", "What this site stores when you write to an engineer.", "The contact form stores the name, company, email, country, project type, product interest, message and optional attachment you submit. Those records are visible only inside the admin portal.\n\nThe site also records anonymous events such as a product view or a download click, with the page path and no name or email.\n\nLead records are kept so the team can reply. They are not published."],
      zh: ["隐私", "你给工程师留言时，这个网站会保存什么。", "联系表单会保存你提交的姓名、公司、邮箱、国家或地区、项目类型、感兴趣的产品、留言和可选附件。这些记录只在管理后台可见。\n\n网站还会记录匿名事件，例如产品浏览或下载点击，只包含页面路径，不包含姓名或邮箱。\n\n线索用于回复你的项目，不会被公开。"],
    },
    {
      key: "terms",
      en: ["Terms", "How to read the material on this site.", "Pages describe engineering areas and published products. They are not a quotation, a certification, or a contract. A project starts only after a separate written agreement.\n\nDownload checksums are published so you can check a file. They are not a promise about fitness for a particular deployment."],
      zh: ["条款", "如何理解本站材料。", "页面描述工程范围和已发布产品。它们不是报价、认证或合同。项目只有在另行书面约定后才开始。\n\n下载校验值用于核对文件，并不表示该文件适合某一次具体部署。"],
    },
  ];
  for (const page of pages) {
    await prisma.page.create({
      data: {
        key: page.key,
        status: "PUBLISHED",
        translations: {
          create: (["en", "zh"] as const).map((locale) => ({
            locale,
            title: page[locale][0],
            description: page[locale][1],
            body: page[locale][2],
            seoTitle: page[locale][0],
            seoDescription: page[locale][1],
          })),
        },
      },
    });
  }
}

async function seedNavigation() {
  const header = async (href: string, sort: number, en: string, zh: string, parentId?: string, emphasis = false) => {
    return prisma.navItem.create({
      data: {
        location: "HEADER",
        href,
        sortOrder: sort,
        parentId,
        emphasis,
        translations: { create: [{ locale: "en", label: en }, { locale: "zh", label: zh }] },
      },
    });
  };
  const products = await header("/products", 10, "Products", "产品");
  await header("/products/software", 11, "Software", "软件", products.id);
  await header("/products/hardware", 12, "Hardware", "硬件", products.id);
  await header("/products/cloud", 13, "Cloud", "云", products.id);
  const solutions = await header("/solutions", 20, "Solutions", "方案");
  for (const [index, item] of [
    ["/solutions/payment", "Payment", "支付"],
    ["/solutions/identity", "Identity", "身份"],
    ["/solutions/access-control", "Access Control", "门禁"],
    ["/solutions/brand-protection", "Brand Protection", "品牌保护"],
    ["/solutions/transit", "Transit", "交通"],
    ["/solutions/iot", "IoT", "物联网"],
  ].entries()) {
    await header(item[0], 21 + index, item[1], item[2], solutions.id);
  }
  const technology = await header("/technology", 30, "Technology", "技术");
  await header("/technology/nfc-rf", 31, "NFC & RF", "NFC 与射频", technology.id);
  await header("/technology/smart-cards", 32, "Smart Cards", "智能卡", technology.id);
  const security = await header("/technology/security-identity", 33, "Security & Identity", "安全与身份", technology.id);
  for (const [index, item] of [
    ["/technology/security-identity/cryptography", "Cryptography", "密码学"],
    ["/technology/security-identity/hsm", "HSM", "HSM"],
    ["/technology/security-identity/secure-element", "Secure Element", "安全元件"],
    ["/technology/security-identity/pki", "PKI & Key Management", "PKI 与密钥管理"],
    ["/technology/security-identity/fido2", "FIDO2 / WebAuthn", "FIDO2 / WebAuthn"],
    ["/technology/security-identity/digital-identity", "Digital Identity", "数字身份"],
    ["/technology/security-identity/nfc-security", "NFC Security", "NFC 安全"],
  ].entries()) {
    await header(item[0], 34 + index, item[1], item[2], security.id);
  }
  const developer = await header("/developer", 40, "Developer", "开发者");
  for (const [index, item] of [
    ["/developer/sdk", "SDK", "SDK"],
    ["/developer/tools", "Tools", "工具"],
    ["/developer/api", "API", "API"],
    ["/developer/documentation", "Documentation", "文档"],
    ["/developer/downloads", "Downloads", "下载"],
  ].entries()) {
    await header(item[0], 41 + index, item[1], item[2], developer.id);
  }
  await header("/blog", 50, "Blog", "博客");
  const company = await header("/about", 60, "Company", "公司");
  await header("/about", 61, "About", "关于", company.id);
  await header("/contact", 62, "Contact", "联系", company.id);
  await header("/contact", 70, "Talk to an Engineer", "与工程师沟通", undefined, true);

  const footer = async (href: string, sort: number, en: string, zh: string, parentId?: string) =>
    prisma.navItem.create({
      data: {
        location: "FOOTER",
        href,
        sortOrder: sort,
        parentId,
        translations: { create: [{ locale: "en", label: en }, { locale: "zh", label: zh }] },
      },
    });
  const fProducts = await footer("/products", 10, "Products", "产品");
  await footer("/products/software", 11, "Software", "软件", fProducts.id);
  await footer("/products/hardware", 12, "Hardware", "硬件", fProducts.id);
  await footer("/products/cloud", 13, "Cloud", "云", fProducts.id);
  const fSolutions = await footer("/solutions", 20, "Solutions", "方案");
  await footer("/solutions/payment", 21, "Payment", "支付", fSolutions.id);
  await footer("/solutions/identity", 22, "Identity", "身份", fSolutions.id);
  await footer("/solutions/access-control", 23, "Access Control", "门禁", fSolutions.id);
  const fTech = await footer("/technology", 30, "Technology", "技术");
  await footer("/technology/nfc-rf", 31, "NFC & RF", "NFC 与射频", fTech.id);
  await footer("/technology/smart-cards", 32, "Smart Cards", "智能卡", fTech.id);
  await footer("/technology/security-identity", 33, "Security & Identity", "安全与身份", fTech.id);
  const fDev = await footer("/developer", 40, "Developer", "开发者");
  await footer("/developer/documentation", 41, "Documentation", "文档", fDev.id);
  await footer("/developer/downloads", 42, "Downloads", "下载", fDev.id);
  await footer("/developer/tools", 43, "Tools", "工具", fDev.id);
  const fCompany = await footer("/about", 50, "Company", "公司");
  await footer("/blog", 51, "Blog", "博客", fCompany.id);
  await footer("/contact", 52, "Contact", "联系", fCompany.id);
  await footer("/privacy", 53, "Privacy", "隐私", fCompany.id);
  await footer("/terms", 54, "Terms", "条款", fCompany.id);
}

async function seedHomepage() {
  const sections: { key: string; sort: number; en: [string, string, Prisma.InputJsonValue]; zh: [string, string, Prisma.InputJsonValue] }[] = [
    {
      key: "hero",
      sort: 1,
      en: ["NFC & Secure Technology Engineering", "Hardware, smart cards, FIDO, digital identity, SDKs, security and cloud for secure connected products.", { primaryCta: "Talk to an Engineer", secondaryCta: "Explore Technology", tertiaryCta: "View Products" }],
      zh: ["NFC 与安全技术工程", "面向安全互联产品的硬件、智能卡、FIDO、数字身份、SDK、安全与云。", { primaryCta: "与工程师沟通", secondaryCta: "查看技术", tertiaryCta: "查看产品" }],
    },
    {
      key: "core",
      sort: 2,
      en: ["One engineering stack. Multiple security technologies.", "NFC and RF, smart cards, and security and identity are the three foundations.", {}],
      zh: ["一套工程栈，覆盖多项安全技术。", "基础是 NFC 与射频、智能卡，以及安全与身份。", {}],
    },
    {
      key: "products",
      sort: 3,
      en: ["Products built for NFC and secure technology", "Software, hardware and cloud are how the engineering is delivered.", { categories: [
        { key: "software", title: "Software", text: "SDKs, personalization tools, NFC utilities and diagnostic tools." },
        { key: "hardware", title: "Hardware", text: "Readers, embedded modules, antennas and personalization hardware." },
        { key: "cloud", title: "Cloud", text: "Issuance, verification, credential management and provisioning APIs." },
      ] }],
      zh: ["为 NFC 与安全技术构建的产品", "软件、硬件和云是工程的三种交付方式。", { categories: [
        { key: "software", title: "软件", text: "SDK、个人化工具、NFC 工具和诊断工具。" },
        { key: "hardware", title: "硬件", text: "读卡器、嵌入式模块、天线和个人化硬件。" },
        { key: "cloud", title: "云", text: "发行、核验、凭证管理和注入 API。" },
      ] }],
    },
    {
      key: "solutions",
      sort: 4,
      en: ["Where the stack is used", "Six practical project areas. These pages describe the problem, not a second copy of the technology list.", {}],
      zh: ["这套工程栈用在哪里", "六个实际项目方向。这些页面讲要解决的问题，不是把技术列表再抄一遍。", {}],
    },
    {
      key: "security",
      sort: 5,
      en: ["Security built into the NFC stack", "Cryptography, keys, authentication and digital identity sit inside the same engineering work.", { groups: [
        { title: "Smart Card Security", href: "/technology/smart-cards", items: ["JavaCard", "GlobalPlatform", "SCP02", "SCP03", "EMV", "DESFire", "APDU security"] },
        { title: "Cryptography & Key Infrastructure", href: "/technology/security-identity/cryptography", items: ["AES", "3DES", "RSA", "ECC", "CMAC", "HSM", "Secure Element", "PKI"] },
        { title: "Authentication", href: "/technology/security-identity/fido2", items: ["FIDO2", "WebAuthn", "PIV", "Credential authentication", "Device authentication"] },
        { title: "Digital Identity", href: "/technology/security-identity/digital-identity", items: ["ePassport", "ICAO 9303", "BAC", "PACE", "EAC", "Verification APIs"] },
      ] }],
      zh: ["安全做在 NFC 工程栈里面", "密码学、密钥、认证和数字身份属于同一项工程，而不是另起一套网站栏目。", { groups: [
        { title: "智能卡安全", href: "/technology/smart-cards", items: ["JavaCard", "GlobalPlatform", "SCP02", "SCP03", "EMV", "DESFire", "APDU 安全"] },
        { title: "密码学与密钥基础设施", href: "/technology/security-identity/cryptography", items: ["AES", "3DES", "RSA", "ECC", "CMAC", "HSM", "安全元件", "PKI"] },
        { title: "认证", href: "/technology/security-identity/fido2", items: ["FIDO2", "WebAuthn", "PIV", "凭证认证", "设备认证"] },
        { title: "数字身份", href: "/technology/security-identity/digital-identity", items: ["ePassport", "ICAO 9303", "BAC", "PACE", "EAC", "核验 API"] },
      ] }],
    },
    { key: "featured", sort: 6, en: ["Featured products", "", {}], zh: ["重点产品", "", {}] },
    { key: "coverage", sort: 7, en: ["Technology coverage", "Protocols, cards and controllers the engineering work actually touches.", {}], zh: ["技术覆盖", "工程实际会碰到的协议、卡片和控制器。", {}] },
    {
      key: "why",
      sort: 8,
      en: ["Why NFCTEC", "", { items: [
        { title: "NFC and smart cards in one place", text: "Readers, cards, protocols and issuance are engineered as one stack." },
        { title: "Hardware, software and cloud", text: "A project can move from a reader or module to an SDK and an API." },
        { title: "Security is part of the design", text: "Cryptography, secure elements, FIDO2 and digital identity are inside the NFC work." },
        { title: "Prototype through production", text: "Requirements, firmware, security, cloud and testing stay in one engineering flow." },
      ] }],
      zh: ["为什么找 NFCTEC", "", { items: [
        { title: "NFC 和智能卡放在一起做", text: "读卡器、卡片、协议和发行按同一套工程来做。" },
        { title: "硬件、软件和云", text: "一个项目可以从读卡器或模块走到 SDK 和 API。" },
        { title: "安全是设计的一部分", text: "密码学、安全元件、FIDO2 和数字身份都在 NFC 工作里面。" },
        { title: "从原型到生产", text: "需求、固件、安全、云和测试留在同一条工程路径上。" },
      ] }],
    },
    {
      key: "process",
      sort: 9,
      en: ["Prototype to production", "A complete system, not only a card or a reader on a price list.", { steps: ["Requirements", "Architecture", "Prototype", "Firmware / SDK", "Security integration", "Cloud / backend", "Testing", "Production"] }],
      zh: ["从原型到生产", "做成完整系统，而不是只卖一张卡或一台读卡器。", { steps: ["需求", "架构", "原型", "固件 / SDK", "安全集成", "云 / 后台", "测试", "生产"] }],
    },
    {
      key: "developer",
      sort: 10,
      en: ["Developer ecosystem", "SDKs, tools, APIs, documentation and downloads for engineers who need to integrate.", {}],
      zh: ["开发者生态", "给需要集成的工程师：SDK、工具、API、文档和下载。", {}],
    },
    { key: "insights", sort: 11, en: ["Engineering notes", "", {}], zh: ["工程笔记", "", {}] },
    {
      key: "cta",
      sort: 12,
      en: ["Talk with an engineer about the stack you need to build.", "Describe the protocol, card, reader, identity or cloud piece.", { primaryCta: "Talk to an Engineer" }],
      zh: ["把需要构建的协议、卡片、读卡器或云服务告诉工程师。", "说明 NFC、智能卡、身份或云集成需求。", { primaryCta: "与工程师沟通" }],
    },
  ];
  for (const section of sections) {
    await prisma.homepageSection.create({
      data: {
        key: section.key,
        sortOrder: section.sort,
        enabled: true,
        translations: {
          create: (["en", "zh"] as const).map((locale) => ({
            locale,
            title: section[locale][0],
            description: section[locale][1],
            content: section[locale][2],
          })),
        },
      },
    });
  }
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
