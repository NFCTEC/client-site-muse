import { DeleteButton } from "@/components/admin/delete-button";
import { Field, Notice, SelectField } from "@/components/admin/ui";
import { prisma } from "@/lib/prisma";
import { deleteUser, saveUser } from "@/server/site";
import { guard } from "@/server/guard";

const roles = [
  { value: "SUPER_ADMIN", label: "超级管理员" },
  { value: "CONTENT_ADMIN", label: "内容管理员" },
  { value: "PRODUCT_MANAGER", label: "产品经理" },
  { value: "EDITOR", label: "编辑" },
  { value: "SALES", label: "销售" },
];

export default async function UsersAdmin({ searchParams }: { searchParams: Promise<{ saved?: string; error?: string }> }) {
  await guard("users");
  const query = await searchParams;
  const users = await prisma.user.findMany({ orderBy: { createdAt: "asc" } });
  return (
    <div className="max-w-3xl">
      <h1 className="mb-4 text-2xl font-semibold">用户</h1>
      <Notice saved={query.saved} error={query.error} />
      <form action={saveUser} className="grid gap-3 rounded-lg border border-zinc-200 bg-white p-4 md:grid-cols-2">
        <Field label="姓名" name="name" required />
        <Field label="邮箱" name="email" type="email" required />
        <Field label="密码" name="password" type="password" required />
        <SelectField label="角色" name="role" defaultValue="EDITOR" options={roles} />
        <button className="h-10 rounded-md bg-teal-800 text-sm text-white md:col-span-2" type="submit">创建用户</button>
      </form>
      <ul className="mt-4 grid gap-2">
        {users.map((user) => (
          <li key={user.id} className="flex items-center justify-between rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm">
            <span>{user.name} · {user.email} · {roles.find((role) => role.value === user.role)?.label}</span>
            <DeleteButton action={deleteUser.bind(null, user.id)} />
          </li>
        ))}
      </ul>
    </div>
  );
}
