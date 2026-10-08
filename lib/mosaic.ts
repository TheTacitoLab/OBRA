/**
 * Mosaic layouts for the homepage collages, built around the photographs
 * rather than the other way round.
 *
 * A layout is a tree of rows and columns whose leaves are tile ids. Every
 * tile has an aspect ratio, the frame its photograph is best seen in
 * (content/homeMedia.ts); a leaf can override it for one breakpoint. A row
 * sets its tiles side by side at one height, so its aspect is the sum of
 * theirs; a column stacks them at one width, so its aspect is
 * 1 / sum(1 / aspect). From the tree this computes, at build time:
 *
 * - the whole collage's aspect ratio (its height follows its width, so the
 *   tiles keep their shape at every screen size within a breakpoint);
 * - the grid's column and row tracks, in fr;
 * - each tile's grid lines and its share of the width (for `sizes`).
 *
 * Each tile is then shown at (very nearly) its chosen frame: change a
 * tile's aspect in the manifest and the layout reflows around it. The only
 * drift is the gaps between tiles, a few pixels that object-fit absorbs.
 */

export type MosaicLeaf = string | { id: string; aspect: number };
export type MosaicNode = MosaicLeaf | { row: MosaicNode[] } | { col: MosaicNode[] };

export type MosaicCell = {
  column: string;
  row: string;
  /** Share of the collage's width, 0-1. */
  width: number;
};

export type MosaicGrid = {
  aspect: number;
  columns: string;
  rows: string;
  cells: Record<string, MosaicCell>;
};

const isRow = (node: MosaicNode): node is { row: MosaicNode[] } =>
  typeof node === "object" && "row" in node;
const isCol = (node: MosaicNode): node is { col: MosaicNode[] } =>
  typeof node === "object" && "col" in node;
const leafId = (leaf: MosaicLeaf) => (typeof leaf === "string" ? leaf : leaf.id);

function aspectOf(node: MosaicNode, aspects: Record<string, number>): number {
  if (isRow(node)) return node.row.reduce((sum, child) => sum + aspectOf(child, aspects), 0);
  if (isCol(node))
    return 1 / node.col.reduce((sum, child) => sum + 1 / aspectOf(child, aspects), 0);
  const id = leafId(node);
  const aspect = typeof node === "string" ? aspects[id] : node.aspect;
  if (!aspect) throw new Error(`mosaic: no aspect for tile "${id}"`);
  return aspect;
}

type Box = { id: string; x: number; y: number; w: number; h: number };

function place(
  node: MosaicNode,
  aspects: Record<string, number>,
  x: number,
  y: number,
  w: number,
  h: number,
  out: Box[],
) {
  if (isRow(node)) {
    let cx = x;
    for (const child of node.row) {
      const cw = h * aspectOf(child, aspects);
      place(child, aspects, cx, y, cw, h, out);
      cx += cw;
    }
  } else if (isCol(node)) {
    let cy = y;
    for (const child of node.col) {
      const ch = w / aspectOf(child, aspects);
      place(child, aspects, x, cy, w, ch, out);
      cy += ch;
    }
  } else {
    out.push({ id: leafId(node), x, y, w, h });
  }
}

/** Sorted, de-duplicated track edges (floating-point safe). */
function edges(values: number[]) {
  const sorted = [...values].sort((a, b) => a - b);
  return sorted.filter((v, i) => i === 0 || v - sorted[i - 1] > 1e-6);
}
const indexOf = (list: number[], value: number) =>
  list.findIndex((v) => Math.abs(v - value) <= 1e-6) + 1;
// Tracks as fr, scaled so each axis sums to 100: flexible tracks whose
// factors add up to less than 1 only fill that fraction of the grid.
const fr = (list: number[]) => {
  const total = list[list.length - 1] - list[0];
  return list
    .slice(1)
    .map((v, i) => `minmax(0, ${(((v - list[i]) / total) * 100).toFixed(3)}fr)`)
    .join(" ");
};

export function mosaicGrid(
  tree: MosaicNode,
  aspects: Record<string, number>,
): MosaicGrid {
  const aspect = aspectOf(tree, aspects);
  const boxes: Box[] = [];
  place(tree, aspects, 0, 0, aspect, 1, boxes);
  const xs = edges(boxes.flatMap((b) => [b.x, b.x + b.w]));
  const ys = edges(boxes.flatMap((b) => [b.y, b.y + b.h]));
  const cells: Record<string, MosaicCell> = {};
  for (const b of boxes) {
    cells[b.id] = {
      column: `${indexOf(xs, b.x)} / ${indexOf(xs, b.x + b.w)}`,
      row: `${indexOf(ys, b.y)} / ${indexOf(ys, b.y + b.h)}`,
      width: b.w / aspect,
    };
  }
  return { aspect, columns: fr(xs), rows: fr(ys), cells };
}
