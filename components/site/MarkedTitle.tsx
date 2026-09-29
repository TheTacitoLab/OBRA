import { Fragment } from "react";

/**
 * A heading with its final word (or words) on the lime block. A "\n" in
 * `title` forces a line break there; without one the break goes before the
 * marked word so the block starts its own line ("Start a / project."). A
 * marked word that follows other words on its line ("Built for / your
 * client.") keeps the word space in front of the block.
 */
export function MarkedTitle({ title, mark }: { title: string; mark?: string }) {
  const lines = title.split("\n");
  const last = lines[lines.length - 1];
  const lead = lines.slice(0, -1).map((line, index) => (
    <Fragment key={index}>
      {line}
      <br />
    </Fragment>
  ));
  if (!mark || !last.endsWith(mark)) {
    return (
      <Fragment>
        {lead}
        {last}
      </Fragment>
    );
  }
  const before = last.slice(0, -mark.length).trimEnd();
  if (before && lines.length > 1) {
    return (
      <Fragment>
        {lead}
        {before} <span className="mark mark--mid">{mark}</span>
      </Fragment>
    );
  }
  return (
    <Fragment>
      {lead}
      {before && (
        <Fragment>
          {before}
          <br />
        </Fragment>
      )}
      <span className="mark">{mark}</span>
    </Fragment>
  );
}
