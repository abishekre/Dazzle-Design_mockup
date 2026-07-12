import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

/**
 * Editorial section header: a small gold flourish tick, a two-digit index,
 * and a large display title with an optional action. The numbering + hairline
 * give a lookbook/atelier structure rather than a generic "cards" layout.
 * The action link shows on every breakpoint (below the title on phones,
 * beside it on larger screens) so mobile never loses the "see more" link.
 */
export function SectionHead({
  index,
  eyebrow,
  title,
  action,
}: {
  index: string;
  eyebrow?: string;
  title: string;
  action?: ReactNode;
}) {
  return (
    <Reveal>
      <header className="relative border-t border-ink/15 pt-5">
        <svg
          viewBox="0 0 20 20"
          aria-hidden
          className="absolute -top-[7px] left-0 h-3.5 w-3.5 text-accent"
        >
          <path fill="currentColor" d="M10,2 L13,10 L10,18 L7,10 Z" />
        </svg>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
          <div className="flex items-baseline gap-4 sm:gap-6">
            <span className="font-display text-sm text-muted tabular-nums sm:text-base">{index}</span>
            <div>
              {eyebrow && (
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted">
                  {eyebrow}
                </p>
              )}
              <h2 className="mt-2 font-display text-[2rem] leading-[1.02] sm:text-4xl lg:text-[3.25rem]">
                {title}
              </h2>
            </div>
          </div>
          {action && <div className="shrink-0 pl-9 sm:pl-0">{action}</div>}
        </div>
      </header>
    </Reveal>
  );
}
