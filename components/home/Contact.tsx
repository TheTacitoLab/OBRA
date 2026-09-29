import { Section } from "../site/Section";
import { MarkedTitle } from "../site/MarkedTitle";
import { ProjectForm } from "../forms/ProjectForm";
import { siteConfig } from "@/lib/siteConfig";

export function Contact() {
  return (
    <Section id="start-a-project" tone="bone" size="large">
      <div className="grid gap-y-10 lg:grid-cols-12 lg:gap-x-12">
        <div className="lg:col-span-6">
          <div className="lg:sticky lg:top-24">
            <h2 className="type-display">
              <MarkedTitle title="Start a project." mark="project." />
            </h2>
            <p className="type-lede mt-head text-muted">
              Tell us what you&rsquo;re making, roughly how many you need and
              when you need it. We&rsquo;ll come back with the best way to
              approach it.
            </p>
            <p className="type-small mt-6 text-muted">
              Prefer email?{" "}
              <a
                href={`mailto:${siteConfig.email}`}
                className="-my-3 inline-flex min-h-11 items-center text-fg"
              >
                <span className="u-wipe u-static">{siteConfig.email}</span>
              </a>
            </p>
          </div>
        </div>
        <div className="lg:col-span-6 lg:col-start-7">
          <ProjectForm
            accessKey={siteConfig.web3formsKeys.homepage}
            subject="New project brief (homepage)"
          />
        </div>
      </div>
    </Section>
  );
}
