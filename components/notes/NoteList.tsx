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
  headingLevel = 3,
}: {
  notes: Note[];
  featured?: boolean;
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
        />
      ))}
    </div>
  );
}

// The underline lives on a span inside the heading, so the row (the `a`)
// drives it through the group: `a:hover > .u-wipe` in globals.css only
// reaches direct children.
const wipe =
  "u-wipe u-lime group-hover:[background-size:100%_var(--u-size)] group-hover:[background-position:0_100%] group-focus-visible:[background-size:100%_var(--u-size)] group-focus-visible:[background-position:0_100%]";

function NoteRow({
  note,
  heading: Heading,
  lead,
}: {
  note: Note;
  heading: "h2" | "h3";
  lead: boolean;
}) {
  return (
    <Link
      href={noteHref(note.slug)}
      className="index-row group grid gap-y-3 md:grid-cols-12 md:gap-x-8 lg:gap-x-12"
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
          <Heading className="type-headline md:col-span-6">
            <span className={wipe}>{note.title}</span>
          </Heading>
          <p className="type-body hidden text-muted md:col-span-3 md:block">
            {note.standfirst}
          </p>
        </>
      )}
    </Link>
  );
}
