import Link from "next/link";
import { pageHref, type PageEntry } from "@/content/site";

/**
 * The editorial product index on What we make: hairline rows between
 * products, the whole row a link, label and intro on one 12-column row from
 * md, stacked on phones. The label keeps the product-link voice but steps
 * down from md, where it shares the row with the intro.
 */
export function ProductIndex({ products }: { products: PageEntry[] }) {
  return (
    <div className="index-list">
      {products.map((product) => (
        <Link
          key={product.slug}
          href={pageHref(product.slug)}
          className="index-row grid gap-y-2 md:grid-cols-12 md:gap-x-8 md:gap-y-0 lg:gap-x-12"
        >
          <h2 className="type-link-xs md:col-span-7">
            <span className="u-wipe u-lime">{product.label}</span>
          </h2>
          <p className="type-body mt-1 text-muted md:col-span-5 md:mt-0 md:self-end md:pb-[0.2em]">
            {product.intro}
          </p>
        </Link>
      ))}
    </div>
  );
}
