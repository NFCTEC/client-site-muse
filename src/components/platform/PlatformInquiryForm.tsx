import { useRef, useState } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { submitInquiry } from "@/lib/cms";
import { SALES_EMAIL } from "@/lib/contact";
import type { Locale } from "@/lib/locale";

type Intent = "enterprise" | "private";

export function PlatformInquiryForm({ locale, intent }: { locale: Locale; intent: Intent }) {
  const zh = locale === "zh";
  const openedAt = useRef(Date.now());
  const [done, setDone] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(false);
    const fd = new FormData(e.currentTarget);
    const get = (key: string) => String(fd.get(key) || "").trim();
    if (get("website")) {
      setError(true);
      return;
    }
    if (Date.now() - openedAt.current < 2500) {
      setError(true);
      return;
    }
    setLoading(true);
    const subject =
      intent === "private"
        ? "NFCTEC Platform private deployment"
        : "NFCTEC Platform enterprise";
    const note = get("message");
    const message = [
      `Industry: ${get("industry") || "-"}`,
      `Estimated annual NFC volume: ${get("volume") || "-"}`,
      `Number of factories: ${get("factories") || "-"}`,
      `Integration: ${get("integration") || "-"}`,
      "",
      note || subject,
    ].join("\n");

    try {
      await submitInquiry({
        name: get("name"),
        company: get("company"),
        email: get("email"),
        country: get("country"),
        subject,
        message,
      });
      setDone(true);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  if (done) {
    return (
      <div className="rounded-2xl border border-border bg-card-gradient p-8 text-center">
        <CheckCircle2 size={40} className="mx-auto text-primary mb-4" />
        <p className="font-display text-xl">{zh ? "已提交。销售会按邮件回复。" : "Sent. Sales will reply by email."}</p>
      </div>
    );
  }

  const label = (text: string, name: string, required = false, type = "text") => (
    <label className="block">
      <span className="block text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
        {text}
        {required && <span className="text-primary ml-1">*</span>}
      </span>
      <input
        name={name}
        type={type}
        required={required}
        className="w-full rounded-xl border border-border bg-background/60 px-4 py-3 text-sm outline-none focus:border-primary"
      />
    </label>
  );

  return (
    <form onSubmit={handleSubmit} className="relative rounded-2xl border border-border bg-card-gradient p-6 sm:p-8">
      {error && (
        <p className="mb-4 text-sm text-destructive">
          {zh ? "提交失败。请重试，或直接写信至 " : "The form did not go through. Try again, or email "}
          <a className="underline" href={`mailto:${SALES_EMAIL}`}>{SALES_EMAIL}</a>
          {zh ? "。" : "."}
        </p>
      )}
      <p className="mb-5 text-sm text-muted-foreground">
        {zh
          ? "必填姓名和工作邮箱。提交走网站现有询盘接口。失败时不会显示成功。"
          : "Name and business email are required. This posts to the site inquiry API. A failed submit is not shown as sent."}
      </p>
      <div className="absolute -left-[9999px] h-0 overflow-hidden" aria-hidden="true">
        <label>
          Website
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <div className="grid sm:grid-cols-2 gap-5">
        {label(zh ? "联系人" : "Name", "name", true)}
        {label(zh ? "工作邮箱" : "Business Email", "email", true, "email")}
        {label(zh ? "公司" : "Company", "company")}
        {label(zh ? "国家或地区" : "Country", "country")}
        {label(zh ? "行业" : "Industry", "industry")}
        {label(zh ? "预计年 NFC 用量" : "Estimated Annual NFC Volume", "volume")}
        {label(zh ? "工厂数量" : "Number of Factories", "factories")}
      </div>
      <label className="block mt-5">
        <span className="block text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
          {zh ? "集成需求" : "Integration Requirements"}
        </span>
        <input name="integration" className="w-full rounded-xl border border-border bg-background/60 px-4 py-3 text-sm outline-none focus:border-primary" />
      </label>
      <label className="block mt-5">
        <span className="block text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
          {zh ? "补充说明" : "Message"}
        </span>
        <textarea name="message" rows={5} maxLength={2000} className="w-full rounded-xl border border-border bg-background/60 px-4 py-3 text-sm outline-none focus:border-primary resize-none" />
      </label>
      <button
        type="submit"
        disabled={loading}
        className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-7 py-3.5 text-sm font-semibold hover:opacity-90 disabled:opacity-60"
      >
        {loading ? (zh ? "提交中" : "Sending") : zh ? "提交咨询" : "Submit"} <ArrowRight size={16} />
      </button>
    </form>
  );
}
