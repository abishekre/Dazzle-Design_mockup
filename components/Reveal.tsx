"use client";

import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";

const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";

/**
 * Scroll-triggered entrance (staggered fade-up). Dependency-free — no framer —
 * so it stays cheap on every route.
 *
 * Bug-proofing (this is why it's not `whileInView`):
 *  - SSR/no-JS/reduced-motion → content renders visible. It can never get stuck.
 *  - Below-fold elements are hidden synchronously in useLayoutEffect (before the
 *    browser paints, so no flash), then revealed by an IntersectionObserver.
 *  - Above-fold elements stay visible (no hide → no flash on first paint).
 */
export function Reveal({
  children,
  delay = 0,
  className = "",
  as: Tag = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "li" | "section" | "article";
}) {
  const ref = useRef<HTMLElement>(null);
  const [hidden, setHidden] = useState(false);
  const [revealed, setRevealed] = useState(false);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Only arm the animation for content below the fold; above-the-fold stays
    // visible so the first paint is never blank or flashing.
    const belowFold = el.getBoundingClientRect().top > window.innerHeight * 0.85;
    if (belowFold) setHidden(true);
  }, []);

  useEffect(() => {
    if (!hidden) return;
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -12% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [hidden]);

  // Instant hide (no transition) → then transition in on reveal.
  const style =
    !hidden
      ? undefined
      : revealed
        ? {
            opacity: 1,
            transform: "none",
            transition: `opacity 0.6s ${EASE}, transform 0.6s ${EASE}`,
            transitionDelay: `${delay}s`,
          }
        : { opacity: 0, transform: "translateY(18px)" };

  return (
    <Tag ref={ref as never} className={className} style={style}>
      {children}
    </Tag>
  );
}
