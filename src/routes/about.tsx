import { createFileRoute } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";
import { Target, Heart } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — NFCTEC" },
      { name: "description", content: "Founded in 2010, NFCTEC delivers full-stack NFC and Smart Card solutions to 500+ projects in 60+ countries." },
      { property: "og:title", content: "About NFCTEC" },
      { property: "og:description", content: "15 years at the edge of NFC." },
    ],
  }),
  component: About,
});

function About() {
  const { tr } = useI18n();

  const milestones = [
    { year: "2010", text: tr("about.m1") },
    { year: "2014", text: tr("about.m2") },
    { year: "2017", text: tr("about.m3") },
    { year: "2021", text: tr("about.m4") },
    { year: "2026", text: tr("about.m5") },
  ];

  return (
    <>
      <section className="relative pt-24 lg:pt-32 pb-20">
        <div className="absolute inset-0 bg-hero-glow pointer-events-none" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
          <h1 className="font-display text-5xl lg:text-7xl tracking-tight whitespace-pre-line text-balance max-w-4xl">
            {tr("about.title")}
          </h1>
          <p className="mt-10 text-lg text-muted-foreground leading-relaxed max-w-3xl">
            {tr("about.intro")}
          </p>
        </div>
      </section>

      <section className="py-20 bg-surface/40 border-y border-border">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 grid md:grid-cols-2 gap-5">
          {[
            { icon: Target, t: tr("about.mission.t"), d: tr("about.mission.d") },
            { icon: Heart, t: tr("about.values.t"), d: tr("about.values.d") },
          ].map((b) => {
            const Icon = b.icon;
            return (
              <div key={b.t} className="card-glow rounded-3xl bg-card-gradient border border-border p-10 lg:p-12">
                <Icon size={22} className="text-primary mb-6" />
                <h3 className="font-display text-2xl mb-3">{b.t}</h3>
                <p className="text-muted-foreground leading-relaxed">{b.d}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <h2 className="font-display text-4xl lg:text-5xl tracking-tight mb-14">
            {tr("about.milestone")}
          </h2>
          <ol className="relative border-l border-border-strong ml-3">
            {milestones.map((m) => (
              <li key={m.year} className="pl-10 pb-12 last:pb-0 relative">
                <span className="absolute -left-[7px] top-1.5 w-3.5 h-3.5 rounded-full bg-primary ring-4 ring-background shadow-glow" />
                <div className="font-mono text-sm text-primary mb-2">{m.year}</div>
                <p className="font-display text-xl lg:text-2xl tracking-tight max-w-2xl">{m.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}
