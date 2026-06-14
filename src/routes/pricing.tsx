import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Pricing — NFCTEC NFC Issuance Platform" },
      { name: "description", content: "Simple, usage-based pricing for NFC card issuance and verification. Free tier available." },
      { property: "og:title", content: "Pricing — NFCTEC" },
      { property: "og:description", content: "Free to start. Scale up when you need more issuance and verification capacity." },
    ],
  }),
  component: Pricing,
});

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    desc: "For evaluation and development.",
    cta: "Start Free",
    href: "/auth",
    highlight: false,
    features: [
      "100 issuance / month",
      "1,000 verifications / month",
      "NTAG424 DNA only",
      "Community support",
      "Dashboard access",
    ],
  },
  {
    name: "Starter",
    price: "$49",
    period: "/month",
    desc: "For small projects shipping to production.",
    cta: "Choose Starter",
    href: "/auth",
    highlight: false,
    features: [
      "2,000 issuance / month",
      "30,000 verifications / month",
      "All card types (NTAG424, DESFire EV1/2/3)",
      "Email support · 48h",
      "API keys × 3",
    ],
  },
  {
    name: "Pro",
    price: "$199",
    period: "/month",
    desc: "For commercial deployments at scale.",
    cta: "Choose Pro",
    href: "/auth",
    highlight: true,
    features: [
      "15,000 issuance / month",
      "300,000 verifications / month",
      "Webhooks & audit log export",
      "Priority support · 24h",
      "API keys × 20",
      "Team seats × 5",
    ],
  },
  {
    name: "Business",
    price: "$799",
    period: "/month",
    desc: "For organizations with high volume.",
    cta: "Choose Business",
    href: "/auth",
    highlight: false,
    features: [
      "100,000 issuance / month",
      "2,000,000 verifications / month",
      "Batch issuance API",
      "Multi-tenant management",
      "99.9% SLA",
      "Dedicated success manager",
    ],
  },
];

function Pricing() {
  return (
    <>
      <section className="relative pt-28 lg:pt-36 pb-12">
        <div className="absolute inset-0 bg-hero-glow pointer-events-none" />
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-[11px] font-mono text-primary">
            PRICING
          </span>
          <h1 className="mt-5 font-display text-5xl lg:text-6xl tracking-tight text-balance">
            Start Free. Scale When You Need To.
          </h1>
          <p className="mt-5 text-lg text-muted-foreground max-w-2xl mx-auto">
            Usage-based pricing for NFC issuance and verification. No setup fees. Cancel anytime. Annual billing saves 20%.
          </p>
        </div>
      </section>

      <section className="pb-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {plans.map((p) => (
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
              <div className="mt-5 flex items-baseline gap-1">
                <span className="font-display text-4xl font-semibold">{p.price}</span>
                <span className="text-sm text-muted-foreground">{p.period}</span>
              </div>
              <Link
                to={p.href}
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
          ))}
        </div>

        <div className="mt-10 mx-auto max-w-3xl px-6 text-center">
          <div className="rounded-2xl border border-border bg-surface/40 p-6">
            <h3 className="font-display text-xl">Need more? Enterprise plans available.</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Unlimited issuance, private HSM partition, SSO, custom SLA and contracts.
            </p>
            <Link
              to="/contact"
              className="mt-4 inline-flex items-center gap-2 rounded-full border border-border bg-background px-5 py-2 text-sm font-semibold hover:border-primary/50 transition-colors"
            >
              Contact Sales <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 border-t border-border bg-surface/40">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="font-display text-3xl text-center">Pricing FAQ</h2>
          <div className="mt-8 grid md:grid-cols-2 gap-5">
            {[
              { q: "What counts as an issuance?", a: "Each card successfully personalized — including key generation and APDU execution — counts as one issuance." },
              { q: "What counts as a verification?", a: "Each API call that authenticates a card (SUN message verification or DESFire mutual auth) counts as one verification." },
              { q: "What if I exceed my quota?", a: "We charge usage overage at $0.01 per issuance and $0.001 per verification. No hard cutoffs." },
              { q: "Can I switch plans anytime?", a: "Yes. Upgrades are prorated immediately. Downgrades take effect at the next billing cycle." },
            ].map((f) => (
              <div key={f.q} className="rounded-xl border border-border bg-card-gradient p-5">
                <h4 className="font-display font-semibold text-sm">{f.q}</h4>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
