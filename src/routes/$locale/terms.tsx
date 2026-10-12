import { createFileRoute } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";
import { PageHero } from "@/components/PageHero";
import { PageSection } from "@/components/PageSection";
import { absLocaleUrl, type Locale } from "@/lib/locale";
import { hreflangLinks } from "@/lib/seo";

export const Route = createFileRoute("/$locale/terms")({
  head: ({ params }) => {
    const url = absLocaleUrl(params.locale as Locale, "/terms");
    return {
      meta: [
        { title: "Terms — NFCTEC" },
        { name: "description", content: "Public website terms for NFCTEC product pages, tools and downloads." },
        { property: "og:title", content: "Terms — NFCTEC" },
        { property: "og:url", content: url },
        { property: "og:type", content: "website" },
      ],
      links: [{ rel: "canonical", href: url }, ...hreflangLinks("/terms")],
    };
  },
  component: Terms,
});

function Terms() {
  const { tr } = useI18n();
  return (
    <>
      <PageHero eyebrow={tr("nav.terms")} title={tr("legal.terms.title")} subtitle={tr("legal.terms.sub")} />
      <PageSection spacing="main" className="!pt-0">
        <p className="max-w-3xl text-muted-foreground leading-relaxed">{tr("legal.terms.body")}</p>
      </PageSection>
    </>
  );
}
