import Link from "next/link";
import { formatNoteDate, noteHref, type Note } from "@/content/notes";

/**
 * The editorial index used by /notes/, the foot of each article and the
 * homepage preview: hairline rows, the whole row a link, a lime underline
 * wiping in under the title on hover. With `featured` the first note runs
 * at display size and the rest as ordinary rows. No cards, no thumbnails.
 */
export function NoteList({
  notes,
  featured = false,
  compact = false,
  headingLevel = 3,
}: {
  notes: Note[];
  featured?: boolean;
  /** Date, title and standfirst stacked, for a column beside a title. */
  compact?: boolean;
  headingLevel?: 2 | 3;
}) {
  const Heading = headingLevel === 2 ? "h2" : "h3";
  return (
    <div className="index-list">
      {notes.map((note, index) => (
        <NoteRow
          key={note.slug}
          note={note}
          heading={Heading}
          lead={featured && index === 0}
          compact={compact}
        />
      ))}
    </div>
  );
}

// The underline lives on a span inside the heading, so the row (the `a`)
// drives it through the group: `a:hover > .u-wipe` in globals.css only
// reaches direct children.
const wipe = "u-wipe u-lime";

function NoteRow({
  note,
  heading: Heading,
  lead,
  compact,
}: {
  note: Note;
  heading: "h2" | "h3";
  lead: boolean;
  compact: boolean;
}) {
  if (compact) {
    return (
      <Link href={noteHref(note.slug)} className="index-row group block">
        <p className="type-meta flex flex-wrap items-baseline gap-x-2 text-muted">
          <time dateTime={note.date}>{formatNoteDate(note.date)}</time>
          <span aria-hidden="true">&middot;</span>
          <span>{note.category}</span>
        </p>
        <Heading className="type-headline mt-3">
          <span className={wipe}>{note.title}</span>
        </Heading>
        <p className="type-body mt-3 max-w-[48ch] text-muted">
          {note.standfirst}
        </p>
      </Link>
    );
  }
  return (
    <Link
      href={noteHref(note.slug)}
      className="index-row group grid gap-y-2 md:grid-cols-12 md:gap-x-8 md:gap-y-3 lg:gap-x-12"
    >
      <p className="type-meta flex flex-wrap items-baseline gap-x-2 text-muted md:col-span-3 md:flex-col md:gap-y-1">
        <time dateTime={note.date}>{formatNoteDate(note.date)}</time>
        <span aria-hidden="true" className="md:hidden">
          &middot;
        </span>
        <span>{note.category}</span>
      </p>
      {lead ? (
        <>
          <Heading className="type-display md:col-span-9">
            <span className={wipe}>{note.title}</span>
          </Heading>
          <p className="type-lede mt-head text-muted md:col-span-6 md:col-start-4">
            {note.standfirst}
          </p>
        </>
      ) : (
        <>
          <Heading className="type-headline md:col-span-9 xl:col-span-6">
            <span className={wipe}>{note.title}</span>
          </Heading>
          {/* Under the title on tablets, beside it from xl where the
              side column is wide enough to read. */}
          <p className="type-body mt-3 text-muted md:col-span-8 md:col-start-4 md:mt-0 xl:col-span-3 xl:col-start-10">
            {note.standfirst}
          </p>
        </>
      )}
    </Link>
  );
}
