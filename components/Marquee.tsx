import { SparkIcon } from "./icons";

/**
 * Infinite marquee ribbon. Two identical tracks translate -50% for a seamless
 * loop; reduced-motion users get a static row (global media query zeroes the
 * animation). Pauses on hover.
 */
export function Marquee({ words }: { words: string[] }) {
  const Track = () => (
    <div className="flex shrink-0 items-center gap-8 pr-8" aria-hidden>
      {words.map((w, i) => (
        <span key={i} className="flex items-center gap-8">
          <span className="font-display text-2xl italic text-surface/90 sm:text-3xl">
            {w}
          </span>
          <SparkIcon className="h-4 w-4 text-accent" />
        </span>
      ))}
    </div>
  );

  return (
    <div className="edge overflow-hidden bg-ink py-5">
      <div className="group flex w-max animate-marquee hover:[animation-play-state:paused]">
        <Track />
        <Track />
      </div>
    </div>
  );
}
