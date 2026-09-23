import { NextRequest, NextResponse } from "next/server";
import { ProductCategory } from "@prisma/client";
import { readLocale } from "@/lib/api";
import { listProducts } from "@/lib/content";

const categories = {
  software: ProductCategory.SOFTWARE,
  hardware: ProductCategory.HARDWARE,
  cloud: ProductCategory.CLOUD,
};

export async function GET(req: NextRequest) {
  const locale = readLocale(req);
  if (!locale) return NextResponse.json({ error: "Invalid locale" }, { status: 400 });
  const category = req.nextUrl.searchParams.get("category") || "";
  const data = await listProducts(locale, category in categories ? categories[category as keyof typeof categories] : undefined);
  return NextResponse.json({ data });
}
