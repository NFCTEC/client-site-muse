import { createFileRoute } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Blog & Insights — NFCTEC" },
      { name: "description", content: "Engineering deep-dives, protocol explainers and customer case studies on NFC and Smart Cards." },
      { property: "og:title", content: "Blog & Insights — NFCTEC" },
      { property: "og:description", content: "NFC engineering deep-dives and case studies." },
      { property: "og:url", content: "https://www.nfctec.com/blog" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "https://www.nfctec.com/blog" }],
  }),
  component: Blog,
});

const posts = [
  {
    cat: "EMV",
    date: "2026-05-12",
    title: "How EMV Contactless Selects an AID in 6 ms",
    excerpt: "A byte-level walk-through of PPSE, AID lists and kernel selection across Visa, Mastercard and UPI.",
  },
  {
    cat: "Security",
    date: "2026-04-28",
    title: "SUN Dynamic URL: Anti-Counterfeit Done Right",
    excerpt: "How NTAG 424 DNA's signed URL protocol stops cloning while staying cloud-friendly.",
  },
  {
    cat: "Case Study",
    date: "2026-04-10",
    title: "Rolling Out 2M Transit Cards in 90 Days",
    excerpt: "Inside a CALYPSO + DESFire migration for a tier-1 metro operator.",
  },
  {
    cat: "Hardware",
    date: "2026-03-22",
    title: "PN5180 vs PN532: Choosing the Right Frontend",
    excerpt: "RF performance, current draw, BOM cost and protocol coverage — head to head.",
  },
  {
    cat: "JavaCard",
    date: "2026-03-05",
    title: "Shipping Your First JavaCard 3.1 Applet",
    excerpt: "From keystore to GP-Pro install — a complete onboarding for new applet developers.",
  },
  {
    cat: "Mobile",
    date: "2026-02-18",
    title: "HCE on Android 15: What Changed",
    excerpt: "New TEE binding requirements, foreground service rules and tokenization tips.",
  },
];

function Blog() {
  const { tr } = useI18n();

  return (
    <>
      <section className="relative pt-24 lg:pt-32 pb-16">
        <div className="absolute inset-0 bg-hero-glow pointer-events-none" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
          <h1 className="font-display text-5xl lg:text-7xl tracking-tight max-w-4xl text-balance">
            {tr("blog.title")}
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl">{tr("blog.sub")}</p>
        </div>
      </section>

      <section className="pb-24 lg:pb-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {posts.map((p) => (
            <article
              key={p.title}
              className="card-glow rounded-2xl border border-border bg-card-gradient p-7 flex flex-col"
            >
              <div className="flex items-center gap-3 mb-5">
                <span className="rounded-full bg-primary/10 border border-primary/30 px-2.5 py-1 text-[10px] font-mono text-primary">
                  {p.cat}
                </span>
                <span className="text-[11px] font-mono text-muted-foreground">{p.date}</span>
              </div>
              <h3 className="font-display text-lg font-semibold mb-3 leading-snug">{p.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed flex-1">{p.excerpt}</p>
              <a
                href="#"
                className="mt-6 inline-flex items-center gap-1 text-xs font-mono text-primary hover:gap-2 transition-all"
              >
                {tr("blog.read")} <ArrowRight size={12} />
              </a>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
