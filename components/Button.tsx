import Link from "next/link";
import type { ReactNode } from "react";
import { Arrow } from "./brand/Marks";

type Variant = "primary" | "secondary";

/**
 * CTA link. Primary = coral on near-black (AA-safe with void text); secondary =
 * outlined. Both nudge their arrow on hover.
 */
export function Button({
  href,
  children,
  variant = "primary",
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
}) {
  const base =
    "group inline-flex items-center gap-3 rounded-full px-7 py-3.5 text-label transition-all duration-300 ease-out";

  const styles: Record<Variant, string> = {
    primary:
      "bg-coral text-void hover:-translate-y-0.5 hover:shadow-[0_14px_44px_-14px_rgba(232,95,64,0.65)]",
    secondary:
      "border border-line text-white hover:border-white hover:bg-white/5",
  };

  return (
    <Link href={href} className={`${base} ${styles[variant]} ${className}`}>
      <span>{children}</span>
      <Arrow className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
    </Link>
  );
}
