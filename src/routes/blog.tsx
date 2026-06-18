import { createFileRoute, Link } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";
import { ArrowRight } from "lucide-react";
import { posts } from "@/lib/blog-posts";

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
            <Link
              key={p.slug}
              to="/blog/$slug"
              params={{ slug: p.slug }}
              className="card-glow rounded-2xl border border-border bg-card-gradient p-7 flex flex-col group"
            >
              <div className="flex items-center gap-3 mb-5">
                <span className="rounded-full bg-primary/10 border border-primary/30 px-2.5 py-1 text-[10px] font-mono text-primary">
                  {p.cat}
                </span>
                <span className="text-[11px] font-mono text-muted-foreground">{p.date}</span>
              </div>
              <h3 className="font-display text-lg font-semibold mb-3 leading-snug group-hover:text-primary transition-colors">
                {p.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed flex-1">{p.excerpt}</p>
              <span className="mt-6 inline-flex items-center gap-1 text-xs font-mono text-primary group-hover:gap-2 transition-all">
                {tr("blog.read")} <ArrowRight size={12} />
              </span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
