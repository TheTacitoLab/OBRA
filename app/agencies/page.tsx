import type { Metadata } from "next";
import { AgencyCta } from "@/components/agencies/AgencyCta";
import { AgencyGuide } from "@/components/agencies/AgencyGuide";
import {
  AgencyDecision,
  AgencyHero,
  AgencyIntro,
} from "@/components/agencies/AgencyIntro";
import { JsonLd } from "@/components/site/JsonLd";
import { Reveal } from "@/components/site/Reveal";
import { agencyPage } from "@/content/agencies";
import { pageMetadata } from "@/lib/metadata";
import { buildPageSchema } from "@/lib/schema/organization";

export const metadata: Metadata = pageMetadata({
  title: agencyPage.title,
  absolute: true,
  description: agencyPage.description,
  path: agencyPage.path,
  ogTitle: agencyPage.ogTitle,
});

/**
 * /agencies/: the site's primary page for agency buyers, in two halves.
 * First a commercial landing page in the homepage's voice (hero with the
 * scroll cue, three alternating sections, one choice: read the guide or
 * enquire). Then the full guide on the same URL (#agency-guide), calm and
 * editorial, with its own contents beside it; the contents end with the
 * guide, before the closing call to action. All of it is in the HTML.
 */
export default function AgenciesPage() {
  return (
    <>
      <JsonLd
        data={buildPageSchema({
          path: agencyPage.path,
          title: agencyPage.ogTitle,
          description: agencyPage.description,
          crumbs: agencyPage.crumbs,
          modified: agencyPage.modified,
        })}
      />
      <Reveal />

      <article>
        <AgencyHero />
        <AgencyIntro />
        <AgencyDecision />
        <AgencyGuide />
      </article>

      <AgencyCta />
    </>
  );
}
