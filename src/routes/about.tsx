import { createFileRoute } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";
import { Target, Heart } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — NFCTEC" },
      {
        name: "description",
        content:
          "Founded in 2010, NFCTEC delivers full-stack NFC and Smart Card solutions to 500+ projects in 60+ countries.",
      },
      { property: "og:title", content: "About NFCTEC" },
      { property: "og:description", content: "15 years at the edge of NFC." },
    ],
  }),
  component: About,
});

const team = [
  {
    role: "about.team1.role",
    exp: "about.team1.exp",
    bio: "about.team1.bio",
    accent: "from-primary to-accent",
  },
  {
    role: "about.team2.role",
    exp: "about.team2.exp",
    bio: "about.team2.bio",
    accent: "from-accent to-primary",
  },
  {
    role: "about.team3.role",
    exp: "about.team3.exp",
    bio: "about.team3.bio",
    accent: "from-primary to-accent",
  },
  {
    role: "about.team4.role",
    exp: "about.team4.exp",
    bio: "about.team4.bio",
    accent: "from-accent to-primary",
  },
];

const stats = [
  "about.stats.founded",
  "about.stats.projects",
  "about.stats.countries",
  "about.stats.team",
];

function About() {
  const { tr } = useI18n();

  return (
    <>
      {/* Hero */}
      <section className="relative pt-24 lg:pt-32 pb-20">
        <div className="absolute inset-0 bg-hero-glow pointer-events-none" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
          <div className="text-xs font-mono uppercase tracking-[0.2em] text-primary mb-6">
            {tr("about.eyebrow")}
          </div>
          <h1 className="font-display text-5xl lg:text-7xl tracking-tight whitespace-pre-line text-balance max-w-4xl">
            {tr("about.title")}
          </h1>
          <p className="mt-10 text-lg text-muted-foreground leading-relaxed max-w-3xl">
            {tr("about.intro")}
          </p>
        </div>
      </section>

      {/* Mission + Values */}
      <section className="py-20 bg-surface/40 border-y border-border">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 grid md:grid-cols-2 gap-5">
          {[
            { icon: Target, t: tr("about.mission.t"), d: tr("about.mission.d") },
            { icon: Heart, t: tr("about.values.t"), d: tr("about.values.d") },
          ].map((b) => {
            const Icon = b.icon;
            return (
              <div
                key={b.t}
                className="card-glow rounded-3xl bg-card-gradient border border-border p-10 lg:p-12"
              >
                <Icon size={22} className="text-primary mb-6" />
                <h3 className="font-display text-2xl mb-3">{b.t}</h3>
                <p className="text-muted-foreground leading-relaxed">{b.d}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Founding Team */}
      <section className="py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="max-w-3xl mb-14">
            <div className="text-xs font-mono uppercase tracking-[0.2em] text-primary mb-5">
              {tr("about.team.eyebrow")}
            </div>
            <h2 className="font-display text-4xl lg:text-5xl tracking-tight whitespace-pre-line text-balance">
              {tr("about.team.title")}
            </h2>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              {tr("about.team.sub")}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {team.map((m) => (
              <article
                key={m.name}
                className="card-glow group rounded-3xl bg-card-gradient border border-border p-8 lg:p-10 transition-colors hover:border-primary/40"
              >
                <div className="flex items-start gap-5">
                  <div
                    className={`flex-shrink-0 w-16 h-16 lg:w-20 lg:h-20 rounded-2xl bg-gradient-to-br ${m.accent} flex items-center justify-center font-display text-xl lg:text-2xl text-primary-foreground shadow-glow`}
                  >
                    {m.initials}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="font-display text-xl lg:text-2xl tracking-tight">
                      {m.name}
                    </div>
                    <div className="text-sm text-primary mt-1">{tr(m.role)}</div>
                    <div className="font-mono text-xs text-muted-foreground mt-1.5">
                      {tr(m.exp)}
                    </div>
                  </div>
                </div>
                <p className="mt-6 text-muted-foreground leading-relaxed">
                  {tr(m.bio)}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Stats strip */}
      <section className="py-16 border-t border-border bg-surface/40">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <dl className="grid grid-cols-2 lg:grid-cols-4 gap-y-8 gap-x-6">
            {stats.map((key, i) => (
              <div
                key={key}
                className={
                  i === 0
                    ? "lg:border-r lg:border-border lg:pr-6"
                    : i === stats.length - 1
                      ? ""
                      : "lg:border-r lg:border-border lg:pr-6"
                }
              >
                <dd className="font-display text-xl lg:text-2xl tracking-tight text-foreground">
                  {tr(key)}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </>
  );
}
