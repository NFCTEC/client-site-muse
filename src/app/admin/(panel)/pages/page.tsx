import { DataTable, statusLabel } from "@/components/admin/ui";
import { prisma } from "@/lib/prisma";
import { guard } from "@/server/guard";

export default async function PagesAdmin() {
  await guard("pages");
  const rows = await prisma.page.findMany({ include: { translations: true }, orderBy: { key: "asc" } });
  return (
    <DataTable
      title="页面"
      createHref="/admin/pages/new"
      headers={["键", "标题", "状态"]}
      rows={rows.map((row) => ({
        href: `/admin/pages/${row.id}`,
        cells: [row.key, row.translations.find((item) => item.locale === "zh")?.title || row.translations[0]?.title || row.key, statusLabel(row.status)],
      }))}
    />
  );
}
