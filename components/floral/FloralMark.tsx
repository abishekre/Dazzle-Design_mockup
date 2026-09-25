/**
 * Floral Launch's mark — a small drawn sprig.
 *
 * Celin has no logo yet, so rather than borrow Dazzle's (which would undercut
 * the whole point of her being a separate business) her identity is set in
 * type with this alongside it. Swap for a real logo when she has one.
 */
export function FloralMark({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      className={className}
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinecap="round"
    >
      <path d="M12 21V10" />
      <path d="M12 10c0-2.2 1.5-4 3.4-4 .5 0 .9.1 1.3.3-.3 2.3-2.2 4-4.7 3.7Z" />
      <path d="M12 10c0-2.2-1.5-4-3.4-4-.5 0-.9.1-1.3.3.3 2.3 2.2 4 4.7 3.7Z" />
      <path d="M12 8.2c0-2 1-3.8 2.2-4.8C15.4 4.4 16 6.2 16 8" opacity="0.45" />
      <path d="M12 14.5c1.8 0 3.2-1.1 3.9-2.6-1.9-.5-3.5.4-3.9 2.6Z" />
      <path d="M12 17.5c-1.8 0-3.2-1.1-3.9-2.6 1.9-.5 3.5.4 3.9 2.6Z" />
    </svg>
  );
}
