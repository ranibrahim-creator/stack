import type { ReactNode } from "react";

export function SectionTitle({
  line1,
  line2,
  as: Tag = "h2",
  className = "",
}: {
  line1: string;
  line2?: ReactNode;
  as?: "h1" | "h2";
  className?: string;
}) {
  return (
    <Tag className={`page-title page-title-sm text-balance ${className}`}>
      {line1}
      {line2 ? <> {line2}</> : null}
    </Tag>
  );
}
