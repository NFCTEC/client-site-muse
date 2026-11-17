import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { fetchSitemapUrls } from "@/lib/cms";
import { posts as localBlogPosts } from "@/lib/blog-posts";
import { CATALOG_PRODUCT_SLUGS } from "@/lib/products-catalog";
import { SITE_URL, isNoIndexPath } from "@/lib/seo";
import { platformSitemapEntries } from "@/lib/platform-site";

const SOLUTION_SLUGS = [
  "banking",
  "transit",
  "gov",
  "access",
  "health",
  "iot",
  "brand",
  "retail",
  "auto",
  "wallet",
  "security",
  "edu",
] as const;

const TOOL_SLUGS = ["ntag424-tool", "javacard-tool"] as const;

/** Thin / redirected posts must never appear in the sitemap. */
const EXCLUDED_BLOG_SLUGS = new Set([
  "sun-dynamic-url-anti-counterfeit",
  "ntag424-dna-sun-url-authentication-example",
]);

const CORE_PATHS = [
  "",
  "/products",
  "/solutions",
  "/platform",
  "/downloads",
  "/blog",
  "/about",
  "/inquiry",
] as const;

function buildStaticUrls() {
  const locales = ["en", "zh"] as const;
  const urls: { loc: string; lastmod?: string }[] = [];

  for (const locale of locales) {
    for (const path of CORE_PATHS) {
      urls.push({ loc: `${SITE_URL}/${locale}${path}`, lastmod: "2026-10-21" });
    }
    for (const slug of CATALOG_PRODUCT_SLUGS) {
      urls.push({
        loc: `${SITE_URL}/${locale}/products/${slug}`,
        lastmod: slug === "ntag424-dna" ? "2026-10-21" : "2026-10-13",
      });
    }
    for (const slug of SOLUTION_SLUGS) {
      urls.push({ loc: `${SITE_URL}/${locale}/solutions/${slug}`, lastmod: "2026-10-13" });
    }
    for (const slug of TOOL_SLUGS) {
      urls.push({ loc: `${SITE_URL}/${locale}/tools/${slug}`, lastmod: "2026-09-20" });
    }
    for (const post of localBlogPosts) {
      if (EXCLUDED_BLOG_SLUGS.has(post.slug)) continue;
      // Only list zh blog URLs when a real Chinese body exists.
      if (locale === "zh" && !post.zh) continue;
      urls.push({
        loc: `${SITE_URL}/${locale}/blog/${post.slug}`,
        lastmod: post.date,
      });
    }
  }

  return [...urls, ...platformSitemapEntries()];
}

const STATIC_URLS = buildStaticUrls();

function shouldOmitFromSitemap(pathname: string) {
  if (isNoIndexPath(pathname)) return true;
  for (const slug of EXCLUDED_BLOG_SLUGS) {
    if (pathname.endsWith(`/blog/${slug}`)) return true;
  }
  return false;
}

function xhtmlAlternates(loc: string) {
  const match = loc.match(`^${SITE_URL.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}/(en|zh)(/.*)?$`);
  if (!match) return [];
  const path = match[2] ?? "";
  // Blog posts without zh copy: do not claim a zh alternate.
  if (path.startsWith("/blog/")) {
    const slug = path.slice("/blog/".length);
    const post = localBlogPosts.find((p) => p.slug === slug);
    if (post && !post.zh) {
      return [`    <xhtml:link rel="alternate" hreflang="en" href="${SITE_URL}/en${path}" />`];
    }
  }
  const en = `${SITE_URL}/en${path}`;
  const zh = `${SITE_URL}/zh${path}`;
  return [
    `    <xhtml:link rel="alternate" hreflang="en" href="${en}" />`,
    `    <xhtml:link rel="alternate" hreflang="zh" href="${zh}" />`,
    `    <xhtml:link rel="alternate" hreflang="x-default" href="${en}" />`,
  ];
}

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const cmsUrls = await Promise.race([
          fetchSitemapUrls(),
          new Promise<{ loc: string; lastmod?: string }[]>((resolve) => setTimeout(() => resolve([]), 2500)),
        ]).catch(() => [] as { loc: string; lastmod?: string }[]);
        const merged = new Map<string, { loc: string; lastmod?: string }>();
        // Local static URLs win over CMS so core pages never disappear on CMS timeout.
        for (const entry of [...cmsUrls, ...STATIC_URLS]) {
          try {
            if (shouldOmitFromSitemap(new URL(entry.loc).pathname)) continue;
          } catch {
            continue;
          }
          const prev = merged.get(entry.loc);
          if (!prev || (entry.lastmod && (!prev.lastmod || entry.lastmod > prev.lastmod))) {
            merged.set(entry.loc, entry);
          }
        }

        const urls = [...merged.values()].map((e) =>
          [
            `  <url>`,
            `    <loc>${e.loc}</loc>`,
            e.lastmod ? `    <lastmod>${e.lastmod.slice(0, 10)}</lastmod>` : null,
            ...xhtmlAlternates(e.loc),
            `  </url>`,
          ]
            .filter(Boolean)
            .join("\n"),
        );

        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">`,
          ...urls,
          `</urlset>`,
        ].join("\n");

        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
