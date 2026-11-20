import { Link, useMatches } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { useLocale } from "@/hooks/useLocale";
import { getLocaleLoaderData, isModuleEnabled } from "@/lib/display-config";

export function CtaBand() {
  const { tr } = useI18n();
  const locale = useLocale();
  const matches = useMatches();
  const config = getLocaleLoaderData(matches)?.displayConfig;
  const showContact = config ? isModuleEnabled(config, "contact") : true;
  const showDownloads = config ? isModuleEnabled(config, "downloads") : true;

  if (!showContact && !showDownloads) return null;

  return (
    <section className="section-tight pb-8 lg:pb-12">
      <div className="mx-auto max-w-6xl px-6 lg:px-10">
        <div className="relative rounded-xl border border-border bg-surface p-8 sm:p-10 lg:p-12 text-center min-h-[14rem] flex flex-col justify-center">
          <div className="relative">
            <h2 className="font-display text-3xl lg:text-4xl tracking-tight text-balance">
              {tr("cta.title")}
            </h2>
            <p className="mt-4 text-muted-foreground max-w-xl mx-auto">{tr("cta.sub")}</p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              {showContact && (
                <Link
                  to="/$locale/inquiry"
                  params={{ locale }}
                  className="inline-flex items-center gap-2 rounded-md bg-primary text-primary-foreground px-7 py-3.5 text-sm font-semibold hover:opacity-90 transition-opacity"
                >
                  {tr("cta.btn")} <ArrowRight size={16} />
                </Link>
              )}
              {showDownloads && (
                <Link
                  to="/$locale/downloads"
                  params={{ locale }}
                  className="inline-flex items-center gap-2 rounded-md border border-border-strong bg-background px-7 py-3.5 text-sm font-medium hover:border-primary hover:text-primary transition-colors"
                >
                  {tr("cta.btn2")}
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
