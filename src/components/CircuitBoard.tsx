"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { useLayoutEffect, useRef, useState } from "react";

export type CircuitNode = {
  id: string;
  x: number;
  y: number;
  label: string;
  icon?: ReactNode;
};

export type CircuitConnection = {
  from: string;
  to: string;
  animated?: boolean;
};

function tracePath(
  from: { x: number; y: number },
  to: { x: number; y: number },
) {
  if (from.x === to.x || from.y === to.y) {
    return `M ${from.x} ${from.y} L ${to.x} ${to.y}`;
  }
  return `M ${from.x} ${from.y} H ${to.x} V ${to.y}`;
}

function reverseTracePath(
  from: { x: number; y: number },
  to: { x: number; y: number },
) {
  if (from.x === to.x || from.y === to.y) {
    return `M ${to.x} ${to.y} L ${from.x} ${from.y}`;
  }
  return `M ${to.x} ${to.y} V ${from.y} H ${from.x}`;
}

function cornerOf(
  from: { x: number; y: number },
  to: { x: number; y: number },
) {
  if (from.x === to.x || from.y === to.y) return null;
  return { x: to.x, y: from.y };
}

function Pulse({
  d,
  delay,
  travel,
  pause = 1,
}: {
  d: string;
  delay: number;
  travel: number;
  pause?: number;
}) {
  const ref = useRef<SVGPathElement>(null);
  const [len, setLen] = useState(160);

  useLayoutEffect(() => {
    if (ref.current) setLen(ref.current.getTotalLength());
  }, [d]);

  const hold = len + 12;

  return (
    <motion.path
      ref={ref}
      d={d}
      stroke="#7ae0a4"
      strokeWidth="0.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeDasharray={`12 ${len}`}
      animate={{ strokeDashoffset: [0, -hold, -hold] }}
      transition={{
        duration: travel + pause,
        times: [0, travel / (travel + pause), 1],
        repeat: Infinity,
        ease: "linear",
        delay,
      }}
    />
  );
}

export function CircuitBoard({
  nodes,
  connections,
  width = 500,
  height = 300,
  showGrid = true,
  pulseSpeed = 2,
  className = "",
}: {
  nodes: CircuitNode[];
  connections: CircuitConnection[];
  width?: number;
  height?: number;
  showGrid?: boolean;
  pulseSpeed?: number;
  className?: string;
}) {
  const byId = Object.fromEntries(nodes.map((node) => [node.id, node]));

  return (
    <div
      className={`glass-card-mint relative overflow-hidden rounded-2xl ${className}`}
      style={{ aspectRatio: `${width} / ${height}` }}
    >
      {showGrid ? <div className="circuit-grid absolute inset-0 opacity-50" /> : null}

      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="relative h-auto w-full"
        fill="none"
        aria-hidden
      >
        {connections.map((link, index) => {
          const from = byId[link.from];
          const to = byId[link.to];
          if (!from || !to) return null;
          const d = tracePath(from, to);
          const corner = cornerOf(from, to);
          return (
            <g key={`${link.from}-${link.to}`}>
              <path
                d={d}
                stroke="#5c6166"
                strokeWidth="0.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {corner ? (
                <circle
                  cx={corner.x}
                  cy={corner.y}
                  r="2"
                  fill="#000"
                  stroke="#D0D6E0"
                  strokeWidth="0.7"
                />
              ) : null}
              {link.animated ? (
                <Pulse
                  d={reverseTracePath(from, to)}
                  delay={index * 0.2}
                  travel={pulseSpeed}
                />
              ) : null}
            </g>
          );
        })}
      </svg>

      {nodes.map((node) => (
        <div
          key={node.id}
          className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1.5"
          style={{
            left: `${(node.x / width) * 100}%`,
            top: `${(node.y / height) * 100}%`,
          }}
        >
          {node.icon}
          <span className="whitespace-nowrap font-[family-name:var(--font-plex-mono)] text-[11px] tracking-[0.04em] text-[#8A8F98]">
            {node.label}
          </span>
        </div>
      ))}
    </div>
  );
}
