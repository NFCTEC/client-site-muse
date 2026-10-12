import { createFileRoute } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";
import { PageHero } from "@/components/PageHero";
import { PageSection } from "@/components/PageSection";
import { absLocaleUrl, type Locale } from "@/lib/locale";
import { hreflangLinks } from "@/lib/seo";

export const Route = createFileRoute("/$locale/privacy")({
  head: ({ params }) => {
    const url = absLocaleUrl(params.locale as Locale, "/privacy");
    return {
      meta: [
        { title: "Privacy — NFCTEC" },
        { name: "description", content: "How the NFCTEC website handles inquiries and technical logs." },
        { property: "og:title", content: "Privacy — NFCTEC" },
        { property: "og:url", content: url },
        { property: "og:type", content: "website" },
      ],
      links: [{ rel: "canonical", href: url }, ...hreflangLinks("/privacy")],
    };
  },
  component: Privacy,
});

function Privacy() {
  const { tr } = useI18n();
  return (
    <>
      <PageHero eyebrow={tr("nav.privacy")} title={tr("legal.privacy.title")} subtitle={tr("legal.privacy.sub")} />
      <PageSection spacing="main" className="!pt-0">
        <p className="max-w-3xl text-muted-foreground leading-relaxed">{tr("legal.privacy.body")}</p>
      </PageSection>
    </>
  );
}
