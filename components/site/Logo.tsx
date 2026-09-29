import Link from "next/link";

/**
 * The madebyobra wordmark, rendered as a CSS mask of the supplied PNG so it
 * takes the current text colour on any surface. Sized deliberately small.
 */
export function Logo({
  className = "w-[7.5rem]",
  href = "/",
}: {
  className?: string;
  href?: string;
}) {
  return (
    <Link
      href={href}
      className={`inline-flex min-h-11 shrink-0 items-center ${className}`}
      aria-label="madebyobra home"
    >
      <span className="logo w-full" aria-hidden="true" />
    </Link>
  );
}
