import Link from "next/link";
import Image from "next/image";
import { Reveal } from "@/components/Reveal";
import { Photo } from "@/components/Photo";
import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { ArrowIcon, SparkIcon } from "@/components/icons";
import { portfolio, products, img } from "@/lib/content";

const catTiles = [
  { label: "Candles", src: img.candle, href: "/catalog?c=candles", copy: "Hand-poured, your scent" },
  { label: "Bouquets", src: img.bouquetLush, href: "/catalog?c=bouquets", copy: "Loose, seasonal, wild" },
  { label: "Stage Decor", src: img.chairs, href: "/catalog?c=stage-decor", copy: "Arches, aisles & tables" },
];

export default function HomePage() {
  return (
    <>
      <Hero />

      <Marquee words={["Candles", "Bouquets", "Stage Decor", "Handmade", "Weekend Studio"]} />

      {/* ====================== PORTFOLIO ====================== */}
      <section className="container-content mt-20 sm:mt-28">
        <div className="flex items-end justify-between gap-6">
          <Reveal>
            <div>
              <p className="eyebrow">Recent celebrations</p>
              <h2 className="mt-3 font-display text-3xl sm:text-4xl lg:text-5xl">
                A few events we&apos;ve styled
              </h2>
            </div>
          </Reveal>
          <Reveal className="hidden sm:block">
            <Link href="/portfolio" className="group inline-flex items-center gap-2 text-sm font-semibold text-primary-strong">
              See full portfolio
              <ArrowIcon className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>

        {/* Mobile: horizontal snap carousel with a peek of the next card */}
        <div className="hscroll -mx-5 mt-7 px-5 md:hidden">
          {portfolio.map((item) => (
            <Link key={item.id} href="/portfolio" className="hsnap w-[76vw] max-w-[300px]">
              <figure className="relative aspect-[3/4]">
                <Photo src={item.img} alt={item.title} sizes="76vw" className="h-full shadow-soft" rounded="rounded-xl" />
                <figcaption className="absolute inset-x-0 bottom-0 p-4">
                  <p className="font-display text-xl text-surface text-shadow-soft">{item.title}</p>
                  <p className="text-xs text-surface/85">{item.event}</p>
                </figcaption>
              </figure>
            </Link>
          ))}
        </div>

        {/* Desktop: editorial asymmetric grid */}
        <div className="mt-8 hidden auto-rows-[260px] grid-cols-4 gap-4 md:grid">
          {portfolio.map((item, i) => (
            <Reveal
              key={item.id}
              delay={i * 0.05}
              className={item.span === "tall" ? "row-span-2" : item.span === "wide" ? "col-span-2" : ""}
            >
              <Link href="/portfolio" className="block h-full">
                <figure className="group relative h-full">
                  <Photo src={item.img} alt={item.title} sizes="25vw" className="h-full shadow-soft" />
                  <figcaption className="absolute inset-x-0 bottom-0 p-4">
                    <p className="translate-y-1 font-display text-lg text-surface text-shadow-soft transition-transform duration-300 group-hover:translate-y-0">
                      {item.title}
                    </p>
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

      {/* ====================== CATEGORY TILES ====================== */}
      <section className="container-content mt-20 sm:mt-28">
        <Reveal>
          <p className="eyebrow">What we make</p>
          <h2 className="mt-3 font-display text-3xl sm:text-4xl lg:text-5xl">Three ways to dazzle</h2>
        </Reveal>
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {catTiles.map((c, i) => (
            <Reveal key={c.label} delay={i * 0.08}>
              <Link href={c.href} className="group block">
                <figure className={`relative overflow-hidden rounded-xl shadow-soft ${i === 1 ? "sm:mt-8" : ""}`}>
                  <div className="aspect-[4/5]">
                    <Photo src={c.src} alt={c.label} sizes="(max-width:640px) 90vw, 30vw" className="h-full" rounded="rounded-xl" />
                  </div>
                  <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5">
                    <div>
                      <p className="font-display text-2xl text-surface text-shadow-soft">{c.label}</p>
                      <p className="text-sm text-surface/85">{c.copy}</p>
                    </div>
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-surface/95 text-ink transition-transform duration-300 group-hover:-rotate-12">
                      <ArrowIcon className="h-4 w-4" />
                    </span>
                  </figcaption>
                </figure>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ====================== STORY BAND ====================== */}
      <section className="container-content mt-20 sm:mt-28">
        <div className="grid items-center gap-8 overflow-hidden rounded-2xl border border-border bg-surface lg:grid-cols-2">
          <Reveal className="relative order-2 min-h-[280px] lg:order-1 lg:min-h-[440px]">
            <Photo src={img.flowerShop} alt="Our weekend bloom studio" sizes="(max-width:1024px) 100vw, 50vw" className="absolute inset-0" rounded="rounded-none" />
          </Reveal>
          <Reveal className="order-1 p-7 sm:p-10 lg:order-2">
            <p className="eyebrow">Our story</p>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl">Three makers, one weekend studio</h2>
            <p className="mt-5 text-muted">
              We&apos;re three friends who turn candles, flowers and fabric into
              decor for celebrations across the city. Because everything is made by
              hand, we take a limited number of events each weekend — so every piece
              gets the care it deserves.
            </p>
            <Link href="/about" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary-strong">
              Meet the team
              <ArrowIcon className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ====================== SHOP TEASER ====================== */}
      <section className="container-content mt-20 sm:mt-28">
        <div className="flex items-end justify-between gap-6">
          <Reveal>
            <div>
              <p className="eyebrow">From the shop</p>
              <h2 className="mt-3 font-display text-3xl sm:text-4xl lg:text-5xl">Little touches</h2>
            </div>
          </Reveal>
          <Reveal className="hidden sm:block">
            <Link href="/catalog" className="group inline-flex items-center gap-2 text-sm font-semibold text-primary-strong">
              Shop all
              <ArrowIcon className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>

        {/* Mobile carousel / desktop grid */}
        <div className="hscroll -mx-5 mt-7 px-5 md:hidden">
          {products.slice(0, 4).map((p) => (
            <ProductCard key={p.id} p={p} className="hsnap w-[68vw] max-w-[260px]" />
          ))}
        </div>
        <div className="mt-8 hidden gap-5 md:grid md:grid-cols-3">
          {products.slice(0, 3).map((p, i) => (
            <Reveal key={p.id} delay={i * 0.06}>
              <ProductCard p={p} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* ====================== QUOTE CTA ====================== */}
      <section className="container-content mt-20 sm:mt-28">
        <Reveal>
          <div className="relative overflow-hidden rounded-2xl px-6 py-16 text-center shadow-lift sm:px-12 sm:py-24">
            <Image src={img.candle} alt="" fill sizes="100vw" className="object-cover" />
            <div className="absolute inset-0 bg-ink/70" />
            <div
              className="absolute inset-0"
              style={{ backgroundImage: "radial-gradient(90% 120% at 100% 100%, rgba(197,107,74,0.4), transparent 55%)" }}
            />
            <div className="relative">
              <SparkIcon className="mx-auto h-6 w-6 text-accent" />
              <h2 className="mx-auto mt-4 max-w-xl font-display text-3xl text-surface sm:text-5xl">
                Planning something special?
              </h2>
              <p className="mx-auto mt-4 max-w-md text-surface/80">
                Tell us your date and vision. We&apos;ll design decor that feels
                entirely yours — and let you know exactly what we can make.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Link href="/quote" className="btn-primary">
                  Request a Quote
                </Link>
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

function ProductCard({
  p,
  className = "",
}: {
  p: (typeof products)[number];
  className?: string;
}) {
  return (
    <Link
      href={p.custom ? `/quote?item=${encodeURIComponent(p.name)}` : "/catalog"}
      className={`group block overflow-hidden rounded-xl border border-border bg-surface shadow-soft transition-all duration-200 ease-out-soft hover:-translate-y-1 hover:shadow-lift ${className}`}
    >
      <div className="aspect-[4/3]">
        <Photo src={p.img} alt={p.name} sizes="(max-width:768px) 68vw, 33vw" className="h-full" rounded="rounded-none" />
      </div>
      <div className="p-4 sm:p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-lg sm:text-xl">{p.name}</h3>
          <span className="shrink-0 rounded-full bg-surface-2 px-3 py-1 text-xs font-semibold text-primary-strong">
            {p.priceLabel}
          </span>
        </div>
        <p className="mt-2 text-sm text-muted">{p.blurb}</p>
      </div>
    </Link>
  );
}
