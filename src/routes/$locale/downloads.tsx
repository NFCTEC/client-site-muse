import { createFileRoute, Link } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";
import { Download, FileArchive, FileText, Cpu, Code2, ShieldCheck, Sparkles } from "lucide-react";
import { fetchDownloads } from "@/lib/cms";
import { absLocaleUrl, type Locale } from "@/lib/locale";

const iconForGroup = (name: string) => {
  const n = name.toLowerCase();
  if (n.includes("sdk")) return Code2;
  if (n.includes("driver")) return Cpu;
  if (n.includes("spec") || n.includes("datasheet")) return FileText;
  if (n.includes("cert")) return ShieldCheck;
  if (n.includes("sample")) return FileArchive;
  return Code2;
};

const tools = [
  { k: "tools.emv" },
  { k: "tools.apdu" },
  { k: "tools.ndef" },
  { k: "tools.mifare" },
] as const;

export const Route = createFileRoute("/$locale/downloads")({
  loader: async ({ params }) => {
    const groups = await fetchDownloads(params.locale as Locale);
    return { groups };
  },
  head: ({ params }) => ({
    meta: [
      { title: "Download Center — NFCTEC" },
      { name: "description", content: "SDKs, drivers, datasheets, sample code and certifications." },
      { property: "og:url", content: absLocaleUrl(params.locale as Locale, "/downloads") },
    ],
    links: [{ rel: "canonical", href: absLocaleUrl(params.locale as Locale, "/downloads") }],
  }),
  component: Downloads,
});

function Downloads() {
  const { tr } = useI18n();
  const { groups } = Route.useLoaderData();
  const { locale } = Route.useParams();

  return (
    <>
      <section className="relative pt-24 lg:pt-32 pb-16">
        <div className="absolute inset-0 bg-hero-glow pointer-events-none" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
          <h1 className="font-display text-5xl lg:text-7xl tracking-tight max-w-4xl text-balance">{tr("dl.title")}</h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl">{tr("dl.sub")}</p>
        </div>
      </section>

      <section className="pb-24 lg:pb-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 space-y-8">
          {groups.map((g) => {
            const Icon = iconForGroup(g.name);
            return (
              <div key={g.id} className="rounded-2xl border border-border bg-card-gradient overflow-hidden">
                <div className="flex items-center gap-3 px-7 py-5 border-b border-border bg-background/30">
                  <Icon size={18} className="text-primary" />
                  <h2 className="font-display text-lg font-semibold">{g.name}</h2>
                </div>
                <ul className="divide-y divide-border">
                  {g.items.map((it) => (
                    <li key={it.id} className="flex items-center justify-between gap-4 px-7 py-4 hover:bg-surface-elevated/40 transition-colors">
                      <div>
                        <div className="text-sm font-medium">{it.name}</div>
                        <div className="text-xs font-mono text-muted-foreground mt-1">
                          {[it.version, it.fileSize].filter(Boolean).join(" · ")}
                        </div>
                      </div>
                      {it.fileUrl ? (
                        <a href={it.fileUrl} className="inline-flex items-center gap-2 rounded-full border border-border-strong px-4 py-2 text-xs font-mono text-primary hover:bg-primary hover:text-primary-foreground transition-colors">
                          <Download size={14} /> {tr("dl.download")}
                        </a>
                      ) : (
                        <button type="button" className="inline-flex items-center gap-2 rounded-full border border-border-strong px-4 py-2 text-xs font-mono text-muted-foreground">
                          <Download size={14} /> {tr("dl.download")}
                        </button>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </section>

      <section className="pb-24 lg:pb-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <h2 className="font-display text-4xl lg:text-5xl tracking-tight text-balance mb-12">{tr("tools.title")}</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {tools.map((t) => (
              <Link key={t.k} to="/$locale/platform" params={{ locale }} className="card-glow group rounded-2xl border border-border bg-card-gradient p-7">
                <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 border border-primary/30 px-2.5 py-1 text-[10px] font-mono text-primary mb-5">
                  <Sparkles size={10} /> FREE
                </div>
                <h3 className="font-display text-lg font-semibold mb-2">{tr(`${t.k}.t` as never)}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-6">{tr(`${t.k}.d` as never)}</p>
                <span className="text-xs font-mono text-primary">{tr("tools.open")}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
