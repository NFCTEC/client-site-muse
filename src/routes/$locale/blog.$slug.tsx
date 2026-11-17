import { createFileRoute, Link, notFound, redirect } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Calendar, Clock } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { fetchDisplayConfig, fetchPost, fetchPosts, getLocalPost, mergeLocalPosts, toBlogPost } from "@/lib/cms";
type BlogItem = ReturnType<typeof toBlogPost>;
import { filterByDisplayConfig, isModuleEnabled } from "@/lib/display-config";
import { absLocaleUrl, type Locale } from "@/lib/locale";
import { hreflangLinks, SITE_URL } from "@/lib/seo";
import { useLocale } from "@/hooks/useLocale";
import { PostBody } from "@/components/PostBody";
import { PostViewCounter } from "@/components/PostViewCounter";
import { BLOG_CANONICAL_REDIRECTS, postsBySlug, type BlogSection } from "@/lib/blog-posts";

function countWords(body: string | BlogSection[]) {
  if (typeof body === "string") {
    return body.replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length;
  }
  let n = 0;
  for (const section of body) {
    if (section.heading) n += section.heading.split(/\s+/).filter(Boolean).length;
    if (section.text) n += section.text.split(/\s+/).filter(Boolean).length;
    for (const p of section.paragraphs ?? []) n += p.split(/\s+/).filter(Boolean).length;
    for (const item of section.items ?? []) n += item.split(/\s+/).filter(Boolean).length;
  }
  return n;
}

function videoObject(body: string | BlogSection[], description: string, uploadDate: string) {
  if (!Array.isArray(body)) return undefined;
  const video = body.find((section) => section.video)?.video;
  if (!video || !/^[\w-]{11}$/.test(video.youtubeId)) return undefined;
  return {
    "@type": "VideoObject",
    name: video.title,
    description,
    thumbnailUrl: `https://i.ytimg.com/vi/${video.youtubeId}/hqdefault.jpg`,
    embedUrl: `https://www.youtube.com/embed/${video.youtubeId}`,
    contentUrl: video.url,
    uploadDate,
    publisher: { "@type": "Organization", name: "NFCTEC", url: "https://www.nfctec.com" },
  };
}

export const Route = createFileRoute("/$locale/blog/$slug")({
  loader: async ({ params }) => {
    const locale = params.locale as Locale;
    const redirected = BLOG_CANONICAL_REDIRECTS[params.slug];
    if (redirected) {
      throw redirect({
        to: "/$locale/blog/$slug",
        params: { locale, slug: redirected },
        statusCode: 301,
      });
    }
    const localDef = postsBySlug.get(params.slug);
    // English-only drafts must not create fake /zh URLs.
    if (locale === "zh" && localDef && !localDef.zh) {
      throw redirect({
        to: "/$locale/blog/$slug",
        params: { locale: "en", slug: params.slug },
        statusCode: 301,
      });
    }
    const config = await fetchDisplayConfig(locale);
    if (!isModuleEnabled(config, "blog")) throw notFound();
    const post = (await fetchPost(locale, params.slug)) ?? getLocalPost(locale, params.slug);
    if (!post) throw notFound();
    const all = await fetchPosts(locale);
    const visible = mergeLocalPosts(filterByDisplayConfig(all, config.modules.blog), locale);
    const local = getLocalPost(locale, params.slug);
    if (config.modules.blog.mode === "selected" && !visible.some((p) => p.slug === params.slug) && !local) {
      throw notFound();
    }
    const others = visible.filter((p) => p.slug !== params.slug);
    const sameCat = others.filter((p) => p.category === post.category);
    const rest = others.filter((p) => p.category !== post.category);
    return {
      post: toBlogPost(post),
      related: [...sameCat, ...rest].slice(0, 3).map(toBlogPost),
      hasZh: Boolean(localDef?.zh),
    };
  },
  head: ({ loaderData, params }) => {
    const post = loaderData?.post;
    const locale = params.locale as Locale;
    const url = absLocaleUrl(locale, `/blog/${params.slug}`);
    const title = post?.title ? `${post.title} — NFCTEC Blog` : "Article — NFCTEC";
    const desc = post?.excerpt ?? "NFC engineering article by NFCTEC.";
    const links = loaderData?.hasZh
      ? [{ rel: "canonical" as const, href: url }, ...hreflangLinks(`/blog/${params.slug}`)]
      : [
          { rel: "canonical" as const, href: url },
          { rel: "alternate" as const, hrefLang: "en", href: `${SITE_URL}/en/blog/${params.slug}` },
          { rel: "alternate" as const, hrefLang: "x-default", href: `${SITE_URL}/en/blog/${params.slug}` },
        ];
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
      links,
      scripts: post ? [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.title,
            description: post.excerpt,
            datePublished: post.date,
            dateModified: post.date,
            articleSection: post.cat,
            wordCount: countWords(post.body) || undefined,
            timeRequired: post.readMinutes ? `PT${post.readMinutes}M` : undefined,
            inLanguage: locale,
            author: { "@type": "Organization", name: "NFCTEC", url: "https://www.nfctec.com" },
            publisher: {
              "@type": "Organization",
              name: "NFCTEC",
              logo: { "@type": "ImageObject", url: "https://www.nfctec.com/og-default.jpg" },
            },
            mainEntityOfPage: { "@type": "WebPage", "@id": url },
            image: "https://www.nfctec.com/og-default.jpg",
            video: videoObject(post.body, post.excerpt, post.date),
          }),
        },
      ] : [],
    };
  },
  notFoundComponent: function BlogNotFound() {
    const locale = useLocale();
    return (
      <div className="mx-auto max-w-3xl px-6 py-32 text-center">
        <h1 className="font-display text-4xl mb-4">Article not found</h1>
        <Link to="/$locale/blog" params={{ locale }} className="text-primary hover:underline">← Back to blog</Link>
      </div>
    );
  },
  component: PostPage,
});

function PostPage() {
  const { post, related } = Route.useLoaderData();
  const { locale, slug } = Route.useParams();
  const { tr } = useI18n();

  return (
    <>
      <article className="pt-24 lg:pt-32 pb-16">
        <div className="mx-auto max-w-3xl px-6">
          <Link
            to="/$locale/blog"
            params={{ locale }}
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
            <PostViewCounter locale={locale as Locale} slug={slug} initialCount={post.viewCount} />
          </div>

          <h1 className="font-display text-4xl lg:text-5xl tracking-tight text-balance mb-6">
            {post.title}
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed mb-12">{post.excerpt}</p>

          <PostBody body={post.body} />

          {/* Cross-links: NTAG 424 posts push product + tool; others use generic CTAs */}
          <div className="mt-16 pt-8 border-t border-border grid sm:grid-cols-3 gap-3">
            {/ntag|sun|424/i.test(`${post.slug} ${post.title} ${post.cat}`) ? (
              <>
                <Link
                  to="/$locale/products/$slug"
                  params={{ locale, slug: "ntag424-dna" }}
                  className="card-glow group rounded-xl border border-border bg-card-gradient p-5"
                >
                  <div className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">
                    {locale === "zh" ? "产品" : "Product"}
                  </div>
                  <div className="mt-1 font-display text-sm font-semibold group-hover:text-primary transition-colors">
                    NTAG 424 DNA tags <ArrowRight size={12} className="inline" />
                  </div>
                </Link>
                <Link
                  to="/$locale/tools/$slug"
                  params={{ locale, slug: "ntag424-tool" }}
                  className="card-glow group rounded-xl border border-border bg-card-gradient p-5"
                >
                  <div className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">
                    {locale === "zh" ? "工具" : "Tool"}
                  </div>
                  <div className="mt-1 font-display text-sm font-semibold group-hover:text-primary transition-colors">
                    NTAG424 SUN tool <ArrowRight size={12} className="inline" />
                  </div>
                </Link>
                <Link
                  to="/$locale/inquiry"
                  params={{ locale }}
                  className="card-glow group rounded-xl border border-border bg-card-gradient p-5"
                >
                  <div className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">
                    {locale === "zh" ? "询价" : "Quote"}
                  </div>
                  <div className="mt-1 font-display text-sm font-semibold group-hover:text-primary transition-colors">
                    {locale === "zh" ? "工厂询价" : "Factory RFQ"} <ArrowRight size={12} className="inline" />
                  </div>
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/$locale/solutions"
                  params={{ locale }}
                  className="card-glow group rounded-xl border border-border bg-card-gradient p-5"
                >
                  <div className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">Solutions</div>
                  <div className="mt-1 font-display text-sm font-semibold group-hover:text-primary transition-colors">
                    Browse industry playbooks <ArrowRight size={12} className="inline" />
                  </div>
                </Link>
                <Link
                  to="/$locale/platform"
                  params={{ locale }}
                  className="card-glow group rounded-xl border border-border bg-card-gradient p-5"
                >
                  <div className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">Platform</div>
                  <div className="mt-1 font-display text-sm font-semibold group-hover:text-primary transition-colors">
                    Issue &amp; verify via API <ArrowRight size={12} className="inline" />
                  </div>
                </Link>
                <Link
                  to="/$locale/inquiry"
                  params={{ locale }}
                  className="card-glow group rounded-xl border border-border bg-card-gradient p-5"
                >
                  <div className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">Contact</div>
                  <div className="mt-1 font-display text-sm font-semibold group-hover:text-primary transition-colors">
                    Talk to an engineer <ArrowRight size={12} className="inline" />
                  </div>
                </Link>
              </>
            )}
          </div>
        </div>
      </article>

      {related.length > 0 && (
        <section className="border-t border-border py-16">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <h2 className="font-display text-2xl mb-8">More from the blog</h2>
            <div className="grid md:grid-cols-3 gap-5">
              {related.map((p: BlogItem) => (
                <Link
                  key={p.slug}
                  to="/$locale/blog/$slug"
                  params={{ locale, slug: p.slug }}
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
