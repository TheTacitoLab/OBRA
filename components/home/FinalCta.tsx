import { Sheet } from "./Sheet";
import { Container } from "../site/Container";
import { Editorial } from "../site/Editorial";
import { Button } from "../site/Button";
import { MarkedTitle } from "../site/MarkedTitle";
import { finalCta } from "@/content/home";
import { primaryCta } from "@/content/site";

/**
 * The close: one question, one sentence, one action, on white, sliding
 * over the end of the overview before the footer laps it in turn.
 */
export function FinalCta() {
  return (
    <Sheet
      id="get-in-touch"
      tone="white"
      last
      sectionClassName="sheet--round sheet--auto"
    >
      <Container className="py-section-lg">
        <Editorial
          heading={
            <h2 className="type-display">
              <MarkedTitle title={finalCta.title} mark={finalCta.mark} />
            </h2>
          }
          aside={
            <div className="flex flex-col gap-body" data-reveal-group="right">
              <p className="type-lede">{finalCta.copy}</p>
              <div>
                <Button
                  href={primaryCta.href}
                  track="get_in_touch_click"
                  trackSection="final_cta"
                >
                  {primaryCta.label}
                </Button>
              </div>
            </div>
          }
        />
      </Container>
    </Sheet>
  );
}
