/**
 * Keeps non-production Netlify builds out of search indexes.
 *
 * Netlify already sends `X-Robots-Tag: noindex` for Deploy Previews, but not
 * for a branch's most recent branch deploy, which can be indexed as a
 * duplicate of the live site. Netlify sets CONTEXT on every build
 * (production, deploy-preview, branch-deploy); for anything other than
 * production this adds a catch-all noindex header to out/_headers.
 *
 * Runs as npm's `postbuild`, so only when the build command is
 * `npm run build`. Production, local builds (no CONTEXT) and a missing out/
 * are all left untouched: this can never noindex the live site.
 */
import { appendFileSync, existsSync } from "node:fs";

const context = process.env.CONTEXT;

if (!context || context === "production") process.exit(0);

if (!existsSync("out")) {
  console.warn("preview-noindex: no out/ directory; nothing to do.");
  process.exit(0);
}

appendFileSync("out/_headers", "\n/*\n  X-Robots-Tag: noindex\n");
console.log(`preview-noindex: X-Robots-Tag: noindex set for this ${context} build.`);
