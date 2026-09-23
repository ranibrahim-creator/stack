"use client";

import { useEffect, useRef } from "react";

const GLYPHS = "ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉ0123456789";
const TRAIL = 12;
const STEP_MS = 70;

function glyph() {
  return GLYPHS[(Math.random() * GLYPHS.length) | 0];
}

export function MatrixRain({
  className,
  mode = "rail",
}: {
  className?: string;
  mode?: "rail" | "field";
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduceMotion) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const cell = mode === "field" ? 22 : 15;
    let width = 0;
    let height = 0;
    let columns = 0;
    let drops: number[] = [];
    let trails: string[][] = [];
    let last = 0;
    let raf = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = mode === "field" ? wrap.clientWidth : 3 * cell;
      height = wrap.clientHeight;
      columns = Math.max(1, Math.floor(width / cell));
      drops = Array.from({ length: columns }, (_, i) => (i * 7) % 20);
      trails = Array.from({ length: columns }, () =>
        Array.from({ length: TRAIL }, glyph),
      );
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
      ctx.font = "12px ui-monospace, SFMono-Regular, Menlo, monospace";

      for (let i = 0; i < columns; i += 1) {
        if (mode === "field" && i % 3 !== 0) continue;

        trails[i].pop();
        trails[i].unshift(glyph());

        for (let t = 0; t < TRAIL; t += 1) {
          const y = (drops[i] - t) * cell;
          if (y < -cell || y > height + cell) continue;
          const fade = 1 - t / TRAIL;
          const alpha = t === 0 ? 0.28 : 0.04 + fade * 0.12;
          ctx.fillStyle =
            t === 0
              ? `rgba(196, 232, 208, ${alpha})`
              : `rgba(28, 132, 72, ${alpha})`;
          ctx.fillText(trails[i][t], i * cell + 2, y);
        }

        if (drops[i] * cell > height + TRAIL * cell) {
          drops[i] = -2 - ((Math.random() * 10) | 0);
        } else {
          drops[i] += 1;
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
  }, [mode]);

  return (
    <div ref={wrapRef} aria-hidden className={className}>
      <canvas ref={canvasRef} className="block h-full w-full" />
    </div>
  );
}
