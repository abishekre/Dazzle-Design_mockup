import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { Photo } from "@/components/Photo";
import { Reveal } from "@/components/Reveal";
import type { Tone } from "@/lib/content";

export const metadata: Metadata = {
  title: "About",
  description: "Meet the five women behind Dazzle Designs — event decor near Houston.",
};

// The five of them don't split into fixed roles — everyone does every part of
// the job — so this shows the crafts they share rather than named specialists.
const crafts: { name: string; tone: Tone }[] = [
  { name: "Design & styling", tone: "gold" },
  { name: "Florals", tone: "blush" },
  { name: "Backdrops & drapery", tone: "ivory" },
  { name: "Balloons", tone: "sky" },
  { name: "Setup & install", tone: "sage" },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="Our story"
        title="Five friends, one shared craft"
        intro="Dazzle Designs is five women — mothers and nurses — who found a new creative calling. On our own time, we turn flowers, drapery and balloons into decor for celebrations across Greater Houston."
      />

      <section className="container-content mt-12">
        <Reveal>
          <h2 className="font-display text-2xl sm:text-3xl">Everyone does everything</h2>
          <p className="mt-2 max-w-prose text-muted">
            We don&apos;t split into specialists. Between the five of us we share every part of the
            job, from the first sketch to the last balloon on the wall.
          </p>
        </Reveal>
        <div className="mt-8 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-5">
          {crafts.map((c, i) => (
            <Reveal key={c.name} delay={(i % 5) * 0.06} as="article">
              <Photo tone={c.tone} grade={false} className="aspect-[4/5]" rounded="rounded-xl">
                <div className="absolute inset-0 flex items-end p-4">
                  <span className="font-display text-lg leading-tight text-ink/80">{c.name}</span>
                </div>
              </Photo>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="container-content mt-16">
        <Reveal>
          <div className="max-w-prose text-lg leading-relaxed text-ink/85">
            <p>
              We believe the best celebrations feel personal, not mass-produced. Because we make
              everything by hand around our families and shifts, we take a limited number of events —
              so every backdrop, table and balloon gets the care it deserves.
            </p>
            <p className="mt-5">
              That&apos;s also why we ask for your event date early: it lets us be honest about what we
              can create beautifully in time, rather than overpromising.
            </p>
          </div>
        </Reveal>
      </section>
    </>
  );
}
