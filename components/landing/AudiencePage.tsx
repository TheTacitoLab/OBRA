import Link from "next/link";
import { Section } from "../site/Section";
import { Editorial } from "../site/Editorial";
import { Block, type BlockTone } from "../site/Block";
import { ArrowLink, Button } from "../site/Button";
import { BigList, type BigLink } from "../home/BigList";
import { ClosingCta } from "./ClosingCta";
import { pageTitleClass } from "./PageHero";
import { MarkedTitle } from "../site/MarkedTitle";
import { getAudience } from "@/content/audiences";
import {
  findProduct,
  findService,
  pageHref,
  primaryCta,
  type Service,
} from "@/content/site";

/** Lead block spans 7/12 and both rows; the other two stack beside it. */
const benefitLayout: { tone: BlockTone; className: string }[] = [
  {
    tone: "stone",
    className:
      "md:col-span-12 lg:col-span-7 lg:row-span-2 lg:min-h-[24rem] lg:justify-between",
  },
  { tone: "accent", className: "md:col-span-6 lg:col-span-5" },
  { tone: "outline", className: "md:col-span-6 lg:col-span-5" },
];

/**
 * The "Who for" landing page: one component, five audiences. Everything
 * audience-specific comes from content/audiences.ts; the compositions change
 * from section to section so the page never repeats itself, and the
 * optional sections (retail readiness, benefits, a closing statement) let
 * each audience's page carry a different shape.
 */
export function AudiencePage({ slug }: { slug: string }) {
  const { page, content } = getAudience(slug);

  const products: BigLink[] = content.products.flatMap((productSlug) => {
    const product = findProduct(productSlug);
    return product
      ? [{ label: product.label, href: pageHref(product.slug) }]
      : [];
  });
  const services: Service[] = content.services.flatMap((serviceSlug) => {
    const service = findService(serviceSlug);
    return service ? [service] : [];
  });

  return (
    <>
      {/* Hero: full-width statement, intro and CTA in the right column. */}
      <Section tone="bone" size="large" hero>
        <h1 className={pageTitleClass(content.headline, content.headlineTier)}>
          <MarkedTitle title={content.headline} mark={content.headlineMark} />
        </h1>
        <div className="mt-head grid md:grid-cols-12 md:gap-x-8 lg:gap-x-12">
          <div className="flex flex-col gap-body md:col-span-6 md:col-start-7 lg:col-span-4 lg:col-start-9">
            <div className="flex flex-col gap-4">
              <p className="type-lede">{content.intro}</p>
              {content.secondary && (
                <p className="type-body text-muted">{content.secondary}</p>
              )}
            </div>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
              <Button href={primaryCta.href}>{primaryCta.label}</Button>
              {content.secondaryCta && (
                <ArrowLink href={content.secondaryCta.href}>
                  {content.secondaryCta.label}
                </ArrowLink>
              )}
            </div>
          </div>
        </div>
      </Section>

      {/* What we do: heading left, hairline list right. The heading takes the
          full width until lg because "FESTIVALS." does not fit a 7/12 column
          at the 13vw display size between 768 and 1023px. */}
      <Section tone="stone">
        <div className="grid gap-y-head md:grid-cols-12 md:gap-x-8 lg:items-start lg:gap-x-12">
          <div className="md:col-span-12 lg:col-span-8">
            <h2 className="type-display">
              {content.pointsHeading ??
                `What we do for ${page.label.toLowerCase()}.`}
            </h2>
          </div>
          <ul className="index-list md:col-span-8 md:col-start-5 lg:col-span-4 lg:col-start-9">
            {content.points.map((point) => (
              <li key={point.title} className="index-row">
                <h3 className="type-title">{point.title}</h3>
                <p className="type-body mt-3 text-muted">{point.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* Products: note left, heading right-aligned, then the enormous list. */}
      <Section tone="ink" size="large">
        <Editorial
          reverse
          headingAlign="right"
          mobileAlignRight
          heading={
            <h2 className="type-display">{content.productsHeading}</h2>
          }
          aside={<p className="type-lede text-muted">{content.productNote}</p>}
        />
        <BigList
          className="mt-section-sm"
          size="type-link-sm"
          items={products}
        />
      </Section>

      {/* Retail readiness: a short heading and one line, compact. */}
      {content.ready && (
        <Section tone="blue-soft" size="compact">
          <Editorial
            heading={
              <h2 className="type-display">
                <MarkedTitle
                  title={content.ready.heading}
                  mark={content.ready.mark}
                />
              </h2>
            }
            aside={
              <div className="flex flex-col gap-5">
                <p className="type-lede text-muted">{content.ready.text}</p>
                {content.ready.link && (
                  <div>
                    <ArrowLink href={content.ready.link.href}>
                      {content.ready.link.label}
                    </ArrowLink>
                  </div>
                )}
              </div>
            }
          />
        </Section>
      )}

      {/* Services: title column and a two-column hairline list. Phones get a
          titles-only two-up index so it reads differently from "What we do";
          tablets stack the title above the list; the side-by-side split
          starts at lg. */}
      <Section tone="stone" size="compact">
        <div className="grid gap-y-head lg:grid-cols-12 lg:gap-x-12">
          <div className="flex flex-col gap-body lg:col-span-4">
            <div>
              <h2 className="type-display-sm">Where we come in.</h2>
              <p className="type-body mt-3 text-muted lg:max-w-[26ch]">
                The services a range like this leans on most.
              </p>
            </div>
            <div>
              <ArrowLink href="/services/">All services</ArrowLink>
            </div>
          </div>
          <ul className="twoup grid grid-cols-2 lg:col-span-8">
            {services.map((service) => (
              <li
                key={service.slug}
                className="py-3 odd:pr-3 even:pl-3 md:py-6 md:odd:pr-4 md:even:pl-4 lg:odd:pr-6 lg:even:pl-6"
              >
                <h3 className="type-title">
                  <Link
                    href={`/services/#${service.slug}`}
                    className="-my-3 inline-block py-3"
                  >
                    <span className="u-wipe">{service.title}</span>
                  </Link>
                </h3>
                <p className="type-body mt-2 hidden max-w-[36ch] text-muted md:block">
                  {service.description}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* Benefits: full-width heading, then three blocks of unequal size. */}
      {content.benefits && content.benefits.length > 0 && (
        <Section tone="bone">
          <h2 className="type-display max-w-[12ch]">
            {content.benefitsHeading}
          </h2>
          <div className="mt-body grid gap-3 md:mt-section-sm md:grid-cols-12 md:gap-4 lg:grid-rows-2">
            {content.benefits.map((benefit, index) => {
              const layout = benefitLayout[index] ?? benefitLayout[2];
              return (
                <Block
                  key={benefit.title}
                  tone={layout.tone}
                  title={benefit.title}
                  className={layout.className}
                >
                  {benefit.text}
                </Block>
              );
            })}
          </div>
        </Section>
      )}

      {/* Closing statement: copy left, heading right-aligned. */}
      {content.statement && (
        <Section tone="ink">
          <Editorial
            reverse
            headingAlign="right"
            mobileAlignRight
            heading={
              <h2 className="type-display">
                <MarkedTitle title={content.statement.heading} />
              </h2>
            }
            aside={
              <p className="type-lede text-muted">{content.statement.text}</p>
            }
          />
        </Section>
      )}

      <ClosingCta copy={content.ctaCopy} />
    </>
  );
}
