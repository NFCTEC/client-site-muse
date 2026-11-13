import { engineeringNotes } from "./engineering-notes";

// Blog posts data. Swap this for a CMS/API fetch later — keep the BlogPost shape stable.
export type DiagramLane = { name: string; nodes: string[] };

export type BlogSection = {
  heading?: string;
  /** 3 renders an h3 under the previous h2. Default is h2. */
  level?: 2 | 3;
  text?: string;
  paragraphs?: string[];
  items?: string[];
  /** Render items as a numbered list. */
  ordered?: boolean;
  code?: string;
  figure?: { title: string; lanes: DiagramLane[] };
  video?: { youtubeId: string; title: string; url: string };
  links?: { label: string; href: string }[];
};

export type BlogBody = BlogSection[];

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
  ...engineeringNotes,
  {
    slug: "nfctec-platform-ntag424-cloud-launch",
    cat: "Product",
    date: "2026-11-13",
    title: "NFCTEC Platform Is Live: NTAG424 DNA in the Cloud",
    excerpt:
      "Cloud encoding and personalization for NTAG424 DNA, secure factory read/write, product digital identity, and tap authentication—without putting AES keys on the production PC.",
    readMinutes: 4,
    body: [
      {
        paragraphs: [
          "NFCTEC Platform is now available at platform.nfctec.com. It is aimed at brands and factories that need NTAG424 DNA encoding and personalization on the line, then cryptographic authentication on every tap for anti-counterfeiting.",
          "AES keys and the EV2 secure session stay on the server. The provisioning client on Windows, macOS, Linux, or Android only reads and writes NFC—it forwards APDUs. Operators personalize tags from issued tasks without receiving your secret keys.",
        ],
      },
      {
        heading: "What you can do today",
        items: [
          "Encode and personalize NTAG424 DNA from templates: NDEF, SDM, and file permissions.",
          "Bind each UID to product code, name, and batch for a product digital identity.",
          "Authenticate taps in the cloud with AES-128 CMAC, SUN, and replay detection.",
          "Use the open API for bind, activate, revoke, and verify—or export UID and binding data for label printing when you need it.",
        ],
      },
      {
        heading: "Start small",
        text: "Registration includes trial issuance and verification quotas so you can run a real task before you buy volume. Issuance quota is a one-time purchase on a published curve; the verify API is prepaid by month. Details are on the pricing page.",
      },
      {
        heading: "Where to go next",
        links: [
          { label: "Platform overview", href: "/en/cloud-services/platform" },
          { label: "Pricing", href: "/en/cloud-services/platform/pricing" },
          { label: "Open the platform", href: "https://platform.nfctec.com/" },
          { label: "NTAG 424 DNA tags", href: "/en/products/ntag424-dna" },
          { label: "Encoding SUN and keys (technical)", href: "/en/blog/encode-ntag424-dna-sun-keys-and-verification" },
        ],
      },
    ],
    zh: {
      title: "NFCTEC 平台上线：NTAG424 DNA 云端编码与个人化",
      excerpt:
        "NTAG424 DNA 云端编码与个人化，工厂安全读写，产品数字身份与贴卡认证——AES 密钥不落在产线电脑上。",
      cat: "Product",
      body: [
        {
          paragraphs: [
            "NFCTEC Platform 已在 platform.nfctec.com 开放使用，面向需要在产线完成 NTAG424 DNA 编码与个人化、并在每次贴卡时做密码学认证以支撑防伪的品牌与工厂。",
            "AES 密钥与 EV2 安全会话留在服务器。Windows、macOS、Linux 或 Android 上的写卡客户端只做 NFC 读写、转发 APDU，操作员领任务写卡，拿不到品牌密钥。",
          ],
        },
        {
          heading: "现在能做什么",
          items: [
            "按模板编码与个人化 NTAG424 DNA：NDEF、SDM 与文件权限。",
            "将 UID 绑定产品编号、名称与批次，形成产品数字身份。",
            "在云端用 AES-128 CMAC、SUN 与防重放做贴卡认证。",
            "通过开放 API 做绑定、启用、作废与验真；需要时可按需导出 UID 与绑定数据供标签印刷。",
          ],
        },
        {
          heading: "小规模起步",
          text: "注册即含体验发行与验真额度，可先做真实任务再购买批量。发行额度按公开曲线一次买断；认证 API 按预付月数计费。详见价格页。",
        },
        {
          heading: "延伸阅读",
          links: [
            { label: "平台概览", href: "/zh/cloud-services/platform" },
            { label: "价格", href: "/zh/cloud-services/platform/pricing" },
            { label: "进入平台", href: "https://platform.nfctec.com/" },
            { label: "NTAG 424 DNA 标签", href: "/zh/products/ntag424-dna" },
            { label: "SUN 编码与密钥（技术文）", href: "/zh/blog/encode-ntag424-dna-sun-keys-and-verification" },
          ],
        },
      ],
    },
  },
  {
    slug: "encode-ntag424-dna-sun-keys-and-verification",
    cat: "Security",
    date: "2026-10-21",
    title: "How to Encode NTAG424 DNA Tags: SUN Setup, Key Management, and Server-Side Verification",
    excerpt:
      "Encode NTAG 424 DNA from a blank tag: where the AES keys live, how SDM offsets sit in the NDEF file, and how the server checks the SUN CMAC and counter.",
    readMinutes: 11,
    body: [
      {
        paragraphs: [
          "Most NTAG 424 DNA tutorials end when the phone shows a URL with a CMAC in it. That is enough for a demo. It does not say where the keys live, how to derive them, or what happens when someone replays a captured URL. This note walks the chain in the order you would actually do it, from a blank tag to a verified tap.",
          "The vectors below follow NXP AN12196. Session-key bytes and the CMAC truncation are the parts that fail a working tag when they are even slightly off.",
        ],
      },
      {
        heading: "Start by identifying the chip",
        paragraphs: [
          "Read the 7-byte UID and run GetVersion. Confirm the silicon is an NTAG 424 DNA before you write keys. A fresh tag has all five application keys, Key 0 through Key 4, set to sixteen zero bytes. Anyone with a reader can authenticate and rewrite it. The job of issuance is to leave that state.",
        ],
      },
      {
        heading: "Don't use one key for every tag",
        paragraphs: [
          "Derive a unique file-read key per tag from a master key and the tag's UID. That is key diversification. If someone extracts the keys from one tag, they get that tag and nothing else.",
          "One key is the exception. When the PICC data is encrypted, the server does not know the UID until it decrypts that blob. AN12196 therefore says the SDM meta-read key must not be diversified on the UID. Keep that key as a system key, in the same place as the master, and diversify the SDM file-read key that produces the CMAC. Diversifying all five keys the same way makes the encrypted URL unverifiable.",
          "The remaining question is where the master lives. Two setups cover it.",
        ],
      },
      {
        heading: "Cloud KMS as the root",
        level: 3,
        paragraphs: [
          "Store the master as an HMAC key inside the KMS. To get a tag's file-read key, send a fixed label, the UID and the key number to the KMS, take the first 16 bytes of the HMAC, and run the AES operations in your own code. The KMS does not need AES-CMAC. It only protects the master. Issuer and verifier must call the same function. This is an application KDF, not the session vector in AN12196.",
          "The cost is one network call per derivation. Measure latency, quotas and what you are willing to cache before you put this on a high-traffic verify path. Caching a per-tag key means that key now lives outside the KMS. Decide that on purpose.",
        ],
      },
      {
        heading: "A JavaCard key-management applet",
        level: 3,
        paragraphs: [
          "This is the better fit for offline issuance. Generate the master inside the applet. It never leaves the card. If the card has no native CMAC, build CMAC on single-block AES. The key object stays on the card either way. The issuance workstation receives only the derived keys for the tag in front of it. The applet can go further and run the EV2 handshake itself, and hand the workstation session keys only. Throughput is the limit, so plan on several readers in parallel.",
          "The two can be combined: issue with the JavaCard, verify with the KMS. That requires a key ceremony to put the same master in both places. Split shares, more than one person present, nothing written to disk. Skip the ceremony and the two sides will not derive the same tag keys.",
        ],
      },
      {
        heading: "The order of operations matters",
        paragraphs: [
          "AuthenticateEV2First uses Key 0. Changing that key ends the session. Anything still unwritten after that point needs the new Key 0, and a mistake in the new key is a tag you cannot open again.",
        ],
        ordered: true,
        items: [
          "Authenticate with the default Key 0 (AuthenticateEV2First).",
          "Change Keys 1 to 4 first. Put the meta-read key and the diversified file-read key in the slots SDM will use.",
          "Configure SDM on the NDEF file and write the NDEF template.",
          "Change Key 0 last.",
          "Re-authenticate with the new Key 0, read back the file settings and key versions, then tap with a phone and confirm the server accepts it.",
        ],
      },
      {
        paragraphs: [
          "Do that readback before the tag leaves the bench. A wrong SDM offset is not visible on the tag. The phone still opens a URL. The server rejects every tap, and you only get another chance if you still have the new Key 0.",
        ],
      },
      {
        heading: "SDM and the NDEF template",
        paragraphs: [
          "Write a URL with two placeholders. On every read the chip overwrites both with live values. ChangeFileSettings takes the byte offset of each placeholder.",
        ],
        code: "https://example.com/v?p=00000000000000000000000000000000&m=0000000000000000",
      },
      {
        paragraphs: [
          "p is the encrypted PICC data, 16 bytes, 32 hex characters. m is the truncated CMAC, 8 bytes, 16 hex characters.",
          "Offsets are counted from byte 0 of the NDEF file, not from the start of the URL string. The file begins with the 2-byte NLEN, then the NDEF record header, then the URI payload. An offset that points at the URL in a text editor is short by that prefix. The CMAC input is then the wrong bytes, the MAC never matches, and the chip returns no error to explain it.",
        ],
      },
      {
        heading: "Verifying on the server",
        paragraphs: [
          "Treat p and m as hex. Reject odd lengths and wrong lengths before any crypto.",
        ],
        ordered: true,
        items: [
          "Decrypt p with the SDM meta-read key. AES-128-CBC, IV sixteen zero bytes, no padding. Do not use a per-UID key for this step.",
          "Parse the plaintext. Byte 0 is the PICC data tag. 0xC7 means a 7-byte UID and the read counter are both present. The next 7 bytes are the UID. The next 3 bytes are SDMReadCtr, little-endian. The rest is padding the chip generated.",
          "Derive that tag's SDM file-read key from the UID.",
          "Build the SUN MAC session key the way AN12196 specifies, CMAC the mirrored file bytes, and keep the eight odd-indexed bytes of the 16-byte CMAC. Compare with m.",
          "Turn the 3-byte counter into an integer. Accept the tap only if it is greater than the last counter stored for this UID, then store it.",
        ],
        code: "SV2 = 3C C3 00 01 00 80 || UID || SDMReadCtr || 00..00\nKSesSDMFileReadMAC = CMAC(SDMFileReadKey, SV2)\nMAC input = file bytes from SDMMACInputOffset up to, not including, SDMMACOffset\nSDMMAC = bytes 1, 3, 5, 7, 9, 11, 13, 15 of CMAC(KSesSDMFileReadMAC, MAC input)",
      },
      {
        paragraphs: [
          "SV2 is zero-padded to a 16-byte boundary. SDMReadCtr in that vector is the same three little-endian bytes you just parsed, not the counter printed as a big-endian hex string. This session key is only for SUN. It is not the session key from AuthenticateEV2First.",
          "The MAC input is the file as the phone receives it, after the chip has replaced the placeholders. If SDMMACInputOffset equals SDMMACOffset, that input is empty. An empty message is still a real CMAC. It is a different result from CMAC over the URL.",
          "Byte numbering is where verifiers disagree with the chip. AN12196 keeps the even-numbered bytes in most-significant-byte-first order, written S14 || S12 || … || S0. In a 16-byte buffer whose index 0 is the first byte, those are indices 1, 3, 5, 7, 9, 11, 13 and 15. The first eight bytes are wrong. Indices 0, 2, 4, 6, 8, 10, 12 and 14 are also wrong.",
          "Step 5 is the replay check. A valid CMAC on a captured link stays valid forever if you skip it. The counter is 3 bytes, so the largest value is 16,777,215. For a tag that is tapped often, work out when you will get there and what the server should do at the top.",
        ],
      },
      {
        heading: "Closing the loop",
        paragraphs: [
          "Blank tag, key derivation, issuance, readback, shipping, user tap, server derivation, CMAC check, counter check, answer.",
          "Issuance and verification share the derivation rules and not the privileges. The verification service can derive per-tag file-read keys. It does not need Key 0, and it should not have it. If that server is compromised, an attacker can lie about verification results. They still cannot rewrite or clone the tags. That separation is the point of the design.",
          "NFCTEC laminates NTAG 424 DNA as wet inlay, sticker and PVC, and can set the NDEF template, SDM offsets and per-UID keys, or ship the tags blank for your own issuance line.",
        ],
        links: [
          { label: "NTAG 424 DNA tags", href: "/en/products/ntag424-dna" },
          { label: "NTAG 424 DNA tool", href: "/en/tools/ntag424-tool" },
          { label: "Shorter SUN authentication note", href: "/en/blog/ntag424-dna-sun-url-authentication-example" },
          { label: "NTAG 424 DNA on Amazon (B0FRL6BTJK)", href: "https://www.amazon.com/dp/B0FRL6BTJK" },
          { label: "NXP AN12196", href: "https://www.nxp.com/docs/en/application-note/AN12196.pdf" },
        ],
      },
    ],
    zh: {
      title: "如何编码 NTAG 424 DNA：SUN 配置、密钥管理与服务器校验",
      excerpt:
        "从空白 NTAG 424 DNA 写到可校验：AES 密钥放在哪、SDM 偏移怎么落在 NDEF 文件里、服务器如何核对 SUN 的 CMAC 和计数器。",
      cat: "Security",
      body: [
        {
          paragraphs: [
            "多数 NTAG 424 DNA 教程停在手机打开一条带 CMAC 的链接。演示够了。它没写密钥放在哪、怎么派生、别人重放截到的链接时会发生什么。这篇按实际操作的顺序写完整条链路：空白标签，到一次校验通过的轻触。",
            "下面的向量按 NXP AN12196。会话密钥的字节和 CMAC 截断差一位，芯片是对的，服务器也会一直拒绝。",
          ],
        },
        {
          heading: "先确认芯片",
          paragraphs: [
            "读 7 字节 UID，再跑 GetVersion，确认是 NTAG 424 DNA，然后再写密钥。新标签的五把应用密钥 Key 0 到 Key 4 都是 16 个 0。有读头的人都能认证并改写。发卡要离开这个状态。",
          ],
        },
        {
          heading: "不要所有标签共用一把密钥",
          paragraphs: [
            "用主密钥和标签 UID 为每张标签派生一把文件读密钥。这是密钥分散。别人从一张标签里取出密钥，只能用这一张。",
            "有一把密钥不能这么做。PICC 数据加密之后，服务器在解开这段密文之前不知道 UID。AN12196 因此要求 SDM meta-read 密钥不要按 UID 分散。它是系统密钥，和主密钥放在同一处。用于计算 CMAC 的 SDM file-read 密钥才按 UID 分散。五把密钥用同一种分散，加密后的链接就无法校验。",
            "剩下的问题是主密钥放在哪。两种做法够用。",
          ],
        },
        {
          heading: "用云 KMS 当根",
          level: 3,
          paragraphs: [
            "把主密钥做成 KMS 里的 HMAC 密钥。要某张标签的 file-read 密钥时，把固定标签、UID 和密钥号送给 KMS，取 HMAC 的前 16 字节，AES 运算放在你自己的代码里。KMS 不必支持 AES-CMAC，它只保护主密钥。发卡和校验必须调用同一个函数。这是应用层 KDF，不是 AN12196 里的会话向量。",
            "代价是每次派生一次网络调用。上大流量校验之前，先量延迟、配额，以及你准备缓存什么。缓存单标签密钥，等于这把密钥离开了 KMS。要当成明确的决定，而不是顺手加上。",
          ],
        },
        {
          heading: "用 JavaCard 密钥管理应用",
          level: 3,
          paragraphs: [
            "离线发卡更合适。主密钥在应用内生成，不出卡。卡没有原生 CMAC，就用单块 AES 组出来。密钥对象始终在卡上。发卡工位只拿到眼前这张标签的派生密钥。应用还可以自己跑 EV2 握手，只把会话密钥交给工位。瓶颈是吞吐，并行多台读头来摊。",
            "两者可以合用：JavaCard 发卡，KMS 校验。这要求一场密钥仪式，把同一把主密钥放进两边。分片、多人在场、不落盘。跳过仪式，两边派生出的标签密钥对不上。",
          ],
        },
        {
          heading: "操作顺序不能换",
          paragraphs: [
            "AuthenticateEV2First 用的是 Key 0。改掉这把密钥，会话就结束。此后还没写完的步骤都要用新的 Key 0。新密钥写错，这张标签就打不开了。",
          ],
          ordered: true,
          items: [
            "用默认 Key 0 做 AuthenticateEV2First。",
            "先改 Key 1 到 Key 4。把 meta-read 密钥和分散后的 file-read 密钥放进 SDM 要用的槽。",
            "在 NDEF 文件上配置 SDM，并写入 NDEF 模板。",
            "最后改 Key 0。",
            "用新的 Key 0 重新认证，读回文件设置和密钥版本，再用手机轻触，确认服务器接受。",
          ],
        },
        {
          paragraphs: [
            "读回要在标签离开台面之前做。SDM 偏移写错，标签上看不出来。手机照样打开链接。服务器拒绝每一次轻触。你还留着新的 Key 0，才有机会改。",
          ],
        },
        {
          heading: "SDM 和 NDEF 模板",
          paragraphs: [
            "URL 里放两段占位。每次读取，芯片用实时值覆盖它们。ChangeFileSettings 要的是每段占位的字节偏移。",
          ],
          code: "https://example.com/v?p=00000000000000000000000000000000&m=0000000000000000",
        },
        {
          paragraphs: [
            "p 是加密的 PICC 数据，16 字节，32 个十六进制字符。m 是截断后的 CMAC，8 字节，16 个十六进制字符。",
            "偏移从 NDEF 文件的第 0 字节算起，不是从 URL 字符串算起。文件开头是 2 字节 NLEN，然后是 NDEF 记录头，然后才是 URI。把文本编辑器里 URL 的位置当成偏移，会短掉这个前缀。CMAC 的输入就错了，MAC 永远对不上，芯片也不会返回一个错误告诉你原因。",
          ],
        },
        {
          heading: "在服务器上校验",
          paragraphs: [
            "把 p 和 m 当十六进制。长度不是偶数，或长度不对，先拒绝，再谈密码运算。",
          ],
          ordered: true,
          items: [
            "用 SDM meta-read 密钥解密 p。AES-128-CBC，IV 为 16 个 0，不要填充。这一步不要用按 UID 分散的密钥。",
            "解析明文。第 0 字节是 PICC 数据标签。0xC7 表示 7 字节 UID 和读计数器都在。接下来 7 字节是 UID。再接下来 3 字节是 SDMReadCtr，小端。其余是芯片生成的填充。",
            "用 UID 派生这张标签的 SDM file-read 密钥。",
            "按 AN12196 生成 SUN 的 MAC 会话密钥，对镜像后的文件字节做 CMAC，取 16 字节结果里奇数下标的 8 个字节，与 m 比较。",
            "把 3 字节计数器转成整数。只有它大于该 UID 已保存的计数器才接受，然后写入。",
          ],
          code: "SV2 = 3C C3 00 01 00 80 || UID || SDMReadCtr || 00..00\nKSesSDMFileReadMAC = CMAC(SDMFileReadKey, SV2)\nMAC 输入 = 文件中从 SDMMACInputOffset 到 SDMMACOffset 之前的字节\nSDMMAC = CMAC(KSesSDMFileReadMAC, MAC 输入) 的第 1、3、5、7、9、11、13、15 字节",
        },
        {
          paragraphs: [
            "SV2 用 0 填到 16 字节边界。向量里的 SDMReadCtr 就是刚解析出的那 3 个小端字节，不是把计数器印成大端十六进制。这把会话密钥只用于 SUN，不是 AuthenticateEV2First 的会话密钥。",
            "MAC 输入是手机收到的文件内容，占位已经被芯片换掉。SDMMACInputOffset 等于 SDMMACOffset 时，输入为空。空消息也是一次正式的 CMAC，结果和对整段 URL 做 CMAC 不同。",
            "字节编号是校验程序和芯片对不上的地方。AN12196 按最高有效字节在前，保留偶数编号的字节，写成 S14 || S12 || … || S0。在下标 0 为第一字节的 16 字节缓冲区里，这是下标 1、3、5、7、9、11、13、15。取前 8 字节是错的。取下标 0、2、4、6、8、10、12、14 也是错的。",
            "第 5 步是防重放。跳过它，一条截获的链接只要 CMAC 正确就可以一直用。计数器是 3 字节，最大值 16,777,215。轻触很频繁的标签，先算会在什么时候到顶，以及到顶之后服务器怎么处理。",
          ],
        },
        {
          heading: "把链路合上",
          paragraphs: [
            "空白标签、密钥派生、发卡、读回、出货、用户轻触、服务器派生、CMAC 核对、计数器核对、给出结果。",
            "发卡和校验共用派生规则，不共用权限。校验服务可以派生每张标签的 file-read 密钥。它不需要 Key 0，也不应该持有 Key 0。这台服务器被攻破，攻击者可以谎报校验结果，仍然不能改写或克隆标签。这个隔离才是这套设计要的东西。",
            "NFCTEC 把 NTAG 424 DNA 做成湿 Inlay、贴纸和 PVC，可以写 NDEF 模板、SDM 偏移和按 UID 分散的密钥，也可以空白交付，接到你们自己的发卡线。",
          ],
          links: [
            { label: "NTAG 424 DNA 标签", href: "/zh/products/ntag424-dna" },
            { label: "NTAG 424 DNA 工具", href: "/zh/tools/ntag424-tool" },
            { label: "较短的 SUN 验证说明", href: "/zh/blog/ntag424-dna-sun-url-authentication-example" },
            { label: "亚马逊上的 NTAG 424 DNA（B0FRL6BTJK）", href: "https://www.amazon.com/dp/B0FRL6BTJK" },
            { label: "NXP AN12196", href: "https://www.nxp.com/docs/en/application-note/AN12196.pdf" },
          ],
        },
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
      {
        links: [
          { label: "NTAG 424 DNA on Amazon (B0FRL6BTJK)", href: "https://www.amazon.com/dp/B0FRL6BTJK" },
          { label: "NTAG 424 DNA tags", href: "/en/products/ntag424-dna" },
        ],
      },
    ],
  },
  {
    slug: "fragile-antenna-nfc-label",
    cat: "Security",
    date: "2026-10-13",
    title: "Fragile-Antenna NFC Labels Break When Peeled",
    excerpt:
      "Fragile-antenna NFC labels open the coil when peeled. The same build takes NTAG213/215/216, MIFARE or NTAG 424 DNA. The phone then sees nothing.",
    readMinutes: 5,
    body: [
      {
        text: "A fragile-antenna NFC label is a sticker whose coil is the weak part. The same antenna takes NTAG213, NTAG215, NTAG216, MIFARE Ultralight, DESFire, NTAG 424 DNA, or another 13.56 MHz die. The adhesive holds harder than the traces. Peel it, tear it, or lift a corner, and the loop opens. A phone that read the tag a second earlier now sees nothing.",
      },
      {
        video: {
          youtubeId: "e6aD4nxIWqw",
          title: "Peel this NFC label and the antenna opens. The phone stops seeing the tag.",
          url: "https://www.youtube.com/shorts/e6aD4nxIWqw",
        },
      },
      {
        heading: "What actually breaks",
        paragraphs: [
          "The chip is a small die on a 13.56 MHz loop. The phone powers that die through the loop. Open the loop and there is no resonance, no power, and no answer. The silicon can still be intact. The NFC function is gone because the antenna is gone.",
          "This is a one-way mechanical cut. It is not a locked NDEF page and it is not a SUN reject. Those tags still answer the phone; the server then refuses the URL. A torn antenna never gets that far. Read it before the peel. Read it after. The second tap should fail on a phone, the way a customer peels a bottle, not only on a lab reader held 1 cm away.",
        ],
      },
      {
        heading: "Where the construction belongs",
        paragraphs: [
          "Use it on a seal that must not move onto another bottle, carton, or asset. The face stock is weak, the adhesive is strong, and the antenna crosses the tear path. Name the surface in the RFQ — glass, PET, or carton. On oil or dust the whole label can lift and the coil survives, which misses the point.",
        ],
      },
      {
        heading: "Same antenna, pick the IC",
        paragraphs: [
          "The fragile coil does not care which die is bonded to it. NTAG213, NTAG215 and NTAG216 are the usual static-URL parts; pick the memory size and keep the same tear pattern. MIFARE Ultralight covers cheap tickets and short NDEF. MIFARE DESFire is the same label when the job is AES files instead of a URL. NTAG 424 DNA is the same label again when each tap must carry a SUN counter and AES-CMAC, so a photo of the link fails on the server. MIFARE Classic and other 13.56 MHz parts sit on this antenna too — name the IC on the RFQ.",
          "The antenna stops someone moving the real sticker onto another pack. The IC decides what a successful tap means. A wet inlay built to survive lamination is a different stack. If the label has to die on peel, write fragile antenna, then the chip.",
        ],
      },
      {
        heading: "What to send with the quote",
        items: [
          "Where it sticks, and whether the peel is a customer opening or a transfer onto another pack.",
          "Which IC: NTAG213 / 215 / 216, MIFARE Ultralight, DESFire, NTAG 424 DNA, or another 13.56 MHz part.",
          "A sample of the real surface. Read on a phone before the peel and after.",
        ],
        links: [
          { label: "NTAG213 / 215 / 216", href: "/en/products/ntag213-215-216" },
          { label: "MIFARE Ultralight", href: "/en/products/mifare-ultralight" },
          { label: "MIFARE DESFire EV2 / EV3", href: "/en/products/mifare-desfire-ev3" },
          { label: "NTAG 424 DNA tags", href: "/en/products/ntag424-dna" },
          { label: "Card factory: labels and cards", href: "/en/products/nfc-labels-and-cards" },
        ],
      },
    ],
    zh: {
      title: "防撕天线 NFC 标签：撕开线圈就断",
      excerpt:
        "防撕天线 NFC 标签一撕线圈就断，可配 NTAG213/215/216、MIFARE 或 NTAG 424 DNA。手机随后读不到。",
      cat: "Security",
      body: [
        {
          text: "防撕天线 NFC 标签把线圈做成整张贴纸里最弱的部分。同一套天线可以焊 NTAG213、NTAG215、NTAG216、MIFARE Ultralight、DESFire、NTAG 424 DNA，或其他 13.56 MHz 芯片。胶比走线更牢。揭开、撕扯、掀一个角，回路就开路。一秒前还能读到的手机，现在什么都看不到。",
        },
        {
          video: {
            youtubeId: "e6aD4nxIWqw",
            title: "揭开这张 NFC 标签，天线断开，手机不再读到。",
            url: "https://www.youtube.com/shorts/e6aD4nxIWqw",
          },
        },
        {
          heading: "断的是天线",
          paragraphs: [
            "芯片是 13.56 MHz 回路上的一颗小硅片。手机靠这个回路给芯片供电。回路一开，没有谐振，没有能量，也没有应答。硅片可以还是完好的。NFC 坏掉，是因为天线没了。",
            "这是一次性的机械切断。不是锁住的 NDEF，也不是 SUN 校验失败。后两种标签手机仍然读得到，然后服务器拒绝链接。天线撕断之后，会话根本开始不了。撕之前用手机读一次，按消费者开瓶的方式撕开，再读一次。第二次应该失败。不要只拿实验室读头贴在 1 厘米处当结论。",
          ],
        },
        {
          heading: "用在不能被揭走的封口上",
          paragraphs: [
            "瓶、纸箱、资产标，凡是这张标签不能被揭下来贴到另一件东西上，就用这种结构。面材弱，胶强，天线穿过撕裂路径。询价写明表面：玻璃、PET 还是纸箱。油和灰上整张标可能被揭起来，线圈还在，那就没起到作用。",
          ],
        },
        {
          heading: "同一套天线，芯片另选",
          paragraphs: [
            "防撕线圈不挑焊在上面的芯片。NTAG213、NTAG215、NTAG216 是常见的静态 URL，按容量选，撕裂路径不变。MIFARE Ultralight 做低成本票和短 NDEF。要的是 AES 文件而不是一条网址时，同一张标签换 MIFARE DESFire。每次读取要带 SUN 计数器和 AES-CMAC、拍下来的链接过不了服务器，就换 NTAG 424 DNA。MIFARE Classic 和其他 13.56 MHz 芯片也走这套天线，询价写明型号。",
            "天线挡住的是把真贴纸揭去贴到另一包。芯片决定一次成功读取代表什么。为了过层压而做的湿 Inlay 是另一种结构。要一撕就坏，询价先写防撕天线，再写芯片。",
          ],
        },
        {
          heading: "询价时写上这些",
          items: [
            "贴在什么上面，撕开是消费者开启，还是有人想把标签挪到另一包。",
            "芯片：NTAG213 / 215 / 216、MIFARE Ultralight、DESFire、NTAG 424 DNA，或其他 13.56 MHz 型号。",
            "寄一片真实表面。用手机在撕开前、撕开后各读一次。",
          ],
          links: [
            { label: "NTAG213 / 215 / 216", href: "/zh/products/ntag213-215-216" },
            { label: "MIFARE Ultralight", href: "/zh/products/mifare-ultralight" },
            { label: "MIFARE DESFire EV2 / EV3", href: "/zh/products/mifare-desfire-ev3" },
            { label: "NTAG 424 DNA 标签", href: "/zh/products/ntag424-dna" },
            { label: "卡厂：标签与卡", href: "/zh/products/nfc-labels-and-cards" },
          ],
        },
      ],
    },
  },
];

export const postsBySlug = new Map(posts.map((p) => [p.slug, p]));
