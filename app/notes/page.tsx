import type { Metadata } from "next";
import { ClosingCta } from "@/components/landing/ClosingCta";
import { NoteList } from "@/components/notes/NoteList";
import { Editorial } from "@/components/site/Editorial";
import { JsonLd } from "@/components/site/JsonLd";
import { Section } from "@/components/site/Section";
import { notesByDate } from "@/content/notes";
import { pageMetadata } from "@/lib/metadata";
import { buildNotesIndexSchema, notesIndex } from "@/lib/schema/notes";

export const metadata: Metadata = pageMetadata(notesIndex);

export default function NotesPage() {
  const sorted = notesByDate();
  // Categories in use, in the order they first appear. A line of text, not
  // a filter.
  const categories = Array.from(new Set(sorted.map((note) => note.category)));

  return (
    <>
      <JsonLd data={buildNotesIndexSchema()} />
      <Section
        tone="bone"
        size="compact"
        containerClassName="pt-[calc(var(--spacing-header)+var(--spacing-section))]"
      >
        <Editorial
          heading={<h1 className="type-display-xl">Notes.</h1>}
          aside={
            <div className="flex flex-col gap-head">
              <p className="type-lede">
                Projects, product development and what we notice about
                merchandise along the way: manufacturing insight, launches,
                event merch thinking and the occasional opinion.
              </p>
              <p className="type-meta text-muted">{categories.join(", ")}</p>
            </div>
          }
        />
      </Section>
      {/* No top padding: the index follows straight on from the hero. */}
      <Section tone="bone" size="compact" containerClassName="pt-0">
        <NoteList notes={sorted} featured headingLevel={2} />
      </Section>
      <ClosingCta />
    </>
  );
}
