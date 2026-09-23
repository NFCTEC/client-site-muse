import { readFile } from "fs/promises";
import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { can } from "@/lib/permissions";
import { prisma } from "@/lib/prisma";
import { assertInsideStorage } from "@/lib/uploads";

export async function GET(_req: Request, context: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user || !can(session.user.role, "leads")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await context.params;
  const lead = await prisma.lead.findUnique({ where: { id } });
  if (!lead?.attachmentPath) return NextResponse.json({ error: "Not found" }, { status: 404 });
  let filePath: string;
  try {
    filePath = assertInsideStorage(lead.attachmentPath);
  } catch {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  const data = await readFile(filePath);
  const filename = (lead.attachmentName || "attachment").replace(/["\r\n]/g, "");
  return new NextResponse(data, {
    headers: {
      "Content-Type": "application/octet-stream",
      "Content-Disposition": `attachment; filename="${filename}"`,
      "X-Content-Type-Options": "nosniff",
    },
  });
}
