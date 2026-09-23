import type { ReactNode } from "react";

type ButtonProps = {
  href: string;
  children: ReactNode;
  className?: string;
};

export function PrimaryButton({ href, children, className = "" }: ButtonProps) {
  return (
    <a
      href={href}
      className={`inline-flex items-center justify-center rounded-full bg-green-deep px-5 py-2.5 text-sm font-medium text-ink transition duration-200 hover:scale-[1.03] hover:shadow-[0_0_24px_rgba(14,92,52,0.55)] ${className}`}
    >
      {children}
    </a>
  );
}

export function SecondaryButton({
  href,
  children,
  className = "",
}: ButtonProps) {
  return (
    <a
      href={href}
      className={`inline-flex items-center justify-center text-sm font-medium text-green transition-colors hover:text-ink ${className}`}
    >
      {children}
    </a>
  );
}
