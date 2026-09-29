import Link from "next/link";

export type BigLink = { label: string; href: string; intro?: string };

/**
 * The enormous link list used by Who For and What We Make: hairline rows,
 * siblings easing back, and on hover either the lime underline wiping in
 * (the site's default) or, for the homepage audiences, the lime block
 * behind the heading.
 */
export function BigList({
  items,
  size = "type-link",
  hover = "underline",
  className = "",
}: {
  items: BigLink[];
  size?: "type-link" | "type-link-sm" | "type-link-xs";
  hover?: "underline" | "block";
  className?: string;
}) {
  const label = hover === "block" ? "mark-hover" : "u-wipe u-lime";
  const list = hover === "block" ? "biglist biglist--block" : "biglist";
  return (
    <ul className={`${list} flex flex-col ${className}`}>
      {items.map((item) => (
        <li key={item.href}>
          <Link href={item.href} className={`biglink ${size}`}>
            <span className={label}>{item.label}</span>
            {item.intro && (
              <span className="biglink__intro">{item.intro}</span>
            )}
          </Link>
        </li>
      ))}
    </ul>
  );
}
