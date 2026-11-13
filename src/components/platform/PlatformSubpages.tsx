import { PageSection } from "@/components/PageSection";
import { FaqSection } from "@/components/FaqSection";
import { PlatformFrame, PlatformLink, StatusBadge } from "@/components/platform/PlatformChrome";
import { PlatformInquiryForm } from "@/components/platform/PlatformInquiryForm";
import { useLocale } from "@/hooks/useLocale";
import { PLATFORM_FAQS } from "@/lib/platform-site";

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="mt-4 space-y-2 text-sm text-muted-foreground leading-relaxed">
      {items.map((item) => (
        <li key={item} className="rounded-xl border border-border px-4 py-3">{item}</li>
      ))}
    </ul>
  );
}

export function PlatformFeatures() {
  const locale = useLocale();
  const zh = locale === "zh";
  const blocks = zh
    ? [
        ["安全发行", "已提供", ["NTAG424 DNA 个人化", "KEY0–KEY4 配置", "NDEF URL", "SDM 设置", "文件访问权限", "发行模板", "生产任务", "发行数量上限", "发行记录", "Windows / macOS / Linux / Android 客户端"]],
        ["验真", "已提供", ["AES-128 CMAC 校验", "SDM / SUN 验真", "动态计数器校验", "重放识别", "标签识别", "作废与过期", "产品信息回传", "验真 API"]],
        ["产品生命周期", "已提供", ["已发行", "已绑定", "使用中", "已作废", "已过期"]],
        ["企业管理", "已提供", ["组织管理", "操作员与角色", "发行任务", "安全策略", "审计日志", "API 访问控制"]],
      ]
    : [
        ["Secure Provisioning", "Available", ["NTAG424 DNA personalization", "KEY0–KEY4 configuration", "NDEF URL configuration", "SDM settings", "File access permissions", "Issuance templates", "Production tasks", "Issuance quantity limits", "Issuance records", "Windows / macOS / Linux / Android clients"]],
        ["Authentication", "Available", ["AES-128 CMAC verification", "SDM / SUN verification", "Dynamic counter validation", "Replay detection", "Tag identification", "Revocation and expiration", "Product information lookup", "Authentication API"]],
        ["Product Lifecycle", "Available", ["Issued", "Bound", "Active", "Revoked", "Expired"]],
        ["Enterprise Management", "Available", ["Organization management", "Operators and roles", "Provisioning tasks", "Security policies", "Audit logs", "API access control"]],
      ];

  return (
    <PlatformFrame
      locale={locale}
      page="features"
      eyebrow={zh ? "功能" : "Features"}
      title={zh ? "已经在平台里的能力，和仍在规划的能力。" : "What the platform does today, and what is still planned."}
      subtitle={zh ? "下面四块是当前云平台能力。私有部署和外部 KMS/HSM 单独标成规划中。" : "The four blocks below are the current cloud product. Private deployment and external KMS/HSM are marked as planned."}
    >
      <PageSection spacing="tight" className="!pt-0">
        <div className="grid lg:grid-cols-2 gap-5">
          {blocks.map(([title, status, items]) => (
            <article key={String(title)} className="rounded-2xl border border-border bg-card-gradient p-7">
              <div className="flex items-center justify-between gap-3">
                <h2 className="font-display text-xl font-semibold">{title}</h2>
                <StatusBadge>{status}</StatusBadge>
              </div>
              <BulletList items={items as string[]} />
            </article>
          ))}
        </div>
      </PageSection>
      <PageSection tone="muted">
        <div className="flex items-center gap-3">
          <h2 className="font-display text-2xl tracking-tight">{zh ? "规划中" : "Planned"}</h2>
          <StatusBadge tone="planned">{zh ? "规划中" : "Planned"}</StatusBadge>
        </div>
        <BulletList
          items={
            zh
              ? ["私有部署与独立数据库", "客户环境中的外部 KMS / HSM", "企业套餐的自助在线购买"]
              : ["Private deployment and an independent database", "External KMS / HSM in the customer environment", "Self-serve checkout for enterprise plans"]
          }
        />
      </PageSection>
    </PlatformFrame>
  );
}

export function PlatformProvisioning() {
  const locale = useLocale();
  const zh = locale === "zh";
  return (
    <PlatformFrame
      locale={locale}
      page="provisioning"
      eyebrow={zh ? "发行" : "Provisioning"}
      title={zh ? "工厂写卡。密钥不进产线设备。" : "Issue tags in the factory. Keys stay off the line."}
      subtitle={zh ? "操作员领取任务并贴卡。客户端把报文原样送回服务器，由服务器完成密钥和会话。" : "Operators take a task and tap a tag. The client relays messages. The server holds the keys and the secure session."}
      actions={<PlatformLink locale={locale} intent="start">{zh ? "免费开始" : "Start Free"}</PlatformLink>}
    >
      <PageSection spacing="tight" className="!pt-0">
        <div className="grid md:grid-cols-2 gap-5">
          <article className="rounded-2xl border border-border bg-card-gradient p-7">
            <h2 className="font-display text-xl font-semibold">{zh ? "写卡端" : "The client"}</h2>
            <BulletList
              items={zh
                ? ["Windows、macOS、Linux 上的 PC/SC 读卡器", "带 NFC 的 Android 手机、平板和 POS", "登录、领任务、贴卡、回传结果"]
                : ["PC/SC readers on Windows, macOS, and Linux", "NFC Android phones, tablets, and POS devices", "Sign in, take a task, tap, return the result"]}
            />
          </article>
          <article className="rounded-2xl border border-border bg-card-gradient p-7">
            <h2 className="font-display text-xl font-semibold">{zh ? "服务器" : "The server"}</h2>
            <BulletList
              items={zh
                ? ["AES 密钥与 EV2 会话", "按模板写 NDEF、SDM 和文件权限", "只统计成功张数，达到任务上限后不再新开", "每次写卡留下记录和失败原因"]
                : ["AES keys and the EV2 session", "NDEF, SDM, and file permissions from the template", "Counts successful writes and stops at the task limit", "Keeps the result and the failure reason"]}
            />
          </article>
        </div>
      </PageSection>
    </PlatformFrame>
  );
}

export function PlatformAuthentication() {
  const locale = useLocale();
  const zh = locale === "zh";
  return (
    <PlatformFrame
      locale={locale}
      page="authentication"
      eyebrow={zh ? "验真" : "Authentication"}
      title={zh ? "每次贴卡都回到当初写过的那张标签。" : "Every tap is checked against the tag you actually issued."}
      subtitle={zh ? "云端用发行时的密钥校验 AES-128 CMAC，认出重放，并带上绑定、作废和过期状态。" : "The cloud checks the AES-128 CMAC with the keys from issuance, detects replay, and applies binding, revocation, and expiry."}
    >
      <PageSection spacing="tight" className="!pt-0">
        <BulletList
          items={zh
            ? ["提交贴卡后的动态报文", "按该标签的发行模板校验 CMAC", "拒绝已经见过的计数器", "返回真品、无效、未找到、重放、已作废、已过期或配额用尽", "已绑定时带回产品编号、品名和批次"]
            : ["Submit the dynamic message from the tap", "Check the CMAC against that tag's issuance template", "Reject a counter that was already accepted", "Return authentic, invalid, not found, replay, revoked, expired, or quota exhausted", "Return the product number, name, and batch when the tag is bound"]}
        />
      </PageSection>
    </PlatformFrame>
  );
}

export function PlatformEnterprise() {
  const locale = useLocale();
  const zh = locale === "zh";
  return (
    <PlatformFrame
      locale={locale}
      page="enterprise"
      eyebrow={zh ? "企业版 · 拟定" : "Enterprise · Proposed"}
      title={zh ? "给品牌和工厂的企业级 NFC 基础设施。" : "Enterprise NFC Infrastructure for Brands and Manufacturers."}
      subtitle={zh ? "把安全发行扩展到多个品牌、多家工厂和现有业务系统。套餐价格需销售确认，不能在本页直接购买。" : "Scale secure NFC provisioning across multiple brands, factories, and business systems. Prices are confirmed with sales. There is no buy button on this page."}
    >
      <PageSection spacing="tight" className="!pt-0">
        <BulletList
          items={zh
            ? ["多品牌工作区", "多工厂管理", "按角色授权", "集中的安全策略", "企业级密钥隔离", "发行任务管理", "大批量发行", "API 集成", "审计与报表", "定制技术支持"]
            : ["Multi-brand workspaces", "Multi-factory management", "Role-based access", "Centralized security policies", "Enterprise key isolation", "Provisioning task management", "High-volume issuance", "API integration", "Audit and reporting", "Custom technical support"]}
        />
        <p className="mt-6 text-sm text-muted-foreground">
          {zh ? "Indicative pricing — Subject to confirmation. 月费与配额见价格页的企业表。" : "Indicative pricing — subject to confirmation. Monthly figures and quotas are on the pricing page."}
        </p>
      </PageSection>
      <PageSection tone="muted">
        <h2 className="font-display text-2xl tracking-tight mb-6">{zh ? "企业询价" : "Request a quote"}</h2>
        <PlatformInquiryForm locale={locale} intent="enterprise" />
      </PageSection>
    </PlatformFrame>
  );
}

export function PlatformPrivate() {
  const locale = useLocale();
  const zh = locale === "zh";
  return (
    <PlatformFrame
      locale={locale}
      page="private"
      eyebrow={zh ? "规划中 · 可做可行性评估" : "Planned · Available for Feasibility Assessment"}
      title={zh ? "你的环境，你的安全策略，你的 NFC 平台。" : "Your Infrastructure. Your Security Policies. Your NFC Platform."}
      subtitle={zh ? "NFCTEC 正在规划私有部署，面向需要独立环境、独立数据库和客户自行掌控密钥管理的企业。这还不是已经交付的标准产品，本页也不给出固定报价。" : "NFCTEC is planning private deployment for enterprises that need dedicated infrastructure, an independent database, and customer-controlled key management. It is not a shipped standard product, and this page has no fixed price."}
    >
      <PageSection spacing="tight" className="!pt-0">
        <StatusBadge tone="planned">{zh ? "规划中" : "Planned"}</StatusBadge>
        <BulletList
          items={zh
            ? ["客户自管云", "独立应用环境", "独立数据库", "外部 KMS / HSM 集成", "企业访问管理", "软件授权", "技术支持与维护", "从 NFCTEC Cloud 迁出"]
            : ["Customer-managed cloud", "Dedicated application environment", "Independent database", "External KMS/HSM integration", "Enterprise access management", "Software licensing", "Technical support and maintenance", "Migration from NFCTEC Cloud"]}
        />
      </PageSection>
      <PageSection tone="muted">
        <h2 className="font-display text-2xl tracking-tight mb-6">{zh ? "讨论私有部署" : "Discuss Private Deployment"}</h2>
        <PlatformInquiryForm locale={locale} intent="private" />
      </PageSection>
    </PlatformFrame>
  );
}

export function PlatformDevelopers() {
  const locale = useLocale();
  const zh = locale === "zh";
  const steps = zh
    ? [
        ["1", "在平台创建 API 凭证"],
        ["2", "拉取已发行、尚未绑定的标签"],
        ["3", "绑定 SKU、产品编号和批次"],
        ["4", "启用、设置有效期或作废"],
        ["5", "提交贴卡报文，取得验真结果"],
        ["6", "用 Webhook 接收写卡和状态变更"],
      ]
    : [
        ["1", "Create API credentials in the platform"],
        ["2", "Pull issued tags that are not bound yet"],
        ["3", "Bind a SKU, product number, and batch"],
        ["4", "Activate, set a validity window, or revoke"],
        ["5", "Submit the tap message and read the verification result"],
        ["6", "Receive issuance and lifecycle events on a webhook"],
      ];

  return (
    <PlatformFrame
      locale={locale}
      page="developers"
      eyebrow={zh ? "开发者" : "Developers"}
      title={zh ? "把安全 NFC 接到你的系统里。" : "Integrate Secure NFC into Your Applications."}
      subtitle={zh ? "发行结果、标签库存、绑定、启用、作废、验真和 Webhook 都从同一套凭证进入。请求路径和字段在平台内查看，这里不放一份猜测出来的示例代码。" : "Issuance results, tag inventory, binding, activation, revocation, verification, and webhooks use the same credentials. Paths and fields are shown in the platform. This page does not invent a sample contract."}
      actions={<PlatformLink locale={locale} intent="start">{zh ? "打开平台" : "Open the platform"}</PlatformLink>}
    >
      <PageSection spacing="tight" className="!pt-0">
        <ol className="grid md:grid-cols-2 gap-4">
          {steps.map(([n, text]) => (
            <li key={n} className="rounded-2xl border border-border bg-card-gradient p-6 flex gap-4">
              <span className="font-mono text-sm text-muted-foreground">{n}</span>
              <span className="text-sm leading-relaxed">{text}</span>
            </li>
          ))}
        </ol>
        <p className="mt-6 text-sm text-muted-foreground max-w-3xl">
          {zh
            ? "PHP、Node.js 或 Python 的调用方式，以平台里看到的真实接口为准。官网仓库里没有另一份可引用的 API 文档。"
            : "PHP, Node.js, and Python calls should follow the live contract in the platform. This website repository does not contain a separate API reference to quote."}
        </p>
      </PageSection>
    </PlatformFrame>
  );
}

export function PlatformFaq() {
  const locale = useLocale();
  const zh = locale === "zh";
  return (
    <PlatformFrame
      locale={locale}
      page="faq"
      eyebrow="FAQ"
      title={zh ? "发行、密钥、价格和部署。" : "Provisioning, keys, pricing, and deployment."}
    >
      <FaqSection title={zh ? "问答" : "Questions"} items={PLATFORM_FAQS[locale]} />
    </PlatformFrame>
  );
}
