/**
 * Typographic OBRA wordmark, set in the display family for consistency with the
 * rest of the brand type. Size + colour are controlled by the parent via
 * `className` (defaults to currentColor).
 *
 * NOTE: a `/public/brand/obra-white.svg` placeholder exists for the eventual
 * real logo — when the licensed mark arrives, swap this for a `next/image`.
 */
export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span
      className={`font-display font-black uppercase leading-[0.82] tracking-[-0.04em] select-none ${className}`}
    >
      OBRA
    </span>
  );
}
