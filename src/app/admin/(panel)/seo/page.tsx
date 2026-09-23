import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { guard } from "@/server/guard";

export default async function SeoAdmin() {
  await guard("seo");
  const [products, solutions, technologies, articles] = await Promise.all([
    prisma.productTranslation.findMany({ where: { product: { status: "PUBLISHED" }, OR: [{ seoDescription: null }, { seoDescription: "" }] }, select: { name: true, slug: true, locale: true } }),
    prisma.solutionTranslation.findMany({ where: { solution: { status: "PUBLISHED" }, OR: [{ seoDescription: null }, { seoDescription: "" }] }, select: { name: true, slug: true, locale: true } }),
    prisma.technologyTranslation.findMany({ where: { technology: { status: "PUBLISHED" }, OR: [{ seoDescription: null }, { seoDescription: "" }] }, select: { name: true, slug: true, locale: true } }),
    prisma.articleTranslation.findMany({ where: { article: { status: "PUBLISHED" }, OR: [{ seoDescription: null }, { seoDescription: "" }] }, select: { title: true, slug: true, locale: true } }),
  ]);
  const rows = [
    ...products.map((item) => ({ type: "产品", name: item.name, href: `/${item.locale}/products/${item.slug}` })),
    ...solutions.map((item) => ({ type: "方案", name: item.name, href: `/${item.locale}/solutions/${item.slug}` })),
    ...technologies.map((item) => ({ type: "技术", name: item.name, href: `/${item.locale}/technology/${item.slug}` })),
    ...articles.map((item) => ({ type: "文章", name: item.title, href: `/${item.locale}/blog/${item.slug}` })),
  ];
  return (
    <div>
      <h1 className="text-2xl font-semibold">SEO</h1>
      <p className="mt-2 text-sm text-zinc-600">已发布但缺少描述的页面。各编辑页里可以直接改标题、描述、canonical、OG 和 robots。</p>
      <ul className="mt-4 grid gap-2 text-sm">
        {rows.map((row) => (
          <li key={`${row.type}-${row.href}`}>
            {row.type} · <Link href={row.href}>{row.name}</Link>
          </li>
        ))}
        {!rows.length ? <li className="text-zinc-500">已发布内容都有描述。</li> : null}
      </ul>
    </div>
  );
}
