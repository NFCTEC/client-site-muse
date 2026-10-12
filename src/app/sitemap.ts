import type { MetadataRoute } from "next";
import { sitemapEntries } from "@/lib/content";
import { absoluteUrl } from "@/lib/utils";

export const dynamic = "force-dynamic";

function languagesFor(path: string) {
  const match = path.match(/^\/(en|zh)(\/.*)?$/);
  if (!match) return undefined;
  const rest = match[2] || "";
  return { en: absoluteUrl(`/en${rest}`), zh: absoluteUrl(`/zh${rest}`) };
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries = await sitemapEntries();
  return entries.map((entry) => ({
    url: absoluteUrl(entry.path),
    lastModified: entry.updatedAt || new Date(),
    changeFrequency: entry.path.includes("/blog/") ? "weekly" : "monthly",
    priority: entry.path === "/en" || entry.path === "/zh" ? 1 : entry.path.includes("/blog/") ? 0.8 : 0.6,
    alternates: { languages: languagesFor(entry.path) },
  }));
}
