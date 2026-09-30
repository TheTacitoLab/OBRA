/**
 * The short version: the page's advice in one stone panel, arranged to be
 * read (or screenshotted) at a glance. The quantity rules echo the bands
 * above; the principles are short lines rather than a checklist.
 */
const rules = [
  {
    qty: "Below 250 units",
    text: "Use the available customisation intelligently.",
  },
  {
    qty: "250–1,000 units",
    text: "Seriously consider direct custom manufacturing. This is often where you can create something considerably more distinctive without entering huge-volume territory.",
  },
  {
    qty: "Above 1,000 units",
    text: "Speak to the manufacturer early. The scale may justify developing the product itself rather than adapting something somebody else already makes.",
  },
];

const principles = [
  "Compare finished costs, not the blank price against the manufacturing price.",
  "Give your supplier the budget and delivery date early.",
  "Decide who can approve the sample.",
  "When the product matters to the campaign, spend more of the available budget on the product people will actually receive.",
];

export function ShortVersion() {
  return (
    <>
      <p className="type-statement !max-w-[30ch]">
        If you are an agency planning merchandise, decide how original the
        product needs to be before choosing the supplier route.
      </p>
      <ol className="rules guide-wide" aria-label="By quantity">
        {rules.map((rule) => (
          <li key={rule.qty}>
            <p className="type-title">{rule.qty}</p>
            <p className="type-body mt-2 text-muted">{rule.text}</p>
          </li>
        ))}
      </ol>
      <ul className="principles guide-wide" aria-label="And whatever the quantity">
        {principles.map((line) => (
          <li key={line}>{line}</li>
        ))}
      </ul>
      <p className="type-statement">
        That is normally where the <span className="mark mark--mid">memorable bit</span>{" "}
        lives.
      </p>
    </>
  );
}
