import { Sheet } from "./Sheet";
import { BigList } from "./BigList";
import { Container } from "../site/Container";
import { Editorial } from "../site/Editorial";
import { ArrowLink } from "../site/Button";
import { pageHref, products } from "@/content/site";

export function WhatWeMake() {
  return (
    <Sheet id="what-we-make" tone="bone" last>
      <Container className="py-section">
        <Editorial
          heading={<h2 className="type-display-xl">What we make.</h2>}
          aside={
            <div className="flex flex-col gap-5">
              <p className="type-lede text-muted">
                Proven product blocks across headwear, tees, tops, sportswear
                and more, developed into pieces that feel like part of your
                collection.
              </p>
              <ArrowLink href="/what-we-make/">Everything we make</ArrowLink>
            </div>
          }
        />
        <BigList
          className="mt-body"
          size="type-link-sm"
          items={[
            ...products.map((page) => ({
              label: page.label,
              href: pageHref(page.slug),
            })),
            { label: "+ More", href: "/what-we-make/" },
          ]}
        />
      </Container>
    </Sheet>
  );
}
