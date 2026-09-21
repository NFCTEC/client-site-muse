import type { CmsPost } from "@/lib/cms";

type Section = { heading?: string; text: string };

export function PostBody({ body }: { body: CmsPost["body"] }) {
  if (typeof body === "string") {
    return (
      <div
        className="blog-prose max-w-none text-foreground/90 leading-relaxed [&_h2]:font-display [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:mt-10 [&_h2]:mb-3 [&_h3]:font-display [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:mt-8 [&_h3]:mb-2 [&_p]:mb-4 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-4 [&_ul]:space-y-2 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-4 [&_ol]:space-y-2 [&_blockquote]:border-l-4 [&_blockquote]:border-primary/40 [&_blockquote]:pl-4 [&_blockquote]:text-muted-foreground [&_img]:max-w-full [&_img]:h-auto [&_img]:rounded-xl [&_img]:my-8 [&_img]:block"
        dangerouslySetInnerHTML={{ __html: body }}
      />
    );
  }

  const sections = body as Section[];
  return (
    <div className="max-w-none space-y-6">
      {sections.map((b, i) => (
        <div key={i}>
          {b.heading && (
            <h2 className="font-display text-2xl font-semibold mt-10 mb-3">{b.heading}</h2>
          )}
          <p className="text-base leading-relaxed text-foreground/90">{b.text}</p>
        </div>
      ))}
    </div>
  );
}
