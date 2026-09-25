export function LineField({ className = "" }: { className?: string }) {
  return (
    <div className={`line-field ${className}`} aria-hidden>
      <span className="line-h" style={{ top: "16%" }} />
      <span className="line-h line-h-run" style={{ top: "38%" }} />
      <span className="line-h" style={{ top: "64%" }} />
      <span className="line-h line-h-run-late" style={{ top: "88%" }} />
      <span className="line-v" style={{ left: "11%" }} />
      <span className="line-v line-v-run" style={{ left: "68%" }} />
      <span className="line-v" style={{ left: "93%" }} />
    </div>
  );
}
