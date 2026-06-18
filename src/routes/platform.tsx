import { createFileRoute, Link } from "@tanstack/react-router";
import { Plug, Code2, Sparkles, ShieldCheck, KeyRound, Lock, ArrowRight } from "lucide-react";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/platform")({
  head: () => ({
    meta: [
      { title: "NFC Issuance Platform — NFCTEC" },
      { name: "description", content: "Cloud personalization & verification for NTAG424 DNA and MIFARE DESFire. Simple API, HSM-backed keys." },
      { property: "og:title", content: "NFC Issuance Platform — NFCTEC" },
      { property: "og:description", content: "Issue NFC cards with a simple API." },
    ],
  }),
  component: Platform,
});

type Bi = { en: string; zh: string };
const pick = (b: Bi, lang: "en" | "zh") => b[lang];

const steps: { icon: typeof Plug; n: string; t: Bi; d: Bi }[] = [
  {
    icon: Plug, n: "01",
    t: { en: "Connect Any Hardware", zh: "连接任意硬件" },
    d: { en: "Any NFC reader, terminal, phone, kiosk or embedded device. If it can talk APDU, it can talk to our API. No SDK lock-in.", zh: "任意 NFC 读卡器、终端、手机、自助机或嵌入式设备。只要能收发 APDU，就能对接我们的 API，无 SDK 锁定。" },
  },
  {
    icon: Code2, n: "02",
    t: { en: "Call a Simple API", zh: "调用简单 API" },
    d: { en: "Two REST endpoints — issue and verify. No crypto knowledge, no key files, no APDU scripts. Integrate in an afternoon.", zh: "两个 REST 接口 —— 发卡与验证。无需密码学知识、无需密钥文件、无需 APDU 脚本,一个下午即可集成。" },
  },
  {
    icon: Sparkles, n: "03",
    t: { en: "We Handle the Crypto", zh: "加密由我们处理" },
    d: { en: "Key derivation, authentication and secure messaging run in our HSM. Your hardware just relays bytes.", zh: "密钥派生、认证与安全报文全部在我们的 HSM 中运行,您的硬件只负责中继字节。" },
  },
];

const trust: { icon: typeof Lock; t: Bi; d: Bi }[] = [
  {
    icon: Lock,
    t: { en: "HSM-Backed Keys", zh: "HSM 托管密钥" },
    d: { en: "Card keys live in hardware security modules. Never exposed in plaintext — not even to us.", zh: "卡密钥存放于硬件安全模块中,从不以明文暴露 —— 我们自己也看不到。" },
  },
  {
    icon: ShieldCheck,
    t: { en: "Encrypted End-to-End", zh: "端到端加密" },
    d: { en: "All reader ↔ cloud traffic is fully encrypted in transit.", zh: "读卡器 ↔ 云端的所有流量全程加密传输。" },
  },
  {
    icon: KeyRound,
    t: { en: "Full Audit Trail", zh: "完整审计日志" },
    d: { en: "Every issuance and verification is logged with a complete, exportable audit record.", zh: "每一次发卡与验证都有完整、可导出的审计记录。" },
  },
];


function Platform() {
  const [billing, setBilling] = useState<"monthly" | "annual">("annual");
  const { lang } = useI18n();
  const T = (b: Bi) => pick(b, lang);

  return (
    <>
      {/* Hero */}
      <section className="relative pt-24 lg:pt-32 pb-16 lg:pb-20">
        <div className="absolute inset-0 bg-hero-glow pointer-events-none" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-[11px] font-mono text-primary">
            <Sparkles size={12} /> {lang === "zh" ? "NFC 发卡平台" : "NFC Issuance Platform"}
          </span>
          <h1 className="mt-5 font-display text-5xl lg:text-7xl tracking-tight max-w-4xl text-balance">
            {lang === "zh" ? "发行 NFC 卡,告别复杂。" : "Issue NFC Cards Without the Complexity."}
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl leading-relaxed">
            {lang === "zh"
              ? "面向 NTAG424 DNA 与 MIFARE DESFire 的云端个性化与验证。简洁 REST API —— 密码学由我们处理。"
              : "Cloud personalization and verification for NTAG424 DNA and MIFARE DESFire. A simple REST API — we handle the cryptography."}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/auth" className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-6 py-3 text-sm font-semibold hover:shadow-glow-strong transition-all">
              {lang === "zh" ? "免费开始" : "Get Started Free"} <ArrowRight size={16} />
            </Link>
            <a href="#pricing" className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/50 px-6 py-3 text-sm font-semibold hover:border-primary/50 transition-colors">
              {lang === "zh" ? "查看价格" : "View Pricing"}
            </a>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 lg:py-20 bg-surface/40 border-y border-border">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <h2 className="font-display text-4xl lg:text-5xl tracking-tight text-balance max-w-2xl">
            {lang === "zh" ? "三步发出一张卡" : "Three Steps to Issue a Card"}
          </h2>
          <div className="mt-10 grid md:grid-cols-3 gap-5">
            {steps.map((s) => {
              const Icon = s.icon;
              return (
                <div key={s.n} className="rounded-2xl border border-border bg-card-gradient p-7">
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-11 h-11 rounded-xl bg-primary/10 border border-primary/30 grid place-items-center">
                      <Icon size={18} className="text-primary" />
                    </div>
                    <span className="text-xs font-mono text-muted-foreground">{s.n}</span>
                  </div>
                  <h3 className="font-display text-lg font-semibold mb-2">{T(s.t)}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{T(s.d)}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Security */}
      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <h2 className="font-display text-4xl lg:text-5xl tracking-tight text-balance max-w-2xl">
            {lang === "zh" ? "可信赖的安全基石" : "Security You Can Rely On"}
          </h2>
          <div className="mt-10 grid md:grid-cols-3 gap-5">
            {trust.map((it) => {
              const Icon = it.icon;
              return (
                <div key={it.t.en} className="rounded-2xl border border-border bg-card-gradient p-7">
                  <div className="w-11 h-11 rounded-xl bg-primary/10 border border-primary/30 grid place-items-center mb-5">
                    <Icon size={18} className="text-primary" />
                  </div>
                  <h3 className="font-display text-lg font-semibold mb-2">{T(it.t)}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{T(it.d)}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 lg:py-24 bg-surface/40 border-y border-border scroll-mt-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-[11px] font-mono text-primary">
              {lang === "zh" ? "价格" : "PRICING"}
            </span>
            <h2 className="mt-5 font-display text-4xl lg:text-5xl tracking-tight text-balance">
              {lang === "zh" ? "免费起步,准备好再扩展。" : "Start Free. Scale When You're Ready."}
            </h2>
            <p className="mt-5 text-muted-foreground">
              {lang === "zh"
                ? "每个套餐(含 Free)都附带 API 密钥。年付节省 20%。"
                : "Every plan — including Free — comes with an API key. Annual billing saves 20%."}
            </p>

            {/* Toggle */}
            <div className="mt-7 inline-flex items-center gap-1 p-1 rounded-full border border-border bg-background">
              <button
                onClick={() => setBilling("monthly")}
                className={`px-5 py-2 text-sm font-semibold rounded-full transition-all ${
                  billing === "monthly" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {lang === "zh" ? "按月" : "Monthly"}
              </button>
              <button
                onClick={() => setBilling("annual")}
                className={`px-5 py-2 text-sm font-semibold rounded-full transition-all inline-flex items-center gap-2 ${
                  billing === "annual" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {lang === "zh" ? "按年" : "Annual"}
                <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                  billing === "annual" ? "bg-primary-foreground/20" : "bg-primary/15 text-primary"
                }`}>−20%</span>
              </button>
            </div>
          </div>

          <div className="mt-12 grid md:grid-cols-3 gap-5 max-w-6xl mx-auto">
            {plans.map((p) => {
              const price = billing === "monthly" ? p.monthly : p.annual;
              return (
                <div
                  key={p.name}
                  className={`rounded-2xl border p-7 flex flex-col ${
                    p.highlight
                      ? "border-primary/60 bg-card-gradient shadow-glow relative"
                      : "border-border bg-card-gradient"
                  }`}
                >
                  {p.highlight && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary text-primary-foreground px-3 py-1 text-[10px] font-mono uppercase tracking-wider">
                      {lang === "zh" ? "最受欢迎" : "Most popular"}
                    </span>
                  )}
                  <h3 className="font-display text-xl font-semibold">{p.name}</h3>
                  <p className="mt-1 text-xs text-muted-foreground">{T(p.desc)}</p>
                  <div className="mt-5 flex items-baseline gap-1 min-h-[3rem]">
                    <span className="font-display text-4xl font-semibold">${price}</span>
                    <span className="text-sm text-muted-foreground">
                      {price === 0
                        ? (lang === "zh" ? "/ 永久免费" : "/ forever")
                        : billing === "annual"
                          ? (lang === "zh" ? "/ 月,按年计费" : "/ mo, billed yearly")
                          : (lang === "zh" ? "/ 月" : "/ month")}
                    </span>
                  </div>
                  {p.note && <p className="text-[11px] font-mono text-primary">{T(p.note)}</p>}
                  <Link
                    to="/auth"
                    className={`mt-5 inline-flex items-center justify-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold transition-all ${
                      p.highlight
                        ? "bg-primary text-primary-foreground hover:shadow-glow-strong"
                        : "border border-border bg-surface/50 hover:border-primary/50"
                    }`}
                  >
                    {T(p.cta)} <ArrowRight size={14} />
                  </Link>
                  <ul className="mt-6 space-y-3 text-sm">
                    {p.features.map((f) => (
                      <li key={f.en} className="flex items-start gap-2">
                        <Check size={14} className="text-primary mt-0.5 shrink-0" />
                        <span className="text-muted-foreground">{T(f)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>

          <div className="mt-10 mx-auto max-w-3xl">
            <div className="rounded-2xl border border-border bg-background/60 p-6 text-center">
              <h3 className="font-display text-lg">
                {lang === "zh" ? "需要更多?提供企业方案。" : "Need more? Enterprise plans available."}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {lang === "zh"
                  ? "无限发卡、专属 HSM 分区、SSO、定制 SLA 与合同。"
                  : "Unlimited issuance, private HSM partition, SSO, custom SLA and contracts."}
              </p>
              <Link
                to="/contact"
                className="mt-4 inline-flex items-center gap-2 rounded-full border border-border bg-surface/50 px-5 py-2 text-sm font-semibold hover:border-primary/50 transition-colors"
              >
                {lang === "zh" ? "联系销售" : "Contact Sales"} <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 lg:py-28">
        <div className="mx-auto max-w-4xl px-6 lg:px-10 text-center">
          <h2 className="font-display text-4xl lg:text-6xl tracking-tight text-balance">
            {lang === "zh" ? "准备好简化你的 NFC 发卡了吗?" : "Ready to Simplify Your NFC Issuance?"}
          </h2>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
            {lang === "zh"
              ? "免费注册,获取 API 密钥,几分钟内发出第一张卡。"
              : "Sign up free, grab your API key, and issue your first card in minutes."}
          </p>
          <div className="mt-8 flex flex-wrap gap-3 justify-center">
            <Link to="/auth" className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-6 py-3 text-sm font-semibold hover:shadow-glow-strong transition-all">
              {lang === "zh" ? "免费开始" : "Get Started Free"} <ArrowRight size={16} />
            </Link>
            <Link to="/contact" className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/50 px-6 py-3 text-sm font-semibold hover:border-primary/50 transition-colors">
              {lang === "zh" ? "联系我们" : "Contact Us"}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
