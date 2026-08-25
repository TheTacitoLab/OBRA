import type { Metadata } from "next";
import { FestivalHero } from "@/components/festival/Hero";
import { BenefitGrid } from "@/components/festival/BenefitGrid";
import { AudienceColumns } from "@/components/festival/AudienceColumns";
import { ProcessStages } from "@/components/festival/ProcessStages";
import { SpecOptions } from "@/components/festival/SpecOptions";
import { PackageComparison } from "@/components/festival/PackageComparison";
import { Timeline } from "@/components/festival/Timeline";
import { PlanningChecklist } from "@/components/festival/PlanningChecklist";
import { ProofSection } from "@/components/festival/ProofSection";
import { FaqAccordion } from "@/components/festival/FaqAccordion";
import { FinalCta } from "@/components/festival/FinalCta";
import { StickyCta } from "@/components/StickyCta";
import { stickyCta } from "@/content/festival-landing";
import { pageMetadata } from "@/lib/metadata";
import { buildFestivalPageSchema, festivalPageMeta } from "@/lib/schema/festivalPage";
import { festivalHref } from "@/lib/siteConfig";

// `absolute` so the root layout's "%s | OBRA" template does not double the
// site name, which the specified title already carries.
export const metadata: Metadata = pageMetadata({
  title: festivalPageMeta.title,
  absolute: true,
  description: festivalPageMeta.description,
  path: festivalHref,
  ogTitle: festivalPageMeta.ogTitle,
  ogDescription: festivalPageMeta.ogDescription,
});

export default function FestivalLandingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        // Static, first-party JSON built at compile time from page content.
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildFestivalPageSchema()),
        }}
      />

      <FestivalHero />
      <BenefitGrid />
      <AudienceColumns />
      <ProcessStages />
      <SpecOptions />
      <PackageComparison />
      <Timeline />
      <PlanningChecklist />
      <ProofSection />
      {/* Section 10, the Journal cluster, ships in phase 2 once the articles
          exist. It is omitted rather than stubbed so there are no dead links. */}
      <FaqAccordion />
      <FinalCta />

      <StickyCta
        href={stickyCta.href}
        label={stickyCta.label}
        showAfterId="festival-packages"
        hideAtId="festival-final-cta"
      />
    </>
  );
}
