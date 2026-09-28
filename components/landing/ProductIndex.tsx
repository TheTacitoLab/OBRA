import Link from "next/link";
import { pageHref, type PageEntry } from "@/content/site";

// The underline lives on a span inside the heading, so the row (the `a`)
// drives it through the group: `a:hover > .u-wipe` in globals.css only
// reaches direct children.
const wipe =
  "u-wipe u-lime group-hover:[background-size:100%_var(--u-size)] group-hover:[background-position:0_100%] group-focus-visible:[background-size:100%_var(--u-size)] group-focus-visible:[background-position:0_100%]";

/**
 * The editorial product index on What we make: hairline rows, the whole row
 * a link. Number, label and intro run as one 12-column row from md; on
 * phones the number sits above the label and the intro beneath it.
 *
 * The label keeps the type-link-sm weight and tracking but steps down in
 * size from md, where it shares the row with the intro: "TRAININGWEAR" at
 * the full type-link-sm size would not fit a 6/12 column between 768px and
 * 1440px.
 */
export function ProductIndex({ products }: { products: PageEntry[] }) {
  return (
    <div className="index-list">
      {products.map((product, index) => (
        <Link
          key={product.slug}
          href={pageHref(product.slug)}
          className="index-row group grid gap-y-2 md:grid-cols-12 md:gap-x-8 md:gap-y-0 lg:gap-x-12"
        >
          <span className="type-meta text-muted md:col-span-1 md:pt-1">
            {String(index + 1).padStart(2, "0")}
          </span>
          <h2 className="type-link-xs md:col-span-6">
            <span className={wipe}>{product.label}</span>
          </h2>
          <p className="type-body mt-1 text-muted md:col-span-5 md:mt-0 md:self-end md:pb-[0.2em]">
            {product.intro}
          </p>
        </Link>
      ))}
    </div>
  );
}
