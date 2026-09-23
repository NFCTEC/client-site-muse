"use server";

import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { isSafeInternalPath, str } from "@/lib/utils";
import { audit, guard } from "@/server/guard";
import { bounce, enumValue, isUnique } from "@/server/form";
import { revalidatePublic } from "@/server/revalidate";

const roles = ["SUPER_ADMIN", "CONTENT_ADMIN", "PRODUCT_MANAGER", "EDITOR", "SALES"] as const;
const leadStatuses = ["NEW", "CONTACTED", "QUALIFIED", "CONVERTED", "CLOSED"] as const;

export async function saveLead(id: string, formData: FormData) {
  const user = await guard("leads");
  await prisma.lead.update({
    where: { id },
    data: {
      status: enumValue(str(formData, "status"), leadStatuses, "NEW"),
      notes: str(formData, "notes"),
      assignedToId: str(formData, "assignedToId") || null,
    },
  });
  await audit(user.id, "update", "lead", id);
  redirect(`/admin/leads/${id}?saved=1`);
}

export async function saveUser(formData: FormData) {
  const user = await guard("users");
  const email = str(formData, "email").toLowerCase();
  const password = str(formData, "password");
  const name = str(formData, "name");
  if (!email || !name || password.length < 10) bounce("/admin/users", "需要姓名、邮箱，以及至少 10 位的密码");
  try {
    const created = await prisma.user.create({
      data: {
        email,
        name,
        passwordHash: await bcrypt.hash(password, 12),
        role: enumValue(str(formData, "role"), roles, "EDITOR"),
      },
    });
    await audit(user.id, "create", "user", created.id);
  } catch (error) {
    if (isUnique(error)) bounce("/admin/users", "邮箱已存在");
    throw error;
  }
  redirect("/admin/users?saved=1");
}

export async function deleteUser(id: string) {
  const user = await guard("users");
  if (user.id === id) bounce("/admin/users", "不能删除当前登录用户");
  const target = await prisma.user.findUnique({ where: { id } });
  if (target?.role === "SUPER_ADMIN") {
    const count = await prisma.user.count({ where: { role: "SUPER_ADMIN" } });
    if (count <= 1) bounce("/admin/users", "至少保留一位超级管理员");
  }
  await prisma.user.delete({ where: { id } });
  await audit(user.id, "delete", "user", id);
  redirect("/admin/users");
}

export async function saveSettings(formData: FormData) {
  const user = await guard("settings");
  const email = str(formData, "lead_notify_email");
  await prisma.siteSetting.upsert({
    where: { key: "lead_notify_email" },
    update: { value: email },
    create: { key: "lead_notify_email", value: email },
  });
  const current = str(formData, "currentPassword");
  const next = str(formData, "newPassword");
  if (current || next) {
    if (next.length < 10) bounce("/admin/settings", "新密码至少 10 位");
    const record = await prisma.user.findUnique({ where: { id: user.id } });
    if (!record || !(await bcrypt.compare(current, record.passwordHash))) bounce("/admin/settings", "当前密码不正确");
    await prisma.user.update({ where: { id: user.id }, data: { passwordHash: await bcrypt.hash(next, 12) } });
  }
  await audit(user.id, "update", "settings");
  redirect("/admin/settings?saved=1");
}

export async function saveRedirect(formData: FormData) {
  const user = await guard("redirects");
  const fromPath = str(formData, "fromPath");
  const toPath = str(formData, "toPath");
  if (!isSafeInternalPath(fromPath) || !isSafeInternalPath(toPath)) bounce("/admin/redirects", "路径必须以 / 开头");
  try {
    const created = await prisma.redirect.create({
      data: { fromPath, toPath, note: str(formData, "note"), active: true, statusCode: 301 },
    });
    await audit(user.id, "create", "redirect", created.id);
  } catch (error) {
    if (isUnique(error)) bounce("/admin/redirects", "这个旧地址已经有规则");
    throw error;
  }
  redirect("/admin/redirects?saved=1");
}

export async function deleteRedirect(id: string) {
  const user = await guard("redirects");
  await prisma.redirect.delete({ where: { id } });
  await audit(user.id, "delete", "redirect", id);
  redirect("/admin/redirects");
}

export async function saveNavigation(formData: FormData) {
  const user = await guard("navigation");
  const items = await prisma.navItem.findMany({ select: { id: true } });
  for (const item of items) {
    const en = str(formData, `en_${item.id}`);
    const zh = str(formData, `zh_${item.id}`);
    await prisma.navItem.update({
      where: { id: item.id },
      data: {
        href: str(formData, `href_${item.id}`) || "/",
        sortOrder: Number(str(formData, `sort_${item.id}`) || 0),
        visible: formData.get(`visible_${item.id}`) === "on",
        emphasis: formData.get(`emphasis_${item.id}`) === "on",
        translations: {
          deleteMany: {},
          create: [
            { locale: "en", label: en || zh || "Item" },
            { locale: "zh", label: zh || en || "条目" },
          ],
        },
      },
    });
  }
  await audit(user.id, "update", "navigation");
  revalidatePublic();
  redirect("/admin/navigation?saved=1");
}

export async function addNavigation(formData: FormData) {
  const user = await guard("navigation");
  const href = str(formData, "href") || "/";
  if (!isSafeInternalPath(href) && !href.startsWith("https://")) bounce("/admin/navigation", "链接格式不正确");
  const parentId = str(formData, "parentId") || null;
  const created = await prisma.navItem.create({
    data: {
      location: enumValue(str(formData, "location"), ["HEADER", "FOOTER"] as const, "HEADER"),
      href,
      parentId,
      sortOrder: Number(str(formData, "sortOrder") || 0),
      external: href.startsWith("https://"),
      translations: {
        create: [
          { locale: "en", label: str(formData, "en") || "Item" },
          { locale: "zh", label: str(formData, "zh") || str(formData, "en") || "条目" },
        ],
      },
    },
  });
  await audit(user.id, "create", "navigation", created.id);
  revalidatePublic();
  redirect("/admin/navigation?saved=1");
}

export async function deleteNavigation(id: string) {
  const user = await guard("navigation");
  await prisma.navItem.delete({ where: { id } });
  await audit(user.id, "delete", "navigation", id);
  revalidatePublic();
  redirect("/admin/navigation");
}

export async function saveHomepage(formData: FormData) {
  const user = await guard("homepage");
  const sections = await prisma.homepageSection.findMany({ include: { translations: true } });
  for (const section of sections) {
    const enabled = formData.get(`enabled_${section.key}`) === "on";
    const sortOrder = Number(str(formData, `sort_${section.key}`) || section.sortOrder);
    await prisma.homepageSection.update({
      where: { id: section.id },
      data: {
        enabled,
        sortOrder,
        translations: {
          deleteMany: {},
          create: (["en", "zh"] as const).map((locale) => ({
            locale,
            title: str(formData, `${locale}_title_${section.key}`),
            description: str(formData, `${locale}_description_${section.key}`),
            content: contentFor(section.key, locale, formData),
          })),
        },
      },
    });
  }
  await audit(user.id, "update", "homepage");
  revalidatePublic();
  redirect("/admin/homepage?saved=1");
}

function contentFor(key: string, locale: "en" | "zh", formData: FormData) {
  if (key === "hero" || key === "cta") {
    return {
      primaryCta: str(formData, `${locale}_primary_${key}`),
      secondaryCta: str(formData, `${locale}_secondary_${key}`),
      tertiaryCta: str(formData, `${locale}_tertiary_${key}`),
    };
  }
  if (key === "products") {
    return {
      categories: str(formData, `${locale}_categories_${key}`)
        .split(/\n/)
        .map((line) => line.trim())
        .filter(Boolean)
        .map((line) => {
          const [itemKey, title, text] = line.split("|").map((part) => part.trim());
          return { key: itemKey || "", title: title || "", text: text || "" };
        }),
    };
  }
  if (key === "why") {
    return {
      items: str(formData, `${locale}_items_${key}`)
        .split(/\n/)
        .map((line) => line.trim())
        .filter(Boolean)
        .map((line) => {
          const [title, text] = line.split("|").map((part) => part.trim());
          return { title: title || "", text: text || "" };
        }),
    };
  }
  if (key === "process") {
    return { steps: str(formData, `${locale}_steps_${key}`).split(/\n/).map((line) => line.trim()).filter(Boolean) };
  }
  if (key === "security") {
    const groups = str(formData, `${locale}_groups_${key}`)
      .split(/\n---\n/)
      .map((chunk) => chunk.trim())
      .filter(Boolean)
      .map((chunk) => {
        const [head, ...rest] = chunk.split(/\n/).map((line) => line.trim()).filter(Boolean);
        const [title, href] = (head || "").split("|").map((part) => part.trim());
        return { title: title || "", href: href || "", items: rest };
      });
    return { groups };
  }
  return {};
}
