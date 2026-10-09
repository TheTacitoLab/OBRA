# madebyobra

Brochure and lead-generation site for **madebyobra**, a merchandise and
product studio for brands, artists, festivals, events and agencies.

## Stack

- **Next.js 15** (App Router) · **React 19** · **TypeScript**
- **Tailwind CSS v4** (design tokens via `@theme` in `app/globals.css`)
- No animation library: the homepage's stacked-sheet scroll, underline wipes,
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
npm run check:links   # after a build: every internal link and #fragment resolves
npm run check:media   # every homepage photograph is publicly reachable
```

## Structure

```
app/
  layout.tsx             Root layout - font, metadata, header + footer shell
  globals.css            Design system: palette, tones, type scale, rhythm
  page.tsx               Homepage (order and stacks: see "Homepage" below)
  festivals/ events/ brands/ artists/   Audience landing pages (one template)
  agencies/              The agency guide: long-form, its own layout
  [slug]/page.tsx        Product landing pages (one template)
  what-we-make/ who-for/ services/ about/ notes/ contact/ privacy/
  robots.ts sitemap.ts   robots.txt and sitemap.xml, generated at build
components/
  site/                  Header, Footer, Logo, Container, Section, Editorial,
                         Block, Button, MarkedTitle, Reveal, JsonLd,
                         RichText, Attribution, CookieConsent,
                         CookieSettingsButton
  home/                  Sheets + SheetGroup (scroll engine), Sheet, Collage,
                         Statement, BigList, ScrollCue and the sections in
                         page order (Hero, WhoFor, WhatWeMake, WhatWeHandle,
                         Overview, FinalCta)
  landing/               AudiencePage, product/landing templates, ClosingCta
  guide/                 Long-form primitives: GuideChapter, Callout,
                         GuideRail/GuideStrip + GuideSpy, Faq, Figures,
                         OnThisPage (long notes)
  agencies/              The agencies page's own pieces (hero and intro
                         sections, the guide, quantity bands, pricing
                         strip, short version, closing CTA)
  notes/                 NoteList, article rendering
  (about)                app/about/page.tsx reads content/about.ts
  forms/                 ProjectForm (Web3Forms), on /contact/ only
content/
  site.ts                Nav, audiences, products, services, form options
  home.ts                Homepage copy, section by section
  about.ts               About page copy (Rob, Q, Brad; process at #how-we-work)
  homeMedia.ts           Homepage photography: files, labels, links, alt
                         text, crops and collage slots
  audiences.ts           Per-audience landing page content (not agencies)
  agencies.ts            Agency guide: metadata, contents, FAQ, links, images
  pricing.ts             Published prices (approved figures only)
  notes.ts               Notes entries (example content to replace)
lib/                     siteConfig (incl. tracking IDs), metadata helper,
                         schema.org builders, attribution constants,
                         inline-link syntax, titleFit (display-face widths
                         for fitted titles and tile labels), media (image
                         URLs), consent (cookie choice + Consent Mode),
                         analytics (consent-gated events)
scripts/                 preview-noindex.mjs (runs as npm postbuild),
                         check-links.mjs, check-media.mjs
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
  make section and page, "In mind?" on the homepage close, "Agencies." in
  the agencies title, "Project." on the contact page, "Touch." on every
  closing Get in touch). `MarkedTitle` in `components/site/` renders the split:
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
  group. On the homepage the chapters alternate sides (title left and copy
  right, then the reverse) and every full-width section has a top edge of
  `--radius-section` (24px on desktop down to 12px on phones) that laps the
  section above by the same amount (`.section-round` on other pages;
  `.sheet--round` and `.sheets--lap` on the homepage; the footer).
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

## Homepage

The page alternates a visual chapter with a statement on a full brand
colour, three times, then explains the business in full:

Hero (bone) > Who for (ink, collage) > statement "Your merchandise should
feel like your product." (lime, ink type) > What we make (bone, collage) >
statement "We design by collection, for your audience." (clay, ink type) >
What we handle (stone, collage) > statement "Full service studio. From
concept to creation." (ink, lime type) > the overview (bone; the long,
visible, crawlable explanation with links to the pages that own each
search) > "Have something in mind?" (white) > footer.

- **Stacks**: four `SheetGroup`s inside `Sheets`: the hero with Who for,
  then each statement with the chapter after it. Within a stack each sheet
  pins while the next slides over it (dimming a little); each stack after
  the first laps the one before with the rounded section edge. Phones and
  `prefers-reduced-motion` get plain flow. The header tone follows the
  section actually under it.
- **Compact chapters** (`.home-chapter`, not `.chapter`, which the agency
  guide owns): Who for and What we make size to their content (about 65-77%
  and 86-97% of a desktop screen), with the title on one line and the copy
  beside it, so the next statement is already arriving as they end. On
  phones the supporting paragraph drops to body size. The statements keep
  their 80% height.
- **Calls to action**: on the homepage and About, every call to action is
  a plain text link with an arrow (`ArrowLink strong`); the desktop
  header's Get in touch is the one boxed button. The phone and tablet
  header is a solid bar (the page colour, or soft black over a dark
  section).
- **Collages** (`Collage.tsx`, `lib/mosaic.ts`): built around the
  photographs. Each photograph has a frame in `content/homeMedia.ts`
  (`aspect`, plus `position` for object-position and an optional `zoom`
  that only ever tightens, with `mobile` overrides of all three for
  phones), and each section has a layout per breakpoint:
  a tree of rows and columns of tile ids. The mosaic turns that into grid
  tracks and the collage's own aspect ratio at build time, so every tile
  is drawn at its photograph's frame at every width and no photograph is
  forced into an arbitrary box (and none is letterboxed). Change an aspect
  or a layout in the manifest and the grid reflows. Labels are live text
  in the display face, lower case with a full stop, sized from the tile
  and capped so the longest word fits (`labelWordEm`); photographs get
  lime labels over a low scrim; the audience photographs are pale by
  design (a light filter) and take ink labels (`labels: "ink"`) and their
  one-line descriptions, no scrim, and each carries a soft tint from the
  palette (`tint: "clay-soft"`, multiplied at part strength, lifting on
  hover and focus; neighbours never share one). Every label clears 3:1
  over the photograph behind it (6.8:1 or more today).
- **Photography** is the V3 set in the public Supabase bucket "Website
  Builds", folder `madebyobra/V3 Website/` (`v3("agency.png")` in the
  manifest), through Supabase's render endpoint (WebP, resized
  per `srcset` with `resize=contain`: without it the endpoint keeps the
  full height and returns a narrow crop; `lib/media.ts` has a switch back
  to the original files). Filenames are case-sensitive and irregular
  (`agency.png`, `festival.png`, `artist.png`, `hoods.png`,
  `techpacks.png`): a replacement uploaded under a new name must be
  switched in the manifest, because the old name stops resolving. Run
  `npm run check:media` after any change: it fails on a missing file or a
  resize that crops. There is no accessories photograph yet, so What we
  make shows the five categories that have one.

## Analytics and consent

- **Consent first**: an inline script at the top of `<head>`
  (`consentBootstrapScript` in `lib/consent.ts`) sets every Google Consent
  Mode v2 signal to denied and re-applies a stored choice before anything
  else can load. `CookieConsent.tsx` shows the banner (Accept all, Reject
  non-essential, Manage cookies; Essential, Analytics, Marketing), stores
  the choice in localStorage for a year, and loads only what it allows:
  GA4 (`G-Z8WND8F9RR`, gtag.js) on analytics consent, the LinkedIn Insight
  Tag (`9818722`) on marketing consent. Footer > Cookie settings reopens
  it. Withdrawing a category deletes its first-party cookies and reloads.
- **One GA4**: GA4 is loaded once per page load and sends its own page
  view; client-side navigations are counted by GA4's enhanced measurement
  (history events), so nothing sends page views by hand.
- **Google Tag Manager**: none was installed (not in the code or on the
  live site). To move to GTM, set `analytics.gtmId` in `lib/siteConfig.ts`
  and configure GA4 and LinkedIn inside the container with consent checks:
  the direct loaders then switch off so nothing is counted twice.
- **Events** (`lib/analytics.ts`, sent only with analytics consent):
  `get_in_touch_click`, `who_for_tile_click`, `product_tile_click`,
  `service_tile_click`, `notes_click`, `contact_form_submit`, plus the
  agency guide's `agency_*` events, each with `section`, `category`,
  `destination` and `page_path` only. Nothing typed into a form is sent.
- **Search Console** is verified by a DNS TXT record on madebyobra.com,
  outside this code.

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
- **Click events**: links carry `data-track` (plus `data-track-section`
  and `data-track-category`). `Attribution.tsx` reports them through
  `lib/analytics.ts` (consent-gated, above) and carries any utm_*
  parameters, and the agency guide's event name, to the enquiry form,
  which adds them to the submission.
- **Pages not built yet**: `/pricing/`, `/how-we-work/` and `/work/`. Links
  that want them point at the nearest live page (`agencyLinks` in
  `content/agencies.ts`, and the homepage overview's How we work in
  `content/home.ts`, both at `/about/#how-we-work`); switch them there once
  each page exists. The
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
- **Enquiries**: every general "Get in touch" leads to `/contact/` (H1
  "Tell us about your project."), the only page with the full form.
  `/start-a-project/` and `/brief` 301 there directly (`netlify.toml`).
- **Form** posts to Web3Forms from the client. File attachments are sent as
  multipart data; whether they are delivered depends on the Web3Forms plan
  attached to the access key.
- **Contact** - `hello@madebyobra.com` in `lib/siteConfig.ts` is a placeholder;
  confirm the exact mailbox.
- **Redirects** for retired URLs live in `netlify.toml`.
- **Cookie policy**: there is no separate cookie policy. The privacy
  policy's section 4 (`/privacy/#cookies`, linked from the banner) speaks
  of cookies and analytics in general terms; have it reviewed so it names
  Google Analytics and the LinkedIn Insight Tag before relying on it.
- **e-commerce.png** in the bucket is a screenshot of another brand's
  storefront ("Layers for the city", USD prices); the tile crops to the
  top, but replace it with madebyobra's own work when there is some.
