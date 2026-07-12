"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Photo } from "./Photo";
import { ArrowIcon, SparkIcon } from "./icons";
import { site } from "@/lib/site";
import { heroShots } from "@/lib/content";

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const reduce = useReducedMotion();
  const rise = (delay: number) => ({
    initial: { opacity: 0, y: reduce ? 0 : 18 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease },
  });

  return (
    <section className="relative overflow-hidden">
      {/* soft gold wash so the ivory space feels considered, not empty */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(60% 55% at 85% 10%, rgba(216,180,92,0.16), transparent 60%), radial-gradient(50% 50% at 0% 100%, rgba(169,176,160,0.14), transparent 60%)",
        }}
      />

      <div className="container-content grid items-center gap-10 pb-16 pt-32 sm:pt-36 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14 lg:pb-24 lg:pt-40">
        {/* ---------- Copy ---------- */}
        <div className="max-w-xl">
          <motion.p {...rise(0)} className="eyebrow">
            <SparkIcon className="h-3.5 w-3.5 text-accent" />
            Event decor · Greater Houston
          </motion.p>

          <motion.h1
            {...rise(0.08)}
            className="mt-6 font-display text-[3.1rem] font-medium leading-[0.98] tracking-[-0.02em] sm:text-6xl lg:text-[4.6rem]"
          >
            Elevate your
            <br />
            celebration with{" "}
            <span className="italic text-primary-strong">elegance</span>
          </motion.h1>

          <motion.p {...rise(0.16)} className="mt-6 max-w-md text-lg text-muted">
            Handmade decor by a team of five — communions, showers, birthdays,
            weddings and more, styled with care across Greater Houston.
          </motion.p>

          <motion.div {...rise(0.24)} className="mt-8 flex flex-wrap items-center gap-3">
            <Link href="/quote" className="btn-primary">
              Request a Quote
            </Link>
            <Link href="/portfolio" className="btn-ghost">
              View our work
              <ArrowIcon className="h-4 w-4" />
            </Link>
          </motion.div>

          <motion.div {...rise(0.32)} className="mt-8 flex items-center gap-5 text-sm text-muted">
            <span className="font-display text-2xl text-ink">100+</span>
            <span className="max-w-[16rem] leading-snug">
              celebrations styled across Stafford, Sugar Land &amp; nearby, TX
            </span>
          </motion.div>
        </div>

        {/* ---------- Framed photo cluster ---------- */}
        <motion.div
          initial={{ opacity: 0, y: reduce ? 0 : 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease }}
          className="relative mx-auto w-full max-w-md lg:mx-0 lg:max-w-none"
        >
          {/* aspect-ratio is required here: the Photo children use `fill`
              (position:absolute), which contributes no intrinsic size, so the
              implicit `1fr` row tracks would otherwise collapse to 0 height. */}
          <div className="grid aspect-[6/7] grid-cols-5 grid-rows-6 gap-3 sm:gap-4">
            {/* primary tall frame */}
            <figure className="col-span-3 row-span-6 overflow-hidden rounded-2xl shadow-lift ring-1 ring-black/[0.04]">
              <Photo src={heroShots.primary} grade={false} alt="Secret-garden First Communion backdrop by Dazzle Designs" priority sizes="(max-width:1024px) 55vw, 28vw" className="h-full" rounded="rounded-2xl" />
            </figure>
            {/* upper-right frame */}
            <figure className="col-span-2 row-span-3 overflow-hidden rounded-xl shadow-soft ring-1 ring-black/[0.04]">
              <Photo src={heroShots.secondary} grade={false} alt="Gold cross baptism backdrop" sizes="(max-width:1024px) 38vw, 20vw" className="h-full" rounded="rounded-xl" />
            </figure>
            {/* lower-right frame */}
            <figure className="col-span-2 row-span-3 overflow-hidden rounded-xl shadow-soft ring-1 ring-black/[0.04]">
              <Photo src={heroShots.tertiary} grade={false} alt="Sage-green housewarming arch" sizes="(max-width:1024px) 38vw, 20vw" className="h-full" rounded="rounded-xl" />
            </figure>
          </div>

          {/* small floating credential chip */}
          <div className="absolute -bottom-3 -left-3 hidden items-center gap-2 rounded-full border border-border bg-surface px-4 py-2 text-xs font-semibold text-ink shadow-soft sm:flex">
            <SparkIcon className="h-3.5 w-3.5 text-accent" />
            Handmade in Houston
          </div>
        </motion.div>
      </div>
    </section>
  );
}
