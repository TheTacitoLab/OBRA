import Link from "next/link";
import { Section } from "@/components/site/Section";
import { formatNoteDate, type Note } from "@/content/notes";

/**
 * One note. The title runs full width; below it the meta sits in the left
 * column and the standfirst and body in the right two thirds, so the article
 * reads off-centre rather than as a centred column. Reading order on phones
 * is parent link, meta, title, standfirst, body.
 */
export function NoteArticle({ note }: { note: Note }) {
  return (
    <Section tone="bone" size="large" hero>
      <div className="grid gap-y-4 md:grid-cols-12 md:gap-x-8 md:gap-y-head lg:gap-x-12">
        <p className="type-small md:col-span-12">
          {/* 44px tap target; the underline stays on the text via the span. */}
          <Link
            href="/notes/"
            className="-my-3 inline-flex min-h-11 items-center"
          >
            <span className="u-wipe u-static">Notes</span>
          </Link>
        </p>
        <p className="type-meta flex flex-wrap items-baseline gap-x-2 text-muted md:col-span-4 md:row-start-3 md:flex-col md:gap-y-1">
          <span>{note.category}</span>
          <span aria-hidden="true" className="md:hidden">
            &middot;
          </span>
          <time dateTime={note.date}>{formatNoteDate(note.date)}</time>
        </p>
        <h1 className="type-page md:col-span-12 md:row-start-2">{note.title}</h1>
        <div className="mt-4 md:col-span-8 md:col-start-5 md:row-start-3 md:mt-0 lg:col-span-7">
          <p className="type-lede">{note.standfirst}</p>
          <div className="prose-note mt-body border-t border-line pt-body">
            {note.body.map((block, index) =>
              block.type === "h2" ? (
                <h2 key={`${block.type}-${index}`}>{block.text}</h2>
              ) : (
                <p key={`${block.type}-${index}`}>{block.text}</p>
              ),
            )}
          </div>
        </div>
      </div>
    </Section>
  );
}
