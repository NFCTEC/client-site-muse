import type { PrismaClient } from "@prisma/client";

type ArticleSeed = {
  slug: string;
  category: string;
  tags: string[];
  products: string[];
  technologies: string[];
  solutions: string[];
  en: { title: string; excerpt: string; content: string };
  zh: { title: string; excerpt: string; content: string };
};

function minutes(text: string) {
  const cjk = (text.match(/[\u4e00-\u9fff]/g) || []).length;
  const words = text.replace(/[\u4e00-\u9fff]/g, " ").trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 220 + cjk / 400));
}

const articles: ArticleSeed[] = [
  {
    slug: "reader-sdk-apdu-exchange",
    category: "SDK",
    tags: ["APDU", "PC/SC", "ISO/IEC 14443"],
    products: ["reader-sdk", "nfc-readers"],
    technologies: ["nfc-rf", "smart-cards"],
    solutions: ["payment", "access-control"],
    en: {
      title: "Reader SDK: discovery, card detection and APDU exchange",
      excerpt: "How a Reader SDK finds a reader, waits for a card and exchanges APDUs over USB, serial or PC/SC.",
      content: `A reader integration starts with three steps: find the reader, wait until a card is in the field, then send APDUs.

## Host interfaces

The Reader SDK is used on Windows, Linux and Android. Host links are USB, serial or PC/SC. The same application sequence applies on each host: enumerate the reader, open a session, then talk to the card.

## What the SDK actually does

- Reader discovery
- Card detection on ISO/IEC 14443 and ISO/IEC 15693
- APDU exchange
- NDEF read and write when the card supports it
- Diagnostics for field, ATR and transport errors

The first SELECT APDU is only a header. It is not a product credential and it is not a complete payment or identity transaction.

## Where this is used

Payment, access control and transit projects all need a stable APDU path before personalization, OSDP or a cloud API is added. Firmware and SDK work belong in that same path, not as a later add-on.
`,
    },
    zh: {
      title: "读卡器 SDK：发现读卡器、检测卡片并交换 APDU",
      excerpt: "读卡器 SDK 如何发现设备、等待卡片进入场强，并通过 USB、串口或 PC/SC 交换 APDU。",
      content: `读卡器集成通常只有三步：找到读卡器，等到卡片进入射频场，然后发送 APDU。

## 主机接口

读卡器 SDK 用于 Windows、Linux 和 Android。主机连接是 USB、串口或 PC/SC。各平台上的顺序相同：枚举读卡器、打开会话，再与卡片通信。

## SDK 实际覆盖的工作

- 读卡器发现
- ISO/IEC 14443 和 ISO/IEC 15693 的卡片检测
- APDU 交换
- 卡片支持时的 NDEF 读写
- 场强、ATR 和传输错误诊断

第一条 SELECT APDU 只是报文头，不是产品凭证，也不是完整的支付或身份交易。

## 用在哪里

支付、门禁和交通项目都需要先把 APDU 路径跑稳，再接个人化、OSDP 或云 API。固件和 SDK 属于同一条路径，不是事后补上的附件。
`,
    },
  },
  {
    slug: "globalplatform-scp02-scp03",
    category: "Smart Cards",
    tags: ["GlobalPlatform", "SCP02", "SCP03", "JavaCard"],
    products: ["smart-card-sdk", "personalization-tools"],
    technologies: ["smart-cards"],
    solutions: ["payment", "identity"],
    en: {
      title: "SCP02 and SCP03 in a GlobalPlatform personalization path",
      excerpt: "Secure channel choice belongs in issuance. SCP02 and SCP03 are used to load and manage card applications, not as a public API.",
      content: `Payment and identity cards that run Java Card typically sit on GlobalPlatform. Before an application is loaded or keys are injected, the host opens a secure channel.

## What the channel is for

SCP02 and SCP03 protect the conversation between a personalization host and the card manager. They are not a substitute for EMV kernels, FIDO registration or a verification API.

## Engineering sequence

1. Establish the card session over PC/SC or an SDK.
2. Open SCP02 or SCP03 according to the card profile.
3. Load or update the application.
4. Inject personalization data.
5. Confirm the result before a production run.

This site does not state a certification level. The secure channel is part of issuance engineering. Keys stay with the card, an HSM or the key-management service used by the project.
`,
    },
    zh: {
      title: "GlobalPlatform 个人化路径中的 SCP02 与 SCP03",
      excerpt: "安全通道属于发行。SCP02 和 SCP03 用来装载和管理卡应用，不是公开 API。",
      content: `跑在 Java Card 上的支付卡和身份卡，通常使用 GlobalPlatform。装载应用或注入密钥之前，主机要先打开安全通道。

## 通道做什么

SCP02 和 SCP03 保护个人化主机与卡管理器之间的会话。它们不能代替 EMV 内核、FIDO 注册或核验 API。

## 工程顺序

1. 通过 PC/SC 或 SDK 建立卡片会话。
2. 按卡片配置打开 SCP02 或 SCP03。
3. 装载或更新应用。
4. 注入个人化数据。
5. 量产前核对结果。

本站不宣称认证等级。安全通道是发行工程的一部分。密钥留在卡片、HSM 或项目使用的密钥管理服务中。
`,
    },
  },
  {
    slug: "ntag-424-dna-sun-authentication",
    category: "NFC Security",
    tags: ["NTAG 424 DNA", "SUN", "Brand protection"],
    products: ["credential-apis"],
    technologies: ["nfc-security"],
    solutions: ["brand-protection"],
    en: {
      title: "NTAG 424 DNA and SUN messages for product authentication",
      excerpt: "A public NFC URL can be copied. Brand protection needs a tag that produces an authentication message and a server that checks it.",
      content: `A static NDEF URL is easy to clone. Brand protection uses a tag that can prove a tap belongs to that item.

## Tag, phone and API

NTAG 424 DNA can produce a SUN message. A phone or reader sends that message to a verification API. The result is tied to the product item, not only to a public URL.

The authentication key is not printed on the tag. Verification happens server-side. The credential API is the place that returns a status. Keys stay with the key-management service.

## Deployment order

Personalize the tags, publish the verification endpoint, then test with the production encoding. A lab tap is not a finished anti-counterfeit system until the same encoding is used on the issued tags.
`,
    },
    zh: {
      title: "NTAG 424 DNA 与 SUN 报文用于产品认证",
      excerpt: "公开 NFC 链接可以被复制。品牌保护需要标签生成认证报文，并由服务端核验。",
      content: `静态 NDEF 链接很容易被复制。品牌保护要用能够证明这次贴卡属于该产品的标签。

## 标签、手机和 API

NTAG 424 DNA 可以生成 SUN 报文。手机或读卡器把它交给核验 API。结果对应到具体产品，而不是只对应一个公开网址。

认证密钥不会印在标签上。核验在服务端完成。凭证 API 返回状态。密钥留在密钥管理服务中。

## 交付顺序

先个人化标签，发布核验接口，再用量产编码测试。实验室贴卡还不是完整的防伪系统，直到发行标签使用同一套编码。
`,
    },
  },
  {
    slug: "fido2-nfc-and-secure-elements",
    category: "Identity",
    tags: ["FIDO2", "WebAuthn", "Secure Element"],
    products: ["credential-apis", "embedded-nfc-modules"],
    technologies: ["fido2", "secure-element", "digital-identity"],
    solutions: ["identity"],
    en: {
      title: "FIDO2, NFC authenticators and secure-element keys",
      excerpt: "FIDO2 registration and sign-in can use a card or a secure element. The private key does not belong in the web page.",
      content: `Identity projects issue a credential, then prove it later. FIDO2 and WebAuthn are one of those proof paths. ePassport and PIV are others.

## Where the key lives

The authenticator can be a card, a USB or NFC key, or a secure element such as SE050 or SE051. A reader or an API checks the assertion. The private key stays in the authenticator. Verification does not copy it into the browser.

## What NFCTEC engineers

The reader or embedded NFC path, the credential on the card or secure element, and the verification step behind it. A prototype proves the credential and the reader together, then issuance and verification services are connected.

Cryptography here is key and protocol engineering. Crypto wallets use the same rule: signing stays on the card or element.
`,
    },
    zh: {
      title: "FIDO2、NFC 认证器与安全元件密钥",
      excerpt: "FIDO2 注册和登录可以使用卡片或安全元件。私钥不属于网页。",
      content: `身份项目要先发行凭证，再完成核验。FIDO2 和 WebAuthn 是其中一条核验路径。ePassport 和 PIV 是另外的路径。

## 密钥放在哪里

认证器可以是卡片、USB 或 NFC 密钥，也可以是 SE050、SE051 这类安全元件。读卡器或 API 检查断言。私钥留在认证器里。核验不会把它复制到浏览器。

## NFCTEC 负责的部分

读卡器或嵌入式 NFC 路径、卡片或安全元件上的凭证，以及后面的核验步骤。原型要把凭证和读卡器一起跑通，再接上发行与核验服务。

这里的密码学是密钥和协议工程。加密货币钱包遵循同一条规则：签名留在卡片或安全元件上。
`,
    },
  },
  {
    slug: "hardware-wallets-cold-storage-cards",
    category: "Crypto",
    tags: ["secp256k1", "ed25519", "BIP-39", "Hardware wallet"],
    products: ["smart-card-sdk", "credential-apis"],
    technologies: ["security-identity", "secure-element", "cryptography"],
    solutions: ["identity", "iot"],
    en: {
      title: "Hardware wallets and cold-storage cards on the NFC stack",
      excerpt: "Crypto wallets are part of the same card, secure-element and reader work. Keys stay on the card. Signing happens on the card.",
      content: `Hardware wallets, cold-storage cards and on-card signing sit in the NFC and smart-card stack. They are not a separate website theme.

## What stays on the card

Common wallet engineering uses secp256k1, ed25519, BIP-32 and BIP-39. The seed and private key stay in the card or secure element. The host sends a signing request. The card returns a signature.

NFC or a PC/SC reader can be the host interface. A cloud service can later check a public credential. It should not receive the private key.

## Same rule as identity work

FIDO2, ePassport and wallet signing share one constraint: the secret does not leave the card, the secure element or an HSM. Software, hardware and cloud around that secret are the same three delivery layers used for payment and access projects.
`,
    },
    zh: {
      title: "NFC 工程栈上的硬件钱包与冷存储卡",
      excerpt: "加密货币钱包属于同一套卡片、安全元件和读卡器工程。密钥留在卡上，签名在卡内完成。",
      content: `硬件钱包、冷存储卡和卡内签名属于 NFC 与智能卡工程栈，不是另一套网站栏目。

## 什么留在卡上

常见钱包工程使用 secp256k1、ed25519、BIP-32 和 BIP-39。种子和私钥留在卡片或安全元件里。主机发送签名请求。卡片返回签名。

主机接口可以是 NFC 或 PC/SC 读卡器。云服务之后可以核验公开凭证，但不应该收到私钥。

## 与身份工程同一条规则

FIDO2、ePassport 和钱包签名有同一条约束：秘密不离开卡片、安全元件或 HSM。围绕这个秘密的软件、硬件和云，与支付、门禁项目使用同一套交付层。
`,
    },
  },
  {
    slug: "desfire-readers-and-osdp",
    category: "Access",
    tags: ["DESFire", "OSDP", "MIFARE"],
    products: ["nfc-readers", "reader-sdk"],
    technologies: ["nfc-rf", "smart-cards"],
    solutions: ["access-control"],
    en: {
      title: "DESFire credentials, NFC readers and the controller path",
      excerpt: "Access projects fail when the reader, card and controller do not share a credential model. OSDP is the reader-to-controller conversation when the project uses it.",
      content: `A door reader has to speak to the card, then pass a result to a controller. If those two conversations use different credential models, the installation does not line up.

## Card side

Readers talk ISO/IEC 14443 to DESFire, MIFARE or FeliCa media. Credential keys and application settings are provisioned. They are not left at factory defaults.

## Controller side

When the project uses it, OSDP is the path from reader to controller. The engineering task is to prove the card and reader together, then connect the controller and a credential update path.

This is reader, credential and controller work. It is not a claim about a specific lock brand or a certification mark.
`,
    },
    zh: {
      title: "DESFire 凭证、NFC 读卡器与控制器路径",
      excerpt: "读卡器、卡片和控制器如果没有统一的凭证模型，门禁就对不上。项目需要时，读卡器到控制器使用 OSDP。",
      content: `门禁读卡器要先与卡片通信，再把结果交给控制器。两段会话如果使用不同的凭证模型，现场就会对不上。

## 卡片一侧

读卡器通过 ISO/IEC 14443 访问 DESFire、MIFARE 或 FeliCa。凭证密钥和应用配置需要注入，而不是停留在出厂默认值。

## 控制器一侧

项目需要时，OSDP 是读卡器到控制器的路径。工程上要先把卡片和读卡器跑通，再连接控制器和凭证更新路径。

这是读卡器、凭证和控制器工程，不是对某个锁具品牌或认证标志的声明。
`,
    },
  },
  {
    slug: "emv-card-application-and-personalization",
    category: "Payment",
    tags: ["EMV", "JavaCard", "GlobalPlatform", "APDU"],
    products: ["smart-card-sdk", "personalization-tools", "reader-sdk"],
    technologies: ["smart-cards", "nfc-rf"],
    solutions: ["payment"],
    en: {
      title: "EMV card applications, APDUs and personalization",
      excerpt: "An EMV project needs a card application, a reader that can exchange payment APDUs, and a personalization path before issuance.",
      content: `Payment work on this stack is EMV card engineering: the application on the card, the reader that talks to it, and the data that is injected before issuance.

## What has to line up

A payment card application typically runs on Java Card and GlobalPlatform. The reader exposes PC/SC or an SDK so a host can exchange EMV and smart-card APDUs. Personalization tools prepare the card data. Issuance can be driven from a backend API when the project needs a central control path.

Contactless taps still use ISO/IEC 14443. The EMV application sits on top of that radio path. A Reader SDK that can discover a reader and send APDUs is the first integration layer. It is not a complete kernel, and it is not a finished issuance system.

## Personalization before production

Secure channel protocols such as SCP02 or SCP03 belong in issuance. Keys stay with the card, an HSM or the key-management service. This page describes the engineering sequence. It does not state an EMV approval or a certification level.

The practical order is the same as other payment pages on this site: prototype the reader and the card, then firmware, personalization and production issuance.
`,
    },
    zh: {
      title: "EMV 卡应用、APDU 与个人化",
      excerpt: "EMV 项目需要卡应用、能够交换支付 APDU 的读卡器，以及发行前的个人化路径。",
      content: `这套工程里的支付工作是 EMV 卡工程：卡上的应用、与卡片通信的读卡器，以及发行前注入的数据。

## 需要对齐的部分

支付卡应用通常跑在 Java Card 和 GlobalPlatform 上。读卡器通过 PC/SC 或 SDK 暴露接口，让主机交换 EMV 和智能卡 APDU。个人化工具准备卡片数据。需要集中控制时，可以由后台 API 驱动发行。

非接贴卡仍然走 ISO/IEC 14443。EMV 应用叠在这条射频路径上面。能够发现读卡器并发送 APDU 的读卡器 SDK 是第一层集成，它不是完整的内核，也不是完成的发行系统。

## 量产前的个人化

SCP02 或 SCP03 这类安全通道属于发行。密钥留在卡片、HSM 或密钥管理服务中。本页说明工程顺序，不宣称 EMV 批准或认证等级。

实际顺序与站点上的支付页面相同：先做读卡器和卡片原型，再进入固件、个人化和量产发行。
`,
    },
  },
];

export async function ensureArticles(prisma: PrismaClient) {
  const productRows = await prisma.productTranslation.findMany({
    where: { locale: "en" },
    select: { slug: true, productId: true },
  });
  const techRows = await prisma.technologyTranslation.findMany({
    where: { locale: "en" },
    select: { slug: true, technologyId: true },
  });
  const solutionRows = await prisma.solutionTranslation.findMany({
    where: { locale: "en" },
    select: { slug: true, solutionId: true },
  });
  const products = new Map(productRows.map((row) => [row.slug, row.productId]));
  const technologies = new Map(techRows.map((row) => [row.slug, row.technologyId]));
  const solutions = new Map(solutionRows.map((row) => [row.slug, row.solutionId]));

  for (const article of articles) {
    const existing = await prisma.articleTranslation.findUnique({
      where: { locale_slug: { locale: "en", slug: article.slug } },
      select: { articleId: true },
    });
    if (existing) continue;

    await prisma.article.create({
      data: {
        status: "PUBLISHED",
        featured: true,
        author: "NFCTEC",
        category: article.category,
        tags: article.tags,
        publishDate: new Date(),
        translations: {
          create: (["en", "zh"] as const).map((locale) => ({
            locale,
            title: article[locale].title,
            slug: article.slug,
            excerpt: article[locale].excerpt,
            content: article[locale].content,
            readingTime: minutes(article[locale].content),
            seoTitle: article[locale].title,
            seoDescription: article[locale].excerpt,
            robots: "index,follow",
          })),
        },
        products: {
          create: article.products
            .filter((slug) => products.has(slug))
            .map((slug) => ({ productId: products.get(slug)! })),
        },
        technologies: {
          create: article.technologies
            .filter((slug) => technologies.has(slug))
            .map((slug) => ({ technologyId: technologies.get(slug)! })),
        },
        solutions: {
          create: article.solutions
            .filter((slug) => solutions.has(slug))
            .map((slug) => ({ solutionId: solutions.get(slug)! })),
        },
      },
    });
  }
}

