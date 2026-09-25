import type { ReactNode } from "react";

export function SectionTitle({
  line1,
  line2,
  as: Tag = "h2",
  className = "",
  emphasize = "end",
}: {
  line1: string;
  line2?: ReactNode;
  as?: "h1" | "h2";
  className?: string;
  emphasize?: "start" | "end" | "none";
}) {
  const muted = "font-normal text-[0.78em] tracking-[-0.02em] text-[#8A8F98]";
  const strong = "font-semibold tracking-[-0.05em] text-white";

  return (
    <Tag className={`page-title page-title-sm text-balance ${className}`}>
      {emphasize === "none" ? (
        <>
          {line1}
          {line2 ? <> {line2}</> : null}
        </>
      ) : (
        <>
          <span className={emphasize === "start" ? strong : muted}>{line1}</span>
          {line2 ? (
            <>
              {" "}
              <span className={emphasize === "start" ? muted : strong}>{line2}</span>
            </>
          ) : null}
        </>
      )}
    </Tag>
  );
}
