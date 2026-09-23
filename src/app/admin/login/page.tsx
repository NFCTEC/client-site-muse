import { AuthError } from "next-auth";
import { redirect } from "next/navigation";
import { signIn } from "@/auth";

async function login(formData: FormData) {
  "use server";
  try {
    await signIn("credentials", {
      email: String(formData.get("email") || ""),
      password: String(formData.get("password") || ""),
      redirectTo: "/admin",
    });
  } catch (error) {
    if (error instanceof AuthError) redirect("/admin/login?error=1");
    throw error;
  }
}

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const error = (await searchParams).error;
  return (
    <main className="grid min-h-screen place-items-center bg-zinc-100 px-4">
      <form action={login} className="grid w-full max-w-sm gap-4 rounded-xl border border-zinc-200 bg-white p-6">
        <div>
          <h1 className="text-xl font-semibold">NFCTEC 后台</h1>
          <p className="mt-1 text-sm text-zinc-500">使用管理员账号登录</p>
        </div>
        {error ? <p className="text-sm text-red-700">邮箱或密码不正确，或尝试次数过多。</p> : null}
        <label className="grid gap-1 text-sm">
          邮箱
          <input name="email" type="email" required autoComplete="username" className="h-10 rounded-md border border-zinc-300 px-3" />
        </label>
        <label className="grid gap-1 text-sm">
          密码
          <input name="password" type="password" required autoComplete="current-password" className="h-10 rounded-md border border-zinc-300 px-3" />
        </label>
        <button className="h-10 rounded-md bg-teal-800 text-sm text-white" type="submit">
          登录
        </button>
      </form>
    </main>
  );
}
