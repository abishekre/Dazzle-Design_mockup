/**
 * Dazzle Designs crest — an original vector recreation of the team's real gold
 * medallion mark (from their Instagram profile art: a symmetric fleur/scroll
 * damask ornament). Redrawn as clean, scalable SVG rather than using the
 * source raster directly, so it stays crisp at favicon size and at large
 * hero/print sizes alike. Uses `currentColor` so it can be gold, ink, or
 * cream depending on context.
 */
export function LogoMark({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="currentColor" aria-hidden>
      <circle cx="50" cy="50" r="47" fill="none" stroke="currentColor" strokeWidth="1" />
      <circle cx="50" cy="50" r="43.5" fill="none" stroke="currentColor" strokeWidth="0.5" />

      <path d="M50,43 L57,50 L50,57 L43,50 Z" />

      <g id="dd-petal">
        <path
          d="M50,44
             C45.5,44 41.5,37 41,29
             C40.6,22.5 43.5,15 50,4
             C56.5,15 59.4,22.5 59,29
             C58.5,37 54.5,44 50,44 Z"
        />
        <path d="M50,3 L52.1,5.1 L50,7.2 L47.9,5.1 Z" />
      </g>
      <use href="#dd-petal" transform="rotate(90 50 50)" />
      <use href="#dd-petal" transform="rotate(180 50 50)" />
      <use href="#dd-petal" transform="rotate(270 50 50)" />

      <g id="dd-scroll">
        <path
          d="M60,36
             A 19,19 0 0 1 85,24
             A 8,8 0 0 0 60,36 Z"
        />
        <circle cx="86.5" cy="13" r="1.4" />
      </g>
      <use href="#dd-scroll" transform="rotate(90 50 50)" />
      <use href="#dd-scroll" transform="rotate(180 50 50)" />
      <use href="#dd-scroll" transform="rotate(270 50 50)" />
    </svg>
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
