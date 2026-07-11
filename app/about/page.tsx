import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { Photo } from "@/components/Photo";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "About",
  description: "Meet the three makers behind Dazzle Design.",
};

const team = [
  { name: "Founder One", role: "Candles & scent", tone: "gold" as const },
  { name: "Founder Two", role: "Florals & bouquets", tone: "sage" as const },
  { name: "Founder Three", role: "Stage & styling", tone: "terracotta" as const },
];

const initials = (name: string) =>
  name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="Our story"
        title="Three makers, one weekend studio"
        intro="Dazzle Design started as a shared love of making things by hand. On weekends, the three of us turn candles, flowers and fabric into decor for celebrations across the city."
      />

      <section className="container-content mt-12 grid gap-8 sm:grid-cols-3">
        {team.map((m, i) => (
          <Reveal key={m.name} delay={i * 0.08} as="article">
            <div>
              <Photo tone={m.tone} grade={false} className="aspect-[4/5]" rounded="rounded-xl">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-display text-6xl text-surface/90 text-shadow-soft">
                    {initials(m.name)}
                  </span>
                </div>
              </Photo>
              <div className="mt-4">
                <h2 className="font-display text-xl">{m.name}</h2>
                <p className="mt-1 text-sm text-muted">{m.role}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </section>

      <section className="container-content mt-16">
        <Reveal>
          <div className="max-w-prose text-lg leading-relaxed text-ink/85">
            <p>
              We believe the best celebrations feel personal, not mass-produced.
              Because we&apos;re a small team making everything by hand, we take a
              limited number of events each weekend — so every piece gets the care
              it deserves.
            </p>
            <p className="mt-5">
              That&apos;s also why we ask for your event date early: it lets us be
              honest about what we can create beautifully in time, rather than
              overpromising.
            </p>
          </div>
        </Reveal>
      </section>
    </>
  );
}
