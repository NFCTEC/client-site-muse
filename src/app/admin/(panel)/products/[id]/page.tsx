import Link from "next/link";
import { notFound } from "next/navigation";
import { DeleteButton } from "@/components/admin/delete-button";
import { Area, Check, Field, Notice, Relations, SelectField, statusOptions } from "@/components/admin/ui";
import { prisma } from "@/lib/prisma";
import { asStringArray, joinLines, joinSpecs } from "@/lib/utils";
import { deleteProduct, saveProduct } from "@/server/catalog";
import { guard } from "@/server/guard";

export default async function ProductEdit({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ saved?: string; error?: string }>;
}) {
  await guard("products");
  const { id } = await params;
  const query = await searchParams;
  const product = id === "new" ? null : await prisma.product.findUnique({ where: { id }, include: { translations: true, technologies: true, solutions: true } });
  if (id !== "new" && !product) notFound();
  const [technologies, solutions] = await Promise.all([
    prisma.technology.findMany({ include: { translations: true }, orderBy: { sortOrder: "asc" } }),
    prisma.solution.findMany({ include: { translations: true }, orderBy: { sortOrder: "asc" } }),
  ]);
  const en = product?.translations.find((item) => item.locale === "en");
  const zh = product?.translations.find((item) => item.locale === "zh");
  const label = (rows: { locale: string; name: string }[]) => rows.find((item) => item.locale === "zh")?.name || rows.find((item) => item.locale === "en")?.name || "";
  return (
    <div className="max-w-5xl">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">{product ? en?.name || "编辑产品" : "新产品"}</h1>
        {en ? (
          <Link className="text-sm text-teal-800" href={`/en/products/${en.slug}?preview=1`} target="_blank">
            预览
          </Link>
        ) : null}
      </div>
      <Notice saved={query.saved} error={query.error} />
      <form action={saveProduct.bind(null, id)} className="grid gap-5 rounded-lg border border-zinc-200 bg-white p-5">
        <div className="grid gap-4 md:grid-cols-4">
          <SelectField label="类别" name="category" defaultValue={product?.category || "SOFTWARE"} options={[{ value: "SOFTWARE", label: "软件" }, { value: "HARDWARE", label: "硬件" }, { value: "CLOUD", label: "云" }]} />
          <SelectField label="状态" name="status" defaultValue={product?.status || "DRAFT"} options={statusOptions} />
          <Field label="排序" name="sortOrder" type="number" defaultValue={product?.sortOrder || 0} />
          <Check label="首页精选" name="featured" defaultChecked={product?.featured} />
        </div>
        <Field label="主图地址" name="heroImage" defaultValue={product?.heroImage} />
        <Area label="图集，每行一个地址" name="gallery" defaultValue={asStringArray(product?.gallery).join("\n")} rows={3} />
        <Field label="协议，逗号分隔" name="protocols" defaultValue={product?.supportedProtocols.join(", ")} />
        <Field label="芯片，逗号分隔" name="chips" defaultValue={product?.supportedChips.join(", ")} />
        <Field label="平台，逗号分隔" name="platforms" defaultValue={product?.platforms.join(", ")} />
        <Field label="文档链接" name="documentationUrl" defaultValue={product?.documentationUrl} />
        <div className="grid gap-6 lg:grid-cols-2">
          {(["en", "zh"] as const).map((locale) => {
            const text = locale === "en" ? en : zh;
            return (
              <fieldset key={locale} className="grid gap-3">
                <legend className="font-medium">{locale === "en" ? "English" : "中文"}</legend>
                <Field label="名称" name={`${locale}_name`} defaultValue={text?.name} required={locale === "en"} />
                <Field label="链接标识" name={`${locale}_slug`} defaultValue={text?.slug} />
                <Area label="摘要" name={`${locale}_shortDescription`} defaultValue={text?.shortDescription} rows={3} />
                <Area label="说明（Markdown）" name={`${locale}_description`} defaultValue={text?.description} rows={8} />
                <Area label="功能，每行一条" name={`${locale}_features`} defaultValue={joinLines(text?.features)} rows={4} />
                <Area label="规格，每行 名称: 值" name={`${locale}_specifications`} defaultValue={joinSpecs(text?.specifications)} rows={4} />
                <Field label="SEO 标题" name={`${locale}_seoTitle`} defaultValue={text?.seoTitle} />
                <Area label="SEO 描述" name={`${locale}_seoDescription`} defaultValue={text?.seoDescription} rows={2} />
                <Field label="Canonical" name={`${locale}_canonicalUrl`} defaultValue={text?.canonicalUrl} />
                <Field label="OG 图片" name={`${locale}_ogImage`} defaultValue={text?.ogImage} />
                <Field label="Robots" name={`${locale}_robots`} defaultValue={text?.robots || "index,follow"} />
              </fieldset>
            );
          })}
        </div>
        <Relations title="相关技术" name="technologyIds" selected={product?.technologies.map((item) => item.technologyId) || []} options={technologies.map((item) => ({ id: item.id, label: label(item.translations) }))} />
        <Relations title="相关方案" name="solutionIds" selected={product?.solutions.map((item) => item.solutionId) || []} options={solutions.map((item) => ({ id: item.id, label: label(item.translations) }))} />
        <button className="h-10 rounded-md bg-teal-800 text-sm text-white" type="submit">保存</button>
      </form>
      {product ? <div className="mt-4"><DeleteButton action={deleteProduct.bind(null, product.id)} /></div> : null}
    </div>
  );
}
