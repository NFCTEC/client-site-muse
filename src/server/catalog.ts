"use server";

import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { checked, csv, idList, str } from "@/lib/utils";
import { audit, guard } from "@/server/guard";
import { bounce, enumValue, isUnique, readLocales } from "@/server/form";
import { revalidatePublic } from "@/server/revalidate";

const statuses = ["DRAFT", "REVIEW", "PUBLISHED", "ARCHIVED"] as const;
const reservedProductSlugs = new Set(["software", "hardware", "cloud"]);

function linesOf(value: string) {
  return value.split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
}

export async function saveProduct(id: string, formData: FormData) {
  const user = await guard("products");
  const parsed = readLocales(formData, {
    text: ["shortDescription", "description", "seoTitle", "seoDescription", "canonicalUrl", "ogImage", "robots"],
    lines: ["features"],
    specs: true,
  });
  if ("error" in parsed) bounce(`/admin/products/${id}`, parsed.error || "无法保存");
  if (parsed.blocks.some((block) => reservedProductSlugs.has(block.slug))) bounce(`/admin/products/${id}`, "该链接标识已被栏目占用");
  const translations = parsed.blocks.map((block) => ({
    locale: block.locale,
    name: block.name,
    slug: block.slug,
    shortDescription: block.text.shortDescription || "",
    description: block.text.description || "",
    features: block.lines.features || [],
    specifications: block.specs,
    seoTitle: block.text.seoTitle || null,
    seoDescription: block.text.seoDescription || null,
    canonicalUrl: block.text.canonicalUrl || null,
    ogImage: block.text.ogImage || null,
    robots: block.text.robots || "index,follow",
  }));
  const data = {
    category: enumValue(str(formData, "category"), ["SOFTWARE", "HARDWARE", "CLOUD"] as const, "SOFTWARE"),
    status: enumValue(str(formData, "status"), statuses, "DRAFT"),
    featured: checked(formData, "featured"),
    sortOrder: Number(str(formData, "sortOrder") || 0),
    heroImage: str(formData, "heroImage") || null,
    gallery: linesOf(str(formData, "gallery")),
    supportedProtocols: csv(formData, "protocols"),
    supportedChips: csv(formData, "chips"),
    platforms: csv(formData, "platforms"),
    documentationUrl: str(formData, "documentationUrl") || null,
  };
  let productId = id;
  try {
    if (id === "new") {
      productId = (await prisma.product.create({ data: { ...data, translations: { create: translations } } })).id;
    } else {
      await prisma.product.update({
        where: { id },
        data: { ...data, translations: { deleteMany: {}, create: translations } },
      });
    }
    await prisma.productTechnology.deleteMany({ where: { productId } });
    await prisma.productSolution.deleteMany({ where: { productId } });
    const technologyIds = idList(formData, "technologyIds");
    const solutionIds = idList(formData, "solutionIds");
    if (technologyIds.length) {
      await prisma.productTechnology.createMany({ data: technologyIds.map((technologyId) => ({ productId, technologyId })) });
    }
    if (solutionIds.length) {
      await prisma.productSolution.createMany({ data: solutionIds.map((solutionId) => ({ productId, solutionId })) });
    }
    await audit(user.id, id === "new" ? "create" : "update", "product", productId);
  } catch (error) {
    if (isUnique(error)) bounce(`/admin/products/${id}`, "链接标识已存在");
    throw error;
  }
  revalidatePublic();
  redirect(`/admin/products/${productId}?saved=1`);
}

export async function deleteProduct(id: string) {
  const user = await guard("products");
  await prisma.product.delete({ where: { id } });
  await audit(user.id, "delete", "product", id);
  revalidatePublic();
  redirect("/admin/products");
}

export async function saveSolution(id: string, formData: FormData) {
  const user = await guard("solutions");
  const parsed = readLocales(formData, {
    text: ["heroDescription", "problem", "solutionText", "architecture", "security", "deployment", "seoTitle", "seoDescription", "canonicalUrl", "ogImage", "robots"],
    lines: ["useCases"],
  });
  if ("error" in parsed) bounce(`/admin/solutions/${id}`, parsed.error || "无法保存");
  const translations = parsed.blocks.map((block) => ({
    locale: block.locale,
    name: block.name,
    slug: block.slug,
    heroTitle: block.name,
    heroDescription: block.text.heroDescription || "",
    problem: block.text.problem || "",
    solutionText: block.text.solutionText || "",
    architecture: block.text.architecture || "",
    security: block.text.security || "",
    deployment: block.text.deployment || "",
    useCases: block.lines.useCases || [],
    seoTitle: block.text.seoTitle || null,
    seoDescription: block.text.seoDescription || null,
    canonicalUrl: block.text.canonicalUrl || null,
    ogImage: block.text.ogImage || null,
    robots: block.text.robots || "index,follow",
  }));
  const data = {
    category: enumValue(str(formData, "category"), ["PAYMENT", "IDENTITY", "ACCESS_CONTROL", "BRAND_PROTECTION", "TRANSIT", "IOT"] as const, "PAYMENT"),
    status: enumValue(str(formData, "status"), statuses, "DRAFT"),
    sortOrder: Number(str(formData, "sortOrder") || 0),
    heroImage: str(formData, "heroImage") || null,
  };
  let solutionId = id;
  try {
    if (id === "new") solutionId = (await prisma.solution.create({ data: { ...data, translations: { create: translations } } })).id;
    else await prisma.solution.update({ where: { id }, data: { ...data, translations: { deleteMany: {}, create: translations } } });
    await prisma.solutionTechnology.deleteMany({ where: { solutionId } });
    await prisma.productSolution.deleteMany({ where: { solutionId } });
    const technologyIds = idList(formData, "technologyIds");
    const productIds = idList(formData, "productIds");
    if (technologyIds.length) await prisma.solutionTechnology.createMany({ data: technologyIds.map((technologyId) => ({ solutionId, technologyId })) });
    if (productIds.length) await prisma.productSolution.createMany({ data: productIds.map((productId) => ({ solutionId, productId })) });
    await audit(user.id, id === "new" ? "create" : "update", "solution", solutionId);
  } catch (error) {
    if (isUnique(error)) bounce(`/admin/solutions/${id}`, "类别或链接标识已存在");
    throw error;
  }
  revalidatePublic();
  redirect(`/admin/solutions/${solutionId}?saved=1`);
}

export async function deleteSolution(id: string) {
  const user = await guard("solutions");
  await prisma.solution.delete({ where: { id } });
  await audit(user.id, "delete", "solution", id);
  revalidatePublic();
  redirect("/admin/solutions");
}

export async function saveTechnology(id: string, formData: FormData) {
  const user = await guard("technologies");
  const parsed = readLocales(formData, {
    text: ["description", "seoTitle", "seoDescription", "canonicalUrl", "ogImage", "robots"],
    lines: ["capabilities"],
  });
  if ("error" in parsed) bounce(`/admin/technologies/${id}`, parsed.error || "无法保存");
  const parentId = str(formData, "parentId") || null;
  if (parentId && parentId === id) bounce(`/admin/technologies/${id}`, "不能把自己设为上级");
  const translations = parsed.blocks.map((block) => ({
    locale: block.locale,
    name: block.name,
    slug: block.slug,
    description: block.text.description || "",
    capabilities: block.lines.capabilities || [],
    seoTitle: block.text.seoTitle || null,
    seoDescription: block.text.seoDescription || null,
    canonicalUrl: block.text.canonicalUrl || null,
    ogImage: block.text.ogImage || null,
    robots: block.text.robots || "index,follow",
  }));
  const data = {
    category: enumValue(str(formData, "category"), ["NFC_RF", "SMART_CARDS", "SECURITY_IDENTITY"] as const, "NFC_RF"),
    status: enumValue(str(formData, "status"), statuses, "DRAFT"),
    featured: checked(formData, "featured"),
    sortOrder: Number(str(formData, "sortOrder") || 0),
    parentId,
    protocols: csv(formData, "protocols"),
    chips: csv(formData, "chips"),
    documentationUrl: str(formData, "documentationUrl") || null,
  };
  let technologyId = id;
  try {
    if (id === "new") technologyId = (await prisma.technology.create({ data: { ...data, translations: { create: translations } } })).id;
    else await prisma.technology.update({ where: { id }, data: { ...data, translations: { deleteMany: {}, create: translations } } });
    await audit(user.id, id === "new" ? "create" : "update", "technology", technologyId);
  } catch (error) {
    if (isUnique(error)) bounce(`/admin/technologies/${id}`, "链接标识已存在");
    throw error;
  }
  revalidatePublic();
  redirect(`/admin/technologies/${technologyId}?saved=1`);
}

export async function deleteTechnology(id: string) {
  const user = await guard("technologies");
  await prisma.technology.updateMany({ where: { parentId: id }, data: { parentId: null } });
  await prisma.technology.delete({ where: { id } });
  await audit(user.id, "delete", "technology", id);
  revalidatePublic();
  redirect("/admin/technologies");
}

export async function saveTool(id: string, formData: FormData) {
  const user = await guard("developer");
  const parsed = readLocales(formData, {
    text: ["description", "seoTitle", "seoDescription", "canonicalUrl", "ogImage", "robots"],
    lines: ["features"],
  });
  if ("error" in parsed) bounce(`/admin/developer/${id}`, parsed.error || "无法保存");
  const translations = parsed.blocks.map((block) => ({
    locale: block.locale,
    name: block.name,
    slug: block.slug,
    description: block.text.description || "",
    features: block.lines.features || [],
    seoTitle: block.text.seoTitle || null,
    seoDescription: block.text.seoDescription || null,
    canonicalUrl: block.text.canonicalUrl || null,
    ogImage: block.text.ogImage || null,
    robots: block.text.robots || "index,follow",
  }));
  const data = {
    kind: enumValue(str(formData, "kind"), ["SDK", "TOOL", "API", "DOCUMENTATION"] as const, "TOOL"),
    status: enumValue(str(formData, "status"), statuses, "DRAFT"),
    featured: checked(formData, "featured"),
    sortOrder: Number(str(formData, "sortOrder") || 0),
    version: str(formData, "version"),
    platforms: csv(formData, "platforms"),
    downloadUrl: str(formData, "downloadUrl") || null,
    documentationUrl: str(formData, "documentationUrl") || null,
  };
  let toolId = id;
  try {
    if (id === "new") toolId = (await prisma.developerTool.create({ data: { ...data, translations: { create: translations } } })).id;
    else await prisma.developerTool.update({ where: { id }, data: { ...data, translations: { deleteMany: {}, create: translations } } });
    await prisma.toolProduct.deleteMany({ where: { toolId } });
    await prisma.toolTechnology.deleteMany({ where: { toolId } });
    const productIds = idList(formData, "productIds");
    const technologyIds = idList(formData, "technologyIds");
    if (productIds.length) await prisma.toolProduct.createMany({ data: productIds.map((productId) => ({ toolId, productId })) });
    if (technologyIds.length) await prisma.toolTechnology.createMany({ data: technologyIds.map((technologyId) => ({ toolId, technologyId })) });
    await audit(user.id, id === "new" ? "create" : "update", "tool", toolId);
  } catch (error) {
    if (isUnique(error)) bounce(`/admin/developer/${id}`, "链接标识已存在");
    throw error;
  }
  revalidatePublic();
  redirect(`/admin/developer/${toolId}?saved=1`);
}

export async function deleteTool(id: string) {
  const user = await guard("developer");
  await prisma.developerTool.delete({ where: { id } });
  await audit(user.id, "delete", "tool", id);
  revalidatePublic();
  redirect("/admin/developer");
}
