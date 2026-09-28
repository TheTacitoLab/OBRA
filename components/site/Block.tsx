import type { ReactNode } from "react";

export type BlockTone = "stone" | "accent" | "outline";

/**
 * A content block. Groups of blocks should be mostly neutral (stone,
 * outline) with at most one accent among them.
 */
export function Block({
  tone = "stone",
  title,
  meta,
  children,
  className = "",
}: {
  tone?: BlockTone;
  title: ReactNode;
  meta?: ReactNode;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <div className={`block block-${tone} ${className}`}>
      <div className="flex items-start justify-between gap-6">
        <h3 className="type-headline max-w-[14ch]">{title}</h3>
        {meta && <span className="type-meta shrink-0 text-muted">{meta}</span>}
      </div>
      {children && <div className="type-body text-muted">{children}</div>}
    </div>
  );
}
