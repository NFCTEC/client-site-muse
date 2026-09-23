import Link from "next/link";
import type { Dictionary } from "@/i18n/dictionaries";
import { localizeHref, type Locale } from "@/i18n/config";
import type { getHome } from "@/lib/content";
import { asCategories, asGroups, asItems, asSteps, contentText } from "@/lib/utils";
import { HeroVisual } from "./hero-visual";

type HomeData = Awaited<ReturnType<typeof getHome>>;

export function HomePage({ locale, data, labels }: { locale: Locale; data: HomeData; labels: Dictionary }) {
  return (
    <>
      {data.sections.map((section) => (
        <Section key={section.key} section={section} locale={locale} data={data} labels={labels} />
      ))}
    </>
  );
}

function Section({
  section,
  locale,
  data,
  labels,
}: {
  section: HomeData["sections"][number];
  locale: Locale;
  data: HomeData;
  labels: Dictionary;
}) {
  if (section.key === "hero") {
    return (
      <section className="hero-grid border-b border-line bg-white">
        <div className="public-shell grid items-center gap-12 py-14 md:grid-cols-[1.02fr_0.98fr] md:py-20 lg:py-24">
          <div>
            <p className="kicker mb-5">{locale === "zh" ? "从射频到云端的完整工程栈" : "From RF field to cloud backend"}</p>
            <h1 className="display max-w-xl text-ink">{section.title}</h1>
            <p className="mt-5 max-w-xl text-lg leading-8 text-muted">{section.description}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={localizeHref("/contact", locale)} className="btn btn-primary">
                {contentText(section.content, "primaryCta") || labels.talk}
              </Link>
              <Link href={localizeHref("/technology", locale)} className="btn btn-line">
                {contentText(section.content, "secondaryCta") || labels.explore}
              </Link>
            </div>
            <div className="mt-10 grid gap-3 sm:grid-cols-3">
              {data.technologies.map((item) => (
                <Link key={item.href} href={localizeHref(item.href, locale)} className="rounded-xl border border-line bg-white px-3 py-3 text-sm font-semibold hover:border-accent hover:text-accent">
                  {item.title}
                </Link>
              ))}
            </div>
          </div>
          <HeroVisual />
        </div>
        <div className="border-t border-line">
          <div className="public-shell flex gap-2 overflow-x-auto py-4">
            {data.technologies.flatMap((item) => item.protocols).map((term, index) => <span key={`${term}-${index}`} className="tech-label shrink-0">{term}</span>)}
          </div>
        </div>
      </section>
    );
  }

  if (section.key === "featured" && !data.products.some((item) => item.featured)) return null;
  if (section.key === "insights" && !data.articles.length) return null;

  const tone =
    section.key === "cta"
      ? "bg-ink text-[#f4f2ec]"
      : section.key === "products" || section.key === "why" || section.key === "featured" || section.key === "security"
        ? "bg-paper"
        : "bg-white";
  return (
    <section className={`border-b border-line ${tone}`}>
      <div className="public-shell py-14 md:py-16">
        <SectionBody section={section} locale={locale} data={data} labels={labels} />
      </div>
    </section>
  );
}

function SectionBody({
  section,
  locale,
  data,
  labels,
}: {
  section: HomeData["sections"][number];
  locale: Locale;
  data: HomeData;
  labels: Dictionary;
}) {
  if (section.key === "core") {
    return (
      <>
        <SectionHead title={section.title} description={section.description} />
        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          {data.technologies.map((item, index) => (
            <article key={item.href} className="panel flex min-h-[24rem] flex-col p-6">
              <p className="font-mono text-xs text-accent">0{index + 1} / CORE</p>
              <h3 className="mt-4 text-[1.7rem] font-semibold tracking-[-0.03em]">
                <Link href={localizeHref(item.href, locale)} className="hover:text-accent">{item.title}</Link>
              </h3>
              <p className="mt-3 text-sm leading-6 text-muted">{item.description}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {[...item.protocols, ...item.chips].slice(0, 8).map((term) => <span key={term} className="tech-label">{term}</span>)}
              </div>
              {item.children.length ? (
                <ul className="mt-auto grid gap-2 border-t border-line pt-4">
                  {item.children.map((child) => (
                    <li key={child.href}>
                      <Link href={localizeHref(child.href, locale)} className="text-sm font-medium hover:text-accent">{child.title}</Link>
                    </li>
                  ))}
                </ul>
              ) : null}
            </article>
          ))}
        </div>
      </>
    );
  }

  if (section.key === "products") {
    const categories = asCategories(section.content);
    return (
      <>
        <SectionHead title={section.title} description={section.description} />
        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          {categories.map((item) => {
            const category = item.key === "hardware" ? "HARDWARE" : item.key === "cloud" ? "CLOUD" : "SOFTWARE";
            const products = data.products.filter((product) => product.category === category);
            return (
              <article key={item.key} className="panel flex min-h-[22rem] flex-col p-6">
                <Link href={localizeHref(`/products/${item.key}`, locale)} className="text-2xl font-semibold tracking-[-0.03em] hover:text-accent">{item.title}</Link>
                <p className="mt-3 text-sm leading-6 text-muted">{item.text}</p>
                <ul className="mt-6 grid gap-px overflow-hidden rounded-xl border border-line bg-line">
                  {products.map((product) => (
                    <li key={product.href} className="bg-white">
                      <Link href={localizeHref(product.href, locale)} className="block px-4 py-3 hover:text-accent">
                        <span className="block font-medium">{product.title}</span>
                        <span className="mt-1 block text-sm leading-5 text-muted">{product.description}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </>
    );
  }

  if (section.key === "solutions") {
    return (
      <>
        <SectionHead title={section.title} description={section.description} />
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {data.solutions.map((item, index) => (
            <Link key={item.href} href={localizeHref(item.href, locale)} className="panel block min-h-48 p-6">
              <p className="font-mono text-[11px] text-accent">0{index + 1} / {item.meta}</p>
              <h3 className="mt-8 text-2xl font-semibold tracking-[-0.03em]">{item.title}</h3>
              <p className="mt-3 text-sm leading-6 text-muted">{item.description}</p>
            </Link>
          ))}
        </div>
      </>
    );
  }

  if (section.key === "security") {
    const groups = asGroups(section.content);
    return (
      <>
        <SectionHead title={section.title} description={section.description} />
        <div className="mt-10 grid gap-px overflow-hidden rounded-[16px] border border-line bg-line md:grid-cols-2">
          {groups.map((group) => (
            <div key={group.title} className="bg-white/75 p-6 md:p-8">
              {group.href ? (
                <Link href={localizeHref(group.href, locale)} className="text-xl font-semibold hover:text-accent">
                  {group.title}
                </Link>
              ) : (
                <h3 className="text-xl font-semibold">{group.title}</h3>
              )}
              <div className="mt-5 flex flex-wrap gap-2">
                {group.items.map((item) => <span key={item} className="tech-label">{item}</span>)}
              </div>
            </div>
          ))}
        </div>
      </>
    );
  }

  if (section.key === "featured") {
    const featured = data.products.filter((item) => item.featured);
    return (
      <>
        <SectionHead title={section.title} description={section.description} />
        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {featured.map((item) => (
            <Link key={item.href} href={localizeHref(item.href, locale)} className="panel group block overflow-hidden">
              <div className="hero-grid flex h-36 items-center justify-center border-b border-line bg-[#fafaff]">
                <div className="flex h-20 w-28 items-center justify-center rounded-lg border border-accent/25 bg-white shadow-sm">
                  <div className="h-8 w-8 rounded border-2 border-accent/60" />
                </div>
              </div>
              <div className="p-6">
              <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-warm">{item.meta}</p>
              <h3 className="mt-2 text-xl font-semibold group-hover:text-accent">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted">{item.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </>
    );
  }

  if (section.key === "coverage") {
    return (
      <>
        <SectionHead title={section.title} description={section.description} />
        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          {data.technologies.map((item) => (
            <div key={item.href} className="rounded-[16px] border border-line bg-white p-6">
              <Link href={localizeHref(item.href, locale)} className="text-xl font-semibold hover:text-accent">{item.title}</Link>
              <div className="mt-5 flex flex-wrap gap-2">{[...item.protocols, ...item.chips].map((term) => <span className="tech-label" key={term}>{term}</span>)}</div>
            </div>
          ))}
        </div>
      </>
    );
  }

  if (section.key === "why") {
    return (
      <>
        <SectionHead title={section.title} description={section.description} />
        <dl className="mt-8 grid gap-4 md:grid-cols-2">
          {asItems(section.content).map((item, index) => (
            <div key={item.title} className="panel p-6">
              <dt className="text-xl font-semibold tracking-[-0.02em]">
                <span className="mr-3 font-mono text-sm text-accent">0{index + 1}</span>
                {item.title}
              </dt>
              <dd className="mt-3 text-sm leading-6 text-muted">{item.text}</dd>
            </div>
          ))}
        </dl>
      </>
    );
  }

  if (section.key === "process") {
    const steps = asSteps(section.content);
    return (
      <>
        <SectionHead title={section.title} description={section.description} />
        <ol className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <li key={step} className="panel min-h-32 p-5">
              <span className="font-mono text-[11px] text-accent">0{index + 1}{index < steps.length - 1 ? " →" : ""}</span>
              <p className="mt-6 text-lg font-semibold">{step}</p>
            </li>
          ))}
        </ol>
      </>
    );
  }

  if (section.key === "developer") {
    return (
      <>
        <div className="grid gap-8 lg:grid-cols-[1fr_0.8fr]">
          <div>
            <h2 className="section-title">{section.title}</h2>
            <p className="mt-3 text-muted">{section.description}</p>
            <Link href={localizeHref("/developer", locale)} className="mt-6 inline-block text-sm text-accent">
              {labels.developer} →
            </Link>
          </div>
          <pre className="overflow-auto rounded-xl bg-ink p-6 font-mono text-[12px] leading-7 text-[#e8e9f5] shadow-[0_20px_45px_rgba(18,21,45,.16)]">
            <code>{`// APDU select\n> 00 A4 04 00 00\n< 90 00\n\n// ${labels.illustrative}`}</code>
          </pre>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {data.tools.map((tool) => (
            <Link key={tool.href} href={localizeHref(tool.href, locale)} className="panel block min-h-44 p-5">
              <span className="font-mono text-[11px] text-accent">{tool.meta}</span>
              <span className="mt-6 block text-lg font-semibold">{tool.title}</span>
              <span className="mt-2 block text-sm leading-6 text-muted">{tool.description}</span>
            </Link>
          ))}
        </div>
      </>
    );
  }

  if (section.key === "insights") {
    return (
      <>
        <h2 className="section-title">{section.title}</h2>
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {data.articles.map((article) => (
            <Link key={article.href} href={localizeHref(article.href, locale)}>
              <h3 className="text-xl">{article.title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted">{article.description}</p>
            </Link>
          ))}
        </div>
      </>
    );
  }

  if (section.key === "cta") {
    return (
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="section-title max-w-xl text-[#f4f2ec]">{section.title}</h2>
          <p className="mt-3 max-w-xl text-[#d5ddd8]">{section.description}</p>
        </div>
        <Link href={localizeHref("/contact", locale)} className="btn bg-white text-ink">
          {contentText(section.content, "primaryCta") || labels.talk}
        </Link>
      </div>
    );
  }

  return (
    <>
      <SectionHead title={section.title} description={section.description} />
    </>
  );
}

function SectionHead({ title, description }: { title: string; description?: string }) {
  return (
    <div className="grid gap-3 border-b border-line pb-6 md:grid-cols-[1.2fr_0.8fr] md:items-end">
      <h2 className="section-title">{title}</h2>
      {description ? <p className="text-muted md:text-right">{description}</p> : null}
    </div>
  );
}
