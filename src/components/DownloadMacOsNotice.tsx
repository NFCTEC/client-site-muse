import { Terminal } from "lucide-react";
import { useI18n } from "@/lib/i18n";

export function isMacDownloadGroup(name: string): boolean {
  const n = name.toLowerCase();
  return n.includes("mac") || n.includes("darwin") || n.includes("osx") || n.includes("os x");
}

export function isMacDownloadItem(name: string, fileUrl: string | null): boolean {
  const s = `${name} ${fileUrl ?? ""}`.toLowerCase();
  return (
    s.includes("macos") ||
    s.includes("mac os") ||
    s.includes("-mac-") ||
    s.includes("_mac_") ||
    /\.(dmg|app)(?:\?|$)/.test(s)
  );
}

export function DownloadMacOsNotice({ compact = false }: { compact?: boolean }) {
  const { tr } = useI18n();
  if (compact) {
    return (
      <p className="text-[11px] text-muted-foreground leading-relaxed max-w-[16rem] sm:text-right">
        {tr("dl.macosNotice.short")}
      </p>
    );
  }
  return (
    <div className="border-b border-border bg-amber-500/[0.06] px-7 py-5">
      <div className="flex gap-3">
        <Terminal size={18} className="shrink-0 text-primary mt-0.5" aria-hidden />
        <div className="min-w-0 space-y-3">
          <div>
            <h3 className="font-display text-sm font-semibold">{tr("dl.macosNotice.title")}</h3>
            <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">{tr("dl.macosNotice.body")}</p>
          </div>
          <ol className="list-decimal pl-5 text-sm text-muted-foreground space-y-1.5">
            <li>{tr("dl.macosNotice.step1")}</li>
            <li>{tr("dl.macosNotice.step2")}</li>
            <li>{tr("dl.macosNotice.step3")}</li>
          </ol>
          <pre className="overflow-x-auto rounded-xl border border-border bg-background/80 px-4 py-3 text-xs font-mono text-foreground">
            {tr("dl.macosNotice.cmdExample")}
          </pre>
          <p className="text-xs text-muted-foreground leading-relaxed">{tr("dl.macosNotice.alt")}</p>
        </div>
      </div>
    </div>
  );
}