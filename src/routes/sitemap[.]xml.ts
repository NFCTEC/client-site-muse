import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { fetchSitemapUrls } from "@/lib/cms";
import { SITE_URL } from "@/lib/seo";

const STATIC_URLS = ["en", "zh"].flatMap((locale) => [
  { loc: `${SITE_URL}/${locale}/tools/ntag424-tool`, lastmod: "2026-09-20" },
  { loc: `${SITE_URL}/${locale}/tools/javacard-tool`, lastmod: "2026-09-20" },
  { loc: `${SITE_URL}/${locale}/products/ntag213-215-216`, lastmod: "2026-09-29" },
  { loc: `${SITE_URL}/${locale}/products/ntag424-dna`, lastmod: "2026-09-29" },
  { loc: `${SITE_URL}/${locale}/products/mifare-ultralight`, lastmod: "2026-09-29" },
  { loc: `${SITE_URL}/${locale}/products/mifare-desfire-ev3`, lastmod: "2026-09-29" },
  { loc: `${SITE_URL}/${locale}/products/nfc-labels-and-cards`, lastmod: "2026-09-29" },
  { loc: `${SITE_URL}/${locale}/products/j3r452-javacard`, lastmod: "2026-09-29" },
  { loc: `${SITE_URL}/${locale}/products/j3r180-javacard`, lastmod: "2026-09-29" },
  { loc: `${SITE_URL}/${locale}/products/j2a040-javacard`, lastmod: "2026-09-29" },
]);

function xhtmlAlternates(loc: string) {
  const match = loc.match(`^${SITE_URL.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}/(en|zh)(/.*)?$`);
  if (!match) return [];
  const path = match[2] ?? "";
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
        const merged = new Map<string, { loc: string; lastmod?: string }>();
        for (const entry of [...(await fetchSitemapUrls()), ...STATIC_URLS]) {
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
