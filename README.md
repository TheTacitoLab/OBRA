# OBRA

Studio site for **OBRA** - limited edition football jerseys for festivals,
artists, creators and culture-led brands. Concept to creation, done for you in
one process.

## Stack

- **Next.js 15** (App Router) · **React 19** · **TypeScript**
- **Tailwind CSS v4** (design tokens via `@theme` in `app/globals.css`)
- **Framer Motion** for scroll-reveal + menu transitions
- Static export (`output: 'export'`) - builds to `out/` as plain HTML/CSS/JS

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static export to ./out
npm run lint
```

## Structure

```
app/
  layout.tsx        Root layout - fonts, metadata, Header + Footer shell
  globals.css       Design system: palette + type tokens, grain, gradient, motion
  page.tsx          Homepage composition
components/
  brand/            Wordmark + marks (asterisk, star, arrow - currentColor)
  sections/         Hero, WhoItsFor, WhatYouGet, Process, WhyObra, ClosingCTA
  Header, Footer, GradientSurface, Grain, Reveal, Marquee, Button, …
lib/
  siteConfig.ts     Name, URL, contact email, social handles, nav links
public/brand/       SVG marks + logo placeholder
```

## Notes / TODO

These are intentional placeholders standing in for assets that don't exist yet:

- **Fonts** - Display type uses **Archivo** as a heavy-grotesk fallback for
  **Breul Grotesk**. Drop the `.woff2` files into `public/fonts/` and wire
  `next/font/local` to `--font-display` in `app/layout.tsx`.
- **Gradient** - The brand gradient surface is CSS-rendered (`.obra-gradient`),
  so there's no binary dependency. A real `public/brand/gradient.jpg` can
  replace it later.
- **Logo** - `Wordmark` is typographic for brand-type consistency.
  `public/brand/obra-white.svg` is a placeholder for the eventual licensed mark.
- **Contact** - `hello@madebyobra.com` in `lib/siteConfig.ts` is a placeholder;
  confirm the exact mailbox. Instagram is `@madebyobra` (the only social).
- **Logo** - the typographic `Wordmark` stands in until the real OBRA logo
  artwork is committed to `public/brand/`, then header + footer swap to it.

Not built yet (out of scope this pass): the `/brief` form, `/privacy` page, and
the OG image.
