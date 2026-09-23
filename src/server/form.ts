import { redirect } from "next/navigation";
import { Prisma } from "@prisma/client";
import { isSafeSlug, slugify, str } from "@/lib/utils";

export function enumValue<T extends string>(value: string, allowed: readonly T[], fallback: T): T {
  return (allowed as readonly string[]).includes(value) ? (value as T) : fallback;
}

export function readLocales(
  formData: FormData,
  options: { text?: string[]; lines?: string[]; specs?: boolean; nameKey?: string },
) {
  const blocks: {
    locale: "en" | "zh";
    name: string;
    slug: string;
    text: Record<string, string>;
    lines: Record<string, string[]>;
    specs: { label: string; value: string }[];
  }[] = [];
  for (const locale of ["en", "zh"] as const) {
    const nameKey = options.nameKey || "name";
    const name = str(formData, `${locale}_${nameKey}`);
    if (!name) {
      if (locale === "en") return { error: "请填写英文名称" };
      continue;
    }
    const slug = slugify(str(formData, `${locale}_slug`) || name);
    if (!isSafeSlug(slug)) return { error: "链接标识只能使用小写英文和连字符" };
    const text: Record<string, string> = {};
    for (const field of options.text || []) text[field] = str(formData, `${locale}_${field}`);
    const lineMap: Record<string, string[]> = {};
    for (const field of options.lines || []) {
      lineMap[field] = str(formData, `${locale}_${field}`)
        .split(/\r?\n/)
        .map((line) => line.trim())
        .filter(Boolean);
    }
    const specs = options.specs
      ? str(formData, `${locale}_specifications`)
          .split(/\r?\n/)
          .map((line) => line.trim())
          .filter(Boolean)
          .map((line) => {
            const index = line.indexOf(":");
            if (index === -1) return { label: line, value: "" };
            return { label: line.slice(0, index).trim(), value: line.slice(index + 1).trim() };
          })
      : [];
    blocks.push({ locale, name, slug, text, lines: lineMap, specs });
  }
  return { blocks };
}

export function isUnique(error: unknown) {
  return error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002";
}

export function bounce(path: string, error: string): never {
  redirect(`${path}?error=${encodeURIComponent(error)}`);
}
