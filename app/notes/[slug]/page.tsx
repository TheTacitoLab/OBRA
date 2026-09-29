import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ClosingCta } from "@/components/landing/ClosingCta";
import { NoteArticle } from "@/components/notes/NoteArticle";
import { NoteList } from "@/components/notes/NoteList";
import { JsonLd } from "@/components/site/JsonLd";
import { Section } from "@/components/site/Section";
import { findNote, noteHref, notes, notesByDate } from "@/content/notes";
import { pageMetadata } from "@/lib/metadata";
import { buildNoteSchema } from "@/lib/schema/notes";

/**
 * One route per note in content/notes.ts, pre-rendered at build time.
 * Anything else is a 404.
 */

type Params = { slug: string };

export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return notes.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const note = findNote(slug);
  if (!note) return {};
  return pageMetadata({
    title: note.title,
    description: note.standfirst,
    path: noteHref(slug),
    article: { publishedTime: note.date },
  });
}

export default async function NotePage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const note = findNote(slug);
  if (!note) notFound();

  const others = notesByDate().filter((entry) => entry.slug !== slug);

  return (
    <>
      <JsonLd data={buildNoteSchema(note)} />
      <NoteArticle note={note} />
      {others.length > 0 && (
        <Section tone="stone" size="compact">
          <h2 className="type-display-sm">More notes.</h2>
          <div className="mt-body">
            <NoteList notes={others} />
          </div>
        </Section>
      )}
      <ClosingCta />
    </>
  );
}
