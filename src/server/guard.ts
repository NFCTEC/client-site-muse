import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { can, type Module } from "@/lib/permissions";
import { prisma } from "@/lib/prisma";

export async function guard(module: Module) {
  const session = await auth();
  if (!session?.user?.id) redirect("/admin/login");
  if (!can(session.user.role, module)) redirect("/admin?denied=1");
  return session.user;
}

export async function canPreview(module: Module) {
  const session = await auth();
  return Boolean(session?.user && can(session.user.role, module));
}

export async function audit(userId: string, action: string, entity: string, entityId?: string) {
  await prisma.auditLog.create({ data: { userId, action, entity, entityId } });
}
