"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowIcon, SparkIcon } from "./icons";
import { site } from "@/lib/site";
import { img } from "@/lib/content";

const headline = ["Elevate", "your party", "with elegance"];

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  // Image drifts slower than scroll (parallax); content lifts & fades.
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "18%"]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 1.12]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 60]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, reduce ? 1 : 0]);

  return (
    <section
      ref={ref}
      className="edge relative flex min-h-[100svh] items-end overflow-hidden sm:min-h-[92vh]"
    >
      {/* Parallax photograph */}
      <motion.div style={{ y: imgY, scale: imgScale }} className="absolute inset-0 -z-10">
        <Image
          src={img.hero}
          alt="A bride holding a warm autumn bouquet in golden evening light"
          fill
          priority
          sizes="100vw"
          className="img-warm object-cover object-center"
        />
        {/* legibility wash — deeper at the bottom where text sits */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(42,36,34,0.35) 0%, rgba(42,36,34,0.05) 35%, rgba(42,36,34,0.35) 62%, rgba(42,36,34,0.82) 100%)",
          }}
        />
      </motion.div>

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="container-content w-full pb-24 pt-32 sm:pb-28"
      >
        <div className="max-w-3xl">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-surface/25 bg-surface/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-surface backdrop-blur-sm"
          >
            <SparkIcon className="h-3.5 w-3.5 text-accent" />
            Handmade party decor
          </motion.p>

          <h1 className="font-display text-[3.4rem] font-medium leading-[0.98] text-surface text-shadow-soft sm:text-7xl lg:text-[6rem]">
            {headline.map((line, i) => (
              <span key={i} className="block overflow-hidden pb-1">
                <motion.span
                  className="block"
                  initial={{ y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{
                    duration: 0.75,
                    delay: 0.15 + i * 0.12,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  {i === 2 ? (
                    <>
                      with{" "}
                      <span className="italic text-accent">elegance</span>
                    </>
                  ) : (
                    line
                  )}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 max-w-md text-lg text-surface/85"
          >
            Candles, bouquets and stage decor — designed and made by hand by a
            team of three, for celebrations worth remembering.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.62, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <Link href="/quote" className="btn-primary">
              Request a Quote
            </Link>
            <Link
              href="/portfolio"
              className="btn-ghost border-surface/30 text-surface hover:border-surface/50 hover:bg-surface/10"
            >
              View our work
              <ArrowIcon className="h-4 w-4" />
            </Link>
          </motion.div>

          <p className="mt-6 text-sm text-surface/65">{site.serviceArea}</p>
        </div>
      </motion.div>

      {/* Scroll cue */}
      <div className="pointer-events-none absolute inset-x-0 bottom-6 hidden justify-center sm:flex">
        <div className="flex animate-floaty flex-col items-center gap-1 text-surface/70">
          <span className="text-[10px] uppercase tracking-[0.2em]">Scroll</span>
          <span className="h-8 w-px bg-surface/40" />
        </div>
      </div>
    </section>
  );
}
