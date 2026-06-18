import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Calendar, Clock } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { posts, postsBySlug } from "@/lib/blog-posts";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = postsBySlug.get(params.slug);
    if (!post) throw notFound();
    return { post };
  },
  head: ({ loaderData, params }) => {
    const post = loaderData?.post;
    const url = `https://www.nfctec.com/blog/${params.slug}`;
    const title = post ? `${post.title} — NFCTEC Blog` : "Article — NFCTEC";
    const desc = post?.excerpt ?? "NFC engineering article by NFCTEC.";
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: post?.title ?? title },
        { property: "og:description", content: desc },
        { property: "og:url", content: url },
        { property: "og:type", content: "article" },
        ...(post ? [
          { property: "article:published_time", content: post.date },
          { property: "article:section", content: post.cat },
        ] : []),
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: post ? [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: post.title,
            description: post.excerpt,
            datePublished: post.date,
            dateModified: post.date,
            articleSection: post.cat,
            author: { "@type": "Organization", name: "NFCTEC" },
            publisher: {
              "@type": "Organization",
              name: "NFCTEC",
              logo: { "@type": "ImageObject", url: "https://www.nfctec.com/og-default.jpg" },
            },
            mainEntityOfPage: { "@type": "WebPage", "@id": url },
            image: "https://www.nfctec.com/og-default.jpg",
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://www.nfctec.com/" },
              { "@type": "ListItem", position: 2, name: "Blog", item: "https://www.nfctec.com/blog" },
              { "@type": "ListItem", position: 3, name: post.title, item: url },
            ],
          }),
        },
      ] : [],
    };
  },
  notFoundComponent: () => (
    <div className="mx-auto max-w-3xl px-6 py-32 text-center">
      <h1 className="font-display text-4xl mb-4">Article not found</h1>
      <Link to="/blog" className="text-primary hover:underline">← Back to blog</Link>
    </div>
  ),
  component: PostPage,
});

function PostPage() {
  const { post } = Route.useLoaderData();
  const { tr } = useI18n();

  const related = posts.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <>
      <article className="pt-24 lg:pt-32 pb-16">
        <div className="mx-auto max-w-3xl px-6">
          <Link
            to="/blog"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-muted-foreground hover:text-primary mb-8"
          >
            <ArrowLeft size={14} /> {tr("blog.back") ?? "All articles"}
          </Link>

          <div className="flex items-center gap-3 mb-5">
            <span className="rounded-full bg-primary/10 border border-primary/30 px-2.5 py-1 text-[10px] font-mono text-primary">
              {post.cat}
            </span>
            <span className="inline-flex items-center gap-1 text-[11px] font-mono text-muted-foreground">
              <Calendar size={12} /> {post.date}
            </span>
            <span className="inline-flex items-center gap-1 text-[11px] font-mono text-muted-foreground">
              <Clock size={12} /> {post.readMinutes} min read
            </span>
          </div>

          <h1 className="font-display text-4xl lg:text-5xl tracking-tight text-balance mb-6">
            {post.title}
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed mb-12">{post.excerpt}</p>

          <div className="prose prose-invert max-w-none space-y-6">
            {post.body.map((b: { heading?: string; text: string }, i: number) => (
              <div key={i}>
                {b.heading && (
                  <h2 className="font-display text-2xl font-semibold mt-10 mb-3">{b.heading}</h2>
                )}
                <p className="text-base leading-relaxed text-foreground/90">{b.text}</p>
              </div>
            ))}
          </div>
        </div>
      </article>

      {related.length > 0 && (
        <section className="border-t border-border py-16">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <h2 className="font-display text-2xl mb-8">More from the blog</h2>
            <div className="grid md:grid-cols-3 gap-5">
              {related.map((p) => (
                <Link
                  key={p.slug}
                  to="/blog/$slug"
                  params={{ slug: p.slug }}
                  className="card-glow rounded-2xl border border-border bg-card-gradient p-6 flex flex-col group"
                >
                  <span className="self-start rounded-full bg-primary/10 border border-primary/30 px-2.5 py-1 text-[10px] font-mono text-primary mb-4">
                    {p.cat}
                  </span>
                  <h3 className="font-display text-base font-semibold mb-2 leading-snug group-hover:text-primary transition-colors">
                    {p.title}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3 flex-1">{p.excerpt}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-xs font-mono text-primary">
                    Read <ArrowRight size={12} />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
