import type { CmsProduct } from "./cms";
import type { Locale } from "./locale";

const AMAZON_J3R180 =
  "https://www.amazon.com/J3R180-Magnetic-Stripe-Interface-EEPROM/dp/B0HD7Z44HJ";

type Copy = {
  name: string;
  description: string;
  tagline: string;
  intro: string;
  body: string;
  features: { title: string; description: string; icon: string }[];
  specs: { key: string; value: string }[];
  useCases: string[];
  highlights: string[];
  seoTitle: string;
  seoDescription: string;
  ctaLabel: string;
  secondaryCtaLabel: string;
};

type CatalogDef = {
  slug: string;
  category: "software" | "hardware";
  icon: string;
  sortOrder: number;
  ctaUrl: string;
  secondaryCtaUrl: string;
  en: Copy;
  zh: Copy;
};

const CATALOG: CatalogDef[] = [
  {
    slug: "ntag213-215-216",
    category: "hardware",
    icon: "Tag",
    sortOrder: 10,
    ctaUrl: "/contact",
    secondaryCtaUrl: "/blog/ntag213-vs-ntag215-vs-ntag216",
    en: {
      name: "NTAG213 / 215 / 216 tags",
      description:
        "NFC Forum Type 2 labels and cards on NXP NTAG213, NTAG215 and NTAG216. Wet inlays, stickers and PVC — quote by memory size and form factor.",
      tagline: "144 / 504 / 888 user bytes · ISO/IEC 14443-A Type 2",
      intro:
        "We stock and personalize NXP NTAG21x silicon for URL, product ID and inventory jobs. Pick NTAG213 when the payload is a short NDEF record, NTAG215 for typical marketing and amenity tags, NTAG216 when you need the 888-byte user area.",
      body: `<p>NTAG213, NTAG215 and NTAG216 are NFC Forum Type 2 tags on ISO/IEC 14443-A. User memory is 144, 504 and 888 bytes. UID is 7 bytes. Originality signature and password/lock bits are available on genuine NXP parts.</p>
<p>We supply wet and dry inlays, paper or PET stickers, and CR80 PVC. Encoding (NDEF URL, text, MIME) can be done before shipment. For a side-by-side memory map see <a href="/en/blog/ntag213-vs-ntag215-vs-ntag216">NTAG213 vs NTAG215 vs NTAG216</a>.</p>
<p>Need AES and a TAM1/TAM2 SUN link instead of a static NDEF URL? Use <a href="/en/products/ntag424-dna">NTAG 424 DNA</a>. Custom card / tag / wristband tooling: <a href="/en/products/nfc-labels-and-cards">card factory</a>.</p>`,
      features: [
        {
          title: "Three memory sizes",
          description: "NTAG213 144 bytes, NTAG215 504 bytes, NTAG216 888 bytes of user memory.",
          icon: "Database",
        },
        {
          title: "Any shape we can tool",
          description: "Wet inlay, die-cut sticker, epoxy, PVC, wristband. Custom outline on the factory page.",
          icon: "Layers",
        },
        {
          title: "NDEF encoding",
          description: "We can write URL, text or custom NDEF before ship, or send blank for your own issuance line.",
          icon: "FileCode",
        },
      ],
      specs: [
        { key: "Chip", value: "NXP NTAG213 / NTAG215 / NTAG216" },
        { key: "Standard", value: "ISO/IEC 14443-A, NFC Forum Type 2" },
        { key: "User memory", value: "144 / 504 / 888 bytes" },
        { key: "UID", value: "7-byte unique ID" },
        { key: "RF", value: "13.56 MHz" },
        { key: "MOQ", value: "Quote by IC + inlay / PVC" },
      ],
      useCases: [
        "Product packaging and anti-counterfeit URLs",
        "Hotel, gym and locker tags",
        "Asset and inventory labels",
        "Smart posters and exhibition badges",
      ],
      highlights: [
        "Genuine NXP NTAG21x, not clones",
        "Wet inlay, sticker and PVC from one PO",
        "Optional NDEF encoding and UID list",
      ],
      seoTitle: "Buy NTAG213, NTAG215, NTAG216 NFC Tags | NFCTEC",
      seoDescription:
        "NXP NTAG213, NTAG215 and NTAG216 NFC tags and PVC cards. Type 2, 144/504/888 user bytes. Wet inlay, sticker, encoding. Quote from NFCTEC.",
      ctaLabel: "Request a quote",
      secondaryCtaLabel: "213 vs 215 vs 216",
    },
    zh: {
      name: "NTAG213 / 215 / 216 标签",
      description:
        "NXP NTAG213、NTAG215、NTAG216 的 NFC Forum Type 2 标签与卡。湿 Inlay、不干胶、PVC 卡，按容量与形态报价。",
      tagline: "用户区 144 / 504 / 888 字节 · ISO/IEC 14443-A Type 2",
      intro:
        "我们备货并个人化 NXP NTAG21x。短 NDEF 用 NTAG213，常见营销与会籍用 NTAG215，需要 888 字节用户区用 NTAG216。",
      body: `<p>NTAG213、NTAG215、NTAG216 是 ISO/IEC 14443-A 上的 NFC Forum Type 2 标签，用户区分别为 144、504、888 字节，UID 7 字节。原厂芯片带 originality signature 与密码/锁定位。</p>
<p>可供湿/干 Inlay、纸或 PET 贴纸、CR80 PVC。出厂前可写 NDEF（URL、文本、MIME）。容量对照见 <a href="/zh/blog/ntag213-vs-ntag215-vs-ntag216">NTAG213 vs NTAG215 vs NTAG216</a>。</p>
<p>若需要 AES 与 TAM1/TAM2 SUN 动态链接，请看 <a href="/zh/products/ntag424-dna">NTAG 424 DNA</a>。异形标签、卡、手环开模见 <a href="/zh/products/nfc-labels-and-cards">卡厂定制</a>。</p>`,
      features: [
        {
          title: "三种容量",
          description: "NTAG213 144 字节、NTAG215 504 字节、NTAG216 888 字节用户区。",
          icon: "Database",
        },
        {
          title: "多种形态",
          description: "湿 Inlay、异形不干胶、环氧、PVC、手环。开模见卡厂页。",
          icon: "Layers",
        },
        {
          title: "NDEF 预写",
          description: "可出厂写 URL/文本，或空白交付接入你们自己的发卡线。",
          icon: "FileCode",
        },
      ],
      specs: [
        { key: "芯片", value: "NXP NTAG213 / NTAG215 / NTAG216" },
        { key: "标准", value: "ISO/IEC 14443-A，NFC Forum Type 2" },
        { key: "用户区", value: "144 / 504 / 888 字节" },
        { key: "UID", value: "7 字节唯一 ID" },
        { key: "射频", value: "13.56 MHz" },
        { key: "起订", value: "按芯片 + Inlay / PVC 报价" },
      ],
      useCases: ["包装溯源与防伪 URL", "酒店、健身房、储物柜标签", "资产与库存标签", "智贴与展会证件"],
      highlights: ["原厂 NXP NTAG21x", "Inlay、贴纸、PVC 同一订单", "可选 NDEF 预写与 UID 清单"],
      seoTitle: "NTAG213 / NTAG215 / NTAG216 标签采购 | NFCTEC",
      seoDescription:
        "NXP NTAG213、NTAG215、NTAG216 NFC 标签与 PVC 卡。Type 2，用户区 144/504/888 字节。湿 Inlay、贴纸、预写。NFCTEC 报价。",
      ctaLabel: "询价",
      secondaryCtaLabel: "213 / 215 / 216 对比",
    },
  },
  {
    slug: "ntag424-dna",
    category: "hardware",
    icon: "Shield",
    sortOrder: 22,
    ctaUrl: "/contact",
    secondaryCtaUrl: "/tools/ntag424-tool",
    en: {
      name: "NTAG 424 DNA tags",
      description:
        "NXP NTAG 424 DNA (Type 4). AES, SDM/SUN CMAC URLs, TAM1/TAM2. Wet inlay, sticker and PVC for brand protection and gated links.",
      tagline: "AES-128 · SUN / SDM · NFC Forum Type 4",
      intro:
        "NTAG 424 DNA is the NXP Type 4 tag used when a static NDEF URL is not enough. We supply inlays and cards, and can encode SDM files so each tap produces a unique, backend-checkable URL.",
      body: `<p>NTAG 424 DNA speaks ISO/IEC 14443-4 (NFC Forum Type 4). Security features include AES-128, Secure Dynamic Messaging (SDM / SUN) with CMAC, and TAM1/TAM2 mirrored PICC data. User NDEF is typically 416 bytes depending on file layout.</p>
<p>We sell the silicon in wet inlay, sticker and PVC, with optional SDM encoding. Decode and check a SUN URL with the <a href="/en/tools/ntag424-tool">NTAG 424 DNA tool</a>.</p>`,
      features: [
        {
          title: "SUN / SDM",
          description: "Each tap can append a CMAC and mirrored PICC fields so the server can reject a copied URL.",
          icon: "Link",
        },
        {
          title: "AES on tag",
          description: "Authenticate the PICC before read/write. Not a Type 2 password bit.",
          icon: "Lock",
        },
        {
          title: "Ready for encoding",
          description: "We can set SDM files, keys and NDEF template, or ship blank for your HSM line.",
          icon: "KeyRound",
        },
      ],
      specs: [
        { key: "Chip", value: "NXP NTAG 424 DNA" },
        { key: "Standard", value: "ISO/IEC 14443-4, NFC Forum Type 4" },
        { key: "Crypto", value: "AES-128, SDM/SUN CMAC, TAM1/TAM2" },
        { key: "User NDEF", value: "Typically 416 bytes (file layout dependent)" },
        { key: "Form factors", value: "Wet inlay, sticker, PVC" },
      ],
      useCases: [
        "Brand protection and scan-to-verify",
        "Time-limited or one-time URLs",
        "Access tokens bound to UID + CMAC",
        "Product pages that must not be cloned from a photo of the tag",
      ],
      highlights: ["Type 4 AES tag, not NTAG21x", "SUN encoding available", "Pairs with our NTAG 424 tool"],
      seoTitle: "NTAG 424 DNA Tags & Cards | NFCTEC",
      seoDescription:
        "Buy NXP NTAG 424 DNA NFC tags and PVC. AES, SDM/SUN CMAC, TAM1/TAM2. Wet inlay and encoding. Quote from NFCTEC.",
      ctaLabel: "Request a quote",
      secondaryCtaLabel: "SUN tool",
    },
    zh: {
      name: "NTAG 424 DNA 标签",
      description:
        "NXP NTAG 424 DNA（Type 4）。AES、SDM/SUN CMAC URL、TAM1/TAM2。湿 Inlay、贴纸、PVC，用于防伪与受控链接。",
      tagline: "AES-128 · SUN / SDM · NFC Forum Type 4",
      intro:
        "静态 NDEF URL 不够时用 NTAG 424 DNA。我们提供 Inlay 与卡，并可按 SDM 文件布局编码，每次拍卡生成可后台校验的唯一 URL。",
      body: `<p>NTAG 424 DNA 走 ISO/IEC 14443-4（NFC Forum Type 4）。安全特性包括 AES-128、带 CMAC 的 Secure Dynamic Messaging（SDM / SUN），以及 TAM1/TAM2 镜像 PICC 数据。用户 NDEF 常见约 416 字节，取决于文件布局。</p>
<p>可供湿 Inlay、贴纸、PVC，可选 SDM 编码。用 <a href="/zh/tools/ntag424-tool">NTAG 424 DNA 工具</a>解析 SUN URL。</p>`,
      features: [
        {
          title: "SUN / SDM",
          description: "每次拍卡可附加 CMAC 与镜像 PICC 字段，服务器可拒绝被复制的 URL。",
          icon: "Link",
        },
        {
          title: "卡上 AES",
          description: "读写前认证 PICC，不是 Type 2 的密码位。",
          icon: "Lock",
        },
        {
          title: "可代编码",
          description: "可配置 SDM 文件、密钥与 NDEF 模板，或空白交付接入你们的 HSM 线。",
          icon: "KeyRound",
        },
      ],
      specs: [
        { key: "芯片", value: "NXP NTAG 424 DNA" },
        { key: "标准", value: "ISO/IEC 14443-4，NFC Forum Type 4" },
        { key: "密码", value: "AES-128，SDM/SUN CMAC，TAM1/TAM2" },
        { key: "用户 NDEF", value: "常见约 416 字节（取决于文件布局）" },
        { key: "形态", value: "湿 Inlay、贴纸、PVC" },
      ],
      useCases: ["品牌防伪扫码验真", "限时或一次性 URL", "绑定 UID + CMAC 的访问令牌", "避免标签照片被克隆的商品页"],
      highlights: ["Type 4 AES，不是 NTAG21x", "可做 SUN 编码", "配套 NTAG 424 工具"],
      seoTitle: "NTAG 424 DNA 标签与卡 | NFCTEC",
      seoDescription:
        "采购 NXP NTAG 424 DNA NFC 标签与 PVC。AES、SDM/SUN CMAC、TAM1/TAM2。湿 Inlay 与编码。NFCTEC 报价。",
      ctaLabel: "询价",
      secondaryCtaLabel: "SUN 工具",
    },
  },
  {
    slug: "mifare-desfire-ev3",
    category: "hardware",
    icon: "CreditCard",
    sortOrder: 12,
    ctaUrl: "/contact",
    secondaryCtaUrl: "/products/nfc-labels-and-cards",
    en: {
      name: "MIFARE DESFire EV2 / EV3",
      description:
        "NXP DESFire EV2 and EV3 in 2K, 4K and 8K. AES multi-application PICCs. We laminate them as white PVC, printed cards, fobs, inlays or wristbands — same factory as our NTAG line.",
      tagline: "EV2 / EV3 · 2K / 4K / 8K · ISO/IEC 14443-4",
      intro:
        "Quote generation and memory size first, then the body: CR80, key fob, inlay or wearable. EV3 is the current part (proximity check). EV2 is still run for readers and SAM maps that are certified on EV2. EV1 remains available for like-for-like replacements.",
      body: `<p>MIFARE DESFire EV2 and EV3 are ISO/IEC 14443-4 PICCs with multiple applications, AES keys and file types (standard, backup, value, cyclic record). Memory options we laminate: <strong>2K, 4K and 8K</strong> per generation. EV3 adds proximity check and later ISO random-ID options versus EV2. EV1 is quoted when a deployed reader population cannot move.</p>
<p>This is a card factory job, not a bag of chips. White cards, offset/digital print, overlay, optional magstripe, numbering, and chip encoding (AID layout, keys) can go on one PO. Shapes: see <a href="/en/products/nfc-labels-and-cards">custom cards, tags and wristbands</a>. Door/campus architecture: <a href="/en/solutions/access">access</a>.</p>`,
      features: [
        {
          title: "EV2 and EV3, three sizes",
          description: "2K / 4K / 8K on EV2 and on EV3. Say which generation your SAM and reader stack was certified against.",
          icon: "Database",
        },
        {
          title: "Factory finish",
          description: "Blank or printed CR80, fob, inlay, wristband. Magstripe and print files accepted.",
          icon: "CreditCard",
        },
        {
          title: "Keys and files",
          description: "Ship virgin, or we create applications and inject AES keys in a controlled issuance step.",
          icon: "KeyRound",
        },
      ],
      specs: [
        { key: "Generations", value: "DESFire EV2, EV3 (EV1 on RFQ)" },
        { key: "EEPROM", value: "2K / 4K / 8K" },
        { key: "Standard", value: "ISO/IEC 14443-4" },
        { key: "Crypto", value: "AES; EV3 proximity check" },
        { key: "Bodies", value: "PVC, fob, inlay, wristband — custom tooling" },
      ],
      useCases: ["Access and attendance", "Campus / membership multi-app", "Closed-loop purse", "Transit media where DESFire is specified"],
      highlights: ["EV2 and EV3, not Classic clones", "2K / 4K / 8K on the same RFQ", "Printed card or wearable from one factory"],
      seoTitle: "DESFire EV2 / EV3 Cards 2K 4K 8K | NFCTEC",
      seoDescription:
        "Buy MIFARE DESFire EV2 and EV3 cards in 2K, 4K, 8K. White PVC, print, fob, inlay, wristband. Card factory quote from NFCTEC. EV1 on request.",
      ctaLabel: "Request a factory quote",
      secondaryCtaLabel: "Custom shapes",
    },
    zh: {
      name: "MIFARE DESFire EV2 / EV3",
      description:
        "NXP DESFire EV2、EV3，2K / 4K / 8K。AES 多应用。白卡、彩印、钥匙扣、Inlay、手环同一条产线，和 NTAG 标签一起做。",
      tagline: "EV2 / EV3 · 2K / 4K / 8K · ISO/IEC 14443-4",
      intro:
        "先定代数和容量，再定卡体：CR80、钥匙扣、Inlay 或穿戴。现货主推 EV3（proximity check）。读头/SAM 按 EV2 认证的继续做 EV2。已部署的 EV1 可按替换件报价。",
      body: `<p>MIFARE DESFire EV2、EV3 为 ISO/IEC 14443-4，多应用、AES、多种文件。我们层压的容量：<strong>2K、4K、8K</strong>，两个代数都有。相对 EV2，EV3 增加 proximity check 等。读头无法升级时仍可询 EV1。</p>
<p>按卡厂做，不是散芯片。白卡、胶印/数码、覆膜、可选磁条、喷码、芯片个人化（AID、密钥）可同一订单。形态见 <a href="/zh/products/nfc-labels-and-cards">定制卡、标签与手环</a>。门禁架构见 <a href="/zh/solutions/access">门禁方案</a>。</p>`,
      features: [
        {
          title: "EV2 与 EV3，三种容量",
          description: "EV2、EV3 均有 2K / 4K / 8K。询价请写明读头与 SAM 按哪一代认证。",
          icon: "Database",
        },
        {
          title: "厂内后道",
          description: "白卡或彩印 CR80、钥匙扣、Inlay、手环。可接磁条与印刷文件。",
          icon: "CreditCard",
        },
        {
          title: "密钥与文件",
          description: "可出厂空白，或在受控发卡步骤建应用并注入 AES。",
          icon: "KeyRound",
        },
      ],
      specs: [
        { key: "代数", value: "DESFire EV2、EV3（EV1 可询）" },
        { key: "EEPROM", value: "2K / 4K / 8K" },
        { key: "标准", value: "ISO/IEC 14443-4" },
        { key: "密码", value: "AES；EV3 proximity check" },
        { key: "卡体", value: "PVC、钥匙扣、Inlay、手环 — 可开模" },
      ],
      useCases: ["门禁与考勤", "校园/会员多应用", "封闭钱包", "规范写明 DESFire 的票卡"],
      highlights: ["EV2 与 EV3，不是 Classic 仿制", "2K / 4K / 8K 同一询价单", "彩印卡或穿戴同一工厂"],
      seoTitle: "DESFire EV2 / EV3 卡 2K 4K 8K | NFCTEC",
      seoDescription:
        "采购 MIFARE DESFire EV2、EV3，2K / 4K / 8K。白卡、彩印、钥匙扣、Inlay、手环。NFCTEC 卡厂报价。EV1 可询。",
      ctaLabel: "卡厂询价",
      secondaryCtaLabel: "定制形态",
    },
  },
  {
    slug: "mifare-ultralight",
    category: "hardware",
    icon: "Tag",
    sortOrder: 15,
    ctaUrl: "/contact",
    secondaryCtaUrl: "/products/nfc-labels-and-cards",
    en: {
      name: "MIFARE Ultralight EV1 / Ultralight C",
      description:
        "NXP Ultralight EV1 (48 / 128 byte user) and Ultralight C (3DES). Tickets, events, cheap labels. Same die-cut, wristband and PVC options as our other HF lines.",
      tagline: "UL EV1 48/128 · Ultralight C 3DES · Type 2",
      intro:
        "Ultralight is the low-cost Type 2 PICC for single-ride and disposable media. EV1 is the current password + originality part in 48- and 128-byte user memory. Ultralight C adds 3DES authentication and a 144-byte user area. For a larger NDEF without 3DES, use NTAG215/216 instead.",
      body: `<p><strong>Ultralight EV1</strong>: NFC Forum Type 2, ISO/IEC 14443-A. User memory 48 or 128 bytes, 32-bit password, originality signature. Used for limited-use tickets and simple NDEF.</p>
<p><strong>Ultralight C</strong>: Type 2 with 3DES mutual authentication, 144 bytes user memory. Chosen when the spec still says UL-C rather than NTAG 424 or DESFire.</p>
<p>We embed these ICs in wet inlay, paper ticket, PET sticker, epoxy, CR80 and silicone wristbands. Tooling: <a href="/en/products/nfc-labels-and-cards">card factory</a>. Bigger NDEF: <a href="/en/products/ntag213-215-216">NTAG213/215/216</a>.</p>`,
      features: [
        {
          title: "EV1 two sizes",
          description: "48-byte or 128-byte user memory. Password and lock bits as on other NXP Type 2 parts.",
          icon: "Database",
        },
        {
          title: "Ultralight C",
          description: "3DES authenticate before read/write. 144-byte user area. Not AES, not DESFire.",
          icon: "Lock",
        },
        {
          title: "Disposable media",
          description: "Paper tickets, event wristbands, cheap stickers — antenna sized to the inlay.",
          icon: "Ticket",
        },
      ],
      specs: [
        { key: "UL EV1", value: "48 or 128 bytes user, password, originality" },
        { key: "Ultralight C", value: "144 bytes user, 3DES" },
        { key: "Standard", value: "ISO/IEC 14443-A, NFC Forum Type 2" },
        { key: "Bodies", value: "Inlay, ticket, sticker, PVC, wristband" },
      ],
      useCases: ["Limited-use transit or event tickets", "Disposable wristbands", "Low-cost URL labels", "Specs that still name Ultralight C"],
      highlights: ["EV1 48 and 128 in production", "UL-C 3DES still tooled", "Same factory as DESFire and NTAG"],
      seoTitle: "MIFARE Ultralight EV1 & Ultralight C | NFCTEC",
      seoDescription:
        "NXP MIFARE Ultralight EV1 48/128 and Ultralight C tags and cards. Tickets, stickers, wristbands, PVC. Card factory quote from NFCTEC.",
      ctaLabel: "Request a factory quote",
      secondaryCtaLabel: "Custom shapes",
    },
    zh: {
      name: "MIFARE Ultralight EV1 / Ultralight C",
      description:
        "NXP Ultralight EV1（用户区 48 / 128 字节）与 Ultralight C（3DES）。票卡、活动、低成本标签。异形、手环、PVC 与其他 HF 同一产线。",
      tagline: "UL EV1 48/128 · Ultralight C 3DES · Type 2",
      intro:
        "Ultralight 是一次性票、低成本 Type 2。EV1 为现行带密码与 originality 的型号，用户区 48 或 128 字节。Ultralight C 带 3DES，用户区 144 字节。更大 NDEF 且不需要 3DES 时用 NTAG215/216。",
      body: `<p><strong>Ultralight EV1</strong>：NFC Forum Type 2，ISO/IEC 14443-A。用户区 48 或 128 字节，32 位密码，originality signature。用于限次票和简单 NDEF。</p>
<p><strong>Ultralight C</strong>：Type 2 + 3DES 互认证，用户区 144 字节。规范仍写 UL-C 而不是 NTAG 424 / DESFire 时用。</p>
<p>可做湿 Inlay、纸票、PET 贴、环氧、CR80、硅胶手环。开模见 <a href="/zh/products/nfc-labels-and-cards">卡厂</a>。更大 NDEF 见 <a href="/zh/products/ntag213-215-216">NTAG213/215/216</a>。</p>`,
      features: [
        {
          title: "EV1 两种容量",
          description: "用户区 48 或 128 字节。密码与锁定位与其他 NXP Type 2 同类。",
          icon: "Database",
        },
        {
          title: "Ultralight C",
          description: "读写前 3DES 认证。用户区 144 字节。不是 AES，也不是 DESFire。",
          icon: "Lock",
        },
        {
          title: "一次性介质",
          description: "纸票、活动手环、低价贴纸，天线按 Inlay 尺寸。",
          icon: "Ticket",
        },
      ],
      specs: [
        { key: "UL EV1", value: "用户区 48 或 128 字节，密码，originality" },
        { key: "Ultralight C", value: "用户区 144 字节，3DES" },
        { key: "标准", value: "ISO/IEC 14443-A，NFC Forum Type 2" },
        { key: "卡体", value: "Inlay、票、贴纸、PVC、手环" },
      ],
      useCases: ["限次交通或活动票", "一次性手环", "低成本 URL 标签", "规范仍写 Ultralight C 的项目"],
      highlights: ["EV1 48 与 128 可产", "UL-C 3DES 仍可开料", "与 DESFire、NTAG 同一工厂"],
      seoTitle: "MIFARE Ultralight EV1 与 Ultralight C | NFCTEC",
      seoDescription:
        "NXP MIFARE Ultralight EV1 48/128 与 Ultralight C 标签与卡。票、贴纸、手环、PVC。NFCTEC 卡厂报价。",
      ctaLabel: "卡厂询价",
      secondaryCtaLabel: "定制形态",
    },
  },
  {
    slug: "nfc-labels-and-cards",
    category: "hardware",
    icon: "Factory",
    sortOrder: 8,
    ctaUrl: "/contact",
    secondaryCtaUrl: "/products/ntag213-215-216",
    en: {
      name: "Custom NFC cards, tags & wristbands",
      description:
        "We are the factory: white or printed PVC, die-cut labels, on-metal, epoxy, key fobs, silicone / woven / PVC snap wristbands. Pick the IC (NTAG, Ultralight, DESFire, 424 DNA, JCOP) and we match the antenna.",
      tagline: "Card plant · custom outline · IC + antenna + overlay",
      intro:
        "Send artwork, outline, surface (paper, PET, metal, skin, fabric) and which silicon. We tool the inlay, laminate or sew the body, and optionally encode. This is a manufacturing RFQ, not a catalog of three SKUs.",
      body: `<p><strong>Cards:</strong> CR80 / CR80+ white PVC, offset or digital print, overlay, optional magstripe, signature panel, punch hole, laser or inkjet numbering, contact module + NFC if the IC is dual-interface (J3R180 or J3R452).</p>
<p><strong>Tags:</strong> wet / dry inlay for your converter; finished stickers in round, square, rectangle or a custom knife; on-metal with ferrite; epoxy coin; hang-tag; laundry / PPS if specified.</p>
<p><strong>Wristbands:</strong> silicone (adult/child), woven, PVC snap, vinyl. Chip in the clasp or in the strap; say if it must survive pool water.</p>
<p>ICs we regularly embed: <a href="/en/products/ntag213-215-216">NTAG213/215/216</a>, <a href="/en/products/mifare-ultralight">Ultralight EV1 / C</a>, <a href="/en/products/ntag424-dna">NTAG 424 DNA</a>, <a href="/en/products/mifare-desfire-ev3">DESFire EV2/EV3 2K–8K</a>, <a href="/en/products/j3r180-javacard">J3R180</a>, <a href="/en/products/j3r452-javacard">J3R452</a>. On-metal without ferrite will not read — state metal in the RFQ.</p>`,
      features: [
        {
          title: "PVC card line",
          description: "Blank, printed, magstripe, numbering. Chip-in-card for NTAG, DESFire, Ultralight, JavaCard.",
          icon: "CreditCard",
        },
        {
          title: "Custom tag outline",
          description: "We cut the knife you send. Round 20–50 mm, asset plates, bottle neck, irregular logos.",
          icon: "Scissors",
        },
        {
          title: "Wristbands",
          description: "Silicone, woven, snap PVC. Event, pool, hospital. IC and antenna chosen for the strap width.",
          icon: "Watch",
        },
      ],
      specs: [
        { key: "Plant", value: "HF inlay + card + wearable finishing" },
        { key: "Cards", value: "CR80 PVC, print, magstripe, punch, numbering" },
        { key: "Tags", value: "Wet/dry inlay, die-cut, on-metal, epoxy" },
        { key: "Wristbands", value: "Silicone, woven, PVC snap" },
        { key: "ICs", value: "NTAG21x, UL EV1/C, 424 DNA, DESFire EV2/EV3, J3R180, J3R452" },
        { key: "MOQ", value: "By IC + tooling; samples before mass" },
      ],
      useCases: ["Brand packaging conversion", "Hotel / gym / pool wristbands", "Printed access cards", "Asset plates on metal or plastic"],
      highlights: ["Factory RFQ: shape + IC + print", "Wristband and CR80 on one vendor", "Antenna designed for the body, not a leftover coil"],
      seoTitle: "Custom NFC Cards, Tags & Wristbands | Card Factory | NFCTEC",
      seoDescription:
        "NFC card factory: custom PVC cards, die-cut tags, on-metal, silicone wristbands. NTAG, Ultralight EV1/C, DESFire EV2/EV3, NTAG 424 DNA. Quote tooling from NFCTEC.",
      ctaLabel: "Send a factory RFQ",
      secondaryCtaLabel: "NTAG chips",
    },
    zh: {
      name: "定制 NFC 卡、标签与手环",
      description:
        "我们是卡厂：白卡/彩印 PVC、异形不干胶、抗金属、环氧、钥匙扣、硅胶/织造/PVC 扣手环。选定芯片（NTAG、Ultralight、DESFire、424 DNA、JCOP），天线按卡体匹配。",
      tagline: "卡厂 · 异形开模 · 芯片 + 天线 + 面材",
      intro:
        "给印刷文件、外形、贴附面（纸、PET、金属、皮肤、布）和芯片型号。我们开 Inlay、层压或车缝，可选编码。这是制造询价，不是三个现成料号。",
      body: `<p><strong>卡：</strong>CR80 / 加长白卡 PVC，胶印或数码，覆膜，可选磁条、签名条、打孔、激光或喷墨喷码；双界面芯片（J3R180 或 J3R452）可接触模块 + 非接。</p>
<p><strong>标签：</strong>给转换厂的湿/干 Inlay；成品圆贴、方贴、长贴或按刀模异形；抗金属铁氧体；环氧币；吊牌；若需要可询洗涤/PPS。</p>
<p><strong>手环：</strong>硅胶（成人/儿童）、织造、PVC 按扣、乙烯。芯片在扣或在带上；泳池请说明防水。</p>
<p>常做芯片：<a href="/zh/products/ntag213-215-216">NTAG213/215/216</a>、<a href="/zh/products/mifare-ultralight">Ultralight EV1 / C</a>、<a href="/zh/products/ntag424-dna">NTAG 424 DNA</a>、<a href="/zh/products/mifare-desfire-ev3">DESFire EV2/EV3 2K–8K</a>、<a href="/zh/products/j3r180-javacard">J3R180</a>、<a href="/zh/products/j3r452-javacard">J3R452</a>。金属面不加铁氧体读不到，询价请写明。</p>`,
      features: [
        {
          title: "PVC 卡线",
          description: "白卡、彩印、磁条、喷码。NTAG、DESFire、Ultralight、JavaCard 均可入卡。",
          icon: "CreditCard",
        },
        {
          title: "标签异形",
          description: "按你的刀模。圆 20–50 mm、资产牌、瓶口、不规则 LOGO。",
          icon: "Scissors",
        },
        {
          title: "手环",
          description: "硅胶、织造、按扣 PVC。活动、泳池、医院。按带宽选芯片和天线。",
          icon: "Watch",
        },
      ],
      specs: [
        { key: "产线", value: "HF Inlay + 卡 + 穿戴后道" },
        { key: "卡", value: "CR80 PVC、印刷、磁条、打孔、喷码" },
        { key: "标签", value: "湿/干 Inlay、刀模、抗金属、环氧" },
        { key: "手环", value: "硅胶、织造、PVC 按扣" },
        { key: "芯片", value: "NTAG21x、UL EV1/C、424 DNA、DESFire EV2/EV3、J3R180、J3R452" },
        { key: "起订", value: "按芯片 + 模具；可先打样" },
      ],
      useCases: ["包装转换", "酒店/健身/泳池手环", "彩印门禁卡", "金属或塑料资产牌"],
      highlights: ["询价写外形 + 芯片 + 印刷", "手环和 CR80 同一家", "天线按卡体设计，不是剩料线圈"],
      seoTitle: "定制 NFC 卡、标签与手环 | 卡厂 | NFCTEC",
      seoDescription:
        "NFC 卡厂：定制 PVC 卡、异形标签、抗金属、硅胶手环。NTAG、Ultralight EV1/C、DESFire EV2/EV3、NTAG 424 DNA。开模询 NFCTEC。",
      ctaLabel: "提交卡厂询价",
      secondaryCtaLabel: "NTAG 芯片",
    },
  },
  {
    slug: "j3r452-javacard",
    category: "hardware",
    icon: "Cpu",
    sortOrder: 24,
    ctaUrl: "/contact",
    secondaryCtaUrl: "/products/j3r180-javacard",
    en: {
      name: "JCOP 4.5 J3R452 JavaCard",
      description:
        "NXP JCOP 4.5 on SmartMX3 P71D600 (J3R452). Java Card 3.0.5 Classic, GlobalPlatform 2.3.1, dual-interface, FLASH ~450 KB class before add-ons. Factory PVC / SIM form factors on quote.",
      tagline: "JCOP 4.5 · P71D600 · JC 3.0.5 · GP 2.3.1 · ~450 KB NVM",
      intro:
        "J3R452 is not a larger J3R180. It is JCOP 4.5 on P71D600 (ID2 family). Usable FLASH is about 450 KB before MIFARE applets or OS add-ons are loaded. Dual-interface: ISO/IEC 7816 T=0/T=1 and ISO/IEC 14443 Type A and Type B.",
      body: `<p><strong>Do not mix with J3R180.</strong> J3R180 is JCOP 4 on the P71D321 SECID line, 180 kB memory class. J3R452 is JCOP 4.5 on P71D600, ~450 KB FLASH class (NXP: available before loading MIFARE, applets, OS add-ons). Both run Java Card 3.0.5 Classic; GP on 4.5 is 2.3.1 (SCP01 / SCP02 / SCP03). CMOS040. PUF, Secure Box, delegated management.</p>
<p>Contactless on J3R452 is Type A and Type B, up to 848 kbit/s. Contact up to ~688 kbit/s. Optional MIFARE Plus EV2 or DESFire EV3 implementations eat NVM — quote the configuration. Bodies: ID-1 PVC, and SIM sizes if you need them. Tooling: <a href="/en/products/nfc-labels-and-cards">card factory</a>. Smaller JCOP 4 lab card: <a href="/en/products/j3r180-javacard">J3R180</a>. CAP load: <a href="/en/tools/javacard-tool">JavaCard tool</a>.</p>`,
      features: [
        {
          title: "JCOP 4.5, not JCOP 4",
          description: "P71D600 / ID2. Same JC 3.0.5 Classic as J3R180, newer OS generation and larger NVM class.",
          icon: "Cpu",
        },
        {
          title: "~450 KB FLASH class",
          description: "NXP figure before MIFARE / applets / add-ons. Free heap on a loaded card is lower — measure the piece you receive.",
          icon: "Database",
        },
        {
          title: "Type A and Type B CL",
          description: "ISO/IEC 14443 A/B plus ISO/IEC 7816. J3R180 contactless in the P71 SDS is Type A.",
          icon: "Radio",
        },
      ],
      specs: [
        { key: "Commercial type", value: "J3R452" },
        { key: "OS / silicon", value: "JCOP 4.5 on SmartMX3 P71D600" },
        { key: "Java Card", value: "3.0.5 Classic" },
        { key: "GlobalPlatform", value: "2.3.1; SCP01 / SCP02 / SCP03" },
        { key: "NVM", value: "~450 KB FLASH (before MIFARE / applets / add-ons)" },
        { key: "Contact", value: "ISO/IEC 7816 T=0 / T=1" },
        { key: "Contactless", value: "ISO/IEC 14443 Type A and Type B, up to 848 kbit/s" },
        { key: "Optional", value: "MIFARE Plus EV2 or DESFire EV3 implementations" },
      ],
      useCases: ["Multi-applet ID / PKI that does not fit 180 kB class", "GP 2.3.1 dual-interface production", "Labs that specified JCOP 4.5 / P71D600"],
      highlights: ["JCOP 4.5 P71D600 — not J3R180", "~450 KB NVM class, not 180 kB", "Type A and Type B contactless"],
      seoTitle: "JCOP 4.5 J3R452 JavaCard P71D600 450 KB | NFCTEC",
      seoDescription:
        "NXP J3R452 JCOP 4.5 P71D600, Java Card 3.0.5 Classic, GP 2.3.1, dual-interface, ~450 KB FLASH class. Not J3R180. Factory quote from NFCTEC.",
      ctaLabel: "Request a factory quote",
      secondaryCtaLabel: "J3R180 (JCOP 4)",
    },
    zh: {
      name: "JCOP 4.5 J3R452 JavaCard",
      description:
        "NXP JCOP 4.5，硅片 SmartMX3 P71D600（J3R452）。Java Card 3.0.5 Classic、GlobalPlatform 2.3.1、双界面，加载插件前 FLASH 约 450 KB 档。PVC / SIM 形态询价。",
      tagline: "JCOP 4.5 · P71D600 · JC 3.0.5 · GP 2.3.1 · 约 450 KB NVM",
      intro:
        "J3R452 不是更大的 J3R180。它是 P71D600（ID2）上的 JCOP 4.5。可用 FLASH 约 450 KB（加载 MIFARE、应用、OS 插件之前）。双界面：ISO/IEC 7816 T=0/T=1 与 ISO/IEC 14443 Type A 和 Type B。",
      body: `<p><strong>不要和 J3R180 混用。</strong>J3R180 是 P71D321 SECID 线上的 JCOP 4，180 kB 容量档。J3R452 是 P71D600 上的 JCOP 4.5，FLASH 约 450 KB 档（NXP：加载 MIFARE、应用、OS 插件之前）。两者都是 Java Card 3.0.5 Classic；4.5 的 GP 为 2.3.1（SCP01 / SCP02 / SCP03）。CMOS040。PUF、Secure Box、委托管理。</p>
<p>J3R452 非接为 Type A 和 Type B，最高 848 kbit/s。接触约 688 kbit/s。可选 MIFARE Plus EV2 或 DESFire EV3 实现会占 NVM，询价写配置。卡体：ID-1 PVC，需要可做 SIM 尺寸。开模见 <a href="/zh/products/nfc-labels-and-cards">卡厂</a>。JCOP 4 实验室卡见 <a href="/zh/products/j3r180-javacard">J3R180</a>。装 CAP：<a href="/zh/tools/javacard-tool">JavaCard 工具</a>。</p>`,
      features: [
        {
          title: "JCOP 4.5，不是 JCOP 4",
          description: "P71D600 / ID2。与 J3R180 同为 JC 3.0.5 Classic，OS 代数更新、NVM 档更大。",
          icon: "Cpu",
        },
        {
          title: "约 450 KB FLASH 档",
          description: "NXP 数字是加载 MIFARE/应用/插件之前。装载后空闲堆更小，以到货卡实测为准。",
          icon: "Database",
        },
        {
          title: "非接 Type A 与 Type B",
          description: "ISO/IEC 14443 A/B + ISO/IEC 7816。J3R180 在 P71 短手册里非接是 Type A。",
          icon: "Radio",
        },
      ],
      specs: [
        { key: "订货型号", value: "J3R452" },
        { key: "系统 / 硅片", value: "JCOP 4.5，SmartMX3 P71D600" },
        { key: "Java Card", value: "3.0.5 Classic" },
        { key: "GlobalPlatform", value: "2.3.1；SCP01 / SCP02 / SCP03" },
        { key: "NVM", value: "FLASH 约 450 KB（加载 MIFARE / 应用 / 插件之前）" },
        { key: "接触", value: "ISO/IEC 7816 T=0 / T=1" },
        { key: "非接", value: "ISO/IEC 14443 Type A 与 Type B，最高 848 kbit/s" },
        { key: "可选", value: "MIFARE Plus EV2 或 DESFire EV3 实现" },
      ],
      useCases: ["180 kB 档装不下的多应用 ID / PKI", "GP 2.3.1 双界面量产", "规范写明 JCOP 4.5 / P71D600 的实验室"],
      highlights: ["JCOP 4.5 P71D600，不是 J3R180", "NVM 约 450 KB 档，不是 180 kB", "非接 Type A 与 Type B"],
      seoTitle: "JCOP 4.5 J3R452 JavaCard P71D600 450 KB | NFCTEC",
      seoDescription:
        "NXP J3R452 JCOP 4.5 P71D600，Java Card 3.0.5 Classic、GP 2.3.1、双界面，FLASH 约 450 KB 档。不是 J3R180。NFCTEC 卡厂询价。",
      ctaLabel: "卡厂询价",
      secondaryCtaLabel: "J3R180（JCOP 4）",
    },
  },
  {
    slug: "j3r180-javacard",
    category: "hardware",
    icon: "Cpu",
    sortOrder: 25,
    ctaUrl: AMAZON_J3R180,
    secondaryCtaUrl: "/products/j3r452-javacard",
    en: {
      name: "JCOP 4 J3R180 JavaCard",
      description:
        "NXP JCOP 4 P71 SECID (J3R180) on SmartMX3 P71D321 family. Java Card 3.0.5 Classic, GlobalPlatform 2.3, dual-interface, FLASH 180 kB class before add-ons. Amazon samples; volume by quote.",
      tagline: "JCOP 4 · P71D321 · JC 3.0.5 · GP 2.3 · 180 kB class",
      intro:
        "J3R180 is the JCOP 4 SECID 180 kB dual-interface part. Contact ISO/IEC 7816 T=0/T=1 and contactless ISO/IEC 14443 Type A. SCP01/SCP02/SCP03. 180 kB is the NXP memory class, not free heap after Config Module or DESFire/Plus add-ons.",
      body: `<p>Aligned to NXP JCOP 4 P71 short data sheet (SECID): OS JCOP 4 on SmartMX3 P71 (P71D321 family). Java Card 3.0.5 Classic. GlobalPlatform 2.3 (ID configuration / CIC), SCP01, SCP02 and SCP03. Dual-interface. FLASH available before MIFARE, applets and OS add-ons: <strong>180 kB class</strong>. Persistent heap on a typical empty SECID config is lower (SDS examples ~157–175 kB; DESFire EV2 8k add-on example ~129 kB).</p>
<p><strong>Not J3R452</strong> (that is JCOP 4.5 / P71D600 / ~450 KB). <strong>Not J2A040</strong> (JCOP 2.4.1 / P5CC040 / contact / ~40 KB EEPROM). Contact-only 180 kB cousin is J2R180, not this SKU. Comparison: <a href="/en/blog/jcop-j3r180-vs-j2a040">J3R180 vs J2A040</a>. Larger NVM: <a href="/en/products/j3r452-javacard">J3R452</a>.</p>
<p>Lab packs (US Amazon, dual-interface, no magstripe on that listing): <a href="${AMAZON_J3R180}">ASIN B0HD7Z44HJ</a>. Factory PVC with print or stripe is a body option, not a JCOP feature.</p>`,
      features: [
        {
          title: "JCOP 4 dual-interface",
          description: "ISO/IEC 7816 T=0/T=1 and ISO/IEC 14443 Type A T=CL on one module.",
          icon: "Radio",
        },
        {
          title: "GP 2.3, SCP03 capable",
          description: "ISD may still come up SCP02. INITIALIZE UPDATE decides. OS implements SCP03.",
          icon: "Shield",
        },
        {
          title: "180 kB class, not 450 KB",
          description: "SECID memory class. J3R452 is the 4.5 / ~450 KB SKU. Measure free NVM on the card in hand.",
          icon: "Database",
        },
      ],
      specs: [
        { key: "Commercial type", value: "J3R180 (not J2R180, not J3R452)" },
        { key: "OS / silicon", value: "JCOP 4 P71 on SmartMX3 P71D321 family" },
        { key: "Java Card", value: "3.0.5 Classic" },
        { key: "GlobalPlatform", value: "2.3; SCP01 / SCP02 / SCP03" },
        { key: "NVM", value: "FLASH 180 kB class (before MIFARE / applets / add-ons)" },
        { key: "Contact", value: "ISO/IEC 7816 T=0 / T=1" },
        { key: "Contactless", value: "ISO/IEC 14443 Type A, up to 848 kbit/s" },
        { key: "Sample", value: "Amazon US B0HD7Z44HJ (DIF, no magstripe on that pack)" },
      ],
      useCases: ["JCOP 4 applet development", "SCP03 dual-interface pilots", "Moving off JCOP 2.4.1 when 180 kB class is enough"],
      highlights: ["JCOP 4 P71D321, 180 kB class", "Dual-interface Type A", "Not JCOP 4.5 J3R452"],
      seoTitle: "JCOP 4 J3R180 JavaCard P71 180 kB | Amazon | NFCTEC",
      seoDescription:
        "NXP J3R180 JCOP 4 P71 (P71D321), Java Card 3.0.5 Classic, GP 2.3, dual-interface Type A, 180 kB FLASH class. Not J3R452. Amazon B0HD7Z44HJ. Volume from NFCTEC.",
      ctaLabel: "Buy on Amazon",
      secondaryCtaLabel: "J3R452 (JCOP 4.5)",
    },
    zh: {
      name: "JCOP 4 J3R180 JavaCard",
      description:
        "NXP JCOP 4 P71 SECID（J3R180），SmartMX3 P71D321 系列。Java Card 3.0.5 Classic、GlobalPlatform 2.3、双界面，加载插件前 FLASH 180 kB 档。Amazon 样品，批量询价。",
      tagline: "JCOP 4 · P71D321 · JC 3.0.5 · GP 2.3 · 180 kB 档",
      intro:
        "J3R180 是 JCOP 4 SECID 180 kB 双界面。接触 ISO/IEC 7816 T=0/T=1，非接 ISO/IEC 14443 Type A。SCP01/SCP02/SCP03。180 kB 是 NXP 容量档，不是扣掉 Config Module 或 DESFire/Plus 之后的空闲堆。",
      body: `<p>对齐 NXP JCOP 4 P71 短数据手册（SECID）：操作系统 JCOP 4，硅片 SmartMX3 P71（P71D321 系列）。Java Card 3.0.5 Classic。GlobalPlatform 2.3，SCP01、SCP02、SCP03。双界面。加载 MIFARE、应用、OS 插件前的 FLASH：<strong>180 kB 档</strong>。典型空 SECID 配置持久堆更低（手册示例约 157–175 kB；DESFire EV2 8k 插件示例约 129 kB）。</p>
<p><strong>不是 J3R452</strong>（JCOP 4.5 / P71D600 / 约 450 KB）。<strong>不是 J2A040</strong>（JCOP 2.4.1 / P5CC040 / 仅接触 / 约 40 KB EEPROM）。接触式 180 kB 近亲是 J2R180，不是本 SKU。对照：<a href="/zh/blog/jcop-j3r180-vs-j2a040">J3R180 vs J2A040</a>。更大 NVM：<a href="/zh/products/j3r452-javacard">J3R452</a>。</p>
<p>实验室用卡（美国 Amazon，双界面，该链接无磁条）：<a href="${AMAZON_J3R180}">ASIN B0HD7Z44HJ</a>。彩印或磁条是卡体选项，不是 JCOP 功能。</p>`,
      features: [
        {
          title: "JCOP 4 双界面",
          description: "ISO/IEC 7816 T=0/T=1 与 ISO/IEC 14443 Type A T=CL 同一模块。",
          icon: "Radio",
        },
        {
          title: "GP 2.3，具备 SCP03",
          description: "出厂 ISD 仍可能是 SCP02。以 INITIALIZE UPDATE 为准。OS 实现 SCP03。",
          icon: "Shield",
        },
        {
          title: "180 kB 档，不是 450 KB",
          description: "SECID 容量档。J3R452 才是 4.5 / 约 450 KB。以手头卡测空闲 NVM。",
          icon: "Database",
        },
      ],
      specs: [
        { key: "订货型号", value: "J3R180（不是 J2R180，不是 J3R452）" },
        { key: "系统 / 硅片", value: "JCOP 4 P71，SmartMX3 P71D321 系列" },
        { key: "Java Card", value: "3.0.5 Classic" },
        { key: "GlobalPlatform", value: "2.3；SCP01 / SCP02 / SCP03" },
        { key: "NVM", value: "FLASH 180 kB 档（加载 MIFARE / 应用 / 插件之前）" },
        { key: "接触", value: "ISO/IEC 7816 T=0 / T=1" },
        { key: "非接", value: "ISO/IEC 14443 Type A，最高 848 kbit/s" },
        { key: "样品", value: "Amazon US B0HD7Z44HJ（双界面，该包装无磁条）" },
      ],
      useCases: ["JCOP 4 应用开发", "SCP03 双界面试点", "离开 JCOP 2.4.1 且 180 kB 档够用"],
      highlights: ["JCOP 4 P71D321，180 kB 档", "双界面 Type A", "不是 JCOP 4.5 J3R452"],
      seoTitle: "JCOP 4 J3R180 JavaCard P71 180 kB | Amazon | NFCTEC",
      seoDescription:
        "NXP J3R180 JCOP 4 P71（P71D321），Java Card 3.0.5 Classic、GP 2.3、双界面 Type A，FLASH 180 kB 档。不是 J3R452。Amazon B0HD7Z44HJ。批量询 NFCTEC。",
      ctaLabel: "Amazon 购买",
      secondaryCtaLabel: "J3R452（JCOP 4.5）",
    },
  },
  {
    slug: "j2a040-javacard",
    category: "hardware",
    icon: "Cpu",
    sortOrder: 60,
    ctaUrl: "/contact",
    secondaryCtaUrl: "/blog/jcop-j3r180-vs-j2a040",
    en: {
      name: "JCOP 2.4.1 J2A040 JavaCard",
      description:
        "NXP JCOP 2.4.1 R3 on SmartMX P5CC040 (J2A040). Java Card 2.2.2, GlobalPlatform 2.1.1, contact-only, ~40 KB EEPROM class (typical persistent heap ~36 KB). SCP01/SCP02 only.",
      tagline: "JCOP 2.4.1 · P5CC040 · JC 2.2.2 · GP 2.1.1 · contact",
      intro:
        "J2A040 is the contact-only JCOP 2.4.1 40 KB class card. It is not dual-interface, not Java Card 3.0.5, not GP 2.3, not SCP03. Use it when a CAP or GP 2.1.1 script must stay on that generation. New dual-interface work is J3R180 or J3R452.",
      body: `<p>NXP JCOP V2.4.1 on SmartMX <strong>P5CC040</strong>. Java Card <strong>2.2.2</strong>. GlobalPlatform <strong>2.1.1</strong>. Interface: <strong>ISO/IEC 7816 contact only</strong> (T=0/T=1). EEPROM class ~40 KB; NXP memory map for a typical empty config is about <strong>35 940 bytes</strong> persistent heap. Secure channel: SCP01 / SCP02. There is no SCP03 on this OS.</p>
<p>Need contactless on the 2.4.1 generation: that SKU is <strong>J3A040</strong>, not J2A040. Need JC 3.0.5 and dual-interface: <a href="/en/products/j3r180-javacard">J3R180</a> (JCOP 4, 180 kB class) or <a href="/en/products/j3r452-javacard">J3R452</a> (JCOP 4.5, ~450 KB class). Table: <a href="/en/blog/jcop-j3r180-vs-j2a040">J3R180 vs J2A040</a>.</p>`,
      features: [
        {
          title: "Java Card 2.2.2 only",
          description: "CAPs that use Java Card 3.0.5 Classic APIs will not install.",
          icon: "History",
        },
        {
          title: "GP 2.1.1, SCP02",
          description: "Do not open SCP03. EXTERNAL AUTHENTICATE will fail.",
          icon: "FileCode",
        },
        {
          title: "No T=CL on J2A040",
          description: "ISO/IEC 14443 SELECT passing means you do not have this SKU.",
          icon: "Cable",
        },
      ],
      specs: [
        { key: "Commercial type", value: "J2A040 (not J3A040, not J3R180)" },
        { key: "OS / silicon", value: "JCOP 2.4.1 R3 on SmartMX P5CC040" },
        { key: "Java Card", value: "2.2.2" },
        { key: "GlobalPlatform", value: "2.1.1; SCP01 / SCP02 (no SCP03)" },
        { key: "NVM", value: "~40 KB EEPROM class; typical heap ~35 940 bytes" },
        { key: "Contact", value: "ISO/IEC 7816 T=0 / T=1" },
        { key: "Contactless", value: "None on J2A040" },
      ],
      useCases: ["Existing JCOP 2.4.1 GP scripts", "Small 2.2.2 CAPs", "Contact-only lab cards"],
      highlights: ["P5CC040, not P71", "Contact only — not DIF", "No JC 3.0.5 / no SCP03"],
      seoTitle: "JCOP 2.4.1 J2A040 JavaCard P5CC040 | NFCTEC",
      seoDescription:
        "NXP J2A040 JCOP 2.4.1 on P5CC040, Java Card 2.2.2, GP 2.1.1, contact-only, ~40 KB EEPROM. Not dual-interface, not J3R180. Quote from NFCTEC.",
      ctaLabel: "Request a quote",
      secondaryCtaLabel: "vs J3R180",
    },
    zh: {
      name: "JCOP 2.4.1 J2A040 JavaCard",
      description:
        "NXP JCOP 2.4.1 R3，硅片 SmartMX P5CC040（J2A040）。Java Card 2.2.2、GlobalPlatform 2.1.1、仅接触，EEPROM 约 40 KB 档（典型持久堆约 36 KB）。仅 SCP01/SCP02。",
      tagline: "JCOP 2.4.1 · P5CC040 · JC 2.2.2 · GP 2.1.1 · 接触式",
      intro:
        "J2A040 是仅接触的 JCOP 2.4.1 40 KB 档。不是双界面，不是 Java Card 3.0.5，不是 GP 2.3，没有 SCP03。只有 CAP 或 GP 2.1.1 脚本必须留在这一代时才用。新的双界面用 J3R180 或 J3R452。",
      body: `<p>NXP JCOP V2.4.1，硅片 SmartMX <strong>P5CC040</strong>。Java Card <strong>2.2.2</strong>。GlobalPlatform <strong>2.1.1</strong>。界面：<strong>仅 ISO/IEC 7816 接触</strong>（T=0/T=1）。EEPROM 约 40 KB 档；典型空配置持久堆约 <strong>35 940 字节</strong>。安全通道：SCP01 / SCP02。本 OS 无 SCP03。</p>
<p>2.4.1 代要非接：型号是 <strong>J3A040</strong>，不是 J2A040。要 JC 3.0.5 和双界面：<a href="/zh/products/j3r180-javacard">J3R180</a>（JCOP 4，180 kB 档）或 <a href="/zh/products/j3r452-javacard">J3R452</a>（JCOP 4.5，约 450 KB 档）。对照表：<a href="/zh/blog/jcop-j3r180-vs-j2a040">J3R180 vs J2A040</a>。</p>`,
      features: [
        {
          title: "只有 Java Card 2.2.2",
          description: "使用 Java Card 3.0.5 Classic API 的 CAP 装不上。",
          icon: "History",
        },
        {
          title: "GP 2.1.1，SCP02",
          description: "不要开 SCP03，EXTERNAL AUTHENTICATE 会失败。",
          icon: "FileCode",
        },
        {
          title: "J2A040 无 T=CL",
          description: "ISO/IEC 14443 SELECT 能过，就不是这个型号。",
          icon: "Cable",
        },
      ],
      specs: [
        { key: "订货型号", value: "J2A040（不是 J3A040，不是 J3R180）" },
        { key: "系统 / 硅片", value: "JCOP 2.4.1 R3，SmartMX P5CC040" },
        { key: "Java Card", value: "2.2.2" },
        { key: "GlobalPlatform", value: "2.1.1；SCP01 / SCP02（无 SCP03）" },
        { key: "NVM", value: "EEPROM 约 40 KB 档；典型堆约 35 940 字节" },
        { key: "接触", value: "ISO/IEC 7816 T=0 / T=1" },
        { key: "非接", value: "J2A040 无" },
      ],
      useCases: ["已有 JCOP 2.4.1 GP 脚本", "小型 2.2.2 CAP", "仅接触实验室卡"],
      highlights: ["P5CC040，不是 P71", "仅接触，不是双界面", "无 JC 3.0.5 / 无 SCP03"],
      seoTitle: "JCOP 2.4.1 J2A040 JavaCard P5CC040 | NFCTEC",
      seoDescription:
        "NXP J2A040 JCOP 2.4.1，P5CC040，Java Card 2.2.2、GP 2.1.1、仅接触，EEPROM 约 40 KB。不是双界面，不是 J3R180。询 NFCTEC。",
      ctaLabel: "询价",
      secondaryCtaLabel: "对比 J3R180",
    },
  },
];

export const CATALOG_PRODUCT_SLUGS = CATALOG.map((p) => p.slug);

/** CMS entries we do not sell as products. */
export const HIDDEN_PRODUCT_SLUGS = new Set(["nfc-issuance-sdk"]);

function isHiddenProductSlug(slug: string) {
  return HIDDEN_PRODUCT_SLUGS.has(slug);
}

function toProduct(def: CatalogDef, locale: Locale): CmsProduct {
  const copy = locale === "zh" ? def.zh : def.en;
  return {
    id: `catalog:${def.slug}`,
    locale,
    slug: def.slug,
    name: copy.name,
    description: copy.description,
    tagline: copy.tagline,
    intro: copy.intro,
    category: def.category,
    icon: def.icon,
    heroImage: null,
    images: [],
    features: copy.features,
    specs: copy.specs,
    useCases: copy.useCases,
    highlights: copy.highlights,
    body: copy.body,
    hasDetailPage: true,
    ctaUrl: def.ctaUrl,
    ctaLabel: copy.ctaLabel,
    secondaryCtaUrl: def.secondaryCtaUrl,
    secondaryCtaLabel: copy.secondaryCtaLabel,
    sortOrder: def.sortOrder,
    seoTitle: copy.seoTitle,
    seoDescription: copy.seoDescription,
    ogImage: null,
  };
}

export function getCatalogProduct(locale: Locale, slug: string): CmsProduct | null {
  if (isHiddenProductSlug(slug)) return null;
  const def = CATALOG.find((p) => p.slug === slug);
  return def ? toProduct(def, locale) : null;
}

export function catalogProducts(locale: Locale, category?: "software" | "hardware"): CmsProduct[] {
  return CATALOG.filter((p) => !category || p.category === category).map((p) => toProduct(p, locale));
}

function overlay(cms: CmsProduct, local: CmsProduct | null): CmsProduct {
  if (!local) return cms;
  const long = (s: string | null | undefined) => (s ?? "").trim().length;
  return {
    ...cms,
    description: long(cms.description) >= 40 ? cms.description : local.description,
    tagline: cms.tagline || local.tagline,
    intro: long(cms.intro) > 80 ? cms.intro : local.intro,
    body: long(cms.body) > 80 ? cms.body : local.body,
    features: cms.features.length ? cms.features : local.features,
    specs: cms.specs.length ? cms.specs : local.specs,
    useCases: cms.useCases.length ? cms.useCases : local.useCases,
    highlights: cms.highlights.length ? cms.highlights : local.highlights,
    hasDetailPage: cms.hasDetailPage || local.hasDetailPage,
    ctaUrl: cms.ctaUrl || local.ctaUrl,
    ctaLabel: cms.ctaLabel || local.ctaLabel,
    secondaryCtaUrl: cms.secondaryCtaUrl || local.secondaryCtaUrl,
    secondaryCtaLabel: cms.secondaryCtaLabel || local.secondaryCtaLabel,
    seoTitle: cms.seoTitle || local.seoTitle,
    seoDescription: cms.seoDescription || local.seoDescription,
    sortOrder: local.sortOrder,
    icon: cms.icon || local.icon,
  };
}

/** CMS rows first, then catalog SKUs the API does not have yet. */
export function mergeCatalogProducts(
  rows: CmsProduct[],
  locale: Locale,
  category?: "software" | "hardware",
): CmsProduct[] {
  const extras = catalogProducts(locale, category);
  const bySlug = new Map(extras.map((p) => [p.slug, p]));
  const merged = rows.map((row) => {
    const next = overlay(row, bySlug.get(row.slug) ?? null);
    if (!bySlug.has(row.slug)) {
      return { ...next, sortOrder: 200 + row.sortOrder };
    }
    return next;
  });
  const seen = new Set(merged.map((p) => p.slug));
  for (const extra of extras) {
    if (!seen.has(extra.slug)) merged.push(extra);
  }
  return merged
    .filter((p) => !isHiddenProductSlug(p.slug))
    .sort((a, b) => a.sortOrder - b.sortOrder || a.name.localeCompare(b.name));
}

export function featuredSellableProducts(products: CmsProduct[], limit = 4): CmsProduct[] {
  const hardware = products.filter((p) => p.category === "hardware");
  const software = products.filter((p) => p.category !== "hardware");
  return [...hardware, ...software].slice(0, limit);
}
