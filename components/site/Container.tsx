import type { ElementType, ReactNode } from "react";

export function Container({
  children,
  className = "",
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: ElementType;
}) {
  return (
    <Tag
      className={`mx-auto w-full max-w-[90rem] px-5 sm:px-8 lg:px-12 ${className}`}
    >
      {children}
    </Tag>
  );
}
