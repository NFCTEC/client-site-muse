import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { can } from "@/lib/permissions";
import { guard } from "@/server/guard";

export default async function AdminSearch({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const user = await guard("dashboard");
  const q = ((await searchParams).q || "").trim();
  const contains = { contains: q, mode: "insensitive" as const };
  const [products, articles, leads] = await Promise.all([
    q && can(user.role, "products")
      ? prisma.productTranslation.findMany({ where: { name: contains }, take: 10, include: { product: true } })
      : [],
    q && can(user.role, "blog")
      ? prisma.articleTranslation.findMany({ where: { title: contains }, take: 10 })
      : [],
    q && can(user.role, "leads")
      ? prisma.lead.findMany({ where: { OR: [{ name: contains }, { email: contains }, { company: contains }] }, take: 10 })
      : [],
  ]);
  return (
    <div>
      <h1 className="text-2xl font-semibold">搜索</h1>
      <ul className="mt-4 grid gap-2 text-sm">
        {products.map((item) => <li key={item.id}><Link href={`/admin/products/${item.productId}`}>{item.name}</Link></li>)}
        {articles.map((item) => <li key={item.id}><Link href={`/admin/blog/${item.articleId}`}>{item.title}</Link></li>)}
        {leads.map((item) => <li key={item.id}><Link href={`/admin/leads/${item.id}`}>{item.name} · {item.email}</Link></li>)}
        {q && !products.length && !articles.length && !leads.length ? <li className="text-zinc-500">没有结果</li> : null}
      </ul>
    </div>
  );
}
