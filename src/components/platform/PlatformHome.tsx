import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { PageSection } from "@/components/PageSection";
import { PlatformFrame, PlatformLink, StatusBadge } from "@/components/platform/PlatformChrome";
import { useLocale } from "@/hooks/useLocale";
import { API_PLANS, CONFIRMED_ISSUANCE } from "@/lib/platform-site";

const STEPS = [
  { n: "01", en: "Configure", zh: "配置", bodyEn: "Set KEY0–KEY4, SDM, NDEF, the issuance template, and file access.", bodyZh: "配置 KEY0–KEY4、SDM、NDEF、发行模板和文件访问权限。" },
  { n: "02", en: "Provision", zh: "发行", bodyEn: "The factory writes tags from Windows, macOS, Linux, or Android.", bodyZh: "工厂用 Windows、macOS、Linux 或 Android 写卡。" },
  { n: "03", en: "Bind", zh: "绑定", bodyEn: "An API call attaches the issued tag to a SKU, serial, and batch.", bodyZh: "通过 API 把已发行标签绑到 SKU、产品编号和批次。" },
  { n: "04", en: "Activate", zh: "启用", bodyEn: "Turn a tag on, set a validity window, or revoke it.", bodyZh: "启用标签、设置有效期，或将其作废。" },
  { n: "05", en: "Authenticate", zh: "验真", bodyEn: "A tap is checked in the cloud. The result comes back with the product state.", bodyZh: "贴卡后由云端校验，并返回验真结果和标签状态。" },
] as const;

export function PlatformHome() {
  const locale = useLocale();
  const zh = locale === "zh";

  return (
    <PlatformFrame
      locale={locale}
      page="home"
      eyebrow={zh ? "企业级 NFC 安全基础设施" : "Enterprise NFC Security Infrastructure"}
      title={zh ? "安全发行每一枚标签，可信验证每一件产品。" : "Secure Every Tag. Authenticate Every Product."}
      subtitle={
        zh
          ? "基于 NXP NTAG424 DNA 的企业级 NFC 安全发行与产品身份认证平台。从工厂写卡、产品绑定到消费者验真，一套平台完成全生命周期管理。"
          : "One platform for NTAG424 DNA secure provisioning, product identity management, and cryptographic authentication. From factory issuance to consumer verification."
      }
      actions={
        <>
          <PlatformLink locale={locale} intent="start">{zh ? "免费开始" : "Start Free"}</PlatformLink>
          <PlatformLink locale={locale} intent="features">{zh ? "了解功能" : "Explore Features"}</PlatformLink>
        </>
      }
    >
      <PageSection spacing="tight" className="!pt-0">
        <ol className="grid md:grid-cols-3 gap-4" aria-label={zh ? "发行到验真" : "Provisioning to authentication"}>
          {[
            zh ? "安全发行" : "Secure Provisioning",
            zh ? "产品绑定" : "Product Binding",
            zh ? "云端验真" : "Cloud Authentication",
          ].map((label, index) => (
            <li key={label} className="rounded-2xl border border-border bg-card-gradient p-6">
              <p className="text-xs font-mono text-muted-foreground">0{index + 1}</p>
              <p className="mt-3 font-display text-lg font-semibold">{label}</p>
              <p className="mt-2 text-sm text-muted-foreground">
                {index === 0 && (zh ? "发行任务、成功张数、写卡记录。" : "Issuance tasks, successful writes, and a record for each tag.")}
                {index === 1 && (zh ? "标签对应产品编号、SKU 和批次。" : "Each tag maps to a product number, SKU, and batch.")}
                {index === 2 && (zh ? "动态报文在云端校验，并带上标签状态。" : "The dynamic message is checked in the cloud, with the tag state.")}
              </p>
            </li>
          ))}
        </ol>
      </PageSection>

      <PageSection tone="muted">
        <h2 className="font-display text-2xl lg:text-3xl tracking-tight max-w-3xl">
          {zh ? "从安全发行到产品验真，一套平台完成。" : "Everything You Need for Secure NFC Product Authentication"}
        </h2>
        <div className="mt-8 grid md:grid-cols-2 gap-5">
          {[
            [zh ? "安全发行" : "Secure Provisioning", zh ? "用已授权的电脑或 Android 客户端个人化 NTAG424 DNA。客户端负责 NFC 通信，服务器负责密码学操作。" : "Securely personalize NTAG424 DNA tags using authorized desktop or Android clients, with cryptographic operations handled by the server."],
            [zh ? "服务器端密钥" : "Server-Side Key Management", zh ? "AES 密钥和安全会话留在服务器，不把品牌密钥交给产线操作员。" : "Keep AES keys and secure session operations away from factory provisioning clients."],
            [zh ? "产品身份" : "Product Identity Management", zh ? "把已发行标签和产品编号、SKU、生产批次以及生命周期状态连在一起。" : "Associate issued NFC tags with SKUs, product serial numbers, manufacturing batches, and lifecycle states."],
            [zh ? "密码学验真" : "Cryptographic Authentication", zh ? "用 AES-128 CMAC、动态计数器和标签状态规则，在云端完成验真。" : "Verify NTAG424 DNA dynamic messages using AES-128 CMAC, replay detection, and tag lifecycle policies."],
          ].map(([title, body]) => (
            <article key={title} className="rounded-2xl border border-border bg-card-gradient p-7">
              <h3 className="font-display text-lg font-semibold">{title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{body}</p>
            </article>
          ))}
        </div>
      </PageSection>

      <PageSection>
        <h2 className="font-display text-2xl lg:text-3xl tracking-tight">
          {zh ? "从工厂到消费者，一条不断的流程。" : "From Factory to Customer. One Connected Workflow."}
        </h2>
        <ol className="mt-8 grid gap-4 md:grid-cols-5">
          {STEPS.map((step) => (
            <li key={step.n} className="rounded-2xl border border-border bg-card-gradient p-5 min-h-[11rem]">
              <span className="text-xs font-mono text-muted-foreground">{step.n}</span>
              <h3 className="mt-4 font-display text-lg font-semibold">{zh ? step.zh : step.en}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{zh ? step.bodyZh : step.bodyEn}</p>
            </li>
          ))}
        </ol>
      </PageSection>

      <PageSection tone="muted">
        <h2 className="font-display text-2xl lg:text-3xl tracking-tight">
          {zh ? "密钥留在服务器，工厂只负责安全发行。" : "Your Keys Stay Server-Side."}
        </h2>
        <div className="mt-8 grid lg:grid-cols-2 gap-8 items-start">
          <ol className="rounded-2xl border border-border bg-card-gradient p-6 space-y-3" aria-label={zh ? "发行架构" : "Provisioning architecture"}>
            {[
              "NFCTEC Cloud Security Engine",
              zh ? "加密的 API 通信" : "Encrypted API Communication",
              zh ? "Windows / macOS / Linux / Android 写卡客户端" : "Windows / macOS / Linux / Android Provisioning Client",
              zh ? "NFC 读卡器" : "NFC Reader",
              "NTAG424 DNA Tag",
            ].map((item, index) => (
              <li key={item} className="flex gap-3 text-sm">
                <span className="font-mono text-xs text-muted-foreground w-6 pt-0.5">0{index + 1}</span>
                <span className="font-medium">{item}</span>
              </li>
            ))}
          </ol>
          <ul className="space-y-3 text-sm text-muted-foreground leading-relaxed">
            {(zh
              ? ["AES 密钥处理在服务器", "EV2 安全会话在服务器处理", "客户端按 APDU 转发架构工作", "操作员需要授权", "发行任务有数量上限", "操作留有审计记录"]
              : ["Server-side AES key handling", "Server-side EV2 secure session processing", "APDU relay architecture", "Operator authorization", "Issuance task limits", "Audit records"]
            ).map((item) => (
              <li key={item} className="rounded-xl border border-border px-4 py-3">{item}</li>
            ))}
          </ul>
        </div>
      </PageSection>

      <PageSection>
        <h2 className="font-display text-2xl lg:text-3xl tracking-tight">
          {zh ? "为品牌、工厂和集成商而做。" : "Built for Brands, Manufacturers, and Integrators."}
        </h2>
        <div className="mt-8 grid md:grid-cols-3 gap-5">
          {[
            { href: "/cloud-services/platform/authentication", title: zh ? "品牌方" : "Brand Owners", body: zh ? "用可密码学验证的 NFC 身份保护产品。" : "Protect products with cryptographically verifiable NFC identities." },
            { href: "/cloud-services/platform/provisioning", title: zh ? "NFC 工厂" : "NFC Manufacturers", body: zh ? "为不同品牌写卡，无需把客户 AES 密钥交给产线操作员。" : "Provision tags for different brands without exposing customer AES keys to factory operators." },
            { href: "/cloud-services/platform/developers", title: zh ? "系统集成商" : "System Integrators", body: zh ? "用 REST API 接上安全发行和验真。" : "Integrate secure provisioning and authentication through REST APIs." },
          ].map((card) => (
            <article key={card.href} className="rounded-2xl border border-border bg-card-gradient p-7 flex flex-col">
              <h3 className="font-display text-lg font-semibold">{card.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed flex-1">{card.body}</p>
              <Link to={`/$locale${card.href}`} params={{ locale }} className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-primary">
                {zh ? "了解更多" : "Learn more"} <ArrowRight size={14} />
              </Link>
            </article>
          ))}
        </div>
      </PageSection>

      <PageSection tone="muted">
        <h2 className="font-display text-2xl lg:text-3xl tracking-tight">
          {zh ? "今天用云，企业形态按需展开。" : "Cloud Today. Enterprise-Ready for Tomorrow."}
        </h2>
        <div className="mt-8 grid md:grid-cols-3 gap-5">
          <article className="rounded-2xl border border-border bg-card-gradient p-7">
            <StatusBadge>{zh ? "可自助开通" : "Available"}</StatusBadge>
            <h3 className="mt-4 font-display text-lg font-semibold">NFCTEC Cloud</h3>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
              {zh ? "自助 SaaS。发行额度与验真订阅分开购买。" : "Self-service SaaS with flexible issuance quotas and authentication subscriptions."}
            </p>
          </article>
          <article className="rounded-2xl border border-border bg-card-gradient p-7">
            <StatusBadge tone="planned">{zh ? "拟定方案" : "Proposed"}</StatusBadge>
            <h3 className="mt-4 font-display text-lg font-semibold">Enterprise Cloud</h3>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
              {zh ? "多品牌、多工厂、访问控制和业务集成。套餐需销售确认后开通。" : "Multi-brand, multi-factory, access control, and enterprise integration. Plans are confirmed with sales before they go live."}
            </p>
          </article>
          <article className="rounded-2xl border border-border bg-card-gradient p-7">
            <StatusBadge tone="planned">{zh ? "规划中" : "Planned"}</StatusBadge>
            <h3 className="mt-4 font-display text-lg font-semibold">Private Deployment</h3>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
              {zh ? "面向需要独立环境和自有安全策略的机构。现在可做可行性评估，还不是标准交付产品。" : "For organizations that need dedicated infrastructure and customer-controlled security policies. Open for a feasibility assessment, not a standard delivery yet."}
            </p>
          </article>
        </div>
      </PageSection>

      <PageSection>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="font-display text-2xl lg:text-3xl tracking-tight">
            {zh ? "价格清楚，按规模扩展。" : "Simple Pricing. Built to Scale."}
          </h2>
          <PlatformLink locale={locale} intent="pricing">{zh ? "查看价格" : "View Pricing"}</PlatformLink>
        </div>
        <div className="mt-8 grid md:grid-cols-3 gap-5">
          {API_PLANS.map((plan) => (
            <article key={plan.id} className="rounded-2xl border border-border bg-card-gradient p-7">
              <h3 className="font-display text-lg font-semibold">{plan.name}</h3>
              <p className="mt-3 font-display text-3xl">${plan.monthlyUsd}<span className="text-base text-muted-foreground">{zh ? "/月" : "/month"}</span></p>
              <p className="mt-2 text-sm text-muted-foreground">{plan.checks.toLocaleString()} {zh ? "次验真" : "verifications"}</p>
            </article>
          ))}
        </div>
        <p className="mt-6 text-sm text-muted-foreground">
          {zh
            ? `发行额度单独购买。已确认标价：${CONFIRMED_ISSUANCE.quantity.toLocaleString()} 张成功发行 $${CONFIRMED_ISSUANCE.priceUsd}。企业云拟定方案自 $499/月起，需销售确认。`
            : `Issuance quota is purchased separately. Confirmed price: ${CONFIRMED_ISSUANCE.quantity.toLocaleString()} successful issuances for $${CONFIRMED_ISSUANCE.priceUsd}. Enterprise Cloud proposals start at $499/month and need sales confirmation.`}
        </p>
      </PageSection>

      <PageSection tone="muted">
        <h2 className="font-display text-2xl lg:text-3xl tracking-tight">
          {zh ? "为开发者准备的集成方式。" : "Built for Developers. Designed for Integration."}
        </h2>
        <ul className="mt-6 flex flex-wrap gap-2">
          {(zh
            ? ["REST API", "标签库存", "产品绑定", "启用", "作废", "密码学验真", "Webhook", "API 凭证"]
            : ["REST API", "Tag inventory", "Product binding", "Activation", "Revocation", "Cryptographic verification", "Webhook integration", "API credentials"]
          ).map((item) => (
            <li key={item} className="rounded-full border border-border px-3 py-1 text-sm">{item}</li>
          ))}
        </ul>
        <p className="mt-4 text-sm text-muted-foreground max-w-3xl leading-relaxed">
          {zh
            ? "凭证和请求字段在平台内发放。本站不公布未经核对的接口地址。"
            : "Credentials and request fields are issued inside the platform. This site does not publish an unverified endpoint."}
        </p>
        <div className="mt-6">
          <Link to="/$locale/cloud-services/platform/developers" params={{ locale }} className="inline-flex items-center gap-1 text-sm font-medium text-primary">
            {zh ? "查看开发者说明" : "Read the developer page"} <ArrowRight size={14} />
          </Link>
        </div>
      </PageSection>
    </PlatformFrame>
  );
}
