import { Fragment } from "react";

/**
 * A heading whose final word (or words) sits on the lime block, on its own
 * line: "Start a / project.", "What we / make.". `mark` must be the end of
 * `title`; otherwise the title renders unchanged.
 */
export function MarkedTitle({ title, mark }: { title: string; mark: string }) {
  if (!title.endsWith(mark)) return <Fragment>{title}</Fragment>;
  const lead = title.slice(0, -mark.length).trimEnd();
  return (
    <Fragment>
      {lead}
      <br />
      <span className="mark">{mark}</span>
    </Fragment>
  );
}
