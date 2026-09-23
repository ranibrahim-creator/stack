export function isoPoint(
  x: number,
  y: number,
  z: number,
  ox: number,
  oy: number,
  s = 1,
) {
  return `${ox + (x - z) * 0.866 * s},${oy + (x + z) * 0.5 * s - y * s}`;
}

export function IsoBox({
  x,
  y,
  z,
  w,
  h,
  d,
  ox,
  oy,
  s = 1,
  stroke = "#D0D6E0",
}: {
  x: number;
  y: number;
  z: number;
  w: number;
  h: number;
  d: number;
  ox: number;
  oy: number;
  s?: number;
  stroke?: string;
}) {
  const pt = (dx: number, dy: number, dz: number) =>
    isoPoint(x + dx, y + dy, z + dz, ox, oy, s);
  return (
    <g fill="#000" stroke={stroke} strokeWidth="0.7" strokeLinejoin="round">
      <path d={`M ${pt(0, h, d)} L ${pt(w, h, d)} L ${pt(w, 0, d)} L ${pt(0, 0, d)} Z`} />
      <path d={`M ${pt(w, h, 0)} L ${pt(w, h, d)} L ${pt(w, 0, d)} L ${pt(w, 0, 0)} Z`} />
      <path d={`M ${pt(0, h, 0)} L ${pt(w, h, 0)} L ${pt(w, h, d)} L ${pt(0, h, d)} Z`} />
    </g>
  );
}
