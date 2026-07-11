"use client";

import { useEffect, useRef, useState } from "react";
import { SparkIcon } from "./icons";

type Level = "warm" | "strong";

const tips = [
  { t: "Face a window", d: "Soft daylight is the secret. Shoot near a window and turn off the flash — it flattens everything." },
  { t: "Keep the background plain", d: "A wall, a linen cloth, or a wooden table. Clear the clutter so the piece is the star." },
  { t: "Fill the frame", d: "Step in close and centre the item. We crop to a few shapes, so leave a little room around it." },
  { t: "Hold straight & steady", d: "Tap the item to focus, keep the phone level, and take a few — pick the sharpest." },
];

export function PhotoStudio() {
  const [url, setUrl] = useState<string | null>(null);
  const [level, setLevel] = useState<Level>("warm");
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    return () => {
      if (url) URL.revokeObjectURL(url);
    };
  }, [url]);

  function loadFile(file?: File) {
    if (!file || !file.type.startsWith("image/")) return;
    if (url) URL.revokeObjectURL(url);
    setUrl(URL.createObjectURL(file));
  }

  return (
    <div className="container-content mt-10">
      <div className="grid gap-8 lg:grid-cols-[1fr_1.15fr]">
        {/* Uploader + controls */}
        <div>
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setDragging(true);
            }}
            onDragLeave={() => setDragging(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDragging(false);
              loadFile(e.dataTransfer.files?.[0]);
            }}
            onClick={() => inputRef.current?.click()}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && inputRef.current?.click()}
            className={`flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed px-6 py-12 text-center transition-colors ${
              dragging ? "border-primary bg-primary/5" : "border-border bg-surface hover:border-primary/40"
            }`}
          >
            <SparkIcon className="h-7 w-7 text-accent" />
            <p className="mt-3 font-display text-xl">Drop a photo here</p>
            <p className="mt-1 text-sm text-muted">or tap to choose from your phone</p>
            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              className="sr-only"
              onChange={(e) => loadFile(e.target.files?.[0] ?? undefined)}
            />
          </div>

          {url && (
            <div className="mt-5">
              <p className="text-sm font-semibold text-ink">Warmth</p>
              <div className="mt-2 flex gap-2">
                {(["warm", "strong"] as Level[]).map((l) => (
                  <button
                    key={l}
                    type="button"
                    className="chip"
                    data-active={level === l}
                    aria-pressed={level === l}
                    onClick={() => setLevel(l)}
                  >
                    {l === "warm" ? "Gentle" : "Extra warm"}
                  </button>
                ))}
              </div>
              <p className="mt-3 text-xs text-muted">
                Use <strong>Extra warm</strong> if your photo looks cold, blue, or was taken under
                white indoor lights. Your photo stays on your device — nothing is uploaded here.
              </p>
            </div>
          )}

          <ul className="mt-8 space-y-4">
            {tips.map((tip, i) => (
              <li key={tip.t} className="flex gap-3">
                <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-surface-2 font-display text-sm text-primary-strong">
                  {i + 1}
                </span>
                <div>
                  <p className="font-semibold text-ink">{tip.t}</p>
                  <p className="text-sm text-muted">{tip.d}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Live preview in real card crops */}
        <div>
          <p className="eyebrow">How it&apos;ll look on the site</p>
          {url ? (
            <div className="mt-4 grid gap-5 sm:grid-cols-2">
              <Preview url={url} level={level} ratio="aspect-[3/4]" label="Portfolio card" />
              <Preview url={url} level={level} ratio="aspect-[4/3]" label="Shop card" />
              <div className="sm:col-span-2">
                <p className="mb-2 text-xs uppercase tracking-wide text-muted">Your original</p>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={url} alt="Your uploaded original" className="max-h-56 w-full rounded-lg border border-border object-contain" />
              </div>
            </div>
          ) : (
            <div className="mt-4 grid gap-5 sm:grid-cols-2">
              <div className="grid aspect-[3/4] place-items-center rounded-xl border border-dashed border-border bg-surface text-sm text-muted">
                Portfolio preview
              </div>
              <div className="grid aspect-[4/3] place-items-center rounded-xl border border-dashed border-border bg-surface text-sm text-muted">
                Shop preview
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Preview({ url, level, ratio, label }: { url: string; level: Level; ratio: string; label: string }) {
  return (
    <figure>
      <div className={`grade relative overflow-hidden rounded-xl shadow-soft ${ratio}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={url} alt="" className="img-warm absolute inset-0 h-full w-full object-cover" />
        <span className={`wash-warm ${level === "strong" ? "is-strong" : ""}`} aria-hidden />
      </div>
      <figcaption className="mt-2 text-center text-xs text-muted">{label}</figcaption>
    </figure>
  );
}
