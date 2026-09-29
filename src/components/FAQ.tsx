import { Reveal } from "./ui/Reveal";

const items = [
  {
    q: "What is Stack?",
    a: "Stack is noon’s B2B financing platform. We use data and infrastructure from within the noon ecosystem to provide embedded working-capital solutions to businesses.",
  },
  {
    q: "Who can use Stack?",
    a: "Stack is currently available to eligible noon sellers in the UAE. Eligibility and available financing are determined using business performance and other relevant signals.",
  },
  {
    q: "How are sellers assessed?",
    a: "Stack uses data available within the noon ecosystem to understand the seller’s business and determine eligibility and potential financing limits. This includes commerce and operational signals generated through the seller’s activity.",
  },
  {
    q: "How does repayment work?",
    a: "Repayment is linked to future noon sales and integrated into noon’s existing weekly seller payout cycle. This allows sellers to repay through the same commercial activity the financing is designed to support.",
  },
  {
    q: "Is Stack available outside the UAE?",
    a: "Stack’s current financing proposition is focused on the UAE.",
  },
  {
    q: "Does Stack work with financial institutions?",
    a: "Yes. Stack’s technology and embedded infrastructure can support financing programs with banks and other financial institutions. For partnership enquiries, email stack@noon.com.",
  },
];

export function FAQ() {
  return (
    <section id="faq" className="section-shell relative z-10">
      <Reveal>
        <div className="flex flex-col gap-10 md:gap-12 lg:flex-row lg:gap-16">
          <h2 className="section-display text-balance lg:w-[min(42%,22rem)] lg:shrink-0">
            <span className="section-display-muted block">Frequently</span>
            <span className="section-display-strong block">asked questions</span>
          </h2>
          <div className="flex min-w-0 flex-1 flex-col gap-2">
            {items.map((item, index) => (
              <details
                key={item.q}
                name="stack-faq"
                className="faq-pill faq-item rounded-[16px] px-4 py-3.5 sm:px-5 sm:py-4"
                open={index === 0}
              >
                <summary className="group flex w-full cursor-pointer items-center gap-4 text-left text-[16px] leading-[1.5] break-words text-ink">
                  <h3 className="min-w-0 flex-1 font-[family-name:var(--font-inter-tight)] text-[16px] font-medium">
                    {item.q}
                  </h3>
                  <span
                    className="faq-toggle flex size-6 shrink-0 items-center justify-center rounded-[8px] text-[16px] leading-none text-[#3cb86a] transition-colors duration-200 group-hover:bg-green-tint group-hover:text-[#7ae0a4]"
                    aria-hidden
                  />
                </summary>
                <p className="pt-3 pr-0 pb-0 text-[14px] leading-[1.5] text-[#8A8F98] sm:pr-8 sm:pt-4">
                  {item.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
