import { NextRequest, NextResponse } from "next/server";
import { ToolKind } from "@prisma/client";
import { readLocale } from "@/lib/api";
import { listTools } from "@/lib/content";

const kinds: Record<string, ToolKind> = {
  sdk: ToolKind.SDK,
  tool: ToolKind.TOOL,
  api: ToolKind.API,
  documentation: ToolKind.DOCUMENTATION,
};

export async function GET(req: NextRequest) {
  const locale = readLocale(req);
  if (!locale) return NextResponse.json({ error: "Invalid locale" }, { status: 400 });
  const kind = kinds[req.nextUrl.searchParams.get("kind") || "sdk"] || ToolKind.SDK;
  return NextResponse.json({ data: await listTools(locale, kind) });
}
