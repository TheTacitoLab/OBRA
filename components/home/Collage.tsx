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
 * An editorial collage of tiles (content/homeMedia.ts): photographs, or
 * panels of colour where no photograph exists yet, each with its label as
 * live text in the lower left (a panel also carries its one-line intro).
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
  const aspects = Object.fromEntries(
    tiles.map((tile) => [tile.id, tile.photo?.aspect ?? tile.aspect ?? 1]),
  );
  const grids = Object.fromEntries(
    BREAKPOINTS.map((bp) => [bp, mosaicGrid(layout[bp], aspects)]),
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
  const className = `tile ${tile.photo ? "tile--photo" : ""}`;
  const body = (
    <>
      <span
        className="tile__label"
        style={{ "--label-em": labelWordEm(tile.label) } as React.CSSProperties}
      >
        {tile.label}
      </span>
      {!tile.photo && tile.intro && (
        <span className="tile__intro">{tile.intro}</span>
      )}
      {tile.photo && (
        // A plain img: the static export runs with `images.unoptimized`,
        // and Supabase's render endpoint does the resizing (lib/media.ts).
        // eslint-disable-next-line @next/next/no-img-element
        <img
          className="tile__media"
          {...mediaSources(tile.photo.file)}
          sizes={sizes}
          width={tile.photo.width}
          height={tile.photo.height}
          alt={tile.photo.alt}
          loading="lazy"
          decoding="async"
          style={
            {
              objectPosition: tile.photo.position,
              "--media-pos": tile.photo.position,
              "--zoom": Math.max(1, tile.photo.zoom ?? 1),
            } as React.CSSProperties
          }
        />
      )}
    </>
  );
  const tone = tile.photo ? undefined : tile.tone;

  if (!tile.href) {
    return (
      <div className={className} data-tone={tone}>
        {body}
      </div>
    );
  }
  return (
    <Link
      href={tile.href}
      className={className}
      data-tone={tone}
      data-track={event}
      data-track-section={section}
      data-track-category={tile.id}
    >
      {body}
    </Link>
  );
}
