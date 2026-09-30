import { Section } from "../site/Section";
import { Editorial } from "../site/Editorial";
import { ArrowLink, Button } from "../site/Button";
import { MarkedTitle } from "../site/MarkedTitle";
import { BriefTemplateLink } from "./BriefTemplateLink";
import { agencyEvents, agencyLinks } from "@/content/agencies";

/** The dark closing section of the agencies page, in place of ClosingCta. */
export function AgencyCta() {
  return (
    <Section id="send-a-brief" tone="ink" size="large" className="cta-dark">
      <Editorial
        heading={
          <h2 className="type-display">
            <MarkedTitle title="Got something live?" mark="live?" />
          </h2>
        }
        aside={
          <div className="flex flex-col gap-body">
            <div className="flex flex-col gap-4">
              <p className="type-lede">Send us whatever you have.</p>
              <p className="type-body text-muted">
                A finished specification is welcome. A deck, quantity range and
                deadline are enough to start a useful conversation.
              </p>
              <p className="type-body text-muted">
                We will look at what is realistic, where the product can be
                pushed further and which decisions matter first.
              </p>
            </div>
            <div className="flex flex-col items-start gap-3">
              <Button href={agencyLinks.start} track={agencyEvents.sendBrief}>
                Send a confidential brief
              </Button>
              <ArrowLink href={agencyLinks.start} track={agencyEvents.tradePricing}>
                Request agency trade pricing
              </ArrowLink>
              <BriefTemplateLink />
            </div>
          </div>
        }
      />
    </Section>
  );
}
