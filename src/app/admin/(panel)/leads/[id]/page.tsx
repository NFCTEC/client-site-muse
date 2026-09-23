import { notFound } from "next/navigation";
import { Area, Field, Notice, SelectField } from "@/components/admin/ui";
import { prisma } from "@/lib/prisma";
import { saveLead } from "@/server/site";
import { guard } from "@/server/guard";

const statuses = [
  { value: "NEW", label: "新线索" },
  { value: "CONTACTED", label: "已联系" },
  { value: "QUALIFIED", label: "已确认" },
  { value: "CONVERTED", label: "已转化" },
  { value: "CLOSED", label: "已关闭" },
];

export default async function LeadEdit({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ saved?: string }>;
}) {
  await guard("leads");
  const { id } = await params;
  const lead = await prisma.lead.findUnique({ where: { id } });
  if (!lead) notFound();
  const users = await prisma.user.findMany({ orderBy: { name: "asc" } });
  const saved = (await searchParams).saved;
  return (
    <div className="max-w-3xl">
      <h1 className="mb-4 text-2xl font-semibold">{lead.name}</h1>
      <Notice saved={saved} />
      <dl className="grid gap-2 rounded-lg border border-zinc-200 bg-white p-4 text-sm">
        <div>公司：{lead.company || "—"}</div>
        <div>邮箱：{lead.email}</div>
        <div>国家或地区：{lead.country || "—"}</div>
        <div>项目类型：{lead.projectType || "—"}</div>
        <div>感兴趣的产品：{lead.interestedProduct || "—"}</div>
        <div className="whitespace-pre-wrap">留言：{lead.message}</div>
        {lead.attachmentPath ? <a className="text-teal-800" href={`/api/admin/leads/${lead.id}/attachment`}>下载附件</a> : null}
      </dl>
      <form action={saveLead.bind(null, lead.id)} className="mt-4 grid gap-4 rounded-lg border border-zinc-200 bg-white p-4">
        <SelectField label="状态" name="status" defaultValue={lead.status} options={statuses} />
        <SelectField label="负责人" name="assignedToId" defaultValue={lead.assignedToId || ""} options={[{ value: "", label: "未分配" }, ...users.map((user) => ({ value: user.id, label: user.name }))]} />
        <Area label="内部备注" name="notes" defaultValue={lead.notes} />
        <button className="h-10 rounded-md bg-teal-800 text-sm text-white" type="submit">保存</button>
      </form>
    </div>
  );
}
