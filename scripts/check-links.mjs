/**
 * Dead-link check for the built site. Reads every page in out/, collects
 * each internal href, and confirms it resolves to a built page and, for a
 * #fragment, to an element with that id on the target page. Run after
 * `npm run build`: `npm run check:links`. Exits non-zero on a dead link.
 *
 * Redirected URLs (netlify.toml) are not built pages, so a link to one is
 * reported too: internal links should point at the final URL.
 */
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const OUT = "out";
if (!existsSync(OUT)) {
  console.error("check-links: no out/ directory. Run `npm run build` first.");
  process.exit(1);
}

const pages = new Map();
const walk = (dir) => {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) {
      if (name !== "_next") walk(path);
    } else if (name.endsWith(".html")) {
      const route = "/" + path.slice(OUT.length + 1).replace(/index\.html$/, "").replace(/\.html$/, "/");
      pages.set(route === "//" ? "/" : route, readFileSync(path, "utf8"));
    }
  }
};
walk(OUT);

const ids = (html) => new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]));
const assets = (route) => existsSync(join(OUT, route));

const dead = [];
for (const [route, html] of pages) {
  for (const [, raw] of html.matchAll(/<a\b[^>]*\shref="([^"]+)"/g)) {
    const href = raw.replace(/&amp;/g, "&");
    if (/^(https?:|mailto:|tel:)/.test(href)) continue;
    const [pathPart, fragment] = href.split("#");
    const path = (pathPart || route).split("?")[0];
    const target = pages.get(path);
    if (!target) {
      if (!assets(path)) dead.push(`${route} -> ${href} (no page)`);
      continue;
    }
    if (fragment && !ids(target).has(decodeURIComponent(fragment))) {
      dead.push(`${route} -> ${href} (no #${fragment})`);
    }
  }
}

if (dead.length) {
  console.log([...new Set(dead)].join("\n"));
  console.log(`\n${dead.length} dead internal links across ${pages.size} pages.`);
  process.exit(1);
}
console.log(`No dead internal links across ${pages.size} pages.`);
