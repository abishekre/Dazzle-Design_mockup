import { toneGradient, type Tone } from "@/lib/content";

/**
 * Hand-drawn candle illustrations — used in place of real product photography,
 * which doesn't exist yet. Deliberately illustrative (not a stock-photo
 * pastiche) so it reads as an intentional design choice, not a placeholder.
 * Sits on the same warm gradient tiles used elsewhere on the site.
 */
export function CandleArt({
  variant,
  tone = "gold",
  className = "",
}: {
  variant: "pillar" | "jar" | "taper";
  tone?: Tone;
  className?: string;
}) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div className="absolute inset-0" style={{ backgroundImage: toneGradient[tone] }} aria-hidden />
      <svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full" aria-hidden>
        {variant === "pillar" && <PillarSvg />}
        {variant === "jar" && <JarSvg />}
        {variant === "taper" && <TaperSvg />}
      </svg>
    </div>
  );
}

function Flame({ x, y, scale = 1 }: { x: number; y: number; scale?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <ellipse cx="0" cy="-2" rx="10" ry="16" fill="#e8a33d" opacity="0.25" />
      <path
        d="M0,-16 C6,-8 6,0 0,6 C-6,0 -6,-8 0,-16 Z"
        fill="#8c6c2c"
      />
      <path d="M0,-9 C3,-4 3,1 0,3 C-3,1 -3,-4 0,-9 Z" fill="#f3ece0" />
    </g>
  );
}

function PillarSvg() {
  return (
    <g stroke="#8c6c2c" strokeWidth="1.4" fill="none" strokeLinecap="round">
      {/* plate */}
      <ellipse cx="100" cy="158" rx="46" ry="7" fill="#faf7f1" stroke="#8c6c2c" />
      {/* body */}
      <rect x="72" y="70" width="56" height="88" rx="4" fill="#faf7f1" />
      <line x1="82" y1="78" x2="82" y2="150" opacity="0.35" />
      <line x1="100" y1="78" x2="100" y2="150" opacity="0.2" />
      <line x1="118" y1="78" x2="118" y2="150" opacity="0.35" />
      {/* rim */}
      <ellipse cx="100" cy="70" rx="28" ry="6" fill="#f3ece0" stroke="#8c6c2c" />
      {/* wick */}
      <line x1="100" y1="70" x2="100" y2="60" strokeWidth="1.6" />
      <Flame x={100} y={52} />
    </g>
  );
}

function JarSvg() {
  return (
    <g stroke="#8c6c2c" strokeWidth="1.4" fill="none" strokeLinecap="round">
      {/* jar */}
      <path d="M66,90 Q66,155 100,158 Q134,155 134,90" fill="#faf7f1" opacity="0.9" />
      <ellipse cx="100" cy="90" rx="34" ry="8" fill="#f3ece0" stroke="#8c6c2c" />
      <ellipse cx="100" cy="158" rx="34" ry="6" opacity="0.5" />
      {/* label band */}
      <rect x="72" y="112" width="56" height="20" rx="2" fill="#faf7f1" stroke="#8c6c2c" opacity="0.8" />
      <line x1="80" y1="122" x2="120" y2="122" strokeWidth="1" opacity="0.4" />
      {/* wax + wick */}
      <ellipse cx="100" cy="90" rx="26" ry="5" fill="#efe2c4" opacity="0.7" />
      <line x1="100" y1="88" x2="100" y2="78" strokeWidth="1.6" />
      <Flame x={100} y={70} scale={0.9} />
    </g>
  );
}

function TaperSvg() {
  return (
    <g stroke="#8c6c2c" strokeWidth="1.4" fill="none" strokeLinecap="round">
      <ellipse cx="100" cy="160" rx="40" ry="6" fill="#faf7f1" stroke="#8c6c2c" />
      {/* left taper */}
      <rect x="78" y="76" width="12" height="86" rx="3" fill="#faf7f1" />
      <line x1="84" y1="76" x2="84" y2="58" strokeWidth="1.4" />
      <Flame x={84} y={50} scale={0.85} />
      {/* right taper (slightly shorter) */}
      <rect x="110" y="88" width="12" height="74" rx="3" fill="#faf7f1" />
      <line x1="116" y1="88" x2="116" y2="70" strokeWidth="1.4" />
      <Flame x={116} y={62} scale={0.85} />
    </g>
  );
}
