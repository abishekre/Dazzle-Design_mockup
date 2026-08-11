import { toneGradient, type Tone } from "@/lib/content";

export type ArtVariant = "pillar" | "jar" | "taper" | "bouquet" | "boutonniere" | "balloon-cluster" | "lei";

/**
 * Hand-drawn shop illustrations — used in place of real product photography,
 * which doesn't exist yet for My Floral's line. Deliberately illustrative
 * (not a stock-photo pastiche) so it reads as an intentional design choice.
 * Sits on the same warm gradient tiles used elsewhere on the site.
 */
export function ShopArt({
  variant,
  tone = "gold",
  className = "",
}: {
  variant: ArtVariant;
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
        {variant === "bouquet" && <BouquetSvg />}
        {variant === "boutonniere" && <BoutonniereSvg />}
        {variant === "balloon-cluster" && <BalloonClusterSvg />}
        {variant === "lei" && <LeiSvg />}
      </svg>
    </div>
  );
}

function Flame({ x, y, scale = 1 }: { x: number; y: number; scale?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <ellipse cx="0" cy="-2" rx="10" ry="16" fill="#e8a33d" opacity="0.25" />
      <path d="M0,-16 C6,-8 6,0 0,6 C-6,0 -6,-8 0,-16 Z" fill="#8c6c2c" />
      <path d="M0,-9 C3,-4 3,1 0,3 C-3,1 -3,-4 0,-9 Z" fill="#f3ece0" />
    </g>
  );
}

function PillarSvg() {
  return (
    <g stroke="#8c6c2c" strokeWidth="1.4" fill="none" strokeLinecap="round">
      <ellipse cx="100" cy="158" rx="46" ry="7" fill="#faf7f1" stroke="#8c6c2c" />
      <rect x="72" y="70" width="56" height="88" rx="4" fill="#faf7f1" />
      <line x1="82" y1="78" x2="82" y2="150" opacity="0.35" />
      <line x1="100" y1="78" x2="100" y2="150" opacity="0.2" />
      <line x1="118" y1="78" x2="118" y2="150" opacity="0.35" />
      <ellipse cx="100" cy="70" rx="28" ry="6" fill="#f3ece0" stroke="#8c6c2c" />
      <line x1="100" y1="70" x2="100" y2="60" strokeWidth="1.6" />
      <Flame x={100} y={52} />
    </g>
  );
}

function JarSvg() {
  return (
    <g stroke="#8c6c2c" strokeWidth="1.4" fill="none" strokeLinecap="round">
      <path d="M66,90 Q66,155 100,158 Q134,155 134,90" fill="#faf7f1" opacity="0.9" />
      <ellipse cx="100" cy="90" rx="34" ry="8" fill="#f3ece0" stroke="#8c6c2c" />
      <ellipse cx="100" cy="158" rx="34" ry="6" opacity="0.5" />
      <rect x="72" y="112" width="56" height="20" rx="2" fill="#faf7f1" stroke="#8c6c2c" opacity="0.8" />
      <line x1="80" y1="122" x2="120" y2="122" strokeWidth="1" opacity="0.4" />
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
      <rect x="78" y="76" width="12" height="86" rx="3" fill="#faf7f1" />
      <line x1="84" y1="76" x2="84" y2="58" strokeWidth="1.4" />
      <Flame x={84} y={50} scale={0.85} />
      <rect x="110" y="88" width="12" height="74" rx="3" fill="#faf7f1" />
      <line x1="116" y1="88" x2="116" y2="70" strokeWidth="1.4" />
      <Flame x={116} y={62} scale={0.85} />
    </g>
  );
}

const bouquetFlowers = [
  { x: 78, y: 58, r: 13 },
  { x: 100, y: 42, r: 14 },
  { x: 123, y: 56, r: 12 },
  { x: 92, y: 74, r: 11 },
  { x: 112, y: 76, r: 11 },
];

function BouquetSvg() {
  return (
    <g stroke="#8c6c2c" strokeWidth="1.2" fill="none" strokeLinecap="round">
      <path d="M70,80 C55,75 50,60 58,48" opacity="0.55" />
      <path d="M132,80 C147,75 152,60 144,48" opacity="0.55" />
      {bouquetFlowers.map((f, i) => (
        <g key={i} fill="#f3ece0">
          <circle cx={f.x - f.r * 0.4} cy={f.y - f.r * 0.2} r={f.r * 0.65} />
          <circle cx={f.x + f.r * 0.4} cy={f.y - f.r * 0.1} r={f.r * 0.6} />
          <circle cx={f.x} cy={f.y + f.r * 0.3} r={f.r * 0.7} />
        </g>
      ))}
      <path d="M85,88 L98,138" />
      <path d="M100,90 L100,140" />
      <path d="M116,88 L102,138" />
      <path d="M80,140 L120,140 L134,178 L66,178 Z" fill="#faf7f1" />
      <rect x="82" y="134" width="36" height="10" rx="2" fill="#e7cf9c" stroke="#8c6c2c" />
    </g>
  );
}

function BoutonniereSvg() {
  return (
    <g stroke="#8c6c2c" strokeWidth="1.2" fill="none" strokeLinecap="round">
      <path d="M100,150 L92,90" />
      <path d="M92,120 C78,116 74,104 82,94" opacity="0.55" />
      <g fill="#f3ece0">
        <circle cx="86" cy="80" r="9" />
        <circle cx="98" cy="76" r="9" />
        <circle cx="92" cy="88" r="9" />
      </g>
      <line x1="100" y1="150" x2="118" y2="140" strokeWidth="1.6" />
      <circle cx="119" cy="139" r="2.4" fill="#8c6c2c" stroke="none" />
    </g>
  );
}

const clusterBalloons = [
  { x: 80, y: 75, rx: 22, ry: 26 },
  { x: 118, y: 68, rx: 20, ry: 24 },
  { x: 100, y: 102, rx: 18, ry: 22 },
];

function BalloonClusterSvg() {
  return (
    <g stroke="#8c6c2c" strokeWidth="1.2" fill="none" strokeLinecap="round">
      {clusterBalloons.map((b, i) => (
        <ellipse key={i} cx={b.x} cy={b.y} rx={b.rx} ry={b.ry} fill="#f3ece0" />
      ))}
      <path d="M82,102 Q95,140 100,162" opacity="0.6" />
      <path d="M118,92 Q106,140 100,162" opacity="0.6" />
      <path d="M100,124 L100,162" opacity="0.6" />
      <circle cx="100" cy="163" r="2.4" fill="#8c6c2c" stroke="none" />
    </g>
  );
}

function LeiSvg() {
  const cx = 100;
  const cy = 92;
  const rx = 48;
  const ry = 56;
  const n = 10;
  const dots = Array.from({ length: n }).map((_, i) => {
    const t = (i / n) * Math.PI * 2;
    return { x: cx + rx * Math.sin(t), y: cy - ry * Math.cos(t) };
  });
  return (
    <g stroke="#8c6c2c" strokeWidth="1.2" fill="none" strokeLinecap="round">
      <ellipse cx={cx} cy={cy} rx={rx} ry={ry} opacity="0.3" />
      {dots.map((d, i) => (
        <circle key={i} cx={d.x} cy={d.y} r="7.5" fill="#f3ece0" stroke="#8c6c2c" />
      ))}
      <line x1={cx} y1={cy + ry} x2={cx} y2={cy + ry + 16} />
      <path d={`M${cx - 5},${cy + ry + 16} L${cx - 5},${cy + ry + 27} M${cx},${cy + ry + 16} L${cx},${cy + ry + 29} M${cx + 5},${cy + ry + 16} L${cx + 5},${cy + ry + 27}`} />
    </g>
  );
}
