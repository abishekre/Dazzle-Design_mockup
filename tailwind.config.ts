import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Warm Artisan palette — mapped to CSS vars (r g b triplets) in
        // globals.css so tokens stay semantic, swappable, and support opacity
        // modifiers. Never hardcode hex in components.
        bg: "rgb(var(--bg) / <alpha-value>)",
        surface: "rgb(var(--surface) / <alpha-value>)",
        "surface-2": "rgb(var(--surface-2) / <alpha-value>)",
        ink: "rgb(var(--ink) / <alpha-value>)",
        muted: "rgb(var(--muted) / <alpha-value>)",
        primary: "rgb(var(--primary) / <alpha-value>)",
        "primary-strong": "rgb(var(--primary-strong) / <alpha-value>)",
        secondary: "rgb(var(--secondary) / <alpha-value>)",
        accent: "rgb(var(--accent) / <alpha-value>)",
        border: "rgb(var(--border) / <alpha-value>)",
        "lead-green": "rgb(var(--lead-green) / <alpha-value>)",
        "lead-amber": "rgb(var(--lead-amber) / <alpha-value>)",
        "lead-red": "rgb(var(--lead-red) / <alpha-value>)",
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        DEFAULT: "12px",
        lg: "14px",
        xl: "20px",
      },
      boxShadow: {
        // Warm-tinted shadows (brown, low opacity) — not harsh black.
        soft: "0 2px 8px rgba(42, 36, 34, 0.06), 0 12px 28px rgba(42, 36, 34, 0.07)",
        lift: "0 8px 20px rgba(42, 36, 34, 0.10), 0 24px 48px rgba(42, 36, 34, 0.10)",
      },
      maxWidth: {
        prose: "68ch",
        content: "1200px",
      },
      transitionTimingFunction: {
        "out-soft": "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      keyframes: {
        shimmer: {
          "0%": { transform: "translateX(-120%) skewX(-12deg)" },
          "100%": { transform: "translateX(220%) skewX(-12deg)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        floaty: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
      },
      animation: {
        shimmer: "shimmer 2.4s ease-in-out 1.2s 1",
        marquee: "marquee 26s linear infinite",
        floaty: "floaty 3s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
