import Link from "next/link";
import { Section } from "./Section";
import { AssetPlaceholder } from "./AssetPlaceholder";
import { designDevelopmentImage, process } from "@/content/festival-landing";

export function ProcessStages() {
  return (
    <Section
      eyebrow={process.eyebrow}
      heading={
        <>
          <span className="block">{process.headingLineOne}</span>
          <span className="block">{process.headingLineTwo}</span>
        </>
      }
      headingId="festival-process-heading"
    >
      <p className="text-lede mt-6 max-w-3xl text-ash">{process.intro}</p>

      <ol className="mt-12 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
        {process.stages.map((stage) => (
          <li key={stage.n} className="bg-void p-6 sm:p-7">
            <p className="font-display text-[2rem] font-extrabold leading-none text-coral">
              {stage.n}
            </p>
            <h3 className="text-headline mt-4 text-[1.25rem] text-white">
              {stage.heading}
            </h3>
            <p className="text-body mt-2.5 text-ash">{stage.body}</p>
          </li>
        ))}
      </ol>

      <AssetPlaceholder asset={designDevelopmentImage} className="mt-10" />

      <p className="text-body mt-8">
        <Link
          href={process.processLink.href}
          className="text-white underline decoration-yellow underline-offset-4 transition-colors hover:text-yellow"
        >
          {process.processLink.label}
        </Link>
      </p>
    </Section>
  );
}
