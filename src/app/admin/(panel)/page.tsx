import { prisma } from "@/lib/prisma";
import { guard } from "@/server/guard";

export default async function Dashboard({ searchParams }: { searchParams: Promise<{ denied?: string }> }) {
  await guard("dashboard");
  const denied = (await searchParams).denied;
  const [products, solutions, technologies, articles, downloads, leads, events] = await Promise.all([
    prisma.product.count(),
    prisma.solution.count(),
    prisma.technology.count(),
    prisma.article.count(),
    prisma.download.count(),
    prisma.lead.count(),
    prisma.analyticsEvent.groupBy({
      by: ["name"],
      _count: true,
      where: { createdAt: { gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) } },
    }),
  ]);
  const recentLeads = await prisma.lead.findMany({ orderBy: { createdAt: "desc" }, take: 5 });
  const cards = [
    ["产品", products],
    ["方案", solutions],
    ["技术", technologies],
    ["文章", articles],
    ["下载", downloads],
    ["线索", leads],
  ];
  return (
    <div>
      <h1 className="text-2xl font-semibold">仪表盘</h1>
      {denied ? <p className="mt-3 text-sm text-red-700">当前角色不能打开那个栏目。</p> : null}
      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        {cards.map(([label, count]) => (
          <div key={String(label)} className="rounded-lg border border-zinc-200 bg-white p-4">
            <p className="text-sm text-zinc-500">{label}</p>
            <p className="mt-1 text-3xl">{count}</p>
          </div>
        ))}
      </div>
      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <section className="rounded-lg border border-zinc-200 bg-white p-4">
          <h2 className="font-medium">最近线索</h2>
          <ul className="mt-3 grid gap-2 text-sm">
            {recentLeads.map((lead) => (
              <li key={lead.id}>
                {lead.name} · {lead.email} · {lead.status}
              </li>
            ))}
            {!recentLeads.length ? <li className="text-zinc-500">还没有线索</li> : null}
          </ul>
        </section>
        <section className="rounded-lg border border-zinc-200 bg-white p-4">
          <h2 className="font-medium">近 7 天事件</h2>
          <ul className="mt-3 grid gap-2 text-sm">
            {events.map((event) => (
              <li key={event.name}>
                {event.name} · {event._count}
              </li>
            ))}
            {!events.length ? <li className="text-zinc-500">还没有事件</li> : null}
          </ul>
        </section>
      </div>
    </div>
  );
}
