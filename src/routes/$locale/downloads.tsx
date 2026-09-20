import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";
import { Download, FileArchive, FileText, Cpu, Code2, ShieldCheck, Sparkles, ArrowRight } from "lucide-react";
import { fetchDisplayConfig, fetchDownloads, getDownloadTrackUrl, type CmsDownloadGroup } from "@/lib/cms";
import { filterByDisplayConfig, isModuleEnabled } from "@/lib/display-config";
import { absLocaleUrl, type Locale } from "@/lib/locale";
import { hreflangLinks } from "@/lib/seo";
import { PageHero } from "@/components/PageHero";
import { PageSection } from "@/components/PageSection";
import { SectionHeader } from "@/components/SectionHeader";
import { CtaBand } from "@/components/CtaBand";

const iconForGroup = (name: string) => {
  const n = name.toLowerCase();
  if (n.includes("sdk")) return Code2;
  if (n.includes("driver")) return Cpu;
  if (n.includes("spec") || n.includes("datasheet")) return FileText;
  if (n.includes("cert")) return ShieldCheck;
  if (n.includes("sample")) return FileArchive;
  if (n.includes("app")) return Sparkles;
  return Code2;
};

function fileKind(url: string | null, name: string): string {
  const src = (url ?? name).toLowerCase();
  const ext = src.match(/\.([a-z0-9]+)(?:\?|$)/)?.[1];
  if (!ext) return "FILE";
  if (ext === "pdf") return "PDF";
  if (["zip", "7z", "gz", "tar", "rar"].includes(ext)) return "ZIP";
  if (["exe", "msi", "dmg", "apk"].includes(ext)) return "APP";
  if (["doc", "docx"].includes(ext)) return "DOC";
  return ext.toUpperCase();
}

const tools = [
  { k: "tools.ntag", slug: "ntag424-tool" },
  { k: "tools.javacard", slug: "javacard-tool" },
] as const;

export const Route = createFileRoute("/$locale/downloads")({
  loader: async ({ params }) => {
    const locale = params.locale as Locale;
    const config = await fetchDisplayConfig(locale);
    const moduleConfig = config.modules.downloads;
    if (!moduleConfig.enabled) throw notFound();
    const groups = await fetchDownloads(locale);
    return {
      groups: filterByDisplayConfig(groups, moduleConfig),
      showPlatform: isModuleEnabled(config, "platform"),
    };
  },
  head: ({ params }) => ({
    meta: [
      { title: "Download Center — NFCTEC" },
      { name: "description", content: "SDKs, drivers, datasheets, sample code and certifications." },
      { property: "og:title", content: "Download Center — NFCTEC" },
      { property: "og:description", content: "NFC SDKs, drivers, datasheets and sample code." },
      { property: "og:url", content: absLocaleUrl(params.locale as Locale, "/downloads") },
      { property: "og:type", content: "website" },
    ],
    links: [
      { rel: "canonical", href: absLocaleUrl(params.locale as Locale, "/downloads") },
      ...hreflangLinks("/downloads"),
    ],
  }),
  component: Downloads,
});

function Downloads() {
  const { tr, lang } = useI18n();
  const { groups, showPlatform } = Route.useLoaderData();
  const { locale } = Route.useParams();
  const totalFiles = groups.reduce((n: number, g: CmsDownloadGroup) => n + g.items.length, 0);

  return (
    <>
      <PageHero
        eyebrow={tr("nav.downloads")}
        title={tr("dl.title")}
        subtitle={tr("dl.sub")}
        meta={
          totalFiles > 0 ? (
            <p className="text-sm text-muted-foreground">
              {groups.length} {lang === "zh" ? "个分类" : "categories"} · {totalFiles} {tr("dl.files")}
            </p>
          ) : undefined
        }
      />

      <PageSection spacing="main" className="!pt-0">
        <div className="space-y-8">
          {groups.length === 0 ? (
            <div className="rounded-2xl border border-border bg-card-gradient p-12 lg:p-16 text-center">
              <FileArchive size={40} className="mx-auto text-muted-foreground mb-6" />
              <p className="text-muted-foreground max-w-md mx-auto leading-relaxed">{tr("dl.empty")}</p>
              <Link
                to="/$locale/contact"
                params={{ locale }}
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-6 py-3 text-sm font-semibold hover:opacity-90 transition-opacity"
              >
                {tr("dl.contact")} <ArrowRight size={16} />
              </Link>
            </div>
          ) : (
            groups.map((g: CmsDownloadGroup) => {
              const Icon = iconForGroup(g.name);
              return (
                <div key={g.id} className="rounded-2xl border border-border bg-card-gradient overflow-hidden">
                  <div className="flex items-center gap-3 px-7 py-5 border-b border-border bg-background/30">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/30 grid place-items-center">
                      <Icon size={18} className="text-primary" />
                    </div>
                    <div>
                      <h2 className="font-display text-lg font-semibold">{g.name}</h2>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {g.items.length} {tr("dl.files")}
                      </p>
                    </div>
                  </div>
                  <ul className="divide-y divide-border">
                    {g.items.length === 0 ? (
                      <li className="px-7 py-6 text-sm text-muted-foreground">{tr("dl.groupEmpty")}</li>
                    ) : (
                      g.items.map((it) => {
                        const kind = fileKind(it.fileUrl, it.name);
                        const metaParts = [it.version, it.fileSize].filter(Boolean);
                        const meta = metaParts.join(" · ");
                        return (
                          <li
                            key={it.id}
                            className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-7 py-4 hover:bg-surface-elevated/40 transition-colors"
                          >
                            <div className="flex items-start gap-4 min-w-0">
                              <span className="shrink-0 rounded-md border border-border bg-surface/60 px-2 py-1 text-[10px] font-semibold text-primary">
                                {kind}
                              </span>
                              <div className="min-w-0">
                                <div className="text-sm font-medium">{it.name}</div>
                                {meta && <div className="text-xs text-muted-foreground mt-1">{meta}</div>}
                              </div>
                            </div>
                            {it.fileUrl ? (
                              <a
                                href={getDownloadTrackUrl(it.id, locale as Locale)}
                                className="shrink-0 inline-flex items-center gap-2 rounded-full border border-border-strong px-4 py-2 text-xs text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
                              >
                                <Download size={14} /> {tr("dl.download")}
                              </a>
                            ) : (
                              <span className="shrink-0 inline-flex items-center gap-2 rounded-full border border-dashed border-border px-4 py-2 text-xs text-muted-foreground">
                                {tr("dl.unavailable")}
                              </span>
                            )}
                          </li>
                        );
                      })
                    )}
                  </ul>
                </div>
              );
            })
          )}
        </div>
      </PageSection>

      {showPlatform && (
        <PageSection tone="muted" spacing="main">
          <SectionHeader eyebrow={tr("tools.eyebrow")} title={tr("plat.title")} sub={tr("plat.sub")} />
          <div className="grid sm:grid-cols-2 gap-5">
            {tools.map((t) => (
              <Link
                key={t.k}
                to="/$locale/tools/$slug"
                params={{ locale, slug: t.slug }}
                className="card-glow group rounded-2xl border border-border bg-card-gradient p-6 min-h-[8.5rem]"
              >
                <h3 className="font-display text-base font-semibold mb-2 group-hover:text-primary transition-colors">
                  {tr(`${t.k}.t` as never)}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{tr(`${t.k}.d` as never)}</p>
              </Link>
            ))}
          </div>
        </PageSection>
      )}

      <CtaBand />
    </>
  );
}
