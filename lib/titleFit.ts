/**
 * Title fitting for the display face: how wide a title is, in em, set in
 * the uppercase display voice (weight 900, -0.045em tracking). A hero reads
 * this at build time and hands it to CSS (--fit-em), which sizes the h1 so
 * its longest word, or line, exactly fills the space it has:
 *
 *   font-size: min(<cap>, <available width> / <em width>)
 *
 * so a short title can run large and a long one wraps without overflowing,
 * with no per-page pixel values. See .fit-* in app/globals.css.
 *
 * Advance widths per character, measured in the browser from Figtree Black
 * with the tracking included (the sum matches whole words to within 0.1%;
 * the CSS keeps a small margin for kerning). Remeasure when the display
 * face changes (Aeonik), together with --font-ascent and --font-cap.
 */
const WIDTHS: Record<string, number> = {
  A: 0.704, B: 0.569, C: 0.684, D: 0.666, E: 0.541, F: 0.519, G: 0.682,
  H: 0.703, I: 0.26, J: 0.542, K: 0.673, L: 0.508, M: 0.823, N: 0.728,
  O: 0.752, P: 0.58, Q: 0.752, R: 0.618, S: 0.555, T: 0.569, U: 0.655,
  V: 0.705, W: 0.963, X: 0.694, Y: 0.641, Z: 0.579,
  "0": 0.61, "1": 0.385, "2": 0.552, "3": 0.522, "4": 0.6, "5": 0.542,
  "6": 0.548, "7": 0.528, "8": 0.565, "9": 0.548,
  "-": 0.355, "–": 0.5, ".": 0.241, ",": 0.241, ":": 0.301, ";": 0.302,
  "?": 0.477, "!": 0.281, "’": 0.209, "'": 0.242, "&": 0.606, " ": 0.185,
};

/**
 * Lower case, for the photography labels ("retro jerseys."), measured the
 * same way. Punctuation and the space are shared with the table above.
 */
const LOWER: Record<string, number> = {
  a: 0.501, b: 0.56, c: 0.505, d: 0.559, e: 0.521, f: 0.37, g: 0.569,
  h: 0.535, i: 0.245, j: 0.266, k: 0.541, l: 0.225, m: 0.846, n: 0.533,
  o: 0.538, p: 0.565, q: 0.56, r: 0.372, s: 0.444, t: 0.38, u: 0.533,
  v: 0.545, w: 0.838, x: 0.547, y: 0.577, z: 0.419,
};

/** Width of a run of text in em, as it would set in uppercase. */
export function textEm(text: string) {
  let em = 0;
  for (const char of text.toUpperCase()) em += WIDTHS[char] ?? 0.75;
  return Math.round(em * 1000) / 1000;
}

/** The widest single word: the one thing that can never wrap. */
export const longestWordEm = (title: string) =>
  Math.max(...title.split(/\s+/).filter(Boolean).map(textEm));

/** The widest of a title's forced lines. */
export const longestLineEm = (lines: string[]) =>
  Math.max(...lines.map(textEm));

/** The widest word of a lower-case label, as it sets (no case change). */
export const labelWordEm = (label: string) =>
  Math.max(
    ...label
      .split(/\s+/)
      .filter(Boolean)
      .map((word) => {
        let em = 0;
        for (const char of word) em += LOWER[char] ?? WIDTHS[char] ?? 0.75;
        return Math.round(em * 1000) / 1000;
      }),
  );
