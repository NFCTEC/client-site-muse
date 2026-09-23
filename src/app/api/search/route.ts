import { NextRequest, NextResponse } from "next/server";
import { readLocale } from "@/lib/api";
import { searchPublic } from "@/lib/content";

export async function GET(req: NextRequest) {
  const locale = readLocale(req);
  if (!locale) return NextResponse.json({ error: "Invalid locale" }, { status: 400 });
  const q = req.nextUrl.searchParams.get("q") || "";
  return NextResponse.json({ data: await searchPublic(locale, q) });
}
