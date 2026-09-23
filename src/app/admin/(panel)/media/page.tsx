import { DeleteButton } from "@/components/admin/delete-button";
import { Field, Notice, SelectField } from "@/components/admin/ui";
import { prisma } from "@/lib/prisma";
import { formatBytes } from "@/lib/utils";
import { deleteMedia, saveMedia, updateMedia } from "@/server/editorial";
import { guard } from "@/server/guard";

const categories = ["PRODUCT_IMAGES", "BLOG_IMAGES", "TECHNOLOGY_IMAGES", "LOGOS", "DOCUMENTS", "DATASHEETS", "SCREENSHOTS", "VIDEOS"].map((value) => ({ value, label: value }));

export default async function MediaAdmin({ searchParams }: { searchParams: Promise<{ saved?: string; error?: string }> }) {
  await guard("media");
  const query = await searchParams;
  const media = await prisma.media.findMany({ orderBy: { createdAt: "desc" } });
  return (
    <div>
      <h1 className="text-2xl font-semibold">媒体库</h1>
      <Notice saved={query.saved} error={query.error} />
      <form action={saveMedia} className="mt-4 grid gap-3 rounded-lg border border-zinc-200 bg-white p-4 md:grid-cols-4">
        <Field label="标题" name="title" />
        <Field label="替代文本" name="alt" />
        <SelectField label="分类" name="category" defaultValue="PRODUCT_IMAGES" options={categories} />
        <label className="grid gap-1 text-sm">图片<input required type="file" name="file" accept="image/jpeg,image/png,image/webp,image/gif,image/avif" /></label>
        <button className="h-10 rounded-md bg-teal-800 text-sm text-white md:col-span-4" type="submit">上传</button>
      </form>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {media.map((item) => (
          <article key={item.id} className="rounded-lg border border-zinc-200 bg-white p-3">
            <img src={`/api/media/file/${item.id}`} alt={item.alt} className="h-40 w-full rounded object-cover" />
            <form action={updateMedia.bind(null, item.id)} className="mt-3 grid gap-2">
              <Field label="标题" name="title" defaultValue={item.title} />
              <Field label="替代文本" name="alt" defaultValue={item.alt} />
              <SelectField label="分类" name="category" defaultValue={item.category} options={categories} />
              <p className="break-all text-xs text-zinc-500">{formatBytes(item.size)} · {item.width}×{item.height}</p>
              <input readOnly value={`/api/media/file/${item.id}`} className="h-9 rounded border px-2 text-xs" aria-label="文件地址" />
              <button className="h-9 rounded-md border text-sm" type="submit">更新文字</button>
            </form>
            <div className="mt-2"><DeleteButton action={deleteMedia.bind(null, item.id)} /></div>
          </article>
        ))}
      </div>
    </div>
  );
}
