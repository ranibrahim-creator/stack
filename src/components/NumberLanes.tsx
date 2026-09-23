"use client";

import { useEffect, useRef } from "react";

const GLYPHS = "ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉ0123456789";
const STEP_MS = 70;
const CELL = 13;
const LINE_GAP = 28;
const TRAIL = 10;

function glyph() {
  return GLYPHS[(Math.random() * GLYPHS.length) | 0];
}

export function NumberLanes({ className }: { className?: string }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let cols = 0;
    let rows = 0;
    let lines: string[][] = [];
    let heads: number[] = [];
    let last = 0;
    let raf = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = wrap.clientWidth;
      height = wrap.clientHeight;
      cols = Math.max(8, Math.floor(width / CELL));
      rows = Math.max(4, Math.floor(height / LINE_GAP));
      lines = Array.from({ length: rows }, () =>
        Array.from({ length: cols }, glyph),
      );
      heads = Array.from({ length: rows }, (_, i) => (i * 11) % cols);
      canvas.width = Math.floor(Math.max(width, 1) * dpr);
      canvas.height = Math.floor(Math.max(height, 1) * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = (now: number) => {
      raf = window.requestAnimationFrame(draw);
      if (now - last < STEP_MS) return;
      last = now;
      ctx.clearRect(0, 0, width, height);
      ctx.font = "11px ui-monospace, SFMono-Regular, Menlo, monospace";
      ctx.textBaseline = "middle";

      const holeW = Math.min(340, width * 0.42);
      const holeH = 88;
      const holeX = width / 2;
      const holeY = height * 0.62;

      for (let r = 0; r < rows; r += 1) {
        const rtl = r % 2 === 1;
        if (rtl) {
          lines[r].shift();
          lines[r].push(glyph());
        } else {
          lines[r].pop();
          lines[r].unshift(glyph());
        }
        heads[r] = (heads[r] + 1) % cols;

        const y = LINE_GAP * 0.6 + r * LINE_GAP;
        const rise = 1 - y / height;
        const fade = Math.max(0, 1 - rise * 1.35);

        for (let c = 0; c < cols; c += 1) {
          const x = c * CELL + 4;
          if (Math.abs(x - holeX) < holeW && Math.abs(y - holeY) < holeH) continue;

          const dist = Math.min(
            Math.abs(c - heads[r]),
            cols - Math.abs(c - heads[r]),
          );
          const trail = Math.max(0, 1 - dist / TRAIL);
          const alpha = fade * (dist === 0 ? 0.7 : 0.06 + trail * 0.28);
          if (alpha < 0.03) continue;

          ctx.fillStyle =
            dist === 0
              ? `rgba(196, 232, 208, ${alpha})`
              : `rgba(28, 132, 72, ${alpha})`;
          ctx.fillText(lines[r][c], x, y);
        }
      }
    };

    resize();
    last = performance.now();
    raf = window.requestAnimationFrame(draw);
    const observer = new ResizeObserver(resize);
    observer.observe(wrap);

    return () => {
      window.cancelAnimationFrame(raf);
      observer.disconnect();
    };
  }, []);

  return (
    <div ref={wrapRef} aria-hidden className={className}>
      <canvas ref={canvasRef} className="block h-full w-full" />
    </div>
  );
}
