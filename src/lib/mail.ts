import nodemailer from "nodemailer";
import { prisma } from "./prisma";

export async function leadNotifyEmail() {
  const setting = await prisma.siteSetting.findUnique({ where: { key: "lead_notify_email" } });
  return setting?.value || process.env.LEAD_NOTIFY_EMAIL || "";
}

export async function notifyLead(lead: {
  name: string;
  email: string;
  company: string;
  country: string;
  projectType: string;
  interestedProduct: string;
  message: string;
}) {
  const to = await leadNotifyEmail();
  if (!to || !process.env.SMTP_HOST) return;
  const transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: process.env.SMTP_SECURE === "true",
    auth: process.env.SMTP_USER
      ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS || "" }
      : undefined,
  });
  await transport.sendMail({
    from: process.env.SMTP_FROM || process.env.SMTP_USER,
    to,
    replyTo: lead.email,
    subject: `NFCTEC engineer request: ${lead.name}`,
    text: [
      `Name: ${lead.name}`,
      `Company: ${lead.company}`,
      `Email: ${lead.email}`,
      `Country: ${lead.country}`,
      `Project: ${lead.projectType}`,
      `Product: ${lead.interestedProduct}`,
      "",
      lead.message,
    ].join("\n"),
  });
}
