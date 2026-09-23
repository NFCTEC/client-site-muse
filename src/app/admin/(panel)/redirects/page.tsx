import { DeleteButton } from "@/components/admin/delete-button";
import { Field, Notice } from "@/components/admin/ui";
import { prisma } from "@/lib/prisma";
import { deleteRedirect, saveRedirect } from "@/server/site";
import { guard } from "@/server/guard";

export default async function RedirectsAdmin({ searchParams }: { searchParams: Promise<{ saved?: string; error?: string }> }) {
  await guard("redirects");
  const query = await searchParams;
  const rows = await prisma.redirect.findMany({ orderBy: { fromPath: "asc" } });
  return (
    <div className="max-w-3xl">
      <h1 className="mb-2 text-2xl font-semibold">重定向</h1>
      <p className="mb-4 text-sm text-zinc-600">把旧网址永久转到新网址。只接受站内路径。</p>
      <Notice saved={query.saved} error={query.error} />
      <form action={saveRedirect} className="grid gap-3 rounded-lg border border-zinc-200 bg-white p-4">
        <Field label="旧路径" name="fromPath" required />
        <Field label="新路径" name="toPath" required />
        <Field label="备注" name="note" />
        <button className="h-10 rounded-md bg-teal-800 text-sm text-white" type="submit">添加</button>
      </form>
      <ul className="mt-4 grid gap-2">
        {rows.map((row) => (
          <li key={row.id} className="flex items-center justify-between rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm">
            <span>{row.fromPath} → {row.toPath}</span>
            <DeleteButton action={deleteRedirect.bind(null, row.id)} />
          </li>
        ))}
      </ul>
    </div>
  );
}
