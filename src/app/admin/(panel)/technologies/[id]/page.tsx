import Link from "next/link";
import { notFound } from "next/navigation";
import { DeleteButton } from "@/components/admin/delete-button";
import { Area, Check, Field, Notice, SelectField, statusOptions } from "@/components/admin/ui";
import { prisma } from "@/lib/prisma";
import { joinLines } from "@/lib/utils";
import { deleteTechnology, saveTechnology } from "@/server/catalog";
import { guard } from "@/server/guard";

export default async function TechnologyEdit({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ saved?: string; error?: string }>;
}) {
  await guard("technologies");
  const { id } = await params;
  const query = await searchParams;
  const row = id === "new" ? null : await prisma.technology.findUnique({ where: { id }, include: { translations: true } });
  if (id !== "new" && !row) notFound();
  const parents = await prisma.technology.findMany({ where: { parentId: null, ...(id === "new" ? {} : { id: { not: id } }) }, include: { translations: true }, orderBy: { sortOrder: "asc" } });
  const en = row?.translations.find((item) => item.locale === "en");
  const zh = row?.translations.find((item) => item.locale === "zh");
  const label = (rows: { locale: string; name: string }[]) => rows.find((item) => item.locale === "zh")?.name || rows[0]?.name || "";
  return (
    <div className="max-w-5xl">
      <div className="mb-4 flex justify-between">
        <h1 className="text-2xl font-semibold">{en?.name || "技术"}</h1>
        {en ? <Link className="text-sm text-teal-800" href={`/en/technology/${en.slug}?preview=1`}>预览</Link> : null}
      </div>
      <Notice saved={query.saved} error={query.error} />
      <form action={saveTechnology.bind(null, id)} className="grid gap-5 rounded-lg border border-zinc-200 bg-white p-5">
        <div className="grid gap-4 md:grid-cols-4">
          <SelectField label="类别" name="category" defaultValue={row?.category || "NFC_RF"} options={[{ value: "NFC_RF", label: "NFC 与射频" }, { value: "SMART_CARDS", label: "智能卡" }, { value: "SECURITY_IDENTITY", label: "安全与身份" }]} />
          <SelectField label="上级" name="parentId" defaultValue={row?.parentId || ""} options={[{ value: "", label: "无" }, ...parents.map((item) => ({ value: item.id, label: label(item.translations) }))]} />
          <SelectField label="状态" name="status" defaultValue={row?.status || "DRAFT"} options={statusOptions} />
          <Field label="排序" name="sortOrder" type="number" defaultValue={row?.sortOrder || 0} />
        </div>
        <Check label="重点技术" name="featured" defaultChecked={row?.featured} />
        <Field label="协议，逗号分隔" name="protocols" defaultValue={row?.protocols.join(", ")} />
        <Field label="芯片，逗号分隔" name="chips" defaultValue={row?.chips.join(", ")} />
        <Field label="文档链接" name="documentationUrl" defaultValue={row?.documentationUrl} />
        <div className="grid gap-6 lg:grid-cols-2">
          {(["en", "zh"] as const).map((locale) => {
            const text = locale === "en" ? en : zh;
            return (
              <fieldset key={locale} className="grid gap-3">
                <legend className="font-medium">{locale === "en" ? "English" : "中文"}</legend>
                <Field label="名称" name={`${locale}_name`} defaultValue={text?.name} required={locale === "en"} />
                <Field label="链接标识" name={`${locale}_slug`} defaultValue={text?.slug} />
                <Area label="说明" name={`${locale}_description`} defaultValue={text?.description} />
                <Area label="能力，每行一条" name={`${locale}_capabilities`} defaultValue={joinLines(text?.capabilities)} rows={4} />
                <Field label="SEO 标题" name={`${locale}_seoTitle`} defaultValue={text?.seoTitle} />
                <Area label="SEO 描述" name={`${locale}_seoDescription`} defaultValue={text?.seoDescription} rows={2} />
                <Field label="Canonical" name={`${locale}_canonicalUrl`} defaultValue={text?.canonicalUrl} />
                <Field label="OG 图片" name={`${locale}_ogImage`} defaultValue={text?.ogImage} />
                <Field label="Robots" name={`${locale}_robots`} defaultValue={text?.robots || "index,follow"} />
              </fieldset>
            );
          })}
        </div>
        <button className="h-10 rounded-md bg-teal-800 text-sm text-white" type="submit">保存</button>
      </form>
      {row ? <div className="mt-4"><DeleteButton action={deleteTechnology.bind(null, row.id)} /></div> : null}
    </div>
  );
}
