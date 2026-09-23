import { NextRequest, NextResponse } from "next/server";
import { readLocale } from "@/lib/api";
import { listRootTechnologies } from "@/lib/content";

export async function GET(req: NextRequest) {
  const locale = readLocale(req);
  if (!locale) return NextResponse.json({ error: "Invalid locale" }, { status: 400 });
  return NextResponse.json({ data: await listRootTechnologies(locale) });
}
