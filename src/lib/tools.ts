import type { Locale } from "./locale";

export type ToolSlug = "ntag424-tool" | "javacard-tool";

export type ToolPage = {
  slug: ToolSlug;
  name: string;
  category: string;
  title: string;
  description: string;
  keywords: string[];
  downloadHint: string;
  sections: { heading: string; text: string }[];
  features: string[];
  faqs: { q: string; a: string }[];
};

const toolPages: Record<Locale, ToolPage[]> = {
  en: [
    {
      slug: "ntag424-tool",
      name: "NFCTEC NTAG424 DNA Tool",
      category: "NTAG 424 DNA",
      title: "NTAG 424 DNA / NTAG424 Tool: SUN URL, AES Keys & CMAC Verification",
      description:
        "NTAG424 DNA engineering: Windows tool for SDM personalization, plus an in-browser SUN URL checker that decrypts PICC data and verifies AES-CMAC without uploading keys.",
      keywords: [
        "NTAG 424 DNA tool",
        "NTAG424 tool",
        "NTAG424 SUN URL",
        "NTAG 424 DNA personalization",
        "SUN CMAC verification",
        "SDM NTAG 424",
      ],
      downloadHint: "Available in the Download Center as NFCTEC NTAG424 DNA Tool.",
      sections: [
        {
          heading: "What it is built for",
          text: "NTAG 424 DNA (also searched as NTAG424) projects fail most often between SDM file settings, per-UID AES key diversification and server-side SUN verification. This tool gives engineers a repeatable workspace for testing SUN URLs, SDM read counters, AES-CMAC values and tag settings before production personalization.",
        },
        {
          heading: "Typical workflow",
          text: "Start with a blank or sample NTAG 424 DNA tag, configure NDEF/SDM offsets and access rights, verify AES keys, generate a SUN URL, then paste that URL into the checker on this page with the same MetaRead and FileRead keys. Confirm UID, little-endian SDMReadCtr and truncated CMAC before you wire the same algorithm into a server. A copied URL must fail once the counter moves.",
        },
        {
          heading: "Where it fits",
          text: "Use it for brand protection, product authentication, consumables, warranty activation, smart packaging and any NTAG424 project where a static NTAG215-style NFC URL would be too easy to photograph and clone.",
        },
        {
          heading: "Factory tags and cloud verify",
          text: "Pair the tool with NFCTEC NTAG 424 DNA wet inlays, stickers or PVC (blank or SUN-encoded) and the cloud issuance/verify API on the platform page. Retail packs are also listed on Amazon when you only need a small lab quantity.",
        },
      ],
      features: [
        "In-browser SUN URL decode: UID, SDMReadCtr, truncated AES-CMAC",
        "Windows tool for SDM offsets, AES keys and write-card personalization",
        "Read-counter and CMAC troubleshooting",
        "Useful for NTAG 424 DNA / NTAG424 anti-counterfeit label pilots",
      ],
      faqs: [
        {
          q: "Can I verify a SUN URL in the browser?",
          a: "Yes. Paste the URL, enter the 16-byte SDM MetaRead and FileRead keys, and the page decrypts p (AES-128-CBC, IV=0) and checks m against the AN12196 truncated CMAC. Keys never leave the browser. Replay protection still needs a server that stores the last counter per UID.",
        },
        {
          q: "Can it replace a production personalization system?",
          a: "No. The Windows app is an engineering and validation tool. For production, NFCTEC can provide batch personalization, key management and verification APIs.",
        },
        {
          q: "Does it require backend integration?",
          a: "The browser checker is enough to prove the algorithm and offsets. Production SUN verification should run on a backend that protects keys and rejects reused counters.",
        },
      ],
    },
    {
      slug: "javacard-tool",
      name: "NFCTEC JavaCard Tool",
      category: "JavaCard / GlobalPlatform",
      title: "JavaCard Tool for CAP Load, SCP02/SCP03 Secure Channel and APDU Debugging",
      description:
        "A Windows GlobalPlatform host for JavaCard engineers: read CPLC, open SCP02/SCP03 secure channels, load CAP files and debug APDU command flows.",
      keywords: ["JavaCard CAP load tool", "GlobalPlatform SCP02 SCP03", "JavaCard APDU debugger", "CPLC reader tool"],
      downloadHint: "Available in the Download Center as NFCTEC-JavaCard-TOOL.",
      sections: [
        {
          heading: "What it is built for",
          text: "JavaCard development usually requires several tools at once: a GlobalPlatform host, CAP loader, APDU console and card information viewer. NFCTEC JavaCard Tool combines those jobs so engineers can debug the full applet lifecycle in one trace.",
        },
        {
          heading: "Typical workflow",
          text: "Read CPLC, select the issuer security domain, open SCP02 or SCP03, install and load the CAP file, create the applet instance, then SELECT the new AID and run verification APDUs.",
        },
        {
          heading: "Where it fits",
          text: "Use it for applet bring-up, secure-channel testing, card OS evaluation, customer support traces and factory validation before a JavaCard project moves to scripted production loading.",
        },
      ],
      features: [
        "CPLC and card manager information readout",
        "SCP02/SCP03 secure channel setup",
        "CAP LOAD and INSTALL workflow",
        "APDU console for replaying command traces",
      ],
      faqs: [
        {
          q: "Which cards are supported?",
          a: "The workflow targets JavaCard and GlobalPlatform-compatible cards exposed through a PC/SC reader.",
        },
        {
          q: "Can it diagnose 6985 or 6A82 errors?",
          a: "Yes. It keeps the command sequence visible so engineers can check lifecycle, AID, security state and privileges.",
        },
      ],
    },
  ],
  zh: [
    {
      slug: "ntag424-tool",
      name: "NFCTEC NTAG424 DNA Tool",
      category: "NTAG 424 DNA",
      title: "NTAG 424 DNA / NTAG424 工具：SUN URL、AES 密钥与 CMAC 验证",
      description:
        "NTAG424 DNA 工程工具：Windows 端做 SDM 个人化，本页浏览器内粘贴 SUN URL、输入密钥即可解开 UID 并校验 AES-CMAC，密钥不上传。",
      keywords: [
        "NTAG 424 DNA 工具",
        "NTAG424 工具",
        "NTAG424 SUN URL",
        "NTAG 424 DNA 个人化",
        "SUN CMAC 验证",
        "SDM NTAG 424",
      ],
      downloadHint: "可在下载中心获取：NFCTEC NTAG424 DNA Tool。",
      sections: [
        {
          heading: "它解决什么问题",
          text: "NTAG 424 DNA（也常搜 NTAG424）项目最容易卡在 SDM 文件设置、按 UID 分散的 AES 密钥和服务器端 SUN 验证之间。这个工具让工程师在进入量产个人化之前，能反复测试 SUN URL、读计数器、AES-CMAC 和标签配置。",
        },
        {
          heading: "典型流程",
          text: "从空白或样品 NTAG 424 DNA 开始，配置 NDEF/SDM 偏移和访问权限，验证 AES 密钥，生成 SUN URL，再把链接和同一套 MetaRead / FileRead 密钥贴进本页校验器。先确认 UID、小端 SDMReadCtr 和截断 CMAC，再把同一套算法接到服务器。计数器前进后，复制的链接必须失败。",
        },
        {
          heading: "适用场景",
          text: "适合品牌防伪、产品认证、耗材验证、保修激活、智能包装，以及任何静态 NTAG215 式 NFC URL 容易被拍照复制的 NTAG424 项目。",
        },
        {
          heading: "卡厂标签与云端校验",
          text: "可搭配 NFCTEC 的 NTAG 424 DNA 湿 Inlay、贴纸或 PVC（空白或 SUN 编码），以及平台页的云端发行/校验 API。只要实验室小批量，也可在亚马逊买零售装。",
        },
      ],
      features: [
        "浏览器内解开 SUN URL：UID、SDMReadCtr、截断 AES-CMAC",
        "Windows 工具配置 SDM 偏移、AES 密钥并写卡",
        "读计数器与 CMAC 排查",
        "适合 NTAG 424 DNA / NTAG424 防伪标签试点",
      ],
      faqs: [
        {
          q: "能在浏览器里校验 SUN URL 吗？",
          a: "可以。粘贴链接，输入 16 字节 SDM MetaRead 和 FileRead 密钥，页面会按 AES-128-CBC（IV=0）解密 p，并按 AN12196 核对截断 CMAC。密钥不离开浏览器。防重放仍需要服务器按 UID 保存上次的计数器。",
        },
        { q: "它能替代量产个人化系统吗？", a: "不能。Windows 程序是工程验证工具。量产阶段 NFCTEC 可以提供批量个人化、密钥管理和验证 API。" },
        { q: "必须接后端吗？", a: "浏览器校验器足以证明算法和偏移。量产 SUN 验证应放在保护密钥并拒绝重复计数器的后端。" },
      ],
    },
    {
      slug: "javacard-tool",
      name: "NFCTEC JavaCard Tool",
      category: "JavaCard / GlobalPlatform",
      title: "JavaCard 工具：CAP 加载、SCP02/SCP03 安全通道与 APDU 调试",
      description:
        "面向 JavaCard 工程师的 Windows GlobalPlatform 主机工具：读取 CPLC、打开 SCP02/SCP03 安全通道、加载 CAP 文件并调试 APDU 指令流程。",
      keywords: ["JavaCard CAP 加载工具", "GlobalPlatform SCP02 SCP03", "JavaCard APDU 调试", "CPLC 读取工具"],
      downloadHint: "可在下载中心获取：NFCTEC-JavaCard-TOOL。",
      sections: [
        {
          heading: "它解决什么问题",
          text: "JavaCard 开发通常需要多个工具：GlobalPlatform 主机、CAP 加载器、APDU 控制台和卡片信息读取器。NFCTEC JavaCard Tool 把这些流程放在同一个 trace 里。",
        },
        {
          heading: "典型流程",
          text: "读取 CPLC，选择 issuer security domain，打开 SCP02 或 SCP03，安装并加载 CAP 文件，创建 Applet 实例，然后 SELECT 新 AID 并执行验证 APDU。",
        },
        {
          heading: "适用场景",
          text: "适合 Applet bring-up、安全通道测试、卡片 OS 评估、客户支持 trace，以及 JavaCard 项目进入脚本化量产加载前的工厂验证。",
        },
      ],
      features: ["CPLC 和 Card Manager 信息读取", "SCP02/SCP03 安全通道建立", "CAP LOAD 和 INSTALL 流程", "用于回放指令 trace 的 APDU 控制台"],
      faqs: [
        { q: "支持哪些卡？", a: "面向通过 PC/SC 读卡器暴露的 JavaCard 和 GlobalPlatform 兼容卡片。" },
        { q: "能排查 6985 或 6A82 吗？", a: "可以。工具会保留命令序列，方便检查生命周期、AID、安全状态和权限。" },
      ],
    },
  ],
};

export function getToolPages(locale: Locale) {
  return toolPages[locale];
}

export function getToolPage(locale: Locale, slug: string) {
  return toolPages[locale].find((tool) => tool.slug === slug);
}
