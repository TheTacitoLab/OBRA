import Link from "next/link";
import type { CollageLayout, Tile } from "@/content/homeMedia";
import { mediaSources } from "@/lib/media";
import { mosaicGrid, type MosaicGrid } from "@/lib/mosaic";
import { labelWordEm } from "@/lib/titleFit";

const BREAKPOINTS = ["sm", "md", "lg"] as const;
type Breakpoint = (typeof BREAKPOINTS)[number];

/** Viewport widths the `sizes` attribute switches at (matches the CSS). */
const SIZES_MEDIA: Record<Breakpoint, string> = {
  lg: "(min-width: 1024px)",
  md: "(min-width: 768px)",
  sm: "",
};

/**
 * An editorial collage of photographs (content/homeMedia.ts), each with
 * its label as live text in the lower left and nothing else over it.
 *
 * The arrangement comes from the section's layout at each breakpoint, and
 * every tile is sized to its photograph's chosen frame (lib/mosaic.ts):
 * the grid's tracks and the collage's own aspect ratio are worked out here
 * at build time and handed to CSS as custom properties (.collage in
 * globals.css). Each image's `sizes` follows from its share of the width.
 *
 * Images load lazily (the collages all sit below the fold) into fixed
 * frames, so nothing moves as they arrive. A tile with a link is one plain
 * link whose name starts with its label.
 */
export function Collage({
  tiles,
  layout,
  event,
  section,
  className = "",
}: {
  tiles: Tile[];
  layout: CollageLayout;
  /** The click event, e.g. "product_tile_click". */
  event: string;
  /** The analytics section name, e.g. "what_we_make". */
  section: string;
  className?: string;
}) {
  // Each photograph's frame: its phone frame below 768px where it has one.
  const aspectsFor = (bp: Breakpoint) =>
    Object.fromEntries(
      tiles.map((tile) => [
        tile.id,
        (bp === "sm" ? tile.photo.mobile?.aspect : undefined) ?? tile.photo.aspect,
      ]),
    );
  const grids = Object.fromEntries(
    BREAKPOINTS.map((bp) => [bp, mosaicGrid(layout[bp], aspectsFor(bp))]),
  ) as Record<Breakpoint, MosaicGrid>;

  // Every tile placed exactly once at every breakpoint.
  for (const bp of BREAKPOINTS) {
    const placed = Object.keys(grids[bp].cells).sort().join();
    const expected = tiles.map((tile) => tile.id).sort().join();
    if (placed !== expected) {
      throw new Error(`Collage: the ${bp} layout places [${placed}], expected [${expected}]`);
    }
  }

  const gridStyle: Record<string, string> = {};
  for (const bp of BREAKPOINTS) {
    gridStyle[`--ar-${bp}`] = grids[bp].aspect.toFixed(4);
    gridStyle[`--cols-${bp}`] = grids[bp].columns;
    gridStyle[`--rows-${bp}`] = grids[bp].rows;
  }

  return (
    <ul className={`collage ${className}`} style={gridStyle as React.CSSProperties}>
      {tiles.map((tile, index) => {
        const cellStyle: Record<string, string> = {};
        for (const bp of BREAKPOINTS) {
          cellStyle[`--gc-${bp}`] = grids[bp].cells[tile.id].column;
          cellStyle[`--gr-${bp}`] = grids[bp].cells[tile.id].row;
        }
        const sizes = BREAKPOINTS.slice()
          .reverse()
          .map((bp) => {
            const vw = `${Math.ceil(grids[bp].cells[tile.id].width * 100)}vw`;
            return SIZES_MEDIA[bp] ? `${SIZES_MEDIA[bp]} ${vw}` : vw;
          })
          .join(", ");
        return (
          <li
            key={tile.id}
            style={cellStyle as React.CSSProperties}
            data-reveal="up"
            data-reveal-delay={index % 3 ? String(index % 3) : undefined}
          >
            <TileView tile={tile} sizes={sizes} event={event} section={section} />
          </li>
        );
      })}
    </ul>
  );
}

function TileView({
  tile,
  sizes,
  event,
  section,
}: {
  tile: Tile;
  sizes: string;
  event: string;
  section: string;
}) {
  const { photo } = tile;
  const className = [
    "tile tile--photo",
    photo.labels === "ink" && "tile--ink",
    photo.tint && "tile--tint",
  ]
    .filter(Boolean)
    .join(" ");
  // The soft colour laid over the photograph (globals.css, .tile--tint).
  const tileStyle = photo.tint
    ? ({ "--tint": `var(--color-${photo.tint})` } as React.CSSProperties)
    : undefined;
  const zoom = (value?: number) => String(Math.max(1, value ?? 1));
  const body = (
    <>
      <span
        className="tile__label"
        style={{ "--label-em": labelWordEm(tile.label) } as React.CSSProperties}
      >
        {tile.label}
      </span>
      {/* A plain img: the static export runs with `images.unoptimized`,
          and Supabase's render endpoint does the resizing (lib/media.ts).
          The crop is set per breakpoint from the manifest: the phone
          framing below 768px, the desktop framing above. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className="tile__media"
        {...mediaSources(photo.file)}
        sizes={sizes}
        width={photo.width}
        height={photo.height}
        alt={photo.alt}
        loading="lazy"
        decoding="async"
        style={
          {
            "--media-pos": photo.position,
            "--media-pos-sm": photo.mobile?.position ?? photo.position,
            "--zoom": zoom(photo.zoom),
            "--zoom-sm": zoom(photo.mobile?.zoom ?? photo.zoom),
          } as React.CSSProperties
        }
      />
    </>
  );

  if (!tile.href) {
    return (
      <div className={className} style={tileStyle}>
        {body}
      </div>
    );
  }
  return (
    <Link
      href={tile.href}
      className={className}
      style={tileStyle}
      data-track={event}
      data-track-section={section}
      data-track-category={tile.id}
    >
      {body}
    </Link>
  );
}
