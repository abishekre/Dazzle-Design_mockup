import { Reveal } from "../Reveal";

/**
 * Like the Dazzle PageHeader, but sized for Floral's sticky in-flow header
 * rather than Dazzle's fixed overlay one — hence the smaller top padding.
 */
export function FloralPageHeader({
  eyebrow,
  title,
  intro,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
}) {
  return (
    <header className="container-content pt-12 sm:pt-16">
      <Reveal>
        <p className="eyebrow">
          <svg viewBox="0 0 20 20" aria-hidden className="h-2.5 w-2.5 text-accent">
            <path fill="currentColor" d="M10,2 L13,10 L10,18 L7,10 Z" />
          </svg>
          {eyebrow}
        </p>
      </Reveal>
      <Reveal delay={0.05}>
        <h1 className="mt-4 max-w-2xl font-display text-4xl sm:text-5xl">{title}</h1>
      </Reveal>
      {intro && (
        <Reveal delay={0.1}>
          <p className="mt-5 max-w-xl text-lg text-muted">{intro}</p>
        </Reveal>
      )}
    </header>
  );
}
