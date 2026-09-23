import { notFound } from "next/navigation";
import { DeleteButton } from "@/components/admin/delete-button";
import { Area, Field, Notice, SelectField, statusOptions } from "@/components/admin/ui";
import { prisma } from "@/lib/prisma";
import { formatBytes } from "@/lib/utils";
import { deleteDownload, saveDownload } from "@/server/editorial";
import { guard } from "@/server/guard";

const categories = ["SOFTWARE", "SDK", "DRIVERS", "FIRMWARE", "DATASHEETS", "MANUALS", "DEVELOPER_TOOLS"].map((value) => ({ value, label: value }));

export default async function DownloadEdit({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ saved?: string; error?: string }>;
}) {
  await guard("downloads");
  const { id } = await params;
  const query = await searchParams;
  const row = id === "new" ? null : await prisma.download.findUnique({ where: { id }, include: { translations: true } });
  if (id !== "new" && !row) notFound();
  const products = await prisma.product.findMany({ include: { translations: true }, orderBy: { sortOrder: "asc" } });
  const en = row?.translations.find((item) => item.locale === "en");
  const zh = row?.translations.find((item) => item.locale === "zh");
  return (
    <div className="max-w-4xl">
      <h1 className="mb-4 text-2xl font-semibold">{en?.name || "下载"}</h1>
      <Notice saved={query.saved} error={query.error} />
      <form action={saveDownload.bind(null, id)} className="grid gap-5 rounded-lg border border-zinc-200 bg-white p-5">
        <div className="grid gap-4 md:grid-cols-3">
          <SelectField label="类别" name="category" defaultValue={row?.category || "SOFTWARE"} options={categories} />
          <SelectField label="状态" name="status" defaultValue={row?.status || "DRAFT"} options={statusOptions} />
          <Field label="版本" name="version" defaultValue={row?.version} />
        </div>
        <Field label="平台" name="platform" defaultValue={row?.platform} />
        <Field label="文档链接" name="documentationUrl" defaultValue={row?.documentationUrl} />
        <SelectField
          label="关联产品"
          name="productId"
          defaultValue={row?.productId || ""}
          options={[{ value: "", label: "无" }, ...products.map((item) => ({ value: item.id, label: item.translations.find((text) => text.locale === "zh")?.name || item.translations[0]?.name || item.id }))]}
        />
        <label className="grid gap-1 text-sm">
          文件（zip、pdf、bin、hex、img 或图片，最大 32 MB）
          <input type="file" name="file" />
        </label>
        {row?.fileName ? <p className="text-sm text-zinc-500">当前文件：{row.fileName} · {formatBytes(row.fileSize)} · {row.checksum}</p> : null}
        <div className="grid gap-6 lg:grid-cols-2">
          {(["en", "zh"] as const).map((locale) => {
            const text = locale === "en" ? en : zh;
            return (
              <fieldset key={locale} className="grid gap-3">
                <legend className="font-medium">{locale === "en" ? "English" : "中文"}</legend>
                <Field label="名称" name={`${locale}_name`} defaultValue={text?.name} required={locale === "en"} />
                <Field label="链接标识" name={`${locale}_slug`} defaultValue={text?.slug} />
                <Area label="发布说明（Markdown）" name={`${locale}_releaseNotes`} defaultValue={text?.releaseNotes} rows={8} />
              </fieldset>
            );
          })}
        </div>
        <button className="h-10 rounded-md bg-teal-800 text-sm text-white" type="submit">保存</button>
      </form>
      {row ? <div className="mt-4"><DeleteButton action={deleteDownload.bind(null, row.id)} /></div> : null}
    </div>
  );
}
