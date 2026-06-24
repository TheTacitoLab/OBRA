import Image from "next/image";
import { Grain } from "./Grain";
import { Asterisk } from "./brand/Marks";

/**
 * Jersey image frame. Pass `src` to show real product photography; without it,
 * renders an intentional mono-labelled placeholder. Set the shape via
 * `className` (e.g. `aspect-[4/5]`).
 */
export function JerseySlot({
  label,
  caption = "Shot coming",
  accent = "text-yellow",
  variant = "gradient",
  className = "",
  src,
  alt = "",
}: {
  label?: string;
  caption?: string;
  accent?: string;
  variant?: "gradient" | "slate";
  className?: string;
  src?: string;
  alt?: string;
}) {
  if (src) {
    return (
      <div
        className={`group relative isolate overflow-hidden rounded-sm border border-line bg-slate ${className}`}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(min-width: 768px) 45vw, 90vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        />
      </div>
    );
  }

  return (
    <div
      className={`relative isolate overflow-hidden rounded-sm border border-line bg-slate ${className}`}
    >
      {variant === "gradient" && (
        <div aria-hidden className="absolute inset-0 obra-gradient opacity-35" />
      )}
      <Grain opacity={0.1} />

      {/* Brand motif watermark */}
      <Asterisk className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 text-white/[0.06]" />

      {/* Mono frame labels */}
      <div className="absolute inset-0 flex flex-col justify-between p-5">
        <div className="flex items-start justify-between gap-3">
          <span className="text-tag text-ash">{label}</span>
          <Asterisk className={`h-3.5 w-3.5 ${accent}`} />
        </div>
        <div className="flex items-end justify-between gap-3">
          <span className="text-tag text-ash">{caption}</span>
          <span className="text-tag text-ash">OBRA</span>
        </div>
      </div>
    </div>
  );
}
