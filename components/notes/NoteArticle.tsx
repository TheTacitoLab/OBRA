import { Section } from "@/components/site/Section";
import { ArrowLink } from "@/components/site/Button";
import { RichText } from "@/components/site/RichText";
import { OnThisPage } from "@/components/guide/Toc";
import {
  formatNoteDate,
  headingId,
  noteClusters,
  type Note,
} from "@/content/notes";

/**
 * One note. The title runs full width; below it the meta sits in the left
 * column and the standfirst and body in the right two thirds, so the article
 * reads off-centre rather than as a centred column. Reading order on phones
 * is meta, title, standfirst, body.
 *
 * Optional parts appear only when the note has them: the byline (a real
 * person), the updated date, a lead image, the contents for long pieces and
 * the link to the note's commercial page.
 */
export function NoteArticle({ note }: { note: Note }) {
  const headings = note.body.filter((block) => block.type === "h2");
  const cluster = note.cluster ? noteClusters[note.cluster] : null;
  return (
    <Section tone="bone" size="large" hero>
      <div className="grid gap-y-4 md:grid-cols-12 md:gap-x-8 md:gap-y-head lg:gap-x-12">
        <div className="type-meta flex flex-wrap items-baseline gap-x-2 text-muted md:col-span-4 md:row-start-3 md:flex-col md:gap-y-1">
          <span>{note.category}</span>
          <span aria-hidden="true" className="md:hidden">
            &middot;
          </span>
          <time dateTime={note.date}>{formatNoteDate(note.date)}</time>
          {note.updated && (
            <>
              <span aria-hidden="true" className="md:hidden">
                &middot;
              </span>
              <span>
                Updated{" "}
                <time dateTime={note.updated}>{formatNoteDate(note.updated)}</time>
              </span>
            </>
          )}
          {note.author && (
            <p className="basis-full md:mt-3">
              <span className="text-fg">
                By{" "}
                {note.author.url ? (
                  <a href={note.author.url} className="text-link" rel="author">
                    {note.author.name}
                  </a>
                ) : (
                  note.author.name
                )}
              </span>
              <span className="block">{note.author.role}</span>
            </p>
          )}
        </div>
        <h1 className="type-page md:col-span-12 md:row-start-2">{note.title}</h1>
        <div className="mt-4 md:col-span-8 md:col-start-5 md:row-start-3 md:mt-0 lg:col-span-7">
          <p className="type-lede">{note.standfirst}</p>
          {note.image && (
            // A plain img (the export is unoptimized, see Figures.tsx). The
            // lead image is above the fold, so it loads eagerly.
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={note.image.src}
              width={note.image.width}
              height={note.image.height}
              alt={note.image.alt}
              fetchPriority="high"
              className="mt-body h-auto w-full rounded-[2px] bg-stone"
            />
          )}
          {note.toc && headings.length >= 3 && (
            <div className="mt-body">
              <OnThisPage
                entries={headings.map((block) => ({
                  id: headingId(block),
                  label: block.text,
                }))}
              />
            </div>
          )}
          <div className="prose-note mt-body border-t border-line pt-body">
            {note.body.map((block, index) => {
              const key = `${block.type}-${index}`;
              if (block.type === "h2") {
                return (
                  <h2 key={key} id={headingId(block)} className="scroll-mt-24">
                    {block.text}
                  </h2>
                );
              }
              if (block.type === "ul") {
                return (
                  <ul key={key}>
                    {block.items.map((item) => (
                      <li key={item}>
                        <RichText text={item} />
                      </li>
                    ))}
                  </ul>
                );
              }
              return (
                <p key={key}>
                  <RichText text={block.text} />
                </p>
              );
            })}
          </div>
          {cluster && (
            <aside
              aria-label={cluster.heading}
              className="mt-body border-t-[3px] border-fg pt-5"
            >
              <p className="type-title">{cluster.heading}</p>
              <p className="type-body mt-2 text-muted">{cluster.text}</p>
              <ArrowLink href={cluster.href} className="mt-3">
                {cluster.label}
              </ArrowLink>
            </aside>
          )}
        </div>
      </div>
    </Section>
  );
}
