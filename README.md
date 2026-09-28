# madebyobra

Brochure and lead-generation site for **madebyobra**, a bespoke merchandise
studio creating original products for brands, artists, events and
organisations.

## Stack

- **Next.js 15** (App Router) · **React 19** · **TypeScript**
- **Tailwind CSS v4** (design tokens via `@theme` in `app/globals.css`)
- No animation library: the stacked-sheet scroll, underline wipes, menu and
  hero load-in are CSS, with one small script (`components/home/Sheets.tsx`)
  writing scroll progress to custom properties.
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
  globals.css            Design system: palette, tones, type scale, interactions
  page.tsx               Homepage: eight stacked sheets
  [slug]/page.tsx        Audience + product landing pages (one template)
  who-for/ what-we-make/ services/ about/ start-a-project/ privacy/
components/
  site/                  Header, Footer, Logo, Container, JsonLd
  home/                  Sheets (scroll engine), Sheet, Hero … Contact, BigList
  landing/               LandingPage template + ClosingCta
  forms/                 ProjectForm (Web3Forms)
content/site.ts          Nav, audiences, products, services, form options
lib/                     siteConfig, metadata helper, schema.org builders
public/brand/            madebyobra wordmark (PNG, used as a CSS mask)
```

## Design system

Brand colours live as tokens in `app/globals.css` (`--color-bone`, `--color-ink`,
`--color-stone`, `--color-clay`, `--color-blue`, `--color-lime`). Every surface
sets `data-tone="bone|ink|stone|clay|blue"`, which resolves the semantic
`bg-bg / text-fg / text-muted / border-line` utilities for that surface. Acid
Lime is reserved for underlines, markers and active states.

## Notes / placeholders

- **Landing pages** (`/festivals/`, `/artists/`, `/events/`,
  `/culture-led-brands/`, `/headwear/`, `/t-shirts/`, `/tops/`, `/sportswear/`,
  `/retro-football-shirts/`, `/trainingwear/`) share one template and carry a
  single intro line each. Their copy lives in `content/site.ts`.
- **Form** posts to Web3Forms from the client. File attachments are sent as
  multipart data; whether they are delivered depends on the Web3Forms plan
  attached to the access key.
- **Contact** - `hello@madebyobra.com` in `lib/siteConfig.ts` is a placeholder;
  confirm the exact mailbox.
- **Redirects** for retired OBRA URLs live in `netlify.toml`.
