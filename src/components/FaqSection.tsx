import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export type FaqItem = { q: string; a: string };

export function FaqSection({
  eyebrow,
  title,
  items,
}: {
  eyebrow?: string;
  title: string;
  items: FaqItem[];
}) {
  return (
    <section className="section-tight border-t border-border">
      <div className="mx-auto max-w-3xl px-6 lg:px-10">
        {eyebrow && (
          <div className="text-xs font-mono text-primary uppercase tracking-widest mb-3 text-center">
            {eyebrow}
          </div>
        )}
        <h2 className="font-display text-3xl lg:text-4xl tracking-tight text-balance text-center mb-10">
          {title}
        </h2>
        <Accordion type="single" collapsible className="w-full">
          {items.map((it, i) => (
            <AccordionItem key={i} value={`item-${i}`} className="border-border">
              <AccordionTrigger className="text-left font-display text-base font-medium py-5">
                {it.q}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed text-[0.95rem]">
                {it.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

export function faqJsonLd(items: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((it) => ({
      "@type": "Question",
      name: it.q,
      acceptedAnswer: { "@type": "Answer", text: it.a },
    })),
  };
}
