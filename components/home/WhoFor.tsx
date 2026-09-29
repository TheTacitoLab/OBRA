import { Sheet } from "./Sheet";
import { BigList } from "./BigList";
import { Container } from "../site/Container";
import { ArrowLink } from "../site/Button";
import { audiences, pageHref } from "@/content/site";

export function WhoFor() {
  return (
    <Sheet id="who-for" tone="ink" className="justify-center">
      <Container className="py-section">
        <h2 className="sr-only">Who we work with</h2>
        <BigList
          items={audiences.map((page) => ({
            label: page.label,
            href: pageHref(page.slug),
            intro: page.intro,
          }))}
        />
        <div className="mt-body">
          <ArrowLink href="/who-for/">Who we work with</ArrowLink>
        </div>
      </Container>
    </Sheet>
  );
}
