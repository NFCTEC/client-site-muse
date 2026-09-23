import { z } from "zod";
import { headers } from "next/headers";
import { prisma } from "./prisma";
import { hashKey } from "./utils";
import { notifyLead } from "./mail";
import { saveLeadAttachment } from "./uploads";

export const leadSchema = z.object({
  name: z.string().trim().min(1).max(120),
  company: z.string().trim().max(160).optional().default(""),
  email: z.string().trim().email().max(200),
  country: z.string().trim().max(80).optional().default(""),
  projectType: z.string().trim().max(80).optional().default(""),
  interestedProduct: z.string().trim().max(160).optional().default(""),
  message: z.string().trim().min(1).max(5000),
});

export async function createLead(input: unknown, file?: File | null, honeypot?: string) {
  if (honeypot && honeypot.trim()) return { ok: true as const };
  const parsed = leadSchema.safeParse(input);
  if (!parsed.success) return { ok: false as const, error: "validation" as const };
  const headerList = await headers();
  const ip = headerList.get("x-forwarded-for")?.split(",")[0]?.trim() || headerList.get("x-real-ip") || "local";
  const key = hashKey(`lead:${ip}`);
  const since = new Date(Date.now() - 60 * 60 * 1000);
  const count = await prisma.rateLimit.count({ where: { key, createdAt: { gte: since } } });
  if (count >= 5) return { ok: false as const, error: "rate" as const };
  let attachment: { storagePath: string; originalName: string } | null = null;
  if (file && file.size > 0) {
    try {
      attachment = await saveLeadAttachment(file);
    } catch {
      return { ok: false as const, error: "file" as const };
    }
  }
  await prisma.rateLimit.create({ data: { key } });
  await prisma.rateLimit.deleteMany({ where: { createdAt: { lt: new Date(Date.now() - 24 * 60 * 60 * 1000) } } });
  await prisma.lead.create({
    data: {
      ...parsed.data,
      attachmentPath: attachment?.storagePath,
      attachmentName: attachment?.originalName,
    },
  });
  await prisma.analyticsEvent.create({ data: { name: "contact_submit", path: "/contact" } });
  try {
    await notifyLead(parsed.data);
  } catch (error) {
    console.error("Lead email failed", error);
  }
  return { ok: true as const };
}
