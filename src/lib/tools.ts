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
      title: "NTAG424 DNA Tool for SUN URL, AES Keys and Secure NFC Verification",
      description:
        "A desktop engineering tool for NTAG 424 DNA personalization, SUN dynamic URL testing, AES key configuration and anti-counterfeit NFC label validation.",
      keywords: ["NTAG 424 DNA tool", "NTAG424 SUN URL", "NTAG 424 DNA personalization", "SUN dynamic URL verification"],
      downloadHint: "Available in the Download Center as NFCTEC NTAG424 DNA Tool.",
      sections: [
        {
          heading: "What it is built for",
          text: "NTAG 424 DNA projects fail most often at the boundary between tag configuration, key diversification and backend verification. This tool gives engineers a repeatable workspace for testing SUN URLs, counters, CMAC values and tag settings before moving to production personalization.",
        },
        {
          heading: "Typical workflow",
          text: "Start with a sample tag, configure files and access rights, verify AES keys, generate a SUN URL, then replay the same tap data against the verification API. The goal is to make every NFC label verifiable before it reaches the production line.",
        },
        {
          heading: "Where it fits",
          text: "Use it for brand protection, product authentication, consumables, warranty activation, smart packaging and any project where a copied static NFC URL would be too easy to clone.",
        },
      ],
      features: [
        "SUN dynamic URL generation and verification test flow",
        "AES key and access-right configuration checks",
        "Read-counter and CMAC troubleshooting",
        "Useful for NTAG 424 DNA anti-counterfeit label pilots",
      ],
      faqs: [
        {
          q: "Can it replace a production personalization system?",
          a: "No. It is an engineering and validation tool. For production, NFCTEC can provide batch personalization, key management and verification APIs.",
        },
        {
          q: "Does it require backend integration?",
          a: "You can test tag data locally, but real SUN verification should be connected to a backend that protects keys and checks counters.",
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
      title: "NTAG424 DNA 工具：SUN 动态 URL、AES 密钥与安全 NFC 验证",
      description:
        "面向 NTAG 424 DNA 个人化、SUN 动态 URL 测试、AES 密钥配置和防伪 NFC 标签验证的桌面工程工具。",
      keywords: ["NTAG 424 DNA 工具", "NTAG424 SUN URL", "NTAG 424 DNA 个人化", "SUN 动态 URL 验证"],
      downloadHint: "可在下载中心获取：NFCTEC NTAG424 DNA Tool。",
      sections: [
        {
          heading: "它解决什么问题",
          text: "NTAG 424 DNA 项目最容易卡在标签配置、密钥分散和后端验证之间。这个工具让工程师在进入量产个人化之前，能反复测试 SUN URL、计数器、CMAC 和标签配置。",
        },
        {
          heading: "典型流程",
          text: "从样品标签开始，配置文件和访问权限，验证 AES 密钥，生成 SUN URL，再把同一份 tap 数据发送给验证 API。目标是让每一枚 NFC 标签在进入产线前都可以被验证。",
        },
        {
          heading: "适用场景",
          text: "适合品牌防伪、产品认证、耗材验证、保修激活、智能包装，以及任何静态 NFC URL 容易被复制的项目。",
        },
      ],
      features: ["SUN 动态 URL 生成与验证测试", "AES 密钥和访问权限配置检查", "读计数器与 CMAC 排查", "适合 NTAG 424 DNA 防伪标签试点"],
      faqs: [
        { q: "它能替代量产个人化系统吗？", a: "不能。它是工程验证工具。量产阶段 NFCTEC 可以提供批量个人化、密钥管理和验证 API。" },
        { q: "必须接后端吗？", a: "本地可以测试标签数据，但真正的 SUN 验证应该连接到保护密钥并检查计数器的后端。" },
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
