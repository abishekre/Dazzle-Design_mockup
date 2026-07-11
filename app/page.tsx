import Link from "next/link";
import Image from "next/image";
import { Reveal } from "@/components/Reveal";
import { Photo } from "@/components/Photo";
import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { SectionHead } from "@/components/SectionHead";
import { ArrowIcon, SparkIcon } from "@/components/icons";
import { portfolio, products, img } from "@/lib/content";

const catTiles = [
  { label: "Candles", src: img.candle, href: "/catalog?c=candles", copy: "Hand-poured, your scent" },
  { label: "Bouquets", src: img.bouquetLush, href: "/catalog?c=bouquets", copy: "Loose, seasonal, wild" },
  { label: "Stage Decor", src: img.chairs, href: "/catalog?c=stage-decor", copy: "Arches, aisles & tables" },
];

function MoreLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="group inline-flex items-center gap-2 text-sm font-semibold text-ink">
      <span className="link-underline">{children}</span>
      <ArrowIcon className="h-4 w-4 text-primary-strong transition-transform duration-200 group-hover:translate-x-1" />
    </Link>
  );
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <Marquee words={["Candles", "Bouquets", "Stage Decor", "Handmade", "Weekend Studio"]} />

      {/* ====================== 01 · PORTFOLIO ====================== */}
      <section className="container-content mt-20 sm:mt-32">
        <SectionHead index="01" eyebrow="Recent celebrations" title="A few events we've styled" action={<MoreLink href="/portfolio">See full portfolio</MoreLink>} />

        {/* Mobile: horizontal snap carousel with a peek of the next card */}
        <div className="hscroll -mx-5 mt-8 px-5 md:hidden">
          {portfolio.map((item) => (
            <Link key={item.id} href="/portfolio" className="hsnap w-[76vw] max-w-[300px]">
              <figure className="relative aspect-[3/4]">
                <Photo src={item.img} alt={item.title} sizes="76vw" className="h-full" rounded="rounded-xl" />
                <figcaption className="absolute inset-x-0 bottom-0 p-4">
                  <p className="font-display text-xl text-surface text-shadow-soft">{item.title}</p>
                  <p className="text-xs text-surface/85">{item.event}</p>
                </figcaption>
              </figure>
            </Link>
          ))}
        </div>

        {/* Desktop: editorial asymmetric grid, borderless */}
        <div className="mt-10 hidden auto-rows-[280px] grid-cols-4 gap-3 md:grid">
          {portfolio.map((item, i) => (
            <Reveal
              key={item.id}
              delay={i * 0.05}
              className={item.span === "tall" ? "row-span-2" : item.span === "wide" ? "col-span-2" : ""}
            >
              <Link href="/portfolio" className="block h-full">
                <figure className="group relative h-full">
                  <Photo src={item.img} alt={item.title} sizes="25vw" className="h-full" />
                  <figcaption className="absolute inset-x-0 bottom-0 p-4">
                    <p className="font-display text-lg text-surface text-shadow-soft">{item.title}</p>
                    <p className="text-xs text-surface/85 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      {item.event}
                    </p>
                  </figcaption>
                </figure>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ====================== 02 · CATEGORIES ====================== */}
      <section className="container-content mt-20 sm:mt-32">
        <SectionHead index="02" eyebrow="What we make" title="Three ways to dazzle" />
        <div className="mt-10 grid gap-3 sm:grid-cols-3 sm:gap-4">
          {catTiles.map((c, i) => (
            <Reveal key={c.label} delay={i * 0.08}>
              <Link href={c.href} className="group block">
                <figure className={`relative overflow-hidden rounded-xl ${i === 1 ? "sm:mt-10" : ""}`}>
                  <div className="aspect-[4/5]">
                    <Photo src={c.src} alt={c.label} sizes="(max-width:640px) 90vw, 30vw" className="h-full" rounded="rounded-xl" />
                  </div>
                  <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5">
                    <div>
                      <p className="font-display text-2xl text-surface text-shadow-soft">{c.label}</p>
                      <p className="text-sm text-surface/85">{c.copy}</p>
                    </div>
                    <ArrowIcon className="h-5 w-5 -translate-x-1 text-surface opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
                  </figcaption>
                </figure>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ====================== 03 · STORY ====================== */}
      <section className="container-content mt-20 sm:mt-32">
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-14">
          <Reveal className="relative order-2 aspect-[4/3] lg:order-1 lg:aspect-[5/6]">
            <Photo src={img.flowerShop} alt="Our weekend bloom studio" sizes="(max-width:1024px) 100vw, 50vw" className="absolute inset-0" rounded="rounded-2xl" />
          </Reveal>
          <Reveal className="order-1 lg:order-2">
            <span className="font-display text-sm text-muted">03</span>
            <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-muted">Our story</p>
            <h2 className="mt-3 font-display text-[2rem] leading-[1.05] sm:text-4xl lg:text-[3.25rem]">
              Three makers,
              <br />
              one weekend studio
            </h2>
            <p className="mt-6 max-w-md text-lg text-muted">
              We&apos;re three friends who turn candles, flowers and fabric into decor for
              celebrations across the city. Everything is made by hand — so we take a limited
              number of events each weekend, and every piece gets the care it deserves.
            </p>
            <div className="mt-7">
              <MoreLink href="/about">Meet the team</MoreLink>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ====================== 04 · SHOP ====================== */}
      <section className="container-content mt-20 sm:mt-32">
        <SectionHead index="04" eyebrow="From the shop" title="Little touches" action={<MoreLink href="/catalog">Shop all</MoreLink>} />

        <div className="hscroll -mx-5 mt-8 px-5 md:hidden">
          {products.slice(0, 4).map((p) => (
            <ProductTile key={p.id} p={p} className="hsnap w-[64vw] max-w-[240px]" />
          ))}
        </div>
        <div className="mt-10 hidden gap-x-6 gap-y-10 md:grid md:grid-cols-3">
          {products.slice(0, 3).map((p, i) => (
            <Reveal key={p.id} delay={i * 0.06}>
              <ProductTile p={p} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* ====================== QUOTE CTA ====================== */}
      <section className="container-content mt-20 sm:mt-32">
        <Reveal>
          <div className="relative overflow-hidden rounded-2xl px-6 py-20 text-center sm:px-12 sm:py-28">
            <Image src={img.candle} alt="" fill sizes="100vw" className="img-warm object-cover" />
            <div className="absolute inset-0 bg-ink/72" />
            <div className="relative">
              <SparkIcon className="mx-auto h-6 w-6 text-accent" />
              <h2 className="mx-auto mt-5 max-w-2xl font-display text-[2.2rem] leading-[1.03] text-surface sm:text-6xl">
                Planning something special?
              </h2>
              <p className="mx-auto mt-5 max-w-md text-surface/80">
                Tell us your date and vision. We&apos;ll design decor that feels entirely yours —
                and let you know exactly what we can make.
              </p>
              <div className="mt-9 flex flex-wrap justify-center gap-3">
                <Link href="/quote" className="btn-primary">Request a Quote</Link>
                <Link href="/catalog" className="btn-ghost border-surface/30 text-surface hover:border-surface/50 hover:bg-surface/10">
                  Browse the shop
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}

/** Borderless, editorial product tile — image then type, no card box. */
function ProductTile({ p, className = "" }: { p: (typeof products)[number]; className?: string }) {
  return (
    <Link
      href={p.custom ? `/quote?item=${encodeURIComponent(p.name)}` : "/catalog"}
      className={`group block transition-transform duration-200 ease-out-soft active:scale-[0.99] ${className}`}
    >
      <div className="aspect-[4/5] overflow-hidden rounded-xl">
        <Photo src={p.img} alt={p.name} sizes="(max-width:768px) 64vw, 33vw" className="h-full" rounded="rounded-xl" />
      </div>
      <div className="mt-4 flex items-baseline justify-between gap-3">
        <h3 className="font-display text-xl">
          <span className="link-underline">{p.name}</span>
        </h3>
        <span className="shrink-0 text-sm font-medium text-muted">{p.priceLabel}</span>
      </div>
      <p className="mt-1.5 text-sm text-muted">{p.blurb}</p>
    </Link>
  );
}
