import Image from "next/image";
import { toneGradient, type Tone } from "@/lib/content";

/**
 * Photo — renders a real image (next/image, object-cover) with a cohesive warm
 * film-grade + fine grain overlay so mixed sources read as one art-directed set.
 * Falls back to a warm gradient when no `src` is given (e.g. team monograms).
 *
 * Images currently ship from /public/images (curated stock placeholders) and are
 * swappable for Supabase Storage URLs later.
 */
export function Photo({
  src,
  alt = "",
  tone = "terracotta",
  priority,
  sizes = "(max-width: 768px) 90vw, 33vw",
  grade = true,
  wash,
  className = "",
  rounded = "rounded-lg",
  children,
}: {
  src?: string;
  alt?: string;
  tone?: Tone;
  priority?: boolean;
  sizes?: string;
  grade?: boolean;
  /** Extra warm correction for photos that clash with the palette. */
  wash?: boolean | "strong";
  className?: string;
  rounded?: string;
  children?: React.ReactNode;
}) {
  return (
    <div
      className={`group/photo relative overflow-hidden ${rounded} ${grade ? "grade" : ""} ${className}`}
    >
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className="img-warm object-cover transition-transform duration-700 ease-out-soft group-hover/photo:scale-[1.05]"
        />
      ) : (
        <div
          className="absolute inset-0 transition-transform duration-700 ease-out-soft group-hover/photo:scale-[1.05]"
          style={{ backgroundImage: toneGradient[tone] }}
          aria-hidden
        />
      )}
      {wash && src && (
        <span className={`wash-warm ${wash === "strong" ? "is-strong" : ""}`} aria-hidden />
      )}
      {children}
    </div>
  );
}
