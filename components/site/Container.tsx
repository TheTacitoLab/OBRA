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
      className={`mx-auto w-full max-w-[112rem] px-5 sm:px-8 lg:px-12 2xl:px-16 ${className}`}
    >
      {children}
    </Tag>
  );
}
