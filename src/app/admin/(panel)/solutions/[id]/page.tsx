import Link from "next/link";
import { notFound } from "next/navigation";
import { DeleteButton } from "@/components/admin/delete-button";
import { Area, Field, Notice, Relations, SelectField, statusOptions } from "@/components/admin/ui";
import { prisma } from "@/lib/prisma";
import { joinLines } from "@/lib/utils";
import { deleteSolution, saveSolution } from "@/server/catalog";
import { guard } from "@/server/guard";

const categories = [
  { value: "PAYMENT", label: "支付" },
  { value: "IDENTITY", label: "身份" },
  { value: "ACCESS_CONTROL", label: "门禁" },
  { value: "BRAND_PROTECTION", label: "品牌保护" },
  { value: "TRANSIT", label: "交通" },
  { value: "IOT", label: "物联网" },
];

export default async function SolutionEdit({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ saved?: string; error?: string }>;
}) {
  await guard("solutions");
  const { id } = await params;
  const query = await searchParams;
  const row = id === "new" ? null : await prisma.solution.findUnique({ where: { id }, include: { translations: true, technologies: true, products: true } });
  if (id !== "new" && !row) notFound();
  const [technologies, products] = await Promise.all([
    prisma.technology.findMany({ include: { translations: true }, orderBy: { sortOrder: "asc" } }),
    prisma.product.findMany({ include: { translations: true }, orderBy: { sortOrder: "asc" } }),
  ]);
  const en = row?.translations.find((item) => item.locale === "en");
  const zh = row?.translations.find((item) => item.locale === "zh");
  const label = (rows: { locale: string; name: string }[]) => rows.find((item) => item.locale === "zh")?.name || rows[0]?.name || "";
  return (
    <div className="max-w-5xl">
      <div className="mb-4 flex justify-between">
        <h1 className="text-2xl font-semibold">{en?.name || "方案"}</h1>
        {en ? <Link className="text-sm text-teal-800" href={`/en/solutions/${en.slug}?preview=1`}>预览</Link> : null}
      </div>
      <Notice saved={query.saved} error={query.error} />
      <form action={saveSolution.bind(null, id)} className="grid gap-5 rounded-lg border border-zinc-200 bg-white p-5">
        <div className="grid gap-4 md:grid-cols-3">
          <SelectField label="类别" name="category" defaultValue={row?.category || "PAYMENT"} options={categories} />
          <SelectField label="状态" name="status" defaultValue={row?.status || "DRAFT"} options={statusOptions} />
          <Field label="排序" name="sortOrder" type="number" defaultValue={row?.sortOrder || 0} />
        </div>
        <Field label="主图地址" name="heroImage" defaultValue={row?.heroImage} />
        <div className="grid gap-6 lg:grid-cols-2">
          {(["en", "zh"] as const).map((locale) => {
            const text = locale === "en" ? en : zh;
            return (
              <fieldset key={locale} className="grid gap-3">
                <legend className="font-medium">{locale === "en" ? "English" : "中文"}</legend>
                <Field label="名称" name={`${locale}_name`} defaultValue={text?.name} required={locale === "en"} />
                <Field label="链接标识" name={`${locale}_slug`} defaultValue={text?.slug} />
                <Area label="导语" name={`${locale}_heroDescription`} defaultValue={text?.heroDescription} rows={3} />
                <Area label="问题" name={`${locale}_problem`} defaultValue={text?.problem} />
                <Area label="工程范围" name={`${locale}_solutionText`} defaultValue={text?.solutionText} />
                <Area label="架构" name={`${locale}_architecture`} defaultValue={text?.architecture} />
                <Area label="安全" name={`${locale}_security`} defaultValue={text?.security} />
                <Area label="交付" name={`${locale}_deployment`} defaultValue={text?.deployment} />
                <Area label="场景，每行一条" name={`${locale}_useCases`} defaultValue={joinLines(text?.useCases)} rows={3} />
                <Field label="SEO 标题" name={`${locale}_seoTitle`} defaultValue={text?.seoTitle} />
                <Area label="SEO 描述" name={`${locale}_seoDescription`} defaultValue={text?.seoDescription} rows={2} />
                <Field label="Canonical" name={`${locale}_canonicalUrl`} defaultValue={text?.canonicalUrl} />
                <Field label="OG 图片" name={`${locale}_ogImage`} defaultValue={text?.ogImage} />
                <Field label="Robots" name={`${locale}_robots`} defaultValue={text?.robots || "index,follow"} />
              </fieldset>
            );
          })}
        </div>
        <Relations title="相关技术" name="technologyIds" selected={row?.technologies.map((item) => item.technologyId) || []} options={technologies.map((item) => ({ id: item.id, label: label(item.translations) }))} />
        <Relations title="相关产品" name="productIds" selected={row?.products.map((item) => item.productId) || []} options={products.map((item) => ({ id: item.id, label: label(item.translations) }))} />
        <button className="h-10 rounded-md bg-teal-800 text-sm text-white" type="submit">保存</button>
      </form>
      {row ? <div className="mt-4"><DeleteButton action={deleteSolution.bind(null, row.id)} /></div> : null}
    </div>
  );
}
