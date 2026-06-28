import type { Locale } from "./locale";

export type CmsPost = {
  id: string;
  locale: Locale;
  slug: string;
  title: string;
  excerpt: string;
  body: { heading?: string; text: string }[];
  category: string;
  readMinutes: number;
  publishedAt: string | null;
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
  }[];
};

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

function normalizePost(row: Omit<CmsPost, "body"> & { body: unknown }): CmsPost {
  const body = Array.isArray(row.body)
    ? (row.body as CmsPost["body"])
    : [];
  return { ...row, body };
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
  };
}
