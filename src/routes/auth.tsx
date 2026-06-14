import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Sparkles, Shield, Zap } from "lucide-react";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Platform Access — NFCTEC" },
      { name: "description", content: "Entry to the NFCTEC NFC issuance & verification platform." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: PlatformEntry,
});

function PlatformEntry() {
  return (
    <main className="relative min-h-[100vh] overflow-hidden bg-background text-foreground">
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-[-10%] left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,theme(colors.primary/30),transparent_70%)] blur-3xl" />
        <div className="absolute bottom-[-20%] right-[-10%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle,#7B2FFF55,transparent_70%)] blur-3xl" />
        <div className="absolute top-1/3 left-[-10%] h-[400px] w-[400px] rounded-full bg-[radial-gradient(circle,#00D4FF44,transparent_70%)] blur-3xl" />
      </div>

      <section className="mx-auto flex min-h-[100vh] max-w-6xl flex-col items-center justify-center px-6 py-24 text-center">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-muted-foreground backdrop-blur">
          <Sparkles className="h-3.5 w-3.5 text-primary" />
          Platform · Coming Soon
        </div>

        <h1 className="bg-gradient-to-r from-[#00D4FF] via-foreground to-[#7B2FFF] bg-clip-text text-5xl font-bold leading-tight tracking-tight text-transparent md:text-7xl">
          NFCTEC Platform
        </h1>

        <p className="mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl">
          The dedicated portal for issuing, encrypting, and verifying NFC products via a single API.
          This entry page is reserved for the upcoming self-hosted platform at{" "}
          <span className="font-mono text-foreground">platform.nfctec.com</span>.
        </p>

        <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row">
          <button
            disabled
            className="inline-flex cursor-not-allowed items-center gap-2 rounded-full bg-primary px-8 py-3 font-semibold text-primary-foreground opacity-60"
          >
            Launching Soon <ArrowRight className="h-4 w-4" />
          </button>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-8 py-3 font-semibold backdrop-blur transition hover:bg-card"
          >
            Request Early Access
          </Link>
        </div>

        <div className="mt-20 grid w-full max-w-4xl gap-6 sm:grid-cols-3">
          {[
            { icon: Zap, title: "Simple API", desc: "Issue & verify with a single endpoint." },
            { icon: Shield, title: "Encrypted", desc: "Built-in key management and crypto." },
            { icon: Sparkles, title: "Hardware Agnostic", desc: "Works with any compatible reader." },
          ].map((f) => (
            <div key={f.title} className="rounded-2xl border border-border bg-card/40 p-6 text-left backdrop-blur">
              <f.icon className="mb-3 h-6 w-6 text-primary" />
              <h3 className="font-semibold">{f.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>

        <Link to="/" className="mt-16 text-sm text-muted-foreground transition hover:text-foreground">
          ← Back to nfctec.com
        </Link>
      </section>
    </main>
  );
}
