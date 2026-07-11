import { Reveal } from "./Reveal";

export function PageHeader({
  eyebrow,
  title,
  intro,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
}) {
  return (
    <header className="container-content pt-28 sm:pt-32">
      <Reveal>
        <p className="eyebrow">{eyebrow}</p>
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
