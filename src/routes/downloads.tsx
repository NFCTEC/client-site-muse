import { createFileRoute, Link } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";
import { Download, FileArchive, FileText, Cpu, Code2, ShieldCheck, Sparkles } from "lucide-react";

export const Route = createFileRoute("/downloads")({
  head: () => ({
    meta: [
      { title: "Download Center — NFCTEC" },
      { name: "description", content: "SDKs, drivers, datasheets, sample code and certifications." },
      { property: "og:title", content: "Download Center — NFCTEC" },
      { property: "og:description", content: "All NFCTEC downloads in one place." },
    ],
  }),
  component: Downloads,
});

const groups = [
  {
    cat: "dl.cat.sdk", icon: Code2,
    items: [
      { name: "NFC Android SDK", ver: "v4.2.1", size: "8.4 MB" },
      { name: "NFC iOS SDK", ver: "v4.2.1", size: "6.1 MB" },
      { name: "NFC Windows SDK", ver: "v4.2.0", size: "12.7 MB" },
      { name: "NFC Linux SDK", ver: "v4.2.0", size: "9.3 MB" },
    ],
  },
  {
    cat: "dl.cat.driver", icon: Cpu,
    items: [
      { name: "PC/SC CCID Driver — Windows", ver: "v3.1.4", size: "4.2 MB" },
      { name: "PC/SC CCID Driver — macOS", ver: "v3.1.4", size: "3.8 MB" },
      { name: "PN5180 Reference Driver", ver: "v2.0.0", size: "1.1 MB" },
    ],
  },
  {
    cat: "dl.cat.spec", icon: FileText,
    items: [
      { name: "NT-100 Desktop Reader Datasheet", ver: "Rev. B", size: "1.6 MB" },
      { name: "NT-300 Handheld Terminal Datasheet", ver: "Rev. A", size: "2.4 MB" },
      { name: "JCOP Smart Card Datasheet", ver: "Rev. C", size: "1.2 MB" },
    ],
  },
  {
    cat: "dl.cat.sample", icon: FileArchive,
    items: [
      { name: "EMV Read App — Kotlin", ver: "v1.3", size: "320 KB" },
      { name: "HCE Wallet Demo — Swift", ver: "v1.2", size: "440 KB" },
      { name: "DESFire AES Sample — C++", ver: "v1.0", size: "180 KB" },
    ],
  },
  {
    cat: "dl.cat.cert", icon: ShieldCheck,
    items: [
      { name: "ISO 9001:2015 Certificate", ver: "2026", size: "780 KB" },
      { name: "EMV L2 Letter of Approval", ver: "2026", size: "640 KB" },
      { name: "PCI-PTS Certificate", ver: "2026", size: "720 KB" },
    ],
  },
] as const;

function Downloads() {
  const { tr } = useI18n();

  return (
    <>
      <section className="relative pt-24 lg:pt-32 pb-16">
        <div className="absolute inset-0 bg-hero-glow pointer-events-none" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
          <h1 className="font-display text-5xl lg:text-7xl tracking-tight max-w-4xl text-balance">
            {tr("dl.title")}
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl">{tr("dl.sub")}</p>
        </div>
      </section>

      <section className="pb-24 lg:pb-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 space-y-8">
          {groups.map((g) => {
            const Icon = g.icon;
            return (
              <div key={g.cat} className="rounded-2xl border border-border bg-card-gradient overflow-hidden">
                <div className="flex items-center gap-3 px-7 py-5 border-b border-border bg-background/30">
                  <Icon size={18} className="text-primary" />
                  <h2 className="font-display text-lg font-semibold">{tr(g.cat as never)}</h2>
                </div>
                <ul className="divide-y divide-border">
                  {g.items.map((it) => (
                    <li
                      key={it.name}
                      className="flex items-center justify-between gap-4 px-7 py-4 hover:bg-surface-elevated/40 transition-colors"
                    >
                      <div>
                        <div className="text-sm font-medium">{it.name}</div>
                        <div className="text-xs font-mono text-muted-foreground mt-1">
                          {it.ver} · {it.size}
                        </div>
                      </div>
                      <button className="inline-flex items-center gap-2 rounded-full border border-border-strong px-4 py-2 text-xs font-mono text-primary hover:bg-primary hover:text-primary-foreground transition-colors">
                        <Download size={14} /> {tr("dl.download")}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
