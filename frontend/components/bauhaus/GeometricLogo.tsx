// Bauhaus brand mark — circle (blue), square (red), triangle (yellow)
export function GeometricLogo({ size = 32 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      aria-label="CareerLuhh logo"
    >
      <rect x="2" y="18" width="28" height="28" fill="#D02020" stroke="#121212" strokeWidth="2.5" />
      <circle cx="32" cy="18" r="14" fill="#1040C0" stroke="#121212" strokeWidth="2.5" />
      <path d="M16 2 L30 26 L2 26 Z" fill="#F0C020" stroke="#121212" strokeWidth="2.5" />
    </svg>
  );
}

export function LogoWordmark({ light = false }: { light?: boolean }) {
  return (
    <span className="flex items-center gap-2.5">
      <GeometricLogo size={30} />
      <span
        className={`text-lg font-black uppercase tracking-tight ${
          light ? "text-white" : "text-ink"
        }`}
      >
        Career<span className="text-blue">Luhh</span>
      </span>
    </span>
  );
}
