import { Section } from "./Section";
import { Arrow } from "../brand/Marks";
import { faqSection } from "@/content/festival-landing";
import { festivalFaq } from "@/content/festival-faq";

/**
 * Native details/summary accordion: every answer is in the initial HTML, and
 * keyboard operation, focus handling and the expanded state come from the
 * browser rather than from JavaScript. First item open by default.
 */
export function FaqAccordion() {
  return (
    <Section
      heading={faqSection.heading}
      headingId="festival-faq-heading"
      layout="centre"
      size="large"
      background="blend-up-purple"
    >
      <div className="mx-auto mt-12 max-w-3xl border-t border-white/15 text-left">
        {festivalFaq.map((item, i) => (
          <details
            key={item.id}
            id={`faq-${item.id}`}
            open={i === 0}
            className="group border-b border-white/15"
          >
            <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-5 [&::-webkit-details-marker]:hidden">
              <h3 className="text-lede font-medium text-white">{item.question}</h3>
              <Arrow
                aria-hidden="true"
                className="mt-1 h-4 w-4 shrink-0 rotate-90 text-yellow transition-transform duration-300 group-open:-rotate-90"
              />
            </summary>
            <div className="pb-6 pr-10">
              {item.answer.map((paragraph) => (
                <p key={paragraph.slice(0, 32)} className="text-body text-ash">
                  {paragraph}
                </p>
              ))}
            </div>
          </details>
        ))}
      </div>
    </Section>
  );
}
