/**
 * Homepage photography lives in the public "Website Builds" bucket of the
 * madebyobra Supabase project, in its madebyobra/ folder. Public objects
 * need no key or signed URL; nothing here is a credential.
 *
 * Images are served through Supabase's image transformation endpoint
 * (render/image), which resizes on request and returns WebP to browsers
 * that accept it, cached at the edge: a 1080 x 1350 PNG of 2-3MB becomes
 * 50-160KB per tile. If transformations are ever switched off for the
 * project, set TRANSFORM to false and every image falls back to the
 * original file (no srcset), so nothing breaks.
 */
const PROJECT = "https://odfpmwgwnyexuxqbusvi.supabase.co/storage/v1";
const FOLDER = "Website%20Builds/madebyobra";
const TRANSFORM = true;

/** The widths each photograph is offered at (the sources are 1024-1080 wide). */
const WIDTHS = [480, 720, 1080] as const;
const QUALITY = 72;

/** A file in the V3 Website folder, the current photography. */
export const v3 = (name: string) => `V3 Website/${name}`;

// Encoded segment by segment, so a file in a subfolder ("V3 Website/x.png")
// keeps its slash.
const encode = (file: string) => file.split("/").map(encodeURIComponent).join("/");

/** The original file. */
export const mediaUrl = (file: string) =>
  `${PROJECT}/object/public/${FOLDER}/${encode(file)}`;

// resize=contain scales the whole photograph down to the width. The
// endpoint's default (cover) keeps the original height when only a width is
// given, which returns a narrow centre slice of the picture, not a smaller
// copy of it.
const renderUrl = (file: string, width: number) =>
  `${PROJECT}/render/image/public/${FOLDER}/${encode(file)}?width=${width}&resize=contain&quality=${QUALITY}`;

/** src and srcSet for an <img>; sizes comes from the tile's layout. */
export function mediaSources(file: string) {
  if (!TRANSFORM) return { src: mediaUrl(file) };
  return {
    src: renderUrl(file, 720),
    srcSet: WIDTHS.map((width) => `${renderUrl(file, width)} ${width}w`).join(", "),
  };
}
