import { createFileRoute, Link } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";
import { FileCode2, Terminal, FileText, KeyRound, Sparkles, ExternalLink, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/platform")({
  head: () => ({
    meta: [
      { title: "Developer Platform — NFCTEC" },
      { name: "description", content: "Free NFC developer tools: EMV Parser, APDU Debugger, NDEF Editor, MIFARE Toolkit." },
      { property: "og:title", content: "Developer Platform — NFCTEC" },
      { property: "og:description", content: "Free tools, SDKs and sandbox APIs for NFC engineers." },
    ],
  }),
  component: Platform,
});

const tools = [
  { icon: FileCode2, k: "tools.emv", sample: "9F26 08 1A2B3C4D5E6F7081 · 9F27 01 80 · 9F10 0A 0210A04003220000000000" },
  { icon: Terminal, k: "tools.apdu", sample: "> 00 A4 04 00 07 A0000000031010\n< 6F 1A 84 07 A0000000031010 ... 90 00" },
  { icon: FileText, k: "tools.ndef", sample: "URI · https://nfctec.com\nText · Welcome (en)\nvCard · NFCTEC" },
  { icon: KeyRound, k: "tools.mifare", sample: "Sector 0 · Key A FFFFFFFFFFFF · Block 0 dump\n04 D8 7A 91 2E 5E 80 ..." },
] as const;

function Platform() {
  const { tr } = useI18n();

  return (
    <>
      <section className="relative pt-24 lg:pt-32 pb-16">
        <div className="absolute inset-0 bg-hero-glow pointer-events-none" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
          <h1 className="font-display text-5xl lg:text-7xl tracking-tight max-w-4xl text-balance">
            {tr("plat.title")}
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl">{tr("plat.sub")}</p>
        </div>
      </section>

      <section className="py-20 lg:py-24 bg-surface/40 border-y border-border">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-display text-4xl lg:text-5xl tracking-tight whitespace-pre-line text-balance">
              {tr("api.title")}
            </h2>
            <p className="mt-5 text-muted-foreground max-w-lg leading-relaxed">
              {tr("api.sub")}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/contact" className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-6 py-3 text-sm font-semibold hover:shadow-glow-strong transition-all">
                {tr("hero.cta2")} <ArrowRight size={16} />
              </Link>
            </div>
          </div>
          <div className="grid gap-4">
            <div className="rounded-2xl border border-border bg-card-gradient overflow-hidden">
              <div className="flex items-center justify-between px-5 py-3 border-b border-border bg-surface/50">
                <span className="text-xs font-mono text-primary">POST /v1/tags/issue</span>
                <span className="text-[10px] font-mono text-muted-foreground">{tr("api.issue")}</span>
              </div>
              <pre className="p-5 text-xs font-mono leading-relaxed text-foreground/80 overflow-x-auto"><code>{`{
  "chip": "NTAG424_DNA",
  "uid":  "04A1B2C3D4E580",
  "url":  "https://brand.com/x"
}
→ 200 OK
{ "personalization": "...", "sun_url": "..." }`}</code></pre>
            </div>
            <div className="rounded-2xl border border-border bg-card-gradient overflow-hidden">
              <div className="flex items-center justify-between px-5 py-3 border-b border-border bg-surface/50">
                <span className="text-xs font-mono text-primary">POST /v1/tags/verify</span>
                <span className="text-[10px] font-mono text-muted-foreground">{tr("api.verify")}</span>
              </div>
              <pre className="p-5 text-xs font-mono leading-relaxed text-foreground/80 overflow-x-auto"><code>{`{
  "scan_url": "https://brand.com/x?e=...&c=..."
}
→ 200 OK
{ "valid": true, "uid": "04A1B2...", "counter": 42 }`}</code></pre>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-24 lg:pb-32 pt-20 lg:pt-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="mb-12 max-w-2xl">
            <h2 className="font-display text-4xl lg:text-5xl tracking-tight text-balance">
              {tr("tools.title")}
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-5">

          {tools.map((t) => {
            const Icon = t.icon;
            return (
              <div key={t.k} className="card-glow rounded-2xl border border-border bg-card-gradient p-8 overflow-hidden">
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/30 grid place-items-center">
                    <Icon size={20} className="text-primary" />
                  </div>
                  <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 border border-primary/30 px-2.5 py-1 text-[10px] font-mono text-primary">
                    <Sparkles size={10} /> FREE
                  </span>
                </div>
                <h3 className="font-display text-xl font-semibold mb-2">{tr(`${t.k}.t` as never)}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                  {tr(`${t.k}.d` as never)}
                </p>
                <pre className="rounded-lg border border-border bg-background/60 p-4 text-[11px] font-mono text-foreground/70 overflow-x-auto whitespace-pre-wrap leading-relaxed">
                  {t.sample}
                </pre>
                <button
                  className="mt-5 inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-4 py-2 text-sm font-medium hover:shadow-glow transition-all"
                  type="button"
                >
                  {tr("plat.try")} <ExternalLink size={14} />
                </button>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
