import Image from "next/image";

/**
 * Instant-photo frame: white border (thicker at the bottom), soft shadow and an
 * optional caption. Tilt / position via `className` from the parent.
 */
export function Polaroid({
  src,
  alt,
  caption,
  className = "",
}: {
  src: string;
  alt: string;
  caption?: string;
  className?: string;
}) {
  return (
    <figure
      className={`bg-white p-[5%] shadow-[0_22px_55px_-20px_rgba(0,0,0,0.75)] ${className}`}
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-slate">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(min-width: 768px) 32vw, 75vw"
          className="object-cover"
        />
      </div>
      {caption ? (
        <figcaption className="mt-[6%] pb-[1%] text-center font-mono text-[0.62rem] uppercase tracking-[0.18em] text-void/70">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
