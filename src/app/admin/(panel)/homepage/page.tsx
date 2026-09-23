import { Area, Check, Field, Notice } from "@/components/admin/ui";
import { categoriesText, ctaValue, groupsText, itemsText, stepsText } from "@/lib/homepage-form";
import { prisma } from "@/lib/prisma";
import { saveHomepage } from "@/server/site";
import { guard } from "@/server/guard";

export default async function HomepageAdmin({ searchParams }: { searchParams: Promise<{ saved?: string }> }) {
  await guard("homepage");
  const sections = await prisma.homepageSection.findMany({ include: { translations: true }, orderBy: { sortOrder: "asc" } });
  const saved = (await searchParams).saved;
  return (
    <div className="max-w-5xl">
      <h1 className="mb-4 text-2xl font-semibold">首页区块</h1>
      <Notice saved={saved} />
      <form action={saveHomepage} className="grid gap-6">
        {sections.map((section) => {
          const en = section.translations.find((item) => item.locale === "en");
          const zh = section.translations.find((item) => item.locale === "zh");
          return (
            <fieldset key={section.id} className="grid gap-3 rounded-lg border border-zinc-200 bg-white p-4">
              <legend className="px-1 font-medium">{section.key}</legend>
              <div className="flex flex-wrap gap-4">
                <Check label="启用" name={`enabled_${section.key}`} defaultChecked={section.enabled} />
                <Field label="排序" name={`sort_${section.key}`} type="number" defaultValue={section.sortOrder} />
              </div>
              {(["en", "zh"] as const).map((locale) => {
                const text = locale === "en" ? en : zh;
                return (
                  <div key={locale} className="grid gap-3 border-t border-zinc-100 pt-3">
                    <p className="text-sm font-medium">{locale === "en" ? "English" : "中文"}</p>
                    <Field label="标题" name={`${locale}_title_${section.key}`} defaultValue={text?.title} />
                    <Area label="说明" name={`${locale}_description_${section.key}`} defaultValue={text?.description} rows={2} />
                    {section.key === "hero" || section.key === "cta" ? (
                      <>
                        <Field label="主按钮" name={`${locale}_primary_${section.key}`} defaultValue={ctaValue(text?.content, "primaryCta")} />
                        {section.key === "hero" ? <Field label="次按钮" name={`${locale}_secondary_${section.key}`} defaultValue={ctaValue(text?.content, "secondaryCta")} /> : null}
                        {section.key === "hero" ? <Field label="第三按钮" name={`${locale}_tertiary_${section.key}`} defaultValue={ctaValue(text?.content, "tertiaryCta")} /> : null}
                      </>
                    ) : null}
                    {section.key === "products" ? <Area label="类别，每行：key | 标题 | 说明" name={`${locale}_categories_${section.key}`} defaultValue={categoriesText(text?.content)} rows={4} /> : null}
                    {section.key === "why" ? <Area label="条目，每行：标题 | 说明" name={`${locale}_items_${section.key}`} defaultValue={itemsText(text?.content)} rows={5} /> : null}
                    {section.key === "process" ? <Area label="步骤，每行一个" name={`${locale}_steps_${section.key}`} defaultValue={stepsText(text?.content)} rows={4} /> : null}
                    {section.key === "security" ? <Area label="分组。标题 | 链接，下一行写术语，组之间用 ---" name={`${locale}_groups_${section.key}`} defaultValue={groupsText(text?.content)} rows={8} /> : null}
                  </div>
                );
              })}
            </fieldset>
          );
        })}
        <button className="h-10 rounded-md bg-teal-800 text-sm text-white" type="submit">保存首页</button>
      </form>
    </div>
  );
}
