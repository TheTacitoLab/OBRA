import { ArrowLink } from "../site/Button";
import { agencyEvents, agencyLinks } from "@/content/agencies";

/**
 * "Download the Agency Merchandise Brief Template". There is no template
 * document yet, so this renders nothing until agencyLinks.briefTemplate is
 * set to the file's path; then every instance on the page appears at once,
 * tracked as agency_brief_download. Nothing on the page is gated behind it.
 */
export function BriefTemplateLink({ className = "" }: { className?: string }) {
  const href = agencyLinks.briefTemplate;
  if (!href) return null;
  return (
    <ArrowLink href={href} track={agencyEvents.briefDownload} className={className}>
      Download the Agency Merchandise Brief Template
    </ArrowLink>
  );
}
