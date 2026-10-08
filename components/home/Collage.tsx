import Link from "next/link";
import type { Tile } from "@/content/homeMedia";
import { mediaSources } from "@/lib/media";
import { labelWordEm } from "@/lib/titleFit";

/**
 * An editorial collage of tiles (content/homeMedia.ts): photographs, or
 * panels of colour where no photograph exists yet, each with its label as
 * live text in the lower left (a panel also carries its one-line intro).
 * `variant` picks the section's grid (.collage--who / --make / --handle in
 * globals.css).
 *
 * Images load lazily (the collages all sit below the fold) at the width
 * the tile needs, into a fixed slot, so nothing moves as they arrive. A
 * tile with a link is one plain link whose name starts with its label.
 */
export function Collage({
  tiles,
  variant,
  event,
  section,
  className = "",
}: {
  tiles: Tile[];
  variant: "who" | "make" | "handle";
  /** The click event, e.g. "product_tile_click". */
  event: string;
  /** The analytics section name, e.g. "what_we_make". */
  section: string;
  className?: string;
}) {
  return (
    <ul className={`collage collage--${variant} ${className}`}>
      {tiles.map((tile, index) => (
        <li
          key={tile.id}
          style={{ gridArea: tile.area }}
          data-reveal="up"
          data-reveal-delay={index % 3 ? String(index % 3) : undefined}
        >
          <TileView tile={tile} event={event} section={section} />
        </li>
      ))}
    </ul>
  );
}

function TileView({
  tile,
  event,
  section,
}: {
  tile: Tile;
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
          sizes={tile.sizes}
          width={tile.photo.width}
          height={tile.photo.height}
          alt={tile.photo.alt}
          loading="lazy"
          decoding="async"
          style={{ objectPosition: tile.photo.position }}
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
