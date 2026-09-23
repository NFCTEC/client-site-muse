import { DataTable, nameOf, statusLabel } from "@/components/admin/ui";
import { prisma } from "@/lib/prisma";
import { guard } from "@/server/guard";

export default async function TechnologyAdmin() {
  await guard("technologies");
  const rows = await prisma.technology.findMany({ include: { translations: true }, orderBy: { sortOrder: "asc" } });
  return (
    <DataTable
      title="技术"
      createHref="/admin/technologies/new"
      headers={["名称", "类别", "状态", "排序"]}
      rows={rows.map((row) => ({ href: `/admin/technologies/${row.id}`, cells: [nameOf(row.translations), row.category, statusLabel(row.status), String(row.sortOrder)] }))}
    />
  );
}
