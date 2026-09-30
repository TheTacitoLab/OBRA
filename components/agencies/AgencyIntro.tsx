import { ScrollCue } from "../home/ScrollCue";
import { ArrowLink, Button } from "../site/Button";
import { Container } from "../site/Container";
import { Editorial } from "../site/Editorial";
import { MarkedTitle } from "../site/MarkedTitle";
import { Section } from "../site/Section";
import { agencyEvents, agencyLinks } from "@/content/agencies";
import { longestLineEm, longestWordEm } from "@/lib/titleFit";

/** The h1, one forced line per entry (the last on the lime block). */
const titleLines = ["Custom merchandise", "production for", "agencies."];

/**
 * The top of /agencies/, in the homepage's voice: the hero, three
 * alternating editorial sections and one choice (the guide, or enquire).
 * The detailed guide follows on the same page (#agency-guide).
 */
export function AgencyHero() {
  const fit = {
    "--fit-line": longestLineEm(titleLines),
    "--fit-word": longestWordEm(titleLines.join(" ")),
  } as React.CSSProperties;
  return (
    <section data-tone="bone" className="bg-bg text-fg">
      {/* The frame the scroll cue pins itself to (ScrollCue.tsx). */}
      <Container data-hero-frame className="agency-hero hero-pad pb-12 lg:pb-16" style={fit}>
        <h1 className="agency-hero__title">
          {titleLines.map((line, index) => {
            const last = index === titleLines.length - 1;
            return (
              <span
                key={line}
                className="rise-line"
                style={{ "--d": `${index * 0.08}s` } as React.CSSProperties}
              >
                <span>{last ? <MarkedTitle title={line} mark={line} /> : `${line} `}</span>
              </span>
            );
          })}
        </h1>
        <div
          className="fade-in mt-head flex flex-col gap-7 pr-16 md:pr-0"
          style={{ "--d": "0.4s" } as React.CSSProperties}
        >
          <p className="type-lede !max-w-[40ch]">
            We work behind creative, experiential and activation agencies to
            turn client briefs into original products. From early feasibility
            and sampling through to manufacturing, packing and delivery.
          </p>
          <div>
            <Button href="#made-for-agencies" plain arrow="down">
              See how we work
            </Button>
          </div>
        </div>
      </Container>
      <ScrollCue next="#made-for-agencies h2" />
    </section>
  );
}

export function AgencyIntro() {
  return (
    <>
      <Section id="made-for-agencies" tone="stone" size="large" rounded className="scroll-mt-12">
        <Editorial
          align="start"
          heading={
            <h2 className="type-display type-display-long">
              Made for the way <br className="hidden md:block" />
              agencies work.
            </h2>
          }
          aside={
            <div className="flex flex-col gap-5" data-reveal-group="right">
              <p className="type-lede">
                Client brief still moving? Quantity not quite locked? Deadline
                very much locked?
              </p>
              <p className="type-body text-muted">That is fairly normal.</p>
              <p className="type-body text-muted">
                We can help establish what is realistic, what the product
                should cost and which production route makes sense before you
                commit the client to something awkward.
              </p>
              <p className="type-body text-muted">
                From early feasibility through to sampling and production, the
                aim is to give your team useful answers while there is still
                time to make good decisions.
              </p>
            </div>
          }
        />
      </Section>

      <Section tone="ink" size="large" rounded>
        <Editorial
          reverse
          wide
          headingAlign="right"
          mobileAlignRight
          align="start"
          heading={
            <h2 className="type-display type-display-long">
              More of the budget <br className="hidden md:block" />
              goes into the product.
            </h2>
          }
          aside={
            <div className="flex flex-col gap-5" data-reveal-group="left">
              <p className="type-lede">
                madebyobra works directly with manufacturing partners rather
                than buying finished merchandise through layers of resellers.
              </p>
              <p className="type-body text-muted">
                At the right quantities, that can mean spending the same sort
                of overall budget on something considerably more original than
                a premium blank with decoration added afterwards.
              </p>
              <p className="type-body text-muted">
                It also gives us more freedom to talk about the things that
                actually make the product better: fabric, construction, trims,
                finishing and how the collection works as a whole.
              </p>
              <p className="intro-callout">
                Compare the finished cost, not the blank price.
              </p>
            </div>
          }
        />
      </Section>

      <Section tone="bone" size="large" rounded>
        <Editorial
          align="start"
          heading={
            <h2 className="type-display">
              <MarkedTitle title={"Your client.\nYour relationship."} mark="relationship." />
            </h2>
          }
          aside={
            <div className="flex flex-col gap-5" data-reveal-group="right">
              <p className="type-lede">
                We can work quietly behind the agency or join the conversation
                when specialist product or manufacturing knowledge is useful.
              </p>
              <p className="type-body text-muted">
                Any direct client involvement is agreed with you first.
              </p>
              <p className="type-body text-muted">
                That means your team can bring in production expertise without
                handing over the relationship you have built with the client.
              </p>
            </div>
          }
        />
      </Section>
    </>
  );
}

/** The one choice: read the detail here, or send the brief now. */
export function AgencyDecision() {
  return (
    <Section tone="white" size="large" rounded>
      <div className="grid gap-y-body lg:grid-cols-12 lg:gap-x-12">
        <h2 className="type-display type-display-long lg:col-span-8" data-reveal="left">
          Want the detail, <br className="hidden md:block" />
          or already have a brief?
        </h2>
        <div className="flex flex-col gap-8 lg:col-span-4 lg:self-end" data-reveal-group="right">
          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
            <Button href="#agency-guide" plain arrow="down" variant="outline" className="btn-lg">
              Read the full agency guide
            </Button>
            <Button href={agencyLinks.start} track={agencyEvents.sendBrief} className="btn-lg">
              Enquire now
            </Button>
          </div>
          {/* Quieter than the pair above: /notes/ until agency notes are
              published (cluster "agencies" in content/notes.ts). */}
          <div>
            <p className="type-small text-muted">
              Looking for practical production advice?
            </p>
            <ArrowLink href="/notes/">Browse agency notes</ArrowLink>
          </div>
        </div>
      </div>
    </Section>
  );
}
