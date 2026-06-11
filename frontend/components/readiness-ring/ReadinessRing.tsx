"use client";

// SVG circle progress ring — colour: red < 40, yellow 40-70, blue > 70

export function ReadinessRing({ score, size = 160 }: { score: number; size?: number }) {
  const stroke = 14;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const filled = (score / 100) * c;
  const color = score < 40 ? "#D02020" : score <= 70 ? "#F0C020" : "#1040C0";

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="#E0E0E0"
          strokeWidth={stroke}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={color}
          strokeWidth={stroke}
          strokeDasharray={`${filled} ${c - filled}`}
          strokeLinecap="butt"
          style={{ transition: "stroke-dasharray 1s ease-out" }}
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="text-4xl font-black leading-none">{score}</span>
        <span className="text-label text-ink/50">/ 100</span>
      </div>
    </div>
  );
}
