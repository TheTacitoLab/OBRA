/**
 * A real photograph from public/. Width and height are the file's own
 * pixel size (they set the aspect ratio, so nothing shifts as it loads);
 * alt describes what is visible, or is empty for a purely decorative shot.
 */
export type GuideImage = {
  src: string;
  width: number;
  height: number;
  alt: string;
  caption?: string;
  /** Shown above the caption, e.g. "Approved sample" or "Concept". */
  label?: string;
};

/**
 * One or two photographs across the main column, lazy-loaded (they sit
 * below the fold wherever they are used). Renders nothing for an empty list,
 * so a section can reserve its images before any exist.
 *
 * A plain img: the static export runs with `images.unoptimized`, so
 * next/image would add client JavaScript without resizing anything. Export
 * the files at display size (about 1600px wide) as WebP or AVIF.
 */
export function Figures({ images }: { images: GuideImage[] }) {
  if (images.length === 0) return null;
  return (
    <div
      className={`guide-wide grid gap-4 ${images.length > 1 ? "sm:grid-cols-2" : ""}`}
    >
      {images.map((image) => (
        <figure key={image.src}>
          {/* eslint-disable-next-line @next/next/no-img-element -- see above */}
          <img
            src={image.src}
            width={image.width}
            height={image.height}
            alt={image.alt}
            loading="lazy"
            decoding="async"
            className="h-auto w-full rounded-[2px] bg-stone"
          />
          {(image.label || image.caption) && (
            <figcaption className="type-meta mt-3 text-muted">
              {image.label && (
                <span className="mr-2 font-semibold uppercase tracking-[0.06em] text-fg">
                  {image.label}
                </span>
              )}
              {image.caption}
            </figcaption>
          )}
        </figure>
      ))}
    </div>
  );
}
