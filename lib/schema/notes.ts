import { noteHref, notesByDate, type Note } from "@/content/notes";
import { ogImage } from "@/lib/metadata";
import { plainText } from "@/lib/richText";
import {
  breadcrumbNode,
  organizationNode,
  websiteNode,
  type Crumb,
} from "@/lib/schema/organization";
import { siteConfig } from "@/lib/siteConfig";

const SITE = siteConfig.url;

/** The one per-page source for the Notes index: metadata and schema read it. */
export const notesIndex = {
  path: "/notes/",
  title: "Notes",
  description:
    "Notes from madebyobra: projects, product development, manufacturing, launches, event retail, behind-the-scenes work, merchandise observations and the occasional opinion.",
};

const noteUrl = (note: Note) => `${SITE}${noteHref(note.slug)}`;

const words = (text: string) =>
  plainText(text).split(/\s+/).filter(Boolean).length;

const wordCount = (note: Note) =>
  note.body.reduce(
    (count, block) =>
      count +
      (block.type === "ul"
        ? block.items.reduce((sum, item) => sum + words(item), 0)
        : words(block.text)),
    0,
  );

/** Home > Notes > title, for the note's BreadcrumbList. */
export const noteCrumbs = (note: Note): Crumb[] => [
  { name: "Home", path: "/" },
  { name: notesIndex.title, path: notesIndex.path },
  { name: note.title },
];

/**
 * CollectionPage + BreadcrumbList (Home > Notes) for /notes/, listing every
 * note newest first as the page's main entity.
 */
export function buildNotesIndexSchema() {
  const page = `${SITE}${notesIndex.path}`;
  const sorted = notesByDate();
  return {
    "@context": "https://schema.org",
    "@graph": [
      organizationNode(),
      websiteNode(),
      {
        "@type": "CollectionPage",
        "@id": `${page}#webpage`,
        url: page,
        name: notesIndex.title,
        description: notesIndex.description,
        inLanguage: "en-GB",
        isPartOf: { "@id": `${SITE}/#website` },
        breadcrumb: { "@id": `${page}#breadcrumb` },
        mainEntity: {
          "@type": "ItemList",
          numberOfItems: sorted.length,
          itemListElement: sorted.map((note, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: note.title,
            url: noteUrl(note),
          })),
        },
      },
      breadcrumbNode(page, [
        { name: "Home", path: "/" },
        { name: notesIndex.title },
      ]),
    ],
  };
}

/**
 * Article + WebPage + BreadcrumbList (Home > Notes > title) for one note.
 * The author is the named person when the note has one, otherwise the
 * studio; the publisher is always the shared Organization node.
 */
export function buildNoteSchema(note: Note) {
  const page = noteUrl(note);
  const author = note.author
    ? {
        "@type": "Person",
        name: note.author.name,
        jobTitle: note.author.role,
        ...(note.author.url ? { url: note.author.url } : {}),
        worksFor: { "@id": `${SITE}/#organization` },
      }
    : { "@id": `${SITE}/#organization` };
  return {
    "@context": "https://schema.org",
    "@graph": [
      organizationNode(),
      websiteNode(),
      {
        "@type": "WebPage",
        "@id": `${page}#webpage`,
        url: page,
        name: note.title,
        description: note.standfirst,
        inLanguage: "en-GB",
        isPartOf: { "@id": `${SITE}/#website` },
        breadcrumb: { "@id": `${page}#breadcrumb` },
      },
      {
        "@type": "Article",
        "@id": `${page}#article`,
        headline: note.title,
        description: note.standfirst,
        articleSection: note.category,
        datePublished: note.date,
        dateModified: note.updated ?? note.date,
        wordCount: wordCount(note),
        inLanguage: "en-GB",
        image: [`${SITE}${note.image?.src ?? ogImage.url}`],
        author,
        publisher: { "@id": `${SITE}/#organization` },
        mainEntityOfPage: { "@id": `${page}#webpage` },
        isPartOf: { "@id": `${SITE}/#website` },
      },
      breadcrumbNode(page, noteCrumbs(note)),
    ],
  };
}
