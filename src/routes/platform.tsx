import { createFileRoute, Link } from "@tanstack/react-router";
import { Plug, Settings2, Sparkles, Cloud, ShieldCheck, KeyRound, Lock, FileSearch, ArrowRight, Check, Clock } from "lucide-react";

export const Route = createFileRoute("/platform")({
  head: () => ({
    meta: [
      { title: "NFC Issuance Platform — NFCTEC" },
      { name: "description", content: "Cloud personalization & verification for NTAG424 DNA and MIFARE DESFire EV1/EV2/EV3. HSM-backed keys, no crypto knowledge required." },
      { property: "og:title", content: "NFC Issuance Platform — NFCTEC" },
      { property: "og:description", content: "Issue NFC cards without the complexity. Plug in a reader, configure, issue — all keys stay in the cloud HSM." },
    ],
  }),
  component: Platform,
});

const steps = [
  { icon: Plug, n: "01", t: "Connect", d: "Plug in any compatible NFC reader. No drivers, no local software setup required." },
  { icon: Settings2, n: "02", t: "Configure", d: "Set up your card profile on the dashboard. Define application structure, access rules, and data fields through a simple interface." },
  { icon: Sparkles, n: "03", t: "Issue", d: "Place the card on the reader. All encryption, key management, and authentication happen in our cloud — your reader just relays the data." },
];

const features = [
  { icon: Cloud, t: "Online Personalization", d: "Initialize and configure NFC cards entirely from the cloud. Key generation, cryptographic operations, and APDU execution are all handled server-side. You define what you want — we handle how it's done." },
  { icon: ShieldCheck, t: "Online Verification", d: "Verify card authenticity in real time through our API or dashboard. Present a card, get an instant result. No local crypto libraries, no key files to manage." },
  { icon: KeyRound, t: "Secure Key Management", d: "Your card keys are stored in hardware security modules (HSM). They never exist in plaintext — not in transit, not at rest, not even to us." },
];

const cards = [
  { name: "NTAG424 DNA", chip: "NXP · SUN message, AES-128", p: true, v: true },
  { name: "MIFARE DESFire EV1", chip: "NXP · 3DES / AES, multi-app", p: true, v: true },
  { name: "MIFARE DESFire EV2", chip: "NXP · AES, TMI, secure messaging", p: true, v: true },
  { name: "MIFARE DESFire EV3", chip: "NXP · AES, SUN, 8KB EEPROM", p: true, v: true },
];

const upcoming = [
  "Batch issuance",
  "Lifecycle key rotation",
  "Multi-tenant management",
  "Additional card type support",
];

const trust = [
  { icon: Lock, t: "HSM-Backed Key Storage", d: "All cryptographic keys are protected by hardware security modules. Never exposed, never accessible in plaintext." },
  { icon: ShieldCheck, t: "Encrypted in Transit", d: "Every operation between your reader and our cloud is fully encrypted end-to-end." },
  { icon: FileSearch, t: "Full Audit Trail", d: "Every card issued and verified is logged with a complete audit record — giving you full visibility into your issuance history." },
];

function Platform() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-24 lg:pt-32 pb-20 lg:pb-28">
        <div className="absolute inset-0 bg-hero-glow pointer-events-none" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-[11px] font-mono text-primary">
            <Sparkles size={12} /> NFC Issuance Platform
          </span>
          <h1 className="mt-5 font-display text-5xl lg:text-7xl tracking-tight max-w-4xl text-balance">
            Issue NFC Cards Without the Complexity.
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl leading-relaxed">
            Cloud-powered personalization and verification for NTAG424 DNA and MIFARE DESFire EV1/EV2/EV3. No cryptography knowledge required — just plug in your reader and start issuing.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/contact" className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-6 py-3 text-sm font-semibold hover:shadow-glow-strong transition-all">
              Get Started Free <ArrowRight size={16} />
            </Link>
            <Link to="/downloads" className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/50 px-6 py-3 text-sm font-semibold hover:border-primary/50 transition-colors">
              View Documentation
            </Link>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 lg:py-24 bg-surface/40 border-y border-border">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <h2 className="font-display text-4xl lg:text-5xl tracking-tight text-balance max-w-2xl">
            Three Steps to Issue a Card
          </h2>
          <div className="mt-12 grid md:grid-cols-3 gap-5">
            {steps.map((s) => {
              const Icon = s.icon;
              return (
                <div key={s.n} className="rounded-2xl border border-border bg-card-gradient p-8">
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/30 grid place-items-center">
                      <Icon size={20} className="text-primary" />
                    </div>
                    <span className="text-xs font-mono text-muted-foreground">{s.n}</span>
                  </div>
                  <h3 className="font-display text-xl font-semibold mb-2">{s.t}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{s.d}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Core features */}
      <section className="py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <h2 className="font-display text-4xl lg:text-5xl tracking-tight text-balance max-w-2xl">
            What the Platform Does For You
          </h2>
          <div className="mt-12 grid md:grid-cols-3 gap-5">
            {features.map((f) => {
              const Icon = f.icon;
              return (
                <div key={f.t} className="card-glow rounded-2xl border border-border bg-card-gradient p-8">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/30 grid place-items-center mb-6">
                    <Icon size={20} className="text-primary" />
                  </div>
                  <h3 className="font-display text-xl font-semibold mb-3">{f.t}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{f.d}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Supported cards */}
      <section className="py-20 lg:py-24 bg-surface/40 border-y border-border">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <h2 className="font-display text-4xl lg:text-5xl tracking-tight text-balance max-w-2xl">
            Supported NFC Technologies
          </h2>
          <div className="mt-12 rounded-2xl border border-border bg-card-gradient overflow-hidden">
            <div className="grid grid-cols-12 px-6 py-4 border-b border-border bg-surface/50 text-[11px] font-mono uppercase tracking-wider text-muted-foreground">
              <div className="col-span-6">Card Type</div>
              <div className="col-span-3 text-center">Personalization</div>
              <div className="col-span-3 text-center">Verification</div>
            </div>
            {cards.map((c) => (
              <div key={c.name} className="grid grid-cols-12 px-6 py-5 border-b border-border last:border-b-0 items-center">
                <div className="col-span-6">
                  <div className="font-display font-semibold">{c.name}</div>
                  <div className="text-xs font-mono text-muted-foreground mt-0.5">{c.chip}</div>
                </div>
                <div className="col-span-3 text-center">
                  <span className="inline-flex items-center gap-1.5 text-xs font-mono text-primary">
                    <Check size={14} /> Available
                  </span>
                </div>
                <div className="col-span-3 text-center">
                  <span className="inline-flex items-center gap-1.5 text-xs font-mono text-primary">
                    <Check size={14} /> Available
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Coming soon */}
      <section className="py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <h2 className="font-display text-4xl lg:text-5xl tracking-tight text-balance">
              More Features on the Way
            </h2>
            <p className="mt-5 text-muted-foreground leading-relaxed max-w-lg">
              We're continuously expanding the platform. The features below are currently in active development.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            {upcoming.map((u) => (
              <div key={u} className="rounded-xl border border-border bg-surface/40 p-5 flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-primary/10 border border-primary/30 grid place-items-center shrink-0">
                  <Clock size={16} className="text-primary" />
                </div>
                <span className="text-sm font-medium">{u}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust */}
      <section className="py-20 lg:py-24 bg-surface/40 border-y border-border">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <h2 className="font-display text-4xl lg:text-5xl tracking-tight text-balance max-w-2xl">
            Security You Can Rely On
          </h2>
          <div className="mt-12 grid md:grid-cols-3 gap-5">
            {trust.map((t) => {
              const Icon = t.icon;
              return (
                <div key={t.t} className="rounded-2xl border border-border bg-card-gradient p-8">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/30 grid place-items-center mb-6">
                    <Icon size={20} className="text-primary" />
                  </div>
                  <h3 className="font-display text-xl font-semibold mb-3">{t.t}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{t.d}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 lg:py-32">
        <div className="mx-auto max-w-4xl px-6 lg:px-10 text-center">
          <h2 className="font-display text-4xl lg:text-6xl tracking-tight text-balance">
            Ready to Simplify Your NFC Issuance?
          </h2>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
            Start issuing NTAG424 DNA and DESFire cards today — no cryptography expertise needed.
          </p>
          <div className="mt-8 flex flex-wrap gap-3 justify-center">
            <Link to="/contact" className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-6 py-3 text-sm font-semibold hover:shadow-glow-strong transition-all">
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
