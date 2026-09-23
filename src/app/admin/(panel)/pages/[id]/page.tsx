import { notFound } from "next/navigation";
import { DeleteButton } from "@/components/admin/delete-button";
import { Area, Field, Notice, SelectField, statusOptions } from "@/components/admin/ui";
import { prisma } from "@/lib/prisma";
import { deletePage, savePage } from "@/server/editorial";
import { guard } from "@/server/guard";

export default async function PageEdit({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ saved?: string; error?: string }>;
}) {
  await guard("pages");
  const { id } = await params;
  const query = await searchParams;
  const row = id === "new" ? null : await prisma.page.findUnique({ where: { id }, include: { translations: true } });
  if (id !== "new" && !row) notFound();
  const en = row?.translations.find((item) => item.locale === "en");
  const zh = row?.translations.find((item) => item.locale === "zh");
  return (
    <div className="max-w-5xl">
      <h1 className="mb-4 text-2xl font-semibold">{row?.key || "新页面"}</h1>
      <Notice saved={query.saved} error={query.error} />
      <form action={savePage.bind(null, id)} className="grid gap-5 rounded-lg border border-zinc-200 bg-white p-5">
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="页面键，例如 about" name="key" defaultValue={row?.key} required />
          <SelectField label="状态" name="status" defaultValue={row?.status || "PUBLISHED"} options={statusOptions} />
        </div>
        <div className="grid gap-6 lg:grid-cols-2">
          {(["en", "zh"] as const).map((locale) => {
            const text = locale === "en" ? en : zh;
            return (
              <fieldset key={locale} className="grid gap-3">
                <legend className="font-medium">{locale === "en" ? "English" : "中文"}</legend>
                <Field label="标题" name={`${locale}_title`} defaultValue={text?.title} required={locale === "en"} />
                <Field label="链接标识" name={`${locale}_slug`} defaultValue={locale} />
                <Area label="导语" name={`${locale}_description`} defaultValue={text?.description} rows={2} />
                <Area label="正文 Markdown" name={`${locale}_body`} defaultValue={text?.body} rows={12} />
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
      {row ? <div className="mt-4"><DeleteButton action={deletePage.bind(null, row.id)} /></div> : null}
    </div>
  );
}
