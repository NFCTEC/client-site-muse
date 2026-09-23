import { DataTable, statusLabel } from "@/components/admin/ui";
import { prisma } from "@/lib/prisma";
import { guard } from "@/server/guard";

export default async function BlogAdmin() {
  await guard("blog");
  const rows = await prisma.article.findMany({ include: { translations: true }, orderBy: { updatedAt: "desc" } });
  return (
    <DataTable
      title="博客"
      createHref="/admin/blog/new"
      headers={["标题", "状态", "作者"]}
      rows={rows.map((row) => ({
        href: `/admin/blog/${row.id}`,
        cells: [row.translations.find((item) => item.locale === "zh")?.title || row.translations[0]?.title || row.id, statusLabel(row.status), row.author],
      }))}
    />
  );
}
