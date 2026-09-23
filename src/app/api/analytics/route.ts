import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const NAMES = new Set([
  "product_view",
  "solution_view",
  "technology_view",
  "download_click",
  "documentation_click",
  "contact_submit",
  "talk_to_engineer_click",
  "article_view",
  "developer_tool_download",
]);

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const name = body && typeof body.name === "string" ? body.name : "";
  const path = body && typeof body.path === "string" ? body.path.split("?")[0].slice(0, 300) : "";
  if (!NAMES.has(name) || !path.startsWith("/") || path.startsWith("//")) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
  await prisma.analyticsEvent.create({ data: { name, path } });
  return NextResponse.json({ ok: true });
}
