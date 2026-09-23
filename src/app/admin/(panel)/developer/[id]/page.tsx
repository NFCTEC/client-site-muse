import { notFound } from "next/navigation";
import { DeleteButton } from "@/components/admin/delete-button";
import { Area, Check, Field, Notice, Relations, SelectField, statusOptions } from "@/components/admin/ui";
import { prisma } from "@/lib/prisma";
import { joinLines } from "@/lib/utils";
import { deleteTool, saveTool } from "@/server/catalog";
import { guard } from "@/server/guard";

export default async function ToolEdit({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ saved?: string; error?: string }>;
}) {
  await guard("developer");
  const { id } = await params;
  const query = await searchParams;
  const row = id === "new" ? null : await prisma.developerTool.findUnique({ where: { id }, include: { translations: true, products: true, technologies: true } });
  if (id !== "new" && !row) notFound();
  const [products, technologies] = await Promise.all([
    prisma.product.findMany({ include: { translations: true } }),
    prisma.technology.findMany({ include: { translations: true } }),
  ]);
  const en = row?.translations.find((item) => item.locale === "en");
  const zh = row?.translations.find((item) => item.locale === "zh");
  const label = (rows: { locale: string; name: string }[]) => rows.find((item) => item.locale === "zh")?.name || rows[0]?.name || "";
  return (
    <div className="max-w-5xl">
      <h1 className="mb-4 text-2xl font-semibold">{en?.name || "开发者资源"}</h1>
      <Notice saved={query.saved} error={query.error} />
      <form action={saveTool.bind(null, id)} className="grid gap-5 rounded-lg border border-zinc-200 bg-white p-5">
        <div className="grid gap-4 md:grid-cols-4">
          <SelectField label="类型" name="kind" defaultValue={row?.kind || "TOOL"} options={[{ value: "SDK", label: "SDK" }, { value: "TOOL", label: "工具" }, { value: "API", label: "API" }, { value: "DOCUMENTATION", label: "文档" }]} />
          <SelectField label="状态" name="status" defaultValue={row?.status || "DRAFT"} options={statusOptions} />
          <Field label="版本" name="version" defaultValue={row?.version} />
          <Field label="排序" name="sortOrder" type="number" defaultValue={row?.sortOrder || 0} />
        </div>
        <Check label="首页展示" name="featured" defaultChecked={row?.featured} />
        <Field label="平台，逗号分隔" name="platforms" defaultValue={row?.platforms.join(", ")} />
        <Field label="下载地址" name="downloadUrl" defaultValue={row?.downloadUrl} />
        <Field label="文档地址" name="documentationUrl" defaultValue={row?.documentationUrl} />
        <div className="grid gap-6 lg:grid-cols-2">
          {(["en", "zh"] as const).map((locale) => {
            const text = locale === "en" ? en : zh;
            return (
              <fieldset key={locale} className="grid gap-3">
                <legend className="font-medium">{locale === "en" ? "English" : "中文"}</legend>
                <Field label="名称" name={`${locale}_name`} defaultValue={text?.name} required={locale === "en"} />
                <Field label="链接标识" name={`${locale}_slug`} defaultValue={text?.slug} />
                <Area label="说明" name={`${locale}_description`} defaultValue={text?.description} />
                <Area label="功能，每行一条" name={`${locale}_features`} defaultValue={joinLines(text?.features)} rows={4} />
                <Field label="SEO 标题" name={`${locale}_seoTitle`} defaultValue={text?.seoTitle} />
                <Area label="SEO 描述" name={`${locale}_seoDescription`} defaultValue={text?.seoDescription} rows={2} />
                <Field label="Canonical" name={`${locale}_canonicalUrl`} defaultValue={text?.canonicalUrl} />
                <Field label="OG 图片" name={`${locale}_ogImage`} defaultValue={text?.ogImage} />
                <Field label="Robots" name={`${locale}_robots`} defaultValue={text?.robots || "index,follow"} />
              </fieldset>
            );
          })}
        </div>
        <Relations title="相关产品" name="productIds" selected={row?.products.map((item) => item.productId) || []} options={products.map((item) => ({ id: item.id, label: label(item.translations) }))} />
        <Relations title="相关技术" name="technologyIds" selected={row?.technologies.map((item) => item.technologyId) || []} options={technologies.map((item) => ({ id: item.id, label: label(item.translations) }))} />
        <button className="h-10 rounded-md bg-teal-800 text-sm text-white" type="submit">保存</button>
      </form>
      {row ? <div className="mt-4"><DeleteButton action={deleteTool.bind(null, row.id)} /></div> : null}
    </div>
  );
}
