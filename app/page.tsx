import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { Photo } from "@/components/Photo";
import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { SectionHead } from "@/components/SectionHead";
import { ArrowIcon } from "@/components/icons";
import { LogoMark } from "@/components/Logo";
import { occasions, gallery, img } from "@/lib/content";
import { site, whatsappLink } from "@/lib/site";

function MoreLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="group inline-flex items-center gap-2 text-sm font-semibold text-ink">
      <span className="link-underline">{children}</span>
      <ArrowIcon className="h-4 w-4 text-primary-strong transition-transform duration-200 group-hover:translate-x-1" />
    </Link>
  );
}

export default function HomePage() {
  const featured = occasions.slice(0, 6);
  return (
    <>
      <Hero />
      <Marquee words={["Communions", "Baptisms", "Birthdays", "Baby Showers", "Weddings & Haldi", "Onam", "Balloon Work"]} />

      {/* 01 · GALLERY (real work) */}
      <section className="container-content mt-20 sm:mt-32">
        <SectionHead index="01" eyebrow="Recent celebrations" title="Work we're proud of" action={<MoreLink href="/portfolio">See the gallery</MoreLink>} />
        {/* One large feature + four even tiles — a fixed 4x2 grid (8 cells: 4
            for the feature, 4 for the rest) so it's always full, never gappy. */}
        <div className="mt-10 grid auto-rows-[210px] grid-cols-2 gap-3 sm:auto-rows-[240px] md:grid-cols-4">
          {gallery.slice(0, 5).map((item, i) => (
            <Reveal
              key={item.id}
              delay={i * 0.05}
              className={i === 0 ? "col-span-2 row-span-2" : ""}
            >
              <Link href="/portfolio" className="block h-full">
                <figure className="tile-hover group relative h-full overflow-hidden rounded-xl">
                  <Photo src={item.img} alt={item.title} sizes={i === 0 ? "(max-width:768px) 100vw, 50vw" : "(max-width:768px) 50vw, 25vw"} className="h-full" rounded="rounded-xl" />
                  <figcaption className="absolute inset-x-0 bottom-0 p-4">
                    <p className={`font-display text-white text-shadow-soft ${i === 0 ? "text-2xl" : "text-base"}`}>{item.title}</p>
                    <p className="text-xs text-white/85 opacity-0 transition-opacity duration-300 group-hover:opacity-100">{item.event}</p>
                  </figcaption>
                </figure>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* 02 · OCCASIONS */}
      <section className="container-content mt-20 sm:mt-32">
        <SectionHead index="02" eyebrow="What we do" title="Decor for every occasion" action={<MoreLink href="/services">See everything</MoreLink>} />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
          {featured.map((o, i) => (
            <Reveal key={o.id} delay={(i % 3) * 0.06}>
              <Link href={`/services/${o.id}`} className="group block transition-transform duration-200 ease-out-soft active:scale-[0.99]">
                <figure className="tile-hover relative overflow-hidden rounded-xl">
                  <div className="aspect-[4/5]">
                    <Photo src={o.img} tone={o.tone} alt={o.img ? o.name : ""} sizes="(max-width:640px) 90vw, 33vw" className="h-full" rounded="rounded-xl" />
                  </div>
                  <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5">
                    <p className={`font-display text-2xl text-shadow-soft ${o.img ? "text-white" : "text-ink"}`}>
                      {o.name}
                    </p>
                    <ArrowIcon className={`h-5 w-5 -translate-x-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 ${o.img ? "text-white" : "text-ink"}`} />
                  </figcaption>
                </figure>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* 03 · STORY */}
      <section className="container-content mt-20 sm:mt-32">
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-14">
          <Reveal className="relative order-2 aspect-[4/3] lg:order-1 lg:aspect-[5/6]">
            <Photo src={img.communionTable} alt="A white and gold cake table styled by Dazzle Designs" sizes="(max-width:1024px) 100vw, 50vw" className="absolute inset-0" rounded="rounded-2xl" />
          </Reveal>
          <Reveal className="order-1 lg:order-2">
            <span className="font-display text-sm text-muted">03</span>
            <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-muted">Our story</p>
            <h2 className="mt-3 font-display text-[2rem] leading-[1.05] sm:text-4xl lg:text-[3.25rem]">Five friends, one shared craft</h2>
            <p className="mt-6 max-w-md text-lg text-muted">
              We&apos;re five women — mothers and nurses — who discovered a love for turning
              celebrations into something unforgettable. From our home base near Houston, we design
              and build decor by hand for the moments that matter to your family.
            </p>
            <div className="mt-7"><MoreLink href="/about">Meet the team</MoreLink></div>
          </Reveal>
        </div>
      </section>

      {/* 04 · HOW IT WORKS */}
      <section className="container-content mt-20 sm:mt-32">
        <SectionHead index="04" eyebrow="How it works" title="Simple to book" />
        <div className="mt-10 grid gap-8 sm:grid-cols-3">
          {[
            { n: "01", t: "Tell us about your event", d: "Share your occasion, date, venue and vision through a quick quote request." },
            { n: "02", t: "We design your quote", d: "We come back with ideas and clear pricing tailored to your celebration." },
            { n: "03", t: "We style & deliver", d: "Our team builds and installs everything, ready for your big day." },
          ].map((step, i) => (
            <Reveal key={step.n} delay={i * 0.08} as="article">
              <div className="flex h-full flex-col border-t-2 border-primary/40 pt-5">
                <span className="font-display text-2xl text-primary-strong">{step.n}</span>
                <h3 className="mt-2 text-lg font-semibold">{step.t}</h3>
                <p className="mt-2 text-sm text-muted">{step.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CONTACT / CTA */}
      <section className="container-content mt-20 sm:mt-32">
        <Reveal>
          <div className="relative overflow-hidden rounded-2xl bg-ink px-6 py-16 text-center sm:px-12 sm:py-24">
            <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(80% 120% at 10% 0%, rgba(216,180,92,0.28), transparent 55%), radial-gradient(90% 120% at 100% 100%, rgba(216,180,92,0.18), transparent 55%)" }} aria-hidden />
            <div className="relative">
              <LogoMark className="mx-auto h-10 w-10" />
              <h2 className="mx-auto mt-5 max-w-2xl font-display text-[2.2rem] leading-[1.03] text-white sm:text-6xl">Planning something special?</h2>
              <p className="mx-auto mt-5 max-w-md text-white/80">Tell us your date and vision and we&apos;ll design decor made just for you.</p>
              <div className="mt-9 flex flex-wrap justify-center gap-3">
                <Link href="/quote" className="btn-primary bg-white !text-ink hover:bg-white/90">Request a Quote</Link>
                <a href={whatsappLink(`Hi ${site.name}! I'd love to enquire about event decor.`)} target="_blank" rel="noopener noreferrer" className="btn-ghost border-white/30 text-white hover:border-white/50 hover:bg-white/10">
                  Message on WhatsApp
                </a>
              </div>
              <p className="mt-8 text-sm text-white/70">
                {site.phone} · {site.email}
                <br />
                {site.serviceArea}
              </p>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
