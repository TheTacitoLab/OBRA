import Link from "next/link";
import type { Crumb } from "@/lib/schema/organization";

/**
 * Visible breadcrumbs: the same trail as the page's BreadcrumbList. Quiet
 * meta type above the page title; the last crumb is the current page, as
 * plain text marked aria-current.
 */
export function Breadcrumbs({
  crumbs,
  className = "",
}: {
  crumbs: Crumb[];
  className?: string;
}) {
  return (
    <nav aria-label="Breadcrumb" className={`type-meta text-muted ${className}`}>
      <ol className="flex flex-wrap items-center gap-x-2">
        {crumbs.map((crumb, index) => {
          const last = index === crumbs.length - 1;
          return (
            <li key={crumb.name} className="inline-flex items-center gap-x-2">
              {last || !crumb.path ? (
                <span aria-current={last ? "page" : undefined} className="text-fg">
                  {crumb.name}
                </span>
              ) : (
                <Link
                  href={crumb.path}
                  className="-my-3 inline-flex min-h-11 items-center"
                >
                  <span className="u-wipe">{crumb.name}</span>
                </Link>
              )}
              {!last && <span aria-hidden="true">/</span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
