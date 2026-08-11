import Image from "next/image";

/**
 * Dazzle Designs crest — the team's real gold medallion mark (cropped from
 * their actual Instagram/Facebook profile photo, background keyed out to
 * transparent so it sits cleanly on any surface). Used as-is rather than a
 * redrawn interpretation, per the team's request to match their real logo.
 */
export function LogoMark({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <span className={`relative inline-block shrink-0 ${className}`}>
      <Image src="/logo-mark.png" alt="" fill sizes="64px" className="object-contain" />
    </span>
  );
}

/** Mark + wordmark lockup, for the header/footer. */
export function Logo({ className = "", markClassName = "h-8 w-8" }: { className?: string; markClassName?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <LogoMark className={markClassName} />
      <span className="font-display text-xl font-medium tracking-tight">Dazzle Designs</span>
    </span>
  );
}
