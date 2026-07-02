import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";
import { fetchDisplayConfig, fetchPosts, toBlogPost } from "@/lib/cms";
type BlogItem = ReturnType<typeof toBlogPost>;
import { filterByDisplayConfig } from "@/lib/display-config";
import type { Locale } from "@/lib/locale";
import { absLocaleUrl } from "@/lib/locale";
import { hreflangLinks } from "@/lib/seo";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { PageSection } from "@/components/PageSection";
import { CtaBand } from "@/components/CtaBand";

export const Route = createFileRoute("/$locale/blog/")({
  loader: async ({ params }) => {
    const locale = params.locale as Locale;
    const config = await fetchDisplayConfig(locale);
    const moduleConfig = config.modules.blog;
    if (!moduleConfig.enabled) throw notFound();
    const posts = await fetchPosts(locale);
    return { posts: filterByDisplayConfig(posts, moduleConfig).map(toBlogPost) };
  },
  head: ({ params }) => ({
    meta: [
      { title: "Blog & Insights — NFCTEC" },
      { name: "description", content: "Engineering deep-dives, protocol explainers and customer case studies on NFC and Smart Cards." },
      { property: "og:title", content: "Blog & Insights — NFCTEC" },
      { property: "og:description", content: "NFC engineering deep-dives and case studies." },
      { property: "og:url", content: absLocaleUrl(params.locale as Locale, "/blog") },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: absLocaleUrl(params.locale as Locale, "/blog") }],
  }),
  component: BlogIndex,
});

function BlogIndex() {
  const { tr } = useI18n();
  const { posts } = Route.useLoaderData();
  const { locale } = Route.useParams();

  return (
    <>
      <PageHero eyebrow={tr("nav.blog")} title={tr("blog.title")} subtitle={tr("blog.sub")} />

      <PageSection spacing="main" className="!pt-0">
        {posts.length === 0 ? (
          <p className="text-muted-foreground">{tr("blog.sub")}</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {posts.map((p: BlogItem) => (
              <Link
                key={p.slug}
                to="/$locale/blog/$slug"
                params={{ locale, slug: p.slug }}
                className="card-glow card-equal rounded-2xl border border-border bg-card-gradient p-6 flex flex-col group"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="rounded-full bg-primary/10 border border-primary/20 px-2.5 py-1 text-[10px] text-primary">
                    {p.cat}
                  </span>
                  <span className="text-xs text-muted-foreground">{p.date}</span>
                </div>
                <h3 className="font-display text-lg font-semibold mb-3 leading-snug group-hover:text-primary transition-colors">
                  {p.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed flex-1">{p.excerpt}</p>
                <span className="mt-6 inline-flex items-center gap-1 text-sm text-primary group-hover:gap-2 transition-all">
                  {tr("blog.read")} <ArrowRight size={14} />
                </span>
              </Link>
            ))}
          </div>
        )}
      </PageSection>

      <CtaBand />
    </>
  );
}
