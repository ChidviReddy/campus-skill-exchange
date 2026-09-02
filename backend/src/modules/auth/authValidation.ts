/**
 * VIT Email Validation for Backend
 * SkillSwap requires @vitstudent.ac.in or @vit.ac.in domains exclusively.
 */

const ALLOWED_VIT_DOMAINS = ["vitstudent.ac.in", "vit.ac.in"] as const;

export function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

export function isVitEmail(email: string): boolean {
  const normalized = normalizeEmail(email);
  const atIndex = normalized.lastIndexOf("@");
  if (atIndex === -1) return false;

  const domain = normalized.slice(atIndex + 1);
  return (ALLOWED_VIT_DOMAINS as readonly string[]).includes(domain);
}

export function isValidEmailFormat(email: string): boolean {
  const normalized = normalizeEmail(email);
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalized);
}

export const VIT_EMAIL_ERROR =
  "Please use your VIT email address (@vitstudent.ac.in or @vit.ac.in).";
