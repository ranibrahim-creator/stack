"use client";

import { motion } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

const lines = [
  ["Funding", "that", "grows", "with"],
  ["your", "sales"],
];

const nav = ["Inbox", "Financing", "Payouts", "Inventory"];

const offers = [
  { id: "STK-1", title: "Seller Financing", meta: "Live" },
  { id: "STK-2", title: "Weekly payout collection", meta: "Active" },
  { id: "STK-3", title: "Inventory-backed offer", meta: "Ready" },
];

const activity = [
  {
    title: "Offer created from noon sales data",
    detail: "Eligibility used existing commerce signals — no separate application.",
    time: "Just now",
  },
  {
    title: "Repayment attached to weekly payout",
    detail: "Collection runs through the payout noon already sends sellers.",
    time: "2m ago",
  },
  {
    title: "Inventory confirmed in fulfilment",
    detail: "Financing is tied to stock held in noon’s network.",
    time: "5m ago",
  },
];

const properties = [
  { label: "Status", value: "Live" },
  { label: "Product", value: "Seller Financing" },
  { label: "Repayment", value: "Share of sales" },
  { label: "Cadence", value: "Weekly payout" },
  { label: "Term", value: "No fixed term" },
  { label: "Market", value: "UAE" },
];

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden pt-32 md:pt-44 lg:pt-[220px]">
      <div className="px-5 md:px-8 lg:px-10">
        <h1 className="text-left text-[44px] font-normal leading-[1.18] tracking-[-0.04em] text-ink sm:text-[56px] lg:text-[64px]">
          {lines.map((line, lineIndex) => (
            <span
              key={line.join("-")}
              className="flex flex-wrap gap-x-[0.28em]"
            >
              {line.map((word, wordIndex) => (
                <span key={word} className="overflow-hidden pb-[0.22em] leading-[1.18]">
                  <motion.span
                    initial={{ y: "115%", opacity: 0, filter: "blur(8px)" }}
                    animate={{ y: "0%", opacity: 1, filter: "blur(0px)" }}
                    transition={{
                      duration: 0.8,
                      ease,
                      delay: 0.08 + lineIndex * 0.2 + wordIndex * 0.05,
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
          initial={{ opacity: 0, y: 8, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 280,
            damping: 20,
            delay: 0.48,
          }}
          className="mt-5 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between"
        >
          <p className="raycast-pill">
            <span className="raycast-pill-label">
              Built by noon. Embedded into noon.
            </span>
          </p>
          <a
            href="#product-terms"
            className="text-[13px] text-ink transition-colors hover:text-green"
          >
            See how it works →
          </a>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 48, filter: "blur(16px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 1.05, ease, delay: 0.78 }}
        className="relative mx-auto mt-8 w-[min(1440px,calc(100%-24px))] md:w-[min(1440px,calc(100%-48px))]"
      >
        <div className="relative h-[560px] overflow-hidden rounded-t-2xl border border-b-0 border-border bg-surface md:h-[680px] lg:h-[760px]">
          <div className="grid h-full grid-cols-1 lg:grid-cols-[232px_minmax(0,1fr)_260px]">
            <aside className="hidden border-r border-border bg-bg/60 px-3 py-4 lg:flex lg:flex-col">
              <p className="px-2 text-[13px] font-medium text-ink">stack</p>
              <div className="mt-5 space-y-0.5">
                {nav.map((item) => (
                  <div
                    key={item}
                    className={`rounded-md px-2 py-1.5 text-[13px] ${
                      item === "Financing"
                        ? "bg-bg font-medium text-ink"
                        : "text-slate"
                    }`}
                  >
                    {item}
                  </div>
                ))}
              </div>
              <p className="mt-7 px-2 text-[11px] font-medium uppercase tracking-[0.08em] text-slate">
                Offers
              </p>
              <div className="mt-2 space-y-0.5">
                {offers.map((offer) => (
                  <div
                    key={offer.id}
                    className={`rounded-md px-2 py-2 ${
                      offer.id === "STK-1" ? "bg-green-tint" : ""
                    }`}
                  >
                    <p className="text-[11px] text-slate">{offer.id}</p>
                    <p className="text-[13px] text-ink">{offer.title}</p>
                  </div>
                ))}
              </div>
            </aside>

            <div className="min-w-0 overflow-hidden px-5 py-5 md:px-8 md:py-6">
              <p className="text-[13px] text-slate">STK-1</p>
              <h2 className="mt-2 text-[26px] font-medium tracking-tight text-ink md:text-[32px]">
                Seller Financing
              </h2>
              <p className="mt-3 max-w-[640px] text-[14px] leading-[1.55] text-slate md:text-[15px]">
                Working capital tied to inventory already sitting in noon
                fulfilment. Repaid as a share of sales through the weekly
                seller payout — not a separate bill.
              </p>

              <div className="mt-8">
                <p className="text-[13px] font-medium text-ink">Activity</p>
                <div className="mt-4 space-y-5">
                  {activity.map((item, index) => (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        delay: 1.05 + index * 0.1,
                        duration: 0.45,
                        ease,
                      }}
                      className="flex gap-3"
                    >
                      <span className="mt-1.5 size-2 shrink-0 rounded-full bg-green" />
                      <div>
                        <p className="text-[14px] text-ink">{item.title}</p>
                        <p className="mt-1 text-[13px] leading-relaxed text-slate">
                          {item.detail}
                        </p>
                        <p className="mt-1 text-[12px] text-slate">{item.time}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            <aside className="hidden border-l border-border px-5 py-6 lg:block">
              <p className="text-[13px] font-medium text-ink">Properties</p>
              <dl className="mt-5 space-y-4">
                {properties.map((item) => (
                  <div key={item.label}>
                    <dt className="text-[12px] text-slate">{item.label}</dt>
                    <dd className="mt-1 text-[13px] text-ink">
                      {item.label === "Status" ? (
                        <span className="inline-flex items-center gap-1.5">
                          <span className="relative flex size-1.5">
                            <span className="live-dot absolute inset-0 rounded-full bg-green" />
                            <span className="relative size-1.5 rounded-full bg-green" />
                          </span>
                          {item.value}
                        </span>
                      ) : (
                        item.value
                      )}
                    </dd>
                  </div>
                ))}
              </dl>
            </aside>
          </div>

          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-[var(--bg)] to-transparent"
          />
        </div>
      </motion.div>
    </section>
  );
}
