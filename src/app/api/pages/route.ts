import { NextRequest, NextResponse } from "next/server";
import { readLocale } from "@/lib/api";
import { getPage } from "@/lib/content";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const locale = readLocale(req);
  if (!locale) return NextResponse.json({ error: "Invalid locale" }, { status: 400 });
  const key = req.nextUrl.searchParams.get("key");
  if (key) {
    const page = await getPage(locale, key, false);
    if (!page) return NextResponse.json({ data: null }, { status: 404 });
    return NextResponse.json({
      data: { key: page.key, title: page.title, description: page.description, body: page.body },
    });
  }
  const pages = await prisma.page.findMany({
    where: { status: "PUBLISHED" },
    include: { translations: { where: { locale } } },
  });
  return NextResponse.json({
    data: pages.map((page) => ({
      key: page.key,
      title: page.translations[0]?.title || page.key,
      description: page.translations[0]?.description || "",
    })),
  });
}
