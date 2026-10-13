import type { BlogSection } from "@/lib/blog-posts";
import type { CmsPost } from "@/lib/cms";
import { SolutionDiagram } from "@/components/SolutionDiagram";

function YoutubeShort({ video }: { video: NonNullable<BlogSection["video"]> }) {
  const id = /^[\w-]{11}$/.test(video.youtubeId) ? video.youtubeId : "";
  if (!id) return null;
  return (
    <figure className="my-8 mx-auto w-full max-w-[280px]">
      <div className="relative aspect-[9/16] overflow-hidden rounded-2xl border border-border bg-black">
        <iframe
          className="absolute inset-0 h-full w-full"
          src={`https://www.youtube-nocookie.com/embed/${id}`}
          title={video.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </div>
      <figcaption className="mt-3 text-center text-sm leading-relaxed text-muted-foreground">
        {video.title}{" "}
        <a href={video.url} className="text-primary hover:underline" rel="noopener noreferrer">
          YouTube
        </a>
      </figcaption>
    </figure>
  );
}

function SectionBlock({ section }: { section: BlogSection }) {
  const paragraphs = section.paragraphs ?? (section.text ? [section.text] : []);
  return (
    <div>
      {section.figure ? <SolutionDiagram title={section.figure.title} lanes={section.figure.lanes} /> : null}
      {section.video ? <YoutubeShort video={section.video} /> : null}
      {section.heading ? <h2 className="font-display text-2xl font-semibold mt-10 mb-3">{section.heading}</h2> : null}
      {paragraphs.map((paragraph) => (
        <p key={paragraph.slice(0, 48)} className="mb-4 text-base leading-relaxed text-foreground/90">
          {paragraph}
        </p>
      ))}
      {section.items ? (
        <ul className="mb-4 list-disc space-y-2 pl-6 text-base leading-relaxed text-foreground/90">
          {section.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      ) : null}
      {section.code ? (
        <pre className="mb-6 overflow-x-auto rounded-xl border border-border bg-background p-4 text-xs leading-relaxed font-mono text-foreground/90">
          <code>{section.code}</code>
        </pre>
      ) : null}
      {section.links ? (
        <ul className="mb-4 space-y-2 text-base leading-relaxed">
          {section.links.map((link) => (
            <li key={link.href}>
              <a href={link.href} className="text-primary hover:underline">
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

export function PostBody({ body }: { body: CmsPost["body"] }) {
  if (typeof body === "string") {
    return (
      <div
        className="blog-prose max-w-none text-foreground/90 leading-relaxed [&_h2]:font-display [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:mt-10 [&_h2]:mb-3 [&_h3]:font-display [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:mt-8 [&_h3]:mb-2 [&_p]:mb-4 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-4 [&_ul]:space-y-2 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-4 [&_ol]:space-y-2 [&_blockquote]:border-l-4 [&_blockquote]:border-primary/40 [&_blockquote]:pl-4 [&_blockquote]:text-muted-foreground [&_img]:max-w-full [&_img]:h-auto [&_img]:rounded-xl [&_img]:my-8 [&_img]:block [&_pre]:overflow-x-auto [&_pre]:rounded-xl [&_pre]:border [&_pre]:border-border [&_pre]:bg-background [&_pre]:p-4 [&_pre]:text-xs [&_pre]:font-mono"
        dangerouslySetInnerHTML={{ __html: body }}
      />
    );
  }

  return (
    <div className="max-w-none">
      {(body as BlogSection[]).map((section, index) => (
        <SectionBlock key={section.heading ?? section.video?.youtubeId ?? section.figure?.title ?? index} section={section} />
      ))}
    </div>
  );
}
