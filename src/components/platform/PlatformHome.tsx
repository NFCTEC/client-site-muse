import { KeyRound, Layers, Link2, Tags } from "lucide-react";
import { PageSection } from "@/components/PageSection";
import { PlatformFrame, PlatformLink } from "@/components/platform/PlatformChrome";
import { PlatformHeroFlow } from "@/components/platform/PlatformHeroFlow";
import { PlatformProductDemo } from "@/components/platform/PlatformProductDemo";
import { useLocale } from "@/hooks/useLocale";
import { formatUsdFromCents, issuanceCents, orderTotalCents } from "@/lib/platform-pricing";
import { API_PLANS } from "@/lib/platform-site";

const DEMO_ID = "platform-demo";

export function PlatformHome() {
  const locale = useLocale();
  const zh = locale === "zh";

  const why = [
    {
      icon: KeyRound,
      title: zh ? "工厂不需要你的 AES 密钥" : "Your Factory Never Needs Your AES Keys.",
      body: zh
        ? "密码学操作留在服务器。经授权的操作员可以写卡，但拿不到品牌密钥。"
        : "Cryptographic work stays on the server. Authorized operators personalize tags without receiving your secret keys.",
    },
    {
      icon: Tags,
      title: zh ? "使用你自己的 NTAG424 DNA 标签" : "Use Your Own NTAG424 DNA Tags.",
      body: zh
        ? "可用符合发行配置的真品 NTAG424 DNA，向你的供应商采购。量产前请用样品验证读写与 SUN 配置。"
        : "Use compatible genuine NTAG424 DNA from suppliers you choose. Validate a sample against your template before production.",
    },
    {
      icon: Layers,
      title: zh ? "不必从零搭建 NFC 基础设施" : "Stop Building NFC Infrastructure From Scratch.",
      body: zh
        ? "发行、产品身份和验真在同一套云平台上完成，无需自建密钥与写卡后端。"
        : "Provision tags, manage product identities, and verify taps on one cloud platform instead of building it yourself.",
    },
    {
      icon: Link2,
      title: zh ? "接入现有业务系统" : "Connect to Your Existing Business Systems.",
      body: zh
        ? "通过 REST API 对接 ERP、MES 与验真；UID 与产品绑定后，可按约定字段导出印刷或产线用数据。"
        : "Integrate with ERP, MES, and verification APIs. After UID–product binding, export print-line or shop-floor files in the fields and layout you specify.",
    },
  ];

  const steps = [
    {
      title: zh ? "配置" : "Configure",
      body: zh ? "创建发行模板与安全策略。" : "Create a provisioning template and the security settings you need.",
    },
    {
      title: zh ? "发行" : "Provision",
      body: zh
        ? "用授权的 NFC 读卡器或 Android 设备安全写卡。"
        : "Personalize tags with an authorized NFC reader or Android device.",
    },
    {
      title: zh ? "验真" : "Authenticate",
      body: zh
        ? "绑定产品后，通过云端 API 校验动态 NFC 报文。"
        : "Bind tags to products and verify dynamic NFC messages through the cloud API.",
    },
  ];

  return (
    <PlatformFrame
      locale={locale}
      page="home"
      conversionFooter
      eyebrow={
        zh ? "NTAG424 DNA · 编码 · 个人化 · 认证防伪" : "NTAG424 DNA · ENCODING · PERSONALIZATION · AUTHENTICATION"
      }
      title={zh ? "你的标签。你的密钥。你的掌控。" : "Your NFC Tags. Your Keys. Your Control."}
      subtitle={
        zh
          ? "云端完成 NTAG424 DNA 编码与个人化，工厂安全读写写卡。为每张标签建立产品数字身份，用密码学认证支撑 NFC 防伪。"
          : "Cloud NTAG424 DNA encoding and personalization with secure factory read/write. Give every tag a product digital identity and cryptographic authentication for anti-counterfeiting."
      }
      heroMeta={
        <p className="mt-4 text-sm text-muted-foreground max-w-xl">
          {zh ? "从编码、个人化到认证，无需自建 NTAG424 基础设施。" : "From encoding and personalization to authentication—without building NTAG424 infrastructure yourself."}
        </p>
      }
      actions={
        <>
          <PlatformLink locale={locale} intent="start">
            {zh ? "免费开始" : "Start Free"}
          </PlatformLink>
          <a
            href={`#${DEMO_ID}`}
            className="inline-flex items-center gap-2 rounded-full border border-border-strong bg-surface/60 px-6 py-3 text-sm font-medium hover:border-primary hover:text-primary transition-colors"
          >
            {zh ? "了解如何运作" : "See How It Works"}
          </a>
        </>
      }
      heroAside={<PlatformHeroFlow locale={locale} />}
    >
      <PageSection spacing="tight" className="!pt-10 !pb-14">
        <div className="max-w-3xl">
          <h2 className="font-display text-2xl lg:text-3xl tracking-tight">{zh ? "为什么选择 NFCTEC" : "Why NFCTEC?"}</h2>
          <p className="mt-3 text-muted-foreground leading-relaxed">
            {zh
              ? "安全发行与验真 NTAG424 DNA——不被厂商绑死，也无需大量自研。"
              : "Everything you need to securely issue and authenticate NFC tags — without vendor lock-in or unnecessary development."}
          </p>
        </div>
        <ul className="mt-10 grid gap-8 sm:grid-cols-2">
          {why.map(({ icon: Icon, title, body }) => (
            <li key={title} className="flex gap-4">
              <div className="shrink-0 w-11 h-11 rounded-xl bg-primary/10 grid place-items-center text-primary">
                <Icon size={20} aria-hidden />
              </div>
              <div>
                <h3 className="font-display text-lg font-semibold leading-snug">{title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{body}</p>
              </div>
            </li>
          ))}
        </ul>
      </PageSection>

      <PageSection id={DEMO_ID} tone="muted" spacing="main">
        <div className="max-w-3xl">
          <h2 className="font-display text-2xl lg:text-3xl tracking-tight">
            {zh ? "看看 NFCTEC 实际怎么用" : "See NFCTEC in Action."}
          </h2>
          <p className="mt-3 text-muted-foreground leading-relaxed">
            {zh ? "真实软件 · 真实写卡 · 真实密码学验真。" : "Real software. Real NFC provisioning. Real cryptographic verification."}
          </p>
        </div>
        <div className="mt-10">
          <PlatformProductDemo locale={locale} />
        </div>
        <div className="mt-6 text-sm">
          <PlatformLink locale={locale} intent="features">
            {zh ? "查看完整功能" : "View all features"}
          </PlatformLink>
        </div>
      </PageSection>

      <PageSection spacing="main">
        <h2 className="font-display text-2xl lg:text-3xl tracking-tight max-w-3xl text-balance">
          {zh
            ? "三步完成：从 NFC 标签到可信产品身份"
            : "From NFC Tag to Trusted Product Identity in Three Steps."}
        </h2>
        <ol className="mt-10 grid gap-8 md:grid-cols-3 md:gap-6">
          {steps.map((step, i) => (
            <li key={step.title}>
              <span className="text-xs font-mono text-muted-foreground">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-3 font-display text-xl font-semibold">{step.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{step.body}</p>
            </li>
          ))}
        </ol>
        <div className="mt-8 text-sm">
          <PlatformLink locale={locale} intent="features">
            {zh ? "技术细节见功能页" : "Technical details on the features page"}
          </PlatformLink>
        </div>
      </PageSection>

      <PageSection tone="muted" spacing="main">
        <h2 className="font-display text-2xl lg:text-3xl tracking-tight">
          {zh ? "先用小规模起步，再按需扩展" : "Start Small. Scale When You're Ready."}
        </h2>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-border bg-card-gradient p-8">
            <p className="section-label">{zh ? "NFC 发行" : "NFC Provisioning"}</p>
            <p className="mt-2 font-display text-3xl tracking-tight">
              {formatUsdFromCents(issuanceCents(1_000))}
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              {zh
                ? "1,000 张成功写卡 · 按张数曲线计价，一次性额度"
                : "1,000 successful writes · continuous curve, one-time quota"}
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-card-gradient p-8">
            <p className="section-label">{zh ? "验真 API" : "Authentication API"}</p>
            <p className="mt-2 font-display text-3xl tracking-tight">
              {zh ? "自 $" : "From $"}
              {API_PLANS[0].monthlyUsd}
              <span className="text-base text-muted-foreground">{zh ? "/月" : "/month"}</span>
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              {API_PLANS[0].checks.toLocaleString()} {zh ? "次验真 / 月" : "verification checks per month"}
            </p>
          </div>
        </div>
        <p className="mt-6 text-sm text-muted-foreground">
          {zh
            ? `示例：1,000 张 + 标准 API 1 个月 = ${formatUsdFromCents(orderTotalCents(1_000, "standard", 1))}（一笔订单）。价格不含实体标签与读卡器。`
            : `Example: 1,000 cards + Standard API 1 month = ${formatUsdFromCents(orderTotalCents(1_000, "standard", 1))} in one order. Tags and readers not included.`}
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <PlatformLink locale={locale} intent="start">
            {zh ? "免费开始" : "Start Free"}
          </PlatformLink>
          <PlatformLink locale={locale} intent="pricing">
            {zh ? "查看价格" : "View Pricing"}
          </PlatformLink>
        </div>
      </PageSection>
    </PlatformFrame>
  );
}
