import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { fetchSitemapUrls } from "@/lib/cms";
import { SITE_URL } from "@/lib/seo";

const STATIC_URLS = ["en", "zh"].flatMap((locale) => [
  { loc: `${SITE_URL}/${locale}/tools/ntag424-tool`, lastmod: "2026-09-20" },
  { loc: `${SITE_URL}/${locale}/tools/javacard-tool`, lastmod: "2026-09-20" },
]);

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const entries = [...(await fetchSitemapUrls()), ...STATIC_URLS];

        const urls = entries.map((e) =>
          [
            `  <url>`,
            `    <loc>${e.loc}</loc>`,
            e.lastmod ? `    <lastmod>${e.lastmod.slice(0, 10)}</lastmod>` : null,
            `  </url>`,
          ].filter(Boolean).join("\n"),
        );

        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          ...urls,
          `</urlset>`,
        ].join("\n");

        return new Response(xml, {
          headers: { "Content-Type": "application/xml", "Cache-Control": "public, max-age=3600" },
        });
      },
    },
  },
});
