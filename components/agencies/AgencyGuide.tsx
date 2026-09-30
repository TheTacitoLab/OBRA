import Link from "next/link";
import type { ReactNode } from "react";
import { BriefTemplateLink } from "./BriefTemplateLink";
import { FootballShirtPricing } from "./FootballShirtPricing";
import { QuantityBands } from "./QuantityBands";
import { ShortVersion } from "./ShortVersion";
import { Faq } from "../guide/Faq";
import { Figures } from "../guide/Figures";
import { GuideRail, GuideStrip } from "../guide/GuideNav";
import { Callout, GuideChapter, sectionNumber } from "../guide/GuideSection";
import { GuideSpy } from "../guide/GuideSpy";
import { NoteList } from "../notes/NoteList";
import { ArrowLink, Button } from "../site/Button";
import { Container } from "../site/Container";
import {
  agencyEvents,
  agencyFaqs,
  agencyImages,
  agencyLinkAttributes,
  agencyLinks,
  agencySections,
  type AgencySectionId,
} from "@/content/agencies";
import { notesInCluster } from "@/content/notes";

/** Anchor and number for a chapter, from the one contents list. */
function chapter(id: AgencySectionId) {
  const index = agencySections.findIndex((entry) => entry.id === id);
  return { id, number: sectionNumber(index) };
}

/** An inline link in running copy; tracked links are plain anchors. */
function InlineLink({
  href,
  track,
  children,
}: {
  href: string;
  track?: string;
  children: ReactNode;
}) {
  if (track) {
    return (
      <a href={href} className="text-link" data-track={track}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className="text-link">
      {children}
    </Link>
  );
}

/**
 * The full agency guide (#agency-guide): the calm, editorial half of the
 * page. Contents on the left from lg (a sticky strip under the header on
 * phones and tablets), sixteen numbered chapters on the right, each one
 * number and title, introduction, body, and at most one lime callout.
 * Every word is in the HTML. Nothing here animates.
 */
export function AgencyGuide() {
  const further = notesInCluster("agencies");
  const product = agencyEvents.product;
  const entries = agencySections.map((entry) => ({ ...entry }));

  return (
    <section
      id="agency-guide"
      aria-labelledby="agency-guide-title"
      data-tone="bone"
      className="guide section-round bg-bg text-fg"
    >
      <GuideSpy ids={agencySections.map((entry) => entry.id)} />
      <Container className="pt-section pb-section-lg">
        <div className="guide-layout">
          <div className="guide-strip-wrap lg:hidden">
            <GuideStrip entries={entries} />
          </div>
          <aside className="guide-rail-col hidden lg:block">
            <GuideRail entries={entries} />
          </aside>

          <div className="guide-article">
            <header className="guide-head">
              <h2 id="agency-guide-title" className="guide-title">
                The full agency guide
              </h2>
              <p className="guide-standfirst">
                Everything you might want to know before putting merchandise
                into a client brief.
              </p>
            </header>
            <div className="guide-lead">
              <p>
                A client wants merchandise in the campaign. The concept looks
                great. There is a launch date that has somehow become
                immovable, quantities are still being discussed and somebody
                will eventually ask whether the whole thing can cost less.
                Welcome.
              </p>
              <p>
                madebyobra works directly with creative, experiential,
                activation and brand agencies to develop and manufacture
                original merchandise for client campaigns, events, launches and
                activations. We can work behind the scenes under your agency
                relationship, support your team when specialist product
                knowledge is useful, or take a clear brief and handle the
                production side through to delivery.
              </p>
              <p>
                Our job is to help you get from the initial idea to something
                you can actually price, approve, manufacture and put in
                somebody&rsquo;s hands.
              </p>
            </div>

            <GuideChapter
              {...chapter("how-agencies-use-madebyobra")}
              title="How agencies use madebyobra"
              intro="Most agency briefs arrive somewhere between an idea and a specification. Occasionally everything is finished and production-ready. More commonly there is a concept deck, some visual references, a client budget that may still be moving and a deadline that definitely is not."
            >
              <p>
                That is a perfectly workable place to start. We can help
                establish what is feasible at the quantity, what manufacturing
                route makes sense, how much creative freedom there really is
                and where the budget is best spent.
              </p>
              <p>
                You do not need to become a garment technologist to brief us.{" "}
                <strong>
                  You do need to know what the product is trying to achieve.
                </strong>
              </p>
              <p>
                If it is being retailed, the commercial model matters. If it is
                an activation gift, perceived value may matter more than retail
                margin. If it is the hero piece in a campaign, more of the
                budget probably belongs in that product than in six secondary
                items nobody remembers. Those are useful decisions to make
                before somebody starts choosing Pantones.
              </p>
            </GuideChapter>

            <GuideChapter
              {...chapter("quantity")}
              title="Your quantity changes what you can make"
              intro="One of the most useful things an agency can understand early is that custom merchandise is not one production route. The quantity changes the manufacturing options."
            >
              <p>
                At lower volumes there are practical limits to how far we can
                alter the underlying product. Some fabrics have dye minimums.
                Specialist trims have production minimums. Completely custom
                components do not always make commercial sense for a small
                run. That does not mean a smaller project has to look generic.
                It means the design needs to use the right production route
                intelligently.
              </p>
              <QuantityBands />
              <p>
                These are planning bands rather than universal factory laws. A
                football shirt, heavyweight tee and technical jacket have
                different manufacturing economics. A better question than
                &ldquo;What is the MOQ?&rdquo; is:{" "}
                <strong>
                  &ldquo;At my quantity, how much of this product can
                  realistically be customised?&rdquo;
                </strong>
              </p>
            </GuideChapter>

            <GuideChapter
              {...chapter("direct-to-factory")}
              title="Why direct-to-factory matters"
              intro="madebyobra works directly with its manufacturing partners. We are not buying a garment from a promotional merchandise distributor, adding decoration and reselling it through another layer of margin."
            >
              <p>
                That changes both the commercial conversation and the product
                conversation. When you buy a premium blank through a
                traditional merchandise supply chain, the client is paying for
                somebody else&rsquo;s garment before any branding has happened.
                Then the print or embroidery is added. Relabelling may be
                added. Handling and supplier margin follow.
              </p>
              <p>
                By the time the finished item arrives, a surprising amount of
                budget can have gone into a product that still looks
                remarkably similar to everybody else&rsquo;s. Direct
                manufacturing lets more of that budget go into the thing the
                client and customer actually receives. At the right quantity,
                the finished cost of making an original product can come
                surprisingly close to the finished cost of buying and
                decorating a premium blank.
              </p>
              <Callout>
                Compare the finished cost, <br className="hidden sm:block" />
                not the blank price.
              </Callout>
              <p>
                <strong>
                  Our manufacturing network has capacity of up to 40,000 units
                  per week across the network.
                </strong>{" "}
                That figure matters for scale, but capacity alone does not
                guarantee a particular project slot. Product construction,
                materials, factory allocation and timing still need checking
                against the real brief.
              </p>
            </GuideChapter>

            <GuideChapter
              {...chapter("what-we-make")}
              title="What can we make?"
              intro={
                <>
                  madebyobra works across{" "}
                  <InlineLink href="/sportswear/" track={product}>
                    sportswear
                  </InlineLink>
                  , contemporary casualwear and original branded merchandise.
                  Football shirts are one of our strongest hero products
                  because they offer a huge amount of creative territory and
                  already carry strong associations with identity, culture and
                  collectability.
                </>
              }
            >
              <p>
                We also develop{" "}
                <InlineLink href="/t-shirts/" track={product}>
                  T-shirts
                </InlineLink>
                ,{" "}
                <InlineLink href="/tops/" track={product}>
                  heavyweight tops
                </InlineLink>
                ,{" "}
                <InlineLink href="/headwear/" track={product}>
                  headwear
                </InlineLink>
                ,{" "}
                <InlineLink href="/trainingwear/" track={product}>
                  training-inspired garments
                </InlineLink>
                ,{" "}
                <InlineLink href="/accessories/" track={product}>
                  accessories
                </InlineLink>{" "}
                and wider capsule collections. The important thing is
                choosing products because they suit the audience and the job.
              </p>
              <p>
                If an activation revolves around one genuinely desirable hero
                piece, we would rather put the budget into making that piece
                brilliant than stretch it across a dozen average products so
                somebody can say the range has twelve SKUs. A merchandise
                collection can be small and still feel complete.
              </p>
              <p>
                <ArrowLink href={agencyLinks.whatWeMake} track={product}>
                  Explore what we make
                </ArrowLink>
              </p>
              <Figures images={agencyImages.products} />
              <h3 id="football-shirts" className="chapter__sub">
                The football shirt as a hero product
              </h3>
              <p>
                Football shirts work particularly well for agencies because
                there is so much design language available before the graphics
                have even started. Fit, collar, rib, cuffs, panel shapes,
                fabric, badges, sponsor-style placements and era references all
                influence how the finished piece feels. That creates room to
                build something with a recognisable product identity rather
                than relying on a large print to do all the work.
              </p>
              <p className="chapter__caption">
                Current standard pricing for custom football shirts
              </p>
              <FootballShirtPricing />
              <p>
                <ArrowLink href={agencyLinks.footballShirts} track={product}>
                  Explore custom football shirts
                </ArrowLink>
              </p>
            </GuideChapter>

            <GuideChapter
              {...chapter("white-label")}
              title="White-label when you need it"
              intro="Sometimes the client should barely know we exist. We are comfortable with that. Agency projects can be run through your team, with madebyobra handling the product and manufacturing work behind the scenes."
            >
              <p>
                Where direct technical input would make the project easier, we
                can join the conversation as a product specialist if you want
                us there. Where you prefer to control every client interaction,
                we stay behind the agency. Direct client involvement is agreed
                with the agency first.
              </p>
              <p>
                <strong>
                  The important part is agreeing this before the project
                  starts.
                </strong>{" "}
                The phrase white-label merchandise supplier can mean almost
                anything, so we would rather be specific about the working
                relationship than hide behind the terminology. Client
                communication, documentation, samples, approvals, packaging and
                delivery responsibilities should all be clear from the start.
              </p>
              <p>
                Your relationship with the client remains yours. Our value is
                helping you deliver the product side without adding
                unnecessary drama to it.
              </p>
              <p>
                <ArrowLink href={agencyLinks.whiteLabelService}>
                  White-label production in our services
                </ArrowLink>
              </p>
            </GuideChapter>

            <GuideChapter
              {...chapter("concept-to-production")}
              title="A brief does not need to be a tech pack"
              intro="If you already have finished artwork, quantities and a complete specification, lovely. We can move quickly."
            >
              <p>
                If what you have is a slide saying &ldquo;Premium 90s football
                shirt. Feels authentic. Not shiny. Launching in June.&rdquo; we
                can also work with that. The first job is understanding what
                the product has to achieve.
              </p>
              <p>
                Is it being sold or given away? Does it need to hit a retail
                margin? Is there a hero piece? Is the client expecting 100
                units or 5,000? Is the launch date fixed? Does the packaging
                matter? Will the product go straight to a venue, warehouse or
                fulfilment partner?
              </p>
              <p>
                Those decisions influence the manufacturing route
                considerably. Once we understand the commercial reality, we can
                help turn the creative into a production route that makes
                sense.
              </p>
            </GuideChapter>

            <GuideChapter
              {...chapter("pricing")}
              title="Pricing that can survive contact with the client"
              intro="A supplier saying “send us an enquiry for pricing” is not terribly helpful when you are trying to get a client budget out before 4pm. Where we have established product pricing, we publish it."
            >
              <p>
                Agency projects can also be quoted on a trade basis where
                appropriate. The point is to give you enough commercial
                information early enough to know whether the idea belongs in
                the conversation.
              </p>
              <p>
                A quote should make clear what is driving the number. Fabric,
                construction, quantity, branding method, custom trims, labels,
                packaging, sampling, development and delivery can all affect
                cost. If something expensive is adding very little to the final
                product, we would rather tell you than quietly put it in the
                quote and hope nobody notices.
              </p>
              <p>
                <strong>
                  If you know the budget, tell us. There is no prize for hiding
                  it.
                </strong>{" "}
                A realistic budget lets us tell you where it is worth spending
                and where the client is unlikely to notice the difference.
              </p>
              <div className="chapter__actions">
                <Button href={agencyLinks.start} track={agencyEvents.tradePricing}>
                  Request agency trade pricing
                </Button>
                <ArrowLink href={agencyLinks.pricing} track={agencyEvents.pricing}>
                  See football-shirt pricing and minimums
                </ArrowLink>
              </div>
              <Callout>
                If the client already has a serious merchandise budget, ask
                what that budget could manufacture before asking what it could
                print.
              </Callout>
            </GuideChapter>

            <GuideChapter
              {...chapter("sampling")}
              title="Sampling deserves more attention than it usually gets"
              intro="Artwork approval proves that everybody likes the artwork. It does not prove that everybody likes the garment."
            >
              <p>
                Before the main production run, a physical pre-production
                sample is made and photographed for approval. The approved
                sample remains at the factory as the production reference. This
                stage matters because products behave differently in real life
                than they do on screen.
              </p>
              <p>
                Colours change across materials. Embroidery has physical depth.
                Collars sit differently once sewn. Logos often need scaling once
                they are on an actual body rather than floating in Illustrator.
                That is why a sample should be treated as part of development
                rather than a ceremonial box to tick before production.
              </p>
              <p>
                <strong>
                  For agency teams, decide who has final sample authority
                  before the sample arrives.
                </strong>{" "}
                Otherwise feedback has an extraordinary ability to multiply.
              </p>
              <p>
                <ArrowLink href={agencyLinks.howWeWork} track={agencyEvents.howWeWork}>
                  How we work, from development to delivery
                </ArrowLink>
              </p>
            </GuideChapter>

            <GuideChapter
              {...chapter("deadlines")}
              title="The deadline is part of the product"
              intro="A beautiful piece of merchandise sitting in a freight depot the day after the launch is not a particularly successful piece of merchandise. So we want the date early."
            >
              <p>
                For event-led projects, the current planning guidance is to
                allow around twelve weeks from brief to delivery, although
                exact timing depends on the product, artwork readiness,
                sampling, approvals and freight. That planning window covers
                more than factory sewing time. There is product setup, artwork
                approval, sampling, potential revisions, production, quality
                control, packing, freight and goods-in.
              </p>
              <p>
                A factory can manufacture quickly and the project can still be
                late because artwork sat with the client for a week, sizes
                changed after sampling or another logo arrived after everything
                was supposedly locked. A good production plan works backwards
                from the real goods-in date and makes the approval points
                obvious.
              </p>
              <p>
                We would rather tell you early that a finish is too risky for
                the deadline than tell you later that we were hoping for the
                best.
              </p>
              <Callout support="That might be specification, quantity or delivery method. The dangerous version is assuming all three can stay flexible until late in production.">
                When the date is fixed, <br className="hidden sm:block" />
                decide what has permission to move.
              </Callout>
              <p>
                <ArrowLink href={agencyLinks.start} track={agencyEvents.sendBrief}>
                  Check your project timeline with us
                </ArrowLink>
              </p>
            </GuideChapter>

            <GuideChapter
              {...chapter("pitch-support")}
              title="Pitch work without disappearing down a rabbit hole"
              intro="We are happy to help agencies establish whether a product idea is feasible before it reaches the client. Sometimes that is a quick commercial sense-check. Sometimes you need indicative pricing. Sometimes the pitch genuinely needs a product concept."
            >
              <p>
                Those are different levels of work. We can help with early
                commercial and manufacturing guidance without turning every
                pitch into a full unpaid product-development programme. If
                original visual concepts or detailed development work are
                needed for a speculative pitch, agree that scope separately.
              </p>
              <p>
                There is a difference between answering &ldquo;Can we
                realistically manufacture this at 500 units for a June
                activation?&rdquo; and &ldquo;Can you design the entire range,
                engineer the products and provide presentation visuals by
                tomorrow morning while we decide whether the client likes the
                idea?&rdquo;
              </p>
              <p>
                Both can be conversations. They are simply not the same piece
                of work.
              </p>
            </GuideChapter>

            <GuideChapter
              {...chapter("packaging-and-handover")}
              title="The job rarely finishes at the last stitch"
              intro="If the product is going to a warehouse, event, retail stand or fulfilment partner, the handover needs to work for them too. Tell us what the destination expects."
            >
              <p>
                That may affect labelling, carton packing, size separation,
                barcode requirements, bagging or other project-specific
                details. These are boring details right up until nobody has
                thought about them. Then they become everybody&rsquo;s
                afternoon.
              </p>
              <p>
                Where requirements are known early, they can be built into the
                production plan rather than fixed at the end. If the client
                already has a fulfilment or merchandise partner, madebyobra can
                manufacture the relevant product and hand it into that existing
                operation rather than pretending every project needs a
                completely new ecosystem.
              </p>
            </GuideChapter>

            <GuideChapter
              {...chapter("brief")}
              title="What should you send us?"
              intro="You do not need to build a beautiful supplier brief. A useful one is better."
            >
              <p>
                To give you a meaningful first answer, we need enough to
                understand:
              </p>
              <ul className="guide-list">
                <li>the product or idea</li>
                <li>approximate quantity</li>
                <li>intended use</li>
                <li>budget position</li>
                <li>required delivery date</li>
                <li>delivery destination</li>
                <li>who has final approval</li>
              </ul>
              <p>
                Send artwork if you have it. Send references if you do not.
                Tell us which bits are confirmed and which bits are still
                moving.
              </p>
              <p>
                A producer saying &ldquo;client thinks 500, could become 1,500
                after sign-off&rdquo; is more useful than false precision. We
                can price the scenarios.
              </p>
              <div className="chapter__actions">
                <BriefTemplateLink />
                <ArrowLink href={agencyLinks.start} track={agencyEvents.sendBrief}>
                  Send us the brief
                </ArrowLink>
              </div>
            </GuideChapter>

            <GuideChapter
              {...chapter("when-custom-is-worth-it")}
              title="When should an agency consider custom manufacturing?"
              intro="The clearest trigger is when the product itself matters to the idea."
            >
              <p>
                If the item is going to be photographed, sold, worn publicly,
                used as a hero piece, handed to talent or expected to survive
                long after the event, it deserves a proper product
                conversation.
              </p>
              <Callout>
                Does it feel like a product, <br className="hidden sm:block" />
                or just another piece of event collateral?
              </Callout>
              <p>
                Custom manufacturing becomes particularly compelling once
                quantities move into the hundreds. At that point, you may
                already be spending enough on premium blanks, decoration,
                relabelling and handling that a more original route deserves
                comparison.
              </p>
              <p>
                You do not have to manufacture every product from scratch.
                Identify which piece carries the story and put the development
                where people will notice it.
              </p>
            </GuideChapter>

            <GuideChapter
              {...chapter("common-mistakes")}
              title="A few things we would avoid"
              intro="We would avoid choosing the decoration method before choosing the product."
            >
              <p>
                We would avoid building an enormous range simply because there
                is budget for one. We would avoid approving creative before
                somebody checks whether the intended production method
                supports it. We would avoid assuming a low unit cost
                automatically creates the best client value.
              </p>
              <p>
                And we would definitely avoid treating delivery as something to
                think about once production finishes. Most avoidable
                merchandise problems begin much earlier than the moment they
                become visible.
              </p>
            </GuideChapter>

            {/* Real proof only: finished products, approved samples,
                studies, permitted client work. Hidden until images exist
                (content/agencies.ts, agencyImages.proof). */}
            {agencyImages.proof.length > 0 && (
              <section aria-labelledby="proof-title" className="chapter">
                <h2 id="proof-title" className="chapter__title">
                  From the studio
                </h2>
                <div className="chapter__body">
                  <Figures images={agencyImages.proof} />
                </div>
              </section>
            )}

            <GuideChapter
              {...chapter("faqs")}
              title="Frequently asked questions"
              intro="Straight answers to the questions agencies ask us most often."
            >
              <Faq items={agencyFaqs} linkAttributes={agencyLinkAttributes} />
            </GuideChapter>

            <GuideChapter
              {...chapter("short-version")}
              title="The short version"
              intro="If you are an agency planning merchandise, decide how original the product needs to be before choosing the supplier route."
              final
            >
              <ShortVersion />
            </GuideChapter>

            {further.length > 0 && (
              <section aria-labelledby="further-title" className="chapter">
                <h2 id="further-title" className="chapter__title">
                  Further reading for agency producers
                </h2>
                <div className="chapter__body guide-wide">
                  <NoteList notes={further} />
                </div>
              </section>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
