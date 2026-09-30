import Link from "next/link";
import type { ReactNode } from "react";
import { INLINE_LINK } from "@/lib/richText";

/** Extra attributes for a link by its destination (e.g. data-track). */
export type LinkAttributes = (href: string) => Record<string, string> | undefined;

/**
 * First-party copy with inline links written as [label](/path/): the notes
 * bodies and the agencies FAQ. Site paths render as next/link, fragments
 * and anything carrying extra attributes as plain anchors (the click
 * tracker decorates those at click time, which next/link would ignore),
 * other URLs as plain anchors in the same tab.
 */
export function RichText({
  text,
  linkAttributes,
}: {
  text: string;
  linkAttributes?: LinkAttributes;
}) {
  const parts: ReactNode[] = [];
  let cursor = 0;
  for (const match of text.matchAll(INLINE_LINK)) {
    const [whole, label, href] = match;
    const start = match.index ?? 0;
    if (start > cursor) parts.push(text.slice(cursor, start));
    const extra = linkAttributes?.(href);
    parts.push(
      href.startsWith("/") && !extra ? (
        <Link key={start} href={href} className="text-link">
          {label}
        </Link>
      ) : (
        <a key={start} href={href} className="text-link" {...extra}>
          {label}
        </a>
      ),
    );
    cursor = start + whole.length;
  }
  if (cursor < text.length) parts.push(text.slice(cursor));
  return <>{parts}</>;
}
