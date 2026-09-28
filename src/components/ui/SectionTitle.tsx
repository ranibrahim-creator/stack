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
  const muted = "section-display-muted";
  const strong = "section-display-strong";

  return (
    <Tag className={`section-display text-balance ${className}`}>
      {emphasize === "none" ? (
        <>
          {line1}
          {line2 ? <> {line2}</> : null}
        </>
      ) : (
        <>
          <span className={`block ${emphasize === "start" ? strong : muted}`}>
            {line1}
          </span>
          {line2 ? (
            <span className={`block ${emphasize === "start" ? muted : strong}`}>
              {line2}
            </span>
          ) : null}
        </>
      )}
    </Tag>
  );
}
