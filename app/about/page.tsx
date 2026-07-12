import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { Photo } from "@/components/Photo";
import { Reveal } from "@/components/Reveal";
import type { Tone } from "@/lib/content";

export const metadata: Metadata = {
  title: "About",
  description: "Meet the five women behind Dazzle Designs — event decor near Houston.",
};

const team: { name: string; role: string; tone: Tone }[] = [
  { name: "Founder One", role: "Design & styling", tone: "gold" },
  { name: "Founder Two", role: "Florals", tone: "blush" },
  { name: "Founder Three", role: "Backdrops & drapery", tone: "ivory" },
  { name: "Founder Four", role: "Balloons", tone: "sky" },
  { name: "Founder Five", role: "Setup & install", tone: "sage" },
];

const initials = (name: string) => name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="Our story"
        title="Five friends, one shared craft"
        intro="Dazzle Designs is five women — mothers and nurses — who found a new creative calling. On our own time, we turn flowers, drapery and balloons into decor for celebrations across Greater Houston."
      />

      <section className="container-content mt-12 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-5">
        {team.map((m, i) => (
          <Reveal key={m.name} delay={(i % 5) * 0.06} as="article">
            <div>
              <Photo tone={m.tone} grade={false} className="aspect-[4/5]" rounded="rounded-xl">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-display text-5xl text-ink/70">{initials(m.name)}</span>
                </div>
              </Photo>
              <div className="mt-3">
                <h2 className="font-display text-lg">{m.name}</h2>
                <p className="mt-0.5 text-sm text-muted">{m.role}</p>
              </div>
            </div>
          </Reveal>
        ))}
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
