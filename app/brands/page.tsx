import type { Metadata } from "next";
import { AudiencePage } from "@/components/landing/AudiencePage";
import { JsonLd } from "@/components/site/JsonLd";
import { getAudience } from "@/content/audiences";
import { pageHref } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";
import { buildPageSchema } from "@/lib/schema/organization";

const slug = "brands";
const path = pageHref(slug);
const { page } = getAudience(slug);

export const metadata: Metadata = pageMetadata({
  title: page.title,
  description: page.description,
  path,
});

export default function BrandsPage() {
  return (
    <>
      <JsonLd
        data={buildPageSchema({
          path,
          title: page.title,
          description: page.description,
          crumbs: [
            { name: "Home", path: "/" },
            { name: "Who for", path: "/who-for/" },
            { name: page.title },
          ],
        })}
      />
      <AudiencePage slug={slug} />
    </>
  );
}
