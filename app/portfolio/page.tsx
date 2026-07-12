import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { Photo } from "@/components/Photo";
import { Reveal } from "@/components/Reveal";
import { SparkIcon } from "@/components/icons";
import { gallery } from "@/lib/content";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Gallery",
  description: "A look at celebrations styled by Dazzle Designs across Greater Houston.",
};

export default function PortfolioPage() {
  return (
    <>
      <PageHeader
        eyebrow="Our work"
        title="Celebrations we've styled"
        intro="A look at recent events. We're adding more all the time — follow along on Instagram for the latest."
      />

      <section className="container-content mt-10">
        <div className="grid auto-rows-[220px] grid-flow-dense grid-cols-2 gap-3 sm:auto-rows-[300px] sm:gap-4 lg:grid-cols-3">
          {gallery.map((item, i) => (
            <Reveal key={item.id} delay={(i % 6) * 0.05} className={item.span === "tall" ? "row-span-2" : item.span === "wide" ? "col-span-2" : ""}>
              <figure className="tile-hover group relative h-full overflow-hidden rounded-xl">
                <Photo src={item.img} alt={item.title} sizes="(max-width:1024px) 50vw, 33vw" className="h-full" rounded="rounded-xl" />
                <figcaption className="absolute inset-x-0 bottom-0 p-4">
                  <p className="font-display text-lg text-white text-shadow-soft">{item.title}</p>
                  <p className="text-xs text-white/85 opacity-0 transition-opacity duration-300 group-hover:opacity-100">{item.event}</p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>

        {/* More-coming note (honest — the full archive lives on Instagram) */}
        <Reveal>
          <a
            href={site.socials.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 flex items-center justify-center gap-2 rounded-xl border border-dashed border-border bg-surface px-6 py-8 text-center text-sm text-muted transition-colors hover:border-primary/40 hover:text-ink"
          >
            <SparkIcon className="h-4 w-4 text-accent" />
            See more of our work on Instagram @dazz_ledesigns
          </a>
        </Reveal>
      </section>
    </>
  );
}
