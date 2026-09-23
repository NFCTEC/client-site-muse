import { Field, Notice } from "@/components/admin/ui";
import { leadNotifyEmail } from "@/lib/mail";
import { saveSettings } from "@/server/site";
import { guard } from "@/server/guard";

export default async function SettingsAdmin({ searchParams }: { searchParams: Promise<{ saved?: string; error?: string }> }) {
  await guard("settings");
  const query = await searchParams;
  const email = await leadNotifyEmail();
  return (
    <div className="max-w-xl">
      <h1 className="mb-4 text-2xl font-semibold">设置</h1>
      <Notice saved={query.saved} error={query.error} />
      <form action={saveSettings} className="grid gap-4 rounded-lg border border-zinc-200 bg-white p-4">
        <Field label="线索通知邮箱" name="lead_notify_email" type="email" defaultValue={email} />
        <p className="text-sm text-zinc-500">邮件发出还需要在环境变量里配置 SMTP。收件地址不写进页面代码。</p>
        <Field label="当前密码" name="currentPassword" type="password" />
        <Field label="新密码" name="newPassword" type="password" />
        <button className="h-10 rounded-md bg-teal-800 text-sm text-white" type="submit">保存</button>
      </form>
    </div>
  );
}
