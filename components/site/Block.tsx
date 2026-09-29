import type { ReactNode } from "react";

export type BlockTone = "stone" | "accent" | "outline";

/**
 * A content block: a title and a short paragraph on a toned panel. Groups
 * of blocks should be mostly neutral (stone, outline) with at most one
 * accent among them, and no labels or numbers on the panel.
 */
export function Block({
  tone = "stone",
  title,
  children,
  className = "",
}: {
  tone?: BlockTone;
  title: ReactNode;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <div className={`panel panel-${tone} ${className}`}>
      <h3 className="type-headline max-w-[14ch]">{title}</h3>
      {children && <div className="type-body text-muted">{children}</div>}
    </div>
  );
}
