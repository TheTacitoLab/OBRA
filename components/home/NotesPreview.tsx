import { Section } from "../site/Section";
import { Editorial } from "../site/Editorial";
import { ArrowLink } from "../site/Button";
import { NoteList } from "../notes/NoteList";
import { notesByDate } from "@/content/notes";

export function NotesPreview() {
  const latest = notesByDate().slice(0, 3);
  return (
    <Section id="notes-preview" tone="blue-soft" size="compact">
      <Editorial
        heading={<h2 className="type-display-xl">Notes.</h2>}
        aside={
          <div className="flex flex-col gap-5">
            <p className="type-lede text-muted">
              Product development, manufacturing insight and merchandise
              thinking from the studio.
            </p>
            <ArrowLink href="/notes/">All notes</ArrowLink>
          </div>
        }
      />
      <div className="mt-body">
        <NoteList notes={latest} />
      </div>
    </Section>
  );
}
