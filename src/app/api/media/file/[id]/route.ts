import { readFile } from "fs/promises";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { assertInsideStorage } from "@/lib/uploads";

export async function GET(_req: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  if (!/^[a-z0-9]+$/i.test(id)) return NextResponse.json({ error: "Not found" }, { status: 404 });
  const media = await prisma.media.findUnique({ where: { id } });
  if (!media) return NextResponse.json({ error: "Not found" }, { status: 404 });
  let filePath: string;
  try {
    filePath = assertInsideStorage(media.storagePath);
  } catch {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  const data = await readFile(filePath);
  return new NextResponse(data, {
    headers: {
      "Content-Type": media.mimeType,
      "Content-Length": String(data.length),
      "X-Content-Type-Options": "nosniff",
      "Cache-Control": "public, max-age=86400",
    },
  });
}
