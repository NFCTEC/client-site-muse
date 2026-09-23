import { notFound } from "next/navigation";
import { Breadcrumb, PageHero } from "@/components/public/blocks";
import { getDictionary } from "@/i18n/dictionaries";
import { isLocale } from "@/i18n/config";
import { contactOptions } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { submitLead } from "@/server/leads";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return pageMetadata({
    title: getDictionary(locale).talk,
    description: getDictionary(locale).ctaBody,
    path: `/${locale}/contact`,
    languages: { en: "/en/contact", zh: "/zh/contact" },
  });
}

export default async function ContactPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ sent?: string; error?: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const labels = getDictionary(locale);
  const form = labels.contactForm;
  const query = await searchParams;
  const options = await contactOptions(locale);
  const notice =
    query.sent === "1" ? labels.formSent : query.error === "rate" ? labels.formRate : query.error === "file" ? labels.formFile : query.error ? labels.formError : "";
  return (
    <>
      <Breadcrumb locale={locale} items={[{ label: labels.home, href: "/" }, { label: labels.contact }]} />
      <PageHero eyebrow={labels.company} title={labels.talk} description={labels.ctaBody} />
      <div className="public-shell grid gap-10 py-14 md:grid-cols-[0.7fr_1.3fr] md:py-20">
        <aside>
          <p className="kicker">{locale === "zh" ? "项目沟通" : "Project inquiry"}</p>
          <h2 className="mt-4 text-2xl font-semibold tracking-[-0.025em]">{locale === "zh" ? "直接告诉我们你的工程需求" : "Tell us what you need to engineer"}</h2>
          <p className="mt-4 text-sm leading-7 text-muted">{locale === "zh" ? "可以包含协议、芯片、卡片、读卡器、SDK、身份或云端集成要求。" : "Include protocol, chip, card, reader, SDK, identity or cloud integration requirements."}</p>
          <div className="mt-8 border-t border-line pt-5 font-mono text-[11px] leading-7 text-muted">
            <p>NFC / RF</p><p>SMART CARD / APDU</p><p>SECURITY / IDENTITY</p><p>SOFTWARE / HARDWARE / CLOUD</p>
          </div>
        </aside>
        <div className="panel p-6 md:p-8">
        {notice ? <p className="mb-6 rounded-lg border border-line bg-paper px-4 py-3 text-sm" role="status">{notice}</p> : null}
        <form action={submitLead} className="grid gap-5 sm:grid-cols-2">
          <input type="hidden" name="locale" value={locale} />
          <label className="grid gap-1.5 text-sm font-medium">{form.name}<input required name="name" className="field h-12" /></label>
          <label className="grid gap-1.5 text-sm font-medium">{form.company}<input name="company" className="field h-12" /></label>
          <label className="grid gap-1.5 text-sm font-medium">{form.email}<input required type="email" name="email" className="field h-12" /></label>
          <label className="grid gap-1.5 text-sm font-medium">{form.country}<input name="country" className="field h-12" /></label>
          <label className="grid gap-1 text-sm">
            {form.projectType}
            <select name="projectType" className="field h-12">
              <option value="">{form.select}</option>
              {options.projectTypes.map((item) => <option key={item}>{item}</option>)}
            </select>
          </label>
          <label className="grid gap-1 text-sm">
            {form.interested}
            <select name="interestedProduct" className="field h-12">
              <option value="">{form.select}</option>
              {options.products.map((item) => <option key={item}>{item}</option>)}
            </select>
          </label>
          <label className="grid gap-1.5 text-sm font-medium sm:col-span-2">{form.message}<textarea required name="message" rows={6} className="field py-3" /></label>
          <label className="grid gap-1.5 text-sm font-medium sm:col-span-2">{form.attachment}<input type="file" name="attachment" className="rounded-lg border border-dashed border-line bg-paper p-3 text-sm" /></label>
          <label className="absolute left-[-9999px] h-px w-px overflow-hidden">{form.honeypot}<input name="website" tabIndex={-1} autoComplete="off" /></label>
          <button className="btn btn-primary w-fit sm:col-span-2" type="submit">{form.submit}</button>
        </form>
        </div>
      </div>
    </>
  );
}
