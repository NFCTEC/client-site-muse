// Blog posts data. Swap this for a CMS/API fetch later — keep the BlogPost shape stable.
export type BlogBody = { heading?: string; text: string }[];

export type BlogCopy = {
  title: string;
  excerpt: string;
  body: BlogBody;
  cat?: string;
};

export type BlogPost = {
  slug: string;
  cat: string;
  date: string; // ISO yyyy-mm-dd
  title: string;
  excerpt: string;
  // Body rendered as ordered paragraphs / H2 sections. Keep it simple so a CMS can fill it later.
  body: BlogBody;
  readMinutes: number;
  zh?: BlogCopy;
};

export const posts: BlogPost[] = [
  {
    slug: "emv-card-application-and-personalization",
    cat: "EMV",
    date: "2026-10-12",
    title: "EMV card applications, APDUs and personalization",
    excerpt: "An EMV project needs a card application, a reader that can exchange payment APDUs, and a personalization path before issuance.",
    readMinutes: 8,
    body: [
      { text: "Payment work on this stack is EMV card engineering: the application on the card, the reader that talks to it, and the data that is injected before issuance." },
      { heading: "What has to line up", text: "A payment card application typically runs on Java Card and GlobalPlatform. The reader exposes PC/SC or an SDK so a host can exchange EMV and smart-card APDUs. Personalization tools prepare the card data. Issuance can be driven from a backend API when the project needs a central control path." },
      { heading: "Contactless still starts at ISO/IEC 14443", text: "Contactless taps still use ISO/IEC 14443. The EMV application sits on top of that radio path. A Reader SDK that can discover a reader and send APDUs is the first integration layer. It is not a complete kernel, and it is not a finished issuance system." },
      { heading: "Personalization before production", text: "Secure channel protocols such as SCP02 or SCP03 belong in issuance. Keys stay with the card, an HSM or the key-management service. This page describes the engineering sequence. It does not state an EMV approval or a certification level." },
    ],
    zh: {
      title: "EMV 卡应用、APDU 与个人化",
      excerpt: "EMV 项目需要卡应用、能够交换支付 APDU 的读卡器，以及发行前的个人化路径。",
      body: [
        { text: "这套工程里的支付工作是 EMV 卡工程：卡上的应用、与卡片通信的读卡器，以及发行前注入的数据。" },
        { heading: "需要对齐的部分", text: "支付卡应用通常跑在 Java Card 和 GlobalPlatform 上。读卡器通过 PC/SC 或 SDK 暴露接口，让主机交换 EMV 和智能卡 APDU。个人化工具准备卡片数据。需要集中控制时，可以由后台 API 驱动发行。" },
        { heading: "非接仍然从 ISO/IEC 14443 开始", text: "非接贴卡仍然走 ISO/IEC 14443。EMV 应用叠在这条射频路径上面。能够发现读卡器并发送 APDU 的读卡器 SDK 是第一层集成，它不是完整的内核，也不是完成的发行系统。" },
        { heading: "量产前的个人化", text: "SCP02 或 SCP03 这类安全通道属于发行。密钥留在卡片、HSM 或密钥管理服务中。本页说明工程顺序，不宣称 EMV 批准或认证等级。" },
      ],
    },
  },
  {
    slug: "hardware-wallets-cold-storage-cards",
    cat: "Crypto",
    date: "2026-10-12",
    title: "Hardware wallets and cold-storage cards on the NFC stack",
    excerpt: "Crypto wallets are part of the same card, secure-element and reader work. Keys stay on the card. Signing happens on the card.",
    readMinutes: 7,
    body: [
      { text: "Hardware wallets, cold-storage cards and on-card signing sit in the NFC and smart-card stack. They are not a separate website theme." },
      { heading: "What stays on the card", text: "Common wallet engineering uses secp256k1, ed25519, BIP-32 and BIP-39. The seed and private key stay in the card or secure element. The host sends a signing request. The card returns a signature." },
      { heading: "Host and cloud", text: "NFC or a PC/SC reader can be the host interface. A cloud service can later check a public credential. It should not receive the private key." },
      { heading: "Same rule as identity work", text: "FIDO2, ePassport and wallet signing share one constraint: the secret does not leave the card, the secure element or an HSM. Software, hardware and cloud around that secret are the same three delivery layers used for payment and access projects." },
    ],
    zh: {
      title: "NFC 工程栈上的硬件钱包与冷存储卡",
      excerpt: "加密货币钱包属于同一套卡片、安全元件和读卡器工程。密钥留在卡上，签名在卡内完成。",
      body: [
        { text: "硬件钱包、冷存储卡和卡内签名属于 NFC 与智能卡工程栈，不是另一套网站栏目。" },
        { heading: "什么留在卡上", text: "常见钱包工程使用 secp256k1、ed25519、BIP-32 和 BIP-39。种子和私钥留在卡片或安全元件里。主机发送签名请求。卡片返回签名。" },
        { heading: "主机与云", text: "主机接口可以是 NFC 或 PC/SC 读卡器。云服务之后可以核验公开凭证，但不应该收到私钥。" },
        { heading: "与身份工程同一条规则", text: "FIDO2、ePassport 和钱包签名有同一条约束：秘密不离开卡片、安全元件或 HSM。围绕这个秘密的软件、硬件和云，与支付、门禁项目使用同一套交付层。" },
      ],
    },
  },
  {
    slug: "reader-sdk-apdu-exchange",
    cat: "SDK",
    date: "2026-10-12",
    title: "Reader SDK: discovery, card detection and APDU exchange",
    excerpt: "How a Reader SDK finds a reader, waits for a card and exchanges APDUs over USB, serial or PC/SC.",
    readMinutes: 6,
    body: [
      { text: "A reader integration starts with three steps: find the reader, wait until a card is in the field, then send APDUs." },
      { heading: "Host interfaces", text: "The Reader SDK is used on Windows, Linux and Android. Host links are USB, serial or PC/SC. The same application sequence applies on each host: enumerate the reader, open a session, then talk to the card." },
      { heading: "What the SDK actually does", text: "Reader discovery, card detection on ISO/IEC 14443 and ISO/IEC 15693, APDU exchange, NDEF read and write when the card supports it, and diagnostics for field, ATR and transport errors. The first SELECT APDU is only a header. It is not a product credential and it is not a complete payment or identity transaction." },
      { heading: "Where this is used", text: "Payment, access control and transit projects all need a stable APDU path before personalization, OSDP or a cloud API is added. Firmware and SDK work belong in that same path, not as a later add-on." },
    ],
    zh: {
      title: "读卡器 SDK：发现读卡器、检测卡片并交换 APDU",
      excerpt: "读卡器 SDK 如何发现设备、等待卡片进入场强，并通过 USB、串口或 PC/SC 交换 APDU。",
      body: [
        { text: "读卡器集成通常只有三步：找到读卡器，等到卡片进入射频场，然后发送 APDU。" },
        { heading: "主机接口", text: "读卡器 SDK 用于 Windows、Linux 和 Android。主机连接是 USB、串口或 PC/SC。各平台上的顺序相同：枚举读卡器、打开会话，再与卡片通信。" },
        { heading: "SDK 实际覆盖的工作", text: "读卡器发现、ISO/IEC 14443 和 ISO/IEC 15693 的卡片检测、APDU 交换、卡片支持时的 NDEF 读写，以及场强、ATR 和传输错误诊断。第一条 SELECT APDU 只是报文头，不是产品凭证，也不是完整的支付或身份交易。" },
        { heading: "用在哪里", text: "支付、门禁和交通项目都需要先把 APDU 路径跑稳，再接个人化、OSDP 或云 API。固件和 SDK 属于同一条路径，不是事后补上的附件。" },
      ],
    },
  },
  {
    slug: "fido2-nfc-and-secure-elements",
    cat: "Security",
    date: "2026-10-12",
    title: "FIDO2, NFC authenticators and keys on a secure element",
    excerpt: "FIDO2 registration and assertion can use a card or a secure element. The private key does not belong on a web page.",
    readMinutes: 7,
    body: [
      { text: "Identity projects issue a credential, then verify it. FIDO2 and WebAuthn are one verification path. ePassport and PIV are other paths." },
      { heading: "Where the key lives", text: "The authenticator can be a card, a USB or NFC key, or a secure element such as SE050 or SE051. The reader or API checks the assertion. The private key stays in the authenticator. Verification does not copy it into the browser." },
      { heading: "What NFCTEC engineers", text: "The reader or embedded NFC path, the credential on the card or secure element, and the verification step behind it. A prototype proves the credential and the reader together, then issuance and verification services are connected." },
      { heading: "Same rule for wallets", text: "Cryptography here is key and protocol engineering. Crypto wallets use the same rule: signing stays on the card or element." },
    ],
    zh: {
      title: "FIDO2、NFC 认证器与安全元件密钥",
      excerpt: "FIDO2 注册和登录可以使用卡片或安全元件。私钥不属于网页。",
      body: [
        { text: "身份项目要先发行凭证，再完成核验。FIDO2 和 WebAuthn 是其中一条核验路径。ePassport 和 PIV 是另外的路径。" },
        { heading: "密钥放在哪里", text: "认证器可以是卡片、USB 或 NFC 密钥，也可以是 SE050、SE051 这类安全元件。读卡器或 API 检查断言。私钥留在认证器里。核验不会把它复制到浏览器。" },
        { heading: "NFCTEC 负责的部分", text: "读卡器或嵌入式 NFC 路径、卡片或安全元件上的凭证，以及后面的核验步骤。原型要把凭证和读卡器一起跑通，再接上发行与核验服务。" },
        { heading: "钱包同一条规则", text: "这里的密码学是密钥和协议工程。加密货币钱包遵循同一条规则：签名留在卡片或安全元件上。" },
      ],
    },
  },
  {
    slug: "emv-contactless-aid-selection",
    cat: "EMV",
    date: "2026-05-12",
    title: "How EMV Contactless Selects an AID in 6 ms",
    excerpt: "A byte-level walk-through of PPSE, AID lists and kernel selection across Visa, Mastercard and UPI.",
    readMinutes: 8,
    body: [
      { text: "EMV contactless transactions have a hard timing budget. From the moment a card enters the field to the moment the terminal sends the first GENERATE AC command, everything must be done in under 500 ms — and most of that budget is reserved for cryptographic processing. Application selection itself routinely runs in under 6 ms on modern kernels." },
      { heading: "Step 1 — PPSE (Proximity Payment System Environment)", text: "The terminal issues SELECT '2PAY.SYS.DDF01'. The card responds with an FCI template listing every supported application AID, each tagged with a priority indicator and an optional kernel ID." },
      { heading: "Step 2 — AID matching", text: "The terminal walks its configured AID list (Combination Selection Table) in priority order and looks for an intersection with the card's FCI. The first match wins — exact match takes precedence over partial." },
      { heading: "Step 3 — Kernel routing", text: "Once an AID is chosen, the terminal hands off to the right kernel: Kernel 2 for Mastercard M/Chip, Kernel 3 for Visa VSDC, Kernel 6 for UnionPay QUICS, and so on. Each kernel has its own data-object list and risk parameters." },
      { heading: "Common pitfalls", text: "Misordered Combination Selection Tables can downgrade a Mastercard-preferred terminal to Visa silently. Always validate the table during L3 brand certification." },
    ],
  },
  {
    slug: "sun-dynamic-url-anti-counterfeit",
    cat: "Security",
    date: "2026-04-28",
    title: "SUN Dynamic URL: Anti-Counterfeit Done Right",
    excerpt: "How NTAG 424 DNA's signed URL protocol stops cloning while staying cloud-friendly.",
    readMinutes: 7,
    body: [
      { text: "NTAG 424 DNA's Secure Unique NFC (SUN) message turns every tap into a verifiable, single-use URL. No app required — the phone's default NFC handler opens a browser, the server validates the message, and the user sees an authenticity result in under a second." },
      { heading: "How SUN works", text: "On each tap the tag increments a read counter and emits AES-128-CMAC over the UID and counter. The result is base32-encoded into the URL query string. The server holds the AES key, recomputes the MAC, and checks that the counter is strictly increasing." },
      { heading: "Why it beats QR", text: "QR codes can be photographed and reprinted indefinitely. SUN's per-tap counter + signature means a copy is detectable on the second scan, even when the attacker has the URL." },
      { heading: "Issuance flow", text: "Personalize each tag with a unique AES key derived from a master key. Store only the derivation index server-side. Never transmit per-tag keys after personalization." },
    ],
  },
  {
    slug: "2m-transit-cards-90-days",
    cat: "Case Study",
    date: "2026-04-10",
    title: "Rolling Out 2M Transit Cards in 90 Days",
    excerpt: "Inside a CALYPSO + DESFire migration for a tier-1 metro operator.",
    readMinutes: 6,
    body: [
      { text: "A tier-1 metro operator needed to migrate 2 million riders from a legacy proprietary scheme to a CALYPSO + MIFARE DESFire EV3 platform in 90 days, with zero service interruption." },
      { heading: "Personalization throughput", text: "Three perso lines running in parallel hit a sustained 28,000 cards/hour with HSM-backed CALYPSO key derivation. The bottleneck turned out to be card flip-orient mechanics, not crypto." },
      { heading: "Gate reader rollout", text: "1,200 gates were re-flashed in 14 nightly maintenance windows. A dual-application fallback let old and new cards coexist during the transition." },
      { heading: "Lessons learned", text: "Pre-stage every key set in the HSM ceremony at least a week ahead. The schedule survives hardware delays — it never survives a key ceremony slip." },
    ],
  },
  {
    slug: "pn5180-vs-pn532",
    cat: "Hardware",
    date: "2026-03-22",
    title: "PN5180 vs PN532: Choosing the Right Frontend",
    excerpt: "RF performance, current draw, BOM cost and protocol coverage — head to head.",
    readMinutes: 9,
    body: [
      { text: "PN5180 and PN532 dominate the NFC frontend market for new designs, but they serve very different sweet spots." },
      { heading: "RF performance", text: "PN5180's adaptive matching network delivers ~2× the read range of a stock PN532 at the same antenna size — typically 9 cm vs 4–5 cm for a 50×50 mm coil." },
      { heading: "Protocol coverage", text: "PN5180 supports the full NFC Forum T1–T5 set, ISO 15693, and EMV L1 certification out of the box. PN532 covers T1–T4 and is cheaper but skips ISO 15693." },
      { heading: "Cost & complexity", text: "PN5180 needs an SPI host and a more complex RF front-end. PN532 talks I2C, UART, or SPI and works on a 2-layer board. For hobby / low-volume, PN532 wins. For production access control or transit, PN5180." },
    ],
  },
  {
    slug: "first-javacard-3-1-applet",
    cat: "JavaCard",
    date: "2026-03-05",
    title: "Shipping Your First JavaCard 3.1 Applet",
    excerpt: "From keystore to GP-Pro install — a complete onboarding for new applet developers.",
    readMinutes: 10,
    body: [
      { text: "JavaCard 3.1 brings BigInteger, Elliptic Curve key agreement, and modern crypto primitives to the platform. Your first applet doesn't need any of that — but the toolchain still has a learning curve." },
      { heading: "Toolchain setup", text: "Install the Oracle JavaCard SDK 3.1, GPShell or GlobalPlatformPro, and a card reader with PC/SC drivers. A development card with default GP keys is essential." },
      { heading: "Applet skeleton", text: "Extend javacard.framework.Applet, override install() and process(). The CLA/INS dispatch in process() is your contract with the host — design it before writing logic." },
      { heading: "Load and install", text: "Use gp.exe --install yourapplet.cap to push the CAP file. If install fails with 6A80, your AID collides with an existing package — pick a new one." },
    ],
  },
  {
    slug: "hce-android-15",
    cat: "Mobile",
    date: "2026-02-18",
    title: "HCE on Android 15: What Changed",
    excerpt: "New TEE binding requirements, foreground service rules and tokenization tips.",
    readMinutes: 6,
    body: [
      { text: "Android 15 tightens Host Card Emulation rules in three places that matter for payment and access-control developers." },
      { heading: "TEE-bound credentials", text: "Sensitive credentials must now be stored in the StrongBox keystore on supported devices. Apps targeting SDK 35 get a one-time migration path." },
      { heading: "Foreground service rules", text: "HCE services running long-lived emulation sessions now require a typed foreground-service declaration in the manifest, or the OS will kill the service mid-tap." },
      { heading: "Tokenization", text: "Token requestors should regenerate device tokens after the OS upgrade — the attestation chain changes when StrongBox migration happens." },
    ],
  },
  {
    slug: "javacard-cap-load-globalplatform-guide",
    cat: "JavaCard",
    date: "2026-09-20",
    title: "JavaCard CAP Load with GlobalPlatform: INSTALL, LOAD and SELECT Explained",
    excerpt: "A practical guide to loading a JavaCard applet with GlobalPlatform, from secure channel setup to final SELECT verification.",
    readMinutes: 10,
    body: [
      { text: "Loading a JavaCard applet is not just sending a CAP file to a card. A production flow must open a GlobalPlatform secure channel, load package blocks, install the applet instance and verify that the new AID can be selected reliably." },
      { heading: "Secure channel first", text: "The usual command sequence starts with INITIALIZE UPDATE and EXTERNAL AUTHENTICATE. These commands create the SCP02 or SCP03 secure channel used to wrap later INSTALL and LOAD commands. If this step fails, check key version, security level and host cryptogram calculation first." },
      { heading: "INSTALL for load and LOAD", text: "INSTALL [for load] tells the card that a package is about to be loaded. LOAD then sends the CAP file in blocks. Large CAP files can fail because of block size, secure messaging overhead or EEPROM limits, so logs should include block index, response status and wrapped APDU length." },
      { heading: "Install and verify", text: "INSTALL [for install] creates the applet instance using package AID, applet AID, instance AID and privileges. After installation, always SELECT the instance AID and run a minimal command to prove the lifecycle is complete." },
    ],
  },
  {
    slug: "apdu-status-words-9000-6a82-6985",
    cat: "APDU",
    date: "2026-09-20",
    title: "APDU Status Words Explained: 9000, 6A82, 6985, 6700 and 6D00",
    excerpt: "Common ISO 7816 status words engineers see when debugging smart cards and JavaCard applets.",
    readMinutes: 7,
    body: [
      { text: "APDU status words are the fastest way to understand why a smart card command failed. The response data may be empty, but SW1/SW2 still tells you whether the command was accepted, malformed, unauthorized or unsupported." },
      { heading: "9000, 6A82 and 6985", text: "9000 means success at the APDU layer. 6A82 usually means file or application not found, often because a SELECT AID is wrong or the applet instance was not installed. 6985 means conditions of use not satisfied, commonly caused by missing security state, wrong lifecycle or insufficient privileges." },
      { heading: "Length and instruction errors", text: "6700 indicates wrong length, while 6D00 indicates an unsupported instruction code. Good APDU tooling should keep the complete command history so engineers can reproduce status-word failures instead of relying on screenshots." },
    ],
  },
  {
    slug: "mifare-classic-to-desfire-ev3-migration-checklist",
    cat: "MIFARE",
    date: "2026-09-20",
    title: "MIFARE Classic to DESFire EV3 Migration Checklist",
    excerpt: "What to check when replacing legacy MIFARE Classic access cards with DESFire EV3 credentials.",
    readMinutes: 9,
    body: [
      { text: "Many access-control systems still rely on MIFARE Classic because it was cheap and widely supported. For new deployments, DESFire EV3 is usually the safer credential because it supports AES authentication, multiple applications and stronger transaction features." },
      { heading: "Data mapping", text: "Classic sector and block layouts do not translate directly into DESFire applications and files. Define application IDs, file IDs, access rights, key versions and whether value files or standard data files are needed before personalization starts." },
      { heading: "Reader firmware", text: "A reader that only reads UID or Classic sectors will not magically support DESFire authentication. Firmware must handle ISO 14443-4 communication, AES authentication and the chosen file operations." },
      { heading: "Dual-credential period", text: "Many sites need readers and backend systems to accept both legacy Classic cards and new DESFire EV3 cards while users are migrated in batches. Plan this period explicitly." },
    ],
  },
  {
    slug: "ndef-uri-record-byte-example",
    cat: "NDEF",
    date: "2026-09-20",
    title: "NDEF URI Record Byte Example for NFC Tags",
    excerpt: "A byte-level example of how an NFC URI record is encoded and why prefix codes matter.",
    readMinutes: 6,
    body: [
      { text: "NDEF URI records are one of the most common payloads written to NFC tags. They are used for product links, support pages, pairing flows, business cards and marketing campaigns." },
      { heading: "Prefix code", text: "A URI record does not always store the full string. The first payload byte is a prefix code. For example, 0x04 means https://. The rest of the payload stores the remaining characters, saving tag memory." },
      { heading: "Byte-level example", text: "For a URL such as https://www.nfctec.com/contact, the payload can use prefix code 0x04 followed by www.nfctec.com/contact in ASCII. The NDEF record header then describes TNF, type length, payload length and record type U." },
    ],
  },
  {
    slug: "scp02-vs-scp03-javacard-secure-channel",
    cat: "JavaCard",
    date: "2026-09-20",
    title: "SCP02 vs SCP03: Which GlobalPlatform Secure Channel Should You Use?",
    excerpt: "A practical comparison of GlobalPlatform SCP02 and SCP03 for JavaCard developers: key derivation, MAC/ENC wrapping, and when to choose each.",
    readMinutes: 9,
    body: [
      { text: "If you load JavaCard applets for a living, you will eventually hit the same question: should this card use SCP02 or SCP03? The wrong answer usually shows up as a failed EXTERNAL AUTHENTICATE or a CAP load that breaks on the first wrapped INSTALL." },
      { heading: "SCP02 in practice", text: "SCP02 is still widely deployed on older and mid-range JavaCards. It typically uses 3DES-based session keys. Use it when the card only advertises SCP02, especially during sample bring-up with default GP keys." },
      { heading: "SCP03 in practice", text: "SCP03 is the AES-based GlobalPlatform secure channel. For new applet projects and higher-assurance cards, SCP03 with ENC+MAC is usually the better long-term choice when the card supports it." },
      { heading: "Debug checklist", text: "When authentication fails, verify key version, ENC/MAC/DEK values, host cryptogram calculation, EXTERNAL AUTHENTICATE P1 security level, and that later LOAD/INSTALL wrapping uses the same session state." },
    ],
  },
  {
    slug: "ntag424-dna-sun-url-authentication-example",
    cat: "Security",
    date: "2026-09-20",
    title: "NTAG424 DNA SUN URL Authentication Example",
    excerpt: "A practical NTAG 424 DNA example: how SUN dynamic URLs, AES-CMAC, and read counters stop NFC label cloning.",
    readMinutes: 8,
    body: [
      { text: "Static NFC tags are easy to clone. NTAG 424 DNA fixes that with Secure Unique NFC messaging — every tap can produce a signed, counter-based URL that a server can verify." },
      { heading: "What a SUN URL contains", text: "On each tap the tag can assemble a URL from UID, read counter and AES-CMAC. The phone opens a normal HTTPS link, and the server decides whether the tap is authentic." },
      { heading: "Server-side verification", text: "Recompute the CMAC with the diversified AES key, then reject taps with a bad MAC or a counter that is not strictly increasing for that UID. The counter check is what defeats simple URL copying." },
      { heading: "Bring-up checklist", text: "Authenticate with EV2 keys, configure SDM/NDEF templates, generate a real SUN URL, verify it against your backend, then only move to batch personalization after the lab loop is stable." },
    ],
  },
];

export const postsBySlug = new Map(posts.map((p) => [p.slug, p]));
