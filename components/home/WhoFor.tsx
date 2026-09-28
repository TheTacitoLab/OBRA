import { Sheet } from "./Sheet";
import { BigList } from "./BigList";
import { Container } from "../site/Container";
import { audiences, pageHref } from "@/content/site";

export function WhoFor() {
  return (
    <Sheet id="who-for" tone="ink">
      <Container className="flex flex-1 flex-col justify-center py-28 md:py-36">
        <h2 className="sr-only">Who for</h2>
        <BigList
          items={audiences.map((page) => ({
            label: page.label,
            href: pageHref(page.slug),
          }))}
        />
      </Container>
    </Sheet>
  );
}
