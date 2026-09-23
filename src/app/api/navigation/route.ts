import { NextRequest, NextResponse } from "next/server";
import { readLocale } from "@/lib/api";
import { getNav } from "@/lib/content";

export async function GET(req: NextRequest) {
  const locale = readLocale(req);
  if (!locale) return NextResponse.json({ error: "Invalid locale" }, { status: 400 });
  const location = req.nextUrl.searchParams.get("location") === "footer" ? "FOOTER" : "HEADER";
  return NextResponse.json({ data: await getNav(locale, location) });
}
