# madebyobra

Brochure and lead-generation site for **madebyobra**, a merchandise and
product studio for brands, artists, festivals, events and agencies.

## Stack

- **Next.js 15** (App Router) · **React 19** · **TypeScript**
- **Tailwind CSS v4** (design tokens via `@theme` in `app/globals.css`)
- No animation library: the opening stacked-sheet scroll, underline wipes,
  menu and hero load-in are CSS, with one small script
  (`components/home/Sheets.tsx`) writing scroll progress to custom properties.
- Static export (`output: 'export'`) - builds to `out/` as plain HTML/CSS/JS.

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # static export to ./out
npm run lint
npm run typecheck
```

## Structure

```
app/
  layout.tsx             Root layout - font, metadata, header + footer shell
  globals.css            Design system: palette, tones, type scale, rhythm
  page.tsx               Homepage
  festivals/ events/ brands/ artists/   Audience landing pages (one template)
  agencies/              The agency guide: long-form, its own layout
  [slug]/page.tsx        Product landing pages (one template)
  what-we-make/ who-for/ services/ about/ notes/ start-a-project/ privacy/
  robots.ts sitemap.ts   robots.txt and sitemap.xml, generated at build
components/
  site/                  Header, Footer, Logo, Container, Section, Editorial,
                         Block, Button, MarkedTitle, Reveal, JsonLd,
                         RichText, Attribution
  home/                  Sheets (scroll engine), Sheet, BigList, ScrollCue and
                         the sections in page order (Hero, WhoFor,
                         Proposition, AboutPreview, Collection, RetailReady,
                         Procurement, NotesPreview, Contact)
  landing/               AudiencePage, product/landing templates, ClosingCta
  guide/                 Long-form primitives: GuideChapter, Callout,
                         GuideRail/GuideStrip + GuideSpy, Faq, Figures,
                         OnThisPage (long notes)
  agencies/              The agencies page's own pieces (hero and intro
                         sections, the guide, quantity bands, pricing
                         strip, short version, closing CTA)
  notes/                 NoteList, article rendering
  forms/                 ProjectForm (Web3Forms)
content/
  site.ts                Nav, audiences, products, services, form options
  audiences.ts           Per-audience landing page content (not agencies)
  agencies.ts            Agency guide: metadata, contents, FAQ, links, images
  pricing.ts             Published prices (approved figures only)
  notes.ts               Notes entries (example content to replace)
lib/                     siteConfig, metadata helper, schema.org builders,
                         attribution constants, inline-link syntax,
                         titleFit (display-face widths for fitted titles)
scripts/                 preview-noindex.mjs (runs as npm postbuild)
public/brand/            madebyobra wordmark (PNG, used as a CSS mask)
```

## Design system

- **Colour**: tokens in `app/globals.css` (`--color-bone`, `--color-ink`,
  `--color-stone`, `--color-clay`, `--color-blue`, `--color-lime`) plus washed
  variants (`--color-lime-soft`, `--color-blue-soft`, `--color-clay-soft`) for
  the occasional accent block. Every surface sets `data-tone`, which resolves
  the semantic `bg-bg / text-fg / text-muted / border-line` utilities.
- **Lime block**: the brand punctuation. `.mark` puts the end of a heading
  on a solid lime block (the hero's "More brand.", "Make." on the What we
  make section and page, "Your product." in the blue break, "Ready." on
  Retail ready, "Agencies." in the agencies title, "Project." on
  every Start a project heading). `MarkedTitle` in `components/site/` renders the split:
  the break goes before the marked word, or wherever a `\n` in the title
  puts it, in which case a mid-line word keeps its word space
  (`.mark--mid`). `.mark-hover` is the same block wiping in on hover for
  the homepage audience list only; everything else keeps the underline wipe
  (`.u-wipe`). The block is sized from the font's metrics (`--font-ascent`,
  `--font-cap` in `app/globals.css`); update those two numbers when the
  typeface changes. The footer signs off with the line set enormous and cut
  by the page edge (`.footer-mark`).
- **Type**: two families. Display (headings, navigation, buttons) is
  Aeonik by intent (Black for display, Bold and Medium below it); it is
  licensed and not bundled, so Figtree from next/font stands in with the
  same weights and `app/layout.tsx` documents the drop-in (`--font-aeonik`
  takes over the display stack once the files are wired; update
  `--font-ascent` / `--font-cap` for the lime block). Running text is DM
  Sans from next/font (`--font-sans`). Display sizes (`type-hero`,
  `type-display`, `type-display-xl`, `type-page`, `type-link`,
  `type-link-sm`) are tuned to measured glyph widths so the longest word in
  each role fits the narrowest viewport it appears at, with separate
  formulas for phones, tablets and desktop; the container widens to 140rem
  so 1900px and 2200px screens use their width.
- **Rhythm**: `--spacing-section`, `-sm`, `-lg`, `--spacing-head`,
  `--spacing-body` drive `py-section`, `mt-head`, `mt-body` and friends;
  mobile sits at the low end of each clamp.
- **Composition**: `Section` (tone + size) and `Editorial` (large heading
  ~60% / supporting copy ~30%, optionally reversed or right-aligned) are the
  layout primitives. `Block` is the occasional content block; one accent per
  group. On the homepage the sections alternate sides (copy left and title
  right, then the reverse) and each full-width section takes `rounded`, a
  top edge of `--radius-section` (24px on desktop down to 12px on phones)
  that laps the section above by the same amount (`.section-round`,
  `.sheet--round` for the last stacked sheet, and the footer).
- **Fitted titles**: the product-page hero (PageHero `full`, also About)
  and the agencies hero size the h1 from its own words. `lib/titleFit.ts`
  measures the title in em from the display face's glyph widths at build
  time; CSS divides the space available by that (`--fit-em`, container
  units), capped, so a short title (TOPS) runs large and a long one wraps
  without overflowing. The copy sits beside the title rather than at the
  far edge: from lg for a short title, from xl for the rest; stacked
  otherwise. Remeasure the widths when Aeonik replaces Figtree.
- **Agencies page**: two halves. First a commercial landing page in the
  homepage's voice (fitted hero with the scroll cue, three alternating
  sections, one choice: read the guide or enquire). Then the full guide on
  the same URL (`#agency-guide`, `components/agencies/AgencyGuide.tsx`):
  contents on the left from lg (a sticky rail), a sticky strip under the
  header on phones and tablets (both inside the guide, so they appear
  with it and leave before the closing CTA; `GuideSpy` marks the current
  section), and sixteen numbered chapters on the right, each number,
  title, introduction, body and at most one callout. One spacing system
  (`--g-section`, `--g-open`, `--g-p`, `--g-block`), one lime callout
  style, reading measure about 760px. The guide does not animate. FAQ rows
  are native disclosures with the answers in the HTML.
- **Motion**: two systems, both off under `prefers-reduced-motion`.
  `Reveal` (mounted on the homepage and the top of the agencies page)
  sets `html[data-reveal]` and marks elements `.is-in` as they enter the
  viewport; `data-reveal="left|right|up"`
  on an element, or `data-reveal-group` on a parent, fades and lifts them
  in over 650ms (1.5rem up, 0.875rem from the title's side, 90ms stagger
  between siblings). Without the script nothing is hidden. `ScrollCue` is
  the hero's arrow at the bottom right of the frame: it bounces at rest,
  then rotates and morphs into a smile over the first half-viewport of
  scroll, holds, and fades out before Who for (or before the element its
  `next` prop names: the agencies hero reuses it); it is decorative and
  not interactive.

## Search and indexing

- **URLs**: https, no www, trailing slash (`trailingSlash: true`). Every
  page's canonical, `og:url` and sitemap entry use exactly that form,
  built from `siteConfig.url` and the route path.
- **Metadata**: one call to `pageMetadata()` per route (title, description,
  canonical, Open Graph; Twitter tags follow from Open Graph). Pass
  `noindex: true` for a conversion-only campaign landing page that repeats
  an organic page's pitch, and leave that page out of `app/sitemap.ts`.
- **Sitemap**: canonical, indexable pages only. `lastmod` only where a real
  content date exists (a note's date or `updated`, the agency guide's
  hand-set `modified` in `content/agencies.ts`): bump it when the content
  changes, not on deploy.
- **robots.txt**: everything allowed; OAI-SearchBot (ChatGPT search) named
  explicitly. GPTBot (training) has no rule of its own and falls under `*`.
- **Previews**: Netlify noindexes Deploy Previews itself;
  `scripts/preview-noindex.mjs` adds `X-Robots-Tag: noindex` to branch
  deploys too (it reads Netlify's `CONTEXT` and never touches production).
- **Structured data**: one Organization and WebSite node, reused by
  `@id`; WebPage + BreadcrumbList per page (structured data only: no page
  shows breadcrumbs); Article for notes, with a Person author when the note
  names one. No FAQPage markup (Google shows FAQ rich results only for
  government and health sites) and no Product markup on category pages.
- **Click events**: links carry `data-track` (the agency guide's
  `agency_*` events). `Attribution.tsx` forwards them to gtag, a GTM
  dataLayer or Plausible if one is installed (none is today), and carries
  the event and any utm_* parameters to the brief form, which adds them to
  the submission.
- **Pages not built yet**: `/pricing/`, `/how-we-work/` and `/work/`. Links
  that want them point at the nearest live page (`agencyLinks` in
  `content/agencies.ts`); switch them there once each page exists. The
  Agency Merchandise Brief Template download stays hidden until
  `agencyLinks.briefTemplate` points at a real file.

## Notes / placeholders

- **Notes** entries in `content/notes.ts` are example pieces written to set
  the structure and tone. Replace before launch. A note can carry a real
  named `author`, an `updated` date, a lead `image`, `toc: true` for long
  pieces, `related` slugs and `cluster: "agencies"` (a link to the agency
  guide at its foot, and a listing on that page); body text takes inline
  links as `[label](/path/)`. The five planned agency pieces are listed
  there.
- **Form** posts to Web3Forms from the client. File attachments are sent as
  multipart data; whether they are delivered depends on the Web3Forms plan
  attached to the access key.
- **Contact** - `hello@madebyobra.com` in `lib/siteConfig.ts` is a placeholder;
  confirm the exact mailbox.
- **Redirects** for retired URLs live in `netlify.toml`.
