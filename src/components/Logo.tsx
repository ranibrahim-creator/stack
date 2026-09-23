export function Logo({ className = "h-3.5 w-5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 56 32"
      className={className}
      fill="currentColor"
      aria-hidden
    >
      <polygon points="0,6 22,6 28,14 0,14" />
      <polygon points="34,6 56,6 56,14 28,14" />
      <polygon points="0,18 28,18 22,26 0,26" />
      <polygon points="28,18 56,18 56,26 34,26" />
    </svg>
  );
}
