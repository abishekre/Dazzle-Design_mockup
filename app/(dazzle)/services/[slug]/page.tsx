import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Photo } from "@/components/Photo";
import { Reveal } from "@/components/Reveal";
import { ArrowIcon, SparkIcon } from "@/components/icons";
import { occasions, getOccasion, relatedOccasions, communionShots } from "@/lib/content";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return occasions.map((o) => ({ slug: o.id }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const o = getOccasion(params.slug);
  if (!o) return { title: "Not found" };
  return {
    title: o.name,
    description: o.blurb,
    openGraph: { title: `${o.name} decor · ${site.name}`, description: o.blurb },
  };
}

export default function OccasionPage({ params }: { params: { slug: string } }) {
  const o = getOccasion(params.slug);
  if (!o) notFound();

  const related = relatedOccasions(o.id);
  // Show the real gallery only where we actually have photos for this occasion.
  const showcase = o.id === "holy-communion" ? communionShots : [];

  return (
    <>
      <div className="container-content pt-28 sm:pt-32">
        <nav className="text-sm text-muted" aria-label="Breadcrumb">
          <Link href="/services" className="link-underline hover:text-ink">What we do</Link>
          <span className="px-2" aria-hidden>/</span>
          <span className="text-ink">{o.name}</span>
        </nav>
      </div>

      <section className="container-content mt-6 grid gap-8 lg:grid-cols-2 lg:gap-14">
        <Reveal className="lg:sticky lg:top-24 lg:self-start">
          <div className="aspect-[4/5] overflow-hidden rounded-2xl">
            <Photo src={o.img} tone={o.tone} priority alt={o.img ? o.name : ""} sizes="(max-width:1024px) 100vw, 50vw" className="h-full" rounded="rounded-2xl">
              {!o.img && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-center">
                  <SparkIcon className="h-6 w-6 text-primary-strong" />
                  <p className="font-display text-2xl text-ink">{o.name}</p>
                  <p className="text-xs uppercase tracking-wide text-muted">Photos coming soon</p>
                </div>
              )}
            </Photo>
          </div>
        </Reveal>

        <Reveal delay={0.05}>
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted">Occasion</p>
          <h1 className="mt-3 font-display text-4xl sm:text-5xl">{o.name}</h1>
          <p className="mt-4 text-lg text-muted">{o.blurb}</p>

          <h2 className="mt-8 border-t border-border pt-5 font-display text-xl">What we can style</h2>
          <ul className="mt-4 space-y-2.5">
            {o.included.map((n) => (
              <li key={n} className="flex items-start gap-2.5 text-sm text-ink/85">
                <SparkIcon className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                {n}
              </li>
            ))}
          </ul>

          <p className="mt-6 rounded-lg bg-surface-2 px-4 py-3 text-sm text-ink/80">
            Every setup is designed for your date and venue. Share your event date when you enquire so
            we can confirm we&apos;ll have it ready in time.
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <Link href={`/quote?item=${encodeURIComponent(o.name + " decor")}`} className="btn-primary">
              Request a quote
            </Link>
            <Link href="/portfolio" className="btn-ghost">
              See our work
              <ArrowIcon className="h-4 w-4" />
            </Link>
          </div>
        </Reveal>
      </section>

      {showcase.length > 0 && (
        <section className="container-content mt-24 sm:mt-32">
          <h2 className="border-t border-ink/15 pt-5 font-display text-2xl sm:text-3xl">From a recent {o.name}</h2>
          {/* Uniform tiles (no mixed spans) — a small, curated set stays gap-free by design */}
          <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
            {showcase.map((s, i) => (
              <Reveal key={s.id} delay={i * 0.05}>
                <figure className="tile-hover relative aspect-[4/5] overflow-hidden rounded-xl">
                  <Photo src={s.img} alt={s.title} sizes="(max-width:1024px) 50vw, 25vw" className="h-full" rounded="rounded-xl" />
                </figure>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      <section className="container-content mt-24 sm:mt-32">
        <h2 className="border-t border-ink/15 pt-5 font-display text-2xl sm:text-3xl">Other occasions</h2>
        <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-6 lg:grid-cols-3">
          {related.map((r, i) => (
            <Reveal key={r.id} delay={i * 0.06}>
              <Link href={`/services/${r.id}`} className="group block transition-transform duration-200 ease-out-soft active:scale-[0.99]">
                <div className="tile-hover aspect-[4/5] overflow-hidden rounded-xl">
                  <Photo src={r.img} tone={r.tone} alt={r.img ? r.name : ""} sizes="(max-width:1024px) 50vw, 33vw" className="h-full" rounded="rounded-xl" />
                </div>
                <h3 className="mt-3 font-display text-lg">
                  <span className="link-underline">{r.name}</span>
                </h3>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
