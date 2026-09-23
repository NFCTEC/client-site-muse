import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { guard } from "@/server/guard";

const labels: Record<string, string> = { NEW: "新线索", CONTACTED: "已联系", QUALIFIED: "已确认", CONVERTED: "已转化", CLOSED: "已关闭" };

export default async function LeadsAdmin() {
  await guard("leads");
  const leads = await prisma.lead.findMany({ orderBy: { createdAt: "desc" } });
  return (
    <div>
      <h1 className="mb-4 text-2xl font-semibold">线索</h1>
      <div className="overflow-x-auto rounded-lg border border-zinc-200 bg-white">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="border-b bg-zinc-50 text-zinc-500">
            <tr>{["姓名", "公司", "邮箱", "状态", "时间"].map((item) => <th key={item} className="px-3 py-2 font-medium">{item}</th>)}</tr>
          </thead>
          <tbody>
            {leads.map((lead) => (
              <tr key={lead.id} className="border-b">
                <td className="px-3 py-2"><Link className="font-medium text-teal-900" href={`/admin/leads/${lead.id}`}>{lead.name}</Link></td>
                <td className="px-3 py-2">{lead.company}</td>
                <td className="px-3 py-2">{lead.email}</td>
                <td className="px-3 py-2">{labels[lead.status] || lead.status}</td>
                <td className="px-3 py-2">{lead.createdAt.toISOString().slice(0, 16).replace("T", " ")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
