import Link from "next/link";
import { headers } from "next/headers";

export default async function NotFound() {
  const pathname = (await headers()).get("x-pathname") || "";
  const zh = pathname.startsWith("/zh");
  const locale = zh ? "zh" : "en";
  return (
    <main className="mx-auto flex min-h-[70vh] max-w-3xl flex-col justify-center px-5">
      <p className="text-sm text-accent">404</p>
      <h1 className="mt-3 text-4xl">{zh ? "页面不存在" : "Page not found"}</h1>
      <p className="mt-3 text-muted">{zh ? "这个地址不是已发布的 NFCTEC 页面。" : "This address is not a published NFCTEC page."}</p>
      <Link href={`/${locale}`} className="mt-6 text-sm text-accent">
        {zh ? "返回首页" : "Back to homepage"}
      </Link>
    </main>
  );
}
