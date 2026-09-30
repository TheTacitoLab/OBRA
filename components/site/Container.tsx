import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

export function Container({
  children,
  className = "",
  as: Tag = "div",
  ...rest
}: {
  children: ReactNode;
  className?: string;
  as?: ElementType;
} & ComponentPropsWithoutRef<"div">) {
  return (
    <Tag
      className={`mx-auto w-full max-w-[140rem] px-5 sm:px-8 lg:px-12 2xl:px-16 3xl:px-20 ${className}`}
      {...rest}
    >
      {children}
    </Tag>
  );
}
