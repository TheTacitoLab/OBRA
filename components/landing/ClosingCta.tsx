import { Section } from "../site/Section";
import { Editorial } from "../site/Editorial";
import { Button } from "../site/Button";
import { MarkedTitle } from "../site/MarkedTitle";
import { primaryCta } from "@/content/site";
import { siteConfig } from "@/lib/siteConfig";

/**
 * The closing call to action used at the foot of every landing page, with
 * the last word of the title on the lime block.
 */
export function ClosingCta({
  title = "Start a project.",
  copy = "Send the brief, or the start of one, and we’ll take it from there.",
}: {
  title?: string;
  copy?: string;
}) {
  const mark = title.split(/\s+/).at(-1) ?? "";
  return (
    <Section tone="clay" id="start">
      <Editorial
        heading={
          <h2 className="type-display">
            <MarkedTitle title={title} mark={mark} />
          </h2>
        }
        aside={
          <div className="flex flex-col gap-body">
            <p className="type-lede text-muted">{copy}</p>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
              <Button href={primaryCta.href}>{primaryCta.label}</Button>
              <a
                href={`mailto:${siteConfig.email}`}
                className="type-small inline-flex min-h-11 items-center text-muted"
              >
                <span className="u-wipe u-static">{siteConfig.email}</span>
              </a>
            </div>
          </div>
        }
      />
    </Section>
  );
}
