import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

/**
 * Editorial section header: a hairline rule, a two-digit index, and a large
 * display title with an optional action on the right. The numbering + thin rule
 * give a lookbook/atelier structure rather than a generic "cards" layout.
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
      <header className="border-t border-ink/15 pt-5">
        <div className="flex items-end justify-between gap-6">
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
          {action && <div className="hidden shrink-0 sm:block">{action}</div>}
        </div>
      </header>
    </Reveal>
  );
}
