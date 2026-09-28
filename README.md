# madebyobra

Brochure and lead-generation site for **madebyobra**, a bespoke merchandise
studio creating original products for brands, artists, events and
organisations.

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
  festivals/ events/ brands/ artists/   Audience landing pages
  [slug]/page.tsx        Product landing pages (one template)
  what-we-make/ who-for/ services/ about/ notes/ start-a-project/ privacy/
components/
  site/                  Header, Footer, Logo, Container, Section, Editorial,
                         Block, Button, JsonLd
  home/                  Sheets (scroll engine), Sheet, BigList, the sections
  landing/               AudiencePage, product/landing templates, ClosingCta
  notes/                 NoteList, article rendering
  forms/                 ProjectForm (Web3Forms)
content/
  site.ts                Nav, audiences, products, services, form options
  audiences.ts           Per-audience landing page content
  notes.ts               Notes entries (example content to replace)
lib/                     siteConfig, metadata helper, schema.org builders
public/brand/            madebyobra wordmark (PNG, used as a CSS mask)
```

## Design system

- **Colour**: tokens in `app/globals.css` (`--color-bone`, `--color-ink`,
  `--color-stone`, `--color-clay`, `--color-blue`, `--color-lime`) plus washed
  variants (`--color-lime-soft`, `--color-blue-soft`, `--color-clay-soft`) for
  the occasional accent block. Every surface sets `data-tone`, which resolves
  the semantic `bg-bg / text-fg / text-muted / border-line` utilities.
- **Type**: one grotesk (Hanken Grotesk, variable weight) at 900 for display.
  Display sizes (`type-hero`, `type-display`, `type-display-xl`, `type-page`,
  `type-link`, `type-link-sm`) are tuned to measured glyph widths so the
  longest word in each role fits the narrowest viewport it appears at, with
  separate formulas for phones, tablets and desktop.
- **Rhythm**: `--spacing-section`, `-sm`, `-lg`, `--spacing-head`,
  `--spacing-body` drive `py-section`, `mt-head`, `mt-body` and friends;
  mobile sits at the low end of each clamp.
- **Composition**: `Section` (tone + size) and `Editorial` (large heading
  ~60% / supporting copy ~30%, optionally reversed or right-aligned) are the
  layout primitives. `Block` is the occasional content block; one accent per
  group.

## Notes / placeholders

- **Notes** entries in `content/notes.ts` are example pieces written to set
  the structure and tone. Replace before launch.
- **Form** posts to Web3Forms from the client. File attachments are sent as
  multipart data; whether they are delivered depends on the Web3Forms plan
  attached to the access key.
- **Contact** - `hello@madebyobra.com` in `lib/siteConfig.ts` is a placeholder;
  confirm the exact mailbox.
- **Redirects** for retired URLs live in `netlify.toml`.
