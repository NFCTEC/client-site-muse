import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Plug, Code2, Sparkles, ShieldCheck, KeyRound, Lock, ArrowRight, Check } from "lucide-react";

export const Route = createFileRoute("/platform")({
  head: () => ({
    meta: [
      { title: "NFC Issuance Platform & Pricing — NFCTEC" },
      { name: "description", content: "Cloud personalization & verification for NTAG424 DNA and MIFARE DESFire. Simple API, HSM-backed keys. Free tier — issue 20 test cards, no credit card required." },
      { property: "og:title", content: "NFC Issuance Platform — NFCTEC" },
      { property: "og:description", content: "Issue NFC cards with a simple API. Free tier includes 20 test issuances and an API key." },
    ],
  }),
  component: Platform,
});

const steps = [
  { icon: Plug, n: "01", t: "Connect Any Hardware", d: "Any NFC reader, terminal, phone, kiosk or embedded device. If it can talk APDU, it can talk to our API. No SDK lock-in." },
  { icon: Code2, n: "02", t: "Call a Simple API", d: "Two REST endpoints — issue and verify. No crypto knowledge, no key files, no APDU scripts. Integrate in an afternoon." },
  { icon: Sparkles, n: "03", t: "We Handle the Crypto", d: "Key derivation, authentication and secure messaging run in our HSM. Your hardware just relays bytes." },
];

const trust = [
  { icon: Lock, t: "HSM-Backed Keys", d: "Card keys live in hardware security modules. Never exposed in plaintext — not even to us." },
  { icon: ShieldCheck, t: "Encrypted End-to-End", d: "All reader ↔ cloud traffic is fully encrypted in transit." },
  { icon: KeyRound, t: "Full Audit Trail", d: "Every issuance and verification is logged with a complete, exportable audit record." },
];

type Plan = {
  name: string;
  monthly: number | null;
  annual: number | null;
  desc: string;
  cta: string;
  highlight: boolean;
  features: string[];
  note?: string;
};

const plans: Plan[] = [
  {
    name: "Free",
    monthly: 0,
    annual: 0,
    desc: "Test and evaluate the platform.",
    cta: "Start Free",
    highlight: false,
    features: [
      "20 test issuances (one-time)",
      "1,000 verifications / month",
      "NTAG424 DNA only",
      "1 API key included",
      "Community support",
    ],
    note: "No credit card required",
  },
  {
    name: "Pro",
    monthly: 199,
    annual: 159,
    desc: "Commercial deployments at scale.",
    cta: "Choose Pro",
    highlight: true,
    features: [
      "15,000 issuances / month",
      "300,000 verifications / month",
      "All card types (NTAG424 + DESFire EV1/2/3)",
      "Webhooks & audit log export",
      "20 API keys · 5 team seats",
      "Priority support · 24h",
    ],
  },
  {
    name: "Business",
    monthly: 799,
    annual: 639,
    desc: "High volume & multi-tenant.",
    cta: "Choose Business",
    highlight: false,
    features: [
      "100,000 issuances / month",
      "2,000,000 verifications / month",
      "Batch issuance API",
      "Multi-tenant management",
      "99.9% SLA · dedicated CSM",
      "Overage: $0.01 / issuance",
    ],
  },
];

function Platform() {
  const [billing, setBilling] = useState<"monthly" | "annual">("annual");

  return (
    <>
      {/* Hero */}
      <section className="relative pt-24 lg:pt-32 pb-16 lg:pb-20">
        <div className="absolute inset-0 bg-hero-glow pointer-events-none" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-[11px] font-mono text-primary">
            <Sparkles size={12} /> NFC Issuance Platform
          </span>
          <h1 className="mt-5 font-display text-5xl lg:text-7xl tracking-tight max-w-4xl text-balance">
            Issue NFC Cards Without the Complexity.
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl leading-relaxed">
            Cloud personalization and verification for NTAG424 DNA and MIFARE DESFire. A simple REST API — we handle the cryptography.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/auth" className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-6 py-3 text-sm font-semibold hover:shadow-glow-strong transition-all">
              Get Started Free <ArrowRight size={16} />
            </Link>
            <a href="#pricing" className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/50 px-6 py-3 text-sm font-semibold hover:border-primary/50 transition-colors">
              View Pricing
            </a>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 lg:py-20 bg-surface/40 border-y border-border">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <h2 className="font-display text-4xl lg:text-5xl tracking-tight text-balance max-w-2xl">
            Three Steps to Issue a Card
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
                  <h3 className="font-display text-lg font-semibold mb-2">{s.t}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{s.d}</p>
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
            Security You Can Rely On
          </h2>
          <div className="mt-10 grid md:grid-cols-3 gap-5">
            {trust.map((t) => {
              const Icon = t.icon;
              return (
                <div key={t.t} className="rounded-2xl border border-border bg-card-gradient p-7">
                  <div className="w-11 h-11 rounded-xl bg-primary/10 border border-primary/30 grid place-items-center mb-5">
                    <Icon size={18} className="text-primary" />
                  </div>
                  <h3 className="font-display text-lg font-semibold mb-2">{t.t}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{t.d}</p>
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
              PRICING
            </span>
            <h2 className="mt-5 font-display text-4xl lg:text-5xl tracking-tight text-balance">
              Start Free. Scale When You're Ready.
            </h2>
            <p className="mt-5 text-muted-foreground">
              Every plan — including Free — comes with an API key. Annual billing saves 20%.
            </p>

            {/* Toggle */}
            <div className="mt-7 inline-flex items-center gap-1 p-1 rounded-full border border-border bg-background">
              <button
                onClick={() => setBilling("monthly")}
                className={`px-5 py-2 text-sm font-semibold rounded-full transition-all ${
                  billing === "monthly" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBilling("annual")}
                className={`px-5 py-2 text-sm font-semibold rounded-full transition-all inline-flex items-center gap-2 ${
                  billing === "annual" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Annual
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
                      Most popular
                    </span>
                  )}
                  <h3 className="font-display text-xl font-semibold">{p.name}</h3>
                  <p className="mt-1 text-xs text-muted-foreground">{p.desc}</p>
                  <div className="mt-5 flex items-baseline gap-1 min-h-[3rem]">
                    <span className="font-display text-4xl font-semibold">${price}</span>
                    <span className="text-sm text-muted-foreground">
                      {price === 0 ? "/ forever" : billing === "annual" ? "/ mo, billed yearly" : "/ month"}
                    </span>
                  </div>
                  {p.note && <p className="text-[11px] font-mono text-primary">{p.note}</p>}
                  <Link
                    to="/auth"
                    className={`mt-5 inline-flex items-center justify-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold transition-all ${
                      p.highlight
                        ? "bg-primary text-primary-foreground hover:shadow-glow-strong"
                        : "border border-border bg-surface/50 hover:border-primary/50"
                    }`}
                  >
                    {p.cta} <ArrowRight size={14} />
                  </Link>
                  <ul className="mt-6 space-y-3 text-sm">
                    {p.features.map((f) => (
                      <li key={f} className="flex items-start gap-2">
                        <Check size={14} className="text-primary mt-0.5 shrink-0" />
                        <span className="text-muted-foreground">{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>

          <div className="mt-10 mx-auto max-w-3xl">
            <div className="rounded-2xl border border-border bg-background/60 p-6 text-center">
              <h3 className="font-display text-lg">Need more? Enterprise plans available.</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Unlimited issuance, private HSM partition, SSO, custom SLA and contracts.
              </p>
              <Link
                to="/contact"
                className="mt-4 inline-flex items-center gap-2 rounded-full border border-border bg-surface/50 px-5 py-2 text-sm font-semibold hover:border-primary/50 transition-colors"
              >
                Contact Sales <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 lg:py-28">
        <div className="mx-auto max-w-4xl px-6 lg:px-10 text-center">
          <h2 className="font-display text-4xl lg:text-6xl tracking-tight text-balance">
            Ready to Simplify Your NFC Issuance?
          </h2>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
            Sign up free, grab your API key, and issue your first card in minutes.
          </p>
          <div className="mt-8 flex flex-wrap gap-3 justify-center">
            <Link to="/auth" className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-6 py-3 text-sm font-semibold hover:shadow-glow-strong transition-all">
              Get Started Free <ArrowRight size={16} />
            </Link>
            <Link to="/contact" className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/50 px-6 py-3 text-sm font-semibold hover:border-primary/50 transition-colors">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
