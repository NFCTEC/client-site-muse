import { DataTable, nameOf, statusLabel } from "@/components/admin/ui";
import { prisma } from "@/lib/prisma";
import { guard } from "@/server/guard";

export default async function SolutionsAdmin() {
  await guard("solutions");
  const rows = await prisma.solution.findMany({ include: { translations: true }, orderBy: { sortOrder: "asc" } });
  return (
    <DataTable
      title="方案"
      createHref="/admin/solutions/new"
      headers={["名称", "类别", "状态", "排序"]}
      rows={rows.map((row) => ({ href: `/admin/solutions/${row.id}`, cells: [nameOf(row.translations), row.category, statusLabel(row.status), String(row.sortOrder)] }))}
    />
  );
}
