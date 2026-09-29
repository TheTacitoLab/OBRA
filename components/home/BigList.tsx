import Link from "next/link";

export type BigLink = { label: string; href: string; intro?: string };

/**
 * The enormous link list used by Who For and What We Make: hairline rows,
 * lime underline wiping in on hover, siblings easing back.
 */
export function BigList({
  items,
  size = "type-link",
  className = "",
}: {
  items: BigLink[];
  size?: "type-link" | "type-link-sm" | "type-link-xs";
  className?: string;
}) {
  return (
    <ul className={`biglist flex flex-col ${className}`}>
      {items.map((item) => (
        <li key={item.href}>
          <Link href={item.href} className={`biglink ${size}`}>
            <span className="u-wipe u-lime">{item.label}</span>
            {item.intro && (
              <span className="biglink__intro">{item.intro}</span>
            )}
          </Link>
        </li>
      ))}
    </ul>
  );
}
