import Link from "next/link";
import { redirect } from "next/navigation";
import { auth, signOut } from "@/auth";
import { modulesFor, type Module } from "@/lib/permissions";

const links: { href: string; label: string; module: Module }[] = [
  { href: "/admin", label: "仪表盘", module: "dashboard" },
  { href: "/admin/products", label: "产品", module: "products" },
  { href: "/admin/solutions", label: "方案", module: "solutions" },
  { href: "/admin/technologies", label: "技术", module: "technologies" },
  { href: "/admin/developer", label: "开发者", module: "developer" },
  { href: "/admin/blog", label: "博客", module: "blog" },
  { href: "/admin/downloads", label: "下载", module: "downloads" },
  { href: "/admin/media", label: "媒体", module: "media" },
  { href: "/admin/pages", label: "页面", module: "pages" },
  { href: "/admin/leads", label: "线索", module: "leads" },
  { href: "/admin/homepage", label: "首页", module: "homepage" },
  { href: "/admin/navigation", label: "导航", module: "navigation" },
  { href: "/admin/seo", label: "SEO", module: "seo" },
  { href: "/admin/redirects", label: "重定向", module: "redirects" },
  { href: "/admin/settings", label: "设置", module: "settings" },
  { href: "/admin/users", label: "用户", module: "users" },
];

async function logout() {
  "use server";
  await signOut({ redirectTo: "/admin/login" });
}

export async function AdminShell({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session?.user) redirect("/admin/login");
  const allowed = new Set(modulesFor(session.user.role));
  return (
    <div className="min-h-screen bg-zinc-100 text-zinc-900">
      <div className="grid min-h-screen lg:grid-cols-[220px_1fr]">
        <aside className="bg-zinc-950 text-zinc-100">
          <div className="border-b border-white/10 px-4 py-4">
            <Link href="/admin" className="font-semibold">
              NFCTEC 后台
            </Link>
          </div>
          <nav className="grid gap-1 p-3 text-sm" aria-label="后台">
            {links
              .filter((item) => allowed.has(item.module))
              .map((item) => (
                <Link key={item.href} href={item.href} className="rounded px-3 py-2 hover:bg-white/10">
                  {item.label}
                </Link>
              ))}
          </nav>
        </aside>
        <div>
          <header className="flex items-center justify-between border-b border-zinc-200 bg-white px-5 py-3">
            <form action="/admin/search">
              <label className="sr-only" htmlFor="admin-q">
                搜索
              </label>
              <input id="admin-q" name="q" placeholder="搜索内容" className="h-9 w-56 rounded-md border border-zinc-300 px-3 text-sm" />
            </form>
            <div className="flex items-center gap-3 text-sm">
              <span>{session.user.name}</span>
              <form action={logout}>
                <button type="submit" className="text-zinc-600">
                  退出
                </button>
              </form>
            </div>
          </header>
          <div className="px-5 py-6">{children}</div>
        </div>
      </div>
    </div>
  );
}
