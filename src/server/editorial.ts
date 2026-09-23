"use server";

import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { checked, csv, idList, readingMinutes, str } from "@/lib/utils";
import { audit, guard } from "@/server/guard";
import { bounce, enumValue, isUnique, readLocales } from "@/server/form";
import { revalidatePublic } from "@/server/revalidate";
import { saveDownloadFile, saveImage } from "@/lib/uploads";

const statuses = ["DRAFT", "REVIEW", "PUBLISHED", "ARCHIVED"] as const;

export async function saveArticle(id: string, formData: FormData) {
  const user = await guard("blog");
  const parsed = readLocales(formData, {
    nameKey: "title",
    text: ["excerpt", "content", "seoTitle", "seoDescription", "canonicalUrl", "ogImage", "robots"],
  });
  if ("error" in parsed) bounce(`/admin/blog/${id}`, parsed.error || "无法保存");
  const status = enumValue(str(formData, "status"), statuses, "DRAFT");
  const existing = id === "new" ? null : await prisma.article.findUnique({ where: { id } });
  const translations = parsed.blocks.map((block) => ({
    locale: block.locale,
    title: block.name,
    slug: block.slug,
    excerpt: block.text.excerpt || "",
    content: block.text.content || "",
    readingTime: readingMinutes(block.text.content || ""),
    seoTitle: block.text.seoTitle || null,
    seoDescription: block.text.seoDescription || null,
    canonicalUrl: block.text.canonicalUrl || null,
    ogImage: block.text.ogImage || null,
    robots: block.text.robots || "index,follow",
  }));
  const data = {
    status,
    featured: checked(formData, "featured"),
    author: str(formData, "author") || "NFCTEC",
    category: str(formData, "category"),
    tags: csv(formData, "tags"),
    coverImage: str(formData, "coverImage") || null,
    publishDate: status === "PUBLISHED" ? existing?.publishDate || new Date() : existing?.publishDate || null,
  };
  let articleId = id;
  try {
    if (id === "new") articleId = (await prisma.article.create({ data: { ...data, translations: { create: translations } } })).id;
    else await prisma.article.update({ where: { id }, data: { ...data, translations: { deleteMany: {}, create: translations } } });
    await prisma.articleProduct.deleteMany({ where: { articleId } });
    await prisma.articleTechnology.deleteMany({ where: { articleId } });
    await prisma.articleSolution.deleteMany({ where: { articleId } });
    const productIds = idList(formData, "productIds");
    const technologyIds = idList(formData, "technologyIds");
    const solutionIds = idList(formData, "solutionIds");
    if (productIds.length) await prisma.articleProduct.createMany({ data: productIds.map((productId) => ({ articleId, productId })) });
    if (technologyIds.length) await prisma.articleTechnology.createMany({ data: technologyIds.map((technologyId) => ({ articleId, technologyId })) });
    if (solutionIds.length) await prisma.articleSolution.createMany({ data: solutionIds.map((solutionId) => ({ articleId, solutionId })) });
    await audit(user.id, id === "new" ? "create" : "update", "article", articleId);
  } catch (error) {
    if (isUnique(error)) bounce(`/admin/blog/${id}`, "链接标识已存在");
    throw error;
  }
  revalidatePublic();
  redirect(`/admin/blog/${articleId}?saved=1`);
}

export async function deleteArticle(id: string) {
  const user = await guard("blog");
  await prisma.article.delete({ where: { id } });
  await audit(user.id, "delete", "article", id);
  revalidatePublic();
  redirect("/admin/blog");
}

export async function saveDownload(id: string, formData: FormData) {
  const user = await guard("downloads");
  const parsed = readLocales(formData, { text: ["releaseNotes"] });
  if ("error" in parsed) bounce(`/admin/downloads/${id}`, parsed.error || "无法保存");
  const translations = parsed.blocks.map((block) => ({
    locale: block.locale,
    name: block.name,
    slug: block.slug,
    releaseNotes: block.text.releaseNotes || "",
  }));
  const file = formData.get("file");
  let stored: { storagePath: string; fileName: string; fileSize: number; checksum: string } | null = null;
  if (file instanceof File && file.size > 0) {
    try {
      stored = await saveDownloadFile(file);
    } catch (error) {
      bounce(`/admin/downloads/${id}`, error instanceof Error ? error.message : "文件无效");
    }
  }
  const status = enumValue(str(formData, "status"), statuses, "DRAFT");
  const data = {
    version: str(formData, "version"),
    category: enumValue(str(formData, "category"), ["SOFTWARE", "SDK", "DRIVERS", "FIRMWARE", "DATASHEETS", "MANUALS", "DEVELOPER_TOOLS"] as const, "SOFTWARE"),
    platform: str(formData, "platform"),
    documentationUrl: str(formData, "documentationUrl") || null,
    productId: str(formData, "productId") || null,
    status,
    publishedAt: status === "PUBLISHED" ? new Date() : null,
    ...(stored
      ? { filePath: stored.storagePath, fileName: stored.fileName, fileSize: stored.fileSize, checksum: stored.checksum }
      : {}),
  };
  let downloadId = id;
  try {
    if (id === "new") downloadId = (await prisma.download.create({ data: { ...data, translations: { create: translations } } })).id;
    else await prisma.download.update({ where: { id }, data: { ...data, translations: { deleteMany: {}, create: translations } } });
    await audit(user.id, id === "new" ? "create" : "update", "download", downloadId);
  } catch (error) {
    if (isUnique(error)) bounce(`/admin/downloads/${id}`, "链接标识已存在");
    throw error;
  }
  revalidatePublic();
  redirect(`/admin/downloads/${downloadId}?saved=1`);
}

export async function deleteDownload(id: string) {
  const user = await guard("downloads");
  await prisma.download.delete({ where: { id } });
  await audit(user.id, "delete", "download", id);
  revalidatePublic();
  redirect("/admin/downloads");
}

export async function savePage(id: string, formData: FormData) {
  const user = await guard("pages");
  const parsed = readLocales(formData, {
    nameKey: "title",
    text: ["description", "body", "seoTitle", "seoDescription", "canonicalUrl", "ogImage", "robots"],
  });
  if ("error" in parsed) bounce(`/admin/pages/${id}`, parsed.error || "无法保存");
  const key = str(formData, "key").toLowerCase();
  if (!/^[a-z0-9-]+$/.test(key)) bounce(`/admin/pages/${id}`, "页面键只能使用小写英文和连字符");
  const translations = parsed.blocks.map((block) => ({
    locale: block.locale,
    title: block.name,
    description: block.text.description || "",
    body: block.text.body || "",
    seoTitle: block.text.seoTitle || null,
    seoDescription: block.text.seoDescription || null,
    canonicalUrl: block.text.canonicalUrl || null,
    ogImage: block.text.ogImage || null,
    robots: block.text.robots || "index,follow",
  }));
  const status = enumValue(str(formData, "status"), statuses, "DRAFT");
  try {
    if (id === "new") {
      const created = await prisma.page.create({ data: { key, status, translations: { create: translations } } });
      await audit(user.id, "create", "page", created.id);
      revalidatePublic();
      redirect(`/admin/pages/${created.id}?saved=1`);
    }
    await prisma.page.update({ where: { id }, data: { key, status, translations: { deleteMany: {}, create: translations } } });
    await audit(user.id, "update", "page", id);
  } catch (error) {
    if (isUnique(error)) bounce(`/admin/pages/${id}`, "页面键已存在");
    throw error;
  }
  revalidatePublic();
  redirect(`/admin/pages/${id}?saved=1`);
}

export async function deletePage(id: string) {
  const user = await guard("pages");
  await prisma.page.delete({ where: { id } });
  await audit(user.id, "delete", "page", id);
  revalidatePublic();
  redirect("/admin/pages");
}

export async function saveMedia(formData: FormData) {
  const user = await guard("media");
  const file = formData.get("file");
  if (!(file instanceof File)) bounce("/admin/media", "请选择图片");
  try {
    const saved = await saveImage(file);
    const media = await prisma.media.create({
      data: {
        title: str(formData, "title") || file.name,
        alt: str(formData, "alt"),
        category: enumValue(str(formData, "category"), ["PRODUCT_IMAGES", "BLOG_IMAGES", "TECHNOLOGY_IMAGES", "LOGOS", "DOCUMENTS", "DATASHEETS", "SCREENSHOTS", "VIDEOS"] as const, "PRODUCT_IMAGES"),
        ...saved,
      },
    });
    await audit(user.id, "create", "media", media.id);
  } catch (error) {
    bounce("/admin/media", error instanceof Error ? error.message : "上传失败");
  }
  revalidatePublic();
  redirect("/admin/media?saved=1");
}

export async function updateMedia(id: string, formData: FormData) {
  const user = await guard("media");
  await prisma.media.update({
    where: { id },
    data: {
      title: str(formData, "title"),
      alt: str(formData, "alt"),
      category: enumValue(str(formData, "category"), ["PRODUCT_IMAGES", "BLOG_IMAGES", "TECHNOLOGY_IMAGES", "LOGOS", "DOCUMENTS", "DATASHEETS", "SCREENSHOTS", "VIDEOS"] as const, "PRODUCT_IMAGES"),
    },
  });
  await audit(user.id, "update", "media", id);
  revalidatePublic();
  redirect("/admin/media?saved=1");
}

export async function deleteMedia(id: string) {
  const user = await guard("media");
  await prisma.media.delete({ where: { id } });
  await audit(user.id, "delete", "media", id);
  revalidatePublic();
  redirect("/admin/media");
}
