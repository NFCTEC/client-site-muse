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
    ctaUrl: "/inquiry",
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
    ctaUrl: "/inquiry",
    secondaryCtaUrl: "/tools/ntag424-tool",
    en: {
      name: "NTAG 424 DNA tags",
      description:
        "NXP NTAG 424 DNA, NFC Forum Type 4. Each tap can emit a SUN URL with UID, read counter and AES-CMAC. Wet inlay, sticker and PVC for brand protection.",
      tagline: "SUN URL · AES-CMAC · read counter · Type 4",
      intro:
        "NTAG 424 DNA is the NXP Type 4 tag for a URL that changes every tap. Secure Dynamic Messaging (SUN) mirrors the UID, a read counter and an AES-CMAC into the NDEF. The phone opens a normal link. Your server checks the CMAC and that the counter moved forward, so a photographed URL fails the next time.",
      body: `<p><strong>The phone does not verify anything.</strong> Stock NFC on iOS and Android opens the HTTPS link. NTAG 424 DNA (ISO/IEC 14443-4, NFC Forum Type 4, 7-byte UID) builds that link on the tag with AES-128 Secure Dynamic Messaging. TAM1 is a CMAC over the UID: the same URL still verifies if you only check the MAC. TAM2 folds in the SDM read counter, so a replay fails once the server has seen a higher counter for that UID. Encrypt the PICC data when the UID should not sit in the clear in the browser history.</p>
<p>SUN only exists if SDM is turned on. A line that writes a static NDEF and skips the mirror offsets, CMAC offset and per-UID AES keys has shipped an <a href="/en/products/ntag213-215-216">NTAG21x</a> with a more expensive die. Keys are diversified from a master; one dumped tag must not open the batch. The NXP originality signature is a separate check that the silicon is genuine — it is not the SUN MAC. A broken seal in the URL is NTAG 424 DNA TagTamper, a different IC. Say so on the RFQ.</p>
<p>User NDEF is up to about 416 bytes, depending on file layout. Interface is Type A, up to 848 kbit/s. We laminate wet inlay, sticker and PVC, and can set the NDEF template, SDM files and keys, or ship blank for your HSM. Lab check: <a href="/en/tools/ntag424-tool">NTAG 424 DNA tool</a>. Worked example: <a href="/en/blog/ntag424-dna-sun-url-authentication-example">SUN authentication</a>. Programme notes: <a href="/en/solutions/brand">brand protection</a>. Bodies: <a href="/en/products/nfc-labels-and-cards">card factory</a>.</p>`,
      features: [
        {
          title: "SUN URL with a counter",
          description:
            "Each tap mirrors UID, SDM read counter and AES-CMAC. TAM2 makes a copied link fail. The phone only opens HTTPS.",
          icon: "Link",
        },
        {
          title: "AES-128, per UID",
          description:
            "Personalization uses AES mutual authentication. Diversify the SDM keys. A Type 2 password bit is not this.",
          icon: "Lock",
        },
        {
          title: "Encoded or blank",
          description:
            "We set the NDEF template, mirror offsets and keys, or ship blank inlays, stickers and PVC for your line.",
          icon: "KeyRound",
        },
      ],
      specs: [
        { key: "Chip", value: "NXP NTAG 424 DNA" },
        { key: "Interface", value: "ISO/IEC 14443-4 Type A, NFC Forum Type 4, up to 848 kbit/s" },
        { key: "UID", value: "7 bytes" },
        { key: "Crypto", value: "AES-128; originality signature separate from SUN" },
        { key: "SUN / SDM", value: "UID and SDM read counter mirrored plain or encrypted; AES-CMAC. TAM1 is UID-only; TAM2 includes the counter" },
        { key: "User NDEF", value: "Up to about 416 bytes (file layout dependent)" },
        { key: "Not this IC", value: "NTAG213/215/216 (static Type 2). Tag tamper status is NTAG 424 DNA TagTamper" },
        { key: "Form factors", value: "Wet inlay, sticker, PVC. SDM encoding or blank" },
      ],
      useCases: [
        "Brand protection where a photo of the tag must not replay",
        "One-time or counted HTTPS links with no consumer app",
        "UID-diversified AES keys and a server-side CMAC check",
      ],
      highlights: ["SUN CMAC URL, counter stops replay", "AES-128 Type 4, not NTAG21x", "Inlay, sticker, PVC, encoding or blank"],
      seoTitle: "NTAG 424 DNA Tags with SUN CMAC URLs | NFCTEC",
      seoDescription:
        "NXP NTAG 424 DNA Type 4 tags. Each tap builds a SUN URL with UID, read counter and AES-CMAC so a copied link fails. Wet inlay, sticker, PVC. Quote from NFCTEC.",
      ctaLabel: "Request a quote",
      secondaryCtaLabel: "SUN tool",
    },
    zh: {
      name: "NTAG 424 DNA 标签",
      description:
        "NXP NTAG 424 DNA，NFC Forum Type 4。每次拍卡可生成带 UID、读计数器和 AES-CMAC 的 SUN 链接。湿 Inlay、贴纸、PVC，用于防伪。",
      tagline: "SUN 链接 · AES-CMAC · 读计数器 · Type 4",
      intro:
        "静态 NDEF 不够时用 NTAG 424 DNA。Secure Dynamic Messaging（SUN）把 UID、读计数器和 AES-CMAC 写进 NDEF。手机打开普通链接，服务器验 CMAC，并确认计数器往前走了，拍过照的链接下一次会失败。",
      body: `<p><strong>手机不做校验。</strong>iOS 和 Android 的系统 NFC 只打开 HTTPS。NTAG 424 DNA（ISO/IEC 14443-4、NFC Forum Type 4、7 字节 UID）在标签上用 AES-128 组这条链接。TAM1 的 CMAC 只覆盖 UID：服务器若只验 MAC，同一条链接仍然能过。TAM2 把 SDM 读计数器算进 CMAC，该 UID 已经见过更大的计数器之后，重放会失败。不希望 UID 明文留在浏览器记录里时，把 PICC 数据加密。</p>
<p>没打开 SDM，就没有 SUN。产线只写了静态 NDEF，没设镜像偏移、CMAC 偏移和按 UID 分散的 AES 密钥，交出去的是更贵的 <a href="/zh/products/ntag213-215-216">NTAG21x</a>。密钥从主密钥分散，一张被读走的标签不能打开整批。NXP originality signature 只证明硅片是原厂，不是 SUN 的 MAC。链接里要带开封状态，那是 NTAG 424 DNA TagTamper，另一颗芯片，询价写明。</p>
<p>用户 NDEF 最多约 416 字节，视文件布局而定。接口为 Type A，最高 848 kbit/s。湿 Inlay、贴纸、PVC 都做，可写 NDEF 模板、SDM 文件和密钥，也可空白交付进你们的 HSM。实验室核对：<a href="/zh/tools/ntag424-tool">NTAG 424 DNA 工具</a>。示例：<a href="/zh/blog/ntag424-dna-sun-url-authentication-example">SUN 验证</a>。项目说明：<a href="/zh/solutions/brand">品牌防伪</a>。卡体：<a href="/zh/products/nfc-labels-and-cards">卡厂</a>。</p>`,
      features: [
        {
          title: "带计数器的 SUN 链接",
          description: "每次拍卡镜像 UID、SDM 读计数器和 AES-CMAC。TAM2 让复制的链接失败。手机只负责打开 HTTPS。",
          icon: "Link",
        },
        {
          title: "AES-128，按 UID 分散",
          description: "个人化走 AES 互认证。SDM 密钥按 UID 分散。这不是 Type 2 的密码位。",
          icon: "Lock",
        },
        {
          title: "可编码，也可空白",
          description: "可写 NDEF 模板、镜像偏移和密钥，也可交空白 Inlay、贴纸和 PVC，接到你们自己的产线。",
          icon: "KeyRound",
        },
      ],
      specs: [
        { key: "芯片", value: "NXP NTAG 424 DNA" },
        { key: "接口", value: "ISO/IEC 14443-4 Type A，NFC Forum Type 4，最高 848 kbit/s" },
        { key: "UID", value: "7 字节" },
        { key: "算法", value: "AES-128；originality signature 与 SUN 分开" },
        { key: "SUN / SDM", value: "UID 与 SDM 读计数器可明文或加密镜像，带 AES-CMAC。TAM1 只含 UID；TAM2 含计数器" },
        { key: "用户 NDEF", value: "最多约 416 字节（取决于文件布局）" },
        { key: "不是这颗", value: "NTAG213/215/216（静态 Type 2）。开封状态是 NTAG 424 DNA TagTamper" },
        { key: "形态", value: "湿 Inlay、贴纸、PVC。可 SDM 编码或空白" },
      ],
      useCases: ["标签被拍照也不能重放的品牌防伪", "不需要消费者 App 的一次性或计数 HTTPS 链接", "按 UID 分散的 AES 与服务端 CMAC 校验"],
      highlights: ["SUN CMAC 链接，计数器挡住重放", "AES-128 Type 4，不是 NTAG21x", "Inlay、贴纸、PVC，可编码或空白"],
      seoTitle: "NTAG 424 DNA 标签：SUN 动态 URL 与 CMAC | NFCTEC",
      seoDescription:
        "NXP NTAG 424 DNA Type 4 标签。每次拍卡生成带 UID、读计数器和 AES-CMAC 的 SUN 链接，复制后再打开会失败。湿 Inlay、贴纸、PVC。询 NFCTEC。",
      ctaLabel: "询价",
      secondaryCtaLabel: "SUN 工具",
    },
  },
  {
    slug: "mifare-desfire-ev3",
    category: "hardware",
    icon: "CreditCard",
    sortOrder: 12,
    ctaUrl: "/inquiry",
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
    ctaUrl: "/inquiry",
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
    ctaUrl: "/inquiry",
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
    ctaUrl: "/inquiry",
    secondaryCtaUrl: "/products/j3r180-javacard",
    en: {
      name: "JCOP 4.5 J3R452 JavaCard",
      description:
        "NXP JCOP 4.5 on SmartMX3 P71D600 (J3R452) with on-card Ed25519 (RFC 8032) and X25519. Java Card 3.0.5 and JCOP 4, including J3R180, do not expose Ed25519. Also AES, RSA to 4096, ECC to 521-bit, ~450 KB FLASH, dual-interface Type A and Type B.",
      tagline: "On-card Ed25519 · JCOP 4.5 · P71D600 · ~450 KB",
      intro:
        "J3R452 is the JCOP 4.5 part you pick when the applet must sign Ed25519 inside the secure element. Java Card 3.0.5 Classic has no standard Ed25519 constant; JCOP 4.5 adds it through the NXP crypto extension (RFC 8032), plus X25519 and Curve448 key agreement (RFC 7748). JCOP 4 J3R180 stops at NIST and Brainpool ECDSA/ECDH. FLASH is about 450 KB before MIFARE or OS add-ons. Dual-interface: ISO/IEC 7816 and ISO/IEC 14443 Type A and Type B.",
      body: `<p><strong>Ed25519 is why this is not a bigger J3R180.</strong> J3R452 is JCOP 4.5 on P71D600 (ID2). The card can generate an Ed25519 key and sign or verify per RFC 8032. The same library does Montgomery Diffie–Hellman on Curve25519 (X25519) and Curve448. Call sites are the NXP JCOP extension, not a Java Card 3.0.5 <code>Signature</code> algorithm id — a CAP written only against <code>javacard.security</code> NIST curves will not grow an Ed25519 path by itself. <a href="/en/products/j3r180-javacard">J3R180</a> (JCOP 4, P71D321, 180 kB) and J2A040 (JCOP 2.4.1) do not offer Ed25519.</p>
<p>Alongside that: AES-128/192/256, DES and 2-key/3-key TDES, RSA 512–4096 with on-card key generation, ECC over GF(p) up to 521 bits (NIST and Brainpool) for ECDSA and ECDH, SHA-1 and SHA-2 (224/256/384/512). GlobalPlatform 2.3.1, SCP01 / SCP02 / SCP03. CMOS040. PUF, Secure Box, delegated management. FLASH class is ~450 KB before MIFARE, applets and OS add-ons; free heap on a loaded card is lower.</p>
<p>Contactless is Type A and Type B, up to 848 kbit/s. Contact up to about 688 kbit/s. J3R180 contactless in the P71 short data sheet is Type A only. Optional MIFARE Plus EV2 or DESFire EV3 implementations consume NVM — quote the configuration and say if the applet needs Ed25519. Bodies: ID-1 PVC, SIM sizes on request. Tooling: <a href="/en/products/nfc-labels-and-cards">card factory</a>. CAP load: <a href="/en/tools/javacard-tool">JavaCard tool</a>.</p>`,
      features: [
        {
          title: "On-card Ed25519",
          description:
            "RFC 8032 key generation, sign and verify in the SE. Java Card 3.0.5 and JCOP 4 do not include it. Use the NXP extension, not a standard Signature constant.",
          icon: "KeyRound",
        },
        {
          title: "X25519, Curve448, and classic PKI",
          description:
            "Montgomery key agreement (RFC 7748), NIST and Brainpool ECDSA/ECDH to 521 bits, RSA to 4096, AES-128/192/256, SHA-2.",
          icon: "Shield",
        },
        {
          title: "~450 KB, Type A and Type B",
          description:
            "P71D600 FLASH class before MIFARE / applets / add-ons. J3R180 is the 180 kB Type A JCOP 4 card. Measure free NVM on the piece you receive.",
          icon: "Database",
        },
      ],
      specs: [
        { key: "Commercial type", value: "J3R452" },
        { key: "OS / silicon", value: "JCOP 4.5 on SmartMX3 P71D600" },
        { key: "Java Card", value: "3.0.5 Classic (Ed25519 via NXP extension)" },
        { key: "GlobalPlatform", value: "2.3.1; SCP01 / SCP02 / SCP03" },
        { key: "EdDSA / MontDH", value: "Ed25519 (RFC 8032); X25519 and Curve448 (RFC 7748)" },
        { key: "Other crypto", value: "AES-128/192/256; DES / TDES; RSA to 4096; ECDSA/ECDH to 521-bit NIST and Brainpool; SHA-1; SHA-224/256/384/512" },
        { key: "NVM", value: "~450 KB FLASH (before MIFARE / applets / add-ons)" },
        { key: "Contact", value: "ISO/IEC 7816 T=0 / T=1, up to ~688 kbit/s" },
        { key: "Contactless", value: "ISO/IEC 14443 Type A and Type B, up to 848 kbit/s" },
        { key: "Optional", value: "MIFARE Plus EV2 or DESFire EV3 implementations" },
      ],
      useCases: [
        "On-card Ed25519: hardware wallets, SSH, and PKI that cannot fall back to NIST P-256",
        "Multi-applet ID that does not fit the 180 kB class",
        "GP 2.3.1 dual-interface lines that also talk to Type B readers",
      ],
      highlights: ["On-card Ed25519 — absent on JCOP 4 and most JavaCards", "X25519 / Curve448 plus RSA and NIST ECC", "JCOP 4.5 P71D600, ~450 KB, Type A and Type B"],
      seoTitle: "J3R452 JavaCard with On-Card Ed25519 | NFCTEC",
      seoDescription:
        "NXP J3R452 runs JCOP 4.5 on P71D600 with on-card Ed25519 and X25519. About 450 KB FLASH, dual-interface Type A and B. Quote from NFCTEC.",
      ctaLabel: "Request a factory quote",
      secondaryCtaLabel: "J3R180 (no Ed25519)",
    },
    zh: {
      name: "JCOP 4.5 J3R452 JavaCard",
      description:
        "NXP JCOP 4.5，硅片 SmartMX3 P71D600（J3R452），片上 Ed25519（RFC 8032）与 X25519。Java Card 3.0.5 与 JCOP 4（含 J3R180）没有 Ed25519。另有 AES、RSA 至 4096、ECC 至 521 位、FLASH 约 450 KB、双界面 Type A 与 Type B。",
      tagline: "片上 Ed25519 · JCOP 4.5 · P71D600 · 约 450 KB",
      intro:
        "应用必须在安全元件里做 Ed25519 签名时选 J3R452。Java Card 3.0.5 Classic 没有标准 Ed25519 常量，JCOP 4.5 通过 NXP 密码扩展提供（RFC 8032），并带 X25519 与 Curve448 密钥协商（RFC 7748）。JCOP 4 的 J3R180 停在 NIST 与 Brainpool 的 ECDSA/ECDH。加载 MIFARE 或 OS 插件前 FLASH 约 450 KB。双界面：ISO/IEC 7816 与 ISO/IEC 14443 Type A、Type B。",
      body: `<p><strong>Ed25519 才是它和更大容量的 J3R180 之间的差别。</strong>J3R452 是 P71D600（ID2）上的 JCOP 4.5。卡内可生成 Ed25519 密钥，并按 RFC 8032 签名、验签。同一套库支持 Curve25519（X25519）与 Curve448 上的 Montgomery Diffie–Hellman。调用走 NXP JCOP 扩展，不是 Java Card 3.0.5 的 <code>Signature</code> 算法号——只对着 <code>javacard.security</code> NIST 曲线写的 CAP，不会自动多出 Ed25519。<a href="/zh/products/j3r180-javacard">J3R180</a>（JCOP 4、P71D321、180 kB）和 J2A040（JCOP 2.4.1）都没有 Ed25519。</p>
<p>其余协处理器：AES-128/192/256，DES 与 2-key/3-key TDES，RSA 512–4096 且可片上生成密钥，ECC GF(p) 最高 521 位（NIST 与 Brainpool）做 ECDSA 与 ECDH，SHA-1 与 SHA-2（224/256/384/512）。GlobalPlatform 2.3.1，SCP01 / SCP02 / SCP03。CMOS040。PUF、Secure Box、委托管理。FLASH 约 450 KB 是加载 MIFARE、应用、OS 插件之前的档位，装载后空闲堆更小。</p>
<p>非接为 Type A 与 Type B，最高 848 kbit/s。接触约 688 kbit/s。J3R180 在 P71 短手册里非接只有 Type A。可选 MIFARE Plus EV2 或 DESFire EV3 会占 NVM，询价写配置，并写明应用是否要 Ed25519。卡体：ID-1 PVC，需要可做 SIM 尺寸。开模见 <a href="/zh/products/nfc-labels-and-cards">卡厂</a>。装 CAP：<a href="/zh/tools/javacard-tool">JavaCard 工具</a>。</p>`,
      features: [
        {
          title: "片上 Ed25519",
          description: "安全元件内按 RFC 8032 生成密钥、签名、验签。Java Card 3.0.5 与 JCOP 4 没有。走 NXP 扩展，不是标准 Signature 常量。",
          icon: "KeyRound",
        },
        {
          title: "X25519、Curve448 与常规 PKI",
          description: "Montgomery 密钥协商（RFC 7748），NIST 与 Brainpool ECDSA/ECDH 至 521 位，RSA 至 4096，AES-128/192/256，SHA-2。",
          icon: "Shield",
        },
        {
          title: "约 450 KB，Type A 与 Type B",
          description: "P71D600 在加载 MIFARE / 应用 / 插件前的 FLASH 档。J3R180 是 180 kB、仅 Type A 的 JCOP 4。空闲 NVM 以到货卡实测为准。",
          icon: "Database",
        },
      ],
      specs: [
        { key: "订货型号", value: "J3R452" },
        { key: "系统 / 硅片", value: "JCOP 4.5，SmartMX3 P71D600" },
        { key: "Java Card", value: "3.0.5 Classic（Ed25519 走 NXP 扩展）" },
        { key: "GlobalPlatform", value: "2.3.1；SCP01 / SCP02 / SCP03" },
        { key: "EdDSA / MontDH", value: "Ed25519（RFC 8032）；X25519 与 Curve448（RFC 7748）" },
        { key: "其他算法", value: "AES-128/192/256；DES / TDES；RSA 至 4096；ECDSA/ECDH 至 521 位 NIST 与 Brainpool；SHA-1；SHA-224/256/384/512" },
        { key: "NVM", value: "FLASH 约 450 KB（加载 MIFARE / 应用 / 插件之前）" },
        { key: "接触", value: "ISO/IEC 7816 T=0 / T=1，约 688 kbit/s" },
        { key: "非接", value: "ISO/IEC 14443 Type A 与 Type B，最高 848 kbit/s" },
        { key: "可选", value: "MIFARE Plus EV2 或 DESFire EV3 实现" },
      ],
      useCases: [
        "片上 Ed25519：硬件钱包、SSH，以及不能退回 NIST P-256 的 PKI",
        "180 kB 档装不下的多应用身份",
        "还要对接 Type B 读卡器的 GP 2.3.1 双界面产线",
      ],
      highlights: ["片上 Ed25519，JCOP 4 和多数 JavaCard 没有", "X25519 / Curve448，外加 RSA 与 NIST ECC", "JCOP 4.5 P71D600，约 450 KB，Type A 与 Type B"],
      seoTitle: "J3R452 JavaCard：片上 Ed25519 | NFCTEC",
      seoDescription:
        "NXP J3R452，JCOP 4.5，P71D600，片上 Ed25519 与 X25519。FLASH 约 450 KB，双界面 Type A 与 Type B。询 NFCTEC。",
      ctaLabel: "卡厂询价",
      secondaryCtaLabel: "J3R180（无 Ed25519）",
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
        "NXP JCOP 4 P71 SECID (J3R180) on SmartMX3 P71D321. Java Card 3.0.5, GP 2.3, SCP03, AES, RSA to 4096, NIST/Brainpool ECC. Dual-interface Type A, 180 kB FLASH class. No Ed25519 — that is J3R452. Amazon samples; volume by quote.",
      tagline: "JCOP 4 · AES / RSA / NIST ECC · 180 kB · no Ed25519",
      intro:
        "J3R180 is the JCOP 4 SECID card for applets that stay on AES, RSA and NIST or Brainpool ECDSA. Contact ISO/IEC 7816 T=0/T=1, contactless ISO/IEC 14443 Type A, SCP01/SCP02/SCP03. It does not implement Ed25519 or X25519. 180 kB is the NXP memory class before Config Module or DESFire/Plus add-ons, not free heap after they are loaded.",
      body: `<p>Aligned to the NXP JCOP 4 P71 short data sheet (SECID): OS JCOP 4 on SmartMX3 P71 (P71D321 family). Java Card 3.0.5 Classic. GlobalPlatform 2.3 (ID configuration / CIC), SCP01, SCP02 and SCP03. Dual-interface, contactless Type A only, up to 848 kbit/s. FLASH before MIFARE, applets and OS add-ons: <strong>180 kB class</strong>. Persistent heap on a typical empty SECID config is lower (SDS examples ~157–175 kB; DESFire EV2 8k add-on example ~129 kB).</p>
<p>Crypto on this OS: AES-128/192/256, DES and 2-key/3-key TDES, RSA up to 4096 with on-card key generation, ECC over GF(p) up to 521 bits on NIST and Brainpool curves (ECDSA and ECDH), SHA-1 and SHA-2 (224/256/384/512). There is no Ed25519 (RFC 8032) and no X25519 / Curve448. Those land on <a href="/en/products/j3r452-javacard">J3R452</a> (JCOP 4.5, P71D600, ~450 KB, Type A and Type B) via the NXP extension — Java Card 3.0.5 itself still has no standard Ed25519 constant.</p>
<p>J2A040 is the previous generation: JCOP 2.4.1, P5CC040, Java Card 2.2.2, contact only, ~40 KB EEPROM, no SCP03. The contact-only 180 kB cousin is J2R180, not this SKU. Comparison: <a href="/en/blog/jcop-j3r180-vs-j2a040">J3R180 vs J2A040</a>.</p>
<p>Lab packs (US Amazon, dual-interface, no magstripe on that listing): <a href="${AMAZON_J3R180}">ASIN B0HD7Z44HJ</a>. Factory PVC with print or stripe is a body option, not a JCOP feature.</p>`,
      features: [
        {
          title: "AES, RSA, NIST ECC",
          description:
            "AES-128/192/256, RSA to 4096, ECDSA/ECDH on NIST and Brainpool up to 521 bits, SHA-2. Ed25519 and X25519 are on J3R452.",
          icon: "KeyRound",
        },
        {
          title: "GP 2.3, SCP03, Type A",
          description:
            "ISO/IEC 7816 T=0/T=1 and ISO/IEC 14443 Type A on one module. ISD may still open SCP02; INITIALIZE UPDATE decides. OS implements SCP03.",
          icon: "Shield",
        },
        {
          title: "180 kB class",
          description:
            "SECID memory class before add-ons. Empty-config heap in the SDS is about 157–175 kB. J3R452 is the ~450 KB JCOP 4.5 card.",
          icon: "Database",
        },
      ],
      specs: [
        { key: "Commercial type", value: "J3R180 (not J2R180, not J3R452)" },
        { key: "OS / silicon", value: "JCOP 4 P71 on SmartMX3 P71D321 family" },
        { key: "Java Card", value: "3.0.5 Classic" },
        { key: "GlobalPlatform", value: "2.3; SCP01 / SCP02 / SCP03" },
        { key: "Crypto", value: "AES-128/192/256; DES / TDES; RSA to 4096; ECDSA/ECDH to 521-bit NIST and Brainpool; SHA-1; SHA-2" },
        { key: "Not on this OS", value: "Ed25519, X25519, Curve448 (use J3R452)" },
        { key: "NVM", value: "FLASH 180 kB class (before MIFARE / applets / add-ons)" },
        { key: "Contact", value: "ISO/IEC 7816 T=0 / T=1" },
        { key: "Contactless", value: "ISO/IEC 14443 Type A only, up to 848 kbit/s" },
        { key: "Sample", value: "Amazon US B0HD7Z44HJ (DIF, no magstripe on that pack)" },
      ],
      useCases: [
        "Applets on AES, RSA or NIST/Brainpool ECDSA that fit the 180 kB class",
        "SCP03 dual-interface Type A pilots",
        "Leaving JCOP 2.4.1 when Ed25519 is not required",
      ],
      highlights: ["AES, RSA 4096, NIST/Brainpool ECC", "Dual-interface Type A, SCP03", "Ed25519 is J3R452, not this card"],
      seoTitle: "J3R180 JavaCard: AES, RSA, NIST ECC | NFCTEC",
      seoDescription:
        "NXP J3R180, JCOP 4 on P71D321: AES, RSA to 4096, NIST and Brainpool ECC, Type A, 180 kB. Ed25519 is J3R452. Amazon samples and volume from NFCTEC.",
      ctaLabel: "Buy on Amazon",
      secondaryCtaLabel: "J3R452 (Ed25519)",
    },
    zh: {
      name: "JCOP 4 J3R180 JavaCard",
      description:
        "NXP JCOP 4 P71 SECID（J3R180），SmartMX3 P71D321。Java Card 3.0.5、GP 2.3、SCP03、AES、RSA 至 4096、NIST/Brainpool ECC。双界面 Type A，FLASH 180 kB 档。无 Ed25519，那是 J3R452。Amazon 样品，批量询价。",
      tagline: "JCOP 4 · AES / RSA / NIST ECC · 180 kB · 无 Ed25519",
      intro:
        "J3R180 是给停在 AES、RSA、NIST 或 Brainpool ECDSA 上的应用用的 JCOP 4 SECID。接触 ISO/IEC 7816 T=0/T=1，非接 ISO/IEC 14443 Type A，SCP01/SCP02/SCP03。没有 Ed25519，也没有 X25519。180 kB 是加载 Config Module 或 DESFire/Plus 之前的 NXP 容量档，不是加载之后的空闲堆。",
      body: `<p>对齐 NXP JCOP 4 P71 短数据手册（SECID）：操作系统 JCOP 4，硅片 SmartMX3 P71（P71D321 系列）。Java Card 3.0.5 Classic。GlobalPlatform 2.3，SCP01、SCP02、SCP03。双界面，非接仅 Type A，最高 848 kbit/s。加载 MIFARE、应用、OS 插件前的 FLASH：<strong>180 kB 档</strong>。典型空 SECID 配置持久堆更低（手册示例约 157–175 kB；DESFire EV2 8k 插件示例约 129 kB）。</p>
<p>本 OS 的算法：AES-128/192/256，DES 与 2-key/3-key TDES，RSA 最高 4096 且可片上生成密钥，ECC GF(p) 最高 521 位，曲线为 NIST 与 Brainpool（ECDSA、ECDH），SHA-1 与 SHA-2（224/256/384/512）。没有 Ed25519（RFC 8032），也没有 X25519 / Curve448。这些在 <a href="/zh/products/j3r452-javacard">J3R452</a>（JCOP 4.5、P71D600、约 450 KB、Type A 与 Type B）上，通过 NXP 扩展提供。Java Card 3.0.5 本身仍然没有标准 Ed25519 常量。</p>
<p>J2A040 是上一代：JCOP 2.4.1、P5CC040、Java Card 2.2.2、仅接触、EEPROM 约 40 KB、无 SCP03。接触式 180 kB 近亲是 J2R180，不是本 SKU。对照：<a href="/zh/blog/jcop-j3r180-vs-j2a040">J3R180 vs J2A040</a>。</p>
<p>实验室用卡（美国 Amazon，双界面，该链接无磁条）：<a href="${AMAZON_J3R180}">ASIN B0HD7Z44HJ</a>。彩印或磁条是卡体选项，不是 JCOP 功能。</p>`,
      features: [
        {
          title: "AES、RSA、NIST ECC",
          description: "AES-128/192/256，RSA 至 4096，NIST 与 Brainpool 上 ECDSA/ECDH 至 521 位，SHA-2。Ed25519 与 X25519 在 J3R452。",
          icon: "KeyRound",
        },
        {
          title: "GP 2.3、SCP03、Type A",
          description: "ISO/IEC 7816 T=0/T=1 与 ISO/IEC 14443 Type A 同一模块。出厂 ISD 仍可能开 SCP02，以 INITIALIZE UPDATE 为准。OS 实现 SCP03。",
          icon: "Shield",
        },
        {
          title: "180 kB 档",
          description: "加载插件前的 SECID 容量档。手册里空配置堆大约 157–175 kB。J3R452 才是约 450 KB 的 JCOP 4.5。",
          icon: "Database",
        },
      ],
      specs: [
        { key: "订货型号", value: "J3R180（不是 J2R180，不是 J3R452）" },
        { key: "系统 / 硅片", value: "JCOP 4 P71，SmartMX3 P71D321 系列" },
        { key: "Java Card", value: "3.0.5 Classic" },
        { key: "GlobalPlatform", value: "2.3；SCP01 / SCP02 / SCP03" },
        { key: "算法", value: "AES-128/192/256；DES / TDES；RSA 至 4096；ECDSA/ECDH 至 521 位 NIST 与 Brainpool；SHA-1；SHA-2" },
        { key: "本 OS 没有", value: "Ed25519、X25519、Curve448（用 J3R452）" },
        { key: "NVM", value: "FLASH 180 kB 档（加载 MIFARE / 应用 / 插件之前）" },
        { key: "接触", value: "ISO/IEC 7816 T=0 / T=1" },
        { key: "非接", value: "仅 ISO/IEC 14443 Type A，最高 848 kbit/s" },
        { key: "样品", value: "Amazon US B0HD7Z44HJ（双界面，该包装无磁条）" },
      ],
      useCases: ["停在 AES、RSA 或 NIST/Brainpool ECDSA、且放得进 180 kB 档的应用", "SCP03 双界面 Type A 试点", "离开 JCOP 2.4.1，且不需要 Ed25519"],
      highlights: ["AES、RSA 4096、NIST/Brainpool ECC", "双界面 Type A，SCP03", "Ed25519 在 J3R452，不在这张卡"],
      seoTitle: "J3R180 JavaCard：AES、RSA、NIST ECC | NFCTEC",
      seoDescription:
        "NXP J3R180，JCOP 4，P71D321：AES、RSA 至 4096、NIST 与 Brainpool ECC、Type A、180 kB。Ed25519 在 J3R452。Amazon 样品，批量询 NFCTEC。",
      ctaLabel: "Amazon 购买",
      secondaryCtaLabel: "J3R452（Ed25519）",
    },
  },
  {
    slug: "j2a040-javacard",
    category: "hardware",
    icon: "Cpu",
    sortOrder: 60,
    ctaUrl: "/inquiry",
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
