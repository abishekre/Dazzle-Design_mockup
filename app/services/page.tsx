import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { Photo } from "@/components/Photo";
import { Reveal } from "@/components/Reveal";
import { ArrowIcon } from "@/components/icons";
import { occasions } from "@/lib/content";

export const metadata: Metadata = {
  title: "What we do",
  description:
    "Event decor by occasion — communions, baptisms, birthdays, baby showers, weddings, haldi, Onam and balloon work, styled by hand.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="What we do"
        title="Decor for every celebration"
        intro="We design and build event decor for your occasion — from a graceful First Communion to a joyful baby shower. Browse below, then request a quote for your date."
      />

      <section className="container-content mt-10">
        <div className="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
          {occasions.map((o, i) => (
            <Reveal key={o.id} delay={(i % 3) * 0.06}>
              <Link
                href={`/services/${o.id}`}
                className="group block transition-transform duration-200 ease-out-soft active:scale-[0.99]"
              >
                <figure className="tile-hover relative overflow-hidden rounded-xl">
                  <div className="aspect-[4/5]">
                    <Photo src={o.img} tone={o.tone} alt={o.img ? o.name : ""} sizes="(max-width:640px) 90vw, 33vw" className="h-full" rounded="rounded-xl" />
                  </div>
                  {/* Elegant label plate */}
                  <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5">
                    <p className={`font-display text-2xl text-shadow-soft ${o.img ? "text-white" : "text-ink"}`}>
                      {o.name}
                    </p>
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-surface/95 text-ink transition-transform duration-300 group-hover:-rotate-12">
                      <ArrowIcon className="h-4 w-4" />
                    </span>
                  </figcaption>
                </figure>
                <p className="mt-3 text-sm text-muted">{o.blurb}</p>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
