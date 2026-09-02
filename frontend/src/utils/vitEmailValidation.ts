/**
 * VIT Email Validation Utility
 *
 * SkillSwap is built exclusively for the VIT community.
 * Only the following two email domains are permitted:
 *   - @vitstudent.ac.in
 *   - @vit.ac.in
 *
 * The check is exact: no substring / loose matching is used.
 */

const ALLOWED_VIT_DOMAINS = ["vitstudent.ac.in", "vit.ac.in"] as const;

/**
 * Normalizes an email address:
 *  - Trims leading/trailing whitespace
 *  - Converts to lowercase
 */
export function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

/**
 * Returns true if the given (already-normalized) email belongs to an
 * allowed VIT domain.
 *
 * Uses an exact domain match — does NOT accept:
 *   - student@notvit.ac.in
 *   - student@vit.ac.in.fake.com
 *   - student@vitstudent.com
 */
export function isVitEmail(email: string): boolean {
  const normalized = normalizeEmail(email);
  const atIndex = normalized.lastIndexOf("@");
  if (atIndex === -1) return false;

  const domain = normalized.slice(atIndex + 1);
  return (ALLOWED_VIT_DOMAINS as readonly string[]).includes(domain);
}

/**
 * Returns true if the string looks like a syntactically valid email address.
 * Deliberately simple — just checks for the presence of a non-empty local
 * part, an @, and a domain with at least one dot.
 */
export function isValidEmailFormat(email: string): boolean {
  const normalized = normalizeEmail(email);
  // Simple RFC-compatible sanity check
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalized);
}

/** Human-readable error message to display when VIT validation fails. */
export const VIT_EMAIL_ERROR =
  "Please use your VIT email address (@vitstudent.ac.in or @vit.ac.in).";
