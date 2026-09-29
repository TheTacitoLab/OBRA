import { Section } from "../site/Section";
import { Editorial } from "../site/Editorial";
import { Button } from "../site/Button";
import { primaryCta } from "@/content/site";
import { siteConfig } from "@/lib/siteConfig";

/** The closing call to action used at the foot of every landing page. */
export function ClosingCta({
  title = "Start a project.",
  copy = "Tell us what you're looking to make, roughly how many you need and when you need it.",
}: {
  title?: string;
  copy?: string;
}) {
  return (
    <Section tone="clay" id="start">
      <Editorial
        heading={<h2 className="type-display">{title}</h2>}
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
