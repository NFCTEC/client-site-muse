import { DataTable, nameOf, statusLabel } from "@/components/admin/ui";
import { prisma } from "@/lib/prisma";
import { guard } from "@/server/guard";

export default async function ProductsAdmin() {
  await guard("products");
  const products = await prisma.product.findMany({ include: { translations: true }, orderBy: { sortOrder: "asc" } });
  return (
    <DataTable
      title="产品"
      createHref="/admin/products/new"
      headers={["名称", "类别", "状态", "排序"]}
      rows={products.map((product) => ({
        href: `/admin/products/${product.id}`,
        cells: [nameOf(product.translations, product.id), product.category, statusLabel(product.status), String(product.sortOrder)],
      }))}
    />
  );
}
