import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { Photo } from "@/components/Photo";
import { Reveal } from "@/components/Reveal";
import { portfolio } from "@/lib/content";

export const metadata: Metadata = {
  title: "Portfolio",
  description: "A look at recent weddings, showers and celebrations we've styled.",
};

// Repeated (varying spans) for a fuller gallery until the team's full archive lands.
const gallery = [
  ...portfolio,
  ...portfolio.map((p, i) => ({
    ...p,
    id: p.id + "-b",
    span: i % 3 === 0 ? ("tall" as const) : undefined,
  })),
];

export default function PortfolioPage() {
  return (
    <>
      <PageHeader
        eyebrow="Our work"
        title="Celebrations we've had the joy of styling"
        intro="Every event is designed around the people and the date. Here's a look at some we're proud of."
      />

      <section className="container-content mt-10">
        <div className="grid auto-rows-[220px] grid-cols-2 gap-4 sm:auto-rows-[260px] lg:grid-cols-3">
          {gallery.map((item, i) => (
            <Reveal
              key={item.id}
              delay={(i % 6) * 0.05}
              className={item.span === "tall" ? "row-span-2" : item.span === "wide" ? "col-span-2" : ""}
            >
              <figure className="group relative h-full">
                <Photo src={item.img} alt={item.title} sizes="(max-width:1024px) 50vw, 33vw" className="h-full shadow-soft" />
                <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 p-4">
                  <p className="font-display text-lg text-surface text-shadow-soft">{item.title}</p>
                  <p className="text-xs text-surface/85 opacity-0 transition-opacity duration-300 group-hover:opacity-100">{item.event}</p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
