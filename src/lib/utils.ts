import { createHash } from "crypto";
import { permanentRedirect } from "next/navigation";
import { prisma } from "./prisma";

export function siteUrl() {
  return (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/$/, "");
}

export function absoluteUrl(path: string) {
  return new URL(path, siteUrl()).toString();
}

export function str(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

export function lines(formData: FormData, key: string) {
  return str(formData, key)
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
}

export function csv(formData: FormData, key: string) {
  return str(formData, key)
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

export function specLines(formData: FormData, key: string) {
  return lines(formData, key).map((line) => {
    const index = line.indexOf(":");
    if (index === -1) return { label: line, value: "" };
    return { label: line.slice(0, index).trim(), value: line.slice(index + 1).trim() };
  });
}

export function checked(formData: FormData, key: string) {
  const value = formData.get(key);
  return value === "on" || value === "true" || value === "1";
}

export function idList(formData: FormData, key: string) {
  return formData.getAll(key).map(String).map((id) => id.trim()).filter(Boolean);
}

export function slugify(input: string) {
  return input
    .trim()
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function isSafeSlug(slug: string) {
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug);
}

export function isSafeInternalPath(path: string) {
  return path.startsWith("/") && !path.startsWith("//") && !path.includes("\\");
}

export function readingMinutes(text: string) {
  const cjk = (text.match(/[\u4e00-\u9fff]/g) || []).length;
  const words = text
    .replace(/[\u4e00-\u9fff]/g, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.round(words / 220 + cjk / 400));
}

export function formatBytes(size: number) {
  if (!size) return "0 B";
  if (size < 1024) return `${size} B`;
  if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;
  return `${(size / 1024 / 1024).toFixed(1)} MB`;
}

export function hashKey(value: string) {
  return createHash("sha256").update(value).digest("hex");
}

export function asStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.filter((item): item is string => typeof item === "string");
}

export function asSpecs(value: unknown): { label: string; value: string }[] {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => {
      if (!item || typeof item !== "object") return null;
      const record = item as { label?: unknown; value?: unknown };
      if (typeof record.label !== "string") return null;
      return { label: record.label, value: typeof record.value === "string" ? record.value : "" };
    })
    .filter((item): item is { label: string; value: string } => Boolean(item));
}

export function asGroups(value: unknown) {
  if (!value || typeof value !== "object") return [];
  const groups = (value as { groups?: unknown }).groups;
  if (!Array.isArray(groups)) return [];
  return groups
    .map((group) => {
      if (!group || typeof group !== "object") return null;
      const record = group as { title?: unknown; href?: unknown; items?: unknown };
      if (typeof record.title !== "string") return null;
      return {
        title: record.title,
        href: typeof record.href === "string" ? record.href : "",
        items: asStringArray(record.items),
      };
    })
    .filter((group): group is { title: string; href: string; items: string[] } => Boolean(group));
}

export function asItems(value: unknown) {
  if (!value || typeof value !== "object") return [];
  const items = (value as { items?: unknown }).items;
  if (!Array.isArray(items)) return [];
  return items
    .map((item) => {
      if (!item || typeof item !== "object") return null;
      const record = item as { title?: unknown; text?: unknown };
      if (typeof record.title !== "string") return null;
      return { title: record.title, text: typeof record.text === "string" ? record.text : "" };
    })
    .filter((item): item is { title: string; text: string } => Boolean(item));
}

export function asSteps(value: unknown) {
  if (!value || typeof value !== "object") return [];
  return asStringArray((value as { steps?: unknown }).steps);
}

export function asCategories(value: unknown) {
  if (!value || typeof value !== "object") return [];
  const categories = (value as { categories?: unknown }).categories;
  if (!Array.isArray(categories)) return [];
  return categories
    .map((item) => {
      if (!item || typeof item !== "object") return null;
      const record = item as { key?: unknown; title?: unknown; text?: unknown };
      if (typeof record.key !== "string" || typeof record.title !== "string") return null;
      return { key: record.key, title: record.title, text: typeof record.text === "string" ? record.text : "" };
    })
    .filter((item): item is { key: string; title: string; text: string } => Boolean(item));
}

export function contentText(value: unknown, key: string) {
  if (!value || typeof value !== "object") return "";
  const record = value as Record<string, unknown>;
  return typeof record[key] === "string" ? record[key] : "";
}

export async function maybeRedirect(pathname: string) {
  if (!pathname || pathname.startsWith("/admin") || pathname.startsWith("/api")) return;
  const rule = await prisma.redirect.findUnique({ where: { fromPath: pathname } });
  if (rule?.active && isSafeInternalPath(rule.toPath)) {
    permanentRedirect(rule.toPath);
  }
}

export function joinLines(value: unknown) {
  return asStringArray(value).join("\n");
}

export function joinSpecs(value: unknown) {
  return asSpecs(value)
    .map((item) => (item.value ? `${item.label}: ${item.value}` : item.label))
    .join("\n");
}
