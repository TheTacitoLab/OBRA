import { Sheet } from "./Sheet";
import { BigList } from "./BigList";
import { Container } from "../site/Container";
import { ArrowLink } from "../site/Button";
import { audiences, pageHref } from "@/content/site";

export function WhoFor() {
  return (
    <Sheet id="who-for" tone="ink" className="justify-center">
      <Container className="py-section">
        <div className="grid gap-y-8 lg:grid-cols-12 lg:items-end lg:gap-x-8">
          <div className="lg:col-span-8">
            <h2 className="sr-only">Who we work with</h2>
            <BigList
              items={audiences.map((page) => ({
                label: page.label,
                href: pageHref(page.slug),
              }))}
            />
          </div>
          <div className="flex flex-col gap-5 lg:col-span-4 lg:pb-[0.4em]">
            <p className="type-lede text-muted">
              Different audiences, one approach: original product built around
              the brand, not a blank with a logo added.
            </p>
            <ArrowLink href="/who-for/">Who we work with</ArrowLink>
          </div>
        </div>
      </Container>
    </Sheet>
  );
}
