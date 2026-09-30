import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { AgencyCta } from "@/components/agencies/AgencyCta";
import { BriefTemplateLink } from "@/components/agencies/BriefTemplateLink";
import { FootballShirtPricing } from "@/components/agencies/FootballShirtPricing";
import { QuantityBands } from "@/components/agencies/QuantityBands";
import { ShortVersion } from "@/components/agencies/ShortVersion";
import { Faq } from "@/components/guide/Faq";
import { Figures } from "@/components/guide/Figures";
import { Callout, GuideSection } from "@/components/guide/GuideSection";
import { sectionNumber, TocDisclosure, TocRail } from "@/components/guide/Toc";
import { TocSpy } from "@/components/guide/TocSpy";
import { NoteList } from "@/components/notes/NoteList";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { ArrowLink, Button } from "@/components/site/Button";
import { Container } from "@/components/site/Container";
import { JsonLd } from "@/components/site/JsonLd";
import { MarkedTitle } from "@/components/site/MarkedTitle";
import { Reveal } from "@/components/site/Reveal";
import { Section } from "@/components/site/Section";
import {
  agencyEvents,
  agencyFaqs,
  agencyImages,
  agencyLinkAttributes,
  agencyLinks,
  agencyPage,
  agencySections,
  type AgencySectionId,
} from "@/content/agencies";
import { notesInCluster } from "@/content/notes";
import { pageMetadata } from "@/lib/metadata";
import { buildPageSchema } from "@/lib/schema/organization";

export const metadata: Metadata = pageMetadata({
  title: agencyPage.title,
  absolute: true,
  description: agencyPage.description,
  path: agencyPage.path,
  ogTitle: agencyPage.ogTitle,
});

/** Kicker number and contents label for a chapter, from the one list. */
function chapter(id: AgencySectionId) {
  const index = agencySections.findIndex((entry) => entry.id === id);
  return { id, number: sectionNumber(index), label: agencySections[index].label };
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
 * /agencies/: the long-form guide for agency producers sourcing custom
 * merchandise, and the site's primary page for that topic. The hero runs
 * full width; below it the contents sit in a sticky rail beside a single
 * reading column (a disclosure above the column on phones and tablets),
 * with a few wide feature moments: the quantity bands, the dark
 * direct-to-factory panel, the callouts and the short version.
 */
export default function AgenciesPage() {
  const further = notesInCluster("agencies");
  const product = agencyEvents.product;

  return (
    <>
      <JsonLd
        data={buildPageSchema({
          path: agencyPage.path,
          title: agencyPage.ogTitle,
          description: agencyPage.description,
          crumbs: agencyPage.crumbs,
          modified: agencyPage.modified,
        })}
      />
      <Reveal />
      <TocSpy ids={agencySections.map((entry) => entry.id)} />

      <article className="guide">
        {/* Hero: breadcrumbs, eyebrow and the title across the full width;
            the introduction and actions on the reading column's axis. */}
        <Section as="header" tone="bone" size="compact" hero>
          <Breadcrumbs crumbs={agencyPage.crumbs} />
          <div className="mt-8 guide-grid md:mt-10">
            <div className="lg:col-span-2">
              <p className="eyebrow">For agencies</p>
              <h1 className="type-guide-title mt-5">
                <MarkedTitle
                  title="Custom merchandise production for agencies."
                  mark="agencies."
                />
              </h1>
            </div>
            <div className="guide-intro mt-head lg:col-start-2">
              <p>
                A client wants merchandise in the campaign. The concept looks
                great. There is a launch date that has somehow become
                immovable, quantities are still being discussed and somebody
                will eventually ask whether the whole thing can cost less.
              </p>
              <p className="font-semibold">Welcome.</p>
              <p>
                madebyobra works directly with creative, experiential,
                activation and brand agencies to develop and manufacture
                original merchandise for client campaigns, events, launches and
                activations.
              </p>
              <p>
                We can work behind the scenes under your agency relationship,
                support your team when specialist product knowledge is useful,
                or take a clear brief and handle the production side through
                to delivery.
              </p>
              <p>
                Our job is to help you get from the initial idea to something
                you can actually price, approve, manufacture and put in
                somebody&rsquo;s hands.
              </p>
              <div className="flex flex-wrap items-center gap-x-7 gap-y-3 !mt-8">
                <Button href={agencyLinks.start} track={agencyEvents.sendBrief}>
                  Send us a live brief
                </Button>
                <ArrowLink
                  href={agencyLinks.start}
                  track={agencyEvents.tradePricing}
                >
                  Request agency trade pricing
                </ArrowLink>
              </div>
            </div>
          </div>
          <ul className="proof-strip mt-body" aria-label="In short">
            <li>White-label when needed</li>
            <li>Direct to factory</li>
            <li>Small runs to full bespoke development</li>
          </ul>
        </Section>

        <Container>
          <TocDisclosure entries={[...agencySections]} />
          <div className="guide-grid">
            <aside className="hidden lg:block">
              <TocRail
                entries={[...agencySections]}
                cta={{
                  label: "Send us a live brief",
                  href: agencyLinks.start,
                  track: agencyEvents.sendBrief,
                }}
              />
            </aside>

            <div className="guide-main">
              <GuideSection
                {...chapter("how-agencies-use-madebyobra")}
                title="How agencies use madebyobra"
              >
                <p>
                  Most agency briefs arrive somewhere between an idea and a
                  specification.
                </p>
                <p>
                  Occasionally everything is finished and production-ready.
                  More commonly there is a concept deck, some visual
                  references, a client budget that may still be moving and a
                  deadline that definitely is not.
                </p>
                <p>That is a perfectly workable place to start.</p>
                <p>
                  We can help establish what is feasible at the quantity, what
                  manufacturing route makes sense, how much creative freedom
                  there really is and where the budget is best spent.
                </p>
                <p>
                  You do not need to become a garment technologist to brief
                  us.
                </p>
                <p className="guide-strong">
                  You do need to know what the product is trying to achieve.
                </p>
                <p>
                  If it is being retailed, the commercial model matters. If it
                  is an activation gift, perceived value may matter more than
                  retail margin. If it is the hero piece in a campaign, more of
                  the budget probably belongs in that product than in six
                  secondary items nobody remembers.
                </p>
                <p>
                  Those are useful decisions to make before somebody starts
                  choosing Pantones.
                </p>
              </GuideSection>

              <GuideSection
                {...chapter("quantity")}
                title="Your quantity changes what you can make."
              >
                <p>
                  One of the most useful things an agency can understand early
                  is that custom merchandise is not one production route.
                </p>
                <p className="guide-strong">
                  The quantity changes the manufacturing options.
                </p>
                <p>
                  At lower volumes there are practical limits to how far we can
                  alter the underlying product. Some fabrics have dye minimums.
                  Specialist trims have production minimums. Completely custom
                  components do not always make commercial sense for a small
                  run.
                </p>
                <p>That does not mean a smaller project has to look generic.</p>
                <p>
                  It means the design needs to use the right production route
                  intelligently.
                </p>
                <QuantityBands />
                <p>
                  These are planning bands rather than universal factory laws.
                  A football shirt, heavyweight tee and technical jacket have
                  different manufacturing economics.
                </p>
                <p>
                  A better question than &ldquo;What is the MOQ?&rdquo; is:
                </p>
                <p className="guide-pull">
                  &ldquo;At my quantity, how much of this product can
                  realistically be customised?&rdquo;
                </p>
                <div className="sweet guide-wide" data-reveal="soft">
                  <p className="sweet__figure">
                    250&ndash;1,000<small>units</small>
                  </p>
                  <p className="sweet__title">
                    <span className="mark mark--mid">The sweet spot</span> for
                    original collections.
                  </p>
                  <p className="sweet__text">
                    Enough volume to make the product genuinely distinctive
                    without forcing the project into huge-volume manufacturing.
                  </p>
                </div>
              </GuideSection>

              <GuideSection
                {...chapter("direct-to-factory")}
                tone="ink"
                titleClassName="guide-display"
                title={
                  <>
                    More of the budget <br className="hidden sm:block" />
                    goes into the product.
                  </>
                }
              >
                <p className="guide-strong">
                  madebyobra works directly with its manufacturing partners.
                </p>
                <p>
                  We are not buying a garment from a promotional merchandise
                  distributor, adding decoration and reselling it through
                  another layer of margin.
                </p>
                <p>
                  That changes both the commercial conversation and the product
                  conversation.
                </p>
                <p>
                  When you buy a premium blank through a traditional
                  merchandise supply chain, the client is paying for somebody
                  else&rsquo;s garment before any branding has happened.
                </p>
                <p>
                  Then the print or embroidery is added. Relabelling may be
                  added. Handling and supplier margin follow.
                </p>
                <p>
                  By the time the finished item arrives, a surprising amount of
                  budget can have gone into a product that still looks
                  remarkably similar to everybody else&rsquo;s.
                </p>
                <p>
                  Direct manufacturing lets more of that budget go into the
                  thing the client and customer actually receives.
                </p>
                <p>
                  At the right quantity, the finished cost of making an
                  original product can come surprisingly close to the finished
                  cost of buying and decorating a premium blank.
                </p>
                <p className="guide-display panel-quote guide-wide" data-reveal="soft">
                  Compare the finished cost, <br className="hidden sm:block" />
                  not the blank price.
                </p>
                <div className="capacity guide-wide">
                  <p className="capacity__figure" aria-hidden="true">
                    <span className="block text-[0.28em] font-bold tracking-[-0.01em]">
                      Up to
                    </span>
                    40,000
                  </p>
                  <p className="capacity__text">
                    <strong>
                      Our manufacturing network has capacity of up to 40,000
                      units per week across the network.
                    </strong>{" "}
                    That figure matters for scale, but capacity alone does not
                    guarantee a particular project slot. Product construction,
                    materials, factory allocation and timing still need
                    checking against the real brief.
                  </p>
                </div>
              </GuideSection>

              <GuideSection {...chapter("what-we-make")} title="What can we make?">
                <p>
                  madebyobra works across{" "}
                  <InlineLink href="/sportswear/" track={product}>
                    sportswear
                  </InlineLink>
                  , contemporary casualwear and original branded merchandise.
                </p>
                <p>
                  Football shirts are one of our strongest hero products
                  because they offer a huge amount of creative territory and
                  already carry strong associations with identity, culture and
                  collectability.
                </p>
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
                  and wider capsule collections.
                </p>
                <p>
                  The important thing is choosing products because they suit
                  the audience and the job.
                </p>
                <p>
                  If an activation revolves around one genuinely desirable hero
                  piece, we would rather put the budget into making that piece
                  brilliant than stretch it across a dozen average products so
                  somebody can say the range has twelve SKUs.
                </p>
                <p className="guide-strong">
                  A merchandise collection can be small and still feel
                  complete.
                </p>
                <div>
                  <ArrowLink href={agencyLinks.whatWeMake} track={product}>
                    Explore what we make
                  </ArrowLink>
                </div>
                <Figures images={agencyImages.products} />

                <h3 id="football-shirts" className="guide-h3 scroll-mt-20">
                  The football shirt as a hero product
                </h3>
                <p>
                  Football shirts work particularly well for agencies because
                  there is so much design language available before the
                  graphics have even started.
                </p>
                <p>
                  Fit, collar, rib, cuffs, panel shapes, fabric, badges,
                  sponsor-style placements and era references all influence how
                  the finished piece feels.
                </p>
                <p>
                  That creates room to build something with a recognisable
                  product identity rather than relying on a large print to do
                  all the work.
                </p>
                <p className="type-meta !mt-8 text-muted">
                  Current standard pricing for custom football shirts
                </p>
                <FootballShirtPricing />
                <div>
                  <ArrowLink href={agencyLinks.footballShirts} track={product}>
                    Explore custom football shirts
                  </ArrowLink>
                </div>
              </GuideSection>

              <GuideSection
                {...chapter("white-label")}
                title="White-label when you need it."
              >
                <p>Sometimes the client should barely know we exist.</p>
                <p>We are comfortable with that.</p>
                <p>
                  Agency projects can be run through your team, with madebyobra
                  handling the product and manufacturing work behind the
                  scenes.
                </p>
                <p>
                  Where direct technical input would make the project easier,
                  we can join the conversation as a product specialist if you
                  want us there.
                </p>
                <p>
                  Where you prefer to control every client interaction, we stay
                  behind the agency. Direct client involvement is agreed with
                  the agency first.
                </p>
                <p className="guide-strong">
                  The important part is agreeing this before the project
                  starts.
                </p>
                <p>
                  The phrase white-label merchandise supplier can mean almost
                  anything, so we would rather be specific about the working
                  relationship than hide behind the terminology.
                </p>
                <p>
                  Client communication, documentation, samples, approvals,
                  packaging and delivery responsibilities should all be clear
                  from the start.
                </p>
                <p className="guide-strong">
                  Your relationship with the client remains yours.
                </p>
                <p>
                  Our value is helping you deliver the product side without
                  adding unnecessary drama to it.
                </p>
                <div>
                  <ArrowLink href={agencyLinks.whiteLabelService}>
                    White-label production in our services
                  </ArrowLink>
                </div>
              </GuideSection>

              <GuideSection
                {...chapter("concept-to-production")}
                title="A brief does not need to be a tech pack."
              >
                <p>
                  If you already have finished artwork, quantities and a
                  complete specification, lovely. We can move quickly.
                </p>
                <p>If what you have is a slide saying:</p>
                <blockquote className="brief-slide">
                  <p>
                    &ldquo;Premium 90s football shirt. Feels authentic. Not
                    shiny. Launching in June.&rdquo;
                  </p>
                </blockquote>
                <p className="guide-strong">We can also work with that.</p>
                <p>
                  The first job is understanding what the product has to
                  achieve.
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
                  considerably.
                </p>
                <p>
                  Once we understand the commercial reality, we can help turn
                  the creative into a production route that makes sense.
                </p>
              </GuideSection>

              <GuideSection
                {...chapter("pricing")}
                title="Pricing that can survive contact with the client."
              >
                <p>
                  A supplier saying &ldquo;send us an enquiry for pricing&rdquo;
                  is not terribly helpful when you are trying to get a client
                  budget out before 4pm.
                </p>
                <p>
                  Where we have established product pricing, we publish it.
                </p>
                <p>
                  Agency projects can also be quoted on a trade basis where
                  appropriate.
                </p>
                <p>
                  The point is to give you enough commercial information early
                  enough to know whether the idea belongs in the conversation.
                </p>
                <p>A quote should make clear what is driving the number.</p>
                <p>
                  Fabric, construction, quantity, branding method, custom
                  trims, labels, packaging, sampling, development and delivery
                  can all affect cost.
                </p>
                <p>
                  If something expensive is adding very little to the final
                  product, we would rather tell you than quietly put it in the
                  quote and hope nobody notices.
                </p>
                <p className="guide-pull !mt-10">
                  If you know the budget, tell us. <br />
                  There is no prize for hiding it.
                </p>
                <p>
                  A realistic budget lets us tell you where it is worth
                  spending and where the client is unlikely to notice the
                  difference.
                </p>
                <div className="flex flex-wrap items-center gap-x-7 gap-y-3 !mt-8">
                  <Button href={agencyLinks.start} track={agencyEvents.tradePricing}>
                    Request agency trade pricing
                  </Button>
                  <ArrowLink href={agencyLinks.pricing} track={agencyEvents.pricing}>
                    See football-shirt pricing and minimums
                  </ArrowLink>
                </div>
                <Callout>
                  If the client already has a serious merchandise budget, ask
                  what that budget could{" "}
                  <span className="mark mark--mid">manufacture</span> before
                  asking what it could print.
                </Callout>
              </GuideSection>

              <GuideSection
                {...chapter("sampling")}
                title="Sampling deserves more attention than it usually gets."
              >
                <p className="guide-pull">
                  Artwork approval proves that everybody likes the artwork.
                  It does not prove that everybody likes the garment.
                </p>
                <p>
                  Before the main production run, a physical pre-production
                  sample is made and photographed for approval. The approved
                  sample remains at the factory as the production reference.
                </p>
                <p>
                  This stage matters because products behave differently in
                  real life than they do on screen.
                </p>
                <p>
                  Colours change across materials. Embroidery has physical
                  depth. Collars sit differently once sewn. Logos often need
                  scaling once they are on an actual body rather than floating
                  in Illustrator.
                </p>
                <p>
                  That is why a sample should be treated as part of development
                  rather than a ceremonial box to tick before production.
                </p>
                <p className="guide-strong">
                  For agency teams, decide who has final sample authority
                  before the sample arrives.
                </p>
                <p>Otherwise feedback has an extraordinary ability to multiply.</p>
                <div>
                  <ArrowLink href={agencyLinks.howWeWork} track={agencyEvents.howWeWork}>
                    How we work, from development to delivery
                  </ArrowLink>
                </div>
              </GuideSection>

              <GuideSection
                {...chapter("deadlines")}
                title="The deadline is part of the product."
              >
                <p>
                  A beautiful piece of merchandise sitting in a freight depot
                  the day after the launch is not a particularly successful
                  piece of merchandise.
                </p>
                <p className="guide-strong">So we want the date early.</p>
                <p>
                  For event-led projects, the current planning guidance is to
                  allow around twelve weeks from brief to delivery, although
                  exact timing depends on the product, artwork readiness,
                  sampling, approvals and freight.
                </p>
                <p>That planning window covers more than factory sewing time.</p>
                <p>
                  There is product setup, artwork approval, sampling, potential
                  revisions, production, quality control, packing, freight and
                  goods-in.
                </p>
                <p>
                  A factory can manufacture quickly and the project can still
                  be late because artwork sat with the client for a week, sizes
                  changed after sampling or another logo arrived after
                  everything was supposedly locked.
                </p>
                <p>
                  A good production plan works backwards from the real goods-in
                  date and makes the approval points obvious.
                </p>
                <p>
                  We would rather tell you early that a finish is too risky for
                  the deadline than tell you later that we were hoping for the
                  best.
                </p>
                <div>
                  <ArrowLink href={agencyLinks.start} track={agencyEvents.sendBrief}>
                    Check your project timeline with us
                  </ArrowLink>
                </div>
                <Callout
                  support="That might be specification, quantity or delivery method. The dangerous version is assuming all three can stay flexible until late in production."
                >
                  When the date is fixed, decide what has{" "}
                  <span className="mark mark--mid">permission to move.</span>
                </Callout>
              </GuideSection>

              <GuideSection
                {...chapter("pitch-support")}
                title="Pitch work without disappearing down a rabbit hole."
              >
                <p>
                  We are happy to help agencies establish whether a product
                  idea is feasible before it reaches the client.
                </p>
                <p>
                  Sometimes that is a quick commercial sense-check. Sometimes
                  you need indicative pricing. Sometimes the pitch genuinely
                  needs a product concept.
                </p>
                <p className="guide-strong">
                  Those are different levels of work.
                </p>
                <p>
                  We can help with early commercial and manufacturing guidance
                  without turning every pitch into a full unpaid
                  product-development programme.
                </p>
                <p>
                  If original visual concepts or detailed development work are
                  needed for a speculative pitch, agree that scope separately.
                </p>
                <p>There is a difference between answering:</p>
                <div className="compare guide-wide">
                  <figure>
                    <figcaption>A sense-check</figcaption>
                    <blockquote>
                      <p>
                        &ldquo;Can we realistically manufacture this at 500
                        units for a June activation?&rdquo;
                      </p>
                    </blockquote>
                  </figure>
                  <figure>
                    <figcaption>A development programme</figcaption>
                    <blockquote>
                      <p>
                        &ldquo;Can you design the entire range, engineer the
                        products and provide presentation visuals by tomorrow
                        morning while we decide whether the client likes the
                        idea?&rdquo;
                      </p>
                    </blockquote>
                  </figure>
                </div>
                <p>Both can be conversations.</p>
                <p className="guide-strong">
                  They are simply not the same piece of work.
                </p>
              </GuideSection>

              <GuideSection
                {...chapter("packaging-and-handover")}
                title="The job rarely finishes at the last stitch."
              >
                <p>
                  If the product is going to a warehouse, event, retail stand
                  or fulfilment partner, the handover needs to work for them
                  too.
                </p>
                <p className="guide-strong">
                  Tell us what the destination expects.
                </p>
                <p>
                  That may affect labelling, carton packing, size separation,
                  barcode requirements, bagging or other project-specific
                  details.
                </p>
                <p>
                  These are boring details right up until nobody has thought
                  about them. Then they become everybody&rsquo;s afternoon.
                </p>
                <p>
                  Where requirements are known early, they can be built into
                  the production plan rather than fixed at the end.
                </p>
                <p>
                  If the client already has a fulfilment or merchandise
                  partner, madebyobra can manufacture the relevant product and
                  hand it into that existing operation rather than pretending
                  every project needs a completely new ecosystem.
                </p>
              </GuideSection>

              <GuideSection {...chapter("brief")} title="What should you send us?">
                <p>
                  You do not need to build a beautiful supplier brief. A useful
                  one is better.
                </p>
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
                </p>
                <p>
                  Tell us which bits are confirmed and which bits are still
                  moving.
                </p>
                <p>
                  A producer saying &ldquo;client thinks 500, could become
                  1,500 after sign-off&rdquo; is more useful than false
                  precision.
                </p>
                <p className="guide-strong">We can price the scenarios.</p>
                <div className="flex flex-wrap items-center gap-x-7 gap-y-3">
                  <BriefTemplateLink />
                  <ArrowLink href={agencyLinks.start} track={agencyEvents.sendBrief}>
                    Send us the brief
                  </ArrowLink>
                </div>
              </GuideSection>

              <GuideSection
                {...chapter("when-custom-is-worth-it")}
                title="When should an agency consider custom manufacturing?"
              >
                <p className="guide-strong">
                  The clearest trigger is when the product itself matters to
                  the idea.
                </p>
                <p>
                  If the item is going to be photographed, sold, worn
                  publicly, used as a hero piece, handed to talent or expected
                  to survive long after the event, it deserves a proper product
                  conversation.
                </p>
                <p>
                  Custom manufacturing becomes particularly compelling once
                  quantities move into the hundreds.
                </p>
                <p>
                  At that point, you may already be spending enough on premium
                  blanks, decoration, relabelling and handling that a more
                  original route deserves comparison.
                </p>
                <p>
                  You do not have to manufacture every product from scratch.
                </p>
                <p>
                  Identify which piece carries the story and put the
                  development where people will notice it.
                </p>
              </GuideSection>

              <GuideSection
                {...chapter("common-mistakes")}
                title="A few things we would avoid."
              >
                <p>
                  We would avoid choosing the decoration method before choosing
                  the product.
                </p>
                <p>
                  We would avoid building an enormous range simply because
                  there is budget for one.
                </p>
                <p>
                  We would avoid approving creative before somebody checks
                  whether the intended production method supports it.
                </p>
                <p>
                  We would avoid assuming a low unit cost automatically creates
                  the best client value.
                </p>
                <p>
                  And we would definitely avoid treating delivery as something
                  to think about once production finishes.
                </p>
                <p className="guide-strong">
                  Most avoidable merchandise problems begin much earlier than
                  the moment they become visible.
                </p>
              </GuideSection>

              {/* Real proof only: finished products, approved samples,
                  studies, permitted client work. Hidden until images exist
                  (content/agencies.ts, agencyImages.proof). */}
              {agencyImages.proof.length > 0 && (
                <section aria-labelledby="proof-title" className="guide-section">
                  <h2 id="proof-title" className="guide-h2 !mt-0">
                    From the studio
                  </h2>
                  <Figures images={agencyImages.proof} />
                </section>
              )}

              <GuideSection {...chapter("faqs")} title="Frequently asked questions">
                <Faq items={agencyFaqs} linkAttributes={agencyLinkAttributes} />
              </GuideSection>

              <GuideSection
                {...chapter("short-version")}
                tone="stone"
                title="The short version."
              >
                <ShortVersion />
              </GuideSection>

              {further.length > 0 && (
                <section aria-labelledby="further-title" className="guide-section">
                  <h2 id="further-title" className="guide-h2 !mt-0">
                    Further reading for agency producers
                  </h2>
                  <div className="guide-wide">
                    <NoteList notes={further} />
                  </div>
                </section>
              )}
            </div>
          </div>
        </Container>
      </article>

      <AgencyCta />
    </>
  );
}
