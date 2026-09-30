/**
 * The inline link syntax used in first-party copy: [label](/path/).
 * Rendered by components/site/RichText.tsx.
 */
export const INLINE_LINK = /\[([^\]]+)\]\(([^)\s]+)\)/g;

/** The same copy as plain text: link labels kept, markup dropped. */
export const plainText = (text: string) => text.replace(INLINE_LINK, "$1");
