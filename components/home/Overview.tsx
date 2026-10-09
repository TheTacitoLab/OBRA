import { Sheet } from "./Sheet";
import { Container } from "../site/Container";
import { ArrowLink } from "../site/Button";
import { RichText } from "../site/RichText";
import { overview } from "@/content/home";
import { primaryCta } from "@/content/site";

/**
 * The business explained in full, after the last statement: a quiet,
 * reading section on warm bone. The H2 across the top, then the
 * introduction and each topic in one reading column, with the H3s beside
 * it on wide screens. Everything is ordinary visible HTML with plain links
 * to the pages that own each search, nothing collapsed.
 */
export function Overview() {
  return (
    <Sheet id="about-madebyobra" tone="bone" sectionClassName="sheet--round">
      <Container className="py-section-lg">
        <h2 className="overview-title" data-reveal="up">
          {overview.title}
        </h2>
        <div className="overview-topic mt-head border-t-0 pt-0 lg:mt-body">
          <div className="hidden lg:block" aria-hidden="true" />
          <div className="overview-lead" data-reveal="up">
            {overview.lead.map((text) => (
              <p key={text}>
                <RichText text={text} />
              </p>
            ))}
          </div>
        </div>
        <div className="mt-section-sm">
          {overview.topics.map((topic, index) => (
            <section key={topic.title} className="overview-topic">
              <h3 className="overview-topic__title">{topic.title}</h3>
              <div className="overview-topic__body">
                {topic.paragraphs.map((text) => (
                  <p key={text}>
                    <RichText text={text} />
                  </p>
                ))}
                {/* The way on, at the end of How madebyobra works. */}
                {index === overview.topics.length - 1 && (
                  <div className="overview-links">
                    {overview.links.map((link) => (
                      <ArrowLink strong key={link.href} href={link.href}>
                        {link.label}
                      </ArrowLink>
                    ))}
                    <ArrowLink
                      strong
                      href={primaryCta.href}
                      track="get_in_touch_click"
                      trackSection="overview"
                    >
                      {primaryCta.label}
                    </ArrowLink>
                  </div>
                )}
              </div>
            </section>
          ))}
        </div>
      </Container>
    </Sheet>
  );
}
