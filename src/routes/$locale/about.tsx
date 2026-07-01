import { createFileRoute } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";
import { Target, Heart } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { PageSection } from "@/components/PageSection";
import { CtaBand } from "@/components/CtaBand";

export const Route = createFileRoute("/$locale/about")({
  head: () => ({
    meta: [
      { title: "About — NFCTEC" },
      {
        name: "description",
        content:
          "Founded in 2010, NFCTEC partners with product teams on NFC software, hardware and cloud services.",
      },
      { property: "og:title", content: "About NFCTEC" },
      { property: "og:description", content: "15 years helping teams ship NFC products." },
      { property: "og:url", content: "https://www.nfctec.com/about" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "https://www.nfctec.com/about" }],
  }),
  component: About,
});

const stats = [
  "about.stats.founded",
  "about.stats.projects",
  "about.stats.countries",
  "about.stats.team",
];

const certifications = ["ISO 9001", "PCI-PTS", "EMV L1/L2", "NXP Partner"];

function About() {
  const { tr } = useI18n();

  return (
    <>
      <PageHero
        eyebrow={tr("about.eyebrow")}
        title={tr("about.title")}
        subtitle={tr("about.intro")}
        meta={
          <div className="mt-6">
            <p className="section-label mb-3">{tr("about.certs")}</p>
            <div className="flex flex-wrap gap-2">
              {certifications.map((cert) => (
                <span
                  key={cert}
                  className="rounded-full border border-border bg-background px-4 py-2 text-sm text-muted-foreground"
                >
                  {cert}
                </span>
              ))}
            </div>
          </div>
        }
      />

      <PageSection tone="muted" spacing="main">
        <div className="grid md:grid-cols-2 gap-5">
          {[
            { icon: Target, t: tr("about.mission.t"), d: tr("about.mission.d") },
            { icon: Heart, t: tr("about.values.t"), d: tr("about.values.d") },
          ].map((b) => {
            const Icon = b.icon;
            return (
              <div key={b.t} className="card-glow rounded-2xl bg-card-gradient border border-border p-8 lg:p-10">
                <Icon size={22} className="text-primary mb-6" />
                <h3 className="font-display text-2xl mb-3">{b.t}</h3>
                <p className="text-muted-foreground leading-relaxed">{b.d}</p>
              </div>
            );
          })}
        </div>
      </PageSection>

      <PageSection spacing="band">
        <dl className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {stats.map((key) => (
            <div key={key} className="text-center lg:text-left lg:pl-6 lg:border-l lg:border-border first:lg:pl-0 first:lg:border-l-0">
              <dd className="font-display text-lg lg:text-xl tracking-tight text-foreground">{tr(key)}</dd>
            </div>
          ))}
        </dl>
      </PageSection>

      <CtaBand />
    </>
  );
}
