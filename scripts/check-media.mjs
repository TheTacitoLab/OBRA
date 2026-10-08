/**
 * Confirms every photograph in content/homeMedia.ts is publicly reachable,
 * as the original file and through the resizing endpoint the pages use.
 * Run after adding or renaming an image: `npm run check:media`. Exits
 * non-zero if any image would render broken.
 *
 * Reads the filenames straight from the manifest source (every
 * `file: "..."`) so there is no second list to keep in step.
 */
import { readFileSync } from "node:fs";

const PROJECT = "https://odfpmwgwnyexuxqbusvi.supabase.co/storage/v1";
const FOLDER = "Website%20Builds/madebyobra";

const source = readFileSync("content/homeMedia.ts", "utf8");
const files = [...new Set([...source.matchAll(/file:\s*"([^"]+)"/g)].map((m) => m[1]))];

let failed = 0;
for (const file of files) {
  const name = encodeURIComponent(file);
  const checks = [
    ["original", `${PROJECT}/object/public/${FOLDER}/${name}`],
    ["resized", `${PROJECT}/render/image/public/${FOLDER}/${name}?width=480&quality=72`],
  ];
  for (const [kind, url] of checks) {
    const response = await fetch(url, {
      method: kind === "original" ? "HEAD" : "GET",
      headers: { Accept: "image/webp,image/*" },
    });
    const ok = response.ok && (response.headers.get("content-type") ?? "").startsWith("image/");
    if (!ok) failed += 1;
    console.log(`${ok ? "ok  " : "FAIL"} ${kind.padEnd(8)} ${file} (${response.status})`);
  }
}

console.log(`\n${files.length} images, ${failed} failed.`);
process.exit(failed ? 1 : 0);
