import { Sheet } from "./Sheet";
import { Container } from "../site/Container";
import { ArrowLink } from "../site/Button";
import { RichText } from "../site/RichText";
import { overview } from "@/content/home";
import { primaryCta } from "@/content/site";

/**
 * The business explained in full, after the last statement: the quiet,
 * reading part of the homepage, on warm bone. One editorial system
 * throughout: each block is its heading on the left and its copy on the
 * right, both starting at the same line, with hairlines between blocks.
 * The opening heading is only a step larger than the topic headings: an
 * article heading, not another statement. Everything is ordinary visible
 * HTML with plain links to the pages that own each search, nothing
 * collapsed.
 */
export function Overview() {
  return (
    <Sheet id="about-madebyobra" tone="bone" sectionClassName="sheet--round">
      <Container className="py-section-lg">
        <div className="overview-topic overview-topic--open article-split">
          <h2 className="overview-title" data-reveal="up">
            {overview.title}
          </h2>
          <div className="overview-lead" data-reveal="up">
            {overview.lead.map((text) => (
              <p key={text}>
                <RichText text={text} />
              </p>
            ))}
          </div>
        </div>
        {overview.topics.map((topic, index) => (
          <section key={topic.title} className="overview-topic article-split">
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
      </Container>
    </Sheet>
  );
}
