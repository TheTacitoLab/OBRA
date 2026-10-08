import type { Metadata } from "next";
import { MarkedTitle } from "@/components/site/MarkedTitle";
import { Section } from "@/components/site/Section";
import { ProjectForm } from "@/components/forms/ProjectForm";
import { JsonLd } from "@/components/site/JsonLd";
import { pageTitleClass } from "@/components/landing/PageHero";
import { pageMetadata } from "@/lib/metadata";
import { buildPageSchema } from "@/lib/schema/organization";
import { contactHref, siteConfig } from "@/lib/siteConfig";

const page = {
  path: contactHref,
  title: "Get in touch",
  description:
    "Tell madebyobra about your project: what you're looking to make, roughly how many you need and when you need it. We'll come back with the best way to approach it.",
};

export const metadata: Metadata = pageMetadata({
  title: page.title,
  description: page.description,
  path: page.path,
});

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={buildPageSchema({
          ...page,
          crumbs: [{ name: "Home", path: "/" }, { name: page.title }],
        })}
      />
      <Section tone="bone" size="default" hero>
        {/* Two lines at every width: the long tier keeps "Tell us about"
            on one line down to a 320px phone. */}
        <h1 className={pageTitleClass("Tell us about your project.", "long")}>
          <MarkedTitle title={"Tell us about\nyour project."} mark="project." />
        </h1>
        <div className="mt-body grid gap-y-10 lg:grid-cols-12 lg:gap-x-12">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-24">
              <p className="type-lede text-muted">
                Tell us what you&rsquo;re making, roughly how many you need
                and when you need it. We&rsquo;ll come back with the best way
                to approach it.
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
          <div className="lg:col-span-7 lg:col-start-6">
            <ProjectForm
              accessKey={siteConfig.web3formsKey}
              subject="New project enquiry"
            />
          </div>
        </div>
      </Section>
    </>
  );
}
