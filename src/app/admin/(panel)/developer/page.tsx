import { DataTable, nameOf, statusLabel } from "@/components/admin/ui";
import { prisma } from "@/lib/prisma";
import { guard } from "@/server/guard";

export default async function DeveloperAdmin() {
  await guard("developer");
  const rows = await prisma.developerTool.findMany({ include: { translations: true }, orderBy: { sortOrder: "asc" } });
  return (
    <DataTable
      title="开发者资源"
      createHref="/admin/developer/new"
      headers={["名称", "类型", "状态", "排序"]}
      rows={rows.map((row) => ({ href: `/admin/developer/${row.id}`, cells: [nameOf(row.translations), row.kind, statusLabel(row.status), String(row.sortOrder)] }))}
    />
  );
}
