import Link from "next/link";
import { notFound } from "next/navigation";
import { DeleteButton } from "@/components/admin/delete-button";
import { Area, Check, Field, Notice, Relations, SelectField, statusOptions } from "@/components/admin/ui";
import { prisma } from "@/lib/prisma";
import { deleteArticle, saveArticle } from "@/server/editorial";
import { guard } from "@/server/guard";

export default async function ArticleEdit({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ saved?: string; error?: string }>;
}) {
  await guard("blog");
  const { id } = await params;
  const query = await searchParams;
  const row = id === "new" ? null : await prisma.article.findUnique({ where: { id }, include: { translations: true, products: true, technologies: true, solutions: true } });
  if (id !== "new" && !row) notFound();
  const [products, technologies, solutions] = await Promise.all([
    prisma.product.findMany({ include: { translations: true } }),
    prisma.technology.findMany({ include: { translations: true } }),
    prisma.solution.findMany({ include: { translations: true } }),
  ]);
  const en = row?.translations.find((item) => item.locale === "en");
  const zh = row?.translations.find((item) => item.locale === "zh");
  const label = (rows: { locale: string; name: string }[]) => rows.find((item) => item.locale === "zh")?.name || rows[0]?.name || "";
  return (
    <div className="max-w-5xl">
      <div className="mb-4 flex justify-between">
        <h1 className="text-2xl font-semibold">{en?.title || "文章"}</h1>
        {en ? <Link className="text-sm text-teal-800" href={`/en/blog/${en.slug}?preview=1`}>预览</Link> : null}
      </div>
      <Notice saved={query.saved} error={query.error} />
      <form action={saveArticle.bind(null, id)} className="grid gap-5 rounded-lg border border-zinc-200 bg-white p-5">
        <div className="grid gap-4 md:grid-cols-4">
          <SelectField label="状态" name="status" defaultValue={row?.status || "DRAFT"} options={statusOptions} />
          <Field label="作者" name="author" defaultValue={row?.author || "NFCTEC"} />
          <Field label="分类" name="category" defaultValue={row?.category} />
          <Field label="标签，逗号分隔" name="tags" defaultValue={row?.tags.join(", ")} />
        </div>
        <Check label="精选" name="featured" defaultChecked={row?.featured} />
        <Field label="封面地址" name="coverImage" defaultValue={row?.coverImage} />
        <div className="grid gap-6 lg:grid-cols-2">
          {(["en", "zh"] as const).map((locale) => {
            const text = locale === "en" ? en : zh;
            return (
              <fieldset key={locale} className="grid gap-3">
                <legend className="font-medium">{locale === "en" ? "English" : "中文"}</legend>
                <Field label="标题" name={`${locale}_title`} defaultValue={text?.title} required={locale === "en"} />
                <Field label="链接标识" name={`${locale}_slug`} defaultValue={text?.slug} />
                <Area label="摘要" name={`${locale}_excerpt`} defaultValue={text?.excerpt} rows={3} />
                <Area label="正文 Markdown" name={`${locale}_content`} defaultValue={text?.content} rows={14} />
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
        <Relations title="相关方案" name="solutionIds" selected={row?.solutions.map((item) => item.solutionId) || []} options={solutions.map((item) => ({ id: item.id, label: label(item.translations) }))} />
        <button className="h-10 rounded-md bg-teal-800 text-sm text-white" type="submit">保存</button>
      </form>
      {row ? <div className="mt-4"><DeleteButton action={deleteArticle.bind(null, row.id)} /></div> : null}
    </div>
  );
}
