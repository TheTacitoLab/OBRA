import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { SectionLabel } from "@/components/SectionLabel";
import { Reveal } from "@/components/Reveal";
import { BriefForm } from "@/components/BriefForm";
import { Asterisk } from "@/components/brand/Marks";
import { pageMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/siteConfig";

export const metadata: Metadata = pageMetadata({
  title: "Start a brief",
  description:
    "Tell us about your drop. OBRA takes limited edition football jerseys from concept to creation.",
  path: "/brief/",
});

const steps = ["Send your brief", "We shape a concept", "We build the drop"];

export default function BriefPage() {
  return (
    <section className="pb-24 pt-32 sm:pt-40 md:pb-32">
      <Container>
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <Reveal>
              <SectionLabel>Start a brief</SectionLabel>
              <h1 className="text-display mt-6 text-white">
                Tell us about your drop.
              </h1>
              <p className="text-lede mt-6 max-w-md text-ash">
                Share the idea and we&apos;ll take it from concept to creation.
                One process, start to finish.
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <ul className="mt-10 space-y-3">
                {steps.map((step) => (
                  <li key={step} className="flex items-center gap-4">
                    <Asterisk className="h-4 w-4 shrink-0 text-yellow" />
                    <span className="text-lede text-white">{step}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <Reveal delay={0.08}>
            <div className="rounded-sm border border-line bg-obsidian p-6 sm:p-8">
              <BriefForm
                accessKey={siteConfig.web3formsKeys.brief}
                subject="OBRA brief (brief page)"
              />
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
