import Link from "next/link";
import { Section } from "../site/Section";
import { Editorial } from "../site/Editorial";
import { ArrowLink } from "../site/Button";
import { pageHref, products } from "@/content/site";

export function SelectedProducts() {
  return (
    <Section id="start-with-the-product" tone="ink" size="compact">
      <Editorial
        heading={<h2 className="type-display">Start with the product.</h2>}
        aside={
          <div className="flex flex-col gap-5">
            <p className="type-lede text-muted">
              Six categories we develop most often. Every one starts from a
              block that has already run at volume.
            </p>
            <ArrowLink href="/what-we-make/">All categories</ArrowLink>
          </div>
        }
      />
      <ul className="mt-body grid gap-x-10 md:grid-cols-2">
        {products.map((product, index) => (
          <li
            key={product.slug}
            className={`border-t border-line ${
              index === products.length - 1 ? "border-b" : ""
            } ${index === products.length - 2 ? "md:border-b" : ""}`}
          >
            <Link
              href={pageHref(product.slug)}
              className="flex min-h-[4.5rem] flex-col justify-center gap-1.5 py-4"
            >
              <span className="type-title">
                <span className="u-wipe u-lime">{product.label}</span>
              </span>
              <span className="type-body max-w-[36ch] text-muted">
                {product.intro}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  );
}
