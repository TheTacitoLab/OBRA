import type { Metadata } from "next";
import { Container } from "@/components/site/Container";
import { ProjectForm } from "@/components/forms/ProjectForm";
import { JsonLd } from "@/components/site/JsonLd";
import { pageMetadata } from "@/lib/metadata";
import { buildPageSchema } from "@/lib/schema/organization";
import { siteConfig, startHref } from "@/lib/siteConfig";

const page = {
  path: startHref,
  title: "Start a project",
  description:
    "Tell madebyobra what you're looking to make, roughly how many you need and when you need it. We'll come back with the best way to approach it.",
};

export const metadata: Metadata = pageMetadata({
  title: page.title,
  description: page.description,
  path: page.path,
});

export default function StartAProjectPage() {
  return (
    <>
      <JsonLd
        data={buildPageSchema({
          ...page,
          crumbs: [{ name: "Home", path: "/" }, { name: page.title }],
        })}
      />
      <section data-tone="bone" className="bg-bg text-fg">
        <Container className="pb-24 pt-40 md:pb-32 md:pt-48">
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-x-12">
            <div className="lg:col-span-5">
              <div className="lg:sticky lg:top-28">
                <h1 className="type-display">Start a project.</h1>
                <p className="type-lede mt-8 max-w-[30ch] text-muted">
                  Tell us what you&rsquo;re looking to make, roughly how many
                  you need and when you need it. We&rsquo;ll come back to you
                  with the best way to approach it.
                </p>
                <p className="type-small mt-10 text-muted">
                  Prefer email?{" "}
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="u-wipe text-fg"
                  >
                    {siteConfig.email}
                  </a>
                </p>
              </div>
            </div>
            <div className="lg:col-span-7 lg:col-start-7">
              <ProjectForm
                accessKey={siteConfig.web3formsKeys.brief}
                subject="New project brief"
              />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
