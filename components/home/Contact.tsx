import { Sheet } from "./Sheet";
import { Container } from "../site/Container";
import { ProjectForm } from "../forms/ProjectForm";
import { siteConfig } from "@/lib/siteConfig";

export function Contact() {
  return (
    <Sheet id="start-a-project" tone="bone" last>
      <Container className="flex flex-1 flex-col py-28 md:py-36">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-x-12">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <h2 className="type-display">Start a project.</h2>
              <p className="type-lede mt-8 max-w-[30ch] text-muted">
                Tell us what you&rsquo;re looking to make, roughly how many you
                need and when you need it. We&rsquo;ll come back to you with the
                best way to approach it.
              </p>
              <p className="type-small mt-10 text-muted">
                Prefer email?{" "}
                <a href={`mailto:${siteConfig.email}`} className="u-wipe text-fg">
                  {siteConfig.email}
                </a>
              </p>
            </div>
          </div>
          <div className="lg:col-span-7 lg:col-start-7">
            <ProjectForm
              accessKey={siteConfig.web3formsKeys.homepage}
              subject="New project brief (homepage)"
            />
          </div>
        </div>
      </Container>
    </Sheet>
  );
}
