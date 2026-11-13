import type { ReactNode } from "react";
import type { Locale } from "@/lib/locale";

function WindowChrome({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
      <div className="flex items-center gap-2 border-b border-border bg-muted/40 px-4 py-2.5">
        <span className="size-2.5 rounded-full bg-border" aria-hidden />
        <span className="size-2.5 rounded-full bg-border" aria-hidden />
        <span className="size-2.5 rounded-full bg-border" aria-hidden />
        <span className="ml-2 text-xs font-medium text-muted-foreground truncate">{title}</span>
      </div>
      <div className="p-4 sm:p-5">{children}</div>
    </div>
  );
}

export function PlatformDashboardScreen({ locale }: { locale: Locale }) {
  const zh = locale === "zh";
  const rows = [
    [zh ? "批次 A" : "Batch A", "487 / 500", zh ? "进行中" : "In progress"],
    [zh ? "批次 B" : "Batch B", "120 / 120", zh ? "已完成" : "Complete"],
    [zh ? "抽检" : "Sample QA", "10 / 10", zh ? "已完成" : "Complete"],
  ];

  return (
    <WindowChrome title={zh ? "NFCTEC Platform — 发行概览" : "NFCTEC Platform — Issuance"}>
      <div className="grid grid-cols-3 gap-2 sm:gap-3">
        {[
          [zh ? "计划" : "Planned", "620"],
          [zh ? "成功" : "Written", "607"],
          [zh ? "失败" : "Failed", "2"],
        ].map(([label, value]) => (
          <div key={label} className="rounded-lg border border-border bg-background px-3 py-2.5">
            <p className="text-[10px] uppercase tracking-wide text-muted-foreground">{label}</p>
            <p className="mt-0.5 font-display text-lg font-semibold tabular-nums">{value}</p>
          </div>
        ))}
      </div>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-[280px] text-left text-xs">
          <thead>
            <tr className="text-muted-foreground">
              <th className="pb-2 pr-3 font-medium">{zh ? "任务" : "Task"}</th>
              <th className="pb-2 pr-3 font-medium">{zh ? "进度" : "Progress"}</th>
              <th className="pb-2 font-medium">{zh ? "状态" : "Status"}</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(([task, prog, status]) => (
              <tr key={task} className="border-t border-border">
                <td className="py-2.5 pr-3 font-medium">{task}</td>
                <td className="py-2.5 pr-3 font-mono text-muted-foreground">{prog}</td>
                <td className="py-2.5">
                  <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary">{status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-3 font-mono text-[11px] text-muted-foreground">
        UID · 04A1······E5F6 · {zh ? "最近写卡" : "last write"}
      </p>
    </WindowChrome>
  );
}

export function PlatformClientScreen({ locale }: { locale: Locale }) {
  const zh = locale === "zh";
  return (
    <WindowChrome title={zh ? "NFCTEC 写卡客户端" : "NFCTEC Provisioning Client"}>
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 space-y-3">
          <p className="text-[10px] uppercase tracking-wide text-muted-foreground">{zh ? "当前任务" : "Active task"}</p>
          <p className="font-display text-base font-semibold">{zh ? "2026 春季批次 A" : "Spring 2026 — Batch A"}</p>
          <p className="text-sm text-muted-foreground">
            {zh ? "模板：NTAG424 · SUN URL · 已授权操作员" : "Template: NTAG424 · SUN URL · authorized operator"}
          </p>
          <div className="rounded-lg border border-primary/25 bg-primary/5 px-4 py-3">
            <p className="text-sm font-medium">{zh ? "请将 NFC 标签贴近读卡器" : "Tap the NFC tag on the reader"}</p>
            <div className="mt-3 h-2 rounded-full bg-border overflow-hidden">
              <div className="h-full w-[78%] rounded-full bg-primary" />
            </div>
            <p className="mt-2 text-xs text-muted-foreground">487 / 500</p>
          </div>
        </div>
        <div className="sm:w-36 shrink-0 rounded-xl border border-border bg-muted/30 p-4 flex flex-col items-center justify-center text-center">
          <div className="size-14 rounded-full border-2 border-dashed border-primary/40 grid place-items-center text-primary text-[10px] font-semibold">
            NFC
          </div>
          <p className="mt-3 text-xs font-medium text-primary">{zh ? "写卡成功" : "Write OK"}</p>
          <p className="mt-1 font-mono text-[10px] text-muted-foreground">04A1····E5F6</p>
        </div>
      </div>
    </WindowChrome>
  );
}

export function PlatformVerifyScreen({ locale }: { locale: Locale }) {
  const zh = locale === "zh";
  return (
    <WindowChrome title={zh ? "验真 API 响应" : "Verify API response"}>
      <div className="flex flex-col sm:flex-row sm:items-center gap-6">
        <div className="shrink-0">
          <p className="text-[10px] uppercase tracking-wide text-muted-foreground">{zh ? "结果" : "Result"}</p>
          <p className="mt-1 font-display text-3xl font-semibold tracking-tight text-primary">GENUINE</p>
        </div>
        <dl className="flex-1 grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
          <dt className="text-muted-foreground">UID</dt>
          <dd className="font-mono text-right">04A1····E5F6</dd>
          <dt className="text-muted-foreground">{zh ? "产品编号" : "Product"}</dt>
          <dd className="font-medium text-right">SKU-1001</dd>
          <dt className="text-muted-foreground">{zh ? "批次" : "Lot"}</dt>
          <dd className="text-right">2026-A01</dd>
          <dt className="text-muted-foreground">{zh ? "计数器" : "Counter"}</dt>
          <dd className="font-mono text-right">000042</dd>
        </dl>
      </div>
      <pre className="mt-4 overflow-x-auto rounded-lg bg-muted/50 p-3 text-[10px] leading-relaxed font-mono text-muted-foreground">
{`"result": "GENUINE",
"lifecycle": "IN_SERVICE"`}
      </pre>
    </WindowChrome>
  );
}
