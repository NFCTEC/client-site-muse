import type { Locale } from "./locale";
import { mergeDisplayConfig, type SiteDisplayConfig } from "./display-config";

export type CmsPost = {
  id: string;
  locale: Locale;
  slug: string;
  title: string;
  excerpt: string;
  body: string | { heading?: string; text: string }[];
  category: string;
  readMinutes: number;
  viewCount: number;
  publishedAt: string | null;
  seoTitle: string | null;
  seoDescription: string | null;
  ogImage: string | null;
};

export type CmsProduct = {
  id: string;
  locale: Locale;
  slug: string;
  name: string;
  description: string;
  tagline: string | null;
  intro: string | null;
  category: "software" | "hardware";
  icon: string;
  heroImage: string | null;
  images: { src: string; label: string }[];
  features: { title: string; description: string; icon: string }[];
  specs: { key: string; value: string }[];
  useCases: string[];
  highlights: string[];
  body: string;
  hasDetailPage: boolean;
  ctaUrl: string | null;
  ctaLabel: string | null;
  secondaryCtaUrl: string | null;
  secondaryCtaLabel: string | null;
  sortOrder: number;
  seoTitle: string | null;
  seoDescription: string | null;
  ogImage: string | null;
};

export type CmsSolution = {
  id: string;
  locale: Locale;
  slug: string;
  name: string;
  tagline: string;
  intro: string;
  icon: string;
  heroImage: string | null;
  capabilities: { title: string; description: string }[];
  deliverables: string[];
  protocols: string[];
  certifications: string[];
  workflow: { title: string; description: string }[];
  resources: { title: string; kind: string }[];
  sortOrder: number;
  seoTitle: string | null;
  seoDescription: string | null;
  ogImage: string | null;
};

export type CmsDownloadGroup = {
  id: string;
  locale: Locale;
  name: string;
  sortOrder: number;
  items: {
    id: string;
    name: string;
    version: string | null;
    fileUrl: string | null;
    fileSize: string | null;
    sortOrder: number;
    downloadCount: number;
  }[];
};

export function getDownloadTrackUrl(itemId: string, locale: Locale): string {
  const base = getCmsApiBase();
  return `${base}/public/downloads/items/${encodeURIComponent(itemId)}/file?locale=${locale}`;
}

export function formatDownloadCount(count: number, locale: Locale): string {
  const n = count >= 1000 ? `${(count / 1000).toFixed(1).replace(/\.0$/, "")}k` : String(count);
  if (locale === "zh") return `${n} 次下载`;
  return count === 1 ? `${n} download` : `${n} downloads`;
}

export function getCmsApiBase(): string {
  if (typeof process !== "undefined" && process.env.CMS_API_URL) {
    return process.env.CMS_API_URL.replace(/\/$/, "");
  }
  if (import.meta.env.VITE_CMS_API_URL) {
    return String(import.meta.env.VITE_CMS_API_URL).replace(/\/$/, "");
  }
  return "http://localhost:3000/api";
}

async function cmsFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const base = getCmsApiBase();
  const res = await fetch(`${base}${path}`, {
    ...init,
    headers: {
      Accept: "application/json",
      ...(init?.headers ?? {}),
    },
  });
  if (!res.ok) {
    throw new Error(`CMS ${path} failed: ${res.status}`);
  }
  return res.json() as Promise<T>;
}

export async function fetchDisplayConfig(locale: Locale): Promise<SiteDisplayConfig> {
  const raw = await cmsFetch<unknown>(`/public/display-config?locale=${locale}`);
  return mergeDisplayConfig(raw);
}

export async function fetchProducts(locale: Locale, category?: "software" | "hardware"): Promise<CmsProduct[]> {
  const qs = category ? `&category=${category}` : "";
  const rows = await cmsFetch<Array<Omit<CmsProduct, "images" | "features" | "specs" | "useCases" | "highlights"> & {
    images: unknown;
    features: unknown;
    specs: unknown;
    useCases: unknown;
    highlights: unknown;
  }>>(`/public/products?locale=${locale}${qs}`);
  return rows.map(normalizeProduct);
}

export async function fetchProduct(locale: Locale, slug: string): Promise<CmsProduct | null> {
  try {
    const row = await cmsFetch<Parameters<typeof normalizeProduct>[0]>(
      `/public/products/${encodeURIComponent(slug)}?locale=${locale}`,
    );
    return normalizeProduct(row);
  } catch {
    return null;
  }
}

export async function fetchPosts(locale: Locale): Promise<CmsPost[]> {
  const rows = await cmsFetch<Array<Omit<CmsPost, "body"> & { body: unknown; category: string }>>(
    `/public/posts?locale=${locale}`,
  );
  return rows.map(normalizePost);
}

export async function fetchPost(locale: Locale, slug: string): Promise<CmsPost | null> {
  try {
    const row = await cmsFetch<Omit<CmsPost, "body"> & { body: unknown }>(
      `/public/posts/${slug}?locale=${locale}`,
    );
    return normalizePost(row);
  } catch {
    return null;
  }
}

const VIEWER_ID_KEY = "nfctec_viewer_id";

export function getViewerId(): string {
  if (typeof window === "undefined") return "";
  let id = localStorage.getItem(VIEWER_ID_KEY);
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem(VIEWER_ID_KEY, id);
  }
  return id;
}

export async function recordPostView(
  locale: Locale,
  slug: string,
): Promise<{ viewCount: number; recorded: boolean }> {
  const base = getCmsApiBase();
  const res = await fetch(
    `${base}/public/posts/${encodeURIComponent(slug)}/view?locale=${locale}`,
    {
      method: "POST",
      headers: { Accept: "application/json", "Content-Type": "application/json" },
      body: JSON.stringify({ viewerId: getViewerId() }),
    },
  );
  if (!res.ok) {
    throw new Error(`CMS view ${slug} failed: ${res.status}`);
  }
  return res.json() as Promise<{ viewCount: number; recorded: boolean }>;
}

export function formatViewCount(count: number, locale: Locale): string {
  const n = count >= 1000 ? `${(count / 1000).toFixed(1).replace(/\.0$/, "")}k` : String(count);
  if (locale === "zh") return `${n} 次阅读`;
  return count === 1 ? `${n} view` : `${n} views`;
}

export async function fetchSolutions(locale: Locale): Promise<CmsSolution[]> {
  const rows = await cmsFetch<Array<Omit<CmsSolution, "capabilities" | "deliverables" | "workflow" | "resources"> & {
    capabilities: unknown;
    deliverables: unknown;
    workflow: unknown;
    resources: unknown;
  }>>(`/public/solutions?locale=${locale}`);
  return rows.map(normalizeSolution);
}

export async function fetchSolution(locale: Locale, slug: string): Promise<CmsSolution | null> {
  try {
    const row = await cmsFetch<Parameters<typeof normalizeSolution>[0]>(
      `/public/solutions/${slug}?locale=${locale}`,
    );
    return normalizeSolution(row);
  } catch {
    return null;
  }
}

export async function fetchDownloads(locale: Locale): Promise<CmsDownloadGroup[]> {
  return cmsFetch<CmsDownloadGroup[]>(`/public/downloads?locale=${locale}`);
}

export async function submitInquiry(data: {
  name: string;
  company?: string;
  email: string;
  whatsapp?: string;
  country?: string;
  subject: string;
  message: string;
}) {
  return cmsFetch<{ id: string }>("/public/inquiries", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
}

export async function fetchSitemapUrls(): Promise<{ loc: string; lastmod?: string }[]> {
  const data = await cmsFetch<{ urls: { loc: string; lastmod?: string }[] }>("/public/sitemap");
  return data.urls;
}

function normalizeProduct(row: {
  id: string;
  locale: Locale;
  slug: string;
  name: string;
  description: string;
  tagline: string | null;
  intro: string | null;
  category: "software" | "hardware";
  icon: string;
  heroImage: string | null;
  images: unknown;
  features: unknown;
  specs: unknown;
  useCases: unknown;
  highlights: unknown;
  body: string;
  hasDetailPage: boolean;
  ctaUrl: string | null;
  ctaLabel: string | null;
  secondaryCtaUrl: string | null;
  secondaryCtaLabel: string | null;
  sortOrder: number;
  seoTitle: string | null;
  seoDescription: string | null;
  ogImage: string | null;
}): CmsProduct {
  return {
    ...row,
    images: normalizeProductImages(row.images),
    features: normalizeProductFeatures(row.features),
    specs: normalizeProductSpecs(row.specs),
    useCases: normalizeStrings(row.useCases),
    highlights: normalizeStrings(row.highlights),
    body: row.body ?? "",
  };
}

function normalizeProductImages(v: unknown): CmsProduct["images"] {
  if (!Array.isArray(v)) return [];
  return v.map((item) => {
    if (item && typeof item === "object") {
      const o = item as Record<string, unknown>;
      return { src: String(o.src ?? ""), label: String(o.label ?? "") };
    }
    return { src: "", label: "" };
  });
}

function normalizeProductFeatures(v: unknown): CmsProduct["features"] {
  if (!Array.isArray(v)) return [];
  return v.map((item) => {
    if (item && typeof item === "object") {
      const o = item as Record<string, unknown>;
      return {
        title: String(o.title ?? ""),
        description: String(o.description ?? ""),
        icon: String(o.icon ?? "Zap"),
      };
    }
    return { title: "", description: "", icon: "Zap" };
  });
}

function normalizeProductSpecs(v: unknown): CmsProduct["specs"] {
  if (!Array.isArray(v)) return [];
  return v.map((item) => {
    if (item && typeof item === "object") {
      const o = item as Record<string, unknown>;
      return { key: String(o.key ?? ""), value: String(o.value ?? "") };
    }
    return { key: "", value: "" };
  });
}

function normalizePost(row: Omit<CmsPost, "body"> & { body: unknown }): CmsPost {
  let body: CmsPost["body"];
  if (typeof row.body === "string") {
    body = row.body;
  } else if (Array.isArray(row.body)) {
    body = row.body as { heading?: string; text: string }[];
  } else {
    body = "";
  }
  return { ...row, viewCount: row.viewCount ?? 0, body };
}

function normalizeSolution(row: {
  id: string;
  locale: Locale;
  slug: string;
  name: string;
  tagline: string;
  intro: string;
  icon: string;
  heroImage: string | null;
  capabilities: unknown;
  deliverables: unknown;
  protocols: unknown;
  certifications: unknown;
  workflow: unknown;
  resources: unknown;
  sortOrder: number;
  seoTitle: string | null;
  seoDescription: string | null;
  ogImage: string | null;
}): CmsSolution {
  return {
    ...row,
    capabilities: normalizeCaps(row.capabilities),
    deliverables: normalizeStrings(row.deliverables),
    protocols: normalizeStrings(row.protocols),
    certifications: normalizeStrings(row.certifications),
    workflow: normalizeSteps(row.workflow),
    resources: normalizeResources(row.resources),
  };
}

function normalizeCaps(v: unknown): CmsSolution["capabilities"] {
  if (!Array.isArray(v)) return [];
  return v.map((item) => {
    if (item && typeof item === "object") {
      const o = item as Record<string, unknown>;
      if (o.t && typeof o.t === "object") {
        const t = o.t as { en?: string; zh?: string };
        const d = o.d as { en?: string; zh?: string } | undefined;
        return { title: t.en ?? t.zh ?? "", description: d?.en ?? d?.zh ?? "" };
      }
      return {
        title: String(o.title ?? o.t ?? ""),
        description: String(o.description ?? o.d ?? ""),
      };
    }
    return { title: "", description: "" };
  });
}

function normalizeSteps(v: unknown): CmsSolution["workflow"] {
  if (!Array.isArray(v)) return [];
  return v.map((item) => {
    if (item && typeof item === "object") {
      const o = item as Record<string, unknown>;
      if (o.t && typeof o.t === "object") {
        const t = o.t as { en?: string; zh?: string };
        const d = o.d as { en?: string; zh?: string } | undefined;
        return { title: t.en ?? t.zh ?? "", description: d?.en ?? d?.zh ?? "" };
      }
      return { title: String(o.title ?? ""), description: String(o.description ?? "") };
    }
    return { title: "", description: "" };
  });
}

function normalizeResources(v: unknown): CmsSolution["resources"] {
  if (!Array.isArray(v)) return [];
  return v.map((item) => {
    if (item && typeof item === "object") {
      const o = item as Record<string, unknown>;
      if (o.t && typeof o.t === "object") {
        const t = o.t as { en?: string; zh?: string };
        const kind = o.kind as { en?: string; zh?: string } | undefined;
        return { title: t.en ?? t.zh ?? "", kind: kind?.en ?? kind?.zh ?? "" };
      }
      return { title: String(o.title ?? ""), kind: String(o.kind ?? "") };
    }
    return { title: "", kind: "" };
  });
}

function normalizeStrings(v: unknown): string[] {
  if (!Array.isArray(v)) return [];
  return v.map((item) => {
    if (typeof item === "string") return item;
    if (item && typeof item === "object") {
      const o = item as { en?: string; zh?: string };
      return o.en ?? o.zh ?? "";
    }
    return String(item);
  });
}

// Map API post to legacy BlogPost shape used in components
export function toBlogPost(p: CmsPost) {
  return {
    slug: p.slug,
    cat: p.category,
    date: p.publishedAt?.slice(0, 10) ?? "",
    title: p.title,
    excerpt: p.excerpt,
    body: p.body,
    readMinutes: p.readMinutes,
    viewCount: p.viewCount,
  };
}
