import { Section } from "../site/Section";
import { ArrowLink } from "../site/Button";
import { NoteList } from "../notes/NoteList";
import { notesByDate } from "@/content/notes";

/** Title and link on the left, the three latest notes on the right. */
export function NotesPreview() {
  const latest = notesByDate().slice(0, 3);
  return (
    <Section id="notes-preview" tone="blue-soft" rounded>
      <div className="grid gap-y-10 lg:grid-cols-12 lg:gap-x-12">
        <div className="lg:col-span-5">
          <div
            className="flex flex-col gap-5 lg:sticky lg:top-24"
            data-reveal-group="left"
          >
            <h2 className="type-display-xl type-chapter">Notes.</h2>
            <p className="type-lede text-muted">
              Product development, manufacturing insight and merchandise
              thinking from the studio.
            </p>
            <div>
              <ArrowLink href="/notes/">All notes</ArrowLink>
            </div>
          </div>
        </div>
        <div className="lg:col-span-7" data-reveal-group="right">
          <NoteList notes={latest} compact />
        </div>
      </div>
    </Section>
  );
}
