import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { can } from "@/lib/permissions";
import { prisma } from "@/lib/prisma";
import { saveImage } from "@/lib/uploads";

export async function GET() {
  const session = await auth();
  if (!session?.user || !can(session.user.role, "media")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const media = await prisma.media.findMany({ orderBy: { createdAt: "desc" }, take: 100 });
  return NextResponse.json({
    data: media.map((item) => ({
      id: item.id,
      title: item.title,
      alt: item.alt,
      category: item.category,
      mimeType: item.mimeType,
      size: item.size,
      width: item.width,
      height: item.height,
      url: `/api/media/file/${item.id}`,
    })),
  });
}

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user || !can(session.user.role, "media")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const form = await req.formData();
  const file = form.get("file");
  if (!(file instanceof File)) return NextResponse.json({ error: "File required" }, { status: 400 });
  try {
    const saved = await saveImage(file);
    const media = await prisma.media.create({
      data: {
        title: String(form.get("title") || file.name).slice(0, 160),
        alt: String(form.get("alt") || "").slice(0, 200),
        category: "PRODUCT_IMAGES",
        ...saved,
      },
    });
    return NextResponse.json({ data: { id: media.id, url: `/api/media/file/${media.id}` } });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Upload failed" }, { status: 400 });
  }
}
