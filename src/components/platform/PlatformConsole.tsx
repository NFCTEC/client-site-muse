import type { Locale } from "@/lib/locale";

/** Layout of the live console using its own labels. No customer screenshot is published. */
export function PlatformConsole({ locale }: { locale: Locale }) {
  const zh = locale === "zh";
  const rows = [
    { label: zh ? "发行任务" : "Issuance task", value: zh ? "计划张数 · 成功 · 失败" : "Planned · written · failed" },
    { label: zh ? "标签" : "Tag", value: "04A1 ···· E5F6" },
    { label: zh ? "生命周期" : "Lifecycle", value: "IN_SERVICE" },
    { label: zh ? "验真结果" : "Verify result", value: "GENUINE" },
  ];

  return (
    <figure className="platform-rise rounded-2xl border border-border bg-card-gradient p-5 sm:p-6">
      <figcaption className="text-xs text-muted-foreground leading-relaxed">
        {zh
          ? "登录后的控制台不提供可公开的截图。下面用平台自己的字段名，UID 已遮住。"
          : "The signed-in console is not published as a screenshot. These are the console’s own field names, with the UID masked."}
      </figcaption>
      <div className="mt-4 overflow-hidden rounded-xl border border-border bg-background/70" role="img" aria-label={zh ? "发行任务、标签状态和验真结果" : "Issuance task, tag state, and verification result"}>
        <div className="flex items-center justify-between gap-3 border-b border-border px-4 py-3">
          <p className="text-sm font-medium">{zh ? "发行与验真" : "Issuance and verification"}</p>
          <span className="rounded-full border border-primary/30 bg-primary/10 px-2 py-0.5 text-[11px] text-primary">NTAG424 DNA</span>
        </div>
        <dl className="divide-y divide-border">
          {rows.map((row) => (
            <div key={row.label} className="flex items-center justify-between gap-4 px-4 py-3 text-sm">
              <dt className="text-muted-foreground">{row.label}</dt>
              <dd className="font-medium text-right">{row.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </figure>
  );
}
