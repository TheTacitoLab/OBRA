import { Sheet } from "./Sheet";
import { BigList } from "./BigList";
import { Container } from "../site/Container";
import { pageHref, products } from "@/content/site";

export function WhatWeMake() {
  return (
    <Sheet id="what-we-make" tone="ink">
      <Container className="flex flex-1 flex-col py-28 md:py-36">
        <h2 className="type-display">What we make.</h2>
        <BigList
          className="mt-14 md:mt-20"
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
