import { readFile } from "fs/promises";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { assertInsideStorage } from "@/lib/uploads";

export async function GET(_req: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  const item = await prisma.download.findUnique({ where: { id } });
  if (!item || item.status !== "PUBLISHED" || !item.filePath) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  let filePath: string;
  try {
    filePath = assertInsideStorage(item.filePath);
  } catch {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  const data = await readFile(filePath);
  await prisma.analyticsEvent.create({ data: { name: "download_click", path: `/developer/downloads/${id}` } });
  const filename = (item.fileName || "download").replace(/["\r\n]/g, "");
  return new NextResponse(data, {
    headers: {
      "Content-Type": "application/octet-stream",
      "Content-Length": String(data.length),
      "Content-Disposition": `attachment; filename="${filename}"`,
      "X-Content-Type-Options": "nosniff",
    },
  });
}
