/**
 * Confirms every photograph in content/homeMedia.ts is publicly reachable,
 * as the original file and through the resizing endpoint the pages use,
 * and that the resized copy is the whole photograph scaled down rather
 * than a crop of it.
 * Run after adding or renaming an image: `npm run check:media`. Exits
 * non-zero if any image would render broken.
 *
 * Reads the filenames straight from the manifest source (every
 * `file: "..."` or `file: v3("...")`) so there is no second list to keep
 * in step.
 */
import { readFileSync } from "node:fs";

const PROJECT = "https://odfpmwgwnyexuxqbusvi.supabase.co/storage/v1";
const FOLDER = "Website%20Builds/madebyobra";

const source = readFileSync("content/homeMedia.ts", "utf8");
// `file: "x.png"` or `file: v3("x.png")` (the V3 Website folder).
const files = [
  ...new Set(
    [...source.matchAll(/file:\s*(v3\()?"([^"]+)"/g)].map((m) =>
      m[1] ? `V3 Website/${m[2]}` : m[2],
    ),
  ),
];

/** Width and height of a PNG or WebP, from its header. */
function dimensions(buf) {
  if (buf.toString("ascii", 1, 4) === "PNG") return [buf.readUInt32BE(16), buf.readUInt32BE(20)];
  if (buf.toString("ascii", 0, 4) !== "RIFF" || buf.toString("ascii", 8, 12) !== "WEBP") return null;
  const chunk = buf.toString("ascii", 12, 16);
  if (chunk === "VP8X") return [1 + buf.readUIntLE(24, 3), 1 + buf.readUIntLE(27, 3)];
  if (chunk === "VP8 ") return [buf.readUInt16LE(26) & 0x3fff, buf.readUInt16LE(28) & 0x3fff];
  if (chunk === "VP8L") {
    const bits = buf.readUInt32LE(21);
    return [1 + (bits & 0x3fff), 1 + ((bits >> 14) & 0x3fff)];
  }
  return null;
}

let failed = 0;
for (const file of files) {
  const name = file.split("/").map(encodeURIComponent).join("/");
  const checks = [
    ["original", `${PROJECT}/object/public/${FOLDER}/${name}`],
    ["resized", `${PROJECT}/render/image/public/${FOLDER}/${name}?width=480&resize=contain&quality=72`],
  ];
  // The resized copy must be the whole photograph, smaller: same shape as
  // the original (a resize that keeps the full height returns a crop).
  let shape = null;
  for (const [kind, url] of checks) {
    const response = await fetch(url, { headers: { Accept: "image/webp,image/*" } });
    let ok = response.ok && (response.headers.get("content-type") ?? "").startsWith("image/");
    let note = `${response.status}`;
    if (ok) {
      const size = dimensions(Buffer.from(await response.arrayBuffer()));
      if (size) {
        note += `, ${size[0]}x${size[1]}`;
        if (kind === "original") shape = size[0] / size[1];
        else if (shape && Math.abs(size[0] / size[1] - shape) > 0.02) {
          ok = false;
          note += ", cropped rather than scaled";
        }
      }
    }
    if (!ok) failed += 1;
    console.log(`${ok ? "ok  " : "FAIL"} ${kind.padEnd(8)} ${file} (${note})`);
  }
}

console.log(`\n${files.length} images, ${failed} failed.`);
process.exit(failed ? 1 : 0);
