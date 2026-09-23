import { DeleteButton } from "@/components/admin/delete-button";
import { Check, Field, Notice, SelectField } from "@/components/admin/ui";
import { prisma } from "@/lib/prisma";
import { addNavigation, deleteNavigation, saveNavigation } from "@/server/site";
import { guard } from "@/server/guard";

export default async function NavigationAdmin({ searchParams }: { searchParams: Promise<{ saved?: string; error?: string }> }) {
  await guard("navigation");
  const query = await searchParams;
  const items = await prisma.navItem.findMany({ include: { translations: true }, orderBy: [{ location: "asc" }, { sortOrder: "asc" }] });
  return (
    <div>
      <h1 className="mb-4 text-2xl font-semibold">导航</h1>
      <Notice saved={query.saved} error={query.error} />
      <form action={addNavigation} className="mb-6 grid gap-3 rounded-lg border border-zinc-200 bg-white p-4 md:grid-cols-6">
        <SelectField label="位置" name="location" defaultValue="HEADER" options={[{ value: "HEADER", label: "页头" }, { value: "FOOTER", label: "页脚" }]} />
        <SelectField label="上级" name="parentId" defaultValue="" options={[{ value: "", label: "无" }, ...items.map((item) => ({ value: item.id, label: item.translations.find((text) => text.locale === "zh")?.label || item.href }))]} />
        <Field label="链接" name="href" defaultValue="/" />
        <Field label="英文" name="en" />
        <Field label="中文" name="zh" />
        <Field label="排序" name="sortOrder" type="number" defaultValue={0} />
        <button className="h-10 rounded-md bg-teal-800 text-sm text-white md:col-span-6" type="submit">添加</button>
      </form>
      <form action={saveNavigation} className="grid gap-3">
        {items.map((item) => (
          <div key={item.id} className="grid gap-2 rounded-lg border border-zinc-200 bg-white p-3 md:grid-cols-6">
            <p className="text-xs text-zinc-500 md:col-span-6">{item.location}</p>
            <Field label="英文" name={`en_${item.id}`} defaultValue={item.translations.find((text) => text.locale === "en")?.label} />
            <Field label="中文" name={`zh_${item.id}`} defaultValue={item.translations.find((text) => text.locale === "zh")?.label} />
            <Field label="链接" name={`href_${item.id}`} defaultValue={item.href} />
            <Field label="排序" name={`sort_${item.id}`} type="number" defaultValue={item.sortOrder} />
            <Check label="显示" name={`visible_${item.id}`} defaultChecked={item.visible} />
            <Check label="强调按钮" name={`emphasis_${item.id}`} defaultChecked={item.emphasis} />
          </div>
        ))}
        <button className="h-10 rounded-md bg-teal-800 text-sm text-white" type="submit">保存导航</button>
      </form>
      <div className="mt-4 grid gap-2">
        {items.map((item) => (
          <div key={`delete-${item.id}`} className="flex items-center justify-between text-sm">
            <span>{item.translations.find((text) => text.locale === "zh")?.label}</span>
            <DeleteButton action={deleteNavigation.bind(null, item.id)} />
          </div>
        ))}
      </div>
    </div>
  );
}
