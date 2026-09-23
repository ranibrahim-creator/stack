"use client";

import { useEffect, useRef } from "react";

const GLYPHS = "ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉ0123456789";
const TRAIL = 12;
const STEP_MS = 70;

function glyph() {
  return GLYPHS[(Math.random() * GLYPHS.length) | 0];
}

const MIRROR_SLOTS = [0.58, 0.68, 0.78, 0.87, 0.95];
const MIRROR_REACH = [0.42, 0.55, 0.68, 0.82, 1];

export function MatrixRain({
  className,
  mode = "rail",
}: {
  className?: string;
  mode?: "rail" | "field" | "mirror" | "pill";
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

    const cell =
      mode === "pill" ? 9 : mode === "field" ? 22 : mode === "mirror" ? 14 : 15;
    const pileLayers = 9;
    const streamsPerCol = 3;
    let width = 0;
    let height = 0;
    let columns = 0;
    let drops: number[] = [];
    let trails: string[][] = [];
    let pile: string[][] = [];
    let streams: number[][] = [];
    let streamTrails: string[][][] = [];
    let last = 0;
    let raf = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width =
        mode === "rail" ? 3 * cell : wrap.clientWidth;
      height = wrap.clientHeight;
      columns =
        mode === "mirror"
          ? MIRROR_SLOTS.length
          : mode === "pill"
            ? Math.max(20, Math.floor(width / cell))
            : Math.max(1, Math.floor(width / cell));
      drops = Array.from({ length: columns }, (_, i) =>
        mode === "pill" ? (i * 3) % 14 : (i * 7) % 20,
      );
      trails = Array.from({ length: columns }, () =>
        Array.from({ length: TRAIL }, glyph),
      );
      pile = Array.from({ length: columns }, () =>
        Array.from({ length: pileLayers }, glyph),
      );
      streams = Array.from({ length: columns }, (_, i) =>
        Array.from({ length: streamsPerCol }, (_, s) => ((i + s * 7) % 16)),
      );
      streamTrails = Array.from({ length: columns }, () =>
        Array.from({ length: streamsPerCol }, () =>
          Array.from({ length: TRAIL }, glyph),
        ),
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
      ctx.font =
        mode === "pill"
          ? "10px ui-monospace, SFMono-Regular, Menlo, monospace"
          : mode === "mirror"
            ? "11px ui-monospace, SFMono-Regular, Menlo, monospace"
            : "12px ui-monospace, SFMono-Regular, Menlo, monospace";
      ctx.textBaseline =
        mode === "mirror" || mode === "pill" ? "middle" : "alphabetic";

      if (mode === "pill") {
        const horizon = height - 3;
        const step = 8;
        const flowReach = height * 0.78;

        for (let i = 0; i < columns; i += 1) {
          const x = i * cell + 1;
          if (Math.random() < 0.08) {
            pile[i][(Math.random() * 4) | 0] = glyph();
          }

          for (let layer = 0; layer < pileLayers; layer += 1) {
            const t = layer / (pileLayers - 1);
            const y = horizon - layer * step;
            const alpha = 0.9 * Math.pow(1 - t * 0.55, 1.4);
            ctx.fillStyle =
              layer < 2
                ? `rgba(196, 232, 208, ${alpha})`
                : `rgba(28, 132, 72, ${alpha})`;
            ctx.fillText(pile[i][layer], x, y);
          }

          for (let s = 0; s < streamsPerCol; s += 1) {
            streamTrails[i][s].pop();
            streamTrails[i][s].unshift(glyph());

            for (let t = 0; t < TRAIL; t += 1) {
              const dist = (streams[i][s] - t) * cell;
              if (dist < pileLayers * step * 0.45) continue;
              const y = horizon - dist;
              if (y < -cell || y > horizon) continue;
              const rise = Math.min(1, dist / flowReach);
              const fade = 1 - t / TRAIL;
              const alpha = (t === 0 ? 0.55 : 0.08 + fade * 0.22) * (1 - rise * rise);
              if (alpha < 0.03) continue;
              ctx.fillStyle =
                t === 0
                  ? `rgba(196, 232, 208, ${alpha})`
                  : `rgba(28, 132, 72, ${alpha})`;
              ctx.fillText(streamTrails[i][s][t], x, y);
            }

            if (streams[i][s] * cell > flowReach + TRAIL * cell) {
              streams[i][s] = 3;
            } else {
              streams[i][s] += 1;
            }
          }
        }
        return;
      }

      const horizon = mode === "mirror" ? height * 0.58 : height;
      const pillLeft = 2;

      for (let i = 0; i < columns; i += 1) {
        if (mode === "field" && i % 3 !== 0) continue;

        trails[i].pop();
        trails[i].unshift(glyph());

        const x =
          mode === "mirror"
            ? width * MIRROR_SLOTS[i]
            : mode === "pill"
              ? pillLeft + i * cell
              : i * cell + 2;
        const reach = mode === "mirror" ? horizon * MIRROR_REACH[i] : height;
        const strength =
          mode === "mirror"
            ? 0.45 + MIRROR_REACH[i] * 0.55
            : mode === "pill"
              ? 0.85
              : 1;

        for (let t = 0; t < TRAIL; t += 1) {
          const dist = (drops[i] - t) * cell;
          const y =
            mode === "mirror" || mode === "pill"
              ? horizon - dist
              : (drops[i] - t) * cell;
          if (mode === "mirror" && (y < horizon - reach || y > horizon)) continue;
          if (mode === "pill" && (y < -cell || y > horizon)) continue;
          if (mode !== "mirror" && mode !== "pill" && (y < -cell || y > height + cell))
            continue;

          const fade = 1 - t / TRAIL;
          const head = mode === "pill" ? 0.72 : 0.28;
          const tail = mode === "pill" ? 0.1 + fade * 0.28 : 0.04 + fade * 0.12;
          const rise =
            mode === "pill"
              ? Math.min(1, Math.max(0, (horizon - y) / (horizon * 0.92)))
              : 0;
          const distanceFade = mode === "pill" ? 1 - rise * rise : 1;
          const alpha = (t === 0 ? head : tail) * strength * distanceFade;
          ctx.fillStyle =
            t === 0
              ? `rgba(196, 232, 208, ${alpha})`
              : `rgba(28, 132, 72, ${alpha})`;
          ctx.fillText(trails[i][t], x, y);

          if (mode === "mirror") {
            const reflected = horizon + (horizon - y);
            const rAlpha =
              alpha * 0.38 * (1 - (horizon - y) / (reach + 1));
            ctx.fillStyle =
              t === 0
                ? `rgba(196, 232, 208, ${rAlpha})`
                : `rgba(28, 132, 72, ${rAlpha})`;
            ctx.fillText(trails[i][t], x, reflected);
          }
        }

        const limit =
          mode === "mirror"
            ? reach / cell + TRAIL
            : mode === "pill"
              ? horizon / cell + 2
              : height / cell + TRAIL;
        if (drops[i] > limit) {
          drops[i] = mode === "pill" ? 0 : -2 - ((Math.random() * 10) | 0);
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
