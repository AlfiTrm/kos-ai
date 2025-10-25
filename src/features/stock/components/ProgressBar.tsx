export default function ProgressBar({ pct }: { pct: number }) {
  const w = Math.max(0, Math.min(100, pct));
  return (
    <div className="h-3 w-full rounded-full bg-neutral-200 overflow-hidden">
      <div
        className="h-full rounded-full bg-gradient-to-r from-pink-400 to-orange-300"
        style={{ width: `${w}%` }}
      />
    </div>
  );
}
