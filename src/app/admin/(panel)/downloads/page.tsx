import { DataTable, statusLabel } from "@/components/admin/ui";
import { prisma } from "@/lib/prisma";
import { guard } from "@/server/guard";

export default async function DownloadsAdmin() {
  await guard("downloads");
  const rows = await prisma.download.findMany({ include: { translations: true }, orderBy: { updatedAt: "desc" } });
  return (
    <DataTable
      title="下载"
      createHref="/admin/downloads/new"
      headers={["名称", "类别", "版本", "状态"]}
      rows={rows.map((row) => ({
        href: `/admin/downloads/${row.id}`,
        cells: [row.translations.find((item) => item.locale === "zh")?.name || row.translations[0]?.name || row.id, row.category, row.version, statusLabel(row.status)],
      }))}
    />
  );
}
