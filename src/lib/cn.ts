/**
 * Utility for merging CSS class names conditionally.
 * Lightweight alternative to clsx/classnames — no extra dependency needed.
 *
 * Usage:
 *   cn("base", condition && "conditional", false && "never")
 *   // → "base conditional"
 */
export function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}
