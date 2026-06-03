import { createFileRoute } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";
import { Target, Heart } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "关于我们 — NFCTec" },
      { name: "description", content: "凌芯科技成立于 2014 年，专注 NFC/RFID 智能连接技术，年产能超 30 亿枚。" },
      { property: "og:title", content: "About — NFCTec" },
      { property: "og:description", content: "Founded in 2014. 12 years perfecting NFC/RFID." },
    ],
  }),
  component: About,
});

function About() {
  const { tr } = useI18n();

  const milestones = [
    { year: "2014", text: tr("about.m1") },
    { year: "2017", text: tr("about.m2") },
    { year: "2019", text: tr("about.m3") },
    { year: "2022", text: tr("about.m4") },
    { year: "2025", text: tr("about.m5") },
  ];

  return (
    <>
      <section className="pt-24 lg:pt-32 pb-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="text-xs font-mono text-primary uppercase tracking-widest mb-4">
            / {tr("about.eyebrow")}
          </div>
          <h1 className="font-display text-5xl lg:text-7xl tracking-tight whitespace-pre-line text-balance max-w-4xl">
            {tr("about.title")}
          </h1>
          <p className="mt-10 text-lg text-muted-foreground leading-relaxed max-w-3xl">
            {tr("about.intro")}
          </p>
        </div>
      </section>

      <section className="py-20 bg-surface border-y border-border">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 grid md:grid-cols-2 gap-6">
          {[
            { icon: Target, t: tr("about.mission.title"), d: tr("about.mission.desc") },
            { icon: Heart, t: tr("about.values.title"), d: tr("about.values.desc") },
          ].map((b) => {
            const Icon = b.icon;
            return (
              <div key={b.t} className="rounded-3xl bg-background border border-border p-10 lg:p-12">
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
          <div className="text-xs font-mono text-primary uppercase tracking-widest mb-3">
            / {tr("about.milestone.title")}
          </div>
          <h2 className="font-display text-4xl lg:text-5xl tracking-tight mb-14">
            {tr("about.milestone.title")}
          </h2>
          <ol className="relative border-l border-border ml-3">
            {milestones.map((m) => (
              <li key={m.year} className="pl-10 pb-12 last:pb-0 relative">
                <span className="absolute -left-[7px] top-1.5 w-3.5 h-3.5 rounded-full bg-foreground ring-4 ring-background" />
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
