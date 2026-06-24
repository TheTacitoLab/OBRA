import { GradientSurface } from "../GradientSurface";
import { Container } from "../Container";
import { Reveal } from "../Reveal";
import { Asterisk } from "../brand/Marks";
import { BriefForm } from "../BriefForm";
import { siteConfig } from "@/lib/siteConfig";

export function ClosingCTA() {
  return (
    <section id="start">
      <GradientSurface topScrim>
        <div aria-hidden className="absolute inset-0 scrim-hero" />
        <Container className="relative py-24 sm:py-32">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
            <Reveal>
              <div>
                <Asterisk className="h-8 w-8 text-yellow" />
                <h2 className="text-display mt-8 text-white">
                  Take your drop from concept to creation.
                </h2>
                <p className="text-lede mt-6 max-w-md text-ash">
                  Tell us about your drop and we&apos;ll be in touch.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="rounded-sm border border-line bg-void/80 p-6 backdrop-blur-md sm:p-8">
                <BriefForm
                  compact
                  accessKey={siteConfig.web3formsKeys.homepage}
                  subject="OBRA brief (homepage)"
                />
              </div>
            </Reveal>
          </div>
        </Container>
      </GradientSurface>
    </section>
  );
}
