/**
 * Static, first-party JSON-LD built at compile time from site constants.
 * "<" is escaped so a title or standfirst can never end the script element.
 */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
