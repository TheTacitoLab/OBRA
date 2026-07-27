import type { AssetPlaceholder as Asset } from "@/content/festival-landing";

/**
 * Visible placeholder for an image asset OBRA has not supplied yet.
 *
 * Deliberately obvious rather than decorative: no stock photography, no
 * AI-generated imagery and no unrelated image reused to fill the slot. The
 * reserved aspect ratio matches the specified asset so dropping the real file
 * in later causes no layout shift.
 */
export function AssetPlaceholder({
  asset,
  className = "",
}: {
  asset: Asset;
  className?: string;
}) {
  return (
    <div
      className={`flex flex-col justify-end gap-2 rounded-sm border border-dashed border-line bg-obsidian p-5 ${asset.ratio} ${className}`}
    >
      <p className="text-tag text-yellow">Image to supply</p>
      <p className="text-body text-ash">{asset.label}</p>
      <p className="text-tag break-all text-mute">{asset.filename}</p>
    </div>
  );
}
