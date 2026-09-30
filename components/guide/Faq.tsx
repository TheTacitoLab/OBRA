import { RichText, type LinkAttributes } from "../site/RichText";

export type FaqItem = { id: string; question: string; answer: string[] };

/**
 * FAQ rows as native disclosures. Every answer is in the HTML (closed
 * details still ship their content, and browsers open them for find-in-page
 * and for a link to the row's id); the summary is the keyboard- and
 * screen-reader-operable control, with its expanded state exposed by the
 * browser, and it works before or without any JavaScript.
 */
export function Faq({
  items,
  linkAttributes,
}: {
  items: FaqItem[];
  linkAttributes?: LinkAttributes;
}) {
  return (
    <div className="faq guide-wide">
      {items.map((item) => (
        <details key={item.id} id={item.id} className="faq-item">
          <summary className="faq-summary">
            <h3 className="faq-q">{item.question}</h3>
            <span className="plus-icon" aria-hidden="true" />
          </summary>
          <div className="faq-a">
            {item.answer.map((paragraph, index) => (
              <p key={index}>
                <RichText text={paragraph} linkAttributes={linkAttributes} />
              </p>
            ))}
          </div>
        </details>
      ))}
    </div>
  );
}
