"use client";

import { motion } from "framer-motion";
import { Header } from "./Header";
import { NumberLanes } from "./NumberLanes";

const ease = [0.16, 1, 0.3, 1] as const;

const lines = [
  ["The", "Stack", "landing", "page"],
  ["is", "still", "a", "work", "in", "progress."],
];

export function Gone() {
  return (
    <div className="relative min-h-dvh overflow-hidden" style={{ background: "var(--bg)" }}>
      <div className="pointer-events-none absolute inset-0">
        <NumberLanes className="h-full w-full" />
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-bg to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-bg to-transparent" />
      </div>

      <Header />

      <main className="relative z-10 flex min-h-dvh flex-col items-center justify-center px-5 text-center font-[family-name:var(--font-inter-tight)]">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-[family-name:var(--font-plex-mono)] text-[11px] tracking-[0.08em] text-[#5c6166]"
        >
          WIP 0.1
        </motion.p>

        <h1 className="mt-5 max-w-[780px] text-[34px] font-normal leading-[1.12] tracking-[-0.038em] text-ink sm:text-[44px] lg:text-[52px]">
          {lines.map((line, lineIndex) => (
            <span key={line.join("-")} className="flex flex-wrap justify-center gap-x-[0.28em]">
              {line.map((word, wordIndex) => (
                <span key={`${word}-${wordIndex}`} className="overflow-hidden pb-[0.12em]">
                  <motion.span
                    initial={{ y: "115%", opacity: 0 }}
                    animate={{ y: "0%", opacity: 1 }}
                    transition={{
                      duration: 0.75,
                      ease,
                      delay: 0.12 + lineIndex * 0.18 + wordIndex * 0.05,
                    }}
                    className="inline-block"
                  >
                    {word}
                  </motion.span>
                </span>
              ))}
            </span>
          ))}
        </h1>

        <motion.div
          aria-hidden
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 1.1, ease, delay: 0.85 }}
          className="relative mt-10 h-px w-[min(420px,70%)] origin-center"
        >
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(90deg, transparent, #7ae0a4 20%, #c8f5d8 50%, #7ae0a4 80%, transparent)",
            }}
          />
          <motion.div
            className="absolute left-1/2 top-1/2 size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#c8f5d8]"
            animate={{ opacity: [0.25, 1, 0.25], scale: [0.8, 1.15, 0.8] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>

        <motion.a
          href="mailto:stack@noon.com"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease, delay: 1.15 }}
          className="raycast-pill mt-8"
        >
          <span className="raycast-pill-label">stack@noon.com</span>
        </motion.a>
      </main>
    </div>
  );
}
