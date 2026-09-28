import { noteHref, notesByDate, type Note } from "@/content/notes";
import { ogImage } from "@/lib/metadata";
import { organizationNode, websiteNode } from "@/lib/schema/organization";
import { siteConfig } from "@/lib/siteConfig";

const SITE = siteConfig.url;

/** The one per-page source for the Notes index: metadata and schema read it. */
export const notesIndex = {
  path: "/notes/",
  title: "Notes",
  description:
    "Notes from madebyobra: projects, product development, merchandise observations, manufacturing insight, launches, event merchandise thinking and the occasional opinion.",
};

type Crumb = { name: string; path?: string };

const noteUrl = (note: Note) => `${SITE}${noteHref(note.slug)}`;

const wordCount = (note: Note) =>
  note.body.reduce(
    (count, block) => count + block.text.split(/\s+/).filter(Boolean).length,
    0,
  );

function breadcrumbNode(page: string, crumbs: Crumb[]) {
  return {
    "@type": "BreadcrumbList",
    "@id": `${page}#breadcrumb`,
    itemListElement: crumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      ...(crumb.path ? { item: `${SITE}${crumb.path}` } : {}),
    })),
  };
}

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
 * The studio is both author and publisher, so both point at the shared
 * Organization node.
 */
export function buildNoteSchema(note: Note) {
  const page = noteUrl(note);
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
        dateModified: note.date,
        wordCount: wordCount(note),
        inLanguage: "en-GB",
        image: [`${SITE}${ogImage.url}`],
        author: { "@id": `${SITE}/#organization` },
        publisher: { "@id": `${SITE}/#organization` },
        mainEntityOfPage: { "@id": `${page}#webpage` },
        isPartOf: { "@id": `${SITE}/#website` },
      },
      breadcrumbNode(page, [
        { name: "Home", path: "/" },
        { name: notesIndex.title, path: notesIndex.path },
        { name: note.title },
      ]),
    ],
  };
}
