import {
  ContentStatus,
  NavLocation,
  Prisma,
  ProductCategory,
  ToolKind,
} from "@prisma/client";
import type { Locale } from "@/i18n/config";
import { prisma } from "./prisma";
import { asSpecs, asStringArray } from "./utils";

export type Card = {
  href: string;
  title: string;
  description: string;
  meta?: string;
};

export type SeoFields = {
  seoTitle: string | null;
  seoDescription: string | null;
  canonicalUrl: string | null;
  ogImage: string | null;
  robots: string;
};

const published = { status: ContentStatus.PUBLISHED };

function pick<T extends { locale: string }>(rows: T[], locale: string, fallback = false) {
  return rows.find((row) => row.locale === locale) || (fallback ? rows.find((row) => row.locale === "en") : undefined);
}

function alternate(rows: { locale: string; slug: string }[], locale: string) {
  const other = locale === "en" ? "zh" : "en";
  return rows.find((row) => row.locale === other)?.slug ?? null;
}

function visible(status: ContentStatus, preview: boolean) {
  return preview || status === published.status;
}

export type NavNode = {
  id: string;
  href: string;
  label: string;
  external: boolean;
  emphasis: boolean;
  children: NavNode[];
};

export async function getNav(locale: Locale, location: NavLocation): Promise<NavNode[]> {
  const items = await prisma.navItem.findMany({
    where: { location, visible: true },
    include: { translations: true },
    orderBy: [{ sortOrder: "asc" }, { id: "asc" }],
  });
  const nodes = new Map<string, NavNode & { parentId: string | null }>();
  for (const item of items) {
    const label = pick(item.translations, locale, true)?.label || item.href;
    nodes.set(item.id, {
      id: item.id,
      href: item.href,
      label,
      external: item.external,
      emphasis: item.emphasis,
      children: [],
      parentId: item.parentId,
    });
  }
  const roots: NavNode[] = [];
  for (const node of nodes.values()) {
    const { parentId, ...rest } = node;
    if (parentId && nodes.has(parentId)) nodes.get(parentId)!.children.push(rest);
    else roots.push(rest);
  }
  return roots;
}

export async function getHome(locale: Locale) {
  const [sections, technologies, products, solutions, tools, articles] = await Promise.all([
    prisma.homepageSection.findMany({
      where: { enabled: true },
      include: { translations: true },
      orderBy: { sortOrder: "asc" },
    }),
    prisma.technology.findMany({
      where: { ...published, parentId: null },
      include: {
        translations: true,
        children: { where: published, include: { translations: true }, orderBy: { sortOrder: "asc" } },
      },
      orderBy: { sortOrder: "asc" },
    }),
    prisma.product.findMany({
      where: published,
      include: { translations: true },
      orderBy: [{ featured: "desc" }, { sortOrder: "asc" }],
    }),
    prisma.solution.findMany({
      where: published,
      include: { translations: true },
      orderBy: { sortOrder: "asc" },
    }),
    prisma.developerTool.findMany({
      where: { ...published, featured: true },
      include: { translations: true },
      orderBy: { sortOrder: "asc" },
      take: 4,
    }),
    prisma.article.findMany({
      where: published,
      include: { translations: true },
      orderBy: { publishDate: "desc" },
      take: 3,
    }),
  ]);

  return {
    sections: sections
      .map((section) => {
        const translation = pick(section.translations, locale, true);
        if (!translation) return null;
        return {
          key: section.key,
          title: translation.title,
          description: translation.description,
          content: translation.content,
        };
      })
      .filter((section): section is NonNullable<typeof section> => Boolean(section)),
    technologies: technologies
      .map((item) => {
        const translation = pick(item.translations, locale);
        if (!translation) return null;
        return {
          href: `/technology/${translation.slug}`,
          title: translation.name,
          description: translation.description,
          meta: item.category,
          protocols: item.protocols,
          chips: item.chips,
          children: item.children
            .map((child) => {
              const childText = pick(child.translations, locale);
              if (!childText) return null;
              return { href: `/technology/${translation.slug}/${childText.slug}`, title: childText.name };
            })
            .filter((child): child is NonNullable<typeof child> => child !== null),
        };
      })
      .filter((item): item is NonNullable<typeof item> => Boolean(item)),
    products: products
      .map((item) => productCard(item, locale))
      .filter((item): item is NonNullable<typeof item> => item !== null),
    solutions: solutions
      .map((item) => {
        const translation = pick(item.translations, locale);
        if (!translation) return null;
        return {
          href: `/solutions/${translation.slug}`,
          title: translation.name,
          description: translation.heroDescription,
          meta: item.category,
        } satisfies Card;
      })
      .filter((item): item is NonNullable<typeof item> => item !== null),
    tools: tools
      .map((item) => {
        const translation = pick(item.translations, locale);
        if (!translation) return null;
        const section = toolSection(item.kind);
        return {
          href: `/developer/${section}/${translation.slug}`,
          title: translation.name,
          description: translation.description,
          meta: item.kind,
        } satisfies Card;
      })
      .filter((item): item is NonNullable<typeof item> => item !== null),
    articles: articles
      .map((item) => articleCard(item, locale))
      .filter((item): item is NonNullable<typeof item> => item !== null),
  };
}

function productCard(
  item: {
    category: ProductCategory;
    featured: boolean;
    translations: { locale: string; slug: string; name: string; shortDescription: string }[];
  },
  locale: string,
) {
  const translation = pick(item.translations, locale);
  if (!translation) return null;
  return {
    href: `/products/${translation.slug}`,
    title: translation.name,
    description: translation.shortDescription,
    meta: item.category,
    featured: item.featured,
    category: item.category,
  };
}

function articleCard(
  item: {
    publishDate: Date | null;
    translations: { locale: string; slug: string; title: string; excerpt: string; readingTime: number }[];
  },
  locale: string,
) {
  const translation = pick(item.translations, locale);
  if (!translation) return null;
  return {
    href: `/blog/${translation.slug}`,
    title: translation.title,
    description: translation.excerpt,
    meta: String(translation.readingTime),
  } satisfies Card;
}

export function toolSection(kind: ToolKind) {
  if (kind === "SDK") return "sdk";
  if (kind === "API") return "api";
  if (kind === "DOCUMENTATION") return "documentation";
  return "tools";
}

export async function listProducts(locale: Locale, category?: ProductCategory) {
  const items = await prisma.product.findMany({
    where: { ...published, ...(category ? { category } : {}) },
    include: { translations: true },
    orderBy: { sortOrder: "asc" },
  });
  return items
    .map((item) => productCard(item, locale))
    .filter((item): item is NonNullable<typeof item> => Boolean(item));
}

export async function getProduct(locale: Locale, slug: string, preview: boolean) {
  const row = await prisma.productTranslation.findUnique({
    where: { locale_slug: { locale, slug } },
    include: {
      product: {
        include: {
          translations: true,
          technologies: {
            include: {
              technology: { include: { translations: true, parent: { include: { translations: true } } } },
            },
          },
          solutions: { include: { solution: { include: { translations: true } } } },
          articles: { include: { article: { include: { translations: true } } } },
          downloads: { where: published, include: { translations: true } },
        },
      },
    },
  });
  if (!row || !visible(row.product.status, preview)) return null;
  const product = row.product;
  return {
    id: product.id,
    category: product.category,
    status: product.status,
    slug: row.slug,
    altSlug: alternate(product.translations, locale),
    name: row.name,
    shortDescription: row.shortDescription,
    description: row.description,
    features: asStringArray(row.features),
    specifications: asSpecs(row.specifications),
    protocols: product.supportedProtocols,
    chips: product.supportedChips,
    platforms: product.platforms,
    documentationUrl: product.documentationUrl,
    heroImage: product.heroImage,
    gallery: asStringArray(product.gallery),
    seoTitle: row.seoTitle,
    seoDescription: row.seoDescription,
    canonicalUrl: row.canonicalUrl,
    ogImage: row.ogImage,
    robots: row.robots,
    technologies: relatedTech(product.technologies, locale),
    solutions: product.solutions
      .map((link) => {
        const text = pick(link.solution.translations, locale);
        if (!text || link.solution.status !== ContentStatus.PUBLISHED) return null;
        return { href: `/solutions/${text.slug}`, title: text.name, description: text.heroDescription };
      })
      .filter((item): item is NonNullable<typeof item> => item !== null),
    articles: product.articles
      .map((link) => (link.article.status === ContentStatus.PUBLISHED ? articleCard(link.article, locale) : null))
      .filter((item): item is NonNullable<typeof item> => item !== null),
    downloads: product.downloads
      .map((item) => {
        const text = pick(item.translations, locale);
        if (!text) return null;
        return {
          id: item.id,
          href: `/developer/downloads/${text.slug}`,
          title: text.name,
          description: item.version,
          version: item.version,
          platform: item.platform,
          fileSize: item.fileSize,
          checksum: item.checksum,
          hasFile: Boolean(item.filePath),
          slug: text.slug,
        };
      })
      .filter((item): item is NonNullable<typeof item> => Boolean(item)),
  };
}

function relatedTech(
  links: {
    technology: {
      status: ContentStatus;
      parent: { translations: { locale: string; slug: string }[] } | null;
      translations: { locale: string; slug: string; name: string; description: string }[];
    };
  }[],
  locale: string,
) {
  return links
    .map((link) => {
      const text = pick(link.technology.translations, locale);
      if (!text || link.technology.status !== ContentStatus.PUBLISHED) return null;
      const parent = link.technology.parent ? pick(link.technology.parent.translations, locale, true) : undefined;
      const href = parent ? `/technology/${parent.slug}/${text.slug}` : `/technology/${text.slug}`;
      return { href, title: text.name, description: text.description };
    })
    .filter((item): item is NonNullable<typeof item> => item !== null);
}

export async function listSolutions(locale: Locale) {
  const items = await prisma.solution.findMany({
    where: published,
    include: { translations: true },
    orderBy: { sortOrder: "asc" },
  });
  return items
    .map((item) => {
      const text = pick(item.translations, locale);
      if (!text) return null;
      return { href: `/solutions/${text.slug}`, title: text.name, description: text.heroDescription, meta: item.category };
    })
    .filter((item): item is NonNullable<typeof item> => item !== null);
}

export async function getSolution(locale: Locale, slug: string, preview: boolean) {
  const row = await prisma.solutionTranslation.findUnique({
    where: { locale_slug: { locale, slug } },
    include: {
      solution: {
        include: {
          translations: true,
          technologies: { include: { technology: { include: { translations: true, parent: { include: { translations: true } } } } } },
          products: { include: { product: { include: { translations: true } } } },
          articles: { include: { article: { include: { translations: true } } } },
        },
      },
    },
  });
  if (!row || !visible(row.solution.status, preview)) return null;
  return {
    slug: row.slug,
    altSlug: alternate(row.solution.translations, locale),
    name: row.name,
    heroTitle: row.heroTitle,
    heroDescription: row.heroDescription,
    problem: row.problem,
    solutionText: row.solutionText,
    architecture: row.architecture,
    useCases: asStringArray(row.useCases),
    security: row.security,
    deployment: row.deployment,
    heroImage: row.solution.heroImage,
    category: row.solution.category,
    status: row.solution.status,
    seoTitle: row.seoTitle,
    seoDescription: row.seoDescription,
    canonicalUrl: row.canonicalUrl,
    ogImage: row.ogImage,
    robots: row.robots,
    technologies: relatedTech(row.solution.technologies, locale),
    products: row.solution.products
      .map((link) => (link.product.status === ContentStatus.PUBLISHED ? productCard(link.product, locale) : null))
      .filter((item): item is NonNullable<ReturnType<typeof productCard>> => Boolean(item)),
    articles: row.solution.articles
      .map((link) => (link.article.status === ContentStatus.PUBLISHED ? articleCard(link.article, locale) : null))
      .filter((item): item is NonNullable<typeof item> => item !== null),
  };
}

export async function listRootTechnologies(locale: Locale) {
  const items = await prisma.technology.findMany({
    where: { ...published, parentId: null },
    include: {
      translations: true,
      children: { where: published, include: { translations: true }, orderBy: { sortOrder: "asc" } },
    },
    orderBy: { sortOrder: "asc" },
  });
  return items
    .map((item) => {
      const text = pick(item.translations, locale);
      if (!text) return null;
      return {
        href: `/technology/${text.slug}`,
        title: text.name,
        description: text.description,
        capabilities: asStringArray(text.capabilities),
        protocols: item.protocols,
        chips: item.chips,
        children: item.children
          .map((child) => {
            const childText = pick(child.translations, locale);
            if (!childText) return null;
            return { href: `/technology/${text.slug}/${childText.slug}`, title: childText.name, description: childText.description };
          })
          .filter((child): child is NonNullable<typeof child> => child !== null),
      };
    })
    .filter((item): item is NonNullable<typeof item> => Boolean(item));
}

export async function getTechnology(locale: Locale, slug: string, preview: boolean) {
  const row = await prisma.technologyTranslation.findUnique({
    where: { locale_slug: { locale, slug } },
    include: {
      technology: {
        include: {
          translations: true,
          parent: { include: { translations: true } },
          children: { where: preview ? {} : published, include: { translations: true }, orderBy: { sortOrder: "asc" } },
          products: { include: { product: { include: { translations: true } } } },
          solutions: { include: { solution: { include: { translations: true } } } },
          articles: { include: { article: { include: { translations: true } } } },
          tools: { include: { tool: { include: { translations: true } } } },
        },
      },
    },
  });
  if (!row || row.technology.parentId || !visible(row.technology.status, preview)) return null;
  return mapTechnology(row, locale);
}

export async function getChildTechnology(locale: Locale, parentSlug: string, slug: string, preview: boolean) {
  const row = await prisma.technologyTranslation.findUnique({
    where: { locale_slug: { locale, slug } },
    include: {
      technology: {
        include: {
          translations: true,
          parent: { include: { translations: true } },
          children: { include: { translations: true } },
          products: { include: { product: { include: { translations: true } } } },
          solutions: { include: { solution: { include: { translations: true } } } },
          articles: { include: { article: { include: { translations: true } } } },
          tools: { include: { tool: { include: { translations: true } } } },
        },
      },
    },
  });
  if (!row || !row.technology.parent || !visible(row.technology.status, preview)) return null;
  const parentText = pick(row.technology.parent.translations, locale, true);
  if (!parentText || parentText.slug !== parentSlug) return null;
  return mapTechnology(row, locale);
}

function mapTechnology(
  row: {
    slug: string;
    name: string;
    description: string;
    capabilities: Prisma.JsonValue;
    seoTitle: string | null;
    seoDescription: string | null;
    canonicalUrl: string | null;
    ogImage: string | null;
    robots: string;
    technology: {
      status: ContentStatus;
      protocols: string[];
      chips: string[];
      documentationUrl: string | null;
      translations: { locale: string; slug: string }[];
      parent: { translations: { locale: string; slug: string; name: string }[] } | null;
      children: { status: ContentStatus; translations: { locale: string; slug: string; name: string; description: string }[] }[];
      products: { product: { status: ContentStatus; featured: boolean; category: ProductCategory; translations: { locale: string; slug: string; name: string; shortDescription: string }[] } }[];
      solutions: { solution: { status: ContentStatus; translations: { locale: string; slug: string; name: string; heroDescription: string }[] } }[];
      articles: { article: { status: ContentStatus; publishDate: Date | null; translations: { locale: string; slug: string; title: string; excerpt: string; readingTime: number }[] } }[];
      tools: { tool: { status: ContentStatus; kind: ToolKind; translations: { locale: string; slug: string; name: string; description: string }[] } }[];
    };
  },
  locale: string,
) {
  const parentText = row.technology.parent ? pick(row.technology.parent.translations, locale, true) : undefined;
  return {
    slug: row.slug,
    altSlug: alternate(row.technology.translations, locale),
    parentSlug: parentText?.slug ?? null,
    parentName: parentText?.name ?? null,
    name: row.name,
    description: row.description,
    capabilities: asStringArray(row.capabilities),
    protocols: row.technology.protocols,
    chips: row.technology.chips,
    documentationUrl: row.technology.documentationUrl,
    status: row.technology.status,
    seoTitle: row.seoTitle,
    seoDescription: row.seoDescription,
    canonicalUrl: row.canonicalUrl,
    ogImage: row.ogImage,
    robots: row.robots,
    children: row.technology.children
      .filter((child) => child.status === ContentStatus.PUBLISHED)
      .map((child) => {
        const text = pick(child.translations, locale);
        if (!text) return null;
        return { href: `/technology/${row.slug}/${text.slug}`, title: text.name, description: text.description };
      })
      .filter((item): item is NonNullable<typeof item> => item !== null),
    products: row.technology.products
      .map((link) => (link.product.status === ContentStatus.PUBLISHED ? productCard(link.product, locale) : null))
      .filter((item): item is NonNullable<ReturnType<typeof productCard>> => Boolean(item)),
    solutions: row.technology.solutions
      .map((link) => {
        if (link.solution.status !== ContentStatus.PUBLISHED) return null;
        const text = pick(link.solution.translations, locale);
        if (!text) return null;
        return { href: `/solutions/${text.slug}`, title: text.name, description: text.heroDescription };
      })
      .filter((item): item is NonNullable<typeof item> => item !== null),
    articles: row.technology.articles
      .map((link) => (link.article.status === ContentStatus.PUBLISHED ? articleCard(link.article, locale) : null))
      .filter((item): item is NonNullable<typeof item> => item !== null),
    tools: row.technology.tools
      .map((link) => {
        if (link.tool.status !== ContentStatus.PUBLISHED) return null;
        const text = pick(link.tool.translations, locale);
        if (!text) return null;
        return { href: `/developer/${toolSection(link.tool.kind)}/${text.slug}`, title: text.name, description: text.description };
      })
      .filter((item): item is NonNullable<typeof item> => item !== null),
  };
}

export async function listTools(locale: Locale, kind: ToolKind) {
  const items = await prisma.developerTool.findMany({
    where: { ...published, kind },
    include: { translations: true },
    orderBy: { sortOrder: "asc" },
  });
  return items
    .map((item) => {
      const text = pick(item.translations, locale);
      if (!text) return null;
      return {
        href: `/developer/${toolSection(kind)}/${text.slug}`,
        title: text.name,
        description: text.description,
        meta: item.version,
        platforms: item.platforms,
      };
    })
    .filter((item): item is NonNullable<typeof item> => item !== null);
}

export async function getTool(locale: Locale, kind: ToolKind, slug: string, preview: boolean) {
  const row = await prisma.developerToolTranslation.findUnique({
    where: { locale_slug: { locale, slug } },
    include: {
      tool: {
        include: {
          translations: true,
          products: { include: { product: { include: { translations: true } } } },
          technologies: { include: { technology: { include: { translations: true, parent: { include: { translations: true } } } } } },
        },
      },
    },
  });
  if (!row || row.tool.kind !== kind || !visible(row.tool.status, preview)) return null;
  return {
    slug: row.slug,
    altSlug: alternate(row.tool.translations, locale),
    name: row.name,
    description: row.description,
    features: asStringArray(row.features),
    version: row.tool.version,
    platforms: row.tool.platforms,
    downloadUrl: row.tool.downloadUrl,
    documentationUrl: row.tool.documentationUrl,
    kind: row.tool.kind,
    status: row.tool.status,
    seoTitle: row.seoTitle,
    seoDescription: row.seoDescription,
    canonicalUrl: row.canonicalUrl,
    ogImage: row.ogImage,
    robots: row.robots,
    products: row.tool.products
      .map((link) => (link.product.status === ContentStatus.PUBLISHED ? productCard(link.product, locale) : null))
      .filter((item): item is NonNullable<ReturnType<typeof productCard>> => Boolean(item)),
    technologies: relatedTech(row.tool.technologies, locale),
  };
}

export async function listArticles(locale: Locale) {
  const items = await prisma.article.findMany({
    where: published,
    include: { translations: true },
    orderBy: { publishDate: "desc" },
  });
  return items
    .map((item) => {
      const card = articleCard(item, locale);
      if (!card) return null;
      const text = pick(item.translations, locale)!;
      return { ...card, category: item.category, date: item.publishDate, readingTime: text.readingTime };
    })
    .filter((item): item is NonNullable<typeof item> => Boolean(item));
}

export async function getArticle(locale: Locale, slug: string, preview: boolean) {
  const row = await prisma.articleTranslation.findUnique({
    where: { locale_slug: { locale, slug } },
    include: {
      article: {
        include: {
          translations: true,
          products: { include: { product: { include: { translations: true } } } },
          technologies: { include: { technology: { include: { translations: true, parent: { include: { translations: true } } } } } },
          solutions: { include: { solution: { include: { translations: true } } } },
        },
      },
    },
  });
  if (!row || !visible(row.article.status, preview)) return null;
  return {
    slug: row.slug,
    altSlug: alternate(row.article.translations, locale),
    title: row.title,
    excerpt: row.excerpt,
    content: row.content,
    readingTime: row.readingTime,
    author: row.article.author,
    category: row.article.category,
    tags: row.article.tags,
    coverImage: row.article.coverImage,
    publishDate: row.article.publishDate,
    updatedAt: row.article.updatedAt,
    status: row.article.status,
    seoTitle: row.seoTitle,
    seoDescription: row.seoDescription,
    canonicalUrl: row.canonicalUrl,
    ogImage: row.ogImage,
    robots: row.robots,
    products: row.article.products
      .map((link) => (link.product.status === ContentStatus.PUBLISHED ? productCard(link.product, locale) : null))
      .filter((item): item is NonNullable<ReturnType<typeof productCard>> => Boolean(item)),
    technologies: relatedTech(row.article.technologies, locale),
    solutions: row.article.solutions
      .map((link) => {
        if (link.solution.status !== ContentStatus.PUBLISHED) return null;
        const text = pick(link.solution.translations, locale);
        if (!text) return null;
        return { href: `/solutions/${text.slug}`, title: text.name, description: text.heroDescription };
      })
      .filter((item): item is NonNullable<typeof item> => item !== null),
  };
}

export async function listDownloads(locale: Locale) {
  const items = await prisma.download.findMany({
    where: published,
    include: { translations: true, product: { include: { translations: true } } },
    orderBy: { publishedAt: "desc" },
  });
  return items
    .map((item) => {
      const text = pick(item.translations, locale);
      if (!text) return null;
      const productText = item.product ? pick(item.product.translations, locale) : undefined;
      return {
        href: `/developer/downloads/${text.slug}`,
        title: text.name,
        description: text.releaseNotes,
        slug: text.slug,
        version: item.version,
        category: item.category,
        platform: item.platform,
        fileSize: item.fileSize,
        checksum: item.checksum,
        hasFile: Boolean(item.filePath),
        documentationUrl: item.documentationUrl,
        product: productText ? { href: `/products/${productText.slug}`, title: productText.name } : null,
      };
    })
    .filter((item): item is NonNullable<typeof item> => Boolean(item));
}

export async function getDownload(locale: Locale, slug: string, preview: boolean) {
  const row = await prisma.downloadTranslation.findUnique({
    where: { locale_slug: { locale, slug } },
    include: { download: { include: { translations: true, product: { include: { translations: true } } } } },
  });
  if (!row || !visible(row.download.status, preview)) return null;
  const productText = row.download.product ? pick(row.download.product.translations, locale) : undefined;
  return {
    slug: row.slug,
    altSlug: alternate(row.download.translations, locale),
    name: row.name,
    releaseNotes: row.releaseNotes,
    version: row.download.version,
    category: row.download.category,
    platform: row.download.platform,
    fileSize: row.download.fileSize,
    checksum: row.download.checksum,
    hasFile: Boolean(row.download.filePath),
    id: row.download.id,
    documentationUrl: row.download.documentationUrl,
    status: row.download.status,
    product: productText ? { href: `/products/${productText.slug}`, title: productText.name } : null,
  };
}

export async function getPage(locale: Locale, key: string, preview: boolean) {
  const page = await prisma.page.findUnique({ where: { key }, include: { translations: true } });
  if (!page || !visible(page.status, preview)) return null;
  const text = pick(page.translations, locale);
  if (!text) return null;
  const other = locale === "en" ? "zh" : "en";
  return {
    key,
    title: text.title,
    description: text.description,
    body: text.body,
    alt: page.translations.some((item) => item.locale === other),
    seoTitle: text.seoTitle,
    seoDescription: text.seoDescription,
    canonicalUrl: text.canonicalUrl,
    ogImage: text.ogImage,
    robots: text.robots,
    status: page.status,
  };
}

export async function contactOptions(locale: Locale) {
  const [products, solutions] = await Promise.all([
    prisma.product.findMany({ where: published, include: { translations: true }, orderBy: { sortOrder: "asc" } }),
    prisma.solution.findMany({ where: published, include: { translations: true }, orderBy: { sortOrder: "asc" } }),
  ]);
  return {
    products: products
      .map((item) => pick(item.translations, locale)?.name)
      .filter((name): name is string => Boolean(name)),
    projectTypes: solutions
      .map((item) => pick(item.translations, locale)?.name)
      .filter((name): name is string => Boolean(name)),
  };
}

export async function searchPublic(locale: Locale, q: string) {
  const query = q.trim().slice(0, 80);
  if (query.length < 2) return [];
  const contains: Prisma.StringFilter = { contains: query, mode: "insensitive" };
  const [products, solutions, technologies, tools, articles, downloads] = await Promise.all([
    prisma.productTranslation.findMany({
      where: { locale, product: published, OR: [{ name: contains }, { shortDescription: contains }] },
      take: 8,
    }),
    prisma.solutionTranslation.findMany({
      where: { locale, solution: published, OR: [{ name: contains }, { heroDescription: contains }] },
      take: 8,
    }),
    prisma.technologyTranslation.findMany({
      where: { locale, technology: published, OR: [{ name: contains }, { description: contains }] },
      include: { technology: { include: { parent: { include: { translations: true } } } } },
      take: 8,
    }),
    prisma.developerToolTranslation.findMany({
      where: { locale, tool: published, OR: [{ name: contains }, { description: contains }] },
      include: { tool: true },
      take: 8,
    }),
    prisma.articleTranslation.findMany({
      where: { locale, article: published, OR: [{ title: contains }, { excerpt: contains }] },
      take: 8,
    }),
    prisma.downloadTranslation.findMany({
      where: { locale, download: published, name: contains },
      take: 8,
    }),
  ]);
  return [
    ...products.map((item) => ({ type: "product" as const, title: item.name, description: item.shortDescription, href: `/products/${item.slug}`, category: "" })),
    ...solutions.map((item) => ({ type: "solution" as const, title: item.name, description: item.heroDescription, href: `/solutions/${item.slug}`, category: "" })),
    ...technologies.map((item) => {
      const parent = item.technology.parent ? pick(item.technology.parent.translations, locale, true) : undefined;
      const href = parent ? `/technology/${parent.slug}/${item.slug}` : `/technology/${item.slug}`;
      return { type: "technology" as const, title: item.name, description: item.description, href, category: "" };
    }),
    ...tools.map((item) => ({
      type: "tool" as const,
      title: item.name,
      description: item.description,
      href: `/developer/${toolSection(item.tool.kind)}/${item.slug}`,
      category: item.tool.kind,
    })),
    ...articles.map((item) => ({ type: "article" as const, title: item.title, description: item.excerpt, href: `/blog/${item.slug}`, category: "" })),
    ...downloads.map((item) => ({ type: "download" as const, title: item.name, description: item.releaseNotes, href: `/developer/downloads/${item.slug}`, category: "" })),
  ];
}

export async function sitemapEntries() {
  const [products, solutions, technologies, tools, articles, downloads, pages] = await Promise.all([
    prisma.productTranslation.findMany({ where: { product: published }, select: { locale: true, slug: true, product: { select: { updatedAt: true } } } }),
    prisma.solutionTranslation.findMany({ where: { solution: published }, select: { locale: true, slug: true, solution: { select: { updatedAt: true } } } }),
    prisma.technologyTranslation.findMany({
      where: { technology: published },
      select: { locale: true, slug: true, technology: { select: { updatedAt: true, parent: { select: { translations: { select: { locale: true, slug: true } } } } } } },
    }),
    prisma.developerToolTranslation.findMany({
      where: { tool: published },
      select: { locale: true, slug: true, tool: { select: { updatedAt: true, kind: true } } },
    }),
    prisma.articleTranslation.findMany({ where: { article: published }, select: { locale: true, slug: true, article: { select: { updatedAt: true } } } }),
    prisma.downloadTranslation.findMany({ where: { download: published }, select: { locale: true, slug: true, download: { select: { updatedAt: true } } } }),
    prisma.page.findMany({ where: published, select: { key: true, updatedAt: true } }),
  ]);
  const paths: { path: string; updatedAt?: Date }[] = [
    { path: "/en" },
    { path: "/zh" },
    { path: "/en/products" },
    { path: "/zh/products" },
    { path: "/en/solutions" },
    { path: "/zh/solutions" },
    { path: "/en/technology" },
    { path: "/zh/technology" },
    { path: "/en/developer" },
    { path: "/zh/developer" },
    { path: "/en/blog" },
    { path: "/zh/blog" },
    { path: "/en/contact" },
    { path: "/zh/contact" },
  ];
  for (const item of products) paths.push({ path: `/${item.locale}/products/${item.slug}`, updatedAt: item.product.updatedAt });
  for (const item of solutions) paths.push({ path: `/${item.locale}/solutions/${item.slug}`, updatedAt: item.solution.updatedAt });
  for (const item of technologies) {
    const parent = item.technology.parent?.translations.find((text) => text.locale === item.locale);
    const path = parent ? `/${item.locale}/technology/${parent.slug}/${item.slug}` : `/${item.locale}/technology/${item.slug}`;
    paths.push({ path, updatedAt: item.technology.updatedAt });
  }
  for (const item of tools) {
    paths.push({ path: `/${item.locale}/developer/${toolSection(item.tool.kind)}/${item.slug}`, updatedAt: item.tool.updatedAt });
  }
  for (const item of articles) paths.push({ path: `/${item.locale}/blog/${item.slug}`, updatedAt: item.article.updatedAt });
  for (const item of downloads) paths.push({ path: `/${item.locale}/developer/downloads/${item.slug}`, updatedAt: item.download.updatedAt });
  for (const page of pages) {
    paths.push({ path: `/en/${page.key}`, updatedAt: page.updatedAt });
    paths.push({ path: `/zh/${page.key}`, updatedAt: page.updatedAt });
  }
  return paths;
}
