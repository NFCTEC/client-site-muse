import { Link } from "@tanstack/react-router";
import { PageSection } from "@/components/PageSection";
import { FaqSection } from "@/components/FaqSection";
import { PlatformFrame, PlatformLink, StatusBadge } from "@/components/platform/PlatformChrome";
import { useLocale } from "@/hooks/useLocale";
import {
  ACTIVATE_REQUEST_EXAMPLE,
  BIND_REQUEST_EXAMPLE,
  OPEN_API_ENDPOINTS,
  PLATFORM_API_ORIGIN,
  REVOKE_REQUEST_EXAMPLE,
  VERIFY_NODE_EXAMPLE,
  VERIFY_PHP_EXAMPLE,
  VERIFY_PYTHON_EXAMPLE,
  VERIFY_REQUEST_EXAMPLE,
  VERIFY_RESPONSE_EXAMPLE,
} from "@/lib/platform-api";
import { PLATFORM_FAQS, platformRoute } from "@/lib/platform-site";

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
        ["产品生命周期", "已提供", ["已发行", "已绑定", "使用中", "已作废", "已过期", "按需导出印刷/产线数据（含 UID 与绑定字段，格式可约定）"]],
        ["企业管理", "已提供", ["组织管理", "操作员与角色", "发行任务", "安全策略", "审计日志", "API 访问控制"]],
      ]
    : [
        ["Secure Provisioning", "Available", ["NTAG424 DNA personalization", "KEY0–KEY4 configuration", "NDEF URL configuration", "SDM settings", "File access permissions", "Issuance templates", "Production tasks", "Issuance quantity limits", "Issuance records", "Windows / macOS / Linux / Android clients"]],
        ["Authentication", "Available", ["AES-128 CMAC verification", "SDM / SUN verification", "Dynamic counter validation", "Replay detection", "Tag identification", "Revocation and expiration", "Product information lookup", "Authentication API"]],
        ["Product Lifecycle", "Available", ["Issued", "Bound", "Active", "Revoked", "Expired", "Print-line / shop-floor exports on request (UID + binding fields, format by agreement)"]],
        ["Enterprise Management", "Available", ["Organization management", "Operators and roles", "Provisioning tasks", "Security policies", "Audit logs", "API access control"]],
      ];

  return (
    <PlatformFrame
      locale={locale}
      page="features"
      eyebrow={zh ? "功能" : "Features"}
      title={zh ? "NTAG424 编码、个人化、认证与数字身份。" : "NTAG424 encoding, personalization, authentication, and digital identity."}
      subtitle={
        zh
          ? "覆盖工厂读写、SUN/SDM 个人化、产品数字身份绑定与云端认证防伪。"
          : "Factory read/write, SUN/SDM personalization, product digital identity binding, and cloud authentication for anti-counterfeiting."
      }
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
      title={zh ? "NTAG424 产线个人化：安全读写，密钥不上线。" : "NTAG424 personalization on the line: secure read/write, keys stay off the device."}
      subtitle={
        zh
          ? "云端编码与密钥会话；客户端只做 NFC 读写转发。每次成功写卡形成 UID 记录，支撑产品数字身份。"
          : "Cloud encoding and crypto sessions; clients only read/write and relay NFC. Each successful write records the UID for product digital identity."
      }
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
                ? ["AES 密钥与 EV2 会话", "按模板写 NDEF、SDM 和文件权限", "只统计成功张数，达到任务上限后不再新开", "每次写卡留下记录和失败原因", "发行记录含 UID，可与产品绑定并按要求导出给印刷或产线"]
                : ["AES keys and the EV2 session", "NDEF, SDM, and file permissions from the template", "Counts successful writes and stops at the task limit", "Keeps the result and the failure reason", "Issuance records include UID; bind to products and export for print or line systems on request"]}
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
      title={zh ? "贴卡认证：SUN 动态报文与密码学防伪。" : "Tap authentication: SUN messages and cryptographic anti-counterfeiting."}
      subtitle={
        zh
          ? "用发行时的密钥校验 AES-128 CMAC，识别重放，返回产品数字身份与绑定、作废、过期状态。"
          : "Authenticate with AES-128 CMAC keys from personalization, detect replay, and return product digital identity with bind, revoke, and expiry state."
      }
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
        ["7", "需要印刷或产线对接时，按约定字段导出 UID 与绑定数据（或通过开放 API 拉取）"],
      ]
    : [
        ["1", "Create API credentials in the platform"],
        ["2", "Pull issued tags that are not bound yet"],
        ["3", "Bind a SKU, product number, and batch"],
        ["4", "Activate, set a validity window, or revoke"],
        ["5", "Submit the tap message and read the verification result"],
        ["6", "Receive issuance and lifecycle events on a webhook"],
        ["7", "For label print or line integration, export UID and binding fields in the layout you specify—or pull them via the open API"],
      ];

  return (
    <PlatformFrame
      locale={locale}
      page="developers"
      eyebrow={zh ? "开发者" : "Developers"}
      title={zh ? "把安全 NFC 接到你的系统里。" : "Integrate Secure NFC into Your Applications."}
      subtitle={zh ? "下面的路径、字段和示例响应来自 platform.nfctec.com 控制台里的开放接口说明。凭证在平台创建，完整内容只显示一次。" : "The paths, fields, and sample response below are taken from the open API guide in the platform.nfctec.com console. Create the credential there. The full secret is shown once."}
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
      </PageSection>
      <PageSection tone="muted">
        <h2 className="font-display text-2xl tracking-tight">{zh ? "已公布的路径" : "Published paths"}</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          {zh ? `同源地址 ${PLATFORM_API_ORIGIN}。请求头 Authorization: Bearer，加上平台里创建的凭证。` : `Same origin as ${PLATFORM_API_ORIGIN}. Header Authorization: Bearer, using the credential created in the platform.`}
        </p>
        <ul className="mt-4 space-y-2 text-sm font-mono">
          {OPEN_API_ENDPOINTS.map((item) => (
            <li key={item.path} className="rounded-xl border border-border px-4 py-3">
              <span className="text-primary">{item.method}</span> {item.path}
            </li>
          ))}
        </ul>
        <div className="mt-8 grid lg:grid-cols-2 gap-5">
          <Sample title={zh ? "验真请求" : "Verify request"} code={VERIFY_REQUEST_EXAMPLE} />
          <Sample title={zh ? "验真响应示例" : "Verify response example"} code={VERIFY_RESPONSE_EXAMPLE} />
          <Sample title={zh ? "绑定" : "Bind"} code={BIND_REQUEST_EXAMPLE} />
          <Sample title={zh ? "启用" : "Activate"} code={ACTIVATE_REQUEST_EXAMPLE} />
          <Sample title={zh ? "作废" : "Revoke"} code={REVOKE_REQUEST_EXAMPLE} />
        </div>
        <p className="mt-4 text-sm text-muted-foreground leading-relaxed max-w-3xl">
          {zh
            ? "验真可以传 url，或一起传 uid、ctr、cmac。uid 为 14 位十六进制。绑定必填 uid 和 productCode。启用可选 validDays。作废可选 reason。示例里的 UID 和产品来自平台文档，不是客户数据。"
            : "Verify accepts url, or uid, ctr, and cmac together. uid is 14 hex characters. Bind requires uid and productCode. Activate may include validDays. Revoke may include reason. The UID and product in the samples are the ones in the platform guide, not a customer record."}
        </p>
        <div className="mt-8 space-y-5">
          <Sample title="Node.js" code={VERIFY_NODE_EXAMPLE} />
          <Sample title="PHP" code={VERIFY_PHP_EXAMPLE} />
          <Sample title="Python" code={VERIFY_PYTHON_EXAMPLE} />
        </div>
        <p className="mt-6 text-sm">
          <a href={PLATFORM_API_ORIGIN} className="font-medium text-primary">
            {zh ? "在平台里打开接口说明" : "Open the API guide in the platform"}
          </a>
        </p>
      </PageSection>
    </PlatformFrame>
  );
}

function Sample({ title, code }: { title: string; code: string }) {
  return (
    <figure>
      <figcaption className="text-sm font-medium mb-2">{title}</figcaption>
      <pre className="overflow-x-auto rounded-xl border border-border bg-background/70 p-4 text-xs leading-relaxed"><code>{code}</code></pre>
    </figure>
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
      title={zh ? "NTAG424 编码、个人化、认证与防伪问答。" : "NTAG424 encoding, personalization, authentication, and anti-counterfeiting FAQ."}
    >
      <FaqSection title={zh ? "问答" : "Questions"} items={PLATFORM_FAQS[locale]} />
    </PlatformFrame>
  );
}
